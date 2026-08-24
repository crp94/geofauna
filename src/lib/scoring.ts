import {
  GRID_WIDTH,
  GRID_HEIGHT,
  TOTAL_CELLS,
  getCellAreaKm2,
  gridToLonLat,
  haversineDistanceKm,
} from "./maskCompression";
import { ScoreResult } from "../types/species";

/**
 * Evaluates the player's painted mask against the Ground Truth range mask.
 * Uses area-weighted cell integration (cosine latitude correction)
 * plus a soft-distance proximity decay factor for near-misses.
 */
export function evaluatePrediction(
  predictedMask: Uint8Array,
  groundTruthMask: Uint8Array
): ScoreResult {
  let tpArea = 0;
  let fpArea = 0;
  let fnArea = 0;
  let gtTotalArea = 0;
  let predTotalArea = 0;

  // Track coordinates of GT cells and FP cells for proximity calculation if needed
  const gtCells: [number, number][] = [];
  const fpCells: [number, number][] = [];

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
        // Subsample FP cells to avoid quadratic blowup
        if (fpCells.length < 150 && (x + y) % 3 === 0) {
          fpCells.push([x, y]);
        }
      } else if (!pred && gt) {
        fnArea += cellArea;
        if (gtCells.length < 150 && (x + y) % 3 === 0) {
          gtCells.push([x, y]);
        }
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

  // Calculate Soft-Distance Proximity for near-misses
  // If player got 0 direct hits but guessed the exact adjacent mountain range / valley within ~500-1500km
  let proximityScore = 0;
  if (fpCells.length > 0 && gtCells.length > 0) {
    let sumProximity = 0;
    for (const [fpx, fpy] of fpCells) {
      const [fplon, fplat] = gridToLonLat(fpx, fpy);
      let minDistKm = Infinity;

      for (const [gtx, gty] of gtCells) {
        const [gtlon, gtlat] = gridToLonLat(gtx, gty);
        const d = haversineDistanceKm(fplon, fplat, gtlon, gtlat);
        if (d < minDistKm) {
          minDistKm = d;
        }
      }

      // Exponential decay: 0km -> 1.0, 500km -> 0.6, 1500km -> 0.13, 3000km -> 0.01
      const decay = Math.exp(-minDistKm / 750);
      sumProximity += decay;
    }
    proximityScore = Math.min(100, (sumProximity / fpCells.length) * 100);
  }

  // Composite Score (0 - 1000 points)
  // Balanced between overlap (IoU) and proximity penalty
  let rawScore = 0;
  if (predTotalArea === 0) {
    rawScore = 0;
  } else {
    // 70% IoU + 20% Dice/Recall balance + 10% Proximity tolerance
    const baseScore = iou * 7.5 + (precision * 0.15 + recall * 0.1) * 1.5;
    const bonus = proximityScore * 1.0;
    rawScore = Math.min(1000, Math.max(0, Math.round(baseScore + bonus * (1 - iou / 100) * 0.2)));
  }

  // Determine Letter Grade
  let grade: "S" | "A" | "B" | "C" | "D" = "D";
  if (rawScore >= 850) {
    grade = "S";
  } else if (rawScore >= 700) {
    grade = "A";
  } else if (rawScore >= 500) {
    grade = "B";
  } else if (rawScore >= 300) {
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
    proximityBonus: Math.round(proximityScore * 10) / 10,
    truePositiveAreaKm2: Math.round(tpArea),
    falsePositiveAreaKm2: Math.round(fpArea),
    falseNegativeAreaKm2: Math.round(fnArea),
  };
}
