"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
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
import { Filter, Shuffle, Sparkles, Trophy } from "lucide-react";

export default function HomePage() {
  const speciesList = speciesCatalog as unknown as Species[];

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
    setShowScoreModal(true);

    const rle = encodeRle(userMask);
    const updatedStats = recordGameResult(
      todayKey,
      currentSpecies.id,
      result,
      rle,
      mode === "daily"
    );
    setStats(updatedStats);
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

        {/* 3. Interactive Robinson Map Canvas */}
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

        {/* 4. Resolved Result Notification Banner */}
        {isSolved && scoreResult && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 font-black text-lg shadow-md">
                {scoreResult.grade}
              </div>
              <div>
                <p className="font-extrabold text-white sm:text-lg">
                  Spatial Accuracy: {scoreResult.score} / 1000 ({scoreResult.iou}% IoU)
                </p>
                <p className="text-xs text-emerald-300">
                  Inspecting native distribution vs. prediction on the Robinson projection.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowScoreModal(true)}
              className="rounded-xl bg-emerald-500 px-4 py-2 text-xs sm:text-sm font-extrabold text-slate-950 transition-colors hover:bg-emerald-400"
            >
              View Score Card & Share
            </button>
          </div>
        )}

        {/* 5. Conservation Deep Dive Card (Revealed upon solving or exploring) */}
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
