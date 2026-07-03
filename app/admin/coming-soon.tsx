export function ComingSoon({ title, phase }: { title: string; phase: string }) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">{title}</h1>
      <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white px-6 py-20 text-center">
        <span className="grad-brand flex h-14 w-14 items-center justify-center rounded-2xl text-white">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 8v4l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />
          </svg>
        </span>
        <h2 className="mt-5 text-xl font-semibold text-ink">{title} is coming next</h2>
        <p className="mt-2 max-w-md text-muted">
          This lives in {phase}. The dashboard, sign-in and academy setup are live
          today — this section unlocks as we build out the platform.
        </p>
      </div>
    </div>
  );
}
