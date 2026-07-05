// Minimal in-memory rate limiter. Good enough for a single serverless
// instance / low traffic. For production at scale, swap this for
// Upstash Redis or Vercel's built-in rate limiting so limits are shared
// across all function instances.
const hits = new Map<string, { count: number; resetAt: number }>();

export function isRateLimited(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  entry.count += 1;
  if (entry.count > limit) return true;
  return false;
}
