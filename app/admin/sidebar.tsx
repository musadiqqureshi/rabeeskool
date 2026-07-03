"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/(auth)/actions";

const sections: { label: string; items: { href: string; label: string; icon: string }[] }[] = [
  {
    label: "",
    items: [{ href: "/admin", label: "Dashboard", icon: "M4 5h6v6H4zM14 5h6v6h-6zM4 15h6v4H4zM14 13h6v6h-6z" }],
  },
  {
    label: "Content",
    items: [
      { href: "/admin/courses", label: "Courses", icon: "M4 19V6a2 2 0 0 1 2-2h12v13M6 17h12" },
      { href: "/admin/learning-routes", label: "Learning Routes", icon: "M6 3v12a3 3 0 0 0 3 3h9M6 3l-3 3m3-3 3 3" },
      { href: "/admin/services", label: "Services", icon: "M12 2l3 7h7l-5.5 4L18 20l-6-4.5L6 20l1.5-7L2 9h7z" },
      { href: "/admin/events", label: "Events", icon: "M3 8h18M7 3v3M17 3v3M4 6h16v14H4z" },
    ],
  },
  {
    label: "Learning",
    items: [
      { href: "/admin/assignments", label: "Assignments", icon: "M9 5h6M9 9h6M9 13h4M6 3h12v18H6z" },
      { href: "/admin/certificates", label: "Certificates", icon: "M12 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM8 14l-2 7 6-3 6 3-2-7" },
      { href: "/admin/coaching", label: "Coaching", icon: "M12 8v4l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" },
      { href: "/admin/gamification", label: "Gamification", icon: "M6 6h12v4a6 6 0 0 1-12 0zM9 20h6M12 16v4" },
    ],
  },
  {
    label: "Community",
    items: [
      { href: "/admin/comments", label: "Comments", icon: "M21 12a8 8 0 0 1-11 7l-5 2 1.5-4.5A8 8 0 1 1 21 12z" },
      { href: "/admin/badges", label: "Badges", icon: "M12 2l3 7h7l-5.5 4L18 20l-6-4.5L6 20l1.5-7L2 9h7z" },
    ],
  },
];

const sectionColor: Record<string, string> = {
  Content: "text-violet-500",
  Learning: "text-brand-500",
  Community: "text-pink-500",
};

export function Sidebar({ academyName, fullName }: { academyName: string; fullName: string | null }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-line bg-white">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <span className="grad-brand flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white">R</span>
        <span className="truncate text-[15px] font-semibold text-ink">{academyName}</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {sections.map((section, si) => (
          <div key={si} className={section.label ? "pt-4" : ""}>
            {section.label && (
              <p className={`px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider ${sectionColor[section.label] ?? "text-slate-400"}`}>
                {section.label}
              </p>
            )}
            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[14px] font-medium transition-colors ${
                    active ? "bg-brand-50 text-brand-700" : "text-muted hover:bg-slate-50 hover:text-ink"
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={item.icon} />
                  </svg>
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-line p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
            {(fullName ?? "U").charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">{fullName ?? "You"}</p>
            <p className="truncate text-xs text-muted">Owner</p>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              aria-label="Sign out"
              className="rounded-md p-1.5 text-muted transition-colors hover:bg-slate-100 hover:text-ink"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
