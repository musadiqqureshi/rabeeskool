const cards = [
  {
    title: "Disconnected Tools Create Daily Admin Drag",
    body: "When your courses live in one tool, your community in another, bookings somewhere else, and reminders in a third, every student workflow gets harder to manage and easier to break.",
    tint: "from-rose-50",
    icon: "bg-rose-50 text-rose-600 border-rose-200",
  },
  {
    title: "Revenue Gets Eaten By Software Layers",
    body: "Monthly subscriptions, transaction cuts, separate community apps, email tools and booking software quietly stack up long before you ever see the real margin from your programs.",
    tint: "from-orange-50",
    icon: "bg-orange-50 text-orange-600 border-orange-200",
  },
  {
    title: "Growth Slows When Operations Aren't Connected",
    body: "Onboarding, reminders, certificates, follow-ups and support all take far more manual work when your academy runs on a pile of isolated apps instead of one operating system.",
    tint: "from-amber-50",
    icon: "bg-amber-50 text-amber-600 border-amber-200",
  },
];

export function Why() {
  return (
    <section id="why" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
          Why academy operators outgrow basic LMS tools
        </p>
        <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
          Running your academy on too many tools costs more than you think.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">
          Most creators don&apos;t just need course hosting. They need payments,
          communication, engagement, coaching and delivery to work together —
          without patching together a stack of separate tools.
        </p>

        <div className="mt-14 grid gap-6 text-left lg:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className={`rounded-3xl border border-line bg-gradient-to-b ${c.tint} to-white p-8 shadow-card`}
            >
              <span className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl border ${c.icon}`}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M15 9l-6 6M9 9l6 6" />
                </svg>
              </span>
              <h3 className="mt-6 text-xl font-semibold leading-snug text-ink">{c.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
