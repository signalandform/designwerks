"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { InquiryRow } from "@/lib/cms/types";

export function InquiryDetailActions(props: { inquiry: InquiryRow }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isRead = Boolean(props.inquiry.read_at);

  async function setRead(read: boolean) {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: props.inquiry.id, read }),
      });
      if (!res.ok) {
        throw new Error("Could not update status.");
      }
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      {error ? (
        <p className="max-w-xs rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-800">
          {error}
        </p>
      ) : null}
      <button
        type="button"
        disabled={busy}
        onClick={() => void setRead(!isRead)}
        className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:opacity-50"
      >
        {busy ? "Updating…" : isRead ? "Mark as new" : "Mark as read"}
      </button>
    </div>
  );
}
