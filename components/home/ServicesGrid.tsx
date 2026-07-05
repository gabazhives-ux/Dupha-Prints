import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site-data";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ServicesGrid() {
  return (
    <section className="bg-paper py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="What we produce"
            title="Print services built around real jobs, not templates."
          />
          <Link href="/services" className="group flex shrink-0 items-center gap-2 text-sm font-semibold text-ink-950">
            All services
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-ink-950/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.code}
              className="group relative bg-paper p-8 transition-colors duration-300 hover:bg-ink-950"
            >
              <span className="font-mono text-xs text-ink-950/40 transition-colors group-hover:text-cyan-light">
                {service.code}
              </span>
              <h3 className="mt-4 font-display text-2xl text-ink-950 transition-colors group-hover:text-paper">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-950/60 transition-colors group-hover:text-paper/65">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
