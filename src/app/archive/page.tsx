"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Search } from "lucide-react";
import speciesCatalog from "../../data/curated-species.json";
import { HabitatRealm, DifficultyTier, IUCNStatus, Language, Species, TaxonClass } from "../../types/species";
import { getIUCNLabel, getTranslation } from "../../lib/i18n";
import { getStoredLanguage } from "../../lib/storage";
import { trackGameEvent } from "../../lib/analytics";

type I18nKey = Parameters<typeof getTranslation>[1];

type ClassFilter = TaxonClass | "Fish" | "all";

const REALM_LABEL_KEY: Record<HabitatRealm, I18nKey> = {
  Terrestrial: "realmTerrestrial",
  Marine: "realmMarine",
  Freshwater: "realmFreshwater",
  Coastal: "realmCoastal",
};

const DIFFICULTY_LABEL_KEY: Record<DifficultyTier, I18nKey> = {
  iconic: "difficultyIconic",
  regional: "difficultyRegional",
  endemic: "difficultyEndemic",
};

const IUCN_CHIP_CLASSES: Record<IUCNStatus, string> = {
  LC: "bg-iucn-lc-fill text-iucn-lc-text border-iucn-lc-edge",
  NT: "bg-iucn-nt-fill text-iucn-nt-text border-iucn-nt-edge",
  VU: "bg-iucn-vu-fill text-iucn-vu-text border-iucn-vu-edge",
  EN: "bg-iucn-en-fill text-iucn-en-text border-iucn-en-edge",
  CR: "bg-iucn-cr-fill text-iucn-cr-text border-iucn-cr-edge",
  EW: "bg-iucn-ew-fill text-iucn-ew-text border-iucn-ew-edge",
  EX: "bg-iucn-ex-fill text-iucn-ex-text border-iucn-ex-edge",
};

export default function ArchivePage() {
  const speciesList = speciesCatalog as unknown as Species[];
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState<ClassFilter>("all");
  const [selectedIucn, setSelectedIucn] = useState<IUCNStatus | "all">("all");
  const [lang, setLang] = useState<Language>("en");

  React.useEffect(() => {
    setLang(getStoredLanguage());
  }, []);

  // Debounced search/filter analytics: fires ~800ms after the user stops
  // typing or changes a filter, skipping the initial render.
  const isFirstSearchEffect = React.useRef(true);
  React.useEffect(() => {
    if (isFirstSearchEffect.current) {
      isFirstSearchEffect.current = false;
      return;
    }
    const timer = setTimeout(() => {
      trackGameEvent("archive_search_used", {
        has_query: search.trim().length > 0,
        class_filter: selectedClass,
        iucn_filter: selectedIucn,
      });
    }, 800);
    return () => clearTimeout(timer);
  }, [search, selectedClass, selectedIucn]);

  const t = (key: I18nKey) => getTranslation(lang, key);

  const filteredSpecies = speciesList.filter((s) => {
    const locName = s.commonName[lang] || s.commonName.en;
    const matchSearch =
      locName.toLowerCase().includes(search.toLowerCase()) ||
      s.scientificName.toLowerCase().includes(search.toLowerCase()) ||
      s.order.toLowerCase().includes(search.toLowerCase());

    const matchClass =
      selectedClass === "all" ||
      (selectedClass === "Fish"
        ? s.taxonClass === "Actinopterygii" || s.taxonClass === "Chondrichthyes"
        : s.taxonClass === selectedClass);
    const matchIucn = selectedIucn === "all" || s.iucnStatus === selectedIucn;

    return matchSearch && matchClass && matchIucn;
  });

  return (
    <div className="min-h-screen bg-paper-base text-ink-900 selection:bg-accent selection:text-paper-raised">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-rule-strong bg-paper-raised/95 backdrop-blur px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-ink-700 transition-colors hover:text-ink-900"
          >
            <ArrowLeft className="h-4 w-4 text-accent" />
            <span>{t("backToGame")}</span>
          </Link>

          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-accent" />
            <h1 className="font-display text-sm sm:text-base font-semibold text-ink-900">
              {t("catalogTitle")}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Archive Content */}
      <main className="mx-auto max-w-6xl p-4 sm:p-6 space-y-6">
        {/* Intro */}
        <div className="plate rounded-lg bg-paper-raised p-6 sm:p-8">
          <div className="max-w-2xl space-y-3">
            <span className="specimen-label border-accent-line text-accent">
              {t("catalogEyebrow")}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-ink-900">
              {t("catalogHeading")}
            </h2>
            <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
              {t("catalogIntro").replace("{count}", String(speciesList.length))}
            </p>
          </div>

          {/* Filters Bar */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-12">
            {/* Search Input */}
            <div className="relative sm:col-span-6">
              <label htmlFor="archive-search" className="sr-only">
                {t("searchPlaceholder")}
              </label>
              <Search className="pointer-events-none absolute left-3.5 top-3 h-4 w-4 text-ink-500" />
              <input
                id="archive-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("searchPlaceholder")}
                className="w-full rounded-md border border-rule bg-paper-raised py-2.5 pl-10 pr-4 text-xs sm:text-sm text-ink-900 placeholder-ink-400 focus:border-accent focus:outline-none"
              />
            </div>

            {/* Class Filter */}
            <div className="sm:col-span-3">
              <label htmlFor="archive-class-filter" className="sr-only">
                {t("filterAllClasses")}
              </label>
              <select
                id="archive-class-filter"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value as ClassFilter)}
                className="w-full rounded-md border border-rule bg-paper-raised py-2.5 px-3 text-xs sm:text-sm text-ink-900 focus:border-accent focus:outline-none"
              >
                <option value="all">{t("filterAllClasses")}</option>
                <option value="Mammalia">{t("taxonMammals")}</option>
                <option value="Aves">{t("taxonBirds")}</option>
                <option value="Reptilia">{t("taxonReptiles")}</option>
                <option value="Amphibia">{t("taxonAmphibians")}</option>
                <option value="Fish">{t("taxonFish")}</option>
                <option value="Insecta">{t("taxonInsects")}</option>
              </select>
            </div>

            {/* IUCN Filter */}
            <div className="sm:col-span-3">
              <label htmlFor="archive-iucn-filter" className="sr-only">
                {t("filterAllIucn")}
              </label>
              <select
                id="archive-iucn-filter"
                value={selectedIucn}
                onChange={(e) => setSelectedIucn(e.target.value as IUCNStatus | "all")}
                className="w-full rounded-md border border-rule bg-paper-raised py-2.5 px-3 text-xs sm:text-sm text-ink-900 focus:border-accent focus:outline-none"
              >
                <option value="all">{t("filterAllIucn")}</option>
                <option value="LC">{t("iucnLC")}</option>
                <option value="NT">{t("iucnNT")}</option>
                <option value="VU">{t("iucnVU")}</option>
                <option value="EN">{t("iucnEN")}</option>
                <option value="CR">{t("iucnCR")}</option>
                <option value="EW">{t("iucnEW")}</option>
                <option value="EX">{t("iucnEX")}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Species Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSpecies.map((s, index) => {
            const locName = s.commonName[lang] || s.commonName.en;

            return (
              <Link
                key={s.id}
                href={`/species/${s.id}`}
                onClick={() =>
                  trackGameEvent("archive_species_clicked", {
                    species_id: s.id,
                    position_band: index < 6 ? "top" : index < 18 ? "mid" : "deep",
                  })
                }
                className="plate group flex flex-col overflow-hidden rounded-lg bg-paper-raised transition-all duration-300 hover:border-accent-line hover:shadow-paper hover:-translate-y-0.5"
              >
                {/* Photo Thumbnail, matted */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-sunken">
                  <div className="absolute inset-1 overflow-hidden border border-rule-strong">
                    <Image
                      src={s.image.url}
                      alt={s.image.alt || locName}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-2.5 right-2.5">
                    <span
                      title={getIUCNLabel(s.iucnStatus, lang)}
                      className={`rounded-[3px] border px-2 py-0.5 text-[12px] font-bold uppercase ${IUCN_CHIP_CLASSES[s.iucnStatus]}`}
                    >
                      {s.iucnStatus}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
                  <div>
                    <span className="text-[12px] uppercase tracking-[0.14em] text-ink-500">
                      {s.taxonClass} · {s.order}
                    </span>
                    <h3 className="font-display text-xl text-ink-900 transition-colors group-hover:text-accent-ink">
                      {locName}
                    </h3>
                    <p className="font-display text-sm italic text-accent-ink">
                      {s.scientificName}
                    </p>
                  </div>

                  <p className="text-xs text-ink-700 leading-relaxed line-clamp-2">
                    {s.clues[0]?.[lang] || s.clues[0]?.en}
                  </p>

                  <div className="flex items-center justify-between border-t border-rule pt-3 font-mono text-[12px] text-ink-500">
                    <span>{t(REALM_LABEL_KEY[s.realm])}</span>
                    <span>
                      {t(DIFFICULTY_LABEL_KEY[s.difficulty])} {t("tierSuffix")}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
