import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type CurrentAcademy = {
  userId: string;
  fullName: string | null;
  academyId: string;
  academyName: string;
  slug: string;
  role: string;
};

/**
 * Resolves the signed-in user and their academy for admin pages.
 * Redirects to /login if signed out, or /onboarding if they have no academy.
 */
export async function requireAcademy(): Promise<CurrentAcademy> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: membership } = await supabase
    .from("memberships")
    .select("role, academy_id, academies ( name, slug )")
    .eq("user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!membership) redirect("/onboarding");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle();

  const academy = membership.academies as unknown as { name: string; slug: string };

  return {
    userId: user.id,
    fullName: profile?.full_name ?? null,
    academyId: membership.academy_id,
    academyName: academy?.name ?? "Your academy",
    slug: academy?.slug ?? "",
    role: membership.role,
  };
}
