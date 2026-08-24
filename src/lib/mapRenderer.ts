/**
 * Pure canvas-rendering + culling helpers for the layered map compositor.
 *
 * Contract: every drawing function here (`renderBaseLayer`,
 * `renderMaskLayer`, `renderRevealLayer`) assumes `ctx` has ALREADY been
 * configured by the caller -- canvas.width/height sized for the target
 * devicePixelRatio, and ctx.scale/ctx.setTransform applied for that DPR and
 * for the *settled* ViewTransform (see viewTransform.ts). These functions
 * never call ctx.setTransform/ctx.resetTransform themselves; they only
 * issue drawing commands in BASE projection coordinates. That lets the
 * caller cheaply re-blit a cached layer under a live (mid-gesture)
 * transform via `composeDelta`, and only re-invoke these functions on
 * resize/settle.
 */

import { GeoPath, GeoProjection, geoGraticule10, geoPath } from "d3-geo";
import * as topojson from "topojson-client";
import {
  GRID_WIDTH,
  GRID_HEIGHT,
  TOTAL_CELLS,
  gridToLonLat,
  lonLatToGrid,
} from "./maskCompression";
import { lonLatToScreen } from "./projection";
import { ViewTransform, screenToBase } from "./viewTransform";

export interface MapPalette {
  canvasBg: string;
  ocean: string;
  oceanEdge: string;
  land: string;
  coast: string;
  countryLine: string;
  graticule: string;
  equator: string;
  sphereRing: string;
  brush: string;
  overlap: string;
  overestimate: string;
  missed: string;
}

export interface GridBounds {
  /**
   * Inclusive [start, end] grid-x ranges (each in 0..GRID_WIDTH-1).
   * Antimeridian-straddling viewports are represented as two (or more)
   * disjoint ranges rather than a single wrapping range.
   */
  xRanges: Array<[number, number]>;
  minY: number;
  maxY: number;
}

/**
 * Per-cell projected geometry cache: 4 floats per cell, laid out as
 * (cx, cy, w, h) in BASE coordinates, where (cx, cy) is the cell center
 * and (w, h) is the RAW (unpadded) projected footprint of the cell.
 * `valid[i] === 0` means cell i's projection failed (e.g. off-sphere /
 * numerically degenerate) and it must be skipped by every consumer.
 */
export interface CellGeometry {
  rects: Float32Array;
  valid: Uint8Array;
}

/** Minimum on-screen footprint (in "1x" pixels) so isolated cells stay visible. */
const MIN_CELL_SCREEN_SIZE = 2.5;
/** Extra footprint added to each side so adjacent cells stay visually contiguous. */
const CELL_PADDING = 1.2;

/** Full-grid bounds: the fallback used whenever culling can't safely narrow things down. */
const FULL_GRID_BOUNDS: GridBounds = {
  xRanges: [[0, GRID_WIDTH - 1]],
  minY: 0,
  maxY: GRID_HEIGHT - 1,
};

function safeProject(projection: GeoProjection, lon: number, lat: number): [number, number] | null {
  return lonLatToScreen(projection, lon, lat);
}

/**
 * A cell's projected footprint should never legitimately exceed a few
 * pixels/units even at extreme polar distortion (empirically well under
 * 10 base units for this grid/projection). A span past this cap can only
 * mean the diagonal-neighbor sample crossed a projection wrap seam (the
 * antimeridian for an unrotated projection, or wherever else the seam
 * lands for a rotated one) and landed on the opposite side of the map.
 */
const IMPLAUSIBLE_CELL_SPAN = 30;

function neighborSpan(
  projection: GeoProjection,
  pt: [number, number],
  lon: number,
  lat: number,
  lonStep: number,
  latStep: number
): { w: number; h: number } | null {
  const ptNext = safeProject(projection, lon + lonStep, lat + latStep);
  if (!ptNext) return null;
  return { w: Math.abs(ptNext[0] - pt[0]), h: Math.abs(ptNext[1] - pt[1]) };
}

function isPlausibleSpan(span: { w: number; h: number }): boolean {
  return span.w <= IMPLAUSIBLE_CELL_SPAN && span.h <= IMPLAUSIBLE_CELL_SPAN;
}

/**
 * Projects every one of the 360x180 grid cells exactly once and caches the
 * result. Call this once per resize and once per settled zoom level
 * (whenever the projection instance/scale changes) -- never per frame.
 */
export function buildCellGeometry(projection: GeoProjection): CellGeometry {
  const rects = new Float32Array(TOTAL_CELLS * 4);
  const valid = new Uint8Array(TOTAL_CELLS);

  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const idx = y * GRID_WIDTH + x;
      const [lon, lat] = gridToLonLat(x, y);
      const pt = safeProject(projection, lon, lat);
      if (!pt) continue;

      // Diagonal neighbor (like the original renderMap) gives a robust
      // per-cell width/height estimate that accounts for local projection
      // distortion (cells near the poles are not uniform in size). If
      // that neighbor happens to fall just past a projection wrap seam
      // (crossing the antimeridian, or the pole) it lands on the opposite
      // side of the map and yields a wildly implausible span -- retry
      // with the opposite diagonal in that case.
      let span = neighborSpan(projection, pt, lon, lat, 1, -1);
      if (!span || !isPlausibleSpan(span)) {
        const alt = neighborSpan(projection, pt, lon, lat, -1, 1);
        if (alt && (!span || isPlausibleSpan(alt) || alt.w + alt.h < span.w + span.h)) {
          span = alt;
        }
      }
      const w = span ? span.w : 0;
      const h = span ? span.h : 0;

      const base = idx * 4;
      rects[base] = pt[0];
      rects[base + 1] = pt[1];
      rects[base + 2] = w;
      rects[base + 3] = h;
      valid[idx] = 1;
    }
  }

  return { rects, valid };
}

function drawCell(
  ctx: CanvasRenderingContext2D,
  geometry: CellGeometry,
  idx: number,
  minSize: number,
  pad: number
): void {
  const base = idx * 4;
  const cx = geometry.rects[base];
  const cy = geometry.rects[base + 1];
  const rawW = geometry.rects[base + 2];
  const rawH = geometry.rects[base + 3];
  const w = Math.max(minSize, rawW + pad);
  const h = Math.max(minSize, rawH + pad);
  ctx.fillRect(cx - w / 2, cy - h / 2, w, h);
}

function forEachBoundedCell(bounds: GridBounds, visit: (idx: number) => void): void {
  for (let y = bounds.minY; y <= bounds.maxY; y++) {
    const rowBase = y * GRID_WIDTH;
    for (const [xStart, xEnd] of bounds.xRanges) {
      for (let x = xStart; x <= xEnd; x++) {
        visit(rowBase + x);
      }
    }
  }
}

/**
 * Renders the pre-submit user paint layer (a single wash color) for every
 * set cell inside `bounds`.
 *
 * `viewK` is the SETTLED ViewTransform's zoom factor. MIN_CELL_SCREEN_SIZE
 * and CELL_PADDING are screen-pixel quantities (see their doc comments),
 * but this function draws in ctx-space (BASE, k=1) coordinates that the
 * caller scales to physical pixels by `dpr * viewK` (see MapCanvas's
 * renderPaintLayer). Per-cell geometry is cached once at k=1 and reused
 * unchanged at every zoom (never rebuilt against the live projection
 * scale), so this padding formula is the ONLY place that can compensate
 * for `viewK` when converting a screen-pixel padding budget into
 * ctx-space units -- dividing by `dpr` alone (issue #4's bug) implicitly
 * assumes the ctx-space-to-screen factor is always `dpr`, which is only
 * true at k=1. Dividing by `dpr * viewK` instead keeps the padding pinned
 * to a true constant ~1.2 screen px at every zoom level, so adjacent
 * painted cells stay contiguous instead of the fixed-in-ctx-space margin
 * reading as a shrinking, zoom-dependent fraction of a screen pixel once
 * rasterized (the checkerboard stippling seen at k>=2.5).
 */
export function renderMaskLayer(
  ctx: CanvasRenderingContext2D,
  mask: Uint8Array,
  geometry: CellGeometry,
  color: string,
  bounds: GridBounds,
  dpr: number,
  viewK: number
): void {
  const scale = dpr * viewK;
  const minSize = MIN_CELL_SCREEN_SIZE / scale;
  const pad = CELL_PADDING / scale;
  ctx.fillStyle = color;
  forEachBoundedCell(bounds, (idx) => {
    if (mask[idx] !== 1 || geometry.valid[idx] === 0) return;
    drawCell(ctx, geometry, idx, minSize, pad);
  });
}

/**
 * Renders the post-submit true-positive / false-positive / false-negative
 * diagnostic overlay for every relevant cell inside `bounds`. Runs three
 * passes (one per outcome) so `ctx.fillStyle` only changes 3 times total
 * instead of once per cell.
 *
 * See `renderMaskLayer` above for why `viewK` factors into `minSize`/`pad`.
 */
export function renderRevealLayer(
  ctx: CanvasRenderingContext2D,
  userMask: Uint8Array,
  truthMask: Uint8Array,
  geometry: CellGeometry,
  palette: MapPalette,
  bounds: GridBounds,
  dpr: number,
  viewK: number
): void {
  const scale = dpr * viewK;
  const minSize = MIN_CELL_SCREEN_SIZE / scale;
  const pad = CELL_PADDING / scale;

  const passes: Array<{ color: string; test: (u: boolean, g: boolean) => boolean }> = [
    { color: palette.overlap, test: (u, g) => u && g }, // true positive
    { color: palette.overestimate, test: (u, g) => u && !g }, // false positive
    { color: palette.missed, test: (u, g) => !u && g }, // false negative
  ];

  for (const pass of passes) {
    ctx.fillStyle = pass.color;
    forEachBoundedCell(bounds, (idx) => {
      if (geometry.valid[idx] === 0) return;
      const u = userMask[idx] === 1;
      const g = truthMask[idx] === 1;
      if (!pass.test(u, g)) return;
      drawCell(ctx, geometry, idx, minSize, pad);
    });
  }
}

/**
 * Renders the static base map layer: background, sphere/ocean fill+edge,
 * graticule, equator highlight, land fill+coast stroke, country borders,
 * and the outer sphere ring. Ports steps 1-5 & 8 of the previous
 * MapCanvas `renderMap` at full crisp resolution, parameterized by
 * `palette` so this module has no dependency on any theme/color module.
 */
export function renderBaseLayer(
  ctx: CanvasRenderingContext2D,
  worldTopo: unknown,
  projection: GeoProjection,
  width: number,
  height: number,
  dpr: number,
  palette: MapPalette
): void {
  const pathGenerator: GeoPath = geoPath(projection, ctx);
  // Keeps hairline strokes from disappearing/looking uneven across DPRs
  // since ctx is already DPR-scaled by the caller (a literal 0.4 lineWidth
  // would be under a device pixel on a 1x display).
  const hairline = (w: number) => Math.max(w, 1 / dpr);

  // 1. Clear background
  ctx.fillStyle = palette.canvasBg;
  ctx.fillRect(0, 0, width, height);

  // 2. Sphere background (ocean)
  ctx.beginPath();
  pathGenerator({ type: "Sphere" } as any);
  ctx.fillStyle = palette.ocean;
  ctx.fill();
  ctx.lineWidth = hairline(1.5);
  ctx.strokeStyle = palette.oceanEdge;
  ctx.stroke();

  // 3. Graticule (lat/lon grid lines) + equator highlight
  ctx.beginPath();
  pathGenerator(geoGraticule10());
  ctx.lineWidth = hairline(0.5);
  ctx.strokeStyle = palette.graticule;
  ctx.stroke();

  ctx.beginPath();
  pathGenerator({
    type: "LineString",
    coordinates: [
      [-180, 0],
      [-90, 0],
      [0, 0],
      [90, 0],
      [180, 0],
    ],
  } as any);
  ctx.lineWidth = hairline(0.8);
  ctx.strokeStyle = palette.equator;
  ctx.stroke();

  // 4. Landmasses from TopoJSON
  const topo = worldTopo as any;
  const landFeature = topojson.feature(topo, topo.objects.land) as any;
  ctx.beginPath();
  pathGenerator(landFeature);
  ctx.fillStyle = palette.land;
  ctx.fill();
  ctx.lineWidth = hairline(0.8);
  ctx.strokeStyle = palette.coast;
  ctx.stroke();

  // 5. Country boundaries
  const countriesFeature = topojson.feature(topo, topo.objects.countries) as any;
  ctx.beginPath();
  pathGenerator(countriesFeature);
  ctx.lineWidth = hairline(0.4);
  ctx.strokeStyle = palette.countryLine;
  ctx.stroke();

  // 8. Re-stroke outer sphere outline
  ctx.beginPath();
  pathGenerator({ type: "Sphere" } as any);
  ctx.lineWidth = hairline(1.5);
  ctx.strokeStyle = palette.sphereRing;
  ctx.stroke();
}

const GRID_BOUNDS_SAMPLES = 8; // 9x9 lattice of viewport sample points
const GRID_BOUNDS_MARGIN = 4; // slack cells absorbing inter-sample curvature + draw padding
const ZOOM_CULL_THRESHOLD = 2; // below this, culling isn't worth the sampling cost

/**
 * Inverts one viewport sample point through `vt` then `projection`,
 * cross-checking the result with a forward round-trip so points that fall
 * outside the projection's valid domain (which some d3 inverse
 * implementations answer with a finite but meaningless lon/lat instead of
 * throwing) are correctly treated as invalid rather than silently
 * corrupting the visible bounds.
 */
function invertToGrid(
  projection: GeoProjection,
  vt: ViewTransform,
  sx: number,
  sy: number
): [number, number] | null {
  if (!projection.invert) return null;
  const [bx, by] = screenToBase(vt, sx, sy);

  let inv: [number, number] | null;
  try {
    const result = projection.invert([bx, by]);
    inv = result ? [result[0], result[1]] : null;
  } catch {
    return null;
  }
  if (!inv || !isFinite(inv[0]) || !isFinite(inv[1])) return null;
  if (inv[1] < -90.001 || inv[1] > 90.001) return null;

  let back: [number, number] | null;
  try {
    const result = projection(inv);
    back = result ? [result[0], result[1]] : null;
  } catch {
    return null;
  }
  if (!back || !isFinite(back[0]) || !isFinite(back[1])) return null;
  if (Math.hypot(back[0] - bx, back[1] - by) > 1) return null;

  return lonLatToGrid(inv[0], inv[1]);
}

/** Shortest signed circular step count from `a` to `b` on a ring of size `size`. */
function circularDelta(a: number, b: number, size: number): number {
  let d = (((b - a) % size) + size) % size;
  if (d > size / 2) d -= size;
  return d;
}

/**
 * Given one lattice edge whose endpoints disagree on validity (one is
 * on-sphere, the other isn't), binary-searches along the screen-space
 * segment between them for the sphere's edge, returning the grid
 * coordinates of the last still-valid point found. This lets a single
 * lattice sample near the horizon (e.g. near a pole, where the sphere
 * boundary can sweep across many grid cells between two adjacent lattice
 * rows) still contribute an accurate bound instead of being dropped.
 */
function refineBoundary(
  projection: GeoProjection,
  vt: ViewTransform,
  a: { sx: number; sy: number; grid: [number, number] | null },
  b: { sx: number; sy: number; grid: [number, number] | null }
): [number, number] | null {
  if (!!a.grid === !!b.grid) return null; // both valid or both invalid: nothing to refine
  let loT = a.grid ? 0 : 1; // t=0 -> a, t=1 -> b; loT stays on the valid side
  let hiT = a.grid ? 1 : 0;
  let best: [number, number] | null = a.grid ?? b.grid;

  for (let iter = 0; iter < 10; iter++) {
    const midT = (loT + hiT) / 2;
    const sx = a.sx + (b.sx - a.sx) * midT;
    const sy = a.sy + (b.sy - a.sy) * midT;
    const g = invertToGrid(projection, vt, sx, sy);
    if (g) {
      best = g;
      loT = midT;
    } else {
      hiT = midT;
    }
  }
  return best;
}

/**
 * Culls the 360x180 grid down to the cells that can possibly be visible
 * under the given projection + ViewTransform, by inverting a 9x9 lattice
 * of viewport sample points (8x8 cells) and taking the padded union of
 * their grid coordinates -- refining across any lattice edge that crosses
 * the sphere's horizon so the bound stays accurate even where the horizon
 * sweeps sharply between two adjacent samples (e.g. near a pole).
 * Antimeridian-straddling views are represented as two disjoint grid-x
 * ranges rather than one wrapping range. Falls back to the full grid when
 * zoomed out (k < 2, where culling wouldn't save much anyway) or when
 * every sample fails to invert.
 */
export function visibleGridBounds(
  projection: GeoProjection,
  vt: ViewTransform,
  width: number,
  height: number
): GridBounds {
  if (vt.k < ZOOM_CULL_THRESHOLD) return FULL_GRID_BOUNDS;

  const n = GRID_BOUNDS_SAMPLES;
  const points: Array<{ sx: number; sy: number; grid: [number, number] | null }> = new Array(
    (n + 1) * (n + 1)
  );
  let anyValid = false;
  let minGy = GRID_HEIGHT - 1;
  let maxGy = 0;

  const trackY = (g: [number, number]) => {
    if (g[1] < minGy) minGy = g[1];
    if (g[1] > maxGy) maxGy = g[1];
  };

  for (let iy = 0; iy <= n; iy++) {
    for (let ix = 0; ix <= n; ix++) {
      const sx = (ix / n) * width;
      const sy = (iy / n) * height;
      const grid = invertToGrid(projection, vt, sx, sy);
      points[iy * (n + 1) + ix] = { sx, sy, grid };
      if (grid) {
        anyValid = true;
        trackY(grid);
      }
    }
  }

  if (!anyValid) return FULL_GRID_BOUNDS;

  const covered = new Uint8Array(GRID_WIDTH);
  const markArc = (gxA: number, gxB: number) => {
    const step = circularDelta(gxA, gxB, GRID_WIDTH);
    const dir = step >= 0 ? 1 : -1;
    const steps = Math.abs(step);
    for (let s = 0; s <= steps; s++) {
      const gx = ((gxA + dir * s) % GRID_WIDTH + GRID_WIDTH) % GRID_WIDTH;
      covered[gx] = 1;
    }
  };

  // Connect every horizontally/vertically adjacent pair of lattice points
  // via the SHORTER circular arc in grid-x space. This is what makes
  // antimeridian straddling "fall out" naturally: two adjacent screen
  // samples that land near opposite edges of the grid (e.g. one at
  // lon ~179, the next at lon ~-179) are connected via the short 2-cell
  // arc across the seam, not the long way around the globe. Edges that
  // cross the sphere's horizon are refined first so the arc reaches all
  // the way to the true (approximate) edge, not just the last sampled
  // point short of it.
  for (let iy = 0; iy <= n; iy++) {
    for (let ix = 0; ix <= n; ix++) {
      const here = points[iy * (n + 1) + ix];
      if (here.grid) {
        covered[here.grid[0]] = 1;
      }

      if (ix < n) {
        const right = points[iy * (n + 1) + ix + 1];
        if (here.grid && right.grid) {
          markArc(here.grid[0], right.grid[0]);
        } else if (here.grid !== null || right.grid !== null) {
          const refined = refineBoundary(projection, vt, here, right);
          const known = here.grid ?? right.grid;
          if (refined && known) {
            markArc(known[0], refined[0]);
            trackY(refined);
          }
        }
      }

      if (iy < n) {
        const down = points[(iy + 1) * (n + 1) + ix];
        if (here.grid && down.grid) {
          markArc(here.grid[0], down.grid[0]);
        } else if (here.grid !== null || down.grid !== null) {
          const refined = refineBoundary(projection, vt, here, down);
          const known = here.grid ?? down.grid;
          if (refined && known) {
            markArc(known[0], refined[0]);
            trackY(refined);
          }
        }
      }
    }
  }

  // Dilate circularly by a small margin to absorb residual float slack and
  // the draw-time cell padding.
  const dilated = new Uint8Array(GRID_WIDTH);
  for (let x = 0; x < GRID_WIDTH; x++) {
    if (!covered[x]) continue;
    for (let d = -GRID_BOUNDS_MARGIN; d <= GRID_BOUNDS_MARGIN; d++) {
      dilated[((x + d) % GRID_WIDTH + GRID_WIDTH) % GRID_WIDTH] = 1;
    }
  }

  const xRanges: Array<[number, number]> = [];
  let runStart = -1;
  for (let x = 0; x < GRID_WIDTH; x++) {
    if (dilated[x]) {
      if (runStart === -1) runStart = x;
    } else if (runStart !== -1) {
      xRanges.push([runStart, x - 1]);
      runStart = -1;
    }
  }
  if (runStart !== -1) xRanges.push([runStart, GRID_WIDTH - 1]);

  const minY = Math.max(0, minGy - GRID_BOUNDS_MARGIN);
  const maxY = Math.min(GRID_HEIGHT - 1, maxGy + GRID_BOUNDS_MARGIN);

  return {
    xRanges: xRanges.length > 0 ? xRanges : FULL_GRID_BOUNDS.xRanges,
    minY,
    maxY,
  };
}
