"use client";

import { useState } from "react";
import { Logo } from "./logo";

const links = [
  { href: "#why", label: "Why RabeeSkool" },
  { href: "#features", label: "All Features" },
  { href: "#calculator", label: "Profit Calculator" },
  { href: "#compare", label: "Cost Comparison" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      <div className="grad-banner px-4 py-2.5 text-center text-sm font-medium text-white">
        <span className="mr-1.5" aria-hidden="true">✨</span>
        Special launch offer for Pakistani educators: save up to 70% vs international LMS platforms
      </div>

      <header className="border-b border-line bg-white/90 backdrop-blur">
        <nav
          className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6"
          aria-label="Main"
        >
          <a href="#top" className="flex items-center gap-2.5">
            <Logo />
            <span className="text-xl font-semibold tracking-tight text-ink">
              Rabee<span className="text-brand-600">Skool</span>
            </span>
          </a>

          <div className="hidden items-center gap-7 xl:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[15px] font-medium text-muted transition-colors hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="/login"
              className="text-[15px] font-medium text-ink transition-colors hover:text-brand-600"
            >
              Login
            </a>
            <a
              href="/signup"
              className="grad-brand rounded-pill px-6 py-2.5 text-[15px] font-semibold text-white shadow-card transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              Get Started
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-md p-2 text-ink hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-brand-600 lg:hidden"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </nav>

        {open && (
          <div className="border-t border-line bg-white px-4 pb-4 lg:hidden">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-3 text-[15px] font-medium text-ink"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/signup"
              onClick={() => setOpen(false)}
              className="grad-brand mt-4 block rounded-pill px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Get Started
            </a>
          </div>
        )}
      </header>
    </div>
  );
}
