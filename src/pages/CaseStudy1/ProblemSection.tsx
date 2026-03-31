import { useEffect, useRef } from "react";
import { useInView } from "@/hooks/useInView";
import { CASE1_PROBLEM } from "@/data/caseStudy1Data";

export function ProblemSection() {
  const [headRef, headVisible] = useInView(0.1);
  const [imgRef, imgVisible] = useInView(0.1);
  const [pointsRef, pointsVisible] = useInView(0.1);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Start slider on 2nd image (mobile only)
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    if (el.scrollWidth > el.clientWidth) {
      el.scrollTo({ left: 316, behavior: "instant" as ScrollBehavior });
    }
  }, []);

  return (
    <section className="flex flex-col items-center gap-[40px] md:gap-[56px] w-full mt-[100px] md:mt-[172px]">
      <div
        ref={headRef}
        className={`reveal-fade-up${headVisible ? " visible" : ""} flex flex-col items-center gap-[16px] text-center max-w-[655px]`}
      >
        <p className="font-sf text-[16px] md:text-[18px] leading-[1.4] text-accent">
          {CASE1_PROBLEM.label}
        </p>
        <h2 className="font-['TN',serif] font-extralight text-[28px] md:text-[48px] leading-[1.2] tracking-[-0.48px] text-white max-w-[532px]">
          {CASE1_PROBLEM.heading}
        </h2>
      </div>

      {/* Full-width bleed images — Figma: 3 × 506.667×363, gap-40 */}
      <div
        ref={(node) => {
          sliderRef.current = node;
          (imgRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={`reveal-stagger-children${imgVisible ? " visible" : ""} w-screen flex gap-[16px] md:gap-[40px] overflow-x-auto md:overflow-visible px-5 md:px-0 snap-x snap-mandatory scrollbar-hide`}
      >
        {CASE1_PROBLEM.images.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[300px] md:w-0 md:flex-1 rounded-[20px] overflow-hidden bg-[#3b3c48] snap-center"
            style={{ aspectRatio: "507 / 363" }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Text points */}
      <div
        ref={pointsRef}
        className={`reveal-stagger-children${pointsVisible ? " visible" : ""} flex flex-col gap-[36px] md:gap-[48px] text-center max-w-[566px]`}
      >
        {CASE1_PROBLEM.points.map((point, i) => (
          <p key={i} className="font-sf text-[16px] md:text-[18px] leading-[1.4] text-text-secondary">
            <span className="text-white font-medium">{point.bold}</span>
            {point.body}
          </p>
        ))}
      </div>
    </section>
  );
}
