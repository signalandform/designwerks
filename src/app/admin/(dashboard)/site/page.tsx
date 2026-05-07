import Link from "next/link";
import { SiteContentEditor } from "@/components/admin/admin-app";
import { getHomeContent } from "@/lib/cms/site-content";

export const dynamic = "force-dynamic";

export default async function AdminSiteEditorPage() {
  const content = await getHomeContent();

  return (
    <>
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">Website · Homepage</p>
          <h1 className="text-2xl font-bold text-slate-900">Homepage content</h1>
        </div>
        <Link
          href="/admin"
          className="text-sm text-slate-500 transition-colors hover:text-slate-700"
        >
          ← Back to dashboard
        </Link>
      </header>

      <SiteContentEditor initialContent={content} />
    </>
  );
}
