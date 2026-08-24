import {
  GRID_WIDTH,
  GRID_HEIGHT,
  TOTAL_CELLS,
  getCellAreaKm2,
  gridToLonLat,
  haversineDistanceKm,
} from "./maskCompression";
import { calibrateIou, isValidCalibration } from "./calibration";
import { ScoreCalibration, ScoreResult } from "../types/species";

/**
 * Evaluates a prediction against the current playable range mask.
 * All overlap metrics are integrated on a sphere using exact 1° cell areas.
 * A bounded, symmetric geodesic proximity measure is reported for feedback and
 * contributes only 15% of the score, so painting a nearby continent cannot
 * substitute for matching the range.
 */
export function evaluatePrediction(
  predictedMask: Uint8Array,
  groundTruthMask: Uint8Array,
  calibration?: ScoreCalibration
): ScoreResult {
  let tpArea = 0;
  let fpArea = 0;
  let fnArea = 0;
  let gtTotalArea = 0;
  let predTotalArea = 0;

  for (let y = 0; y < GRID_HEIGHT; y++) {
    const cellArea = getCellAreaKm2(y);

    for (let x = 0; x < GRID_WIDTH; x++) {
      const idx = y * GRID_WIDTH + x;
      const pred = predictedMask[idx] === 1;
      const gt = groundTruthMask[idx] === 1;

      if (gt) {
        gtTotalArea += cellArea;
      }
      if (pred) {
        predTotalArea += cellArea;
      }

      if (pred && gt) {
        tpArea += cellArea;
      } else if (pred && !gt) {
        fpArea += cellArea;
      } else if (!pred && gt) {
        fnArea += cellArea;
      }
    }
  }

  // Pure IoU and Dice
  const unionArea = tpArea + fpArea + fnArea;
  const iou = unionArea > 0 ? (tpArea / unionArea) * 100 : 0;
  const dice =
    tpArea + fpArea + fnArea > 0
      ? ((2 * tpArea) / (2 * tpArea + fpArea + fnArea)) * 100
      : 0;
  const precision = predTotalArea > 0 ? (tpArea / predTotalArea) * 100 : 0;
  const recall = gtTotalArea > 0 ? (tpArea / gtTotalArea) * 100 : 0;

  const proximity = calculateSymmetricProximity(predictedMask, groundTruthMask, fpArea, fnArea);

  // Composite Score (0 - 1000 points)
  // IoU is the primary signal. Precision and recall discourage both overpainting
  // and underpainting; proximity gives a deliberately small near-miss allowance.
  // The weights sum to 1 for a perfect prediction, so 1000 / S is attainable.
  const calibrationValid = isValidCalibration(calibration);
  let rawScore = 0;
  let calibratedIou: number | undefined;
  let calibrationApplied = false;
  if (predTotalArea === 0) {
    rawScore = 0;
  } else {
    const iouFraction = iou / 100;
    const precisionFraction = precision / 100;
    const recallFraction = recall / 100;
    // IoU already penalises omission and overreach. Keeping it dominant makes
    // the score interpretable; the distance term only rewards genuinely close
    // boundaries and is never enough to raise a zero-overlap guess above D.
    if (calibrationValid) {
      // Difficulty-calibrated path: raw IoU is remapped through the
      // per-species anchors before entering the composite, so the same
      // grade thresholds mean the same thing for an endemic and a continental
      // range. Byte-identical to the uncalibrated path when omitted/invalid.
      const calFraction = calibrateIou(iouFraction, calibration);
      rawScore = Math.min(
        1000,
        Math.max(0, Math.round((0.85 * calFraction + 0.15 * proximity.score / 100) * 1000))
      );
      calibratedIou = Math.round(calFraction * 1000) / 10;
      calibrationApplied = true;
    } else {
      rawScore = Math.min(
        1000,
        Math.max(0, Math.round((0.85 * iouFraction + 0.15 * proximity.score / 100) * 1000))
      );
    }
  }

  // Determine Letter Grade
  let grade: "S" | "A" | "B" | "C" | "D" = "D";
  if (rawScore >= 900) {
    grade = "S";
  } else if (rawScore >= 750) {
    grade = "A";
  } else if (rawScore >= 550) {
    grade = "B";
  } else if (rawScore >= 350) {
    grade = "C";
  } else {
    grade = "D";
  }

  return {
    score: rawScore,
    grade,
    iou: Math.round(iou * 10) / 10,
    dice: Math.round(dice * 10) / 10,
    precision: Math.round(precision * 10) / 10,
    recall: Math.round(recall * 10) / 10,
    proximityBonus: Math.round(proximity.score * 10) / 10,
    meanMissDistanceKm: Math.round(proximity.meanDistanceKm),
    rangeAreaRatio: Math.round((predTotalArea / Math.max(gtTotalArea, 1)) * 100) / 100,
    truePositiveAreaKm2: Math.round(tpArea),
    falsePositiveAreaKm2: Math.round(fpArea),
    falseNegativeAreaKm2: Math.round(fnArea),
    calibratedIou,
    calibrationApplied,
  };
}

const MAX_PROXIMITY_DISTANCE_KM = 2_500;
const PROXIMITY_DECAY_KM = 700;

type HeapEntry = { index: number; distance: number };

class MinHeap {
  private values: HeapEntry[] = [];

  push(entry: HeapEntry) {
    const values = this.values;
    values.push(entry);
    let child = values.length - 1;
    while (child > 0) {
      const parent = Math.floor((child - 1) / 2);
      if (values[parent].distance <= entry.distance) break;
      values[child] = values[parent];
      child = parent;
    }
    values[child] = entry;
  }

  pop(): HeapEntry | undefined {
    const values = this.values;
    if (values.length === 0) return undefined;
    const first = values[0];
    const last = values.pop();
    if (!last || values.length === 0) return first;

    let parent = 0;
    while (true) {
      const left = parent * 2 + 1;
      const right = left + 1;
      if (left >= values.length) break;
      const smallest = right < values.length && values[right].distance < values[left].distance ? right : left;
      if (values[smallest].distance >= last.distance) break;
      values[parent] = values[smallest];
      parent = smallest;
    }
    values[parent] = last;
    return first;
  }
}

function calculateSymmetricProximity(
  predictedMask: Uint8Array,
  groundTruthMask: Uint8Array,
  fpArea: number,
  fnArea: number
): { score: number; meanDistanceKm: number } {
  if (fpArea === 0 && fnArea === 0) return { score: 100, meanDistanceKm: 0 };
  // A one-sided mismatch (fpArea>0 xor fnArea>0) is NOT degenerate: both
  // distance transforms remain well-defined as long as their respective
  // seed mask (groundTruthMask for FP lookups, predictedMask for FN
  // lookups) has at least one set cell. Only bail to the worst-case value
  // when the seed mask actually needed is empty -- e.g. a wholly-empty
  // prediction, so there is no meaningful "distance to the guess" to
  // report for missed cells. This was previously conflated with "one side
  // has zero mismatch area", which incorrectly forced a near-perfect,
  // one-cell-off guess to the same worst-case proximity as a guess with no
  // overlap at all.
  const groundTruthEmpty = groundTruthMask.every((v) => v === 0);
  const predictedEmpty = predictedMask.every((v) => v === 0);
  if ((fpArea > 0 && groundTruthEmpty) || (fnArea > 0 && predictedEmpty)) {
    return { score: 0, meanDistanceKm: MAX_PROXIMITY_DISTANCE_KM };
  }

  const distanceToTruth = distanceTransform(groundTruthMask);
  const distanceToPrediction = distanceTransform(predictedMask);
  let weightedCloseness = 0;
  let weightedDistance = 0;
  let mismatchArea = 0;

  for (let y = 0; y < GRID_HEIGHT; y++) {
    const area = getCellAreaKm2(y);
    for (let x = 0; x < GRID_WIDTH; x++) {
      const index = y * GRID_WIDTH + x;
      let distance: number | undefined;
      if (predictedMask[index] === 1 && groundTruthMask[index] === 0) {
        distance = distanceToTruth[index];
      } else if (predictedMask[index] === 0 && groundTruthMask[index] === 1) {
        distance = distanceToPrediction[index];
      }
      if (distance === undefined) continue;
      const boundedDistance = Math.min(distance, MAX_PROXIMITY_DISTANCE_KM);
      weightedDistance += boundedDistance * area;
      weightedCloseness += Math.exp(-boundedDistance / PROXIMITY_DECAY_KM) * area;
      mismatchArea += area;
    }
  }

  return {
    score: mismatchArea > 0 ? (weightedCloseness / mismatchArea) * 100 : 0,
    meanDistanceKm: mismatchArea > 0 ? weightedDistance / mismatchArea : MAX_PROXIMITY_DISTANCE_KM,
  };
}

export function distanceTransform(seedMask: Uint8Array): Float64Array {
  const distances = new Float64Array(TOTAL_CELLS);
  distances.fill(Infinity);
  const heap = new MinHeap();

  for (let index = 0; index < TOTAL_CELLS; index++) {
    if (seedMask[index] === 1) {
      distances[index] = 0;
      heap.push({ index, distance: 0 });
    }
  }

  const horizontalSteps = Array.from({ length: GRID_HEIGHT }, (_, y) => {
    const [, lat] = gridToLonLat(0, y);
    return Math.max(0.1, 111.195 * Math.cos((lat * Math.PI) / 180));
  });
  const diagonalSteps = Array.from({ length: GRID_HEIGHT - 1 }, (_, y) => {
    const [, lat] = gridToLonLat(0, y);
    return haversineDistanceKm(0, lat, 1, lat - 1);
  });
  const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
    [-1, -1], [1, -1], [-1, 1], [1, 1],
  ];

  while (true) {
    const current = heap.pop();
    if (!current) break;
    if (current.distance !== distances[current.index] || current.distance > MAX_PROXIMITY_DISTANCE_KM) continue;
    const y = Math.floor(current.index / GRID_WIDTH);
    const x = current.index % GRID_WIDTH;

    for (const [dx, dy] of directions) {
      const nextY = y + dy;
      if (nextY < 0 || nextY >= GRID_HEIGHT) continue;
      const nextX = (x + dx + GRID_WIDTH) % GRID_WIDTH;
      const nextIndex = nextY * GRID_WIDTH + nextX;
      const diagonal = dx !== 0 && dy !== 0;
      const step = diagonal ? diagonalSteps[Math.min(y, nextY)] : dx !== 0 ? horizontalSteps[y] : 111.195;
      const nextDistance = current.distance + step;
      if (nextDistance < distances[nextIndex] && nextDistance <= MAX_PROXIMITY_DISTANCE_KM) {
        distances[nextIndex] = nextDistance;
        heap.push({ index: nextIndex, distance: nextDistance });
      }
    }
  }

  return distances;
}
