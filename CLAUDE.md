# CLAUDE.md

Quick orientation for Claude sessions working in this repo. Full contract: **`AGENTS.md`** — read it before authoring species or touching the data pipeline.

## What this is

GeoFauna: a daily species-range guessing game (Next.js 14 App Router, TypeScript). Players paint a species' native range on a zoomable Robinson-projection map and are scored against a GBIF-derived **occurrence-derived extent** — never presented as an IUCN range map. Light "naturalist expedition journal" visual identity (paper/ink, no dark mode). Siblings: Cityle, Climatle, P-hackle, Atletixi.

## Key commands

```bash
npm install
npm run dev              # local dev server
npm run check            # data:curate + typecheck + test:logic — run before calling anything done
npm run test:units       # verifyViewTransform / verifyCalibration / verifyGridOps / verifyDailyStats
npm run data:all         # full pipeline: resolve -> fetch -> occurrences -> masks -> qa -> curate
npm run data:images      # one-time species-photo optimization pass
```

Zero secrets are required to build or deploy; the daily-community-stats backend (Upstash) and the GBIF SQL "gold path" are both optional and feature-flagged.

## Where things live

- `src/lib/theme.ts` — every design token (color/hex). Never hardcode a hex in a component; add a token instead.
- `src/lib/i18n.ts` — every player-facing string, in `en`/`es`/`it`. No hardcoded English strings in UI code.
- `src/scripts/speciesData/{class}.ts` — hand-authored catalog entries (mammals/birds/reptiles/amphibians/fish/insects). `types/species.ts` is the canonical data shape.
- `src/scripts/` pipeline scripts (`resolveTaxonKeys.ts` → `fetchGbifDensity.ts` → `buildRangeMasks.ts` → `qaRangeMasks.ts` → `buildCuratedSpecies.ts`) derive range masks; `speciesRangeOverrides.ts` holds justified per-species exceptions.
- Plan reference: `~/.claude/plans/fizzy-percolating-toast.md` (this redesign's full workstream plan, if present in your environment).

## Three hard rules

1. **No toponyms in clues.** Species clues must let players infer location from physiology/ecology, never from a named place or place-derived adjective ("Arctic," "Andean," "Bornean"…). See `AGENTS.md` for a live example of the violation to avoid repeating.
2. **Verified open-license images only.** Every species photo needs a license confirmed on the live Wikimedia Commons page (CC BY / CC BY-SA / CC0 / PD only) plus photographer and source URL — check before crediting, never assume.
3. **Provenance honesty.** Range masks are occurrence-derived extents built by a documented pipeline — never call them IUCN data, range maps, or official distributions, in code, UI copy, or commit messages.

For the full species-authoring contract, QA-override process, and code conventions, see `AGENTS.md`.
