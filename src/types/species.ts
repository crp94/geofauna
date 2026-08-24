export type IUCNStatus = "LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX";

export type TaxonClass =
  | "Mammalia"
  | "Aves"
  | "Reptilia"
  | "Amphibia"
  | "Actinopterygii"
  | "Chondrichthyes"
  | "Insecta";

export type HabitatRealm = "Terrestrial" | "Marine" | "Freshwater" | "Coastal";

export type DifficultyTier = "iconic" | "regional" | "endemic";

export type Language = "en" | "es" | "it";

export type LocalizedString = {
  en: string;
  es: string;
  it: string;
};

export type PopulationHistoryPoint = {
  year: number;
  estimate: number;
  label?: string;
};

export type KeyThreat = {
  threat: string;
  impact: "high" | "medium" | "low";
  description: LocalizedString;
};

export type SpeciesImage = {
  url: string;
  photographer: string;
  license: string;
  sourceUrl: string;
  alt: string;
};

export type SpeciesRange = {
  bounds: [minLon: number, minLat: number, maxLon: number, maxLat: number];
  gridDimensions: [width: number, height: number]; // e.g. [360, 180]
  rleMask: string; // Run-Length Encoded 0s and 1s on 360x180 grid
  areaApproxKm2: number;
  nativeContinents: string[];
  nativeBiomes: LocalizedString[];
  elevationRange?: string;
};

export type HistoricalRangeContraction = {
  percentageLoss?: number; // e.g. 85 means 85% range lost
  description: LocalizedString;
};

export type Species = {
  id: string;
  commonName: LocalizedString;
  scientificName: string;
  taxonClass: TaxonClass;
  order: string;
  family: string;
  realm: HabitatRealm;
  difficulty: DifficultyTier;
  iucnStatus: IUCNStatus;
  iucnCriteria?: string;
  populationTrend: "increasing" | "stable" | "decreasing" | "unknown";
  populationEstimate: string;
  populationHistory: PopulationHistoryPoint[];
  climateVulnerability: LocalizedString;
  keyThreats: KeyThreat[];
  diet: LocalizedString;
  keystoneRole?: LocalizedString;
  conservationActions?: LocalizedString;
  historicalContraction?: HistoricalRangeContraction;
  clues: LocalizedString[];
  image: SpeciesImage;
  range: SpeciesRange;
  gbifTaxonKey?: number;
  gbifOccurrenceCount?: number;
  gbifUrl?: string;
};

export type ScoreResult = {
  score: number; // 0 - 1000
  grade: "S" | "A" | "B" | "C" | "D";
  iou: number; // 0 - 100%
  dice: number; // 0 - 100%
  precision: number; // 0 - 100%
  recall: number; // 0 - 100%
  proximityBonus: number; // 0 - 100
  truePositiveAreaKm2: number;
  falsePositiveAreaKm2: number;
  falseNegativeAreaKm2: number;
};

export type GameMode = "daily" | "unlimited";

export type DailyProgress = {
  dayNumber: number;
  dateKey: string; // YYYY-MM-DD
  speciesId: string;
  completed: boolean;
  scoreResult?: ScoreResult;
  drawnMaskRle?: string;
  timestamp: number;
};

export type GameStats = {
  gamesPlayed: number;
  gamesCompleted: number;
  currentStreak: number;
  maxStreak: number;
  averageScore: number;
  gradeCounts: Record<"S" | "A" | "B" | "C" | "D", number>;
  dailyHistory: Record<string, DailyProgress>;
};
