import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ColorBar from "@/components/ui/ColorBar";
import CareersForm from "@/components/forms/CareersForm";
import { jobOpenings } from "@/lib/site-data";
import { MapPin, Briefcase } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Dupha Prints — open roles, internships, and what it's like working with our production team in Lekki, Lagos.",
  alternates: { canonical: "/careers" },
};

const culture = [
  "Small, hands-on production team — you'll see your work go from screen to press.",
  "Direct feedback from clients on real jobs, not simulated projects.",
  "Room to grow into senior production or design roles as the studio scales.",
];

const benefits = [
  "Competitive pay reviewed regularly",
  "On-the-job skills training",
  "Staff discount on personal print orders",
  "A workplace that runs on respect for craft",
];

export default function CareersPage() {
  return (
    <>
      <section className="bg-ink-950 pb-20 pt-40 sm:pt-48">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            eyebrow="Careers"
            title="Join our team."
            description="We're a small, growing production studio in Lekki. If you care about getting print work exactly right, we'd like to hear from you."
            light
          />
        </div>
      </section>
      <ColorBar />

      <section className="bg-paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="Open Roles" title="Current openings & internships." />
          <div className="mt-10 divide-y divide-ink-950/10 rounded-3xl border border-ink-950/8 bg-white/60">
            {jobOpenings.map((job) => (
              <div key={job.title} className="flex flex-col gap-2 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-display text-lg text-ink-950">{job.title}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-ink-950/50">
                    <span className="flex items-center gap-1.5"><Briefcase size={14} /> {job.type}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
                  </div>
                </div>
                <a href="#apply" className="text-sm font-semibold text-cyan-dark">Apply below →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-dim py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="Company Culture" title="What it's like day to day." />
              <ul className="mt-6 space-y-4">
                {culture.map((c) => (
                  <li key={c} className="flex gap-3 text-sm leading-relaxed text-ink-950/70">
                    <span className="registration-mark shrink-0 text-cyan-dark" /> {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading eyebrow="Employee Benefits" title="What you get." />
              <ul className="mt-6 space-y-4">
                {benefits.map((b) => (
                  <li key={b} className="flex gap-3 text-sm leading-relaxed text-ink-950/70">
                    <span className="registration-mark shrink-0 text-cyan-dark" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="apply" className="bg-paper py-24">
        <div className="mx-auto max-w-2xl px-6">
          <SectionHeading eyebrow="Online Application" title="Apply now." description="Upload your resume/CV and tell us a bit about yourself." />
          <div className="mt-10">
            <CareersForm />
          </div>
        </div>
      </section>
    </>
  );
}
