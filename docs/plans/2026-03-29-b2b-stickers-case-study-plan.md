# Case Study 3 — B2B Messenger Stickers: Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the `/cases/stickers` page — a case study showcasing animated sticker design work for a B2B messenger, with 15 viewport-gated Lottie animations, phone mockups, feature cards, and styled summary text.

**Architecture:** Single-page component (`CaseStudy3.tsx`) with colocated data file (`caseStudy3Data.ts`). Follows the exact same patterns as `CaseStudy2.tsx` — `useInView` for reveal animations, `DotLottieCanvas` for Lottie rendering, responsive breakpoints at 767px. Adds viewport-gated play/pause to `DotLottieCanvas` for performance with 15 simultaneous animations.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, React Router 7, @lottiefiles/dotlottie-web

---

### Task 1: Move sticker assets to public directory

**Files:**
- Move: `devil/*.lottie` → `public/lottie/stickers/devil/`
- Move: `cat/*.lottie` → `public/lottie/stickers/cat/`
- Move: `turkey/*.lottie` → `public/lottie/stickers/turkey/`

**Step 1: Create directories and move files**

```bash
mkdir -p public/lottie/stickers/devil public/lottie/stickers/cat public/lottie/stickers/turkey

cp devil/*.lottie public/lottie/stickers/devil/
cp cat/*.lottie public/lottie/stickers/cat/
cp turkey/*.lottie public/lottie/stickers/turkey/
```

**Step 2: Verify files are in place**

```bash
ls public/lottie/stickers/devil/  # 5 files
ls public/lottie/stickers/cat/    # 5 files
ls public/lottie/stickers/turkey/ # 5 files
```

**Step 3: Commit**

```bash
git add public/lottie/stickers/
git commit -m "chore: add sticker lottie assets for case study 3"
```

---

### Task 2: Export phone mockup images from Figma

**Files:**
- Create: `public/images/cases/case-3/phone-left.png`
- Create: `public/images/cases/case-3/phone-right.png`

**Step 1: Create directory**

```bash
mkdir -p public/images/cases/case-3
```

**Step 2: Download phone mockup images from Figma**

Use the Figma MCP `get_screenshot` tool to export the two phone screen nodes from the Figma design (fileKey: `dSI1pm4HMGi3gvtucXsuq4`). The phone nodes are:
- Left phone (node `4148:7865` — "2-SCREEN" left)
- Right phone (node `4148:7867` — "2-SCREEN" right)

Download the asset URLs from the Figma code output:
- `imgImage6` → `phone-left.png` (left phone screenshot content)
- `imgImage7` → `phone-right.png` (right phone screenshot content)

Save to `public/images/cases/case-3/`.

**Step 3: Verify and commit**

```bash
ls public/images/cases/case-3/  # phone-left.png, phone-right.png
git add public/images/cases/case-3/
git commit -m "chore: add phone mockup images for case study 3"
```

---

### Task 3: Add viewport-gated play/pause to DotLottieCanvas

**Files:**
- Modify: `src/components/Cases/DotLottieCanvas.tsx`

The existing component always autoplays. We need to add an optional `playWhenVisible` prop that uses `IntersectionObserver` to start/pause the animation based on viewport visibility.

**Step 1: Add playWhenVisible prop**

```tsx
import { useRef, useEffect } from "react";
import { DotLottie } from "@lottiefiles/dotlottie-web";

interface DotLottieCanvasProps {
  src: string;
  autoplay?: boolean;
  loop?: boolean;
  playWhenVisible?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function DotLottieCanvas({
  src,
  autoplay = true,
  loop = true,
  playWhenVisible = false,
  className,
  style,
}: DotLottieCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<DotLottie | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const shouldAutoplay = playWhenVisible ? false : autoplay;

    instanceRef.current = new DotLottie({
      canvas,
      src,
      autoplay: shouldAutoplay,
      loop,
    });

    if (!playWhenVisible) return () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          instanceRef.current?.play();
        } else {
          instanceRef.current?.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, [src, autoplay, loop, playWhenVisible]);

  return (
    <div className={className} style={{ lineHeight: 0, ...style }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
```

**Step 2: Verify existing Lottie usage still works**

Run: `npm run build`
Expected: No type errors, no build failures.

Check the Cases listing page (`/cases`) — the existing 4 Lottie stickers on the third case preview should still animate (they use `autoplay` without `playWhenVisible`).

**Step 3: Commit**

```bash
git add src/components/Cases/DotLottieCanvas.tsx
git commit -m "feat: add viewport-gated play/pause to DotLottieCanvas"
```

---

### Task 4: Create case study 3 data file

**Files:**
- Create: `src/data/caseStudy3Data.ts`

**Step 1: Create the data file**

```tsx
export const CASE3_TITLE =
  "I helped 100,000+ teams communicate 50% more efficiently by designing conversational experiences that feel human, not robotic.";

export const CASE3_SUBTITLE =
  "Working under NDA, I've adapted this case study to showcase my process and thinking while respecting confidentiality";

export const CASE3_PHONES = {
  left: "/images/cases/case-3/phone-left.png",
  right: "/images/cases/case-3/phone-right.png",
};

export const CASE3_STICKER_LABEL = "Animated stickers, emojis, and GIFs";

export const CASE3_STICKER_QUOTE =
  'Through 15 interviews with team leads, I discovered 89% of messages were text-only. Users described conversations as "dry" and "impersonal." Teams using more expression reported 30% higher satisfaction';

export interface StyledSegment {
  text: string;
  white?: boolean;
}

export const CASE3_STICKER_DESCRIPTION: StyledSegment[] = [
  { text: "Animation isn't decoration." },
  { text: " In the AI era, people increasingly value", white: true },
  { text: " animated stickers, emojis, and GIFs that add " },
  { text: "personality and emotion to their chat experience", white: true },
];

export interface StickerRow {
  name: string;
  stickers: string[];
}

export const CASE3_STICKER_ROWS: StickerRow[] = [
  {
    name: "devil",
    stickers: [
      "/lottie/stickers/devil/Angry Character.lottie",
      "/lottie/stickers/devil/Devil Contract.lottie",
      "/lottie/stickers/devil/Devil Crying.lottie",
      "/lottie/stickers/devil/Devil Dance.lottie",
      "/lottie/stickers/devil/Devil Girl.lottie",
    ],
  },
  {
    name: "cat",
    stickers: [
      "/lottie/stickers/cat/Banana cat.lottie",
      "/lottie/stickers/cat/Burger cat.lottie",
      "/lottie/stickers/cat/Cappuccino cat.lottie",
      "/lottie/stickers/cat/Jelly cat.lottie",
      "/lottie/stickers/cat/Noodles cat.lottie",
    ],
  },
  {
    name: "turkey",
    stickers: [
      "/lottie/stickers/turkey/Angry.lottie",
      "/lottie/stickers/turkey/Dead Turkey.lottie",
      "/lottie/stickers/turkey/Thanksgiving Cart.lottie",
      "/lottie/stickers/turkey/Thanksgiving Invitation.lottie",
      "/lottie/stickers/turkey/Turkey Crown.lottie",
    ],
  },
];

export const CASE3_FEATURES = [
  "Global and chat search",
  "Scheduled messages",
  "Context menu",
  "Reactions",
  "Voice messages",
  "Voice and video transcription",
];

export const CASE3_SUMMARY_1: StyledSegment[] = [
  { text: "These features represent " },
  { text: "a small selection of my comprehensive, continuous design work that increased user engagement ", white: true },
  { text: "and became a key competitive advantage in enterprise sales" },
];

export const CASE3_SUMMARY_2: StyledSegment[] = [
  { text: "Beyond feature design, I established " },
  { text: "usability testing practices, built design systems, and collaborated with cross-functional teams ", white: true },
  { text: "to ship faster and with higher quality" },
];
```

**Step 2: Verify build**

Run: `npm run build`
Expected: No errors.

**Step 3: Commit**

```bash
git add src/data/caseStudy3Data.ts
git commit -m "feat: add case study 3 data file"
```

---

### Task 5: Build the CaseStudy3 page component

**Files:**
- Create: `src/pages/CaseStudy3.tsx`

**Reference:** Follow `src/pages/CaseStudy2.tsx` structure exactly — same imports, same `useInView` pattern, same reveal classes, same responsive breakpoints, same NavBar/Logo/ContactLine placement.

**Step 1: Create the page component**

```tsx
import { useEffect } from "react";
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
          className={`reveal-blur${phonesVisible ? " visible" : ""} flex gap-[0px] items-start mb-[128px] md:mb-[200px]`}
        >
          {[CASE3_PHONES.left, CASE3_PHONES.right].map((src, i) => (
            <div
              key={i}
              className="w-[150px] md:w-[300px] rounded-[18px] md:rounded-[37px] overflow-hidden border-[4px] md:border-[8px] border-white/10 bg-white"
            >
              <img
                src={src}
                alt={`Phone mockup ${i + 1}`}
                className="w-full h-auto object-cover"
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
          className={`reveal-stagger-children${featuresVisible ? " visible" : ""} w-full max-w-[1256px] flex flex-wrap gap-[16px] md:gap-[32px_24px] mb-[128px] md:mb-[200px]`}
        >
          {CASE3_FEATURES.map((feature) => (
            <div
              key={feature}
              className="bg-white rounded-[14px] md:rounded-[20px] px-[20px] md:px-[32px] py-[16px] md:py-[24px] w-full md:w-[calc(50%-12px)]"
            >
              <p className="font-['TN',serif] font-extralight text-[28px] md:text-[40px] leading-[1.2] text-[#222] tracking-[-0.4px]">
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
```

**Step 2: Verify build**

Run: `npm run build`
Expected: No errors (page isn't routed yet, but should compile).

**Step 3: Commit**

```bash
git add src/pages/CaseStudy3.tsx
git commit -m "feat: add CaseStudy3 page component"
```

---

### Task 6: Add route and listing page link

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/data/casesData.ts`

**Step 1: Add lazy import and route in App.tsx**

After the CaseStudy2 lazy import, add:
```tsx
const CaseStudy3 = lazy(() => import("@/pages/CaseStudy3").then(m => ({ default: m.CaseStudy3 })));
```

After the CaseStudy2 route, add:
```tsx
<Route path="/cases/stickers" element={<CaseStudy3 />} />
```

**Step 2: Add link to listing page data in casesData.ts**

Add `link: "/cases/stickers"` to the third case object (id: `"b2b-stickers"`):

```ts
{
    id: "b2b-stickers",
    type: "lottie",
    link: "/cases/stickers",   // ← add this line
    title: [
      ...
```

**Step 3: Verify everything works**

Run: `npm run dev`

- Visit `/cases` — third case preview should show "View Case Study" link with hover underline
- Click it — should navigate to `/cases/stickers`
- The full case study page should render with all sections
- Stickers should animate when scrolled into view
- Click "Back to cases" — should return to `/cases`

Run: `npm run build`
Expected: Clean build, no errors.

**Step 4: Commit**

```bash
git add src/App.tsx src/data/casesData.ts
git commit -m "feat: add route and listing link for case study 3"
```

---

### Task 7: Visual QA and polish

**Files:**
- May modify: `src/pages/CaseStudy3.tsx` (tweaks only)

**Step 1: Desktop QA (768px+)**

Open `/cases/stickers` at full desktop width. Verify against Figma screenshot:
- Back link centered at top
- Hero title centered, proper font size
- Phone mockups side by side with rounded borders
- Sticker label in accent color
- 3 rows × 5 stickers, 226px each, 32px gaps
- Stickers animate when scrolled into view, pause when scrolled out
- Feature cards 2-column layout, white with dark text
- Summary paragraphs with correct white/gray highlighting
- NavBar, ContactLine, Logo all visible

**Step 2: Mobile QA (< 768px)**

Open at 375px width. Verify:
- Title scales to text-[28px]
- Phone mockups shrink proportionally
- Sticker rows are horizontal free-scroll strips
- Feature cards go full-width single column
- Summary text scales down
- NavBar mobile version works

**Step 3: Performance QA**

- Scroll through the page — should be smooth, no jank
- Open DevTools Performance tab, record a scroll through sticker section
- Verify: frame rate stays above 30fps
- Verify: Lottie animations pause when scrolled off-screen (check via console or DevTools)

**Step 4: Commit any fixes**

```bash
git add -u
git commit -m "fix: visual polish for case study 3"
```
