"use client";

import React from "react";
import { BarChart3, Flame, Trophy } from "lucide-react";
import { GameStats, Language } from "../types/species";
import { getTranslation } from "../lib/i18n";
import { Modal } from "./ui/Modal";

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
  const totalGrades =
    (stats.gradeCounts.S || 0) +
    (stats.gradeCounts.A || 0) +
    (stats.gradeCounts.B || 0) +
    (stats.gradeCounts.C || 0) +
    (stats.gradeCounts.D || 0);

  const grades: Array<"S" | "A" | "B" | "C" | "D"> = ["S", "A", "B", "C", "D"];

  const gradeFillClass: Record<"S" | "A" | "B" | "C" | "D", string> = {
    S: "bg-accent",
    A: "bg-accent",
    B: "bg-iucn-lc-text",
    C: "bg-ochre",
    D: "bg-terracotta",
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      labelledBy="stats-modal-title"
      maxWidth="32rem"
      closeLabel={getTranslation(lang, "close")}
    >
      {/* Title */}
      <div className="flex items-center gap-2.5">
        <BarChart3 className="h-6 w-6 text-accent" />
        <h2 id="stats-modal-title" className="font-display text-xl font-semibold text-ink-900 pr-8 sm:text-2xl">
          {getTranslation(lang, "statsTitle")}
        </h2>
      </div>

      {/* KPI Grid */}
      <div className="mt-6 grid grid-cols-4 gap-2 text-center">
        <div className="rounded-md border border-rule bg-paper-sunken p-3">
          <p className="font-display text-2xl font-semibold text-ink-900">{stats.gamesPlayed}</p>
          <span className="text-[12px] font-bold text-ink-500 uppercase">
            {getTranslation(lang, "played")}
          </span>
        </div>

        <div className="rounded-md border border-rule bg-paper-sunken p-3">
          <p className="font-display text-2xl font-semibold text-accent-ink">{stats.averageScore}</p>
          <span className="text-[12px] font-bold text-ink-500 uppercase">
            {getTranslation(lang, "avgScore")}
          </span>
        </div>

        <div className="rounded-md border border-rule bg-paper-sunken p-3">
          <div className="flex items-center justify-center gap-1">
            <Flame className="h-4 w-4 fill-terracotta text-terracotta" />
            <p className="font-display text-2xl font-semibold text-terracotta">{stats.currentStreak}</p>
          </div>
          <span className="text-[12px] font-bold text-ink-500 uppercase">
            {getTranslation(lang, "currStreak")}
          </span>
        </div>

        <div className="rounded-md border border-rule bg-paper-sunken p-3">
          <div className="flex items-center justify-center gap-1">
            <Trophy className="h-4 w-4 text-accent" />
            <p className="font-display text-2xl font-semibold text-ink-900">{stats.maxStreak}</p>
          </div>
          <span className="text-[12px] font-bold text-ink-500 uppercase">
            {getTranslation(lang, "maxStreak")}
          </span>
        </div>
      </div>

      {/* Rank / Grade Distribution Bars */}
      <div className="mt-6 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-ink-500">
          {getTranslation(lang, "gradeDistribution")}
        </span>

        <div className="space-y-1.5">
          {grades.map((g) => {
            const count = stats.gradeCounts[g] || 0;
            const pct = totalGrades > 0 ? (count / totalGrades) * 100 : 0;

            return (
              <div key={g} className="flex items-center gap-2 text-xs">
                <span className="w-5 font-bold text-ink-700">{g}</span>
                <div className="h-6 flex-1 overflow-hidden rounded-[3px] border border-rule bg-paper-sunken">
                  <div
                    style={{ width: `${Math.max(8, pct)}%` }}
                    className={`flex h-full items-center justify-end px-2 text-[12px] font-extrabold text-paper-raised transition-all ${gradeFillClass[g]}`}
                  >
                    {count}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
