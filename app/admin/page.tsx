import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireAcademy } from "@/lib/academy";

const basePriorities = [
  { label: "Add your first course", sub: "Your academy has no published courses yet", cta: "Create course", href: "/admin/courses" },
  { label: "Connect your Google Drive", sub: "Needed to host your videos and files", cta: "Connect", href: "/admin/courses" },
  { label: "Add your payment details", sub: "Bank / JazzCash / Easypaisa for checkout", cta: "Set up", href: "/admin/payments" },
];

export default async function DashboardPage() {
  const academy = await requireAcademy();
  const firstName = (academy.fullName ?? "there").split(" ")[0];

  const supabase = await createClient();
  const { count: totalCourses } = await supabase
    .from("courses")
    .select("id", { count: "exact", head: true })
    .eq("academy_id", academy.academyId);
  const { count: draftCourses } = await supabase
    .from("courses")
    .select("id", { count: "exact", head: true })
    .eq("academy_id", academy.academyId)
    .eq("status", "draft");

  const { data: enrollAgg } = await supabase
    .from("enrollments")
    .select("amount, status")
    .eq("academy_id", academy.academyId);

  const rows = enrollAgg ?? [];
  const activeCount = rows.filter((r) => r.status === "active").length;
  const pendingCount = rows.filter((r) => r.status === "pending").length;
  const revenue = rows
    .filter((r) => r.status === "active")
    .reduce((sum, r) => sum + (r.amount ?? 0), 0);

  const stats = [
    { label: "TOTAL COURSES", value: String(totalCourses ?? 0), sub: `Unpublished: ${draftCourses ?? 0}`, bg: "bg-violet-50", text: "text-violet-900", subText: "text-violet-500" },
    { label: "ENROLLMENTS", value: String(activeCount), sub: `Total: ${activeCount}`, bg: "bg-emerald-50", text: "text-emerald-900", subText: "text-emerald-500" },
    { label: "PENDING PAYMENTS", value: String(pendingCount), sub: "Awaiting review", bg: "bg-sky-50", text: "text-sky-900", subText: "text-sky-500" },
    { label: "REVENUE (ALL TIME)", value: `Rs ${revenue.toLocaleString("en-PK")}`, sub: `Orders: ${activeCount}`, bg: "bg-rose-50", text: "text-rose-900", subText: "text-rose-500" },
    { label: "LEADS (THIS MONTH)", value: "0", sub: "YTD total: 0", bg: "bg-amber-50", text: "text-amber-900", subText: "text-amber-500" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="rounded-2xl bg-emerald-50 px-5 py-4">
        <div className="flex items-start gap-3">
          <span className="text-lg" aria-hidden="true">🎉</span>
          <div>
            <p className="font-semibold text-emerald-900">Welcome to RabeeSkool!</p>
            <p className="text-sm text-emerald-700">
              Your academy is ready. Complete the steps below to open it for students.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-ink">
            Welcome back, {firstName}! 👋
          </h1>
          <p className="mt-1 text-muted">Here&apos;s what&apos;s happening in your academy today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={academy.slug ? `/a/${academy.slug}` : "#"}
            className="grad-brand rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-card transition-transform hover:scale-[1.02]"
          >
            Visit Student Dashboard ↗
          </Link>
          <Link
            href={academy.slug ? `/a/${academy.slug}` : "#"}
            className="rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-slate-50"
          >
            Visit your site ↗
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-2xl ${s.bg} p-4`}>
            <p className="text-[11px] font-semibold leading-tight tracking-wide text-slate-500">{s.label}</p>
            <p className={`mt-2 text-2xl font-semibold ${s.text}`}>{s.value}</p>
            <p className={`mt-1 text-[11px] ${s.subText}`}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-line bg-white p-6 lg:col-span-2">
          <div className="flex items-center gap-2">
            <span className="text-brand-600" aria-hidden="true">◎</span>
            <h2 className="text-lg font-semibold text-ink">Today&apos;s Priorities</h2>
          </div>
          <p className="mt-0.5 text-sm text-muted">Finish setup to start enrolling students.</p>

          <div className="mt-5 space-y-3">
            {pendingCount > 0 && (
              <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                <span className="h-4 w-4 shrink-0 rounded-full border border-amber-400" />
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-medium text-amber-900">Approve {pendingCount} pending payment{pendingCount > 1 ? "s" : ""}</p>
                  <p className="text-xs text-amber-700">Students are waiting to be enrolled</p>
                </div>
                <Link href="/admin/payments" className="grad-brand shrink-0 rounded-lg px-3.5 py-1.5 text-xs font-semibold text-white">
                  Review
                </Link>
              </div>
            )}
            {basePriorities.map((p) => (
              <div key={p.label} className="flex items-center gap-3 rounded-xl border border-line px-4 py-3">
                <span className="h-4 w-4 shrink-0 rounded-full border border-line" />
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-medium text-ink">{p.label}</p>
                  <p className="text-xs text-muted">{p.sub}</p>
                </div>
                <Link
                  href={p.href}
                  className="grad-brand shrink-0 rounded-lg px-3.5 py-1.5 text-xs font-semibold text-white"
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="rounded-2xl border border-line bg-white p-6">
            <div className="flex items-center gap-2 text-rose-600">
              <span aria-hidden="true">⚠</span>
              <h2 className="text-base font-semibold">Urgent Alerts</h2>
            </div>
            <p className="mt-3 text-sm text-muted">
              No upcoming events. Create one to engage your community.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6">
            <h2 className="flex items-center gap-2 text-base font-semibold text-ink">
              <span className="text-rose-500" aria-hidden="true">⚠</span> At-Risk Students
            </h2>
            <p className="mt-3 text-sm text-muted">Students showing signs of churn</p>
            <p className="mt-6 text-center text-sm font-medium text-emerald-600">
              No students yet — add a course to get started 🎉
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
