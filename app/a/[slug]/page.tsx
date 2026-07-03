import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/logo";

export default async function AcademyHome({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: academy } = await supabase
    .from("academies")
    .select("id, name, slug")
    .eq("slug", slug)
    .maybeSingle();

  if (!academy) notFound();

  const { data: courses } = await supabase
    .from("courses")
    .select("id, title, description, price, slug")
    .eq("academy_id", academy.id)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  const list = courses ?? [];

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center gap-2.5 px-4 sm:px-6">
          <Logo />
          <span className="text-lg font-semibold tracking-tight text-ink">{academy.name}</span>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Courses</h1>
        <p className="mt-2 text-muted">Browse and enroll in courses from {academy.name}.</p>

        {list.length === 0 ? (
          <p className="mt-10 rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center text-muted">
            No published courses yet — check back soon.
          </p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((c) => (
              <Link
                key={c.id}
                href={`/a/${academy.slug}/${c.slug}`}
                className="group rounded-2xl border border-line bg-white p-6 shadow-card transition-shadow hover:shadow-float"
              >
                <div className="grad-brand-strong flex h-28 items-center justify-center rounded-xl text-white">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19V6a2 2 0 0 1 2-2h12v13M6 17h12" /></svg>
                </div>
                <h2 className="mt-4 text-lg font-semibold text-ink group-hover:text-brand-700">{c.title}</h2>
                {c.description && <p className="mt-1 line-clamp-2 text-sm text-muted">{c.description}</p>}
                <p className="mt-4 text-base font-semibold text-brand-700">
                  {c.price > 0 ? `Rs ${c.price.toLocaleString("en-PK")}` : "Free"}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
