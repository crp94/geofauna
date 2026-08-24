"use client";

import React, { useEffect, useRef, useState } from "react";
import { Language } from "../types/species";
import { getTranslation } from "../lib/i18n";
import { fetchDailyStats, DailyStatsResponse } from "../lib/dailyStats";
import { BAND_COUNT, BAND_SIZE, computePercentile, scoreToBand } from "../lib/dailyStatsShared";
import { trackGameEvent } from "../lib/analytics";

interface DailyCommunityStatsProps {
  day: string;
  score: number;
  lang: Language;
}

/** Coarse, privacy-safe bucket for the daily player count. */
function playersBand(totalPlayers: number): "1-9" | "10-49" | "50-199" | "200+" {
  if (totalPlayers < 10) return "1-9";
  if (totalPlayers < 50) return "10-49";
  if (totalPlayers < 200) return "50-199";
  return "200+";
}

export const DailyCommunityStats: React.FC<DailyCommunityStatsProps> = ({ day, score, lang }) => {
  const [stats, setStats] = useState<DailyStatsResponse | null>(null);
  const hasTrackedViewRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    setStats(null);
    fetchDailyStats(day).then((result) => {
      if (!cancelled) setStats(result);
    });
    return () => {
      cancelled = true;
    };
  }, [day]);

  useEffect(() => {
    if (!stats || stats.totalPlayers < 1) return;
    if (hasTrackedViewRef.current) return;
    hasTrackedViewRef.current = true;
    trackGameEvent("daily_stats_viewed", { players_band: playersBand(stats.totalPlayers) });
  }, [stats]);

  if (!stats || stats.totalPlayers < 1) return null;

  const { totalPlayers, histogram } = stats;
  const weightedSum = histogram.reduce(
    (sum, count, band) => sum + count * (band * BAND_SIZE + BAND_SIZE / 2),
    0
  );
  const average = Math.round(weightedSum / totalPlayers);
  const percentile = computePercentile(histogram, score);
  const playerBand = scoreToBand(score);
  const maxCount = Math.max(1, ...histogram);

  const percentileText = getTranslation(lang, "communityPercentile").replace(
    "{pct}",
    String(percentile)
  );

  return (
    <div className="rounded-md border border-rule bg-paper-sunken p-3 font-mono text-xs text-ink-700">
      <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-1">
        <span>{getTranslation(lang, "communityToday")}:</span>
        <b className="text-ink-900">{totalPlayers}</b>
        <span>{getTranslation(lang, "communityPlayers")}</span>
        <span className="text-ink-500">·</span>
        <span>{getTranslation(lang, "communityAverage")}</span>
        <b className="text-ink-900">{average}</b>
        <span className="text-ink-500">·</span>
        <span>{percentileText}</span>
      </div>
      <div
        className="mt-2 flex h-6 items-end gap-[2px]"
        role="img"
        aria-label={percentileText}
      >
        {Array.from({ length: BAND_COUNT }, (_, band) => {
          const count = histogram[band] ?? 0;
          const heightPct = Math.max(4, Math.round((count / maxCount) * 100));
          const isPlayerBand = band === playerBand;
          return (
            <div
              key={band}
              className={`flex-1 rounded-sm ${isPlayerBand ? "bg-accent" : "bg-accent/55"}`}
              style={{ height: `${heightPct}%` }}
            />
          );
        })}
      </div>
    </div>
  );
};
