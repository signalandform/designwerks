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
    <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.03] p-10 shadow-2xl shadow-black/40 backdrop-blur">
      <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-300">
        Admin
      </p>
      <h1 className="mt-3 text-3xl font-black uppercase tracking-tight">
        Sign in
      </h1>
      <p className="mt-3 text-sm text-stone-400">
        Use a Supabase Auth account that has been granted access for this
        deployment&apos;s{" "}
        <span className="font-semibold text-stone-200">SITE_SLUG</span> in the{" "}
        <span className="font-semibold text-stone-200">dw_site_admins</span>{" "}
        table.
      </p>
      {props.serverAlert ? (
        <p className="mt-5 rounded-2xl border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-sm font-semibold text-amber-100">
          {props.serverAlert}
        </p>
      ) : null}
      <form className="mt-8 grid gap-5" onSubmit={(e) => void onSubmit(e)}>
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-400">
          Email
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-2xl border border-white/10 bg-stone-950 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
            placeholder="you@company.com"
          />
        </label>
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.18em] text-stone-400">
          Password
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-2xl border border-white/10 bg-stone-950 px-4 py-3 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-sky-400"
            placeholder="Password"
          />
        </label>
        {error ? (
          <p className="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={loading || email.trim().length === 0 || password.length === 0}
          className="rounded-full bg-sky-400 px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-stone-950 transition hover:bg-sky-300 disabled:opacity-40"
        >
          {loading ? "Signing in…" : "Continue"}
        </button>
      </form>
    </div>
  );
}
