import * as topojson from "topojson-client";
import { geoContains } from "d3-geo";
import {
  GRID_WIDTH,
  GRID_HEIGHT,
  TOTAL_CELLS,
  gridToLonLat,
  lonLatToGrid,
  getCellAreaKm2,
} from "../../lib/maskCompression";

/**
 * Pure grid operations over Uint8Array(TOTAL_CELLS) masks on the 360x180 1-degree
 * global grid used throughout the range pipeline.
 *
 * Convention for ALL neighbor lookups in this module: longitude WRAPS (x=359 and
 * x=0 are adjacent — this is the walrus/Bering-strait regression case), latitude
 * CLAMPS (a neighbor above row 0 / below row GRID_HEIGHT-1 resolves back to the
 * same row rather than wrapping over the pole).
 */

const EIGHT_NEIGHBOR_OFFSETS: ReadonlyArray<readonly [number, number]> = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

/** Resolve a neighbor cell index, wrapping longitude and clamping latitude. */
function neighborIndex(x: number, y: number, dx: number, dy: number): number {
  const nx = ((x + dx) % GRID_WIDTH + GRID_WIDTH) % GRID_WIDTH;
  const ny = Math.min(GRID_HEIGHT - 1, Math.max(0, y + dy));
  return ny * GRID_WIDTH + nx;
}

function assertGridSize(mask: Uint8Array, label: string): void {
  if (mask.length !== TOTAL_CELLS) {
    throw new Error(`${label}: expected a mask of length ${TOTAL_CELLS}, got ${mask.length}`);
  }
}

/** Single-step 8-neighborhood dilation (includes the cell itself). */
function dilateOnce(mask: Uint8Array): Uint8Array {
  const out = new Uint8Array(TOTAL_CELLS);
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const idx = y * GRID_WIDTH + x;
      if (mask[idx] === 1) {
        out[idx] = 1;
        continue;
      }
      for (const [dx, dy] of EIGHT_NEIGHBOR_OFFSETS) {
        if (mask[neighborIndex(x, y, dx, dy)] === 1) {
          out[idx] = 1;
          break;
        }
      }
    }
  }
  return out;
}

/** Single-step 8-neighborhood erosion (a cell survives only if itself + all 8 neighbors are set). */
function erodeOnce(mask: Uint8Array): Uint8Array {
  const out = new Uint8Array(TOTAL_CELLS);
  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const idx = y * GRID_WIDTH + x;
      if (mask[idx] === 0) {
        out[idx] = 0;
        continue;
      }
      let allSet = true;
      for (const [dx, dy] of EIGHT_NEIGHBOR_OFFSETS) {
        if (mask[neighborIndex(x, y, dx, dy)] === 0) {
          allSet = false;
          break;
        }
      }
      out[idx] = allSet ? 1 : 0;
    }
  }
  return out;
}

/** Morphological dilation, `radius` iterations of the 8-neighborhood structuring element. */
export function dilate(mask: Uint8Array, radius = 1): Uint8Array {
  assertGridSize(mask, "dilate");
  let current: Uint8Array = new Uint8Array(mask);
  for (let i = 0; i < radius; i++) current = dilateOnce(current);
  return current;
}

/** Morphological erosion, `radius` iterations of the 8-neighborhood structuring element. */
export function erode(mask: Uint8Array, radius = 1): Uint8Array {
  assertGridSize(mask, "erode");
  let current: Uint8Array = new Uint8Array(mask);
  for (let i = 0; i < radius; i++) current = erodeOnce(current);
  return current;
}

/** Morphological closing (dilate then erode by the same radius) — fills small holes without growing the mask overall. */
export function close(mask: Uint8Array, radius = 1): Uint8Array {
  assertGridSize(mask, "close");
  return erode(dilate(mask, radius), radius);
}

export type GridComponent = {
  id: number;
  cells: number;
  recordSum: number;
  bbox: [number, number, number, number]; // [minLon, minLat, maxLon, maxLat]
};

export type ConnectedComponentsResult = {
  labels: Int32Array;
  components: GridComponent[];
};

/**
 * 8-connectivity connected components over set cells, longitude-wrapped
 * (adjacency crosses the antimeridian) and latitude-clamped.
 * `counts`, if provided, is summed per-component as `recordSum`; otherwise
 * `recordSum` equals `cells`.
 */
export function connectedComponents(mask: Uint8Array, counts?: Float64Array): ConnectedComponentsResult {
  assertGridSize(mask, "connectedComponents");
  const labels = new Int32Array(TOTAL_CELLS).fill(-1);
  const components: GridComponent[] = [];
  const queue = new Int32Array(TOTAL_CELLS);

  for (let start = 0; start < TOTAL_CELLS; start++) {
    if (mask[start] !== 1 || labels[start] !== -1) continue;

    const id = components.length;
    let qHead = 0;
    let qTail = 0;
    queue[qTail++] = start;
    labels[start] = id;

    let cells = 0;
    let recordSum = 0;
    let minLon = 180;
    let maxLon = -180;
    let minLat = 90;
    let maxLat = -90;

    while (qHead < qTail) {
      const idx = queue[qHead++];
      const x = idx % GRID_WIDTH;
      const y = (idx / GRID_WIDTH) | 0;

      cells += 1;
      recordSum += counts ? counts[idx] : 1;

      const [lon, lat] = gridToLonLat(x, y);
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;

      for (const [dx, dy] of EIGHT_NEIGHBOR_OFFSETS) {
        const nIdx = neighborIndex(x, y, dx, dy);
        if (mask[nIdx] === 1 && labels[nIdx] === -1) {
          labels[nIdx] = id;
          queue[qTail++] = nIdx;
        }
      }
    }

    components.push({ id, cells, recordSum, bbox: [minLon, minLat, maxLon, maxLat] });
  }

  return { labels, components };
}

export type LonLatBox = {
  minLon: number;
  maxLon: number;
  minLat: number;
  maxLat: number;
};

/**
 * Rasterize a set of lon/lat boxes into a mask. A box with minLon > maxLon is
 * interpreted as crossing the antimeridian (e.g. minLon=170, maxLon=-170 covers
 * the 20-degree wedge running east from 170E through 180 to 170W).
 */
export function maskFromBoxes(boxes: LonLatBox[]): Uint8Array {
  const mask = new Uint8Array(TOTAL_CELLS);

  for (const box of boxes) {
    const [minX] = lonLatToGrid(box.minLon, 0);
    const [maxX] = lonLatToGrid(box.maxLon, 0);
    const [, yForMinLat] = lonLatToGrid(0, box.minLat);
    const [, yForMaxLat] = lonLatToGrid(0, box.maxLat);
    const yStart = Math.min(yForMinLat, yForMaxLat);
    const yEnd = Math.max(yForMinLat, yForMaxLat);
    const crossesAntimeridian = box.minLon > box.maxLon;

    for (let y = yStart; y <= yEnd; y++) {
      const rowStart = y * GRID_WIDTH;
      if (crossesAntimeridian) {
        for (let x = minX; x <= GRID_WIDTH - 1; x++) mask[rowStart + x] = 1;
        for (let x = 0; x <= maxX; x++) mask[rowStart + x] = 1;
      } else {
        const xStart = Math.min(minX, maxX);
        const xEnd = Math.max(minX, maxX);
        for (let x = xStart; x <= xEnd; x++) mask[rowStart + x] = 1;
      }
    }
  }

  return mask;
}

export function intersect(a: Uint8Array, b: Uint8Array): Uint8Array {
  assertGridSize(a, "intersect(a)");
  assertGridSize(b, "intersect(b)");
  const out = new Uint8Array(TOTAL_CELLS);
  for (let i = 0; i < TOTAL_CELLS; i++) out[i] = a[i] === 1 && b[i] === 1 ? 1 : 0;
  return out;
}

export function union(a: Uint8Array, b: Uint8Array): Uint8Array {
  assertGridSize(a, "union(a)");
  assertGridSize(b, "union(b)");
  const out = new Uint8Array(TOTAL_CELLS);
  for (let i = 0; i < TOTAL_CELLS; i++) out[i] = a[i] === 1 || b[i] === 1 ? 1 : 0;
  return out;
}

export function subtract(a: Uint8Array, b: Uint8Array): Uint8Array {
  assertGridSize(a, "subtract(a)");
  assertGridSize(b, "subtract(b)");
  const out = new Uint8Array(TOTAL_CELLS);
  for (let i = 0; i < TOTAL_CELLS; i++) out[i] = a[i] === 1 && b[i] !== 1 ? 1 : 0;
  return out;
}

/** Total area in km^2 of all set cells (varies per latitude row). */
export function maskArea(mask: Uint8Array): number {
  assertGridSize(mask, "maskArea");
  let area = 0;
  for (let y = 0; y < GRID_HEIGHT; y++) {
    const cellArea = getCellAreaKm2(y);
    const rowStart = y * GRID_WIDTH;
    for (let x = 0; x < GRID_WIDTH; x++) {
      if (mask[rowStart + x] === 1) area += cellArea;
    }
  }
  return area;
}

export function countCells(mask: Uint8Array): number {
  assertGridSize(mask, "countCells");
  let n = 0;
  for (let i = 0; i < TOTAL_CELLS; i++) n += mask[i];
  return n;
}

/**
 * Downsample a mask (and optional overlay) to a cols x (cols/2) ASCII grid.
 * '#' = mask only, '.' = overlay only, 'O' = both, ' ' = neither.
 */
export function asciiMap(mask: Uint8Array, overlay?: Uint8Array, cols = 90): string {
  assertGridSize(mask, "asciiMap(mask)");
  if (overlay) assertGridSize(overlay, "asciiMap(overlay)");
  const rows = Math.max(1, Math.round(cols / 2));
  const lines: string[] = [];

  for (let r = 0; r < rows; r++) {
    const yStart = Math.floor((r * GRID_HEIGHT) / rows);
    const yEnd = Math.max(yStart + 1, Math.floor(((r + 1) * GRID_HEIGHT) / rows));
    let line = "";

    for (let c = 0; c < cols; c++) {
      const xStart = Math.floor((c * GRID_WIDTH) / cols);
      const xEnd = Math.max(xStart + 1, Math.floor(((c + 1) * GRID_WIDTH) / cols));
      let hasMask = false;
      let hasOverlay = false;

      outer: for (let y = yStart; y < yEnd; y++) {
        const rowStart = y * GRID_WIDTH;
        for (let x = xStart; x < xEnd; x++) {
          const idx = rowStart + x;
          if (mask[idx] === 1) hasMask = true;
          if (overlay && overlay[idx] === 1) hasOverlay = true;
          if (hasMask && (hasOverlay || !overlay)) break outer;
        }
      }

      line += hasMask && hasOverlay ? "O" : hasMask ? "#" : hasOverlay ? "." : " ";
    }

    lines.push(line);
  }

  return lines.join("\n");
}

/**
 * Minimum 8-connectivity (Chebyshev) cell-grid distance, longitude-wrapped,
 * between any set cell of `fromMask` and any set cell of `toMask`. Runs a
 * single multi-source BFS from `fromMask` for O(cells) efficiency. Returns 0
 * if the masks share a set cell, and Infinity if either mask is empty.
 */
export function minCellDistance(fromMask: Uint8Array, toMask: Uint8Array): number {
  assertGridSize(fromMask, "minCellDistance(fromMask)");
  assertGridSize(toMask, "minCellDistance(toMask)");

  const visited = new Uint8Array(TOTAL_CELLS);
  let frontier: number[] = [];

  for (let i = 0; i < TOTAL_CELLS; i++) {
    if (fromMask[i] === 1) {
      visited[i] = 1;
      if (toMask[i] === 1) return 0;
      frontier.push(i);
    }
  }

  if (frontier.length === 0) return Infinity;

  let distance = 0;
  while (frontier.length > 0) {
    distance += 1;
    const next: number[] = [];
    for (const idx of frontier) {
      const x = idx % GRID_WIDTH;
      const y = (idx / GRID_WIDTH) | 0;
      for (const [dx, dy] of EIGHT_NEIGHBOR_OFFSETS) {
        const nIdx = neighborIndex(x, y, dx, dy);
        if (visited[nIdx]) continue;
        visited[nIdx] = 1;
        if (toMask[nIdx] === 1) return distance;
        next.push(nIdx);
      }
    }
    frontier = next;
  }

  return Infinity;
}

export type RealmMasks = {
  landCenter: Uint8Array;
  landTouch: Uint8Array;
  oceanTouch: Uint8Array;
  coastal: Uint8Array;
};

// 3x3 subsample offsets (in degrees) within a 1x1 degree cell, centered on the
// cell center and pushed out to within 0.01 degrees of the cell edge (a 1x1
// cell spans +/-0.5 degrees from center). Catches small islands / thin
// coastline slivers whose cell center falls in open water (or vice versa)
// even at coarse 1:110m Natural Earth resolution — an inner-third offset
// (~0.33 deg) is measurably too tight to catch some real islands (verified:
// Komodo's nearest 1:110m coastline vertex sits ~0.42 deg from its cell
// center), while 0.45 deg still stays strictly inside the cell.
const SUBSAMPLE_EDGE_OFFSET = 0.45;
const SUBSAMPLE_OFFSETS: ReadonlyArray<readonly [number, number]> = [
  [-SUBSAMPLE_EDGE_OFFSET, -SUBSAMPLE_EDGE_OFFSET],
  [0, -SUBSAMPLE_EDGE_OFFSET],
  [SUBSAMPLE_EDGE_OFFSET, -SUBSAMPLE_EDGE_OFFSET],
  [-SUBSAMPLE_EDGE_OFFSET, 0],
  [0, 0],
  [SUBSAMPLE_EDGE_OFFSET, 0],
  [-SUBSAMPLE_EDGE_OFFSET, SUBSAMPLE_EDGE_OFFSET],
  [0, SUBSAMPLE_EDGE_OFFSET],
  [SUBSAMPLE_EDGE_OFFSET, SUBSAMPLE_EDGE_OFFSET],
];

/**
 * Build land/ocean realm masks from a world-atlas countries TopoJSON (e.g.
 * node_modules/world-atlas/countries-110m.json — the recommended input: it
 * resolves the full grid with 3x3 subsampling in ~7s and (verified against
 * this exact bundled dataset) does not exhibit the geoContains ring-winding
 * false-positives that the higher-resolution 10m file does for some small
 * multi-island features. The 50m/10m files are far slower for a full-grid
 * subsampled scan (10-100x, minutes) because geoContains has no internal
 * bbox short-circuit and their per-country polygons carry many more
 * vertices — not a viable drop-in for this routine).
 *
 * - `landCenter`: cell-center geoContains test against land (mirrors the mask
 *   generation already used in buildCuratedSpecies.ts).
 * - `landTouch`: true if ANY of a 3x3 subsample of points within the cell is
 *   on land. Catches most small islands whose cell center misses the polygon
 *   (verified: Komodo ~119.5E,-8.5S is landTouch=1 at 1:110m resolution).
 *   KNOWN LIMITATION: islands entirely absent from the 1:110m simplification
 *   (e.g. Galapagos ~-90.5,-0.5 — confirmed >9 degrees from the nearest
 *   vertex in this dataset) cannot be recovered by subsampling alone and
 *   must be patched via the pipeline's editorial-override mechanism
 *   (speciesRangeOverrides.ts), not faked here.
 * - `oceanTouch`: true if ANY subsample point is NOT on land.
 * - `coastal`: (landTouch AND oceanTouch), dilated by 1 cell.
 */
export function buildRealmMasks(countriesTopo: unknown): RealmMasks {
  const topo = countriesTopo as { objects: { land: unknown; countries: unknown } };
  const landFeature = topojson.feature(topo as never, topo.objects.land as never) as unknown as {
    type: "Feature";
    geometry: { coordinates: unknown };
  };
  const countriesFeature = topojson.feature(topo as never, topo.objects.countries as never) as unknown as {
    features?: Array<{ geometry: { coordinates: unknown } }>;
  };

  const features = countriesFeature.features && countriesFeature.features.length ? countriesFeature.features : [landFeature];

  const featureBboxes = features.map((feat) => {
    let minLon = 180;
    let maxLon = -180;
    let minLat = 90;
    let maxLat = -90;

    const scanCoords = (coords: unknown): void => {
      if (Array.isArray(coords) && typeof coords[0] === "number" && typeof coords[1] === "number") {
        const lon = coords[0] as number;
        const lat = coords[1] as number;
        if (lon < minLon) minLon = lon;
        if (lon > maxLon) maxLon = lon;
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
      } else if (Array.isArray(coords)) {
        for (const c of coords) scanCoords(c);
      }
    };
    scanCoords(feat.geometry.coordinates);

    return { feat, minLon, maxLon, minLat, maxLat };
  });

  function pointOnLand(lon: number, lat: number): boolean {
    for (const { feat, minLon, maxLon, minLat, maxLat } of featureBboxes) {
      if (lon < minLon || lon > maxLon || lat < minLat || lat > maxLat) continue;
      if (geoContains(feat as never, [lon, lat])) return true;
    }
    return false;
  }

  const landCenter = new Uint8Array(TOTAL_CELLS);
  const landTouch = new Uint8Array(TOTAL_CELLS);
  const oceanTouch = new Uint8Array(TOTAL_CELLS);

  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const idx = y * GRID_WIDTH + x;
      const [lon, lat] = gridToLonLat(x, y);

      if (pointOnLand(lon, lat)) landCenter[idx] = 1;

      let anyLand = false;
      let anyOcean = false;
      for (const [dLon, dLat] of SUBSAMPLE_OFFSETS) {
        const sampleLon = lon + dLon;
        const sampleLat = Math.max(-90, Math.min(90, lat + dLat));
        if (pointOnLand(sampleLon, sampleLat)) anyLand = true;
        else anyOcean = true;
        if (anyLand && anyOcean) break;
      }

      landTouch[idx] = anyLand ? 1 : 0;
      oceanTouch[idx] = anyOcean ? 1 : 0;
    }
  }

  const coastal = dilate(intersect(landTouch, oceanTouch), 1);

  return { landCenter, landTouch, oceanTouch, coastal };
}
