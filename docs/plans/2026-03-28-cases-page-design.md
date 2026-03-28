# Cases Page — Design Document

**Date:** 2026-03-28
**Scope:** Cases 1 & 2 only (more cases added later)

## Overview

A new `/cases` page showcasing portfolio case studies. Follows the same shell pattern as Products and Experience (Logo + NavBar + ContactLine). Uses a data-driven architecture with case type variants to support different presentation styles.

**Headline:** "Where Design Thinking Meets AI Engineering"

## Cases

### Case 1: MCP Vibe-Coding System
- **Type:** `video` — autoplay, muted, looping video (like a GIF)
- **Asset:** `case-1-preview.mp4` (1.1MB)
- **Title:** "Designed & engineered a **system + MCP to power vibe-coding** across 3 platforms"
- **Link:** "View Case Study" (non-functional for now)

### Case 2: Figma Token Plugin
- **Type:** `cinematic` — scroll-driven canvas animation (desktop), static fallback (mobile)
- **Assets:**
  - `case-2-character-anim.mp4` (2.2MB) — source for frame extraction
  - `case-2-character.png` (203K) — poster / mobile fallback
  - `case-2-left.png` (68K) — left flanking screenshot
  - `case-2-right.png` (99K) — right flanking screenshot
- **Title:** "How I solved **figma's** legacy **token problem with a custom plugin**"
- **Link:** "View Case Study" (non-functional for now)

## Architecture

### Data Model (`src/data/casesData.ts`)

```ts
type CaseType = "video" | "cinematic";

interface CaseTitleSegment {
  text: string;
  highlighted: boolean; // white vs secondary gray
}

interface CaseData {
  id: string;
  type: CaseType;
  title: CaseTitleSegment[];
  videoSrc?: string;           // "video" type: autoplay loop source
  frameSrc?: string;           // "cinematic" type: video for frame extraction
  posterSrc?: string;          // "cinematic" type: final frame / mobile fallback
  sideImages?: [string, string]; // "cinematic" type: left + right images
}
```

### Component Structure

```
src/
  pages/Cases.tsx                      — page shell
  components/Cases/
    index.ts                           — barrel export
    CaseSection.tsx                    — switch on type → correct component
    CaseVideoPreview.tsx               — autoplay loop video (Case 1)
    CaseCinematicScroll.tsx            — sticky canvas scrub (Case 2, desktop)
    CaseCinematicMobile.tsx            — static fallback (Case 2, mobile)
    CaseTitle.tsx                      — shared title renderer
  hooks/
    useScrollProgress.ts               — returns 0→1 for sticky scroll position
    useVideoFrames.ts                  — extracts video frames to ImageBitmap array
```

### Routing

- `App.tsx`: Add lazy import + route for `/cases`
- `NavBar.tsx`: Update Cases nav item path from `"/"` to `"/cases"`

## Case 1: Video Preview (CaseVideoPreview)

Simple component:
- Container max-width 1120px, centered
- `<video autoPlay muted loop playsInline>` — no controls
- Below: CaseTitle + "View Case Study"
- Fade-in animation on mount (`experience-fade-up`)

## Case 2: Cinematic Scroll (Desktop)

### Container
```
<div style={{ height: "300vh" }}>        ← scroll runway
  <div className="sticky top-0 h-screen"> ← pinned viewport
    <canvas />                            ← frame-by-frame character
    <img left />                          ← slides in from left
    <img right />                         ← slides in from right
    <CaseTitle />                         ← fades up
  </div>
</div>
```

### Scroll Timeline (0% → 100%)
| Range | Event |
|-------|-------|
| 0–80% | Canvas scrubs through character frames |
| 70–90% | Left + right images fade in and slide inward |
| 80–100% | Title fades up, character holds final frame |

### Frame Extraction (`useVideoFrames`)
- Loads video into offscreen `<video>` element
- Seeks frame by frame, draws to offscreen canvas
- Stores as ImageBitmap array (~33 frames, sampling every other frame)
- Shows `case-2-character.png` as placeholder while loading

### Scroll Tracking (`useScrollProgress`)
- Takes a ref to the scroll runway container
- Returns 0→1 based on scroll position within that container
- Uses `requestAnimationFrame` + passive scroll listener

## Case 2: Mobile Fallback (CaseCinematicMobile)

- No canvas, no sticky, no scroll-driven animation
- Static `case-2-character.png` centered (300px)
- Flanking images side by side below
- CaseTitle below images
- Simple fade-in animation

## Asset Renaming

Files need to be copied from project root to public/:
| Source | Destination |
|--------|------------|
| `case 1 preview.mp4` | `public/videos/case-1-preview.mp4` |
| `case 2 character anim.mp4` | `public/videos/case-2-character-anim.mp4` |
| `case 2 character.png` | `public/images/cases/case-2-character.png` |
| `case 2_1 preview.png` | `public/images/cases/case-2-left.png` |
| `case 2_2 preview.png` | `public/images/cases/case-2-right.png` |

## Styling

- Follows existing design system: TN font for titles, SF Pro for body
- Colors: white for highlighted title text, `--color-text-secondary` for rest, `--color-accent` for links
- Glass navbar with frost visible (page has content to blur against)
- Same page padding pattern as Products: `px-5 md:px-10 pt-[104px] pb-[140px] md:pb-[272px]`

## Parallelization Plan

| Phase | Agent | Files |
|-------|-------|-------|
| 1 (parallel) | Agent 1 | `casesData.ts`, `CaseTitle.tsx` |
| 1 (parallel) | Agent 2 | `useScrollProgress.ts`, `useVideoFrames.ts` |
| 2 (parallel) | Agent 3 | `CaseVideoPreview.tsx` |
| 2 (parallel) | Agent 4 | `CaseCinematicScroll.tsx`, `CaseCinematicMobile.tsx` |
| 3 | Agent 5 | `Cases.tsx`, `CaseSection.tsx`, `index.ts`, routing, NavBar update |
| 4 | Review | Asset copying, visual verification |
