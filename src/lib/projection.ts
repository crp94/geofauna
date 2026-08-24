import { geoPath, GeoPath, GeoProjection } from "d3-geo";
import { geoRobinson } from "d3-geo-projection";

export function createRobinsonProjection(
  width: number,
  height: number,
  context?: CanvasRenderingContext2D | null
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
