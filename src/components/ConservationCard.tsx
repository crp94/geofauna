"use client";

import React from "react";
import {
  AlertTriangle,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Minus,
  TreePine,
  Utensils,
  ThermometerSnowflake,
  Database,
  ExternalLink,
  Camera,
} from "lucide-react";
import { IUCNStatus, Language, Species } from "../types/species";
import { getIUCNLabel, getTranslation } from "../lib/i18n";
import { ink, rule, accent, paper } from "../lib/theme";

interface ConservationCardProps {
  species: Species;
  lang: Language;
}

const IUCN_TIERS: IUCNStatus[] = ["LC", "NT", "VU", "EN", "CR", "EW", "EX"];

const IUCN_TIER_CLASSES: Record<IUCNStatus, string> = {
  LC: "bg-iucn-lc-fill text-iucn-lc-text border-iucn-lc-edge ring-iucn-lc-edge",
  NT: "bg-iucn-nt-fill text-iucn-nt-text border-iucn-nt-edge ring-iucn-nt-edge",
  VU: "bg-iucn-vu-fill text-iucn-vu-text border-iucn-vu-edge ring-iucn-vu-edge",
  EN: "bg-iucn-en-fill text-iucn-en-text border-iucn-en-edge ring-iucn-en-edge",
  CR: "bg-iucn-cr-fill text-iucn-cr-text border-iucn-cr-edge ring-iucn-cr-edge",
  EW: "bg-iucn-ew-fill text-iucn-ew-text border-iucn-ew-edge ring-iucn-ew-edge",
  EX: "bg-iucn-ex-fill text-iucn-ex-text border-iucn-ex-edge ring-iucn-ex-edge",
};

const IUCN_SHORT_KEYS: Record<IUCNStatus, Parameters<typeof getTranslation>[1]> = {
  LC: "iucnShortLC",
  NT: "iucnShortNT",
  VU: "iucnShortVU",
  EN: "iucnShortEN",
  CR: "iucnShortCR",
  EW: "iucnShortEW",
  EX: "iucnShortEX",
};

export const ConservationCard: React.FC<ConservationCardProps> = ({
  species,
  lang,
}) => {
  const getIucnBadgeColor = (status: IUCNStatus, active: boolean) => {
    if (!active) return "bg-paper-sunken text-ink-400 border-rule opacity-70";
    return `${IUCN_TIER_CLASSES[status]} ring-1 ring-offset-1 ring-offset-paper-raised`;
  };

  const getTrendIcon = (trend: Species["populationTrend"]) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-accent-ink" />;
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-danger" />;
      default:
        return <Minus className="h-4 w-4 text-ink-500" />;
    }
  };

  const getTrendLabel = (trend: Species["populationTrend"]) => {
    switch (trend) {
      case "increasing":
        return getTranslation(lang, "trendIncreasing");
      case "decreasing":
        return getTranslation(lang, "trendDecreasing");
      case "stable":
        return getTranslation(lang, "trendStable");
      default:
        return getTranslation(lang, "trendUnknown");
    }
  };

  const getTrendTextClass = (trend: Species["populationTrend"]) => {
    switch (trend) {
      case "increasing":
        return "text-accent-ink";
      case "decreasing":
        return "text-danger";
      default:
        return "text-ink-500";
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
  const baselineY = chartHeight - paddingY;

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
  const areaPath =
    points.length > 1
      ? `${points[0].x},${baselineY} ${polylinePath} ${points[points.length - 1].x},${baselineY}`
      : "";

  return (
    <div className="plate space-y-6 rounded-lg bg-paper-raised p-4 sm:p-6 shadow-paper">
      {/* Title */}
      <div className="flex items-center gap-2 border-b border-rule pb-4">
        <ShieldCheck className="h-5 w-5 text-accent" />
        <h2 className="font-display text-lg sm:text-xl font-semibold text-ink-900">
          {getTranslation(lang, "conservationTitle")}
        </h2>
      </div>

      {/* IUCN Status Meter */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-500">
            {getTranslation(lang, "iucnMeterTitle")}
          </span>
          <span className="text-xs font-extrabold text-accent-ink">
            {getIUCNLabel(species.iucnStatus, lang)} ({species.iucnStatus})
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1 sm:gap-2">
          {IUCN_TIERS.map((tier) => {
            const isActive = tier === species.iucnStatus;
            return (
              <div
                key={tier}
                className={`flex flex-col items-center justify-center rounded-[4px] border p-2 text-center transition-all ${getIucnBadgeColor(
                  tier,
                  isActive
                )}`}
              >
                <span className="text-xs font-black sm:text-sm">{tier}</span>
                <span className="hidden sm:block text-[9px] font-medium leading-tight mt-0.5 opacity-90">
                  {getTranslation(lang, IUCN_SHORT_KEYS[tier])}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Population Trajectory & Decadal History */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center">
        <div className="space-y-2 lg:col-span-5">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-500">
            {getTranslation(lang, "editorialContext")}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-display text-xl sm:text-2xl font-semibold text-ink-900">
              {species.populationEstimate}
            </span>
            <div className={`flex items-center gap-1 rounded-md border border-rule bg-paper-sunken px-2 py-0.5 text-xs font-semibold capitalize ${getTrendTextClass(species.populationTrend)}`}>
              {getTrendIcon(species.populationTrend)}
              <span>{getTrendLabel(species.populationTrend)}</span>
            </div>
          </div>
          {species.historicalContraction && (
            <p className="text-xs text-ink-500 leading-relaxed">
              <span className="font-semibold text-danger">
                {species.historicalContraction.percentageLoss}% {getTranslation(lang, "rangeContractionLabel")}:
              </span>{" "}
              {species.historicalContraction.description[lang] ||
                species.historicalContraction.description.en}
            </p>
          )}
        </div>

        {/* SVG Trajectory Chart */}
        {points.length > 1 && (
          <div className="rounded-md border border-rule bg-paper-sunken p-3 lg:col-span-7">
            <div className="flex items-center justify-between text-[12px] font-bold text-ink-500">
              <span>{getTranslation(lang, "populationTrajectory")}</span>
              <span className="text-accent-ink">
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
                  y1={baselineY}
                  x2={chartWidth - paddingX}
                  y2={baselineY}
                  stroke={rule.strong}
                  strokeWidth="1"
                />

                {/* Area fill under the line */}
                {areaPath && (
                  <polygon
                    points={areaPath}
                    fill={accent.DEFAULT}
                    fillOpacity="0.08"
                    stroke="none"
                  />
                )}

                {/* Polyline */}
                <polyline
                  fill="none"
                  stroke={accent.DEFAULT}
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
                      fill={paper.raised}
                      stroke={accent.DEFAULT}
                      strokeWidth="2"
                    />
                    <text
                      x={p.x}
                      y={p.y - 7}
                      textAnchor="middle"
                      fill={ink[700]}
                      fontSize="9"
                      fontFamily="var(--font-mono)"
                    >
                      {p.estimate.toLocaleString()}
                    </text>
                    <text
                      x={p.x}
                      y={chartHeight - 4}
                      textAnchor="middle"
                      fill={ink[500]}
                      fontSize="9"
                      fontFamily="var(--font-mono)"
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

      {/* Climate context */}
      <div className="rounded-r-md border-l-2 border-accent bg-accent-soft/40 p-4 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-ink">
          <ThermometerSnowflake className="h-4 w-4" />
          <span>{getTranslation(lang, "climateContextTitle")}</span>
        </div>
        <p className="text-xs sm:text-sm text-ink-700 leading-relaxed">
          {species.climateVulnerability[lang] || species.climateVulnerability.en}
        </p>
        <p className="text-[12px] leading-relaxed text-ink-500">
          {getTranslation(lang, "climateDisclaimer")}
        </p>
      </div>

      {/* Key Threats */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-500">
          <AlertTriangle className="h-4 w-4 text-ochre" />
          <span>{getTranslation(lang, "keyThreatsTitle")}</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {species.keyThreats.map((t, idx) => {
            const impactClass =
              t.impact === "high"
                ? "bg-danger-soft text-danger"
                : t.impact === "medium"
                ? "bg-ochre-soft text-ochre"
                : "bg-paper-deep text-ink-700";
            const impactLabel =
              t.impact === "high"
                ? getTranslation(lang, "impactHigh")
                : t.impact === "medium"
                ? getTranslation(lang, "impactMedium")
                : getTranslation(lang, "impactLow");
            return (
              <div
                key={idx}
                className="rounded-md border border-rule bg-paper-sunken p-3 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ink-900">{t.threat}</span>
                  <span
                    className={`rounded-[3px] px-1.5 py-0.5 text-[11px] font-extrabold uppercase ${impactClass}`}
                  >
                    {impactLabel}
                  </span>
                </div>
                <p className="text-xs text-ink-500 leading-relaxed">
                  {t.description[lang] || t.description.en}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Niche, Diet & Conservation Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-md border border-rule bg-paper-sunken p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-500">
            <Utensils className="h-4 w-4 text-accent" />
            <span>{getTranslation(lang, "ecologicalNicheTitle")}</span>
          </div>
          <p className="text-xs text-ink-700 leading-relaxed">
            {species.diet[lang] || species.diet.en}
          </p>
          {species.keystoneRole && (
            <p className="text-xs text-accent-ink font-medium leading-relaxed">
              ★ {species.keystoneRole[lang] || species.keystoneRole.en}
            </p>
          )}
        </div>

        {species.conservationActions && (
          <div className="rounded-md border border-rule bg-paper-sunken p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-500">
              <TreePine className="h-4 w-4 text-accent" />
              <span>{getTranslation(lang, "conservationActionTitle")}</span>
            </div>
            <p className="text-xs text-ink-700 leading-relaxed">
              {species.conservationActions[lang] || species.conservationActions.en}
            </p>
          </div>
        )}
      </div>

      {/* Open Biodiversity Registries: GBIF & iNaturalist */}
      <div className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-ink-500">
          {getTranslation(lang, "registriesTitle")}
        </span>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* GBIF Card */}
          {species.gbifTaxonKey && (
            <div className="rounded-md border border-rule bg-paper-sunken p-4 flex flex-col justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent-ink">
                  <Database className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black uppercase tracking-wider text-accent-ink">
                      {getTranslation(lang, "gbifRegistry")}
                    </span>
                    <span className="specimen-label font-mono">
                      {getTranslation(lang, "taxonNumber")} #{species.gbifTaxonKey}
                    </span>
                  </div>
                  <p className="text-xs text-ink-700 mt-1">
                    {species.gbifOccurrenceCount
                      ? `${species.gbifOccurrenceCount.toLocaleString()} ${getTranslation(lang, "gbifRecords")}`
                      : getTranslation(lang, "gbifExplore")}
                  </p>
                </div>
              </div>

              <a
                href={species.gbifUrl || `https://www.gbif.org/species/${species.gbifTaxonKey}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-accent-line bg-accent-soft px-3 py-1.5 text-xs font-bold text-accent-ink transition-colors hover:bg-accent-soft/70"
              >
                <span>{getTranslation(lang, "gbifCta")}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}

          {/* iNaturalist Card */}
          {species.inaturalistTaxonId && (
            <div className="rounded-md border border-rule bg-paper-sunken p-4 flex flex-col justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-iucn-nt-fill text-iucn-nt-text">
                  <Camera className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black uppercase tracking-wider text-iucn-nt-text">
                      iNaturalist
                    </span>
                    <span className="specimen-label font-mono">
                      {getTranslation(lang, "taxonNumber")} #{species.inaturalistTaxonId}
                    </span>
                  </div>
                  <p className="text-xs text-ink-700 mt-1">
                    {species.inaturalistObservationCount
                      ? `${species.inaturalistObservationCount.toLocaleString()} ${getTranslation(lang, "inatObservations")}`
                      : getTranslation(lang, "inatExplore")}
                  </p>
                </div>
              </div>

              <a
                href={species.inaturalistUrl || `https://www.inaturalist.org/taxa/${species.inaturalistTaxonId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-md border border-iucn-nt-edge bg-iucn-nt-fill px-3 py-1.5 text-xs font-bold text-iucn-nt-text transition-colors hover:bg-iucn-nt-fill/70"
              >
                <span>{getTranslation(lang, "inatCta")}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
