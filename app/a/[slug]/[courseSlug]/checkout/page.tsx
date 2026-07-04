import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/logo";
import { CheckoutAuth } from "./checkout-auth";
import { PaymentStep } from "./payment-step";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ slug: string; courseSlug: string }>;
}) {
  const { slug, courseSlug } = await params;
  const supabase = await createClient();

  const { data: academy } = await supabase
    .from("academies")
    .select("id, name, slug, bank_name, account_title, account_number, jazzcash_number, easypaisa_number, payment_instructions")
    .eq("slug", slug)
    .maybeSingle();
  if (!academy) notFound();

  const { data: course } = await supabase
    .from("courses")
    .select("id, title, price, slug, status")
    .eq("academy_id", academy.id)
    .eq("slug", courseSlug)
    .maybeSingle();
  if (!course || course.status !== "published") notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Already enrolled? Send them back to the course.
  if (user) {
    const { data: existing } = await supabase
      .from("enrollments")
      .select("status")
      .eq("course_id", course.id)
      .eq("student_id", user.id)
      .maybeSingle();
    if (existing?.status === "active") {
      return <Redirect href={`/a/${slug}/${courseSlug}`} />;
    }
  }

  const back = `/a/${slug}/${courseSlug}/checkout`;

  return (
    <div className="grad-hero-bg min-h-screen">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href={`/a/${slug}`} className="flex items-center gap-2.5">
            <Logo />
            <span className="text-lg font-semibold tracking-tight text-ink">{academy.name}</span>
          </Link>
          <Link href={`/a/${slug}/${courseSlug}`} className="text-sm font-medium text-muted hover:text-brand-600">
            ← Back to course
          </Link>
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px]">
        <div>
          {user ? (
            <PaymentStep academy={academy} course={course} slug={slug} courseSlug={courseSlug} />
          ) : (
            <CheckoutAuth academyId={academy.id} back={back} />
          )}
        </div>

        {/* Order summary */}
        <aside className="h-fit rounded-2xl border border-line bg-white p-6 shadow-card">
          <p className="text-sm font-semibold text-muted">Order summary</p>
          <p className="mt-3 text-lg font-semibold text-ink">{course.title}</p>
          <p className="text-sm text-muted">{academy.name}</p>
          <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
            <span className="text-muted">Total</span>
            <span className="text-2xl font-semibold text-brand-700">
              {course.price > 0 ? `Rs ${course.price.toLocaleString("en-PK")}` : "Free"}
            </span>
          </div>
          <p className="mt-4 text-xs text-muted">
            0% platform fee — your payment goes directly to {academy.name}.
          </p>
        </aside>
      </div>
    </div>
  );
}

function Redirect({ href }: { href: string }) {
  return (
    <meta httpEquiv="refresh" content={`0; url=${href}`} />
  );
}
