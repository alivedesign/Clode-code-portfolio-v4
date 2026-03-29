# Case Study 1 — Mobile Polish Design

## Overview

Five mobile-specific improvements to Case Study 1: spacing, slider start position, timeline with scroll-draw, decisions grid with auto-flip hint, and metrics 2-column grid.

## 1. BackLink — Push Down 24px on Mobile

Add `mt-[24px] md:mt-0` to BackLink. The gap between BackLink and HeroSection remains unchanged since HeroSection has its own `mt-[48px]`.

## 2. Problem Slider — Start on 2nd Image

Add a ref to the images container. On mount, `useEffect` calls `scrollTo({ left: 316, behavior: "instant" })` (300px image + 16px gap) to center the 2nd image. Only runs when container is scrollable (`scrollWidth > clientWidth`).

## 3. Mobile Timeline — Line + Dots with Scroll-Draw

Replace the current stacked cards (`md:hidden` with `reveal-stagger-children`) with a two-column scroll-linked layout:

- **Left column (~40px wide):** Vertical SVG with straight line + dots (10px diameter). Line draws via `useScrollProgress` / `--timeline-progress`, same as desktop. Dots appear when line reaches them.
- **Right column (remaining width):** Cards stacked with `gap-[40px]`. Each card fades in + slides from right (`translateX(30px) → 0`) when its dot's threshold is reached — tied to scroll progress, not Intersection Observer.
- Straight vertical line (no S-curves) for clean mobile appearance.
- Dots vertically centered on each card.

## 4. Decisions Mobile — 2-Column Grid + Auto-Flip Hint

Replace vertical stack with grid layout:
- Row 1: cards 1 and 2 side by side (`grid-cols-2`, `gap-[12px]`)
- Row 2: card 3 centered, same size as cards above

Card sizing: `aspect-square w-full` (no fixed 350px). Rounded corners `16px`. Back-face text scales down: title `14px`, body `12px`, padding `16px`.

Auto-flip hint: On scroll into view (Intersection Observer), 300ms delay, first card flips, holds ~1s, flips back. Fires once (ref-guarded). Uses existing 3D `rotateY` animation.

## 5. Metrics Mobile — 2-Column Grid

Change `grid-cols-1` to `grid-cols-2` on mobile for a 2x2 layout. Gap `12px`. Text scales: value `28px`, label `14px`, padding `16px`.
