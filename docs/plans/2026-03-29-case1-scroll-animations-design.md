# Case Study 1 — Scroll Animations & Spacing Polish

## Overview

Add scroll-linked timeline drawing animation and upgraded section entrance animations to Case Study 1. Also increase spacing between BackLink and first section by 32px.

## 1. Spacing Fix

Add `mb-[32px]` to the `BackLink` component to increase the gap between the "Back to cases" link and the HeroSection title.

## 2. Scroll-Linked Timeline (Desktop)

### Hook: `useScrollProgress`

- Takes a ref to the timeline container
- On each `scroll` event (via `requestAnimationFrame` throttle), calculates `progress` (0-1) based on how far the container has scrolled through the viewport
- Sets `--timeline-progress` CSS custom property on the container element
- Progress starts when the container top enters the bottom of the viewport, ends when the container bottom reaches the top of the viewport

### Single SVG Path

Replace the current 5 separate S-curve SVGs + 6 circle dots with a single tall SVG overlay spanning the full 1389px timeline height. The SVG contains:

- One continuous path connecting all 6 dot positions via straight + S-curve segments
- 6 circle elements at each dot position
- Line drawn via `stroke-dasharray` / `stroke-dashoffset`, driven by `--timeline-progress`
- Each dot gets `opacity: 1` when progress reaches its proportional Y position

### Content Reveal Thresholds

Each timeline step has a threshold proportional to its dot's Y position within the 1389px container:

| Step | Dot Y | Threshold |
|------|-------|-----------|
| 1 | 79 | ~0.06 |
| 2 | 322 | ~0.23 |
| 3 | 565 | ~0.41 |
| 4 | 808 | ~0.58 |
| 5 | 1051 | ~0.76 |
| 6 | 1294 | ~0.93 |

When `--timeline-progress` crosses a step's threshold:
- Card fades in + slides from its side (left cards from left, right from right)
- Text label fades in
- Videos inside cards begin playing

### Mobile

No scroll-linked line on mobile (no line exists). Cards use the upgraded staggered fade-in from Section 3.

## 3. Upgraded Section Animations

### New CSS Classes

| Class | Effect | Duration |
|-------|--------|----------|
| `.reveal-fade-up` | opacity 0→1, translateY(30px→0) | 700ms ease-out |
| `.reveal-blur` | opacity 0→1, translateY(20px→0), blur(8px→0) | 800ms ease-out |
| `.reveal-stagger-children` | applies reveal-fade-up to children with 80ms incremental delay | 700ms each |
| `.reveal-scale` | opacity 0→1, scale(0.95→1) | 700ms ease-out |

All classes activate on `.visible` (same Intersection Observer pattern).

### Per-Section Mapping

| Section | Element | Animation |
|---------|---------|-----------|
| Hero | title + subtitle | `reveal-fade-up` |
| Hero | image | `reveal-blur` |
| Problem | label + heading | `reveal-fade-up` |
| Problem | images row | `reveal-stagger-children` |
| Problem | text points | `reveal-stagger-children` |
| Decisions | title | `reveal-fade-up` |
| Decisions | arrows | `reveal-fade-up`, 200ms delay |
| Decisions | cards | `reveal-scale` with stagger |
| Video | YouTube player | `reveal-blur` |
| Video | tabs | `reveal-stagger-children` |
| Metrics | quote | `reveal-fade-up` |
| Metrics | cards | `reveal-stagger-children` + `reveal-blur` |

### Trigger

Same `useInView` hook. Parent section gets a single ref; child elements use CSS transition-delay for stagger timing.

### Reduced Motion

All animations respect `prefers-reduced-motion: reduce` — elements appear instantly with no motion.
