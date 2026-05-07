"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "ok" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    if (!name || !email || !message) {
      setError("Please fill out every field.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      if (!res.ok) {
        throw new Error(data?.error ?? "Something went wrong.");
      }
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[2rem] bg-stone-100 p-6 shadow-2xl shadow-stone-300/40 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.18em] text-stone-600">
          Name
          <input
            name="name"
            required
            disabled={status === "loading"}
            className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-base font-normal normal-case tracking-normal text-stone-950 outline-none transition focus:border-sky-500 disabled:opacity-60"
            placeholder="Enter name"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.18em] text-stone-600">
          Email
          <input
            name="email"
            type="email"
            required
            disabled={status === "loading"}
            className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-base font-normal normal-case tracking-normal text-stone-950 outline-none transition focus:border-sky-500 disabled:opacity-60"
            placeholder="Enter email"
          />
        </label>
      </div>
      <label className="mt-5 grid gap-2 text-sm font-bold uppercase tracking-[0.18em] text-stone-600">
        Message
        <textarea
          name="message"
          rows={6}
          required
          disabled={status === "loading"}
          className="rounded-2xl border border-stone-200 bg-white px-4 py-3 text-base font-normal normal-case tracking-normal text-stone-950 outline-none transition focus:border-sky-500 disabled:opacity-60"
          placeholder="Tell us about your project"
        />
      </label>
      {status === "ok" ? (
        <p className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900">
          Thanks — your inquiry was received. We’ll follow up soon.
        </p>
      ) : null}
      {status === "error" && error ? (
        <p className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-900">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full rounded-full bg-stone-950 px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:bg-sky-700 disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Submit Inquiry"}
      </button>
    </form>
  );
}
