import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ColorBar from "@/components/ui/ColorBar";
import { industries } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description: "Dupha Prints works with hospitality, corporate, fashion, real estate, education, and non-profit clients across Lagos.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <section className="bg-ink-950 pb-20 pt-40 sm:pt-48">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            eyebrow="Industries"
            title="Different sectors, the same production standard."
            light
          />
        </div>
      </section>
      <ColorBar />

      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, i) => (
              <div key={industry} className="rounded-3xl border border-ink-950/8 bg-white/60 p-8">
                <span className="font-mono text-xs text-cyan-dark">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-lg text-ink-950">{industry}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
