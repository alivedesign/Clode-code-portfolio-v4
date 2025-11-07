# Avatar Animation Design

**Date:** 2025-11-08
**Status:** Approved

## Overview

Add a cute, playful looping animation to the pixel art character avatar on the homepage. The animation combines a continuous bounce/rotate with occasional eye blinks.

## Animation Components

### 1. Bounce + Rotate (Continuous)
- **Movement:** Gentle bounce up and down with side-to-side rotation
- **Bounce height:** 8px
- **Rotation range:** -5° to +6° (asymmetric for character)
- **Duration:** 2.5s loop
- **Easing:** ease-in-out
- **Target:** Main avatar container

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
├── Container (animated-avatar) - receives bounce/rotate
├── Body pixels (accent color)
├── Eye pixels (dark-text) - receive blink animation
└── Foot pixels (accent color)
```

### CSS Animations

**bounceRotate keyframes:**
```css
@keyframes bounceRotate {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-8px) rotate(-5deg); }
  50% { transform: translateY(0) rotate(0deg); }
  75% { transform: translateY(-8px) rotate(6deg); }
}
```

**blink keyframes:**
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

- Avatar bounces smoothly at 60fps
- Eyes blink occasionally and independently
- Animations respect user motion preferences
- Component works across all screen sizes
- No layout shift or jank during animation
