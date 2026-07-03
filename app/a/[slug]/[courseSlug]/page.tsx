import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Logo } from "@/components/logo";
import { driveEmbedUrl } from "@/lib/drive";
import { CoursePlayer } from "./player";

export type PlayerLesson = {
  id: string;
  title: string;
  content: string | null;
  isPreview: boolean;
  embedUrl: string | null;
  locked: boolean;
};
export type PlayerModule = { id: string; title: string; lessons: PlayerLesson[] };

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string; courseSlug: string }>;
}) {
  const { slug, courseSlug } = await params;
  const supabase = await createClient();

  const { data: academy } = await supabase
    .from("academies")
    .select("id, name, slug")
    .eq("slug", slug)
    .maybeSingle();
  if (!academy) notFound();

  const { data: course } = await supabase
    .from("courses")
    .select("id, title, description, price, slug, status, academy_id")
    .eq("academy_id", academy.id)
    .eq("slug", courseSlug)
    .maybeSingle();
  if (!course || course.status !== "published") notFound();

  const { data: modulesData } = await supabase
    .from("modules")
    .select("id, title, position, lessons ( id, title, content, video_url, is_preview, position )")
    .eq("course_id", course.id)
    .order("position", { ascending: true });

  // Phase 2: preview lessons are watchable; the rest unlock with enrollment (Phase 3).
  const modules: PlayerModule[] = (modulesData ?? []).map((m) => ({
    id: m.id,
    title: m.title,
    lessons: [...((m.lessons as { id: string; title: string; content: string | null; video_url: string | null; is_preview: boolean; position: number }[]) ?? [])]
      .sort((a, b) => a.position - b.position)
      .map((l) => ({
        id: l.id,
        title: l.title,
        content: l.is_preview ? l.content : null,
        isPreview: l.is_preview,
        embedUrl: l.is_preview ? driveEmbedUrl(l.video_url) : null,
        locked: !l.is_preview,
      })),
  }));

  const lessonCount = modules.reduce((n, m) => n + m.lessons.length, 0);

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href={`/a/${academy.slug}`} className="flex items-center gap-2.5">
            <Logo />
            <span className="text-lg font-semibold tracking-tight text-ink">{academy.name}</span>
          </Link>
          <span className="text-sm font-semibold text-brand-700">
            {course.price > 0 ? `Rs ${course.price.toLocaleString("en-PK")}` : "Free"}
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Link href={`/a/${academy.slug}`} className="text-sm font-medium text-muted hover:text-brand-600">
          ← All courses
        </Link>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{course.title}</h1>
        {course.description && <p className="mt-2 max-w-2xl text-muted">{course.description}</p>}
        <p className="mt-2 text-sm text-muted">{modules.length} modules · {lessonCount} lessons</p>

        <div className="mt-6">
          <CoursePlayer
            modules={modules}
            price={course.price}
            academyName={academy.name}
          />
        </div>
      </div>
    </div>
  );
}
