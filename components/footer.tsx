import { Logo } from "./logo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Why RabeeSkool", href: "#why" },
      { label: "Features", href: "#features" },
      { label: "Profit calculator", href: "#calculator" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Contact us", href: "mailto:hello@rabeeskool.com" },
      { label: "WhatsApp support", href: "mailto:hello@rabeeskool.com" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of service", href: "#" },
      { label: "Privacy policy", href: "#" },
      { label: "Refund policy", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-lg font-semibold tracking-tight text-ink">
              Rabee<span className="text-brand-600">Skool</span>
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Where learning grows. The all-in-one academy platform for Pakistani
            educators and coaches — 0% commission, forever.
          </p>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="text-sm font-semibold text-ink">{col.title}</p>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line py-6">
        <p className="mx-auto max-w-6xl px-4 text-sm text-muted sm:px-6">
          © {new Date().getFullYear()} RabeeSkool. Made with pride in Pakistan.
        </p>
      </div>
    </footer>
  );
}
