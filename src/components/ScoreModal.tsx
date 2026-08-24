"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  Award,
  Check,
  Copy,
  Share2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  Layers,
  Globe2,
} from "lucide-react";
import { Language, ScoreResult, Species } from "../types/species";
import { getTranslation } from "../lib/i18n";
import { playScoreReveal } from "../lib/sound";

interface ScoreModalProps {
  species: Species;
  scoreResult: ScoreResult;
  isOpen: boolean;
  onClose: () => void;
  onNextSpecies?: () => void;
  isDaily: boolean;
  dayNumber?: number;
  lang: Language;
}

export const ScoreModal: React.FC<ScoreModalProps> = ({
  species,
  scoreResult,
  isOpen,
  onClose,
  onNextSpecies,
  isDaily,
  dayNumber = 1,
  lang,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      playScoreReveal(scoreResult.grade);

      if (scoreResult.grade === "S" || scoreResult.grade === "A") {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#10B981", "#34D399", "#06B6D4", "#F59E0B"],
        });
      }
    }
  }, [isOpen, scoreResult.grade]);

  if (!isOpen) return null;

  const localizedName = species.commonName[lang] || species.commonName.en;

  const getGradeTitle = (grade: ScoreResult["grade"]) => {
    switch (grade) {
      case "S":
        return getTranslation(lang, "gradeS");
      case "A":
        return getTranslation(lang, "gradeA");
      case "B":
        return getTranslation(lang, "gradeB");
      case "C":
        return getTranslation(lang, "gradeC");
      case "D":
        return getTranslation(lang, "gradeD");
    }
  };

  const getGradeColor = (grade: ScoreResult["grade"]) => {
    switch (grade) {
      case "S":
        return "text-emerald-400 border-emerald-500/40 bg-emerald-500/10";
      case "A":
        return "text-emerald-300 border-emerald-500/30 bg-emerald-500/10";
      case "B":
        return "text-cyan-400 border-cyan-500/30 bg-cyan-500/10";
      case "C":
        return "text-amber-400 border-amber-500/30 bg-amber-500/10";
      case "D":
        return "text-rose-400 border-rose-500/30 bg-rose-500/10";
    }
  };

  const handleShare = () => {
    const squaresCount = Math.round(scoreResult.score / 200);
    const greenSquares = "🟩".repeat(squaresCount);
    const whiteSquares = "⬜".repeat(5 - squaresCount);

    const shareText = isDaily
      ? `🐾 GeoFauna #${dayNumber} · ${localizedName}\n🎯 Score: ${scoreResult.score}/1000 (${scoreResult.grade})\n${greenSquares}${whiteSquares} (IoU: ${scoreResult.iou}%)\nhttps://geofauna.carlosrodriguezpardo.es`
      : `🐾 GeoFauna · ${localizedName}\n🎯 Score: ${scoreResult.score}/1000 (${scoreResult.grade})\n${greenSquares}${whiteSquares} (IoU: ${scoreResult.iou}%)\nhttps://geofauna.carlosrodriguezpardo.es`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-surface-border bg-surface p-6 sm:p-8 shadow-2xl animate-scale-in">
        {/* Header Ribbon */}
        <div className="text-center">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-extrabold uppercase tracking-wider ${getGradeColor(
              scoreResult.grade
            )}`}
          >
            <Award className="h-3.5 w-3.5" />
            <span>Grade {scoreResult.grade} · {getGradeTitle(scoreResult.grade)}</span>
          </span>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
            {scoreResult.score}{" "}
            <span className="text-lg font-semibold text-slate-400">/ 1000</span>
          </h2>

          <p className="mt-1 text-sm font-medium text-slate-300">
            {localizedName} <span className="italic text-emerald-400">({species.scientificName})</span>
          </p>
        </div>

        {/* Spatial Diagnostic Metrics Grid */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-surface-border bg-surface-subtle p-3 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase">IoU Overlap</span>
            <p className="mt-1 text-lg font-black text-emerald-400">{scoreResult.iou}%</p>
          </div>

          <div className="rounded-xl border border-surface-border bg-surface-subtle p-3 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Precision</span>
            <p className="mt-1 text-lg font-black text-cyan-400">{scoreResult.precision}%</p>
          </div>

          <div className="rounded-xl border border-surface-border bg-surface-subtle p-3 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Recall</span>
            <p className="mt-1 text-lg font-black text-indigo-400">{scoreResult.recall}%</p>
          </div>

          <div className="rounded-xl border border-surface-border bg-surface-subtle p-3 text-center">
            <span className="text-[11px] font-bold text-slate-400 uppercase">Proximity</span>
            <p className="mt-1 text-lg font-black text-amber-400">+{scoreResult.proximityBonus}</p>
          </div>
        </div>

        {/* Geographic Area Summary Breakdown */}
        <div className="mt-4 rounded-xl border border-surface-border bg-surface-subtle p-3.5 text-xs text-slate-300 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-2 w-2 rounded-sm bg-emerald-500" />
              <span>Native Range Hit</span>
            </span>
            <span className="font-mono font-bold text-slate-200">
              {scoreResult.truePositiveAreaKm2.toLocaleString()} km²
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="h-2 w-2 rounded-sm bg-amber-500" />
              <span>Overestimated Area</span>
            </span>
            <span className="font-mono font-bold text-slate-200">
              {scoreResult.falsePositiveAreaKm2.toLocaleString()} km²
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sky-400">
              <span className="h-2 w-2 rounded-sm bg-sky-400" />
              <span>Missed Native Habitat</span>
            </span>
            <span className="font-mono font-bold text-slate-200">
              {scoreResult.falseNegativeAreaKm2.toLocaleString()} km²
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={handleShare}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-extrabold text-slate-950 transition-all hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
          >
            {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
            <span>{copied ? getTranslation(lang, "copied") : getTranslation(lang, "share")}</span>
          </button>

          {onNextSpecies && (
            <button
              type="button"
              onClick={onNextSpecies}
              className="flex items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-subtle px-5 py-3 text-sm font-bold text-slate-200 transition-colors hover:bg-surface-elevated hover:text-white"
            >
              <span>{getTranslation(lang, "playAgain")}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-surface-border bg-surface-subtle px-5 py-3 text-sm font-bold text-slate-400 transition-colors hover:bg-surface-elevated hover:text-white"
          >
            Inspect Map
          </button>
        </div>
      </div>
    </div>
  );
};
