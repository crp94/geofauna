"use client";

import React from "react";
import Image from "next/image";
import { Camera, ExternalLink, Info, MapPin, Sparkles, Tag } from "lucide-react";
import { Language, Species } from "../types/species";
import { getTranslation } from "../lib/i18n";

interface SpeciesHeroProps {
  species: Species;
  lang: Language;
  isSolved: boolean;
}

export const SpeciesHero: React.FC<SpeciesHeroProps> = ({
  species,
  lang,
  isSolved,
}) => {
  const [showCredit, setShowCredit] = React.useState(false);

  const localizedName = species.commonName[lang] || species.commonName.en;
  const clues = species.clues.map((c) => c[lang] || c.en);

  const getDifficultyBadge = (tier: Species["difficulty"]) => {
    switch (tier) {
      case "iconic":
        return {
          label: getTranslation(lang, "difficultyIconic"),
          bg: "bg-blue-500/10 text-blue-400 border-blue-500/30",
        };
      case "regional":
        return {
          label: getTranslation(lang, "difficultyRegional"),
          bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
        };
      case "endemic":
        return {
          label: getTranslation(lang, "difficultyEndemic"),
          bg: "bg-amber-500/10 text-amber-400 border-amber-500/30",
        };
    }
  };

  const diffBadge = getDifficultyBadge(species.difficulty);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-surface-border bg-surface p-4 sm:p-6 shadow-xl">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        {/* Left: Species High-Res Photo */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-surface-border bg-surface-subtle sm:aspect-[16/10] lg:col-span-5">
          <Image
            src={species.image.url}
            alt={species.image.alt || localizedName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
            priority
          />

          {/* Photo Attribution Button & Overlay */}
          <div className="absolute bottom-2 right-2 z-10">
            <button
              type="button"
              onClick={() => setShowCredit(!showCredit)}
              className="flex items-center gap-1.5 rounded-lg bg-black/70 px-2 py-1 text-[11px] font-medium text-white/90 backdrop-blur-md transition-colors hover:bg-black/90"
              title="View image attribution"
            >
              <Camera className="h-3.5 w-3.5 text-emerald-400" />
              <span>{species.image.photographer}</span>
            </button>
          </div>

          {showCredit && (
            <div className="absolute inset-0 z-20 flex flex-col justify-end bg-black/80 p-4 text-xs text-white backdrop-blur-md transition-all">
              <div className="space-y-1.5">
                <p className="font-semibold text-emerald-400">
                  {getTranslation(lang, "imageCredit")}
                </p>
                <p className="text-slate-200">{species.image.photographer}</p>
                <p className="text-slate-400">
                  {getTranslation(lang, "license")}: {species.image.license}
                </p>
                <a
                  href={species.image.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline"
                >
                  <span>Wikimedia Commons</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <button
                type="button"
                onClick={() => setShowCredit(false)}
                className="mt-3 w-full rounded-lg bg-white/10 py-1 text-center font-medium hover:bg-white/20"
              >
                Close
              </button>
            </div>
          )}
        </div>

        {/* Right: Taxonomy, Clues & Metadata */}
        <div className="space-y-4 lg:col-span-7">
          {/* Header Row */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wide ${diffBadge.bg}`}
              >
                {diffBadge.label}
              </span>
              <span className="rounded-full border border-surface-border bg-surface-subtle px-2.5 py-0.5 text-[11px] font-semibold text-slate-300">
                {species.taxonClass} · {species.order}
              </span>
              <span className="rounded-full border border-surface-border bg-surface-subtle px-2.5 py-0.5 text-[11px] font-semibold text-slate-300">
                {species.realm}
              </span>
            </div>

            <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
              {localizedName}
            </h1>

            <p className="text-sm font-medium italic text-emerald-400">
              {species.scientificName}
            </p>
          </div>

          {/* Ecological Clues Card */}
          <div className="rounded-xl border border-surface-border bg-surface-subtle p-3.5 sm:p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Info className="h-3.5 w-3.5 text-emerald-400" />
              <span>{getTranslation(lang, "cluesTitle")}</span>
            </div>

            <ul className="mt-2.5 space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {clues.map((clue, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span>{clue}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
