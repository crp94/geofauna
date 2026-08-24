// Pure, isomorphic helpers for the anonymous daily-aggregates feature.
// No imports from server-only or client-only modules — this file is safe
// to import from edge API routes, server components, and the browser.

/** Number of score bands the 0–1000 score range is bucketed into. */
export const BAND_COUNT = 20;
/** Width (in score points) of each band. */
export const BAND_SIZE = 50;

/** Map a raw score (nominally 0–1000, but clamped defensively) to a band index 0..BAND_COUNT-1. */
export function scoreToBand(score: number): number {
  if (!Number.isFinite(score)) return 0;
  const band = Math.floor(score / BAND_SIZE);
  return Math.min(BAND_COUNT - 1, Math.max(0, band));
}

const DAY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/** Strict YYYY-MM-DD validation — rejects malformed strings and impossible calendar dates. */
export function isValidDay(day: string): boolean {
  if (typeof day !== "string" || !DAY_PATTERN.test(day)) return false;
  const [year, month, dayOfMonth] = day.split("-").map(Number);
  if (month < 1 || month > 12) return false;
  if (dayOfMonth < 1 || dayOfMonth > 31) return false;
  const date = new Date(Date.UTC(year, month - 1, dayOfMonth));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === dayOfMonth
  );
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export type DailyScoreSubmission = { day: string; band: number };
export type ValidateSubmissionResult =
  | { ok: true; day: string; band: number }
  | { ok: false; error: string };

/**
 * Validate an incoming daily-score submission body.
 * `day` must be a well-formed calendar date within ±1 day of the server's
 * current UTC date (slack for clients whose local date has already rolled
 * over relative to UTC). `band` must be an integer within [0, BAND_COUNT).
 */
export function validateSubmission(body: unknown, nowUtcMs: number): ValidateSubmissionResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "invalid body" };
  }
  const { day, band } = body as Record<string, unknown>;

  if (typeof day !== "string" || !isValidDay(day)) {
    return { ok: false, error: "invalid day" };
  }
  if (typeof band !== "number" || !Number.isInteger(band) || band < 0 || band >= BAND_COUNT) {
    return { ok: false, error: "invalid band" };
  }

  const [year, month, dayOfMonth] = day.split("-").map(Number);
  const submittedMs = Date.UTC(year, month - 1, dayOfMonth);
  const todayMs = Math.floor(nowUtcMs / ONE_DAY_MS) * ONE_DAY_MS;
  const diffDays = Math.round((submittedMs - todayMs) / ONE_DAY_MS);

  if (Math.abs(diffDays) > 1) {
    return { ok: false, error: "day out of range" };
  }

  return { ok: true, day, band };
}

/**
 * Midrank percentile of `score` within the population described by `histogram`
 * (counts per band, index = band). Ties (same band) count as half-above/half-below.
 * Returns an integer 0–100, defaulting to 50 when there is not enough data to rank.
 */
export function computePercentile(histogram: number[], score: number): number {
  const total = histogram.reduce((sum, count) => sum + (Number.isFinite(count) ? count : 0), 0);
  if (total <= 1) return 50;

  const band = scoreToBand(score);
  let countBelow = 0;
  let countSame = 0;
  for (let i = 0; i < histogram.length; i += 1) {
    const count = Number.isFinite(histogram[i]) ? histogram[i] : 0;
    if (i < band) countBelow += count;
    else if (i === band) countSame += count;
  }

  const percentile = (100 * (countBelow + 0.5 * countSame)) / total;
  return Math.min(100, Math.max(0, Math.round(percentile)));
}
