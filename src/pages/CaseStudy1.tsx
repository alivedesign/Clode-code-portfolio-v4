import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Logo } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { ContactLine } from "@/components/Layout/ContactLine";
import { useInView } from "@/hooks/useInView";
import {
  CASE1_TITLE,
  CASE1_SUBTITLE_SEGMENTS,
  CASE1_HERO_IMAGE,
  CASE1_PROBLEM,
  CASE1_TIMELINE,
  CASE1_DECISIONS,
  CASE1_YOUTUBE_VIDEO_ID,
  CASE1_YOUTUBE_EMBED_URL,
  CASE1_VIDEO_TABS,
  CASE1_QUOTE,
  CASE1_METRICS,
} from "@/data/caseStudy1Data";
import type { TimelineStep, DecisionCard } from "@/data/caseStudy1Data";

/* ─── Back Link ──────────────────────────────────────────── */
function BackLink() {
  return (
    <Link
      to="/cases"
      className="inline-flex items-center gap-2 font-['TN',serif] font-extralight text-[24px] leading-[1.2] text-text-secondary hover:text-white transition-colors"
    >
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M17.5 5.25L8.75 14L17.5 22.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Back to cases
    </Link>
  );
}

/* ─── Hero ────────────────────────────────────────────────── */
function HeroSection() {
  const [ref, visible] = useInView(0.1);

  return (
    <section
      ref={ref}
      className={`experience-scroll-reveal${visible ? " visible" : ""} flex flex-col items-center gap-[40px] md:gap-[56px] w-full max-w-[882px] mt-[48px] md:mt-[64px]`}
    >
      <div className="flex flex-col gap-[16px] items-center text-center max-w-[655px]">
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
      <img
        src={CASE1_HERO_IMAGE}
        alt="Isometric design system city illustration"
        className="w-full"
        style={{ aspectRatio: "2752 / 1536" }}
        loading="eager"
      />
    </section>
  );
}

/* ─── The Problem ─────────────────────────────────────────── */
function ProblemSection() {
  const [ref, visible] = useInView(0.1);

  return (
    <section
      ref={ref}
      className={`experience-scroll-reveal${visible ? " visible" : ""} flex flex-col items-center gap-[40px] md:gap-[56px] w-full mt-[100px] md:mt-[172px]`}
    >
      <div className="flex flex-col items-center gap-[16px] text-center max-w-[655px]">
        <p className="font-sf text-[16px] md:text-[18px] leading-[1.4] text-accent">
          {CASE1_PROBLEM.label}
        </p>
        <h2 className="font-['TN',serif] font-extralight text-[28px] md:text-[48px] leading-[1.2] tracking-[-0.48px] text-white max-w-[532px]">
          {CASE1_PROBLEM.heading}
        </h2>
      </div>

      {/* Full-width bleed images — Figma: 3 × 506.667×363, gap-40 */}
      <div className="w-screen flex gap-[16px] md:gap-[40px] overflow-x-auto md:overflow-visible px-5 md:px-0 snap-x snap-mandatory scrollbar-hide">
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
      <div className="flex flex-col gap-[36px] md:gap-[48px] text-center max-w-[566px]">
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

/* ─── Timeline ────────────────────────────────────────────── */
function TimelineMedia({ step }: { step: TimelineStep }) {
  if (step.media.type === "video") {
    const v = step.media;
    return (
      <video autoPlay muted loop playsInline poster={v.poster} className="w-full h-full object-cover">
        {v.webm && <source src={v.webm} type="video/webm" />}
        <source src={v.src} type="video/mp4" />
      </video>
    );
  }
  return <img src={step.media.src} alt={step.label} className="w-full h-full object-cover" loading="lazy" />;
}

/*
  Figma exact coordinates for the timeline (container: 781×1389):
  Dots (15×15) at x=383: y= 79, 322, 565, 808, 1051, 1294
  Text labels (left-aligned or right-aligned to center):
    1: right-edge=327, y=62,   w=218 (right-aligned text)
    2: x=454,          y=300,  w=218
    3: right-edge=327, y=543,  w=159 (right-aligned text)
    4: x=454,          y=786,  w=218
    5: right-edge=327, y=1022, w=159 (right-aligned text)
    6: x=454,          y=1286, w=218
  Media cards (327×174):
    1: x=454, y=0     | 2: x=0, y=242   | 3: x=454, y=485
    4: x=0,  y=729    | 5: x=454, y=972  | 6: x=0,   y=1215
  Connectors (rotated 90° S-curves between dots):
    1→2: x=366, y=110, 23×196  | 2→3: x=399, y=352, 22×196 (mirrored)
    3→4: x=366, y=594, 23×196  | 4→5: x=399, y=836, 22×196 (mirrored)
    5→6: x=366, y=1078, 23×196
*/

const TIMELINE_DOTS_Y = [79, 322, 565, 808, 1051, 1294];

const TIMELINE_TEXT: Array<{ right?: number; left?: number; top: number; width: number }> = [
  { right: 327, top: 62, width: 218 },
  { left: 454, top: 300, width: 218 },
  { right: 327, top: 543, width: 159 },
  { left: 454, top: 786, width: 218 },
  { right: 327, top: 1022, width: 159 },
  { left: 454, top: 1286, width: 218 },
];

const TIMELINE_MEDIA: Array<{ left: number; top: number }> = [
  { left: 454, top: 0 },
  { left: 0, top: 242 },
  { left: 454, top: 485 },
  { left: 0, top: 729 },
  { left: 454, top: 972 },
  { left: 0, top: 1215 },
];

const TIMELINE_CONNECTORS: Array<{ left: number; top: number; mirrored: boolean }> = [
  { left: 366, top: 110, mirrored: false },
  { left: 399, top: 352, mirrored: true },
  { left: 366, top: 594, mirrored: false },
  { left: 399, top: 836, mirrored: true },
  { left: 366, top: 1078, mirrored: false },
];

/* The Figma S-curve path (197×24 viewBox, rotated 90° to become vertical 23×196) */
const CURVE_PATH = "M0.5 0.5C0.5 0.5 57.7 23.2 96.7 23.5C137.1 23.8 196.5 0.5 196.5 0.5";

function TimelineSection() {
  const [ref, visible] = useInView(0.1);

  return (
    <section
      ref={ref}
      className={`experience-scroll-reveal${visible ? " visible" : ""} w-full mt-[100px] md:mt-[172px]`}
    >
      {/* Mobile */}
      <div className="md:hidden flex flex-col gap-[40px]">
        {CASE1_TIMELINE.map((step, i) => (
          <div key={i} className="flex flex-col gap-[12px]">
            <div className="aspect-[327/174] rounded-[16px] overflow-hidden bg-[#3b3c48]">
              <TimelineMedia step={step} />
            </div>
            <p className="font-['TN',serif] font-extralight text-[20px] leading-[1.2] text-white">
              {step.label}
            </p>
          </div>
        ))}
      </div>

      {/* Desktop — exact Figma layout */}
      <div className="hidden md:block relative mx-auto" style={{ width: 781, height: 1389 }}>
        {/* Dots */}
        {TIMELINE_DOTS_Y.map((y, i) => (
          <div
            key={`dot-${i}`}
            className="absolute w-[15px] h-[15px] rounded-full bg-white z-10"
            style={{ left: 383, top: y }}
          />
        ))}

        {/* Curved connectors */}
        {TIMELINE_CONNECTORS.map((c, i) => (
          <div
            key={`conn-${i}`}
            className="absolute flex items-center justify-center"
            style={{ left: c.left, top: c.top, width: c.mirrored ? 22 : 23, height: 196 }}
            aria-hidden="true"
          >
            <div
              className="flex-none"
              style={{
                width: 196,
                height: c.mirrored ? 22 : 23,
                transform: c.mirrored ? "scaleX(-1) rotate(90deg)" : "rotate(90deg)",
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 197 24"
                fill="none"
                preserveAspectRatio="none"
                overflow="visible"
              >
                <path d={CURVE_PATH} stroke="#999899" strokeWidth="1" strokeLinecap="round" fill="none" />
              </svg>
            </div>
          </div>
        ))}

        {/* Text labels */}
        {CASE1_TIMELINE.map((step, i) => {
          const pos = TIMELINE_TEXT[i];
          const isRight = pos.right != null;
          return (
            <p
              key={`text-${i}`}
              className="absolute font-['TN',serif] font-extralight text-[24px] leading-[1.2] text-white"
              style={{
                top: pos.top,
                width: pos.width,
                ...(isRight
                  ? { left: pos.right! - pos.width, textAlign: "right" as const }
                  : { left: pos.left }),
              }}
            >
              {step.label}
            </p>
          );
        })}

        {/* Media cards (327×174) */}
        {CASE1_TIMELINE.map((step, i) => {
          const pos = TIMELINE_MEDIA[i];
          return (
            <div
              key={`media-${i}`}
              className="absolute rounded-[16px] overflow-hidden bg-[#3b3c48]"
              style={{ left: pos.left, top: pos.top, width: 327, height: 174 }}
            >
              <TimelineMedia step={step} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

/*
  Figma "3 decisions" section (node 4114:52, container 1280×704):
  Title: centered, top-0
  Left arrow:   left-196, top-41,  154.5×115.5
  Right arrow:  left-929, top-41,  154.5×115.5 (horizontally mirrored)
  Center arrow: left-638, top-157, 7.4×137.5  (vertical with arrowhead)
  Images:
    Left:   left-0,   top-187, 350×350
    Center: centered,  top-354, 350×350
    Right:  left-930, top-187, 350×350
*/

/* Figma-exported arrow paths */
const ARROW_LEFT_PATH = "M157.5 1C157.78 0.98 157.98 0.74 157.96 0.46C157.94 0.19 157.7-0.02 157.42 0L157.46 0.5L157.5 1ZM2.54 116.27C2.69 116.5 3 116.57 3.24 116.42L7 113.96C7.23 113.81 7.3 113.5 7.15 113.27C7 113.03 6.69 112.97 6.46 113.12L3.11 115.31L0.92 111.96C0.77 111.73 0.46 111.66 0.23 111.81C0 111.97-0.07 112.28 0.08 112.51L2.54 116.27ZM157.46 0.5L157.42 0C135.28 1.76 100.98 9.65 70 27.63C39.01 45.62 11.31 73.72 2.47 115.9L2.96 116L3.45 116.1C12.21 74.28 39.68 46.38 70.5 28.5C101.33 10.6 135.48 2.74 157.5 1L157.46 0.5Z";
const ARROW_CENTER_PATH = "M4.18 0.5C4.18 0.22 3.96 0 3.68 0C3.41 0 3.18 0.22 3.18 0.5L3.68 0.5L4.18 0.5ZM3.33 138.35C3.52 138.55 3.84 138.55 4.04 138.35L7.22 135.17C7.41 134.98 7.41 134.66 7.22 134.46C7.02 134.27 6.71 134.27 6.51 134.46L3.68 137.29L0.85 134.46C0.66 134.27 0.34 134.27 0.15 134.46C-0.05 134.66-0.05 134.98 0.15 135.17L3.33 138.35ZM3.68 0.5L3.18 0.5L3.18 138H3.68H4.18L4.18 0.5L3.68 0.5Z";

/* Figma-exact text positions inside hover cards (top offset, width 290px, left 30px) */
const CARD_TEXT_TOPS = [50, 63, 26];

function DecisionFlipCard({ card, index }: { card: DecisionCard; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-[350px] h-[350px] rounded-[32px] cursor-pointer"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      <img
        src={card.image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover rounded-[32px] transition-opacity duration-300 ease-in-out"
        style={{ opacity: flipped ? 0 : 1 }}
        loading="lazy"
      />
      <div
        className="absolute inset-0 bg-[#1e242a] rounded-[32px] transition-opacity duration-300 ease-in-out"
        style={{ opacity: flipped ? 1 : 0 }}
      >
        <div
          className="absolute left-[30px] flex flex-col gap-[12px]"
          style={{ top: CARD_TEXT_TOPS[index], width: 290 }}
        >
          {card.paragraphs.map((para, pi) => (
            <p
              key={pi}
              className={`font-sf text-[18px] leading-[1.4] whitespace-pre-line ${pi === 0 ? "text-white" : "text-text-secondary"}`}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function DecisionsSection() {
  const [ref, visible] = useInView(0.1);

  return (
    <section
      ref={ref}
      className={`experience-scroll-reveal${visible ? " visible" : ""} w-full mt-[100px] md:mt-[172px]`}
    >
      {/* Desktop — exact Figma absolute layout */}
      <div className="hidden md:block relative mx-auto" style={{ width: 1280, height: 704 }}>
        {/* Title */}
        <h2
          className="absolute left-1/2 -translate-x-1/2 top-0 font-['TN',serif] font-extralight text-[48px] leading-[1.2] tracking-[-0.48px] text-white text-center"
          style={{ width: 514 }}
        >
          3 decisions that changed everything
        </h2>

        {/* Left arrow */}
        <svg
          className="absolute"
          style={{ left: 196, top: 41, width: 154.5, height: 115.5 }}
          viewBox="0 0 158 116.5"
          fill="none"
          aria-hidden="true"
        >
          <path d={ARROW_LEFT_PATH} fill="#999899" />
        </svg>

        {/* Right arrow (horizontally mirrored) */}
        <svg
          className="absolute"
          style={{ left: 929, top: 41, width: 154.5, height: 115.5, transform: "scaleX(-1)" }}
          viewBox="0 0 158 116.5"
          fill="none"
          aria-hidden="true"
        >
          <path d={ARROW_LEFT_PATH} fill="#999899" />
        </svg>

        {/* Center arrow */}
        <svg
          className="absolute"
          style={{ left: 638, top: 157, width: 7.4, height: 137.5 }}
          viewBox="0 0 7.4 138.5"
          fill="none"
          aria-hidden="true"
        >
          <path d={ARROW_CENTER_PATH} fill="#999899" />
        </svg>

        {/* Images/cards */}
        <div className="absolute" style={{ left: 0, top: 187 }}>
          <DecisionFlipCard card={CASE1_DECISIONS[0]} index={0} />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: 354 }}>
          <DecisionFlipCard card={CASE1_DECISIONS[1]} index={1} />
        </div>
        <div className="absolute" style={{ left: 930, top: 187 }}>
          <DecisionFlipCard card={CASE1_DECISIONS[2]} index={2} />
        </div>
      </div>

      {/* Mobile — stacked */}
      <div className="md:hidden flex flex-col items-center gap-[24px]">
        <h2 className="font-['TN',serif] font-extralight text-[28px] leading-[1.2] tracking-[-0.48px] text-white text-center mb-[16px]">
          3 decisions that changed everything
        </h2>
        {CASE1_DECISIONS.map((card, i) => (
          <DecisionFlipCard key={i} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ─── YouTube Video ───────────────────────────────────────── */
function VideoSection() {
  const [ref, visible] = useInView(0.1);
  const [playing, setPlaying] = useState(false);

  return (
    <section
      ref={ref}
      className={`experience-scroll-reveal${visible ? " visible" : ""} flex flex-col items-center gap-[24px] w-full max-w-[966px] mt-[100px] md:mt-[172px]`}
    >
      {/* YouTube facade — no title per Figma */}
      <div className="relative w-full rounded-[24px] md:rounded-[32px] overflow-hidden bg-white/10">
        <div className="relative w-full" style={{ paddingBottom: "57.76%" }}>
          {playing ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={CASE1_YOUTUBE_EMBED_URL}
              title="How it all connects"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="absolute inset-0 w-full h-full cursor-pointer bg-black group"
              onClick={() => setPlaying(true)}
              aria-label="Play video"
            >
              <img
                src={`https://img.youtube.com/vi/${CASE1_YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <svg
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[68px] h-[48px] opacity-80 group-hover:opacity-100 transition-opacity"
                viewBox="0 0 68 48"
                aria-hidden="true"
              >
                <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#FF0000" />
                <path d="M45 24L27 14v20" fill="#fff" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Tab labels — Figma: bg-[#1e1e1e], gap-24, rounded-12, py-16 px-8 */}
      <div className="flex flex-col md:flex-row gap-[16px] md:gap-[24px] w-full">
        {CASE1_VIDEO_TABS.map((tab) => (
          <div
            key={tab}
            className="flex-1 flex items-center justify-center bg-[#1e1e1e] rounded-[12px] py-[16px] px-[8px]"
          >
            <p className="font-sf text-[16px] md:text-[18px] leading-[1.4] text-text-secondary text-center">
              {tab}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Metrics ─────────────────────────────────────────────── */
function MetricsSection() {
  const [ref, visible] = useInView(0.1);

  return (
    <section
      ref={ref}
      className={`experience-scroll-reveal${visible ? " visible" : ""} w-full max-w-[1280px] mt-[100px] md:mt-[172px]`}
    >
      <p className="font-['TN',serif] font-extralight text-[24px] md:text-[48px] leading-[1.2] tracking-[-0.48px] text-white text-center max-w-[966px] mx-auto mb-[48px] md:mb-[80px]">
        {CASE1_QUOTE}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-[48px]">
        {CASE1_METRICS.map((metric) => (
          <div key={metric.label} className="bg-white rounded-[20px] pt-[24px] pb-[30px] px-[24px] md:px-[32px]">
            <p className="font-['TN',serif] font-extralight text-[36px] md:text-[48px] text-[#222] tracking-[-0.48px] leading-[1.2]">
              {metric.value}
            </p>
            <p className="font-sf text-[16px] md:text-[18px] text-[#6a6a6a] mt-[12px] leading-[1.4]">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Page ────────────────────────────────────────────────── */
export function CaseStudy1() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Case Study — Shkuratov Designer";
  }, []);

  return (
    <div className="relative min-h-screen min-h-dvh w-full bg-black">
      <Logo visible />

      <main className="relative z-10 flex flex-col items-center px-5 md:px-10 pt-[40px] pb-[164px] md:pb-[320px]">
        <BackLink />
        <HeroSection />
        <ProblemSection />
        <TimelineSection />
        <DecisionsSection />
        <VideoSection />
        <MetricsSection />
      </main>

      <NavBar visible />
      <ContactLine visible />
    </div>
  );
}
