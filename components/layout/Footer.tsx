import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Instagram, Music2, MapPin, Phone } from "lucide-react";
import { business, footerNav } from "@/lib/site-data";
import ColorBar from "@/components/ui/ColorBar";
import NewsletterForm from "@/components/forms/NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-paper">
      <ColorBar />
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="flex items-center gap-3" aria-label="Dupha Prints Home">
              <Image
                src="/images/logo.png"
                alt="Dupha Prints logo"
                width={44}
                height={44}
                className="h-10 w-auto"
              />
              <span className="font-display text-2xl text-paper">
                Dupha<span className="text-cyan-light">Prints</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
              {business.tagline} Digital, offset, and large-format printing
              for brands, businesses, and individuals across Lagos.
            </p>
            <div className="mt-6 flex gap-4">
              <a href={business.social.facebook} aria-label="Facebook" className="text-paper/60 hover:text-cyan-light">
                <Facebook size={18} />
              </a>
              <a href={business.social.linkedin} aria-label="LinkedIn" className="text-paper/60 hover:text-cyan-light">
                <Linkedin size={18} />
              </a>
              <a href={business.social.instagram} aria-label="Instagram" className="text-paper/60 hover:text-cyan-light">
                <Instagram size={18} />
              </a>
              <a href={business.social.tiktok} aria-label="TikTok" className="text-paper/60 hover:text-cyan-light">
                <Music2 size={18} />
              </a>
            </div>
          </div>

          {Object.entries(footerNav).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-light">
                {heading}
              </h3>
              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-paper/70 transition-colors hover:text-paper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-light">
              Stay in the loop
            </h3>
            <p className="mt-5 text-sm text-paper/60">
              Occasional print tips and studio news. No spam.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-paper/10 pt-8 text-sm text-paper/60 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-cyan-light" /> {business.address}
            </span>
            <a href={business.phoneHref} className="flex items-center gap-2 hover:text-paper">
              <Phone size={16} className="text-cyan-light" /> {business.phone}
            </a>
          </div>
          <p>© {new Date().getFullYear()} Dupha Prints. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
