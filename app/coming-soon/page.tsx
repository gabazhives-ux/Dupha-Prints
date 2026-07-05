import type { Metadata } from "next";
import ColorBar from "@/components/ui/ColorBar";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Coming Soon",
  robots: { index: false, follow: false },
};

export default function ComingSoonPage() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-ink-950 px-6 text-center">
      <div className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-cyan-light">
        <span className="registration-mark" /> In production
      </div>
      <h1 className="font-display text-5xl text-paper sm:text-6xl">Something new is on the press.</h1>
      <p className="mt-5 max-w-md text-paper/60">
        This page is being prepared. In the meantime, reach us on {business.phone} or explore the
        rest of the site.
      </p>
      <ColorBar className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
