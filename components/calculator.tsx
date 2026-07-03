"use client";

import { useState } from "react";

const FLAT_FEE = 6999;
const COMMISSION = 0.1;
const TRAD_BASE = 12000;
const MIN = 50000;
const MAX = 1000000;

const presets = [
  { label: "Rs 50K", value: 50000 },
  { label: "Rs 1.5 Lakh", value: 150000 },
  { label: "Rs 3 Lakh", value: 300000 },
  { label: "Rs 5 Lakh", value: 500000 },
  { label: "Rs 10 Lakh", value: 1000000 },
];

function rs(n: number) {
  return "Rs " + Math.round(n).toLocaleString("en-PK");
}

export function Calculator() {
  const [rev, setRev] = useState(150000);

  const tradCost = rev * COMMISSION + TRAD_BASE;
  const monthlySaving = tradCost - FLAT_FEE;
  const yearlySaving = monthlySaving * 12;
  const pct = ((rev - MIN) / (MAX - MIN)) * 100;

  return (
    <section id="calculator" className="scroll-mt-24 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl">
          Calculate How Much Revenue You Save Every Month
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">
          Drag or pick your estimated monthly course sales to see the net profit
          that stays in your own bank account.
        </p>

        <div className="mt-14 grid gap-6 text-left lg:grid-cols-2">
          {/* Left: inputs */}
          <div className="rounded-3xl border border-line bg-white p-7 shadow-soft sm:p-9">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-wide text-muted">Monthly course revenue</p>
              <span className="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">Interactive</span>
            </div>
            <p className="mt-3 text-5xl font-semibold text-brand-600">
              {rs(rev)}
              <span className="text-lg font-medium text-muted"> /month</span>
            </p>

            <input
              type="range"
              min={MIN}
              max={MAX}
              step={10000}
              value={rev}
              onChange={(e) => setRev(Number(e.target.value))}
              aria-label="Monthly course revenue"
              className="mt-6 w-full accent-brand-600"
            />

            <p className="mt-6 text-sm font-semibold text-muted">Quick revenue presets:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setRev(p.value)}
                  aria-pressed={rev === p.value}
                  className={`rounded-pill px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                    rev === p.value ? "grad-brand text-white" : "bg-slate-100 text-muted hover:bg-slate-200"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="mt-8 space-y-5 border-t border-line pt-6">
              <div>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-semibold text-ink">Traditional platforms (10% cut + base fee)</span>
                  <span className="font-semibold text-rose-600">{rs(tradCost)}/mo</span>
                </div>
                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-rose-500" style={{ width: "100%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-semibold text-ink">RabeeSkool (flat 0% commission)</span>
                  <span className="font-semibold text-brand-600">{rs(FLAT_FEE)}/mo</span>
                </div>
                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="grad-brand h-full rounded-full" style={{ width: `${Math.max(12, (FLAT_FEE / tradCost) * 100)}%` }} />
                </div>
              </div>
            </div>

            <p className="mt-6 flex items-center gap-2 text-sm text-muted">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
              Payments land straight in your own Pakistani bank account.
            </p>
          </div>

          {/* Right: savings panel */}
          <div className="grad-brand-strong relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 shadow-float sm:p-9">
            <span className="absolute right-6 top-6 rounded-md bg-amber-400 px-3 py-1 text-xs font-bold text-amber-950">
              KEEP 100% PROFITS
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-100">Your extra annual savings</p>
              <p className="mt-2 text-5xl font-semibold text-amber-300 sm:text-6xl">
                {rs(Math.max(0, yearlySaving))}
                <span className="text-xl font-medium text-brand-100"> /year</span>
              </p>
              <div className="mt-6 rounded-2xl bg-white/10 p-5">
                <p className="leading-relaxed text-brand-50">
                  You keep an extra{" "}
                  <span className="font-semibold text-amber-300">{rs(Math.max(0, monthlySaving))}</span>{" "}
                  in your bank account every month instead of paying heavy platform commissions.
                </p>
              </div>
            </div>

            <ul className="mt-7 space-y-3">
              {[
                "0% transaction fees — keep 100% of sales",
                "Bank, JazzCash & Easypaisa payouts",
                "Unlimited courses, students & video (your Drive)",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[15px] text-white">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#pricing"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-pill bg-white px-7 py-4 text-base font-semibold text-brand-700 transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Start Keeping 100% Profits Now
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
