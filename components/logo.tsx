export function Logo({ size = 34 }: { size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <rect x="3" y="4" width="34" height="32" rx="8" fill="#2563eb" />
        <path d="M12 12h6c2.2 0 4 1.8 4 4v12c0-1.7-1.3-3-3-3h-7V12z" fill="#eff4ff" />
        <path d="M28 12h-6c-2.2 0-4 1.8-4 4v12c0-1.7 1.3-3 3-3h7V12z" fill="#bfd3fe" />
        <path d="M27 6l1.1 2.4L30.5 9.5 28.1 10.6 27 13l-1.1-2.4L23.5 9.5l2.4-1.1z" fill="#93b4fd" />
      </svg>
    </span>
  );
}
