# Cases 3 & 4 — Design Document

## Overview

Add the final two case study cards to the Cases page:
- **Case 3 (B2B Stickers):** 4 Lottie-animated characters scattered around centered title text
- **Case 4 (AI SEO Startup):** Typing machine video playing silently like a GIF, reusing existing `CaseVideoPreview`

## Data Model

### New type added to CaseData union

```typescript
type: "video" | "cinematic" | "lottie"
```

### New interface for Lottie positioning

```typescript
interface LottieAsset {
  src: string;
  name: string;
  position: { top?: string; left?: string; right?: string; bottom?: string };
  size: string;
}
```

### New field on CaseData

```typescript
lottieAssets?: LottieAsset[];
```

### Case 3 data entry

```typescript
{
  id: "b2b-stickers",
  type: "lottie",
  title: [
    { text: "Built ", highlighted: false },
    { text: "animated stickers & GIFs", highlighted: true },
    { text: " that made a B2B messenger more engaging", highlighted: false },
  ],
  lottieAssets: [
    { src: "/lottie/Mocking.lottie",     name: "Mocking",      position: { top: "181px", left: "0" },    size: "261px" },
    { src: "/lottie/Alien Face.lottie",   name: "Alien Face",   position: { top: "0", left: "381px" },    size: "198px" },
    { src: "/lottie/Evil Smoking.lottie", name: "Evil Smoking",  position: { top: "49px", right: "0" },   size: "280px" },
    { src: "/lottie/Selfie.lottie",       name: "Selfie",       position: { bottom: "0", left: "597px" }, size: "192px" },
  ],
}
```

### Case 4 data entry

```typescript
{
  id: "ai-seo-startup",
  type: "video",
  title: [
    { text: "From 0% to 5% conversion. ", highlighted: false },
    { text: "Redesigning an AI SEO startup", highlighted: true },
  ],
  videoSrc: "/videos/typing-machine.mp4",
}
```

## Components

### CaseLottieScatter.tsx (Desktop)

- Container: `relative`, `max-w-[1235px]`, `h-[669px]`, centered
- 4 `DotLottieReact` players positioned absolutely using data-driven `position` and `size`
- Title centered at `top-[280px]` with `max-w-[527px]`, font-size `32px`
- Entry animation: `experience-fade-up`
- All Lottie players: `autoplay`, `loop`

### CaseLottieMobile.tsx (Mobile)

- Vertical flex column, centered
- Row 1: Mocking + Alien Face side-by-side (~120px each), `gap-[16px]`
- Title + "View Case Study"
- Row 2: Evil Smoking + Selfie side-by-side, same layout

### CaseSection.tsx update

Add `"lottie"` case to the switch statement, routing to `CaseLottieScatter` (desktop) or `CaseLottieMobile` (mobile).

### Case 4 — no new components

Reuses `CaseVideoPreview` identically to Case 1.

## Asset Organization

- `.lottie` files → `public/lottie/` (Mocking.lottie, Alien Face.lottie, Evil Smoking.lottie, Selfie.lottie)
- `typing machine.mp4` → `public/videos/typing-machine.mp4`

## Dependency

Install `@lottiefiles/dotlottie-react` as a production dependency.

## Desktop Lottie Positioning (from Figma)

| Character      | Position                  | Size      |
|----------------|---------------------------|-----------|
| Mocking (cup)  | top: 181px, left: 0       | 261×261px |
| Alien Face     | top: 0, left: 381px       | 198×198px |
| Evil Smoking   | top: 49px, right: 0       | 280×280px |
| Selfie (turkey)| bottom: 0, left: 597px    | 192×192px |

Title block: centered at top: 280px, max-w: 527px, font-size: 32px.

## Performance

- `.lottie` binary format is already compressed — lighter than JSON Lottie
- No video frame extraction needed — lightest case type
- DotLottieReact runtime is ~45KB
