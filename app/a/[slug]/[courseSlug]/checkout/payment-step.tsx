"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { submitEnrollment } from "./actions";

type Academy = {
  id: string;
  name: string;
  bank_name: string | null;
  account_title: string | null;
  account_number: string | null;
  jazzcash_number: string | null;
  easypaisa_number: string | null;
  payment_instructions: string | null;
};
type Course = { id: string; title: string; price: number };

function Submit({ free }: { free: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="grad-brand w-full rounded-xl px-6 py-3.5 text-[15px] font-semibold text-white shadow-card transition-transform hover:scale-[1.01] disabled:opacity-60">
      {pending ? "Submitting…" : free ? "Enroll for free" : "I've paid — submit for approval"}
    </button>
  );
}

export function PaymentStep({
  academy,
  course,
  slug,
  courseSlug,
}: {
  academy: Academy;
  course: Course;
  slug: string;
  courseSlug: string;
}) {
  const free = course.price === 0;
  const methods = [
    academy.bank_name && { id: "bank", label: `Bank transfer — ${academy.bank_name}`, detail: `${academy.account_title ?? ""} · ${academy.account_number ?? ""}` },
    academy.jazzcash_number && { id: "jazzcash", label: "JazzCash", detail: academy.jazzcash_number },
    academy.easypaisa_number && { id: "easypaisa", label: "Easypaisa", detail: academy.easypaisa_number },
  ].filter(Boolean) as { id: string; label: string; detail: string }[];

  const [method, setMethod] = useState(methods[0]?.id ?? "bank");

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-center gap-2">
        <span className="grad-brand flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white">2</span>
        <h2 className="text-xl font-semibold text-ink">{free ? "Confirm enrollment" : "Make your payment"}</h2>
      </div>

      <form action={submitEnrollment} className="mt-5 space-y-5">
        <input type="hidden" name="academy_id" value={academy.id} />
        <input type="hidden" name="course_id" value={course.id} />
        <input type="hidden" name="amount" value={course.price} />
        <input type="hidden" name="slug" value={slug} />
        <input type="hidden" name="course_slug" value={courseSlug} />
        <input type="hidden" name="method" value={method} />

        {!free && (
          <>
            {methods.length === 0 ? (
              <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
                {academy.name} hasn&apos;t added payment details yet. Please check back soon.
              </p>
            ) : (
              <div className="space-y-2">
                <p className="text-sm font-medium text-ink">Pay <span className="text-brand-700">Rs {course.price.toLocaleString("en-PK")}</span> using one of these:</p>
                {methods.map((m) => (
                  <label key={m.id} className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 ${method === m.id ? "border-brand-500 bg-brand-50" : "border-line"}`}>
                    <input type="radio" name="method_pick" checked={method === m.id} onChange={() => setMethod(m.id)} className="mt-1 h-4 w-4 accent-brand-600" />
                    <span>
                      <span className="block text-sm font-semibold text-ink">{m.label}</span>
                      <span className="block select-all text-sm text-muted">{m.detail}</span>
                    </span>
                  </label>
                ))}
              </div>
            )}

            {academy.payment_instructions && (
              <p className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-muted">{academy.payment_instructions}</p>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink">Upload payment screenshot</label>
              <input name="proof" type="file" accept="image/*" required className="w-full rounded-xl border border-line px-4 py-2.5 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-brand-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-brand-700" />
              <p className="mt-1.5 text-xs text-muted">The owner reviews your proof and enrolls you — usually within a few hours.</p>
            </div>
          </>
        )}

        {free && <p className="text-sm text-muted">This course is free. Click below to get instant access.</p>}

        <Submit free={free} />
      </form>
    </div>
  );
}
