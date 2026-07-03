const nav = {
  Content: ["Courses", "Learning Routes", "Services", "Events"],
  Learning: ["Assignments", "Certificates", "Coaching", "Goals", "Gamification"],
  Community: ["Comments", "Badges"],
};

const stats = [
  { label: "TOTAL COURSES", value: "12", sub: "Unpublished: 0", bg: "bg-violet-50", text: "text-violet-900" },
  { label: "ENROLLMENTS", value: "348", sub: "Total: 348", bg: "bg-emerald-50", text: "text-emerald-900" },
  { label: "ORDERS", value: "27", sub: "This month", bg: "bg-sky-50", text: "text-sky-900" },
  { label: "REVENUE", value: "Rs 1.2M", sub: "All time", bg: "bg-rose-50", text: "text-rose-900" },
  { label: "LEADS", value: "42", sub: "This month", bg: "bg-amber-50", text: "text-amber-900" },
];

export function DashboardPreview() {
  return (
    <div className="rounded-3xl border border-line bg-white p-2 shadow-soft" aria-hidden="true">
      <div className="flex overflow-hidden rounded-2xl border border-line">
        {/* Sidebar */}
        <aside className="hidden w-52 shrink-0 flex-col gap-0.5 border-r border-line bg-white p-3 md:flex">
          <div className="flex items-center gap-2 px-2 pb-3">
            <span className="grad-brand flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-bold text-white">R</span>
            <span className="text-sm font-semibold text-ink">RabeeSkool</span>
          </div>
          <div className="rounded-md bg-brand-50 px-3 py-2 text-[13px] font-medium text-brand-700">Dashboard</div>
          {Object.entries(nav).map(([section, items]) => (
            <div key={section} className="mt-3">
              <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{section}</p>
              {items.map((item) => (
                <div key={item} className="rounded-md px-3 py-1.5 text-[13px] text-muted">{item}</div>
              ))}
            </div>
          ))}
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1 bg-paper p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-ink">Welcome back, Ustad! 👋</p>
              <p className="text-sm text-muted">Here&apos;s what&apos;s happening in your academy today.</p>
            </div>
            <span className="hidden rounded-lg border border-line bg-white px-3 py-1.5 text-xs font-medium text-muted sm:inline">
              Visit your site ↗
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((s) => (
              <div key={s.label} className={`rounded-xl ${s.bg} p-3`}>
                <p className="text-[10px] font-semibold tracking-wide text-slate-500">{s.label}</p>
                <p className={`mt-1 text-lg font-semibold ${s.text}`}>{s.value}</p>
                <p className="text-[10px] text-slate-400">{s.sub}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
            <div className="rounded-xl border border-line bg-white p-4 lg:col-span-2">
              <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                <span className="text-brand-600">◎</span> Today&apos;s Priorities
              </p>
              <p className="mt-0.5 text-xs text-muted">Focus on these high-impact actions to keep things moving.</p>
              <div className="mt-3 space-y-2">
                <Task label="Approve 3 pending payments" tag="High" tagBg="bg-brand-600" action="Review" />
                <Task label="Reply to new leads" tag="Med" tagBg="bg-amber-500" action="Reply" />
                <Task label="Publish your course" tag="Low" tagBg="bg-slate-400" action="Publish" />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="rounded-xl border border-line bg-white p-4">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-rose-600">⚠ Urgent Alerts</p>
                <p className="mt-2 text-xs text-muted">No upcoming events. Create one to engage your community.</p>
              </div>
              <div className="rounded-xl border border-line bg-white p-4">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">⚠ At-Risk Students</p>
                <p className="mt-2 text-center text-xs font-medium text-emerald-600">All students are active! 🎉</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Task({ label, tag, tagBg, action }: { label: string; tag: string; tagBg: string; action: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-line bg-white px-3 py-2.5">
      <span className="h-4 w-4 shrink-0 rounded-full border border-line" />
      <span className="flex-1 text-[13px] font-medium text-ink">{label}</span>
      <span className={`rounded-md ${tagBg} px-2 py-0.5 text-[10px] font-semibold text-white`}>{tag}</span>
      <span className="rounded-md bg-brand-50 px-2.5 py-1 text-[11px] font-medium text-brand-700">{action}</span>
    </div>
  );
}
