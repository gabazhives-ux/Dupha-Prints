import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ColorBar from "@/components/ui/ColorBar";
import Accordion from "@/components/ui/Accordion";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about ordering, turnaround, and pricing at Dupha Prints.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  {
    q: "How do I request a quote?",
    a: "Use the Request a Quote page, or call us directly on " + business.phone + ". We usually reply within one business day, faster during our 24-hour lines Monday to Saturday.",
  },
  {
    q: "What file formats do you accept for artwork?",
    a: "PDF, AI, EPS, and high-resolution PNG/JPEG all work. For large format jobs, we'll advise on the minimum resolution needed for a sharp print.",
  },
  {
    q: "Do you offer design services if I don't have artwork ready?",
    a: "Yes — our team can help lay out or design your artwork as part of the job. Mention this when you request a quote.",
  },
  {
    q: "What's your typical turnaround time?",
    a: "Digital printing jobs are often same-day. Offset and large-format runs are scheduled based on volume — we'll confirm a timeline when we quote your job.",
  },
  {
    q: "Do you deliver outside Lekki?",
    a: "Yes, we deliver across Lagos. Delivery cost and timing depend on the size of the order and destination.",
  },
  {
    q: "Can I see a sample or proof before the full run?",
    a: "For larger orders, yes — we can provide a physical or digital proof before committing to the full print run.",
  },
];

export default function FAQPage() {
  return (
    <>
      <section className="bg-ink-950 pb-20 pt-40 sm:pt-48">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading eyebrow="FAQ" title="Common questions, answered." light />
        </div>
      </section>
      <ColorBar />

      <section className="bg-paper py-24">
        <div className="mx-auto max-w-3xl px-6">
          <Accordion items={faqs} />
        </div>
      </section>
    </>
  );
}
