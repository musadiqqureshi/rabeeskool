import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAcademy } from "@/lib/academy";
import { driveEmbedUrl } from "@/lib/drive";
import {
  updateCourse,
  setCourseStatus,
  deleteCourse,
  addModule,
  deleteModule,
  addLesson,
  updateLesson,
  deleteLesson,
} from "../actions";

type Lesson = { id: string; title: string; content: string | null; video_url: string | null; is_preview: boolean; position: number };
type ModuleRow = { id: string; title: string; position: number; lessons: Lesson[] };

export default async function CourseBuilder({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const academy = await requireAcademy();
  const supabase = await createClient();

  const { data: course } = await supabase
    .from("courses")
    .select("id, title, description, price, status, slug, academy_id")
    .eq("id", courseId)
    .maybeSingle();

  if (!course || course.academy_id !== academy.academyId) notFound();

  const { data: modulesData } = await supabase
    .from("modules")
    .select("id, title, position, lessons ( id, title, content, video_url, is_preview, position )")
    .eq("course_id", courseId)
    .order("position", { ascending: true });

  const modules: ModuleRow[] = (modulesData ?? []).map((m) => ({
    ...m,
    lessons: [...((m.lessons as Lesson[]) ?? [])].sort((a, b) => a.position - b.position),
  }));

  const published = course.status === "published";

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <Link href="/admin/courses" className="text-sm font-medium text-muted hover:text-brand-600">
        ← Back to courses
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-ink">{course.title}</h1>
            <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
              {published ? "Published" : "Draft"}
            </span>
          </div>
          {published && (
            <Link href={`/a/${academy.slug}/${course.slug}`} className="mt-1 inline-block text-sm text-brand-600 hover:text-brand-700">
              View public page ↗
            </Link>
          )}
        </div>
        <div className="flex items-center gap-2">
          <form action={setCourseStatus}>
            <input type="hidden" name="id" value={course.id} />
            <input type="hidden" name="status" value={published ? "draft" : "published"} />
            <button
              type="submit"
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold shadow-card transition-transform hover:scale-[1.02] ${published ? "border border-line bg-white text-ink" : "grad-brand text-white"}`}
            >
              {published ? "Unpublish" : "Publish"}
            </button>
          </form>
          <form action={deleteCourse}>
            <input type="hidden" name="id" value={course.id} />
            <button type="submit" aria-label="Delete course" className="rounded-lg border border-line bg-white p-2.5 text-rose-600 hover:bg-rose-50">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" /></svg>
            </button>
          </form>
        </div>
      </div>

      {/* Course settings */}
      <form action={updateCourse} className="mt-8 space-y-4 rounded-2xl border border-line bg-white p-6">
        <input type="hidden" name="id" value={course.id} />
        <h2 className="text-lg font-semibold text-ink">Course details</h2>
        <div>
          <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-ink">Title</label>
          <input id="title" name="title" defaultValue={course.title} className="w-full rounded-lg border border-line px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
        </div>
        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-ink">Description</label>
          <textarea id="description" name="description" rows={3} defaultValue={course.description ?? ""} className="w-full rounded-lg border border-line px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
        </div>
        <div>
          <label htmlFor="price" className="mb-1.5 block text-sm font-medium text-ink">Price (PKR) — 0 for free</label>
          <input id="price" name="price" type="number" min={0} defaultValue={course.price} className="w-40 rounded-lg border border-line px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
        </div>
        <button type="submit" className="rounded-lg border border-brand-600 px-4 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50">
          Save details
        </button>
      </form>

      {/* Curriculum */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">Curriculum</h2>
          <form action={addModule} className="flex items-center gap-2">
            <input type="hidden" name="course_id" value={course.id} />
            <input name="title" placeholder="Module title" className="w-48 rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
            <button type="submit" className="rounded-lg bg-ink px-3.5 py-2 text-sm font-semibold text-white">+ Module</button>
          </form>
        </div>

        {modules.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-line bg-white px-6 py-12 text-center text-muted">
            No modules yet. Add your first module above.
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {modules.map((m) => (
              <div key={m.id} className="rounded-2xl border border-line bg-white p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-ink">{m.title}</h3>
                  <form action={deleteModule}>
                    <input type="hidden" name="id" value={m.id} />
                    <input type="hidden" name="course_id" value={course.id} />
                    <button type="submit" className="text-xs font-medium text-rose-600 hover:underline">Remove module</button>
                  </form>
                </div>

                <div className="mt-3 space-y-2">
                  {m.lessons.map((lesson) => {
                    const embed = driveEmbedUrl(lesson.video_url);
                    return (
                      <details key={lesson.id} className="rounded-xl border border-line">
                        <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-medium text-ink [&::-webkit-details-marker]:hidden">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-muted" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                          {lesson.title}
                          {lesson.is_preview && <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">Preview</span>}
                          {embed && <span className="rounded bg-brand-50 px-1.5 py-0.5 text-[10px] font-semibold text-brand-700">Video</span>}
                        </summary>
                        <form action={updateLesson} className="space-y-3 border-t border-line p-4">
                          <input type="hidden" name="id" value={lesson.id} />
                          <input type="hidden" name="course_id" value={course.id} />
                          <div>
                            <label className="mb-1 block text-xs font-medium text-muted">Lesson title</label>
                            <input name="title" defaultValue={lesson.title} className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-medium text-muted">Google Drive video link</label>
                            <input name="video_url" defaultValue={lesson.video_url ?? ""} placeholder="https://drive.google.com/file/d/…/view" className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
                            {embed && (
                              <div className="mt-2 aspect-video overflow-hidden rounded-lg border border-line">
                                <iframe src={embed} className="h-full w-full" allow="autoplay" title={lesson.title} />
                              </div>
                            )}
                          </div>
                          <div>
                            <label className="mb-1 block text-xs font-medium text-muted">Lesson notes (optional)</label>
                            <textarea name="content" rows={2} defaultValue={lesson.content ?? ""} className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
                          </div>
                          <label className="flex items-center gap-2 text-sm text-ink">
                            <input type="checkbox" name="is_preview" defaultChecked={lesson.is_preview} className="h-4 w-4 accent-brand-600" />
                            Free preview (watchable without enrolling)
                          </label>
                          <div className="flex items-center gap-2">
                            <button type="submit" className="rounded-lg bg-brand-600 px-3.5 py-2 text-sm font-semibold text-white">Save lesson</button>
                            <button formAction={deleteLesson} className="rounded-lg border border-line px-3.5 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50">Delete</button>
                          </div>
                        </form>
                      </details>
                    );
                  })}
                </div>

                <form action={addLesson} className="mt-3 flex items-center gap-2">
                  <input type="hidden" name="module_id" value={m.id} />
                  <input type="hidden" name="course_id" value={course.id} />
                  <input name="title" placeholder="Lesson title" className="flex-1 rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" />
                  <button type="submit" className="rounded-lg border border-line px-3.5 py-2 text-sm font-semibold text-ink hover:bg-slate-50">+ Lesson</button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
