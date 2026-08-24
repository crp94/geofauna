import fs from "node:fs";
import path from "node:path";
import { allCuratedSpecies } from "./fullSpeciesData";

type EnrichmentEntry = {
  taxonKey?: number;
  occurrenceCount?: number;
  url?: string;
  [key: string]: unknown;
};

type GbifMatchResponse = {
  matchType?: string;
  rank?: string;
  usageKey?: number;
  scientificName?: string;
  canonicalName?: string;
  confidence?: number;
};

const USER_AGENT = "geofauna-data-pipeline/1.0 (https://github.com/crp94/geofauna)";

const dataDirectory = path.resolve(__dirname, "../data");
const enrichmentPath = path.join(dataDirectory, "gbif-enrichment.json");
const onlySpecies = process.argv[2];

function loadEnrichment(): Record<string, EnrichmentEntry> {
  if (!fs.existsSync(enrichmentPath)) return {};
  return JSON.parse(fs.readFileSync(enrichmentPath, "utf-8")) as Record<string, EnrichmentEntry>;
}

function writeCheckpoint(output: Record<string, EnrichmentEntry>) {
  if (!fs.existsSync(dataDirectory)) fs.mkdirSync(dataDirectory, { recursive: true });
  fs.writeFileSync(enrichmentPath, JSON.stringify(output, null, 2) + "\n", "utf-8");
}

/**
 * Resolve a scientific name to a GBIF backbone taxonKey via /v1/species/match.
 * Only an EXACT match at SPECIES rank is accepted — anything looser (FUZZY,
 * HIGHERRANK, NONE, ambiguous synonyms, etc.) is logged and skipped rather
 * than guessed, per the pipeline's "never guess" provenance stance.
 */
async function resolveTaxonKey(scientificName: string): Promise<number | null> {
  const params = new URLSearchParams({ name: scientificName, strict: "true" });
  const url = `https://api.gbif.org/v1/species/match?${params.toString()}`;
  const response = await fetch(url, {
    headers: { Accept: "application/json", "User-Agent": USER_AGENT },
  });
  if (!response.ok) {
    throw new Error(`GBIF species/match returned ${response.status} for "${scientificName}"`);
  }
  const payload = (await response.json()) as GbifMatchResponse;
  if (payload.matchType !== "EXACT" || payload.rank !== "SPECIES" || !payload.usageKey) {
    return null;
  }
  return payload.usageKey;
}

async function run() {
  const output = loadEnrichment();
  const targets = allCuratedSpecies.filter((s) => !onlySpecies || s.id === onlySpecies);

  let resolved = 0;
  let alreadyResolved = 0;
  let skipped = 0;
  let failed = 0;

  for (const species of targets) {
    const existing = output[species.id];
    if (existing?.taxonKey) {
      alreadyResolved += 1;
      console.log(`${species.id}: already resolved (taxonKey ${existing.taxonKey})`);
      continue;
    }

    try {
      const taxonKey = await resolveTaxonKey(species.scientificName);
      if (taxonKey === null) {
        skipped += 1;
        console.warn(
          `${species.id}: no EXACT SPECIES-rank match for "${species.scientificName}" — skipped, not guessing.`
        );
        continue;
      }

      output[species.id] = {
        ...(existing || {}),
        taxonKey,
        url: existing?.url || `https://www.gbif.org/species/${taxonKey}`,
      };
      // Persist after each successful resolution so an interrupted run can
      // resume without losing prior work (mirrors fetchGbifOccurrenceEvidence.ts).
      writeCheckpoint(output);
      resolved += 1;
      console.log(`${species.id}: resolved taxonKey ${taxonKey} for "${species.scientificName}"`);
    } catch (error) {
      failed += 1;
      console.warn(`${species.id}: ${error instanceof Error ? error.message : error}`);
    }
  }

  writeCheckpoint(output);
  console.log(
    `Done. ${resolved} newly resolved, ${alreadyResolved} already cached, ${skipped} skipped (no exact species match), ${failed} failed. ` +
      `Total enrichment entries: ${Object.keys(output).length}.`
  );
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
