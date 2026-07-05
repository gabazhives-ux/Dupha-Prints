"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { partnershipSchema, PartnershipInput } from "@/lib/validations";
import Button from "@/components/ui/Button";

const types = [
  "Corporate Partnership",
  "Business Collaboration",
  "Reseller Opportunity",
  "Other",
];

const inputClass =
  "w-full rounded-2xl border border-ink-950/12 bg-white/70 px-5 py-3.5 text-sm text-ink-950 placeholder:text-ink-950/35 transition-colors focus:border-cyan focus:outline-none focus:ring-2 focus:ring-cyan/30";
const labelClass = "mb-2 block text-xs font-mono uppercase tracking-wider text-ink-950/60";

export default function PartnershipForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PartnershipInput>({ resolver: zodResolver(partnershipSchema) });

  async function onSubmit(data: PartnershipInput) {
    setServerError(null);
    try {
      const res = await fetch("/api/partnership", {
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">Contact name</label>
          <input id="name" className={inputClass} {...register("name")} />
          {errors.name && <p className="mt-1.5 text-xs text-press-red">{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="organisation">Organisation</label>
          <input id="organisation" className={inputClass} {...register("organisation")} />
          {errors.organisation && <p className="mt-1.5 text-xs text-press-red">{errors.organisation.message}</p>}
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
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="partnershipType">Type of partnership</label>
          <select id="partnershipType" className={inputClass} defaultValue="" {...register("partnershipType")}>
            <option value="" disabled>Select a type</option>
            {types.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.partnershipType && <p className="mt-1.5 text-xs text-press-red">{errors.partnershipType.message}</p>}
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="message">Tell us about the collaboration</label>
          <textarea id="message" rows={5} className={inputClass} {...register("message")} />
          {errors.message && <p className="mt-1.5 text-xs text-press-red">{errors.message.message}</p>}
        </div>
      </div>

      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />

      {serverError && (
        <p className="rounded-xl bg-press-red/10 px-4 py-3 text-sm text-press-red">{serverError}</p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? "Sending…" : "Send Partnership Enquiry"}
      </Button>
    </form>
  );
}
