const faqs = [
  {
    q: "How do students pay me?",
    a: "At launch, students pay via bank transfer, JazzCash or Easypaisa and upload a payment screenshot at checkout. You see it in a pending-payments queue and approve with one click — the student is enrolled instantly and gets a PKR invoice. Instant PayFast checkout is on the roadmap.",
  },
  {
    q: "Do you take a cut of my sales?",
    a: "No. RabeeSkool charges a flat subscription and takes 0% commission — forever. Money goes straight into your own accounts; we never hold or route your revenue.",
  },
  {
    q: "Where are my videos and files stored?",
    a: "On your own Google Drive. You connect your Google account once, upload as usual, and RabeeSkool streams the content inside your course player. You keep ownership and pay nothing extra for hosting.",
  },
  {
    q: "Do I need any technical skills?",
    a: "No. If you can use WhatsApp and Google Drive, you can run a RabeeSkool academy. Setup is a guided checklist, and annual plans include hands-on onboarding.",
  },
  {
    q: "Can I use my own domain and branding?",
    a: "Yes — every academy gets its own branded space, and annual plans include white-label support with your own custom domain.",
  },
  {
    q: "Is RabeeSkool only for Pakistan?",
    a: "We are Pakistan-first: PKR pricing, local payment habits and WhatsApp-first communication. International payments and multi-currency support are planned next.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes — 14 days, full platform, no card required. Build your first course before you pay a rupee.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 bg-paper py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">FAQ</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Questions, answered
        </h2>

        <div className="mt-10 space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-line bg-white px-6 py-4 shadow-card open:pb-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 [&::-webkit-details-marker]:hidden">
                {f.q}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 text-brand-700 transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
