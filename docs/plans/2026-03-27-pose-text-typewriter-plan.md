# Pose Text Typewriter Animation — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add per-pose descriptive text with character-by-character typewriter animation that syncs with character hover animations.

**Architecture:** Data-driven text config feeds a `useTypewriter` hook that controls a `PoseText` component. PoseText replaces HeroText during hover with typewriter animation, fades on transitions.

**Tech Stack:** React, TypeScript, Tailwind CSS v4, `setInterval` for typing cadence

---

### Task 1: Create pose text data config

**Files:**
- Create: `src/data/poseTextData.ts`

**Step 1: Create the data file with types and content**

```typescript
import type { CharacterPose } from "@/components/Character";

export type TextSegment = {
  text: string;
  color: "white" | "secondary";
};

export type PoseLine = TextSegment[];

export const POSE_TEXT: Record<CharacterPose, PoseLine[]> = {
  experience: [
    [
      { text: "Before AI", color: "white" },
      { text: " made everyone a builder, ", color: "secondary" },
      { text: "I was already designing products.", color: "white" },
    ],
    [{ text: "Now imagine what I do with it.", color: "secondary" }],
  ],
  products: [
    [
      { text: "Some people have hobbies. ", color: "secondary" },
      { text: "I ship products. Mockups were never enough.", color: "white" },
    ],
    [{ text: "I need to see it live, used, real.", color: "secondary" }],
  ],
  cases: [
    [{ text: "Want to see how I think?", color: "white" }],
    [
      {
        text: "Not just what I design, but how I solve problems. It\u2019s all here.",
        color: "secondary",
      },
    ],
  ],
  content: [
    [{ text: "I share everything I learn.", color: "white" }],
    [
      {
        text: "YouTube deep dives, LinkedIn posts, quick reels.",
        color: "secondary",
      },
    ],
    [{ text: "No gatekeeping", color: "secondary" }],
  ],
  about: [
    [{ text: "Behind the pixels there\u2019s a person.", color: "white" }],
    [{ text: "Values, passions, weird hobbies.", color: "secondary" }],
    [{ text: "Get to know me.", color: "secondary" }],
  ],
  resume: [
    [{ text: "Need the formal version?", color: "white" }],
    [{ text: "Got it.", color: "secondary" }],
    [{ text: "Clean PDF.", color: "secondary" }],
    [{ text: "Opens in a new tab.", color: "secondary" }],
  ],
};

/** Flatten all segments for a pose into total character count */
export function getTotalChars(pose: CharacterPose): number {
  return POSE_TEXT[pose].reduce(
    (sum, line) => sum + line.reduce((s, seg) => s + seg.text.length, 0),
    0
  );
}
```

**Step 2: Verify the file compiles**

Run: `npx tsc --noEmit src/data/poseTextData.ts`
If path aliases cause issues, just run: `npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/data/poseTextData.ts
git commit -m "feat: add pose text data config for typewriter animation"
```

---

### Task 2: Create useTypewriter hook

**Files:**
- Create: `src/hooks/useTypewriter.ts`

**Step 1: Create the hook**

```typescript
import { useState, useEffect, useRef, useCallback } from "react";
import type { CharacterPose } from "@/components/Character";
import { getTotalChars } from "@/data/poseTextData";

export type TypewriterPhase = "idle" | "typing" | "fading-out";

interface TypewriterState {
  visibleChars: number;
  totalChars: number;
  phase: TypewriterPhase;
  activePose: CharacterPose | null;
}

const FADE_DURATION = 200; // ms
const TARGET_TYPING_DURATION = 2800; // ms — slightly longer than pose video

export function useTypewriter(pose: CharacterPose | null): TypewriterState {
  const [state, setState] = useState<TypewriterState>({
    visibleChars: 0,
    totalChars: 0,
    phase: "idle",
    activePose: null,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPoseRef = useRef<CharacterPose | null>(null);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
  }, []);

  const startTyping = useCallback((newPose: CharacterPose) => {
    const total = getTotalChars(newPose);
    const msPerChar = Math.max(TARGET_TYPING_DURATION / total, 15); // min 15ms per char

    setState({
      visibleChars: 0,
      totalChars: total,
      phase: "typing",
      activePose: newPose,
    });

    let chars = 0;
    intervalRef.current = setInterval(() => {
      chars += 1;
      if (chars >= total) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setState((prev) => ({ ...prev, visibleChars: total }));
      } else {
        setState((prev) => ({ ...prev, visibleChars: chars }));
      }
    }, msPerChar);
  }, []);

  useEffect(() => {
    const prevPose = prevPoseRef.current;
    prevPoseRef.current = pose;

    // No change
    if (pose === prevPose) return;

    clearTimers();

    // Pose cleared (mouse left) — fade out, then idle
    if (pose === null) {
      setState((prev) => ({ ...prev, phase: "fading-out" }));
      fadeTimeoutRef.current = setTimeout(() => {
        setState({
          visibleChars: 0,
          totalChars: 0,
          phase: "idle",
          activePose: null,
        });
      }, FADE_DURATION);
      return;
    }

    // First hover (from idle) — start typing immediately
    if (prevPose === null) {
      startTyping(pose);
      return;
    }

    // Pose changed (hover to different item) — fade out, then type new
    setState((prev) => ({ ...prev, phase: "fading-out" }));
    fadeTimeoutRef.current = setTimeout(() => {
      startTyping(pose);
    }, FADE_DURATION);

    return () => clearTimers();
  }, [pose, clearTimers, startTyping]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  return state;
}
```

**Step 2: Verify the file compiles**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/hooks/useTypewriter.ts
git commit -m "feat: add useTypewriter hook for character-by-character animation"
```

---

### Task 3: Create PoseText component

**Files:**
- Create: `src/components/Hero/PoseText.tsx`
- Modify: `src/components/Hero/index.ts`

**Step 1: Create the PoseText component**

```tsx
import type { CharacterPose } from "@/components/Character";
import { useTypewriter } from "@/hooks/useTypewriter";
import { POSE_TEXT } from "@/data/poseTextData";
import type { TypewriterPhase } from "@/hooks/useTypewriter";

interface PoseTextProps {
  pose: CharacterPose | null;
}

function getOpacityClass(phase: TypewriterPhase): string {
  switch (phase) {
    case "idle":
      return "opacity-0";
    case "typing":
      return "opacity-100";
    case "fading-out":
      return "opacity-0";
  }
}

export function PoseText({ pose }: PoseTextProps) {
  const { visibleChars, phase, activePose } = useTypewriter(pose);

  // Use activePose (not prop pose) so text stays visible during fade-out
  const textData = activePose ? POSE_TEXT[activePose] : null;

  if (!textData) return null;

  let charIndex = 0;

  return (
    <div
      className={`absolute w-[230px] md:w-[247px] left-1/2 -translate-x-1/2 top-[calc(100%+20px)] lg:left-[calc(100%-88px)] lg:translate-x-0 lg:top-[-16px] font-['SF_Pro_Text','-apple-system',BlinkMacSystemFont,sans-serif] text-[14px] md:text-lg leading-[1.3] text-center lg:text-left hidden lg:block transition-opacity duration-200 ${getOpacityClass(phase)}`}
    >
      {textData.map((line, lineIdx) => {
        const lineContent = line.map((segment, segIdx) => {
          const segmentChars = segment.text.split("").map((char) => {
            const idx = charIndex;
            charIndex += 1;
            if (idx >= visibleChars) return null;
            return (
              <span
                key={idx}
                className={
                  segment.color === "white"
                    ? "text-white font-normal"
                    : "text-text-secondary"
                }
              >
                {char}
              </span>
            );
          });
          return <span key={segIdx}>{segmentChars}</span>;
        });

        return (
          <p key={lineIdx} className={lineIdx < textData.length - 1 ? "mb-3" : ""}>
            {lineContent}
          </p>
        );
      })}
    </div>
  );
}
```

**Step 2: Update barrel export**

In `src/components/Hero/index.ts`, add the PoseText export:

```typescript
export { Logo } from "./Logo";
export { HeroText } from "./HeroText";
export { PoseText } from "./PoseText";
```

**Step 3: Verify the file compiles**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 4: Commit**

```bash
git add src/components/Hero/PoseText.tsx src/components/Hero/index.ts
git commit -m "feat: add PoseText component with typewriter rendering"
```

---

### Task 4: Integrate PoseText into Home page

**Files:**
- Modify: `src/pages/Home.tsx:4,37-46`

**Step 1: Update imports**

At line 4, change:
```typescript
import { Logo, HeroText } from "@/components/Hero";
```
to:
```typescript
import { Logo, HeroText, PoseText } from "@/components/Hero";
```

**Step 2: Derive pose for PoseText**

Inside the `Home` component, before the return statement (~line 33), add:
```typescript
const currentPose = state.phase === "posing" ? state.pose : null;
```

**Step 3: Update HeroText visibility and add PoseText**

Replace the current HeroText line (line 45):
```tsx
<HeroText visible={revealed} />
```
with:
```tsx
<HeroText visible={revealed && state.phase !== "posing"} />
<PoseText pose={revealed ? currentPose : null} />
```

**Step 4: Verify it builds and renders**

Run: `npm run dev`
- Open browser at localhost
- Wait for reveal animation
- Hover "Experience" in navbar
- Expected: HeroText disappears instantly, pose text types in character-by-character with correct white/gray styling
- Hover "Products" — old text fades out (200ms), new text types in
- Leave navbar — pose text fades out, HeroText appears instantly

**Step 5: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat: integrate PoseText typewriter into Home page"
```

---

### Task 5: Polish and edge cases

**Files:**
- May modify: `src/hooks/useTypewriter.ts`, `src/components/Hero/PoseText.tsx`

**Step 1: Test rapid hover transitions**

- Quickly move mouse across all 6 nav items
- Expected: No stale text, no overlapping animations, each pose types correctly after fade
- If flickering occurs: verify `clearTimers()` is called before every state transition in useTypewriter

**Step 2: Test prefers-reduced-motion**

- The existing CSS rule at `src/styles/index.css:317-324` already reduces animation/transition durations to 0.01ms
- The `transition-opacity duration-200` on PoseText will honor this
- The `setInterval`-based typing won't be affected by CSS — if reduced motion is desired for typing too, add to useTypewriter:

```typescript
// At the top of useTypewriter, before state:
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

Then in `startTyping`, if `prefersReducedMotion`, set `visibleChars` to `total` immediately instead of animating.

**Step 3: Verify mobile doesn't show PoseText**

- PoseText has `hidden lg:block` — invisible below lg breakpoint
- Resize to mobile width, verify no pose text appears
- Verify HeroText behavior unchanged on mobile

**Step 4: Commit**

```bash
git add -A
git commit -m "fix: polish typewriter edge cases and reduced-motion support"
```

---

## Summary of all files

| Action | File |
|--------|------|
| Create | `src/data/poseTextData.ts` |
| Create | `src/hooks/useTypewriter.ts` |
| Create | `src/components/Hero/PoseText.tsx` |
| Modify | `src/components/Hero/index.ts` (add export) |
| Modify | `src/pages/Home.tsx` (wire PoseText, adjust HeroText visibility) |

## Multi-Agent Execution Strategy

Tasks 1-3 are independent (data, hook, component) and can be dispatched to parallel agents. Task 4 depends on all three completing. Task 5 is sequential polish.

```
Task 1 (data config)     ─┐
Task 2 (useTypewriter)    ├─→ Task 4 (integration) → Task 5 (polish)
Task 3 (PoseText component)─┘
```
