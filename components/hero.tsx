import { DashboardPreview } from "./dashboard-preview";

const pills = [
  { big: "0%", small: "Platform commission", tone: "text-green-600" },
  { big: "JazzCash", small: "Native Pakistani checkout", tone: "text-indigo-accent" },
  { big: "5 min", small: "To get started", tone: "text-amber-600" },
];

export function Hero() {
  return (
    <section id="top" className="grad-hero-bg overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 pt-16 pb-10 text-center sm:px-6 sm:pt-20">
        <p className="mx-auto inline-flex items-center gap-2 rounded-pill border border-brand-200 bg-white px-4 py-1.5 text-sm font-medium text-brand-700 shadow-card">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Built for ambitious coaches and creators
        </p>

        <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl">
          Keep <span className="grad-hero-text">100%</span> of What You Earn
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
          Own your{" "}
          <span className="font-medium text-brand-600">videos</span>, your{" "}
          <span className="font-medium text-indigo-accent">student data</span>, and your{" "}
          <span className="font-medium text-green-600">revenue</span>. We give you the platform
          to host and sell your courses, and we take{" "}
          <span className="font-medium text-amber-600">0% share</span> of your income.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#pricing"
            className="grad-brand inline-flex items-center gap-2 rounded-pill px-8 py-4 text-base font-semibold text-white shadow-float transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            Launch Academy
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a
            href="#compare"
            className="inline-flex items-center rounded-pill border border-line bg-white px-8 py-4 text-base font-semibold text-ink shadow-card transition-colors hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            See Comparison
          </a>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
          {pills.map((p) => (
            <div
              key={p.small}
              className="rounded-2xl border border-line bg-white/70 px-5 py-4 text-left shadow-card backdrop-blur"
            >
              <p className={`text-2xl font-semibold ${p.tone}`}>{p.big}</p>
              <p className="mt-0.5 text-sm text-muted">{p.small}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <DashboardPreview />
      </div>
    </section>
  );
}
