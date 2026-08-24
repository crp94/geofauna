"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, ExternalLink, Info, BookOpenCheck, Database } from "lucide-react";
import { Language, Species } from "../types/species";
import { getTranslation } from "../lib/i18n";
import { trackGameEvent } from "../lib/analytics";

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
  const [showCredit, setShowCredit] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Reset image error state when species changes
  useEffect(() => {
    setImgError(false);
  }, [species.id]);

  const localizedName = species.commonName[lang] || species.commonName.en;
  const clues = species.clues.map((c) => c[lang] || c.en);

  const getDifficultyBadge = (tier: Species["difficulty"]) => {
    switch (tier) {
      case "iconic":
        return {
          label: getTranslation(lang, "difficultyIconic"),
          className: "border-iucn-lc-edge text-iucn-lc-text bg-iucn-lc-fill",
        };
      case "regional":
        return {
          label: getTranslation(lang, "difficultyRegional"),
          className: "border-accent-line text-accent-ink bg-accent-soft",
        };
      case "endemic":
        return {
          label: getTranslation(lang, "difficultyEndemic"),
          className: "border-ochre text-ochre bg-ochre-soft",
        };
    }
  };

  const diffBadge = getDifficultyBadge(species.difficulty);

  const handleToggleCredit = () => {
    setShowCredit((prev) => {
      const next = !prev;
      if (next) {
        trackGameEvent("attribution_opened", { species_id: species.id });
      }
      return next;
    });
  };

  return (
    <section className="plate relative overflow-hidden rounded-lg bg-paper-raised p-5 sm:p-6 shadow-paper">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
        {/* Left: Species High-Res Photo (mounted specimen mat) */}
        <div className="relative aspect-[4/3] w-full p-1 bg-paper-raised border border-rule-strong rounded-[4px] sm:aspect-[16/10] lg:col-span-5">
          <div className="relative h-full w-full overflow-hidden rounded-[2px] bg-paper-sunken flex items-center justify-center">
            {!imgError ? (
              <Image
                src={species.image.url}
                alt={species.image.alt || localizedName}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-cover"
                priority
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center text-ink-500 space-y-2">
                <span className="text-5xl">🐾</span>
                <p className="text-xs font-semibold text-ink-700">{localizedName}</p>
                <p className="text-[12px] italic text-accent-ink">{species.scientificName}</p>
              </div>
            )}

            {/* Photo Attribution Button & Overlay */}
            <div className="absolute bottom-2 right-2 z-10">
              <button
                type="button"
                onClick={handleToggleCredit}
                aria-label={getTranslation(lang, "viewAttribution")}
                className="flex items-center gap-1.5 rounded-md bg-paper-raised/90 border border-rule px-2 py-1 text-[12px] font-medium text-ink-700 backdrop-blur-md transition-colors hover:bg-paper-raised"
                title={getTranslation(lang, "viewAttribution")}
              >
                <Camera className="h-3.5 w-3.5 text-accent" />
                <span>{species.image.photographer}</span>
              </button>
            </div>

            {showCredit && (
              <div className="absolute inset-0 z-20 flex flex-col justify-end bg-paper-raised/95 p-4 text-xs text-ink-700 backdrop-blur-md transition-all">
                <div className="space-y-1.5">
                  <p className="font-semibold text-accent-ink">
                    {getTranslation(lang, "imageCredit")}
                  </p>
                  <p className="text-ink-900">{species.image.photographer}</p>
                  <p className="text-ink-500">
                    {getTranslation(lang, "license")}: {species.image.license}
                  </p>
                  <a
                    href={species.image.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-[12px] text-accent-ink hover:underline"
                  >
                    <span>Wikimedia Commons</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCredit(false)}
                  aria-label={getTranslation(lang, "close")}
                  className="mt-3 w-full rounded-md border border-rule bg-paper-sunken py-1 text-center font-medium text-ink-700 hover:bg-paper-deep"
                >
                  {getTranslation(lang, "close")}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Taxonomy, Clues & Metadata */}
        <div className="space-y-4 lg:col-span-7">
          {/* Header Row */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`specimen-label ${diffBadge.className}`}>
                {diffBadge.label}
              </span>
              <span className="specimen-label">
                {species.taxonClass} · {species.order}
              </span>
              <span className="specimen-label">
                {species.realm}
              </span>
            </div>

            <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-ink-900">
              {localizedName}
            </h1>

            <p className="font-display italic text-lg text-accent-ink">
              {species.scientificName}
            </p>
          </div>

          {/* Ecological Clues Card */}
          <div className="rounded-md border border-rule bg-paper-sunken p-3.5 sm:p-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-500">
              <Info className="h-3.5 w-3.5 text-accent" />
              <span>{getTranslation(lang, "fieldNotes")}</span>
            </div>

            <ul className="mt-2.5 text-xs sm:text-sm text-ink-700 leading-relaxed">
              {clues.map((clue, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2 border-b border-rule/70 py-2 last:border-0 last:pb-0 first:pt-0"
                >
                  <span className="mt-0.5 shrink-0 text-accent">◦</span>
                  <span>{clue}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-start gap-2 rounded-r-md border-l-2 border-ochre bg-ochre-soft/40 p-3 text-[12px] leading-relaxed text-ink-700">
            <BookOpenCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ochre" />
            <div>
              <span className="font-bold text-ochre">
                {getTranslation(lang, "learningRangeTitle")} · {species.range.provenance.resolution}
              </span>
              <p className="mt-0.5">
                {getTranslation(lang, "learningRangeBody")}
                {" "}
                <a
                  href={species.range.provenance.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-ink hover:underline"
                >
                  {getTranslation(lang, "methodAndVersion")}
                </a>
              </p>
            </div>
          </div>

          {species.range.evidence && (
            <a
              href={species.range.evidence.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 rounded-r-md border-l-2 border-iucn-lc-edge bg-iucn-lc-fill/40 p-3 text-[12px] leading-relaxed text-ink-700 transition-colors hover:bg-iucn-lc-fill/70"
              title={species.range.evidence.methodology}
            >
              <Database className="mt-0.5 h-3.5 w-3.5 shrink-0 text-iucn-lc-text" />
              <div>
                <span className="font-bold text-iucn-lc-text">
                  {species.range.evidence.recordCount > 0
                    ? `${getTranslation(lang, "evidenceSnapshotTitle")} · ${species.range.evidence.recordCount} GBIF records / ${species.range.evidence.occupiedCellCount} cells`
                    : `${getTranslation(lang, "evidenceSnapshotTitle")} · ${getTranslation(lang, "evidenceSnapshotEmpty")}`}
                </span>
                <p className="mt-0.5">
                  {getTranslation(lang, "retrievedLabel")} {species.range.evidence.retrievedAt.slice(0, 10)} · {species.range.evidence.licenseSummary}
                </p>
              </div>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
