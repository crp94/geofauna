// Anonymous daily-score submission endpoint. Feature-flagged: when no
// storage backend is configured (see src/lib/server/dailyStatsStore.ts),
// this responds 503 so the client can silently no-op and the game stays
// fully playable without a backend.
//
// Env vars: UPSTASH_REDIS_REST_URL/TOKEN or KV_REST_API_URL/TOKEN (storage),
// DAILY_STATS_SALT (optional pepper for the rate-limit key hash).

import { getStore } from "../../../lib/server/dailyStatsStore";
import { validateSubmission } from "../../../lib/dailyStatsShared";

export const runtime = "edge";

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request: Request): Promise<Response> {
  try {
    const store = getStore();
    if (!store) {
      return json({ ok: false, disabled: true }, 503);
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return json({ ok: false, error: "invalid json" }, 400);
    }

    const result = validateSubmission(body, Date.now());
    if (!result.ok) {
      return json({ ok: false, error: result.error }, 400);
    }

    const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
    const clientIp = forwardedFor.split(",")[0]?.trim() || "unknown";
    const salt = process.env.DAILY_STATS_SALT ?? "geofauna";
    const ipHash = await sha256Hex(`${clientIp}${salt}`);
    const rateLimitKey = `${ipHash}:${result.day}`;

    const limited = await store.hitRateLimit(rateLimitKey);
    if (limited) {
      return json({ ok: false, error: "rate limited" }, 429);
    }

    await store.increment(result.day, result.band);
    return new Response(null, { status: 204 });
  } catch {
    return json({ ok: false }, 500);
  }
}

export async function GET(): Promise<Response> {
  return json({ ok: false, error: "method not allowed" }, 405);
}
