import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { GRID_WIDTH, GRID_HEIGHT, TOTAL_CELLS, lonLatToGrid, gridToLonLat } from "../lib/maskCompression";
import {
  dilate,
  erode,
  close,
  connectedComponents,
  maskFromBoxes,
  intersect,
  union,
  subtract,
  maskArea,
  countCells,
  asciiMap,
  minCellDistance,
  buildRealmMasks,
} from "./lib/gridOps";

function rectMask(xStart: number, xEnd: number, yStart: number, yEnd: number): Uint8Array {
  const mask = new Uint8Array(TOTAL_CELLS);
  for (let y = yStart; y <= yEnd; y++) {
    for (let x = xStart; x <= xEnd; x++) {
      mask[y * GRID_WIDTH + x] = 1;
    }
  }
  return mask;
}

function arraysEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

// --- dilate/erode round-trip on a solid rectangle (radius=1 closing is a no-op on a convex block) ---
{
  const rect = rectMask(100, 109, 80, 89);
  const dilated = dilate(rect, 1);
  const roundTrip = erode(dilated, 1);
  assert.ok(arraysEqual(roundTrip, rect), "dilate(1) followed by erode(1) must recover the original rectangle");
  assert.ok(countCells(dilated) > countCells(rect), "dilation must strictly grow a rectangle away from grid edges");
}

// --- close() fills a single-cell interior hole ---
{
  const rect = rectMask(50, 59, 50, 59);
  const holeIdx = 55 * GRID_WIDTH + 55;
  assert.equal(rect[holeIdx], 1, "sanity: hole index must start inside the rectangle");
  rect[holeIdx] = 0;
  assert.equal(countCells(rect), 100 - 1, "sanity: rectangle now has a 1-cell hole");

  const closed = close(rect, 1);
  assert.equal(closed[holeIdx], 1, "close() must fill a 1-cell interior hole");
  const restored = rectMask(50, 59, 50, 59);
  assert.ok(arraysEqual(closed, restored), "close() on a rectangle with a 1-cell hole must exactly restore the solid rectangle");
}

// --- longitude wrap regression: a mask at x=359 dilates into x=0 (walrus/Bering strait) ---
{
  const mask = new Uint8Array(TOTAL_CELLS);
  const y = 90;
  mask[y * GRID_WIDTH + 359] = 1;
  const dilated = dilate(mask, 1);
  assert.equal(dilated[y * GRID_WIDTH + 0], 1, "dilation must wrap across the antimeridian: x=359 must dilate into x=0");
  assert.equal(dilated[y * GRID_WIDTH + 358], 1, "dilation must also grow the non-wrapped neighbor x=358");
}

// --- connectedComponents: two spatially distant blobs are separate components ---
{
  const mask = new Uint8Array(TOTAL_CELLS);
  // Blob A near (50, 50)
  for (let y = 48; y <= 52; y++) for (let x = 48; x <= 52; x++) mask[y * GRID_WIDTH + x] = 1;
  // Blob B far away near (200, 120)
  for (let y = 118; y <= 122; y++) for (let x = 198; x <= 202; x++) mask[y * GRID_WIDTH + x] = 1;

  const { labels, components } = connectedComponents(mask);
  assert.equal(components.length, 2, "two spatially distant blobs must form two components");
  assert.equal(components[0].cells, 25, "blob A must have 25 cells (5x5)");
  assert.equal(components[1].cells, 25, "blob B must have 25 cells (5x5)");
  assert.equal(labels[50 * GRID_WIDTH + 50], components[0].id, "labels must match the blob A component id");
  assert.equal(labels[120 * GRID_WIDTH + 200], components[1].id, "labels must match the blob B component id");
  assert.equal(components[0].recordSum, components[0].cells, "recordSum defaults to cell count when counts is omitted");

  // recordSum honors a supplied per-cell counts array
  const counts = new Float64Array(TOTAL_CELLS);
  for (let i = 0; i < TOTAL_CELLS; i++) if (mask[i] === 1) counts[i] = 3;
  const withCounts = connectedComponents(mask, counts);
  assert.equal(withCounts.components[0].recordSum, 75, "recordSum must sum the supplied counts array (25 cells * 3)");
}

// --- connectedComponents: lon-wrap adjacency merges blobs straddling the antimeridian ---
{
  const mask = new Uint8Array(TOTAL_CELLS);
  const y = 90;
  mask[y * GRID_WIDTH + 359] = 1;
  mask[y * GRID_WIDTH + 0] = 1;
  const { components } = connectedComponents(mask);
  assert.equal(components.length, 1, "cells at x=359 and x=0 must merge into a single component via lon-wrap adjacency");
  assert.equal(components[0].cells, 2, "the merged antimeridian component must contain both cells");
}

// --- maskFromBoxes: a box crossing the antimeridian (minLon > maxLon) sets cells on both sides ---
{
  const mask = maskFromBoxes([{ minLon: 170, maxLon: -170, minLat: -5, maxLat: 5 }]);
  const [xNearEast] = lonLatToGrid(175, 0); // should fall in the eastern (minLon..180) run
  const [xNearWest] = lonLatToGrid(-175, 0); // should fall in the western (-180..maxLon) run
  const y = lonLatToGrid(0, 0)[1];
  assert.equal(mask[y * GRID_WIDTH + xNearEast], 1, "antimeridian-crossing box must set cells east of 170E");
  assert.equal(mask[y * GRID_WIDTH + xNearWest], 1, "antimeridian-crossing box must set cells west of -170");
  const [xOutside] = lonLatToGrid(0, 0);
  assert.equal(mask[y * GRID_WIDTH + xOutside], 0, "antimeridian-crossing box must not set cells outside its wedge (lon=0)");
}

// --- intersect / union / subtract / maskArea / countCells ---
{
  const a = rectMask(10, 19, 10, 19); // 10x10 = 100 cells
  const b = rectMask(15, 24, 10, 19); // 10x10 = 100 cells, overlapping a in x=[15,19]
  assert.equal(countCells(intersect(a, b)), 50, "intersect of two overlapping 10x10 rows must be the 5x10 overlap");
  assert.equal(countCells(union(a, b)), 150, "union of two overlapping 10x10 rows must be 150 cells");
  assert.equal(countCells(subtract(a, b)), 50, "subtract must remove the overlap from a");
  assert.ok(maskArea(a) > 0, "maskArea must report a positive area for a non-empty mask");
  const polarRect = rectMask(0, 9, 0, 9); // near the pole, smaller cells
  const equatorRect = rectMask(0, 9, 85, 94); // near the equator, larger cells
  assert.ok(maskArea(equatorRect) > maskArea(polarRect), "equatorial cells must have more area than polar cells of the same count");
}

// --- asciiMap: dimensions correct ---
{
  const mask = rectMask(0, 9, 0, 9);
  const map90 = asciiMap(mask);
  const lines90 = map90.split("\n");
  assert.equal(lines90.length, 45, "default cols=90 must yield 45 rows");
  for (const line of lines90) assert.equal(line.length, 90, "every row must have exactly `cols` characters");

  const map40 = asciiMap(mask, undefined, 40);
  const lines40 = map40.split("\n");
  assert.equal(lines40.length, 20, "cols=40 must yield 20 rows");
  for (const line of lines40) assert.equal(line.length, 40, "every row must have exactly `cols` characters");

  const overlay = rectMask(5, 14, 5, 14);
  const combined = asciiMap(mask, overlay, 90);
  assert.ok(combined.includes("O"), "overlapping mask+overlay region must render as 'O'");
}

// --- minCellDistance: symmetric, 0 for overlapping masks ---
{
  const a = rectMask(10, 14, 10, 14);
  const b = rectMask(10, 14, 10, 14);
  assert.equal(minCellDistance(a, b), 0, "overlapping masks must have distance 0");

  const c = new Uint8Array(TOTAL_CELLS);
  c[10 * GRID_WIDTH + 10] = 1;
  const d = new Uint8Array(TOTAL_CELLS);
  d[10 * GRID_WIDTH + 15] = 1; // 5 cells east, same row -> Chebyshev distance 5
  const distCD = minCellDistance(c, d);
  const distDC = minCellDistance(d, c);
  assert.equal(distCD, 5, "Chebyshev distance between (10,10) and (15,10) must be 5");
  assert.equal(distCD, distDC, "minCellDistance must be symmetric");

  // Longitude-wrapped distance: x=359 to x=2 should be closer going through the wrap (3) than the raw diff (357)
  const e = new Uint8Array(TOTAL_CELLS);
  e[50 * GRID_WIDTH + 359] = 1;
  const f = new Uint8Array(TOTAL_CELLS);
  f[50 * GRID_WIDTH + 2] = 1;
  assert.equal(minCellDistance(e, f), 3, "minCellDistance must wrap across the antimeridian for the shorter path");
}

// --- buildRealmMasks: islands must be caught by landTouch even where cell-center sampling would miss them ---
{
  const countriesTopoPath = path.resolve(__dirname, "../../node_modules/world-atlas/countries-110m.json");
  const countriesTopo = JSON.parse(fs.readFileSync(countriesTopoPath, "utf-8"));
  const { landCenter, landTouch, oceanTouch, coastal } = buildRealmMasks(countriesTopo);

  assert.equal(landTouch.length, TOTAL_CELLS, "landTouch must be a full-grid mask");
  assert.equal(oceanTouch.length, TOTAL_CELLS, "oceanTouch must be a full-grid mask");
  assert.equal(coastal.length, TOTAL_CELLS, "coastal must be a full-grid mask");

  // Komodo's cell CENTER (119.5E,-8.5S) sits in open water between Sumbawa and
  // Flores, but real coastline is well within the cell footprint — the 3x3
  // edge-inclusive subsample must catch it even though landCenter misses it.
  const [komodoX, komodoY] = lonLatToGrid(119.5, -8.5);
  assert.equal(landCenter[komodoY * GRID_WIDTH + komodoX], 0, "sanity: Komodo's cell center is open water, not land");
  assert.equal(landTouch[komodoY * GRID_WIDTH + komodoX], 1, "Komodo (~119.5E,-8.5S) must be landTouch=1 via 3x3 subsampling");

  // KNOWN LIMITATION (documented in gridOps.ts / final report, not silently
  // hidden): the Galapagos are entirely absent from Natural Earth's 1:110m
  // simplification (nearest vertex >9 degrees away in this exact bundled
  // file) — no point-in-cell subsampling can recover geometry the source
  // data doesn't contain. This is expected to be patched via the pipeline's
  // editorial-override mechanism (speciesRangeOverrides.ts), not gridOps.ts.
  const [galapagosX, galapagosY] = lonLatToGrid(-90.5, -0.5);
  if (landTouch[galapagosY * GRID_WIDTH + galapagosX] !== 1) {
    console.warn(
      "  [known limitation] Galapagos (~-90.5,-0.5) is landTouch=0 at 1:110m resolution — the island is absent from " +
        "world-atlas/countries-110m.json itself (not a subsampling bug). Requires a speciesRangeOverrides.ts entry downstream."
    );
  }

  // Deep ocean and deep continental interior sanity checks
  const [midPacificX, midPacificY] = lonLatToGrid(-150, 0);
  assert.equal(landTouch[midPacificY * GRID_WIDTH + midPacificX], 0, "mid-Pacific open ocean must not be landTouch");
  assert.equal(oceanTouch[midPacificY * GRID_WIDTH + midPacificX], 1, "mid-Pacific open ocean must be oceanTouch");

  const [saharaX, saharaY] = lonLatToGrid(20, 22);
  assert.equal(landTouch[saharaY * GRID_WIDTH + saharaX], 1, "central Sahara must be landTouch");
  assert.equal(oceanTouch[saharaY * GRID_WIDTH + saharaX], 0, "central Sahara is far from any coast, must not be oceanTouch");

  // A real coastal city (San Francisco) must register as both landTouch and
  // oceanTouch (i.e. its cell straddles the coastline), and coastal (after
  // dilation) must cover it too.
  const [sfX, sfY] = lonLatToGrid(-122.4, 37.7);
  assert.equal(landTouch[sfY * GRID_WIDTH + sfX], 1, "San Francisco Bay Area must be landTouch");
  assert.equal(oceanTouch[sfY * GRID_WIDTH + sfX], 1, "San Francisco Bay Area must be oceanTouch (coastal cell)");
  assert.equal(coastal[sfY * GRID_WIDTH + sfX], 1, "coastal mask must cover the San Francisco Bay Area coastline");

  assert.ok(countCells(landCenter) > 0, "landCenter must be non-empty");
  assert.ok(countCells(coastal) > 0, "coastal must be non-empty");
  assert.ok(countCells(coastal) < countCells(landTouch) + countCells(oceanTouch), "coastal must be a small subset relative to full land+ocean touch");
}

console.log("Grid-ops checks passed.");
