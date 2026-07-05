"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteSchema, QuoteInput } from "@/lib/validations";
import { services } from "@/lib/site-data";
import Button from "@/components/ui/Button";

const budgets = ["Under ₦100,000", "₦100,000 – ₦500,000", "₦500,000 – ₦2,000,000", "₦2,000,000+"];
const timelines = ["Within a week", "2–4 weeks", "1–3 months", "Flexible / ongoing"];

const inputClass =
  "w-full rounded-2xl border border-ink-950/12 bg-white/70 px-5 py-3.5 text-sm text-ink-950 placeholder:text-ink-950/35 transition-colors focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/30";
const labelClass = "mb-2 block text-xs font-mono uppercase tracking-wider text-ink-950/60";

export default function QuoteForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput>({ resolver: zodResolver(quoteSchema) });

  async function onSubmit(data: QuoteInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(
          typeof json.error === "string" ? json.error : "Please check the form and try again."
        );
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
          <input id="name" className={inputClass} placeholder="Ada Lovelace" {...register("name")} />
          {errors.name && <p className="mt-1.5 text-xs text-press-red">{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="company">Company (optional)</label>
          <input id="company" className={inputClass} placeholder="Your business name" {...register("company")} />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">Email</label>
          <input id="email" type="email" className={inputClass} placeholder="you@email.com" {...register("email")} />
          {errors.email && <p className="mt-1.5 text-xs text-press-red">{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="phone">Phone</label>
          <input id="phone" className={inputClass} placeholder="0801 234 5678" {...register("phone")} />
          {errors.phone && <p className="mt-1.5 text-xs text-press-red">{errors.phone.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="service">Service</label>
          <select id="service" className={inputClass} defaultValue="" {...register("service")}>
            <option value="" disabled>Select a service</option>
            {services.map((s) => (
              <option key={s.code} value={s.title}>{s.title}</option>
            ))}
          </select>
          {errors.service && <p className="mt-1.5 text-xs text-press-red">{errors.service.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="budget">Budget range</label>
          <select id="budget" className={inputClass} defaultValue="" {...register("budget")}>
            <option value="" disabled>Select a range</option>
            {budgets.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          {errors.budget && <p className="mt-1.5 text-xs text-press-red">{errors.budget.message}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="timeline">Timeline</label>
          <select id="timeline" className={inputClass} defaultValue="" {...register("timeline")}>
            <option value="" disabled>Select a timeline</option>
            {timelines.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.timeline && <p className="mt-1.5 text-xs text-press-red">{errors.timeline.message}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="message">Tell us about the job</label>
          <textarea
            id="message"
            rows={5}
            className={inputClass}
            placeholder="Quantities, sizes, artwork status, deadline — the more detail, the faster we can quote."
            {...register("message")}
          />
          {errors.message && <p className="mt-1.5 text-xs text-press-red">{errors.message.message}</p>}
        </div>
      </div>

      {/* Honeypot field — invisible to people, tempting to bots */}
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />

      {serverError && (
        <p className="rounded-xl bg-press-red/10 px-4 py-3 text-sm text-press-red">{serverError}</p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Sending…" : "Send Enquiry"}
      </Button>
      <p className="text-xs text-ink-950/45">
        Protected against spam. We reply within one business day, or immediately during our 24-hour lines Mon–Sat.
      </p>
    </form>
  );
}
