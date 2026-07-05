import { Resend } from "resend";

// Reads the API key lazily so the app doesn't crash at build/boot time
// if RESEND_API_KEY hasn't been configured yet in the environment.
export function getResendClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export const ENQUIRY_TO_EMAIL =
  process.env.ENQUIRY_TO_EMAIL || "hello@duphaprints.com";
