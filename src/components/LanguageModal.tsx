"use client";

import React from "react";
import { Globe2, X, Check } from "lucide-react";
import { Language } from "../types/species";

interface LanguageModalProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  isOpen: boolean;
  onClose: () => void;
}

const LANGUAGES: Array<{ code: Language; name: string; nativeName: string; flag: string }> = [
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
];

export const LanguageModal: React.FC<LanguageModalProps> = ({
  currentLang,
  onSelectLang,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-surface-border bg-surface p-6 shadow-2xl animate-scale-in space-y-5">
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
          <Globe2 className="h-6 w-6 text-emerald-400" />
          <h2 className="text-xl font-black text-white">Select Language</h2>
        </div>

        {/* Language List */}
        <div className="space-y-2">
          {LANGUAGES.map((item) => {
            const isSelected = item.code === currentLang;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  onSelectLang(item.code);
                  onClose();
                }}
                className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left transition-all ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-500/10 text-white"
                    : "border-surface-border bg-surface-subtle text-slate-300 hover:bg-surface-elevated hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.flag}</span>
                  <div>
                    <p className="font-bold text-sm">{item.nativeName}</p>
                    <p className="text-xs text-slate-400">{item.name}</p>
                  </div>
                </div>

                {isSelected && <Check className="h-4 w-4 text-emerald-400" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
