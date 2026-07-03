import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { OnboardingForm } from "./onboarding-form";

export const metadata = { title: "Set up your academy — RabeeSkool" };

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Already has an academy? Skip straight to the dashboard.
  const { data: membership } = await supabase
    .from("memberships")
    .select("academy_id")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (membership) redirect("/admin");

  return (
    <div className="grad-hero-bg relative min-h-screen">
      <OnboardingForm />
    </div>
  );
}
