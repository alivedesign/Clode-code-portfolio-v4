# Portfolio v5 — Design Document

**Date:** 2026-03-24
**Branch:** v5
**Status:** Approved

## Overview

Complete portfolio redesign from terminal-style UI (v4) to a 3D character-driven experience. Centered around an animated character in an orange hoodie with seamless pose transitions triggered by navigation hover, a liquid glass navigation bar, and a dark cinematic aesthetic.

## Tech Stack

- **Vite 6** + **React 19** + **TypeScript**
- **Tailwind CSS 4** (CSS-first config)
- **React Router 7** (for future pages)
- No animation library — CSS transitions + native `<video>` API
- No SSR — static site, deployed to same domain as v4

## Architecture

### Project Structure

```
src/
├── components/
│   ├── Character/
│   │   ├── Character.tsx          # Main orchestrator
│   │   ├── VideoPlayer.tsx        # Single <video> with preloading
│   │   └── useCharacterState.ts   # State machine for poses
│   ├── NavBar/
│   │   ├── NavBar.tsx             # Glass bar container
│   │   ├── NavItem.tsx            # Individual nav link
│   │   └── LiquidGlass.tsx        # SVG filter + backdrop
│   ├── Hero/
│   │   ├── HeroText.tsx           # Right-side intro text
│   │   └── Logo.tsx               # "Shkuratov Designer" top-left
│   └── Layout/
│       └── MainLayout.tsx         # Page shell
├── assets/
│   └── videos/                    # All MP4 files
├── hooks/
│   ├── useVideoPreloader.ts       # Preloads all MP4s on mount
│   └── useMediaQuery.ts           # Mobile detection
├── styles/
│   └── index.css                  # Tailwind + liquid glass keyframes
├── pages/
│   └── Home.tsx                   # Main page composition
├── App.tsx
└── main.tsx
```

## Character Video System

### State Machine

```
[page load] → REVEAL (plays once) → IDLE (loops)
                                       ↕
                              [hover nav item]
                                       ↓
                           TRANSITION_OUT (plays once)
                                       ↓
                              POSE (loops while hovering)
                                       ↓
                              [hover leaves]
                                       ↓
                           TRANSITION_IN (plays once)
                                       ↓
                                IDLE (loops)
```

### Video Inventory (8+ files)

1. `reveal.mp4` — character entrance (plays once on page load)
2. `idle.mp4` — default breathing/subtle motion (loops)
3. `pose-experience.mp4` — hover state for Experience
4. `pose-products.mp4` — hover state for Products
5. `pose-cases.mp4` — hover state for Cases
6. `pose-content.mp4` — hover state for Content
7. `pose-about.mp4` — hover state for About
8. `pose-resume.mp4` — hover state for Resume
9. `transition.mp4` — generic transition between states

### Preloading Strategy

- On page load: preload `reveal.mp4` + `idle.mp4` immediately (critical path)
- After reveal plays: preload all pose videos in background
- Two `<video>` elements stacked via CSS (front + back) — crossfade between them by swapping opacity and z-index
- Transition videos play on a third layer when transitioning between poses

### Mobile Handling

- `muted playsinline` attributes for autoplay
- Static poster frame (WebP) shown until video loads on slow connections
- Reduced to 3-4 states on mobile to save bandwidth

## Liquid Glass Navigation Bar

### Three Visual Layers (bottom to top)

1. **Backdrop blur** — `backdrop-filter: blur(12px)` on the bar container
2. **SVG displacement filter** — `feDisplacementMap` from reference component creates liquid glass refraction
3. **Nav items** — text on top, unfiltered, crisp

### Specifications

- Fixed to bottom of viewport, centered horizontally
- 64px border-radius (pill shape)
- `rgba(255,255,255,0.1)` background
- ~40px from bottom edge
- Hover: text brightens + `scaleToggle` animation + triggers character pose change

## Page Layout

### Desktop (1200+)

- Full viewport, no scroll
- Character: 550px, centered with slight left offset
- Hero text: right of character
- Nav bar: bottom center
- Logo: top-left
- Contact line: below nav bar

### Entry Sequence (page load)

1. Black screen (0ms)
2. Logo fades in (200ms)
3. Character reveal video plays (300ms)
4. Hero text fades in, staggered line by line (after reveal)
5. Nav bar slides up from bottom (200ms after text)
6. Contact line fades in (last)

Total: ~2-3 seconds

### Responsive Breakpoints

| Element | Desktop (1200+) | Tablet (768-1199) | Mobile (<768) |
|---|---|---|---|
| Character | 550px centered | 400px centered | 300px centered |
| Hero text | Right of character | Below character | Below character |
| Nav bar | Bottom, 6 items | Bottom, 6 items | Bottom, scrollable or 2 rows |
| Logo | Top-left | Top-left | Top-left, smaller |
| Contact | Below nav | Below nav | Hidden or in About |

## Typography

- **Nav items:** Times Now SemiLight, 24px
- **Body text:** SF Pro Display Regular, 18px
- **Logo:** SF Pro Display Medium, 16px
- **Font loading:** `@font-face` with `font-display: swap`, preload critical weights

## Performance Targets

- **FCP:** < 1.0s
- **LCP:** < 2.5s
- **Page weight:** < 5MB initial
- **JS bundle:** < 80KB gzipped
- **Zero layout shift**

### Video Encoding

- H.264, `yuv420p`, `-crf 23`
- 720px max width
- WebP poster frames
- WebM fallback via `<source>`

## What's Excluded (YAGNI)

- No scrolling on main page
- No dark/light theme toggle (always dark)
- No terminal/command input UI
- No falling avatars easter eggs
- No Framer Motion
- No state management library
- No CSS-in-JS

## Accessibility

- `prefers-reduced-motion`: skip reveal, show static poster, disable distortion
- Nav items are `<a>` tags with focus states
- Video elements are decorative (`aria-hidden="true"`)
- Keyboard navigation through nav bar

## Design Reference

- **Figma:** https://www.figma.com/design/dSI1pm4HMGi3gvtucXsuq4/Portfolio-v4.2?node-id=4021-4480
- **Character reveal video:** `/Users/shkuratovdesigner/Desktop/Projects/portfolio materials/hf_20260313_101353_96177853-f3a8-441e-92bd-09d49f74df8f.mp4`
- **Glass effect reference:** Apple Liquid Glass Switcher component (SVG feDisplacementMap)
