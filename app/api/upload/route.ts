import { NextRequest, NextResponse } from "next/server";

// Uploads CVs / attachments to Vercel Blob storage.
// Requires the project to be linked to a Vercel Blob store (adds
// BLOB_READ_WRITE_TOKEN automatically). See README "File uploads".
export async function POST(req: NextRequest) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "File storage isn't configured yet. Connect a Vercel Blob store to enable uploads (see README).",
      },
      { status: 501 }
    );
  }

  const { put } = await import("@vercel/blob");

  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "File is too large. Maximum size is 5MB." },
      { status: 400 }
    );
  }

  const allowed = ["application/pdf", "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json(
      { error: "Please upload a PDF or Word document." },
      { status: 400 }
    );
  }

  const blob = await put(`resumes/${Date.now()}-${file.name}`, file, {
    access: "public",
  });

  return NextResponse.json({ url: blob.url });
}
