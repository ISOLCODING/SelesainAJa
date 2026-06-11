import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Sanitize env vars: trim and strip BOM characters to prevent Vercel .env parsing issues
const rawUrl = process.env.UPSTASH_REDIS_REST_URL || "";
const rawToken = process.env.UPSTASH_REDIS_REST_TOKEN || "";
const redisUrl = rawUrl.replace(/^\uFEFF/, "").trim();
const redisToken = rawToken.replace(/^\uFEFF/, "").trim();

// Only initialize if the URL and Token are present and valid, otherwise fallback gracefully
const hasRedisConfig = !!redisUrl && !!redisToken && redisUrl.startsWith("https");

// Create a new ratelimiter, that allows 10 requests per 10 seconds
// We use a caching mechanism (ephemeralCache) to speed up responses
export const rateLimiter = hasRedisConfig
  ? new Ratelimit({
      redis: new Redis({ url: redisUrl, token: redisToken }),
      limiter: Ratelimit.slidingWindow(150, "10 s"),
      analytics: true,
      ephemeralCache: new Map(),
    })
  : null;
