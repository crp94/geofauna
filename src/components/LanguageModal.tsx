"use client";

import React from "react";
import { Globe2, Check } from "lucide-react";
import { Language } from "../types/species";
import { getTranslation } from "../lib/i18n";
import { Modal } from "./ui/Modal";

interface LanguageModalProps {
  currentLang: Language;
  onSelectLang: (lang: Language) => void;
  isOpen: boolean;
  onClose: () => void;
}

const LANGUAGES: Array<{ code: Language; name: string; nativeName: string }> = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "es", name: "Spanish", nativeName: "Español" },
  { code: "it", name: "Italian", nativeName: "Italiano" },
];

export const LanguageModal: React.FC<LanguageModalProps> = ({
  currentLang,
  onSelectLang,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      labelledBy="language-modal-title"
      maxWidth="24rem"
      closeLabel={getTranslation(currentLang, "close")}
    >
      <div className="space-y-5">
        {/* Title */}
        <div className="flex items-center gap-2.5">
          <Globe2 className="h-6 w-6 text-accent" />
          <h2 id="language-modal-title" className="font-display text-xl font-semibold text-ink-900 pr-8">
            {getTranslation(currentLang, "selectLanguage")}
          </h2>
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
                className={`flex w-full items-center justify-between rounded-md border p-3.5 text-left transition-all ${
                  isSelected
                    ? "border-accent bg-accent-soft text-ink-900"
                    : "border-rule bg-paper-sunken text-ink-700 hover:bg-paper-deep hover:text-ink-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="specimen-label font-mono uppercase">{item.code}</span>
                  <div>
                    <p className="font-bold text-sm">{item.nativeName}</p>
                    <p className="text-xs text-ink-500">{item.name}</p>
                  </div>
                </div>

                {isSelected && <Check className="h-4 w-4 text-accent-ink" />}
              </button>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
