import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ColorBar from "@/components/ui/ColorBar";
import Button from "@/components/ui/Button";
import { services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Digital printing, offset printing, large format, banners, stickers, canvas, apparel, mugs, monogramming, and corporate gifts — from Dupha Prints, Lekki.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-ink-950 pb-20 pt-40 sm:pt-48">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            eyebrow="Services"
            title="Eleven ways we put ink on something."
            description="From single-item personalisation to full commercial print runs — pick a service below, or send us the brief and we'll scope it."
            light
          />
        </div>
      </section>
      <ColorBar />

      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.code}
                id={service.title.toLowerCase().replace(/\s+/g, "-")}
                className="rounded-3xl border border-ink-950/8 bg-white/60 p-8 transition-shadow hover:shadow-premium"
              >
                <span className="font-mono text-xs text-cyan-dark">{service.code}</span>
                <h2 className="mt-4 font-display text-2xl text-ink-950">{service.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-950/60">{service.description}</p>
                <Button href="/quote" variant="ghost" className="mt-5 !px-0 !py-0">
                  Get a quote →
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
