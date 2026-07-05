"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-ink-950/10 rounded-3xl border border-ink-950/8 bg-white/60">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 p-6 text-left"
            >
              <span className="font-display text-lg text-ink-950">{item.q}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-cyan-dark transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-sm leading-relaxed text-ink-950/65">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
