import { geoPath, GeoPath, GeoProjection } from "d3-geo";
import { geoRobinson } from "d3-geo-projection";
import { ViewTransform } from "./viewTransform";

/**
 * Builds the Robinson projection used throughout the map.
 *
 * `view`, when provided, bakes a ViewTransform's zoom/pan affine directly
 * into the projection's own scale/translate so that `projection(p)` yields
 * SCREEN coordinates for that view directly (screen = k*base + (tx,ty)),
 * rather than the fixed k=1 BASE coordinates. This is used only for crisp
 * settled-view rendering of vector paths (land/graticule), where baking the
 * zoom into the projection itself lets d3's adaptive resampling produce
 * enough vertices for smooth curves at high zoom -- re-scaling a k=1
 * path via a canvas transform alone would leave curves visibly faceted at
 * 32x zoom. Every other consumer (mask/reveal cell geometry, hit-testing,
 * culling) intentionally keeps using the fixed k=1 base projection and
 * applies the ViewTransform separately (see viewTransform.ts /
 * mapRenderer.ts) so cached per-cell geometry never needs to be rebuilt on
 * zoom/pan, only on resize.
 *
 * Omitting `view` (or passing undefined/IDENTITY) reproduces the exact
 * previous 3-arg behavior byte-for-byte.
 */
export function createRobinsonProjection(
  width: number,
  height: number,
  context?: CanvasRenderingContext2D | null,
  view?: ViewTransform
): {
  projection: GeoProjection;
  pathGenerator: GeoPath;
} {
  // Robinson projection standard bounding aspect ratio is approx 2.05:1
  const padding = Math.max(10, Math.min(width, height) * 0.03);
  const mapWidth = Math.max(100, width - padding * 2);
  const mapHeight = Math.max(50, height - padding * 2);

  const projection = geoRobinson()
    .rotate([0, 0, 0])
    .fitSize([mapWidth, mapHeight], {
      type: "Sphere",
    })
    .translate([width / 2, height / 2]);

  if (view && (view.k !== 1 || view.tx !== 0 || view.ty !== 0)) {
    // Derivation: base screen coords are S*raw(p)+T for the projection's own
    // scale S and translate T=[width/2,height/2]. We want the new
    // projection to output k*(S*raw(p)+T)+(tx,ty) = (k*S)*raw(p) +
    // (k*T+(tx,ty)) -- i.e. multiply scale by k and set translate to
    // k*[width/2,height/2] + [tx,ty].
    const baseScale = projection.scale();
    projection
      .scale(baseScale * view.k)
      .translate([(width / 2) * view.k + view.tx, (height / 2) * view.k + view.ty]);
  }

  const pathGenerator = context
    ? geoPath(projection, context)
    : geoPath().projection(projection);

  return {
    projection,
    pathGenerator,
  };
}

/**
 * Helper to invert screen pixel coordinates (x, y) into spherical [lon, lat]
 */
export function screenToLonLat(
  projection: GeoProjection,
  screenX: number,
  screenY: number
): [number, number] | null {
  try {
    const inverted = projection.invert?.([screenX, screenY]);
    if (!inverted || isNaN(inverted[0]) || isNaN(inverted[1])) {
      return null;
    }
    return [inverted[0], inverted[1]];
  } catch {
    return null;
  }
}

/**
 * Helper to project spherical [lon, lat] into screen pixel coordinates [x, y]
 */
export function lonLatToScreen(
  projection: GeoProjection,
  lon: number,
  lat: number
): [number, number] | null {
  try {
    const coords = projection([lon, lat]);
    if (!coords || isNaN(coords[0]) || isNaN(coords[1])) {
      return null;
    }
    return [coords[0], coords[1]];
  } catch {
    return null;
  }
}
