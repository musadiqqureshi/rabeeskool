"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Logo } from "@/components/logo";
import { createAcademy, type OnboardState } from "./actions";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="grad-brand w-full rounded-pill px-6 py-3.5 text-base font-semibold text-white shadow-card transition-transform hover:scale-[1.01] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      {pending ? "Creating…" : "Create my academy"}
    </button>
  );
}

export function OnboardingForm() {
  const [state, formAction] = useActionState<OnboardState, FormData>(createAcademy, null);

  return (
    <div className="w-full max-w-md text-center">
      <div className="mb-6 flex justify-center">
        <Logo size={44} />
      </div>
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Name your academy</h1>
      <p className="mt-2 text-muted">
        This is what your students will see. You can change it anytime.
      </p>

      <form action={formAction} className="mt-8 space-y-4 text-left">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
            Academy name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoFocus
            placeholder="e.g. Ahmed's Coding Academy"
            className="w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>

        {state?.error && (
          <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">
            {state.error}
          </p>
        )}

        <Submit />
      </form>
    </div>
  );
}
