import Image from "next/image";
import Hero from "@/components/home/Hero";
import ServicesGrid from "@/components/home/ServicesGrid";
import Testimonials from "@/components/home/Testimonials";
import SectionHeading from "@/components/ui/SectionHeading";
import GlassCard from "@/components/ui/GlassCard";
import ColorBar from "@/components/ui/ColorBar";
import Button from "@/components/ui/Button";
import { industries } from "@/lib/site-data";
import { Zap, ShieldCheck, Clock } from "lucide-react";

const galleryItems = [
  { src: "/images/product-mugs.jpg", alt: "Custom printed mugs and bottles", label: "Sublimation Print" },
  { src: "/images/product-notebook.jpg", alt: "Branded executive notebook", label: "Stationery" },
  { src: "/images/product-stationery.jpg", alt: "Corporate stationery set", label: "Office Supplies" },
  { src: "/images/product-flyer.jpg", alt: "Flyer and poster design", label: "Graphic Design" },
  { src: "/images/product-cushion.jpg", alt: "Printed cushion cover", label: "Fabric Printing" },
  { src: "/images/product-hat.jpg", alt: "Branded bucket hat", label: "Apparel" },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      <section className="bg-paper py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              eyebrow="Why Dupha Prints"
              title="Production discipline, brought to every print job."
              description="Every job runs through the same quality checks a commercial press uses before release — colour matching, material checks, and a final proof — whether it's one canvas print or five hundred banners."
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-1">
              <GlassCard className="!bg-white/70 !border-ink-950/8">
                <Zap className="text-cyan-dark" size={22} />
                <h3 className="mt-4 font-display text-xl text-ink-950">Fast turnaround</h3>
                <p className="mt-2 text-sm text-ink-950/60">
                  Digital jobs same-day, offset and large format scheduled around your deadline.
                </p>
              </GlassCard>
              <GlassCard className="!bg-white/70 !border-ink-950/8">
                <ShieldCheck className="text-cyan-dark" size={22} />
                <h3 className="mt-4 font-display text-xl text-ink-950">Colour-accurate</h3>
                <p className="mt-2 text-sm text-ink-950/60">
                  Every job is checked against a colour bar before it's approved for release.
                </p>
              </GlassCard>
              <GlassCard className="!bg-white/70 !border-ink-950/8">
                <Clock className="text-cyan-dark" size={22} />
                <h3 className="mt-4 font-display text-xl text-ink-950">Always reachable</h3>
                <p className="mt-2 text-sm text-ink-950/60">
                  Online enquiries and quotes are open 24 hours, Monday to Saturday.
                </p>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      <ColorBar />
      <ServicesGrid />

      {/* ── Real Work Gallery ─────────────────────────────── */}
      <section className="bg-ink-950 py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="From our press"
              title="Real products. Real clients."
              description="A sample of recent work across categories — every piece produced here in Lekki."
              light
            />
            <Button
              href="/portfolio"
              variant="secondary"
              className="shrink-0 border-paper/25 text-paper hover:border-paper"
            >
              Full Portfolio
            </Button>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {galleryItems.map((item) => (
              <div
                key={item.src}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-ink-950/40"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink-950/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="w-full px-3 pb-3 font-mono text-[10px] uppercase tracking-widest text-cyan-light">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ColorBar />

      <section className="bg-paper-dim py-28">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Who we work with"
            title="Industries we serve across Lagos."
            align="center"
          />
          <div className="mt-14 flex flex-wrap justify-center gap-3">
            {industries.map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-ink-950/10 bg-white/60 px-5 py-2.5 text-sm text-ink-950/75"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="bg-paper py-28">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-ink-950 px-8 py-16 text-center sm:px-16">
          <SectionHeading
            title="Ready to start your print run?"
            description="Tell us what you need and we'll come back with pricing, turnaround, and a production plan — usually within one business day."
            align="center"
            light
          />
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/quote">Request a Quote</Button>
            <Button href="/contact" variant="secondary" className="border-paper/25 text-paper hover:border-paper">
              Talk to the Team
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
