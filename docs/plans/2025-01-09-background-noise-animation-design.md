# Background Noise Animation Design

**Date:** 2025-01-09
**Status:** Approved

## Overview

Add a subtle, animated grain overlay to all pages to add depth and texture to the background without being distracting.

## Requirements

- Minimal grain overlay (barely noticeable)
- Animated with slow shifting movement
- Applied to all pages globally
- Performant and GPU-accelerated
- Respects user accessibility preferences (reduced motion)

## Design Decisions

### Style: Minimal Grain Overlay
Very subtle texture that's barely noticeable, just adds depth. Avoids heavy film grain or digital static aesthetics.

### Animation: Slow Shift
Grain pattern slowly shifts/moves, creating subtle movement over 45 seconds.

### Implementation: CSS + SVG Filter
Using SVG filter with CSS animation for optimal performance and simplicity.

## Architecture

### Components

1. **SVG Filter Definition** (in layout.tsx)
   - Hidden inline SVG with noise filter
   - Uses `<feTurbulence>` for fractal noise generation
   - `<feColorMatrix>` to convert to grayscale grain
   - Parameters:
     - `baseFrequency`: 0.7-0.9 (controls grain size)
     - `numOctaves`: 1-2 (controls complexity)
     - `seed`: Random value for pattern variation

2. **CSS Pseudo-element** (in globals.css)
   - `body::before` covers full viewport
   - Fixed positioning to stay in place during scroll
   - References SVG filter via `filter: url(#noise)`
   - Very low opacity (3%) for subtle effect
   - `pointer-events: none` to not interfere with interactions
   - High z-index (9999) to sit above content

3. **CSS Animation**
   - 45-second infinite loop
   - Slow translate in X/Y directions
   - Subtle scale changes (98%-102%)
   - GPU-accelerated with `will-change: transform`

## Implementation Plan

### File Changes

**app/layout.tsx:**
- Add hidden SVG filter definition inside `<body>` before `{children}`
- SVG positioned absolutely with 0 dimensions
- Contains noise filter with ID "noise"

**app/globals.css:**
- Add `body::before` with noise overlay styles
- Add `@keyframes noise-shift` animation
- Wrap animation in `@media (prefers-reduced-motion: reduce)` check

### Code Snippets

```css
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: url(#noise);
  opacity: 0.03;
  pointer-events: none;
  z-index: 9999;
  animation: noise-shift 45s infinite ease-in-out;
}

@keyframes noise-shift {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(5%, -3%) scale(1.02); }
  66% { transform: translate(-3%, 5%) scale(0.98); }
}
```

## Accessibility

- Animation disabled for users with `prefers-reduced-motion: reduce`
- `pointer-events: none` ensures no interaction interference
- Low opacity ensures no visual accessibility issues

## Performance Considerations

- GPU-accelerated transforms
- No JavaScript required
- SVG filter cached by browser
- `will-change: transform` hint for optimization
- Fixed positioning avoids repaints during scroll

## Testing Checklist

- [ ] Verify grain is visible but very subtle
- [ ] Confirm animation is smooth (no jank)
- [ ] Test with reduced motion preference enabled
- [ ] Check performance in browser DevTools
- [ ] Verify no interaction interference
- [ ] Test on mobile devices for battery impact
- [ ] Adjust opacity if needed (2-5% range)

## Alternatives Considered

1. **Pure CSS backdrop-filter**: Simpler but less control over grain appearance
2. **Canvas-based noise**: Most control but requires JS and higher CPU usage
3. **Static texture**: Simpler but lacks the subtle movement

## Success Criteria

- Adds subtle depth to background
- Not distracting or noticeable on first glance
- Performs smoothly on all devices
- Respects accessibility preferences
