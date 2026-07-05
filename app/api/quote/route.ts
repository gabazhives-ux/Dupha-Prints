import { NextRequest, NextResponse } from "next/server";
import { quoteSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { getResendClient, ENQUIRY_TO_EMAIL } from "@/lib/resend";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(`quote:${ip}`)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  const body = await req.json();
  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Honeypot tripped — pretend success so bots don't learn anything.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { website, ...data } = parsed.data;

  const record = await prisma.quoteRequest.create({ data });

  const resend = getResendClient();
  if (resend) {
    await resend.emails.send({
      from: "Dupha Prints <no-reply@duphaprints.com>",
      to: ENQUIRY_TO_EMAIL,
      subject: `New quote request — ${data.service}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Company:</strong> ${data.company || "—"}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Budget:</strong> ${data.budget}</p>
        <p><strong>Timeline:</strong> ${data.timeline}</p>
        <p><strong>Message:</strong><br/>${data.message}</p>
      `,
    });

    await resend.emails.send({
      from: "Dupha Prints <hello@duphaprints.com>",
      to: data.email,
      subject: "We've received your quote request — Dupha Prints",
      html: `
        <p>Hi ${data.name},</p>
        <p>Thanks for reaching out to Dupha Prints. We've received your request for
        <strong>${data.service}</strong> and a member of our team will be in touch shortly
        with pricing and next steps.</p>
        <p>If it's urgent, call us directly on 0701 802 2691 — we're open 24 hours,
        Monday to Saturday.</p>
        <p>— The Dupha Prints Team</p>
      `,
    });
  }

  return NextResponse.json({ ok: true, id: record.id });
}
