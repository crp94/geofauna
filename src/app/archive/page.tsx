"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, ExternalLink, Globe2, Search, Shield, Tag } from "lucide-react";
import speciesCatalog from "../../data/curated-species.json";
import { IUCNStatus, Language, Species, TaxonClass } from "../../types/species";
import { getIUCNLabel } from "../../lib/i18n";
import { getStoredLanguage } from "../../lib/storage";

export default function ArchivePage() {
  const speciesList = speciesCatalog as unknown as Species[];
  const [search, setSearch] = useState("");
  const [selectedClass, setSelectedClass] = useState<TaxonClass | "all">("all");
  const [selectedIucn, setSelectedIucn] = useState<IUCNStatus | "all">("all");
  const [lang, setLang] = useState<Language>("en");

  React.useEffect(() => {
    setLang(getStoredLanguage());
  }, []);

  const filteredSpecies = speciesList.filter((s) => {
    const locName = s.commonName[lang] || s.commonName.en;
    const matchSearch =
      locName.toLowerCase().includes(search.toLowerCase()) ||
      s.scientificName.toLowerCase().includes(search.toLowerCase()) ||
      s.order.toLowerCase().includes(search.toLowerCase());

    const matchClass = selectedClass === "all" || s.taxonClass === selectedClass;
    const matchIucn = selectedIucn === "all" || s.iucnStatus === selectedIucn;

    return matchSearch && matchClass && matchIucn;
  });

  const getIucnColor = (status: IUCNStatus) => {
    switch (status) {
      case "LC":
        return "bg-blue-500/20 text-blue-400 border-blue-500/40";
      case "NT":
        return "bg-teal-500/20 text-teal-400 border-teal-500/40";
      case "VU":
        return "bg-amber-500/20 text-amber-400 border-amber-500/40";
      case "EN":
        return "bg-orange-500/20 text-orange-400 border-orange-500/40";
      case "CR":
        return "bg-rose-500/20 text-rose-400 border-rose-500/40";
      case "EW":
        return "bg-purple-500/20 text-purple-400 border-purple-500/40";
      case "EX":
        return "bg-slate-700 text-slate-300 border-slate-600";
    }
  };

  return (
    <div className="min-h-screen bg-background text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-surface-border bg-surface/90 backdrop-blur-md px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-emerald-400" />
            <span>Back to Game</span>
          </Link>

          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-emerald-400" />
            <h1 className="text-sm sm:text-base font-black text-white">
              GeoFauna Species Catalog
            </h1>
          </div>
        </div>
      </header>

      {/* Main Archive Content */}
      <main className="mx-auto max-w-6xl p-4 sm:p-6 space-y-6">
        {/* Intro */}
        <div className="rounded-3xl border border-surface-border bg-surface p-6 sm:p-8 shadow-xl">
          <div className="max-w-2xl space-y-2">
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-extrabold uppercase text-emerald-400">
              Open Biodiversity Database
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Earth's Living Species Catalog
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore all {speciesList.length} verified animal species curated in GeoFauna. Inspect their taxonomy, IUCN conservation status, high-resolution photography, and global distribution profiles.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-12">
            {/* Search Input */}
            <div className="relative sm:col-span-6">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search species by common or scientific name..."
                className="w-full rounded-xl border border-surface-border bg-surface-subtle py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Class Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value as any)}
                className="w-full rounded-xl border border-surface-border bg-surface-subtle py-2.5 px-3 text-xs sm:text-sm text-slate-200 focus:border-emerald-500 focus:outline-none"
              >
                <option value="all">All Taxon Classes</option>
                <option value="Mammalia">Mammals</option>
                <option value="Aves">Birds</option>
                <option value="Reptilia">Reptiles</option>
                <option value="Amphibia">Amphibians</option>
              </select>
            </div>

            {/* IUCN Filter */}
            <div className="sm:col-span-3">
              <select
                value={selectedIucn}
                onChange={(e) => setSelectedIucn(e.target.value as any)}
                className="w-full rounded-xl border border-surface-border bg-surface-subtle py-2.5 px-3 text-xs sm:text-sm text-slate-200 focus:border-emerald-500 focus:outline-none"
              >
                <option value="all">All IUCN Statuses</option>
                <option value="LC">Least Concern (LC)</option>
                <option value="NT">Near Threatened (NT)</option>
                <option value="VU">Vulnerable (VU)</option>
                <option value="EN">Endangered (EN)</option>
                <option value="CR">Critically Endangered (CR)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Species Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSpecies.map((s) => {
            const locName = s.commonName[lang] || s.commonName.en;

            return (
              <article
                key={s.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-surface-border bg-surface transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5"
              >
                {/* Photo Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-subtle">
                  <Image
                    src={s.image.url}
                    alt={s.image.alt || locName}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <span
                      className={`rounded-lg border px-2 py-0.5 text-[11px] font-black uppercase backdrop-blur-md ${getIucnColor(
                        s.iucnStatus
                      )}`}
                    >
                      {s.iucnStatus}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {s.taxonClass} · {s.order}
                    </span>
                    <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition-colors">
                      {locName}
                    </h3>
                    <p className="text-xs font-medium italic text-emerald-400/90">
                      {s.scientificName}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {s.clues[0]?.[lang] || s.clues[0]?.en}
                  </p>

                  <div className="flex items-center justify-between border-t border-surface-border pt-3 text-[11px] text-slate-400">
                    <span>{s.realm}</span>
                    <span className="capitalize">{s.difficulty} Tier</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}
