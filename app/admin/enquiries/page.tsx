import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SignOutButton from "@/components/admin/SignOutButton";

export const dynamic = "force-dynamic";

const tabs = [
  { key: "quote", label: "Quote Requests" },
  { key: "contact", label: "Contact Messages" },
  { key: "careers", label: "Careers Applications" },
  { key: "partnership", label: "Partnership Requests" },
  { key: "newsletter", label: "Newsletter Subscribers" },
];

async function getRows(type: string) {
  try {
    switch (type) {
      case "contact":
        return await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
      case "careers":
        return await prisma.careersApplication.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
      case "partnership":
        return await prisma.partnershipRequest.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
      case "newsletter":
        return await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
      default:
        return await prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
    }
  } catch {
    return [];
  }
}

export default async function AdminEnquiriesPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const type = searchParams.type || "quote";
  const rows = await getRows(type);

  return (
    <div className="min-h-screen bg-paper-dim">
      <header className="flex items-center justify-between border-b border-ink-950/10 bg-paper px-8 py-5">
        <Link href="/admin" className="font-display text-xl text-ink-950">
          Dupha Prints — Admin
        </Link>
        <SignOutButton />
      </header>

      <div className="mx-auto max-w-6xl px-8 py-12">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <Link
              key={t.key}
              href={`/admin/enquiries?type=${t.key}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                type === t.key ? "bg-ink-950 text-paper" : "bg-white text-ink-950/60 hover:text-ink-950"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-ink-950/8 bg-white">
          {rows.length === 0 ? (
            <p className="p-8 text-sm text-ink-950/50">
              No records yet — or the database isn&apos;t connected. See the README for setup.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-ink-950/8 text-xs uppercase tracking-wider text-ink-950/50">
                <tr>
                  {Object.keys(rows[0] as object).map((key) => (
                    <th key={key} className="whitespace-nowrap px-5 py-3">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row: any, i: number) => (
                  <tr key={row.id ?? i} className="border-b border-ink-950/5 last:border-0">
                    {Object.values(row).map((val: any, j) => (
                      <td key={j} className="max-w-xs truncate px-5 py-3 text-ink-950/75">
                        {val instanceof Date ? val.toLocaleString() : String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
