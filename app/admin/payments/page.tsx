import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { requireAcademy } from "@/lib/academy";
import { savePaymentDetails, reviewEnrollment } from "./actions";

export const metadata = { title: "Payments — RabeeSkool" };

const field = "w-full rounded-lg border border-line px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

type EnrollRow = {
  id: string;
  amount: number;
  method: string;
  proof_url: string | null;
  status: string;
  created_at: string;
  invoice_no: string | null;
  courses: { title: string } | null;
  profiles: { full_name: string | null } | null;
};

function rs(n: number) {
  return "Rs " + n.toLocaleString("en-PK");
}

export default async function PaymentsPage() {
  const academy = await requireAcademy();
  const supabase = await createClient();

  const { data: acad } = await supabase
    .from("academies")
    .select("bank_name, account_title, account_number, jazzcash_number, easypaisa_number, payment_instructions")
    .eq("id", academy.academyId)
    .maybeSingle();

  const { data: enrollmentsData } = await supabase
    .from("enrollments")
    .select("id, amount, method, proof_url, status, created_at, invoice_no, courses ( title ), profiles:student_id ( full_name )")
    .eq("academy_id", academy.academyId)
    .order("created_at", { ascending: false });

  const enrollments = (enrollmentsData ?? []) as unknown as EnrollRow[];
  const pending = enrollments.filter((e) => e.status === "pending");
  const reviewed = enrollments.filter((e) => e.status !== "pending");

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Payments</h1>
      <p className="mt-1 text-muted">Set how students pay you, and approve their payments.</p>

      {/* Pending queue */}
      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-ink">
          Pending payments
          {pending.length > 0 && (
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">{pending.length}</span>
          )}
        </h2>

        {pending.length === 0 ? (
          <p className="mt-3 rounded-2xl border border-dashed border-line bg-white px-6 py-10 text-center text-muted">
            No payments waiting for review. 🎉
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {pending.map((e) => (
              <div key={e.id} className="rounded-2xl border border-line bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-ink">{e.courses?.title ?? "Course"}</p>
                    <p className="text-sm text-muted">
                      {e.profiles?.full_name ?? "Student"} · {rs(e.amount)} · via {e.method}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">{new Date(e.created_at).toLocaleString("en-PK")}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <form action={reviewEnrollment}>
                      <input type="hidden" name="id" value={e.id} />
                      <input type="hidden" name="decision" value="active" />
                      <button className="grad-brand rounded-lg px-4 py-2 text-sm font-semibold text-white">Approve &amp; enroll</button>
                    </form>
                    <form action={reviewEnrollment}>
                      <input type="hidden" name="id" value={e.id} />
                      <input type="hidden" name="decision" value="rejected" />
                      <button className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50">Reject</button>
                    </form>
                  </div>
                </div>
                {e.proof_url && (
                  <a href={e.proof_url} target="_blank" rel="noreferrer" className="mt-3 inline-block">
                    <Image src={e.proof_url} alt="Payment proof" width={220} height={140} className="rounded-lg border border-line object-cover" unoptimized />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Payment settings */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-ink">Your payment details</h2>
        <p className="mt-1 text-sm text-muted">Students see these at checkout to transfer your fee.</p>
        <form action={savePaymentDetails} className="mt-4 space-y-4 rounded-2xl border border-line bg-white p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Bank name</label>
              <input name="bank_name" defaultValue={acad?.bank_name ?? ""} placeholder="e.g. Meezan Bank" className={field} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Account title</label>
              <input name="account_title" defaultValue={acad?.account_title ?? ""} placeholder="Account holder name" className={field} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Account number / IBAN</label>
              <input name="account_number" defaultValue={acad?.account_number ?? ""} placeholder="PK.. or account no." className={field} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">JazzCash number</label>
              <input name="jazzcash_number" defaultValue={acad?.jazzcash_number ?? ""} placeholder="03xx-xxxxxxx" className={field} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Easypaisa number</label>
              <input name="easypaisa_number" defaultValue={acad?.easypaisa_number ?? ""} placeholder="03xx-xxxxxxx" className={field} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">Instructions for students (optional)</label>
            <textarea name="payment_instructions" rows={2} defaultValue={acad?.payment_instructions ?? ""} placeholder="e.g. Send the exact amount and upload the screenshot." className={field} />
          </div>
          <button className="rounded-lg border border-brand-600 px-4 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50">Save payment details</button>
        </form>
      </section>

      {/* History */}
      {reviewed.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-ink">Recent decisions</h2>
          <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-white">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line text-muted">
                <tr>
                  <th className="px-5 py-3 font-medium">Student</th>
                  <th className="px-5 py-3 font-medium">Course</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {reviewed.map((e) => (
                  <tr key={e.id}>
                    <td className="px-5 py-3 text-ink">{e.profiles?.full_name ?? "Student"}</td>
                    <td className="px-5 py-3 text-muted">{e.courses?.title ?? "—"}</td>
                    <td className="px-5 py-3 text-ink">{rs(e.amount)}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${e.status === "active" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                          {e.status === "active" ? "Approved" : "Rejected"}
                        </span>
                        {e.status === "active" && (
                          <a href={`/invoice/${e.id}`} target="_blank" rel="noreferrer" className="text-xs font-medium text-brand-600 hover:underline">
                            Invoice
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
