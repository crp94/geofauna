"use client";

import React from "react";
import { BarChart3, Flame, Trophy, X, Award } from "lucide-react";
import { GameStats, Language } from "../types/species";
import { getTranslation } from "../lib/i18n";

interface StatsModalProps {
  stats: GameStats;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  stats,
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;

  const totalGrades =
    (stats.gradeCounts.S || 0) +
    (stats.gradeCounts.A || 0) +
    (stats.gradeCounts.B || 0) +
    (stats.gradeCounts.C || 0) +
    (stats.gradeCounts.D || 0);

  const grades: Array<"S" | "A" | "B" | "C" | "D"> = ["S", "A", "B", "C", "D"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-surface-border bg-surface p-6 sm:p-8 shadow-2xl animate-scale-in">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-2 text-slate-400 hover:bg-surface-elevated hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2.5">
          <BarChart3 className="h-6 w-6 text-emerald-400" />
          <h2 className="text-xl font-black text-white sm:text-2xl">
            {getTranslation(lang, "statsTitle")}
          </h2>
        </div>

        {/* KPI Grid */}
        <div className="mt-6 grid grid-cols-4 gap-2 text-center">
          <div className="rounded-2xl border border-surface-border bg-surface-subtle p-3">
            <p className="text-xl font-black text-white">{stats.gamesPlayed}</p>
            <span className="text-[11px] font-bold text-slate-400 uppercase">
              {getTranslation(lang, "played")}
            </span>
          </div>

          <div className="rounded-2xl border border-surface-border bg-surface-subtle p-3">
            <p className="text-xl font-black text-emerald-400">{stats.averageScore}</p>
            <span className="text-[11px] font-bold text-slate-400 uppercase">
              {getTranslation(lang, "avgScore")}
            </span>
          </div>

          <div className="rounded-2xl border border-surface-border bg-surface-subtle p-3">
            <div className="flex items-center justify-center gap-1">
              <Flame className="h-4 w-4 fill-amber-400 text-amber-400" />
              <p className="text-xl font-black text-amber-300">{stats.currentStreak}</p>
            </div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">
              {getTranslation(lang, "currStreak")}
            </span>
          </div>

          <div className="rounded-2xl border border-surface-border bg-surface-subtle p-3">
            <div className="flex items-center justify-center gap-1">
              <Trophy className="h-4 w-4 text-emerald-400" />
              <p className="text-xl font-black text-white">{stats.maxStreak}</p>
            </div>
            <span className="text-[11px] font-bold text-slate-400 uppercase">
              {getTranslation(lang, "maxStreak")}
            </span>
          </div>
        </div>

        {/* Rank / Grade Distribution Bars */}
        <div className="mt-6 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {getTranslation(lang, "gradeDistribution")}
          </span>

          <div className="space-y-1.5">
            {grades.map((g) => {
              const count = stats.gradeCounts[g] || 0;
              const pct = totalGrades > 0 ? (count / totalGrades) * 100 : 0;

              return (
                <div key={g} className="flex items-center gap-2 text-xs">
                  <span className="w-5 font-bold text-slate-300">{g}</span>
                  <div className="h-6 flex-1 overflow-hidden rounded-md bg-surface-subtle">
                    <div
                      style={{ width: `${Math.max(8, pct)}%` }}
                      className={`flex h-full items-center justify-end px-2 text-[11px] font-extrabold text-slate-950 transition-all ${
                        g === "S"
                          ? "bg-emerald-400"
                          : g === "A"
                          ? "bg-emerald-500"
                          : g === "B"
                          ? "bg-cyan-400"
                          : g === "C"
                          ? "bg-amber-400"
                          : "bg-rose-400"
                      }`}
                    >
                      {count}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
