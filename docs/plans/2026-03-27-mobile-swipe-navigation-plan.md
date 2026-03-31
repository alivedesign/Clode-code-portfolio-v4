# Mobile Swipe Navigation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add arrow buttons and swipe gestures on mobile to navigate through all 6 character poses, reusing the existing desktop hover animation system (video, typewriter, poster).

**Architecture:** New `useSwipe` hook for touch detection, new `usePoseCycle` hook for managing pose index with looping, new `MobileSwipeZone` component wrapping the character with arrows. Existing pose infrastructure (`useCharacterState`, `VideoPlayer`, `useTypewriter`, `PoseText`) remains unchanged — mobile simply calls `hoverPose()` the same way desktop does.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4 (no new dependencies)

---

### Task 1: Create `useSwipe` hook

**Files:**
- Create: `src/hooks/useSwipe.ts`

**Step 1: Create the hook**

```typescript
import { useRef, useCallback } from "react";

const SWIPE_THRESHOLD = 50; // px

interface SwipeHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

export function useSwipe(
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
): SwipeHandlers {
  const startXRef = useRef<number | null>(null);
  const currentXRef = useRef<number | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = e.touches[0].clientX;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    currentXRef.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (startXRef.current === null || currentXRef.current === null) return;

    const deltaX = currentXRef.current - startXRef.current;

    if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
      if (deltaX < 0) {
        onSwipeLeft(); // swiped left → next pose
      } else {
        onSwipeRight(); // swiped right → previous pose
      }
    }

    startXRef.current = null;
    currentXRef.current = null;
  }, [onSwipeLeft, onSwipeRight]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}
```

**Step 2: Verify file compiles**

Run: `cd "/Users/shkuratovdesigner/Cursor Projects/Portfolio v4" && npx tsc --noEmit src/hooks/useSwipe.ts`

**Step 3: Commit**

```bash
git add src/hooks/useSwipe.ts
git commit -m "feat: add useSwipe hook for mobile touch gesture detection"
```

---

### Task 2: Create `usePoseCycle` hook

**Files:**
- Create: `src/hooks/usePoseCycle.ts`

**Step 1: Create the hook**

```typescript
import { useState, useCallback } from "react";
import type { CharacterPose } from "@/components/Character/useCharacterState";

const POSE_ORDER: CharacterPose[] = [
  "experience",
  "products",
  "cases",
  "content",
  "about",
  "resume",
];

interface PoseCycleActions {
  currentPose: CharacterPose | null;
  nextPose: () => void;
  prevPose: () => void;
}

export function usePoseCycle(
  onPoseChange: (pose: CharacterPose) => void,
): PoseCycleActions {
  const [index, setIndex] = useState<number | null>(null);

  const nextPose = useCallback(() => {
    setIndex((prev) => {
      const next = prev === null ? 0 : (prev + 1) % POSE_ORDER.length;
      onPoseChange(POSE_ORDER[next]);
      return next;
    });
  }, [onPoseChange]);

  const prevPose = useCallback(() => {
    setIndex((prev) => {
      const next =
        prev === null
          ? POSE_ORDER.length - 1
          : (prev - 1 + POSE_ORDER.length) % POSE_ORDER.length;
      onPoseChange(POSE_ORDER[next]);
      return next;
    });
  }, [onPoseChange]);

  const currentPose = index !== null ? POSE_ORDER[index] : null;

  return { currentPose, nextPose, prevPose };
}
```

**Step 2: Verify file compiles**

Run: `cd "/Users/shkuratovdesigner/Cursor Projects/Portfolio v4" && npx tsc --noEmit src/hooks/usePoseCycle.ts`

**Step 3: Commit**

```bash
git add src/hooks/usePoseCycle.ts
git commit -m "feat: add usePoseCycle hook for looped pose navigation"
```

---

### Task 3: Create `MobileSwipeZone` component

**Files:**
- Create: `src/components/Character/MobileSwipeZone.tsx`

**Step 1: Create the component**

This component wraps the character area, renders arrow buttons, and attaches swipe handlers. It receives `nextPose` and `prevPose` callbacks from the parent.

```tsx
import { useSwipe } from "@/hooks/useSwipe";

interface MobileSwipeZoneProps {
  children: React.ReactNode;
  onNext: () => void;
  onPrev: () => void;
}

export function MobileSwipeZone({ children, onNext, onPrev }: MobileSwipeZoneProps) {
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(onNext, onPrev);

  return (
    <div
      className="relative"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Left arrow */}
      <button
        type="button"
        aria-label="Previous pose"
        className="absolute left-[-40px] top-1/2 -translate-y-1/2 z-10 p-2 -webkit-tap-highlight-color-transparent"
        style={{ WebkitTapHighlightColor: "transparent" }}
        onClick={onPrev}
      >
        <img src="/arrow-left.svg" alt="" width={28} height={21} />
      </button>

      {/* Character area */}
      {children}

      {/* Right arrow */}
      <button
        type="button"
        aria-label="Next pose"
        className="absolute right-[-40px] top-1/2 -translate-y-1/2 z-10 p-2"
        style={{ WebkitTapHighlightColor: "transparent" }}
        onClick={onNext}
      >
        <img src="/arrow-right.svg" alt="" width={28} height={21} />
      </button>
    </div>
  );
}
```

**Notes for implementer:**
- Arrow positioning (`left-[-40px]`, `right-[-40px]`) places arrows outside the character box — adjust if needed to match Figma spacing after visual check.
- The arrows from Figma are 28x21px, gray (#999899).
- `p-2` gives a comfortable touch target (44px with the arrow).
- The swipe zone covers the entire div (character + space between arrows).

**Step 2: Export from Character index**

Modify: `src/components/Character/index.ts` — add export:

```typescript
export { MobileSwipeZone } from "./MobileSwipeZone";
```

**Step 3: Verify compiles**

Run: `cd "/Users/shkuratovdesigner/Cursor Projects/Portfolio v4" && npx tsc --noEmit`

**Step 4: Commit**

```bash
git add src/components/Character/MobileSwipeZone.tsx src/components/Character/index.ts
git commit -m "feat: add MobileSwipeZone with arrows and touch handlers"
```

---

### Task 4: Make PoseText visible on mobile

**Files:**
- Modify: `src/components/Hero/PoseText.tsx:33`

**Step 1: Remove `hidden lg:block` from PoseText**

In `src/components/Hero/PoseText.tsx` line 33, change the className.

**Before:**
```
hidden lg:block transition-opacity duration-200
```

**After:**
```
transition-opacity duration-200
```

The component is already conditionally rendered (returns `null` when no textData), so it only shows when a pose is active.

**Step 2: Adjust mobile positioning**

The existing classes already handle mobile centering:
- `left-1/2 -translate-x-1/2 top-[calc(100%+20px)]` (mobile: centered below character)
- `lg:left-[calc(100%-88px)] lg:translate-x-0 lg:top-[-16px]` (desktop: offset to right)

These are correct. The `hidden lg:block` was the only thing preventing mobile display.

**Step 3: Verify in browser**

Open `http://192.168.0.112:3000/` on mobile. PoseText should not be visible yet (no pose active). We'll verify it shows after Task 6 integration.

**Step 4: Commit**

```bash
git add src/components/Hero/PoseText.tsx
git commit -m "feat: show PoseText on mobile (remove hidden lg:block)"
```

---

### Task 5: Update NavBar mobile links to navigate instead of triggering poses

**Files:**
- Modify: `src/components/NavBar/NavBar.tsx:196-204`

**Step 1: Remove `onHoverPose` from mobile nav link clicks**

In the mobile bottom bar section (lines 195-204), change each `<a>` from using `onClick={() => onHoverPose(item.pose)}` to just being a plain link.

**Before (line 200):**
```tsx
onClick={() => onHoverPose(item.pose)}
```

**After:**
Remove the `onClick` entirely. The `<a href={item.href}>` will handle navigation.

Same for the overlay bottom bar links (lines 159-168) — those already use `onClick={closeMenu}` which is correct (closes menu + navigates via href).

**Step 2: Verify in browser**

Open mobile view. Tap "Experience" — should navigate to `#experience` section, NOT trigger a pose video.

**Step 3: Commit**

```bash
git add src/components/NavBar/NavBar.tsx
git commit -m "fix: mobile nav links navigate to sections instead of triggering poses"
```

---

### Task 6: Wire everything together in Home.tsx

**Files:**
- Modify: `src/pages/Home.tsx`

**Step 1: Add imports and hooks**

Add to imports (line 1-7):
```typescript
import { Character, useCharacterState, MobileSwipeZone } from "@/components/Character";
import { usePoseCycle } from "@/hooks/usePoseCycle";
import { useMediaQuery } from "@/hooks/useMediaQuery";
```

Inside the `Home` component, after existing hooks (after line 22):
```typescript
const isMobile = useMediaQuery("(max-width: 767px)");
const { nextPose, prevPose } = usePoseCycle(hoverPose);
```

**Step 2: Conditionally wrap character with MobileSwipeZone**

Replace the character container div (lines 50-61) with:

```tsx
<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+48px)] w-[300px] h-[300px] md:-translate-x-[calc(50%+24px)] md:w-[400px] md:h-[400px] lg:w-[550px] lg:h-[550px]">
  {isMobile ? (
    <MobileSwipeZone onNext={nextPose} onPrev={prevPose}>
      <Character
        state={state}
        onRevealComplete={handleRevealComplete}
        onPoseVideoEnded={onPoseVideoEnded}
      />
      <HeroText
        visible={heroReady && state.phase !== "posing"}
        startTyping={heroReady}
      />
      <PoseText pose={revealed ? currentPose : null} />
    </MobileSwipeZone>
  ) : (
    <>
      <Character
        state={state}
        onRevealComplete={handleRevealComplete}
        onPoseVideoEnded={onPoseVideoEnded}
      />
      <HeroText
        visible={heroReady && state.phase !== "posing"}
        startTyping={heroReady}
      />
      <PoseText pose={revealed ? currentPose : null} />
    </>
  )}
</div>
```

**Step 3: Verify full flow**

Open `http://192.168.0.112:3000/` on mobile:

1. Arrows visible on both sides of character ✓
2. Tap right arrow → experience video plays, typewriter types ✓
3. Tap right arrow again → products video plays, typewriter types ✓
4. Tap left arrow → back to experience (instant text, already cached) ✓
5. Swipe left across character → next pose ✓
6. Swipe right across character → previous pose ✓
7. Keep tapping right past resume → loops back to experience ✓
8. Bottom nav links navigate to sections, NOT triggering poses ✓
9. Desktop behavior unchanged — hover still works with lens ✓

**Step 4: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat: wire mobile swipe navigation with pose cycling"
```

---

### Task 7: Visual polish — verify arrow positioning

**Files:**
- Potentially adjust: `src/components/Character/MobileSwipeZone.tsx`

**Step 1: Visual check on mobile**

Compare arrow positions against Figma design (`4184:13409`). The Figma shows arrows:
- Vertically centered on the character
- Roughly at the screen edges (left: ~24px from edge, right: ~24px from edge)

If the current `left-[-40px]` / `right-[-40px]` positioning doesn't match, adjust the values.

**Step 2: Check touch targets**

Verify arrows are easy to tap. The `p-2` padding gives extra touch area. If needed, increase to `p-3`.

**Step 3: Verify no visual overlap**

Make sure arrows don't overlap with:
- The logo (top-left)
- The bottom nav bar
- The character itself

**Step 4: Commit if changes needed**

```bash
git add src/components/Character/MobileSwipeZone.tsx
git commit -m "fix: adjust mobile arrow positioning to match Figma"
```

---

## File Summary

| File | Action | Purpose |
|------|--------|---------|
| `src/hooks/useSwipe.ts` | Create | Touch gesture detection hook |
| `src/hooks/usePoseCycle.ts` | Create | Pose index management with looping |
| `src/components/Character/MobileSwipeZone.tsx` | Create | Wrapper with arrows + swipe zone |
| `src/components/Character/index.ts` | Modify | Export MobileSwipeZone |
| `src/components/Hero/PoseText.tsx` | Modify | Remove `hidden lg:block` |
| `src/components/NavBar/NavBar.tsx` | Modify | Remove pose trigger from mobile link taps |
| `src/pages/Home.tsx` | Modify | Wire hooks + conditional MobileSwipeZone |

## Unchanged Files (no modifications needed)

- `src/components/Character/useCharacterState.ts`
- `src/components/Character/Character.tsx`
- `src/components/Character/VideoPlayer.tsx`
- `src/hooks/useTypewriter.ts`
- `src/data/poseTextData.ts`
- `src/styles/index.css`
