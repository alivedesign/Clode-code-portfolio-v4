# Instagram Section Redesign — Embla Carousel with Self-Hosted Covers

**Date:** 2026-03-28
**Status:** Approved

## Problem

The current Instagram section uses Instagram's `embed.js` which renders white-background iframes with Instagram chrome. This clashes with the dark portfolio design. The "slider" is just native `overflow-x-auto` with no navigation controls.

## Solution

Replace Instagram embeds with self-hosted cover images in an Embla Carousel. Cards link out to Instagram Reels on click.

## Design Details

### Cards
- Self-hosted cover images in `public/images/content/ig-*.jpg` (9:16 ratio)
- Each card: 300px wide x 533px tall, `rounded-[24px]`, `object-cover`
- Wrapped in `<a href="instagram.com/reel/{id}/" target="_blank">`
- Gap: 40px (desktop), 20px (mobile)
- Cards overflow the 1280px container — this is the slider area

### Slider Behavior
- **Desktop:** Drag to scroll + left/right arrow buttons at edges
- **Mobile:** Touch swipe, no arrows
- Free-scroll mode (not snapping to one card)
- No dots/pagination
- Container: `overflow: hidden` (Embla handles scrolling)

### Navigation Arrows (Desktop Only)
- Positioned at left/right edges, vertically centered
- Semi-transparent, matching `--color-text-secondary`
- Hidden when at start/end (no more slides in that direction)

### Data Structure
Replace `INSTAGRAM_REELS: string[]` with:
```ts
{ reelId: string; cover: string; title?: string }[]
```

### Removals
- `useInstagramEmbed` hook
- `InstagramCard` blockquote component
- Instagram `embed.js` script loading

### New Dependency
- `embla-carousel-react` (~7KB gzipped)

## Approach Chosen
Embla Carousel over CSS scroll-snap (no desktop controls) and Swiper.js (45KB, opinionated CSS).
