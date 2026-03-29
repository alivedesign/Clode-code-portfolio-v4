import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router";
import { Logo } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { ContactLine } from "@/components/Layout/ContactLine";
import { useInView } from "@/hooks/useInView";
import { useScrollProgress } from "@/hooks/useScrollProgress";
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
      className="inline-flex items-center gap-2 mt-[40px] md:mt-0 mb-[32px] font-['TN',serif] font-extralight text-[24px] leading-[1.2] text-text-secondary hover:text-white transition-colors"
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
          className="w-full"
          style={{ aspectRatio: "2752 / 1536" }}
          loading="eager"
        />
      </div>
    </section>
  );
}

/* ─── The Problem ─────────────────────────────────────────── */
function ProblemSection() {
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

/* ─── Timeline scroll-linked constants ───────────────────── */
const TIMELINE_HEIGHT = 1389;

/** Y positions of the 6 dots (from Figma) */
const DOT_POSITIONS = [79, 322, 565, 808, 1051, 1294];

/** Progress threshold for each step (dot Y / container height) */
const STEP_THRESHOLDS = DOT_POSITIONS.map((y) => y / TIMELINE_HEIGHT);

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

/**
 * Builds an SVG path string connecting all dots with S-curves.
 * Center X of all dots = 390 (383 left + 15/2 width = 390.5 ≈ 390).
 */
function buildTimelinePath(): string {
  const cx = 390;
  const parts: string[] = [`M ${cx} ${DOT_POSITIONS[0]}`];

  for (let i = 0; i < DOT_POSITIONS.length - 1; i++) {
    const y1 = DOT_POSITIONS[i];
    const y2 = DOT_POSITIONS[i + 1];
    const midY = (y1 + y2) / 2;
    // S-curve: alternate left/right bulge (±20px from center)
    const bulge = i % 2 === 0 ? 20 : -20;
    parts.push(`C ${cx + bulge} ${midY}, ${cx - bulge} ${midY}, ${cx} ${y2}`);
  }

  return parts.join(" ");
}

const TIMELINE_SVG_PATH = buildTimelinePath();

/** Mobile timeline thresholds: earlier appearance, spread from 0.02 to 0.55 */
const MOBILE_THRESHOLDS = Array.from({ length: 6 }, (_, i) => 0.02 + (i * 0.53) / 5);

function TimelineSection() {
  /* ── Desktop ── */
  const desktopScrollRef = useScrollProgress();
  const desktopContainerRef = useRef<HTMLDivElement | null>(null);
  const desktopPathRef = useRef<SVGPathElement | null>(null);
  const [desktopPathLen, setDesktopPathLen] = useState(0);
  const [desktopSteps, setDesktopSteps] = useState<boolean[]>(new Array(6).fill(false));

  const setDesktopRefs = useCallback(
    (node: HTMLDivElement | null) => {
      desktopContainerRef.current = node;
      (desktopScrollRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [desktopScrollRef],
  );

  useEffect(() => {
    if (desktopPathRef.current) setDesktopPathLen(desktopPathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    const el = desktopContainerRef.current;
    if (!el) return;
    let rafId = 0;
    const check = () => {
      const p = parseFloat(el.style.getPropertyValue("--timeline-progress") || "0");
      setDesktopSteps((prev) => {
        const next = prev.map((_, i) => p >= STEP_THRESHOLDS[i]);
        if (next.every((v, i) => v === prev[i])) return prev;
        return next;
      });
      if (desktopPathRef.current && desktopPathLen > 0) {
        desktopPathRef.current.style.strokeDashoffset = String(desktopPathLen - p * desktopPathLen);
      }
      rafId = requestAnimationFrame(check);
    };
    rafId = requestAnimationFrame(check);
    return () => cancelAnimationFrame(rafId);
  }, [desktopPathLen]);

  /* ── Mobile ── */
  const mobileScrollRef = useScrollProgress();
  const mobileContainerRef = useRef<HTMLDivElement | null>(null);
  const mobilePathRef = useRef<SVGPathElement | null>(null);
  const [mobilePathLen, setMobilePathLen] = useState(0);
  const [mobileSteps, setMobileSteps] = useState<boolean[]>(new Array(6).fill(false));

  const setMobileRefs = useCallback(
    (node: HTMLDivElement | null) => {
      mobileContainerRef.current = node;
      (mobileScrollRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [mobileScrollRef],
  );

  useEffect(() => {
    if (mobilePathRef.current) setMobilePathLen(mobilePathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    const el = mobileContainerRef.current;
    if (!el) return;
    let rafId = 0;
    const check = () => {
      const p = parseFloat(el.style.getPropertyValue("--timeline-progress") || "0");
      setMobileSteps((prev) => {
        const next = prev.map((_, i) => p >= MOBILE_THRESHOLDS[i]);
        if (next.every((v, i) => v === prev[i])) return prev;
        return next;
      });
      if (mobilePathRef.current && mobilePathLen > 0) {
        mobilePathRef.current.style.strokeDashoffset = String(mobilePathLen - p * mobilePathLen);
      }
      rafId = requestAnimationFrame(check);
    };
    rafId = requestAnimationFrame(check);
    return () => cancelAnimationFrame(rafId);
  }, [mobilePathLen]);

  return (
    <section className="w-full mt-[100px] md:mt-[172px] overflow-hidden">
      {/* ── Mobile — scroll-linked with line ── */}
      <div ref={setMobileRefs} className="md:hidden flex gap-[16px]">
        {/* Left column — SVG line + dots */}
        <div className="relative flex-shrink-0" style={{ width: 24 }}>
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 24 1000"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              ref={mobilePathRef}
              d="M 12 0 L 12 1000"
              stroke="#999899"
              strokeWidth="1"
              fill="none"
              strokeDasharray={mobilePathLen || 1}
              strokeDashoffset={mobilePathLen || 1}
            />
          </svg>
          {CASE1_TIMELINE.map((_, i) => {
            const pct = (i / 5) * 100;
            return (
              <div
                key={i}
                className="absolute left-[7px] w-[10px] h-[10px] rounded-full bg-white transition-opacity duration-500"
                style={{ top: `${pct}%`, opacity: mobileSteps[i] ? 1 : 0 }}
              />
            );
          })}
        </div>

        {/* Right column — cards */}
        <div className="flex-1 flex flex-col gap-[40px]">
          {CASE1_TIMELINE.map((step, i) => (
            <div
              key={i}
              className="flex flex-col gap-[12px] transition-all duration-700"
              style={{
                opacity: mobileSteps[i] ? 1 : 0,
                transform: mobileSteps[i] ? "translateX(0)" : "translateX(30px)",
              }}
            >
              <div className="aspect-[327/174] rounded-[16px] overflow-hidden bg-[#3b3c48]">
                {mobileSteps[i] && <TimelineMedia step={step} />}
              </div>
              <p className="font-['TN',serif] font-extralight text-[20px] leading-[1.2] text-white">
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Desktop — scroll-linked ── */}
      <div
        ref={setDesktopRefs}
        className="hidden md:block relative mx-auto"
        style={{ width: 781, height: TIMELINE_HEIGHT }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 781 ${TIMELINE_HEIGHT}`}
          fill="none"
          aria-hidden="true"
        >
          <path
            ref={desktopPathRef}
            d={TIMELINE_SVG_PATH}
            stroke="#999899"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={desktopPathLen || 1}
            strokeDashoffset={desktopPathLen || 1}
          />
          {DOT_POSITIONS.map((y, i) => (
            <circle
              key={i}
              cx={390}
              cy={y}
              r={7.5}
              fill="white"
              className="transition-opacity duration-500"
              style={{ opacity: desktopSteps[i] ? 1 : 0 }}
            />
          ))}
        </svg>

        {CASE1_TIMELINE.map((step, i) => {
          const pos = TIMELINE_TEXT[i];
          const isRight = pos.right != null;
          const isLeft = pos.left != null;
          return (
            <p
              key={`text-${i}`}
              className="absolute font-['TN',serif] font-extralight text-[24px] leading-[1.2] text-white transition-all duration-700"
              style={{
                top: pos.top,
                width: pos.width,
                ...(isRight
                  ? { left: pos.right! - pos.width, textAlign: "right" as const }
                  : { left: pos.left }),
                opacity: desktopSteps[i] ? 1 : 0,
                transform: desktopSteps[i]
                  ? "translateX(0)"
                  : isLeft
                    ? "translateX(30px)"
                    : "translateX(-30px)",
              }}
            >
              {step.label}
            </p>
          );
        })}

        {CASE1_TIMELINE.map((step, i) => {
          const pos = TIMELINE_MEDIA[i];
          const isLeftCard = pos.left === 0;
          return (
            <div
              key={`media-${i}`}
              className="absolute rounded-[16px] overflow-hidden bg-[#3b3c48] transition-all duration-700"
              style={{
                left: pos.left,
                top: pos.top,
                width: 327,
                height: 174,
                opacity: desktopSteps[i] ? 1 : 0,
                transform: desktopSteps[i]
                  ? "translateX(0)"
                  : isLeftCard
                    ? "translateX(-40px)"
                    : "translateX(40px)",
              }}
            >
              {desktopSteps[i] && <TimelineMedia step={step} />}
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
      className="w-[350px] h-[350px] cursor-pointer"
      style={{ perspective: 1000 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front — image */}
        <img
          src={card.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover rounded-[32px]"
          style={{ backfaceVisibility: "hidden" }}
          loading="lazy"
        />
        {/* Back — text */}
        <div
          className="absolute inset-0 bg-[#1e242a] rounded-[32px]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
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
    </div>
  );
}

function DecisionFlipCardMobile({
  card,
  flipOnVisible = false,
}: {
  card: DecisionCard;
  flipOnVisible?: boolean;
}) {
  const [flipped, setFlipped] = useState(false);

  // When flipOnVisible becomes true: wait for reveal to finish, then flip
  useEffect(() => {
    if (!flipOnVisible) return;
    // 700ms = reveal-scale animation duration, then flip
    const timer = setTimeout(() => setFlipped(true), 800);
    return () => clearTimeout(timer);
  }, [flipOnVisible]);

  return (
    <div
      className="w-full aspect-square cursor-pointer"
      style={{ perspective: 600 }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <img
          src={card.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover rounded-[16px]"
          style={{ backfaceVisibility: "hidden" }}
          loading="lazy"
        />
        <div
          className="absolute inset-0 bg-[#1e242a] rounded-[16px] p-[16px] overflow-y-auto scrollbar-hide"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {card.paragraphs.map((para, pi) => (
            <p
              key={pi}
              className={`font-sf leading-[1.4] whitespace-pre-line mb-[6px] last:mb-0 ${pi === 0 ? "text-white text-[14px] font-medium" : "text-text-secondary text-[12px]"}`}
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
  const [titleRef, titleVisible] = useInView(0.1);
  const [cardsRef, cardsVisible] = useInView(0.1);
  const [mobileGridRef, mobileVisible] = useInView(0.2);
  return (
    <section className="w-full mt-[100px] md:mt-[172px]">
      {/* Desktop — exact Figma absolute layout */}
      <div className="hidden md:block relative mx-auto" style={{ width: 1280, height: 704 }}>
        <div ref={titleRef}>
          <h2
            className={`reveal-fade-up${titleVisible ? " visible" : ""} absolute left-1/2 -translate-x-1/2 top-0 font-['TN',serif] font-extralight text-[48px] leading-[1.2] tracking-[-0.48px] text-white text-center`}
            style={{ width: 514 }}
          >
            3 decisions that changed everything
          </h2>

          <svg
            className={`reveal-fade-up${titleVisible ? " visible" : ""} absolute`}
            style={{ left: 196, top: 41, width: 154.5, height: 115.5, transitionDelay: "200ms" }}
            viewBox="0 0 158 116.5"
            fill="none"
            aria-hidden="true"
          >
            <path d={ARROW_LEFT_PATH} fill="#999899" />
          </svg>

          <svg
            className={`reveal-fade-up${titleVisible ? " visible" : ""} absolute`}
            style={{ left: 929, top: 41, width: 154.5, height: 115.5, transform: titleVisible ? "scaleX(-1)" : "scaleX(-1) translateY(30px)", transitionDelay: "200ms" }}
            viewBox="0 0 158 116.5"
            fill="none"
            aria-hidden="true"
          >
            <path d={ARROW_LEFT_PATH} fill="#999899" />
          </svg>

          <svg
            className={`reveal-fade-up${titleVisible ? " visible" : ""} absolute`}
            style={{ left: 638, top: 157, width: 7.4, height: 137.5, transitionDelay: "200ms" }}
            viewBox="0 0 7.4 138.5"
            fill="none"
            aria-hidden="true"
          >
            <path d={ARROW_CENTER_PATH} fill="#999899" />
          </svg>
        </div>

        <div ref={cardsRef}>
          <div
            className={`reveal-scale${cardsVisible ? " visible" : ""} absolute`}
            style={{ left: 0, top: 187 }}
          >
            <DecisionFlipCard card={CASE1_DECISIONS[0]} index={0} />
          </div>
          <div
            className={`reveal-scale${cardsVisible ? " visible" : ""} absolute left-1/2 -translate-x-1/2`}
            style={{ top: 354, transitionDelay: "150ms" }}
          >
            <DecisionFlipCard card={CASE1_DECISIONS[1]} index={1} />
          </div>
          <div
            className={`reveal-scale${cardsVisible ? " visible" : ""} absolute`}
            style={{ left: 930, top: 187, transitionDelay: "300ms" }}
          >
            <DecisionFlipCard card={CASE1_DECISIONS[2]} index={2} />
          </div>
        </div>
      </div>

      {/* Mobile — 2-col grid, first card flips after reveal */}
      <div ref={mobileGridRef} className="md:hidden">
        <h2 className="font-['TN',serif] font-extralight text-[28px] leading-[1.2] tracking-[-0.48px] text-white text-center mb-[16px]">
          3 decisions that changed everything
        </h2>
        <div className={`reveal-stagger-children${mobileVisible ? " visible" : ""} grid grid-cols-2 gap-[12px] mb-[12px]`}>
          <DecisionFlipCardMobile card={CASE1_DECISIONS[0]} flipOnVisible={mobileVisible} />
          <DecisionFlipCardMobile card={CASE1_DECISIONS[1]} />
        </div>
        <div className="grid grid-cols-2 gap-[12px]">
          <div className="col-start-1 col-end-3 mx-auto" style={{ width: "calc(50% - 6px)" }}>
            <DecisionFlipCardMobile card={CASE1_DECISIONS[2]} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── YouTube Video ───────────────────────────────────────── */
function VideoSection() {
  const [vidRef, vidVisible] = useInView(0.1);
  const [tabsRef, tabsVisible] = useInView(0.1);
  const [playing, setPlaying] = useState(false);

  return (
    <section className="flex flex-col items-center gap-[24px] w-full max-w-[966px] mt-[100px] md:mt-[172px]">
      {/* YouTube facade — no title per Figma */}
      <div
        ref={vidRef}
        className={`reveal-blur${vidVisible ? " visible" : ""} relative w-full rounded-[24px] md:rounded-[32px] overflow-hidden bg-white/10 cursor-pointer`}
      >
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
      <div
        ref={tabsRef}
        className={`reveal-stagger-children${tabsVisible ? " visible" : ""} flex flex-col md:flex-row gap-[16px] md:gap-[24px] w-full`}
      >
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
  const [quoteRef, quoteVisible] = useInView(0.1);
  const [gridRef, gridVisible] = useInView(0.1);

  return (
    <section className="w-full max-w-[1280px] mt-[100px] md:mt-[172px]">
      <p
        ref={quoteRef}
        className={`reveal-fade-up${quoteVisible ? " visible" : ""} font-['TN',serif] font-extralight text-[24px] md:text-[48px] leading-[1.2] tracking-[-0.48px] text-white text-center max-w-[966px] mx-auto mb-[48px] md:mb-[80px]`}
      >
        {CASE1_QUOTE}
      </p>

      <div
        ref={gridRef}
        className={`reveal-stagger-children${gridVisible ? " visible" : ""} grid grid-cols-2 gap-[12px] md:gap-[48px] auto-rows-[1fr]`}
      >
        {CASE1_METRICS.map((metric) => (
          <div key={metric.label} className="bg-white rounded-[20px] pt-[24px] pb-[30px] px-[16px] md:px-[32px]">
            <p className="font-['TN',serif] font-extralight text-[28px] md:text-[48px] text-[#222] tracking-[-0.48px] leading-[1.2]">
              {metric.value}
            </p>
            <p className="font-sf text-[14px] md:text-[18px] text-[#6a6a6a] mt-[12px] leading-[1.4]">
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
