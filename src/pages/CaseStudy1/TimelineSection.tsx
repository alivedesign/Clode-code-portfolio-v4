import { useState, useEffect, useRef, useCallback } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { CASE1_TIMELINE } from "@/data/caseStudy1Data";
import type { TimelineStep } from "@/data/caseStudy1Data";

/* ─── Timeline media helper ──────────────────────────────── */
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

/** Scale factor applied to raw scroll progress so the animation completes earlier */
const DESKTOP_PROGRESS_SCALE = 1.4;
const DESKTOP_LINE_SCALE = 1.15;
const MOBILE_PROGRESS_SCALE = 1.5;
const MOBILE_LINE_SCALE = 1.2;

export function TimelineSection() {
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
      const raw = parseFloat(el.style.getPropertyValue("--timeline-progress") || "0");
      const p = Math.min(1, raw * DESKTOP_PROGRESS_SCALE);
      setDesktopSteps((prev) => {
        const next = prev.map((_, i) => p >= STEP_THRESHOLDS[i]);
        if (next.every((v, i) => v === prev[i])) return prev;
        return next;
      });
      if (desktopPathRef.current && desktopPathLen > 0) {
        const lineProg = Math.min(1, raw * DESKTOP_LINE_SCALE);
        desktopPathRef.current.style.strokeDashoffset = String(desktopPathLen - lineProg * desktopPathLen);
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
      const raw = parseFloat(el.style.getPropertyValue("--timeline-progress") || "0");
      const p = Math.min(1, raw * MOBILE_PROGRESS_SCALE);
      setMobileSteps((prev) => {
        const next = prev.map((_, i) => p >= MOBILE_THRESHOLDS[i]);
        if (next.every((v, i) => v === prev[i])) return prev;
        return next;
      });
      if (mobilePathRef.current && mobilePathLen > 0) {
        const lineProg = Math.min(1, raw * MOBILE_LINE_SCALE);
        mobilePathRef.current.style.strokeDashoffset = String(mobilePathLen - lineProg * mobilePathLen);
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
        <div className="flex-1 min-w-0 flex flex-col gap-[40px]">
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
