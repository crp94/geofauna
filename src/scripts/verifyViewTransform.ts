import assert from "node:assert/strict";
import { geoRobinson } from "d3-geo-projection";
import { GeoProjection } from "d3-geo";
import {
  ViewTransform,
  IDENTITY,
  baseToScreen,
  screenToBase,
  zoomAtPoint,
  panBy,
  pinchUpdate,
  clampView,
  composeDelta,
} from "../lib/viewTransform";
import {
  buildCellGeometry,
  visibleGridBounds,
  GridBounds,
} from "../lib/mapRenderer";
import { createRobinsonProjection } from "../lib/projection";
import { GRID_WIDTH, GRID_HEIGHT, TOTAL_CELLS, gridToLonLat } from "../lib/maskCompression";

// ---------------------------------------------------------------------------
// Deterministic PRNG (LCG) -- no Math.random anywhere in this file.
// ---------------------------------------------------------------------------
function makeLcg(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function randRange(rand: () => number, lo: number, hi: number): number {
  return lo + rand() * (hi - lo);
}

function randVt(rand: () => number, kMin = 0.2, kMax = 50, panMax = 2000): ViewTransform {
  return {
    k: randRange(rand, kMin, kMax),
    tx: randRange(rand, -panMax, panMax),
    ty: randRange(rand, -panMax, panMax),
  };
}

const rand = makeLcg(0xc0ffee);

// ---------------------------------------------------------------------------
// 1. baseToScreen ∘ screenToBase === identity
// ---------------------------------------------------------------------------
{
  const TOL = 1e-9;
  for (let i = 0; i < 1000; i++) {
    const vt = randVt(rand);
    const sx = randRange(rand, -5000, 5000);
    const sy = randRange(rand, -5000, 5000);

    const base = screenToBase(vt, sx, sy);
    const back = baseToScreen(vt, base[0], base[1]);

    assert.ok(
      Math.abs(back[0] - sx) < TOL && Math.abs(back[1] - sy) < TOL,
      `round-trip failed for vt=${JSON.stringify(vt)} point=(${sx},${sy}) -> (${back[0]},${back[1]})`
    );
  }
  console.log("[1/8] baseToScreen <-> screenToBase round-trip (1000 fuzzed) passed.");
}

// ---------------------------------------------------------------------------
// 2. zoomAtPoint keeps the anchor fixed; zoomAtPoint(2) . zoomAtPoint(0.5) ~= identity
// ---------------------------------------------------------------------------
{
  const TOL = 1e-9;
  for (let i = 0; i < 500; i++) {
    const vt = randVt(rand);
    const cx = randRange(rand, -1000, 1000);
    const cy = randRange(rand, -1000, 1000);
    const factor = randRange(rand, 0.05, 20);

    const zoomed = zoomAtPoint(vt, factor, cx, cy);

    // The base-space point under the anchor must be unchanged.
    const baseBefore = screenToBase(vt, cx, cy);
    const baseAfter = screenToBase(zoomed, cx, cy);
    assert.ok(
      Math.abs(baseBefore[0] - baseAfter[0]) < TOL && Math.abs(baseBefore[1] - baseAfter[1]) < TOL,
      `zoomAtPoint anchor drifted: before=${baseBefore} after=${baseAfter}`
    );
  }

  for (let i = 0; i < 500; i++) {
    const vt = randVt(rand);
    const cx = randRange(rand, -1000, 1000);
    const cy = randRange(rand, -1000, 1000);

    const roundTrip = zoomAtPoint(zoomAtPoint(vt, 2, cx, cy), 0.5, cx, cy);
    assert.ok(Math.abs(roundTrip.k - vt.k) < 1e-6, `k drifted after 2x/0.5x: ${roundTrip.k} vs ${vt.k}`);
    assert.ok(Math.abs(roundTrip.tx - vt.tx) < 1e-6, `tx drifted after 2x/0.5x: ${roundTrip.tx} vs ${vt.tx}`);
    assert.ok(Math.abs(roundTrip.ty - vt.ty) < 1e-6, `ty drifted after 2x/0.5x: ${roundTrip.ty} vs ${vt.ty}`);
  }
  console.log("[2/8] zoomAtPoint anchor invariant + 2x/0.5x composition passed.");
}

// ---------------------------------------------------------------------------
// 3. pinchUpdate keeps the centroid fixed and scales k by the distance ratio
// ---------------------------------------------------------------------------
{
  const TOL = 1e-7;
  for (let i = 0; i < 500; i++) {
    const vt = randVt(rand);
    const prev: [[number, number], [number, number]] = [
      [randRange(rand, -500, 500), randRange(rand, -500, 500)],
      [randRange(rand, -500, 500), randRange(rand, -500, 500)],
    ];
    const next: [[number, number], [number, number]] = [
      [prev[0][0] + randRange(rand, -200, 200), prev[0][1] + randRange(rand, -200, 200)],
      [prev[1][0] + randRange(rand, -200, 200), prev[1][1] + randRange(rand, -200, 200)],
    ];

    const prevDist = Math.hypot(prev[1][0] - prev[0][0], prev[1][1] - prev[0][1]);
    if (prevDist < 1e-3) continue; // covered by the degenerate case below
    const nextDist = Math.hypot(next[1][0] - next[0][0], next[1][1] - next[0][1]);
    const expectedRatio = nextDist / prevDist;

    const updated = pinchUpdate(vt, prev, next);
    assert.ok(
      Math.abs(updated.k / vt.k - expectedRatio) < 1e-6,
      `pinch ratio mismatch: got ${updated.k / vt.k}, expected ${expectedRatio}`
    );

    // The base point that was under the previous centroid must land on the
    // next centroid under the updated transform.
    const prevCentroid: [number, number] = [(prev[0][0] + prev[1][0]) / 2, (prev[0][1] + prev[1][1]) / 2];
    const nextCentroid: [number, number] = [(next[0][0] + next[1][0]) / 2, (next[0][1] + next[1][1]) / 2];
    const basePt = screenToBase(vt, prevCentroid[0], prevCentroid[1]);
    const mapped = baseToScreen(updated, basePt[0], basePt[1]);
    assert.ok(
      Math.abs(mapped[0] - nextCentroid[0]) < TOL && Math.abs(mapped[1] - nextCentroid[1]) < TOL,
      `pinch centroid drifted: mapped=${mapped} expected=${nextCentroid}`
    );
  }

  // Degenerate pinch: zero previous finger distance must not blow up / NaN,
  // and must behave as a pure centroid pan (ratio 1).
  for (let i = 0; i < 50; i++) {
    const vt = randVt(rand);
    const p: [number, number] = [randRange(rand, -500, 500), randRange(rand, -500, 500)];
    const prev: [[number, number], [number, number]] = [p, p];
    const next: [[number, number], [number, number]] = [
      [p[0] + randRange(rand, -100, 100), p[1] + randRange(rand, -100, 100)],
      [p[0] + randRange(rand, -100, 100), p[1] + randRange(rand, -100, 100)],
    ];
    const updated = pinchUpdate(vt, prev, next);
    assert.ok(isFinite(updated.k) && isFinite(updated.tx) && isFinite(updated.ty), "degenerate pinch produced non-finite transform");
    assert.ok(Math.abs(updated.k - vt.k) < 1e-9, "degenerate pinch (zero prev distance) must not change zoom");
  }
  console.log("[3/8] pinchUpdate centroid + ratio invariants (incl. degenerate pinch) passed.");
}

// ---------------------------------------------------------------------------
// 4. clampView: k clamped to [1, 32]; sphere-overlap invariant after extreme pans
// ---------------------------------------------------------------------------
{
  const width = 900;
  const height = 480;
  const sphereBounds: [number, number, number, number] = [40, 30, 860, 450];

  for (let i = 0; i < 500; i++) {
    const vt = randVt(rand, 0.01, 200, 1_000_000);
    const clamped = clampView(vt, width, height, sphereBounds);

    assert.ok(clamped.k >= 1 - 1e-9 && clamped.k <= 32 + 1e-9, `k not clamped to [1,32]: ${clamped.k}`);

    const [x0, y0, x1, y1] = sphereBounds;
    const sx0 = clamped.k * x0 + clamped.tx;
    const sx1 = clamped.k * x1 + clamped.tx;
    const sy0 = clamped.k * y0 + clamped.ty;
    const sy1 = clamped.k * y1 + clamped.ty;

    const overlapX = Math.min(sx1, width) - Math.max(sx0, 0);
    const overlapY = Math.min(sy1, height) - Math.max(sy0, 0);
    const spanX = sx1 - sx0;
    const spanY = sy1 - sy0;
    const minOverlapX = 0.25 * Math.min(spanX, width);
    const minOverlapY = 0.25 * Math.min(spanY, height);

    assert.ok(overlapX >= minOverlapX - 1e-6, `x overlap invariant violated: ${overlapX} < ${minOverlapX}`);
    assert.ok(overlapY >= minOverlapY - 1e-6, `y overlap invariant violated: ${overlapY} < ${minOverlapY}`);
  }

  // Explicit custom min/max K options are respected.
  const custom = clampView({ k: 999, tx: 0, ty: 0 }, width, height, sphereBounds, { minK: 2, maxK: 10 });
  assert.equal(custom.k, 10, "custom maxK not respected");
  const custom2 = clampView({ k: 0.001, tx: 0, ty: 0 }, width, height, sphereBounds, { minK: 2, maxK: 10 });
  assert.equal(custom2.k, 2, "custom minK not respected");

  console.log("[4/8] clampView k-range + sphere-overlap invariant (500 fuzzed extreme pans) passed.");
}

// ---------------------------------------------------------------------------
// 5. composeDelta: applying Δ to settled-space coords equals current-space coords
// ---------------------------------------------------------------------------
{
  const TOL = 1e-6;
  for (let i = 0; i < 500; i++) {
    const current = randVt(rand);
    const settled = randVt(rand);
    const p: [number, number] = [randRange(rand, -1000, 1000), randRange(rand, -1000, 1000)];

    const settledScreen = baseToScreen(settled, p[0], p[1]);
    const delta = composeDelta(current, settled);
    const deltaApplied = baseToScreen(delta, settledScreen[0], settledScreen[1]);
    const currentScreen = baseToScreen(current, p[0], p[1]);

    assert.ok(
      Math.abs(deltaApplied[0] - currentScreen[0]) < TOL && Math.abs(deltaApplied[1] - currentScreen[1]) < TOL,
      `composeDelta mismatch: delta-applied=${deltaApplied} expected=${currentScreen}`
    );
  }

  // Identity settled -> delta === current.
  const current = randVt(rand);
  const delta = composeDelta(current, IDENTITY);
  assert.ok(Math.abs(delta.k - current.k) < 1e-9 && Math.abs(delta.tx - current.tx) < 1e-9 && Math.abs(delta.ty - current.ty) < 1e-9);

  console.log("[5/8] composeDelta settled->current mapping (500 fuzzed) passed.");
}

// ---------------------------------------------------------------------------
// 6. Paint-correctness proof: projection -> baseToScreen -> screenToBase -> invert
//    round-trips within 0.01 degrees, for real Robinson projection + fuzzed transforms.
// ---------------------------------------------------------------------------
{
  const width = 900;
  const height = 480;
  const { projection } = createRobinsonProjection(width, height);
  const TOL_DEG = 0.01;
  let checked = 0;

  for (let i = 0; i < 200; i++) {
    const lon = randRange(rand, -179, 179);
    const lat = randRange(rand, -85, 85); // avoid extreme polar numerical edge cases
    const vt = randVt(rand, 1, 32, 400);

    const basePt = projection([lon, lat]);
    if (!basePt) continue;

    const screenPt = baseToScreen(vt, basePt[0], basePt[1]);
    const backBase = screenToBase(vt, screenPt[0], screenPt[1]);
    const inv = projection.invert ? projection.invert(backBase) : null;
    if (!inv) continue;

    let dLon = Math.abs(inv[0] - lon);
    if (dLon > 180) dLon = 360 - dLon; // antimeridian-safe angular distance
    const dLat = Math.abs(inv[1] - lat);

    assert.ok(dLon < TOL_DEG, `paint round-trip lon drift too large: ${dLon} (lon=${lon}, lat=${lat})`);
    assert.ok(dLat < TOL_DEG, `paint round-trip lat drift too large: ${dLat} (lon=${lon}, lat=${lat})`);
    checked++;
  }

  assert.ok(checked > 150, `too few valid paint round-trip samples: ${checked}/200`);
  console.log(`[6/8] paint-correctness round-trip proof (${checked}/200 fuzzed points) passed.`);
}

// ---------------------------------------------------------------------------
// 7. visibleGridBounds: superset check -- every cell whose padded projected
//    rect intersects the viewport must be contained in the returned bounds.
// ---------------------------------------------------------------------------
function xInRanges(x: number, ranges: Array<[number, number]>): boolean {
  return ranges.some(([a, b]) => x >= a && x <= b);
}

function checkSupersetForProjection(
  label: string,
  projection: GeoProjection,
  width: number,
  height: number,
  vtSamples: ViewTransform[]
): { straddled: boolean } {
  const geometry = buildCellGeometry(projection);
  const SCREEN_PAD = 3; // small screen-space slack mirroring draw-time cell padding
  let straddled = false;

  for (const vt of vtSamples) {
    const bounds: GridBounds = visibleGridBounds(projection, vt, width, height);
    if (bounds.xRanges.length >= 2) straddled = true;

    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        const idx = y * GRID_WIDTH + x;
        if (geometry.valid[idx] === 0) continue;

        const base = idx * 4;
        const cx = geometry.rects[base];
        const cy = geometry.rects[base + 1];
        const rawW = geometry.rects[base + 2];
        const rawH = geometry.rects[base + 3];

        const screenCx = vt.k * cx + vt.tx;
        const screenCy = vt.k * cy + vt.ty;
        const screenW = vt.k * rawW + SCREEN_PAD;
        const screenH = vt.k * rawH + SCREEN_PAD;

        const left = screenCx - screenW / 2;
        const right = screenCx + screenW / 2;
        const top = screenCy - screenH / 2;
        const bottom = screenCy + screenH / 2;

        const intersectsViewport = right >= 0 && left <= width && bottom >= 0 && top <= height;
        if (!intersectsViewport) continue;

        const inBounds = y >= bounds.minY && y <= bounds.maxY && xInRanges(x, bounds.xRanges);
        assert.ok(
          inBounds,
          `[${label}] visibleGridBounds missed a visible cell: (x=${x}, y=${y}) vt=${JSON.stringify(vt)} bounds=${JSON.stringify(bounds)}`
        );
      }
    }
  }
  return { straddled };
}

{
  const width = 900;
  const height = 480;
  const { projection } = createRobinsonProjection(width, height);
  const sphereBounds: [number, number, number, number] = [40, 30, 860, 450];

  const vtSamples: ViewTransform[] = [];
  // A handful of trivial low-zoom cases (must trivially pass via full-grid fallback).
  for (let i = 0; i < 5; i++) vtSamples.push(clampView(randVt(rand, 0.1, 1.9, 500), width, height, sphereBounds));
  // Generic fuzzed zoomed-in viewports.
  for (let i = 0; i < 30; i++) vtSamples.push(clampView(randVt(rand, 2, 32, 2000), width, height, sphereBounds));
  // A few raw, unclamped extreme transforms for extra robustness.
  for (let i = 0; i < 10; i++) vtSamples.push(randVt(rand, 2, 32, 5000));

  checkSupersetForProjection("unrotated", projection, width, height, vtSamples);
  console.log(`[7/8a] visibleGridBounds superset check (${vtSamples.length} fuzzed transforms, unrotated projection) passed.`);
}

// Antimeridian-straddling case: build a Robinson projection rotated 180 deg
// so the seam (lon +/-180) sits at the map's own center, then deliberately
// zoom into that center -- this must yield a genuine two-range xRanges
// result, and the superset property must still hold there.
{
  const width = 900;
  const height = 480;
  const padding = Math.max(10, Math.min(width, height) * 0.03);
  const mapWidth = Math.max(100, width - padding * 2);
  const mapHeight = Math.max(50, height - padding * 2);
  const rotatedProjection = (geoRobinson() as GeoProjection)
    .rotate([180, 0, 0])
    .fitSize([mapWidth, mapHeight], { type: "Sphere" } as any)
    .translate([width / 2, height / 2]);

  const vtSamples: ViewTransform[] = [];
  // Deliberately center the zoom on the map's own center (where the seam
  // now sits after the 180 degree rotation) at several zoom levels.
  for (const k of [2, 4, 8, 16, 24]) {
    vtSamples.push({ k, tx: width / 2 - k * (width / 2), ty: height / 2 - k * (height / 2) });
  }
  // Plus some fuzzed jitter around the center.
  for (let i = 0; i < 20; i++) {
    const k = randRange(rand, 2, 30);
    const jitterX = randRange(rand, -30, 30);
    const jitterY = randRange(rand, -20, 20);
    vtSamples.push({ k, tx: width / 2 - k * (width / 2) + jitterX, ty: height / 2 - k * (height / 2) + jitterY });
  }

  const { straddled } = checkSupersetForProjection("rotated-antimeridian", rotatedProjection, width, height, vtSamples);
  assert.ok(straddled, "expected at least one deliberately-centered sample to produce a two-range (antimeridian) result");
  console.log(`[7/8b] visibleGridBounds superset check (${vtSamples.length} fuzzed transforms, antimeridian-straddling) passed.`);
}

// "Inversion fails everywhere" fallback: a projection whose invert() always
// returns null must yield the full grid at any zoom >= the cull threshold.
{
  const fakeProjection = { invert: () => null } as unknown as GeoProjection;
  const bounds = visibleGridBounds(fakeProjection, { k: 10, tx: 0, ty: 0 }, 900, 480);
  assert.deepEqual(bounds.xRanges, [[0, GRID_WIDTH - 1]]);
  assert.equal(bounds.minY, 0);
  assert.equal(bounds.maxY, GRID_HEIGHT - 1);
  console.log("[8/8] visibleGridBounds full-grid fallback on total inversion failure passed.");
}

// Sanity: buildCellGeometry produces the documented shape.
{
  const { projection } = createRobinsonProjection(900, 480);
  const geometry = buildCellGeometry(projection);
  assert.equal(geometry.rects.length, TOTAL_CELLS * 4);
  assert.equal(geometry.valid.length, TOTAL_CELLS);
  let validCount = 0;
  for (let i = 0; i < TOTAL_CELLS; i++) if (geometry.valid[i]) validCount++;
  // Robinson is defined everywhere on the sphere; virtually all cells should project validly.
  assert.ok(validCount > TOTAL_CELLS * 0.95, `unexpectedly few valid cells: ${validCount}/${TOTAL_CELLS}`);
  // Spot-check gridToLonLat is being used consistently (cell 0 is near the NW corner).
  const [lon0, lat0] = gridToLonLat(0, 0);
  assert.ok(lon0 < -179 && lat0 > 89, `unexpected corner cell lon/lat: ${lon0}, ${lat0}`);
}

console.log("View-transform checks passed.");
