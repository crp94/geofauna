"use client";

import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Link from "next/link";
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
import { ConservationCard } from "../components/ConservationCard";
import { StatsModal } from "../components/StatsModal";
import { RulesModal } from "../components/RulesModal";
import { LanguageModal } from "../components/LanguageModal";
import { DailyCommunityStats } from "../components/DailyCommunityStats";
import { evaluatePrediction } from "../lib/scoring";
import {
  decodeRle,
  encodeRle,
  TOTAL_CELLS,
} from "../lib/maskCompression";
import {
  getDailyProgress,
  getStoredLanguage,
  getDefaultStats,
  getStoredStats,
  recordGameResult,
  setStoredLanguage,
} from "../lib/storage";
import { getTranslation } from "../lib/i18n";
import { playScoreReveal } from "../lib/sound";
import { trackGameEvent } from "../lib/analytics";
import { submitDailyScore } from "../lib/dailyStats";
import { confettiColors } from "../lib/theme";
import {
  Check,
  Clock,
  Filter,
  History,
  Share2,
  Shuffle,
  ArrowRight,
} from "lucide-react";

// Epoch for the daily expedition counter — 2026-01-01 is expedition #1.
const DAILY_EPOCH = { year: 2026, month: 0, day: 1 };

/** Local (not UTC) calendar date as "YYYY-MM-DD", so the daily puzzle rolls
 * over at the player's own midnight rather than at UTC midnight. */
function toLocalDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Whole-day difference between two local calendar dates (b - a). Computed
 * via Date.UTC on the date components so DST transitions can't skew it. */
function localDaysBetween(a: Date, b: Date): number {
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((utcB - utcA) / 86400000);
}

function computeDayNumber(today: Date): number {
  const epoch = new Date(DAILY_EPOCH.year, DAILY_EPOCH.month, DAILY_EPOCH.day);
  return Math.max(1, localDaysBetween(epoch, today) + 1);
}

/**
 * Small deterministic PRNG (mulberry32) — the same seed always produces the
 * same sequence, which is what lets the daily schedule be reproduced from
 * just a day number, with no server and no stored schedule.
 */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Seeded Fisher-Yates shuffle of the indices [0, length). */
function seededShuffleIndices(length: number, seed: number): number[] {
  const rand = mulberry32(seed);
  const order = Array.from({ length }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = order[i];
    order[i] = order[j];
    order[j] = tmp;
  }
  return order;
}

/**
 * Deterministic shuffled-cycle daily selector (replaces the old
 * `(epochDays*17+42) % length` formula). `sortedPool` must be sorted by
 * species id so the schedule is stable against catalog reordering; a cycle
 * is `sortedPool.length` days long, re-shuffled with a PRNG seeded from the
 * cycle index, guaranteeing every species is played exactly once per cycle.
 * When the catalog grows, only *future* cycles get the new (longer) length —
 * days already played are unaffected.
 */
function pickDailySpecies(dayNumber: number, sortedPool: Species[]): Species {
  const length = sortedPool.length;
  const zeroBasedDay = Math.max(0, dayNumber - 1);
  const cycleIndex = Math.floor(zeroBasedDay / length);
  const withinCycle = zeroBasedDay % length;
  const order = seededShuffleIndices(length, cycleIndex);
  return sortedPool[order[withinCycle]];
}

function getNextLocalMidnight(from: Date): Date {
  return new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1, 0, 0, 0, 0);
}

function formatCountdown(remainingMs: number): string {
  const totalMinutes = Math.max(0, Math.ceil(remainingMs / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}

function getGradeStampClasses(grade: ScoreResult["grade"]): string {
  switch (grade) {
    case "S":
    case "A":
      return "text-accent-ink border-accent bg-accent-soft";
    case "B":
      return "text-iucn-lc-text border-iucn-lc-edge bg-iucn-lc-fill";
    case "C":
      return "text-ochre border-ochre bg-ochre-soft";
    default:
      return "text-terracotta-ink border-terracotta bg-terracotta-soft";
  }
}

function getSpatialFeedback(result: ScoreResult, lang: Language): string {
  if (result.precision + 12 < result.recall) return getTranslation(lang, "feedbackTooBroad");
  if (result.recall + 12 < result.precision) return getTranslation(lang, "feedbackTooNarrow");
  if (result.iou >= 60) return getTranslation(lang, "feedbackStrong");
  return getTranslation(lang, "feedbackBalanced");
}

type TaxonLabelKey =
  | "taxonMammals"
  | "taxonBirds"
  | "taxonReptiles"
  | "taxonAmphibians"
  | "taxonFish"
  | "taxonInsects";

const TAXON_FILTERS: Array<{ value: TaxonClass | "Fish"; labelKey: TaxonLabelKey }> = [
  { value: "Mammalia", labelKey: "taxonMammals" },
  { value: "Aves", labelKey: "taxonBirds" },
  { value: "Reptilia", labelKey: "taxonReptiles" },
  { value: "Amphibia", labelKey: "taxonAmphibians" },
  { value: "Fish", labelKey: "taxonFish" },
  { value: "Insecta", labelKey: "taxonInsects" },
];

type DifficultyLabelKey = "difficultyIconic" | "difficultyRegional" | "difficultyEndemic";

const DIFFICULTY_FILTERS: Array<{ value: DifficultyTier; labelKey: DifficultyLabelKey }> = [
  { value: "iconic", labelKey: "difficultyIconic" },
  { value: "regional", labelKey: "difficultyRegional" },
  { value: "endemic", labelKey: "difficultyEndemic" },
];

function speciesMatchesTaxonFilter(species: Species, filter: TaxonClass | "Fish" | "all"): boolean {
  if (filter === "all") return true;
  if (filter === "Fish") {
    return species.taxonClass === "Actinopterygii" || species.taxonClass === "Chondrichthyes";
  }
  return species.taxonClass === filter;
}

function durationBand(elapsedMs: number): string {
  if (elapsedMs < 30_000) return "<30s";
  if (elapsedMs < 60_000) return "30-60s";
  if (elapsedMs < 180_000) return "1-3m";
  if (elapsedMs < 600_000) return "3-10m";
  return ">10m";
}

function streakBand(streak: number): string {
  if (streak <= 3) return String(streak);
  if (streak <= 7) return "4-7";
  if (streak <= 30) return "8-30";
  return "30+";
}

export default function HomePage() {
  const speciesList = speciesCatalog as unknown as Species[];
  const mapSectionRef = useRef<HTMLDivElement>(null);
  const speciesViewedAtRef = useRef<number>(Date.now());

  // App State
  const [lang, setLang] = useState<Language>("en");
  const [mode, setMode] = useState<GameMode>("daily");
  const [unlimitedDifficulty, setUnlimitedDifficulty] = useState<DifficultyTier | "all">("all");
  const [unlimitedTaxon, setUnlimitedTaxon] = useState<TaxonClass | "Fish" | "all">("all");
  const [currentSpeciesIndex, setCurrentSpeciesIndex] = useState<number>(0);

  // Drawing Tools State
  const [tool, setTool] = useState<"brush" | "eraser" | "pan">("brush");
  const [brushRadiusKm, setBrushRadiusKm] = useState<number>(450);
  const [snapToLand, setSnapToLand] = useState<boolean>(true);
  const [userMask, setUserMask] = useState<Uint8Array>(new Uint8Array(TOTAL_CELLS));
  const [undoStack, setUndoStack] = useState<Uint8Array[]>([]);

  // Resolution & Modals State
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [scoreResult, setScoreResult] = useState<ScoreResult | undefined>();
  const [showStatsModal, setShowStatsModal] = useState<boolean>(false);
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);
  const [showLangModal, setShowLangModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [stats, setStats] = useState(getDefaultStats());
  const [countdownText, setCountdownText] = useState<string>("");

  // Date Keys — local calendar date, never UTC, so rollover matches the
  // player's own midnight.
  const [todayKey, setTodayKey] = useState(() => toLocalDateKey(new Date()));
  const [dayNumber, setDayNumber] = useState(() => computeDayNumber(new Date()));

  // Stable id-sorted pool: the shuffle schedule is keyed to this order, so
  // it survives the catalog JSON being reordered, and catalog growth only
  // changes cycles that haven't happened yet.
  const speciesSortedById = useMemo(
    () => [...speciesList].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)),
    [speciesList]
  );

  // Daily Species Selector (deterministic shuffled cycles)
  const dailySpecies = useMemo(
    () => pickDailySpecies(dayNumber, speciesSortedById),
    [dayNumber, speciesSortedById]
  );

  const yesterdaySpecies = useMemo(() => {
    if (dayNumber <= 1) return null;
    return pickDailySpecies(dayNumber - 1, speciesSortedById);
  }, [dayNumber, speciesSortedById]);

  // Current Active Species
  const currentSpecies = useMemo(() => {
    if (mode === "daily") return dailySpecies;
    return speciesList[currentSpeciesIndex] || speciesList[0];
  }, [mode, dailySpecies, speciesList, currentSpeciesIndex]);

  // Load language and stats on mount
  useEffect(() => {
    setLang(getStoredLanguage());
    setStats(getStoredStats());
    const speciesId = new URLSearchParams(window.location.search).get("species");
    const selectedIndex = speciesList.findIndex((species) => species.id === speciesId);
    if (selectedIndex >= 0) {
      setMode("unlimited");
      setCurrentSpeciesIndex(selectedIndex);
    }
  }, []);

  // Keep <html lang> in sync for assistive tech and the browser UI.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    trackGameEvent("game_viewed", { mode, species_id: currentSpecies.id, taxon: currentSpecies.taxonClass });
    speciesViewedAtRef.current = Date.now();
  }, [mode, currentSpecies.id, currentSpecies.taxonClass]);

  // Load Daily state on mode / date change
  const loadDailyProgress = useCallback(() => {
    const progress = getDailyProgress(todayKey);
    if (progress && progress.completed && progress.scoreResult && progress.speciesId === dailySpecies.id) {
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
  }, [todayKey, dailySpecies.id]);

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

  // Live countdown to the next local-midnight expedition, once the daily is solved.
  useEffect(() => {
    if (!(mode === "daily" && isSolved)) {
      setCountdownText("");
      return;
    }
    const update = () => {
      const freshKey = toLocalDateKey(new Date());
      if (freshKey !== todayKey) {
        setTodayKey(freshKey);
        setDayNumber(computeDayNumber(new Date()));
      }
      const now = new Date();
      setCountdownText(formatCountdown(getNextLocalMidnight(now).getTime() - now.getTime()));
    };
    update();
    const intervalId = window.setInterval(update, 60000);
    return () => window.clearInterval(intervalId);
  }, [mode, isSolved, todayKey]);

  // Mask Update with Undo Management
  const handleUpdateMask = (newMask: Uint8Array) => {
    let changed = false;
    for (let i = 0; i < newMask.length; i += 1) {
      if (newMask[i] !== userMask[i]) {
        changed = true;
        break;
      }
    }
    if (!changed) return;
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
    const result = evaluatePrediction(userMask, gtMask, currentSpecies.range.calibration);

    setScoreResult(result);
    setIsSolved(true);

    // Play score fanfare audio & confetti on good scores
    playScoreReveal(result.grade);
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReducedMotion && (result.grade === "S" || result.grade === "A")) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: [...confettiColors],
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

    if (mode === "daily") {
      // Fire-and-forget: never blocks or throws, and no-ops when the
      // community-stats feature is disabled.
      void submitDailyScore(todayKey, result.score);
    }

    const scoreBand = Math.floor(result.score / 100) * 100;
    const elapsedMs = Date.now() - speciesViewedAtRef.current;
    trackGameEvent("guess_submitted", {
      mode,
      species_id: currentSpecies.id,
      taxon: currentSpecies.taxonClass,
      grade: result.grade,
      score_band: scoreBand,
      iou_band: Math.floor(result.iou / 10) * 10,
      calibration_applied: Boolean(result.calibrationApplied),
      duration_band: durationBand(elapsedMs),
    });

    if (mode === "daily") {
      trackGameEvent("daily_completed", {
        day_number: dayNumber,
        grade: result.grade,
        score_band: scoreBand,
        streak_band: streakBand(updatedStats.currentStreak),
      });
    }

    // Scroll smoothly to map and score
    setTimeout(() => {
      mapSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  // Share result — native share sheet first, clipboard fallback
  const handleShare = async () => {
    if (!scoreResult) return;
    const localizedName = currentSpecies.commonName[lang] || currentSpecies.commonName.en;
    const squaresCount = Math.round(scoreResult.score / 200);
    const greenSquares = "🟩".repeat(squaresCount);
    const whiteSquares = "⬜".repeat(5 - squaresCount);

    const shareText =
      mode === "daily"
        ? `🐾 GeoFauna #${dayNumber} · ${localizedName}\n🎯 Score: ${scoreResult.score}/1000 (Grade ${scoreResult.grade})\n${greenSquares}${whiteSquares} (IoU: ${scoreResult.iou}%)\nhttps://geofauna.carlosrodriguezpardo.es`
        : `🐾 GeoFauna · ${localizedName}\n🎯 Score: ${scoreResult.score}/1000 (Grade ${scoreResult.grade})\n${greenSquares}${whiteSquares} (IoU: ${scoreResult.iou}%)\nhttps://geofauna.carlosrodriguezpardo.es`;

    const scoreBand = Math.floor(scoreResult.score / 100) * 100;
    const trackShareSuccess = (method: "native" | "clipboard") => {
      trackGameEvent("result_shared", { mode, grade: scoreResult.grade, score_band: scoreBand });
      trackGameEvent("share_completed", { method, mode, grade: scoreResult.grade });
    };

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text: shareText });
        trackShareSuccess("native");
        return;
      } catch {
        // User cancelled the native share sheet, or the payload is
        // unsupported — fall through to the clipboard fallback.
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        trackShareSuccess("clipboard");
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Clipboard write failed (permissions, insecure context) — nothing more to do.
      }
    }
  };

  // Unlimited Mode: Next Random Species
  const handleNextUnlimited = () => {
    const filtered = speciesList.filter((s) => {
      const matchDiff = unlimitedDifficulty === "all" || s.difficulty === unlimitedDifficulty;
      const matchTaxon = speciesMatchesTaxonFilter(s, unlimitedTaxon);
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

    trackGameEvent("unlimited_next_species", {
      difficulty: unlimitedDifficulty,
      taxon: unlimitedTaxon,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasDrawn = useMemo(() => {
    for (let i = 0; i < userMask.length; i++) {
      if (userMask[i] === 1) return true;
    }
    return false;
  }, [userMask]);

  const handleSelectMode = (newMode: GameMode) => {
    if (newMode !== mode) {
      trackGameEvent("mode_switched", { from: mode, to: newMode });
    }
    setMode(newMode);
  };

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    setStoredLanguage(newLang);
    trackGameEvent("language_changed", { lang: newLang });
  };

  const openStatsModal = () => {
    trackGameEvent("modal_opened", { modal: "stats" });
    setShowStatsModal(true);
  };

  const openRulesModal = () => {
    trackGameEvent("modal_opened", { modal: "rules" });
    setShowRulesModal(true);
  };

  const openLangModal = () => {
    trackGameEvent("modal_opened", { modal: "language" });
    setShowLangModal(true);
  };

  const handleYesterdaySpeciesClick = () => {
    if (yesterdaySpecies) {
      trackGameEvent("yesterday_species_clicked", { species_id: yesterdaySpecies.id });
    }
  };

  const resultAnnouncement =
    isSolved && scoreResult
      ? `${getTranslation(lang, "gradeLabel")} ${scoreResult.grade} — ${scoreResult.score} / 1000, IoU ${scoreResult.iou}%`
      : "";

  const yesterdaySpeciesName = yesterdaySpecies
    ? yesterdaySpecies.commonName[lang] || yesterdaySpecies.commonName.en
    : "";

  return (
    <div className="flex min-h-screen flex-col bg-paper-base text-ink-900 selection:bg-accent selection:text-paper-raised">
      {/* Skip link */}
      <a
        href="#map-toolbar"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:border focus:border-rule-strong focus:bg-paper-raised focus:px-3 focus:py-2 focus:text-[12px] focus:font-semibold focus:text-ink-900 focus:shadow-lift"
      >
        {getTranslation(lang, "skipToMap")}
      </a>

      {/* Announces the result to screen readers once the guess is submitted */}
      <div aria-live="polite" className="sr-only">
        {resultAnnouncement}
      </div>

      {/* Header */}
      {/* dayNumber may briefly mismatch server/client render on first paint (static page + live local date); this is expected and self-corrects via the interval effect above. */}
      <Header
        mode={mode}
        onSelectMode={handleSelectMode}
        streak={stats.currentStreak}
        lang={lang}
        dayNumber={dayNumber}
        onOpenLangModal={openLangModal}
        onOpenStatsModal={openStatsModal}
        onOpenRulesModal={openRulesModal}
      />

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-4 sm:space-y-6 p-3 sm:p-6">
        {/* Unlimited Mode Filter Bar */}
        {mode === "unlimited" && (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-rule bg-paper-sunken p-3 sm:p-4">
            <div className="flex flex-wrap items-center gap-2 text-[12px]">
              <span className="flex items-center gap-1 font-semibold uppercase tracking-wide text-ink-500">
                <Filter className="h-3.5 w-3.5 text-accent" />
                <span>{getTranslation(lang, "filtersLabel")}</span>
              </span>

              {/* Difficulty Filter */}
              <label className="sr-only" htmlFor="filter-difficulty">
                {getTranslation(lang, "difficulty")}
              </label>
              <select
                id="filter-difficulty"
                value={unlimitedDifficulty}
                onChange={(e) => setUnlimitedDifficulty(e.target.value as DifficultyTier | "all")}
                className="rounded-md border border-rule bg-paper-raised px-2.5 py-1 text-[12px] font-semibold text-ink-700 focus:border-accent focus:outline-none"
              >
                <option value="all">{getTranslation(lang, "filterAllDifficulties")}</option>
                {DIFFICULTY_FILTERS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {getTranslation(lang, item.labelKey)}
                  </option>
                ))}
              </select>

              {/* Taxon Class Filter */}
              <label className="sr-only" htmlFor="filter-taxon">
                {getTranslation(lang, "filterAllClasses")}
              </label>
              <select
                id="filter-taxon"
                value={unlimitedTaxon}
                onChange={(e) => setUnlimitedTaxon(e.target.value as TaxonClass | "Fish" | "all")}
                className="rounded-md border border-rule bg-paper-raised px-2.5 py-1 text-[12px] font-semibold text-ink-700 focus:border-accent focus:outline-none"
              >
                <option value="all">{getTranslation(lang, "filterAllClasses")}</option>
                {TAXON_FILTERS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {getTranslation(lang, item.labelKey)}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleNextUnlimited}
              className="flex items-center gap-1.5 rounded-md border border-accent-line bg-accent-soft px-3 py-1.5 text-[12px] font-semibold text-accent-ink transition-colors hover:bg-accent-soft/70"
            >
              <Shuffle className="h-3.5 w-3.5" />
              <span>{getTranslation(lang, "randomizeSpecies")}</span>
            </button>
          </div>
        )}

        {/* 1. Species Hero Card */}
        <SpeciesHero species={currentSpecies} lang={lang} isSolved={isSolved} />

        {/* 2. Map Canvas Toolbar */}
        <div ref={mapSectionRef} id="map-toolbar">
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

        {/* 4. Expedition Report — evaluated result, kept directly on the page */}
        {isSolved && scoreResult && (
          <section className="plate space-y-5 rounded-lg bg-paper-raised p-5 shadow-paper sm:p-6 animate-fade-in">
            {/* Top Score Bar */}
            <div className="flex flex-col gap-4 border-b border-rule pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`stamp animate-stamp-in px-3 py-1.5 text-sm uppercase tracking-wide ${getGradeStampClasses(
                    scoreResult.grade
                  )}`}
                >
                  {getTranslation(lang, "gradeLabel")} {scoreResult.grade}
                </span>
                <div>
                  <h2 className="font-display text-4xl text-ink-900">
                    {scoreResult.score}{" "}
                    <span className="font-mono text-base text-ink-500">/1000</span>
                  </h2>
                  <p className="text-[12px] text-ink-500">{getTranslation(lang, "scoreSubtitle")}</p>
                  {scoreResult.calibrationApplied && (
                    <p className="text-[12px] italic text-ink-500">
                      {getTranslation(lang, "difficultyAdjusted")}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-1.5 rounded-md bg-accent px-4 py-2.5 text-[12px] sm:text-sm font-semibold text-paper-raised shadow-paper transition-colors hover:bg-accent-ink"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                  <span>{copied ? getTranslation(lang, "copied") : getTranslation(lang, "share")}</span>
                </button>

                {mode === "unlimited" && (
                  <button
                    type="button"
                    onClick={handleNextUnlimited}
                    className="flex items-center gap-1.5 rounded-md border border-rule bg-paper-raised px-4 py-2.5 text-[12px] sm:text-sm font-semibold text-ink-700 transition-colors hover:bg-paper-sunken hover:text-ink-900"
                  >
                    <span>{getTranslation(lang, "playAgain")}</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Diagnostic Metrics Grid — mono values, no rainbow colors */}
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <div className="rounded-md border border-rule bg-paper-sunken p-3 text-center">
                <span className="text-[12px] font-semibold uppercase tracking-wide text-ink-500">
                  {getTranslation(lang, "iouShort")}
                </span>
                <p className="mt-0.5 font-mono text-lg font-semibold text-ink-900">{scoreResult.iou}%</p>
              </div>

              <div className="rounded-md border border-rule bg-paper-sunken p-3 text-center">
                <span className="text-[12px] font-semibold uppercase tracking-wide text-ink-500">
                  {getTranslation(lang, "diceShort")}
                </span>
                <p className="mt-0.5 font-mono text-lg font-semibold text-ink-900">{scoreResult.dice}%</p>
              </div>

              <div className="rounded-md border border-rule bg-paper-sunken p-3 text-center">
                <span className="text-[12px] font-semibold uppercase tracking-wide text-ink-500">
                  {getTranslation(lang, "precisionShort")}
                </span>
                <p className="mt-0.5 font-mono text-lg font-semibold text-ink-900">{scoreResult.precision}%</p>
              </div>

              <div className="rounded-md border border-rule bg-paper-sunken p-3 text-center">
                <span className="text-[12px] font-semibold uppercase tracking-wide text-ink-500">
                  {getTranslation(lang, "recallShort")}
                </span>
                <p className="mt-0.5 font-mono text-lg font-semibold text-ink-900">{scoreResult.recall}%</p>
              </div>
            </div>

            {/* Spatial Read */}
            <div className="grid grid-cols-1 gap-2 rounded-md border-l-2 border-accent bg-accent-soft/40 p-3 text-[12px] text-ink-700 sm:grid-cols-3 sm:items-center">
              <p className="sm:col-span-2">
                <span className="font-semibold text-accent-ink">{getTranslation(lang, "spatialReadLabel")}</span>{" "}
                {getSpatialFeedback(scoreResult, lang)}
              </p>
              <div className="flex justify-between gap-3 font-mono text-[12px] sm:flex-col sm:items-end">
                <span>
                  {getTranslation(lang, "meanMissLabel")}{" "}
                  <strong className="text-ink-900">
                    {(scoreResult.meanMissDistanceKm ?? 0).toLocaleString()} km
                  </strong>
                </span>
                <span>
                  {getTranslation(lang, "guessSizeLabel")}{" "}
                  <strong className="text-ink-900">{(scoreResult.rangeAreaRatio ?? 0).toFixed(2)}×</strong>
                </span>
              </div>
            </div>

            {/* Geographic Area Summary */}
            <div className="grid grid-cols-1 gap-2 rounded-md border border-rule bg-paper-sunken p-3.5 text-[12px] text-ink-700 sm:grid-cols-3">
              <div className="flex items-center justify-between sm:justify-start sm:gap-2">
                <span className="flex items-center gap-1.5 font-medium text-paint-overlapInk">
                  <span className="h-2 w-2 rounded-sm bg-paint-overlap" />
                  <span>{getTranslation(lang, "hitLabel")}</span>
                </span>
                <span className="font-mono font-semibold text-ink-900">
                  {scoreResult.truePositiveAreaKm2.toLocaleString()} km²
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-start sm:gap-2">
                <span className="flex items-center gap-1.5 font-medium text-paint-overestimateInk">
                  <span className="h-2 w-2 rounded-sm bg-paint-overestimate" />
                  <span>{getTranslation(lang, "overestimatedLabel")}</span>
                </span>
                <span className="font-mono font-semibold text-ink-900">
                  {scoreResult.falsePositiveAreaKm2.toLocaleString()} km²
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-start sm:gap-2">
                <span className="flex items-center gap-1.5 font-medium text-paint-missedInk">
                  <span className="h-2 w-2 rounded-sm bg-paint-missed" />
                  <span>{getTranslation(lang, "missedLabel")}</span>
                </span>
                <span className="font-mono font-semibold text-ink-900">
                  {scoreResult.falseNegativeAreaKm2.toLocaleString()} km²
                </span>
              </div>
            </div>

            {/* Daily-only extras: community stats, countdown, yesterday's species */}
            {mode === "daily" && (
              <div className="space-y-2 border-t border-rule pt-4">
                <DailyCommunityStats day={todayKey} score={scoreResult.score} lang={lang} />
                <div className="flex flex-wrap items-center justify-between gap-3 text-[12px] text-ink-500">
                  <span className="flex items-center gap-1.5 font-mono">
                    <Clock className="h-3.5 w-3.5" />
                    {getTranslation(lang, "nextExpedition")} {countdownText}
                  </span>
                  {yesterdaySpecies && (
                    <Link
                      href={`/species/${yesterdaySpecies.id}`}
                      onClick={handleYesterdaySpeciesClick}
                      className="flex items-center gap-1.5 text-accent-ink underline decoration-rule hover:text-accent"
                    >
                      <History className="h-3.5 w-3.5" />
                      {getTranslation(lang, "yesterdaysSpecies")}: {yesterdaySpeciesName}
                    </Link>
                  )}
                </div>
              </div>
            )}
          </section>
        )}

        {/* 5. Conservation Deep Dive Card (Revealed upon solving) */}
        {isSolved && <ConservationCard species={currentSpecies} lang={lang} />}
      </main>

      {/* Modals */}
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
      <footer className="mt-12 border-t border-rule-strong px-4 py-8 text-center text-[12px] text-ink-500">
        <div className="mx-auto max-w-6xl space-y-3">
          <p className="font-display text-sm text-ink-700">{getTranslation(lang, "footerTitle")}</p>
          <p>
            {getTranslation(lang, "footerSources")}{" "}
            <a
              href="https://www.gbif.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-ink underline decoration-rule hover:text-accent"
            >
              GBIF
            </a>
            ,{" "}
            <a
              href="https://www.inaturalist.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-ink underline decoration-rule hover:text-accent"
            >
              iNaturalist
            </a>
            ,{" "}
            <a
              href="https://www.iucnredlist.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-ink underline decoration-rule hover:text-accent"
            >
              IUCN Red List
            </a>
            , Natural Earth, and{" "}
            <a
              href="https://commons.wikimedia.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-ink underline decoration-rule hover:text-accent"
            >
              Wikimedia Commons
            </a>
            .
          </p>

          <div className="space-y-1.5">
            <p className="font-semibold uppercase tracking-wide text-ink-500">
              {getTranslation(lang, "moreGames")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <a
                href="https://cityle.carlosrodriguezpardo.es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-ink underline decoration-rule hover:text-accent"
              >
                Cityle
              </a>
              <a
                href="https://climatle.carlosrodriguezpardo.es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-ink underline decoration-rule hover:text-accent"
              >
                Climatle
              </a>
              <a
                href="https://phackle.carlosrodriguezpardo.es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-ink underline decoration-rule hover:text-accent"
              >
                P-hackle
              </a>
              <a
                href="https://atletixi.carlosrodriguezpardo.es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-ink underline decoration-rule hover:text-accent"
              >
                Atletixi
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-2 text-ink-500">
            <a
              href="https://carlosrodriguezpardo.es"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink-900"
            >
              Carlos Rodríguez-Pardo
            </a>
            <span>·</span>
            <a
              href="https://github.com/crp94/geofauna"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-ink underline decoration-rule hover:text-accent"
            >
              {getTranslation(lang, "footerSource")}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
