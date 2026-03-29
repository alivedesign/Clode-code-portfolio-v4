# Case Study 1 — Design Document

**Date:** 2026-03-29
**Page:** "From Figma Chaos to AI-Powered Design Infrastructure"
**Route:** `/cases/mcp-vibe-coding`

## Overview

First case study page for the portfolio. Long-scroll single page with 7 content sections, scroll-triggered reveal animations, embedded YouTube video, autoplay video loops, and interactive hover-to-card flip on the "3 decisions" section.

## Approach

Single-page component (`CaseStudy1.tsx`) following existing page patterns (Experience.tsx, About.tsx). No generic template — each future case study will have its own layout. Data lives in `src/data/caseStudy1Data.ts`.

## Sections

### 1. Header
- "Back to cases" link with left chevron SVG, centered at `top-[40px]`
- Links to `/cases` via react-router `<Link>`
- Standard `<Logo visible />`

### 2. Hero
- Title: "From figma chaos to AI-powered design infrastructure"
  - `font-['TN'] font-extralight text-[48px] leading-[1.2] tracking-[-0.48px]`
  - Max-width ~655px, centered
- Subtitle: "How I architected a cross-platform design system with MCP servers that **cut feature development time by ≈35%** across iOS, Android, and Web"
  - Mixed `text-secondary` + `text-white` for bold segment
  - `font-sf text-[18px] leading-[1.4]`
- Hero image: isometric city illustration
  - Aspect ratio 2752:1536, full container width (~882px)
  - Export from Figma as WebP

### 3. The Problem
- Label: "The Problem" in accent color (`text-accent`)
- Heading: "7+ Designers, 3 Platforms, 0 Consistency"
  - Same TN font styling as hero title
- 3 images: full-width row, equal height ~363px, `rounded-[20px]`, `gap-[40px]`
  - Export from Figma
- 3 text blocks: centered, max-width ~566px, `gap-[48px]`
  - Each: bold white lead sentence + secondary body text
  - `font-sf text-[18px] leading-[1.4]`

### 4. Timeline
Zigzag layout with vertical center line, dots, and curved SVG connectors.

| # | Label | Side | Media |
|---|-------|------|-------|
| 1 | Initial observation / problem identification | Left text, right image | Figma PNG |
| 2 | Solution design / architecture planning | Right text, left image | `research.mp4` (from main branch) |
| 3 | Internal pitch to leadership | Left text, right image | Figma PNG |
| 4 | Approval + budget secured | Right text, left image | `gif 2 for case.mp4` |
| 5 | First implementation | Left text, right image | `Gif 3 for case 1.mp4` |
| 6 | Full team adoption | Right text, left image | Figma PNG |

- Image/video cards: 327×174px, `rounded-[16px]`
- Dots: 15×15px circles on center line
- Curved connectors: SVG paths between dots
- Video items: `autoPlay muted loop playsInline`, `rounded-[16px]`
- Layout: ~781px wide container, center line at ~383px from left

### 5. 3 Decisions That Changed Everything
- Title: centered, TN font, `text-[48px]`
- Decorative curved arrows (SVG) pointing from title to each image
- 3 images in staggered layout per Figma:
  - Left: `top-[187px]`, 350×350px, `rounded-[32px]`
  - Center: `top-[354px]`, centered, 350×350px, `rounded-[32px]`
  - Right: `top-[187px]`, 350×350px, `rounded-[32px]`
- **Hover interaction:** smooth crossfade (opacity, ~300ms ease) from image to dark text card
  - Card bg: `#1e242a`, `rounded-[32px]`, same dimensions
  - Card 1: "One repository. Three platforms. Automatic sync every 6 hours..."
  - Card 2: "Figma prototypes approximate. Code prototypes specify..."
  - Card 3: "4 MCP servers. 15 tools. The entire design system queryable by AI..."
  - Text: `font-sf text-[18px] leading-[1.4]`, white, padded `left-[30px] top-[50px]` area
- Mobile: tap to toggle

### 6. How It All Connects
- YouTube embed: `youtube.com/watch?v=UYrKmNq_fS4`
  - Facade pattern (thumbnail + play button → iframe on click)
  - Same implementation as Experience page
  - Container: `rounded-[32px]`, `overflow-hidden`, glass border `bg-[rgba(255,255,255,0.1)]`
  - Aspect ratio from Figma: ~966×558px
- 3 label cards below: flex row, equal width, `gap-[24px]`
  - "Automated legacy figma sync"
  - "Cross-Platform component galleries"
  - "MCP server architecture"
  - Cards: `bg-black` (var --colors/background), `rounded-[12px]`, `py-[16px] px-[8px]`
  - Text: `font-sf text-[18px] text-secondary text-center`

### 7. Metrics
- Quote: "The system is still compounding. As the team gets more native with the infrastructure, every metric continues to improve."
  - TN font, `text-[48px]`, centered, max-width ~966px
- 4 white cards in 2×2 grid: `gap-[48px]`, max-width ~1280px
  - Card: `bg-white`, `rounded-[20px]`, `pt-[24px] pb-[30px] px-[32px]`, width ~616px
  - Number: TN font `text-[48px]`, dark text `#222`, `tracking-[-0.48px]`
  - Description: `font-sf text-[18px]`, gray `#6a6a6a`
  - Stats:
    - ≈35% faster — Feature development speed
    - ≈50% less time — Handoff meetings with QA/BA
    - ≈85% — Features shipped through pipeline
    - ≈25% more — Overall feature output

### 8. Footer
- `<NavBar visible />`
- `<ContactLine visible />`

## Routing Changes
- Add `Route path="/cases/mcp-vibe-coding"` in App.tsx (lazy loaded)
- Update `CaseTitle.tsx`: wrap "View Case Study" in `<Link to={/cases/${caseData.id}}>`
- Only case 1 linked for now

## Asset Pipeline
- Export from Figma → `public/images/cases/case-1/`:
  - `hero.webp` — isometric city (2752×1536 aspect)
  - `problem-1.webp`, `problem-2.webp`, `problem-3.webp` — 3 problem images
  - `timeline-1.webp` — Initial observation
  - `timeline-3.webp` — Internal pitch
  - `timeline-6.webp` — Full team adoption
  - `decision-1.webp`, `decision-2.webp`, `decision-3.webp` — 3 decision images
- Checkout from main branch:
  - `public/videos/bloggingmachine-case/research.mp4` + `.webm` + poster
- Move and rename from project root:
  - `gif 2 for case.mp4` → `public/videos/case-1-approval.mp4`
  - `Gif 3 for case 1.mp4` → `public/videos/case-1-implementation.mp4`
- SVG decorative elements (arrows, connector lines, dots) — inline SVG in component

## Mobile Responsiveness
- Timeline: vertical stack (image above, text below), no zigzag
- Problem images: horizontal scroll or vertical stack
- Decision cards: tap to toggle instead of hover
- Metrics: single column stack
- Hero image: full-width with padding
- All text sizes scale down (48→28px headings, 18→16px body)

## Animations
- All sections: `useInView` scroll-triggered fade-up reveal
- Decision cards: opacity crossfade on hover/tap (~300ms ease)
- Staggered metric card reveals
- Back link: subtle hover opacity change
