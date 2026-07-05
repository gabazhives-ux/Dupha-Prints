import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import ColorBar from "@/components/ui/ColorBar";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center bg-ink-950 px-6 text-center">
      <div className="rounded-full bg-cyan/10 p-4">
        <CheckCircle2 size={40} className="text-cyan-light" />
      </div>
      <h1 className="mt-8 font-display text-4xl text-paper sm:text-5xl">Message received.</h1>
      <p className="mt-4 max-w-md text-paper/60">
        Thanks for reaching out to Dupha Prints. A member of our team will be in touch shortly —
        usually within one business day.
      </p>
      <div className="mt-10 flex gap-4">
        <Button href="/">Back to Home</Button>
        <Button href="/portfolio" variant="secondary" className="border-paper/25 text-paper hover:border-paper">
          View Our Work
        </Button>
      </div>
      <ColorBar className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
