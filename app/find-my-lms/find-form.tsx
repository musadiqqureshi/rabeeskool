"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { findMyLms, type FindState } from "./actions";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="grad-brand w-full rounded-xl px-6 py-3.5 text-[15px] font-semibold text-white shadow-card transition-transform hover:scale-[1.01] disabled:opacity-60"
    >
      {pending ? "Searching…" : "Find my LMS"}
    </button>
  );
}

export function FindForm() {
  const [state, formAction] = useActionState<FindState, FormData>(findMyLms, { status: "idle" });

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-line bg-white p-8 shadow-float sm:p-10">
        <span className="grad-brand flex h-12 w-12 items-center justify-center rounded-2xl text-white">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
        </span>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink">Find my LMS</h1>
        <p className="mt-2 text-muted">
          Enter the email you signed up with and we&apos;ll show the academies linked to it.
        </p>

        <form action={formAction} className="mt-7 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-line bg-slate-50 px-4 py-3 text-[15px] text-ink outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <Submit />
        </form>

        {state.status === "error" && (
          <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{state.message}</p>
        )}
        {state.status === "empty" && (
          <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
            No academies are linked to that email yet.
          </p>
        )}
        {state.status === "found" && (
          <div className="mt-5 space-y-2">
            <p className="text-sm font-medium text-ink">Academies linked to your email:</p>
            {state.results.map((r) => (
              <Link
                key={r.slug}
                href={r.role === "owner" || r.role === "admin" ? "/login" : `/a/${r.slug}`}
                className="flex items-center justify-between rounded-xl border border-line px-4 py-3 transition-colors hover:bg-brand-50"
              >
                <span>
                  <span className="block text-sm font-semibold text-ink">{r.name}</span>
                  <span className="block text-xs text-muted">/a/{r.slug} · {r.role}</span>
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-600" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
              </Link>
            ))}
          </div>
        )}

        <Link href="/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          Back to homepage
        </Link>
      </div>
    </div>
  );
}
