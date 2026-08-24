// Server-only storage backend for anonymous daily-aggregate stats.
//
// Env vars (all optional — the feature degrades gracefully when absent):
//   UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
//     Preferred. Standard Upstash Redis REST credentials.
//   KV_REST_API_URL / KV_REST_API_TOKEN
//     Legacy alias used by Vercel KV's default integration env vars — mapped
//     onto the UPSTASH_ names below when the latter are absent.
//   DAILY_STATS_SALT
//     Optional pepper mixed into the rate-limit key hash (see the
//     daily-score API route). Not read in this file.
//   NEXT_PUBLIC_DAILY_STATS
//     Feature flag read on the client (see src/lib/dailyStats.ts).
//
// Data model: one Redis hash per day, key `daily:{day}`, fields `b0`..`b19`
// (per-band submission counts) and `n` (total submissions), expiring after
// 40 days. Rate limiting uses a plain counter key `rl:{key}` expiring after
// 48 hours.

import { Redis } from "@upstash/redis";
import { BAND_COUNT } from "../dailyStatsShared";

export interface DailyStatsStore {
  increment(day: string, band: number): Promise<void>;
  read(day: string): Promise<{ histogram: number[]; total: number } | null>;
  hitRateLimit(key: string): Promise<boolean>;
}

const DAILY_TTL_SECONDS = 40 * 86400;
const RATE_LIMIT_TTL_SECONDS = 48 * 60 * 60;
const RATE_LIMIT_MAX_HITS = 10;

function dailyKey(day: string): string {
  return `daily:${day}`;
}

class RedisStore implements DailyStatsStore {
  constructor(private readonly redis: Redis) {}

  async increment(day: string, band: number): Promise<void> {
    const key = dailyKey(day);
    await this.redis
      .pipeline()
      .hincrby(key, `b${band}`, 1)
      .hincrby(key, "n", 1)
      .expire(key, DAILY_TTL_SECONDS)
      .exec();
  }

  async read(day: string): Promise<{ histogram: number[]; total: number } | null> {
    const key = dailyKey(day);
    const data = await this.redis.hgetall<Record<string, string | number>>(key);
    if (!data) return null;

    const histogram: number[] = [];
    for (let i = 0; i < BAND_COUNT; i += 1) {
      const raw = data[`b${i}`];
      const value = typeof raw === "number" ? raw : Number(raw ?? 0);
      histogram.push(Number.isFinite(value) ? value : 0);
    }

    const rawTotal = data.n;
    const parsedTotal = typeof rawTotal === "number" ? rawTotal : Number(rawTotal ?? NaN);
    const total = Number.isFinite(parsedTotal)
      ? parsedTotal
      : histogram.reduce((sum, count) => sum + count, 0);

    return { histogram, total };
  }

  async hitRateLimit(key: string): Promise<boolean> {
    const rlKey = `rl:${key}`;
    const count = await this.redis.incr(rlKey);
    if (count === 1) {
      await this.redis.expire(rlKey, RATE_LIMIT_TTL_SECONDS);
    }
    return count > RATE_LIMIT_MAX_HITS;
  }
}

class MemoryStore implements DailyStatsStore {
  // Module-scope state — persists for the life of the `next dev` process.
  // Not shared across serverless invocations; fine for local development only.
  private readonly hashes = new Map<string, { histogram: number[]; total: number }>();
  private readonly rateLimits = new Map<string, number>();

  async increment(day: string, band: number): Promise<void> {
    const key = dailyKey(day);
    const existing = this.hashes.get(key) ?? { histogram: new Array(BAND_COUNT).fill(0), total: 0 };
    existing.histogram[band] += 1;
    existing.total += 1;
    this.hashes.set(key, existing);
  }

  async read(day: string): Promise<{ histogram: number[]; total: number } | null> {
    const key = dailyKey(day);
    const existing = this.hashes.get(key);
    if (!existing) return null;
    return { histogram: [...existing.histogram], total: existing.total };
  }

  async hitRateLimit(key: string): Promise<boolean> {
    const rlKey = `rl:${key}`;
    const count = (this.rateLimits.get(rlKey) ?? 0) + 1;
    this.rateLimits.set(rlKey, count);
    return count > RATE_LIMIT_MAX_HITS;
  }
}

let cachedStore: DailyStatsStore | null | undefined;

function resolveRedisEnv(): void {
  if (!process.env.UPSTASH_REDIS_REST_URL && process.env.KV_REST_API_URL) {
    process.env.UPSTASH_REDIS_REST_URL = process.env.KV_REST_API_URL;
  }
  if (!process.env.UPSTASH_REDIS_REST_TOKEN && process.env.KV_REST_API_TOKEN) {
    process.env.UPSTASH_REDIS_REST_TOKEN = process.env.KV_REST_API_TOKEN;
  }
}

/**
 * Returns the shared store instance, or null when no backend is available
 * (no Redis credentials configured, and not running in a dev environment
 * where an in-memory fallback is acceptable).
 */
export function getStore(): DailyStatsStore | null {
  if (cachedStore !== undefined) return cachedStore;

  resolveRedisEnv();

  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    cachedStore = new RedisStore(Redis.fromEnv());
    return cachedStore;
  }

  if (process.env.NODE_ENV !== "production") {
    cachedStore = new MemoryStore();
    return cachedStore;
  }

  cachedStore = null;
  return cachedStore;
}
