import assert from "node:assert/strict";
import {
  BAND_COUNT,
  computePercentile,
  isValidDay,
  scoreToBand,
  validateSubmission,
} from "../lib/dailyStatsShared";

// --- scoreToBand edges ---
assert.equal(scoreToBand(0), 0, "score 0 must map to band 0");
assert.equal(scoreToBand(49), 0, "score 49 must map to band 0");
assert.equal(scoreToBand(50), 1, "score 50 must map to band 1");
assert.equal(scoreToBand(999), 19, "score 999 must map to band 19");
assert.equal(scoreToBand(1000), 19, "score 1000 must clamp to band 19");
assert.equal(scoreToBand(-5), 0, "a negative score must clamp to band 0");
assert.equal(scoreToBand(1500), BAND_COUNT - 1, "an out-of-range high score must clamp to the top band");
assert.equal(scoreToBand(Number.NaN), 0, "NaN must fall back to band 0");

// --- isValidDay ---
assert.equal(isValidDay("2026-08-24"), true, "a well-formed date must be valid");
assert.equal(isValidDay("2024-02-29"), true, "a valid leap day must be accepted");
assert.equal(isValidDay("2023-02-29"), false, "an invalid leap day must be rejected");
assert.equal(isValidDay("2026-13-01"), false, "an out-of-range month must be rejected");
assert.equal(isValidDay("2026-00-10"), false, "month 0 must be rejected");
assert.equal(isValidDay("2026-08-32"), false, "an out-of-range day must be rejected");
assert.equal(isValidDay("2026/08/24"), false, "wrong separators must be rejected");
assert.equal(isValidDay("26-08-24"), false, "a short year must be rejected");
assert.equal(isValidDay(""), false, "an empty string must be rejected");
// @ts-expect-error — deliberately passing a non-string to check runtime guard
assert.equal(isValidDay(20260824), false, "a non-string must be rejected");

// --- validateSubmission ---
const NOW = Date.UTC(2026, 7, 24, 12, 0, 0); // 2026-08-24 12:00 UTC
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const today = validateSubmission({ day: "2026-08-24", band: 10 }, NOW);
assert.equal(today.ok, true, "today's date must validate");
if (today.ok) {
  assert.equal(today.day, "2026-08-24");
  assert.equal(today.band, 10);
}

const yesterday = validateSubmission({ day: "2026-08-23", band: 0 }, NOW);
assert.equal(yesterday.ok, true, "yesterday (±1 day) must validate");

const tomorrow = validateSubmission({ day: "2026-08-25", band: 19 }, NOW);
assert.equal(tomorrow.ok, true, "tomorrow (±1 day) must validate");

const twoDaysAgo = validateSubmission({ day: "2026-08-22", band: 5 }, NOW);
assert.equal(twoDaysAgo.ok, false, "two days in the past must be rejected");

const twoDaysAhead = validateSubmission({ day: "2026-08-26", band: 5 }, NOW);
assert.equal(twoDaysAhead.ok, false, "two days in the future must be rejected");

const bandTooHigh = validateSubmission({ day: "2026-08-24", band: 20 }, NOW);
assert.equal(bandTooHigh.ok, false, "band 20 (out of range) must be rejected");

const bandNegative = validateSubmission({ day: "2026-08-24", band: -1 }, NOW);
assert.equal(bandNegative.ok, false, "a negative band must be rejected");

const bandNonInteger = validateSubmission({ day: "2026-08-24", band: 3.5 }, NOW);
assert.equal(bandNonInteger.ok, false, "a non-integer band must be rejected");

assert.equal(validateSubmission(null, NOW).ok, false, "a null body must be rejected");
assert.equal(validateSubmission(undefined, NOW).ok, false, "an undefined body must be rejected");
assert.equal(validateSubmission("garbage", NOW).ok, false, "a string body must be rejected");
assert.equal(validateSubmission(42, NOW).ok, false, "a numeric body must be rejected");
assert.equal(validateSubmission([], NOW).ok, false, "an array body must be rejected");
assert.equal(validateSubmission({}, NOW).ok, false, "an empty object body must be rejected");
assert.equal(
  validateSubmission({ day: "not-a-date", band: 1 }, NOW).ok,
  false,
  "a malformed day string must be rejected"
);
assert.equal(
  validateSubmission({ day: "2026-08-24", band: "10" }, NOW).ok,
  false,
  "a string band must be rejected"
);
assert.equal(
  validateSubmission({ day: "2026-08-24" }, NOW).ok,
  false,
  "a missing band must be rejected"
);
assert.equal(
  validateSubmission({ band: 10 }, NOW).ok,
  false,
  "a missing day must be rejected"
);

// Sanity check the exact day-boundary math on a UTC midnight instant.
const midnightUtc = Date.UTC(2026, 7, 24, 0, 0, 0);
assert.equal(
  validateSubmission({ day: "2026-08-24", band: 0 }, midnightUtc).ok,
  true,
  "the current UTC day must validate exactly at midnight"
);

// --- computePercentile ---
function makeHistogram(counts: Record<number, number>): number[] {
  const histogram = new Array(BAND_COUNT).fill(0);
  for (const [band, count] of Object.entries(counts)) {
    histogram[Number(band)] = count;
  }
  return histogram;
}

// All players in the same band as the scorer -> midrank of a tie is 50.
const allSameBand = makeHistogram({ 5: 100 });
assert.equal(
  computePercentile(allSameBand, 5 * 50 + 10),
  50,
  "a same-band score among an all-one-band population must be the 50th percentile"
);

// Single player -> defined as 50th percentile regardless of score.
const singlePlayer = makeHistogram({ 3: 1 });
assert.equal(
  computePercentile(singlePlayer, 999),
  50,
  "a lone player must be reported at the 50th percentile"
);
assert.equal(
  computePercentile([], 500),
  50,
  "an empty histogram (zero total) must be reported at the 50th percentile"
);

// Player above everyone else -> should be at or near the 100th percentile.
const belowEveryoneElse = makeHistogram({ 0: 50, 1: 30, 2: 20 });
const topScorePercentile = computePercentile(belowEveryoneElse, 19 * 50 + 10);
assert.ok(
  topScorePercentile >= 95,
  `a player scoring above everyone else must rank near the top, got ${topScorePercentile}`
);

// Player below everyone else -> should be at or near the 0th percentile.
const aboveEveryoneElse = makeHistogram({ 15: 30, 18: 40, 19: 30 });
const bottomScorePercentile = computePercentile(aboveEveryoneElse, 0);
assert.ok(
  bottomScorePercentile <= 5,
  `a player scoring below everyone else must rank near the bottom, got ${bottomScorePercentile}`
);

// Player exactly in the middle of a symmetric two-band split -> ~50th percentile.
const evenSplit = makeHistogram({ 4: 50, 15: 50 });
const midSplitPercentile = computePercentile(evenSplit, 4 * 50 + 10);
assert.ok(
  midSplitPercentile > 20 && midSplitPercentile < 30,
  `a low-band score against an evenly split population should sit near its own half, got ${midSplitPercentile}`
);

// Percentile is always clamped within [0, 100].
for (const [hist, score] of [
  [belowEveryoneElse, 5000],
  [aboveEveryoneElse, -100],
] as const) {
  const pct = computePercentile([...hist], score);
  assert.ok(pct >= 0 && pct <= 100, `percentile must stay within [0, 100], got ${pct}`);
}

console.log("Daily-stats checks passed.");
