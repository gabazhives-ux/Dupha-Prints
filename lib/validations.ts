import { z } from "zod";

// Shared honeypot field: real users never fill this in. Bots that
// auto-fill every field will trip it, and we silently drop the submission.
const honeypot = z.string().max(0).optional().or(z.literal(""));

export const quoteSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  company: z.string().optional(),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  service: z.string().min(1, "Select a service"),
  budget: z.string().min(1, "Select a budget range"),
  timeline: z.string().min(1, "Select a timeline"),
  message: z.string().min(10, "Tell us a little more about the job"),
  website: honeypot,
});
export type QuoteInput = z.infer<typeof quoteSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message is a little short"),
  website: honeypot,
});
export type ContactInput = z.infer<typeof contactSchema>;

export const careersSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  role: z.string().min(1, "Select a role"),
  coverNote: z.string().min(10, "Add a short note about yourself"),
  resumeUrl: z.string().url().optional().or(z.literal("")),
  website: honeypot,
});
export type CareersInput = z.infer<typeof careersSchema>;

export const partnershipSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  organisation: z.string().min(2, "Enter your organisation name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  partnershipType: z.string().min(1, "Select a partnership type"),
  message: z.string().min(10, "Tell us about the collaboration"),
  website: honeypot,
});
export type PartnershipInput = z.infer<typeof partnershipSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  website: honeypot,
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;
