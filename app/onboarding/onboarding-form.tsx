"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { Logo } from "@/components/logo";
import { signOut } from "@/app/(auth)/actions";
import { createAcademy, type OnboardState } from "./actions";

function cleanSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+/g, "").slice(0, 30);
}

const planFeatures = [
  "Host unlimited courses and sell to students across Pakistan",
  "Automate marketing with built-in email & WhatsApp sequences",
  "Offer tiered plans — with 0% platform transaction fees",
  "Auto-issue branded certificates on course completion",
  "Connect your own custom domain for a white-labeled academy",
  "Advanced analytics to track progress and course completion",
  "Built-in community with discussion boards and comments",
];

const confirmations = [
  { key: "video", label: "Video hosting", body: "We don't host videos on our servers. You keep 100% control by connecting your own Google Drive for course videos and files." },
  { key: "pay", label: "Payments", body: "We don't process payments. You collect money via your own bank / JazzCash / Easypaisa account (instant PayFast checkout coming soon)." },
  { key: "email", label: "Transactional email (SMTP)", body: "We don't provide an SMTP server. Plug in your own provider (e.g. Brevo, Resend, SES) for receipts and notifications." },
];

function Submit({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={disabled || pending}
      className="grad-brand inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-semibold text-white shadow-card transition-transform enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pending ? "Launching…" : "Launch my academy"}
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
    </button>
  );
}

export function OnboardingForm() {
  const [state, formAction] = useActionState<OnboardState, FormData>(createAcademy, null);
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const slugValid = cleanSlug(slug).length >= 3;
  const allChecked = confirmations.every((c) => checks[c.key]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="absolute right-4 top-4 sm:right-8 sm:top-8">
        <form action={signOut}>
          <button type="submit" className="rounded-pill border border-line bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-slate-50">
            Log out
          </button>
        </form>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-2.5">
          <Logo size={40} />
          <span className="text-2xl font-semibold tracking-tight text-ink">Rabee<span className="text-brand-600">Skool</span></span>
        </div>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink">Launch your LMS platform</h1>
        <p className="mt-3 max-w-xl text-muted">
          Claim your subdomain and we&apos;ll spin up your academy — courses,
          community and payments — in seconds.
        </p>
      </div>

      {/* Stepper */}
      <div className="mx-auto mt-8 flex max-w-md items-center gap-3 text-xs font-semibold">
        <span className={step >= 1 ? "text-brand-600" : "text-muted"}>1. SCHOOL SETUP</span>
        <span className="h-1 flex-1 overflow-hidden rounded-full bg-slate-200">
          <span className="grad-brand block h-full transition-all" style={{ width: step >= 2 ? "100%" : "50%" }} />
        </span>
        <span className={step >= 2 ? "text-brand-600" : "text-muted"}>2. PICK A PLAN</span>
      </div>

      <form action={formAction} className="mt-8 rounded-3xl border border-line bg-white p-6 shadow-float sm:p-8">
        <input type="hidden" name="name" value={name} />
        <input type="hidden" name="slug" value={cleanSlug(slug)} />

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label htmlFor="lms-name" className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-ink">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" /></svg>
                Academy name
              </label>
              <input
                id="lms-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!slug) setSlug(cleanSlug(e.target.value));
                }}
                placeholder="e.g. Ahmed's Coding Academy"
                className="w-full rounded-xl border border-line px-4 py-3 text-[15px] outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
              />
              <p className="mt-1.5 text-xs text-muted">This shows in your admin panel and student dashboards.</p>
            </div>

            <div>
              <label htmlFor="lms-slug" className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-ink">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></svg>
                Subdomain
              </label>
              <div className="flex items-stretch overflow-hidden rounded-xl border border-line focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100">
                <input
                  id="lms-slug"
                  value={slug}
                  onChange={(e) => setSlug(cleanSlug(e.target.value))}
                  placeholder="ahmed-academy"
                  className="flex-1 px-4 py-3 text-[15px] outline-none"
                />
                <span className="flex items-center bg-slate-50 px-4 text-sm text-muted">.rabeeskool.com</span>
              </div>
              <p className="mt-1.5 text-xs text-muted">Lowercase letters, numbers and dashes. 3–30 characters.</p>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!name.trim() || !slugValid}
                className="grad-brand inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[15px] font-semibold text-white transition-transform enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue to plans
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
                Back
              </button>
              <div className="flex rounded-pill bg-slate-100 p-1 text-sm font-semibold">
                <button type="button" onClick={() => setBilling("monthly")} className={`rounded-pill px-4 py-1.5 ${billing === "monthly" ? "grad-brand text-white" : "text-muted"}`}>Monthly</button>
                <button type="button" onClick={() => setBilling("yearly")} className={`rounded-pill px-4 py-1.5 ${billing === "yearly" ? "grad-brand text-white" : "text-muted"}`}>Yearly <span className="text-emerald-500">−17%</span></button>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-brand-500 bg-brand-50/40 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-ink">Pro Plan</h3>
                  <p className="text-sm text-muted">Unlock every RabeeSkool feature.</p>
                </div>
                <span className="grad-brand flex h-6 w-6 items-center justify-center rounded-full text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                </span>
              </div>
              <p className="mt-4 text-3xl font-semibold text-ink">
                {billing === "monthly" ? "Rs 6,999" : "Rs 69,999"}
                <span className="text-sm font-medium text-muted">/{billing === "monthly" ? "month" : "year"}</span>
              </p>
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {planFeatures.map((f) => (
                  <p key={f} className="flex items-start gap-2 text-sm text-ink">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-amber-900">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
                Before you launch — please read &amp; confirm
              </p>
              <p className="mt-1 text-xs text-amber-800">
                RabeeSkool is a lean platform — you bring your own video, payments and email providers. Confirm all three to continue.
              </p>
              <div className="mt-4 space-y-3">
                {confirmations.map((c) => (
                  <label key={c.key} className="flex cursor-pointer items-start gap-3 rounded-xl bg-white/70 p-3 text-sm">
                    <input
                      type="checkbox"
                      checked={!!checks[c.key]}
                      onChange={(e) => setChecks((p) => ({ ...p, [c.key]: e.target.checked }))}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-brand-600"
                    />
                    <span className="text-ink"><span className="font-semibold">{c.label}:</span> {c.body}</span>
                  </label>
                ))}
              </div>
            </div>

            {state?.error && <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">{state.error}</p>}

            <div className="flex items-center justify-between">
              <p className="text-xs text-muted">{allChecked ? "All set — launch your academy." : "Check all three boxes to continue."}</p>
              <Submit disabled={!allChecked} />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
