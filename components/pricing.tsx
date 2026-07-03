const monthly = [
  { strong: "0% platform commission", rest: "on your course revenue" },
  { strong: "Courses, students & delivery", rest: "in one workspace" },
  { strong: "Bank, JazzCash & Easypaisa", rest: "checkout with manual approval" },
  { strong: "Built-in community,", rest: "engagement & learning flows" },
  { strong: "Custom domain,", rest: "branded academy & admin control" },
  { strong: "WhatsApp, email & reminder", rest: "automation for students" },
];

const annual = [
  "Everything in the Monthly plan, plus:",
  "Better economics for a full operating stack",
  "Priority onboarding for payments, content & launch",
  "Migration help for student, course & academy data",
  "White-label & domain setup support for a polished launch",
];

function Check({ className = "" }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={`mt-0.5 shrink-0 ${className}`} aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 bg-paper py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Pricing</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            One flat price. Every feature. Zero commission.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">
            Bring your own Google Drive for video and files, so your hosting cost
            stays at Rs 0 and your revenue stays entirely yours.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-2">
          {/* Monthly */}
          <div className="rounded-3xl border border-line bg-white p-8 shadow-card sm:p-10">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-ink">Monthly Plan</h3>
              <span className="rounded-pill bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">Flexible Billing</span>
            </div>
            <p className="mt-2 text-sm text-muted">
              Full platform access for operators who want one system for selling,
              teaching and managing students.
            </p>
            <p className="mt-6 text-5xl font-semibold text-ink">
              Rs 6,999
              <span className="text-base font-medium text-muted"> / month</span>
            </p>

            <ul className="mt-8 space-y-3.5">
              {monthly.map((f) => (
                <li key={f.strong} className="flex items-start gap-2.5 text-[15px]">
                  <Check className="text-brand-600" />
                  <span className="text-ink"><span className="font-semibold">{f.strong}</span> {f.rest}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-2xl bg-rose-50 p-4 text-sm leading-relaxed text-rose-900">
              <span className="font-semibold">Bring your own stack:</span> connect your own
              Google Drive for video/files, and a bank / JazzCash / Easypaisa account
              for payments before launch. PayFast auto-checkout coming soon.
            </div>

            <a
              href="mailto:hello@rabeeskool.com?subject=Start%20monthly%20plan"
              className="mt-7 block rounded-pill bg-ink px-6 py-4 text-center text-base font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              Get Started Monthly
            </a>
          </div>

          {/* Annual */}
          <div className="grad-brand-strong relative rounded-3xl p-8 shadow-float sm:p-10">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-pill bg-amber-400 px-4 py-1 text-xs font-bold text-amber-950">
              BEST VALUE — SAVE Rs 14,000
            </span>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold text-white">Annual Plan</h3>
              <span className="rounded-pill bg-white/20 px-3 py-1 text-xs font-semibold text-white">2 Months Free</span>
            </div>
            <p className="mt-2 text-sm text-brand-100">
              For teams that want the same complete platform with stronger launch
              support and better annual economics.
            </p>
            <p className="mt-6 text-5xl font-semibold text-white">
              Rs 69,999
              <span className="text-base font-medium text-brand-100"> / year</span>
            </p>

            <ul className="mt-8 space-y-3.5">
              {annual.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[15px] text-white">
                  <Check className="text-amber-300" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-7 rounded-2xl bg-white/10 p-4 text-sm leading-relaxed text-brand-50">
              <span className="font-semibold text-white">Still required:</span> annual customers
              also connect their own Google Drive and a payment account (bank / JazzCash /
              Easypaisa) to fully operate the platform.
            </div>

            <a
              href="mailto:hello@rabeeskool.com?subject=Start%20annual%20plan"
              className="mt-7 block rounded-pill bg-white px-6 py-4 text-center text-base font-semibold text-brand-700 transition-transform hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get Started Annual &amp; Save
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
