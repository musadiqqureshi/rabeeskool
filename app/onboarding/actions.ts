"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type OnboardState = { error: string } | null;

function cleanSlug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30);
}

export async function createAcademy(
  _prev: OnboardState,
  formData: FormData
): Promise<OnboardState> {
  const name = String(formData.get("name") ?? "").trim();
  const slug = cleanSlug(String(formData.get("slug") ?? ""));

  if (!name) return { error: "Give your academy a name." };
  if (slug.length < 3) return { error: "Subdomain must be at least 3 characters." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: taken } = await supabase
    .from("academies")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (taken) return { error: "That subdomain is already taken — try another." };

  const { data: academy, error } = await supabase
    .from("academies")
    .insert({ name, slug, owner_id: user.id })
    .select("id")
    .single();
  if (error) return { error: error.message };

  const { error: memberError } = await supabase
    .from("memberships")
    .insert({ academy_id: academy.id, user_id: user.id, role: "owner" });
  if (memberError) return { error: memberError.message };

  redirect("/admin");
}
