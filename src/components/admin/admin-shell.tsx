"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

const PRODUCT = "Design Werks Studio";

function cn(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export function AdminShell(props: {
  children: React.ReactNode;
  userEmail?: string | null;
}) {
  const pathname = usePathname();
  const drawerId = useId();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [websiteOpen, setWebsiteOpen] = useState(() =>
    pathname.startsWith("/admin/site"),
  );

  useEffect(() => {
    if (pathname.startsWith("/admin/site")) setWebsiteOpen(true);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  function navRow(active: boolean) {
    return cn(
      "flex w-full items-center gap-3 rounded-md px-4 py-2.5 text-sm transition-colors duration-200",
      active
        ? "bg-white/10 font-medium text-white"
        : "text-slate-300 hover:bg-white/5 hover:text-white",
    );
  }

  const email = props.userEmail?.trim();
  const emailShort =
    email && email.length > 36 ? `${email.slice(0, 34)}…` : email;

  const sidebarNav = (
    <>
      <nav className="flex-1 space-y-1 px-2 py-4">
        <Link
          href="/admin"
          className={navRow(pathname === "/admin")}
          onClick={() => setMobileOpen(false)}
        >
          <span className="w-5 text-center text-base leading-none" aria-hidden>
            ⌂
          </span>
          Dashboard
        </Link>

        <Link
          href="/admin/inquiries"
          className={navRow(pathname.startsWith("/admin/inquiries"))}
          onClick={() => setMobileOpen(false)}
        >
          <span className="w-5 text-center text-base leading-none" aria-hidden>
            ✉
          </span>
          Inquiries
        </Link>

        <div className="space-y-1">
          <button
            type="button"
            className={cn(
              navRow(pathname.startsWith("/admin/site")),
              "text-left",
            )}
            aria-expanded={websiteOpen}
            aria-controls={`${drawerId}-website-sub`}
            onClick={() => setWebsiteOpen((o) => !o)}
          >
            <span className="w-5 text-center text-base leading-none" aria-hidden>
              ◆
            </span>
            <span className="flex-1">Website</span>
            <span className="text-xs text-slate-400" aria-hidden>
              {websiteOpen ? "▾" : "▸"}
            </span>
          </button>
          {websiteOpen ? (
            <div
              id={`${drawerId}-website-sub`}
              className="ml-4 space-y-1 border-l border-white/10 pl-2"
            >
              <Link
                href="/admin/site"
                className={navRow(pathname === "/admin/site")}
                onClick={() => setMobileOpen(false)}
              >
                <span className="w-5 text-center text-sm text-slate-500" aria-hidden>
                  ›
                </span>
                Homepage
              </Link>
            </div>
          ) : null}
        </div>
      </nav>

      <div className="border-t border-white/10 px-4 py-4 text-xs text-slate-400">
        {emailShort ? (
          <p className="truncate" title={email ?? undefined}>
            {emailShort}
          </p>
        ) : (
          <p className="text-slate-500">Signed in</p>
        )}
        <div className="mt-3 flex flex-col gap-2">
          <Link
            href="/admin"
            className="text-slate-300 transition-colors hover:text-white"
          >
            ⚙ Account
          </Link>
          <button
            type="button"
            onClick={() => void logout()}
            className="text-left text-slate-300 transition-colors hover:text-white"
          >
            Sign out
          </button>
          <Link
            href="/"
            className="text-slate-500 transition-colors hover:text-slate-300"
          >
            ← View site
          </Link>
        </div>
      </div>
    </>
  );

  return (
    <div className="htp-admin text-[var(--ink)]">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 bg-slate-800 px-3 text-white lg:hidden">
        <button
          type="button"
          className="rounded-md p-2 transition-colors hover:bg-white/10"
          aria-expanded={mobileOpen}
          aria-controls={drawerId}
          onClick={() => setMobileOpen(true)}
        >
          <span className="sr-only">Open menu</span>
          <span className="flex flex-col gap-1" aria-hidden>
            <span className="block h-0.5 w-5 rounded-full bg-white" />
            <span className="block h-0.5 w-5 rounded-full bg-white" />
            <span className="block h-0.5 w-5 rounded-full bg-white" />
          </span>
        </button>
        <span className="truncate text-center text-sm font-bold tracking-tight">
          {PRODUCT}
        </span>
        <button
          type="button"
          onClick={() => void logout()}
          className="shrink-0 rounded-md px-2 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          Sign out
        </button>
      </header>

      <div className="flex min-h-[calc(100vh-3.5rem)] min-w-0 lg:min-h-screen">
        {/* Desktop sidebar */}
        <aside className="relative hidden w-64 shrink-0 flex-col bg-slate-800 text-white lg:flex">
          <div className="border-b border-white/10 px-4 py-5">
            <p className="text-lg font-bold tracking-tight">{PRODUCT}</p>
          </div>
          {sidebarNav}
        </aside>

        {/* Drawer + backdrop (mobile) */}
        <div
          className={cn(
            "fixed inset-0 z-40 bg-slate-900/60 transition-opacity duration-200 lg:hidden",
            mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
          )}
          aria-hidden={!mobileOpen}
        >
          <button
            type="button"
            className="absolute inset-0 size-full cursor-default"
            aria-label="Close menu"
            tabIndex={mobileOpen ? 0 : -1}
            onClick={() => setMobileOpen(false)}
          />
        </div>

        <aside
          id={drawerId}
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex w-[min(85vw,20rem)] max-w-sm flex-col bg-slate-800 text-white shadow-xl transition-transform duration-200 ease-out lg:hidden",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
          aria-hidden={!mobileOpen}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
            <p className="text-sm font-bold tracking-tight">{PRODUCT}</p>
            <button
              type="button"
              className="rounded-md p-2 text-lg leading-none text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              onClick={() => setMobileOpen(false)}
              aria-label="Close sidebar"
            >
              ×
            </button>
          </div>
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
            {sidebarNav}
          </div>
        </aside>

        <main className="htp-admin-shell w-full min-w-0 flex-1">
          <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">{props.children}</div>
        </main>
      </div>
    </div>
  );
}
