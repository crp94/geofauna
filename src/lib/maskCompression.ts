export const GRID_WIDTH = 360;
export const GRID_HEIGHT = 180;
export const TOTAL_CELLS = GRID_WIDTH * GRID_HEIGHT;

/**
 * Convert (lon, lat) in degrees to grid (x, y) index.
 * lon: [-180, 180) -> x: [0, 359]
 * lat: [-90, 90]   -> y: [0, 179] (where y=0 is North Pole 90N, y=179 is South Pole 90S)
 */
export function lonLatToGrid(lon: number, lat: number): [number, number] {
  let normLon = ((lon + 180) % 360 + 360) % 360;
  let x = Math.min(GRID_WIDTH - 1, Math.max(0, Math.floor(normLon)));
  let clampedLat = Math.min(90, Math.max(-90, lat));
  let y = Math.min(GRID_HEIGHT - 1, Math.max(0, Math.floor(90 - clampedLat)));
  return [x, y];
}

/**
 * Convert grid (x, y) to cell center (lon, lat) in degrees.
 */
export function gridToLonLat(x: number, y: number): [number, number] {
  const lon = x - 180 + 0.5;
  const lat = 90 - y - 0.5;
  return [lon, lat];
}

/**
 * Approximate area of a 1x1 degree grid cell at given y index (latitude) in km^2.
 * Total Earth surface area is ~510,072,000 km^2.
 */
export function getCellAreaKm2(y: number): number {
  const lat = 90 - y - 0.5;
  const rad = (lat * Math.PI) / 180;
  // Area of spherical 1°x1° trapezoid: (R^2) * dLon * (sin(lat2) - sin(lat1))
  const R = 6371; // Earth radius in km
  const latRad1 = ((90 - y) * Math.PI) / 180;
  const latRad2 = ((89 - y) * Math.PI) / 180;
  const dLonRad = (1 * Math.PI) / 180;
  return Math.abs(R * R * dLonRad * (Math.sin(latRad1) - Math.sin(latRad2)));
}

/**
 * Run-Length Encode a Uint8Array of size 360*180.
 * Output format: "value,count,count,count..." where starting value is 0 or 1,
 * followed by alternating counts of 0s and 1s.
 */
export function encodeRle(mask: Uint8Array): string {
  if (mask.length === 0) return "";
  const counts: number[] = [];
  let currentVal = mask[0];
  let currentCount = 0;

  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === currentVal) {
      currentCount++;
    } else {
      counts.push(currentCount);
      currentVal = mask[i];
      currentCount = 1;
    }
  }
  counts.push(currentCount);

  return `${mask[0]}:${counts.join(",")}`;
}

/**
 * Decode RLE string into a Uint8Array of size 360*180.
 */
export function decodeRle(rle: string): Uint8Array {
  const mask = new Uint8Array(TOTAL_CELLS);
  if (!rle) return mask;

  const colonIdx = rle.indexOf(":");
  if (colonIdx === -1) return mask;

  let currentVal = parseInt(rle.slice(0, colonIdx), 10);
  const countsStr = rle.slice(colonIdx + 1);
  if (!countsStr) return mask;

  const counts = countsStr.split(",");
  let offset = 0;

  for (let i = 0; i < counts.length; i++) {
    const count = parseInt(counts[i], 10);
    if (isNaN(count)) continue;

    if (currentVal === 1) {
      for (let j = 0; j < count && offset + j < TOTAL_CELLS; j++) {
        mask[offset + j] = 1;
      }
    }
    offset += count;
    currentVal = currentVal === 1 ? 0 : 1;
  }

  return mask;
}

/**
 * Great-circle distance between two points in kilometers (Haversine formula).
 */
export function haversineDistanceKm(
  lon1: number,
  lat1: number,
  lon2: number,
  lat2: number
): number {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Paint a geodesic circle of radius radiusKm centered at (centerLon, centerLat)
 * into a target mask Uint8Array.
 * If landMask is provided and snapToLand is true, only land cells will be set to 1.
 */
export function paintGeodesicCircle(
  mask: Uint8Array,
  centerLon: number,
  centerLat: number,
  radiusKm: number,
  value: 0 | 1 = 1,
  landMask?: Uint8Array,
  snapToLand: boolean = true
): void {
  const [cx, cy] = lonLatToGrid(centerLon, centerLat);

  // Bounding box approximation in degrees
  const latDelta = Math.ceil(radiusKm / 111);
  const cosLat = Math.max(0.1, Math.cos((centerLat * Math.PI) / 180));
  const lonDelta = Math.ceil(radiusKm / (111 * cosLat));

  const minX = Math.max(0, cx - lonDelta);
  const maxX = Math.min(GRID_WIDTH - 1, cx + lonDelta);
  const minY = Math.max(0, cy - latDelta);
  const maxY = Math.min(GRID_HEIGHT - 1, cy + latDelta);

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const idx = y * GRID_WIDTH + x;

      if (value === 1 && snapToLand && landMask && landMask[idx] === 0) {
        continue;
      }

      const [lon, lat] = gridToLonLat(x, y);
      const dist = haversineDistanceKm(centerLon, centerLat, lon, lat);

      if (dist <= radiusKm) {
        mask[idx] = value;
      }
    }
  }
}
