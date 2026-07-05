"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { mainNav, business } from "@/lib/site-data";
import Button from "@/components/ui/Button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-6 transition-all duration-500 ${
          scrolled ? "glass py-2.5 shadow-glass" : "py-1"
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Dupha Prints Home"
        >
          <Image
            src="/images/logo.png"
            alt="Dupha Prints"
            width={40}
            height={40}
            className="h-9 w-auto"
            style={{ background: "none", mixBlendMode: "multiply" }}
            priority
          />
          <span className="font-display text-xl font-medium tracking-tight text-ink-950">
            Dupha<span className="text-cyan">Prints</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-950/75 transition-colors hover:text-cyan"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/quote" className="!py-2.5 !px-5 text-xs">
            Request a Quote
          </Button>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-full p-2 text-ink-950 lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="mx-4 mt-3 rounded-3xl glass p-6 lg:hidden">
          <nav className="flex flex-col gap-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-ink-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button href="/quote" className="mt-6 w-full">
            Request a Quote
          </Button>
          <a
            href={business.phoneHref}
            className="mt-4 block text-center text-sm text-ink-950/60"
          >
            Or call {business.phone}
          </a>
        </div>
      )}
    </header>
  );
}
