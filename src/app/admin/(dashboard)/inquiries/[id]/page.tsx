import Link from "next/link";
import { notFound } from "next/navigation";
import { InquiryDetailActions } from "@/components/admin/inquiry-detail-actions";
import { getInquiryById } from "@/lib/cms/site-content";

export const dynamic = "force-dynamic";

export default async function AdminInquiryDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const row = await getInquiryById(id);
  if (!row) notFound();

  return (
    <>
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">
            <time dateTime={row.created_at}>
              {new Date(row.created_at).toLocaleString(undefined, {
                dateStyle: "full",
                timeStyle: "short",
              })}
            </time>
          </p>
          <h1 className="text-2xl font-bold text-slate-900">{row.name}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/inquiries"
            className="text-sm text-slate-500 transition-colors hover:text-slate-700"
          >
            ← Back to inquiries
          </Link>
          <InquiryDetailActions inquiry={row} />
        </div>
      </header>

      <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Email
          </label>
          <a
            className="font-mono text-sm text-[var(--accent)] underline-offset-2 hover:underline"
            href={`mailto:${row.email}`}
          >
            {row.email}
          </a>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Message
          </label>
          <p className="whitespace-pre-wrap rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm leading-relaxed text-slate-800">
            {row.message}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-slate-600">Status:</span>
          {row.read_at ? (
            <span className="text-slate-500">Read</span>
          ) : (
            <span className="font-medium text-[var(--accent)]">Unread</span>
          )}
        </div>
      </div>
    </>
  );
}
