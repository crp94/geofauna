"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Globe2,
  Volume2,
  VolumeX,
  BarChart3,
  HelpCircle,
  Flame,
  Layers,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { GameMode, Language } from "../types/species";
import { getTranslation } from "../lib/i18n";
import { getSoundMuted, setSoundMuted, playClickSound } from "../lib/sound";
import { trackGameEvent } from "../lib/analytics";

interface HeaderProps {
  mode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  streak: number;
  lang: Language;
  dayNumber?: number;
  onOpenLangModal: () => void;
  onOpenStatsModal: () => void;
  onOpenRulesModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  onSelectMode,
  streak,
  lang,
  dayNumber,
  onOpenLangModal,
  onOpenStatsModal,
  onOpenRulesModal,
}) => {
  const [muted, setMuted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setMuted(getSoundMuted());
  }, []);

  const handleToggleSound = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    setSoundMuted(newMuted);
    trackGameEvent("sound_toggled", { muted: newMuted });
    if (!newMuted) playClickSound();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-rule-strong bg-paper-raised/95 backdrop-blur-md shadow-[0_3px_0_-2px_rgba(217,208,186,0.9)]">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-90"
            onClick={() => onSelectMode("daily")}
          >
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-md border border-rule bg-paper-sunken">
              <Image src="/brand/geofauna-favicon-192.png" alt="" width={32} height={32} priority />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-semibold tracking-tight text-base sm:text-xl text-ink-900">
                Geo<span className="text-accent">Fauna</span>
              </span>
              {/* Below sm, the logo row only has room for the wordmark plus
                  the action-control icons on the same line (issue #6) --
                  BETA and the full "Expedition #n" label are dropped here
                  and the day number reappears compactly in the tabs row. */}
              <span className="specimen-label hidden border-ochre text-ochre sm:inline-flex">BETA</span>
              {typeof dayNumber === "number" && (
                <span className="specimen-label hidden border-rule text-ink-500 sm:inline-flex">
                  {getTranslation(lang, "dayLabel")} #{dayNumber}
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* Game Mode Selector -- below sm this is the header's 2nd (and
            last) row, so the compact "#n" specimen tag (full label lives in
            the brand row from sm up) rides along right-aligned here instead
            of costing the mobile header a 3rd row (issue #6). */}
        <div className="order-3 flex w-full items-center gap-2 sm:order-none sm:w-auto">
          <div
            role="group"
            aria-label="Game Modes"
            className="flex flex-1 items-center justify-center rounded-md border border-rule bg-paper-sunken p-0.5 text-xs font-semibold sm:flex-none"
          >
            <button
              type="button"
              onClick={() => {
                playClickSound();
                onSelectMode("daily");
              }}
              className={`flex items-center gap-1.5 rounded-[3px] px-3 py-1.5 transition-all ${
                mode === "daily"
                  ? "bg-paper-raised text-ink-900 font-bold border border-rule-strong shadow-paper"
                  : "text-ink-500 hover:text-ink-900 border border-transparent"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{getTranslation(lang, "daily")}</span>
              {streak > 0 && (
                <span className="flex items-center gap-0.5 text-[12px] font-extrabold text-terracotta">
                  <Flame className="h-3 w-3 fill-terracotta text-terracotta" />
                  <span className="font-mono">{streak}</span>
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                playClickSound();
                onSelectMode("unlimited");
              }}
              className={`flex items-center gap-1.5 rounded-[3px] px-3 py-1.5 transition-all ${
                mode === "unlimited"
                  ? "bg-paper-raised text-ink-900 font-bold border border-rule-strong shadow-paper"
                  : "text-ink-500 hover:text-ink-900 border border-transparent"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>{getTranslation(lang, "unlimited")}</span>
            </button>

            <Link
              href="/archive"
              className="flex items-center gap-1.5 rounded-[3px] px-3 py-1.5 text-ink-500 transition-all hover:text-ink-900"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>{getTranslation(lang, "archive")}</span>
            </Link>
          </div>

          {typeof dayNumber === "number" && (
            <span
              className="specimen-label shrink-0 border-rule text-ink-500 sm:hidden"
              title={`${getTranslation(lang, "dayLabel")} #${dayNumber}`}
            >
              #{dayNumber}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Switcher */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onOpenLangModal();
            }}
            aria-label={getTranslation(lang, "changeLanguage")}
            title={getTranslation(lang, "changeLanguage")}
            className="flex items-center gap-1 rounded-md border border-rule bg-paper-raised px-2.5 py-1.5 text-xs font-bold font-mono text-ink-700 transition-colors hover:bg-paper-sunken"
          >
            <Globe2 className="h-3.5 w-3.5 text-accent" />
            <span className="uppercase">{lang}</span>
          </button>

          {/* Audio Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={getTranslation(lang, muted ? "unmuteSounds" : "muteSounds")}
            title={getTranslation(lang, muted ? "unmuteSounds" : "muteSounds")}
            className="rounded-md p-2 text-ink-700 transition-colors hover:bg-paper-sunken"
          >
            {muted ? (
              <VolumeX className="h-4 w-4 text-ink-500" />
            ) : (
              <Volume2 className="h-4 w-4 text-accent" />
            )}
          </button>

          {/* Stats Button */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onOpenStatsModal();
            }}
            aria-label={getTranslation(lang, "stats")}
            title={getTranslation(lang, "stats")}
            className="rounded-md p-2 text-ink-700 transition-colors hover:bg-paper-sunken"
          >
            <BarChart3 className="h-4 w-4" />
          </button>

          {/* How to play / Rules */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onOpenRulesModal();
            }}
            aria-label={getTranslation(lang, "rules")}
            title={getTranslation(lang, "rules")}
            className="rounded-md p-2 text-ink-700 transition-colors hover:bg-paper-sunken"
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
