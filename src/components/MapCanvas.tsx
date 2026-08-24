"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GeoProjection, geoCircle, geoPath } from "d3-geo";
import { Minus, Plus, RotateCcw } from "lucide-react";
import { Language, Species, ScoreResult } from "../types/species";
import { getTranslation } from "../lib/i18n";
import {
  GRID_WIDTH,
  decodeRle,
  lonLatToGrid,
  paintGeodesicCircle,
} from "../lib/maskCompression";
import { createRobinsonProjection, lonLatToScreen } from "../lib/projection";
import {
  ViewTransform,
  IDENTITY,
  screenToBase,
  zoomAtPoint,
  panBy,
  pinchUpdate,
  clampView,
  composeDelta,
} from "../lib/viewTransform";
import {
  CellGeometry,
  MapPalette,
  buildCellGeometry,
  renderBaseLayer,
  renderMaskLayer,
  renderRevealLayer,
  visibleGridBounds,
} from "../lib/mapRenderer";
import { map as mapTokens, paint as paintTokens } from "../lib/theme";
import { playPaintTick } from "../lib/sound";
import { trackGameEvent } from "../lib/analytics";
import landMaskData from "../data/land-mask.json";
import worldTopo from "../data/world-110m.json";

type Tool = "brush" | "eraser" | "pan";
type InteractionMode = "idle" | "paint" | "pan" | "pinch";

interface MapCanvasProps {
  species: Species;
  tool: Tool;
  brushRadiusKm: number;
  snapToLand: boolean;
  userMask: Uint8Array;
  onUpdateMask: (newMask: Uint8Array) => void;
  isSolved: boolean;
  scoreResult?: ScoreResult;
  lang: Language;
}

/** Module-scope so the "used zoom at least once" analytics event fires only
 * once per browser session/page-load, not once per MapCanvas mount (e.g.
 * switching species in unlimited mode remounts state but not the module). */
let hasTrackedZoomThisSession = false;

function getDpr(): number {
  return typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
}

function computeSphereBounds(projection: GeoProjection): [number, number, number, number] {
  const bounds = geoPath(projection).bounds({ type: "Sphere" } as any);
  return [bounds[0][0], bounds[0][1], bounds[1][0], bounds[1][1]];
}

export const MapCanvas: React.FC<MapCanvasProps> = ({
  species,
  tool,
  brushRadiusKm,
  snapToLand,
  userMask,
  onUpdateMask,
  isSolved,
  lang,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseLayerRef = useRef<HTMLCanvasElement | null>(null);
  const paintLayerRef = useRef<HTMLCanvasElement | null>(null);

  const cellGeomRef = useRef<CellGeometry | null>(null);
  const baseProjectionRef = useRef<GeoProjection | null>(null);
  const sphereBoundsRef = useRef<[number, number, number, number]>([0, 0, 0, 0]);

  const settledViewRef = useRef<ViewTransform>(IDENTITY);
  const liveViewRef = useRef<ViewTransform>(IDENTITY);

  const strokeMaskRef = useRef<Uint8Array | null>(null);
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const modeRef = useRef<InteractionMode>("idle");
  const panLastRef = useRef<{ x: number; y: number } | null>(null);
  // Previous pointer position (screen/CSS px) during an in-progress paint
  // stroke -- used to interpolate intermediate dabs so fast drags don't
  // leave gaps between sparsely-delivered pointermove samples (issue #2).
  const paintLastRef = useRef<{ x: number; y: number } | null>(null);
  const pinchIdsRef = useRef<[number, number] | null>(null);
  const pinchPrevRef = useRef<[[number, number], [number, number]] | null>(null);
  const hoverLonLatRef = useRef<{ lon: number; lat: number } | null>(null);

  const dimensionsRef = useRef<{ width: number; height: number }>({ width: 900, height: 480 });
  const settleTimerRef = useRef<number | null>(null);
  const rafScheduledRef = useRef(false);
  const resetAnimRef = useRef<number | null>(null);
  const zoomHintTimerRef = useRef<number | null>(null);

  const compositeFrameRef = useRef<() => void>(() => {});
  const runSettleRef = useRef<() => void>(() => {});

  const [interactionMode, setInteractionMode] = useState<InteractionMode>("idle");
  const [spaceHeld, setSpaceHeld] = useState(false);
  const [hoverInfo, setHoverInfo] = useState<{ lon: number; lat: number; status: string } | null>(null);
  const [viewK, setViewK] = useState(1);
  const [showZoomHint, setShowZoomHint] = useState(false);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 900,
    height: 480,
  });
  dimensionsRef.current = dimensions;

  const landMask = useMemo(() => decodeRle(landMaskData.rle), []);
  const groundTruthMask = useMemo(() => decodeRle(species.range.rleMask), [species.range.rleMask]);

  const palette: MapPalette = useMemo(
    () => ({
      canvasBg: mapTokens.canvasBg,
      ocean: mapTokens.ocean,
      oceanEdge: mapTokens.oceanEdge,
      land: mapTokens.land,
      coast: mapTokens.coast,
      countryLine: mapTokens.countryLine,
      graticule: mapTokens.graticule,
      equator: mapTokens.equator,
      sphereRing: mapTokens.sphereRing,
      brush: paintTokens.brush,
      overlap: paintTokens.overlap,
      overestimate: paintTokens.overestimate,
      missed: paintTokens.missed,
    }),
    []
  );

  // ---------------------------------------------------------------------
  // Layer rendering
  // ---------------------------------------------------------------------

  const renderPaintLayer = useCallback(
    (view: ViewTransform) => {
      const paintLayer = paintLayerRef.current;
      const baseProjection = baseProjectionRef.current;
      const geometry = cellGeomRef.current;
      if (!paintLayer || !baseProjection || !geometry) return;
      const paintCtx = paintLayer.getContext("2d");
      if (!paintCtx) return;

      const { width, height } = dimensionsRef.current;
      const dpr = getDpr();

      paintCtx.setTransform(1, 0, 0, 1, 0, 0);
      paintCtx.clearRect(0, 0, paintLayer.width, paintLayer.height);
      paintCtx.setTransform(dpr * view.k, 0, 0, dpr * view.k, dpr * view.tx, dpr * view.ty);

      const bounds = visibleGridBounds(baseProjection, view, width, height);

      if (isSolved) {
        renderRevealLayer(paintCtx, userMask, groundTruthMask, geometry, palette, bounds, dpr, view.k);
      } else {
        const visible = strokeMaskRef.current ?? userMask;
        renderMaskLayer(paintCtx, visible, geometry, palette.brush, bounds, dpr, view.k);
      }
    },
    [isSolved, userMask, groundTruthMask, palette]
  );

  const requestComposite = useCallback(() => {
    if (rafScheduledRef.current) return;
    rafScheduledRef.current = true;
    requestAnimationFrame(() => {
      rafScheduledRef.current = false;
      compositeFrameRef.current();
    });
  }, []);

  const runSettle = useCallback(() => {
    const canvas = canvasRef.current;
    const baseLayer = baseLayerRef.current;
    const baseProjection = baseProjectionRef.current;
    const geometry = cellGeomRef.current;
    if (!canvas || !baseLayer || !baseProjection || !geometry) return;

    const { width, height } = dimensionsRef.current;
    const dpr = getDpr();

    const clamped = clampView(liveViewRef.current, width, height, sphereBoundsRef.current);
    liveViewRef.current = clamped;
    settledViewRef.current = clamped;
    setViewK(clamped.k);

    // Base layer: recreate the projection with the settled view baked into
    // its own scale/translate (rather than relying purely on a ctx
    // transform) so d3's adaptive resampling emits enough vertices for
    // smooth coastlines/graticule curves at high zoom. The ctx here only
    // needs the DPR factor since the zoom is already inside the projection.
    const baseCtx = baseLayer.getContext("2d");
    if (baseCtx) {
      baseCtx.setTransform(1, 0, 0, 1, 0, 0);
      baseCtx.clearRect(0, 0, baseLayer.width, baseLayer.height);
      baseCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const crispProjection = createRobinsonProjection(width, height, null, clamped).projection;
      renderBaseLayer(baseCtx, worldTopo, crispProjection, width, height, dpr, palette);
    }

    // Paint/reveal layer: always drawn from the cached BASE (k=1) cell
    // geometry, placed via a ctx transform carrying the settled view -- see
    // renderPaintLayer.
    renderPaintLayer(clamped);

    requestComposite();
  }, [palette, renderPaintLayer, requestComposite]);
  runSettleRef.current = runSettle;

  const scheduleSettle = useCallback(
    (immediate = false) => {
      if (settleTimerRef.current !== null) {
        window.clearTimeout(settleTimerRef.current);
        settleTimerRef.current = null;
      }
      if (immediate) {
        runSettleRef.current();
        return;
      }
      settleTimerRef.current = window.setTimeout(() => {
        settleTimerRef.current = null;
        runSettleRef.current();
      }, 120);
    },
    []
  );

  const compositeFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const baseLayer = baseLayerRef.current;
    const paintLayer = paintLayerRef.current;
    if (!canvas || !baseLayer || !paintLayer) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = getDpr();
    const { width, height } = dimensionsRef.current;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const delta = composeDelta(liveViewRef.current, settledViewRef.current);
    // The layer canvases are DPR-scaled rasters of the SETTLED view: their
    // physical pixel (u,v) corresponds to settled-CSS-screen coordinate
    // (u/dpr, v/dpr). `delta` maps settled-screen-space to live-screen-space
    // in CSS-pixel units. Composed: destPhysical = delta.k * u + dpr *
    // delta.t -- the scale is dimensionless (dpr cancels between the two
    // already-scaled rasters) while the translate is a CSS-pixel offset
    // that still needs the dpr factor to land in physical-pixel space.
    ctx.setTransform(delta.k, 0, 0, delta.k, dpr * delta.tx, dpr * delta.ty);
    ctx.drawImage(baseLayer, 0, 0);
    ctx.drawImage(paintLayer, 0, 0);

    // Reset to a plain DPR scale for CSS-pixel-unit chrome drawing below.
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const hoverPt = hoverLonLatRef.current;
    const showCursor =
      hoverPt && !isSolved && (tool === "brush" || tool === "eraser") && modeRef.current !== "pinch";
    if (showCursor && hoverPt) {
      const liveProjection = createRobinsonProjection(width, height, null, liveViewRef.current).projection;
      const circle = geoCircle().center([hoverPt.lon, hoverPt.lat]).radius(brushRadiusKm / 111.195)();
      const pathGen = geoPath(liveProjection, ctx);
      ctx.beginPath();
      pathGen(circle as any);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = tool === "eraser" ? paintTokens.eraserPreview : paintTokens.brush;
      ctx.stroke();
    }
  }, [isSolved, tool, brushRadiusKm]);
  compositeFrameRef.current = compositeFrame;

  // ---------------------------------------------------------------------
  // Resize / setup
  // ---------------------------------------------------------------------

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const width = Math.max(320, Math.floor(rect.width));
        const height = Math.max(200, Math.floor(Math.min(620, Math.max(260, width * 0.52))));
        setDimensions((prev) => (prev.width === width && prev.height === height ? prev : { width, height }));
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const { width, height } = dimensions;
    const dpr = getDpr();

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
    }
    if (!baseLayerRef.current) baseLayerRef.current = document.createElement("canvas");
    if (!paintLayerRef.current) paintLayerRef.current = document.createElement("canvas");
    baseLayerRef.current.width = Math.max(1, Math.round(width * dpr));
    baseLayerRef.current.height = Math.max(1, Math.round(height * dpr));
    paintLayerRef.current.width = Math.max(1, Math.round(width * dpr));
    paintLayerRef.current.height = Math.max(1, Math.round(height * dpr));

    const { projection } = createRobinsonProjection(width, height);
    baseProjectionRef.current = projection;
    cellGeomRef.current = buildCellGeometry(projection);
    sphereBoundsRef.current = computeSphereBounds(projection);

    // Preserve the user's zoom/pan across a resize, re-clamped to the new
    // viewport/sphere geometry.
    liveViewRef.current = clampView(liveViewRef.current, width, height, sphereBoundsRef.current);

    runSettle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dimensions.width, dimensions.height]);

  // New species: return to a neutral view rather than keeping whatever
  // zoom/pan the previous species ended on.
  useEffect(() => {
    liveViewRef.current = IDENTITY;
    settledViewRef.current = IDENTITY;
    setViewK(1);
    scheduleSettle(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [species.id]);

  // External mask-data changes (undo/clear/commit/solve toggle) redraw the
  // paint layer; painting itself calls renderPaintLayer directly and does
  // not depend on this effect.
  useEffect(() => {
    renderPaintLayer(settledViewRef.current);
    requestComposite();
  }, [userMask, isSolved, groundTruthMask, renderPaintLayer, requestComposite]);

  // Brush/eraser cursor preview needs to refresh even without pointer
  // movement (e.g. changing brush size from the toolbar while hovering).
  useEffect(() => {
    requestComposite();
  }, [tool, brushRadiusKm, requestComposite]);

  useEffect(() => {
    return () => {
      if (settleTimerRef.current !== null) window.clearTimeout(settleTimerRef.current);
      if (zoomHintTimerRef.current !== null) window.clearTimeout(zoomHintTimerRef.current);
      if (resetAnimRef.current !== null) cancelAnimationFrame(resetAnimRef.current);
    };
  }, []);

  // ---------------------------------------------------------------------
  // Zoom helpers
  // ---------------------------------------------------------------------

  const noteZoomUsed = useCallback((k: number) => {
    if (hasTrackedZoomThisSession) return;
    if (Math.abs(k - 1) < 0.001) return;
    hasTrackedZoomThisSession = true;
    trackGameEvent("zoom_used", { k_band: Math.round(k) });
  }, []);

  const zoomByStep = useCallback(
    (factor: number) => {
      const { width, height } = dimensionsRef.current;
      const nextView = clampView(
        zoomAtPoint(liveViewRef.current, factor, width / 2, height / 2),
        width,
        height,
        sphereBoundsRef.current
      );
      liveViewRef.current = nextView;
      setViewK(nextView.k);
      requestComposite();
      scheduleSettle();
      noteZoomUsed(nextView.k);
    },
    [requestComposite, scheduleSettle, noteZoomUsed]
  );

  const resetView = useCallback(() => {
    if (resetAnimRef.current !== null) {
      cancelAnimationFrame(resetAnimRef.current);
      resetAnimRef.current = null;
    }
    const start = liveViewRef.current;
    if (Math.abs(start.k - 1) < 1e-6 && Math.abs(start.tx) < 1e-6 && Math.abs(start.ty) < 1e-6) {
      return;
    }
    const startTime = performance.now();
    const duration = 250;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const e = ease(t);
      const next: ViewTransform = {
        k: start.k + (1 - start.k) * e,
        tx: start.tx * (1 - e),
        ty: start.ty * (1 - e),
      };
      liveViewRef.current = next;
      setViewK(next.k);
      requestComposite();
      if (t < 1) {
        resetAnimRef.current = requestAnimationFrame(step);
      } else {
        resetAnimRef.current = null;
        liveViewRef.current = IDENTITY;
        scheduleSettle(true);
      }
    };
    resetAnimRef.current = requestAnimationFrame(step);
  }, [requestComposite, scheduleSettle]);

  // Transient hint nudging the player to zoom in when a very fine brush is
  // selected while still zoomed out.
  useEffect(() => {
    if ((brushRadiusKm === 50 || brushRadiusKm === 100) && viewK < 2.5) {
      setShowZoomHint(true);
      if (zoomHintTimerRef.current !== null) window.clearTimeout(zoomHintTimerRef.current);
      zoomHintTimerRef.current = window.setTimeout(() => {
        zoomHintTimerRef.current = null;
        setShowZoomHint(false);
      }, 2500);
    }
    return () => {
      if (zoomHintTimerRef.current !== null) {
        window.clearTimeout(zoomHintTimerRef.current);
        zoomHintTimerRef.current = null;
      }
    };
    // Deliberately excludes viewK from re-triggering on every zoom tick --
    // only a fresh brush-size selection should surface the hint again.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brushRadiusKm]);

  // ---------------------------------------------------------------------
  // Wheel + keyboard (native listeners, stable across renders)
  // ---------------------------------------------------------------------

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const { width, height } = dimensionsRef.current;
      const x = (e.clientX - rect.left) * (width / rect.width);
      const y = (e.clientY - rect.top) * (height / rect.height);

      // ctrlKey marks a trackpad pinch-zoom gesture on most browsers, which
      // reports much larger deltaY per physical gesture than wheel spin.
      const sensitivity = e.ctrlKey ? 0.02 : 0.0025;
      const factor = Math.pow(2, -e.deltaY * sensitivity);
      const nextView = clampView(
        zoomAtPoint(liveViewRef.current, factor, x, y),
        width,
        height,
        sphereBoundsRef.current
      );
      liveViewRef.current = nextView;
      setViewK(nextView.k);
      requestComposite();
      scheduleSettle();
      noteZoomUsed(nextView.k);
    },
    [requestComposite, scheduleSettle, noteZoomUsed]
  );
  const handleWheelRef = useRef(handleWheel);
  handleWheelRef.current = handleWheel;

  useEffect(() => {
    // ROOT CAUSE (issue #1): this listener used to be attached to the bare
    // <canvas> element. The zoom chrome (+/-/reset buttons) and the other
    // status/legend chips are absolutely-positioned SIBLINGS of the canvas
    // that overlap large parts of the map card and, unlike the purely
    // decorative chips, cannot be pointer-events-none because their buttons
    // need to receive clicks. A wheel gesture whose cursor is over any of
    // that overlay chrome fires with `target` = that overlay div, not the
    // canvas -- so a listener bound only to the canvas never runs and
    // preventDefault() is never called for those events, letting the
    // browser fall through to its native page-scroll while the events that
    // *did* land on bare canvas still zoomed (hence "zoomed AND scrolled").
    // Binding to the outer card container -- an ancestor of the canvas and
    // every piece of overlay chrome -- guarantees the listener sees every
    // wheel event that occurs anywhere over the map card, so it can always
    // preventDefault() the page scroll while still zooming.
    const container = containerRef.current;
    if (!container) return;
    const wheelListener = (e: WheelEvent) => handleWheelRef.current(e);
    const preventGesture = (e: Event) => e.preventDefault();
    container.addEventListener("wheel", wheelListener, { passive: false });
    container.addEventListener("gesturestart", preventGesture as EventListener);
    container.addEventListener("gesturechange", preventGesture as EventListener);
    container.addEventListener("gestureend", preventGesture as EventListener);
    return () => {
      container.removeEventListener("wheel", wheelListener);
      container.removeEventListener("gesturestart", preventGesture as EventListener);
      container.removeEventListener("gesturechange", preventGesture as EventListener);
      container.removeEventListener("gestureend", preventGesture as EventListener);
    };
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        !!target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if (typing) return;

      if (e.code === "Space" && !e.repeat) {
        setSpaceHeld(true);
      }

      if (document.activeElement !== canvasRef.current) return;

      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        zoomByStep(1.4);
      } else if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        zoomByStep(1 / 1.4);
      } else if (e.key === "0") {
        e.preventDefault();
        resetView();
      }
    },
    [zoomByStep, resetView]
  );
  const handleKeyDownRef = useRef(handleKeyDown);
  handleKeyDownRef.current = handleKeyDown;

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.code === "Space") setSpaceHeld(false);
  }, []);
  const handleKeyUpRef = useRef(handleKeyUp);
  handleKeyUpRef.current = handleKeyUp;

  useEffect(() => {
    const downListener = (e: KeyboardEvent) => handleKeyDownRef.current(e);
    const upListener = (e: KeyboardEvent) => handleKeyUpRef.current(e);
    window.addEventListener("keydown", downListener);
    window.addEventListener("keyup", upListener);
    return () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    };
  }, []);

  // ---------------------------------------------------------------------
  // Pointer gesture state machine: idle | paint | pan | pinch
  // ---------------------------------------------------------------------

  const getCanvasLocalPoint = useCallback((e: React.PointerEvent<HTMLCanvasElement>): [number, number] => {
    const canvas = canvasRef.current;
    if (!canvas) return [0, 0];
    const rect = canvas.getBoundingClientRect();
    const { width, height } = dimensionsRef.current;
    const x = (e.clientX - rect.left) * (width / rect.width);
    const y = (e.clientY - rect.top) * (height / rect.height);
    return [x, y];
  }, []);

  const computeHoverInfo = useCallback(
    (x: number, y: number): { lon: number; lat: number; status: string } | null => {
      const baseProjection = baseProjectionRef.current;
      if (!baseProjection || !baseProjection.invert) return null;
      const [bx, by] = screenToBase(liveViewRef.current, x, y);
      let inv: [number, number] | null;
      try {
        const result = baseProjection.invert([bx, by]);
        inv = result ? [result[0], result[1]] : null;
      } catch {
        inv = null;
      }
      if (!inv || !isFinite(inv[0]) || !isFinite(inv[1])) return null;
      const [lon, lat] = inv;
      if (lat < -90.001 || lat > 90.001) return null;

      const [gx, gy] = lonLatToGrid(lon, lat);
      const idx = gy * GRID_WIDTH + gx;

      let statusKey: "landLabel" | "oceanLabel" | "hoverHit" | "hoverOver" | "hoverMissed" =
        landMask[idx] === 1 ? "landLabel" : "oceanLabel";
      if (isSolved) {
        const u = userMask[idx] === 1;
        const g = groundTruthMask[idx] === 1;
        if (u && g) statusKey = "hoverHit";
        else if (u && !g) statusKey = "hoverOver";
        else if (!u && g) statusKey = "hoverMissed";
      }

      return {
        lon: Math.round(lon * 10) / 10,
        lat: Math.round(lat * 10) / 10,
        status: getTranslation(lang, statusKey),
      };
    },
    [isSolved, userMask, groundTruthMask, landMask, lang]
  );

  const paintAt = useCallback(
    (x: number, y: number) => {
      const baseProjection = baseProjectionRef.current;
      const strokeMask = strokeMaskRef.current;
      if (!baseProjection || !baseProjection.invert || !strokeMask) return;
      const [bx, by] = screenToBase(liveViewRef.current, x, y);
      let inv: [number, number] | null;
      try {
        const result = baseProjection.invert([bx, by]);
        inv = result ? [result[0], result[1]] : null;
      } catch {
        inv = null;
      }
      if (!inv) return;
      const [lon, lat] = inv;
      const paintVal = tool === "brush" ? 1 : 0;
      paintGeodesicCircle(
        strokeMask,
        lon,
        lat,
        brushRadiusKm,
        paintVal,
        landMask,
        snapToLand && species.realm !== "Marine"
      );
    },
    [tool, brushRadiusKm, landMask, snapToLand, species.realm]
  );

  /**
   * Rough on-screen (CSS px) radius the brush currently covers near
   * (lon, lat), used only to size the interpolation step below -- not for
   * painting itself. Projects a brushRadiusKm-sized offset through the
   * fixed base (k=1) projection, then scales by the live zoom so the
   * estimate tracks the current view.
   */
  const estimateBrushScreenPx = useCallback(
    (lon: number, lat: number): number => {
      const baseProjection = baseProjectionRef.current;
      const k = liveViewRef.current.k;
      const fallback = Math.max(4, (brushRadiusKm / 25) * k);
      if (!baseProjection) return fallback;
      const degOffset = brushRadiusKm / 111.195;
      const latB = Math.max(-89.9, Math.min(89.9, lat + degOffset));
      const p0 = lonLatToScreen(baseProjection, lon, lat);
      const p1 = lonLatToScreen(baseProjection, lon, latB);
      if (!p0 || !p1) return fallback;
      const baseDist = Math.hypot(p1[0] - p0[0], p1[1] - p0[1]);
      return Math.max(2, baseDist * k);
    },
    [brushRadiusKm]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
    const [x, y] = getCanvasLocalPoint(e);
    pointersRef.current.set(e.pointerId, { x, y });

    if (pointersRef.current.size >= 2) {
      // A second finger landing mid-stroke discards the in-progress paint
      // (no commit, no undo entry) and switches to pinch.
      if (modeRef.current === "paint") {
        strokeMaskRef.current = null;
        paintLastRef.current = null;
        renderPaintLayer(settledViewRef.current);
      }
      const ids = Array.from(pointersRef.current.keys()).slice(0, 2) as [number, number];
      const p0 = pointersRef.current.get(ids[0])!;
      const p1 = pointersRef.current.get(ids[1])!;
      pinchIdsRef.current = ids;
      pinchPrevRef.current = [
        [p0.x, p0.y],
        [p1.x, p1.y],
      ];
      modeRef.current = "pinch";
      setInteractionMode("pinch");
      requestComposite();
      return;
    }

    const wantsPan = tool === "pan" || e.button === 1 || spaceHeld;
    if (wantsPan) {
      modeRef.current = "pan";
      setInteractionMode("pan");
      panLastRef.current = { x, y };
      return;
    }

    if (!isSolved && (tool === "brush" || tool === "eraser")) {
      modeRef.current = "paint";
      setInteractionMode("paint");
      strokeMaskRef.current = new Uint8Array(userMask);
      paintAt(x, y);
      paintLastRef.current = { x, y };
      renderPaintLayer(settledViewRef.current);
      requestComposite();
      playPaintTick();
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const [x, y] = getCanvasLocalPoint(e);
    if (pointersRef.current.has(e.pointerId)) {
      pointersRef.current.set(e.pointerId, { x, y });
    }

    const hover = computeHoverInfo(x, y);
    setHoverInfo(hover);
    hoverLonLatRef.current = hover ? { lon: hover.lon, lat: hover.lat } : null;

    const { width, height } = dimensionsRef.current;

    switch (modeRef.current) {
      case "paint": {
        // Pointer events arrive sparsely during a fast drag (the browser
        // coalesces/throttles pointermove), which used to leave visible
        // gaps between dabs -- a quick swipe painted a few disconnected
        // circles instead of a continuous stroke. Fix: interpolate in
        // SCREEN space between the previous and current pointer position
        // (sidesteps antimeridian wraparound, which a naive lon/lat lerp
        // would get wrong) and paint an intermediate dab every ~0.4 brush
        // radii so consecutive dabs always overlap.
        const last = paintLastRef.current;
        if (last && hover) {
          const dx = x - last.x;
          const dy = y - last.y;
          const dist = Math.hypot(dx, dy);
          const step = Math.max(2, estimateBrushScreenPx(hover.lon, hover.lat) * 0.4);
          if (dist > step) {
            const steps = Math.ceil(dist / step);
            for (let i = 1; i < steps; i++) {
              const t = i / steps;
              paintAt(last.x + dx * t, last.y + dy * t);
            }
          }
        }
        paintAt(x, y);
        paintLastRef.current = { x, y };
        renderPaintLayer(settledViewRef.current);
        requestComposite();
        break;
      }
      case "pan": {
        const last = panLastRef.current;
        if (last) {
          const dx = x - last.x;
          const dy = y - last.y;
          liveViewRef.current = clampView(
            panBy(liveViewRef.current, dx, dy),
            width,
            height,
            sphereBoundsRef.current
          );
          panLastRef.current = { x, y };
          requestComposite();
          scheduleSettle();
        }
        break;
      }
      case "pinch": {
        const ids = pinchIdsRef.current;
        const prev = pinchPrevRef.current;
        if (ids && prev && pointersRef.current.has(ids[0]) && pointersRef.current.has(ids[1])) {
          const p0 = pointersRef.current.get(ids[0])!;
          const p1 = pointersRef.current.get(ids[1])!;
          const next: [[number, number], [number, number]] = [
            [p0.x, p0.y],
            [p1.x, p1.y],
          ];
          const updated = clampView(pinchUpdate(liveViewRef.current, prev, next), width, height, sphereBoundsRef.current);
          liveViewRef.current = updated;
          pinchPrevRef.current = next;
          setViewK(updated.k);
          requestComposite();
          scheduleSettle();
          noteZoomUsed(updated.k);
        }
        break;
      }
      default:
        requestComposite();
    }
  };

  const endPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    pointersRef.current.delete(e.pointerId);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    if (modeRef.current === "paint") {
      if (pointersRef.current.size === 0) {
        const completed = strokeMaskRef.current;
        strokeMaskRef.current = null;
        paintLastRef.current = null;
        modeRef.current = "idle";
        setInteractionMode("idle");
        if (completed) onUpdateMask(completed);
      }
      return;
    }

    if (modeRef.current === "pan") {
      if (pointersRef.current.size === 0) {
        modeRef.current = "idle";
        setInteractionMode("idle");
        panLastRef.current = null;
        scheduleSettle();
      }
      return;
    }

    if (modeRef.current === "pinch" && pointersRef.current.size < 2) {
      modeRef.current = "idle";
      setInteractionMode("idle");
      pinchIdsRef.current = null;
      pinchPrevRef.current = null;
      scheduleSettle();
    }
  };

  const handlePointerLeave = () => {
    setHoverInfo(null);
    hoverLonLatRef.current = null;
    requestComposite();
  };

  // ---------------------------------------------------------------------
  // Derived UI state
  // ---------------------------------------------------------------------

  const showResetButton = viewK > 1.01;

  let cursorStyle: string;
  if (isSolved) cursorStyle = "default";
  else if (interactionMode === "pan") cursorStyle = "grabbing";
  else if (interactionMode === "pinch") cursorStyle = "default";
  else if (tool === "pan" || spaceHeld) cursorStyle = "grab";
  else if (tool === "eraser") cursorStyle = "cell";
  else cursorStyle = "crosshair";

  const ariaLabel = useMemo(() => {
    const zoomPart = viewK > 1.01 ? ` · ${Math.round(viewK * 10) / 10}×` : "";
    if (isSolved) {
      return `${getTranslation(lang, "projectionStamp")}. ${getTranslation(lang, "overlapLegend")}, ${getTranslation(
        lang,
        "overestimateLegend"
      )}, ${getTranslation(lang, "missedLegend")}.${zoomPart}`;
    }
    const hoverPart = hoverInfo ? ` ${hoverInfo.status}.` : "";
    return `${getTranslation(lang, "paintingHintShort")}.${hoverPart}${zoomPart}`;
  }, [isSolved, lang, viewK, hoverInfo]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-lg border border-rule-strong bg-paper-raised shadow-paper"
    >
      {/* Top Legend / Status Bar */}
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-center gap-2 text-[12px] font-semibold pointer-events-none">
        {!isSolved ? (
          <div className="flex items-center gap-1.5 rounded-md bg-paper-raised/90 border border-rule px-2.5 py-1 text-ink-700 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse-subtle" />
            <span>{getTranslation(lang, "paintingHintShort")}</span>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-2 rounded-md bg-paper-raised/90 border border-rule p-1.5 backdrop-blur-sm">
            <div className="flex items-center gap-1 px-1.5 text-paint-overlapInk">
              <span className="h-2.5 w-2.5 rounded-sm bg-paint-overlap" />
              <span>{getTranslation(lang, "overlapLegend")}</span>
            </div>
            <div className="flex items-center gap-1 px-1.5 text-paint-overestimateInk">
              <span className="h-2.5 w-2.5 rounded-sm bg-paint-overestimate" />
              <span>{getTranslation(lang, "overestimateLegend")}</span>
            </div>
            <div className="flex items-center gap-1 px-1.5 text-paint-missedInk">
              <span className="h-2.5 w-2.5 rounded-sm bg-paint-missed" />
              <span>{getTranslation(lang, "missedLegend")}</span>
            </div>
          </div>
        )}
      </div>

      {/* Transient low-zoom fine-brush hint */}
      {showZoomHint && (
        <div className="absolute top-3 left-1/2 z-10 -translate-x-1/2 rounded-md border border-rule bg-paper-raised/92 px-3 py-1.5 text-[12px] font-medium text-ink-700 shadow-paper pointer-events-none">
          {getTranslation(lang, "zoomHint")}
        </div>
      )}

      {/* Hover Coordinates & Diagnostic Tag */}
      {hoverInfo && (
        <div className="absolute bottom-3 left-3 z-10 flex max-w-[calc(100%-1.5rem)] items-center gap-2 whitespace-nowrap rounded-md bg-paper-raised/90 border border-rule px-2.5 py-1 text-[12px] font-mono text-ink-500 backdrop-blur-sm pointer-events-none overflow-hidden">
          <span>
            {hoverInfo.lat >= 0 ? `${hoverInfo.lat}°N` : `${Math.abs(hoverInfo.lat)}°S`},{" "}
            {hoverInfo.lon >= 0 ? `${hoverInfo.lon}°E` : `${Math.abs(hoverInfo.lon)}°W`}
          </span>
          <span className="text-rule-strong">·</span>
          <span className="truncate font-sans font-medium text-ink-700">{hoverInfo.status}</span>
        </div>
      )}

      {/* Projection Name Stamp -- hidden on narrow viewports where it collides
          with the hover coordinate readout / Antarctica (issue #5). */}
      <div className="absolute bottom-3 right-3 z-10 hidden text-[12px] font-mono font-bold uppercase tracking-wider text-ink-500 select-none pointer-events-none sm:block">
        {getTranslation(lang, "projectionStamp")}
      </div>

      {/* Zoom chrome: compact 40x40 button cluster pinned bottom-right,
          inside the map card, clearing the bottom-row chips above (bottom-16). */}
      <div className="absolute bottom-16 right-3 z-10 flex flex-col items-center gap-1">
        {viewK > 1.01 && (
          <span className="rounded-md border border-rule bg-paper-raised/95 px-2 py-1 text-[12px] font-mono text-ink-700 shadow-paper">
            {(Math.round(viewK * 10) / 10).toFixed(1)}×
          </span>
        )}
        {showResetButton && (
          <button
            type="button"
            onClick={resetView}
            aria-label={getTranslation(lang, "resetView")}
            title={getTranslation(lang, "resetView")}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-rule bg-paper-raised/95 text-ink-700 shadow-paper transition-colors hover:bg-paper-raised hover:text-ink-900"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}
        <button
          type="button"
          onClick={() => zoomByStep(1.6)}
          aria-label={getTranslation(lang, "zoomIn")}
          title={getTranslation(lang, "zoomIn")}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-rule bg-paper-raised/95 text-ink-700 shadow-paper transition-colors hover:bg-paper-raised hover:text-ink-900"
        >
          <Plus className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => zoomByStep(1 / 1.6)}
          aria-label={getTranslation(lang, "zoomOut")}
          title={getTranslation(lang, "zoomOut")}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-rule bg-paper-raised/95 text-ink-700 shadow-paper transition-colors hover:bg-paper-raised hover:text-ink-900"
        >
          <Minus className="h-4 w-4" />
        </button>
      </div>

      {/* Canvas Element */}
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={ariaLabel}
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onPointerLeave={handlePointerLeave}
        style={{
          width: "100%",
          height: dimensions.height,
          cursor: cursorStyle,
          touchAction: "none",
        }}
        className="block select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
      />
    </div>
  );
};
