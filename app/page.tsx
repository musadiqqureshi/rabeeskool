import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Why } from "@/components/why";
import { Features } from "@/components/features";
import { Calculator } from "@/components/calculator";
import { Comparison } from "@/components/comparison";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { Footer } from "@/components/footer";

function FinalCta() {
  return (
    <section className="bg-paper px-4 pb-20 pt-4 sm:px-6">
      <div className="grad-brand-strong mx-auto max-w-6xl rounded-3xl px-6 py-16 text-center shadow-float sm:px-12">
        <h2 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Your knowledge is the product. Keep the profit.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-brand-100">
          Set up your academy in an afternoon — courses, community and PKR
          payments included, commission excluded.
        </p>
        <a
          href="#pricing"
          className="mt-9 inline-flex items-center gap-2 rounded-pill bg-white px-8 py-4 text-base font-semibold text-brand-700 transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Launch your academy
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </a>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Why />
        <Features />
        <Calculator />
        <Comparison />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
