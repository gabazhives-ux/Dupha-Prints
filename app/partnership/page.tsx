import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ColorBar from "@/components/ui/ColorBar";
import PartnershipForm from "@/components/forms/PartnershipForm";

export const metadata: Metadata = {
  title: "Partnership",
  description: "Corporate partnerships, business collaboration, and reseller opportunities with Dupha Prints.",
  alternates: { canonical: "/partnership" },
};

const tracks = [
  {
    title: "Become a Partner",
    text: "Long-term print supply relationships for agencies, event companies, and retailers who need a dependable production partner.",
  },
  {
    title: "Corporate Partnerships",
    text: "Volume pricing and dedicated account support for businesses with recurring print and branding needs.",
  },
  {
    title: "Business Collaboration",
    text: "Co-branded products, bundled services, or joint offerings with complementary businesses.",
  },
  {
    title: "Reseller Opportunities",
    text: "Sell Dupha Prints products under your own brand with wholesale pricing and white-label packaging.",
  },
];

const benefits = [
  "Priority production scheduling",
  "Tiered volume pricing",
  "A dedicated account contact",
  "Co-marketing opportunities where relevant",
];

export default function PartnershipPage() {
  return (
    <>
      <section className="bg-ink-950 pb-20 pt-40 sm:pt-48">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            eyebrow="Partnership"
            title="Build a print relationship that scales with you."
            description="Whether you need a reliable supplier, a co-branded product line, or a reseller arrangement — here's how we work together."
            light
          />
        </div>
      </section>
      <ColorBar />

      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {tracks.map((t) => (
              <div key={t.title} className="rounded-3xl border border-ink-950/8 bg-white/60 p-8">
                <h3 className="font-display text-xl text-ink-950">{t.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-950/60">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-dim py-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading eyebrow="Partnership Benefits" title="What partners get." />
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 rounded-2xl bg-white/60 px-5 py-4 text-sm text-ink-950/75">
                <span className="registration-mark text-cyan-dark" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper py-24">
        <div className="mx-auto max-w-2xl px-6">
          <SectionHeading eyebrow="Partnership Enquiry" title="Tell us about the opportunity." />
          <div className="mt-10">
            <PartnershipForm />
          </div>
        </div>
      </section>
    </>
  );
}
