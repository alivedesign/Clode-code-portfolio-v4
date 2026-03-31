# Performance Optimization & Cleanup — Design Doc

**Date:** 2026-03-31
**Goal:** Optimize portfolio performance, clean up repo bloat, and improve code quality without changing any UI/UX.

## Problem

The project is 2.8GB with ~90MB of unused validation screenshots/videos in root, 60MB of unoptimized PNG images in public/, and code-level issues (missing image dimensions, no video preload, no component memoization) causing poor Lighthouse scores.

## Constraints

- Zero visual changes — every page must look identical before and after
- No changes to animation timing, interactions, or layout
- All font/color/spacing tokens unchanged

---

## Phase 1: Junk Removal (~90MB savings, zero risk)

### Root-level files to delete (85 files)

**Validation screenshots (68 PNG/JPEG files):**
- `14 Years of Daily Journals Fed Into Claude.jpeg`
- `AI Agents are much more software.jpeg`
- `AI is going .png`
- `China just turned the.png`
- `Google is trying .jpeg`
- `Tailwind just laid off .jpeg`
- `The real AI skill.jpeg`
- `VCs made.jpeg`
- `avatar.jpg`
- `card1.png`
- `cases-adjusted.png`, `cases-figma-link.png`, `cases-fixed-50pct.png`
- `cases-fixed-character.png`, `cases-fixed-endstate.png`, `cases-fixed-midscroll.png`
- `cases-full-page.png`, `cases-lottie-section.png`, `cases-mobile-lottie.png`
- `cases-mobile-typing.png`, `cases-page-desktop.png`
- `cases-page-scrolled1.png` through `cases-page-scrolled5.png`
- `cases-page-with-links.png`, `cases-typing-machine.png`, `cases-v2-full.png`
- `case2-decisions-section.png`, `case2-decisions-v2.png`
- `case2-desktop-full.png`, `case2-desktop-v2.png`
- `case2-final-desktop.png`, `case2-fixed-layout.png`
- `case2-full-page.png`, `case2-hover-card.png`
- `case4-annotation-area.png`, `case4-arrow-fix.png`, `case4-bottom.png`
- `case4-full-page.png`, `case4-full-revealed.png`
- `case4-mobile-demo-video.png`, `case4-mobile-personas-v2.png`
- `case4-mobile-personas.png`, `case4-mobile-video.png`, `case4-mobile.png`
- `case4-v2-full.png`, `case4-v2-top.png`
- `decisions-cards.png`, `decisions-fixed.png`, `decisions-full.png`
- `decisions-scaled.png`, `decisions-section.png`, `decisions-v2.png`, `decisions-v3.png`
- `mobile-decisions-v2.png`, `mobile-decisions.png`, `mobile-decisions2.png`, `mobile-top.png`
- `toast-confirmed.png`, `toast-debug.png`, `toast-final-test.png`
- `toast-fix2.png`, `toast-forced-visible.png`, `toast-test-real.png`
- `toast-visible-final.png`, `toast-visible.png`
- `case 2 character.png`, `case 2_1 preview.png`, `case 2_2 preview.png`

**Root video files (6 files, ~80MB):**
- `Gif 3 for case 1.mp4` (26MB)
- `research video.mp4` (25MB)
- `case 2 gif.mp4` (16MB)
- `gif 2 for case.mp4` (10MB)
- `case 2 character anim.mp4` (2.2MB)
- `case 1 preview.mp4` (1.1MB)

**Other root files:**
- `Evgeny_Shkuratov_Product_Design_Engineer.docx`
- `Selfie.lottie`
- `Mail.svg`
- `QUICK_START.md`
- `context.md`
- `next-env.d.ts`

### Root directories to delete (4 dirs, ~2MB)

- `cat/` — lottie duplicates of `public/lottie/stickers/cat/`
- `devil/` — lottie duplicates of `public/lottie/stickers/devil/`
- `turkey/` — lottie duplicates of `public/lottie/stickers/turkey/`
- `font/` — 12 TTF files (unused, WOFF2 versions exist in `public/fonts/`)

### Other cleanup

- Delete `.next/` directory (Next.js artifact, this is a Vite project)
- Delete `.DS_Store` files

### Orphaned public/ images to delete (~8.5MB)

- `public/images/cases/case-2/video-thumbnail.png` (521K) — no code reference
- `public/images/cases/case-4/research-mode.png` (7.4MB) — no code reference
- `public/images/cases/case-4/final-design.png` (624K) — no code reference

---

## Phase 2: Image Optimization — PNG to WebP (~25MB savings)

Convert using `sharp` (Node.js) at quality 85 (visually lossless). Keep originals as backup until verified, then delete.

### Conversion targets

**Case 1 images (5 files, 12.5MB → ~5MB):**
- `cases/case-1/hero.png` (2.2MB)
- `cases/case-1/decision-1.png` (5.3MB)
- `cases/case-1/decision-2.png` (3.6MB)
- `cases/case-1/decision-3.png` (681K)
- `cases/case-1/timeline-1.png` (668K)

**Case 2 images (4 files, 11.8MB → ~5MB):**
- `cases/case-2/decision-1.png` (2.3MB)
- `cases/case-2/decision-2.png` (2.9MB)
- `cases/case-2/decision-3.png` (3.9MB)
- `cases/case-2/workflow-3d.png` (2.7MB)

**Case 4 images (1 file):**
- `cases/case-4/old-website.png` (885K)

**Content images (10 files, 14MB → ~6MB):**
- `content/ai-going-to-kill-us.png` (1.3MB)
- `content/china-drones.png` (621K)
- `content/LN-2.png` (1.3MB)
- `content/LN-8.png` (621K)
- `content/ig-1.png` through `content/ig-6.png` (1.1-2.3MB each)

**Poster images (5 files, 3.4MB → ~1.5MB):**
- `poster-cases.png`, `poster-about.png`, `poster-content.png`
- `poster-products.png`, `poster-experience.png`

**About photos (5 files, 9.3MB → ~4MB):**
- `about/about-1.jpg` through `about/about-9.jpg`
- Note: These `.jpg` files are actually PNG format — convert to real JPEG or WebP

### Code changes for Phase 2

Update all `src=` references from `.png` to `.webp` in:
- `src/data/caseStudy1Data.ts`
- `src/data/caseStudy2Data.ts` (or inline in CaseStudy2.tsx)
- `src/data/contentData.ts`
- `src/data/aboutData.ts`
- `src/pages/CaseStudy4.tsx`
- `src/components/Character/Character.tsx` (poster paths)

---

## Phase 3: Video Optimization

### 3a. Add preload and poster attributes (code changes)

**Add `preload="metadata"`:**
- `src/components/Cases/CaseVideoPreview.tsx:17`
- `src/pages/CaseStudy2.tsx:293`

**Add `poster` attribute where missing:**
- `CaseVideoPreview.tsx:17` — use first frame or case card image as poster
- `CaseStudy2.tsx:293` — use character poster image

### 3b. Add WebM `<source>` fallback

Convert direct `src` to dual `<source>` elements where WebM exists:
- `CaseVideoPreview.tsx` — switch from `src={videoSrc}` to `<source type="video/webm">` + `<source type="video/mp4">`
- `CaseStudy2.tsx:293` — same pattern

### 3c. Manual video re-encoding (user-executed ffmpeg commands)

Provide ffmpeg commands for the user to run on largest videos:
- `bloggingmachine-video.mp4` (61MB) — already has WebM version (13MB)
- `case-1-implementation.mp4` (26MB) — no WebM version
- `case-2-gif.mp4` (16MB) — no WebM version
- `case-1-approval.mp4` (10MB) — no WebM version

---

## Phase 4: Code-Level Performance Fixes

### 4a. Add width/height to all img tags (32 images)

For each `<img>` tag, add explicit `width` and `height` attributes matching the image's natural dimensions. This fixes Cumulative Layout Shift (CLS).

**Files to modify:**
- `src/components/Character/Character.tsx` (1 img)
- `src/components/Cases/CaseCinematicMobile.tsx` (2 imgs)
- `src/components/Cases/CaseCinematicScroll.tsx` (5 imgs)
- `src/components/Products/ProductCard.tsx` (1 img)
- `src/components/Products/ProductModal.tsx` (1 img)
- `src/pages/About.tsx` (10 imgs)
- `src/pages/Content.tsx` (4 imgs + arrows)
- `src/pages/Experience.tsx` (1 img)
- `src/pages/CaseStudy1.tsx` (2 imgs)
- `src/pages/CaseStudy2.tsx` (5 imgs)
- `src/pages/CaseStudy3.tsx` (2 imgs)
- `src/pages/CaseStudy4.tsx` (5 imgs)

### 4b. Wrap components with React.memo

Components that receive props and render in lists — wrapping prevents re-renders:
- `src/components/Products/ProductCard.tsx`
- `src/components/Cases/CaseVideoPreview.tsx`
- `src/components/Cases/CaseCinematicMobile.tsx`
- `src/components/Cases/CaseLottieScatter.tsx`
- `src/components/Cases/CaseLottieMobile.tsx`

### 4c. Add missing alt text

15 images have `alt=""` — add descriptive alt text for accessibility and SEO:
- YouTube thumbnails → "Video thumbnail"
- Instagram reels → reel title from data
- LinkedIn posts → post excerpt from data
- Arrow icons → `aria-hidden="true"` (decorative)

### 4d. Vite build optimization

Add `vite-plugin-compression` for pre-compressed gzip/brotli output:
```ts
// vite.config.ts
import compression from 'vite-plugin-compression'

plugins: [
  react(),
  tailwindcss(),
  compression({ algorithm: 'gzip' }),
  compression({ algorithm: 'brotliCompress' }),
]
```

---

## Phase 5: .gitignore Hardening

Add rules to block media files in root while allowing public/:
```gitignore
# Block media files in root (use public/ for assets)
/*.png
/*.jpg
/*.jpeg
/*.mp4
/*.lottie
/*.docx
/*.svg
.next/
.DS_Store
```

---

## Execution Strategy

Phases 1-5 can be parallelized across agents:
- **Agent 1:** Phase 1 (junk deletion)
- **Agent 2:** Phase 2 (image conversion + code path updates)
- **Agent 3:** Phase 3 (video tag fixes)
- **Agent 4:** Phase 4a-4c (img dimensions, memo, alt text)
- **Agent 5:** Phase 4d + Phase 5 (Vite config + gitignore)

### Verification

After all phases, run:
- `npm run build` — must succeed with zero errors
- Visual spot-check of each page (no broken images/videos)
- Compare file sizes before/after

### Expected Results

| Metric | Before | After |
|--------|--------|-------|
| Root junk files | 85 files (~90MB) | 0 |
| Image payload (public/) | ~71MB | ~45MB |
| Video tags with preload | 1/9 | 9/9 |
| Images with width/height | 0/32 | 32/32 |
| Memoized list components | 0/5 | 5/5 |
| Build output compressed | No | gzip + brotli |
