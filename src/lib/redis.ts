import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

// Sanitize env vars: trim and strip BOM characters to prevent Vercel .env parsing issues
const rawUrl = process.env.UPSTASH_REDIS_REST_URL || ''
const rawToken = process.env.UPSTASH_REDIS_REST_TOKEN || ''
const redisUrl = rawUrl.replace(/^\uFEFF/, '').trim()
const redisToken = rawToken.replace(/^\uFEFF/, '').trim()

// Determine if we should mock Redis for local development without keys
const isRedisConfigured = !!redisUrl && !!redisToken && redisUrl.startsWith('https')

export const redis = isRedisConfigured
  ? new Redis({
      url: redisUrl,
      token: redisToken,
    })
  : ({} as Redis) // Fallback empty object if not configured

// Mock rate limiter for local dev
const mockRateLimit = async () => ({
  success: true,
  limit: 10,
  remaining: 9,
  reset: Date.now() + 1000 * 60,
})

// Rate limit: 5 requests per 15 minutes (for login)
export const loginRateLimit = isRedisConfigured
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(5, '15 m'),
      analytics: true,
    })
  : { limit: mockRateLimit }

// Rate limit: 100 requests per 1 minute (for general API)
export const apiRateLimit = isRedisConfigured
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(100, '1 m'),
      analytics: true,
    })
  : { limit: mockRateLimit }
