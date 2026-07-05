import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SignOutButton from "@/components/admin/SignOutButton";

export const dynamic = "force-dynamic";

async function getCounts() {
  try {
    const [quotes, contacts, careers, partnerships, subscribers] = await Promise.all([
      prisma.quoteRequest.count(),
      prisma.contactMessage.count(),
      prisma.careersApplication.count(),
      prisma.partnershipRequest.count(),
      prisma.newsletterSubscriber.count(),
    ]);
    return { quotes, contacts, careers, partnerships, subscribers };
  } catch {
    // Database not connected yet — show zeroes instead of crashing.
    return { quotes: 0, contacts: 0, careers: 0, partnerships: 0, subscribers: 0 };
  }
}

export default async function AdminDashboard() {
  const counts = await getCounts();

  const cards = [
    { label: "Quote Requests", value: counts.quotes, href: "/admin/enquiries?type=quote" },
    { label: "Contact Messages", value: counts.contacts, href: "/admin/enquiries?type=contact" },
    { label: "Careers Applications", value: counts.careers, href: "/admin/enquiries?type=careers" },
    { label: "Partnership Requests", value: counts.partnerships, href: "/admin/enquiries?type=partnership" },
    { label: "Newsletter Subscribers", value: counts.subscribers, href: "/admin/enquiries?type=newsletter" },
  ];

  return (
    <div className="min-h-screen bg-paper-dim">
      <header className="flex items-center justify-between border-b border-ink-950/10 bg-paper px-8 py-5">
        <h1 className="font-display text-xl text-ink-950">Dupha Prints — Admin</h1>
        <SignOutButton />
      </header>

      <div className="mx-auto max-w-6xl px-8 py-12">
        <h2 className="font-display text-2xl text-ink-950">Overview</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="rounded-2xl border border-ink-950/8 bg-white p-6 transition-shadow hover:shadow-premium"
            >
              <p className="font-mono text-xs uppercase tracking-wider text-ink-950/50">{c.label}</p>
              <p className="mt-3 font-display text-4xl text-ink-950">{c.value}</p>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-sm text-ink-950/45">
          Connect a PostgreSQL database (DATABASE_URL) to see live submissions here. See the README
          for setup steps.
        </p>
      </div>
    </div>
  );
}
