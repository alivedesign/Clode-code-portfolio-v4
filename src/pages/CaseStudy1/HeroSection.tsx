import { useInView } from "@/hooks/useInView";
import {
  CASE1_TITLE,
  CASE1_SUBTITLE_SEGMENTS,
  CASE1_HERO_IMAGE,
} from "@/data/caseStudy1Data";

export function HeroSection() {
  const [textRef, textVisible] = useInView(0.1);
  const [imgRef, imgVisible] = useInView(0.1);

  return (
    <section className="flex flex-col items-center gap-[40px] md:gap-[56px] w-full max-w-[882px] mt-[48px] md:mt-[64px]">
      <div
        ref={textRef}
        className={`reveal-fade-up${textVisible ? " visible" : ""} flex flex-col gap-[16px] items-center text-center max-w-[655px]`}
      >
        <h1 className="font-['TN',serif] font-extralight text-[28px] md:text-[48px] leading-[1.2] tracking-[-0.48px] text-white">
          {CASE1_TITLE}
        </h1>
        <p className="font-sf text-[16px] md:text-[18px] leading-[1.4]">
          {CASE1_SUBTITLE_SEGMENTS.map((seg, i) => (
            <span key={i} className={seg.highlighted ? "text-white" : "text-text-secondary"}>
              {seg.text}
            </span>
          ))}
        </p>
      </div>
      <div
        ref={imgRef}
        className={`reveal-blur${imgVisible ? " visible" : ""} w-full`}
      >
        <img
          src={CASE1_HERO_IMAGE}
          alt="Isometric design system city illustration"
          width={2752}
          height={1536}
          className="w-full"
          style={{ aspectRatio: "2752 / 1536" }}
          loading="eager"
        />
      </div>
    </section>
  );
}
