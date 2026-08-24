# GeoFauna 🐾

**A naturalist's expedition journal, played as a species-range game.**

Paint a species' native range on a zoomable, pannable Robinson projection map, then see how you did against an **occurrence-derived extent** built from open GBIF data. GeoFauna is open source and deliberately honest about what its range masks are and are not: they are reproducible, documented reconstructions of where a species has been recorded, never IUCN range maps, official occurrence maps, or predictions of future range. See the [methodology page](https://geofauna.carlosrodriguezpardo.es/about) and each species' provenance panel before using any in-game information beyond play and discovery.

- **Live URL:** [https://geofauna.carlosrodriguezpardo.es](https://geofauna.carlosrodriguezpardo.es)
- **Sibling Projects:** [Cityle](https://cityle.carlosrodriguezpardo.es/) · [P-hackle](https://phackle.carlosrodriguezpardo.es/) · [Climatle](https://climatle.carlosrodriguezpardo.es/) · [Partido a Partido](https://atletixi.carlosrodriguezpardo.es/)
- **Languages:** English · Español · Italiano
- **License:** MIT

---

## 🌍 Core Game Loop

1. **Species Inspection:** Examine taxonomy, high-resolution Wikimedia Creative Commons imagery, and physiological/ecological clues — clues never name a place, so location has to be inferred from biology, not read off a map.
2. **Robinson Projection Mapping:** Paint the species' native range on a zoomable, pannable Robinson projection canvas. Zoom in with the wheel, a trackpad pinch, or two-finger touch to work at endemic-range precision; five geodesic brush sizes (50 km, 100 km, 150 km, 450 km, 1000 km) plus land/ocean snapping, an eraser, and undo.
3. **Difficulty-Calibrated Scoring & Diagnostic Reveal:** Contrast your prediction against the current occurrence-derived extent:
   - 🟩 **Emerald (Hit / True Positive):** Native range correctly mapped.
   - 🟧 **Amber (Overestimated / False Positive):** Predicted areas outside native range.
   - 🟦 **Sky Blue (Missed / False Negative):** Native range missed.
   - **Metric:** 85% spherical area-weighted **Intersection over Union (IoU)** plus 15% symmetric geodesic near-miss proximity, then remapped through a per-species calibration (a trivial-guess baseline and an attainable ceiling) so a tiny endemic range and a continent-spanning one are graded on a fair curve. Dice/F1, precision, recall, mean miss distance, and predicted-to-reference area ratio make the result explainable (0–1,000, Grades S–D).
4. **Daily expedition, unlimited practice, and the full catalogue:** a deterministic shuffled-cycle daily species (`#{n}` in the header, every species played once per cycle), unlimited practice rounds that don't inflate daily stats, and a browsable catalogue of every species in the game.
5. **Conservation context:** IUCN category, population trend, threats, and links to GBIF and iNaturalist biodiversity registries. Editorial notes are labelled as such; they are not primary assessments.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, React, TypeScript)
- **Styling & type:** Tailwind CSS on a light "naturalist expedition journal" design-token system (`src/lib/theme.ts`); `next/font/google` — **Fraunces** (display serif), **Source Sans 3** (UI), **IBM Plex Mono** (coordinates/metrics/provenance)
- **Cartography & Geodesy:** `d3-geo`, `d3-geo-projection` (`geoRobinson`), `topojson-client`, Natural Earth 1:110m; a layered canvas compositor with an affine view transform for zoom/pan
- **Spatial Compression:** Compact Run-Length Encoded (RLE) bitmasks on a $360 \times 180$ grid (<250 KB total bundle)
- **Range data pipeline:** a reproducible, offline-deterministic pipeline (`src/scripts/`) that resolves species to GBIF backbone taxa, fetches occurrence density tiles, and derives playable masks with documented cleanup rules and automated QA gates — see [Data sources & provenance](#-data-sources--provenance)
- **Optional daily community stats:** an anonymous, edge-runtime API (`/api/daily-score`, `/api/daily-stats`) backed by Upstash Redis, storing only score-band counters — fully feature-flagged, zero secrets required to build or deploy
- **Audio:** Web Audio API tactile synthesizers for brush clicks and score fanfare chimes
- **Analytics & SEO:** `@vercel/analytics`, `@vercel/speed-insights`, JSON-LD `schema.org/VideoGame`, dynamic OpenGraph cards (`/opengraph-image`, `/twitter-image`), XML sitemap and robots (`/api/` disallowed)

---

## 🚀 Development & Quality Checks

### Requirements
- Node **v20.x or v22.x** (`.nvmrc` included)
- npm **9+**

```bash
# 1. Install exact dependencies
npm install

# 2. Run the full range-data pipeline (resolve taxa → fetch GBIF density →
#    fetch the licence-filtered evidence snapshot → build masks → QA → curate)
npm run data:all

# ...or step through it manually:
npm run data:gbif:resolve   # scientificName -> GBIF backbone taxonKey (exact matches only)
npm run data:gbif:fetch     # per-species GBIF occurrence density tiles
npm run data:occurrences    # licence-filtered (CC0/CC BY only) evidence snapshot, for QA
npm run data:gbif:masks     # derive playable occurrence-extent masks
npm run data:gbif:qa        # automated QA gates against the open-evidence snapshot
npm run data:curate         # assemble the final curated species catalog

# One-time image optimization pass (resize/re-encode species photography)
npm run data:images

# 3. Start local development server
npm run dev

# 4. Typecheck, validate data integrity, and run the pure-logic test suite
npm run check
npm run test:units

# 5. Production build
npm run build
```

Open [http://localhost:3000](http://localhost:3000).

`npm run check` runs data curation, `tsc --noEmit`, and the game-logic assertion script; `npm run test:units` runs the colocated `tsx` assertion suites for the view-transform math, difficulty calibration, grid operations, and the daily-stats backend. Both are plain Node scripts — no test framework dependency.

---

## 🔐 Environment variables

GeoFauna builds and deploys with **zero required secrets**. Every variable below is optional and feature-flagged; the game works fully with none of them set.

| Variable | Used for | Default when unset |
|---|---|---|
| `NEXT_PUBLIC_DAILY_STATS` | Enables the optional anonymous daily community histogram UI | Feature off |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST credentials for the daily-stats backend (also accepts the Vercel Marketplace aliases `KV_REST_API_URL` / `KV_REST_API_TOKEN`) | Falls back to an in-memory store in `next dev`; API returns 503 in production |
| `DAILY_STATS_SALT` | Salts the per-IP hash used for daily-stats rate limiting | A built-in default salt |
| `GEOFAUNA_GBIF_DENSITY_ZOOM` | GBIF Maps API tile zoom level used by `data:gbif:fetch` | `2` |
| `GEOFAUNA_GBIF_DELAY_MS` | Delay between GBIF requests (politeness/backoff) | `200` |
| `GEOFAUNA_GBIF_MAX` | Caps the number of GBIF requests per pipeline run | Unlimited |
| `GEOFAUNA_GBIF_REFRESH` | Set to `1` to force-refetch already-checkpointed species | Off (resumes from checkpoint) |
| `GEOFAUNA_GBIF_SAMPLE_LIMIT` | Max records sampled per species for the licence-filtered evidence snapshot | `300` |
| `GBIF_USER` / `GBIF_PWD` / `GBIF_EMAIL` | Credentials for the optional, fully licence-filtered GBIF SQL download ("gold path") that produces a citable DOI | Gold path skipped; density-derived masks are used instead |

---

## 📚 Data sources & provenance

- **Playable range masks:** occurrence-derived extents, built by the pipeline described above from GBIF occurrence density (basisOfRecord filters excluding fossil and captive/cultivated records, a 1970+ year window with a sparse-taxon fallback, presence thresholding with vagrant trimming, morphological cleanup, realm clipping, and per-species editorial overrides with a written justification note). They are not IUCN range polygons or official occurrence maps. Every generated range carries a provenance object — method, parameters, source citation, and (when run) a GBIF SQL download DOI — that makes this explicit.
- **GBIF citation:** when citing occurrence data drawn through this project, cite [GBIF.org](https://www.gbif.org/) with your access date (e.g. "GBIF.org, accessed via GeoFauna's density pipeline, DD Month YYYY"); per-species dataset and licence attributions are listed in-app on each species page.
- **License honesty:** GBIF's density aggregates cannot be licence-filtered server-side, so they include some CC BY-NC records. GeoFauna discloses the exact licence split per species, publishes per-cell presence facts rather than redistributing individual records, and verifies every mask against a licence-filtered (CC0/CC BY only) evidence snapshot via automated QA gates.
- **Conservation assessment reference:** [IUCN Red List of Threatened Species](https://www.iucnredlist.org/), referenced only for extinction-risk categories — its spatial data are not bundled here.
- **Occurrence and taxonomy registries:** [GBIF](https://www.gbif.org/) and [iNaturalist](https://www.inaturalist.org/), linked per taxon for exploration; occurrence records are evidence, not a substitute for an expert-assessed range.
- **GBIF evidence snapshot:** `npm run data:occurrences` requests coordinates from GBIF's public API, retains only CC0/CC BY records with documented quality filters, and checkpoints each taxon. The derived footprints and source metadata are published in `src/data/gbif-occurrence-evidence.json`.
- **Cartography & Boundaries:** [Natural Earth](https://www.naturalearthdata.com/) 1:110m public domain vector data.
- **Wildlife Photography:** [Wikimedia Commons](https://commons.wikimedia.org/) images, each with a verified Creative Commons license (CC BY, CC BY-SA, or Public Domain), photographer credit, and source URL.

### 🔒 Privacy

Personal stats (streaks, grades, history) live only in your browser's local storage and are never transmitted. The optional daily community histogram (behind `NEXT_PUBLIC_DAILY_STATS`) stores nothing but an anonymous score-band counter per day — no accounts, no device IDs, no per-player records — and the game is fully playable with it disabled.

---

## 👤 Author

**Carlos Rodríguez-Pardo**
- Website: [carlosrodriguezpardo.es](https://carlosrodriguezpardo.es)
- GitHub: [@crp94](https://github.com/crp94)
- Bluesky: [@carlosrodriguezp.bsky.social](https://bsky.app/profile/carlosrodriguezp.bsky.social)
