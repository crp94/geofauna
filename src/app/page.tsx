"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import confetti from "canvas-confetti";
import speciesCatalog from "../data/curated-species.json";
import {
  DifficultyTier,
  GameMode,
  Language,
  ScoreResult,
  Species,
  TaxonClass,
} from "../types/species";
import { Header } from "../components/Header";
import { SpeciesHero } from "../components/SpeciesHero";
import { MapCanvas } from "../components/MapCanvas";
import { MapToolbar } from "../components/MapToolbar";
import { ScoreModal } from "../components/ScoreModal";
import { ConservationCard } from "../components/ConservationCard";
import { StatsModal } from "../components/StatsModal";
import { RulesModal } from "../components/RulesModal";
import { LanguageModal } from "../components/LanguageModal";
import { evaluatePrediction } from "../lib/scoring";
import {
  decodeRle,
  encodeRle,
  TOTAL_CELLS,
} from "../lib/maskCompression";
import {
  getDailyProgress,
  getStoredLanguage,
  getStoredStats,
  recordGameResult,
  setStoredLanguage,
} from "../lib/storage";
import { getTranslation } from "../lib/i18n";
import { playScoreReveal } from "../lib/sound";
import {
  Award,
  Check,
  ChevronDown,
  Copy,
  Filter,
  Share2,
  Shuffle,
  Sparkles,
  Trophy,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  const speciesList = speciesCatalog as unknown as Species[];
  const mapSectionRef = useRef<HTMLDivElement>(null);

  // App State
  const [lang, setLang] = useState<Language>("en");
  const [mode, setMode] = useState<GameMode>("daily");
  const [unlimitedDifficulty, setUnlimitedDifficulty] = useState<DifficultyTier | "all">("all");
  const [unlimitedTaxon, setUnlimitedTaxon] = useState<TaxonClass | "all">("all");
  const [currentSpeciesIndex, setCurrentSpeciesIndex] = useState<number>(0);

  // Drawing Tools State
  const [tool, setTool] = useState<"brush" | "eraser">("brush");
  const [brushRadiusKm, setBrushRadiusKm] = useState<number>(450);
  const [snapToLand, setSnapToLand] = useState<boolean>(true);
  const [userMask, setUserMask] = useState<Uint8Array>(new Uint8Array(TOTAL_CELLS));
  const [undoStack, setUndoStack] = useState<Uint8Array[]>([]);

  // Resolution & Modals State
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [scoreResult, setScoreResult] = useState<ScoreResult | undefined>();
  const [showScoreModal, setShowScoreModal] = useState<boolean>(false);
  const [showStatsModal, setShowStatsModal] = useState<boolean>(false);
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);
  const [showLangModal, setShowLangModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [stats, setStats] = useState(getStoredStats());

  // Date Keys
  const todayKey = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const dayNumber = useMemo(() => {
    const epoch = new Date("2026-01-01").getTime();
    const today = new Date().getTime();
    return Math.max(1, Math.floor((today - epoch) / 86400000) + 1);
  }, []);

  // Daily Species Selector (Deterministic pseudo-random cycle)
  const dailySpecies = useMemo(() => {
    const epochDays = Math.floor(new Date().getTime() / 86400000);
    const idx = (epochDays * 17 + 42) % speciesList.length;
    return speciesList[idx];
  }, [speciesList]);

  // Current Active Species
  const currentSpecies = useMemo(() => {
    if (mode === "daily") return dailySpecies;
    return speciesList[currentSpeciesIndex] || speciesList[0];
  }, [mode, dailySpecies, speciesList, currentSpeciesIndex]);

  // Load language and stats on mount
  useEffect(() => {
    setLang(getStoredLanguage());
    setStats(getStoredStats());
  }, []);

  // Load Daily state on mode / date change
  const loadDailyProgress = useCallback(() => {
    const progress = getDailyProgress(todayKey);
    if (progress && progress.completed && progress.scoreResult) {
      setIsSolved(true);
      setScoreResult(progress.scoreResult);
      if (progress.drawnMaskRle) {
        setUserMask(decodeRle(progress.drawnMaskRle));
      }
    } else {
      setIsSolved(false);
      setScoreResult(undefined);
      setUserMask(new Uint8Array(TOTAL_CELLS));
      setUndoStack([]);
    }
  }, [todayKey]);

  useEffect(() => {
    if (mode === "daily") {
      loadDailyProgress();
      setSnapToLand(dailySpecies.realm !== "Marine");
    } else {
      setIsSolved(false);
      setScoreResult(undefined);
      setUserMask(new Uint8Array(TOTAL_CELLS));
      setUndoStack([]);
      setSnapToLand(currentSpecies.realm !== "Marine");
    }
  }, [mode, dailySpecies, currentSpecies, loadDailyProgress]);

  // Mask Update with Undo Management
  const handleUpdateMask = (newMask: Uint8Array) => {
    setUndoStack((prev) => [...prev.slice(-15), new Uint8Array(userMask)]);
    setUserMask(newMask);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    setUndoStack((prev) => prev.slice(0, -1));
    setUserMask(previous);
  };

  const handleClear = () => {
    setUndoStack((prev) => [...prev.slice(-15), new Uint8Array(userMask)]);
    setUserMask(new Uint8Array(TOTAL_CELLS));
  };

  // Submit Evaluation Handler
  const handleSubmit = () => {
    const gtMask = decodeRle(currentSpecies.range.rleMask);
    const result = evaluatePrediction(userMask, gtMask);

    setScoreResult(result);
    setIsSolved(true);

    // Play score fanfare audio & confetti on good scores
    playScoreReveal(result.grade);
    if (result.grade === "S" || result.grade === "A") {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#10B981", "#34D399", "#06B6D4", "#F59E0B"],
      });
    }

    const rle = encodeRle(userMask);
    const updatedStats = recordGameResult(
      todayKey,
      currentSpecies.id,
      result,
      rle,
      mode === "daily"
    );
    setStats(updatedStats);

    // Scroll smoothly to map and score
    setTimeout(() => {
      mapSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  // Share result to clipboard
  const handleShare = () => {
    if (!scoreResult) return;
    const localizedName = currentSpecies.commonName[lang] || currentSpecies.commonName.en;
    const squaresCount = Math.round(scoreResult.score / 200);
    const greenSquares = "🟩".repeat(squaresCount);
    const whiteSquares = "⬜".repeat(5 - squaresCount);

    const shareText =
      mode === "daily"
        ? `🐾 GeoFauna #${dayNumber} · ${localizedName}\n🎯 Score: ${scoreResult.score}/1000 (Grade ${scoreResult.grade})\n${greenSquares}${whiteSquares} (IoU: ${scoreResult.iou}%)\nhttps://geofauna.carlosrodriguezpardo.es`
        : `🐾 GeoFauna · ${localizedName}\n🎯 Score: ${scoreResult.score}/1000 (Grade ${scoreResult.grade})\n${greenSquares}${whiteSquares} (IoU: ${scoreResult.iou}%)\nhttps://geofauna.carlosrodriguezpardo.es`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Unlimited Mode: Next Random Species
  const handleNextUnlimited = () => {
    const filtered = speciesList.filter((s) => {
      const matchDiff = unlimitedDifficulty === "all" || s.difficulty === unlimitedDifficulty;
      const matchTaxon = unlimitedTaxon === "all" || s.taxonClass === unlimitedTaxon;
      return matchDiff && matchTaxon;
    });

    const pool = filtered.length > 0 ? filtered : speciesList;
    const randomIdx = Math.floor(Math.random() * pool.length);
    const targetSpecies = pool[randomIdx];
    const catalogIdx = speciesList.findIndex((s) => s.id === targetSpecies.id);

    setCurrentSpeciesIndex(catalogIdx !== -1 ? catalogIdx : 0);
    setIsSolved(false);
    setScoreResult(undefined);
    setUserMask(new Uint8Array(TOTAL_CELLS));
    setUndoStack([]);
    setShowScoreModal(false);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasDrawn = useMemo(() => {
    for (let i = 0; i < userMask.length; i++) {
      if (userMask[i] === 1) return true;
    }
    return false;
  }, [userMask]);

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    setStoredLanguage(newLang);
  };

  const getGradeColor = (grade: ScoreResult["grade"]) => {
    switch (grade) {
      case "S":
        return "text-emerald-400 border-emerald-500/50 bg-emerald-500/10";
      case "A":
        return "text-emerald-300 border-emerald-500/40 bg-emerald-500/10";
      case "B":
        return "text-cyan-400 border-cyan-500/40 bg-cyan-500/10";
      case "C":
        return "text-amber-400 border-amber-500/40 bg-amber-500/10";
      case "D":
        return "text-rose-400 border-rose-500/40 bg-rose-500/10";
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {/* Header */}
      <Header
        mode={mode}
        onSelectMode={setMode}
        streak={stats.currentStreak}
        lang={lang}
        onOpenLangModal={() => setShowLangModal(true)}
        onOpenStatsModal={() => setShowStatsModal(true)}
        onOpenRulesModal={() => setShowRulesModal(true)}
      />

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-4 sm:space-y-6 p-3 sm:p-6">
        {/* Unlimited Mode Filter Bar */}
        {mode === "unlimited" && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-surface-border bg-surface p-3 sm:p-4 shadow-md">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="flex items-center gap-1 font-bold text-slate-400">
                <Filter className="h-3.5 w-3.5 text-emerald-400" />
                <span>Filters:</span>
              </span>

              {/* Difficulty Filter */}
              <select
                value={unlimitedDifficulty}
                onChange={(e) => setUnlimitedDifficulty(e.target.value as any)}
                className="rounded-lg border border-surface-border bg-surface-subtle px-2.5 py-1 text-xs font-semibold text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="all">All Difficulties</option>
                <option value="iconic">Iconic</option>
                <option value="regional">Regional</option>
                <option value="endemic">Endemic</option>
              </select>

              {/* Taxon Class Filter */}
              <select
                value={unlimitedTaxon}
                onChange={(e) => setUnlimitedTaxon(e.target.value as any)}
                className="rounded-lg border border-surface-border bg-surface-subtle px-2.5 py-1 text-xs font-semibold text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="all">All Classes</option>
                <option value="Mammalia">Mammals</option>
                <option value="Aves">Birds</option>
                <option value="Reptilia">Reptiles</option>
                <option value="Amphibia">Amphibians</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleNextUnlimited}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 text-xs font-bold text-emerald-400 transition-colors hover:bg-emerald-500/30"
            >
              <Shuffle className="h-3.5 w-3.5" />
              <span>Randomize Species</span>
            </button>
          </div>
        )}

        {/* 1. Species Hero Card */}
        <SpeciesHero species={currentSpecies} lang={lang} isSolved={isSolved} />

        {/* 2. Map Canvas Toolbar */}
        <div ref={mapSectionRef}>
          <MapToolbar
            tool={tool}
            onSelectTool={setTool}
            brushRadiusKm={brushRadiusKm}
            onSelectRadius={setBrushRadiusKm}
            snapToLand={snapToLand}
            onToggleSnap={() => setSnapToLand(!snapToLand)}
            onUndo={handleUndo}
            onClear={handleClear}
            onSubmit={handleSubmit}
            canUndo={undoStack.length > 0}
            hasDrawn={hasDrawn}
            isSolved={isSolved}
            lang={lang}
          />
        </div>

        {/* 3. Interactive Robinson Map Canvas (Kept in full view!) */}
        <MapCanvas
          species={currentSpecies}
          tool={tool}
          brushRadiusKm={brushRadiusKm}
          snapToLand={snapToLand}
          userMask={userMask}
          onUpdateMask={handleUpdateMask}
          isSolved={isSolved}
          scoreResult={scoreResult}
          lang={lang}
        />

        {/* 4. Evaluated Result Scoreboard (Directly visible on the page, keeping the map in full view!) */}
        {isSolved && scoreResult && (
          <div className="rounded-3xl border border-emerald-500/40 bg-surface p-5 sm:p-6 shadow-2xl space-y-5 animate-fade-in">
            {/* Top Score Bar */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-surface-border pb-4">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-2xl border px-3 py-1.5 text-xs font-black uppercase tracking-wider ${getGradeColor(
                    scoreResult.grade
                  )}`}
                >
                  <Award className="h-4 w-4" />
                  <span>Grade {scoreResult.grade}</span>
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    {scoreResult.score}{" "}
                    <span className="text-sm font-semibold text-slate-400">/ 1000</span>
                  </h2>
                  <p className="text-xs text-emerald-400 font-medium">
                    Native distribution contrasted against your prediction
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs sm:text-sm font-extrabold text-slate-950 transition-colors hover:bg-emerald-400 shadow-md shadow-emerald-500/20"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                  <span>{copied ? getTranslation(lang, "copied") : getTranslation(lang, "share")}</span>
                </button>

                {mode === "unlimited" && (
                  <button
                    type="button"
                    onClick={handleNextUnlimited}
                    className="flex items-center gap-1.5 rounded-xl border border-surface-border bg-surface-subtle px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-200 transition-colors hover:bg-surface-elevated hover:text-white"
                  >
                    <span>{getTranslation(lang, "playAgain")}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Diagnostic Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <div className="rounded-xl border border-surface-border bg-surface-subtle p-3 text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase">IoU Overlap</span>
                <p className="mt-0.5 text-lg font-black text-emerald-400">{scoreResult.iou}%</p>
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-subtle p-3 text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Precision</span>
                <p className="mt-0.5 text-lg font-black text-cyan-400">{scoreResult.precision}%</p>
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-subtle p-3 text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Recall</span>
                <p className="mt-0.5 text-lg font-black text-indigo-400">{scoreResult.recall}%</p>
              </div>

              <div className="rounded-xl border border-surface-border bg-surface-subtle p-3 text-center">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Proximity Bonus</span>
                <p className="mt-0.5 text-lg font-black text-amber-400">+{scoreResult.proximityBonus}</p>
              </div>
            </div>

            {/* Geographic Area Summary */}
            <div className="rounded-xl border border-surface-border bg-surface-subtle p-3.5 text-xs text-slate-300 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="flex items-center justify-between sm:justify-start sm:gap-2">
                <span className="flex items-center gap-1 text-emerald-400 font-medium">
                  <span className="h-2 w-2 rounded-sm bg-emerald-500" />
                  <span>Hit:</span>
                </span>
                <span className="font-mono font-bold text-slate-200">
                  {scoreResult.truePositiveAreaKm2.toLocaleString()} km²
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-start sm:gap-2">
                <span className="flex items-center gap-1 text-amber-400 font-medium">
                  <span className="h-2 w-2 rounded-sm bg-amber-500" />
                  <span>Overestimated:</span>
                </span>
                <span className="font-mono font-bold text-slate-200">
                  {scoreResult.falsePositiveAreaKm2.toLocaleString()} km²
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-start sm:gap-2">
                <span className="flex items-center gap-1 text-sky-400 font-medium">
                  <span className="h-2 w-2 rounded-sm bg-sky-400" />
                  <span>Missed:</span>
                </span>
                <span className="font-mono font-bold text-slate-200">
                  {scoreResult.falseNegativeAreaKm2.toLocaleString()} km²
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 5. Conservation Deep Dive Card (Revealed upon solving) */}
        {isSolved && <ConservationCard species={currentSpecies} lang={lang} />}
      </main>

      {/* Modals */}
      {scoreResult && (
        <ScoreModal
          species={currentSpecies}
          scoreResult={scoreResult}
          isOpen={showScoreModal}
          onClose={() => setShowScoreModal(false)}
          onNextSpecies={mode === "unlimited" ? handleNextUnlimited : undefined}
          isDaily={mode === "daily"}
          dayNumber={dayNumber}
          lang={lang}
        />
      )}

      <StatsModal
        stats={stats}
        isOpen={showStatsModal}
        onClose={() => setShowStatsModal(false)}
        lang={lang}
      />

      <RulesModal
        isOpen={showRulesModal}
        onClose={() => setShowRulesModal(false)}
        lang={lang}
      />

      <LanguageModal
        currentLang={lang}
        onSelectLang={changeLanguage}
        isOpen={showLangModal}
        onClose={() => setShowLangModal(false)}
      />

      {/* Footer */}
      <footer className="mt-12 border-t border-surface-border px-4 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-6xl space-y-2">
          <p className="font-medium text-slate-400">
            GeoFauna · Open-Biodiversity Species Distribution Deduction Game
          </p>
          <p>
            Powered by open data from the{" "}
            <a
              href="https://www.iucnredlist.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              IUCN Red List
            </a>
            , Natural Earth, and{" "}
            <a
              href="https://commons.wikimedia.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              Wikimedia Commons
            </a>
            .
          </p>
          <div className="flex items-center justify-center gap-4 pt-2 text-slate-400">
            <a
              href="https://carlosrodriguezpardo.es"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Carlos Rodríguez-Pardo
            </a>
            <span>·</span>
            <a
              href="https://github.com/crp94/geofauna"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Source on GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
