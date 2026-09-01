const rateMap = new Map<string, { count: number; resetAt: number }>();
const MAX_ENTRIES = 10000;

// Cleanup expired entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateMap) {
      if (now > entry.resetAt) {
        rateMap.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterMs?: number;
  remaining?: number;
}

export function checkRateLimit(ip: string, maxRequests = 5, windowMs = 60000): boolean {
  return checkRateLimitWithInfo(ip, maxRequests, windowMs).allowed;
}

export function checkRateLimitWithInfo(ip: string, maxRequests = 5, windowMs = 60000): RateLimitResult {
  const now = Date.now();

  // Evict oldest entries if map is too large
  if (rateMap.size > MAX_ENTRIES) {
    const oldestKeys = [...rateMap.entries()]
      .sort((a, b) => a[1].resetAt - b[1].resetAt)
      .slice(0, Math.floor(MAX_ENTRIES * 0.2))
      .map(([key]) => key);
    oldestKeys.forEach((key) => rateMap.delete(key));
  }

  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, retryAfterMs: entry.resetAt - now, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count };
}

// Note: In serverless (Vercel) this Map is per-instance and resets on cold start.
// For strict global limiting, replace with Upstash Redis or similar edge store.
