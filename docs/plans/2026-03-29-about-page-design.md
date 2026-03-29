# About Page — Design Document

**Date:** 2026-03-29
**Status:** Approved

## Overview

Personal About page for Evgeny Shkuratov's portfolio. Long-scroll page with alternating text sections and asymmetric photo grids. Dark background, serif headlines, body text with white keyword highlights.

## Architecture

- **Approach:** CSS Grid for desktop photo layouts + Embla Carousel for mobile sliders
- **Route:** `/about` (lazy-loaded in App.tsx)
- **Page file:** `src/pages/About.tsx`
- **Data file:** `src/data/aboutData.ts`
- **Images:** `public/images/about/about-1.jpg` through `about-9.jpg`

## Page Structure

### Shell
- Same wrapper as other pages: `min-h-screen min-h-dvh bg-black`
- `<Logo visible />`, `<NavBar visible />`, `<ContactLine visible />`
- `document.title = "About — Shkuratov Designer"`
- Padding: `pt-[104px] pb-[164px] md:pb-[320px] px-5 md:px-10`
- Content centered with flex column + items-center

### Section 1 — Hero
- Centered text, max-width ~1107px
- **Headline:** TN SemiLight, 48px desktop / 28px mobile, centered
  - White text for key value phrases, `text-secondary` (#999899) for supporting text
  - Content: "I value honesty, courage, and ambition [white] to build truly inspiring products for good. [gray] Environmental projects, healthcare, edtech, [white] and anything that helps make the world a better place will always have higher priority for me! [gray]"
- **Subtitle:** SF Pro Text 18px, text-secondary with white highlights, max-width ~655px
  - "I'm the ideal partner for companies building [white] tech for good, AI innovations, and impactful real-world solutions [/white]"
- Fade-up entrance animation

### Section 2 — Photo Grid 1 (3 photos)
- **Desktop:** CSS Grid, gap 48px, two columns
  - Top-left: about-1.jpg (landscape ~420×340)
  - Right: about-2.jpg (tall portrait ~427×634, spans full height)
  - Bottom-left: about-3.jpg (medium ~419×466)
- **Mobile:** Embla Carousel, horizontal swipe, rounded images
- Scroll-reveal via useInView

### Section 3 — Text Block 1
- Centered, max-width ~640px, SF Pro Text 18px
- Gray text with white highlights:
  - "As a [white]designer who's built and shipped my own products,[/white] I understand the pressure to move fast without wasting time on the wrong thing. From discovery to high-fidelity UI in production, [white]I focus on what users need, not what sounds cool[/white]"
- Scroll-reveal

### Section 4 — Photo Grid 2 (3 photos)
- **Desktop:** CSS Grid, gap 48px, two columns
  - Left: about-4.jpg (tall ~427×569)
  - Top-right: about-5.jpg (landscape ~380×295)
  - Bottom-right: about-6.jpg (square-ish ~380×377)
- **Mobile:** Embla Carousel
- Scroll-reveal

### Section 5 — Text Block 2
- Centered, max-width ~670px, SF Pro Text 18px
- Gray with white highlights about active lifestyle and snowboarding
- Scroll-reveal

### Section 6 — Photo Grid 3 (3 photos)
- **Desktop:** CSS Grid, gap 48px, two columns
  - Top-left: about-7.jpg (landscape ~380×350)
  - Bottom-left: about-8.jpg (landscape ~380×295)
  - Right: about-9.jpg (tall ~427×569)
- **Mobile:** Embla Carousel
- Scroll-reveal

### Section 7 — Text Block 3
- Two paragraphs, centered, max-width ~640px
- Paragraph 1: Content creation with **YouTube** (#b2b9f9 link) and **LinkedIn** (#b2b9f9 link)
- Paragraph 2: Helping founders, kaomoji ending (＾▽＾)
- Scroll-reveal

## Photo Grid Layouts (CSS Grid specs)

### Grid 1
```
grid-template-columns: 420fr 427fr
grid-template-rows: 340px 466px
```
- Image 1: col 1, row 1
- Image 2: col 2, row 1 / span 2 (tall, full height)
- Image 3: col 1, row 2

### Grid 2
```
grid-template-columns: 427fr 380fr
grid-template-rows: 295px 274px (569 total left)
```
- Image 4: col 1, row 1 / span 2 (tall, full height)
- Image 5: col 2, row 1
- Image 6: col 2, row 2

### Grid 3
```
grid-template-columns: 380fr 427fr
grid-template-rows: 350px 295px
```
- Image 7: col 1, row 1
- Image 8: col 1, row 2
- Image 9: col 2, row 1 / span 2 (tall, full height)

## Responsive Behavior

| Element | Desktop | Mobile |
|---------|---------|--------|
| Headline | 48px TN SemiLight | 28px |
| Subtitle | 18px, max-w-655px | 16px, full width |
| Photo grids | CSS Grid asymmetric | Embla Carousel, full-width |
| Text blocks | max-w-640px centered | full width, px-5 |
| Section gap | ~96px | ~48px |
| Carousel | N/A | rounded-12px images, peek next slide |

## Animation

- Hero: `experience-fade-up` entrance animation
- All sections below hero: `experience-scroll-reveal` + `useInView(0.2)`
- Consistent with Experience page pattern

## Data Structure (aboutData.ts)

```typescript
export interface AboutPhoto {
  src: string;
  alt: string;
}

export const ABOUT_HEADLINE_WHITE_1 = "I value honesty, courage, and ambition";
export const ABOUT_HEADLINE_GRAY_1 = "to build truly inspiring products for good.";
// ... etc

export const ABOUT_PHOTOS_GRID_1: AboutPhoto[] = [...]
export const ABOUT_PHOTOS_GRID_2: AboutPhoto[] = [...]
export const ABOUT_PHOTOS_GRID_3: AboutPhoto[] = [...]

export const YOUTUBE_URL = "https://youtube.com/...";
export const LINKEDIN_URL = "https://linkedin.com/in/...";
```

## Images

9 photos exported from Figma to `public/images/about/`:
- about-1.jpg through about-9.jpg
- All rounded-[12px], object-cover
- loading="lazy" on all images

## Links

- YouTube link color: #b2b9f9
- LinkedIn link color: #b2b9f9
- Both open in new tab (target="_blank" rel="noopener noreferrer")
