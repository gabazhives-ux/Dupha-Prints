"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { careersSchema, CareersInput } from "@/lib/validations";
import { jobOpenings } from "@/lib/site-data";
import Button from "@/components/ui/Button";
import { UploadCloud, CheckCircle2 } from "lucide-react";

const inputClass =
  "w-full rounded-2xl border border-ink-950/12 bg-white/70 px-5 py-3.5 text-sm text-ink-950 placeholder:text-ink-950/35 transition-colors focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/30";
const labelClass = "mb-2 block text-xs font-mono uppercase tracking-wider text-ink-950/60";

export default function CareersForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string>("");
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [uploadMessage, setUploadMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CareersInput>({ resolver: zodResolver(careersSchema) });

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadState("uploading");
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) {
        setUploadState("error");
        setUploadMessage(json.error || "Upload failed. You can still apply without attaching a file.");
        return;
      }
      setResumeUrl(json.url);
      setValue("resumeUrl", json.url);
      setUploadState("done");
    } catch {
      setUploadState("error");
      setUploadMessage("Upload failed. You can still apply without attaching a file.");
    }
  }

  async function onSubmit(data: CareersInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, resumeUrl }),
      });
      if (!res.ok) {
        const json = await res.json();
        setServerError(typeof json.error === "string" ? json.error : "Please check the form and try again.");
        return;
      }
      router.push("/thank-you");
    } catch {
      setServerError("Something went wrong. Please try again or call us directly.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">Full name</label>
          <input id="name" className={inputClass} {...register("name")} />
          {errors.name && <p className="mt-1.5 text-xs text-press-red">{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <input id="email" type="email" className={inputClass} {...register("email")} />
          {errors.email && <p className="mt-1.5 text-xs text-press-red">{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">Phone</label>
          <input id="phone" className={inputClass} {...register("phone")} />
          {errors.phone && <p className="mt-1.5 text-xs text-press-red">{errors.phone.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="role">Role you're applying for</label>
          <select id="role" className={inputClass} defaultValue="" {...register("role")}>
            <option value="" disabled>Select a role</option>
            {jobOpenings.map((j) => (
              <option key={j.title} value={j.title}>{j.title}</option>
            ))}
            <option value="General application">General application</option>
          </select>
          {errors.role && <p className="mt-1.5 text-xs text-press-red">{errors.role.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="coverNote">A little about you</label>
        <textarea id="coverNote" rows={5} className={inputClass} placeholder="Relevant experience, why this role, availability…" {...register("coverNote")} />
        {errors.coverNote && <p className="mt-1.5 text-xs text-press-red">{errors.coverNote.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Resume / CV (PDF or Word, max 5MB)</label>
        <label
          htmlFor="resume"
          className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-ink-950/15 bg-white/50 px-5 py-8 text-sm text-ink-950/60 transition-colors hover:border-cyan"
        >
          {uploadState === "done" ? (
            <span className="flex items-center gap-2 text-cyan-dark">
              <CheckCircle2 size={18} /> Resume attached
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <UploadCloud size={18} />
              {uploadState === "uploading" ? "Uploading…" : "Click to upload your resume"}
            </span>
          )}
          <input id="resume" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFile} />
        </label>
        {uploadState === "error" && <p className="mt-1.5 text-xs text-press-red">{uploadMessage}</p>}
      </div>

      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />

      {serverError && (
        <p className="rounded-xl bg-press-red/10 px-4 py-3 text-sm text-press-red">{serverError}</p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Submitting…" : "Submit Application"}
      </Button>
    </form>
  );
}
