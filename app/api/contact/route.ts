import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { getResendClient, ENQUIRY_TO_EMAIL } from "@/lib/resend";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(`contact:${ip}`)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  const body = await req.json();
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  if (parsed.data.website) return NextResponse.json({ ok: true });

  const { website, ...data } = parsed.data;
  const record = await prisma.contactMessage.create({ data });

  const resend = getResendClient();
  if (resend) {
    await resend.emails.send({
      from: "Dupha Prints <no-reply@duphaprints.com>",
      to: ENQUIRY_TO_EMAIL,
      subject: `New contact message from ${data.name}`,
      html: `<p><strong>Name:</strong> ${data.name}</p>
             <p><strong>Email:</strong> ${data.email}</p>
             <p><strong>Phone:</strong> ${data.phone || "—"}</p>
             <p><strong>Message:</strong><br/>${data.message}</p>`,
    });
    await resend.emails.send({
      from: "Dupha Prints <hello@duphaprints.com>",
      to: data.email,
      subject: "Thanks for contacting Dupha Prints",
      html: `<p>Hi ${data.name},</p><p>We've received your message and will reply within one business day. For urgent jobs, call 0701 802 2691.</p><p>— The Dupha Prints Team</p>`,
    });
  }

  return NextResponse.json({ ok: true, id: record.id });
}
