import { AdminApp } from "@/components/admin/admin-app";
import { getHomeContent, listInquiries } from "@/lib/cms/site-content";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [content, inquiries] = await Promise.all([
    getHomeContent(),
    listInquiries(),
  ]);

  return <AdminApp initialContent={content} initialInquiries={inquiries} />;
}
