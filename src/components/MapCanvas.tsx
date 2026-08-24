"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import * as topojson from "topojson-client";
import { geoGraticule10, GeoPath, GeoProjection } from "d3-geo";
import { Language, Species, ScoreResult } from "../types/species";
import { getTranslation } from "../lib/i18n";
import {
  GRID_WIDTH,
  GRID_HEIGHT,
  TOTAL_CELLS,
  decodeRle,
  gridToLonLat,
  lonLatToGrid,
  paintGeodesicCircle,
} from "../lib/maskCompression";
import {
  createRobinsonProjection,
  screenToLonLat,
  lonLatToScreen,
} from "../lib/projection";
import { playPaintTick } from "../lib/sound";
import landMaskData from "../data/land-mask.json";
import worldTopo from "../data/world-110m.json";

interface MapCanvasProps {
  species: Species;
  tool: "brush" | "eraser";
  brushRadiusKm: number;
  snapToLand: boolean;
  userMask: Uint8Array;
  onUpdateMask: (newMask: Uint8Array) => void;
  isSolved: boolean;
  scoreResult?: ScoreResult;
  lang: Language;
}

export const MapCanvas: React.FC<MapCanvasProps> = ({
  species,
  tool,
  brushRadiusKm,
  snapToLand,
  userMask,
  onUpdateMask,
  isSolved,
  scoreResult,
  lang,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [hoverInfo, setHoverInfo] = useState<{ lon: number; lat: number; status: string } | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 900,
    height: 480,
  });

  // Decode cached global land mask (360x180)
  const landMask = React.useMemo(() => {
    return decodeRle(landMaskData.rle);
  }, []);

  // Decode ground truth mask for current species
  const groundTruthMask = React.useMemo(() => {
    return decodeRle(species.range.rleMask);
  }, [species.range.rleMask]);

  // Handle container resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const width = Math.floor(rect.width);
        // Robinson projection has an aspect ratio of approx 2.05:1
        const height = Math.floor(Math.min(600, Math.max(280, width * 0.52)));
        setDimensions({ width, height });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Main Render Loop
  const renderMap = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = dimensions;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // 1. Clear background
    ctx.fillStyle = "#060A11";
    ctx.fillRect(0, 0, width, height);

    const { projection, pathGenerator } = createRobinsonProjection(width, height);

    // 2. Draw Sphere Background (Ocean)
    ctx.beginPath();
    pathGenerator({ type: "Sphere" });
    ctx.fillStyle = "#091322";
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#1A2B47";
    ctx.stroke();

    // 3. Draw Graticules (Lat/Lon grid lines)
    const graticule = geoGraticule10();
    ctx.beginPath();
    pathGenerator(graticule);
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "rgba(40, 65, 100, 0.4)";
    ctx.stroke();

    // Equator highlight
    ctx.beginPath();
    pathGenerator({
      type: "LineString",
      coordinates: [
        [-180, 0],
        [-90, 0],
        [0, 0],
        [90, 0],
        [180, 0],
      ],
    });
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = "rgba(16, 185, 129, 0.35)";
    ctx.stroke();

    // 4. Draw Landmasses from TopoJSON
    const landFeature = topojson.feature(
      worldTopo as any,
      (worldTopo as any).objects.land
    ) as any;

    ctx.beginPath();
    pathGenerator(landFeature);
    ctx.fillStyle = "#111E33";
    ctx.fill();
    ctx.lineWidth = 0.75;
    ctx.strokeStyle = "#1D3254";
    ctx.stroke();

    // 5. Draw Country Boundaries
    const countriesFeature = topojson.feature(
      worldTopo as any,
      (worldTopo as any).objects.countries
    ) as any;

    ctx.beginPath();
    pathGenerator(countriesFeature);
    ctx.lineWidth = 0.35;
    ctx.strokeStyle = "rgba(30, 55, 90, 0.5)";
    ctx.stroke();

    // 6. Draw User Painted Range (Before Submission)
    if (!isSolved) {
      for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
          const idx = y * GRID_WIDTH + x;
          if (userMask[idx] === 1) {
            const [lon, lat] = gridToLonLat(x, y);
            const pt = lonLatToScreen(projection, lon, lat);
            if (pt) {
              // Calculate screen pixel cell size
              const ptNext = lonLatToScreen(projection, lon + 1, lat - 1);
              const cellW = Math.max(2, ptNext ? Math.abs(ptNext[0] - pt[0]) + 1.2 : 3);
              const cellH = Math.max(2, ptNext ? Math.abs(ptNext[1] - pt[1]) + 1.2 : 3);

              ctx.fillStyle = "rgba(6, 182, 212, 0.65)"; // Cyan user paint
              ctx.fillRect(pt[0] - cellW / 2, pt[1] - cellH / 2, cellW, cellH);
            }
          }
        }
      }
    }

    // 7. Draw Diagnostic Evaluation Overlay (After Submission)
    if (isSolved) {
      for (let y = 0; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
          const idx = y * GRID_WIDTH + x;
          const userVal = userMask[idx] === 1;
          const gtVal = groundTruthMask[idx] === 1;

          if (!userVal && !gtVal) continue;

          const [lon, lat] = gridToLonLat(x, y);
          const pt = lonLatToScreen(projection, lon, lat);
          if (!pt) continue;

          const ptNext = lonLatToScreen(projection, lon + 1, lat - 1);
          const cellW = Math.max(2, ptNext ? Math.abs(ptNext[0] - pt[0]) + 1.2 : 3);
          const cellH = Math.max(2, ptNext ? Math.abs(ptNext[1] - pt[1]) + 1.2 : 3);

          if (userVal && gtVal) {
            // True Positive (Hit) - Emerald Green
            ctx.fillStyle = "rgba(16, 185, 129, 0.85)";
            ctx.fillRect(pt[0] - cellW / 2, pt[1] - cellH / 2, cellW, cellH);
          } else if (userVal && !gtVal) {
            // False Positive (Overestimated) - Amber Orange
            ctx.fillStyle = "rgba(245, 158, 11, 0.75)";
            ctx.fillRect(pt[0] - cellW / 2, pt[1] - cellH / 2, cellW, cellH);
          } else if (!userVal && gtVal) {
            // False Negative (Missed Native Range) - Sky Blue
            ctx.fillStyle = "rgba(56, 189, 248, 0.75)";
            ctx.fillRect(pt[0] - cellW / 2, pt[1] - cellH / 2, cellW, cellH);
          }
        }
      }
    }

    // 8. Re-stroke the outer sphere border
    ctx.beginPath();
    pathGenerator({ type: "Sphere" });
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "#1E365D";
    ctx.stroke();
  }, [dimensions, userMask, isSolved, groundTruthMask]);

  useEffect(() => {
    renderMap();
  }, [renderMap]);

  // Pointer Interaction Handlers
  const handlePointerAction = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (isSolved) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const screenX = e.clientX - rect.left;
      const screenY = e.clientY - rect.top;

      const { projection } = createRobinsonProjection(dimensions.width, dimensions.height);
      const lonLat = screenToLonLat(projection, screenX, screenY);

      if (!lonLat) return;
      const [lon, lat] = lonLat;

      // Update mask
      const newMask = new Uint8Array(userMask);
      const paintVal = tool === "brush" ? 1 : 0;

      paintGeodesicCircle(
        newMask,
        lon,
        lat,
        brushRadiusKm,
        paintVal,
        landMask,
        snapToLand && species.realm !== "Marine"
      );

      onUpdateMask(newMask);
      playPaintTick();
    },
    [
      isSolved,
      dimensions,
      userMask,
      tool,
      brushRadiusKm,
      landMask,
      snapToLand,
      species.realm,
      onUpdateMask,
    ]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isSolved) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDrawing(true);
    handlePointerAction(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;

    const { projection } = createRobinsonProjection(dimensions.width, dimensions.height);
    const lonLat = screenToLonLat(projection, screenX, screenY);

    if (lonLat) {
      const [lon, lat] = lonLat;
      const [gx, gy] = lonLatToGrid(lon, lat);
      const idx = gy * GRID_WIDTH + gx;

      let status = "Ocean";
      if (landMask[idx] === 1) status = "Land";
      if (isSolved) {
        const u = userMask[idx] === 1;
        const g = groundTruthMask[idx] === 1;
        if (u && g) status = "Native Range (Hit!)";
        else if (u && !g) status = "Overestimated";
        else if (!u && g) status = "Missed Native Range";
      }

      setHoverInfo({
        lon: Math.round(lon * 10) / 10,
        lat: Math.round(lat * 10) / 10,
        status,
      });
    } else {
      setHoverInfo(null);
    }

    if (isDrawing) {
      handlePointerAction(e);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      setIsDrawing(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl border border-surface-border bg-surface shadow-2xl"
    >
      {/* Top Legend / Status Bar */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2 text-[11px] font-semibold">
        {!isSolved ? (
          <div className="flex items-center gap-1.5 rounded-lg bg-surface/90 border border-surface-border px-2.5 py-1 text-slate-300 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="hidden sm:inline">{getTranslation(lang, "paintingHint")}</span>
            <span className="sm:hidden">Paint range on map</span>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2 rounded-lg bg-surface/90 border border-surface-border p-1.5 backdrop-blur-md">
            <div className="flex items-center gap-1 px-1.5 text-emerald-400">
              <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
              <span>{getTranslation(lang, "overlapLegend")}</span>
            </div>
            <div className="flex items-center gap-1 px-1.5 text-amber-400">
              <span className="h-2.5 w-2.5 rounded-sm bg-amber-500" />
              <span>{getTranslation(lang, "overestimateLegend")}</span>
            </div>
            <div className="flex items-center gap-1 px-1.5 text-sky-400">
              <span className="h-2.5 w-2.5 rounded-sm bg-sky-400" />
              <span>{getTranslation(lang, "missedLegend")}</span>
            </div>
          </div>
        )}
      </div>

      {/* Hover Coordinates & Diagnostic Tag */}
      {hoverInfo && (
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 rounded-lg bg-surface/85 border border-surface-border px-2.5 py-1 text-[11px] font-mono text-slate-400 backdrop-blur-md">
          <span>
            {hoverInfo.lat >= 0 ? `${hoverInfo.lat}°N` : `${Math.abs(hoverInfo.lat)}°S`},{" "}
            {hoverInfo.lon >= 0 ? `${hoverInfo.lon}°E` : `${Math.abs(hoverInfo.lon)}°W`}
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-300 font-sans font-medium">{hoverInfo.status}</span>
        </div>
      )}

      {/* Projection Name Stamp */}
      <div className="absolute bottom-3 right-3 z-10 text-[10px] font-bold uppercase tracking-wider text-slate-600 select-none">
        Robinson Projection (1:110m)
      </div>

      {/* Canvas Element */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          width: dimensions.width,
          height: dimensions.height,
          cursor: isSolved ? "default" : tool === "brush" ? "crosshair" : "cell",
          touchAction: "none",
        }}
        className="block select-none"
      />
    </div>
  );
};
