"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import Button from "@/components/ui/Button";
import ColorBar from "@/components/ui/ColorBar";
import { business } from "@/lib/site-data";

type SlideItem = {
  src: string;
  label: string;
  category: string;
};

const SLIDES: SlideItem[] = [
  {
    src: "/images/product-bottle-navy.jpg",
    label: "Branded Bottles",
    category: "Corporate Gifts",
  },
  {
    src: "/images/product-umbrella-teal.jpg",
    label: "Custom Umbrellas",
    category: "Promotional Items",
  },
  {
    src: "/images/product-mugs.jpg",
    label: "Sublimation Mugs",
    category: "Personalised Gifts",
  },
];

function ProductCarousel() {
  const [index, setIndex] = useState(0);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!imgRef.current) return;
    gsap.fromTo(
      imgRef.current,
      { y: -40, opacity: 0, scale: 0.92 },
      { y: 0, opacity: 1, scale: 1, duration: 1.0, ease: "power3.out" }
    );
  }, [index]);

  const slide = SLIDES[index];

  return (
    <div className="relative flex items-center justify-center">
      {/* Soft glow behind the product */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(ellipse at center, #17A6C2 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Product stage — no card, no box */}
      <div className="relative w-full max-w-sm">
        {/* Floating label badge */}
        <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-light/30 bg-ink-950/80 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-cyan-light backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-light" />
            Fresh off the press
          </span>
        </div>

        {/* Image — multiply blend removes white/grey background */}
        <div
          ref={imgRef}
          className="relative aspect-square"
          style={{
            /* radial vignette mask: product shows in center, fades to transparent at edges */
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 80%)",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 80%)",
          }}
        >
          <Image
            src={slide.src}
            alt={slide.label}
            fill
            className="object-contain object-center"
            style={{ mixBlendMode: "screen" }}
            sizes="(max-width: 768px) 80vw, 40vw"
            priority={index === 0}
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center">
          <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-light">
            {slide.category}
          </span>
          <p className="mt-1 font-display text-2xl text-paper">{slide.label}</p>
        </div>

        {/* Slide dots */}
        <div className="mt-5 flex justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-cyan-light" : "w-1.5 bg-paper/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headlineRef.current) return;
    const words = headlineRef.current.querySelectorAll("span span");
    gsap.fromTo(
      words,
      { y: "110%", opacity: 0 },
      { y: "0%", opacity: 1, duration: 1, stagger: 0.06, ease: "power4.out", delay: 0.15 }
    );
  }, []);

  return (
    <section className="relative overflow-hidden bg-ink-950 pb-20 pt-40 sm:pt-48">
      <div className="pointer-events-none absolute inset-0 bg-mesh-hero" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-cyan-light">
            <span className="registration-mark" />
            Precision Print Studio · Lekki, Lagos
          </div>

          <h1
            ref={headlineRef}
            className="font-display text-5xl leading-[1.05] text-paper sm:text-6xl lg:text-7xl"
          >
            {["Ideas,", "printed", "with intention."].map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span className="inline-block">{line}</span>
              </span>
            ))}
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-relaxed text-paper/65">
            Dupha Prints turns briefs into finished product — digital and
            offset printing, large format signage, apparel, and corporate
            gifting — produced in Lekki and delivered across Lagos, with
            enquiries open around the clock.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href="/quote">Request a Quote</Button>
            <Button href="/portfolio" variant="secondary" className="border-paper/25 text-paper hover:border-paper">
              View Our Work
            </Button>
          </div>

          <div className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-paper/10 pt-8">
            <div>
              <p className="font-display text-3xl text-paper">24/7</p>
              <p className="mt-1 text-xs text-paper/50">Online enquiries</p>
            </div>
            <div>
              <p className="font-display text-3xl text-paper">11+</p>
              <p className="mt-1 text-xs text-paper/50">Print services</p>
            </div>
            <div>
              <p className="font-display text-3xl text-paper">Lekki</p>
              <p className="mt-1 text-xs text-paper/50">{business.address.split(",").slice(-2).join(",").trim()}</p>
            </div>
          </div>
        </div>

        <ProductCarousel />
      </div>
      <ColorBar className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
