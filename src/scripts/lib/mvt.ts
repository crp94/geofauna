import { PbfReader } from "pbf";
import { VectorTile } from "@mapbox/vector-tile";

/**
 * Decoded GBIF occurrence density point, in the EPSG:4326 lon/lat plane.
 * `byYear` holds per-year occurrence counts (as reported by the GBIF v2 map
 * density tile's per-year properties); `unknownYear` is the count reported
 * under the "0" (unknown-year) property key.
 */
export type DensityPoint = {
  lon: number;
  lat: number;
  total: number;
  byYear: Map<number, number>;
  unknownYear: number;
};

const OCCURRENCE_LAYER_NAME = "occurrence";
const DEFAULT_EXTENT = 512;
const POINT_GEOMETRY_TYPE = 1; // VectorTileFeature.types[1] === "Point"

function toUint8Array(buf: ArrayBuffer | Buffer): Uint8Array {
  if (typeof Buffer !== "undefined" && Buffer.isBuffer(buf)) {
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  }
  return new Uint8Array(buf as ArrayBuffer);
}

/**
 * Decode a GBIF v2 map/occurrence/density EPSG:4326 MVT tile buffer into
 * lon/lat points with per-year occurrence counts.
 *
 * EPSG:4326 GBIF tile scheme: at zoom z there are 2^(z+1) columns x 2^z rows;
 * each tile spans T = 180 / 2^z degrees. Tile (tx,ty) covers
 * lon in [-180 + tx*T, -180 + (tx+1)*T], lat in [90 - (ty+1)*T, 90 - ty*T].
 * Buffer points (outside the [0, extent) pixel range) are discarded to avoid
 * double-counting occurrences that also appear in the neighboring tile.
 */
export function decodeDensityTile(buf: ArrayBuffer | Buffer, z: number, tx: number, ty: number): DensityPoint[] {
  const points: DensityPoint[] = [];
  const bytes = toUint8Array(buf);
  if (bytes.byteLength === 0) return points;

  const pbf = new PbfReader(bytes);
  const tile = new VectorTile(pbf);
  const layer = tile.layers[OCCURRENCE_LAYER_NAME];
  if (!layer) return points;

  const extent = layer.extent || DEFAULT_EXTENT;
  const T = 180 / Math.pow(2, z);

  for (let i = 0; i < layer.length; i++) {
    const feature = layer.feature(i);
    if (feature.type !== POINT_GEOMETRY_TYPE) continue;

    const geometry = feature.loadGeometry(); // Point[][]; one ring per point/multipoint vertex
    for (const ring of geometry) {
      const p = ring[0];
      if (!p) continue;

      const px = p.x;
      const py = p.y;
      // Discard tile-buffer points to prevent double counting across tile edges.
      if (px < 0 || px >= extent || py < 0 || py >= extent) continue;

      const lon = -180 + tx * T + (px / extent) * T;
      const lat = 90 - ty * T - (py / extent) * T;

      let total = 0;
      let hasTotal = false;
      const byYear = new Map<number, number>();
      let unknownYear = 0;
      let yearSum = 0;

      for (const [key, rawValue] of Object.entries(feature.properties)) {
        const numValue = typeof rawValue === "number" ? rawValue : Number(rawValue);
        if (!Number.isFinite(numValue)) continue;

        if (key === "total") {
          total = numValue;
          hasTotal = true;
          continue;
        }

        if (!/^\d+$/.test(key)) continue; // only numeric (year, or "0" = unknown) keys
        const year = Number(key);

        if (year === 0) {
          unknownYear += numValue;
        } else {
          byYear.set(year, (byYear.get(year) || 0) + numValue);
        }
        yearSum += numValue;
      }

      if (!hasTotal) total = yearSum;

      points.push({ lon, lat, total, byYear, unknownYear });
    }
  }

  return points;
}
