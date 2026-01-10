import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Distributed Rate Limiting using Upstash Redis
 * Works across multiple Vercel instances and edge functions
 */

// Initialize Redis client from environment variables
let redis: Redis | null = null;
let ratelimit: Ratelimit | null = null;

// Only initialize if Redis credentials are available
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '1 m'), // 3 requests per minute per IP
    analytics: true,
    prefix: '@upstash/ratelimit/contact',
  });
}

/**
 * Checks if the request should be rate limited
 * @param identifier - Unique identifier (usually IP address)
 * @returns Object with success status and rate limit info
 */
export async function checkRateLimit(identifier: string): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  pending: Promise<unknown>;
}> {
  // If Upstash is not configured, use simple in-memory fallback
  if (!ratelimit) {
    return fallbackRateLimit(identifier);
  }

  try {
    const result = await ratelimit.limit(identifier);
    return result;
  } catch (error) {
    // If Upstash fails, fall back to in-memory
    console.error('Rate limit error, falling back to in-memory:', error);
    return fallbackRateLimit(identifier);
  }
}

/**
 * Fallback in-memory rate limiting (for development or if Upstash fails)
 * Note: This will reset on each deploy and won't work across multiple instances
 */
const fallbackStore = new Map<
  string,
  { count: number; resetTime: number }
>();

// Cleanup old entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(
    () => {
      const now = Date.now();
      for (const [key, data] of fallbackStore.entries()) {
        if (now > data.resetTime) {
          fallbackStore.delete(key);
        }
      }
    },
    5 * 60 * 1000
  );
}

function fallbackRateLimit(identifier: string): {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  pending: Promise<unknown>;
} {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const limit = 3;

  const data = fallbackStore.get(identifier);

  if (!data || now > data.resetTime) {
    // New window
    fallbackStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });

    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: now + windowMs,
      pending: Promise.resolve(),
    };
  }

  if (data.count >= limit) {
    // Rate limit exceeded
    return {
      success: false,
      limit,
      remaining: 0,
      reset: data.resetTime,
      pending: Promise.resolve(),
    };
  }

  // Increment counter
  data.count++;

  return {
    success: true,
    limit,
    remaining: limit - data.count,
    reset: data.resetTime,
    pending: Promise.resolve(),
  };
}

/**
 * Gets the client IP address from request headers
 * Works with Vercel's x-forwarded-for and x-real-ip headers
 */
export function getClientIP(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }

  return 'unknown';
}
