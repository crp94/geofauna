import fs from "node:fs";
import path from "node:path";
import {
  GRID_WIDTH,
  TOTAL_CELLS,
  encodeRle,
  gridToLonLat,
} from "../lib/maskCompression";
import {
  close,
  connectedComponents,
  intersect,
  union,
  subtract,
  maskArea,
  countCells,
  maskFromBoxes,
  minCellDistance,
  buildRealmMasks,
  dilate,
  RealmMasks,
} from "./lib/gridOps";
import { allCuratedSpecies } from "./fullSpeciesData";
import { speciesRangeOverrides } from "./speciesRangeOverrides";
import { HabitatRealm } from "../types/species";

/**
 * Stage 3 of the GBIF-derived range pipeline (plan Workstream D, D2.3):
 * deterministic, fully offline. Turns each species' per-cell decade-bucketed
 * occurrence counts (src/data/gbif-density/{id}.json) into a playable range
 * mask via:
 *
 *   year window -> vagrant-trim presence threshold -> morphological close
 *   -> connected-component pruning -> realm clip -> editorial overrides
 *
 * Output: src/data/derived-range-masks.json, one entry per species that has
 * a density file. Species without a density file are skipped (and reported)
 * so buildCuratedSpecies.ts can fall back to rangeConfig with a loud warning
 * rather than crash the whole catalog build.
 */

// --- Tunables -------------------------------------------------------------

// Decade bucket layout produced by fetchGbifDensity.ts, row = [cellIndex, ...buckets]:
// buckets[0]=pre1970 buckets[1]=1970s buckets[2]=1980s buckets[3]=1990s
// buckets[4]=2000s buckets[5]=2010s buckets[6]=2020s+ buckets[7]=unknownYear
const BUCKET_COUNT = 8;
const UNKNOWN_BUCKET_INDEX = 7;

const DEFAULT_YEAR_MIN = Number(process.env.GEOFAUNA_GBIF_YEAR_MIN || 1970);
// Below this many windowed records, the year window is too sparse to trust —
// fall back to all-years counts (still recorded in the output for review).
const ALL_YEARS_FALLBACK_RECORD_FLOOR = 300;
// Below this many records (post fallback decision), skip vagrant trimming
// entirely: there isn't enough data to distinguish "rare but real" from "vagrant".
const VAGRANT_TRIM_RECORD_FLOOR = 500;
const VAGRANT_TRIM_FRACTION = 0.005; // drop up to 0.5% of records as vagrant noise
const VAGRANT_TRIM_NEVER_DROP_AT = 5; // a cell with count >= 5 is never trimmed
const MAX_THRESHOLD = 10;

const REALM_CLOSE_RADIUS: Record<HabitatRealm, number> = {
  Terrestrial: 1,
  Freshwater: 1,
  Coastal: 1,
  Marine: 2,
};

// Component pruning (never touches the largest-recordSum component):
const PRUNE_RECORD_SHARE_MAX = 0.01; // < 1% of the species' total records used
const PRUNE_CELL_COUNT_MAX = 3; // and <= 3 cells
const PRUNE_MIN_DISTANCE_TO_LARGEST = 5; // and > 5 grid cells from the largest component

// --- Types ------------------------------------------------------------------

type DensityFile = {
  taxonKey: number;
  retrievedAt: string;
  zoom: number;
  request: { srs: string; basisOfRecord: string[] };
  totalRecords: number;
  licenseFacets: { cc0: number; ccBy: number; ccByNc: number; other: number };
  cells: number[][];
};

export type DerivedMaskEntry = {
  rleMask: string;
  bounds: [number, number, number, number];
  params: {
    zoom: number;
    yearMin: number;
    usedAllYearsFallback: boolean;
    threshold: number;
    closingRadius: number;
    realm: HabitatRealm;
  };
  yearWindow: {
    yearMin: number;
    windowedRecords: number;
    allYearsRecords: number;
    usedAllYearsFallback: boolean;
  };
  stats: {
    cellCount: number;
    areaKm2: number;
    componentCount: number;
    recordsUsed: number;
    recordsAll: number;
  };
  overridesApplied: string[];
  retrievedAt: string;
  licenseFacets: { cc0: number; ccBy: number; ccByNc: number; other: number };
};

// --- Helpers ------------------------------------------------------------------

/** Which decade-bucket index a `yearMin` cutoff starts summation from (inclusive). Mirrors fetchGbifDensity.ts's decadeBucketIndex(). */
function bucketStartIndexForYearMin(yearMin: number): number {
  if (yearMin < 1970) return 0;
  if (yearMin < 1980) return 1;
  if (yearMin < 1990) return 2;
  if (yearMin < 2000) return 3;
  if (yearMin < 2010) return 4;
  if (yearMin < 2020) return 5;
  return 6;
}

// Bounds are padded by this many degrees beyond the mask's own tight extent.
// Reason: a trivial "paint the bounding box" guess is scored via
// evaluatePrediction like any other prediction, and calibrateIou(1, cal) is
// mathematically guaranteed to return 1 for ANY calibration (the piecewise
// map fixes cal(1)=1 by construction) — so if a tight bbox-fill ever
// reproduces the truth mask exactly (a perfectly rectangular mask: a thin
// 1-row/1-column strip, or a solid box added wholesale by an override's
// `add`/`clampTo`), no calibration anchor can stop that trivial guess from
// scoring a perfect 1000. Padding every species' reported bounds by a fixed
// margin guarantees a bbox-fill reconstructed from `bounds` always strictly
// overshoots the mask, so its IoU is always < 1. `range.bounds` is not
// currently consumed by any rendering/view-fitting code (verified via
// repo-wide search), so this is a safe, low-risk, uniformly-applied fix
// rather than a per-species patch.
const BOUNDS_PADDING_DEGREES = 1;

function computeBounds(mask: Uint8Array): [number, number, number, number] {
  let minLon = 180;
  let maxLon = -180;
  let minLat = 90;
  let maxLat = -90;
  let any = false;
  for (let i = 0; i < TOTAL_CELLS; i++) {
    if (mask[i] !== 1) continue;
    any = true;
    const x = i % GRID_WIDTH;
    const y = (i / GRID_WIDTH) | 0;
    const [lon, lat] = gridToLonLat(x, y);
    if (lon < minLon) minLon = lon;
    if (lon > maxLon) maxLon = lon;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  if (!any) return [-180, -90, 180, 90];
  return [
    Math.max(-180, minLon - BOUNDS_PADDING_DEGREES),
    Math.max(-90, minLat - BOUNDS_PADDING_DEGREES),
    Math.min(180, maxLon + BOUNDS_PADDING_DEGREES),
    Math.min(90, maxLat + BOUNDS_PADDING_DEGREES),
  ];
}

/**
 * Cumulative vagrant trim: below VAGRANT_TRIM_RECORD_FLOOR records, threshold
 * is 1 (keep every occupied cell). Otherwise, walk occupied cell counts in
 * ascending order and accumulate a "dropped records" tally until it reaches
 * 0.5% of the species' total records used — but never consider a cell with
 * count >= 5 for dropping, regardless of whether the 0.5% target was reached.
 * The resulting threshold keeps every cell whose count is >= (last dropped
 * value + 1), capped at MAX_THRESHOLD.
 */
function computeThreshold(counts: Float64Array, recordsUsed: number): number {
  if (recordsUsed < VAGRANT_TRIM_RECORD_FLOOR) return 1;

  const cellsByCountValue = new Map<number, number>();
  for (let i = 0; i < counts.length; i++) {
    const c = counts[i];
    if (c <= 0) continue;
    cellsByCountValue.set(c, (cellsByCountValue.get(c) || 0) + 1);
  }

  const target = VAGRANT_TRIM_FRACTION * recordsUsed;
  const ascendingValues = Array.from(cellsByCountValue.keys()).sort((a, b) => a - b);

  let dropped = 0;
  let threshold = 1;
  for (const value of ascendingValues) {
    if (value >= VAGRANT_TRIM_NEVER_DROP_AT) break;
    dropped += value * (cellsByCountValue.get(value) as number);
    threshold = value + 1;
    if (dropped >= target) break;
  }

  return Math.min(MAX_THRESHOLD, threshold);
}

function maskFromLabels(labels: Int32Array, id: number): Uint8Array {
  const out = new Uint8Array(labels.length);
  for (let i = 0; i < labels.length; i++) if (labels[i] === id) out[i] = 1;
  return out;
}

/**
 * Drops only connected components that are simultaneously: not the
 * largest-recordSum component, < 1% of the species' total records used,
 * <= 3 cells, and > 5 grid cells (Chebyshev, longitude-wrapped) from the
 * largest component. This removes isolated single/few-cell noise (a vagrant
 * sighting continents away) without ever touching a real disjunct
 * subpopulation that carries meaningful evidence or sits near the core range.
 */
function pruneSmallDistantComponents(mask: Uint8Array, counts: Float64Array, recordsUsed: number): Uint8Array {
  const { labels, components } = connectedComponents(mask, counts);
  if (components.length <= 1) return mask;

  const largest = components.reduce((a, b) => (b.recordSum > a.recordSum ? b : a));
  const largestMask = maskFromLabels(labels, largest.id);

  const dropIds = new Set<number>();
  for (const comp of components) {
    if (comp.id === largest.id) continue;
    const recordShare = recordsUsed > 0 ? comp.recordSum / recordsUsed : 0;
    if (recordShare < PRUNE_RECORD_SHARE_MAX && comp.cells <= PRUNE_CELL_COUNT_MAX) {
      const compMask = maskFromLabels(labels, comp.id);
      const distance = minCellDistance(compMask, largestMask);
      if (distance > PRUNE_MIN_DISTANCE_TO_LARGEST) dropIds.add(comp.id);
    }
  }

  if (dropIds.size === 0) return mask;
  const out = new Uint8Array(mask);
  for (let i = 0; i < mask.length; i++) if (dropIds.has(labels[i])) out[i] = 0;
  return out;
}

function realmClipMaskFor(realm: HabitatRealm, realms: RealmMasks, coastalDilated: Uint8Array): Uint8Array {
  switch (realm) {
    case "Terrestrial":
    case "Freshwater":
      return realms.landTouch;
    case "Marine":
      return realms.oceanTouch;
    case "Coastal":
      return coastalDilated;
    default:
      return realms.landTouch;
  }
}

// --- Main ------------------------------------------------------------------

function main() {
  const dataDir = path.resolve(__dirname, "../data");
  const densityDir = path.join(dataDir, "gbif-density");
  const outputPath = path.join(dataDir, "derived-range-masks.json");

  const countriesTopoPath = path.resolve(__dirname, "../../node_modules/world-atlas/countries-110m.json");
  console.log("Loading Natural Earth countries topology and building realm masks (land/ocean/coastal touch)...");
  const countriesTopo = JSON.parse(fs.readFileSync(countriesTopoPath, "utf-8"));
  const realms = buildRealmMasks(countriesTopo);
  const coastalDilated = dilate(realms.coastal, 1);
  console.log(
    `Realm masks ready: landTouch=${countCells(realms.landTouch)} oceanTouch=${countCells(realms.oceanTouch)} coastal(+1)=${countCells(coastalDilated)} cells.`
  );

  const output: Record<string, DerivedMaskEntry> = {};
  const missingDensity: string[] = [];
  const emptyMasks: string[] = [];

  for (const species of allCuratedSpecies) {
    const id = species.id;
    const realm = species.realm;
    const densityPath = path.join(densityDir, `${id}.json`);

    if (!fs.existsSync(densityPath)) {
      console.warn(`[skip] ${id}: no GBIF density file at ${densityPath} — run npm run data:gbif:fetch first.`);
      missingDensity.push(id);
      continue;
    }

    const density: DensityFile = JSON.parse(fs.readFileSync(densityPath, "utf-8"));
    const override = speciesRangeOverrides[id];
    const overridesApplied: string[] = [];

    // --- Year window -----------------------------------------------------
    let yearMin = DEFAULT_YEAR_MIN;
    if (override?.params?.yearMin !== undefined) {
      yearMin = override.params.yearMin;
      overridesApplied.push("params.yearMin");
    }
    const startBucket = bucketStartIndexForYearMin(yearMin);

    const windowedCounts = new Float64Array(TOTAL_CELLS);
    const allYearsCounts = new Float64Array(TOTAL_CELLS);
    let windowedTotal = 0;
    let allYearsTotal = 0;

    for (const row of density.cells) {
      const cellIndex = row[0];
      const buckets = row.slice(1, 1 + BUCKET_COUNT);
      let windowed = buckets[UNKNOWN_BUCKET_INDEX]; // undated records are always counted; we can't place them outside the window
      for (let b = startBucket; b <= 6; b++) windowed += buckets[b];
      let all = 0;
      for (let b = 0; b < BUCKET_COUNT; b++) all += buckets[b];

      windowedCounts[cellIndex] = windowed;
      allYearsCounts[cellIndex] = all;
      windowedTotal += windowed;
      allYearsTotal += all;
    }

    let usedAllYearsFallback = windowedTotal < ALL_YEARS_FALLBACK_RECORD_FLOOR;
    if (override?.params?.forceAllYears) {
      usedAllYearsFallback = true;
      overridesApplied.push("params.forceAllYears");
    }
    const usedCounts = usedAllYearsFallback ? allYearsCounts : windowedCounts;
    const recordsUsed = usedAllYearsFallback ? allYearsTotal : windowedTotal;

    // --- Presence threshold ------------------------------------------------
    let threshold: number;
    if (override?.params?.threshold !== undefined) {
      threshold = override.params.threshold;
      overridesApplied.push("params.threshold");
    } else {
      threshold = computeThreshold(usedCounts, recordsUsed);
    }

    const presenceMask = new Uint8Array(TOTAL_CELLS);
    for (let i = 0; i < TOTAL_CELLS; i++) if (usedCounts[i] >= threshold) presenceMask[i] = 1;

    // --- Morphological close ------------------------------------------------
    let closingRadius = REALM_CLOSE_RADIUS[realm] ?? 1;
    if (override?.params?.closingRadius !== undefined) {
      closingRadius = override.params.closingRadius;
      overridesApplied.push("params.closingRadius");
    }
    let mask = close(presenceMask, closingRadius);

    // --- Component pruning ------------------------------------------------
    mask = pruneSmallDistantComponents(mask, usedCounts, recordsUsed);

    // --- Realm clip ------------------------------------------------
    const realmClipMask = realmClipMaskFor(realm, realms, coastalDilated);
    mask = intersect(mask, realmClipMask);

    // --- Editorial overrides ------------------------------------------------
    if (override?.add?.length) {
      for (const box of override.add) {
        let addMask = maskFromBoxes([box]);
        if (box.clipToRealm !== false) addMask = intersect(addMask, realmClipMask);
        mask = union(mask, addMask);
      }
      overridesApplied.push("add");
    }
    if (override?.remove?.length) {
      mask = subtract(mask, maskFromBoxes(override.remove));
      overridesApplied.push("remove");
    }
    if (override?.clampTo?.length) {
      mask = intersect(mask, maskFromBoxes(override.clampTo));
      overridesApplied.push("clampTo");
    }

    // --- Stats + bounds ------------------------------------------------
    const cellCount = countCells(mask);
    const areaKm2 = Math.round(maskArea(mask));
    const componentCount = connectedComponents(mask).components.length;
    const bounds = computeBounds(mask);

    if (cellCount === 0) emptyMasks.push(id);

    output[id] = {
      rleMask: encodeRle(mask),
      bounds,
      params: {
        zoom: density.zoom,
        yearMin,
        usedAllYearsFallback,
        threshold,
        closingRadius,
        realm,
      },
      yearWindow: {
        yearMin,
        windowedRecords: windowedTotal,
        allYearsRecords: allYearsTotal,
        usedAllYearsFallback,
      },
      stats: {
        cellCount,
        areaKm2,
        componentCount,
        recordsUsed,
        recordsAll: allYearsTotal,
      },
      overridesApplied,
      retrievedAt: density.retrievedAt,
      licenseFacets: density.licenseFacets,
    };

    console.log(
      `${id}: cells=${cellCount} area=${areaKm2}km² components=${componentCount} t=${threshold} r=${closingRadius} ` +
        `yearMin=${yearMin}${usedAllYearsFallback ? " (all-years fallback)" : ""}` +
        `${overridesApplied.length ? " overrides=[" + overridesApplied.join(",") + "]" : ""}` +
        `${cellCount === 0 ? "  [EMPTY MASK]" : ""}`
    );
  }

  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n", "utf-8");

  console.log("");
  console.log(`Wrote ${Object.keys(output).length} derived range masks to ${outputPath}`);
  if (missingDensity.length) {
    console.warn(`Missing GBIF density data for ${missingDensity.length} species (no entry written): ${missingDensity.join(", ")}`);
  }
  if (emptyMasks.length) {
    console.warn(`WARNING: ${emptyMasks.length} species derived an EMPTY mask: ${emptyMasks.join(", ")}`);
    console.warn("These need a speciesRangeOverrides.ts entry before npm run data:curate, which hard-fails on empty masks.");
  }
}

main();
