import assert from "node:assert/strict";
import {
  calibrateIou,
  isValidCalibration,
  computeAreaWeightedIoU,
  dilateMask,
  areaWeightedCentroid,
} from "../lib/calibration";
import { evaluatePrediction } from "../lib/scoring";
import {
  GRID_WIDTH,
  TOTAL_CELLS,
  lonLatToGrid,
  gridToLonLat,
} from "../lib/maskCompression";
import { ScoreCalibration } from "../types/species";

// Deterministic seeded LCG (Numerical Recipes constants) — no Math.random,
// so fuzz failures reproduce exactly across runs.
function makeLcg(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function makeCalibration(baselineIoU: number, attainableIoU: number): ScoreCalibration {
  return {
    version: 1,
    baselineIoU,
    attainableIoU,
    baselines: {
      bbox: baselineIoU,
      continent: baselineIoU,
      centroid250: baselineIoU,
      centroid500: baselineIoU,
      centroid1000: baselineIoU,
      centroid2000: baselineIoU,
    },
  };
}

function maskFromCells(cells: Array<[number, number]>): Uint8Array {
  const mask = new Uint8Array(TOTAL_CELLS);
  for (const [x, y] of cells) mask[y * GRID_WIDTH + x] = 1;
  return mask;
}

function countOnes(mask: Uint8Array): number {
  let count = 0;
  for (let i = 0; i < mask.length; i += 1) count += mask[i];
  return count;
}

// --- Fixed points for a valid calibration (b=0.2, a=0.7) ---
const fixedCal = makeCalibration(0.2, 0.7);
const FIXED_TOL = 1e-9;
assert.ok(Math.abs(calibrateIou(0, fixedCal) - 0) < FIXED_TOL, "cal(0) must be 0");
assert.ok(Math.abs(calibrateIou(0.2, fixedCal) - 0.35) < FIXED_TOL, "cal(b) must be 0.35");
assert.ok(Math.abs(calibrateIou(0.7, fixedCal) - 0.9) < FIXED_TOL, "cal(a) must be 0.90");
assert.ok(Math.abs(calibrateIou(1, fixedCal) - 1) < FIXED_TOL, "cal(1) must be 1");

// --- Monotonic non-decreasing over [0,1] for 50 fuzzed valid anchor pairs ---
const rand = makeLcg(20260824);
for (let trial = 0; trial < 50; trial += 1) {
  const b = 0.02 + rand() * 0.78; // within [0.02, 0.80]
  const maxA = 0.98;
  const a = Math.min(maxA, b + 0.05 + rand() * Math.max(0, maxA - b - 0.05));
  const fuzzCal = makeCalibration(b, a);
  assert.ok(isValidCalibration(fuzzCal), `generated fuzz calibration must be valid (b=${b}, a=${a})`);

  let prev = -Infinity;
  for (let i = 0; i <= 200; i += 1) {
    const u = i / 200;
    const v = calibrateIou(u, fuzzCal);
    assert.ok(
      v >= prev - 1e-12,
      `calibrateIou must be non-decreasing at u=${u} for b=${b}, a=${a} (got ${v} after ${prev})`
    );
    prev = v;
  }
}

// --- Identity fallback when calibration is undefined/invalid ---
assert.equal(calibrateIou(0.42, undefined), 0.42, "undefined calibration must be identity");
assert.equal(
  calibrateIou(0.42, makeCalibration(0.5, 0.4)),
  0.42,
  "an inverted anchor pair (b >= a) must be identity"
);
assert.equal(
  calibrateIou(0.42, { ...makeCalibration(0.2, 0.7), version: 2 as unknown as 1 }),
  0.42,
  "version !== 1 must be identity"
);
assert.equal(
  calibrateIou(0.42, makeCalibration(NaN, 0.7)),
  0.42,
  "a NaN baseline must be identity"
);

// --- computeAreaWeightedIoU agrees with evaluatePrediction().iou/100 ---
const iouCases: Array<[Uint8Array, Uint8Array]> = [
  [
    maskFromCells([[10, 10], [11, 10], [12, 10]]),
    maskFromCells([[10, 10], [11, 10], [12, 10]]),
  ], // identical masks
  [
    maskFromCells([[10, 10], [11, 10], [12, 10]]),
    maskFromCells([[11, 10], [12, 10], [13, 10]]),
  ], // partial overlap
  [maskFromCells([[10, 10]]), maskFromCells([[50, 50]])], // disjoint masks
];
for (const [a, b] of iouCases) {
  const direct = computeAreaWeightedIoU(a, b);
  const viaEval = evaluatePrediction(a, b).iou / 100;
  assert.ok(
    Math.abs(direct - viaEval) < 1e-6,
    `computeAreaWeightedIoU must match evaluatePrediction IoU (${direct} vs ${viaEval})`
  );
}

// --- dilateMask ---
const [equatorX, equatorY] = lonLatToGrid(0.5, -0.5); // near-equatorial cell
const singleCell = maskFromCells([[equatorX, equatorY]]);
const dilated150 = dilateMask(singleCell, 150);

for (let i = 0; i < TOTAL_CELLS; i += 1) {
  assert.ok(
    !(singleCell[i] === 1 && dilated150[i] !== 1),
    "dilateMask result must be a superset of the original mask"
  );
}

const neighborOffsets: Array<[number, number]> = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
for (const [dx, dy] of neighborOffsets) {
  const nx = (equatorX + dx + GRID_WIDTH) % GRID_WIDTH;
  const ny = equatorY + dy;
  assert.equal(
    dilated150[ny * GRID_WIDTH + nx],
    1,
    `equatorial 150km dilation must cover the 4-neighbor at (${nx},${ny}), ~111km away`
  );
}

const dilated50 = dilateMask(singleCell, 50);
const dilated300 = dilateMask(singleCell, 300);
assert.ok(
  countOnes(dilated50) <= countOnes(dilated150),
  "dilateMask must grow monotonically with km (50 <= 150)"
);
assert.ok(
  countOnes(dilated150) <= countOnes(dilated300),
  "dilateMask must grow monotonically with km (150 <= 300)"
);
assert.ok(countOnes(dilated50) >= 1, "dilateMask at any km must still include the seed cell");

// --- areaWeightedCentroid ---
const emptyCentroid = areaWeightedCentroid(new Uint8Array(TOTAL_CELLS));
assert.equal(emptyCentroid, null, "an empty mask must produce a null centroid");

const [cellX, cellY] = lonLatToGrid(12.4, 45.6);
const singleCentroidMask = maskFromCells([[cellX, cellY]]);
const centroid = areaWeightedCentroid(singleCentroidMask);
assert.ok(centroid !== null, "a non-empty mask must produce a centroid");
if (centroid) {
  const [expectedLon, expectedLat] = gridToLonLat(cellX, cellY);
  assert.ok(
    Math.abs(centroid[0] - expectedLon) < 1e-6,
    `single-cell centroid lon must equal the cell center (${centroid[0]} vs ${expectedLon})`
  );
  assert.ok(
    Math.abs(centroid[1] - expectedLat) < 1e-6,
    `single-cell centroid lat must equal the cell center (${centroid[1]} vs ${expectedLat})`
  );
}

// Antimeridian straddle: cells at lon ~179.5 and ~-179.5, same latitude.
// A naive longitude average would collapse toward 0; the 3D unit-vector mean
// must instead stay near +/-180.
const [xEast, yLat] = lonLatToGrid(179.5, 0.5);
const [xWest] = lonLatToGrid(-179.5, 0.5);
const antimeridianMask = maskFromCells([
  [xEast, yLat],
  [xWest, yLat],
]);
const antimeridianCentroid = areaWeightedCentroid(antimeridianMask);
assert.ok(antimeridianCentroid !== null, "an antimeridian-straddling mask must produce a centroid");
if (antimeridianCentroid) {
  const [amLon] = antimeridianCentroid;
  assert.ok(
    Math.abs(amLon) > 90,
    `antimeridian-straddling centroid must not collapse toward lon 0 (got ${amLon})`
  );
  assert.ok(
    Math.abs(Math.abs(amLon) - 180) < 1,
    `antimeridian-straddling centroid lon must be close to +/-180 (got ${amLon})`
  );
}

console.log("Calibration checks passed.");
