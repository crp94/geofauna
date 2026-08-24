import { Species } from "../../types/species";

/**
 * Shape of a hand-authored catalog entry before the build pipeline attaches
 * the derived `range` (grid mask + provenance + evidence). `rangeConfig` is
 * the legacy hand-typed bounding-box fallback consumed by buildCuratedSpecies.ts
 * when no GBIF-derived mask exists yet for a species.
 */
export type RawSpeciesEntry = Omit<Species, "range"> & {
  rangeConfig: Array<{
    minLon: number;
    maxLon: number;
    minLat: number;
    maxLat: number;
    includeOcean?: boolean;
    filterPolygon?: (lon: number, lat: number) => boolean;
  }>;
};
