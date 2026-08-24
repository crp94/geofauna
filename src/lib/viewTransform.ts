/**
 * Pure affine view-transform math for the map canvas's zoom/pan gestures.
 *
 * Convention: screen = k · base + (tx, ty)
 * where `base` coordinates are whatever the fixed base d3 projection
 * outputs (see src/lib/projection.ts) and `screen` coordinates are CSS
 * canvas pixel coordinates (before any devicePixelRatio scaling, which the
 * caller applies separately via ctx.scale(dpr, dpr) / ctx.setTransform).
 *
 * Every function here is pure: given a ViewTransform it returns a new
 * ViewTransform (or plain numbers/tuples). No DOM access, no mutation, no
 * dependency on anything outside this module.
 */

export interface ViewTransform {
  k: number;
  tx: number;
  ty: number;
}

export const IDENTITY: ViewTransform = { k: 1, tx: 0, ty: 0 };

/** Convert a point in base coordinates to screen coordinates. */
export function baseToScreen(vt: ViewTransform, x: number, y: number): [number, number] {
  return [vt.k * x + vt.tx, vt.k * y + vt.ty];
}

/** Convert a point in screen coordinates back to base coordinates. */
export function screenToBase(vt: ViewTransform, x: number, y: number): [number, number] {
  return [(x - vt.tx) / vt.k, (y - vt.ty) / vt.k];
}

/**
 * Zoom by `factor` (>1 = zoom in, <1 = zoom out) while keeping the screen
 * point (cx, cy) fixed -- the base-space point currently under that
 * screen anchor stays under it after the zoom. `factor` <= 0 or
 * non-finite is a no-op (returns `vt` unchanged) so a bad gesture delta
 * can never corrupt the transform.
 */
export function zoomAtPoint(vt: ViewTransform, factor: number, cx: number, cy: number): ViewTransform {
  if (!isFinite(factor) || factor <= 0) return vt;
  return {
    k: vt.k * factor,
    tx: cx - factor * (cx - vt.tx),
    ty: cy - factor * (cy - vt.ty),
  };
}

/** Pan by a screen-space delta (dx, dy); zoom level is unaffected. */
export function panBy(vt: ViewTransform, dx: number, dy: number): ViewTransform {
  return { k: vt.k, tx: vt.tx + dx, ty: vt.ty + dy };
}

/**
 * Combines a two-finger pinch/pan gesture into a single transform update:
 * the midpoint (centroid) of the two touch points is the pan anchor, and
 * the change in inter-finger distance drives the zoom factor. Equivalent
 * to `panBy(zoomAtPoint(vt, ratio, prevCentroid.x, prevCentroid.y), nextCentroid - prevCentroid)`,
 * which keeps the base-space point under the *previous* centroid mapped
 * exactly onto the *next* centroid.
 *
 * A degenerate previous pinch (near-zero finger distance -- e.g. a second
 * finger landing exactly on the first) is treated as ratio = 1 (pure pan,
 * no zoom) so the result never involves a division by ~0.
 */
export function pinchUpdate(
  vt: ViewTransform,
  prev: [[number, number], [number, number]],
  next: [[number, number], [number, number]]
): ViewTransform {
  const prevCx = (prev[0][0] + prev[1][0]) / 2;
  const prevCy = (prev[0][1] + prev[1][1]) / 2;
  const nextCx = (next[0][0] + next[1][0]) / 2;
  const nextCy = (next[0][1] + next[1][1]) / 2;

  const prevDist = Math.hypot(prev[1][0] - prev[0][0], prev[1][1] - prev[0][1]);
  const nextDist = Math.hypot(next[1][0] - next[0][0], next[1][1] - next[0][1]);

  const DEGENERATE_EPS = 1e-6;
  const ratio = prevDist < DEGENERATE_EPS ? 1 : nextDist / prevDist;

  const zoomed = zoomAtPoint(vt, ratio, prevCx, prevCy);
  return panBy(zoomed, nextCx - prevCx, nextCy - prevCy);
}

export interface ClampViewOptions {
  minK?: number;
  maxK?: number;
}

/** Minimum fraction of the (smaller of sphere-extent/viewport) that must stay on-screen per axis. */
const MIN_OVERLAP_FRACTION = 0.25;

function clampAxis(t: number, k: number, a0: number, a1: number, viewport: number): number {
  const lo = a0 <= a1 ? a0 : a1;
  const hi = a0 <= a1 ? a1 : a0;
  const span = (hi - lo) * k;
  const minOverlap = MIN_OVERLAP_FRACTION * Math.min(span, viewport);
  // Sphere screen extent is [k*lo + t, k*hi + t]; it must overlap
  // [0, viewport] by at least `minOverlap`.
  const lowerBound = minOverlap - k * hi;
  const upperBound = viewport - minOverlap - k * lo;
  if (lowerBound > upperBound) return (lowerBound + upperBound) / 2;
  return Math.min(upperBound, Math.max(lowerBound, t));
}

/**
 * Clamps zoom to [minK, maxK] (default [1, 32]) and clamps pan so the
 * projected sphere bounding box (`sphereBounds`, in base coordinates)
 * keeps at least 25% overlap with the viewport in each axis -- the map
 * can never be panned or zoomed entirely off-screen.
 */
export function clampView(
  vt: ViewTransform,
  width: number,
  height: number,
  sphereBounds: [number, number, number, number],
  opts?: ClampViewOptions
): ViewTransform {
  const minK = opts?.minK ?? 1;
  const maxK = opts?.maxK ?? 32;
  const k = Math.min(maxK, Math.max(minK, vt.k));
  const [x0, y0, x1, y1] = sphereBounds;
  return {
    k,
    tx: clampAxis(vt.tx, k, x0, x1, width),
    ty: clampAxis(vt.ty, k, y0, y1, height),
  };
}

/**
 * Returns the transform Δ such that Δ∘settled == current, i.e. for every
 * base-space point p:
 *   baseToScreen(Δ, baseToScreen(settled, p)) === baseToScreen(current, p)
 *
 * Used to cheaply blit a layer that was rasterized while the "settled"
 * transform was active onto a canvas that is now live under `current`
 * (e.g. mid-gesture, before the next crisp re-render on settle).
 */
export function composeDelta(current: ViewTransform, settled: ViewTransform): ViewTransform {
  const settledK = Math.abs(settled.k) < 1e-9 ? (settled.k < 0 ? -1e-9 : 1e-9) : settled.k;
  const k = current.k / settledK;
  return {
    k,
    tx: current.tx - k * settled.tx,
    ty: current.ty - k * settled.ty,
  };
}
