import type { Metadata } from "next";
import { MapPin, Phone, Clock } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ColorBar from "@/components/ui/ColorBar";
import ContactForm from "@/components/forms/ContactForm";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Dupha Prints in Lekki, Lagos — phone, address, and business hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink-950 pb-20 pt-40 sm:pt-48">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading eyebrow="Contact" title="Let's talk about your job." light />
        </div>
      </section>
      <ColorBar />

      <section className="bg-paper py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-8">
            <div className="flex gap-4">
              <MapPin className="mt-1 shrink-0 text-cyan-dark" size={20} />
              <div>
                <h3 className="font-display text-lg text-ink-950">Studio Address</h3>
                <p className="mt-1 text-sm text-ink-950/60">{business.address}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="mt-1 shrink-0 text-cyan-dark" size={20} />
              <div>
                <h3 className="font-display text-lg text-ink-950">Phone</h3>
                <a href={business.phoneHref} className="mt-1 block text-sm text-ink-950/60 hover:text-cyan-dark">
                  {business.phone}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="mt-1 shrink-0 text-cyan-dark" size={20} />
              <div>
                <h3 className="font-display text-lg text-ink-950">Business Hours</h3>
                <ul className="mt-1 space-y-1 text-sm text-ink-950/60">
                  {business.hours.map((h) => (
                    <li key={h.day}>{h.day}: {h.time}</li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-ink-950/45">{business.onlineNote}</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-ink-950/8 bg-white/60 p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
