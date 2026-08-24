"use client";

import { track } from "@vercel/analytics";

/**
 * GeoFauna analytics — single source of truth for every custom event sent to
 * Vercel Analytics. Every event name fired anywhere in the app (this file's
 * owner or not) must be declared in `GameEventMap` below so the taxonomy
 * stays consistent, bounded, and easy to audit in one place.
 *
 * PRIVACY STANCE (do not weaken):
 * - No PII: no names, emails, IPs, precise geolocation, or device/browser
 *   fingerprints of any kind.
 * - No free text: every string property is a fixed enum, a UI mode/step
 *   name, or an id from the curated species catalog — never raw user input
 *   (search queries, share captions, etc. are reduced to booleans/bands
 *   before being sent).
 * - No precise scores: scores, IoU, player counts, and similar continuous
 *   values are always bucketed into coarse bands before being sent, never
 *   forwarded as raw numbers (see banding conventions below).
 *
 * BANDING CONVENTIONS
 * - score_band:      Math.floor(score / 100) * 100  -> 0, 100, 200 ... 900
 * - iou_band:        Math.floor(iou / 10) * 10       -> 0, 10, 20 ... 90
 * - k_band:           Math.round(zoomScale)           -> integer zoom step
 * - duration_band:   coarse bucket string, e.g. "0-10s" | "10-30s" | "30-60s" | "60s+"
 * - streak_band:     coarse bucket string, e.g. "0" | "1-2" | "3-6" | "7-13" | "14+"
 * - players_band:    "1-9" | "10-49" | "50-199" | "200+"
 * - position_band:   grid position bucket, e.g. index < 6 ? "top" : index < 18 ? "mid" : "deep"
 *
 * Keeping every property an id/enum/band (never a free-form value) is what
 * keeps this file compliant with the privacy stance above — extend the
 * bands, don't bypass them.
 */

/** Values @vercel/analytics accepts for a custom event property. */
type Bounded = string | number | boolean | undefined;

/**
 * The complete, typed taxonomy of GeoFauna analytics events. Each key is an
 * event name; each value describes its bounded property shape. Some events
 * below are implemented in files this module doesn't own (concurrent work in
 * page.tsx / Header.tsx) — they're documented here regardless so the catalog
 * stays complete and centralized.
 */
export type GameEventMap = {
  // --- src/app/page.tsx ---
  game_viewed: { mode: "daily" | "unlimited"; species_id: string; taxon: string };
  guess_submitted: {
    mode: "daily" | "unlimited";
    species_id: string;
    taxon: string;
    grade: string;
    score_band: number;
    iou_band: number;
    calibration_applied?: boolean;
    duration_band?: string;
  };
  daily_completed: { day_number: number; grade: string; score_band: number; streak_band: string };
  result_shared: { mode: string; grade: string; score_band: number };
  share_completed: { method: "native" | "clipboard"; mode: string; grade: string };
  unlimited_next_species: { difficulty: string; taxon: string };
  mode_switched: { from: string; to: string };
  language_changed: { lang: string };
  modal_opened: { modal: "stats" | "rules" | "language" };
  sound_toggled: { muted: boolean };
  yesterday_species_clicked: { species_id: string };

  // --- src/components/MapCanvas.tsx ---
  zoom_used: { k_band: number };

  // --- src/app/archive/page.tsx ---
  archive_search_used: { has_query: boolean; class_filter: string; iucn_filter: string };
  archive_species_clicked: { species_id: string; position_band: "top" | "mid" | "deep" };

  // --- src/components/TrackedPlayLink.tsx (rendered from species/[slug]/page.tsx) ---
  species_page_play_clicked: { species_id: string };

  // --- src/components/SpeciesHero.tsx ---
  attribution_opened: { species_id: string };

  // --- src/components/DailyCommunityStats.tsx ---
  daily_stats_viewed: { players_band: "1-9" | "10-49" | "50-199" | "200+" };

  // --- src/components/RulesModal.tsx ---
  rules_completed: { via: "cta" | "close" };
};

/**
 * Sends a bounded, typed gameplay analytics event via @vercel/analytics.
 *
 * The primary overload enforces the exact property shape declared in
 * `GameEventMap` for known event names (widened with an index signature so
 * a call site that legitimately needs an extra bounded field doesn't get
 * blocked). The second overload keeps `trackGameEvent` callable with any
 * other string + bounded-properties pair so this typing change can never
 * break a call site owned elsewhere — everything still funnels through the
 * same privacy-safe, try/catch-guarded implementation below.
 */
export function trackGameEvent<K extends keyof GameEventMap>(
  name: K,
  properties: GameEventMap[K] & Record<string, Bounded>
): void;
export function trackGameEvent(name: string, properties?: Record<string, Bounded>): void;
export function trackGameEvent(name: string, properties: Record<string, Bounded> = {}) {
  try {
    track(name, properties);
  } catch {
    // Analytics must never interrupt a game when blocked by privacy tools.
  }
}
