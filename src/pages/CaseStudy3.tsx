import { useEffect, useCallback } from "react";
import { Link } from "react-router";
import { Logo } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { ContactLine } from "@/components/Layout/ContactLine";
import { DotLottieCanvas } from "@/components/Cases/DotLottieCanvas";
import { useInView } from "@/hooks/useInView";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  CASE3_TITLE,
  CASE3_SUBTITLE,
  CASE3_PHONES,
  CASE3_STICKER_LABEL,
  CASE3_STICKER_QUOTE,
  CASE3_STICKER_DESCRIPTION,
  CASE3_STICKER_ROWS,
  CASE3_FEATURES,
  CASE3_SUMMARY_1,
  CASE3_SUMMARY_2,
  type StyledSegment,
} from "@/data/caseStudy3Data";

function StyledText({ segments }: { segments: StyledSegment[] }) {
  return (
    <>
      {segments.map((seg, i) => (
        <span
          key={i}
          className={seg.white ? "text-white" : "text-text-secondary"}
        >
          {seg.text}
        </span>
      ))}
    </>
  );
}

export function CaseStudy3() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [heroRef, heroVisible] = useInView(0.1);
  const [phonesRef, phonesVisible] = useInView(0.1);
  const [stickerTextRef, stickerTextVisible] = useInView(0.1);
  const [stickerGridRef, stickerGridVisible] = useInView(0.1);
  const [featuresRef, featuresVisible] = useInView(0.1);
  const [summaryRef, summaryVisible] = useInView(0.1);

  // Scroll each mobile sticker row so the 2nd sticker is centered,
  // hinting that the row is horizontally scrollable
  const stickerRowRef = useCallback(
    (el: HTMLDivElement | null) => {
      if (!el || !isMobile) return;
      // sticker 160px + gap 16px → 2nd sticker center at 160+16+80 = 256px
      const secondCenter = 160 + 16 + 80;
      el.scrollLeft = secondCenter - el.clientWidth / 2;
    },
    [isMobile],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "B2B Stickers — Shkuratov Designer";
  }, []);

  return (
    <div className="relative min-h-screen min-h-dvh w-full bg-black">
      <Logo visible />

      <main className="relative z-10 flex flex-col items-center px-5 md:px-10 pt-[80px] md:pt-[40px] pb-[164px] md:pb-[320px]">
        {/* Back to cases */}
        <Link
          to="/cases"
          className="flex items-center gap-[8px] self-center mb-[64px] md:mb-[56px] mt-[16px] md:mt-0"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M5.25 14L13.75 5.25L14.975 6.475L7.45 14L14.975 21.525L13.75 22.75L5.25 14Z"
              fill="#999899"
            />
          </svg>
          <span className="font-['TN',serif] font-extralight text-[24px] leading-[1.2] text-text-secondary">
            Back to cases
          </span>
        </Link>

        {/* Hero */}
        <section
          ref={heroRef}
          className={`reveal-fade-up${heroVisible ? " visible" : ""} flex flex-col items-center text-center max-w-[808px] mb-[40px] md:mb-[56px]`}
        >
          <h1 className="font-['TN',serif] font-extralight text-[28px] md:text-[48px] leading-[1.2] text-white tracking-[-0.48px] mb-[16px]">
            {CASE3_TITLE}
          </h1>
          <p className="font-sf text-[16px] md:text-[18px] leading-[1.4] text-text-secondary">
            {CASE3_SUBTITLE}
          </p>
        </section>

        {/* Phone mockups */}
        <section
          ref={phonesRef}
          className={`reveal-blur${phonesVisible ? " visible" : ""} flex gap-[40px] md:gap-[156px] items-start mb-[128px] md:mb-[200px]`}
        >
          {[CASE3_PHONES.left, CASE3_PHONES.right].map((src, i) => (
            <div
              key={i}
              className="w-[150px] md:w-[300px]"
            >
              <img
                src={src}
                alt={`Phone mockup ${i + 1}`}
                className="w-full h-auto"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </section>

        {/* Sticker section — text */}
        <section
          ref={stickerTextRef}
          className={`reveal-fade-up${stickerTextVisible ? " visible" : ""} flex flex-col items-center text-center mb-[40px] md:mb-[56px]`}
        >
          <p className="font-sf text-[16px] md:text-[18px] leading-[1.4] text-accent mb-[16px]">
            {CASE3_STICKER_LABEL}
          </p>
          <p className="font-['TN',serif] font-extralight text-[28px] md:text-[48px] leading-[1.2] text-white tracking-[-0.48px] max-w-[1104px] mb-[32px]">
            {CASE3_STICKER_QUOTE}
          </p>
          <p className="font-sf text-[14px] md:text-[16px] leading-[1.4] max-w-[731px]">
            <StyledText segments={CASE3_STICKER_DESCRIPTION} />
          </p>
        </section>

        {/* Sticker grid */}
        <section
          ref={stickerGridRef}
          className={`reveal-fade-up${stickerGridVisible ? " visible" : ""} w-full max-w-[1258px] flex flex-col gap-[24px] md:gap-[32px] mb-[128px] md:mb-[200px]`}
        >
          {CASE3_STICKER_ROWS.map((row) => (
            <div
              key={row.name}
              ref={isMobile ? stickerRowRef : undefined}
              className={
                isMobile
                  ? "flex gap-[16px] overflow-x-auto scrollbar-hide px-5 -mx-5"
                  : "flex gap-[32px] items-center justify-center"
              }
            >
              {row.stickers.map((src) => (
                <div
                  key={src}
                  className={
                    isMobile
                      ? "w-[160px] h-[160px] shrink-0 overflow-hidden"
                      : "w-[226px] h-[226px] shrink-0 overflow-hidden"
                  }
                >
                  <DotLottieCanvas
                    src={src}
                    loop
                    playWhenVisible
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* Feature cards */}
        <section
          ref={featuresRef}
          className={`reveal-stagger-children${featuresVisible ? " visible" : ""} w-full max-w-[1256px] grid grid-cols-2 gap-[12px] md:gap-[32px_24px] auto-rows-[1fr] mb-[128px] md:mb-[200px]`}
        >
          {CASE3_FEATURES.map((feature) => (
            <div
              key={feature}
              className="bg-white rounded-[14px] md:rounded-[20px] px-[16px] md:px-[32px] py-[16px] md:py-[24px]"
            >
              <p className="font-['TN',serif] font-extralight text-[20px] md:text-[40px] leading-[1.2] text-[#222] tracking-[-0.4px]">
                {feature}
              </p>
            </div>
          ))}
        </section>

        {/* Summary */}
        <section
          ref={summaryRef}
          className={`reveal-fade-up${summaryVisible ? " visible" : ""} flex flex-col gap-[40px] md:gap-[56px] items-center text-center max-w-[1003px]`}
        >
          <p className="font-['TN',serif] font-extralight text-[28px] md:text-[48px] leading-[1.2] tracking-[-0.48px]">
            <StyledText segments={CASE3_SUMMARY_1} />
          </p>
          <p className="font-['TN',serif] font-extralight text-[28px] md:text-[48px] leading-[1.2] tracking-[-0.48px]">
            <StyledText segments={CASE3_SUMMARY_2} />
          </p>
        </section>
      </main>

      <NavBar visible />
      <ContactLine visible />
    </div>
  );
}
