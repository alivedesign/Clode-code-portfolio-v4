# Case Study 1 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the first case study page ("From Figma Chaos to AI-Powered Design Infrastructure") with all 7 sections, scroll animations, YouTube embed, hover-to-card interaction, and mobile responsiveness.

**Architecture:** Single page component `CaseStudy1.tsx` with inline sections, following the existing Experience.tsx / About.tsx pattern. Data in a separate file. Assets exported from Figma and moved from project root. Route added via React.lazy in App.tsx.

**Tech Stack:** React 19 + TypeScript + Tailwind CSS 4 + React Router 7, useInView hook for scroll reveals, YouTube facade pattern from Experience page.

---

## Task 1: Asset Pipeline — Export Figma images and move video files

**Files:**
- Create: `public/images/cases/case-1/` directory with exported images
- Move: `gif 2 for case.mp4` → `public/videos/case-1-approval.mp4`
- Move: `Gif 3 for case 1.mp4` → `public/videos/case-1-implementation.mp4`
- Checkout: `public/videos/bloggingmachine-case/research.mp4`, `research.webm`, `research-poster.webp` from main branch

**Step 1: Create case-1 image directory**

```bash
mkdir -p public/images/cases/case-1
```

**Step 2: Export images from Figma**

Use the Figma MCP `get_design_context` tool to get asset URLs for these nodes from file `dSI1pm4HMGi3gvtucXsuq4`:
- Hero image (node `4102:2140`) → save as `public/images/cases/case-1/hero.webp`
- Problem image 1 (node `4103:2151`) → `public/images/cases/case-1/problem-1.webp`
- Problem image 2 (node `4103:2152`) → `public/images/cases/case-1/problem-2.webp`
- Problem image 3 (node `4103:2153`) → `public/images/cases/case-1/problem-3.webp`
- Timeline 1 — Initial observation (node `4109:5`) → `public/images/cases/case-1/timeline-1.webp`
- Timeline 3 — Internal pitch (node `4109:11`) → `public/images/cases/case-1/timeline-3.webp`
- Timeline 6 — Full team adoption (node `4109:14`) → `public/images/cases/case-1/timeline-6.webp`
- Decision image 1 (node `4112:32`) → `public/images/cases/case-1/decision-1.webp`
- Decision image 2 (node `4112:33`) → `public/images/cases/case-1/decision-2.webp`
- Decision image 3 (node `4112:35`) → `public/images/cases/case-1/decision-3.webp`

Download each URL with curl and convert/save as WebP. If Figma returns PNG/JPG, use `cwebp` or save as-is with appropriate extension.

**Step 3: Move video files from project root**

```bash
mv "gif 2 for case.mp4" public/videos/case-1-approval.mp4
mv "Gif 3 for case 1.mp4" public/videos/case-1-implementation.mp4
```

**Step 4: Checkout bloggingmachine research video from main**

```bash
git checkout main -- public/videos/bloggingmachine-case/research.mp4 public/videos/bloggingmachine-case/research.webm public/videos/bloggingmachine-case/research-poster.webp
```

**Step 5: Verify all assets exist**

```bash
ls -la public/images/cases/case-1/
ls -la public/videos/case-1-*.mp4
ls -la public/videos/bloggingmachine-case/research.*
```

Expected: All files present with reasonable sizes.

**Step 6: Commit**

```bash
git add public/images/cases/case-1/ public/videos/case-1-approval.mp4 public/videos/case-1-implementation.mp4 public/videos/bloggingmachine-case/
git commit -m "asset: add case study 1 images and videos"
```

---

## Task 2: Data file — Create caseStudy1Data.ts

**Files:**
- Create: `src/data/caseStudy1Data.ts`

**Step 1: Create the data file**

```typescript
// src/data/caseStudy1Data.ts

export const CASE1_TITLE = "From figma chaos to AI-powered design infrastructure";

export const CASE1_SUBTITLE_SEGMENTS = [
  { text: "How I architected a cross-platform design system with MCP servers that ", highlighted: false },
  { text: "cut feature development time by ≈35%", highlighted: true },
  { text: " across iOS, Android, and Web", highlighted: false },
];

export const CASE1_HERO_IMAGE = "/images/cases/case-1/hero.webp";

export const CASE1_PROBLEM = {
  label: "The Problem",
  heading: "7+ Designers, 3 Platforms, 0 Consistency",
  images: [
    "/images/cases/case-1/problem-1.webp",
    "/images/cases/case-1/problem-2.webp",
    "/images/cases/case-1/problem-3.webp",
  ],
  points: [
    {
      bold: "Static mockups, guessing devs.",
      body: " Components drifted every sprint. Animations described in words.",
    },
    {
      bold: "50% meetings, 0% clarity.",
      body: " Every feature turned into \"is this what you meant?\" Figma couldn't communicate behavior, so humans filled the gap.",
    },
    {
      bold: "Figma doesn't scale fast enough.",
      body: " 5 brands. 3 platforms. 2 modes. Dozens of states. No amount of file organization survives that.",
    },
  ],
};

export interface TimelineStep {
  label: string;
  side: "left" | "right";
  media: { type: "image"; src: string } | { type: "video"; src: string; webm?: string; poster?: string };
}

export const CASE1_TIMELINE: TimelineStep[] = [
  {
    label: "Initial observation / problem identification",
    side: "left",
    media: { type: "image", src: "/images/cases/case-1/timeline-1.webp" },
  },
  {
    label: "Solution design / architecture planning",
    side: "right",
    media: {
      type: "video",
      src: "/videos/bloggingmachine-case/research.mp4",
      webm: "/videos/bloggingmachine-case/research.webm",
      poster: "/videos/bloggingmachine-case/research-poster.webp",
    },
  },
  {
    label: "Internal pitch to leadership",
    side: "left",
    media: { type: "image", src: "/images/cases/case-1/timeline-3.webp" },
  },
  {
    label: "Approval + budget secured",
    side: "right",
    media: { type: "video", src: "/videos/case-1-approval.mp4" },
  },
  {
    label: "First implementation",
    side: "left",
    media: { type: "video", src: "/videos/case-1-implementation.mp4" },
  },
  {
    label: "Full team adoption",
    side: "right",
    media: { type: "image", src: "/images/cases/case-1/timeline-6.webp" },
  },
];

export interface DecisionCard {
  image: string;
  paragraphs: string[];
}

export const CASE1_DECISIONS: DecisionCard[] = [
  {
    image: "/images/cases/case-1/decision-1.webp",
    paragraphs: [
      "One repository. Three platforms. Automatic sync every 6 hours.",
      "Figma feeds the hub. The hub builds for:\n- IOS (Swift Package)\n- Android (GitHub Releases)\n- Web (npm)",
      "400 icons and 157 color tokens across 5 brands never drift again.",
    ],
  },
  {
    image: "/images/cases/case-1/decision-2.webp",
    paragraphs: [
      "Figma prototypes approximate. Code prototypes specify.",
      "We build interactive prototypes on the real tech stack now. Exact animations. Exact parameters. Exact behavior.",
      "Developers copy. They don't guess.",
    ],
  },
  {
    image: "/images/cases/case-1/decision-3.webp",
    paragraphs: [
      "4 MCP servers. 15 tools. The entire design system queryable by AI in real-time.",
      "Claude Code searches existing components before building new ones. Uses only library icons. References only design tokens. Follows component specs automatically.",
      "AI that builds with the system, not around it.",
    ],
  },
];

export const CASE1_YOUTUBE_VIDEO_ID = "UYrKmNq_fS4";
export const CASE1_YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${CASE1_YOUTUBE_VIDEO_ID}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`;

export const CASE1_VIDEO_TABS = [
  "Automated legacy figma sync",
  "Cross-Platform component galleries",
  "MCP server architecture",
];

export const CASE1_QUOTE =
  "The system is still compounding. As the team gets more native with the infrastructure, every metric continues to improve.";

export interface MetricCard {
  value: string;
  label: string;
}

export const CASE1_METRICS: MetricCard[] = [
  { value: "≈35% faster", label: "Feature development speed" },
  { value: "≈50% less time", label: "Handoff meetings with QA/BA" },
  { value: "≈85%", label: "Features shipped through pipeline" },
  { value: "≈25% more", label: "Overall feature output" },
];
```

**Step 2: Commit**

```bash
git add src/data/caseStudy1Data.ts
git commit -m "feat: add case study 1 data file"
```

---

## Task 3: Routing — Add route and link "View Case Study"

**Files:**
- Modify: `src/App.tsx:13` (add lazy import) and `src/App.tsx:24` (add route)
- Modify: `src/components/Cases/CaseTitle.tsx:1,21-23` (add Link, wrap text)
- Modify: `src/data/casesData.ts:18` (add `link?: string` to CaseData interface)

**Step 1: Add `link` field to CaseData interface**

In `src/data/casesData.ts`, add `link?: string` to the `CaseData` interface after `lottieAssets`, and add `link: "/cases/mcp-vibe-coding"` to the first case entry.

```typescript
// In CaseData interface, add:
  link?: string;

// In first case entry, add:
  link: "/cases/mcp-vibe-coding",
```

**Step 2: Update CaseTitle to accept and use link prop**

In `src/components/Cases/CaseTitle.tsx`:

```typescript
import { Link } from "react-router";
import type { CaseTitleSegment } from "@/data/casesData";

interface CaseTitleProps {
  segments: CaseTitleSegment[];
  className?: string;
  link?: string;
}

export function CaseTitle({ segments, className = "", link }: CaseTitleProps) {
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
      {link ? (
        <Link to={link} className="font-sf text-[18px] leading-[1.3] text-accent hover:underline">
          View Case Study
        </Link>
      ) : (
        <p className="font-sf text-[18px] leading-[1.3] text-accent">
          View Case Study
        </p>
      )}
    </div>
  );
}
```

**Step 3: Pass link prop from case components that use CaseTitle**

Update each component that renders `<CaseTitle>` to pass the `link` prop from `caseData.link`. The components are:
- `src/components/Cases/CaseVideoPreview.tsx` — add `link={caseData.link}` to `<CaseTitle>`
- `src/components/Cases/CaseCinematicScroll.tsx` — add `link={caseData.link}` to `<CaseTitle>`
- `src/components/Cases/CaseCinematicMobile.tsx` — add `link={caseData.link}` to `<CaseTitle>`
- `src/components/Cases/CaseLottieScatter.tsx` — add `link={caseData.link}` to `<CaseTitle>`
- `src/components/Cases/CaseLottieMobile.tsx` — add `link={caseData.link}` to `<CaseTitle>`

**Step 4: Add lazy import and route in App.tsx**

After line 12 (About import), add:
```typescript
const CaseStudy1 = lazy(() => import("@/pages/CaseStudy1").then(m => ({ default: m.CaseStudy1 })));
```

After line 24 (about route), add:
```typescript
<Route path="/cases/mcp-vibe-coding" element={<CaseStudy1 />} />
```

**Step 5: Verify build**

```bash
npm run build
```

Expected: TypeScript errors about missing `CaseStudy1` page (that's fine for now — we'll create it next). The CaseTitle and routing changes should be type-safe.

**Step 6: Commit**

```bash
git add src/App.tsx src/components/Cases/CaseTitle.tsx src/components/Cases/CaseVideoPreview.tsx src/components/Cases/CaseCinematicScroll.tsx src/components/Cases/CaseCinematicMobile.tsx src/components/Cases/CaseLottieScatter.tsx src/components/Cases/CaseLottieMobile.tsx src/data/casesData.ts
git commit -m "feat: add case study routing and link View Case Study button"
```

---

## Task 4: Page Shell — Create CaseStudy1.tsx with header, hero, and footer

**Files:**
- Create: `src/pages/CaseStudy1.tsx`

**Step 1: Create the page with header, hero, and footer sections**

```typescript
// src/pages/CaseStudy1.tsx
import { useEffect } from "react";
import { Link } from "react-router";
import { Logo } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { ContactLine } from "@/components/Layout/ContactLine";
import {
  CASE1_TITLE,
  CASE1_SUBTITLE_SEGMENTS,
  CASE1_HERO_IMAGE,
} from "@/data/caseStudy1Data";

export function CaseStudy1() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Case Study — Shkuratov Designer";
  }, []);

  return (
    <div className="relative min-h-screen min-h-dvh w-full bg-black">
      <Logo visible />

      <main className="relative z-10 flex flex-col items-center px-5 md:px-10 pt-[40px] pb-[164px] md:pb-[320px]">
        {/* Back to cases */}
        <Link
          to="/cases"
          className="flex items-center gap-[8px] mb-[24px] md:mb-[56px]"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
            <path d="M17.5 5.25L8.75 14L17.5 22.75" stroke="#999899" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-['TN',serif] font-[350] text-[24px] leading-[1.2] text-text-secondary">
            Back to cases
          </span>
        </Link>

        {/* Hero */}
        <section className="flex flex-col items-center gap-[56px] max-w-[882px] w-full">
          <div className="flex flex-col gap-[16px] items-center text-center max-w-[655px]">
            <h1 className="font-['TN',serif] font-[350] text-[28px] md:text-[48px] leading-[1.2] text-white tracking-[-0.48px]">
              {CASE1_TITLE}
            </h1>
            <p className="font-sf text-[16px] md:text-[18px] leading-[1.4] text-text-secondary">
              {CASE1_SUBTITLE_SEGMENTS.map((seg, i) => (
                <span key={i} className={seg.highlighted ? "text-white" : ""}>
                  {seg.text}
                </span>
              ))}
            </p>
          </div>
          <img
            src={CASE1_HERO_IMAGE}
            alt="Isometric design system city illustration"
            className="w-full rounded-[8px]"
            style={{ aspectRatio: "2752 / 1536" }}
          />
        </section>

        {/* Remaining sections will be added in subsequent tasks */}
      </main>

      <NavBar visible />
      <ContactLine visible />
    </div>
  );
}
```

**Step 2: Verify build and dev server**

```bash
npm run build
npm run dev
```

Navigate to `http://localhost:5173/cases/mcp-vibe-coding` — should see header + hero + navbar/footer.

**Step 3: Commit**

```bash
git add src/pages/CaseStudy1.tsx
git commit -m "feat: add CaseStudy1 page shell with header and hero"
```

---

## Task 5: The Problem Section

**Files:**
- Modify: `src/pages/CaseStudy1.tsx`

**Step 1: Add imports and Problem section**

Add to imports:
```typescript
import { CASE1_PROBLEM } from "@/data/caseStudy1Data";
import { useInView } from "@/hooks/useInView";
```

Add after the Hero section closing `</section>`, before the "Remaining sections" comment:

```tsx
{/* The Problem */}
<ProblemSection />
```

Create a `ProblemSection` component inside the same file (above `CaseStudy1`):

```tsx
function ProblemSection() {
  const [ref, visible] = useInView(0.15);

  return (
    <section
      ref={ref}
      className={`experience-scroll-reveal${visible ? " visible" : ""} flex flex-col items-center gap-[56px] w-full mt-[80px] md:mt-[120px]`}
    >
      <div className="flex flex-col items-center gap-[16px] text-center max-w-[655px]">
        <p className="font-sf text-[16px] md:text-[18px] leading-[1.4] text-accent">
          {CASE1_PROBLEM.label}
        </p>
        <h2 className="font-['TN',serif] font-[350] text-[28px] md:text-[48px] leading-[1.2] text-white tracking-[-0.48px] max-w-[532px]">
          {CASE1_PROBLEM.heading}
        </h2>
      </div>

      {/* 3 images - horizontal scroll on mobile, row on desktop */}
      <div className="w-screen md:w-full flex gap-[16px] md:gap-[40px] overflow-x-auto md:overflow-visible px-5 md:px-0 snap-x snap-mandatory scrollbar-hide">
        {CASE1_PROBLEM.images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-[240px] md:h-[363px] w-[340px] md:w-1/3 shrink-0 md:shrink rounded-[20px] object-cover snap-center"
          />
        ))}
      </div>

      {/* 3 text points */}
      <div className="flex flex-col gap-[36px] md:gap-[48px] text-center max-w-[566px]">
        {CASE1_PROBLEM.points.map((point, i) => (
          <p key={i} className="font-sf text-[16px] md:text-[18px] leading-[1.4] text-text-secondary">
            <span className="font-medium text-white">{point.bold}</span>
            {point.body}
          </p>
        ))}
      </div>
    </section>
  );
}
```

**Step 2: Verify in browser**

```bash
npm run dev
```

Navigate to the case study page, scroll to problem section. Should show label, heading, 3 images, 3 text blocks.

**Step 3: Commit**

```bash
git add src/pages/CaseStudy1.tsx
git commit -m "feat: add Problem section to case study 1"
```

---

## Task 6: Timeline Section

**Files:**
- Modify: `src/pages/CaseStudy1.tsx`

**Step 1: Add Timeline imports and section**

Add to imports:
```typescript
import { CASE1_TIMELINE } from "@/data/caseStudy1Data";
import type { TimelineStep } from "@/data/caseStudy1Data";
```

Create `TimelineSection` component inside the same file:

```tsx
function TimelineMedia({ media }: { media: TimelineStep["media"] }) {
  if (media.type === "image") {
    return (
      <img
        src={media.src}
        alt=""
        className="w-full h-full object-cover rounded-[16px]"
      />
    );
  }
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      poster={media.poster}
      className="w-full h-full object-cover rounded-[16px]"
    >
      {media.webm && <source src={media.webm} type="video/webm" />}
      <source src={media.src} type="video/mp4" />
    </video>
  );
}

function TimelineSection() {
  const [ref, visible] = useInView(0.1);

  return (
    <section
      ref={ref}
      className={`experience-scroll-reveal${visible ? " visible" : ""} relative w-full max-w-[781px] mt-[80px] md:mt-[120px]`}
    >
      {/* Desktop: zigzag timeline */}
      <div className="hidden md:block relative">
        {/* Vertical center line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/20" />

        {CASE1_TIMELINE.map((step, i) => {
          const isLeft = step.side === "left";
          return (
            <div key={i} className="relative flex items-start mb-[64px] last:mb-0" style={{ minHeight: "174px" }}>
              {/* Center dot */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[16px] w-[15px] h-[15px] rounded-full bg-white/40 z-10" />

              {/* Left side */}
              <div className={`w-[calc(50%-30px)] ${isLeft ? "pr-[16px] text-right" : ""}`}>
                {isLeft ? (
                  <p className="font-['TN',serif] font-[350] text-[20px] md:text-[24px] leading-[1.2] text-white pt-[8px]">
                    {step.label}
                  </p>
                ) : (
                  <div className="h-[174px] rounded-[16px] overflow-hidden">
                    <TimelineMedia media={step.media} />
                  </div>
                )}
              </div>

              {/* Spacer for center line */}
              <div className="w-[60px] shrink-0" />

              {/* Right side */}
              <div className={`w-[calc(50%-30px)] ${!isLeft ? "pl-[16px]" : ""}`}>
                {!isLeft ? (
                  <p className="font-['TN',serif] font-[350] text-[20px] md:text-[24px] leading-[1.2] text-white pt-[8px]">
                    {step.label}
                  </p>
                ) : (
                  <div className="h-[174px] rounded-[16px] overflow-hidden">
                    <TimelineMedia media={step.media} />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: vertical stack */}
      <div className="md:hidden flex flex-col gap-[48px]">
        {CASE1_TIMELINE.map((step, i) => (
          <div key={i} className="flex flex-col gap-[16px]">
            <div className="h-[174px] rounded-[16px] overflow-hidden">
              <TimelineMedia media={step.media} />
            </div>
            <p className="font-['TN',serif] font-[350] text-[20px] leading-[1.2] text-white">
              {step.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

Add `<TimelineSection />` after the Problem section in the main return.

**Step 2: Verify in browser**

Check desktop zigzag layout and mobile stacked layout. Videos should autoplay muted.

**Step 3: Commit**

```bash
git add src/pages/CaseStudy1.tsx
git commit -m "feat: add Timeline section to case study 1"
```

---

## Task 7: 3 Decisions Section with Hover-to-Card

**Files:**
- Modify: `src/pages/CaseStudy1.tsx`

**Step 1: Add Decisions imports and section**

Add to imports:
```typescript
import { useState } from "react";
import { CASE1_DECISIONS } from "@/data/caseStudy1Data";
```

(Note: `useState` may already be imported — just ensure it's there.)

Create `DecisionsSection` component:

```tsx
function DecisionCard({ card, index }: { card: typeof CASE1_DECISIONS[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  // Stagger positions: left top, center bottom, right top
  const positionClasses = [
    "md:self-start md:mt-0",          // left
    "md:self-center md:mt-[167px]",   // center, offset down
    "md:self-end md:mt-0",            // right
  ];

  return (
    <div
      className={`relative w-full md:w-[350px] h-[350px] rounded-[32px] overflow-hidden cursor-pointer ${positionClasses[index]}`}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(f => !f)}
    >
      {/* Image */}
      <img
        src={card.image}
        alt=""
        className={`absolute inset-0 w-full h-full object-cover rounded-[32px] transition-opacity duration-300 ease-in-out ${flipped ? "opacity-0" : "opacity-100"}`}
      />
      {/* Text card */}
      <div
        className={`absolute inset-0 bg-[#1e242a] rounded-[32px] p-[30px] pt-[50px] flex flex-col gap-[12px] transition-opacity duration-300 ease-in-out ${flipped ? "opacity-100" : "opacity-0"}`}
      >
        {card.paragraphs.map((p, i) => (
          <p
            key={i}
            className={`font-sf text-[16px] md:text-[18px] leading-[1.4] ${i === 0 ? "text-white" : "text-text-secondary"}`}
            style={{ whiteSpace: "pre-line" }}
          >
            {p}
          </p>
        ))}
      </div>
    </div>
  );
}

function DecisionsSection() {
  const [ref, visible] = useInView(0.15);

  return (
    <section
      ref={ref}
      className={`experience-scroll-reveal${visible ? " visible" : ""} flex flex-col items-center w-full max-w-[1280px] mt-[80px] md:mt-[120px]`}
    >
      <h2 className="font-['TN',serif] font-[350] text-[28px] md:text-[48px] leading-[1.2] text-white text-center tracking-[-0.48px] max-w-[514px] mb-[48px] md:mb-[80px]">
        3 decisions that changed everything
      </h2>

      <div className="flex flex-col md:flex-row gap-[24px] md:gap-[40px] w-full md:items-start md:justify-center">
        {CASE1_DECISIONS.map((card, i) => (
          <DecisionCard key={i} card={card} index={i} />
        ))}
      </div>
    </section>
  );
}
```

Add `<DecisionsSection />` after the Timeline section in the main return.

**Step 2: Verify in browser**

- Desktop: 3 images in staggered row, hover reveals text card with smooth 300ms crossfade
- Mobile: stacked vertically, tap to toggle

**Step 3: Commit**

```bash
git add src/pages/CaseStudy1.tsx
git commit -m "feat: add 3 Decisions hover-to-card section"
```

---

## Task 8: YouTube Embed Section ("How It All Connects")

**Files:**
- Modify: `src/pages/CaseStudy1.tsx`

**Step 1: Add YouTube imports and section**

Add to imports:
```typescript
import {
  CASE1_YOUTUBE_VIDEO_ID,
  CASE1_YOUTUBE_EMBED_URL,
  CASE1_VIDEO_TABS,
} from "@/data/caseStudy1Data";
```

Create `VideoSection` component (follows Experience.tsx facade pattern):

```tsx
function VideoSection() {
  const [ref, visible] = useInView(0.15);
  const [playing, setPlaying] = useState(false);

  return (
    <section
      ref={ref}
      className={`experience-scroll-reveal${visible ? " visible" : ""} flex flex-col items-center gap-[24px] w-full max-w-[966px] mt-[80px] md:mt-[120px]`}
    >
      {/* YouTube embed */}
      <div className="relative w-full rounded-[24px] md:rounded-[32px] overflow-hidden bg-white/10" style={{ paddingBottom: "57.76%" }}>
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
              <path
                d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                fill="#FF0000"
              />
              <path d="M45 24L27 14v20" fill="#fff" />
            </svg>
          </button>
        )}
      </div>

      {/* 3 tab labels */}
      <div className="flex gap-[12px] md:gap-[24px] w-full">
        {CASE1_VIDEO_TABS.map((tab) => (
          <div
            key={tab}
            className="flex-1 flex items-center justify-center bg-black rounded-[12px] py-[12px] md:py-[16px] px-[8px]"
          >
            <p className="font-sf text-[14px] md:text-[18px] leading-[1.4] text-text-secondary text-center">
              {tab}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

Add `<VideoSection />` after the Decisions section.

**Step 2: Verify in browser**

- Should show YouTube thumbnail with play button
- Click loads iframe with autoplay
- 3 label cards below

**Step 3: Commit**

```bash
git add src/pages/CaseStudy1.tsx
git commit -m "feat: add YouTube embed section to case study 1"
```

---

## Task 9: Metrics Section

**Files:**
- Modify: `src/pages/CaseStudy1.tsx`

**Step 1: Add Metrics imports and section**

Add to imports:
```typescript
import { CASE1_QUOTE, CASE1_METRICS } from "@/data/caseStudy1Data";
```

Create `MetricsSection` component:

```tsx
function MetricsSection() {
  const [ref, visible] = useInView(0.15);

  return (
    <section
      ref={ref}
      className={`experience-scroll-reveal${visible ? " visible" : ""} flex flex-col items-center w-full max-w-[1280px] mt-[80px] md:mt-[120px]`}
    >
      {/* Quote */}
      <p className="font-['TN',serif] font-[350] text-[24px] md:text-[48px] leading-[1.2] text-white text-center tracking-[-0.48px] max-w-[966px] mb-[48px] md:mb-[80px]">
        {CASE1_QUOTE}
      </p>

      {/* 4 metric cards - 2x2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] md:gap-[48px] w-full max-w-[1280px]">
        {CASE1_METRICS.map((metric) => (
          <div
            key={metric.label}
            className="bg-white rounded-[20px] pt-[24px] pb-[30px] px-[24px] md:px-[32px] flex flex-col gap-[12px]"
          >
            <p className="font-['TN',serif] font-[350] text-[32px] md:text-[48px] leading-[1.2] text-[#222] tracking-[-0.48px]">
              {metric.value}
            </p>
            <p className="font-sf text-[16px] md:text-[18px] leading-[1.4] text-[#6a6a6a]">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

Add `<MetricsSection />` after the Video section.

**Step 2: Verify in browser**

- Quote centered in TN font
- 4 white cards in 2x2 grid on desktop, single column on mobile
- Each card shows large number + description

**Step 3: Commit**

```bash
git add src/pages/CaseStudy1.tsx
git commit -m "feat: add Metrics section to case study 1"
```

---

## Task 10: Final Polish — Build check, visual review, and cleanup

**Files:**
- Possibly tweak: `src/pages/CaseStudy1.tsx` (spacing, responsive adjustments)
- Possibly tweak: `src/styles/index.css` (if new CSS needed)

**Step 1: Run build to verify no TypeScript errors**

```bash
npm run build
```

Expected: Clean build with no errors.

**Step 2: Visual review on dev server**

```bash
npm run dev
```

Check all these flows:
1. Navigate to `/cases` → click "View Case Study" on first case → lands on `/cases/mcp-vibe-coding`
2. "Back to cases" link works and navigates to `/cases`
3. All 7 sections render correctly on desktop (1440px viewport)
4. All sections render correctly on mobile (375px viewport)
5. Scroll reveals animate smoothly
6. Decision cards flip on hover (desktop) and tap (mobile)
7. YouTube video plays on click
8. All images load without broken paths
9. All videos autoplay muted
10. NavBar shows "Cases" as active tab
11. ContactLine visible at bottom

**Step 3: Fix any issues found**

Address spacing, responsive, or visual discrepancies.

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete case study 1 page with all sections"
```

---

## Task Summary

| Task | Description | Estimated Complexity |
|------|-------------|---------------------|
| 1 | Asset pipeline — Figma exports + video moves | Medium (Figma API + file ops) |
| 2 | Data file — caseStudy1Data.ts | Simple (data entry) |
| 3 | Routing — App.tsx route + CaseTitle link | Simple (3 files, small edits) |
| 4 | Page shell — Header, hero, footer | Simple (new file, existing patterns) |
| 5 | Problem section | Simple (images + text) |
| 6 | Timeline section | Medium (zigzag layout, video/image handling) |
| 7 | Decisions section with hover | Medium (hover interaction, mobile tap) |
| 8 | YouTube embed section | Simple (copy Experience pattern) |
| 9 | Metrics section | Simple (grid of cards) |
| 10 | Final polish and review | Variable |

**Parallelizable tasks:** Tasks 1 + 2 can run in parallel. Tasks 4-9 are sequential (each adds to the same file). Task 3 can run in parallel with Task 4.
