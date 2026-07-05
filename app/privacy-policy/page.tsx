import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ColorBar from "@/components/ui/ColorBar";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Dupha Prints privacy policy.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-ink-950 pb-20 pt-40 sm:pt-48">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading eyebrow="Legal" title="Privacy Policy" light />
          <p className="mt-4 text-sm text-paper/50">Last updated: 5 July 2026</p>
        </div>
      </section>
      <ColorBar />

      <section className="bg-paper py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="rounded-2xl border-2 border-dashed border-ink-950/20 bg-white p-12 shadow-sm">
            {/* PDF Icon */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-10 w-10 text-red-500"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>

            <h2 className="font-display text-2xl font-bold text-ink-950">
              Our Privacy Policy is available as a PDF document.
            </h2>

            <p className="mt-4 text-base font-semibold text-ink-950/70">
              📄{" "}
              <strong>
                Click the button below to open and read our full Privacy Policy.
              </strong>
            </p>

            <p className="mt-2 text-sm text-ink-950/50">
              The document contains detailed information on the data we collect,
              how we use it, your rights, and how to contact us regarding your
              personal information.
            </p>

            <a
              href="/dupha-prints-policies.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-ink-950 px-8 py-4 text-base font-bold text-paper transition-all duration-200 hover:scale-105 hover:bg-ink-900 hover:shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Open / Download Privacy Policy PDF
            </a>

            <div className="mt-10 border-t border-ink-950/10 pt-8">
              <p className="text-sm text-ink-950/50">
                Have questions about your privacy? Contact us at{" "}
                <a
                  href="mailto:info@duphaprints.com"
                  className="font-semibold text-ink-950 underline underline-offset-2 hover:text-ink-900"
                >
                  info@duphaprints.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
