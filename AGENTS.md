# AGENTS.md — working contract for AI agents in GeoFauna

GeoFauna is a naturalist-journal-styled daily species-range game (Next.js 14 App Router). This file is the contract for any agent (human-directed or autonomous) editing this repo. See `README.md` for the product overview and `/about` for the player-facing methodology page.

## Project layout

```
src/
  app/                     Next.js routes (page.tsx, archive/, species/[slug]/, about/, api/*)
  components/              React components (MapCanvas, MapToolbar, SpeciesHero, ConservationCard, modals, ui/)
  lib/                     App logic: theme.ts (design tokens), i18n.ts (all UI strings),
                            scoring.ts, calibration.ts, viewTransform.ts, mapRenderer.ts,
                            maskCompression.ts, projection.ts, dailyStats.ts, server/
  data/                    Build output + fetched data: curated-species.json (generated),
                            gbif-density/, gbif-occurrence-evidence.json (generated)
  scripts/                 Node/tsx build & pipeline scripts (see table below), plus:
                            speciesData/ (hand-authored per-class catalog modules: mammals.ts,
                            birds.ts, reptiles.ts, amphibians.ts, fish.ts, insects.ts, types.ts)
                            speciesRangeOverrides.ts (declarative per-species mask overrides)
                            lib/ (gridOps.ts, mvt.ts — shared pure pipeline helpers)
  types/species.ts         Single source of truth for the Species/SpeciesRange/ScoreResult shapes
```

Range masks are never hand-drawn. They are derived by the pipeline below from GBIF occurrence density and are labeled **occurrence-derived extents** — never described as IUCN range maps.

## npm scripts

| Script | Does |
|---|---|
| `dev` / `build` / `start` / `lint` | Standard Next.js commands |
| `typecheck` | `tsc --noEmit` |
| `data:gbif:resolve` | scientificName → GBIF backbone taxonKey (`/v1/species/match?strict=true`, exact matches only) |
| `data:gbif:fetch` | Per-species GBIF occurrence density tiles → `src/data/gbif-density/{id}.json` |
| `data:gbif:cube` | Optional credentialed GBIF SQL download ("gold path"), fully licence-filtered, produces a citable DOI |
| `data:gbif:masks` | Deterministic mask derivation from density (thresholding, morphology, realm clipping, overrides) |
| `data:gbif:qa` | Automated QA gates against the open-evidence snapshot; writes `reports/range-qa/` |
| `data:occurrences` | Licence-filtered (CC0/CC BY only) evidence snapshot used by QA |
| `data:images` | One-time sharp re-encode of species photography (resize + mozjpeg) |
| `data:curate` | Assembles `src/data/curated-species.json` from `speciesData/` + derived masks |
| `data:all` | Runs the full pipeline in order: resolve → fetch → occurrences → masks → qa → curate |
| `test:logic` | `verifyGameLogic.ts` — scoring/game-logic assertions |
| `test:units` | `verifyViewTransform.ts`, `verifyCalibration.ts`, `verifyGridOps.ts`, `verifyDailyStats.ts` |
| `check` | `data:curate && typecheck && test:logic` — run this before considering any change done |

All tests are plain `tsx` assert-scripts (no test framework) — a failing assertion throws and exits non-zero. When you add pipeline or logic behavior, add or extend a `verify*.ts` script and wire it into `test:units` or `check` rather than inventing a new ad hoc check path.

## Species-authoring contract

Every catalog entry (existing or new) lives in one `src/scripts/speciesData/{class}.ts` module as a `RawSpeciesEntry` (see `speciesData/types.ts`) and must have:

- **`id`** — kebab-case, stable, used in URLs (`/species/{id}`) and as the range-mask/override key.
- **`scientificName`** — must be an **exact match** to the GBIF backbone (`data:gbif:resolve` uses `strict=true`; fuzzy matches are rejected). Verify at https://www.gbif.org/species/search before authoring.
- **Full metadata**: `commonName`, `taxonClass`, `order`, `family`, `realm`, `difficulty`, `iucnStatus`, `populationTrend`, `populationEstimate`, `populationHistory` (real, sourced figures — no invented numbers), `climateVulnerability`, `keyThreats`, `diet`.
- **`clues`** (2–3 entries): physiological/ecological hints the player uses to *infer* location — never told it.
  - **STRICT RULE, no exceptions: no toponyms or place-derived adjectives.** No continent, ocean, country, region, or biome-place names ("Arctic", "Mediterranean", "Iberian", "Andean", "Bornean", "Amazonian"…). Describe the physical reality instead.
  - **Live example of the violation, currently in the catalog** (`src/scripts/speciesData/mammals.ts`, narwhal, first clue): *"Medium-sized toothed whale endemic year-round to **Arctic waters**, lacking a dorsal fin to maneuver easily beneath dense pack ice."* — "Arctic waters" is a toponym and breaks the rule even though the rest of the sentence ("lacking a dorsal fin... beneath dense pack ice") is exactly the right style. A compliant rewrite keeps only the physical description, e.g. *"Medium-sized toothed whale that lives year-round beneath dense, unbroken pack ice, lacking a dorsal fin so it can surface through narrow leads."* Do not copy the existing "Arctic waters" phrasing into new entries, and flag it (don't silently fix it) if you're not the owner of `mammals.ts` in the current work session.
- **EN/ES/IT** required for every localized field (`LocalizedString` — `en`/`es`/`it`, all three populated, no fallback-to-English left in a non-English field).
- **`image`**: a Wikimedia Commons (or equivalent open-licence) photo with a **verified** license. Verification steps:
  1. Open the live Commons file page (not a cache/thumbnail) and read the license template directly off the page.
  2. Confirm it is CC BY, CC BY-SA, CC0, or Public Domain — reject anything else (including "non-commercial" or "no derivatives" variants).
  3. Record `photographer`, `license` (exact license short name), and `sourceUrl` (the Commons file page URL, not the raw image URL) in the entry.
  4. Download the image into `public/images/species/{id}.jpg`, then run `npm run data:images` so it gets resized/re-encoded like the rest of the catalog.
- Do **not** set `range` by hand and do not add a new `rangeConfig` entry — the pipeline derives `range` from GBIF density. `rangeConfig` is a legacy fallback only, consumed by `buildCuratedSpecies.ts` when no derived mask exists yet for a species.

### Pipeline commands to run per new species (or batch of species)

```bash
npm run data:gbif:resolve
npm run data:gbif:fetch
npm run data:gbif:masks
npm run data:gbif:qa
npm run data:curate
```

(Or `npm run data:all` to also refresh the licence-filtered evidence snapshot in the same pass.)

### QA gates and overrides

`data:gbif:qa` hard-fails `npm run check` on: open-evidence agreement below the warn/fail thresholds, empty or degenerate masks, area-ratio blowouts vs. the previous build, and realm inconsistency (e.g. a terrestrial species with an ocean-only mask). Read the emitted `reports/range-qa/` output for the failing species before acting.

- If the mask is wrong because of a pipeline limitation (e.g. an introduced population density can't distinguish from native, or a real distribution needs manual correction) — add a declarative entry to `src/scripts/speciesRangeOverrides.ts` (`params`/`add`/`remove`/`clampTo`) with a **required, specific `note`** explaining why. Do not use overrides to paper over a genuine data or pipeline bug — fix the bug instead.
- If a QA gate is a false positive for a specific species (e.g. a genuinely sparse-record taxon that is legitimately below the agreement threshold), add a reviewable `qaException` with a reason, not a silent skip. Waivers must be visible in the diff and explainable to a reviewer.

## Code conventions

- **TypeScript strict** (`tsconfig.json` has `"strict": true`) — no `any` escapes without a comment explaining why.
- Tests are colocated `tsx` assert-scripts wired into `npm run check` / `npm run test:units` — extend those rather than adding a new test runner or framework.
- **Design tokens come from `src/lib/theme.ts`** — never hardcode a hex color in a component, Tailwind class, canvas render, or OG image. If a color you need doesn't exist as a token, add it to `theme.ts` first.
- **i18n**: every user-facing string goes through `src/lib/i18n.ts` (`translations.en/es/it`) — no hardcoded English strings in components or pages that render to the player. Populate all three languages together; never land an English-only key.
- **Accessibility**: minimum 12px for label/UI text (nothing smaller); icon-only buttons need `aria-label`; modals are accessible dialogs (`role="dialog"`, `aria-modal`, focus trap, Escape to close, focus restore) via the shared `ui/Modal.tsx`; the map canvas carries `role="img"` and a dynamic `aria-label`; respect `prefers-reduced-motion` for confetti/stamp animations.

## Do not

- Do not add a new dependency unless there's a concrete need it solves that existing deps can't — check `package.json` first.
- Do not add dark-theme classes or styling — GeoFauna is a light "naturalist expedition journal" theme only; there is no dark mode.
- Do not credit an image without verifying its license on the live Commons page first (see verification steps above) — an unverified or misattributed credit is worse than no image.
- Do not call playable range masks "IUCN data," "range maps," or "official distributions" anywhere in code, copy, or commit messages — they are occurrence-derived extents. This is a scientific-honesty requirement, not a style preference.
