import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { isRateLimited } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(`newsletter:${ip}`, 10, 60_000)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429 }
    );
  }

  const body = await req.json();
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  if (parsed.data.website) return NextResponse.json({ ok: true });

  try {
    await prisma.newsletterSubscriber.create({
      data: { email: parsed.data.email },
    });
  } catch (err: any) {
    // Unique constraint — already subscribed. Treat as success.
    if (err?.code !== "P2002") throw err;
  }

  return NextResponse.json({ ok: true });
}
