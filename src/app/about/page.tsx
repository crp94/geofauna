import React from "react";
import Link from "next/link";
import { ArrowLeft, Globe2, Shield, BookOpen, ExternalLink, Compass } from "lucide-react";

export const metadata = {
  title: "About & Open Data Science — GeoFauna",
  description:
    "Scientific methodology, cartographic projections (Robinson projection), spatial IoU scoring metrics, and open biodiversity data sources behind GeoFauna.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-surface-border bg-surface/90 backdrop-blur-md px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-emerald-400" />
            <span>Back to Game</span>
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Methodology & Science
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl p-4 sm:p-8 space-y-8">
        <div className="space-y-3">
          <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-extrabold uppercase text-emerald-400">
            Open Biodiversity & Cartography
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            About GeoFauna
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            GeoFauna is an open-science animal species distribution deduction game built to educate players about Earth's biogeographical realms, ecological niches, and the pressing conservation challenges of the Anthropocene.
          </p>
        </div>

        {/* Section 1: Cartography & Robinson Projection */}
        <section className="rounded-3xl border border-surface-border bg-surface p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-2.5 text-emerald-400">
            <Compass className="h-5 w-5" />
            <h2 className="text-xl font-bold text-white">Cartography: The Robinson Projection</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Standard web mapping usually relies on Web Mercator, which introduces extreme area distortion near the poles (making Greenland look as large as Africa).
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            GeoFauna adopts the <strong>Robinson Projection</strong> (formulated by Arthur H. Robinson in 1963 and adopted by the National Geographic Society from 1988 to 1998). It is a pseudocylindrical projection designed to visually balance area and angular distortions across the global terrestrial biosphere.
          </p>
        </section>

        {/* Section 2: Spatial Evaluation Metric (IoU + Chamfer) */}
        <section className="rounded-3xl border border-surface-border bg-surface p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-2.5 text-emerald-400">
            <Shield className="h-5 w-5" />
            <h2 className="text-xl font-bold text-white">Evaluation Metric: Cosine Area-Weighted IoU</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            When a player submits a painted distribution mask, GeoFauna rasterizes the prediction onto a 1° × 1° geodesic sphere grid. To respect spherical geometry, each cell area at latitude φ is weighted by its true surface area cos(φ).
          </p>
          <div className="rounded-xl border border-surface-border bg-surface-subtle p-4 font-mono text-xs text-emerald-300">
            {"IoU = Area(Predicted ∩ GroundTruth) / Area(Predicted ∪ GroundTruth) = TP / (TP + FP + FN)"}
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            In addition to pure overlap, GeoFauna incorporates a soft geodesic distance penalty for near-misses (e.g. guessing an adjacent mountain range or neighboring valley).
          </p>
        </section>

        {/* Section 3: Open Data Sources */}
        <section className="rounded-3xl border border-surface-border bg-surface p-6 sm:p-8 space-y-4 shadow-xl">
          <div className="flex items-center gap-2.5 text-emerald-400">
            <BookOpen className="h-5 w-5" />
            <h2 className="text-xl font-bold text-white">Open Biodiversity Datasets & Provenance</h2>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              <div>
                <strong>GBIF (Global Biodiversity Information Facility):</strong> Over 2.8 billion georeferenced specimen occurrence records and taxonomic registries used for spatial validation and specimen cross-referencing.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
              <div>
                <strong>iNaturalist:</strong> Community-driven citizen science network with over 200 million research-grade field observations and living species distributions.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              <div>
                <strong>IUCN Red List of Threatened Species:</strong> Spatial range geometries, population trends, and extinction risk criteria.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              <div>
                <strong>Natural Earth 1:110m:</strong> Vector landmass and national boundary geometries in public domain.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
              <div>
                <strong>Wikimedia Commons:</strong> High-resolution wildlife photography under open Creative Commons licenses (CC BY, CC BY-SA, Public Domain).
              </div>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
