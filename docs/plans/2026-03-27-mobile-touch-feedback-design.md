# Mobile Touch Feedback Design

**Date:** 2026-03-27
**Status:** Approved

## Problem

Mobile swipe/tap interaction feels unresponsive:
- 50px swipe threshold is too high
- Arrow buttons have no visual tap feedback
- Nothing happens visually during swipe gesture
- No haptic feedback

## Design Decisions

### 1. Enhanced useSwipe Hook

- Add `dragDeltaX` (live horizontal offset) and `isDragging` state
- Damping factor: 0.4 (drag 100px → content moves 40px)
- Lower swipe threshold: 50px → 25px
- On touch end: fire swipe callback if threshold met, reset delta to 0
- Return `{ onTouchStart, onTouchMove, onTouchEnd, dragDeltaX, isDragging }`

### 2. MobileSwipeZone Visual Drag

- Content wrapper gets dynamic `translateX(dragDeltaX * 0.4)` during drag
- During drag: no CSS transition (immediate response)
- On release: `transition: transform 300ms cubic-bezier(0.25, 1, 0.5, 1)` (snappy ease-out)
- Max offset capped at ~40px to keep it as a hint, not a full slide

### 3. Arrow Tap Feedback

- Scale-down on press: `active:scale-[0.85]` with `transition: transform 150ms ease-out`
- Haptic tap: `navigator.vibrate?.(10)` on click (10ms subtle tap)
- Keep `WebkitTapHighlightColor: "transparent"` — scale replaces default highlight

### 4. Files Changed

| File | Change |
|------|--------|
| `src/hooks/useSwipe.ts` | Add dragDeltaX, isDragging, lower threshold, damping |
| `src/components/Character/MobileSwipeZone.tsx` | Apply translateX from drag, transition on release, arrow scale/haptic |

No new files. No new dependencies. Two files touched.

## Approach

Approach A: Enhanced useSwipe Hook — extends existing architecture with no new dependencies. CSS transitions provide snappy snap-back feel without needing spring physics library.
