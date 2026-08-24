"use client";

import React from "react";
import {
  AlertTriangle,
  Flame,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Minus,
  TreePine,
  Utensils,
  ThermometerSnowflake,
  History,
  Activity,
} from "lucide-react";
import { IUCNStatus, Language, Species } from "../types/species";
import { getIUCNLabel, getTranslation } from "../lib/i18n";

interface ConservationCardProps {
  species: Species;
  lang: Language;
}

const IUCN_TIERS: IUCNStatus[] = ["LC", "NT", "VU", "EN", "CR", "EW", "EX"];

export const ConservationCard: React.FC<ConservationCardProps> = ({
  species,
  lang,
}) => {
  const getIucnBadgeColor = (status: IUCNStatus, active: boolean) => {
    if (!active) return "bg-surface-subtle text-slate-600 border-surface-border opacity-40";

    switch (status) {
      case "LC":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50 ring-2 ring-blue-500/30";
      case "NT":
        return "bg-teal-500/20 text-teal-300 border-teal-500/50 ring-2 ring-teal-500/30";
      case "VU":
        return "bg-amber-500/20 text-amber-400 border-amber-500/50 ring-2 ring-amber-500/30";
      case "EN":
        return "bg-orange-500/20 text-orange-400 border-orange-500/50 ring-2 ring-orange-500/30";
      case "CR":
        return "bg-rose-500/20 text-rose-400 border-rose-500/50 ring-2 ring-rose-500/30";
      case "EW":
        return "bg-purple-500/20 text-purple-400 border-purple-500/50 ring-2 ring-purple-500/30";
      case "EX":
        return "bg-slate-700 text-slate-300 border-slate-600";
    }
  };

  const getTrendIcon = (trend: Species["populationTrend"]) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-emerald-400" />;
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-rose-400" />;
      default:
        return <Minus className="h-4 w-4 text-slate-400" />;
    }
  };

  // Trajectory SVG Chart calculations
  const history = species.populationHistory || [];
  const minYear = history.length > 0 ? Math.min(...history.map((h) => h.year)) : 2000;
  const maxYear = history.length > 0 ? Math.max(...history.map((h) => h.year)) : 2024;
  const maxEst = history.length > 0 ? Math.max(...history.map((h) => h.estimate)) : 100;
  const minEst = history.length > 0 ? Math.min(...history.map((h) => h.estimate)) : 0;

  const chartWidth = 360;
  const chartHeight = 110;
  const paddingX = 30;
  const paddingY = 20;

  const points = history.map((h) => {
    const x =
      paddingX +
      ((h.year - minYear) / Math.max(1, maxYear - minYear)) *
        (chartWidth - paddingX * 2);
    const y =
      chartHeight -
      paddingY -
      ((h.estimate - minEst) / Math.max(1, maxEst - minEst)) *
        (chartHeight - paddingY * 2);
    return { x, y, ...h };
  });

  const polylinePath = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="space-y-6 rounded-2xl border border-surface-border bg-surface p-4 sm:p-6 shadow-2xl">
      {/* Title */}
      <div className="flex items-center gap-2 border-b border-surface-border pb-4">
        <ShieldCheck className="h-5 w-5 text-emerald-400" />
        <h2 className="text-lg sm:text-xl font-black text-white">
          {getTranslation(lang, "conservationTitle")}
        </h2>
      </div>

      {/* IUCN Status Meter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {getTranslation(lang, "iucnMeterTitle")}
          </span>
          <span className="text-xs font-extrabold text-emerald-400">
            {getIUCNLabel(species.iucnStatus, lang)} ({species.iucnStatus})
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {IUCN_TIERS.map((tier) => {
            const isActive = tier === species.iucnStatus;
            return (
              <div
                key={tier}
                className={`flex flex-col items-center justify-center rounded-xl border p-2 text-center transition-all ${getIucnBadgeColor(
                  tier,
                  isActive
                )}`}
              >
                <span className="text-xs font-black sm:text-sm">{tier}</span>
                <span className="hidden sm:block text-[9px] font-medium leading-tight mt-0.5 opacity-80">
                  {tier === "LC"
                    ? "Least Concern"
                    : tier === "NT"
                    ? "Near Threat"
                    : tier === "VU"
                    ? "Vulnerable"
                    : tier === "EN"
                    ? "Endangered"
                    : tier === "CR"
                    ? "Crit. End."
                    : tier === "EW"
                    ? "Extinct Wild"
                    : "Extinct"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Population Trajectory & Decadal History */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center">
        <div className="space-y-2 lg:col-span-5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Wild Population Status
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-black text-white">
              {species.populationEstimate}
            </span>
            <div className="flex items-center gap-1 rounded-full border border-surface-border bg-surface-subtle px-2 py-0.5 text-xs font-semibold capitalize text-slate-300">
              {getTrendIcon(species.populationTrend)}
              <span>{species.populationTrend}</span>
            </div>
          </div>
          {species.historicalContraction && (
            <p className="text-xs text-slate-400 leading-relaxed">
              <span className="font-semibold text-rose-400">
                {species.historicalContraction.percentageLoss}% Range Contraction:
              </span>{" "}
              {species.historicalContraction.description[lang] ||
                species.historicalContraction.description.en}
            </p>
          )}
        </div>

        {/* SVG Trajectory Chart */}
        {points.length > 1 && (
          <div className="rounded-xl border border-surface-border bg-surface-subtle p-3 lg:col-span-7">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
              <span>{getTranslation(lang, "populationTrajectory")}</span>
              <span className="text-emerald-400">
                {minYear} → {maxYear}
              </span>
            </div>

            <div className="mt-2 flex justify-center">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-24 overflow-visible"
              >
                {/* Horizontal baseline */}
                <line
                  x1={paddingX}
                  y1={chartHeight - paddingY}
                  x2={chartWidth - paddingX}
                  y2={chartHeight - paddingY}
                  stroke="rgba(50, 75, 110, 0.4)"
                  strokeWidth="1"
                />

                {/* Polyline */}
                <polyline
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={polylinePath}
                />

                {/* Circles for each point */}
                {points.map((p, idx) => (
                  <g key={idx}>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="4"
                      fill="#060A11"
                      stroke="#10B981"
                      strokeWidth="2"
                    />
                    <text
                      x={p.x}
                      y={p.y - 7}
                      textAnchor="middle"
                      fill="#94A3B8"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      {p.estimate.toLocaleString()}
                    </text>
                    <text
                      x={p.x}
                      y={chartHeight - 4}
                      textAnchor="middle"
                      fill="#64748B"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      {p.year}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* 2050 Climate Vulnerability */}
      <div className="rounded-xl border border-surface-border bg-surface-subtle p-4 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
          <ThermometerSnowflake className="h-4 w-4" />
          <span>{getTranslation(lang, "climateVulnerabilityTitle")}</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {species.climateVulnerability[lang] || species.climateVulnerability.en}
        </p>
      </div>

      {/* Key Threats */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <span>{getTranslation(lang, "keyThreatsTitle")}</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {species.keyThreats.map((t, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-surface-border bg-surface-subtle p-3 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{t.threat}</span>
                <span
                  className={`rounded px-1.5 py-0.2 text-[10px] font-extrabold uppercase ${
                    t.impact === "high"
                      ? "bg-rose-500/20 text-rose-400"
                      : "bg-amber-500/20 text-amber-400"
                  }`}
                >
                  {t.impact}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.description[lang] || t.description.en}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Niche, Diet & Conservation Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-surface-border bg-surface-subtle p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Utensils className="h-4 w-4 text-emerald-400" />
            <span>{getTranslation(lang, "ecologicalNicheTitle")}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {species.diet[lang] || species.diet.en}
          </p>
          {species.keystoneRole && (
            <p className="text-xs text-emerald-400/90 font-medium leading-relaxed">
              ★ {species.keystoneRole[lang] || species.keystoneRole.en}
            </p>
          )}
        </div>

        {species.conservationActions && (
          <div className="rounded-xl border border-surface-border bg-surface-subtle p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <TreePine className="h-4 w-4 text-emerald-400" />
              <span>{getTranslation(lang, "conservationActionTitle")}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {species.conservationActions[lang] || species.conservationActions.en}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
