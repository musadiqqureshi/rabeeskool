"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { studentSignIn, studentSignUp, type CheckoutAuthState } from "./actions";

const field = "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="grad-brand w-full rounded-xl px-6 py-3.5 text-[15px] font-semibold text-white shadow-card transition-transform hover:scale-[1.01] disabled:opacity-60">
      {pending ? "Please wait…" : label}
    </button>
  );
}

export function CheckoutAuth({ academyId, back }: { academyId: string; back: string }) {
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const action = mode === "signup" ? studentSignUp : studentSignIn;
  const [state, formAction] = useActionState<CheckoutAuthState, FormData>(action, null);

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-2">
        <span className="grad-brand flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white">1</span>
        <h2 className="text-xl font-semibold text-ink">Create your student account</h2>
      </div>
      <p className="mt-2 text-sm text-muted">You need an account to enroll and track your progress.</p>

      <div className="mt-5 flex rounded-pill bg-slate-100 p-1 text-sm font-semibold">
        <button type="button" onClick={() => setMode("signup")} className={`flex-1 rounded-pill px-4 py-2 ${mode === "signup" ? "grad-brand text-white" : "text-muted"}`}>New student</button>
        <button type="button" onClick={() => setMode("signin")} className={`flex-1 rounded-pill px-4 py-2 ${mode === "signin" ? "grad-brand text-white" : "text-muted"}`}>I have an account</button>
      </div>

      <form action={formAction} className="mt-5 space-y-4">
        <input type="hidden" name="academy_id" value={academyId} />
        <input type="hidden" name="back" value={back} />
        {mode === "signup" && (
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Full name</label>
            <input name="full_name" required className={field} placeholder="Your name" />
          </div>
        )}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Email</label>
          <input name="email" type="email" required className={field} placeholder="you@example.com" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Password</label>
          <input name="password" type="password" required className={field} placeholder={mode === "signup" ? "At least 8 characters" : "Your password"} />
        </div>
        {state?.error && <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{state.error}</p>}
        <Submit label={mode === "signup" ? "Continue to payment" : "Sign in & continue"} />
      </form>
    </div>
  );
}
