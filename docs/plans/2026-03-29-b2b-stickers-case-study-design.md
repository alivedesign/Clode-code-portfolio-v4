# Case Study 3 — B2B Messenger Stickers: Design Document

## Overview

New case study page at `/cases/stickers` showcasing animated sticker design work for a B2B messenger. Page follows the same architecture and reveal patterns as CaseStudy1 and CaseStudy2.

## Route & Files

- **Route:** `/cases/stickers` — lazy-loaded in `App.tsx`
- **Page:** `src/pages/CaseStudy3.tsx`
- **Data:** `src/data/caseStudy3Data.ts`
- **Assets:** Phone mockups exported from Figma, sticker Lotties from `devil/`, `cat/`, `turkey/` folders (moved to `public/`)

## Page Sections

### 1. Back to Cases Link
- Chevron + "Back to cases" text, links to `/cases`
- Same pattern as CaseStudy1 and CaseStudy2
- Centered at top, `top-[40px]`

### 2. Hero Section
- **Title:** `font-['TN'] font-[350] text-[48px]` centered, max-width 808px
  - "I helped 100,000+ teams communicate 50% more efficiently by designing conversational experiences that feel human, not robotic."
- **Subtitle:** `font-sf text-[18px] text-text-secondary` centered
  - NDA disclaimer
- **Phone mockups:** Two side-by-side with 56px gap below text
  - White border `border-[8px] border-white/10`, `rounded-[37px]`
  - Container ~757px wide, each phone ~300px
  - Static images exported from Figma

**Mobile:** Title `text-[28px]`, px-5 padding, phones shrink proportionally.

### 3. Stickers Section
- **Accent label:** `font-sf text-[18px] text-accent` centered — "Animated stickers, emojis, and GIFs"
- **Big quote:** `font-['TN'] font-[350] text-[48px]` centered, max-width 1104px
  - Interview findings about 89% text-only messages
- **Description:** `font-sf text-[16px]` centered, max-width 731px
  - Mixed white/gray text about animation not being decoration
- **Sticker grid (desktop):**
  - Container width: 1258px
  - 3 rows × 5 stickers, flexbox `gap-[32px]`
  - Each sticker: 226×226px container, `overflow: hidden`
  - Row 1 = `devil/` (5 .lottie files)
  - Row 2 = `cat/` (5 .lottie files)
  - Row 3 = `turkey/` (5 .lottie files)

**Sticker animation:**
- Uses existing `DotLottieCanvas` component
- All 5 in a row start simultaneously when row enters viewport
- Loop forever
- Pause when row scrolls out of viewport (performance optimization)

**Mobile:**
- Each row → horizontal free-scroll strip
- Stickers ~160px
- `overflow-x: auto`, `scrollbar-hide`, no snap
- 3 strips stacked vertically with gap

### 4. Feature Cards
- **Desktop:** 6 white cards in 2-column flex-wrap, `gap-[32px_24px]`
  - Container width: 1256px centered
  - Each card: `bg-white rounded-[20px] px-[32px] py-[24px]`, width ~616px
  - Text: `font-['TN'] font-[350] text-[40px] text-[#222] tracking-[-0.4px]`
  - Cards: Global and chat search, Scheduled messages, Context menu, Reactions, Voice messages, Voice and video transcription
- **Reveal:** `reveal-fade-up` with stagger

**Mobile:** Full-width single column, text `text-[28px]`.

### 5. Summary Text
- **Desktop:** Two paragraphs, `font-['TN'] font-[350] text-[48px]` centered, max-width 1003px
  - 56px gap between paragraphs
  - Mixed coloring: gray `#999899` for context, white for key phrases
- **Reveal:** `reveal-fade-up`

**Mobile:** Text `text-[28px]`, px-5 padding.

### 6. NavBar + ContactLine + Logo
- Mandatory on every page per CLAUDE.md
- Same pattern as all other pages

## Listing Page Change

- Add `link: "/cases/stickers"` to third case in `casesData.ts`
- `CaseTitle` component already handles hover underline via the `link` prop — no component changes needed

## Performance Strategy

**Problem:** 15 Lottie animations (some up to 114KB) could cause jank.

**Solution:** Canvas-based Lottie with viewport-gated play/pause:
- Use existing `DotLottieCanvas` component (renders to `<canvas>`)
- `IntersectionObserver` per row: start animation on enter, pause on exit
- At most ~5-10 Lotties animate at any given time
- Cat stickers are heaviest (~47-114KB) but still small for canvas rendering

## Sticker Assets

### devil/ (Row 1)
| File | Size |
|------|------|
| Angry Character.lottie | 25KB |
| Devil Contract.lottie | 21KB |
| Devil Crying.lottie | 9KB |
| Devil Dance.lottie | 12KB |
| Devil Girl.lottie | 8KB |

### cat/ (Row 2)
| File | Size |
|------|------|
| Banana cat.lottie | 60KB |
| Burger cat.lottie | 114KB |
| Cappuccino cat.lottie | 69KB |
| Jelly cat.lottie | 47KB |
| Noodles cat.lottie | 52KB |

### turkey/ (Row 3)
| File | Size |
|------|------|
| Angry.lottie | 16KB |
| Dead Turkey.lottie | 9KB |
| Thanksgiving Cart.lottie | 8KB |
| Thanksgiving Invitation.lottie | 12KB |
| Turkey Crown.lottie | 7KB |

## Design Tokens (from Figma)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | `#000000` | Page bg |
| `--color-text` | `#ffffff` | Primary text |
| `--color-text-secondary` | `#999899` | Muted text, gray spans |
| `--color-accent` | `#d77757` | Label, links |
| `--color-dark-text` | `#222` | Feature card text |
| Card bg | `#ffffff` | Feature cards |
| Card border-radius | `20px` | Feature cards |
| Phone border | `8px solid rgba(255,255,255,0.1)` | Mockups |
| Phone border-radius | `37px` | Mockups |
