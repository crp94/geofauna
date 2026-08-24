import {
  GRID_WIDTH,
  GRID_HEIGHT,
  TOTAL_CELLS,
  getCellAreaKm2,
  gridToLonLat,
} from "./maskCompression";
import { distanceTransform } from "./scoring";
import { ScoreCalibration } from "../types/species";

/**
 * Difficulty calibration: remaps raw IoU through per-species anchors so that
 * beating the best trivial strategy (baselineIoU) always lands at mid-C, and
 * matching a truth mask dilated by one fine-brush halo (attainableIoU) always
 * lands at the S threshold. See src/lib/calibration.ts consumers in
 * src/lib/scoring.ts (evaluatePrediction) and the build-time pipeline that
 * computes and stores ScoreCalibration on SpeciesRange.
 */
export const CAL_BASELINE_TARGET = 0.35;
export const CAL_ATTAINABLE_TARGET = 0.9;

// Guard rails mirrored from the build-time pipeline (Workstream C1): a
// calibration whose anchors fall outside these bounds is treated as
// malformed/corrupted data and the caller falls back to identity scoring.
const MIN_BASELINE = 0.02;
const MAX_BASELINE = 0.85;
const MIN_ATTAINABLE_MARGIN = 0.05;
const EPSILON = 1e-9;

/**
 * Type guard: true only for a well-formed, internally consistent calibration
 * (version 1, finite anchors, 0 < baselineIoU < attainableIoU < 1, within the
 * build-time guard-rail clamps). Any other shape — missing, wrong version,
 * NaN/Infinity, or an inverted/degenerate anchor pair — is invalid and
 * callers must fall back to identity behavior.
 */
export function isValidCalibration(cal?: ScoreCalibration): cal is ScoreCalibration {
  if (!cal) return false;
  if (cal.version !== 1) return false;
  const { baselineIoU: b, attainableIoU: a } = cal;
  if (!Number.isFinite(b) || !Number.isFinite(a)) return false;
  if (b < MIN_BASELINE || b > MAX_BASELINE) return false;
  if (a <= 0 || a >= 1) return false;
  if (a < b + MIN_ATTAINABLE_MARGIN) return false;
  return true;
}

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

/**
 * Piecewise-linear, continuous, monotonic non-decreasing remap of a raw IoU
 * fraction `u` through the anchors `(b, a)`:
 *   u <= b        -> 0.35 * (u / b)
 *   b < u <= a    -> 0.35 + 0.55 * (u - b) / (a - b)
 *   u > a         -> 0.90 + 0.10 * (u - a) / (1 - a)
 * Returns identity (the clamped input) when the calibration is missing or
 * invalid, so callers are backward compatible by construction. Input is
 * clamped to [0, 1] first. Degenerate spans (b -> 0, a -> 1) are guarded
 * against division by zero and fall back to the nearest flat target.
 */
export function calibrateIou(iouFraction: number, cal?: ScoreCalibration): number {
  const u = clamp01(iouFraction);
  if (!isValidCalibration(cal)) return u;

  const b = cal.baselineIoU;
  const a = cal.attainableIoU;

  if (u <= b) {
    return b > EPSILON ? CAL_BASELINE_TARGET * (u / b) : CAL_BASELINE_TARGET;
  }
  if (u <= a) {
    const span = a - b;
    return span > EPSILON
      ? CAL_BASELINE_TARGET + (CAL_ATTAINABLE_TARGET - CAL_BASELINE_TARGET) * ((u - b) / span)
      : CAL_ATTAINABLE_TARGET;
  }
  const remaining = 1 - a;
  return remaining > EPSILON
    ? CAL_ATTAINABLE_TARGET + (1 - CAL_ATTAINABLE_TARGET) * ((u - a) / remaining)
    : 1;
}

/**
 * Area-weighted IoU (0-1 fraction) between two masks, integrated on the
 * sphere using exact 1° cell areas per row (getCellAreaKm2). Cheap — no
 * distance transform. Numerically agrees with
 * evaluatePrediction(a, b).iou / 100 by construction (same area-weighted
 * intersection-over-union definition).
 */
export function computeAreaWeightedIoU(a: Uint8Array, b: Uint8Array): number {
  let intersectionArea = 0;
  let unionArea = 0;

  for (let y = 0; y < GRID_HEIGHT; y++) {
    const cellArea = getCellAreaKm2(y);
    for (let x = 0; x < GRID_WIDTH; x++) {
      const idx = y * GRID_WIDTH + x;
      const av = a[idx] === 1;
      const bv = b[idx] === 1;
      if (av || bv) unionArea += cellArea;
      if (av && bv) intersectionArea += cellArea;
    }
  }

  return unionArea > 0 ? intersectionArea / unionArea : 0;
}

/**
 * Dilates a mask by `km`: every cell within `km` kilometers of any set cell
 * (via the geodesic Dijkstra distance transform in scoring.ts) is included.
 * The result always includes the original mask.
 */
export function dilateMask(mask: Uint8Array, km: number): Uint8Array {
  const distances = distanceTransform(mask);
  const result = new Uint8Array(TOTAL_CELLS);
  for (let i = 0; i < TOTAL_CELLS; i++) {
    result[i] = mask[i] === 1 || distances[i] <= km ? 1 : 0;
  }
  return result;
}

/**
 * Area-weighted centroid of a mask as the 3D unit-vector mean of its cell
 * centers (weighted by exact cell area), re-projected back to (lon, lat).
 * This is antimeridian-safe by construction: cells near +/-180 degrees are
 * close together in 3D space regardless of their longitude sign. Returns
 * null for an empty mask (or one whose weighted vector sum cancels exactly,
 * e.g. perfectly antipodal coverage).
 */
export function areaWeightedCentroid(mask: Uint8Array): [lon: number, lat: number] | null {
  let x = 0;
  let y = 0;
  let z = 0;
  let totalWeight = 0;

  for (let gy = 0; gy < GRID_HEIGHT; gy++) {
    const area = getCellAreaKm2(gy);
    for (let gx = 0; gx < GRID_WIDTH; gx++) {
      const idx = gy * GRID_WIDTH + gx;
      if (mask[idx] !== 1) continue;

      const [lon, lat] = gridToLonLat(gx, gy);
      const lonRad = (lon * Math.PI) / 180;
      const latRad = (lat * Math.PI) / 180;
      const cosLat = Math.cos(latRad);

      x += area * cosLat * Math.cos(lonRad);
      y += area * cosLat * Math.sin(lonRad);
      z += area * Math.sin(latRad);
      totalWeight += area;
    }
  }

  if (totalWeight === 0) return null;

  const norm = Math.sqrt(x * x + y * y + z * z);
  if (norm < EPSILON) return null;

  const lat = Math.asin(Math.min(1, Math.max(-1, z / norm))) * (180 / Math.PI);
  const lon = Math.atan2(y / norm, x / norm) * (180 / Math.PI);
  return [lon, lat];
}
