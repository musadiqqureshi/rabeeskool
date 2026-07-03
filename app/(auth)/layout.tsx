export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-16">{children}</div>
      <div className="grad-brand-strong relative hidden flex-col justify-between p-12 lg:flex">
        <div className="text-white/90 text-sm font-medium">RabeeSkool</div>
        <div>
          <p className="text-3xl font-semibold leading-snug text-white">
            &ldquo;Keep 100% of what you earn. Your students, your revenue, your brand.&rdquo;
          </p>
          <p className="mt-4 text-brand-100">The all-in-one academy platform, built for Pakistan.</p>
        </div>
        <ul className="space-y-2 text-brand-50">
          {["0% platform commission", "PKR payments to your own accounts", "Videos on your own Google Drive"].map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-[15px]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
