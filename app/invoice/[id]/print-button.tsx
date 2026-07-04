"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="grad-brand rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-card transition-transform hover:scale-[1.02]"
    >
      Print / save PDF
    </button>
  );
}
