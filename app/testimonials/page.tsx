import type { Metadata } from "next";
import { Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ColorBar from "@/components/ui/ColorBar";
import { testimonials } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What Dupha Prints clients say about our printing, branding, and production work.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  return (
    <>
      <section className="bg-ink-950 pb-20 pt-40 sm:pt-48">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading eyebrow="Testimonials" title="Client feedback, in full." light />
        </div>
      </section>
      <ColorBar />

      <section className="bg-paper py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-3xl border border-ink-950/8 bg-white/60 p-8">
                <div className="flex gap-1 text-cyan-dark">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-4 text-ink-950/75">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-5 text-sm font-semibold text-ink-950">{t.name}</p>
                <p className="text-xs text-ink-950/50">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
