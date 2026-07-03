const rows = [
  { need: "Course hosting & player", stack: "Rs 16,000/mo + 10% per sale", rabee: "Included" },
  { need: "Community & discussions", stack: "Rs 28,000/mo (separate app)", rabee: "Included" },
  { need: "1-on-1 booking", stack: "Rs 5,000/mo", rabee: "Included" },
  { need: "Email & WhatsApp follow-ups", stack: "Rs 12,000/mo", rabee: "Included" },
  { need: "Certificates", stack: "Rs 3,000/mo add-on", rabee: "Included" },
  { need: "Video hosting", stack: "Rs 8,000/mo bandwidth", rabee: "Your Google Drive — Rs 0" },
  { need: "Commission on sales", stack: "5–20% of every sale", rabee: "0%, forever" },
];

export function Comparison() {
  return (
    <section id="compare" className="scroll-mt-20 bg-paper py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
          Cost comparison
        </p>
        <h2 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          The full stack, for less than one of its pieces
        </h2>

        <div className="mt-12 overflow-x-auto rounded-2xl border border-line bg-white shadow-card">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="px-6 py-4 font-semibold text-ink">
                  What you need
                </th>
                <th scope="col" className="px-6 py-4 font-semibold text-muted">
                  Typical tool stack
                </th>
                <th scope="col" className="bg-brand-50 px-6 py-4 font-semibold text-brand-800">
                  RabeeSkool
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r) => (
                <tr key={r.need}>
                  <td className="px-6 py-4 font-medium text-ink">{r.need}</td>
                  <td className="px-6 py-4 text-muted">{r.stack}</td>
                  <td className="bg-brand-50 px-6 py-4 font-medium text-brand-800">{r.rabee}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-line">
                <td className="px-6 py-5 text-base font-semibold text-ink">Monthly total</td>
                <td className="px-6 py-5 text-base font-semibold text-red-600">
                  Rs 72,000+ and a % of sales
                </td>
                <td className="bg-brand-50 px-6 py-5 text-base font-semibold text-brand-700">
                  Rs 9,999 flat
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-muted">
          Tool-stack estimates based on typical published pricing for comparable
          platforms, converted to PKR. Your exact stack may vary.
        </p>
      </div>
    </section>
  );
}
