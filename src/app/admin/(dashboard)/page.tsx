import Link from "next/link";
import { getHomeContent, listInquiries } from "@/lib/cms/site-content";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const [content, inquiries] = await Promise.all([
    getHomeContent(),
    listInquiries(),
  ]);

  const unread = inquiries.filter((q) => !q.read_at).length;
  const total = inquiries.length;
  const navCount = content.navItems.filter(
    (n) => n.label.trim() && n.href.trim(),
  ).length;

  return (
    <>
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">Overview</p>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        </div>
        <Link
          href="/admin/site"
          className="inline-flex items-center justify-center rounded-lg bg-slate-800 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
        >
          Edit homepage
        </Link>
      </header>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-slate-500">
          At a glance
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/admin/inquiries"
            className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-sm"
          >
            <p className="text-3xl font-bold text-slate-900">{unread}</p>
            <p className="mt-1 text-sm font-medium text-slate-600 group-hover:text-[var(--accent)]">
              Unread inquiries
            </p>
            <p className="mt-2 text-xs text-slate-400">{total} total messages</p>
          </Link>

          <Link
            href="/admin/site"
            className="group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-sm"
          >
            <p className="text-3xl font-bold text-slate-900">{navCount}</p>
            <p className="mt-1 text-sm font-medium text-slate-600 group-hover:text-[var(--accent)]">
              Navigation links
            </p>
            <p className="mt-2 text-xs text-slate-400">Header menu items live</p>
          </Link>

          <div className="rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-sm">
            <p className="text-3xl font-bold text-slate-900">
              {content.products.cards.filter((c) => c.title.trim()).length}
            </p>
            <p className="mt-1 text-sm font-medium text-slate-600">
              Product tiles
            </p>
            <p className="mt-2 text-xs text-slate-400">Homepage products grid</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wider text-slate-500">
          Quick links
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/admin/inquiries"
            className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-800 transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            View all inquiries →
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-sm font-medium text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            Open public site →
          </Link>
        </div>
      </section>
    </>
  );
}
