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
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="rounded-3xl bg-brand-900 px-6 py-14 text-center sm:px-12">
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Your knowledge is the product. Keep the profit.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-brand-200">
          Set up your academy in an afternoon — courses, community and PKR
          payments included, commission excluded.
        </p>
        <a
          href="#pricing"
          className="mt-8 inline-block rounded-pill bg-brand-500 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Start your 14-day free trial
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
