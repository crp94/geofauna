// Client-safe helpers for the anonymous daily-aggregates feature. Never
// throws — all network/storage errors are swallowed so the game remains
// fully playable when the backend is disabled or unreachable.
//
// Env var: NEXT_PUBLIC_DAILY_STATS="1" enables the feature on the client.

import { scoreToBand } from "./dailyStatsShared";

export function isDailyStatsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_DAILY_STATS === "1";
}

function submittedFlagKey(day: string): string {
  return `geofauna_daily_submitted_${day}`;
}

/**
 * Submit today's score for anonymous community aggregation. No-ops (and
 * never throws) when the feature is disabled, already submitted for this
 * day, or the request fails for any reason.
 */
export async function submitDailyScore(day: string, score: number): Promise<void> {
  if (!isDailyStatsEnabled()) return;

  let alreadySubmitted = false;
  try {
    const flagKey = submittedFlagKey(day);
    alreadySubmitted = window.localStorage.getItem(flagKey) === "1";
    if (!alreadySubmitted) {
      // Set the dedupe flag before the network call so a slow/failed
      // request can't race a second submission for the same day.
      window.localStorage.setItem(flagKey, "1");
    }
  } catch {
    // localStorage unavailable (private mode, disabled storage, etc.) —
    // fall through and still attempt the submission once, best-effort.
  }
  if (alreadySubmitted) return;

  try {
    await fetch("/api/daily-score", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ day, band: scoreToBand(score) }),
      signal: AbortSignal.timeout(4000),
    });
  } catch {
    // Best-effort — swallow network errors, aborts, and timeouts.
  }
}

export interface DailyStatsResponse {
  day: string;
  totalPlayers: number;
  histogram: number[];
}

/**
 * Fetch today's community aggregate stats. Returns null when the feature is
 * disabled, the request fails, times out, or the response is malformed.
 */
export async function fetchDailyStats(day: string): Promise<DailyStatsResponse | null> {
  if (!isDailyStatsEnabled()) return null;

  try {
    const response = await fetch(`/api/daily-stats?day=${encodeURIComponent(day)}`, {
      method: "GET",
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) return null;

    const data = await response.json();
    if (
      !data ||
      typeof data.day !== "string" ||
      typeof data.totalPlayers !== "number" ||
      !Array.isArray(data.histogram)
    ) {
      return null;
    }

    return {
      day: data.day,
      totalPlayers: data.totalPlayers,
      histogram: data.histogram,
    };
  } catch {
    return null;
  }
}
