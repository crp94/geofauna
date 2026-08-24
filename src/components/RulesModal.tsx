"use client";

import React from "react";
import { HelpCircle, Shield } from "lucide-react";
import { Language } from "../types/species";
import { getTranslation } from "../lib/i18n";
import { trackGameEvent } from "../lib/analytics";
import { Modal } from "./ui/Modal";

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

/** Strip a leading "N. " numeral prefix so it isn't duplicated next to the numeral roundel. */
function stripLeadingNumber(text: string): string {
  return text.replace(/^\s*\d+\.\s*/, "");
}

export const RulesModal: React.FC<RulesModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const steps = [
    { text: getTranslation(lang, "step1") },
    { text: getTranslation(lang, "step2"), detail: getTranslation(lang, "step2Detail") },
    { text: getTranslation(lang, "step3"), legend: true },
    { text: getTranslation(lang, "step4") },
  ];

  const handleCtaClick = () => {
    trackGameEvent("rules_completed", { via: "cta" });
    onClose();
  };

  const handleClose = () => {
    trackGameEvent("rules_completed", { via: "close" });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      labelledBy="rules-modal-title"
      maxWidth="36rem"
      closeLabel={getTranslation(lang, "close")}
    >
      <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-1">
        {/* Title */}
        <div className="flex items-center gap-2.5">
          <HelpCircle className="h-6 w-6 text-accent" />
          <h2 id="rules-modal-title" className="font-display text-xl font-semibold text-ink-900 pr-8 sm:text-2xl">
            {getTranslation(lang, "howToPlayTitle")}
          </h2>
        </div>

        {/* Step-by-Step Guide: journal entries */}
        <div className="divide-y divide-rule text-xs sm:text-sm text-ink-700 leading-relaxed">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-3 py-3.5 first:pt-0 last:pb-0">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-rule-strong font-display text-xs font-semibold text-ink-900">
                {idx + 1}
              </span>
              <div className="flex-1">
                <p className="font-semibold text-ink-900">{stripLeadingNumber(step.text)}</p>
                {step.detail && <p className="mt-1 text-xs text-ink-500">{step.detail}</p>}
                {step.legend && (
                  <div className="mt-2 flex flex-wrap gap-3 text-xs">
                    <span className="flex items-center gap-1 text-paint-overlapInk">
                      <span className="h-2 w-2 rounded-[2px] bg-paint-overlap" />
                      {getTranslation(lang, "overlapLegend")}
                    </span>
                    <span className="flex items-center gap-1 text-paint-overestimateInk">
                      <span className="h-2 w-2 rounded-[2px] bg-paint-overestimate" />
                      {getTranslation(lang, "overestimateLegend")}
                    </span>
                    <span className="flex items-center gap-1 text-paint-missedInk">
                      <span className="h-2 w-2 rounded-[2px] bg-paint-missed" />
                      {getTranslation(lang, "missedLegend")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Open Science & Data Note */}
        <div className="rounded-r-md border-l-2 border-accent bg-accent-soft/40 p-4 text-xs text-ink-700 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-accent-ink">
            <Shield className="h-4 w-4" />
            <span>{getTranslation(lang, "openScienceTitle")}</span>
          </div>
          <p className="leading-relaxed">
            {getTranslation(lang, "openScienceBody")}
          </p>
        </div>

        <button
          type="button"
          onClick={handleCtaClick}
          className="w-full rounded-md bg-accent py-3 text-sm font-extrabold text-paper-raised hover:bg-accent-ink transition-colors"
        >
          {getTranslation(lang, "gotIt")}
        </button>
      </div>
    </Modal>
  );
};
