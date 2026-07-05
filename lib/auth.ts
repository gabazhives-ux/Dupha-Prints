import { cookies } from "next/headers";
import crypto from "crypto";

// Lightweight session helper for the admin dashboard.
// This is intentionally simple (single admin user, signed cookie) so the
// project runs without extra infrastructure. Swap for next-auth /
// Auth.js with a real user table if you need multiple admin accounts,
// roles, or OAuth sign-in later.

const COOKIE_NAME = "dupha_admin_session";

function sign(value: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export function createSessionCookieValue() {
  const secret = process.env.SESSION_SECRET || "dev-secret-change-me";
  const payload = `admin:${Date.now()}`;
  const signature = sign(payload, secret);
  return `${Buffer.from(payload).toString("base64")}.${signature}`;
}

export function verifySessionCookieValue(value: string | undefined) {
  if (!value) return false;
  const secret = process.env.SESSION_SECRET || "dev-secret-change-me";
  const [encodedPayload, signature] = value.split(".");
  if (!encodedPayload || !signature) return false;
  const payload = Buffer.from(encodedPayload, "base64").toString("utf8");
  const expected = sign(payload, secret);
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export function getIsAdminAuthenticated() {
  const cookieStore = cookies();
  return verifySessionCookieValue(cookieStore.get(COOKIE_NAME)?.value);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
