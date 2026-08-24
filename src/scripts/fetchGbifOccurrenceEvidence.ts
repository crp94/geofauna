import fs from "node:fs";
import path from "node:path";
import { encodeRle, lonLatToGrid, TOTAL_CELLS } from "../lib/maskCompression";

type GbifRecord = {
  decimalLatitude?: number;
  decimalLongitude?: number;
  coordinateUncertaintyInMeters?: number;
  basisOfRecord?: string;
  establishmentMeans?: string;
  license?: string;
  datasetKey?: string;
  datasetName?: string;
  publishingOrgKey?: string;
};

type GbifResponse = { results?: GbifRecord[] };

type DatasetAttribution = {
  key: string;
  title: string;
  license: string;
  publisherKey?: string;
};

type EvidenceEntry = {
  sourceName: "GBIF occurrence API";
  sourceUrl: string;
  retrievedAt: string;
  recordCount: number;
  occupiedCellCount: number;
  cellMaskRle: string;
  licenseSummary: string;
  methodology: string;
  datasets: DatasetAttribution[];
};

const USER_AGENT = "geofauna-data-pipeline/1.0 (https://github.com/crp94/geofauna)";

const dataDirectory = path.resolve(__dirname, "../data");
const enrichmentPath = path.join(dataDirectory, "gbif-enrichment.json");
const outputPath = path.join(dataDirectory, "gbif-occurrence-evidence.json");
const enrichment = JSON.parse(fs.readFileSync(enrichmentPath, "utf-8")) as Record<string, { taxonKey?: number }>;

// Per-page size and how many pages (of `limit` records each) to walk, stopping
// early once a page returns fewer than `limit` results (the record stream is
// exhausted). Default 5 x 300 = up to 1,500 records per species, matching the
// plan's "verify with open data" pagination target (D3) — up from the
// original single-page 300-record snapshot.
const limit = Number(process.env.GEOFAUNA_GBIF_SAMPLE_LIMIT || 300);
const maxPages = Number(process.env.GEOFAUNA_GBIF_EVIDENCE_PAGES || 5);
const delayMs = Number(process.env.GEOFAUNA_GBIF_DELAY_MS || 200);
const onlySpecies = process.argv[2];
const refreshExisting = process.env.GEOFAUNA_GBIF_REFRESH === "1";
const maxRequests = Number(process.env.GEOFAUNA_GBIF_MAX || Number.POSITIVE_INFINITY);

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function writeCheckpoint(output: Record<string, EvidenceEntry>) {
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n", "utf-8");
}

/**
 * License is now filtered server-side (license=CC0_1_0 OR license=CC_BY_4_0,
 * GBIF's repeated-param OR semantics) — see fetchPage(). This client-side
 * check is kept as a defense-in-depth safety net in case the API ever
 * returns a record outside the requested license set, and to guard against
 * a missing/blank license field (treated as not open).
 */
function isOpenLicense(license?: string): boolean {
  const value = (license || "").toLowerCase();
  return !value.includes("by-nc") && (value.includes("cc0") || value.includes("publicdomain/zero") || value.includes("cc_by") || value.includes("creativecommons.org/licenses/by/"));
}

function isAcceptableRecord(record: GbifRecord): record is GbifRecord & Required<Pick<GbifRecord, "decimalLatitude" | "decimalLongitude">> {
  if (!Number.isFinite(record.decimalLatitude) || !Number.isFinite(record.decimalLongitude)) return false;
  if (!isOpenLicense(record.license)) return false;
  if (record.coordinateUncertaintyInMeters && record.coordinateUncertaintyInMeters > 25_000) return false;
  if (record.basisOfRecord === "FOSSIL_SPECIMEN") return false;
  if ((record.establishmentMeans || "").toUpperCase().includes("INTRODUCED")) return false;
  return true;
}

function pageUrl(taxonKey: number, offset: number): string {
  const params = new URLSearchParams({
    taxon_key: String(taxonKey),
    has_coordinate: "true",
    has_geospatial_issue: "false",
    limit: String(limit),
    offset: String(offset),
  });
  // GBIF's occurrence search repeats a facet/filter param for OR semantics:
  // license=CC0_1_0&license=CC_BY_4_0 returns records under EITHER license,
  // server-side — unlike the v2 density tiles, this endpoint honors it.
  params.append("license", "CC0_1_0");
  params.append("license", "CC_BY_4_0");
  return `https://api.gbif.org/v1/occurrence/search?${params.toString()}`;
}

async function fetchEvidence(id: string, taxonKey: number, requestBudget: () => boolean): Promise<[string, EvidenceEntry | null]> {
  const mask = new Uint8Array(TOTAL_CELLS);
  const datasets = new Map<string, DatasetAttribution>();
  let acceptedCount = 0;
  let firstPageUrl = "";
  let firstRequest = true;
  let pagesFetched = 0;

  for (let page = 0; page < maxPages; page++) {
    if (!requestBudget()) break;
    const offset = page * limit;
    const url = pageUrl(taxonKey, offset);
    if (page === 0) firstPageUrl = url;

    if (!firstRequest) await sleep(delayMs);
    firstRequest = false;

    const response = await fetch(url, { headers: { Accept: "application/json", "User-Agent": USER_AGENT } });
    if (!response.ok) throw new Error(`${id}: GBIF returned ${response.status} (page ${page}, offset ${offset})`);
    const payload = (await response.json()) as GbifResponse;
    const results = payload.results || [];
    pagesFetched += 1;

    for (const record of results) {
      if (!isAcceptableRecord(record)) continue;
      const [x, y] = lonLatToGrid(record.decimalLongitude, record.decimalLatitude);
      mask[y * 360 + x] = 1;
      acceptedCount += 1;
      if (record.datasetKey) {
        datasets.set(record.datasetKey, {
          key: record.datasetKey,
          title: record.datasetName || "GBIF mediated dataset",
          license: record.license || "Unknown",
          publisherKey: record.publishingOrgKey,
        });
      }
    }

    if (results.length < limit) break; // exhausted: fewer results than a full page means no more data
  }

  const occupiedCellCount = mask.reduce((sum, value) => sum + value, 0);
  return [
    id,
    {
      sourceName: "GBIF occurrence API",
      sourceUrl: firstPageUrl,
      retrievedAt: new Date().toISOString(),
      recordCount: acceptedCount,
      occupiedCellCount,
      cellMaskRle: encodeRle(mask),
      licenseSummary: "Only CC0 and CC BY records retained (server-side license=CC0_1_0/CC_BY_4_0 filter); CC BY-NC and unlicensed records excluded.",
      methodology: `Up to ${maxPages} page(s) of ${limit} API results each (stopping early once a page is not full); filters: server-side open license only, no GBIF geospatial issue, ≤25 km stated uncertainty when supplied, no fossil records, no records marked introduced. Fetched across ${pagesFetched} page(s). This is an evidence footprint, not a range map.`,
      datasets: Array.from(datasets.values()).sort((a, b) => a.title.localeCompare(b.title)),
    },
  ];
}

async function run() {
  const targets = Object.entries(enrichment).filter(([id, entry]) => Boolean(entry.taxonKey) && (!onlySpecies || id === onlySpecies));
  const output: Record<string, EvidenceEntry> = fs.existsSync(outputPath) ? JSON.parse(fs.readFileSync(outputPath, "utf-8")) : {};
  let completed = 0;
  let requests = 0;

  const requestBudget = () => {
    if (requests >= maxRequests) return false;
    requests += 1;
    return true;
  };

  for (const [id, entry] of targets) {
    if (output[id] && !refreshExisting) {
      completed += 1;
      console.log(`${completed}/${targets.length} ${id}: cached`);
      continue;
    }
    if (requests >= maxRequests) break;
    try {
      const [speciesId, evidence] = await fetchEvidence(id, entry.taxonKey!, requestBudget);
      if (evidence) output[speciesId] = evidence;
      // Persist after each API call: the import can be resumed after a timeout,
      // rate limit, or interrupted local session without losing prior sources.
      writeCheckpoint(output);
      completed += 1;
      console.log(`${completed}/${targets.length} ${id}: ${evidence ? `${evidence.recordCount} records / ${evidence.occupiedCellCount} cells` : "no eligible records"}`);
    } catch (error) {
      console.warn(error instanceof Error ? error.message : error);
    }
  }

  writeCheckpoint(output);
  console.log(`Wrote ${Object.keys(output).length} licence-filtered evidence entries to ${outputPath} (${requests} HTTP requests made).`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
