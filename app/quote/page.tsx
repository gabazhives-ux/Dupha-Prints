import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ColorBar from "@/components/ui/ColorBar";
import QuoteForm from "@/components/forms/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote",
  description: "Request a print quote from Dupha Prints — tell us the service, quantity, budget, and timeline.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <>
      <section className="bg-ink-950 pb-20 pt-40 sm:pt-48">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            eyebrow="Request a Quote"
            title="Tell us what you need. We'll price it properly."
            description="The more detail you give us, the faster and more accurate your quote will be."
            light
          />
        </div>
      </section>
      <ColorBar />

      <section className="bg-paper py-24">
        <div className="mx-auto max-w-2xl px-6">
          <div className="rounded-3xl border border-ink-950/8 bg-white/60 p-8 sm:p-10">
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
