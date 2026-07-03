import { DashboardPreview } from "./dashboard-preview";

export function Hero() {
  return (
    <section id="top" className="overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-pill border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-800">
            <span className="h-2 w-2 rounded-full bg-brand-500" aria-hidden="true" />
            Built for Pakistani educators & coaches
          </p>

          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
            Launch your online academy.{" "}
            <span className="text-brand-700">Keep 100% of what you earn.</span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            RabeeSkool brings your courses, community, coaching and PKR payments
            into one platform — with 0% commission, forever. Your students, your
            revenue, your brand.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#pricing"
              className="rounded-pill bg-brand-700 px-7 py-3.5 text-base font-semibold text-white shadow-float transition-colors hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              Start your academy
            </a>
            <a
              href="#calculator"
              className="rounded-pill border border-brand-700 px-7 py-3.5 text-base font-semibold text-brand-800 transition-colors hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              See how much you save
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {["0% platform commission", "PKR payments, your accounts", "Videos on your Google Drive"].map(
              (item) => (
                <li key={item} className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        <DashboardPreview />
      </div>
    </section>
  );
}
