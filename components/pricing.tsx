const shared = [
  "Unlimited courses & students",
  "Community, coaching & certificates",
  "WhatsApp & email automations",
  "PKR payments to your own accounts",
  "Analytics with at-risk alerts",
  "0% commission, forever",
];

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Pricing</p>
      <h2 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        One flat price. Every feature. Zero commission.
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Bring your own Google Drive for video and files — so your hosting cost is
        Rs 0 and your revenue stays exactly where it belongs.
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-8 shadow-card">
          <h3 className="text-lg font-semibold text-ink">Monthly</h3>
          <p className="mt-1 text-sm text-muted">Flexible, cancel anytime</p>
          <p className="mt-5 text-4xl font-semibold text-ink">
            Rs 9,999
            <span className="text-base font-medium text-muted"> /month</span>
          </p>
          <a
            href="mailto:hello@rabeeskool.com?subject=Start%20my%20RabeeSkool%20academy"
            className="mt-6 block rounded-pill border border-brand-700 px-6 py-3 text-center text-sm font-semibold text-brand-800 transition-colors hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            Start 14-day free trial
          </a>
          <ul className="mt-8 space-y-3 text-sm text-ink">
            {shared.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative rounded-2xl border-2 border-brand-600 bg-white p-8 shadow-float">
          <span className="absolute -top-3.5 left-8 rounded-pill bg-brand-700 px-4 py-1 text-xs font-semibold text-white">
            Save Rs 20,000
          </span>
          <h3 className="text-lg font-semibold text-ink">Annual</h3>
          <p className="mt-1 text-sm text-muted">For academies in it for the long run</p>
          <p className="mt-5 text-4xl font-semibold text-ink">
            Rs 99,999
            <span className="text-base font-medium text-muted"> /year</span>
          </p>
          <a
            href="mailto:hello@rabeeskool.com?subject=Start%20my%20RabeeSkool%20academy%20(annual)"
            className="mt-6 block rounded-pill bg-brand-700 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            Start 14-day free trial
          </a>
          <ul className="mt-8 space-y-3 text-sm text-ink">
            {[...shared, "Priority onboarding & migration help", "White-label: your domain, your brand"].map(
              (f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
