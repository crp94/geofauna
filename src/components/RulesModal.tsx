"use client";

import React from "react";
import { HelpCircle, X, CheckCircle2, Shield, Globe2, BookOpen } from "lucide-react";
import { Language } from "../types/species";
import { getTranslation } from "../lib/i18n";

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const RulesModal: React.FC<RulesModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-surface-border bg-surface p-6 sm:p-8 shadow-2xl animate-scale-in space-y-6">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-2 text-slate-400 hover:bg-surface-elevated hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2.5">
          <HelpCircle className="h-6 w-6 text-emerald-400" />
          <h2 className="text-xl font-black text-white sm:text-2xl">
            {getTranslation(lang, "howToPlayTitle")}
          </h2>
        </div>

        {/* Step-by-Step Guide */}
        <div className="space-y-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div className="rounded-xl border border-surface-border bg-surface-subtle p-3.5">
            <p className="font-semibold text-white">{getTranslation(lang, "step1")}</p>
          </div>

          <div className="rounded-xl border border-surface-border bg-surface-subtle p-3.5">
            <p className="font-semibold text-white">{getTranslation(lang, "step2")}</p>
            <p className="mt-1 text-xs text-slate-400">
              Adjust your brush radius (150 km, 450 km, 1000 km) and use the eraser or undo tool as needed.
            </p>
          </div>

          <div className="rounded-xl border border-surface-border bg-surface-subtle p-3.5">
            <p className="font-semibold text-white">{getTranslation(lang, "step3")}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="h-2 w-2 rounded-sm bg-emerald-500" /> Native Hit (Green)
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <span className="h-2 w-2 rounded-sm bg-amber-500" /> Overestimated (Amber)
              </span>
              <span className="flex items-center gap-1 text-sky-400">
                <span className="h-2 w-2 rounded-sm bg-sky-400" /> Missed Range (Blue)
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-surface-border bg-surface-subtle p-3.5">
            <p className="font-semibold text-white">{getTranslation(lang, "step4")}</p>
          </div>
        </div>

        {/* Open Science & Data Note */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-300 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-emerald-400">
            <Shield className="h-4 w-4" />
            <span>Open Science & Biodiversity Data</span>
          </div>
          <p className="leading-relaxed">
            GeoFauna is built on open science datasets from the IUCN Red List of Threatened Species, WWF Ecoregions, Natural Earth, and high-resolution creative commons imagery from Wikimedia Commons.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-extrabold text-slate-950 hover:bg-emerald-400 transition-colors"
        >
          Got it, let's play!
        </button>
      </div>
    </div>
  );
};
