"use client";

import React from "react";
import {
  Paintbrush,
  Eraser,
  RotateCcw,
  Trash2,
  CheckCircle2,
  Anchor,
  TreePine,
} from "lucide-react";
import { Language } from "../types/species";
import { getTranslation } from "../lib/i18n";
import { playClickSound } from "../lib/sound";

interface MapToolbarProps {
  tool: "brush" | "eraser";
  onSelectTool: (tool: "brush" | "eraser") => void;
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
    <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-surface-border bg-surface-subtle p-2.5 sm:p-3">
      {/* Left: Tools & Brush Radii */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {/* Brush vs Eraser Toggle */}
        <div className="flex rounded-lg border border-surface-border bg-background p-0.5">
          <button
            type="button"
            disabled={isSolved}
            onClick={() => {
              playClickSound();
              onSelectTool("brush");
            }}
            className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-bold transition-colors ${
              tool === "brush"
                ? "bg-cyan-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Paintbrush className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{getTranslation(lang, "brush")}</span>
          </button>

          <button
            type="button"
            disabled={isSolved}
            onClick={() => {
              playClickSound();
              onSelectTool("eraser");
            }}
            className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-bold transition-colors ${
              tool === "eraser"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Eraser className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{getTranslation(lang, "eraser")}</span>
          </button>
        </div>

        {/* Brush Size Selector */}
        <div className="flex rounded-lg border border-surface-border bg-background p-0.5 text-xs font-semibold">
          {[
            { label: "150 km", radius: 150, title: getTranslation(lang, "fine") },
            { label: "450 km", radius: 450, title: getTranslation(lang, "medium") },
            { label: "1000 km", radius: 1000, title: getTranslation(lang, "broad") },
          ].map((item) => (
            <button
              key={item.radius}
              type="button"
              disabled={isSolved}
              title={item.title}
              onClick={() => {
                playClickSound();
                onSelectRadius(item.radius);
              }}
              className={`rounded-md px-2 sm:px-2.5 py-1.5 transition-colors ${
                brushRadiusKm === item.radius
                  ? "bg-surface-elevated text-emerald-400 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Land / Marine Snap Toggle */}
        <button
          type="button"
          disabled={isSolved}
          onClick={() => {
            playClickSound();
            onToggleSnap();
          }}
          title={snapToLand ? getTranslation(lang, "landSnap") : getTranslation(lang, "oceanSnap")}
          className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-colors ${
            snapToLand
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
              : "border-cyan-500/40 bg-cyan-500/10 text-cyan-300"
          }`}
        >
          {snapToLand ? <TreePine className="h-3.5 w-3.5" /> : <Anchor className="h-3.5 w-3.5" />}
          <span className="hidden md:inline">
            {snapToLand ? getTranslation(lang, "landSnap") : getTranslation(lang, "oceanSnap")}
          </span>
        </button>
      </div>

      {/* Right: Undo, Clear & Submit */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          disabled={!canUndo || isSolved}
          onClick={() => {
            playClickSound();
            onUndo();
          }}
          title={getTranslation(lang, "undo")}
          className="rounded-lg border border-surface-border bg-background p-2 text-slate-400 transition-colors hover:bg-surface-elevated hover:text-white disabled:opacity-40"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          disabled={!hasDrawn || isSolved}
          onClick={() => {
            playClickSound();
            onClear();
          }}
          title={getTranslation(lang, "clear")}
          className="rounded-lg border border-surface-border bg-background p-2 text-rose-400 transition-colors hover:bg-rose-500/20 hover:text-rose-300 disabled:opacity-40"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>

        {!isSolved && (
          <button
            type="button"
            disabled={!hasDrawn}
            onClick={onSubmit}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-1.5 text-xs sm:text-sm font-extrabold text-slate-950 shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-400 hover:shadow-emerald-500/40 disabled:opacity-40 disabled:hover:bg-emerald-500"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{getTranslation(lang, "submitGuess")}</span>
          </button>
        )}
      </div>
    </div>
  );
};
