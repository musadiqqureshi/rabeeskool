import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireAcademy } from "@/lib/academy";
import { createCourse } from "./actions";

export const metadata = { title: "Courses — RabeeSkool" };

function NewCourseForm() {
  return (
    <form action={createCourse} className="flex flex-wrap items-center gap-2">
      <input
        name="title"
        required
        placeholder="New course title"
        className="w-64 rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
      />
      <button
        type="submit"
        className="grad-brand rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-card transition-transform hover:scale-[1.02]"
      >
        Create course
      </button>
    </form>
  );
}

export default async function CoursesPage() {
  const academy = await requireAcademy();
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from("courses")
    .select("id, title, status, price, created_at")
    .eq("academy_id", academy.academyId)
    .order("created_at", { ascending: false });

  const list = courses ?? [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-ink">Courses</h1>
          <p className="mt-1 text-muted">Build, price and publish your courses.</p>
        </div>
        <NewCourseForm />
      </div>

      {list.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white px-6 py-20 text-center">
          <span className="grad-brand flex h-14 w-14 items-center justify-center rounded-2xl text-white">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19V6a2 2 0 0 1 2-2h12v13M6 17h12" /></svg>
          </span>
          <h2 className="mt-5 text-xl font-semibold text-ink">No courses yet</h2>
          <p className="mt-2 max-w-sm text-muted">
            Create your first course above, then add modules, lessons and videos.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <Link
              key={c.id}
              href={`/admin/courses/${c.id}`}
              className="group rounded-2xl border border-line bg-white p-5 shadow-card transition-shadow hover:shadow-float"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                    c.status === "published"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {c.status === "published" ? "Published" : "Draft"}
                </span>
                <span className="text-sm font-semibold text-ink">
                  {c.price > 0 ? `Rs ${c.price.toLocaleString("en-PK")}` : "Free"}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-ink group-hover:text-brand-700">{c.title}</h3>
              <p className="mt-1 text-sm text-muted">Open builder →</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
