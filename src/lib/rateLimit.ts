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

export function checkRateLimit(ip: string, maxRequests = 5, windowMs = 60000): boolean {
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
    return true;
  }

  if (entry.count >= maxRequests) {
    return false;
  }

  entry.count++;
  return true;
}
