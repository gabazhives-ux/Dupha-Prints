"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, NewsletterInput } from "@/lib/validations";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });

  async function onSubmit(data: NewsletterInput) {
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="flex overflow-hidden rounded-full border border-paper/20 bg-paper/5">
        <input
          type="email"
          placeholder="you@email.com"
          className="w-full bg-transparent px-4 py-2.5 text-sm text-paper placeholder:text-paper/40 focus:outline-none"
          {...register("email")}
        />
        {/* Honeypot — hidden from real users via CSS, bots often fill it anyway */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          {...register("website")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="shrink-0 bg-cyan px-4 text-xs font-semibold text-ink-950 transition-colors hover:bg-cyan-light disabled:opacity-60"
        >
          Join
        </button>
      </div>
      {errors.email && (
        <p className="mt-2 text-xs text-press-red">{errors.email.message}</p>
      )}
      {status === "success" && (
        <p className="mt-2 text-xs text-cyan-light">You&apos;re subscribed — thank you.</p>
      )}
      {status === "error" && (
        <p className="mt-2 text-xs text-press-red">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
