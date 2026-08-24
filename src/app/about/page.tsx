import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Globe2, Shield, BookOpen, ExternalLink, Compass, Lock } from "lucide-react";

export const metadata = {
  title: "About & Open Data Science — GeoFauna",
  description:
    "Scientific methodology, cartographic projections (Robinson projection), spatial IoU scoring metrics, and open biodiversity data sources behind GeoFauna.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper-base text-ink-900 selection:bg-accent selection:text-paper-raised">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-rule-strong bg-paper-raised/95 backdrop-blur px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-ink-700 transition-colors hover:text-ink-900"
          >
            <ArrowLeft className="h-4 w-4 text-accent" />
            <span>Back to Game</span>
          </Link>
          <span className="specimen-label">
            Methodology &amp; Science
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl p-4 sm:p-8 space-y-8">
        <div className="flex items-start gap-4">
          <Image src="/brand/geofauna-logo.png" alt="GeoFauna logo" width={92} height={92} priority className="mt-1 hidden rounded-lg sm:block" />
          <div className="space-y-3">
            <span className="specimen-label border-accent-line text-accent">
              Open Biodiversity &amp; Cartography
            </span>
            <h1 className="font-display text-3xl sm:text-4xl text-ink-900">
              About GeoFauna
            </h1>
            <p className="text-sm sm:text-base text-ink-700 leading-relaxed">
              GeoFauna is an open-science animal species distribution deduction game built to educate players about Earth's biogeographical realms, ecological niches, and the pressing conservation challenges of the Anthropocene.
            </p>
          </div>
        </div>

        {/* Section 1: Cartography & Robinson Projection */}
        <section className="plate space-y-4 rounded-lg bg-paper-raised p-6 sm:p-8">
          <div className="flex items-center gap-2.5 text-accent">
            <Compass className="h-5 w-5" />
            <h2 className="font-display text-xl text-ink-900">Cartography: The Robinson Projection</h2>
          </div>
          <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
            Standard web mapping usually relies on Web Mercator, which introduces extreme area distortion near the poles (making Greenland look as large as Africa).
          </p>
          <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
            GeoFauna adopts the <strong>Robinson Projection</strong> (formulated by Arthur H. Robinson in 1963 and adopted by the National Geographic Society from 1988 to 1998). It is a pseudocylindrical projection designed to visually balance area and angular distortions across the global terrestrial biosphere.
          </p>
        </section>

        {/* Section 2: Spatial Evaluation Metric (IoU + Chamfer) */}
        <section className="plate space-y-4 rounded-lg bg-paper-raised p-6 sm:p-8">
          <div className="flex items-center gap-2.5 text-accent">
            <Shield className="h-5 w-5" />
            <h2 className="font-display text-xl text-ink-900">Evaluation Metric: Cosine Area-Weighted IoU</h2>
          </div>
          <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
            When a player submits a painted distribution mask, GeoFauna rasterizes the prediction onto a 1° × 1° geodesic sphere grid. To respect spherical geometry, each cell area at latitude φ is weighted by its true surface area cos(φ).
          </p>
          <div className="rounded-md border border-rule bg-paper-sunken p-4 font-mono text-xs text-accent-ink">
            {"IoU = Area(Predicted ∩ GroundTruth) / Area(Predicted ∪ GroundTruth) = TP / (TP + FP + FN)"}
          </div>
          <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
            The final score is 85% spherical IoU and 15% a symmetric nearest-miss measure, computed from both overpainted and missed cells with a 2,500 km cap. Dice/F1, precision, recall, mean miss distance, and guess-size ratio are reported separately so players can see whether their error was too broad, too narrow, or geographically displaced. An exact mask earns 1,000 points and Rank S.
          </p>
          <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
            A compact endemic range and a continent-spanning one cannot fairly share one curve, so every species also carries a difficulty calibration computed at build time from its own truth mask: a baseline anchor (the best trivial guess — a bounding box, a filled continent, or a centroid disc) and an attainable anchor (the truth mask expanded by one fine-brush halo). Raw IoU is remapped through those two anchors before it becomes a score, so beating the best trivial guess lands around the middle of Rank C and reaching the attainable ceiling reaches Rank S — for every species, not just the large, easy-to-outline ones.
          </p>
        </section>

        {/* Section 3: Open Data Sources */}
        <section className="plate space-y-4 rounded-lg bg-paper-raised p-6 sm:p-8">
          <div className="flex items-center gap-2.5 text-accent">
            <BookOpen className="h-5 w-5" />
            <h2 className="font-display text-xl text-ink-900">Data provenance: what is and is not in the game</h2>
          </div>
          <p className="rounded-r-md border-l-2 border-ochre bg-ochre-soft/40 p-3 text-xs sm:text-sm text-ink-700 leading-relaxed">
            Scientific honesty matters more than a prestigious source list. The playable species masks in this release are <strong className="text-ink-900">occurrence-derived extents</strong>: built from GBIF occurrence density with a documented, reproducible pipeline, not hand-drawn boxes. They are useful for a broad biogeography game, but they are not IUCN range maps, official occurrence maps, estimates of occupied area, or projections of future range.
          </p>
          <ul className="space-y-3 text-xs sm:text-sm text-ink-700">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-[2px] bg-accent" />
              <div>
                <strong className="text-ink-900">GBIF (Global Biodiversity Information Facility):</strong> the primary evidence source for playable ranges. Each catalogue species is resolved to its exact GBIF backbone taxon, then its occurrence density is aggregated at 1° resolution — filtered server-side to exclude fossil and captive/cultivated records, weighted toward observations from 1970 onward, with an all-years fallback for sparsely recorded taxa.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-[2px] bg-accent" />
              <div>
                <strong className="text-ink-900">From density to a mask:</strong> cells are kept only above a presence threshold, trimmed of likely vagrant records, cleaned with morphological closing and small-blob pruning, and clipped to the species' land, ocean, or coastal realm. A small number of species carry a declarative editorial override — most often for an introduced population that occurrence density alone can't distinguish from a native one — and every override ships with a written justification note.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-[2px] bg-accent" />
              <div>
                <strong className="text-ink-900">Licence-filtered GBIF evidence snapshot:</strong> a separate, dated, reproducible 1° evidence footprint drawn only from CC0 and CC BY occurrence records — no CC BY-NC, no coordinate uncertainty above 25 km, no fossil or introduced-flagged records. This open-licence-only snapshot is what automated QA gates check every playable mask against before it ships, and every retained publisher dataset is exposed on the species page.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-[2px] bg-accent" />
              <div>
                <strong className="text-ink-900">iNaturalist:</strong> linked per species as a citizen-science observation registry. It is a valuable discovery and validation resource, not the source of the game's ground-truth mask.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-[2px] bg-accent" />
              <div>
                <strong className="text-ink-900">IUCN Red List:</strong> referenced only for extinction-risk categories, not for range data. Its assessor-produced distribution maps have their own terms of use and are not bundled here.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-[2px] bg-accent" />
              <div>
                <strong className="text-ink-900">Natural Earth 1:110m:</strong> the public-domain vector land and boundary layer rendered beneath the game.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-[2px] bg-accent" />
              <div>
                <strong className="text-ink-900">Wikimedia Commons:</strong> High-resolution wildlife photography under open Creative Commons licenses (CC BY, CC BY-SA, Public Domain).
              </div>
            </li>
          </ul>
          <p className="rounded-r-md border-l-2 border-ochre bg-ochre-soft/40 p-3 text-xs sm:text-sm text-ink-700 leading-relaxed">
            GBIF's density aggregates cannot be filtered by licence on the server, so they do include some CC BY-NC records. GeoFauna's answer is disclosure, not omission: every species page states the percentage of its underlying records published under each licence, the playable output is a per-cell presence fact rather than a redistribution of any individual record, and every mask is independently verified against the open-licence-only evidence snapshot above. Where a fully licence-filtered mask is needed, a species can instead be rebuilt from a credentialed GBIF SQL download, which excludes non-open records server-side and produces a citable DOI stored in that species' provenance record.
          </p>
        </section>

        <section className="plate space-y-4 rounded-lg border-accent-line bg-accent-soft/30 p-6 sm:p-8">
          <div className="flex items-center gap-2.5 text-accent">
            <Globe2 className="h-5 w-5" />
            <h2 className="font-display text-xl text-ink-900">How a playable mask is built</h2>
          </div>
          <ol className="list-decimal space-y-2 pl-5 text-xs sm:text-sm leading-relaxed text-ink-700 marker:font-semibold marker:text-accent-ink">
            <li>Resolve the species to its exact GBIF backbone taxon key via a strict scientific-name match — no fuzzy matches accepted.</li>
            <li>Fetch its occurrence density at 1° resolution, excluding fossil and captive/cultivated records server-side, and capture per-species licence and dataset breakdowns.</li>
            <li>Build the mask offline and deterministically: year-windowed presence thresholding, vagrant trimming, morphological closing, connected-component pruning, and land/ocean/coastal realm clipping, followed by any justified editorial override.</li>
            <li>Run automated QA gates against the open-licence-only evidence snapshot plus cell-count, area, and realm-consistency checks; render a plain-text map for human review; hold back anything that fails rather than shipping it silently.</li>
            <li>Publish with full provenance attached: method, parameters, licence summary, and — when a credentialed run has been made — the GBIF SQL download's citable DOI.</li>
          </ol>
          <p className="text-[12px] leading-relaxed text-accent-ink">
            Every mask still ships labeled for exactly what it is: an occurrence-derived extent, never an IUCN range map, an official occurrence map, or a prediction of future range. Where the evidence is too sparse to support a confident extent, the game says so rather than guessing.
          </p>
        </section>

        {/* Section 5: Privacy & community stats */}
        <section className="plate space-y-4 rounded-lg bg-paper-raised p-6 sm:p-8">
          <div className="flex items-center gap-2.5 text-accent">
            <Lock className="h-5 w-5" />
            <h2 className="font-display text-xl text-ink-900">Privacy &amp; community stats</h2>
          </div>
          <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
            Personal statistics — streaks, grades, history — live only in this browser's local storage. They are never sent anywhere and disappear if you clear your site data.
          </p>
          <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
            An optional, anonymous daily community histogram can show how today's expedition went for everyone. When enabled, it records nothing but a score-band counter for the day — no account, no device identifier, no per-player record of any kind. The game is fully playable, with no functionality lost, when this feature is disabled or not configured.
          </p>
        </section>
      </main>
    </div>
  );
}
