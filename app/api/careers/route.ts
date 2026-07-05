import { NextRequest, NextResponse } from "next/server";
import { careersSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { getResendClient, ENQUIRY_TO_EMAIL } from "@/lib/resend";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(`careers:${ip}`)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  const body = await req.json();
  const parsed = careersSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  if (parsed.data.website) return NextResponse.json({ ok: true });

  const { website, ...data } = parsed.data;
  const record = await prisma.careersApplication.create({ data });

  const resend = getResendClient();
  if (resend) {
    await resend.emails.send({
      from: "Dupha Prints <no-reply@duphaprints.com>",
      to: ENQUIRY_TO_EMAIL,
      subject: `New application — ${data.role}`,
      html: `<p><strong>Name:</strong> ${data.name}</p>
             <p><strong>Email:</strong> ${data.email}</p>
             <p><strong>Phone:</strong> ${data.phone}</p>
             <p><strong>Role:</strong> ${data.role}</p>
             <p><strong>Resume:</strong> ${data.resumeUrl || "Not provided"}</p>
             <p><strong>Cover note:</strong><br/>${data.coverNote}</p>`,
    });
    await resend.emails.send({
      from: "Dupha Prints <hello@duphaprints.com>",
      to: data.email,
      subject: "Your application to Dupha Prints",
      html: `<p>Hi ${data.name},</p><p>Thanks for applying for ${data.role}. Our team reviews every application and will reach out if there's a fit.</p><p>— The Dupha Prints Team</p>`,
    });
  }

  return NextResponse.json({ ok: true, id: record.id });
}
