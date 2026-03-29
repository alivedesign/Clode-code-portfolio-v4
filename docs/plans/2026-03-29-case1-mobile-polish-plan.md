# Case Study 1 Mobile Polish Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Five mobile-specific improvements to Case Study 1: BackLink spacing, slider start position, scroll-linked timeline, decisions grid with auto-flip hint, and metrics 2-column grid.

**Architecture:** All changes are mobile-only (below `md:` breakpoint / 768px). The mobile timeline reuses the existing `useScrollProgress` hook with a second ref for a separate mobile container. Decisions section gets a new `DecisionFlipCardMobile` component with auto-flip logic. All other changes are CSS class tweaks.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, useScrollProgress hook, useInView hook

---

### Task 1: BackLink — push down 24px on mobile

**Files:**
- Modify: `src/pages/CaseStudy1.tsx:28`

**Step 1: Add mobile-only top margin**

In the BackLink component (line 28), add `mt-[24px] md:mt-0` to the className:

```tsx
className="inline-flex items-center gap-2 mt-[24px] md:mt-0 mb-[32px] font-['TN',serif] font-extralight text-[24px] leading-[1.2] text-text-secondary hover:text-white transition-colors"
```

**Step 2: Verify**

Run `npm run dev`, check on mobile viewport — BackLink should sit 24px lower, gap to hero title unchanged.

**Step 3: Commit**

```bash
git add src/pages/CaseStudy1.tsx
git commit -m "style: push BackLink down 24px on mobile"
```

---

### Task 2: Problem slider — start on 2nd image

**Files:**
- Modify: `src/pages/CaseStudy1.tsx:77-131` (ProblemSection)

**Step 1: Add a ref to the images container and scroll to 2nd image on mount**

Replace ProblemSection with:

```tsx
function ProblemSection() {
  const [headRef, headVisible] = useInView(0.1);
  const [imgRef, imgVisible] = useInView(0.1);
  const [pointsRef, pointsVisible] = useInView(0.1);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Start slider on 2nd image (mobile only)
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    // Only on mobile where container is scrollable
    if (el.scrollWidth > el.clientWidth) {
      // 300px image + 16px gap = 316px to center 2nd image
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

      {/* Full-width bleed images */}
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
```

**Step 2: Verify**

Mobile viewport: slider starts centered on the 2nd image. Desktop: no change (slider not scrollable).

**Step 3: Commit**

```bash
git add src/pages/CaseStudy1.tsx
git commit -m "feat: start problem slider on 2nd image on mobile"
```

---

### Task 3: Mobile timeline — scroll-linked line + dots + card reveals

**Files:**
- Modify: `src/pages/CaseStudy1.tsx:215-381` (TimelineSection)

This is the most complex task. The mobile timeline needs its own `useScrollProgress` ref, its own SVG with a straight vertical line + dots, and cards that appear tied to scroll progress.

**Step 1: Replace TimelineSection**

Replace the entire `TimelineSection` function (lines 215-381) with:

```tsx
function TimelineSection() {
  /* ── Desktop refs ── */
  const desktopScrollRef = useScrollProgress();
  const desktopContainerRef = useRef<HTMLDivElement | null>(null);
  const desktopPathRef = useRef<SVGPathElement | null>(null);
  const [desktopPathLength, setDesktopPathLength] = useState(0);
  const [desktopVisibleSteps, setDesktopVisibleSteps] = useState<boolean[]>(new Array(6).fill(false));

  const setDesktopRefs = useCallback(
    (node: HTMLDivElement | null) => {
      desktopContainerRef.current = node;
      (desktopScrollRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [desktopScrollRef],
  );

  /* ── Mobile refs ── */
  const mobileScrollRef = useScrollProgress();
  const mobileContainerRef = useRef<HTMLDivElement | null>(null);
  const mobilePathRef = useRef<SVGPathElement | null>(null);
  const [mobilePathLength, setMobilePathLength] = useState(0);
  const [mobileVisibleSteps, setMobileVisibleSteps] = useState<boolean[]>(new Array(6).fill(false));

  const setMobileRefs = useCallback(
    (node: HTMLDivElement | null) => {
      mobileContainerRef.current = node;
      (mobileScrollRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [mobileScrollRef],
  );

  /* ── Desktop: measure path + animate ── */
  useEffect(() => {
    if (desktopPathRef.current) setDesktopPathLength(desktopPathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    const el = desktopContainerRef.current;
    if (!el) return;
    let rafId = 0;
    const check = () => {
      const progress = parseFloat(el.style.getPropertyValue("--timeline-progress") || "0");
      setDesktopVisibleSteps((prev) => {
        const next = prev.map((_, i) => progress >= STEP_THRESHOLDS[i]);
        if (next.every((v, i) => v === prev[i])) return prev;
        return next;
      });
      if (desktopPathRef.current && desktopPathLength > 0) {
        desktopPathRef.current.style.strokeDashoffset = String(desktopPathLength - progress * desktopPathLength);
      }
      rafId = requestAnimationFrame(check);
    };
    rafId = requestAnimationFrame(check);
    return () => cancelAnimationFrame(rafId);
  }, [desktopPathLength]);

  /* ── Mobile: card height = image(aspect 327/174) + gap(12) + text(~24) = ~approx variable.
       We use a fixed card slot height for dot positioning. Each card slot = image + label + gap.
       Card image aspect: 327/174. On mobile, card fills available width minus line column.
       Approximate card slot height: let's use ref-based measurement for accuracy.
       Simpler approach: position dots evenly based on step count. ── */

  // Mobile dot Y positions: evenly spaced. We'll compute from container height.
  // Each card slot: aspect-[327/174] image (~53% of width) + 12px gap + 24px text + 40px margin = ~variable
  // Better: use the same threshold approach. Container has 6 cards with mb-[40px].
  // Total mobile container height is dynamic. We compute thresholds as i/(count-1) spread from 0.05 to 0.85.
  const MOBILE_STEP_COUNT = 6;
  const MOBILE_THRESHOLDS = Array.from({ length: MOBILE_STEP_COUNT }, (_, i) =>
    0.08 + (i * 0.75) / (MOBILE_STEP_COUNT - 1),
  );

  useEffect(() => {
    if (mobilePathRef.current) setMobilePathLength(mobilePathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    const el = mobileContainerRef.current;
    if (!el) return;
    let rafId = 0;
    const check = () => {
      const progress = parseFloat(el.style.getPropertyValue("--timeline-progress") || "0");
      setMobileVisibleSteps((prev) => {
        const next = prev.map((_, i) => progress >= MOBILE_THRESHOLDS[i]);
        if (next.every((v, i) => v === prev[i])) return prev;
        return next;
      });
      if (mobilePathRef.current && mobilePathLength > 0) {
        mobilePathRef.current.style.strokeDashoffset = String(mobilePathLength - progress * mobilePathLength);
      }
      rafId = requestAnimationFrame(check);
    };
    rafId = requestAnimationFrame(check);
    return () => cancelAnimationFrame(rafId);
  }, [mobilePathLength]);

  return (
    <section className="w-full mt-[100px] md:mt-[172px]">
      {/* ── Mobile — scroll-linked with line ── */}
      <div ref={setMobileRefs} className="md:hidden flex gap-[16px]">
        {/* Left column — SVG line + dots */}
        <div className="relative flex-shrink-0" style={{ width: 24 }}>
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Straight vertical line */}
            <line
              ref={mobilePathRef as React.RefObject<SVGLineElement | null>}
              x1="12" y1="5" x2="12" y2="100%"
              stroke="#999899"
              strokeWidth="1"
              strokeDasharray={mobilePathLength || 1}
              strokeDashoffset={mobilePathLength || 1}
            />
            {/* We can't use % in strokeDasharray reliably, so we'll use a <path> instead */}
          </svg>
          {/* Dots — positioned relative to each card */}
          {CASE1_TIMELINE.map((_, i) => (
            <div
              key={i}
              className="absolute left-[7px] w-[10px] h-[10px] rounded-full bg-white transition-opacity duration-500"
              style={{
                top: `calc(${(i / MOBILE_STEP_COUNT) * 100}% + ${i === 0 ? 5 : 0}px)`,
                opacity: mobileVisibleSteps[i] ? 1 : 0,
              }}
            />
          ))}
        </div>

        {/* Right column — cards */}
        <div className="flex-1 flex flex-col gap-[40px]">
          {CASE1_TIMELINE.map((step, i) => (
            <div
              key={i}
              className="flex flex-col gap-[12px] transition-all duration-700"
              style={{
                opacity: mobileVisibleSteps[i] ? 1 : 0,
                transform: mobileVisibleSteps[i] ? "translateX(0)" : "translateX(30px)",
              }}
            >
              <div className="aspect-[327/174] rounded-[16px] overflow-hidden bg-[#3b3c48]">
                {mobileVisibleSteps[i] && <TimelineMedia step={step} />}
              </div>
              <p className="font-['TN',serif] font-extralight text-[20px] leading-[1.2] text-white">
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Desktop — scroll-linked (unchanged) ── */}
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
            strokeDasharray={desktopPathLength || 1}
            strokeDashoffset={desktopPathLength || 1}
          />
          {DOT_POSITIONS.map((y, i) => (
            <circle
              key={i}
              cx={390}
              cy={y}
              r={7.5}
              fill="white"
              className="transition-opacity duration-500"
              style={{ opacity: desktopVisibleSteps[i] ? 1 : 0 }}
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
                opacity: desktopVisibleSteps[i] ? 1 : 0,
                transform: desktopVisibleSteps[i]
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
                opacity: desktopVisibleSteps[i] ? 1 : 0,
                transform: desktopVisibleSteps[i]
                  ? "translateX(0)"
                  : isLeftCard
                    ? "translateX(-40px)"
                    : "translateX(40px)",
              }}
            >
              {desktopVisibleSteps[i] && <TimelineMedia step={step} />}
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

**IMPORTANT NOTE for implementer:** The mobile SVG line uses `<line>` which doesn't support `getTotalLength()`. We need a `<path>` instead. The mobile SVG should use a `<path>` with a straight vertical line: `d="M 12 5 L 12 HEIGHT"` where HEIGHT is the container's actual pixel height. Since we don't know the height at render time (it's dynamic based on card content), we need to measure it.

**Better approach for the mobile SVG:** Use a `viewBox` with a known height (e.g. 1000) and `preserveAspectRatio="none"` to stretch. The path is `M 12 0 L 12 1000` in a `viewBox="0 0 24 1000"`. The `getTotalLength()` returns 1000, and `strokeDasharray`/`strokeDashoffset` work normally.

So replace the mobile SVG section with:

```tsx
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
              strokeDasharray={mobilePathLength || 1}
              strokeDashoffset={mobilePathLength || 1}
            />
          </svg>
          {/* Dots */}
          {CASE1_TIMELINE.map((_, i) => {
            // Position dots to align with card centers
            // Each card is in a flex column with gap-[40px], evenly distributed
            const pct = MOBILE_STEP_COUNT <= 1 ? 0 : (i / (MOBILE_STEP_COUNT - 1)) * 100;
            return (
              <div
                key={i}
                className="absolute left-[7px] w-[10px] h-[10px] rounded-full bg-white transition-opacity duration-500"
                style={{
                  top: `${pct}%`,
                  opacity: mobileVisibleSteps[i] ? 1 : 0,
                }}
              />
            );
          })}
        </div>
```

**Step 2: Verify**

Mobile viewport: scroll through timeline. Line draws progressively, dots appear, cards slide in from right. Desktop: unchanged.

**Step 3: Commit**

```bash
git add src/pages/CaseStudy1.tsx
git commit -m "feat: mobile timeline with scroll-linked line drawing"
```

---

### Task 4: Decisions mobile — 2-column grid + auto-flip hint

**Files:**
- Modify: `src/pages/CaseStudy1.tsx:402-537` (DecisionFlipCard + DecisionsSection)

**Step 1: Create DecisionFlipCardMobile component**

Add this new component after `DecisionFlipCard` (after line 450):

```tsx
function DecisionFlipCardMobile({
  card,
  index,
  autoFlip = false,
}: {
  card: DecisionCard;
  index: number;
  autoFlip?: boolean;
}) {
  const [flipped, setFlipped] = useState(false);
  const hasAutoFlipped = useRef(false);

  // Auto-flip hint: flip after 300ms, hold 1s, flip back
  useEffect(() => {
    if (!autoFlip || hasAutoFlipped.current) return;
    hasAutoFlipped.current = true;
    const flipIn = setTimeout(() => setFlipped(true), 300);
    const flipOut = setTimeout(() => setFlipped(false), 1300);
    return () => {
      clearTimeout(flipIn);
      clearTimeout(flipOut);
    };
  }, [autoFlip]);

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
        {/* Front — image */}
        <img
          src={card.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover rounded-[16px]"
          style={{ backfaceVisibility: "hidden" }}
          loading="lazy"
        />
        {/* Back — text */}
        <div
          className="absolute inset-0 bg-[#1e242a] rounded-[16px] p-[16px]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {card.paragraphs.map((para, pi) => (
            <p
              key={pi}
              className={`font-sf text-[12px] leading-[1.4] whitespace-pre-line mb-[6px] last:mb-0 ${pi === 0 ? "text-white text-[14px] font-medium" : "text-text-secondary"}`}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Replace the mobile section of DecisionsSection**

Replace the mobile block (lines 527-534):

```tsx
      {/* Mobile — 2-col grid */}
      <div className="md:hidden">
        <h2 className="font-['TN',serif] font-extralight text-[28px] leading-[1.2] tracking-[-0.48px] text-white text-center mb-[16px]">
          3 decisions that changed everything
        </h2>
        {/* Row 1: two cards side by side */}
        <div className="grid grid-cols-2 gap-[12px] mb-[12px]">
          <DecisionFlipCardMobile card={CASE1_DECISIONS[0]} index={0} autoFlip={decisionsVisible} />
          <DecisionFlipCardMobile card={CASE1_DECISIONS[1]} index={1} />
        </div>
        {/* Row 2: third card centered, same width as above */}
        <div className="grid grid-cols-2 gap-[12px]">
          <div className="col-start-1 col-end-3 mx-auto" style={{ width: "calc(50% - 6px)" }}>
            <DecisionFlipCardMobile card={CASE1_DECISIONS[2]} index={2} />
          </div>
        </div>
      </div>
```

Note: `decisionsVisible` needs to be wired to the mobile section. We need to add a mobile ref. Update the DecisionsSection to add a mobile inView ref:

Replace the full DecisionsSection with:

```tsx
function DecisionsSection() {
  const [titleRef, titleVisible] = useInView(0.1);
  const [cardsRef, cardsVisible] = useInView(0.1);
  const [mobileRef, decisionsVisible] = useInView(0.15);

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

      {/* Mobile — 2-col grid with auto-flip hint */}
      <div ref={mobileRef} className="md:hidden">
        <h2 className="font-['TN',serif] font-extralight text-[28px] leading-[1.2] tracking-[-0.48px] text-white text-center mb-[16px]">
          3 decisions that changed everything
        </h2>
        <div className="grid grid-cols-2 gap-[12px] mb-[12px]">
          <DecisionFlipCardMobile card={CASE1_DECISIONS[0]} index={0} autoFlip={decisionsVisible} />
          <DecisionFlipCardMobile card={CASE1_DECISIONS[1]} index={1} />
        </div>
        <div className="grid grid-cols-2 gap-[12px]">
          <div className="col-start-1 col-end-3 mx-auto" style={{ width: "calc(50% - 6px)" }}>
            <DecisionFlipCardMobile card={CASE1_DECISIONS[2]} index={2} />
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Verify**

Mobile: 2-col grid with 2 cards on top, 1 centered below. First card auto-flips when scrolled into view, holds 1s, flips back. Tap any card to flip manually. Desktop: unchanged.

**Step 3: Commit**

```bash
git add src/pages/CaseStudy1.tsx
git commit -m "feat: mobile decisions grid with auto-flip hint"
```

---

### Task 5: Metrics mobile — 2-column grid

**Files:**
- Modify: `src/pages/CaseStudy1.tsx:609-640` (MetricsSection)

**Step 1: Change grid to 2 columns on mobile with smaller text**

Replace MetricsSection:

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
        className={`reveal-stagger-children${gridVisible ? " visible" : ""} grid grid-cols-2 gap-[12px] md:gap-[48px]`}
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
```

Changes from original:
- `grid-cols-1` → `grid-cols-2` (always 2 columns)
- `gap-[24px]` → `gap-[12px]` (tighter on mobile)
- `px-[24px]` → `px-[16px]` (less padding on mobile)
- `text-[36px]` → `text-[28px]` (smaller value text on mobile)
- `text-[16px]` → `text-[14px]` (smaller label text on mobile)

**Step 2: Verify**

Mobile: 2x2 grid of metric cards. Desktop: unchanged (2-col with larger gap).

**Step 3: Commit**

```bash
git add src/pages/CaseStudy1.tsx
git commit -m "feat: mobile metrics 2-column grid"
```

---

### Task 6: Final verification and build

**Step 1: TypeScript check**

Run: `npx tsc --noEmit`
Expected: no errors.

**Step 2: Production build**

Run: `npm run build`
Expected: clean build.

**Step 3: Visual QA on mobile viewport**

Run: `npm run dev`
Check all 5 changes:
1. BackLink 24px lower on mobile ✓
2. Problem slider starts on 2nd image ✓
3. Timeline has line + dots + scroll-linked cards ✓
4. Decisions: 2-col grid, auto-flip hint on first card ✓
5. Metrics: 2x2 grid with smaller text ✓

Also verify desktop is completely unaffected.

**Step 4: Final commit (if needed)**

```bash
git add -A
git commit -m "feat: case study 1 mobile polish — 5 improvements"
```
