import fs from "fs";
import path from "path";
import * as topojson from "topojson-client";
import { geoContains } from "d3-geo";
import { Species } from "../types/species";
import {
  GRID_WIDTH,
  GRID_HEIGHT,
  TOTAL_CELLS,
  encodeRle,
  gridToLonLat,
  getCellAreaKm2,
  lonLatToGrid,
} from "../lib/maskCompression";
import { allScholarlySpecies } from "./fullSpeciesData";

// Load world-atlas TopoJSON
const countriesTopoPath = path.resolve(__dirname, "../../node_modules/world-atlas/countries-110m.json");
const countriesTopo = JSON.parse(fs.readFileSync(countriesTopoPath, "utf-8"));
const landFeature = topojson.feature(countriesTopo, countriesTopo.objects.land as any) as any;
const countriesFeature = topojson.feature(countriesTopo, countriesTopo.objects.countries as any) as any;

console.log("Generating 360x180 Land/Ocean mask from Natural Earth with BBox acceleration...");
const landMask = new Uint8Array(TOTAL_CELLS);

const features = countriesFeature.features || [landFeature];
for (const feat of features) {
  let minLon = 180, maxLon = -180, minLat = 90, maxLat = -90;
  
  const scanCoords = (coords: any) => {
    if (typeof coords[0] === "number" && typeof coords[1] === "number") {
      minLon = Math.min(minLon, coords[0]);
      maxLon = Math.max(maxLon, coords[0]);
      minLat = Math.min(minLat, coords[1]);
      maxLat = Math.max(maxLat, coords[1]);
    } else if (Array.isArray(coords)) {
      coords.forEach(scanCoords);
    }
  };
  scanCoords(feat.geometry.coordinates);

  const [minX, maxY] = lonLatToGrid(minLon, minLat);
  const [maxX, minY] = lonLatToGrid(maxLon, maxLat);

  const xStart = Math.min(minX, maxX);
  const xEnd = Math.max(minX, maxX);
  const yStart = Math.min(minY, maxY);
  const yEnd = Math.max(minY, maxY);

  for (let y = yStart; y <= yEnd; y++) {
    for (let x = xStart; x <= xEnd; x++) {
      const idx = y * GRID_WIDTH + x;
      if (landMask[idx] === 1) continue;

      const [lon, lat] = gridToLonLat(x, y);
      if (geoContains(feat, [lon, lat])) {
        landMask[idx] = 1;
      }
    }
  }
}

const landMaskRle = encodeRle(landMask);
console.log(`Land mask generated: ${landMask.reduce((a, b) => a + b, 0)} land cells out of ${TOTAL_CELLS} total cells.`);

function createRangeMask(
  regions: Array<{
    minLon: number;
    maxLon: number;
    minLat: number;
    maxLat: number;
    includeOcean?: boolean;
    filterPolygon?: (lon: number, lat: number) => boolean;
  }>
): { rle: string; areaKm2: number; bounds: [number, number, number, number] } {
  const mask = new Uint8Array(TOTAL_CELLS);
  let totalArea = 0;
  let minLon = 180,
    maxLon = -180,
    minLat = 90,
    maxLat = -90;

  for (const reg of regions) {
    const [minX, maxY] = lonLatToGrid(reg.minLon, reg.minLat);
    const [maxX, minY] = lonLatToGrid(reg.maxLon, reg.maxLat);

    const xStart = Math.min(minX, maxX);
    const xEnd = Math.max(minX, maxX);
    const yStart = Math.min(minY, maxY);
    const yEnd = Math.max(minY, maxY);

    for (let y = yStart; y <= yEnd; y++) {
      const cellArea = getCellAreaKm2(y);
      for (let x = xStart; x <= xEnd; x++) {
        const idx = y * GRID_WIDTH + x;
        const [lon, lat] = gridToLonLat(x, y);

        if (!reg.includeOcean && landMask[idx] === 0) {
          continue;
        }

        if (reg.filterPolygon && !reg.filterPolygon(lon, lat)) {
          continue;
        }

        if (mask[idx] === 0) {
          mask[idx] = 1;
          totalArea += cellArea;
          minLon = Math.min(minLon, lon);
          maxLon = Math.max(maxLon, lon);
          minLat = Math.min(minLat, lat);
          maxLat = Math.max(maxLat, lat);
        }
      }
    }
  }

  return {
    rle: encodeRle(mask),
    areaKm2: Math.round(totalArea),
    bounds: [
      minLon === 180 ? -180 : minLon,
      minLat === 90 ? -90 : minLat,
      maxLon === -180 ? 180 : maxLon,
      maxLat === -90 ? 90 : maxLat,
    ],
  };
}

const outputDir = path.resolve(__dirname, "../data");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Load GBIF enrichment cache if available
const gbifEnrichmentPath = path.join(outputDir, "gbif-enrichment.json");
const gbifMap: Record<string, { taxonKey: number; occurrenceCount?: number; url?: string }> = fs.existsSync(gbifEnrichmentPath)
  ? JSON.parse(fs.readFileSync(gbifEnrichmentPath, "utf-8"))
  : {};

// Compile and save all 62 scholarly species
console.log(`Compiling ${allScholarlySpecies.length} curated species entries with GBIF validation...`);
const finalSpeciesList: Species[] = allScholarlySpecies.map((s) => {
  const { rangeConfig, ...rest } = s;
  const { rle, areaKm2, bounds } = createRangeMask(rangeConfig);
  const gbifInfo = gbifMap[s.id];

  return {
    ...rest,
    gbifTaxonKey: gbifInfo?.taxonKey,
    gbifOccurrenceCount: gbifInfo?.occurrenceCount,
    gbifUrl: gbifInfo?.url || (gbifInfo?.taxonKey ? `https://www.gbif.org/species/${gbifInfo.taxonKey}` : undefined),
    range: {
      bounds,
      gridDimensions: [GRID_WIDTH, GRID_HEIGHT],
      rleMask: rle,
      areaApproxKm2: areaKm2,
      nativeContinents: [],
      nativeBiomes: [],
    },
  };
});

// Write curated-species.json
const speciesOutputPath = path.join(outputDir, "curated-species.json");
fs.writeFileSync(speciesOutputPath, JSON.stringify(finalSpeciesList, null, 2), "utf-8");
console.log(`Successfully wrote ${finalSpeciesList.length} species to ${speciesOutputPath}`);

// Write land-mask.json
const landMaskOutputPath = path.join(outputDir, "land-mask.json");
fs.writeFileSync(landMaskOutputPath, JSON.stringify({ rle: landMaskRle }), "utf-8");
console.log(`Successfully wrote land mask to ${landMaskOutputPath}`);

// Write world-110m.json
const worldOutputPath = path.join(outputDir, "world-110m.json");
fs.writeFileSync(worldOutputPath, JSON.stringify(countriesTopo), "utf-8");
console.log(`Successfully copied TopoJSON world to ${worldOutputPath}`);
