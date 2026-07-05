import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ColorBar from "@/components/ui/ColorBar";
import GlassCard from "@/components/ui/GlassCard";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Dupha Prints is a Lekki-based printing and branding studio producing digital, offset, and large-format print work across Lagos.",
  alternates: { canonical: "/about" },
};

const values = [
  { title: "Precision", text: "Every job is proofed and colour-checked before it goes to press." },
  { title: "Reliability", text: "Enquiries are open 24 hours, six days a week, because deadlines don't wait." },
  { title: "Craft", text: "We treat a 50-sticker order with the same care as a 5,000-unit run." },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-ink-950 pb-20 pt-40 sm:pt-48">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            eyebrow="About Dupha Prints"
            title="A print studio built around one idea: get it exactly right."
            description="Based in Lekki, Lagos, Dupha Prints produces digital, offset, and large-format print work, apparel, and corporate gifting for businesses, event planners, and individuals across the city."
            light
          />
        </div>
      </section>
      <ColorBar />

      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="space-y-6 text-lg leading-relaxed text-ink-950/70">
              <p>
                Dupha Prints started with a simple frustration shared by a lot of businesses in
                Lagos: print vendors that were either fast and inconsistent, or careful and slow.
                We built our process to remove that trade-off — a dedicated production line for
                digital and offset work, in-house large-format equipment, and a team that reviews
                every job against a colour bar before it&apos;s approved for release.
              </p>
              <p>
                Today we produce everything from single canvas prints and personalised mugs to
                full event branding packages and bulk corporate gifting — for clients who reorder
                because the job came out right the first time.
              </p>
            </div>
            <div className="space-y-5">
              {values.map((v) => (
                <GlassCard key={v.title} className="!bg-white/70 !border-ink-950/8">
                  <h3 className="font-display text-xl text-ink-950">{v.title}</h3>
                  <p className="mt-2 text-sm text-ink-950/60">{v.text}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper-dim py-24 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <SectionHeading title="Want to see the work?" align="center" />
          <div className="mt-8 flex justify-center gap-4">
            <Button href="/portfolio">View Portfolio</Button>
            <Button href="/contact" variant="secondary">Get in Touch</Button>
          </div>
        </div>
      </section>
    </>
  );
}
