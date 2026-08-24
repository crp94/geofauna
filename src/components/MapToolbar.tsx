"use client";

import React from "react";
import {
  Paintbrush,
  Eraser,
  Hand,
  RotateCcw,
  Trash2,
  CheckCircle2,
  Anchor,
  TreePine,
} from "lucide-react";
import { Language } from "../types/species";
import { getTranslation } from "../lib/i18n";
import { playClickSound } from "../lib/sound";

type Tool = "brush" | "eraser" | "pan";
type BrushSizeTitleKey = "brushVeryFine" | "brushFine100" | "fine" | "medium" | "broad";

interface MapToolbarProps {
  tool: Tool;
  onSelectTool: (tool: Tool) => void;
  brushRadiusKm: number;
  onSelectRadius: (radius: number) => void;
  snapToLand: boolean;
  onToggleSnap: () => void;
  onUndo: () => void;
  onClear: () => void;
  onSubmit: () => void;
  canUndo: boolean;
  hasDrawn: boolean;
  isSolved: boolean;
  lang: Language;
}

const BRUSH_SIZES: Array<{ radius: number; label: string; titleKey: BrushSizeTitleKey }> = [
  { radius: 50, label: "50", titleKey: "brushVeryFine" },
  { radius: 100, label: "100", titleKey: "brushFine100" },
  { radius: 150, label: "150", titleKey: "fine" },
  { radius: 450, label: "450", titleKey: "medium" },
  { radius: 1000, label: "1k", titleKey: "broad" },
];

export const MapToolbar: React.FC<MapToolbarProps> = ({
  tool,
  onSelectTool,
  brushRadiusKm,
  onSelectRadius,
  snapToLand,
  onToggleSnap,
  onUndo,
  onClear,
  onSubmit,
  canUndo,
  hasDrawn,
  isSolved,
  lang,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-md border border-rule bg-paper-sunken p-2.5 sm:p-3">
      {/* Left: Tools, brush radii, snap toggle -- scrolls horizontally on small screens */}
      <div className="flex min-w-0 items-center gap-1.5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-0.5 sm:flex-wrap sm:gap-2 sm:overflow-visible sm:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Brush / Eraser / Pan Toggle */}
        <div className="flex shrink-0 snap-start rounded-md border border-rule bg-paper-raised p-0.5">
          <button
            type="button"
            disabled={isSolved}
            aria-pressed={tool === "brush"}
            aria-label={getTranslation(lang, "brush")}
            onClick={() => {
              playClickSound();
              onSelectTool("brush");
            }}
            className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-bold transition-colors ${
              tool === "brush"
                ? "bg-accent text-paper-raised shadow-sm"
                : "text-ink-500 hover:text-ink-900"
            }`}
          >
            <Paintbrush className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{getTranslation(lang, "brush")}</span>
          </button>

          <button
            type="button"
            disabled={isSolved}
            aria-pressed={tool === "eraser"}
            aria-label={getTranslation(lang, "eraser")}
            onClick={() => {
              playClickSound();
              onSelectTool("eraser");
            }}
            className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-bold transition-colors ${
              tool === "eraser"
                ? "bg-terracotta text-paper-raised shadow-sm"
                : "text-ink-500 hover:text-ink-900"
            }`}
          >
            <Eraser className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{getTranslation(lang, "eraser")}</span>
          </button>

          <button
            type="button"
            disabled={isSolved}
            aria-pressed={tool === "pan"}
            aria-label={getTranslation(lang, "panTool")}
            title={getTranslation(lang, "panTool")}
            onClick={() => {
              playClickSound();
              onSelectTool("pan");
            }}
            className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-bold transition-colors ${
              tool === "pan" ? "bg-paper-deep text-ink-900 shadow-sm" : "text-ink-500 hover:text-ink-900"
            }`}
          >
            <Hand className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{getTranslation(lang, "panTool")}</span>
          </button>
        </div>

        {/* Brush Size Segmented Control */}
        <div className="flex shrink-0 snap-start items-center gap-0.5 rounded-md border border-rule bg-paper-raised p-0.5 text-xs font-semibold">
          {BRUSH_SIZES.map((item) => (
            <button
              key={item.radius}
              type="button"
              disabled={isSolved}
              aria-pressed={brushRadiusKm === item.radius}
              title={getTranslation(lang, item.titleKey)}
              onClick={() => {
                playClickSound();
                onSelectRadius(item.radius);
              }}
              className={`rounded-md border px-2 py-1.5 transition-colors ${
                brushRadiusKm === item.radius
                  ? "border-rule-strong bg-paper-raised font-bold text-accent-ink"
                  : "border-transparent text-ink-500 hover:text-ink-900"
              }`}
            >
              {item.label}
            </button>
          ))}
          <span className="px-1.5 text-[11px] font-mono uppercase tracking-wide text-ink-500">km</span>
        </div>

        {/* Land / Marine Snap Toggle */}
        <button
          type="button"
          disabled={isSolved}
          aria-pressed={snapToLand}
          onClick={() => {
            playClickSound();
            onToggleSnap();
          }}
          title={snapToLand ? getTranslation(lang, "landSnap") : getTranslation(lang, "oceanSnap")}
          className={`flex shrink-0 snap-start items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-semibold transition-colors ${
            snapToLand
              ? "border-accent-line bg-accent-soft text-accent-ink"
              : "border-iucn-lc-edge bg-iucn-lc-fill text-iucn-lc-text"
          }`}
        >
          {snapToLand ? <TreePine className="h-3.5 w-3.5" /> : <Anchor className="h-3.5 w-3.5" />}
          <span className="hidden md:inline">
            {snapToLand ? getTranslation(lang, "landSnap") : getTranslation(lang, "oceanSnap")}
          </span>
        </button>
      </div>

      {/* Right: Undo, Clear & Submit */}
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          disabled={!canUndo || isSolved}
          aria-label={getTranslation(lang, "undo")}
          onClick={() => {
            playClickSound();
            onUndo();
          }}
          title={getTranslation(lang, "undo")}
          className="rounded-md border border-rule p-2 text-ink-700 transition-colors hover:bg-paper-raised hover:text-ink-900 disabled:opacity-40"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          disabled={!hasDrawn || isSolved}
          aria-label={getTranslation(lang, "clear")}
          onClick={() => {
            playClickSound();
            onClear();
          }}
          title={getTranslation(lang, "clear")}
          className="rounded-md border border-rule p-2 text-ink-700 transition-colors hover:border-danger hover:bg-danger-soft hover:text-danger disabled:opacity-40"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>

        {!isSolved && (
          <button
            type="button"
            disabled={!hasDrawn}
            onClick={onSubmit}
            className="flex items-center gap-1.5 rounded-md bg-accent px-4 py-1.5 text-xs sm:text-sm font-semibold text-paper-raised shadow-paper transition-colors hover:bg-accent-ink disabled:opacity-40 disabled:hover:bg-accent"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{getTranslation(lang, "submitGuess")}</span>
          </button>
        )}
      </div>
    </div>
  );
};
