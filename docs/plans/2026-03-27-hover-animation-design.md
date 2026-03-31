# Seamless Hover Animation Design

## Problem
Hover animations on desktop nav links have a long delay because a `transition.mp4` must play fully before the pose video starts. Pose videos loop infinitely instead of playing once.

## Solution: Simplified State Machine (Approach A)

### State Machine
```
loading → revealing → idle ⇄ posing(pose, videoEnded)
```

- `loading` — waiting for assets
- `revealing` — reveal.mp4 playing
- `idle` — default, no hover
- `posing` — has `pose` (which link) and `videoEnded` (boolean)

### Hover Flow
1. Mouse enters link → state = `posing(pose, videoEnded: false)`, play `pose-*.mp4` once (no loop)
2. Video ends → set `videoEnded: true`, show `poster-*.png` as static image
3. Mouse moves to different link → immediately reset: `posing(newPose, videoEnded: false)`, play new video
4. Mouse leaves nav → state = `idle`

### Component Changes
- **`useCharacterState.ts`** — remove `transitioning-to-pose` and `transitioning-to-idle` phases. Add `videoEnded` flag to posing state. `hoverPose()` goes straight to posing. `leavePose()` goes straight to idle. Add `onPoseVideoEnded()` action.
- **`Character.tsx`** — remove transition video layer. When `posing + !videoEnded`: show pose video. When `posing + videoEnded`: show poster `<img>`. Remove `onTransitionComplete` prop.
- **`VideoPlayer.tsx`** — no changes needed
- **Poster images** — `poster-*.png` from `/public/images/`, rendered as `<img>` overlay

### Transition Feel
- Video starts immediately on hover (no intermediate step)
- Pose videos already contain smooth transition from idle in first frames
- Switching between links is instant — previous video stops, new one starts from frame 0
