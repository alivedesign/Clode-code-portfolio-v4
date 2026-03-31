# Mobile Swipe Navigation Design

## Overview

Add swipe gestures and arrow buttons to mobile so users can navigate through all 6 character poses — reusing the existing desktop hover system (video, typewriter, poster) with zero changes to the core pose infrastructure.

## Pose Cycle

Ordered array, looped:
```
["experience", "products", "cases", "content", "about", "resume"]
```

- Right arrow / swipe left → next pose (wraps resume → experience)
- Left arrow / swipe right → previous pose (wraps experience → resume)
- Initial state: idle (no active pose). First right tap → experience. First left tap → resume.
- Once a pose is active, it stays active — no return to idle.

## Swipe Hook (`useSwipe`)

Custom hook: `useSwipe(onSwipeLeft, onSwipeRight)`

Returns `{ onTouchStart, onTouchMove, onTouchEnd }` to spread onto the swipe zone div.

Detection:
- `onTouchStart` — record starting X position
- `onTouchMove` — track current X
- `onTouchEnd` — if `|deltaX| > 50px`, trigger swipe. Negative delta = swipe left (next). Positive = swipe right (previous).

No visual drag effect — purely detection, then instant pose switch.

## Swipe Zone

A div wrapping the character + arrows area (middle vertical portion of the screen). Does not interfere with bottom nav bar or top logo area.

## Arrow Buttons

- SVGs: `/arrow-left.svg` and `/arrow-right.svg` (28x21px, gray #999899)
- Positioned: vertically centered on the character, one on each side
- Always visible on mobile from page load (even in idle state)
- Hidden on desktop
- `<button>` elements with `aria-label="Previous pose"` / `"Next pose"`
- No special press/active state

## Changes to Existing Components

### `NavBar.tsx` — Mobile bottom bar
- Currently: tapping Experience/Products/Cases calls `onHoverPose(pose)`
- Change: tapping navigates to the page instead (no pose trigger on mobile)

### `Home.tsx` — Wire up pose cycling
- New state: `mobilePoseIndex` (number | null, starts null)
- New functions: `nextPose()` / `prevPose()` that update index and call `hoverPose(POSE_ORDER[newIndex])`
- Pass `nextPose`, `prevPose` down to new `MobileSwipeZone` component

### `PoseText.tsx` — Show on mobile
- Currently: hidden on mobile (`hidden lg:block`)
- Change: visible on mobile when pose is active via swipe/arrows
- Positioning: centered below character (matching Figma)

### New: `MobileSwipeZone.tsx`
- Wraps character area + arrow buttons
- Attaches swipe touch handlers
- Only rendered when `isMobile` is true

## No Changes Needed

These systems work as-is — the mobile swipe simply calls `hoverPose()` like desktop does:
- `useCharacterState` (state machine)
- `VideoPlayer` (video playback)
- `Character` (video layers, poster)
- `useTypewriter` (typewriter animation + caching)
- `poseTextData` (text content)

## Mobile Flow

1. Page loads → reveal video plays → arrows visible on both sides
2. User taps right arrow (or swipes left) → `hoverPose("experience")`
3. Experience video plays (1.25x, starts 0.8s), typewriter types experience text
4. Video ends → poster shows, text stays
5. Right arrow again → fade text (200ms), switch to "products", new video + typewriter
6. Swipe right → goes back to "experience" (instant text via typewriter cache)
7. Wraps at edges: resume → experience, experience → resume
8. Bottom nav links navigate to pages (no pose animation on mobile)
9. Hamburger menu unchanged
