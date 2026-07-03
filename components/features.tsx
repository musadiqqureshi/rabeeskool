"use client";

import { useState } from "react";

type Tab = {
  id: string;
  label: string;
  emoji: string;
  color: string;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
};

const tabs: Tab[] = [
  {
    id: "admin",
    label: "Admin Command Center",
    emoji: "🗂️",
    color: "brand",
    eyebrow: "CREATOR DASHBOARD",
    title: "Complete Control Over Sales, Revenue & Student Churn",
    body: "Manage your entire online academy from one unified command center. Track total enrollments, monthly orders, live revenue payouts in Rupees, and spot at-risk students instantly.",
    bullets: ["Live revenue tracking in PKR", "Actionable daily priorities tasklist", "Automated at-risk churn alerts"],
  },
  {
    id: "student",
    label: "Student Learning & Leaderboard",
    emoji: "🎓",
    color: "violet",
    eyebrow: "STUDENT EXPERIENCE",
    title: "A Learning Experience That Keeps Students Finishing",
    body: "Give students a clean player, progress tracking, points, streaks and leaderboards that turn passive watching into completed courses — and completed courses into referrals.",
    bullets: ["Points, badges, streaks & leaderboards", "Progress tracking across every course", "Mobile-friendly student portal"],
  },
  {
    id: "pay",
    label: "JazzCash & Bank Checkout",
    emoji: "💳",
    color: "amber",
    eyebrow: "PAYMENTS",
    title: "Get Paid The Way Pakistan Actually Pays",
    body: "Students pay by bank transfer, JazzCash or Easypaisa and upload proof at checkout. You approve in one click and they're enrolled instantly. Automated PayFast checkout is on the roadmap.",
    bullets: ["Bank / JazzCash / Easypaisa at checkout", "One-click payment approval & auto-enroll", "PKR invoices sent automatically"],
  },
  {
    id: "whatsapp",
    label: "WhatsApp & Drip Automations",
    emoji: "📱",
    color: "emerald",
    eyebrow: "AUTOMATIONS",
    title: "Reach Students Where They Actually Reply",
    body: "Welcome messages, class reminders, drip sequences and win-back nudges go out over WhatsApp and email automatically — so nobody ghosts and nobody no-shows.",
    bullets: ["WhatsApp enrollment & reminder flows", "Drip-scheduled lessons & emails", "Automated win-back for inactive students"],
  },
  {
    id: "cert",
    label: "Automated Certificates",
    emoji: "🏅",
    color: "rose",
    eyebrow: "CERTIFICATES",
    title: "Branded Certificates, Issued Automatically",
    body: "The moment a student completes your course, RabeeSkool issues a branded certificate with a public verification link employers can actually trust.",
    bullets: ["Auto-issued on course completion", "Your branding & signature", "Public verification link"],
  },
];

const tone: Record<string, { chip: string; eyebrow: string }> = {
  brand: { chip: "border-brand-200 bg-brand-50 text-brand-700", eyebrow: "bg-brand-50 text-brand-700" },
  violet: { chip: "border-violet-200 bg-violet-50 text-violet-700", eyebrow: "bg-violet-50 text-violet-700" },
  amber: { chip: "border-amber-200 bg-amber-50 text-amber-700", eyebrow: "bg-amber-50 text-amber-700" },
  emerald: { chip: "border-emerald-200 bg-emerald-50 text-emerald-700", eyebrow: "bg-emerald-50 text-emerald-700" },
  rose: { chip: "border-rose-200 bg-rose-50 text-rose-700", eyebrow: "bg-rose-50 text-rose-700" },
};

export function Features() {
  const [active, setActive] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === active)!;
  const t = tone[tab.color];

  return (
    <section id="features" className="scroll-mt-24 bg-paper py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">All features</p>
        <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          One platform for teaching, selling and growing
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">
          Click through the tabs below to preview how RabeeSkool powers both your
          admin management and your student learning experience.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {tabs.map((tb) => {
            const on = tb.id === active;
            const c = tone[tb.color];
            return (
              <button
                key={tb.id}
                type="button"
                onClick={() => setActive(tb.id)}
                aria-pressed={on}
                className={`rounded-pill border px-5 py-2.5 text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                  on ? `${c.chip} scale-[1.03] shadow-card` : "border-line bg-white text-muted hover:bg-slate-50"
                }`}
              >
                <span className="mr-1.5" aria-hidden="true">{tb.emoji}</span>
                {tb.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid items-center gap-8 rounded-3xl border border-line bg-white p-6 text-left shadow-soft sm:p-10 lg:grid-cols-2">
          <div>
            <span className={`inline-block rounded-md px-3 py-1 text-xs font-semibold ${t.eyebrow}`}>
              {tab.eyebrow}
            </span>
            <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-ink">{tab.title}</h3>
            <p className="mt-4 leading-relaxed text-muted">{tab.body}</p>
            <ul className="mt-6 space-y-3">
              {tab.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2.5 text-[15px] font-medium text-ink">
                  <span className="grad-brand flex h-5 w-5 items-center justify-center rounded-full text-white">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <a href="#pricing" className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
              Experience this feature live
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          <div className="rounded-2xl border border-line bg-gradient-to-b from-brand-50 to-white p-4">
            <div className="rounded-xl border border-line bg-white p-5 shadow-card">
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${t.eyebrow}`}>{tab.emoji} {tab.label}</span>
                <span className="text-[11px] text-muted">RabeeSkool</span>
              </div>
              <div className="mt-4 space-y-2.5">
                {tab.bullets.map((b, i) => (
                  <div key={b} className="flex items-center gap-3 rounded-lg bg-paper px-3 py-2.5">
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${t.eyebrow}`}>{i + 1}</span>
                    <span className="text-[13px] font-medium text-ink">{b}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {["PKR 1.2M", "348", "27"].map((v, i) => (
                  <div key={i} className="rounded-lg bg-paper px-2 py-2 text-center">
                    <p className="text-sm font-semibold text-ink">{v}</p>
                    <p className="text-[10px] text-muted">{["revenue", "students", "orders"][i]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
