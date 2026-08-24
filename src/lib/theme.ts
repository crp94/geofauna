/**
 * GeoFauna design tokens — "Naturalist Expedition Journal" theme.
 *
 * Single source of truth for every color used across the app: Tailwind
 * config, CSS custom properties, canvas map rendering, OG image generation,
 * and confetti. Plain exported const objects so this file is importable
 * from both client components and Node/tsx build scripts without any
 * bundler-specific syntax.
 */

export const paper = {
  base: "#F5F1E6",
  raised: "#FCFAF2",
  sunken: "#EDE7D5",
  deep: "#E4DCC6",
} as const;

export const ink = {
  900: "#2B2519",
  700: "#57503E",
  500: "#675F4B",
  400: "#857C63",
} as const;

export const rule = {
  DEFAULT: "#D9D0BA",
  strong: "#B4A98D",
} as const;

/** Botanical viridian — primary accent. */
export const accent = {
  DEFAULT: "#3E6B4F",
  ink: "#2C513A",
  soft: "#E2EADB",
  line: "#94AE9B",
} as const;

export const terracotta = {
  DEFAULT: "#A9552F",
  ink: "#844021",
  soft: "#F0E0D3",
} as const;

export const ochre = {
  DEFAULT: "#7D5E0E",
  soft: "#F0E5C8",
} as const;

export const danger = {
  DEFAULT: "#9C3B32",
  soft: "#F0DBD6",
} as const;

export interface IucnTierTokens {
  text: string;
  fill: string;
  edge: string;
}

/** IUCN Red List tier tokens, darkened for AA contrast on paper surfaces. */
export const iucn: Record<"LC" | "NT" | "VU" | "EN" | "CR" | "EW" | "EX", IucnTierTokens> = {
  LC: { text: "#20566E", fill: "#DCE9F0", edge: "#7FA6BB" },
  NT: { text: "#2C5E41", fill: "#DEEBE0", edge: "#84AC91" },
  VU: { text: "#8A6410", fill: "#F3E7C2", edge: "#C5A94E" },
  EN: { text: "#9E4E14", fill: "#F4E0CB", edge: "#CE9057" },
  CR: { text: "#96261D", fill: "#F2D9D4", edge: "#C87B70" },
  EW: { text: "#5B4384", fill: "#E5DFEF", edge: "#A292C4" },
  EX: { text: "#37322A", fill: "#E0DBCE", edge: "#8B8474" },
};

export const map = {
  ocean: "#DFE8E4",
  oceanEdge: "#8FA39A",
  land: "#F1E9D3",
  coast: "#7E7256",
  countryLine: "rgba(110,99,76,0.35)",
  graticule: "rgba(110,99,76,0.16)",
  equator: "rgba(62,107,79,0.38)",
  sphereRing: "#57503E",
  canvasBg: "#FCFAF2",
} as const;

/** Okabe–Ito CVD-safe palette for brush strokes and reveal overlays. */
export const paint = {
  brush: "rgba(62,107,79,0.55)",
  eraserPreview: "rgba(169,85,47,0.5)",
  overlap: "rgba(0,158,115,0.82)",
  overestimate: "rgba(230,159,0,0.82)",
  missed: "rgba(0,114,178,0.82)",
  overlapInk: "#00664B",
  overestimateInk: "#8A5D00",
  missedInk: "#005282",
} as const;

export const confettiColors = ["#3E6B4F", "#9A7519", "#A9552F", "#20566E"] as const;

const theme = {
  paper,
  ink,
  rule,
  accent,
  terracotta,
  ochre,
  danger,
  iucn,
  map,
  paint,
  confettiColors,
};

export default theme;
