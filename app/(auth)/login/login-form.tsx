"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { signIn, sendMagicLink, sendPasswordReset, type AuthState, type NoticeState } from "../actions";

const inputBox =
  "w-full rounded-xl border border-line bg-slate-50 py-3 pl-11 pr-4 text-[15px] text-ink outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100";

function SubmitPrimary() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="grad-brand w-full rounded-xl px-6 py-3.5 text-[15px] font-semibold text-white shadow-card transition-transform hover:scale-[1.01] disabled:opacity-60"
    >
      {pending ? "Signing in…" : "Continue to dashboard"}
    </button>
  );
}

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction] = useActionState<AuthState, FormData>(signIn, null);
  const [magic, magicAction] = useActionState<NoticeState, FormData>(sendMagicLink, null);
  const [reset, resetAction] = useActionState<NoticeState, FormData>(sendPasswordReset, null);

  return (
    <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2">
      {/* Left dark portal card */}
      <div className="relative hidden overflow-hidden rounded-3xl bg-slate-950 p-10 lg:block">
        <span className="inline-flex items-center gap-2 rounded-pill bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white/90">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" /></svg>
          PORTAL ACCESS
        </span>
        <p className="mt-8 text-sm text-white/50">rabeeskool.com</p>
        <h2 className="mt-2 text-4xl font-semibold leading-tight text-white">
          Welcome back to<br />RabeeSkool.
        </h2>
        <p className="mt-4 max-w-sm text-white/60">
          Sign in to continue your courses, coaching sessions, community
          conversations and member-only updates from one clean portal.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            { t: "Courses", s: "Pick up where you left off", d: "M4 19V6a2 2 0 0 1 2-2h12v13M6 17h12" },
            { t: "Community", s: "Join discussions", d: "M21 12a8 8 0 0 1-11 7l-5 2 1.5-4.5A8 8 0 1 1 21 12z" },
            { t: "Coaching", s: "Manage sessions", d: "M3 8h18M7 3v3M17 3v3M4 6h16v14H4z" },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={c.d} /></svg>
              </span>
              <p className="mt-3 text-sm font-semibold text-white">{c.t}</p>
              <p className="text-xs text-white/50">{c.s}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right form card */}
      <div className="mx-auto w-full max-w-md rounded-3xl border border-line bg-white p-8 shadow-float sm:p-10">
        <div className="flex items-start justify-between">
          <span className="inline-flex items-center gap-2 rounded-pill bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" /></svg>
            SIGN IN
          </span>
          <span className="grad-brand flex h-11 w-11 items-center justify-center rounded-xl text-lg font-semibold text-white">R</span>
        </div>

        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-ink">Account login</h1>
        <p className="mt-2 text-muted">
          Use your RabeeSkool credentials to continue into your dashboard.
        </p>

        <form action={formAction} className="mt-7 space-y-4">
          {next && <input type="hidden" name="next" value={next} />}
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">Email address</label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
              </span>
              <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" className={inputBox} />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wide text-muted">Password</label>
              <button formAction={resetAction} className="text-xs font-semibold text-brand-600 hover:text-brand-700">Forgot password?</button>
            </div>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
              </span>
              <input id="password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" className={inputBox} />
            </div>
          </div>

          {state?.error && <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">{state.error}</p>}
          {reset?.ok && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{reset.ok}</p>}
          {reset?.error && <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{reset.error}</p>}

          <SubmitPrimary />
        </form>

        <div className="my-5 flex items-center gap-3 text-xs font-medium text-muted">
          <span className="h-px flex-1 bg-line" /> OR <span className="h-px flex-1 bg-line" />
        </div>

        <form action={magicAction}>
          <input type="hidden" name="email" value="" id="magic-email-mirror" />
          <MagicButton />
          {magic?.ok && <p className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{magic.ok}</p>}
          {magic?.error && <p className="mt-3 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{magic.error}</p>}
        </form>

        <p className="mt-6 text-sm text-muted">
          Need an account?{" "}
          <Link href="/signup" className="font-semibold text-brand-600 hover:text-brand-700">Create one here</Link>
        </p>
        <Link href="/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          Back to homepage
        </Link>
      </div>
    </div>
  );
}

function MagicButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        const email = (document.getElementById("email") as HTMLInputElement)?.value ?? "";
        (e.currentTarget.form!.querySelector("#magic-email-mirror") as HTMLInputElement).value = email;
      }}
      className="w-full rounded-xl border border-line bg-white px-6 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:bg-slate-50 disabled:opacity-60"
    >
      {pending ? "Sending…" : "Email me a magic sign-in link"}
    </button>
  );
}
