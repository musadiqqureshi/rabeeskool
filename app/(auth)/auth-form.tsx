"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { signIn, signUp, type AuthState } from "./actions";

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="grad-brand w-full rounded-pill px-6 py-3.5 text-base font-semibold text-white shadow-card transition-transform hover:scale-[1.01] disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      {pending ? "Please wait…" : label}
    </button>
  );
}

const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

export function AuthForm({ mode, next }: { mode: "signin" | "signup"; next?: string }) {
  const action = mode === "signin" ? signIn : signUp;
  const [state, formAction] = useActionState<AuthState, FormData>(action, null);

  const isSignup = mode === "signup";

  return (
    <div className="w-full max-w-md">
      <Link href="/" className="mb-8 flex items-center gap-2.5">
        <Logo />
        <span className="text-xl font-semibold tracking-tight text-ink">
          Rabee<span className="text-brand-600">Skool</span>
        </span>
      </Link>

      <h1 className="text-3xl font-semibold tracking-tight text-ink">
        {isSignup ? "Create your academy" : "Welcome back"}
      </h1>
      <p className="mt-2 text-muted">
        {isSignup
          ? "Start teaching in minutes — keep 100% of what you earn."
          : "Sign in to your RabeeSkool dashboard."}
      </p>

      <form action={formAction} className="mt-8 space-y-4">
        {next && <input type="hidden" name="next" value={next} />}

        {isSignup && (
          <div>
            <label htmlFor="full_name" className="mb-1.5 block text-sm font-medium text-ink">
              Full name
            </label>
            <input id="full_name" name="full_name" type="text" autoComplete="name" required className={inputClass} placeholder="Ustad Ahmed" />
          </div>
        )}

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
            Email
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required className={inputClass} placeholder="you@example.com" />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={isSignup ? "new-password" : "current-password"}
            required
            className={inputClass}
            placeholder={isSignup ? "At least 8 characters" : "••••••••"}
          />
        </div>

        {state?.error && (
          <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">
            {state.error}
          </p>
        )}

        <Submit label={isSignup ? "Create academy" : "Sign in"} />
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        {isSignup ? "Already have an academy? " : "New to RabeeSkool? "}
        <Link
          href={isSignup ? "/login" : "/signup"}
          className="font-semibold text-brand-600 hover:text-brand-700"
        >
          {isSignup ? "Sign in" : "Create your academy"}
        </Link>
      </p>
    </div>
  );
}
