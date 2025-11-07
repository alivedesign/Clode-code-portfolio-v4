# Avatar Animation Design

**Date:** 2025-11-08
**Status:** Implemented

## Overview

Add a cute, playful looping animation to the pixel art character avatar on the homepage. The animation combines a friendly waving arm with occasional eye blinks.

## Animation Components

### 1. Wave Animation (Continuous)
- **Movement:** Right arm waves in a friendly greeting
- **Animation:** Up and down motion with side-to-side movement
- **Max height:** 10px up
- **Side movement:** ±2px
- **Duration:** 1.5s loop
- **Easing:** ease-in-out
- **Target:** Right arm pixel (far right side)

### 2. Eye Blink (Occasional)
- **Effect:** Quick opacity change (1 → 0 → 1)
- **Frequency:** Every 4 seconds
- **Duration:** ~150ms per blink
- **Target:** Both eye pixels (dark-text divs)
- **Offset:** Right eye delayed by 0.1s for natural feel

## Technical Implementation

### Component Structure
```
Avatar Component (components/Avatar.tsx)
├── Container (relative positioned)
├── Body pixels (accent color)
├── Eye pixels (dark-text) - receive blink animation
├── Right arm pixel (accent color) - receives wave animation
└── Other pixels (accent color)
```

### CSS Animations

**wave keyframes:**
```css
@keyframes wave {
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-6px) translateX(2px); }
  50% { transform: translateY(-10px) translateX(0); }
  75% { transform: translateY(-6px) translateX(-2px); }
}
```

**eyeBlink keyframes:**
```css
@keyframes blink {
  0%, 90%, 100% { opacity: 1; }
  95% { opacity: 0; }
}
```

### Performance Optimizations
- Use `transform` and `opacity` (GPU-accelerated)
- Add `will-change: transform, opacity`
- Set `transform-origin: center` for proper rotation pivot

### Accessibility
- Include `@media (prefers-reduced-motion: reduce)` to disable animations for users who prefer reduced motion

## Files to Modify

1. **components/Avatar.tsx** - Extract and animate avatar
2. **app/globals.css** - Add keyframe animations
3. **app/page.tsx** - Replace inline avatar with component

## Success Criteria

- Right arm waves smoothly at 60fps
- Eyes blink occasionally and independently
- Animations respect user motion preferences
- Component works across all screen sizes
- No layout shift or jank during animation
