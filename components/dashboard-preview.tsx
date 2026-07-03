const stats = [
  { label: "Courses", value: "12", bg: "bg-violet-50", text: "text-violet-900", sub: "text-violet-600" },
  { label: "Enrollments", value: "348", bg: "bg-brand-50", text: "text-brand-900", sub: "text-brand-600" },
  { label: "Revenue", value: "Rs 1.2M", bg: "bg-orange-50", text: "text-orange-900", sub: "text-orange-600" },
];

const tasks = [
  { label: "Approve 3 pending payments", done: false },
  { label: "Reply to student comments", done: true },
  { label: "Review pending assignments", done: true },
];

export function DashboardPreview() {
  return (
    <div className="relative" aria-hidden="true">
      <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-brand-100 blur-3xl" />
      <div className="relative rounded-2xl border border-line bg-white p-5 shadow-float">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <p className="text-sm font-semibold text-ink">Welcome back, Ustad!</p>
            <p className="text-xs text-muted">Here&apos;s what&apos;s happening in your academy today.</p>
          </div>
          <span className="rounded-pill bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800">
            0% commission
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <div key={s.label} className={`rounded-xl ${s.bg} p-3`}>
              <p className={`text-[11px] font-medium ${s.sub}`}>{s.label}</p>
              <p className={`text-lg font-semibold ${s.text}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-line p-4">
          <p className="text-sm font-semibold text-ink">Today&apos;s priorities</p>
          <ul className="mt-3 space-y-2.5">
            {tasks.map((t) => (
              <li key={t.label} className="flex items-center gap-2.5 text-sm">
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                    t.done ? "border-brand-500 bg-brand-500 text-white" : "border-line"
                  }`}
                >
                  {t.done && (
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className={t.done ? "text-muted line-through" : "text-ink"}>{t.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-brand-700 px-4 py-3">
          <div>
            <p className="text-xs text-brand-100">All-time earnings, all yours</p>
            <p className="text-lg font-semibold text-white">Rs 1,248,500</p>
          </div>
          <span className="rounded-pill bg-white/15 px-3 py-1 text-xs font-medium text-white">
            Payout: your bank
          </span>
        </div>
      </div>
    </div>
  );
}
