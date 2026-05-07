"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

function resolveNext(path: string | undefined): string {
  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return "/admin";
  }
  return path;
}

const fieldClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-[#C73A34]/35 focus:ring-offset-0";

export function LoginForm(props: {
  nextPath?: string;
  serverAlert?: string | null;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (signError) {
        throw new Error(signError.message);
      }
      router.replace(resolveNext(props.nextPath));
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
        Design Werks Studio
      </p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">Sign in</h1>
      <p className="mt-2 text-sm text-slate-500">
        Use a Supabase Auth account that has been granted access for this
        deployment&apos;s{" "}
        <span className="font-medium text-slate-700">SITE_SLUG</span> in the{" "}
        <span className="font-medium text-slate-700">dw_site_admins</span>{" "}
        table.
      </p>
      {props.serverAlert ? (
        <p className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          {props.serverAlert}
        </p>
      ) : null}
      <form className="mt-8 grid gap-5" onSubmit={(e) => void onSubmit(e)}>
        <label className="grid gap-1">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass}
            placeholder="you@company.com"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-medium text-slate-700">Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={fieldClass}
            placeholder="Password"
          />
        </label>
        {error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-[#C73A34]">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={loading || email.trim().length === 0 || password.length === 0}
          className="rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Continue"}
        </button>
      </form>
    </div>
  );
}
