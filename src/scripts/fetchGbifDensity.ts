import fs from "node:fs";
import path from "node:path";
import { GRID_WIDTH, lonLatToGrid } from "../lib/maskCompression";
import { decodeDensityTile, DensityPoint } from "./lib/mvt";
import { allCuratedSpecies } from "./fullSpeciesData";

const USER_AGENT = "geofauna-data-pipeline/1.0 (https://github.com/crp94/geofauna)";

// Excludes FOSSIL_SPECIMEN and LIVING_SPECIMEN server-side (kills fossil
// records and zoo/captive living-collection specimens without a client-side
// pass over the raw occurrence stream).
const BASIS_OF_RECORD = [
  "HUMAN_OBSERVATION",
  "OBSERVATION",
  "MACHINE_OBSERVATION",
  "PRESERVED_SPECIMEN",
  "MATERIAL_SAMPLE",
  "OCCURRENCE",
  "MATERIAL_CITATION",
];

const ZOOM = Number(process.env.GEOFAUNA_GBIF_DENSITY_ZOOM || 2);
const DELAY_MS = Number(process.env.GEOFAUNA_GBIF_DELAY_MS || 200);
const MAX_REQUESTS = Number(process.env.GEOFAUNA_GBIF_MAX || Number.POSITIVE_INFINITY);
const REFRESH = process.env.GEOFAUNA_GBIF_REFRESH === "1";
const onlySpecies = process.argv[2];

const dataDirectory = path.resolve(__dirname, "../data");
const enrichmentPath = path.join(dataDirectory, "gbif-enrichment.json");
const outputDir = path.join(dataDirectory, "gbif-density");

function outputPathFor(id: string): string {
  return path.join(outputDir, `${id}.json`);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let requestCount = 0;
let firstRequest = true;

/** Sleep GEOFAUNA_GBIF_DELAY_MS between requests, then fetch with 3-attempt exponential backoff on 429/5xx. */
async function gbifFetch(url: string): Promise<Response> {
  const attempts = 3;
  let lastError: unknown = null;

  for (let attempt = 0; attempt < attempts; attempt++) {
    if (!firstRequest) await sleep(DELAY_MS);
    firstRequest = false;
    requestCount += 1;

    try {
      const response = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
      if (response.status === 429 || response.status >= 500) {
        lastError = new Error(`GBIF returned ${response.status} for ${url}`);
        if (attempt < attempts - 1) {
          const backoffMs = 1000 * Math.pow(2, attempt);
          console.warn(`    retry ${attempt + 1}/${attempts} after HTTP ${response.status}, backing off ${backoffMs}ms`);
          await sleep(backoffMs);
        }
        continue;
      }
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < attempts - 1) {
        const backoffMs = 1000 * Math.pow(2, attempt);
        await sleep(backoffMs);
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}

function densityTileUrl(taxonKey: number, z: number, x: number, y: number): string {
  const params = new URLSearchParams({ srs: "EPSG:4326", taxonKey: String(taxonKey) });
  for (const basis of BASIS_OF_RECORD) params.append("basisOfRecord", basis);
  return `https://api.gbif.org/v2/map/occurrence/density/${z}/${x}/${y}.mvt?${params.toString()}`;
}

async function fetchTile(taxonKey: number, z: number, x: number, y: number): Promise<DensityPoint[]> {
  const response = await gbifFetch(densityTileUrl(taxonKey, z, x, y));
  if (response.status === 204) return [];
  if (!response.ok) throw new Error(`GBIF density tile ${z}/${x}/${y} returned ${response.status}`);
  const arrayBuffer = await response.arrayBuffer();
  if (arrayBuffer.byteLength === 0) return [];
  return decodeDensityTile(arrayBuffer, z, x, y);
}

type LicenseFacets = { cc0: number; ccBy: number; ccByNc: number; other: number };

type FacetSearchResponse = {
  count?: number;
  facets?: Array<{ field?: string; counts?: Array<{ name?: string; count?: number }> }>;
};

async function fetchLicenseFacets(taxonKey: number): Promise<{ totalRecords: number; licenseFacets: LicenseFacets }> {
  const params = new URLSearchParams({
    taxonKey: String(taxonKey),
    limit: "0",
    facetLimit: "500",
  });
  params.append("facet", "license");
  params.append("facet", "datasetKey");
  const url = `https://api.gbif.org/v1/occurrence/search?${params.toString()}`;

  const response = await gbifFetch(url);
  if (!response.ok) throw new Error(`GBIF facet search returned ${response.status} for taxonKey ${taxonKey}`);
  const payload = (await response.json()) as FacetSearchResponse;

  const totalRecords = Number(payload.count || 0);
  const licenseFacets: LicenseFacets = { cc0: 0, ccBy: 0, ccByNc: 0, other: 0 };
  const licenseFacet = (payload.facets || []).find((f) => (f.field || "").toUpperCase() === "LICENSE");

  for (const item of licenseFacet?.counts || []) {
    const name = String(item.name || "").toUpperCase();
    const count = Number(item.count || 0);
    if (name === "CC0_1_0") licenseFacets.cc0 += count;
    else if (name === "CC_BY_4_0") licenseFacets.ccBy += count;
    else if (name === "CC_BY_NC_4_0") licenseFacets.ccByNc += count;
    else licenseFacets.other += count; // UNSPECIFIED, UNSUPPORTED, and any future/unknown license values
  }

  return { totalRecords, licenseFacets };
}

// Decade buckets, matching the output tuple layout:
// [cellIndex, pre1970, y1970s, y1980s, y1990s, y2000s, y2010s, y2020s, unknownYear]
const BUCKET_COUNT = 8;
const UNKNOWN_BUCKET_INDEX = 7;

function decadeBucketIndex(year: number): number {
  if (year < 1970) return 0;
  if (year < 1980) return 1;
  if (year < 1990) return 2;
  if (year < 2000) return 3;
  if (year < 2010) return 4;
  if (year < 2020) return 5;
  return 6; // 2020s and beyond
}

function emptyBuckets(): number[] {
  return new Array(BUCKET_COUNT).fill(0);
}

type SpeciesDensityOutput = {
  taxonKey: number;
  retrievedAt: string;
  zoom: number;
  request: { srs: "EPSG:4326"; basisOfRecord: string[] };
  totalRecords: number;
  licenseFacets: LicenseFacets;
  cells: number[][];
};

async function fetchSpeciesDensity(taxonKey: number, zoom: number): Promise<{ output: SpeciesDensityOutput; cellCount: number }> {
  const cols = Math.pow(2, zoom + 1);
  const rows = Math.pow(2, zoom);
  const cellMap = new Map<number, number[]>();

  for (let ty = 0; ty < rows; ty++) {
    for (let tx = 0; tx < cols; tx++) {
      const points = await fetchTile(taxonKey, zoom, tx, ty);
      for (const point of points) {
        const [gx, gy] = lonLatToGrid(point.lon, point.lat);
        const cellIndex = gy * GRID_WIDTH + gx;
        let buckets = cellMap.get(cellIndex);
        if (!buckets) {
          buckets = emptyBuckets();
          cellMap.set(cellIndex, buckets);
        }

        let yearSum = 0;
        point.byYear.forEach((count, year) => {
          buckets![decadeBucketIndex(year)] += count;
          yearSum += count;
        });
        buckets[UNKNOWN_BUCKET_INDEX] += point.unknownYear;
        yearSum += point.unknownYear;

        // Defensive fallback: if a point somehow carries a total but no
        // per-year breakdown at all, don't silently drop its occurrences.
        if (yearSum === 0 && point.total > 0) {
          buckets[UNKNOWN_BUCKET_INDEX] += point.total;
        }
      }
    }
  }

  const { totalRecords, licenseFacets } = await fetchLicenseFacets(taxonKey);

  const cells = Array.from(cellMap.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([cellIndex, buckets]) => [cellIndex, ...buckets]);

  const output: SpeciesDensityOutput = {
    taxonKey,
    retrievedAt: new Date().toISOString(),
    zoom,
    request: { srs: "EPSG:4326", basisOfRecord: BASIS_OF_RECORD },
    totalRecords,
    licenseFacets,
    cells,
  };

  return { output, cellCount: cells.length };
}

async function run() {
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  if (!fs.existsSync(enrichmentPath)) {
    throw new Error(`Missing ${enrichmentPath} — run resolveTaxonKeys.ts (npm run data:gbif:resolve) first.`);
  }

  const enrichment = JSON.parse(fs.readFileSync(enrichmentPath, "utf-8")) as Record<string, { taxonKey?: number }>;
  const targets = allCuratedSpecies
    .map((s) => ({ id: s.id, taxonKey: enrichment[s.id]?.taxonKey }))
    .filter((t): t is { id: string; taxonKey: number } => Boolean(t.taxonKey) && (!onlySpecies || t.id === onlySpecies));

  console.log(
    `Fetching GBIF density tiles for ${targets.length} species at zoom ${ZOOM} ` +
      `(${Math.pow(2, ZOOM + 1) * Math.pow(2, ZOOM)} tiles + 1 facet call each), delay ${DELAY_MS}ms between requests.`
  );

  let completed = 0;
  let cached = 0;
  let failed = 0;

  for (const { id, taxonKey } of targets) {
    const outputPath = outputPathFor(id);
    if (fs.existsSync(outputPath) && !REFRESH) {
      cached += 1;
      completed += 1;
      console.log(`${completed}/${targets.length} ${id}: cached`);
      continue;
    }

    if (requestCount >= MAX_REQUESTS) {
      console.log(`Reached GEOFAUNA_GBIF_MAX (${MAX_REQUESTS}) request cap — stopping before ${id}.`);
      break;
    }

    try {
      const { output, cellCount } = await fetchSpeciesDensity(taxonKey, ZOOM);
      fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n", "utf-8");
      completed += 1;
      console.log(`${completed}/${targets.length} ${id}: ${cellCount} occupied cells / ${output.totalRecords} total records`);
    } catch (error) {
      failed += 1;
      console.warn(`${id}: ${error instanceof Error ? error.message : error}`);
    }
  }

  console.log(
    `Density fetch complete: ${completed}/${targets.length} species processed (${cached} cached, ${failed} failed), ${requestCount} HTTP requests made.`
  );
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
