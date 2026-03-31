# Mobile Touch Feedback Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make mobile swipe/tap interactions feel responsive with live drag tracking, arrow press feedback, and haptic taps.

**Architecture:** Extend existing `useSwipe` hook to expose real-time drag delta as state. `MobileSwipeZone` consumes delta to apply `translateX` on content, and adds scale/haptic feedback to arrow buttons. No new dependencies.

**Tech Stack:** React hooks, CSS transforms/transitions, Web Vibration API

---

### Task 1: Enhance useSwipe hook with live drag delta

**Files:**
- Modify: `src/hooks/useSwipe.ts`

**Step 1: Rewrite useSwipe with drag tracking**

Replace the entire file with:

```typescript
import { useRef, useCallback, useState } from "react";

const SWIPE_THRESHOLD = 25; // px (lowered from 50)
const DAMPING = 0.4;
const MAX_OFFSET = 40; // px

interface SwipeState {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  dragDeltaX: number;
  isDragging: boolean;
}

export function useSwipe(
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
): SwipeState {
  const startXRef = useRef<number | null>(null);
  const [dragDeltaX, setDragDeltaX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    setIsDragging(true);
    setDragDeltaX(0);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (startXRef.current === null) return;
    const raw = e.touches[0].clientX - startXRef.current;
    const damped = raw * DAMPING;
    const clamped = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, damped));
    setDragDeltaX(clamped);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (startXRef.current === null) return;

    // Read final delta before resetting — derive from damped value
    const rawDelta = dragDeltaX / DAMPING;

    if (Math.abs(rawDelta) >= SWIPE_THRESHOLD) {
      if (rawDelta < 0) {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
    }

    startXRef.current = null;
    setIsDragging(false);
    setDragDeltaX(0);
  }, [dragDeltaX, onSwipeLeft, onSwipeRight]);

  return { onTouchStart, onTouchMove, onTouchEnd, dragDeltaX, isDragging };
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: No TypeScript errors

**Step 3: Commit**

```bash
git add src/hooks/useSwipe.ts
git commit -m "feat: add live drag tracking to useSwipe hook"
```

---

### Task 2: Add visual drag and arrow feedback to MobileSwipeZone

**Files:**
- Modify: `src/components/Character/MobileSwipeZone.tsx`

**Step 1: Rewrite MobileSwipeZone with drag transform and arrow feedback**

Replace the entire file with:

```tsx
import { useSwipe } from "@/hooks/useSwipe";

interface MobileSwipeZoneProps {
  children: React.ReactNode;
  onNext: () => void;
  onPrev: () => void;
}

export function MobileSwipeZone({ children, onNext, onPrev }: MobileSwipeZoneProps) {
  const { onTouchStart, onTouchMove, onTouchEnd, dragDeltaX, isDragging } =
    useSwipe(onNext, onPrev);

  const handlePrev = () => {
    navigator.vibrate?.(10);
    onPrev();
  };

  const handleNext = () => {
    navigator.vibrate?.(10);
    onNext();
  };

  return (
    <div
      className="relative w-full h-full"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Left arrow */}
      <button
        type="button"
        aria-label="Previous pose"
        className="absolute left-[-40px] top-1/2 -translate-y-1/2 z-10 p-2 transition-transform duration-150 ease-out active:scale-[0.85]"
        style={{ WebkitTapHighlightColor: "transparent" }}
        onClick={handlePrev}
      >
        <img src="/arrow-left.svg" alt="" width={28} height={21} />
      </button>

      {/* Character area — shifts with drag */}
      <div
        className="w-full h-full"
        style={{
          transform: `translateX(${dragDeltaX}px)`,
          transition: isDragging ? "none" : "transform 300ms cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        {children}
      </div>

      {/* Right arrow */}
      <button
        type="button"
        aria-label="Next pose"
        className="absolute right-[-40px] top-1/2 -translate-y-1/2 z-10 p-2 transition-transform duration-150 ease-out active:scale-[0.85]"
        style={{ WebkitTapHighlightColor: "transparent" }}
        onClick={handleNext}
      >
        <img src="/arrow-right.svg" alt="" width={28} height={21} />
      </button>
    </div>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: No TypeScript errors

**Step 3: Manual test on mobile**

- Open dev server on phone or use Chrome DevTools mobile emulation
- Tap arrows: should scale down to 85% on press, haptic vibration on click
- Swipe: content should follow finger with damped movement, snap back on release
- Swipe past 25px threshold: should trigger pose change
- Short swipe (<25px): should snap back without changing pose

**Step 4: Commit**

```bash
git add src/components/Character/MobileSwipeZone.tsx
git commit -m "feat: add drag tracking, arrow scale feedback, and haptic taps"
```
