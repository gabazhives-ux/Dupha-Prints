import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import ColorBar from "@/components/ui/ColorBar";
import { footerNav, mainNav } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "A full list of pages on the Dupha Prints website.",
  alternates: { canonical: "/site-map" },
};

export default function SiteMapPage() {
  const allLinks = [
    { label: "Home", href: "/" },
    ...mainNav,
    ...Object.values(footerNav).flat(),
  ];
  const unique = Array.from(new Map(allLinks.map((l) => [l.href, l])).values());

  return (
    <>
      <section className="bg-ink-950 pb-20 pt-40 sm:pt-48">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading eyebrow="Sitemap" title="Every page, in one place." light />
        </div>
      </section>
      <ColorBar />

      <section className="bg-paper py-24">
        <div className="mx-auto max-w-3xl px-6">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {unique.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-2xl border border-ink-950/8 bg-white/60 px-5 py-4 text-sm text-ink-950/75 transition-colors hover:border-cyan hover:text-cyan-dark"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
