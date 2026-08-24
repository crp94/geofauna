# GeoFauna 🐾

**The open-biodiversity species distribution deduction game.**

Deduce where Earth's animal species naturally roam on an interactive Robinson projection map. Test your biogeographical intuition against verified ground-truth scientific range data, and explore conservation status, historical population trajectories, and 2050 climate vulnerabilities.

- **Live URL:** [https://geofauna.carlosrodriguezpardo.es](https://geofauna.carlosrodriguezpardo.es)
- **Sibling Projects:** [Cityle](https://cityle.carlosrodriguezpardo.es/) · [P-hackle](https://phackle.carlosrodriguezpardo.es/) · [Climatle](https://climatle.carlosrodriguezpardo.es/) · [Partido a Partido](https://atletixi.carlosrodriguezpardo.es/)
- **Languages:** English · Español · Italiano
- **License:** MIT

---

## 🌍 Core Game Loop

1. **Species Inspection:** Examine taxonomy, high-resolution Wikimedia Creative Commons imagery, and ecological biome clues.
2. **Robinson Projection Mapping:** Paint the species' native geographical range on an equal-area balanced Robinson projection canvas using spherical geodesic brushes (150 km, 450 km, 1000 km) with land/marine snapping, eraser, and undo tools.
3. **Spatial Scoring & Diagnostic Reveal:** Contrast your prediction against the scientific ground truth:
   - 🟩 **Emerald (Hit / True Positive):** Native range correctly mapped.
   - 🟧 **Amber (Overestimated / False Positive):** Predicted areas outside native range.
   - 🟦 **Sky Blue (Missed / False Negative):** Native range missed.
   - **Metric:** Cosine area-weighted **Intersection over Union (IoU)** + **Dice Coefficient** + **Soft-Chamfer geodesic proximity decay** for near-misses (0 – 1,000 score, Grades S, A, B, C, D).
4. **Conservation & Climate Deep-Dive:**
   - **IUCN Red List Status:** LC $\to$ NT $\to$ VU $\to$ EN $\to$ CR $\to$ EW $\to$ EX.
   - **Population Trajectory Chart:** Decadal census counts and key conservation milestones.
   - **2050 Climate Vulnerability:** Thermal stress, sea ice loss, habitat aridification, and prey shifts under future warming scenarios.
   - **Primary Threats & Active Rewilding Actions:** Detailed ecological breakdowns.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, React, TypeScript)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with a dark scientific theme
- **Cartography & Geodesy:** `d3-geo`, `d3-geo-projection` (`geoRobinson`), `topojson-client`, Natural Earth 1:110m
- **Spatial Compression:** Compact Run-Length Encoded (RLE) bitmasks on a $360 \times 180$ grid (<250 KB total bundle)
- **Audio:** Web Audio API tactile synthesizers for brush clicks and score fanfare chimes
- **Analytics & SEO:** `@vercel/analytics`, `@vercel/speed-insights`, JSON-LD `schema.org/VideoGame`, dynamic OpenGraph cards (`/opengraph-image`, `/twitter-image`), XML sitemaps and robots

---

## 🚀 Development & Quality Checks

### Requirements
- Node **v20.x or v22.x** (`.nvmrc` included)
- npm **9+**

```bash
# 1. Install exact dependencies
npm install

# 2. Curate, rasterize, and validate the biodiversity dataset
npm run data:curate

# 3. Start local development server
npm run dev

# 4. Typecheck and validate data integrity
npm run check

# 5. Production build
npm run build
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📚 Open Data Sources & Provenance

- **Species Ranges & Conservation Status:** [IUCN Red List of Threatened Species](https://www.iucnredlist.org/) & WWF Ecoregions.
- **Cartography & Boundaries:** [Natural Earth](https://www.naturalearthdata.com/) 1:110m public domain vector data.
- **Wildlife Photography:** [Wikimedia Commons](https://commons.wikimedia.org/) under verified Creative Commons licenses (CC BY, CC BY-SA, Public Domain).

---

## 👤 Author

**Carlos Rodríguez-Pardo**
- Website: [carlosrodriguezpardo.es](https://carlosrodriguezpardo.es)
- GitHub: [@crp94](https://github.com/crp94)
- Bluesky: [@carlosrodriguezp.bsky.social](https://bsky.app/profile/carlosrodriguezp.bsky.social)
