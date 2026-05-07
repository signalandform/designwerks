import Link from "next/link";
import { listInquiries } from "@/lib/cms/site-content";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const rows = await listInquiries();

  return (
    <>
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">{rows.length} messages</p>
          <h1 className="text-2xl font-bold text-slate-900">Inquiries</h1>
        </div>
        <Link
          href="/admin"
          className="text-sm text-slate-500 transition-colors hover:text-slate-700"
        >
          ← Back to dashboard
        </Link>
      </header>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        {rows.length === 0 ? (
          <p className="px-6 py-16 text-center text-sm text-slate-500">
            Nothing here yet. Contact form submissions will appear in this table.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left font-medium text-slate-600">
                  From
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-slate-600 md:table-cell">
                  Email
                </th>
                <th className="hidden px-4 py-3 text-left font-medium text-slate-600 lg:table-cell">
                  Received
                </th>
                <th className="px-4 py-3 text-right font-medium text-slate-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-b border-slate-100 last:border-0">
                  <td className="px-0 py-0">
                    <Link
                      href={`/admin/inquiries/${row.id}`}
                      className="flex flex-col gap-0.5 px-4 py-3 transition-colors hover:bg-slate-50 md:py-3.5"
                    >
                      <span className="font-medium text-slate-900">{row.name}</span>
                      <span className="font-mono text-xs text-slate-400 md:hidden">
                        {row.email}
                      </span>
                    </Link>
                  </td>
                  <td className="hidden px-4 py-3 md:table-cell">
                    <Link
                      href={`/admin/inquiries/${row.id}`}
                      className="font-mono text-xs text-slate-500 hover:text-slate-700"
                    >
                      {row.email}
                    </Link>
                  </td>
                  <td className="hidden whitespace-nowrap px-4 py-3 text-slate-500 lg:table-cell">
                    <Link href={`/admin/inquiries/${row.id}`}>
                      {new Date(row.created_at).toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/inquiries/${row.id}`}>
                      {row.read_at ? (
                        <span className="text-slate-400">Read</span>
                      ) : (
                        <span className="font-medium text-[var(--accent)]">New</span>
                      )}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
