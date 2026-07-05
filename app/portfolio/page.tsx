import type { Metadata } from "next";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import ColorBar from "@/components/ui/ColorBar";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Selected print, branding, and production work by Dupha Prints.",
  alternates: { canonical: "/portfolio" },
};

const projects = [
  {
    title: "Branded Water Bottles",
    category: "Corporate Gifts",
    image: "/images/product-bottle-navy.jpg",
    description: "Custom sublimation-printed insulated bottles with full-colour logo.",
  },
  {
    title: "Promotional Umbrellas",
    category: "Promotional Items",
    image: "/images/product-umbrella-teal.jpg",
    description: "Large-format branded beach umbrellas in corporate teal & white.",
  },
  {
    title: "Personalised Mugs & Bottles",
    category: "Sublimation Printing",
    image: "/images/product-mugs.jpg",
    description: "Vibrant personalised mugs and bottles for gifts and corporate events.",
  },
  {
    title: "Branded Notebook",
    category: "Stationery",
    image: "/images/product-notebook.jpg",
    description: "Executive hard-cover notebooks with embossed logo and ribbon bookmark.",
  },
  {
    title: "Corporate Stationery Set",
    category: "Office Supplies",
    image: "/images/product-stationery.jpg",
    description: "Full-suite stationery sets — pens, pencils, notepads, and more.",
  },
  {
    title: "Flyer & Poster Design",
    category: "Graphic Design",
    image: "/images/product-flyer.jpg",
    description: "Bold, eye-catching marketing flyers designed and printed in-house.",
  },
  {
    title: "Printed Cushion Cover",
    category: "Fabric Printing",
    image: "/images/product-cushion.jpg",
    description: "Full-bleed all-over sublimation print on cushion covers.",
  },
  {
    title: "Branded Bucket Hat",
    category: "Apparel & Merchandise",
    image: "/images/product-hat.jpg",
    description: "Custom embroidered and printed bucket hats for brand giveaways.",
  },
  {
    title: "Executive Umbrella",
    category: "Corporate Gifts",
    image: "/images/product-umbrella-navy.jpg",
    description: "Premium navy corporate umbrellas with full-colour logo panel printing.",
  },
];

export default function PortfolioPage() {
  return (
    <>
      <section className="bg-ink-950 pb-20 pt-40 sm:pt-48">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            eyebrow="Portfolio"
            title="Recent jobs, from proof to production."
            description="A sample of the work moving through our press — brand campaigns, events, and personal orders."
            light
          />
        </div>
      </section>
      <ColorBar />

      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <div
                key={p.title}
                className="group overflow-hidden rounded-3xl border border-ink-950/8 bg-white/60 transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-ink-950/5">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute right-4 top-4 registration-mark text-paper/60" />
                </div>
                <div className="p-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-cyan-dark">
                    {p.category}
                  </span>
                  <h3 className="mt-2 font-display text-xl text-ink-950">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-950/60">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
