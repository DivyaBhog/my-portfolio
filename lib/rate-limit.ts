import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const LIMIT = 5;
const WINDOW = "10 m";
const WINDOW_MS = 10 * 60 * 1000;

export interface RateLimitResult {
  success: boolean;
  /** Unix ms timestamp when the window resets. */
  reset: number;
}

/**
 * Production: Upstash Redis (shared across serverless instances). Accepts the
 * variable names from both the Upstash and the Vercel Marketplace integrations.
 * Fallback: per-instance memory, which is only a best-effort guard because
 * serverless instances don't share state.
 */
const redisUrl = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

const upstash =
  redisUrl && redisToken
    ? new Ratelimit({
        redis: new Redis({ url: redisUrl, token: redisToken }),
        limiter: Ratelimit.slidingWindow(LIMIT, WINDOW),
        prefix: "portfolio:contact",
      })
    : null;

let warned = false;

const memory = new Map<string, { count: number; reset: number }>();

function memoryLimit(key: string): RateLimitResult {
  const now = Date.now();
  const entry = memory.get(key);

  if (!entry || entry.reset <= now) {
    // Opportunistic cleanup so the map can't grow without bound.
    if (memory.size > 1000) {
      for (const [k, v] of memory) if (v.reset <= now) memory.delete(k);
    }
    const reset = now + WINDOW_MS;
    memory.set(key, { count: 1, reset });
    return { success: true, reset };
  }

  entry.count += 1;
  return { success: entry.count <= LIMIT, reset: entry.reset };
}

export async function rateLimit(identifier: string): Promise<RateLimitResult> {
  if (upstash) {
    try {
      const { success, reset } = await upstash.limit(identifier);
      return { success, reset };
    } catch (error) {
      console.error("[contact] Upstash rate limit failed, falling back to memory", error);
    }
  } else if (!warned && process.env.NODE_ENV === "production") {
    warned = true;
    console.warn(
      "[contact] Upstash Redis is not configured; using in-memory rate limiting, which is not shared between serverless instances.",
    );
  }
  return memoryLimit(identifier);
}

export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip") || "unknown";
}
