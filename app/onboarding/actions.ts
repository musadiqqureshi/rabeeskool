"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type OnboardState = { error: string } | null;

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export async function createAcademy(
  _prev: OnboardState,
  formData: FormData
): Promise<OnboardState> {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Give your academy a name." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const base = slugify(name) || "academy";
  const slug = `${base}-${Math.random().toString(36).slice(2, 6)}`;

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
