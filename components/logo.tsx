export function Logo({ size = 32 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-lg bg-brand-700 text-white"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width={size * 0.6}
        height={size * 0.6}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 21V10" />
        <path d="M12 10C12 6 9 3 4 3c0 5 3 8 8 7z" />
        <path d="M12 14c0-3 2.5-5.5 7-5.5 0 4.5-2.5 6.5-7 5.5z" />
      </svg>
    </span>
  );
}
