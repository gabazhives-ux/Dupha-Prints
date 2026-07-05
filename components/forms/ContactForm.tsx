"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, ContactInput } from "@/lib/validations";
import Button from "@/components/ui/Button";

const inputClass =
  "w-full rounded-2xl border border-ink-950/12 bg-white/70 px-5 py-3.5 text-sm text-ink-950 placeholder:text-ink-950/35 transition-colors focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/30";
const labelClass = "mb-2 block text-xs font-mono uppercase tracking-wider text-ink-950/60";

export default function ContactForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(data: ContactInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
      <div>
        <label className={labelClass} htmlFor="name">Full name</label>
        <input id="name" className={inputClass} placeholder="Your name" {...register("name")} />
        {errors.name && <p className="mt-1.5 text-xs text-press-red">{errors.name.message}</p>}
      </div>
      <div>
        <label className={labelClass} htmlFor="email">Email</label>
        <input id="email" type="email" className={inputClass} placeholder="you@email.com" {...register("email")} />
        {errors.email && <p className="mt-1.5 text-xs text-press-red">{errors.email.message}</p>}
      </div>
      <div>
        <label className={labelClass} htmlFor="phone">Phone (optional)</label>
        <input id="phone" className={inputClass} placeholder="0801 234 5678" {...register("phone")} />
      </div>
      <div>
        <label className={labelClass} htmlFor="message">Message</label>
        <textarea id="message" rows={5} className={inputClass} placeholder="How can we help?" {...register("message")} />
        {errors.message && <p className="mt-1.5 text-xs text-press-red">{errors.message.message}</p>}
      </div>

      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />

      {serverError && (
        <p className="rounded-xl bg-press-red/10 px-4 py-3 text-sm text-press-red">{serverError}</p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
