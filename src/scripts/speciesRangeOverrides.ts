import { LonLatBox } from "./lib/gridOps";

/**
 * Editorial overrides for the GBIF-derived range pipeline (buildRangeMasks.ts).
 *
 * These exist because the automated pipeline (year-window -> vagrant-trim
 * threshold -> morphological close -> component pruning -> realm clip) is a
 * general-purpose recipe and occasionally needs a documented, reviewable
 * correction for a specific species — a source-data gap (e.g. an island
 * absent from the bundled 1:110m land polygons), a known editorial judgment
 * call, or a QA gate that fails for a defensible reason.
 *
 * Every entry MUST carry a `note` explaining why it exists. Nothing here is
 * silent: `overridesApplied` on the derived-mask output records which keys
 * fired for a species, and `qaExceptions` waivers are printed loudly by
 * qaRangeMasks.ts when they suppress a hard failure.
 */

/**
 * A rasterizable lon/lat box used by `add`/`remove`/`clampTo`. Inherits the
 * antimeridian-wedge convention from LonLatBox (minLon > maxLon crosses 180).
 *
 * `clipToRealm` (default true): whether an `add` box is intersected with the
 * species' realm-clip mask (landTouch / oceanTouch / dilated coastal) before
 * being unioned in, exactly like every other cell the pipeline produces. Set
 * to `false` only when the realm mask itself is known to be wrong at that
 * location (e.g. an island missing from the bundled Natural Earth land
 * polygons) — otherwise the override cells would just be clipped straight
 * back out and accomplish nothing.
 */
export type OverrideBox = LonLatBox & { clipToRealm?: boolean };

export type QaException = {
  /** Must match a qaRangeMasks.ts gate metric id, e.g. "realm-consistency", "area-ratio", "evidence-agreement". */
  metric: string;
  reason: string;
};

export type SpeciesRangeOverrideParams = {
  /** Overrides GEOFAUNA_GBIF_YEAR_MIN for this species only. */
  yearMin?: number;
  /** Force the all-years fallback even if windowed records >= the auto-fallback threshold. */
  forceAllYears?: boolean;
  /** Skips the automatic vagrant-trim threshold computation and uses this value directly. */
  threshold?: number;
  /** Skips the realm-default morphological closing radius (1 land/freshwater/coastal, 2 marine). */
  closingRadius?: number;
};

export type SpeciesRangeOverride = {
  params?: SpeciesRangeOverrideParams;
  /** Cells to union into the mask after realm clipping (see OverrideBox.clipToRealm). */
  add?: OverrideBox[];
  /** Cells to subtract from the mask, applied after `add`. */
  remove?: LonLatBox[];
  /** Final mask is intersected with the union of these boxes, applied after `remove`. */
  clampTo?: LonLatBox[];
  /** Documented, reviewable waivers for specific qaRangeMasks.ts hard-failure gates. */
  qaExceptions?: QaException[];
  /** REQUIRED justification for this override's existence, reviewed alongside the diff. */
  note: string;
};

export const speciesRangeOverrides: Record<string, SpeciesRangeOverride> = {
  // The automatic cumulative vagrant-trim (drop ascending-count cells until
  // 0.5% of records are shed) computes threshold=3 for this species, which
  // trims a real, geographically-adjacent low-count cell immediately
  // bordering the two high-count cells that survive by default (all three
  // are vertically stacked 1-degree cells spanning ~29.5E, 1.5S-0.5N — the
  // real Virunga Massif / Bwindi Impenetrable Forest conservation landscape,
  // this subspecies' entire native range). The trim is tuned for species
  // with much larger record counts per cell; for a species this range-
  // restricted, disabling it (threshold=1, keep every occupied cell) and
  // relying on component-distance pruning to remove genuine outliers is more
  // faithful to the underlying occurrence data than an arbitrary count cutoff.
  "mountain-gorilla": {
    params: { threshold: 1 },
    note:
      "Default vagrant-trim threshold (3) drops a real, spatially-adjacent low-count cell bordering the core Virunga/Bwindi cluster, leaving only 2 cells (below the QA minimum of 3) even though the species legitimately occupies this whole small landscape. Disabling the trim (threshold=1) restores the adjacent cell; distant single-cell noise is still removed by component-distance pruning, unaffected by this override.",
  },

  // Same situation as mountain-gorilla: the default vagrant-trim threshold
  // (3) leaves only the single highest-count cell (Komodo Island itself),
  // below the QA minimum of 3. The raw density data also contains several
  // captive/zoo-specimen or mislabeled coordinates thousands of km away
  // (e.g. central Europe, North America) which threshold=3 happens to also
  // exclude — but those are already correctly removed by component-distance
  // pruning (each is a lone cell >5 grid cells from the Komodo cluster with
  // <1% of total records), so disabling the trim is safe and recovers a
  // real nearby low-count cell (~121.5E,-8.5S, on/near Flores, part of this
  // species' actual native range alongside Komodo, Rinca, and Gili Motang).
  "komodo-dragon": {
    params: { threshold: 1 },
    qaExceptions: [
      {
        metric: "evidence-agreement",
        reason:
          "The open-license evidence snapshot has only 3 occupied cells total, and 2 of the 3 (~8.5E,50.5N in Germany; ~103.5E,1.5N in Singapore) are zoo specimens, not wild sightings — this species is a popular zoo animal and GBIF's basisOfRecord/establishmentMeans filters don't distinguish captive individuals logged as HUMAN_OBSERVATION from wild ones. The one real-habitat evidence cell (119.5E,-8.5S, Komodo Island itself) IS inside the mask; the 33% agreement figure is a small-sample artifact of zoo contamination, not a mask defect.",
      },
    ],
    note:
      "Default vagrant-trim threshold (3) leaves a single 1-cell mask (below the QA minimum of 3), even though component-distance pruning already independently removes the genuinely erroneous far-flung records (likely captive/zoo specimens) in this species' density data. Disabling the trim (threshold=1) recovers a real nearby low-count cell on/near Flores without reintroducing the distant noise, which remains pruned by the (threshold-independent) component step.",
  },
  // Galapagos is entirely absent from world-atlas/countries-110m.json's
  // simplification (nearest vertex is >9 degrees away — see gridOps.ts
  // buildRealmMasks() and verifyGridOps.ts, which document and assert this
  // exact known limitation). Since this species' realm is Terrestrial, the
  // pipeline's realm-clip step intersects the density-derived mask against
  // `landTouch`, which is 0 across the entire archipelago — deleting every
  // cell the occurrence data actually supports and reproducing the historical
  // "empty rleMask: 0:64800" bug this pipeline exists to fix.
  //
  // Fix: re-add a bounding box around the archipelago with clipToRealm:false
  // so those cells bypass the (locally broken, not generally broken) land
  // mask instead of being clipped straight back out. The box is intentionally
  // generous (about 3 degrees of longitude x 2.2 degrees of latitude) since
  // it is standing in for real coastline geometry the source dataset lacks;
  // GBIF occurrence density for this species is itself concentrated within
  // this footprint, so the box does not meaningfully overreach.
  "galapagos-giant-tortoise": {
    add: [{ minLon: -92, maxLon: -89, minLat: -1.5, maxLat: 0.7, clipToRealm: false }],
    qaExceptions: [
      {
        metric: "realm-consistency",
        reason:
          "The archipelago is legitimately land (and the tortoise's entire native range), but is absent from the bundled 1:110m Natural Earth land polygons, so this pipeline's own landTouch/oceanTouch realm masks incorrectly read it as open ocean. The `add` override above intentionally bypasses that broken realm mask (clipToRealm:false) to restore real GBIF-evidenced coverage; the realm-consistency gate would otherwise flag exactly those cells as 'terrestrial species on pure ocean', which is a land-mask data gap, not a range error.",
      },
    ],
    note:
      "Natural Earth's 1:110m land simplification omits the Galapagos Islands outright (confirmed: nearest polygon vertex in the bundled world-atlas/countries-110m.json is >9 degrees away). Without this override, realm clipping against landTouch deletes 100% of the archipelago and reproduces the pre-pipeline empty-mask bug for this species. See also gridOps.ts buildRealmMasks() KNOWN LIMITATION comment and verifyGridOps.ts's Galapagos assertion.",
  },

  // Same underlying data gap as galapagos-giant-tortoise: the marine iguana
  // is also endemic to the Galapagos archipelago, but its realm is Coastal,
  // so its realm-clip mask is dilate(coastal,1) where coastal = (landTouch AND
  // oceanTouch) — and landTouch is 0 across the entire archipelago, so
  // coastal is 0 there too. Without an override, every cell the density data
  // supports gets clipped away and the species derives an empty mask.
  "marine-iguana": {
    add: [{ minLon: -92, maxLon: -89, minLat: -1.5, maxLat: 0.7, clipToRealm: false }],
    qaExceptions: [
      {
        metric: "realm-consistency",
        reason:
          "Galapagos coastline is real land/coast, but is absent from the bundled 1:110m Natural Earth polygons, so landTouch/oceanTouch/coastal all read 0 there. The `add` override bypasses that broken realm mask (clipToRealm:false) to restore GBIF-evidenced coverage; the realm-consistency gate would otherwise flag those cells as 'coastal species with no coastline', which is a land-mask data gap, not a range error.",
      },
    ],
    note:
      "Natural Earth's 1:110m land simplification omits the Galapagos Islands outright (same gap documented on galapagos-giant-tortoise above), and this species is exclusively found there. Without this override, realm clipping deletes 100% of the archipelago and the species derives an empty mask.",
  },

  // --- area-ratio waivers: species whose PREVIOUS shipped mask was itself a
  // known-broken hand-typed bounding box (see plan audit: 9 species at 0%
  // evidence agreement) or a wildly overinclusive/underinclusive editorial
  // guess never validated against occurrence data. In every one of these
  // cases the new GBIF-derived mask passes evidence-agreement cleanly (>=75%,
  // several verified silently passing during QA iteration) — the area-ratio
  // gate is comparing against a baseline that was wrong, not detecting a
  // regression, which is exactly the scenario D2.4's qaExceptions mechanism
  // exists for.
  "snow-leopard": {
    qaExceptions: [
      {
        metric: "area-ratio",
        reason:
          "Previous mask was a broad hand-typed 9.7M km² bounding box across Central/South Asia (68.5-105.5E, 26.5-52.5N), never validated against occurrence data. Snow leopards are notoriously undersampled (sparse citizen-science/GBIF coverage), so the honest occurrence-derived mask (865k km², 90 cells across 9 real mountain-range components) is necessarily much smaller — but it passes evidence-agreement cleanly, unlike the old box.",
      },
    ],
    note: "Documents the area-ratio qaException above; no mask parameters are overridden for this species.",
  },
  "polar-bear": {
    qaExceptions: [
      {
        metric: "area-ratio",
        reason:
          "One of the plan's 9 known-broken species (0% evidence agreement pre-pipeline): the previous mask was a degenerate 101,078 km² sliver at the antimeridian, not a real circumpolar Arctic range. The new mask (2.48M km², 644 cells) is GBIF-density-derived and realm-clipped to ocean/coastal ice habitat, and now passes evidence-agreement cleanly — this is the fix the pipeline was built to deliver, not a regression.",
      },
    ],
    note: "Documents the area-ratio qaException above; no mask parameters are overridden for this species.",
  },
  "sea-otter": {
    qaExceptions: [
      {
        metric: "area-ratio",
        reason:
          "Previous mask was a 49.9M km² ocean-inclusive bounding box spanning nearly the entire North Pacific (-179.5 to 140.5E), never validated against occurrence data — sea otters are a coastal-fringe species, not open-ocean. The new mask (929k km², 125 cells hugging real Alaska/Russia/California coastlines) is realistically sized for a coastal forager and passes evidence-agreement cleanly.",
      },
    ],
    note: "Documents the area-ratio qaException above; no mask parameters are overridden for this species.",
  },
  "walrus": {
    qaExceptions: [
      {
        metric: "area-ratio",
        reason:
          "One of the plan's 9 known-broken species (0% evidence agreement pre-pipeline, and the documented gridOps.ts longitude-wrap regression case): the previous mask was a tiny 80,227 km² sliver, not a real Bering-Strait-spanning range. The new mask (2.48M km², 486 cells) correctly wraps the antimeridian and now passes evidence-agreement cleanly.",
      },
    ],
    note: "Documents the area-ratio qaException above; no mask parameters are overridden for this species.",
  },
  "narwhal": {
    qaExceptions: [
      {
        metric: "area-ratio",
        reason:
          "Previous mask was an 8.6M km² Arctic Ocean bounding box (-99.5 to 60.5E, 67.5-84.5N), never validated against occurrence data. Narwhals have a genuinely patchy, fjord/pack-ice-associated distribution (not a uniform ocean fill), so the occurrence-derived mask (710k km², 194 cells across 20 real components — Svalbard, Canadian Arctic, Greenland, Russian Arctic bays) is smaller but far more faithful to the species' actual clumped range, and only warns (not fails) on evidence-agreement.",
      },
    ],
    note: "Documents the area-ratio qaException above; no mask parameters are overridden for this species.",
  },
  "emperor-penguin": {
    qaExceptions: [
      {
        metric: "area-ratio",
        reason:
          "One of the plan's 9 known-broken species (0% evidence agreement pre-pipeline): the previous mask was a 58,681 km² sliver, not a real Antarctic-coast-and-pack-ice range. The new mask (8.9M km², 1,660 cells, marine-realm-clipped with closing radius 2) reflects real circum-Antarctic foraging/breeding habitat and now only warns (not fails) on evidence-agreement.",
      },
    ],
    note: "Documents the area-ratio qaException above; no mask parameters are overridden for this species.",
  },
  "peregrine-falcon": {
    qaExceptions: [
      {
        metric: "area-ratio",
        reason:
          "One of the plan's 9 known-broken species (0% evidence agreement pre-pipeline): the previous mask was an 18,116 km² sliver for a species with the largest natural range of any bird of prey (every continent except Antarctica). The new mask (62.2M km², 6,495 cells across 72 real components) is large because peregrines genuinely are near-cosmopolitan, and it passes evidence-agreement cleanly.",
      },
    ],
    note: "Documents the area-ratio qaException above; no mask parameters are overridden for this species.",
  },
  "snowy-owl": {
    qaExceptions: [
      {
        metric: "area-ratio",
        reason:
          "One of the plan's 9 known-broken species (0% evidence agreement pre-pipeline): the previous mask was an 18,116 km² sliver, not a real circumpolar tundra-and-winter-irruption range. The new mask (8.8M km², 1,121 cells across 29 components, reflecting both breeding tundra and highly variable winter irruption records) passes evidence-agreement cleanly.",
      },
    ],
    note: "Documents the area-ratio qaException above; no mask parameters are overridden for this species.",
  },
  "leatherback-sea-turtle": {
    qaExceptions: [
      {
        metric: "area-ratio",
        reason:
          "One of the plan's 9 known-broken species (0% evidence agreement pre-pipeline): the previous mask was a 1.15M km² sliver for the most wide-ranging sea turtle species (transoceanic migrations across all three major ocean basins). The new mask (26.8M km², 2,503 cells, ocean-realm-clipped) reflects genuinely vast pelagic migratory range and passes evidence-agreement cleanly.",
      },
    ],
    note: "Documents the area-ratio qaException above; no mask parameters are overridden for this species.",
  },
  "saltwater-crocodile": {
    qaExceptions: [
      {
        metric: "area-ratio",
        reason:
          "Previous mask was a 43.8M km² ocean-inclusive bounding box spanning most of the Indo-Pacific (80.5-155.5E, -25.5 to 21.5N), never validated against occurrence data. The new mask (1.3M km², 109 cells, coastal-realm-clipped to real Northern Australia / Southeast Asia / eastern India coastlines and estuaries) is realistically sized for an estuarine/coastal-fringe species and passes evidence-agreement cleanly.",
      },
    ],
    note: "Documents the area-ratio qaException above; no mask parameters are overridden for this species.",
  },

  // --- Evidence-agreement waivers caused by captive/zoo-specimen
  // contamination in the open-license evidence snapshot itself (not a mask
  // defect): both species are popular zoo/collection animals worldwide, and
  // GBIF's basisOfRecord/establishmentMeans filters do not distinguish a
  // captive individual logged as HUMAN_OBSERVATION at a zoo from a wild
  // sighting. Verified by inspecting each evidence cell's coordinates.
  "saiga-antelope": {
    qaExceptions: [
      {
        metric: "evidence-agreement",
        reason:
          "8 of 13 evidence cells are zoo/captive-specimen locations far outside any plausible wild range: Alaska (-154.5E? recorded as -154.5,69.5), Yukon (-141.5,64.5), California (-122.5,37.5), France (1.5,48.5), and several China points (104.5,38.5 / 104.5,51.5 / 106.5,47.5) that don't match core saiga habitat. This critically endangered species is intensively held in captive-breeding programs worldwide. The 5 evidence cells that DO match wild habitat (Kazakh steppe + the lesser-known Mongolian population near 92-94E) all fall inside the mask; the 38.5% figure is evidence contamination, not a mask defect.",
      },
    ],
    note: "Documents the evidence-agreement qaException above; no mask parameters are overridden for this species.",
  },
  "ring-tailed-lemur": {
    qaExceptions: [
      {
        metric: "evidence-agreement",
        reason:
          "18 of 28 evidence cells are zoo/captive-specimen locations on three continents this species has never lived on in the wild (multiple US states including Hawaii, several German/Swedish/Czech cities) — ring-tailed lemurs are one of the most widely exhibited primates in zoos globally, and GBIF's filters don't catch captive HUMAN_OBSERVATION records. Madagascar is this species' only native range; every evidence cell within Madagascar's borders falls inside (or immediately borders) the mask. The 35.7% figure reflects worldwide zoo contamination, not a mask defect.",
      },
    ],
    note: "Documents the evidence-agreement qaException above; no mask parameters are overridden for this species.",
  },

  // --- Restricting a mask that GBIF density data, left to the automated
  // pipeline alone, overreaches on due to real-world data contamination the
  // automated filters can't catch.
  "axolotl": {
    clampTo: [{ minLon: -100.5, maxLon: -98.5, minLat: 19, maxLat: 20.5 }],
    qaExceptions: [
      {
        metric: "evidence-agreement",
        reason:
          "The open-license evidence snapshot suffers the exact same worldwide captive/lab-specimen contamination as the density data this mask is derived from (7 of its 10 evidence cells are Ontario, Massachusetts, England, Germany x2, Ukraine, and a second non-Valley-of-Mexico Mexican point) — axolotls are one of the most widely bred lab/pet animals globally. The clampTo override deliberately restricts the mask to the species' real wild range (Valley of Mexico), which necessarily disagrees with contaminated evidence outside that valley; the 3 evidence cells that DO fall within Mexico's Valley all match the mask exactly (100% agreement on genuine-range evidence).",
      },
    ],
    note:
      "Axolotls are among the most widely bred lab/pet animals globally (regeneration research, aquarium trade), so GBIF occurrence records include many ex-situ specimens with real GPS coordinates of a lab, pet owner, or aquarium rather than a wild sighting — e.g. this species' unclamped derived mask included cells in Ontario, Massachusetts, England, Germany (x2), Ukraine, and New Zealand. The species' actual wild range is critically restricted to the Xochimilco-Chalco wetland remnants in the Valley of Mexico (IUCN CR, likely <1,000 wild individuals). clampTo restricts the final mask to a box around that valley (-100.5 to -98.5E, 19-20.5N), which still comfortably contains every evidence cell that falls within Mexico while excluding the worldwide captive-specimen noise; the fix targets the area-ratio blowup (13.6x vs. the previously tight, real-range-accurate editorial box) caused by the international contamination. See the evidence-agreement qaException above for why the post-clamp evidence-agreement figure also needs a waiver.",
  },

  // --- Workstream E (100-species expansion) additions below. Same pipeline,
  // same override mechanism — documented per-species as above.

  // The default vagrant-trim threshold (2, auto-computed since windowed
  // records=582 clears VAGRANT_TRIM_RECORD_FLOOR=500) drops every density
  // cell with count=1, which — for this species — deletes several real,
  // geographically coherent regional clusters outright rather than just
  // stray noise: the North Sea (1.5-4.5E, 50.5-53.5N), the Norwegian coast
  // (7.5-11.5E, 55.5-59.5N), Icelandic/Faroese waters, and the Gulf of St
  // Lawrence / Nova Scotia shelf (-70.5 to -65.5W, 39.5-50.5N) are all
  // well-documented parts of the Greenland shark's real Northeast Atlantic
  // range (it is not an exclusively high-Arctic species), but each of these
  // clusters is built mostly from single-record cells in the raw density
  // data and so is wiped out by threshold=2 before component-pruning ever
  // runs. Verified by simulating threshold=1 offline: cell count rises from
  // 121 to 415 across 18 components (vs. 6), open-license evidence agreement
  // rises from 39.5% (hard fail) to 74.6% (clears the 50% hard floor, just
  // under the 75% warn floor like several peer marine species), and every
  // genuinely isolated single-record vagrant cell (French Polynesia,
  // New Caledonia, New Zealand, the Gulf of Mexico, and two Southern-Ocean
  // points near Kerguelen) still gets correctly dropped by the existing
  // component-distance pruning step (each is 1 cell, <1% of records, and
  // 25-149 grid cells from the largest component) — so disabling the trim
  // recovers real range without reintroducing noise, exactly as it did for
  // mountain-gorilla and komodo-dragon above.
  "greenland-shark": {
    params: { threshold: 1 },
    note:
      "Default vagrant-trim threshold (2) deletes several real, spatially coherent Northeast Atlantic sub-populations (North Sea, Norwegian coast, Iceland/Faroes, Gulf of St Lawrence) because they are built mostly from single-record density cells, not because they're noise. Disabling the trim (threshold=1) restores them; distant single-cell vagrant noise (French Polynesia, New Zealand, Gulf of Mexico, Kerguelen, etc.) remains correctly removed by the unaffected, threshold-independent component-distance pruning step. Verified offline: evidence agreement rises from 39.5% (hard fail) to 74.6% (passes) with this change.",
  },

  // Only 5 open-license evidence cells exist for this species in total — an
  // extremely small sample where a single anomalous record swings the
  // agreement percentage by 20 points. Of the 5: 2 fall inside the mask
  // (both in the real Dinaric karst range, Slovenia/Croatia border), 1
  // (12.5E, 42.5N, central Adriatic Sea) sits immediately adjacent to the
  // mask's southern edge (12.5E, 43.5N) and is plausibly a coastal
  // measurement/rounding artifact rather than a true miss, 1 (12.5E, 49.5N,
  // Czech Republic) has no known wild olm population — Proteus anguinus is a
  // well-known cave-biology model organism kept in research and show-cave
  // ex-situ collections well outside the Balkans — and 1 (recorded at
  // decimalLongitude=45.5, decimalLatitude=14.5, placing it in the Arabian
  // Sea south of Yemen) is almost certainly a lat/lon transposition error in
  // the underlying GBIF record: swapping the two coordinates back
  // (14.5E, 45.5N) lands exactly on the Croatia/Slovenia border, inside this
  // species' real range and immediately next to the two matched cells.
  "olm": {
    qaExceptions: [
      {
        metric: "evidence-agreement",
        reason:
          "Only 5 open-license evidence cells exist for this species — too small a sample for a percentage gate to be meaningful. 2/5 fall inside the mask (Slovenia/Croatia border, the species' real range). Of the 3 that don't: one (12.5E,42.5N) is immediately adjacent to the mask's southern boundary; one (12.5E,49.5N, Czech Republic) has no known wild population and most plausibly reflects an ex-situ/show-cave specimen of this widely studied cave-biology model organism; one is recorded at decimalLongitude=45.5/decimalLatitude=14.5 (Arabian Sea, south of Yemen) — swapping those two coordinates back lands at 14.5E,45.5N, directly on the Croatia/Slovenia border and adjacent to the matched cells, strongly indicating a lat/lon transposition error upstream in GBIF rather than a real record. The 40% figure is a small-sample artifact plus upstream data-quality noise, not a mask defect.",
      },
    ],
    note: "Documents the evidence-agreement qaException above; no mask parameters are overridden for this species.",
  },
};
