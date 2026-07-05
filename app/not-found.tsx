"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ColorBar from "@/components/ui/ColorBar";

export default function NotFound() {
  const layersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!layersRef.current) return;
    const layers = layersRef.current.querySelectorAll("[data-layer]");
    gsap.fromTo(
      layers,
      { x: 0, y: 0, opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
      }
    );
    // Gentle "misregistration" drift, like ink slightly out of alignment.
    layers.forEach((layer, i) => {
      gsap.to(layer, {
        x: i % 2 === 0 ? 4 : -4,
        y: i % 2 === 0 ? -3 : 3,
        duration: 2.4 + i * 0.3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink-950 px-6 text-center">
      <div ref={layersRef} className="relative">
        <span data-layer className="absolute inset-0 font-display text-[9rem] text-press-red/70 sm:text-[12rem]">404</span>
        <span data-layer className="absolute inset-0 font-display text-[9rem] text-cyan/70 sm:text-[12rem]">404</span>
        <span data-layer className="relative font-display text-[9rem] text-paper sm:text-[12rem]">404</span>
      </div>
      <h1 className="mt-8 font-display text-3xl text-paper sm:text-4xl">This page didn't make it to press.</h1>
      <p className="mt-4 max-w-md text-paper/60">
        The page you're looking for may have moved or no longer exists. Let's get you back on track.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button href="/">Back to Home</Button>
        <Button href="/contact" variant="secondary" className="border-paper/25 text-paper hover:border-paper">
          Contact Us
        </Button>
      </div>
      <ColorBar className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
