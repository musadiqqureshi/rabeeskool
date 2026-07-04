import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/logo";
import { PrintButton } from "./print-button";

type Invoice = {
  id: string;
  amount: number;
  method: string;
  status: string;
  invoice_no: string | null;
  created_at: string;
  reviewed_at: string | null;
  courses: { title: string } | null;
  academies: { name: string } | null;
  profiles: { full_name: string | null } | null;
};

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("enrollments")
    .select("id, amount, method, status, invoice_no, created_at, reviewed_at, courses ( title ), academies ( name ), profiles:student_id ( full_name )")
    .eq("id", id)
    .maybeSingle();

  const inv = data as unknown as Invoice | null;
  if (!inv || inv.status !== "active") notFound();

  return (
    <div className="min-h-screen bg-paper py-10">
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-4 flex justify-end print:hidden">
          <PrintButton />
        </div>

        <div className="rounded-2xl border border-line bg-white p-8 shadow-card sm:p-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <Logo />
              <span className="text-lg font-semibold tracking-tight text-ink">{inv.academies?.name}</span>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-ink">INVOICE</p>
              <p className="text-sm text-muted">{inv.invoice_no}</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted">Billed to</p>
              <p className="font-medium text-ink">{inv.profiles?.full_name ?? "Student"}</p>
            </div>
            <div className="text-right">
              <p className="text-muted">Date</p>
              <p className="font-medium text-ink">
                {new Date(inv.reviewed_at ?? inv.created_at).toLocaleDateString("en-PK")}
              </p>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border border-line">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Description</th>
                  <th className="px-4 py-3 text-right font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-line">
                  <td className="px-4 py-3 text-ink">{inv.courses?.title ?? "Course"} — enrollment</td>
                  <td className="px-4 py-3 text-right text-ink">Rs {inv.amount.toLocaleString("en-PK")}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <div className="w-56">
              <div className="flex justify-between border-t-2 border-line pt-3">
                <span className="font-semibold text-ink">Total paid</span>
                <span className="font-semibold text-brand-700">Rs {inv.amount.toLocaleString("en-PK")}</span>
              </div>
              <p className="mt-1 text-right text-xs text-muted">Paid via {inv.method}</p>
            </div>
          </div>

          <p className="mt-10 border-t border-line pt-4 text-center text-xs text-muted">
            Thank you. This invoice was issued by {inv.academies?.name} via RabeeSkool.
          </p>
        </div>
      </div>
    </div>
  );
}
