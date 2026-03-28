# Cases Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a `/cases` page showing two case studies — Case 1 with autoplay loop video, Case 2 with scroll-driven canvas frame animation (desktop) and static fallback (mobile).

**Architecture:** Data-driven with case type variants (`"video"` | `"cinematic"`). Each case type renders a different component. Follows the same page shell pattern as Products/Experience (Logo + NavBar + ContactLine). Case 2 uses sticky positioning with a 300vh scroll runway and canvas frame extraction from video.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Vite 8, React Router 7

---

### Task 1: Move Assets to Public Directory

**Files:**
- Copy: `case 1 preview.mp4` → `public/videos/case-1-preview.mp4`
- Copy: `case 2 character anim.mp4` → `public/videos/case-2-character-anim.mp4`
- Copy: `case 2 character.png` → `public/images/cases/case-2-character.png`
- Copy: `case 2_1 preview.png` → `public/images/cases/case-2-left.png`
- Copy: `case 2_2 preview.png` → `public/images/cases/case-2-right.png`

**Step 1: Create cases image directory and copy files**

```bash
mkdir -p public/images/cases
cp "case 1 preview.mp4" public/videos/case-1-preview.mp4
cp "case 2 character anim.mp4" public/videos/case-2-character-anim.mp4
cp "case 2 character.png" public/images/cases/case-2-character.png
cp "case 2_1 preview.png" public/images/cases/case-2-left.png
cp "case 2_2 preview.png" public/images/cases/case-2-right.png
```

**Step 2: Verify all files exist**

```bash
ls -la public/videos/case-*.mp4 public/images/cases/case-*
```

Expected: 5 files listed with correct sizes.

---

### Task 2: Create Data File (`casesData.ts`)

**Files:**
- Create: `src/data/casesData.ts`

**Step 1: Create the data file**

```typescript
export interface CaseTitleSegment {
  text: string;
  highlighted: boolean;
}

export interface CaseData {
  id: string;
  type: "video" | "cinematic";
  title: CaseTitleSegment[];
  videoSrc?: string;
  frameSrc?: string;
  posterSrc?: string;
  sideImages?: [string, string];
}

export const CASES_HEADLINE =
  "Where Design Thinking Meets AI Engineering";

export const CASES: CaseData[] = [
  {
    id: "mcp-vibe-coding",
    type: "video",
    title: [
      { text: "Designed & engineered a ", highlighted: false },
      { text: "system + MCP to power vibe-coding", highlighted: true },
      { text: " across 3 platforms", highlighted: false },
    ],
    videoSrc: "/videos/case-1-preview.mp4",
  },
  {
    id: "figma-token-plugin",
    type: "cinematic",
    title: [
      { text: "How I solved ", highlighted: false },
      { text: "figma's", highlighted: true },
      { text: " legacy ", highlighted: false },
      { text: "token problem with a custom plugin", highlighted: true },
    ],
    frameSrc: "/videos/case-2-character-anim.mp4",
    posterSrc: "/images/cases/case-2-character.png",
    sideImages: [
      "/images/cases/case-2-left.png",
      "/images/cases/case-2-right.png",
    ],
  },
];
```

**Step 2: Verify no TypeScript errors**

Run: `npx tsc --noEmit --pretty`
Expected: No errors related to casesData.ts

---

### Task 3: Create CaseTitle Component

**Files:**
- Create: `src/components/Cases/CaseTitle.tsx`

**Step 1: Create the shared title component**

This component renders the mixed-color title (white for highlighted, secondary gray for rest) + the non-functional "View Case Study" text.

```tsx
import type { CaseTitleSegment } from "@/data/casesData";

interface CaseTitleProps {
  segments: CaseTitleSegment[];
  className?: string;
}

export function CaseTitle({ segments, className = "" }: CaseTitleProps) {
  return (
    <div className={`flex flex-col gap-[16px] items-center text-center ${className}`}>
      <p className="font-['TN',serif] font-extralight text-[24px] md:text-[28px] leading-[1.2] max-w-[584px]">
        {segments.map((seg, i) => (
          <span
            key={i}
            className={seg.highlighted ? "text-white" : "text-text-secondary"}
          >
            {seg.text}
          </span>
        ))}
      </p>
      <p className="font-sf text-[18px] leading-[1.3] text-accent">
        View Case Study
      </p>
    </div>
  );
}
```

---

### Task 4: Create useScrollProgress Hook

**Files:**
- Create: `src/hooks/useScrollProgress.ts`

**Step 1: Create the scroll progress hook**

Returns a 0→1 value based on how far the user has scrolled through a container's "extra" height (the height beyond one viewport).

```typescript
import { useEffect, useState, useRef } from "react";

export function useScrollProgress(containerRef: React.RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);
  const rafId = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) {
        setProgress(0);
        return;
      }
      // rect.top starts positive (below viewport top), goes negative as we scroll
      const scrolled = -rect.top;
      const clamped = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      setProgress(clamped);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [containerRef]);

  return progress;
}
```

---

### Task 5: Create useVideoFrames Hook

**Files:**
- Create: `src/hooks/useVideoFrames.ts`

**Step 1: Create the video frame extraction hook**

Loads a video, seeks through it frame by frame, draws each to an offscreen canvas, and returns an array of ImageBitmap objects.

```typescript
import { useEffect, useState } from "react";

export function useVideoFrames(
  videoSrc: string,
  targetFrameCount = 40,
): { frames: ImageBitmap[]; loading: boolean } {
  const [frames, setFrames] = useState<ImageBitmap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function extract() {
      const video = document.createElement("video");
      video.crossOrigin = "anonymous";
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      video.src = videoSrc;

      await new Promise<void>((resolve, reject) => {
        video.onloadedmetadata = () => resolve();
        video.onerror = () => reject(new Error("Video load failed"));
      });

      const { duration, videoWidth, videoHeight } = video;
      const step = duration / targetFrameCount;
      const canvas = new OffscreenCanvas(videoWidth, videoHeight);
      const ctx = canvas.getContext("2d")!;
      const extracted: ImageBitmap[] = [];

      for (let i = 0; i < targetFrameCount; i++) {
        if (cancelled) return;

        const time = i * step;
        video.currentTime = time;

        await new Promise<void>((resolve) => {
          video.onseeked = () => resolve();
        });

        ctx.drawImage(video, 0, 0);
        const bitmap = await createImageBitmap(canvas);
        extracted.push(bitmap);
      }

      if (!cancelled) {
        setFrames(extracted);
        setLoading(false);
      }
    }

    extract().catch(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [videoSrc, targetFrameCount]);

  return { frames, loading };
}
```

---

### Task 6: Create CaseVideoPreview Component

**Files:**
- Create: `src/components/Cases/CaseVideoPreview.tsx`

**Step 1: Create the autoplay loop video component**

Used for Case 1. Renders a muted autoplay looping video with the case title below.

```tsx
import type { CaseData } from "@/data/casesData";
import { CaseTitle } from "./CaseTitle";

interface CaseVideoPreviewProps {
  caseData: CaseData;
  index: number;
}

export function CaseVideoPreview({ caseData, index }: CaseVideoPreviewProps) {
  return (
    <section
      className="experience-fade-up w-full max-w-[1120px] mx-auto"
      style={{ animationDelay: `${(index + 1) * 80}ms` }}
      aria-label={caseData.id}
    >
      <div className="w-full rounded-[14px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto"
          src={caseData.videoSrc}
        />
      </div>
      <CaseTitle segments={caseData.title} className="mt-[32px]" />
    </section>
  );
}
```

---

### Task 7: Create CaseCinematicScroll Component (Desktop)

**Files:**
- Create: `src/components/Cases/CaseCinematicScroll.tsx`

**Step 1: Create the scroll-driven canvas animation component**

This is the complex component. Uses a sticky container with a 300vh scroll runway. Canvas draws frames based on scroll progress. Flanking images and title reveal at the end.

```tsx
import { useRef, useEffect } from "react";
import type { CaseData } from "@/data/casesData";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useVideoFrames } from "@/hooks/useVideoFrames";
import { CaseTitle } from "./CaseTitle";

interface CaseCinematicScrollProps {
  caseData: CaseData;
}

export function CaseCinematicScroll({ caseData }: CaseCinematicScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = useScrollProgress(containerRef);
  const { frames, loading } = useVideoFrames(caseData.frameSrc!, 40);

  // Draw current frame to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || frames.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Map progress 0-0.8 to frame index (last 20% is for reveal)
    const frameProgress = Math.min(progress / 0.8, 1);
    const frameIndex = Math.min(
      Math.floor(frameProgress * (frames.length - 1)),
      frames.length - 1,
    );

    const frame = frames[frameIndex];
    canvas.width = frame.width;
    canvas.height = frame.height;
    ctx.drawImage(frame, 0, 0);
  }, [progress, frames]);

  // Side images appear at 70-90% progress
  const sideImageOpacity = Math.max(0, Math.min(1, (progress - 0.7) / 0.2));
  const sideImageTranslate = (1 - sideImageOpacity) * 40;

  // Title appears at 80-100% progress
  const titleOpacity = Math.max(0, Math.min(1, (progress - 0.8) / 0.2));
  const titleTranslate = (1 - titleOpacity) * 20;

  return (
    <div ref={containerRef} style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen h-dvh flex items-center justify-center overflow-hidden">
        {/* Canvas / Poster */}
        <div className="relative flex items-center justify-center w-full max-w-[1280px] px-5 md:px-10">
          {/* Left image */}
          {caseData.sideImages && (
            <div
              className="hidden md:block absolute left-10 top-1/2 -translate-y-1/2 w-[302px] rounded-[14px] overflow-hidden"
              style={{
                opacity: sideImageOpacity,
                transform: `translateX(${-sideImageTranslate}px) translateY(-50%)`,
                transition: "none",
              }}
            >
              <img
                src={caseData.sideImages[0]}
                alt=""
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          )}

          {/* Character canvas */}
          <div className="relative w-[500px] h-[500px] flex-shrink-0">
            {loading ? (
              <img
                src={caseData.posterSrc}
                alt=""
                className="w-full h-full object-contain"
              />
            ) : (
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain"
              />
            )}
          </div>

          {/* Right image */}
          {caseData.sideImages && (
            <div
              className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 w-[302px] rounded-[14px] overflow-hidden"
              style={{
                opacity: sideImageOpacity,
                transform: `translateX(${sideImageTranslate}px) translateY(-50%)`,
                transition: "none",
              }}
            >
              <img
                src={caseData.sideImages[1]}
                alt=""
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* Title below character */}
        <div
          className="absolute bottom-[120px] left-0 right-0 flex justify-center"
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleTranslate}px)`,
            transition: "none",
          }}
        >
          <CaseTitle segments={caseData.title} />
        </div>
      </div>
    </div>
  );
}
```

---

### Task 8: Create CaseCinematicMobile Component

**Files:**
- Create: `src/components/Cases/CaseCinematicMobile.tsx`

**Step 1: Create the mobile fallback for cinematic cases**

No canvas, no sticky, no scroll animation. Just static images with fade-in.

```tsx
import type { CaseData } from "@/data/casesData";
import { CaseTitle } from "./CaseTitle";

interface CaseCinematicMobileProps {
  caseData: CaseData;
  index: number;
}

export function CaseCinematicMobile({ caseData, index }: CaseCinematicMobileProps) {
  return (
    <section
      className="experience-fade-up w-full flex flex-col items-center"
      style={{ animationDelay: `${(index + 1) * 80}ms` }}
      aria-label={caseData.id}
    >
      {/* Character image */}
      <div className="w-[280px] h-[280px] mb-[24px]">
        <img
          src={caseData.posterSrc}
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Side images */}
      {caseData.sideImages && (
        <div className="flex gap-[16px] mb-[32px] px-5">
          <div className="flex-1 rounded-[14px] overflow-hidden">
            <img src={caseData.sideImages[0]} alt="" className="w-full h-auto" loading="lazy" />
          </div>
          <div className="flex-1 rounded-[14px] overflow-hidden">
            <img src={caseData.sideImages[1]} alt="" className="w-full h-auto" loading="lazy" />
          </div>
        </div>
      )}

      {/* Title */}
      <CaseTitle segments={caseData.title} />
    </section>
  );
}
```

---

### Task 9: Create CaseSection Switch + Barrel Export

**Files:**
- Create: `src/components/Cases/CaseSection.tsx`
- Create: `src/components/Cases/index.ts`

**Step 1: Create the CaseSection component**

Switches on case type and renders the appropriate component. Uses `useMediaQuery` to detect mobile for cinematic cases.

```tsx
import type { CaseData } from "@/data/casesData";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CaseVideoPreview } from "./CaseVideoPreview";
import { CaseCinematicScroll } from "./CaseCinematicScroll";
import { CaseCinematicMobile } from "./CaseCinematicMobile";

interface CaseSectionProps {
  caseData: CaseData;
  index: number;
}

export function CaseSection({ caseData, index }: CaseSectionProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  switch (caseData.type) {
    case "video":
      return <CaseVideoPreview caseData={caseData} index={index} />;
    case "cinematic":
      return isMobile ? (
        <CaseCinematicMobile caseData={caseData} index={index} />
      ) : (
        <CaseCinematicScroll caseData={caseData} />
      );
  }
}
```

**Step 2: Create barrel export**

```typescript
export { CaseSection } from "./CaseSection";
export { CaseTitle } from "./CaseTitle";
export { CaseVideoPreview } from "./CaseVideoPreview";
export { CaseCinematicScroll } from "./CaseCinematicScroll";
export { CaseCinematicMobile } from "./CaseCinematicMobile";
```

---

### Task 10: Create Cases Page

**Files:**
- Create: `src/pages/Cases.tsx`

**Step 1: Create the page component**

Follows the same shell pattern as Products.tsx and Experience.tsx.

```tsx
import { useEffect } from "react";
import { Logo } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { ContactLine } from "@/components/Layout/ContactLine";
import { CaseSection } from "@/components/Cases";
import { CASES_HEADLINE, CASES } from "@/data/casesData";

export function Cases() {
  useEffect(() => {
    document.title = "Cases — Shkuratov Designer";
  }, []);

  return (
    <div className="relative min-h-screen min-h-dvh w-full bg-black">
      <Logo visible />

      <main className="relative z-10 flex flex-col items-center px-5 md:px-10 pt-[104px] md:pt-[104px] pb-[140px] md:pb-[272px]">
        {/* Headline */}
        <h1 className="experience-fade-up text-[28px] md:text-[48px] leading-[1.2] text-white text-center tracking-[-0.48px] max-w-[585px] mb-[48px] md:mb-[64px] font-['TN',serif] font-extralight">
          {CASES_HEADLINE}
        </h1>

        {/* Case studies */}
        <div className="w-full flex flex-col gap-[80px] md:gap-[120px]">
          {CASES.map((caseData, i) => (
            <CaseSection key={caseData.id} caseData={caseData} index={i} />
          ))}
        </div>
      </main>

      <NavBar visible />
      <ContactLine visible />
    </div>
  );
}
```

---

### Task 11: Update Routing and NavBar

**Files:**
- Modify: `src/App.tsx:6-7` (add lazy import)
- Modify: `src/App.tsx:14` (add route)
- Modify: `src/components/NavBar/NavBar.tsx:9` (update Cases path)
- Modify: `src/components/NavBar/NavBar.tsx:18` (update Cases path)

**Step 1: Add lazy import to App.tsx**

After line 6 (`const Products = ...`), add:
```typescript
const Cases = lazy(() => import("@/pages/Cases").then(m => ({ default: m.Cases })));
```

**Step 2: Add route to App.tsx**

After the `/products` route (line 14), add:
```tsx
<Route path="/cases" element={<Cases />} />
```

**Step 3: Update NavBar Cases path**

In `src/components/NavBar/NavBar.tsx`, change both occurrences of the Cases nav item path:

Line 9: Change `{ label: "Cases", pose: "cases", path: "/" }` to `{ label: "Cases", pose: "cases", path: "/cases" }`

Line 18: Change `{ label: "Cases", pose: "cases", path: "/" }` to `{ label: "Cases", pose: "cases", path: "/cases" }`

**Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

---

### Task 12: Visual Verification

**Step 1: Start dev server**

Run: `npm run dev`

**Step 2: Desktop verification**

Navigate to `http://localhost:5173/cases` and verify:
- Headline "Where Design Thinking Meets AI Engineering" is visible and centered
- Case 1 video autoplays in a loop (muted, no controls)
- Case 1 title shows with correct white/gray highlighting
- Scrolling into Case 2 section: page pins, canvas animation plays frame by frame
- At ~70% scroll: flanking images slide in from sides
- At ~80% scroll: title fades up
- After 100%: section unpins and page continues
- NavBar is visible at bottom with "Cases" active
- ContactLine visible
- Logo visible top-left

**Step 3: Mobile verification**

Resize to mobile width (<767px) and verify:
- Case 1 video still autoplays
- Case 2 shows static character image (no canvas, no sticky)
- Flanking images shown side by side below character
- Title below images
- Mobile nav bar works, Cases tab active

---

## Parallelization Map

```
Phase 1 (parallel — no dependencies):
  Agent A: Task 1 (move assets)
  Agent B: Task 2 + Task 3 (casesData.ts + CaseTitle.tsx)
  Agent C: Task 4 + Task 5 (useScrollProgress + useVideoFrames)

Phase 2 (parallel — depends on Phase 1):
  Agent D: Task 6 (CaseVideoPreview)
  Agent E: Task 7 + Task 8 (CaseCinematicScroll + CaseCinematicMobile)

Phase 3 (sequential — depends on Phase 2):
  Agent F: Task 9 + Task 10 + Task 11 (CaseSection, Cases page, routing)

Phase 4 (manual):
  Task 12: Visual verification
```
