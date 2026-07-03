"use server";

import { createClient } from "@/lib/supabase/server";

export type FindState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "found"; results: { name: string; slug: string; role: string }[] }
  | { status: "empty" };

export async function findMyLms(_prev: FindState, formData: FormData): Promise<FindState> {
  const email = String(formData.get("email") ?? "").trim();
  if (!email) return { status: "error", message: "Enter your email address." };

  const supabase = await createClient();
  const { data, error } = await supabase.rpc("find_academies_by_email", {
    lookup_email: email,
  });

  if (error) return { status: "error", message: error.message };
  if (!data || data.length === 0) return { status: "empty" };
  return { status: "found", results: data as { name: string; slug: string; role: string }[] };
}
