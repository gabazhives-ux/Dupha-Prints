import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ColorBar from "@/components/ui/ColorBar";
import Button from "@/components/ui/Button";
import { BottleIcon, UmbrellaIcon } from "@/components/home/PrintProps";

export const metadata: Metadata = {
  title: "Products",
  description: "Branded bottles, umbrellas, mugs, apparel, and corporate gift products from Dupha Prints.",
  alternates: { canonical: "/products" },
};

const products = [
  { name: "Branded Bottles", note: "Custom-printed water bottles for events and corporate gifting.", render: <BottleIcon color="#3E6E96" /> },
  { name: "Baby Blue Umbrellas", note: "Light, brand-friendly umbrellas for giveaways and promotions.", render: <UmbrellaIcon color="#BFE1EA" /> },
  { name: "Navy Corporate Umbrellas", note: "A more formal finish for executive and corporate use.", render: <UmbrellaIcon color="#1B3A63" /> },
];

export default function ProductsPage() {
  return (
    <>
      <section className="bg-ink-950 pb-20 pt-40 sm:pt-48">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            eyebrow="Products"
            title="Ready-to-brand products, printed to order."
            description="Beyond paper: bottles, umbrellas, mugs, and apparel — branded to your spec."
            light
          />
        </div>
      </section>
      <ColorBar />

      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {products.map((p) => (
              <div key={p.name} className="flex flex-col items-center rounded-3xl border border-ink-950/8 bg-white/60 p-10 text-center">
                <div className="flex h-40 items-center justify-center">{p.render}</div>
                <h3 className="mt-6 font-display text-xl text-ink-950">{p.name}</h3>
                <p className="mt-2 text-sm text-ink-950/60">{p.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Button href="/quote">Request a Product Quote</Button>
          </div>
        </div>
      </section>
    </>
  );
}
