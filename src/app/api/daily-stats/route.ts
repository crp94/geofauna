// Anonymous daily-aggregate stats read endpoint. Feature-flagged: when no
// storage backend is configured (see src/lib/server/dailyStatsStore.ts),
// this responds 503 so the client silently renders nothing.
//
// Env vars: UPSTASH_REDIS_REST_URL/TOKEN or KV_REST_API_URL/TOKEN (storage).

import { getStore } from "../../../lib/server/dailyStatsStore";
import { BAND_COUNT, isValidDay } from "../../../lib/dailyStatsShared";

export const runtime = "edge";

function json(body: unknown, status: number, headers?: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });
}

export async function GET(request: Request): Promise<Response> {
  try {
    const store = getStore();
    if (!store) {
      return json({ ok: false, disabled: true }, 503);
    }

    const day = new URL(request.url).searchParams.get("day") ?? "";
    if (!isValidDay(day)) {
      return json({ ok: false, error: "invalid day" }, 400);
    }

    const result = await store.read(day);
    const histogram = result?.histogram ?? new Array(BAND_COUNT).fill(0);
    const totalPlayers = result?.total ?? 0;

    return json(
      { day, totalPlayers, histogram },
      200,
      { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" }
    );
  } catch {
    return json({ ok: false }, 500);
  }
}
