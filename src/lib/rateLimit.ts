import { NextRequest } from "next/server";
const map = new Map<string, { count: number; resetAt: number }>();
export function rateLimit(req: NextRequest, limit: number, windowMs = 60_000): boolean {
  const ip = req.headers.get("x-forwarded-for") ?? "anon";
  const now = Date.now();
  const entry = map.get(ip);
  if (!entry || now > entry.resetAt) { map.set(ip, { count: 1, resetAt: now + windowMs }); return true; }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}
