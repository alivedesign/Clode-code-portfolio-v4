import { useEffect } from "react";
import { Logo } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { ContactLine } from "@/components/Layout/ContactLine";
import { CaseSection } from "@/components/Cases";
import { CASES_HEADLINE, CASES } from "@/data/casesData";
import { usePageMeta } from "@/hooks/usePageMeta";

export function Cases() {
  usePageMeta(
    "Cases — Shkuratov Designer",
    "Product design case studies by Evgeny Shkuratov — real projects with measurable outcomes.",
    "/cases",
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen min-h-dvh w-full bg-black">
      <Logo visible />

      <main className="relative z-10 flex flex-col items-center px-5 md:px-10 pt-[104px] md:pt-[104px] pb-[164px] md:pb-[320px]">
        {/* Headline */}
        <h1 className="experience-fade-up text-[28px] md:text-[48px] leading-[1.2] text-white text-center tracking-[-0.48px] max-w-[585px] mt-[24px] md:mt-0 mb-[72px] md:mb-[64px] font-['TN',serif] font-extralight relative z-10">
          {CASES_HEADLINE}
        </h1>

        {/* Case studies */}
        <section aria-label="Case studies">
          <h2 className="sr-only">Case studies</h2>
          <div className="w-full flex flex-col gap-[88px] md:gap-[40px]">
            {CASES.map((caseData, i) => (
              <CaseSection key={caseData.id} caseData={caseData} index={i} />
            ))}
          </div>
        </section>
      </main>

      <NavBar visible />
      <ContactLine visible />
    </div>
  );
}
