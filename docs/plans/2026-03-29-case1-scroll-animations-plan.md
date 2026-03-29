# Case Study 1 — Scroll Animations Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add scroll-linked timeline drawing animation and upgraded section entrance animations to Case Study 1, plus a 32px spacing increase.

**Architecture:** A new `useScrollProgress` hook sets a single CSS custom property (`--timeline-progress`) on the timeline container, driven by scroll position. All line drawing and content reveals are CSS-driven from that variable. Other sections get new reveal CSS classes (`reveal-fade-up`, `reveal-blur`, `reveal-scale`, `reveal-stagger-children`) triggered by Intersection Observer.

**Tech Stack:** React 19, TypeScript, CSS custom properties, Intersection Observer, requestAnimationFrame

---

### Task 1: Add 32px spacing between BackLink and HeroSection

**Files:**
- Modify: `src/pages/CaseStudy1.tsx:23-35` (BackLink component)

**Step 1: Add margin-bottom to BackLink**

In `src/pages/CaseStudy1.tsx`, change the BackLink component's root element to include `mb-[32px]`:

```tsx
function BackLink() {
  return (
    <Link
      to="/cases"
      className="inline-flex items-center gap-2 mb-[32px] font-['TN',serif] font-extralight text-[24px] leading-[1.2] text-text-secondary hover:text-white transition-colors"
    >
```

**Step 2: Verify visually**

Run: `npm run dev`
Check: gap between "Back to cases" and the hero title is visibly larger by 32px.

**Step 3: Commit**

```bash
git add src/pages/CaseStudy1.tsx
git commit -m "style: add 32px spacing between BackLink and hero section"
```

---

### Task 2: Add new reveal CSS classes

**Files:**
- Modify: `src/styles/index.css:446-456` (scroll-triggered reveal section)

**Step 1: Add new reveal classes after the existing `.experience-scroll-reveal.visible` block (line 456)**

Insert after line 456 in `src/styles/index.css`:

```css
/* ─── Enhanced reveal animations ────────────────────────── */
.reveal-fade-up {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 700ms ease-out, transform 700ms ease-out;
}
.reveal-fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-blur {
  opacity: 0;
  transform: translateY(20px);
  filter: blur(8px);
  transition: opacity 800ms ease-out, transform 800ms ease-out, filter 800ms ease-out;
}
.reveal-blur.visible {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0);
}

.reveal-scale {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity 700ms ease-out, transform 700ms ease-out;
}
.reveal-scale.visible {
  opacity: 1;
  transform: scale(1);
}

/* Parent class: staggers direct children using reveal-fade-up timing */
.reveal-stagger-children > * {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 700ms ease-out, transform 700ms ease-out;
}
.reveal-stagger-children.visible > * {
  opacity: 1;
  transform: translateY(0);
}
.reveal-stagger-children.visible > *:nth-child(1) { transition-delay: 0ms; }
.reveal-stagger-children.visible > *:nth-child(2) { transition-delay: 80ms; }
.reveal-stagger-children.visible > *:nth-child(3) { transition-delay: 160ms; }
.reveal-stagger-children.visible > *:nth-child(4) { transition-delay: 240ms; }
.reveal-stagger-children.visible > *:nth-child(5) { transition-delay: 320ms; }
.reveal-stagger-children.visible > *:nth-child(6) { transition-delay: 400ms; }
```

**Step 2: Add reduced-motion overrides**

In the existing `@media (prefers-reduced-motion: reduce)` block (around line 546), add after the `.experience-scroll-reveal` override:

```css
  .reveal-fade-up,
  .reveal-blur,
  .reveal-scale {
    opacity: 1;
    transform: none;
    filter: none;
  }
  .reveal-stagger-children > * {
    opacity: 1;
    transform: none;
  }
```

**Step 3: Verify classes work**

Run: `npm run dev`
Temporarily add `reveal-blur visible` to any element to confirm it renders correctly.

**Step 4: Commit**

```bash
git add src/styles/index.css
git commit -m "style: add enhanced reveal animation CSS classes"
```

---

### Task 3: Create `useScrollProgress` hook

**Files:**
- Create: `src/hooks/useScrollProgress.ts`

**Step 1: Write the hook**

```ts
import { useEffect, useRef, useCallback } from "react";

/**
 * Tracks how far a container has scrolled through the viewport (0 → 1).
 * Sets --timeline-progress CSS custom property on the element.
 */
export function useScrollProgress(): React.RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement | null>(null);
  const rafId = useRef(0);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight;

    // progress 0 = container top just entered viewport bottom
    // progress 1 = container bottom just left viewport top
    const totalTravel = windowH + rect.height;
    const traveled = windowH - rect.top;
    const progress = Math.min(1, Math.max(0, traveled / totalTravel));

    el.style.setProperty("--timeline-progress", String(progress));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    update(); // initial
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);

  return ref;
}
```

**Step 2: Verify it compiles**

Run: `npm run build`
Expected: no TypeScript errors.

**Step 3: Commit**

```bash
git add src/hooks/useScrollProgress.ts
git commit -m "feat: add useScrollProgress hook for scroll-linked animations"
```

---

### Task 4: Build scroll-linked timeline SVG path

**Files:**
- Modify: `src/pages/CaseStudy1.tsx:118-282` (TimelineSection and related constants)

**Step 1: Replace the desktop timeline with a single SVG + scroll-linked content**

This is the largest change. Replace the entire `TimelineSection` function and the constants above it (`TIMELINE_DOTS_Y`, `TIMELINE_TEXT`, `TIMELINE_MEDIA`, `TIMELINE_CONNECTORS`, `CURVE_PATH`) with:

Keep `TimelineMedia` as-is (lines 119-130).

Replace the constants (lines 151-181) with:

```tsx
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
```

Replace `TimelineSection` (lines 182-282) with:

```tsx
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

function TimelineSection() {
  const scrollRef = useScrollProgress();
  const [ref, visible] = useInView(0.05);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const [pathLength, setPathLength] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>(new Array(6).fill(false));

  // Merge refs
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      (scrollRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [scrollRef, ref],
  );

  // Measure SVG path length once
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  // Read --timeline-progress and update step visibility
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId = 0;
    const check = () => {
      const progress = parseFloat(el.style.getPropertyValue("--timeline-progress") || "0");

      // Update visible steps
      setVisibleSteps((prev) => {
        const next = prev.map((_, i) => progress >= STEP_THRESHOLDS[i]);
        // Only update if changed
        if (next.every((v, i) => v === prev[i])) return prev;
        return next;
      });

      // Update stroke dashoffset
      if (pathRef.current && pathLength > 0) {
        const drawLength = progress * pathLength;
        pathRef.current.style.strokeDashoffset = String(pathLength - drawLength);
      }

      rafId = requestAnimationFrame(check);
    };

    rafId = requestAnimationFrame(check);
    return () => cancelAnimationFrame(rafId);
  }, [pathLength]);

  return (
    <section className="w-full mt-[100px] md:mt-[172px]">
      {/* Mobile — stagger reveal */}
      <div className={`md:hidden reveal-stagger-children${visible ? " visible" : ""}`} ref={visible ? undefined : ref}>
        {CASE1_TIMELINE.map((step, i) => (
          <div key={i} className="flex flex-col gap-[12px] mb-[40px]">
            <div className="aspect-[327/174] rounded-[16px] overflow-hidden bg-[#3b3c48]">
              <TimelineMedia step={step} />
            </div>
            <p className="font-['TN',serif] font-extralight text-[20px] leading-[1.2] text-white">
              {step.label}
            </p>
          </div>
        ))}
      </div>

      {/* Desktop — scroll-linked */}
      <div
        ref={setRefs}
        className="hidden md:block relative mx-auto"
        style={{ width: 781, height: TIMELINE_HEIGHT }}
      >
        {/* SVG: line + dots */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 781 ${TIMELINE_HEIGHT}`}
          fill="none"
          aria-hidden="true"
        >
          {/* Drawn line */}
          <path
            ref={pathRef}
            d={TIMELINE_SVG_PATH}
            stroke="#999899"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={pathLength || 1}
            strokeDashoffset={pathLength || 1}
          />
          {/* Dots */}
          {DOT_POSITIONS.map((y, i) => (
            <circle
              key={i}
              cx={390}
              cy={y}
              r={7.5}
              fill="white"
              className="transition-opacity duration-500"
              style={{ opacity: visibleSteps[i] ? 1 : 0 }}
            />
          ))}
        </svg>

        {/* Text labels */}
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
                opacity: visibleSteps[i] ? 1 : 0,
                transform: visibleSteps[i]
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

        {/* Media cards (327×174) */}
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
                opacity: visibleSteps[i] ? 1 : 0,
                transform: visibleSteps[i]
                  ? "translateX(0)"
                  : isLeftCard
                    ? "translateX(-40px)"
                    : "translateX(40px)",
              }}
            >
              {visibleSteps[i] && <TimelineMedia step={step} />}
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

**Step 2: Add required imports at top of file**

Add to the imports in `src/pages/CaseStudy1.tsx`:

```tsx
import { useState, useEffect, useRef, useCallback } from "react";
import { useScrollProgress } from "@/hooks/useScrollProgress";
```

(Replace the existing `import { useState, useEffect } from "react";`)

**Step 3: Verify visually**

Run: `npm run dev`
Scroll through the timeline. Verify:
- Line draws progressively as you scroll
- Dots appear when the line reaches them
- Cards slide in from their respective sides
- Labels fade in with the cards
- Videos only mount when their step becomes visible

**Step 4: Commit**

```bash
git add src/pages/CaseStudy1.tsx src/hooks/useScrollProgress.ts
git commit -m "feat: scroll-linked timeline drawing animation for case study 1"
```

---

### Task 5: Upgrade HeroSection animations

**Files:**
- Modify: `src/pages/CaseStudy1.tsx` (HeroSection function)

**Step 1: Split HeroSection into two reveal groups**

Replace HeroSection with:

```tsx
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
      <img
        ref={imgRef}
        src={CASE1_HERO_IMAGE}
        alt="Isometric design system city illustration"
        className={`reveal-blur${imgVisible ? " visible" : ""} w-full`}
        style={{ aspectRatio: "2752 / 1536" }}
        loading="eager"
      />
    </section>
  );
}
```

Note: `useInView` returns `RefObject<HTMLDivElement | null>` but we need it on an `<img>`. We'll update `useInView` to use a generic element type in this step. Change `useInView` signature:

In `src/hooks/useInView.ts`, change:
```ts
export function useInView(threshold = 0.2): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
```

**Step 2: Verify**

Run: `npm run dev`
Hero title fades up, image fades in with blur-to-sharp.

**Step 3: Commit**

```bash
git add src/pages/CaseStudy1.tsx src/hooks/useInView.ts
git commit -m "feat: upgrade HeroSection with split reveal animations"
```

---

### Task 6: Upgrade ProblemSection animations

**Files:**
- Modify: `src/pages/CaseStudy1.tsx` (ProblemSection function)

**Step 1: Apply stagger to images and points**

Replace ProblemSection with:

```tsx
function ProblemSection() {
  const [headRef, headVisible] = useInView(0.1);
  const [imgRef, imgVisible] = useInView(0.1);
  const [pointsRef, pointsVisible] = useInView(0.1);

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

      <div
        ref={imgRef}
        className={`reveal-stagger-children${imgVisible ? " visible" : ""} w-screen flex gap-[16px] md:gap-[40px] overflow-x-auto md:overflow-visible px-5 md:px-0 snap-x snap-mandatory scrollbar-hide`}
      >
        {CASE1_PROBLEM.images.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[300px] md:w-0 md:flex-1 rounded-[20px] overflow-hidden bg-[#3b3c48] snap-center"
            style={{ aspectRatio: "507 / 363" }}
          >
            <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>

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
```

**Step 2: Verify**

Run: `npm run dev`
Heading fades up, images stagger in, text points stagger in.

**Step 3: Commit**

```bash
git add src/pages/CaseStudy1.tsx
git commit -m "feat: upgrade ProblemSection with staggered reveal animations"
```

---

### Task 7: Upgrade DecisionsSection animations

**Files:**
- Modify: `src/pages/CaseStudy1.tsx` (DecisionsSection function)

**Step 1: Apply reveal-fade-up to title/arrows, reveal-scale with stagger to cards**

Replace DecisionsSection with:

```tsx
function DecisionsSection() {
  const [titleRef, titleVisible] = useInView(0.1);
  const [cardsRef, cardsVisible] = useInView(0.1);

  return (
    <section className="w-full mt-[100px] md:mt-[172px]">
      {/* Desktop */}
      <div className="hidden md:block relative mx-auto" style={{ width: 1280, height: 704 }}>
        <div ref={titleRef}>
          <h2
            className={`reveal-fade-up${titleVisible ? " visible" : ""} absolute left-1/2 -translate-x-1/2 top-0 font-['TN',serif] font-extralight text-[48px] leading-[1.2] tracking-[-0.48px] text-white text-center`}
            style={{ width: 514 }}
          >
            3 decisions that changed everything
          </h2>

          {/* Left arrow */}
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

      {/* Mobile */}
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
```

**Step 2: Verify**

Run: `npm run dev`
Title + arrows fade up, then cards scale in with stagger.

**Step 3: Commit**

```bash
git add src/pages/CaseStudy1.tsx
git commit -m "feat: upgrade DecisionsSection with scale reveal animations"
```

---

### Task 8: Upgrade VideoSection animations

**Files:**
- Modify: `src/pages/CaseStudy1.tsx` (VideoSection function)

**Step 1: Apply reveal-blur to YouTube, reveal-stagger-children to tabs**

Replace VideoSection with:

```tsx
function VideoSection() {
  const [vidRef, vidVisible] = useInView(0.1);
  const [tabsRef, tabsVisible] = useInView(0.1);
  const [playing, setPlaying] = useState(false);

  return (
    <section className="flex flex-col items-center gap-[24px] w-full max-w-[966px] mt-[100px] md:mt-[172px]">
      <div
        ref={vidRef}
        className={`reveal-blur${vidVisible ? " visible" : ""} relative w-full rounded-[24px] md:rounded-[32px] overflow-hidden bg-white/10`}
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
```

**Step 2: Verify**

Run: `npm run dev`
YouTube thumbnail blurs in, tabs stagger up.

**Step 3: Commit**

```bash
git add src/pages/CaseStudy1.tsx
git commit -m "feat: upgrade VideoSection with blur and stagger animations"
```

---

### Task 9: Upgrade MetricsSection animations

**Files:**
- Modify: `src/pages/CaseStudy1.tsx` (MetricsSection function)

**Step 1: Apply reveal-fade-up to quote, reveal-stagger-children + reveal-blur to metric cards**

Replace MetricsSection with:

```tsx
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
        className={`reveal-stagger-children${gridVisible ? " visible" : ""} grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-[48px]`}
      >
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
```

**Step 2: Verify**

Run: `npm run dev`
Quote fades up, metric cards stagger in.

**Step 3: Commit**

```bash
git add src/pages/CaseStudy1.tsx
git commit -m "feat: upgrade MetricsSection with staggered reveal animations"
```

---

### Task 10: Final verification and build check

**Step 1: Full build**

Run: `npm run build`
Expected: no TypeScript errors, clean build.

**Step 2: Visual QA**

Run: `npm run dev`
Full scroll through case study 1:
- 32px extra gap after BackLink ✓
- Hero: title fades up, image blurs in ✓
- Problem: heading fades up, images stagger, points stagger ✓
- Timeline: line draws on scroll, dots appear, cards slide in from sides ✓
- Decisions: title fades up, arrows delay, cards scale in staggered ✓
- Video: YouTube blurs in, tabs stagger ✓
- Metrics: quote fades up, cards stagger ✓
- Mobile: no scroll-linked timeline, all sections use stagger/fade ✓
- Reduced motion: all animations instant ✓

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: case study 1 scroll animations and spacing polish"
```
