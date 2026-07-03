const oldStack = [
  { tool: "Course platform", cost: "Rs 16,000/mo", pain: "plus 10% of every sale" },
  { tool: "Community app", cost: "Rs 28,000/mo", pain: "students in a separate app" },
  { tool: "Email & WhatsApp tools", cost: "Rs 12,000/mo", pain: "manual follow-ups" },
  { tool: "Booking tool", cost: "Rs 5,000/mo", pain: "another login, another invoice" },
];

const wins = [
  {
    title: "One platform, one price",
    body: "Courses, community, coaching, certificates and analytics live together — one login for you, one home for your students.",
  },
  {
    title: "0% commission, forever",
    body: "Payments land in your own bank, JazzCash or Easypaisa account. We never sit between you and your revenue.",
  },
  {
    title: "Near-zero hosting bills",
    body: "Your videos and files stream straight from your own Google Drive, so your biggest cost is simply gone.",
  },
];

export function Why() {
  return (
    <section id="why" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Why RabeeSkool</p>
      <h2 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Stop juggling five subscriptions to run one academy
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Most educators stitch together a course platform, a community app, email
        tools and booking software — then lose a cut of every sale on top.
        RabeeSkool replaces the whole stack.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-paper p-6">
          <p className="text-sm font-semibold text-muted">The old way</p>
          <ul className="mt-4 divide-y divide-line">
            {oldStack.map((item) => (
              <li key={item.tool} className="flex items-baseline justify-between gap-4 py-3">
                <div>
                  <p className="font-medium text-ink">{item.tool}</p>
                  <p className="text-sm text-muted">{item.pain}</p>
                </div>
                <p className="whitespace-nowrap text-sm font-semibold text-red-600">{item.cost}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-baseline justify-between border-t-2 border-line pt-4">
            <p className="font-semibold text-ink">Every month</p>
            <p className="font-semibold text-red-600">Rs 61,000+ and a % of sales</p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {wins.map((w) => (
            <div key={w.title} className="rounded-2xl border border-brand-200 bg-brand-50 p-6">
              <h3 className="text-lg font-semibold text-brand-900">{w.title}</h3>
              <p className="mt-2 leading-relaxed text-brand-800">{w.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
