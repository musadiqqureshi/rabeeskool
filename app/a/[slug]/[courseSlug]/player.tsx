"use client";

import { useState } from "react";
import type { PlayerModule, PlayerLesson } from "./page";

function firstPlayable(modules: PlayerModule[]): PlayerLesson | null {
  for (const m of modules) {
    for (const l of m.lessons) if (!l.locked) return l;
  }
  return modules[0]?.lessons[0] ?? null;
}

export function CoursePlayer({
  modules,
  price,
  academyName,
  enrollmentStatus,
  checkoutHref,
  invoiceId,
}: {
  modules: PlayerModule[];
  price: number;
  academyName: string;
  enrollmentStatus: "none" | "pending" | "active";
  checkoutHref: string;
  invoiceId: string | null;
}) {
  const [active, setActive] = useState<PlayerLesson | null>(() => firstPlayable(modules));

  if (modules.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-line bg-white px-6 py-16 text-center text-muted">
        This course has no lessons yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* Player */}
      <div>
        <div className="aspect-video overflow-hidden rounded-2xl border border-line bg-slate-900">
          {active?.embedUrl ? (
            <iframe
              key={active.id}
              src={active.embedUrl}
              className="h-full w-full"
              allow="autoplay; fullscreen"
              title={active.title}
            />
          ) : active?.locked ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-white/90">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
              <p className="text-sm">Enroll to unlock this lesson</p>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-white/70">
              No video for this lesson.
            </div>
          )}
        </div>

        {active && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-ink">{active.title}</h2>
            {active.content && <p className="mt-2 whitespace-pre-line text-muted">{active.content}</p>}
          </div>
        )}

        {enrollmentStatus === "active" ? (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-emerald-50 p-5 text-emerald-800">
            <p className="flex items-center gap-2 font-semibold">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
              You&apos;re enrolled — every lesson is unlocked.
            </p>
            {invoiceId && (
              <a href={`/invoice/${invoiceId}`} target="_blank" rel="noreferrer" className="rounded-lg border border-emerald-300 bg-white px-3.5 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100">
                View invoice
              </a>
            )}
          </div>
        ) : enrollmentStatus === "pending" ? (
          <div className="mt-6 rounded-2xl bg-amber-50 p-5">
            <p className="font-semibold text-amber-900">Payment under review</p>
            <p className="mt-1 text-sm text-amber-800">
              {academyName} is verifying your payment. You&apos;ll get full access as soon as it&apos;s approved.
            </p>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl bg-brand-50 p-5">
            <p className="font-semibold text-brand-900">Enroll in this course</p>
            <p className="mt-1 text-sm text-brand-800">
              Get full access to every lesson from {academyName}.
            </p>
            <a
              href={checkoutHref}
              className="grad-brand mt-4 inline-block rounded-pill px-6 py-3 text-sm font-semibold text-white shadow-card transition-transform hover:scale-[1.02]"
            >
              {price > 0 ? `Enroll — Rs ${price.toLocaleString("en-PK")}` : "Enroll free"}
            </a>
          </div>
        )}
      </div>

      {/* Curriculum list */}
      <aside className="rounded-2xl border border-line bg-white p-4">
        <p className="px-2 pb-2 text-sm font-semibold text-ink">Course content</p>
        <div className="space-y-4">
          {modules.map((m) => (
            <div key={m.id}>
              <p className="px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{m.title}</p>
              <div className="mt-1 space-y-0.5">
                {m.lessons.map((l) => {
                  const isActive = active?.id === l.id;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setActive(l)}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                        isActive ? "bg-brand-50 text-brand-700" : "text-ink hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-muted" aria-hidden="true">
                        {l.locked ? (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                        ) : (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M8 5v14l11-7z" /></svg>
                        )}
                      </span>
                      <span className="flex-1">{l.title}</span>
                      {l.isPreview && <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">Free</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
