# Portfolio v5 Refactoring Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Optimize the portfolio for performance, code quality, SEO/AI discoverability, and cross-browser compatibility — without changing anything visually.

**Architecture:** Surgical changes across existing files. No new frameworks, no structural rewrites. Font conversion, asset optimization, semantic HTML additions, structured data, and CSS fixes.

**Tech Stack:** React 19, TypeScript, Vite 8, Tailwind CSS 4, React Router 7

---

### Task 1: Delete dead code and clean up stale files

**Files:**
- Delete: `src/components/NavBar/NavItem.tsx`
- Delete: `public/arrow-left.svg.png`

**Step 1: Verify NavItem.tsx is unused**

Run: `grep -r "NavItem" src/ --include="*.ts" --include="*.tsx"`
Expected: Only hits in `NavItem.tsx` itself, no imports elsewhere.

**Step 2: Delete the files**

```bash
rm src/components/NavBar/NavItem.tsx
rm public/arrow-left.svg.png
```

**Step 3: Verify build still passes**

Run: `npm run build`
Expected: Build succeeds with no errors.

**Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove unused NavItem.tsx and accidental arrow-left.svg.png"
```

---

### Task 2: Convert fonts from TTF to WOFF2

**Files:**
- Modify: `public/fonts/` (add WOFF2 files, keep TTF as fallback)
- Modify: `src/styles/index.css:11-52` (update @font-face declarations)
- Modify: `index.html:8` (update preload href)

**Step 1: Install woff2 converter and convert all fonts**

```bash
brew install woff2
cd public/fonts
for f in *.ttf; do woff2_compress "$f"; done
ls *.woff2
```

Expected: 6 `.woff2` files alongside existing TTFs.

**Step 2: Update @font-face declarations in index.css**

Replace each `@font-face` block to prefer WOFF2 with TTF fallback. Example for the first one — repeat the pattern for all 6:

```css
@font-face {
  font-family: "TN";
  src: url("/fonts/TimesNow-ExtraLight.woff2") format("woff2"),
       url("/fonts/TimesNow-ExtraLight.ttf") format("truetype");
  font-weight: 200;
  font-style: normal;
  font-display: swap;
}
```

Apply this pattern to all 6 `@font-face` blocks (weights 200, 300, 350, 600, 700, 800).

**Step 3: Update font preload in index.html**

Change line 8 from:
```html
<link rel="preload" href="/fonts/TimesNow-SemiLight.ttf" as="font" type="font/ttf" crossorigin />
```
To:
```html
<link rel="preload" href="/fonts/TimesNow-SemiLight.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/fonts/TimesNow-ExtraLight.woff2" as="font" type="font/woff2" crossorigin />
```

(Preload both weight 200 and 350 — used on initial render in navbar and headline.)

**Step 4: Verify build and visual check**

Run: `npm run build`
Expected: Build succeeds. Open dev server and verify fonts render correctly.

**Step 5: Commit**

```bash
git add public/fonts/*.woff2 src/styles/index.css index.html
git commit -m "perf: convert fonts to WOFF2 with TTF fallback"
```

---

### Task 3: Convert poster images from PNG to WebP

**Files:**
- Modify: `public/images/` (add WebP versions)
- Modify: `src/components/Character/Character.tsx:68` (change extension)

**Step 1: Convert all poster PNGs to WebP**

```bash
cd public/images
for f in poster-*.png; do
  cwebp -q 85 "$f" -o "${f%.png}.webp"
done
ls poster-*.webp
```

Expected: 6 `.webp` files created.

**Step 2: Update Character.tsx to use WebP**

In `src/components/Character/Character.tsx`, change line 68 from:
```typescript
const posterSrc = isPosing ? `/images/poster-${state.pose}.png` : "";
```
To:
```typescript
const posterSrc = isPosing ? `/images/poster-${state.pose}.webp` : "";
```

**Step 3: Verify build and visual check**

Run: `npm run build`
Expected: Build succeeds. Check that poster images still display correctly when pose video ends.

**Step 4: Commit**

```bash
git add public/images/*.webp src/components/Character/Character.tsx
git commit -m "perf: convert poster images from PNG to WebP"
```

---

### Task 4: Fix video preload strategy

**Files:**
- Modify: `index.html:9` (remove video preload link)
- Modify: `src/components/Character/VideoPlayer.tsx` (add fetchpriority)

**Step 1: Remove video preload from index.html**

Delete line 9:
```html
<link rel="preload" href="/videos/reveal.mp4" as="video" type="video/mp4" />
```

Browsers deprioritize or ignore `<link rel="preload">` for video. The actual `<video>` element handles loading better.

**Step 2: Add fetchpriority to VideoPlayer**

In `src/components/Character/VideoPlayer.tsx`, add an optional `fetchPriority` prop:

Add to the props interface:
```typescript
fetchPriority?: "high" | "low" | "auto";
```

Add to the `<video>` element:
```typescript
fetchPriority={fetchPriority}
```

**Step 3: Pass fetchPriority="high" for the reveal video**

In `src/components/Character/Character.tsx`, update the reveal VideoPlayer (around line 78-84):
```tsx
<VideoPlayer
  ref={revealRef}
  src="/videos/reveal.mp4"
  autoPlay
  fetchPriority="high"
  className={...}
  onEnded={onRevealComplete}
/>
```

**Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors.

**Step 5: Commit**

```bash
git add index.html src/components/Character/VideoPlayer.tsx src/components/Character/Character.tsx
git commit -m "perf: replace video preload link with fetchpriority on video element"
```

---

### Task 5: Lazy-load pages with React.lazy

**Files:**
- Modify: `src/App.tsx`

**Step 1: Update App.tsx with lazy loading**

Replace the entire file with:
```tsx
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router";

const Home = lazy(() => import("@/pages/Home").then(m => ({ default: m.Home })));
const Experience = lazy(() => import("@/pages/Experience").then(m => ({ default: m.Experience })));

export default function App() {
  return (
    <Suspense fallback={<div className="h-dvh w-full bg-black" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<Experience />} />
      </Routes>
    </Suspense>
  );
}
```

The fallback is a black full-screen div — matches the background so there's no flash.

**Step 2: Verify build produces separate chunks**

Run: `npm run build`
Expected: Build output shows multiple JS chunks (one per page) instead of a single bundle.

**Step 3: Verify navigation works**

Start dev server, navigate between `/` and `/experience`. Both should load without issues.

**Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "perf: lazy-load Home and Experience pages for code splitting"
```

---

### Task 6: Extract named constants and repeated font stacks

**Files:**
- Create: `src/constants.ts`
- Modify: `src/styles/index.css` (add utility class)
- Modify: `src/pages/Home.tsx` (use constants)
- Modify: `src/components/Character/Character.tsx` (use constants)
- Modify: `src/components/Hero/HeroText.tsx` (use utility class)
- Modify: `src/components/Hero/Logo.tsx` (use utility class)
- Modify: `src/components/Layout/ContactLine.tsx` (use utility class)
- Modify: `src/pages/Experience.tsx` (use utility class and constants)

**Step 1: Create constants file**

Create `src/constants.ts`:
```typescript
/** Delay (ms) before UI elements (nav, contact, logo) become visible */
export const REVEAL_UI_DELAY = 2500;

/** Delay (ms) after reveal starts before hero text typing begins */
export const HERO_TYPING_DELAY = 400;

/** Stagger delay (ms) between experience list items */
export const EXPERIENCE_STAGGER_MS = 80;

/** Pose video playback rate multiplier */
export const POSE_PLAYBACK_RATE = 1.25;

/** Pose video start time offset (seconds) — skips intro frames */
export const POSE_START_TIME = 0.8;

/** Near-end offset (seconds) — fires onNearEnd this far before video ends */
export const POSE_NEAR_END_OFFSET = 0.3;
```

**Step 2: Add CSS utility class for the SF Pro font stack**

In `src/styles/index.css`, add after the `@theme` block (after line 9):
```css
/* ─── Font utility ────────────────────────────────────────── */
.font-sf {
  font-family: "SF Pro Text", -apple-system, BlinkMacSystemFont, sans-serif;
}
.font-sf-display {
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
}
```

**Step 3: Replace inline font stacks across components**

In `src/components/Hero/HeroText.tsx` (lines 57 and 78), replace:
```
font-['SF_Pro_Text','-apple-system',BlinkMacSystemFont,sans-serif]
```
With:
```
font-sf
```

In `src/components/Hero/Logo.tsx` (line 11), replace:
```
font-['SF_Pro_Display','-apple-system',BlinkMacSystemFont,sans-serif]
```
With:
```
font-sf-display
```

In `src/components/Layout/ContactLine.tsx` (line 8), replace:
```
font-['SF_Pro_Display','-apple-system',BlinkMacSystemFont,sans-serif]
```
With:
```
font-sf-display
```

In `src/pages/Experience.tsx` line 20, replace:
```
font-['SF_Pro_Text','-apple-system',BlinkMacSystemFont,sans-serif]
```
With:
```
font-sf
```

In `src/pages/Experience.tsx` line 67, replace:
```
font-['SF_Pro_Text','-apple-system',BlinkMacSystemFont,sans-serif]
```
With:
```
font-sf
```

In `src/pages/Experience.tsx` line 44, replace:
```tsx
style={{ fontFamily: '"TN", serif', fontWeight: 200 }}
```
With the Tailwind class (remove the style prop entirely):
```
font-['TN',serif] font-extralight
```

In `src/components/NavBar/NavBar.tsx` line 138, replace:
```
font-['SF_Pro_Display','-apple-system',BlinkMacSystemFont,sans-serif]
```
With:
```
font-sf-display
```

**Step 4: Replace magic numbers with constants**

In `src/pages/Home.tsx`, add import:
```typescript
import { REVEAL_UI_DELAY, HERO_TYPING_DELAY } from "@/constants";
```

Replace line 30: `setTimeout(() => setRevealed(true), 2500)` with:
```typescript
setTimeout(() => setRevealed(true), REVEAL_UI_DELAY)
```

Replace line 37: `setTimeout(() => setHeroReady(true), 400)` with:
```typescript
setTimeout(() => setHeroReady(true), HERO_TYPING_DELAY)
```

In `src/components/Character/Character.tsx`, add import:
```typescript
import { POSE_PLAYBACK_RATE, POSE_START_TIME, POSE_NEAR_END_OFFSET } from "@/constants";
```

Replace line 92: `playbackRate={1.25}` with `playbackRate={POSE_PLAYBACK_RATE}`
Replace line 93: `startTime={0.8}` with `startTime={POSE_START_TIME}`
Replace line 95: `nearEndOffset={0.3}` with `nearEndOffset={POSE_NEAR_END_OFFSET}`

In `src/pages/Experience.tsx`, add import:
```typescript
import { EXPERIENCE_STAGGER_MS } from "@/constants";
```

Replace all `(index + 1) * 80` and `(EXPERIENCE_ENTRIES.length + 1) * 80` and `(EXPERIENCE_ENTRIES.length + 2) * 80` patterns with the constant:
```typescript
(index + 1) * EXPERIENCE_STAGGER_MS
(EXPERIENCE_ENTRIES.length + 1) * EXPERIENCE_STAGGER_MS
(EXPERIENCE_ENTRIES.length + 2) * EXPERIENCE_STAGGER_MS
```

**Step 5: Add comment to reflow hack in Character.tsx**

In `src/components/Character/Character.tsx`, the comment at line 38 already exists ("Re-trigger mask animation: remove class, force reflow, re-add"). Verify it's clear enough. If not, update to:
```typescript
// Force browser reflow to re-trigger CSS animation.
// Without this, removing and re-adding a class in the same
// synchronous block is batched and the animation won't restart.
```

**Step 6: Verify build**

Run: `npm run build`
Expected: Build succeeds, no TypeScript errors.

**Step 7: Commit**

```bash
git add src/constants.ts src/styles/index.css src/pages/Home.tsx src/pages/Experience.tsx src/components/Character/Character.tsx src/components/Hero/HeroText.tsx src/components/Hero/Logo.tsx src/components/Layout/ContactLine.tsx src/components/NavBar/NavBar.tsx
git commit -m "refactor: extract constants, font utilities, and clean up magic numbers"
```

---

### Task 7: Add Home page frost glow behind navbar

**Files:**
- Modify: `src/pages/Home.tsx` (add glow element)
- Modify: `src/styles/index.css` (add glow styles)

**Step 1: Add CSS for the frost glow**

In `src/styles/index.css`, add before the `/* ─── Experience page animations */` comment:

```css
/* ─── Home frost glow (gives backdrop-filter something to blur) ── */
.home-nav-glow {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 280px;
  background: radial-gradient(
    ellipse 80% 100% at 50% 100%,
    rgba(120, 130, 180, 0.06) 0%,
    rgba(80, 90, 140, 0.03) 40%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
}
```

This is a very subtle cool-toned radial gradient at the bottom of the viewport. It provides just enough visual information for `backdrop-filter: blur()` to produce the frosted appearance, without being noticeable on its own.

**Step 2: Add the glow element to Home.tsx**

In `src/pages/Home.tsx`, add the glow div inside `<MainLayout>`, just before the `<NavBar>` component:

```tsx
{/* Subtle glow for navbar frost effect */}
<div
  className={`home-nav-glow transition-opacity duration-300 ${
    revealed ? "opacity-100" : "opacity-0"
  }`}
/>
```

**Step 3: Visual check**

Open the dev server. The Home page navbar should now show a subtle frosted glass appearance similar to the Experience page. The glow itself should be nearly imperceptible — it's just providing "material" for the blur.

If the frost is too subtle, increase the rgba alpha values slightly (e.g., 0.06 to 0.08). If it's too visible as its own element, decrease them.

**Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 5: Commit**

```bash
git add src/pages/Home.tsx src/styles/index.css
git commit -m "feat: add subtle glow behind Home navbar for visible frost effect"
```

---

### Task 8: Cross-browser CSS fixes

**Files:**
- Modify: `src/styles/index.css`
- Modify: `src/components/Layout/MainLayout.tsx`
- Modify: `src/pages/Experience.tsx`

**Step 1: Add standard mask-image properties to maskRevealC keyframes**

In `src/styles/index.css`, update the `@keyframes maskRevealC` block (lines 333-346) to include both `-webkit-mask-image` and standard `mask-image`:

```css
@keyframes maskRevealC {
  0% {
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, transparent 30%, black 70%, black 100%);
    mask-image: linear-gradient(to bottom, transparent 0%, transparent 30%, black 70%, black 100%);
  }
  40% {
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 40%, black 100%);
    mask-image: linear-gradient(to bottom, transparent 0%, black 40%, black 100%);
  }
  60% {
    -webkit-mask-image: linear-gradient(to bottom, black 0%, black 100%);
    mask-image: linear-gradient(to bottom, black 0%, black 100%);
  }
  100% {
    -webkit-mask-image: linear-gradient(to bottom, black 0%, black 100%);
    mask-image: linear-gradient(to bottom, black 0%, black 100%);
  }
}
.animate-mask-c {
  animation: maskRevealC 1.8s ease-out forwards;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, transparent 30%, black 70%, black 100%);
  mask-image: linear-gradient(to bottom, transparent 0%, transparent 30%, black 70%, black 100%);
}
```

**Step 2: Add dvh fallback to MainLayout**

In `src/components/Layout/MainLayout.tsx`, change:
```tsx
<div className="relative h-dvh w-full bg-black">
```
To:
```tsx
<div className="relative h-screen h-dvh w-full bg-black">
```

Tailwind processes classes left-to-right, so `h-screen` (100vh) applies first and `h-dvh` (100dvh) overrides it. Browsers that don't support `dvh` fall back to `vh`.

**Step 3: Add dvh fallback to Experience page**

In `src/pages/Experience.tsx`, change line 36:
```tsx
<div className="relative min-h-dvh w-full bg-black">
```
To:
```tsx
<div className="relative min-h-screen min-h-dvh w-full bg-black">
```

**Step 4: Add will-change hints to animated elements**

In `src/styles/index.css`:

Add to `.navbar-lens`:
```css
will-change: transform, width;
```

Add to `.menu-overlay`:
```css
will-change: opacity, visibility;
```

**Step 5: Verify build and cross-browser check**

Run: `npm run build`
Expected: Build succeeds. Test in Chrome, Firefox, Safari.

**Step 6: Commit**

```bash
git add src/styles/index.css src/components/Layout/MainLayout.tsx src/pages/Experience.tsx
git commit -m "fix: cross-browser CSS — standard mask-image, dvh fallback, will-change hints"
```

---

### Task 9: SEO — Semantic HTML on Home page

**Files:**
- Modify: `src/pages/Home.tsx`
- Modify: `src/components/Layout/MainLayout.tsx`

**Step 1: Add semantic landmarks to MainLayout**

Update `src/components/Layout/MainLayout.tsx`:
```tsx
import type { ReactNode } from "react";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-screen h-dvh w-full bg-black" role="document">
      {children}
    </div>
  );
}
```

**Step 2: Add semantic structure to Home.tsx**

Wrap the Logo in a `<header>`, wrap the character + text area in a `<main>` with a visually hidden `<h1>`, and wrap ContactLine in a `<footer>`.

In `src/pages/Home.tsx`, update the return block:

```tsx
return (
  <MainLayout>
    <header>
      <Logo visible={revealed} />
    </header>

    <main>
      {/* Visually hidden h1 for SEO/accessibility */}
      <h1 className="sr-only">
        Evgeny Shkuratov — Product Design Engineer
      </h1>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+80px)] w-[300px] h-[300px] md:-translate-y-[calc(50%+48px)] md:-translate-x-[calc(50%+24px)] md:w-[400px] md:h-[400px] lg:w-[550px] lg:h-[550px]">
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

      {/* Subtle glow for navbar frost effect */}
      <div
        className={`home-nav-glow transition-opacity duration-300 ${
          revealed ? "opacity-100" : "opacity-0"
        }`}
      />
    </main>

    <nav>
      <NavBar
        onHoverPose={hoverPose}
        onLeavePose={leavePose}
        visible={revealed}
      />
    </nav>

    <footer>
      <ContactLine visible={revealed} />
    </footer>
  </MainLayout>
);
```

Note: Tailwind 4 includes `sr-only` by default (`position: absolute; width: 1px; height: 1px; ...`).

**Step 3: Add semantic structure to Experience.tsx**

Wrap heading and experience list in `<section>` elements. The page already has `<main>` — add heading hierarchy:

The `<h1>` is already the headline. Wrap the experience list in a `<section>` with an `<h2>`:

In `src/pages/Experience.tsx`, add around the experience list div:
```tsx
<section aria-label="Work experience">
  <h2 className="sr-only">Work Experience</h2>
  <div className="w-full max-w-[887px]">
    {/* ...existing experience entries... */}
  </div>
</section>
```

**Step 4: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 5: Commit**

```bash
git add src/pages/Home.tsx src/pages/Experience.tsx src/components/Layout/MainLayout.tsx
git commit -m "seo: add semantic HTML landmarks and heading hierarchy"
```

---

### Task 10: SEO — Meta tags, Open Graph, structured data

**Files:**
- Modify: `index.html`
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`

**Step 1: Update index.html with full meta tags and JSON-LD**

Replace `index.html` with:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Evgeny Shkuratov — AI Product Design Engineer. Senior designer with 7+ years shipping products people love. Portfolio, case studies, and experience." />
    <meta name="author" content="Evgeny Shkuratov" />
    <title>Shkuratov Designer — AI Product Design Engineer</title>

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Shkuratov Designer — AI Product Design Engineer" />
    <meta property="og:description" content="Senior product designer with 7+ years shipping products people love. Portfolio, case studies, and experience." />
    <meta property="og:locale" content="en_US" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Shkuratov Designer — AI Product Design Engineer" />
    <meta name="twitter:description" content="Senior product designer with 7+ years shipping products people love." />

    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Evgeny Shkuratov",
      "jobTitle": "AI Product Design Engineer",
      "description": "Senior product designer with 7+ years of experience building products people love and trust.",
      "url": "https://shkuratov.design",
      "sameAs": [
        "https://www.linkedin.com/in/evgeny-shkuratov-b34a99174/"
      ],
      "knowsAbout": [
        "Product Design",
        "UI/UX Design",
        "AI Product Design",
        "Design Engineering",
        "Prototyping",
        "User Research"
      ],
      "hasOccupation": [
        {
          "@type": "Occupation",
          "name": "Senior Product Designer",
          "description": "B2B messenger app with 100,000+ daily users",
          "startDate": "2024"
        },
        {
          "@type": "Occupation",
          "name": "Senior Product Designer",
          "description": "HyperADX Smart Programmatic Platform",
          "startDate": "2024",
          "endDate": "2025"
        },
        {
          "@type": "Occupation",
          "name": "Lead Product Designer",
          "description": "Edtech platform with 15M+ users",
          "startDate": "2023",
          "endDate": "2024"
        },
        {
          "@type": "Occupation",
          "name": "Senior Product Designer",
          "description": "Edtech platform with 15M+ users",
          "startDate": "2020",
          "endDate": "2023"
        },
        {
          "@type": "Occupation",
          "name": "UX/UI Designer",
          "description": "ITMINT IT company",
          "startDate": "2018",
          "endDate": "2019"
        }
      ]
    }
    </script>

    <!-- Fonts -->
    <link rel="preload" href="/fonts/TimesNow-SemiLight.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/TimesNow-ExtraLight.woff2" as="font" type="font/woff2" crossorigin />

    <!-- Noscript fallback for crawlers -->
    <noscript>
      <style>
        .noscript-content { max-width: 700px; margin: 40px auto; padding: 20px; font-family: system-ui, sans-serif; color: #ccc; background: #000; }
        .noscript-content h1 { color: #fff; font-size: 1.5rem; margin-bottom: 1rem; }
        .noscript-content h2 { color: #fff; font-size: 1.2rem; margin-top: 1.5rem; }
        .noscript-content a { color: #d77757; }
        .noscript-content ul { padding-left: 1.5rem; }
        .noscript-content li { margin-bottom: 0.5rem; }
      </style>
    </noscript>
  </head>
  <body class="bg-black">
    <div id="root"></div>

    <noscript>
      <div class="noscript-content">
        <h1>Evgeny Shkuratov — AI Product Design Engineer</h1>
        <p>Senior product designer with 7+ years of experience building products people love and trust.</p>

        <h2>Experience</h2>
        <ul>
          <li><strong>2024 — Present:</strong> Senior Product Designer — B2B messenger app with 100,000+ daily users</li>
          <li><strong>2024 — 2025:</strong> Senior Product Designer — HyperADX Smart Programmatic Platform</li>
          <li><strong>2023 — 2024:</strong> Lead Product Designer — Edtech platform with 15M+ users</li>
          <li><strong>2020 — 2023:</strong> Senior Product Designer — Edtech platform with 15M+ users</li>
          <li><strong>2018 — 2019:</strong> UX/UI Designer — ITMINT IT company</li>
        </ul>

        <h2>Contact</h2>
        <p>Email: <a href="mailto:shkuratovdesigner@gmail.com">shkuratovdesigner@gmail.com</a></p>
        <p>LinkedIn: <a href="https://www.linkedin.com/in/evgeny-shkuratov-b34a99174/">linkedin.com/in/evgeny-shkuratov</a></p>
      </div>
    </noscript>

    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Step 2: Create robots.txt**

Create `public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://shkuratov.design/sitemap.xml
```

**Step 3: Create sitemap.xml**

Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.w3.org/2000/svg/sitemap/0.9">
  <url>
    <loc>https://shkuratov.design/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://shkuratov.design/experience</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

**Step 4: Add per-page title updates**

In `src/pages/Home.tsx`, add inside the component (after state declarations):
```typescript
useEffect(() => {
  document.title = "Shkuratov Designer — AI Product Design Engineer";
}, []);
```

In `src/pages/Experience.tsx`, add inside the component:
```typescript
import { useEffect } from "react";
// ... inside component:
useEffect(() => {
  document.title = "Experience — Shkuratov Designer";
}, []);
```

**Step 5: Verify build**

Run: `npm run build`
Expected: Build succeeds. Check `dist/` contains `robots.txt` and `sitemap.xml`.

**Step 6: Commit**

```bash
git add index.html public/robots.txt public/sitemap.xml src/pages/Home.tsx src/pages/Experience.tsx
git commit -m "seo: add Open Graph, JSON-LD structured data, noscript fallback, robots.txt, sitemap"
```

---

### Task 11: Final verification

**Step 1: Full build**

Run: `npm run build`
Expected: Clean build with no errors. Check bundle sizes are similar or smaller.

**Step 2: Visual regression check**

Open dev server. Check these pages/states:
- Home page initial reveal animation
- Home page navbar frost effect (new)
- Home page hover each nav item — verify pose videos, text, poster images
- Home page mobile view — swipe, hamburger menu, overlay
- Experience page — fade-up animations, scroll reveal, YouTube embed
- Experience page navbar frost effect

**Step 3: Cross-browser check**

Test in Chrome, Firefox, Safari:
- Navbar glass effect visible in all browsers
- Character mask reveal animation works
- Pose edge mask visible
- Fonts render correctly (WOFF2)
- Mobile nav works

**Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: final adjustments from verification pass"
```
