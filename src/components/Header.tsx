"use client";

import React from "react";
import Link from "next/link";
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

interface HeaderProps {
  mode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  streak: number;
  lang: Language;
  onOpenLangModal: () => void;
  onOpenStatsModal: () => void;
  onOpenRulesModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  onSelectMode,
  streak,
  lang,
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
    if (!newMuted) playClickSound();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-border bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-white transition-opacity hover:opacity-90"
            onClick={() => onSelectMode("daily")}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
              <Globe2 className="h-5 w-5" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-base sm:text-xl text-white font-sans">
                Geo<span className="text-emerald-400">Fauna</span>
              </span>
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30">
                BETA
              </span>
            </div>
          </Link>
        </div>

        {/* Game Mode Selector */}
        <div
          role="group"
          aria-label="Game Modes"
          className="order-3 flex w-full items-center justify-center rounded-xl border border-surface-border bg-background p-1 text-xs font-semibold sm:order-none sm:w-auto"
        >
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onSelectMode("daily");
            }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
              mode === "daily"
                ? "bg-emerald-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{getTranslation(lang, "daily")}</span>
            {streak > 0 && (
              <span className="flex items-center gap-0.5 text-[11px] font-extrabold text-amber-300">
                <Flame className="h-3 w-3 fill-amber-400 text-amber-400" />
                {streak}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              onSelectMode("unlimited");
            }}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
              mode === "unlimited"
                ? "bg-emerald-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>{getTranslation(lang, "unlimited")}</span>
          </button>

          <Link
            href="/archive"
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-slate-400 transition-all hover:text-slate-200"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>{getTranslation(lang, "archive")}</span>
          </Link>
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
            title="Change language / Cambiar idioma"
            className="flex items-center gap-1 rounded-lg border border-surface-border bg-surface-subtle px-2.5 py-1.5 text-xs font-bold text-slate-200 transition-colors hover:bg-surface-elevated"
          >
            <Globe2 className="h-3.5 w-3.5 text-emerald-400" />
            <span className="uppercase">{lang}</span>
          </button>

          {/* Audio Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            title={muted ? "Unmute sounds" : "Mute sounds"}
            className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-surface-elevated hover:text-white"
          >
            {muted ? (
              <VolumeX className="h-4 w-4 text-slate-500" />
            ) : (
              <Volume2 className="h-4 w-4 text-emerald-400" />
            )}
          </button>

          {/* Stats Button */}
          <button
            type="button"
            onClick={() => {
              playClickSound();
              onOpenStatsModal();
            }}
            title="Statistics"
            className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-surface-elevated hover:text-white"
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
            title="How to play & Open Data"
            className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-surface-elevated hover:text-white"
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
