import { DailyProgress, GameStats, Language, ScoreResult } from "../types/species";

const STATS_KEY = "geofauna_stats_v1";
const LANG_KEY = "geofauna_lang_v1";

export function getStoredLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const saved = localStorage.getItem(LANG_KEY);
  if (saved === "es" || saved === "it" || saved === "en") {
    return saved;
  }
  // Try navigator language
  const navLang = navigator.language?.toLowerCase() || "";
  if (navLang.startsWith("es")) return "es";
  if (navLang.startsWith("it")) return "it";
  return "en";
}

export function setStoredLanguage(lang: Language): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LANG_KEY, lang);
}

export function getStoredStats(): GameStats {
  const defaultStats: GameStats = {
    gamesPlayed: 0,
    gamesCompleted: 0,
    currentStreak: 0,
    maxStreak: 0,
    averageScore: 0,
    gradeCounts: { S: 0, A: 0, B: 0, C: 0, D: 0 },
    dailyHistory: {},
  };

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

export function recordGameResult(
  dateKey: string,
  speciesId: string,
  scoreResult: ScoreResult,
  drawnMaskRle?: string,
  isDaily: boolean = true
): GameStats {
  const stats = getStoredStats();

  stats.gamesPlayed += 1;
  stats.gamesCompleted += 1;
  stats.gradeCounts[scoreResult.grade] = (stats.gradeCounts[scoreResult.grade] || 0) + 1;

  // Recalculate average score
  const totalScore = stats.averageScore * (stats.gamesCompleted - 1) + scoreResult.score;
  stats.averageScore = Math.round(totalScore / stats.gamesCompleted);

  if (isDaily) {
    const today = new Date().toISOString().slice(0, 10);
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

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
