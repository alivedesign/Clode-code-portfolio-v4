# Pre-Production Review Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Clean unused assets, refactor large components, and visually validate every page before production deploy.

**Architecture:** Parallel cleanup + refactoring (independent concerns), followed by build validation and full visual QA on desktop (1440px) + mobile (390px). Zero visual or behavioral changes — refactoring is structural only.

**Tech Stack:** React 19, TypeScript, Vite 8, Tailwind CSS 4, Playwright (QA)

---

## Phase 1: Cleanup

### Task 1: Delete unused assets

**Files to delete:**

Unused poster images:
- `public/images/poster-about.webp`
- `public/images/poster-cases.webp`
- `public/images/poster-content.webp`
- `public/images/poster-experience.webp`
- `public/images/poster-products.webp`
- `public/images/poster-resume.webp`
- `public/images/character-poster.webp`

Unused LinkedIn JPEGs (untracked):
- `public/images/content/LN-1.jpeg`
- `public/images/content/LN-3.jpeg`
- `public/images/content/LN-4.jpeg`
- `public/images/content/LN-5.jpeg`
- `public/images/content/LN-6.jpeg`
- `public/images/content/LN-7.jpeg`

Unused case study SVGs:
- `public/images/cases/case-1/dot.svg`
- `public/images/cases/case-1/line-down-left.svg`
- `public/images/cases/case-1/line-down-right.svg`
- `public/images/cases/case-2/arrow-back.svg`
- `public/images/cases/case-2/arrow-down.svg`

Redundant files:
- `public/images/content/avatar.jpg` (avatar.webp is used)
- `public/Evgeny_Shkuratov_Product_Design_Engineer.docx` (PDF is used)

Empty directories:
- `public/images/b2b-messenger-case/` (contains only .DS_Store)
- `public/assets/` (empty)

Development artifacts:
- `.playwright-mcp/` (testing artifacts)
- `LinkedIn hooks results/` (content generation output)

**Step 1:** Delete all files listed above.

```bash
# Poster images
rm public/images/poster-about.webp public/images/poster-cases.webp public/images/poster-content.webp public/images/poster-experience.webp public/images/poster-products.webp public/images/poster-resume.webp public/images/character-poster.webp

# LinkedIn JPEGs
rm public/images/content/LN-1.jpeg public/images/content/LN-3.jpeg public/images/content/LN-4.jpeg public/images/content/LN-5.jpeg public/images/content/LN-6.jpeg public/images/content/LN-7.jpeg

# Unused case SVGs
rm public/images/cases/case-1/dot.svg public/images/cases/case-1/line-down-left.svg public/images/cases/case-1/line-down-right.svg public/images/cases/case-2/arrow-back.svg public/images/cases/case-2/arrow-down.svg

# Redundant files
rm public/images/content/avatar.jpg public/Evgeny_Shkuratov_Product_Design_Engineer.docx

# Empty directories
rm -rf public/images/b2b-messenger-case/ public/assets/

# Development artifacts
rm -rf .playwright-mcp/ "LinkedIn hooks results/"
```

**Step 2:** Verify no broken references. Grep src/ for each deleted filename to confirm zero hits.

---

### Task 2: Fix .gitignore

**File:** `.gitignore`

**Step 1:** Add these entries to `.gitignore`:

```
.DS_Store
.playwright-mcp/
```

**Step 2:** Remove tracked .DS_Store files from git index:

```bash
find . -name ".DS_Store" -exec git rm --cached {} + 2>/dev/null || true
```

---

### Task 3: Fix README.md

**File:** `README.md`

**Step 1:** Replace incorrect tech stack references:
- "Next.js 15 (App Router)" → "Vite 8 + React 19 (Client-side SPA)"
- "Framer Motion" → remove (not used, Tailwind CSS handles animations)
- Verify all other claims match the actual codebase

---

### Task 4: Fix index.html preload

**File:** `index.html`

**Step 1:** Remove the preload for deleted `character-poster.webp`:

```html
<!-- DELETE THIS LINE: -->
<link rel="preload" as="image" href="/images/character-poster.webp" type="image/webp" />
```

`character-poster.webp` is not referenced anywhere in src/ — confirmed by grep. It was only preloaded in HTML.

---

### Task 5: Build validation (Phase 1)

```bash
npm run build
```

Expected: TypeScript check passes, production build succeeds with zero errors.

---

### Task 6: Commit cleanup

```bash
git add -A
git commit -m "chore: cleanup unused assets, fix gitignore and README"
```

---

## Phase 2: Refactoring

### Task 7: Create shared BackLink component

**Create:** `src/components/Cases/BackLink.tsx`

The 4 case studies use 2 visual variants of the back link. Case 1 uses a stroked chevron with hover color change. Cases 2-4 use a filled chevron. Both must be preserved exactly.

```tsx
import { Link } from "react-router";

interface BackLinkProps {
  variant?: "stroke" | "fill";
  className?: string;
}

export function BackLink({ variant = "fill", className }: BackLinkProps) {
  const defaultClassName =
    variant === "stroke"
      ? "inline-flex items-center gap-2 mt-[40px] md:mt-0 mb-[32px] font-['TN',serif] font-extralight text-[24px] leading-[1.2] text-text-secondary hover:text-white transition-colors"
      : "flex items-center gap-[8px] self-center mb-[64px] md:mb-[56px] mt-[16px] md:mt-0";

  return (
    <Link to="/cases" className={className ?? defaultClassName}>
      {variant === "stroke" ? (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M17.5 5.25L8.75 14L17.5 22.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
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
      )}
      {variant === "stroke" ? (
        "Back to cases"
      ) : (
        <span className="font-['TN',serif] font-extralight text-[24px] leading-[1.2] text-text-secondary">
          Back to cases
        </span>
      )}
    </Link>
  );
}
```

**Modify:** `src/components/Cases/index.ts` — add export:

```typescript
export { BackLink } from "./BackLink";
```

**Modify:** `src/pages/CaseStudy1.tsx` — replace local BackLink function with import:

```typescript
import { BackLink } from "@/components/Cases";
```

Remove the local `function BackLink()` definition. Replace `<BackLink />` call with `<BackLink variant="stroke" />`.

**Modify:** `src/pages/CaseStudy2.tsx` — replace inline back link JSX with:

```typescript
import { BackLink } from "@/components/Cases";
```

Replace the full `<Link to="/cases" ...>` block with `<BackLink />`.

**Modify:** `src/pages/CaseStudy3.tsx` — same as CaseStudy2.

**Modify:** `src/pages/CaseStudy4.tsx` — same as CaseStudy2.

**Verify:** `npm run build` passes.

---

### Task 8: Extract CaseStudy4 inline data

**Create:** `src/data/caseStudy4Data.ts`

Move these from CaseStudy4.tsx:
- `PERSONAS_LEFT` array
- `PERSONAS_CENTER` array
- `PERSONAS_RIGHT` array
- The `StyledSegment` type (or re-export from caseStudy3Data if identical)

**Modify:** `src/pages/CaseStudy4.tsx` — replace inline arrays with imports:

```typescript
import {
  PERSONAS_LEFT,
  PERSONAS_CENTER,
  PERSONAS_RIGHT,
} from "@/data/caseStudy4Data";
```

Remove the inline `PERSONAS_*` arrays and any local types they depend on.

**Verify:** `npm run build` passes.

---

### Task 9: Split CaseStudy1 into sub-components

**Strategy:** Convert `src/pages/CaseStudy1.tsx` from a single 816-line file into a directory with sub-component files. The import `./pages/CaseStudy1` in App.tsx will auto-resolve to `./pages/CaseStudy1/index.tsx`.

**Create directory:** `src/pages/CaseStudy1/`

**Move:** `src/pages/CaseStudy1.tsx` → `src/pages/CaseStudy1/index.tsx`

**Extract from index.tsx into separate files:**

1. **`src/pages/CaseStudy1/HeroSection.tsx`** — the `HeroSection` function (~40 lines). Imports `CASE1_TITLE`, `CASE1_SUBTITLE_SEGMENTS`, `CASE1_HERO_IMAGE` from `@/data/caseStudy1Data` and `useInView` from `@/hooks/useInView`.

2. **`src/pages/CaseStudy1/ProblemSection.tsx`** — the `ProblemSection` function (~70 lines). Imports `CASE1_PROBLEM` from data, `useInView` from hooks.

3. **`src/pages/CaseStudy1/TimelineSection.tsx`** — the `TimelineMedia` + `TimelineSection` functions (~230 lines). This is the largest sub-component with scroll-linked SVG animations. Imports `CASE1_TIMELINE`, `TimelineStep` from data, `useScrollProgress`, `useInView`, `useMediaQuery` from hooks.

4. **`src/pages/CaseStudy1/DecisionsSection.tsx`** — the `DecisionFlipCard` + `DecisionFlipCardMobile` + `DecisionsSection` functions (~190 lines). Imports `CASE1_DECISIONS`, `DecisionCard` from data, `useMediaQuery`, `useInView` from hooks.

5. **`src/pages/CaseStudy1/VideoSection.tsx`** — the `VideoSection` function (~70 lines). Imports `CASE1_YOUTUBE_VIDEO_ID`, `CASE1_YOUTUBE_EMBED_URL`, `CASE1_VIDEO_TABS` from data, `useState` from React.

6. **`src/pages/CaseStudy1/MetricsSection.tsx`** — the `MetricsSection` function (~30 lines). Imports `CASE1_METRICS`, `CASE1_QUOTE` from data, `useInView` from hooks.

**Result:** `src/pages/CaseStudy1/index.tsx` becomes a ~100-line orchestrator that imports and composes all sections:

```tsx
import { Logo } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { ContactLine } from "@/components/Layout/ContactLine";
import { BackLink } from "@/components/Cases";
import { usePageMeta } from "@/hooks/usePageMeta";
import { HeroSection } from "./HeroSection";
import { ProblemSection } from "./ProblemSection";
import { TimelineSection } from "./TimelineSection";
import { DecisionsSection } from "./DecisionsSection";
import { VideoSection } from "./VideoSection";
import { MetricsSection } from "./MetricsSection";

export function CaseStudy1() {
  usePageMeta({ ... });

  return (
    <>
      <Logo visible />
      <NavBar visible />
      <main className="...">
        <BackLink variant="stroke" />
        <HeroSection />
        <ProblemSection />
        <TimelineSection />
        <DecisionsSection />
        <VideoSection />
        <MetricsSection />
      </main>
      <ContactLine visible />
    </>
  );
}
```

**Critical:** Each sub-component must import its own data and hooks — no prop drilling from the orchestrator. This keeps components self-contained and the orchestrator thin.

**Verify:** `npm run build` passes.

---

### Task 10: Build validation (Phase 2)

```bash
npm run build
```

Expected: Zero errors. All lazy imports resolve correctly.

---

### Task 11: Commit refactoring

```bash
git add -A
git commit -m "refactor: split large case study components into sub-components"
```

---

## Phase 3: Visual QA

### Task 12: Desktop QA (1440px viewport)

Use Playwright to visit every page and take screenshots. Check:

| Page | URL | Key checks |
|------|-----|------------|
| Home | `/` | Character reveal, pose cycling, typewriter, navbar glass |
| Experience | `/experience` | Timeline, YouTube embed |
| Products | `/products` | Product cards, modal open/close |
| Cases | `/cases` | Card grid, hover states |
| Case Study 1 | `/cases/mcp-vibe-coding` | Full scroll, images, timeline animation, flip cards, video |
| Case Study 2 | `/cases/figma-token-plugin` | Screenshots, flip cards, YouTube |
| Case Study 3 | `/cases/stickers` | Phone mockups, Lottie stickers, horizontal scroll |
| Case Study 4 | `/cases/ai-seo-startup` | Personas grid, chat bubbles, research video |
| Content | `/content` | YouTube + LinkedIn + Instagram carousels |
| About | `/about` | Photo grid, text sections |
| 404 | `/nonexistent` | Character animation, back navigation |

For each page:
1. Navigate and wait for load
2. Take full-page screenshot
3. Check browser console for errors (zero expected)
4. Verify no broken images (check for `naturalWidth === 0`)
5. Verify all navigation links work

---

### Task 13: Mobile QA (390px viewport)

Same pages as Task 12, plus specifically check:

| Check | Expected |
|-------|----------|
| Hamburger menu | Opens full-screen overlay, all items clickable |
| Bottom navbar | 3 main items visible, correct positioning |
| Carousels | Swipeable, images visible |
| Contact line | Hidden on mobile |
| Back link on case studies | Visible, tappable, navigates correctly |
| No horizontal overflow | `document.body.scrollWidth === window.innerWidth` |
| Images scale | No clipping, no overflow |
| Videos | Play button works, responsive sizing |

---

### Task 14: Fix pass (if needed)

If Tasks 12-13 find regressions:

1. Document each issue
2. Fix in source code
3. Re-run `npm run build`
4. Re-verify the specific page
5. Commit:

```bash
git add -A
git commit -m "fix: resolve QA regressions from refactoring"
```

---

## Success Criteria

- [ ] All unused assets deleted (~1.3MB saved)
- [ ] .gitignore blocks .DS_Store and .playwright-mcp/
- [ ] README.md reflects actual tech stack
- [ ] index.html has no preload for deleted assets
- [ ] BackLink shared across all 4 case studies
- [ ] CaseStudy4 data extracted to data file
- [ ] CaseStudy1 split into 7 files (index + 6 sections)
- [ ] `npm run build` passes with zero errors
- [ ] All 11 pages render correctly at 1440px
- [ ] All 11 pages render correctly at 390px
- [ ] Zero console errors in browser
- [ ] Zero broken images
- [ ] Zero visual or behavioral regressions
