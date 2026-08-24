import fs from "fs";
import path from "path";
import * as topojson from "topojson-client";
import { geoContains } from "d3-geo";
import { HabitatRealm, RangeProvenance, ScoreCalibration, Species } from "../types/species";
import {
  GRID_WIDTH,
  GRID_HEIGHT,
  TOTAL_CELLS,
  decodeRle,
  encodeRle,
  gridToLonLat,
  getCellAreaKm2,
  lonLatToGrid,
  paintGeodesicCircle,
} from "../lib/maskCompression";
import { computeAreaWeightedIoU, dilateMask, areaWeightedCentroid } from "../lib/calibration";
import { intersect, maskFromBoxes, buildRealmMasks, dilate, countCells, LonLatBox } from "./lib/gridOps";
import { allCuratedSpecies } from "./fullSpeciesData";
import type { DerivedMaskEntry } from "./buildRangeMasks";

// Load world-atlas TopoJSON
const countriesTopoPath = path.resolve(__dirname, "../../node_modules/world-atlas/countries-110m.json");
const countriesTopo = JSON.parse(fs.readFileSync(countriesTopoPath, "utf-8"));
const landFeature = topojson.feature(countriesTopo, countriesTopo.objects.land as any) as any;
const countriesFeature = topojson.feature(countriesTopo, countriesTopo.objects.countries as any) as any;

console.log("Generating 360x180 Land/Ocean mask from Natural Earth with BBox acceleration...");
const landMask = new Uint8Array(TOTAL_CELLS);

const features = countriesFeature.features || [landFeature];
for (const feat of features) {
  let minLon = 180, maxLon = -180, minLat = 90, maxLat = -90;

  const scanCoords = (coords: any) => {
    if (typeof coords[0] === "number" && typeof coords[1] === "number") {
      minLon = Math.min(minLon, coords[0]);
      maxLon = Math.max(maxLon, coords[0]);
      minLat = Math.min(minLat, coords[1]);
      maxLat = Math.max(maxLat, coords[1]);
    } else if (Array.isArray(coords)) {
      coords.forEach(scanCoords);
    }
  };
  scanCoords(feat.geometry.coordinates);

  const [minX, maxY] = lonLatToGrid(minLon, minLat);
  const [maxX, minY] = lonLatToGrid(maxLon, maxLat);

  const xStart = Math.min(minX, maxX);
  const xEnd = Math.max(minX, maxX);
  const yStart = Math.min(minY, maxY);
  const yEnd = Math.max(minY, maxY);

  for (let y = yStart; y <= yEnd; y++) {
    for (let x = xStart; x <= xEnd; x++) {
      const idx = y * GRID_WIDTH + x;
      if (landMask[idx] === 1) continue;

      const [lon, lat] = gridToLonLat(x, y);
      if (geoContains(feat, [lon, lat])) {
        landMask[idx] = 1;
      }
    }
  }
}

const landMaskRle = encodeRle(landMask);
console.log(`Land mask generated: ${landMask.reduce((a, b) => a + b, 0)} land cells out of ${TOTAL_CELLS} total cells.`);

// Realm masks (landTouch/oceanTouch/coastal), same construction the range
// pipeline uses (buildRangeMasks.ts) — reused here so calibration baselines
// (centroid discs, continent fill) are clipped consistently with how the
// truth mask itself was realm-clipped.
console.log("Building realm masks (landTouch/oceanTouch/coastal) for calibration baselines...");
const realms = buildRealmMasks(countriesTopo);
const coastalDilated = dilate(realms.coastal, 1);

function realmClipMaskFor(realm: HabitatRealm): Uint8Array {
  if (realm === "Marine") return realms.oceanTouch;
  if (realm === "Coastal") return coastalDilated;
  return realms.landTouch; // Terrestrial, Freshwater
}

function createRangeMask(
  regions: Array<{
    minLon: number;
    maxLon: number;
    minLat: number;
    maxLat: number;
    includeOcean?: boolean;
    filterPolygon?: (lon: number, lat: number) => boolean;
  }>
): { mask: Uint8Array; rle: string; areaKm2: number; bounds: [number, number, number, number] } {
  const mask = new Uint8Array(TOTAL_CELLS);
  let totalArea = 0;
  let minLon = 180,
    maxLon = -180,
    minLat = 90,
    maxLat = -90;

  for (const reg of regions) {
    const [minX, maxY] = lonLatToGrid(reg.minLon, reg.minLat);
    const [maxX, minY] = lonLatToGrid(reg.maxLon, reg.maxLat);

    const xStart = Math.min(minX, maxX);
    const xEnd = Math.max(minX, maxX);
    const yStart = Math.min(minY, maxY);
    const yEnd = Math.max(minY, maxY);

    for (let y = yStart; y <= yEnd; y++) {
      const cellArea = getCellAreaKm2(y);
      for (let x = xStart; x <= xEnd; x++) {
        const idx = y * GRID_WIDTH + x;
        const [lon, lat] = gridToLonLat(x, y);

        if (!reg.includeOcean && landMask[idx] === 0) {
          continue;
        }

        if (reg.filterPolygon && !reg.filterPolygon(lon, lat)) {
          continue;
        }

        if (mask[idx] === 0) {
          mask[idx] = 1;
          totalArea += cellArea;
          minLon = Math.min(minLon, lon);
          maxLon = Math.max(maxLon, lon);
          minLat = Math.min(minLat, lat);
          maxLat = Math.max(maxLat, lat);
        }
      }
    }
  }

  return {
    mask,
    rle: encodeRle(mask),
    areaKm2: Math.round(totalArea),
    bounds: [
      minLon === 180 ? -180 : minLon,
      minLat === 90 ? -90 : minLat,
      maxLon === -180 ? 180 : maxLon,
      maxLat === -90 ? 90 : maxLat,
    ],
  };
}

// --- Calibration (Workstream C1) -----------------------------------------
// Closed-form, build-time-only difficulty anchors. See src/lib/calibration.ts
// for the runtime consumer (calibrateIou) and its guard rails, which these
// clamps intentionally mirror so every calibration this build produces is
// valid by construction (isValidCalibration would accept it).
const CAL_MIN_BASELINE = 0.02;
const CAL_MAX_BASELINE = 0.85;
const CAL_MIN_ATTAINABLE_MARGIN = 0.05;
const CAL_DILATE_KM = 150;

// Small, deliberately coarse continent bounding boxes for the "guess the
// whole continent" trivial baseline. minLon > maxLon crosses the
// antimeridian (matches the LonLatBox/maskFromBoxes convention). Overlap
// between neighboring boxes (e.g. Asia/Europe near the Urals) is fine here —
// this table only needs to produce a plausible upper bound for a trivial
// guess, not a precise biogeographic partition.
const CONTINENT_EXTENTS: Record<string, LonLatBox> = {
  Africa: { minLon: -18, maxLon: 52, minLat: -35, maxLat: 38 },
  Asia: { minLon: 26, maxLon: 180, minLat: -11, maxLat: 81 },
  Europe: { minLon: -25, maxLon: 45, minLat: 34, maxLat: 72 },
  NorthAmerica: { minLon: -170, maxLon: -50, minLat: 5, maxLat: 84 },
  SouthAmerica: { minLon: -82, maxLon: -34, minLat: -56, maxLat: 13 },
  OceaniaAustralia: { minLon: 110, maxLon: -150, minLat: -50, maxLat: 25 },
  Antarctica: { minLon: -180, maxLon: 180, minLat: -90, maxLat: -60 },
};

function pointInBox(lon: number, lat: number, box: LonLatBox): boolean {
  if (lat < box.minLat || lat > box.maxLat) return false;
  if (box.minLon <= box.maxLon) return lon >= box.minLon && lon <= box.maxLon;
  return lon >= box.minLon || lon <= box.maxLon; // antimeridian wedge
}

function continentBoxFor(lon: number, lat: number): LonLatBox | null {
  for (const box of Object.values(CONTINENT_EXTENTS)) {
    if (pointInBox(lon, lat, box)) return box;
  }
  return null;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Rebuilds the exact bbox-fill guess verifyGameLogic.ts's catalog sweep constructs from range.bounds, so baselines.bbox is numerically consistent with what that test independently recomputes. */
function buildBboxMask(bounds: [number, number, number, number]): Uint8Array {
  const [minLon, minLat, maxLon, maxLat] = bounds;
  const [minX, maxY] = lonLatToGrid(minLon, minLat);
  const [maxX, minY] = lonLatToGrid(maxLon, maxLat);
  const xStart = Math.min(minX, maxX);
  const xEnd = Math.max(minX, maxX);
  const yStart = Math.min(minY, maxY);
  const yEnd = Math.max(minY, maxY);

  const mask = new Uint8Array(TOTAL_CELLS);
  for (let y = yStart; y <= yEnd; y++) {
    for (let x = xStart; x <= xEnd; x++) mask[y * GRID_WIDTH + x] = 1;
  }
  return mask;
}

const CENTROID_RADII_KM = [250, 500, 1000, 2000] as const;

function computeCalibration(
  truthMask: Uint8Array,
  bounds: [number, number, number, number],
  realm: HabitatRealm
): ScoreCalibration {
  const realmClipMask = realmClipMaskFor(realm);

  const bboxMask = buildBboxMask(bounds);
  const bboxIoU = computeAreaWeightedIoU(bboxMask, truthMask);

  const centroid = areaWeightedCentroid(truthMask);
  const centroidIoUs: Record<(typeof CENTROID_RADII_KM)[number], number> = {
    250: 0,
    500: 0,
    1000: 0,
    2000: 0,
  };
  let continentIoU = 0;

  if (centroid) {
    const [lon, lat] = centroid;
    for (const radiusKm of CENTROID_RADII_KM) {
      const discMask = new Uint8Array(TOTAL_CELLS);
      paintGeodesicCircle(discMask, lon, lat, radiusKm, 1);
      const clipped = intersect(discMask, realmClipMask);
      centroidIoUs[radiusKm] = computeAreaWeightedIoU(clipped, truthMask);
    }

    const continentBox = continentBoxFor(lon, lat);
    if (continentBox) {
      const continentMask = intersect(maskFromBoxes([continentBox]), realms.landTouch);
      continentIoU = computeAreaWeightedIoU(continentMask, truthMask);
    }
  }

  const rawBaseline = Math.max(bboxIoU, continentIoU, centroidIoUs[250], centroidIoUs[500], centroidIoUs[1000], centroidIoUs[2000]);
  const baselineIoU = clamp(rawBaseline, CAL_MIN_BASELINE, CAL_MAX_BASELINE);

  const rawAttainable = computeAreaWeightedIoU(dilateMask(truthMask, CAL_DILATE_KM), truthMask);
  const attainableIoU = Math.min(0.999, Math.max(rawAttainable, baselineIoU + CAL_MIN_ATTAINABLE_MARGIN));

  return {
    version: 1,
    baselineIoU,
    attainableIoU,
    baselines: {
      bbox: bboxIoU,
      continent: continentIoU,
      centroid250: centroidIoUs[250],
      centroid500: centroidIoUs[500],
      centroid1000: centroidIoUs[1000],
      centroid2000: centroidIoUs[2000],
    },
  };
}

// --- GBIF-derived provenance (Workstream D3/D4) ---------------------------

function buildGbifProvenance(derived: DerivedMaskEntry, taxonKey: number | undefined): RangeProvenance {
  const retrievedDateOnly = derived.retrievedAt.slice(0, 10);
  const { cc0, ccBy, ccByNc, other } = derived.licenseFacets;
  const totalLicensed = cc0 + ccBy + ccByNc + other;
  const pct = (n: number) => (totalLicensed > 0 ? `${Math.round((n / totalLicensed) * 100)}%` : "0%");

  return {
    method: "gbif-occurrence-derived",
    confidence: "occurrence-derived",
    sourceName: "GBIF.org occurrence density (GBIF Maps API v2)",
    sourceUrl: taxonKey ? `https://www.gbif.org/species/${taxonKey}` : "https://www.gbif.org",
    resolution:
      "1° global raster; derived from GBIF per-cell occurrence density, vagrant-trimmed by a cumulative record-count threshold, morphologically closed, small-and-distant components pruned, clipped to a Natural Earth 1:110m realm mask",
    version: `gbif-density-pipeline-v1 (${retrievedDateOnly})`,
    retrievedAt: derived.retrievedAt,
    parameters: {
      zoom: derived.params.zoom,
      yearMin: derived.params.yearMin,
      usedAllYearsFallback: derived.params.usedAllYearsFallback ? "true" : "false",
      threshold: derived.params.threshold,
      closingRadius: derived.params.closingRadius,
      overrides: derived.overridesApplied.length ? derived.overridesApplied.join(",") : "none",
      licenseCc0Pct: pct(cc0),
      licenseCcByPct: pct(ccBy),
      licenseCcByNcPct: pct(ccByNc),
      licenseOtherPct: pct(other),
      licenseDisclosure:
        `Density aggregate license composition: ${pct(cc0)} CC0, ${pct(ccBy)} CC BY, ${pct(ccByNc)} CC BY-NC, ${pct(other)} other/unspecified. ` +
        "GBIF's density-tile API cannot filter by license server-side, so per-cell presence facts are derived from all openly and non-commercially licensed records; the product is presence/absence per 1° cell, not redistributed record-level data. " +
        "range.evidence independently cross-checks mask agreement using a separate, server-side CC0/CC BY-only occurrence snapshot.",
    },
    citation: `GBIF.org (${retrievedDateOnly}) GBIF Occurrence Data accessed via GBIF Maps API v2`,
  };
}

const outputDir = path.resolve(__dirname, "../data");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Load GBIF & iNaturalist enrichment caches
const gbifEnrichmentPath = path.join(outputDir, "gbif-enrichment.json");
const gbifMap: Record<string, { taxonKey: number; occurrenceCount?: number; url?: string }> = fs.existsSync(gbifEnrichmentPath)
  ? JSON.parse(fs.readFileSync(gbifEnrichmentPath, "utf-8"))
  : {};

const inatEnrichmentPath = path.join(outputDir, "inaturalist-enrichment.json");
const inatMap: Record<string, { taxonId: number; observationCount?: number; url?: string }> = fs.existsSync(inatEnrichmentPath)
  ? JSON.parse(fs.readFileSync(inatEnrichmentPath, "utf-8"))
  : {};

type EvidenceEntry = {
  sourceName: string;
  sourceUrl: string;
  retrievedAt: string;
  recordCount: number;
  occupiedCellCount: number;
  cellMaskRle: string;
  licenseSummary: string;
  methodology: string;
  datasets: Array<{
    key: string;
    title: string;
    license: string;
    publisherKey?: string;
  }>;
};
const gbifEvidencePath = path.join(outputDir, "gbif-occurrence-evidence.json");
const gbifEvidenceMap: Record<string, EvidenceEntry> = fs.existsSync(gbifEvidencePath)
  ? JSON.parse(fs.readFileSync(gbifEvidencePath, "utf-8"))
  : {};

const derivedMasksPath = path.join(outputDir, "derived-range-masks.json");
const derivedMasks: Record<string, DerivedMaskEntry> = fs.existsSync(derivedMasksPath)
  ? JSON.parse(fs.readFileSync(derivedMasksPath, "utf-8"))
  : {};
if (Object.keys(derivedMasks).length === 0) {
  console.warn(
    "WARNING: src/data/derived-range-masks.json is missing or empty — run `npm run data:gbif:masks` first. Falling back to editorial rangeConfig bounding boxes for every species."
  );
}

// Compile the curated species catalogue. Linked registries enrich discovery;
// they do not validate the range mask as an authoritative range map.
console.log(`Compiling ${allCuratedSpecies.length} curated species entries with linked GBIF & iNaturalist records...`);

type CalibrationRow = { id: string; baselineIoU: number; attainableIoU: number; areaKm2: number };
const calibrationRows: CalibrationRow[] = [];
let derivedCount = 0;
let fallbackCount = 0;

const finalSpeciesList: Species[] = allCuratedSpecies.map((s) => {
  const { rangeConfig, ...rest } = s;
  const gbifInfo = gbifMap[s.id];
  const inatInfo = inatMap[s.id];
  const evidenceInfo = gbifEvidenceMap[s.id];

  const derived = derivedMasks[s.id];
  let mask: Uint8Array;
  let rle: string;
  let areaKm2: number;
  let bounds: [number, number, number, number];
  let provenance: RangeProvenance;

  if (derived) {
    derivedCount += 1;
    mask = decodeRle(derived.rleMask);
    rle = derived.rleMask;
    areaKm2 = derived.stats.areaKm2;
    bounds = derived.bounds;
    provenance = buildGbifProvenance(derived, gbifInfo?.taxonKey);
  } else {
    fallbackCount += 1;
    console.warn(`WARNING: ${s.id} has no GBIF-derived mask — falling back to editorial rangeConfig bounding boxes.`);
    const built = createRangeMask(rangeConfig);
    mask = built.mask;
    rle = built.rle;
    areaKm2 = built.areaKm2;
    bounds = built.bounds;
    provenance = {
      method: "editorial-coarse-extent",
      confidence: "learning",
      sourceName: "GeoFauna editorial biogeographic learning extent",
      sourceUrl: "https://github.com/crp94/geofauna/blob/main/src/scripts/speciesData",
      resolution: "1° global raster; land/ocean clipped where appropriate",
      version: "2026-08 prototype",
    };
  }

  const cellCount = countCells(mask);
  if (cellCount === 0) {
    throw new Error(
      `FATAL: species "${s.id}" derived an EMPTY range mask (0 cells). This must be fixed with a speciesRangeOverrides.ts entry ` +
        `(add/remove/clampTo/params) before the build can proceed — an empty mask is unplayable and was exactly the historical ` +
        `galapagos-giant-tortoise bug this pipeline exists to catch.`
    );
  }

  const calibration = computeCalibration(mask, bounds, s.realm);
  calibrationRows.push({ id: s.id, baselineIoU: calibration.baselineIoU, attainableIoU: calibration.attainableIoU, areaKm2 });

  let occupiedCellsInsideLearningExtent = 0;
  const evidenceMask = evidenceInfo ? decodeRle(evidenceInfo.cellMaskRle) : undefined;
  if (evidenceMask) {
    for (let index = 0; index < TOTAL_CELLS; index += 1) {
      if (evidenceMask[index] === 1 && mask[index] === 1) occupiedCellsInsideLearningExtent += 1;
    }
  }

  return {
    ...rest,
    gbifTaxonKey: gbifInfo?.taxonKey,
    gbifOccurrenceCount: gbifInfo?.occurrenceCount,
    gbifUrl: gbifInfo?.url || (gbifInfo?.taxonKey ? `https://www.gbif.org/species/${gbifInfo.taxonKey}` : undefined),
    inaturalistTaxonId: inatInfo?.taxonId,
    inaturalistObservationCount: inatInfo?.observationCount,
    inaturalistUrl: inatInfo?.url || (inatInfo?.taxonId ? `https://www.inaturalist.org/taxa/${inatInfo.taxonId}` : undefined),
    range: {
      bounds,
      gridDimensions: [GRID_WIDTH, GRID_HEIGHT],
      rleMask: rle,
      areaApproxKm2: areaKm2,
      nativeContinents: [],
      nativeBiomes: [],
      provenance,
      calibration,
      evidence: evidenceInfo
        ? {
            sourceName: evidenceInfo.sourceName,
            sourceUrl: evidenceInfo.sourceUrl,
            retrievedAt: evidenceInfo.retrievedAt,
            recordCount: evidenceInfo.recordCount,
            occupiedCellCount: evidenceInfo.occupiedCellCount,
            occupiedCellsInsideLearningExtent,
            licenseSummary: evidenceInfo.licenseSummary,
            methodology: evidenceInfo.methodology,
            datasets: evidenceInfo.datasets,
          }
        : undefined,
    },
  };
});

console.log(`\nRange mask sources: ${derivedCount} GBIF-derived, ${fallbackCount} editorial rangeConfig fallback.`);
console.log("\nCalibration table (id | baselineIoU | attainableIoU | areaKm2):");
for (const row of calibrationRows) {
  console.log(`  ${row.id} | b=${row.baselineIoU.toFixed(3)} | a=${row.attainableIoU.toFixed(3)} | area=${row.areaKm2}km²`);
}

// Write curated-species.json
const speciesOutputPath = path.join(outputDir, "curated-species.json");
fs.writeFileSync(speciesOutputPath, JSON.stringify(finalSpeciesList, null, 2), "utf-8");
console.log(`\nSuccessfully wrote ${finalSpeciesList.length} species to ${speciesOutputPath}`);

// Write land-mask.json
const landMaskOutputPath = path.join(outputDir, "land-mask.json");
fs.writeFileSync(landMaskOutputPath, JSON.stringify({ rle: landMaskRle }), "utf-8");
console.log(`Successfully wrote land mask to ${landMaskOutputPath}`);

// Write world-110m.json
const worldOutputPath = path.join(outputDir, "world-110m.json");
fs.writeFileSync(worldOutputPath, JSON.stringify(countriesTopo), "utf-8");
console.log(`Successfully copied TopoJSON world to ${worldOutputPath}`);
