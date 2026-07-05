"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/site-data";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[index];

  return (
    <section className="bg-ink-950 py-28">
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="Client feedback"
          title="Trusted by the people who reorder."
          align="center"
          light
        />

        <div className="relative mt-16 min-h-[220px]">
          <div key={index} className="animate-[fadeIn_0.6s_ease] text-center">
            <div className="flex justify-center gap-1 text-cyan-light">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-balance font-display text-2xl leading-snug text-paper sm:text-3xl">
              &ldquo;{t.quote}&rdquo;
            </p>
            <p className="mt-6 text-sm text-paper/60">
              {t.name} — {t.role}
            </p>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            aria-label="Previous testimonial"
            onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
            className="rounded-full border border-paper/20 p-2.5 text-paper transition-colors hover:border-cyan-light hover:text-cyan-light"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-cyan-light" : "w-1.5 bg-paper/25"
                }`}
              />
            ))}
          </div>
          <button
            aria-label="Next testimonial"
            onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
            className="rounded-full border border-paper/20 p-2.5 text-paper transition-colors hover:border-cyan-light hover:text-cyan-light"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
