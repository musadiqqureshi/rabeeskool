"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error: string } | null;

export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!email || !password) return { error: "Enter your email and password." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  redirect(next);
}

export async function signUp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!fullName || !email || !password) return { error: "Fill in every field." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  if (error) return { error: error.message };

  // If email confirmation is off, a session exists now → go to onboarding.
  if (data.session) redirect("/onboarding");
  return { error: "Check your inbox to confirm your email, then sign in." };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3400";
}

export type NoticeState = { error?: string; ok?: string } | null;

export async function sendMagicLink(_prev: NoticeState, formData: FormData): Promise<NoticeState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { error: "Enter your email first." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${siteUrl()}/auth/callback` },
  });
  if (error) return { error: error.message };
  return { ok: "Check your inbox for a sign-in link." };
}

export async function sendPasswordReset(_prev: NoticeState, formData: FormData): Promise<NoticeState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { error: "Enter your email first." };

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl()}/auth/callback?next=/admin`,
  });
  if (error) return { error: error.message };
  return { ok: "If that email exists, a reset link is on its way." };
}
