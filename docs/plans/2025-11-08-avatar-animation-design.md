# Avatar Animation Design

**Date:** 2025-11-08
**Status:** Implemented

## Overview

Interactive pixel art character with eye tracking, bounce animation, occasional wave, and wiggle-on-hover. Character feels alive and playful with cursor-following eyes and excited reactions to hover.

## Animation Components

### 1. Eye Tracking (Always Active)
- **Behavior:** Eyes follow cursor position across entire page
- **Positions:** 9 fixed positions (center + 8 directions)
- **Movement:** ±2px in x/y direction per eye
- **Transition:** Smooth 0.2s ease between positions
- **Threshold:** 100px zones for position detection
- **Target:** Both eye pixels

### 2. Bounce Animation (Continuous)
- **Movement:** Gentle up and down
- **Height:** 8px up
- **Duration:** 2s loop
- **Easing:** ease-in-out
- **Target:** Entire avatar container

### 3. Wave Animation (Occasional)
- **Movement:** Right arm waves in a friendly greeting
- **Timing:** Idle 85% of time, quick wave at end
- **Max height:** 4px up
- **Side movement:** ±1px
- **Duration:** 3.5s loop
- **Target:** Right arm pixel

### 4. Eye Blink (Occasional)
- **Effect:** Quick opacity change (1 → 0 → 1)
- **Frequency:** Every 4 seconds
- **Duration:** ~150ms per blink
- **Target:** Left eye only (right eye stays open)

### 5. Wiggle on Hover (Interactive)
- **Movement:** Rapid side-to-side shake
- **Distance:** ±3px horizontal
- **Duration:** 0.6s with multiple shake cycles
- **Trigger:** Mouse hover over avatar
- **Effect:** Pauses wave animation during wiggle

## Technical Implementation

### Component Structure
```
Avatar Component (components/Avatar.tsx) - Client Component
├── React State: eyeOffset { x, y }
├── React Ref: avatarRef for position tracking
├── useEffect: Global mousemove listener
├── Container (bouncing-avatar class)
├── Body pixel (accent color)
├── Eye pixels (dark-text) - dynamic position via inline styles
│   ├── Left eye: blinking animation
│   └── Right eye: tracking only
├── Right arm pixel (accent color) - waving-arm class
└── Other pixels (accent color, feet/sides)
```

### CSS Animations

**bounce keyframes:**
```css
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
```

**wave keyframes:**
```css
@keyframes wave {
  0%, 85%, 100% { transform: translateY(0) translateX(0); }
  90% { transform: translateY(-4px) translateX(1px); }
  95% { transform: translateY(-3px) translateX(-1px); }
}
```

**wiggle keyframes:**
```css
@keyframes wiggle {
  0%, 100% { transform: translateX(0); }
  10% { transform: translateX(-3px); }
  30% { transform: translateX(3px); }
  50% { transform: translateX(-3px); }
  70% { transform: translateX(3px); }
  90% { transform: translateX(-2px); }
}
```

**eyeBlink keyframes:**
```css
@keyframes eyeBlink {
  0%, 90%, 100% { opacity: 1; }
  95% { opacity: 0; }
}
```

### Performance Optimizations
- Use `transform` and `opacity` (GPU-accelerated)
- Add `will-change: transform, opacity`
- Eye transitions use CSS only (0.2s ease)
- Single mousemove listener with threshold-based updates
- Inline styles for dynamic eye positioning

## Files to Modify

1. **components/Avatar.tsx** - Extract and animate avatar
2. **app/globals.css** - Add keyframe animations
3. **app/page.tsx** - Replace inline avatar with component

## Success Criteria

✅ Eyes track cursor smoothly across entire page
✅ Bounce animation runs continuously at 60fps
✅ Right arm waves occasionally (subtle movement)
✅ Left eye blinks every 4 seconds
✅ Hover triggers excited wiggle animation
✅ Wave pauses during hover
✅ Smooth transitions between eye positions
✅ No layout shift or jank during animations
✅ Component works across all screen sizes
✅ Respects `prefers-reduced-motion` accessibility setting
