type Feature = {
  title: string;
  body: string;
  icon: React.ReactNode;
};

const iconProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const features: Feature[] = [
  {
    title: "Course builder",
    body: "Structure modules, lessons, quizzes and drip schedules. Videos stream from your own Google Drive — hosting bill: Rs 0.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4a2 2 0 0 0-2-2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />
        <path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" />
      </svg>
    ),
  },
  {
    title: "Payments your way",
    body: "Students pay by bank transfer, JazzCash or Easypaisa and upload proof — you approve in one click. PayFast checkout coming soon.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    title: "Community & channels",
    body: "Discussions, polls and Q&A keep students engaged inside your academy — not lost in someone else's app.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 0 1-9 8.4 8.5 8.5 0 0 1-3.4-.7L3 21l1.8-5.6a8.4 8.4 0 1 1 16.2-3.9z" />
      </svg>
    ),
  },
  {
    title: "Gamification",
    body: "Points, badges, streaks and leaderboards turn watching into finishing — completion rates your students brag about.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M8 21h8M12 17v4M7 4h10v6a5 5 0 0 1-10 0V4z" />
        <path d="M7 6H4a2 2 0 0 0 0 4h3M17 6h3a2 2 0 0 1 0 4h-3" />
      </svg>
    ),
  },
  {
    title: "1-on-1 coaching",
    body: "Publish your availability, let students book paid sessions, and send automatic reminders so nobody no-shows.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    title: "WhatsApp automations",
    body: "Enrollment welcomes, class reminders and win-back nudges go where Pakistan actually reads them: WhatsApp.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
      </svg>
    ),
  },
  {
    title: "Certificates",
    body: "Auto-issue branded completion certificates with a public verification link employers can trust.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <circle cx="12" cy="9" r="6" />
        <path d="M8.5 14 7 22l5-3 5 3-1.5-8" />
      </svg>
    ),
  },
  {
    title: "Analytics & at-risk alerts",
    body: "Revenue in PKR, enrollment trends and a daily priority list — plus alerts when a student is about to drop off.",
    icon: (
      <svg {...iconProps} aria-hidden="true">
        <path d="M3 3v18h18" />
        <path d="M7 15l4-6 4 3 5-8" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 bg-paper py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Features</p>
        <h2 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Everything your academy needs, nothing it doesn&apos;t
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-line bg-white p-6 shadow-card transition-shadow hover:shadow-float"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                {f.icon}
              </span>
              <h3 className="mt-4 text-base font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
