# Timeline Scroll Speed Fix — Case Study 1

**Date:** 2026-03-31
**Status:** Approved

## Problem

The timeline section in Case Study 1 animates too slowly. Steps appear late because `useScrollProgress` maps progress 0-1 across the entire travel distance (viewport height + container height = ~2400px). The last step ("Full team adoption") only appears when the section is already scrolling off screen.

## Solution: Remap progress range

Add configurable `startOffset` and `endOffset` params to `useScrollProgress` to compress the 0-1 animation into a tighter scroll window.

### Changes

1. **`useScrollProgress.ts`** — accept optional `{ startOffset, endOffset }` config:
   - `startOffset` (default 1.0): fraction of viewport height where progress=0 (container top position relative to viewport bottom)
   - `endOffset` (default 0.0): fraction of viewport height where progress=1 (container top position relative to viewport top)
   - Compresses animation into the visible portion of scroll

2. **`CaseStudy1.tsx`** — pass new params:
   - Desktop: `useScrollProgress({ startOffset: 0.85, endOffset: 0.4 })`
   - Mobile: `useScrollProgress({ startOffset: 0.9, endOffset: 0.35 })`

3. **No changes to thresholds** — `STEP_THRESHOLDS` and `MOBILE_THRESHOLDS` stay the same; they map against the compressed range naturally.

### What stays the same

- SVG path drawing, dot reveals, card animations
- Transition durations
- No changes to other sections or pages
