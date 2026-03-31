# Pose Text Typewriter Animation — Design Document

## Overview

Add per-pose descriptive text that appears with a character-by-character typewriter animation when hovering navbar items. Each of the 6 character poses (Experience, Products, Cases, Content, About, Resume) has unique text content with two-tone styling (white emphasis + gray secondary). The text replaces the default HeroText during hover and synchronizes with the character pose video animation.

## Decisions

- **Type-in style:** Character-by-character (typewriter), each character gets its final color immediately
- **Pose-to-pose transition:** Fade out old text (200ms), then type-in new text fresh
- **Leave behavior:** Fade out pose text (200ms), HeroText reappears instantly (no animation)
- **Idle state:** Original HeroText content visible
- **Timing:** Typing duration calibrated to ~2.5s to match pose video length at 1.25x speed
- **Mobile:** PoseText only renders on desktop (lg: breakpoint). No hover on mobile
- **Architecture:** Approach A — dedicated PoseText component + useTypewriter hook + data config

## Data Configuration

New file: `src/data/poseTextData.ts`

Each pose maps to an array of lines, each line an array of segments with color:

```typescript
type TextSegment = { text: string; color: "white" | "secondary" };
type PoseLine = TextSegment[];
type PoseTextConfig = { [key in CharacterPose]: PoseLine[] };
```

### Text Content Per Pose

**Experience:**
- Line 1: `[white: "Before AI"] [gray: " made everyone a builder, "] [white: "I was already designing products."]`
- Line 2: `[gray: "Now imagine what I do with it."]`

**Products:**
- Line 1: `[gray: "Some people have hobbies. "] [white: "I ship products. Mockups were never enough."]`
- Line 2: `[gray: "I need to see it live, used, real."]`

**Cases:**
- Line 1: `[white: "Want to see how I think?"]`
- Line 2: `[gray: "Not just what I design, but how I solve problems. It's all here."]`

**Content:**
- Line 1: `[white: "I share everything I learn."]`
- Line 2: `[gray: "YouTube deep dives, LinkedIn posts, quick reels."]`
- Line 3: `[gray: "No gatekeeping"]`

**About:**
- Line 1: `[white: "Behind the pixels there's a person."]`
- Line 2: `[gray: "Values, passions, weird hobbies."]`
- Line 3: `[gray: "Get to know me."]`

**Resume:**
- Line 1: `[white: "Need the formal version?"]`
- Line 2: `[gray: "Got it."]`
- Line 3: `[gray: "Clean PDF."]`
- Line 4: `[gray: "Opens in a new tab."]`

## useTypewriter Hook

New file: `src/hooks/useTypewriter.ts`

```
useTypewriter(pose: CharacterPose | null, targetDuration: number)
  → { visibleChars, totalChars, isTyping, phase }
```

- **phase:** `"idle" | "typing" | "fading-out"`
- Pose arrives → flatten all segments, calculate `msPerChar = targetDuration / totalChars`
- Typing: `setInterval` increments `visibleChars` by 1 each tick
- Pose changes (A → B): phase → "fading-out", wait 200ms, reset visibleChars, start typing new pose
- Pose clears (leave): phase → "fading-out", wait 200ms, reset to idle
- Dynamic speed: shorter texts type slower, longer texts type faster (all finish in ~targetDuration)

## PoseText Component

New file: `src/components/Hero/PoseText.tsx`

Renders typewriter output by slicing through structured text data using visibleChars as cursor:
- Running charIndex counter across lines → segments → characters
- Each character rendered only if charIndex < visibleChars
- Segment color applied per-character immediately

**Styling (matching Figma):**
- Font: SF Pro Text, 18px, line-height 1.3
- Width: ~219-222px
- Positioned same as HeroText (absolute, top-right of character container)
- White: `text-white`, Gray: `text-text-secondary` (#999899)
- Lines separated by `mb-3`

**Visibility:**
- idle → opacity-0
- typing → opacity-100
- fading-out → opacity-0 with transition-opacity duration-200

## Integration

Modified file: `src/pages/Home.tsx`

```tsx
<HeroText visible={revealed && state.phase !== "posing"} />
<PoseText pose={state.phase === "posing" ? state.pose : null} />
```

Modified file: `src/components/Hero/index.ts` — export PoseText

## State Flow

```
Idle (HeroText visible, PoseText hidden)
  → hover nav item
    → HeroText hides instantly
    → PoseText types in char-by-char (~2.5s)
  → hover different item (before or after typing)
    → PoseText fades out (200ms)
    → PoseText types new text fresh
  → mouse leaves navbar
    → PoseText fades out (200ms)
    → HeroText appears instantly
```

## Edge Cases

| Scenario | Behavior |
|----------|----------|
| Rapid hover across multiple items | Each new pose cancels previous cycle. Latest pose types after 200ms fade |
| Hover during reveal animation | Works — character state allows posing during reveal |
| Hover, leave, re-hover same item quickly | Fade → cancel if re-hover within 200ms → fresh type-in |
| Mobile / no hover | PoseText hidden, only desktop (lg: breakpoint) |

## Files Changed

**New:**
1. `src/data/poseTextData.ts` — text content config
2. `src/hooks/useTypewriter.ts` — typing animation hook
3. `src/components/Hero/PoseText.tsx` — rendering component

**Modified:**
1. `src/pages/Home.tsx` — wire PoseText + adjust HeroText visibility
2. `src/components/Hero/index.ts` — export PoseText

**Unchanged:**
- useCharacterState, NavBar, VideoPlayer, Character — no modifications needed
