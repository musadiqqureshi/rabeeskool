"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAcademy } from "@/lib/academy";

export async function savePaymentDetails(formData: FormData) {
  const academy = await requireAcademy();
  const supabase = await createClient();

  const { error } = await supabase
    .from("academies")
    .update({
      bank_name: String(formData.get("bank_name") ?? "").trim() || null,
      account_title: String(formData.get("account_title") ?? "").trim() || null,
      account_number: String(formData.get("account_number") ?? "").trim() || null,
      jazzcash_number: String(formData.get("jazzcash_number") ?? "").trim() || null,
      easypaisa_number: String(formData.get("easypaisa_number") ?? "").trim() || null,
      payment_instructions: String(formData.get("payment_instructions") ?? "").trim() || null,
    })
    .eq("id", academy.academyId);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/payments");
}

function invoiceNo() {
  return "INV-" + Date.now().toString(36).toUpperCase();
}

export async function reviewEnrollment(formData: FormData) {
  const id = String(formData.get("id"));
  const decision = String(formData.get("decision")); // 'active' | 'rejected'
  const status = decision === "active" ? "active" : "rejected";

  await requireAcademy(); // ensures caller is an owner/admin
  const supabase = await createClient();

  const patch: Record<string, unknown> = { status, reviewed_at: new Date().toISOString() };
  if (status === "active") patch.invoice_no = invoiceNo();

  const { error } = await supabase.from("enrollments").update(patch).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/payments");
  revalidatePath("/admin");
}
