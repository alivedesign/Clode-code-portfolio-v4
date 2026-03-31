# Hover Animation Refinements Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Three refinements: replay reveal on mouse leave, faster pose playback (1.25x), soft edge mask on pose videos (except products/content).

**Architecture:** Modify state machine so `leavePose` transitions to `revealing` instead of `idle`, triggering reveal.mp4 replay. Add `playbackRate` prop to VideoPlayer. Add CSS mask class for soft edge fading on all 4 sides.

**Tech Stack:** React, TypeScript, CSS masks

---

### Task 1: Replay reveal.mp4 on mouse leave

**Files:**
- Modify: `src/components/Character/useCharacterState.ts:46-53`
- Modify: `src/components/Character/Character.tsx`

**Step 1: Update `leavePose` in state machine**

In `src/components/Character/useCharacterState.ts`, change `leavePose` to transition to `revealing` instead of `idle`:

```typescript
const leavePose = useCallback(() => {
  setState((prev) => {
    if (prev.phase === "posing") {
      return { phase: "revealing" };
    }
    return prev;
  });
}, []);
```

The existing `onRevealComplete` callback already transitions from `revealing` → `idle`, so the full flow is:
`posing → revealing (replay reveal.mp4) → idle (when video ends)`

**Step 2: Add effect in Character to replay reveal video**

In `src/components/Character/Character.tsx`, add a ref to track previous phase, and an effect that replays the reveal video when transitioning from posing to revealing:

```tsx
const prevPhaseRef = useRef(state.phase);

useEffect(() => {
  if (state.phase === "revealing" && prevPhaseRef.current === "posing") {
    revealRef.current?.play();
  }
  prevPhaseRef.current = state.phase;
}, [state]);
```

Import `useRef` is already imported. The reveal video is already wired with `onEnded={onRevealComplete}`, so when the replay finishes, state naturally transitions to idle.

**Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

**Step 4: Commit**

```bash
git add src/components/Character/useCharacterState.ts src/components/Character/Character.tsx
git commit -m "feat: replay reveal animation on mouse leave"
```

---

### Task 2: Faster pose video playback (1.25x)

**Files:**
- Modify: `src/components/Character/VideoPlayer.tsx`
- Modify: `src/components/Character/Character.tsx`

**Step 1: Add `playbackRate` prop to VideoPlayer**

In `src/components/Character/VideoPlayer.tsx`, add `playbackRate` to the props interface:

```typescript
interface VideoPlayerProps {
  src: string;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  className?: string;
  onEnded?: () => void;
  onCanPlay?: () => void;
  autoPlay?: boolean;
  playbackRate?: number;
}
```

Add it to the destructuring:

```typescript
({ src, loop = false, muted = true, poster, className = "", onEnded, onCanPlay, autoPlay = false, playbackRate = 1 }, ref) => {
```

Add a useEffect to set the playback rate on the video element:

```typescript
useEffect(() => {
  if (videoRef.current) {
    videoRef.current.playbackRate = playbackRate;
  }
}, [playbackRate]);
```

Place this effect after the existing useImperativeHandle and before the event listener effect.

**Step 2: Pass `playbackRate={1.25}` on pose VideoPlayer**

In `src/components/Character/Character.tsx`, add `playbackRate={1.25}` to the pose VideoPlayer:

```tsx
{isPosing && (
  <VideoPlayer
    key={state.pose}
    src={poseSrc}
    autoPlay
    playbackRate={1.25}
    onEnded={onPoseVideoEnded}
    className={...}
  />
)}
```

Do NOT add playbackRate to the reveal video — it plays at normal speed.

**Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

**Step 4: Commit**

```bash
git add src/components/Character/VideoPlayer.tsx src/components/Character/Character.tsx
git commit -m "feat: play pose animations at 1.25x speed"
```

---

### Task 3: Soft edge mask on pose videos

**Files:**
- Modify: `src/styles/index.css`
- Modify: `src/components/Character/Character.tsx`

**Step 1: Add CSS class for soft edge mask**

In `src/styles/index.css`, add this class after the `.animate-mask-c` block (after line 303):

```css
/* ─── Pose edge mask (soft fade on all 4 edges) ──────────── */
.pose-edge-mask {
  -webkit-mask-image:
    linear-gradient(to right, transparent, black 12%, black 88%, transparent),
    linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
  -webkit-mask-composite: destination-in;
  mask-image:
    linear-gradient(to right, transparent, black 12%, black 88%, transparent),
    linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
  mask-composite: intersect;
}
```

This creates a smooth vignette-like fade on all 4 edges using two intersecting gradients. The 12%/88% stops mean the fade starts ~12% from each edge.

**Step 2: Apply mask conditionally in Character component**

In `src/components/Character/Character.tsx`, add a variable to determine if the pose needs edge masking (all poses except "products" and "content"):

```tsx
const needsEdgeMask = isPosing && state.pose !== "products" && state.pose !== "content";
const edgeMaskClass = needsEdgeMask ? "pose-edge-mask" : "";
```

Apply the mask class to both the pose VideoPlayer and the poster image:

For the pose video:
```tsx
className={`absolute inset-0 w-full h-full object-cover bg-black transition-opacity duration-200 ${edgeMaskClass} ${showPoseVideo ? "opacity-100" : "opacity-0"}`}
```

For the poster image:
```tsx
className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${edgeMaskClass} ${showPoster ? "opacity-100" : "opacity-0"}`}
```

**Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

**Step 4: Commit**

```bash
git add src/styles/index.css src/components/Character/Character.tsx
git commit -m "feat: soft edge mask on pose animations (except products/content)"
```
