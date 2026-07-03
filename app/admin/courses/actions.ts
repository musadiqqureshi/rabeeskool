"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAcademy } from "@/lib/academy";

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 50) || "course";
}

export async function createCourse(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;

  const academy = await requireAcademy();
  const supabase = await createClient();
  const slug = `${slugify(title)}-${Math.random().toString(36).slice(2, 5)}`;

  const { data, error } = await supabase
    .from("courses")
    .insert({ academy_id: academy.academyId, title, slug })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  redirect(`/admin/courses/${data.id}`);
}

export async function updateCourse(formData: FormData) {
  const id = String(formData.get("id"));
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Math.max(0, Math.round(Number(formData.get("price") ?? 0)));

  const supabase = await createClient();
  const { error } = await supabase
    .from("courses")
    .update({ title, description, price })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/courses/${id}`);
}

export async function setCourseStatus(formData: FormData) {
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) === "published" ? "published" : "draft";
  const supabase = await createClient();
  const { error } = await supabase.from("courses").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/courses/${id}`);
  revalidatePath("/admin/courses");
}

export async function deleteCourse(formData: FormData) {
  const id = String(formData.get("id"));
  const supabase = await createClient();
  const { error } = await supabase.from("courses").delete().eq("id", id);
  if (error) throw new Error(error.message);
  redirect("/admin/courses");
}

export async function addModule(formData: FormData) {
  const courseId = String(formData.get("course_id"));
  const title = String(formData.get("title") ?? "").trim() || "New module";
  const supabase = await createClient();

  const { count } = await supabase
    .from("modules")
    .select("id", { count: "exact", head: true })
    .eq("course_id", courseId);

  const { error } = await supabase
    .from("modules")
    .insert({ course_id: courseId, title, position: count ?? 0 });
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function deleteModule(formData: FormData) {
  const id = String(formData.get("id"));
  const courseId = String(formData.get("course_id"));
  const supabase = await createClient();
  const { error } = await supabase.from("modules").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function addLesson(formData: FormData) {
  const moduleId = String(formData.get("module_id"));
  const courseId = String(formData.get("course_id"));
  const title = String(formData.get("title") ?? "").trim() || "New lesson";
  const supabase = await createClient();

  const { count } = await supabase
    .from("lessons")
    .select("id", { count: "exact", head: true })
    .eq("module_id", moduleId);

  const { error } = await supabase
    .from("lessons")
    .insert({ module_id: moduleId, title, position: count ?? 0 });
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function updateLesson(formData: FormData) {
  const id = String(formData.get("id"));
  const courseId = String(formData.get("course_id"));
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const video_url = String(formData.get("video_url") ?? "").trim();
  const is_preview = formData.get("is_preview") === "on";

  const supabase = await createClient();
  const { error } = await supabase
    .from("lessons")
    .update({ title, content, video_url, is_preview })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/courses/${courseId}`);
}

export async function deleteLesson(formData: FormData) {
  const id = String(formData.get("id"));
  const courseId = String(formData.get("course_id"));
  const supabase = await createClient();
  const { error } = await supabase.from("lessons").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/courses/${courseId}`);
}
