# HeroText Relative-to-Video Positioning — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Position HeroText relative to the Character video container so text stays anchored at 16px top / 159px right of the video on all desktop viewports.

**Architecture:** Wrap Character and HeroText in a shared container that carries the viewport-centered absolute positioning. Character fills the container; HeroText is positioned absolutely within it on `lg+`. Mobile/tablet layout unchanged.

**Tech Stack:** React, Tailwind CSS v4, Vite

---

## Task 1: Add shared wrapper in Home.tsx

**Files:**
- Modify: `src/pages/Home.tsx:44-52`

**Step 1: Wrap Character + HeroText in a positioning container**

Replace the standalone `<Character>` and `<HeroText>` with a wrapper div that takes over Character's positioning and sizing:

```tsx
{/* Character + HeroText wrapper — shared positioning context */}
<div className="absolute left-1/2 top-1/2 -translate-x-[calc(50%+24px)] -translate-y-[calc(50%+48px)] w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[550px] lg:h-[550px]">
  <Character
    state={state}
    onRevealComplete={handleRevealComplete}
    onTransitionComplete={onTransitionComplete}
  />

  <HeroText visible={revealed} />
</div>
```

Note: the `className` prop is removed from `<Character>` — the wrapper now owns positioning and sizing.

**Step 2: Verify dev server compiles**

Run: `npm run dev`
Expected: No build errors. Page loads. Character and text visible (text may overlap — that's fixed in Task 3).

**Step 3: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "refactor: wrap Character + HeroText in shared positioning container"
```

---

## Task 2: Simplify Character root div

**Files:**
- Modify: `src/components/Character/Character.tsx:66-68`

**Step 1: Remove sizing and let Character fill its wrapper**

Change the root div's className from:

```tsx
className={`relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[550px] lg:h-[550px] ${videoPlaying ? "animate-mask-c" : "invisible"} ${className}`}
```

To:

```tsx
className={`relative w-full h-full ${videoPlaying ? "animate-mask-c" : "invisible"} ${className}`}
```

The wrapper in Home.tsx now controls the size. Character just fills it.

**Step 2: Verify dev server — character renders at correct size**

Run: `npm run dev`
Expected: Character video displays at 550x550 on desktop, same as before. No visual change.

**Step 3: Commit**

```bash
git add src/components/Character/Character.tsx
git commit -m "refactor: Character fills parent container instead of owning its size"
```

---

## Task 3: Reposition HeroText relative to wrapper

**Files:**
- Modify: `src/components/Hero/HeroText.tsx:8-9`

**Step 1: Update desktop positioning classes**

Change the className from:

```
absolute w-[247px] left-1/2 -translate-x-1/2 top-[70%] lg:left-auto lg:translate-x-0 lg:top-[95px] lg:right-[calc(50%-280px)]
```

To:

```
absolute w-[247px] left-1/2 -translate-x-1/2 top-[70%] lg:left-[calc(100%+159px)] lg:translate-x-0 lg:top-[16px]
```

Key changes on `lg+`:
- `lg:left-[calc(100%+159px)]` — left edge of text is 159px past the right edge of the video
- `lg:top-[16px]` — 16px from the top edge of the video
- `lg:translate-x-0` — cancel the mobile centering transform
- Removed `lg:left-auto` and `lg:right-[calc(50%-280px)]` — no longer needed

**Step 2: Visual verification**

Run: `npm run dev`
Expected: On desktop, text appears to the right of the character, 16px from the top and 159px from the right edge. Resizing the browser window — text and video move together as a unit.

**Step 3: Commit**

```bash
git add src/components/Hero/HeroText.tsx
git commit -m "feat: position HeroText relative to Character video container"
```

---

## Task 4: Cross-viewport visual verification

**Step 1: Test at multiple desktop widths**

Resize browser to various widths above `lg` breakpoint (1024px+). Confirm:
- Text stays 16px from top of video
- Text stays 159px from right edge of video
- No text clipping or overflow issues

**Step 2: Test at tablet/mobile widths**

Resize below `lg` breakpoint. Confirm:
- Text falls back to centered-below layout (existing mobile behavior)
- Character still renders at correct responsive sizes (300px mobile, 400px tablet)

**Step 3: Test animations**

- Reload page — mask reveal animation still works
- Hover nav items — pose transitions still work
- Text fade-in still works
