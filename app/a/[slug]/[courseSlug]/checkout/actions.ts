"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function ensureStudentMembership(academyId: string, userId: string) {
  const supabase = await createClient();
  await supabase
    .from("memberships")
    .insert({ academy_id: academyId, user_id: userId, role: "student" });
  // Duplicate is fine — unique constraint just no-ops via the ignored error.
}

export type CheckoutAuthState = { error: string } | null;

export async function studentSignUp(
  _prev: CheckoutAuthState,
  formData: FormData
): Promise<CheckoutAuthState> {
  const name = String(formData.get("full_name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const academyId = String(formData.get("academy_id"));
  const back = String(formData.get("back"));

  if (!name || !email || !password) return { error: "Fill in every field." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } },
  });
  if (error) return { error: error.message };
  if (!data.session) return { error: "Check your inbox to confirm your email, then sign in." };

  await ensureStudentMembership(academyId, data.user!.id);
  redirect(back);
}

export async function studentSignIn(
  _prev: CheckoutAuthState,
  formData: FormData
): Promise<CheckoutAuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const academyId = String(formData.get("academy_id"));
  const back = String(formData.get("back"));

  if (!email || !password) return { error: "Enter your email and password." };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  await ensureStudentMembership(academyId, data.user!.id);
  redirect(back);
}

export async function submitEnrollment(formData: FormData) {
  const academyId = String(formData.get("academy_id"));
  const courseId = String(formData.get("course_id"));
  const slug = String(formData.get("slug"));
  const courseSlug = String(formData.get("course_slug"));
  const amount = Math.max(0, Math.round(Number(formData.get("amount") ?? 0)));
  const method = String(formData.get("method") ?? "bank");
  const proof = formData.get("proof") as File | null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/a/${slug}/${courseSlug}/checkout`);

  await ensureStudentMembership(academyId, user.id);

  // Free course → enroll instantly.
  if (amount === 0) {
    await supabase.from("enrollments").upsert(
      {
        academy_id: academyId,
        course_id: courseId,
        student_id: user.id,
        amount: 0,
        method: "free",
        status: "active",
        invoice_no: "INV-" + Date.now().toString(36).toUpperCase(),
        reviewed_at: new Date().toISOString(),
      },
      { onConflict: "course_id,student_id" }
    );
    redirect(`/a/${slug}/${courseSlug}`);
  }

  // Paid course → upload proof, create a pending enrollment.
  let proofUrl: string | null = null;
  if (proof && proof.size > 0) {
    const ext = (proof.name.split(".").pop() || "png").toLowerCase();
    const path = `${academyId}/${user.id}-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("payment-proofs")
      .upload(path, proof, { contentType: proof.type || "image/png", upsert: true });
    if (!upErr) {
      const { data: pub } = supabase.storage.from("payment-proofs").getPublicUrl(path);
      proofUrl = pub.publicUrl;
    }
  }

  await supabase.from("enrollments").upsert(
    {
      academy_id: academyId,
      course_id: courseId,
      student_id: user.id,
      amount,
      method,
      proof_url: proofUrl,
      status: "pending",
    },
    { onConflict: "course_id,student_id" }
  );

  redirect(`/a/${slug}/${courseSlug}`);
}
