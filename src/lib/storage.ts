import { DailyProgress, GameStats, Language, ScoreResult } from "../types/species";

// v2: date keys switched from UTC (toISOString) to local-calendar dates.
// Bumping the storage key gives every player a clean, consistent reset
// instead of silently corrupting streak continuity for players whose
// local date differed from UTC at their usual play time.
const STATS_KEY = "geofauna_stats_v2";
const LANG_KEY = "geofauna_lang_v1";

export function getStoredLanguage(): Language {
  if (typeof window === "undefined") return "en";

  // Check URL search params first (?lang=en | ?lang=es | ?lang=it)
  try {
    const params = new URLSearchParams(window.location.search);
    const paramLang = params.get("lang");
    if (paramLang === "es" || paramLang === "it" || paramLang === "en") {
      localStorage.setItem(LANG_KEY, paramLang);
      return paramLang;
    }
  } catch {}

  // Check saved localStorage preference
  const saved = localStorage.getItem(LANG_KEY);
  if (saved === "es" || saved === "it" || saved === "en") {
    return saved;
  }

  // Default to English
  return "en";
}

export function setStoredLanguage(lang: Language): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LANG_KEY, lang);
}

/** SSR-safe empty stats. Use as the initial React state so the first client
 * render matches the server HTML; hydrate real localStorage values in an
 * effect (reading localStorage in a useState initializer causes hydration
 * mismatches once a streak exists). */
export function getDefaultStats(): GameStats {
  return {
    gamesPlayed: 0,
    gamesCompleted: 0,
    currentStreak: 0,
    maxStreak: 0,
    averageScore: 0,
    gradeCounts: { S: 0, A: 0, B: 0, C: 0, D: 0 },
    dailyHistory: {},
  };
}

export function getStoredStats(): GameStats {
  const defaultStats = getDefaultStats();

  if (typeof window === "undefined") return defaultStats;

  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return defaultStats;
    const parsed = JSON.parse(raw);
    return { ...defaultStats, ...parsed };
  } catch {
    return defaultStats;
  }
}

/** Local (not UTC) calendar date as "YYYY-MM-DD", so the streak/date math
 * follows the player's own midnight rather than UTC's. */
function toLocalDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function yesterdayLocalDateKey(from: Date = new Date()): string {
  const yesterday = new Date(from.getFullYear(), from.getMonth(), from.getDate() - 1);
  return toLocalDateKey(yesterday);
}

export function recordGameResult(
  dateKey: string,
  speciesId: string,
  scoreResult: ScoreResult,
  drawnMaskRle?: string,
  isDaily: boolean = true
): GameStats {
  const stats = getStoredStats();

  // Update main counters for ALL completed games (daily AND unlimited)
  stats.gamesPlayed += 1;
  stats.gamesCompleted += 1;
  stats.gradeCounts[scoreResult.grade] = (stats.gradeCounts[scoreResult.grade] || 0) + 1;

  // Recalculate average score
  const totalScore = stats.averageScore * (stats.gamesCompleted - 1) + scoreResult.score;
  stats.averageScore = Math.round(totalScore / stats.gamesCompleted);

  // Unlimited-mode ("practice") plays get supplementary tracking
  if (!isDaily) {
    const previousPracticeGames = stats.practiceGames ?? 0;
    const previousPracticeAverage = stats.practiceAverageScore ?? 0;
    const practiceGames = previousPracticeGames + 1;
    const totalPracticeScore = previousPracticeAverage * previousPracticeGames + scoreResult.score;

    stats.practiceGames = practiceGames;
    stats.practiceAverageScore = Math.round(totalPracticeScore / practiceGames);
  }

  // Only daily plays update streak and daily history
  if (isDaily) {
    const [y, m, d] = dateKey.split("-").map(Number);
    const referenceDate = new Date(y, m - 1, d);
    const yesterday = yesterdayLocalDateKey(referenceDate);

    if (stats.dailyHistory[yesterday]?.completed) {
      stats.currentStreak += 1;
    } else {
      stats.currentStreak = 1;
    }
    stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);

    stats.dailyHistory[dateKey] = {
      dayNumber: Object.keys(stats.dailyHistory).length + 1,
      dateKey,
      speciesId,
      completed: true,
      scoreResult,
      drawnMaskRle,
      timestamp: Date.now(),
    };
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }

  return stats;
}

export function getDailyProgress(dateKey: string): DailyProgress | null {
  const stats = getStoredStats();
  return stats.dailyHistory[dateKey] || null;
}
