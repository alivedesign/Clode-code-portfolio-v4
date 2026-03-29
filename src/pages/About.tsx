import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Logo } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { ContactLine } from "@/components/Layout/ContactLine";
import { useInView } from "@/hooks/useInView";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  ABOUT_HEADLINE,
  ABOUT_SUBTITLE,
  ABOUT_TEXT_1,
  ABOUT_TEXT_2,
  ABOUT_TEXT_3_P1,
  ABOUT_TEXT_3_P2,
  ABOUT_TEXT_3_P3,
  ABOUT_PHOTOS_GRID_1,
  ABOUT_PHOTOS_GRID_2,
  ABOUT_PHOTOS_GRID_3,
} from "@/data/aboutData";
import type { TextSegment, AboutPhoto } from "@/data/aboutData";

/* ── TextBlock: renders mixed white/secondary/link text ── */
function TextBlock({ segments, className }: { segments: TextSegment[]; className?: string }) {
  return (
    <p className={`font-sf text-[18px] leading-[1.4] text-text-secondary text-center ${className ?? ""}`}>
      {segments.map((seg, i) => {
        if ("link" in seg) {
          return (
            <a
              key={i}
              href={seg.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link-inline hover:underline"
            >
              {seg.text}
            </a>
          );
        }
        return (
          <span key={i} className={seg.white ? "text-white" : ""}>
            {seg.text}
          </span>
        );
      })}
    </p>
  );
}

/* ── PhotoCarousel: mobile-only Embla slider ── */
function PhotoCarousel({ photos }: { photos: AboutPhoto[] }) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  return (
    <div ref={emblaRef} className="overflow-hidden">
      <div className="flex gap-[12px]">
        {photos.map((photo) => (
          <div key={photo.src} className="shrink-0 w-[280px] h-[360px] rounded-[12px] overflow-hidden">
            <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main About page ── */
export function About() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [grid1Ref, grid1Visible] = useInView(0.2);
  const [text1Ref, text1Visible] = useInView(0.2);
  const [grid2Ref, grid2Visible] = useInView(0.2);
  const [text2Ref, text2Visible] = useInView(0.2);
  const [grid3Ref, grid3Visible] = useInView(0.2);
  const [text3Ref, text3Visible] = useInView(0.2);

  useEffect(() => {
    document.title = "About — Shkuratov Designer";
  }, []);

  return (
    <div className="relative min-h-screen min-h-dvh w-full bg-black">
      <Logo visible />

      <main className="relative z-10 flex flex-col items-center px-5 md:px-10 pt-[104px] pb-[164px] md:pb-[320px]">
        {/* ── 1. Hero Section ── */}
        <header className="experience-fade-up flex flex-col items-center max-w-[1107px]">
          <h1 className="text-[28px] md:text-[48px] leading-[1.2] text-center tracking-[-0.48px] font-['TN',serif] font-[350]">
            {ABOUT_HEADLINE.map((seg, i) => (
              <span key={i} className={"white" in seg && seg.white ? "text-white" : "text-text-secondary"}>
                {seg.text}
              </span>
            ))}
          </h1>
          <p className="mt-[24px] font-sf text-[18px] leading-[1.4] text-text-secondary text-center max-w-[655px]">
            {ABOUT_SUBTITLE.map((seg, i) => (
              <span key={i} className={"white" in seg && seg.white ? "text-white" : ""}>
                {seg.text}
              </span>
            ))}
          </p>
        </header>

        {/* ── 2. Photo Grid 1 ── */}
        <section
          ref={grid1Ref}
          aria-label="Personal photos"
          className={`experience-scroll-reveal${grid1Visible ? " visible" : ""} mt-[48px] md:mt-[64px] w-full max-w-[895px]`}
        >
          {isMobile ? (
            <PhotoCarousel photos={ABOUT_PHOTOS_GRID_1} />
          ) : (
            <div className="flex gap-[48px] w-full">
              {/* Left column: two stacked images */}
              <div className="flex flex-col gap-[55px]" style={{ flex: "420 1 0%" }}>
                <div className="rounded-[12px] overflow-hidden" style={{ aspectRatio: "420/340" }}>
                  <img src={ABOUT_PHOTOS_GRID_1[0].src} alt={ABOUT_PHOTOS_GRID_1[0].alt} className="w-full h-full object-cover" style={{ objectPosition: "50% 28%" }} loading="lazy" />
                </div>
                <div className="rounded-[12px] overflow-hidden" style={{ aspectRatio: "419/466" }}>
                  <img src={ABOUT_PHOTOS_GRID_1[2].src} alt={ABOUT_PHOTOS_GRID_1[2].alt} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
              {/* Right column: single tall image */}
              <div style={{ flex: "427 1 0%" }}>
                <div className="rounded-[12px] overflow-hidden" style={{ aspectRatio: "427/634" }}>
                  <img src={ABOUT_PHOTOS_GRID_1[1].src} alt={ABOUT_PHOTOS_GRID_1[1].alt} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── 3. Text Block 1 ── */}
        <section
          ref={text1Ref}
          aria-label="Design philosophy"
          className={`experience-scroll-reveal${text1Visible ? " visible" : ""} mt-[48px] md:mt-[96px] max-w-[640px]`}
        >
          <TextBlock segments={ABOUT_TEXT_1} />
        </section>

        {/* ── 4. Photo Grid 2 ── */}
        <section
          ref={grid2Ref}
          aria-label="Active lifestyle photos"
          className={`experience-scroll-reveal${grid2Visible ? " visible" : ""} mt-[48px] md:mt-[96px] w-full max-w-[895px]`}
        >
          {isMobile ? (
            <PhotoCarousel photos={ABOUT_PHOTOS_GRID_2} />
          ) : (
            <div className="flex gap-[48px] w-full">
              {/* Left column: single tall image */}
              <div style={{ flex: "427 1 0%" }}>
                <div className="rounded-[12px] overflow-hidden" style={{ aspectRatio: "427/569" }}>
                  <img src={ABOUT_PHOTOS_GRID_2[0].src} alt={ABOUT_PHOTOS_GRID_2[0].alt} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
              {/* Right column: two stacked images */}
              <div className="flex flex-col gap-[40px]" style={{ flex: "380 1 0%" }}>
                <div className="rounded-[12px] overflow-hidden" style={{ aspectRatio: "380/295" }}>
                  <img src={ABOUT_PHOTOS_GRID_2[1].src} alt={ABOUT_PHOTOS_GRID_2[1].alt} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="rounded-[12px] overflow-hidden" style={{ aspectRatio: "380/377" }}>
                  <img src={ABOUT_PHOTOS_GRID_2[2].src} alt={ABOUT_PHOTOS_GRID_2[2].alt} className="w-full h-full object-cover" style={{ objectPosition: "50% 100%" }} loading="lazy" />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── 5. Text Block 2 ── */}
        <section
          ref={text2Ref}
          aria-label="Personal interests"
          className={`experience-scroll-reveal${text2Visible ? " visible" : ""} mt-[48px] md:mt-[96px] max-w-[670px]`}
        >
          <TextBlock segments={ABOUT_TEXT_2} />
        </section>

        {/* ── 6. Photo Grid 3 ── */}
        <section
          ref={grid3Ref}
          aria-label="Adventure photos"
          className={`experience-scroll-reveal${grid3Visible ? " visible" : ""} mt-[48px] md:mt-[96px] w-full max-w-[895px]`}
        >
          {isMobile ? (
            <PhotoCarousel photos={ABOUT_PHOTOS_GRID_3} />
          ) : (
            <div className="flex gap-[48px] w-full">
              {/* Left column: two stacked images */}
              <div className="flex flex-col gap-[40px]" style={{ flex: "380 1 0%" }}>
                <div className="rounded-[12px] overflow-hidden" style={{ aspectRatio: "380/350" }}>
                  <img src={ABOUT_PHOTOS_GRID_3[0].src} alt={ABOUT_PHOTOS_GRID_3[0].alt} className="w-full h-full object-cover" style={{ objectPosition: "50% 31%" }} loading="lazy" />
                </div>
                <div className="rounded-[12px] overflow-hidden" style={{ aspectRatio: "380/295" }}>
                  <img src={ABOUT_PHOTOS_GRID_3[1].src} alt={ABOUT_PHOTOS_GRID_3[1].alt} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
              {/* Right column: single tall image */}
              <div style={{ flex: "427 1 0%" }}>
                <div className="rounded-[12px] overflow-hidden" style={{ aspectRatio: "427/569" }}>
                  <img src={ABOUT_PHOTOS_GRID_3[2].src} alt={ABOUT_PHOTOS_GRID_3[2].alt} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── 7. Text Block 3 ── */}
        <section
          ref={text3Ref}
          aria-label="Content creation"
          className={`experience-scroll-reveal${text3Visible ? " visible" : ""} mt-[48px] md:mt-[96px] max-w-[640px]`}
        >
          <TextBlock segments={ABOUT_TEXT_3_P1} />
          <div className="mt-[32px]">
            <TextBlock segments={ABOUT_TEXT_3_P2} />
            <p className="font-sf text-[18px] leading-[1.4] text-text-secondary text-center">
              {ABOUT_TEXT_3_P3}
            </p>
          </div>
        </section>
      </main>

      <NavBar visible />
      <ContactLine visible />
    </div>
  );
}
