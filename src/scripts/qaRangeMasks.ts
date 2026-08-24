import fs from "node:fs";
import path from "node:path";
import { TOTAL_CELLS, decodeRle } from "../lib/maskCompression";
import { asciiMap, buildRealmMasks, dilate } from "./lib/gridOps";
import { allCuratedSpecies } from "./fullSpeciesData";
import { speciesRangeOverrides } from "./speciesRangeOverrides";
import type { DerivedMaskEntry } from "./buildRangeMasks";
import { HabitatRealm, Species } from "../types/species";

/**
 * Stage 4 of the GBIF-derived range pipeline (plan Workstream D, D2.4).
 * Reads what buildRangeMasks.ts produced and grades it against five gates:
 *
 *   1. missing-density     — every catalog species must have a derived mask
 *   2. cell-count-min/max   — sane size (>=3 cells, <=20% of the world grid)
 *   3. evidence-agreement   — open-license evidence footprint should mostly
 *                             fall inside the playable mask
 *   4. area-ratio           — sanity-check vs the mask currently shipped in
 *                             curated-species.json (catches wild regressions)
 *   5. realm-consistency    — a Terrestrial/Freshwater mask shouldn't cover
 *                             pure ocean, a Marine mask shouldn't cover pure
 *                             land, etc.
 *
 * A hard failure fails the whole run (process.exitCode = 1) unless
 * speciesRangeOverrides.ts carries a qaExceptions entry whose `metric`
 * matches — printed loudly either way. Per-species ASCII maps (mask vs
 * evidence overlay) go to reports/range-qa/{id}.txt for visual review; the
 * machine-readable summary goes to src/data/range-mask-qa.json.
 */

// --- Gate thresholds ---------------------------------------------------------

const MIN_CELL_COUNT = 3;
const MAX_CELL_COUNT_FRACTION = 0.2; // <= 20% of the world grid
const EVIDENCE_AGREEMENT_HARD_FLOOR = 0.5;
const EVIDENCE_AGREEMENT_WARN_FLOOR = 0.75;
const AREA_RATIO_HARD_MIN = 0.1;
const AREA_RATIO_HARD_MAX = 10;
const AREA_RATIO_WARN_MIN = 0.33;
const AREA_RATIO_WARN_MAX = 3;

// --- Types --------------------------------------------------------------

type EvidenceEntry = {
  sourceName: string;
  sourceUrl: string;
  retrievedAt: string;
  recordCount: number;
  occupiedCellCount: number;
  cellMaskRle: string;
  licenseSummary: string;
  methodology: string;
  datasets: Array<{ key: string; title: string; license: string; publisherKey?: string }>;
};

type GateResult = { metric: string; detail: string };

type SpeciesQaResult = {
  id: string;
  realm: HabitatRealm;
  metrics: {
    cellCount: number | null;
    areaKm2: number | null;
    componentCount: number | null;
    evidenceAgreement: number | null; // 0-1 fraction, null if no evidence available
    evidenceCellsInsideMask: number | null;
    evidenceCellsTotal: number | null;
    previousAreaKm2: number | null;
    areaRatio: number | null;
    realmViolationCells: number | null;
  };
  hardFailures: GateResult[];
  warnings: GateResult[];
  waived: Array<GateResult & { reason: string }>;
};

// --- Helpers --------------------------------------------------------------

function computeAgreement(mask: Uint8Array, evidenceMask: Uint8Array): { inside: number; total: number; agreement: number | null } {
  let total = 0;
  let inside = 0;
  for (let i = 0; i < TOTAL_CELLS; i++) {
    if (evidenceMask[i] === 1) {
      total += 1;
      if (mask[i] === 1) inside += 1;
    }
  }
  return { inside, total, agreement: total > 0 ? inside / total : null };
}

function realmAllowedMask(realm: HabitatRealm, landTouch: Uint8Array, oceanTouch: Uint8Array, coastalDilated: Uint8Array): Uint8Array {
  if (realm === "Marine") return oceanTouch;
  if (realm === "Coastal") return coastalDilated;
  return landTouch; // Terrestrial, Freshwater
}

function countRealmViolations(mask: Uint8Array, allowed: Uint8Array): number {
  let violations = 0;
  for (let i = 0; i < TOTAL_CELLS; i++) if (mask[i] === 1 && allowed[i] !== 1) violations += 1;
  return violations;
}

function findWaiver(id: string, metric: string): string | null {
  const exceptions = speciesRangeOverrides[id]?.qaExceptions;
  const match = exceptions?.find((e) => e.metric === metric);
  return match ? match.reason : null;
}

// --- Main --------------------------------------------------------------

function main() {
  const dataDir = path.resolve(__dirname, "../data");
  const derivedPath = path.join(dataDir, "derived-range-masks.json");
  const evidencePath = path.join(dataDir, "gbif-occurrence-evidence.json");
  const curatedPath = path.join(dataDir, "curated-species.json");
  const summaryPath = path.join(dataDir, "range-mask-qa.json");
  const reportsDir = path.resolve(__dirname, "../../reports/range-qa");

  const derivedMasks: Record<string, DerivedMaskEntry> = fs.existsSync(derivedPath)
    ? JSON.parse(fs.readFileSync(derivedPath, "utf-8"))
    : {};
  const evidenceMap: Record<string, EvidenceEntry> = fs.existsSync(evidencePath)
    ? JSON.parse(fs.readFileSync(evidencePath, "utf-8"))
    : {};
  const previousCatalog: Species[] = fs.existsSync(curatedPath) ? JSON.parse(fs.readFileSync(curatedPath, "utf-8")) : [];
  const previousById = new Map(previousCatalog.map((s) => [s.id, s]));

  const countriesTopoPath = path.resolve(__dirname, "../../node_modules/world-atlas/countries-110m.json");
  const countriesTopo = JSON.parse(fs.readFileSync(countriesTopoPath, "utf-8"));
  const realms = buildRealmMasks(countriesTopo);
  const coastalDilated = dilate(realms.coastal, 1);

  if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

  const results: SpeciesQaResult[] = [];
  let hardFailCount = 0;
  let warnCount = 0;
  let waivedCount = 0;

  for (const species of allCuratedSpecies) {
    const id = species.id;
    const realm = species.realm;
    const derived = derivedMasks[id];
    const hardFailures: GateResult[] = [];
    const warnings: GateResult[] = [];
    const waived: Array<GateResult & { reason: string }> = [];

    const raiseHard = (metric: string, detail: string) => {
      const reason = findWaiver(id, metric);
      if (reason) {
        waived.push({ metric, detail, reason });
      } else {
        hardFailures.push({ metric, detail });
      }
    };

    if (!derived) {
      raiseHard("missing-density", `No derived-range-masks.json entry for "${id}" (no GBIF density file, or buildRangeMasks.ts skipped it).`);
      results.push({
        id,
        realm,
        metrics: {
          cellCount: null,
          areaKm2: null,
          componentCount: null,
          evidenceAgreement: null,
          evidenceCellsInsideMask: null,
          evidenceCellsTotal: null,
          previousAreaKm2: previousById.get(id)?.range.areaApproxKm2 ?? null,
          areaRatio: null,
          realmViolationCells: null,
        },
        hardFailures,
        warnings,
        waived,
      });
      fs.writeFileSync(
        path.join(reportsDir, `${id}.txt`),
        `${id} (${realm})\n\nHARD FAIL: missing-density — no derived mask available.\n`,
        "utf-8"
      );
      continue;
    }

    const mask = decodeRle(derived.rleMask);
    const cellCount = derived.stats.cellCount;
    const areaKm2 = derived.stats.areaKm2;

    // --- Gate: cell count sanity ---
    if (cellCount < MIN_CELL_COUNT) {
      raiseHard("cell-count-min", `cellCount=${cellCount} is below the minimum of ${MIN_CELL_COUNT}.`);
    }
    const maxCells = Math.floor(TOTAL_CELLS * MAX_CELL_COUNT_FRACTION);
    if (cellCount > maxCells) {
      raiseHard("cell-count-max", `cellCount=${cellCount} exceeds ${MAX_CELL_COUNT_FRACTION * 100}% of the world grid (${maxCells} cells).`);
    }

    // --- Gate: open-evidence agreement ---
    const evidenceEntry = evidenceMap[id];
    let evidenceAgreement: number | null = null;
    let evidenceInside: number | null = null;
    let evidenceTotal: number | null = null;
    if (evidenceEntry) {
      const evidenceMask = decodeRle(evidenceEntry.cellMaskRle);
      const { inside, total, agreement } = computeAgreement(mask, evidenceMask);
      evidenceInside = inside;
      evidenceTotal = total;
      evidenceAgreement = agreement;
      if (agreement !== null) {
        if (agreement < EVIDENCE_AGREEMENT_HARD_FLOOR) {
          raiseHard(
            "evidence-agreement",
            `Only ${(agreement * 100).toFixed(1)}% of open-license evidence cells (${inside}/${total}) fall inside the mask (hard floor ${EVIDENCE_AGREEMENT_HARD_FLOOR * 100}%).`
          );
        } else if (agreement < EVIDENCE_AGREEMENT_WARN_FLOOR) {
          warnings.push({
            metric: "evidence-agreement",
            detail: `${(agreement * 100).toFixed(1)}% of open-license evidence cells (${inside}/${total}) fall inside the mask (warn floor ${EVIDENCE_AGREEMENT_WARN_FLOOR * 100}%).`,
          });
        }
      }
    }

    // --- Gate: area ratio vs previously shipped mask ---
    const previous = previousById.get(id);
    const previousAreaKm2 = previous?.range.areaApproxKm2 ?? null;
    let areaRatio: number | null = null;
    if (previousAreaKm2 && previousAreaKm2 > 0) {
      areaRatio = areaKm2 / previousAreaKm2;
      if (areaRatio < AREA_RATIO_HARD_MIN || areaRatio > AREA_RATIO_HARD_MAX) {
        raiseHard(
          "area-ratio",
          `New area ${areaKm2}km² vs previous ${previousAreaKm2}km² = ratio ${areaRatio.toFixed(2)}, outside hard range [${AREA_RATIO_HARD_MIN}, ${AREA_RATIO_HARD_MAX}].`
        );
      } else if (areaRatio < AREA_RATIO_WARN_MIN || areaRatio > AREA_RATIO_WARN_MAX) {
        warnings.push({
          metric: "area-ratio",
          detail: `New area ${areaKm2}km² vs previous ${previousAreaKm2}km² = ratio ${areaRatio.toFixed(2)}, outside warn range [${AREA_RATIO_WARN_MIN}, ${AREA_RATIO_WARN_MAX}].`,
        });
      }
    }

    // --- Gate: realm consistency ---
    const allowed = realmAllowedMask(realm, realms.landTouch, realms.oceanTouch, coastalDilated);
    const realmViolationCells = countRealmViolations(mask, allowed);
    if (realmViolationCells > 0) {
      raiseHard(
        "realm-consistency",
        `${realmViolationCells} cell(s) fall outside the ${realm} realm mask (e.g. Terrestrial/Freshwater cells on pure ocean, or Marine cells on pure land).`
      );
    }

    results.push({
      id,
      realm,
      metrics: {
        cellCount,
        areaKm2,
        componentCount: derived.stats.componentCount,
        evidenceAgreement,
        evidenceCellsInsideMask: evidenceInside,
        evidenceCellsTotal: evidenceTotal,
        previousAreaKm2,
        areaRatio,
        realmViolationCells,
      },
      hardFailures,
      warnings,
      waived,
    });

    hardFailCount += hardFailures.length;
    warnCount += warnings.length;
    waivedCount += waived.length;

    // --- ASCII report ---
    const evidenceEntryForReport = evidenceMap[id];
    const overlayMask = evidenceEntryForReport ? decodeRle(evidenceEntryForReport.cellMaskRle) : undefined;
    const lines: string[] = [];
    lines.push(`${id} (${realm})`);
    lines.push(`cells=${cellCount} area=${areaKm2}km² components=${derived.stats.componentCount}`);
    lines.push(
      `params: yearMin=${derived.params.yearMin}${derived.params.usedAllYearsFallback ? " (all-years fallback)" : ""} threshold=${derived.params.threshold} closingRadius=${derived.params.closingRadius}`
    );
    if (derived.overridesApplied.length) lines.push(`overrides applied: ${derived.overridesApplied.join(", ")}`);
    lines.push(
      evidenceAgreement !== null
        ? `evidence agreement: ${(evidenceAgreement * 100).toFixed(1)}% (${evidenceInside}/${evidenceTotal} evidence cells inside mask)`
        : "evidence agreement: no open-license evidence available"
    );
    if (areaRatio !== null) lines.push(`area ratio vs previous shipped mask: ${areaRatio.toFixed(2)} (previous=${previousAreaKm2}km²)`);
    lines.push(`realm-consistency violations: ${realmViolationCells}`);
    if (hardFailures.length) lines.push(`HARD FAILURES: ${hardFailures.map((f) => `${f.metric}: ${f.detail}`).join(" | ")}`);
    if (warnings.length) lines.push(`WARNINGS: ${warnings.map((w) => `${w.metric}: ${w.detail}`).join(" | ")}`);
    if (waived.length) lines.push(`WAIVED: ${waived.map((w) => `${w.metric} (${w.reason})`).join(" | ")}`);
    lines.push("");
    lines.push("Legend: # = mask only, . = evidence only, O = both, (blank) = neither");
    lines.push(asciiMap(mask, overlayMask, 90));
    fs.writeFileSync(path.join(reportsDir, `${id}.txt`), lines.join("\n") + "\n", "utf-8");
  }

  const summary = {
    generatedAt: new Date().toISOString(),
    totalSpecies: results.length,
    hardFailCount,
    warnCount,
    waivedCount,
    species: Object.fromEntries(results.map((r) => [r.id, r])),
  };
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2) + "\n", "utf-8");

  // --- Console report ---
  console.log(`QA summary: ${results.length} species checked.`);
  for (const r of results) {
    if (r.hardFailures.length === 0 && r.warnings.length === 0 && r.waived.length === 0) continue;
    console.log(`\n${r.id} (${r.realm}):`);
    for (const f of r.hardFailures) console.log(`  HARD FAIL [${f.metric}] ${f.detail}`);
    for (const w of r.warnings) console.log(`  warn [${w.metric}] ${w.detail}`);
    for (const w of r.waived) console.log(`  WAIVED [${w.metric}] ${w.detail}\n    -> justification: ${w.reason}`);
  }

  const totalUnwaivedHardFailures = results.reduce((sum, r) => sum + r.hardFailures.length, 0);
  console.log(
    `\nTotals: ${totalUnwaivedHardFailures} unwaived hard failure(s), ${warnCount} warning(s), ${waivedCount} waived hard failure(s) across ${results.length} species.`
  );
  console.log(`Per-species ASCII reports written to ${reportsDir}`);
  console.log(`Machine summary written to ${summaryPath}`);

  if (totalUnwaivedHardFailures > 0) {
    console.error(`\nqaRangeMasks FAILED: ${totalUnwaivedHardFailures} unwaived hard failure(s). Add a params tweak, a speciesRangeOverrides.ts add/remove/clampTo entry, or a justified qaException.`);
    process.exitCode = 1;
  } else {
    console.log("\nqaRangeMasks PASSED (all hard failures, if any, are waived with a reviewable justification).");
  }
}

main();
