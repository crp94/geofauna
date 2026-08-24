import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { evaluatePrediction } from "../lib/scoring";
import { TOTAL_CELLS, GRID_WIDTH, decodeRle, lonLatToGrid } from "../lib/maskCompression";
import { ScoreCalibration, Species } from "../types/species";

const exactRange = new Uint8Array(TOTAL_CELLS);
for (let i = 0; i < 100; i += 1) exactRange[i] = 1;

const perfect = evaluatePrediction(exactRange, exactRange);
assert.equal(perfect.score, 1000, "an exact range must earn the full score");
assert.equal(perfect.grade, "S", "an exact range must earn S");

const empty = evaluatePrediction(new Uint8Array(TOTAL_CELLS), exactRange);
assert.equal(empty.score, 0, "an empty prediction must not score");
assert.equal(empty.grade, "D", "an empty prediction must receive D");

const halfRange = new Uint8Array(TOTAL_CELLS);
for (let i = 0; i < 50; i += 1) halfRange[i] = 1;
const half = evaluatePrediction(halfRange, exactRange);
assert.ok(half.score > empty.score && half.score < perfect.score, "partial overlap must score between empty and exact");

const adjacentRange = new Uint8Array(TOTAL_CELLS);
for (let i = 0; i < 100; i += 1) adjacentRange[i + 360] = 1;
const adjacent = evaluatePrediction(adjacentRange, exactRange);
assert.ok(adjacent.iou === 0 && adjacent.score < 350, "a nearby zero-overlap guess must remain below C");
assert.ok(adjacent.meanMissDistanceKm > 0, "near-miss feedback must report a positive distance");
assert.ok(half.score > adjacent.score, "direct overlap must outrank an equally sized adjacent guess");

// --- Calibration pass-through: perfect/empty predictions are unaffected ---
const sampleCalibration: ScoreCalibration = {
  version: 1,
  baselineIoU: 0.2,
  attainableIoU: 0.7,
  baselines: {
    bbox: 0.2,
    continent: 0.2,
    centroid250: 0.2,
    centroid500: 0.2,
    centroid1000: 0.2,
    centroid2000: 0.2,
  },
};

const perfectWithCalibration = evaluatePrediction(exactRange, exactRange, sampleCalibration);
assert.equal(perfectWithCalibration.score, 1000, "an exact range must earn the full score even with calibration");
assert.equal(perfectWithCalibration.grade, "S", "an exact range must earn S even with calibration");

const emptyWithCalibration = evaluatePrediction(new Uint8Array(TOTAL_CELLS), exactRange, sampleCalibration);
assert.equal(emptyWithCalibration.score, 0, "an empty prediction must not score even with calibration");
assert.equal(emptyWithCalibration.grade, "D", "an empty prediction must receive D even with calibration");

// --- Calibration must be able to raise a score relative to the raw IoU ---
const smallGroundTruth = new Uint8Array(TOTAL_CELLS);
for (let i = 0; i < 20; i += 1) smallGroundTruth[i] = 1;
const partialGuess = new Uint8Array(TOTAL_CELLS);
for (let i = 0; i < 10; i += 1) partialGuess[i] = 1;

const favorableCalibration: ScoreCalibration = {
  version: 1,
  baselineIoU: 0.05,
  attainableIoU: 0.5,
  baselines: {
    bbox: 0.05,
    continent: 0.05,
    centroid250: 0.05,
    centroid500: 0.05,
    centroid1000: 0.05,
    centroid2000: 0.05,
  },
};

const uncalibratedPartial = evaluatePrediction(partialGuess, smallGroundTruth);
const calibratedPartial = evaluatePrediction(partialGuess, smallGroundTruth, favorableCalibration);
assert.ok(
  calibratedPartial.score > uncalibratedPartial.score,
  "a favorable calibration must raise the score for an identical partial-overlap guess"
);
assert.ok(!uncalibratedPartial.calibrationApplied, "calibration must not be marked applied when omitted");
assert.equal(calibratedPartial.calibrationApplied, true, "calibration must be marked applied when valid");

// --- Catalog sweep: the trivial bbox-fill strategy must stay at/below mid-B ---
// once a species carries build-time calibration anchors. Species without
// range.calibration yet (the pipeline lands in a later wave) are skipped.
const catalogPath = path.resolve(__dirname, "../data/curated-species.json");
const catalog: Species[] = JSON.parse(fs.readFileSync(catalogPath, "utf-8"));

let calibratedChecked = 0;
let calibratedSkipped = 0;
for (const species of catalog) {
  const calibration = species.range.calibration;
  if (!calibration) {
    calibratedSkipped += 1;
    continue;
  }
  calibratedChecked += 1;

  const groundTruth = decodeRle(species.range.rleMask);
  const [minLon, minLat, maxLon, maxLat] = species.range.bounds;
  const [minX, maxY] = lonLatToGrid(minLon, minLat);
  const [maxX, minY] = lonLatToGrid(maxLon, maxLat);
  const xStart = Math.min(minX, maxX);
  const xEnd = Math.max(minX, maxX);
  const yStart = Math.min(minY, maxY);
  const yEnd = Math.max(minY, maxY);

  const bboxGuess = new Uint8Array(TOTAL_CELLS);
  for (let y = yStart; y <= yEnd; y += 1) {
    for (let x = xStart; x <= xEnd; x += 1) {
      bboxGuess[y * GRID_WIDTH + x] = 1;
    }
  }

  const bboxResult = evaluatePrediction(bboxGuess, groundTruth, calibration);
  assert.ok(
    bboxResult.score <= 600,
    `bbox-baseline guess for "${species.id}" must stay at/below mid-B once calibrated (score=${bboxResult.score})`
  );
}
console.log(
  `Catalog calibration sweep: checked ${calibratedChecked}, skipped ${calibratedSkipped} (no range.calibration yet) of ${catalog.length} species.`
);

console.log("Game-logic checks passed.");
