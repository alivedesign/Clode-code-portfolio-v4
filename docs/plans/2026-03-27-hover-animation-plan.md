# Seamless Hover Animation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make hover animations play immediately with no delay, play once, then show a static poster image.

**Architecture:** Remove the transition video layer and simplify the state machine from 6 phases to 4. Pose videos play once on hover (not loop), and when finished, a poster PNG is shown. Switching links immediately starts the new pose video.

**Tech Stack:** React, TypeScript, Vite

---

### Task 1: Simplify the state machine

**Files:**
- Modify: `src/components/Character/useCharacterState.ts` (full rewrite)

**Step 1: Rewrite the CharacterState type**

Remove `transitioning-to-pose` and `transitioning-to-idle`. Add `videoEnded` boolean to the posing state:

```typescript
export type CharacterState =
  | { phase: "loading" }
  | { phase: "revealing" }
  | { phase: "idle" }
  | { phase: "posing"; pose: CharacterPose; videoEnded: boolean };
```

**Step 2: Rewrite the CharacterActions interface**

Remove `onTransitionComplete`. Add `onPoseVideoEnded`:

```typescript
export interface CharacterActions {
  state: CharacterState;
  onRevealComplete: () => void;
  onPoseVideoEnded: () => void;
  hoverPose: (pose: CharacterPose) => void;
  leavePose: () => void;
  startReveal: () => void;
}
```

**Step 3: Rewrite the hook implementation**

```typescript
export function useCharacterState(): CharacterActions {
  const [state, setState] = useState<CharacterState>({ phase: "loading" });

  const startReveal = useCallback(() => {
    setState({ phase: "revealing" });
  }, []);

  const onRevealComplete = useCallback(() => {
    setState({ phase: "idle" });
  }, []);

  const hoverPose = useCallback((pose: CharacterPose) => {
    setState((prev) => {
      if (prev.phase === "idle" || prev.phase === "posing") {
        return { phase: "posing", pose, videoEnded: false };
      }
      return prev;
    });
  }, []);

  const leavePose = useCallback(() => {
    setState((prev) => {
      if (prev.phase === "posing") {
        return { phase: "idle" };
      }
      return prev;
    });
  }, []);

  const onPoseVideoEnded = useCallback(() => {
    setState((prev) => {
      if (prev.phase === "posing") {
        return { phase: "posing", pose: prev.pose, videoEnded: true };
      }
      return prev;
    });
  }, []);

  return {
    state,
    onRevealComplete,
    onPoseVideoEnded,
    hoverPose,
    leavePose,
    startReveal,
  };
}
```

**Step 4: Verify no TypeScript errors**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: Errors in `Character.tsx` and `Home.tsx` (they still reference old API) — that's correct, we fix them next.

---

### Task 2: Update Character component

**Files:**
- Modify: `src/components/Character/Character.tsx` (full rewrite)

**Step 1: Rewrite Character component**

Remove the transition video layer. Remove `onTransitionComplete` prop. Add `onPoseVideoEnded` prop. Add poster image layer. Change pose video from `loop` to single play. Use a `key` on the pose VideoPlayer so React remounts it when the pose changes (ensures video restarts from frame 0).

```tsx
import { useRef, useState, useEffect, useCallback } from "react";
import { VideoPlayer, type VideoPlayerHandle } from "./VideoPlayer";
import type { CharacterState } from "./useCharacterState";

interface CharacterProps {
  state: CharacterState;
  onRevealComplete: () => void;
  onPoseVideoEnded: () => void;
  className?: string;
}

export function Character({ state, onRevealComplete, onPoseVideoEnded, className = "" }: CharacterProps) {
  const revealRef = useRef<VideoPlayerHandle>(null);
  const poseRef = useRef<VideoPlayerHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const video = containerRef.current?.querySelector("video");
    if (!video) return;

    const onFirstFrame = () => {
      requestAnimationFrame(() => {
        setVideoPlaying(true);
      });
      video.removeEventListener("timeupdate", onFirstFrame);
    };

    video.addEventListener("timeupdate", onFirstFrame);
    return () => video.removeEventListener("timeupdate", onFirstFrame);
  }, []);

  // Play pose video immediately when entering posing state
  useEffect(() => {
    if (state.phase === "posing" && !state.videoEnded) {
      poseRef.current?.play();
    }
  }, [state]);

  const handleRevealEnded = useCallback(() => {
    onRevealComplete();
  }, [onRevealComplete]);

  const handlePoseEnded = useCallback(() => {
    onPoseVideoEnded();
  }, [onPoseVideoEnded]);

  const showReveal = state.phase === "loading" || state.phase === "revealing" || state.phase === "idle";
  const isPosing = state.phase === "posing";
  const showPoseVideo = isPosing && !state.videoEnded;
  const showPoster = isPosing && state.videoEnded;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${videoPlaying ? "animate-mask-c" : "invisible"} ${className}`}
    >
      {/* Reveal video — always in DOM, plays immediately via autoPlay */}
      <VideoPlayer
        ref={revealRef}
        src="/videos/reveal.mp4"
        autoPlay
        className={`absolute inset-0 w-full h-full object-cover bg-black ${showReveal ? "opacity-100" : "opacity-0"}`}
        onEnded={handleRevealEnded}
      />

      {/* Pose video layer — key forces remount on pose change */}
      {isPosing && (
        <VideoPlayer
          key={state.pose}
          ref={poseRef}
          src={`/videos/pose-${state.pose}.mp4`}
          onEnded={handlePoseEnded}
          className={`absolute inset-0 w-full h-full object-cover bg-black transition-opacity duration-200 ${showPoseVideo ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {/* Poster image — shown after pose video ends */}
      {showPoster && (
        <img
          src={`/images/poster-${state.pose}.png`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover bg-black"
        />
      )}
    </div>
  );
}
```

**Step 2: Verify no TypeScript errors**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: Errors in `Home.tsx` only (still references old API) — fixed in next task.

---

### Task 3: Update Home page integration

**Files:**
- Modify: `src/pages/Home.tsx`

**Step 1: Update Home to use new API**

Remove `onTransitionComplete` from destructuring and Character props. Add `onPoseVideoEnded`. Remove `transition.mp4` from the preload list.

Replace lines 9-17 (POSE_VIDEOS array):
```typescript
const POSE_VIDEOS = [
  "/videos/pose-experience.mp4",
  "/videos/pose-products.mp4",
  "/videos/pose-cases.mp4",
  "/videos/pose-content.mp4",
  "/videos/pose-about.mp4",
  "/videos/pose-resume.mp4",
];
```

Replace line 21-22 (destructuring):
```typescript
const { state, startReveal, onRevealComplete, onPoseVideoEnded, hoverPose, leavePose } =
  useCharacterState();
```

Replace lines 41-45 (Character component):
```tsx
<Character
  state={state}
  onRevealComplete={handleRevealComplete}
  onPoseVideoEnded={onPoseVideoEnded}
/>
```

**Step 2: Verify TypeScript compiles clean**

Run: `npx tsc --noEmit`
Expected: No errors.

**Step 3: Verify dev server runs**

Run: `npx vite --open` (manual test)
Expected: Page loads, hover over nav links triggers pose video immediately, video plays once, poster image shows after.

**Step 4: Commit**

```bash
git add src/components/Character/useCharacterState.ts src/components/Character/Character.tsx src/pages/Home.tsx
git commit -m "feat: seamless hover animations — play once, show poster"
```

---

### Task 4: Clean up transition.mp4 reference

**Files:**
- Check: `public/videos/transition.mp4` (should already be deleted by user)

**Step 1: Verify transition.mp4 is gone**

Run: `ls -la public/videos/transition.mp4 2>&1`
Expected: "No such file or directory"

If it still exists, delete it:
```bash
rm public/videos/transition.mp4
```

**Step 2: Search for any remaining references**

Run: `grep -r "transition" src/ --include="*.ts" --include="*.tsx" | grep -v node_modules`
Expected: No references to transition video or transitioning phases.

**Step 3: Commit cleanup if needed**

```bash
git add -A
git commit -m "chore: remove transition.mp4 references"
```
