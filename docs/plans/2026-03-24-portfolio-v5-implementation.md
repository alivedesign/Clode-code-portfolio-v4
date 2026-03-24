# Portfolio v5 Main Page — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the v5 portfolio main page with animated 3D character, liquid glass navigation, and cinematic entry sequence using Vite + React.

**Architecture:** Vite 6 + React 19 + TypeScript + Tailwind CSS 4 static site. Character poses driven by a video state machine with two stacked `<video>` elements for flicker-free transitions. Liquid glass nav bar using SVG `feDisplacementMap` filters. No animation libraries — CSS transitions + native video API only.

**Tech Stack:** Vite 6, React 19, TypeScript, Tailwind CSS 4, React Router 7

**Design doc:** `docs/plans/2026-03-24-portfolio-v5-design.md`

**Available assets:**
- Reveal video: `hf_20260313_101353_96177853-f3a8-441e-92bd-09d49f74df8f.mp4` (1440x1440, H.264, 24fps)
- Pose videos: `Experience_vid.mp4`, `Products_vid.mp4`, `cases_vid.mp4`, `Content_vid.mp4`, `About_vid.mp4`, `resume_vid.mp4` (~3s each, ~5-6MB each)
- Transition videos: `hf_20260313_101321_*.mp4`, `hf_20260313_101343_*.mp4` (~3.4-3.7MB)
- Static character image: `hf_20260310_134542_091ff757-77e5-44d1-8588-9e2f5b6f6192.png` (poster frame)
- Pose poster PNGs: `Experience.png`, `Products.png`, `cases.png`, `Content.png`, `About.png`, `resume.png`

---

## Task 1: Scaffold Vite + React + TypeScript project

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`
- Create: `src/main.tsx`, `src/App.tsx`
- Create: `src/styles/index.css`

**Step 1: Scaffold project in the current repo root (v5 branch)**

Remove existing Next.js files and scaffold fresh. Since we're on the `v5` branch, the old code is preserved in `v4-archive` and `main`.

```bash
# From repo root, remove old source files (v4 is archived)
rm -rf app/ components/ contexts/ lib/ public/images public/logos public/videos
rm -f next.config.ts next-env.d.ts postcss.config.mjs tailwind.config.ts

# Scaffold Vite project into a temp dir and move files
npm create vite@latest temp-scaffold -- --template react-ts
cp temp-scaffold/vite.config.ts .
cp temp-scaffold/tsconfig.json .
cp temp-scaffold/tsconfig.app.json .
cp temp-scaffold/tsconfig.node.json .
cp temp-scaffold/index.html .
cp -r temp-scaffold/src .
rm -rf temp-scaffold
```

**Step 2: Update `index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Evgeny Shkuratov — Product Design Engineer" />
    <title>Shkuratov Designer</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
  </head>
  <body class="bg-black">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

**Step 3: Install dependencies**

```bash
npm install react@19 react-dom@19 react-router@7
npm install -D @vitejs/plugin-react typescript @types/react @types/react-dom
npm install -D tailwindcss@4 @tailwindcss/vite
```

**Step 4: Configure Vite with Tailwind**

`vite.config.ts`:
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": "/src" },
  },
});
```

**Step 5: Set up Tailwind CSS 4 entry**

`src/styles/index.css`:
```css
@import "tailwindcss";

@theme {
  --color-background: #000000;
  --color-text: #ffffff;
  --color-text-secondary: #999899;
  --color-accent: #d77757;
  --color-glass: rgba(255, 255, 255, 0.1);
}
```

**Step 6: Create minimal App**

`src/App.tsx`:
```tsx
export default function App() {
  return (
    <div className="h-dvh w-full bg-background text-text">
      <p className="text-text-secondary">Portfolio v5</p>
    </div>
  );
}
```

`src/main.tsx`:
```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

**Step 7: Verify dev server starts**

```bash
npm run dev
```

Expected: Browser shows "Portfolio v5" in gray text on black background at `http://localhost:5173`

**Step 8: Commit**

```bash
git add -A
git commit -m "feat(v5): scaffold Vite + React 19 + Tailwind 4 project"
```

---

## Task 2: Copy and optimize video assets

**Files:**
- Create: `public/videos/reveal.mp4`
- Create: `public/videos/idle.mp4` (use reveal for now, replace later)
- Create: `public/videos/pose-experience.mp4`
- Create: `public/videos/pose-products.mp4`
- Create: `public/videos/pose-cases.mp4`
- Create: `public/videos/pose-content.mp4`
- Create: `public/videos/pose-about.mp4`
- Create: `public/videos/pose-resume.mp4`
- Create: `public/videos/transition.mp4`
- Create: `public/images/character-poster.png`

**Step 1: Create asset directories**

```bash
mkdir -p public/videos public/images public/fonts
```

**Step 2: Re-encode videos to 720px width for web delivery**

The source videos are 1440x1440 — we need to compress them for web. Target: 720x720, H.264, CRF 23, no audio.

```bash
MATERIALS="/Users/shkuratovdesigner/Desktop/Projects/portfolio materials"

# Reveal
ffmpeg -i "$MATERIALS/hf_20260313_101353_96177853-f3a8-441e-92bd-09d49f74df8f.mp4" \
  -vf "scale=720:720" -c:v libx264 -crf 23 -preset medium -pix_fmt yuv420p -an \
  -movflags +faststart public/videos/reveal.mp4

# Pose videos
ffmpeg -i "$MATERIALS/Experience_vid.mp4" \
  -vf "scale=720:720" -c:v libx264 -crf 23 -preset medium -pix_fmt yuv420p -an \
  -movflags +faststart public/videos/pose-experience.mp4

ffmpeg -i "$MATERIALS/Products_vid.mp4" \
  -vf "scale=720:720" -c:v libx264 -crf 23 -preset medium -pix_fmt yuv420p -an \
  -movflags +faststart public/videos/pose-products.mp4

ffmpeg -i "$MATERIALS/cases_vid.mp4" \
  -vf "scale=720:720" -c:v libx264 -crf 23 -preset medium -pix_fmt yuv420p -an \
  -movflags +faststart public/videos/pose-cases.mp4

ffmpeg -i "$MATERIALS/Content_vid.mp4" \
  -vf "scale=720:720" -c:v libx264 -crf 23 -preset medium -pix_fmt yuv420p -an \
  -movflags +faststart public/videos/pose-content.mp4

ffmpeg -i "$MATERIALS/About_vid.mp4" \
  -vf "scale=720:720" -c:v libx264 -crf 23 -preset medium -pix_fmt yuv420p -an \
  -movflags +faststart public/videos/pose-about.mp4

ffmpeg -i "$MATERIALS/resume_vid.mp4" \
  -vf "scale=720:720" -c:v libx264 -crf 23 -preset medium -pix_fmt yuv420p -an \
  -movflags +faststart public/videos/pose-resume.mp4

# Transition video
ffmpeg -i "$MATERIALS/hf_20260313_101321_1512e0da-4778-46d2-8bce-f7664f4dfda7.mp4" \
  -vf "scale=720:720" -c:v libx264 -crf 23 -preset medium -pix_fmt yuv420p -an \
  -movflags +faststart public/videos/transition.mp4
```

**Step 3: Extract poster frame from reveal video**

```bash
ffmpeg -i public/videos/reveal.mp4 -vframes 1 -q:v 2 public/images/character-poster.webp
```

**Step 4: Copy static poster PNGs for poses (fallbacks)**

```bash
cp "$MATERIALS/Experience.png" public/images/poster-experience.png
cp "$MATERIALS/Products.png" public/images/poster-products.png
cp "$MATERIALS/cases.png" public/images/poster-cases.png
cp "$MATERIALS/Content.png" public/images/poster-content.png
cp "$MATERIALS/About.png" public/images/poster-about.png
cp "$MATERIALS/resume.png" public/images/poster-resume.png
```

**Step 5: Add public/videos to .gitignore (videos are too large for git)**

Append to `.gitignore`:
```
public/videos/*.mp4
```

**Step 6: Commit**

```bash
git add .gitignore public/images/
git commit -m "feat(v5): add poster images and video encoding pipeline"
```

---

## Task 3: Build the Character video state machine hook

**Files:**
- Create: `src/components/Character/useCharacterState.ts`

**Step 1: Define types and state machine**

```ts
export type CharacterPose =
  | "experience"
  | "products"
  | "cases"
  | "content"
  | "about"
  | "resume";

export type CharacterState =
  | { phase: "loading" }
  | { phase: "revealing" }
  | { phase: "idle" }
  | { phase: "transitioning-to-pose"; pose: CharacterPose }
  | { phase: "posing"; pose: CharacterPose }
  | { phase: "transitioning-to-idle" };

export interface CharacterActions {
  state: CharacterState;
  onRevealComplete: () => void;
  onTransitionComplete: () => void;
  hoverPose: (pose: CharacterPose) => void;
  leavePose: () => void;
  startReveal: () => void;
}
```

**Step 2: Implement the hook**

```ts
import { useState, useCallback } from "react";

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
        return { phase: "transitioning-to-pose", pose };
      }
      return prev;
    });
  }, []);

  const leavePose = useCallback(() => {
    setState((prev) => {
      if (prev.phase === "posing" || prev.phase === "transitioning-to-pose") {
        return { phase: "transitioning-to-idle" };
      }
      return prev;
    });
  }, []);

  const onTransitionComplete = useCallback(() => {
    setState((prev) => {
      if (prev.phase === "transitioning-to-pose") {
        return { phase: "posing", pose: prev.pose };
      }
      if (prev.phase === "transitioning-to-idle") {
        return { phase: "idle" };
      }
      return prev;
    });
  }, []);

  return { state, onRevealComplete, onTransitionComplete, hoverPose, leavePose, startReveal };
}
```

**Step 3: Commit**

```bash
git add src/components/Character/useCharacterState.ts
git commit -m "feat(v5): add character video state machine hook"
```

---

## Task 4: Build the Character component with dual-video crossfade

**Files:**
- Create: `src/components/Character/Character.tsx`
- Create: `src/components/Character/VideoPlayer.tsx`
- Create: `src/components/Character/index.ts`

**Step 1: Create VideoPlayer component**

`src/components/Character/VideoPlayer.tsx`:
```tsx
import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";

interface VideoPlayerProps {
  src: string;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  className?: string;
  onEnded?: () => void;
  onCanPlay?: () => void;
}

export interface VideoPlayerHandle {
  play: () => Promise<void>;
  pause: () => void;
  reset: () => void;
}

export const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(
  ({ src, loop = false, muted = true, poster, className = "", onEnded, onCanPlay }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => ({
      play: async () => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          await videoRef.current.play();
        }
      },
      pause: () => {
        videoRef.current?.pause();
      },
      reset: () => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      },
    }));

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleEnded = () => onEnded?.();
      const handleCanPlay = () => onCanPlay?.();

      video.addEventListener("ended", handleEnded);
      video.addEventListener("canplaythrough", handleCanPlay);

      return () => {
        video.removeEventListener("ended", handleEnded);
        video.removeEventListener("canplaythrough", handleCanPlay);
      };
    }, [onEnded, onCanPlay]);

    return (
      <video
        ref={videoRef}
        src={src}
        loop={loop}
        muted={muted}
        playsInline
        poster={poster}
        className={className}
        aria-hidden="true"
        preload="auto"
      />
    );
  }
);
```

**Step 2: Create Character orchestrator**

`src/components/Character/Character.tsx`:
```tsx
import { useRef, useEffect, useCallback } from "react";
import { VideoPlayer, type VideoPlayerHandle } from "./VideoPlayer";
import { useCharacterState, type CharacterPose } from "./useCharacterState";

const VIDEO_SOURCES: Record<string, string> = {
  reveal: "/videos/reveal.mp4",
  idle: "/videos/reveal.mp4", // TODO: replace with dedicated idle loop
  transition: "/videos/transition.mp4",
  "pose-experience": "/videos/pose-experience.mp4",
  "pose-products": "/videos/pose-products.mp4",
  "pose-cases": "/videos/pose-cases.mp4",
  "pose-content": "/videos/pose-content.mp4",
  "pose-about": "/videos/pose-about.mp4",
  "pose-resume": "/videos/pose-resume.mp4",
};

interface CharacterProps {
  onStateChange?: (phase: string) => void;
  className?: string;
}

export function Character({ onStateChange, className = "" }: CharacterProps) {
  const { state, startReveal, onRevealComplete, onTransitionComplete, hoverPose, leavePose } =
    useCharacterState();
  const frontRef = useRef<VideoPlayerHandle>(null);
  const backRef = useRef<VideoPlayerHandle>(null);
  const transitionRef = useRef<VideoPlayerHandle>(null);

  // Expose hoverPose and leavePose via a ref or context for NavBar to call
  // For now, attach to window for simplicity — will be replaced by context
  useEffect(() => {
    (window as any).__characterHoverPose = hoverPose;
    (window as any).__characterLeavePose = leavePose;
    return () => {
      delete (window as any).__characterHoverPose;
      delete (window as any).__characterLeavePose;
    };
  }, [hoverPose, leavePose]);

  useEffect(() => {
    onStateChange?.(state.phase);
  }, [state.phase, onStateChange]);

  // Auto-start reveal when component mounts
  useEffect(() => {
    startReveal();
  }, [startReveal]);

  // Handle state transitions by playing appropriate videos
  useEffect(() => {
    switch (state.phase) {
      case "revealing":
        frontRef.current?.play();
        break;
      case "idle":
        // For now, just keep the last frame visible
        // TODO: play idle loop when asset is available
        break;
      case "transitioning-to-pose":
        transitionRef.current?.play();
        break;
      case "posing":
        frontRef.current?.play();
        break;
      case "transitioning-to-idle":
        transitionRef.current?.play();
        break;
    }
  }, [state]);

  const getCurrentSrc = () => {
    switch (state.phase) {
      case "loading":
      case "revealing":
        return VIDEO_SOURCES.reveal;
      case "idle":
      case "transitioning-to-idle":
        return VIDEO_SOURCES.reveal; // TODO: idle.mp4
      case "transitioning-to-pose":
      case "posing":
        return VIDEO_SOURCES[`pose-${state.pose}`] || VIDEO_SOURCES.reveal;
      default:
        return VIDEO_SOURCES.reveal;
    }
  };

  const handleRevealEnded = useCallback(() => {
    onRevealComplete();
  }, [onRevealComplete]);

  const handleTransitionEnded = useCallback(() => {
    onTransitionComplete();
  }, [onTransitionComplete]);

  return (
    <div className={`relative w-[550px] h-[550px] ${className}`}>
      {/* Main video layer */}
      <VideoPlayer
        ref={frontRef}
        src={getCurrentSrc()}
        loop={state.phase === "posing"}
        poster="/images/character-poster.webp"
        className="absolute inset-0 w-full h-full object-cover"
        onEnded={state.phase === "revealing" ? handleRevealEnded : undefined}
      />

      {/* Transition video layer */}
      <VideoPlayer
        ref={transitionRef}
        src={VIDEO_SOURCES.transition}
        className="absolute inset-0 w-full h-full object-cover"
        onEnded={handleTransitionEnded}
      />
    </div>
  );
}
```

**Step 3: Create barrel export**

`src/components/Character/index.ts`:
```ts
export { Character } from "./Character";
export { useCharacterState } from "./useCharacterState";
export type { CharacterPose } from "./useCharacterState";
```

**Step 4: Wire into App and verify video plays**

Update `src/App.tsx` to render Character and verify the reveal video plays on load.

**Step 5: Commit**

```bash
git add src/components/Character/
git commit -m "feat(v5): add Character component with dual-video state machine"
```

---

## Task 5: Build the Liquid Glass NavBar

**Files:**
- Create: `src/components/NavBar/LiquidGlass.tsx`
- Create: `src/components/NavBar/NavItem.tsx`
- Create: `src/components/NavBar/NavBar.tsx`
- Create: `src/components/NavBar/index.ts`
- Modify: `src/styles/index.css` (add liquid glass CSS)

**Step 1: Add liquid glass CSS keyframes and styles to `src/styles/index.css`**

Append after the `@theme` block:

```css
@keyframes scaleToggle {
  0% { scale: 1 1; }
  50% { scale: 1.1 1; }
  100% { scale: 1 1; }
}

.liquid-glass {
  position: relative;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  filter: url(#liquid-glass-filter);
}

.nav-item {
  transition: color 0.2s ease, text-shadow 0.2s ease;
}

.nav-item:hover {
  color: white;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  animation: scaleToggle 0.4s ease;
}
```

**Step 2: Create LiquidGlass SVG filter component**

`src/components/NavBar/LiquidGlass.tsx`:
```tsx
export function LiquidGlassFilter() {
  return (
    <svg className="absolute w-0 h-0" aria-hidden="true">
      <filter id="liquid-glass-filter" primitiveUnits="objectBoundingBox">
        <feImage
          result="map"
          width="100%"
          height="100%"
          x="0"
          y="0"
          href="data:image/webp;base64,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"
        />
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.04" result="blur" />
        <feDisplacementMap in="blur" in2="map" scale="0.5" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}
```

**Step 3: Create NavItem component**

`src/components/NavBar/NavItem.tsx`:
```tsx
import type { CharacterPose } from "@/components/Character";

interface NavItemProps {
  label: string;
  pose: CharacterPose;
  href: string;
  onHover: (pose: CharacterPose) => void;
  onLeave: () => void;
}

export function NavItem({ label, pose, href, onHover, onLeave }: NavItemProps) {
  return (
    <a
      href={href}
      className="nav-item relative shrink-0 text-text-secondary hover:text-text transition-colors duration-200"
      onMouseEnter={() => onHover(pose)}
      onMouseLeave={onLeave}
    >
      {label}
    </a>
  );
}
```

**Step 4: Create NavBar component**

`src/components/NavBar/NavBar.tsx`:
```tsx
import { NavItem } from "./NavItem";
import { LiquidGlassFilter } from "./LiquidGlass";
import type { CharacterPose } from "@/components/Character";

const NAV_ITEMS: { label: string; pose: CharacterPose; href: string }[] = [
  { label: "Experience", pose: "experience", href: "#experience" },
  { label: "Products", pose: "products", href: "#products" },
  { label: "Cases", pose: "cases", href: "#cases" },
  { label: "Content", pose: "content", href: "#content" },
  { label: "About", pose: "about", href: "#about" },
  { label: "Resume", pose: "resume", href: "#resume" },
];

interface NavBarProps {
  onHoverPose: (pose: CharacterPose) => void;
  onLeavePose: () => void;
  visible?: boolean;
}

export function NavBar({ onHoverPose, onLeavePose, visible = true }: NavBarProps) {
  return (
    <>
      <LiquidGlassFilter />
      <nav
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-14 rounded-[64px] bg-glass px-12 pt-4 pb-3.5 font-['Times_Now',serif] text-2xl leading-[1.2] transition-all duration-500 ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0"
        }`}
        style={{ filter: "url(#liquid-glass-filter)" }}
      >
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.pose}
            label={item.label}
            pose={item.pose}
            href={item.href}
            onHover={onHoverPose}
            onLeave={onLeavePose}
          />
        ))}
      </nav>
    </>
  );
}
```

**Step 5: Create barrel export**

`src/components/NavBar/index.ts`:
```ts
export { NavBar } from "./NavBar";
```

**Step 6: Verify nav bar renders with glass effect**

Wire into App, check that the pill-shaped bar appears at the bottom with frosted glass look.

**Step 7: Commit**

```bash
git add src/components/NavBar/ src/styles/index.css
git commit -m "feat(v5): add liquid glass navigation bar with SVG displacement filter"
```

---

## Task 6: Build Hero text and Logo components

**Files:**
- Create: `src/components/Hero/HeroText.tsx`
- Create: `src/components/Hero/Logo.tsx`
- Create: `src/components/Hero/index.ts`

**Step 1: Create Logo component**

`src/components/Hero/Logo.tsx`:
```tsx
interface LogoProps {
  visible?: boolean;
}

export function Logo({ visible = true }: LogoProps) {
  return (
    <div
      className={`absolute top-8 left-40 font-['SF_Pro_Display',sans-serif] font-medium text-base leading-none text-text-secondary tracking-[-0.32px] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <p>Shkuratov</p>
      <p>Designer</p>
    </div>
  );
}
```

**Step 2: Create HeroText component**

`src/components/Hero/HeroText.tsx`:
```tsx
interface HeroTextProps {
  visible?: boolean;
}

export function HeroText({ visible = true }: HeroTextProps) {
  return (
    <div
      className={`absolute top-[95px] right-[calc(50%-280px)] w-[247px] font-['SF_Pro_Text',sans-serif] text-lg leading-[1.3] text-text-secondary transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <p className="mb-3">
        <span>Hey! I'm Evgeny. </span>
        <span className="text-white font-normal">
          Product Design Engineer who can't stop building.{" "}
        </span>
      </p>
      <p className="mb-3">Explore. </p>
      <p>
        This site is me thinking
        <br />
        out loud.
      </p>
    </div>
  );
}
```

**Step 3: Create barrel export**

`src/components/Hero/index.ts`:
```ts
export { Logo } from "./Logo";
export { HeroText } from "./HeroText";
```

**Step 4: Commit**

```bash
git add src/components/Hero/
git commit -m "feat(v5): add Logo and HeroText components"
```

---

## Task 7: Build contact footer line

**Files:**
- Create: `src/components/Layout/ContactLine.tsx`

**Step 1: Create ContactLine**

`src/components/Layout/ContactLine.tsx`:
```tsx
interface ContactLineProps {
  visible?: boolean;
}

export function ContactLine({ visible = true }: ContactLineProps) {
  return (
    <div
      className={`fixed bottom-2 left-1/2 -translate-x-1/2 font-['SF_Pro_Display',sans-serif] text-lg leading-[1.2] text-text-secondary tracking-[-0.18px] whitespace-nowrap transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span>Reach me at shkuratovdesigner@gmail.com or </span>
      <a href="#book" className="text-accent hover:underline">
        Book a Call
      </a>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/Layout/ContactLine.tsx
git commit -m "feat(v5): add contact footer line"
```

---

## Task 8: Compose the Home page with entry animation sequence

**Files:**
- Create: `src/pages/Home.tsx`
- Modify: `src/App.tsx`
- Create: `src/components/Layout/MainLayout.tsx`

**Step 1: Create MainLayout**

`src/components/Layout/MainLayout.tsx`:
```tsx
import type { ReactNode } from "react";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-black">
      {children}
    </div>
  );
}
```

**Step 2: Create Home page with entry sequence orchestration**

`src/pages/Home.tsx`:
```tsx
import { useState, useCallback, useEffect } from "react";
import { Character } from "@/components/Character";
import { NavBar } from "@/components/NavBar";
import { Logo, HeroText } from "@/components/Hero";
import { ContactLine } from "@/components/Layout/ContactLine";
import { MainLayout } from "@/components/Layout/MainLayout";
import type { CharacterPose } from "@/components/Character";

type EntryPhase = "black" | "logo" | "reveal" | "text" | "nav" | "complete";

export function Home() {
  const [entryPhase, setEntryPhase] = useState<EntryPhase>("black");
  const [hoverPose, setHoverPose] = useState<CharacterPose | null>(null);

  // Entry sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setEntryPhase("logo"), 200);
    const timer2 = setTimeout(() => setEntryPhase("reveal"), 500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleCharacterPhase = useCallback((phase: string) => {
    if (phase === "idle") {
      // Reveal finished, show text
      setEntryPhase("text");
      setTimeout(() => setEntryPhase("nav"), 400);
      setTimeout(() => setEntryPhase("complete"), 600);
    }
  }, []);

  const handleHoverPose = useCallback((pose: CharacterPose) => {
    setHoverPose(pose);
    // Trigger character state machine
    (window as any).__characterHoverPose?.(pose);
  }, []);

  const handleLeavePose = useCallback(() => {
    setHoverPose(null);
    (window as any).__characterLeavePose?.();
  }, []);

  const isAfter = (target: EntryPhase, phases: EntryPhase[]) => {
    const order: EntryPhase[] = ["black", "logo", "reveal", "text", "nav", "complete"];
    return order.indexOf(entryPhase) >= order.indexOf(target);
  };

  return (
    <MainLayout>
      <Logo visible={isAfter("logo", [])} />

      {isAfter("reveal", []) && (
        <Character
          className="absolute left-1/2 top-1/2 -translate-x-[calc(50%+24px)] -translate-y-[calc(50%+48px)]"
          onStateChange={handleCharacterPhase}
        />
      )}

      <HeroText visible={isAfter("text", [])} />

      <NavBar
        onHoverPose={handleHoverPose}
        onLeavePose={handleLeavePose}
        visible={isAfter("nav", [])}
      />

      <ContactLine visible={isAfter("complete", [])} />
    </MainLayout>
  );
}
```

**Step 3: Update App.tsx**

```tsx
import { Home } from "@/pages/Home";

export default function App() {
  return <Home />;
}
```

**Step 4: Verify full page renders with entry sequence**

```bash
npm run dev
```

Expected: Black screen → logo fades in → character reveal plays → text appears → nav slides up → contact line fades in.

**Step 5: Commit**

```bash
git add src/pages/Home.tsx src/App.tsx src/components/Layout/MainLayout.tsx
git commit -m "feat(v5): compose Home page with cinematic entry sequence"
```

---

## Task 9: Add font loading and final styling polish

**Files:**
- Modify: `src/styles/index.css`
- Modify: `index.html`

**Step 1: Add @font-face declarations for custom fonts**

Add to `src/styles/index.css` (before `@import "tailwindcss"`):

```css
@font-face {
  font-family: "Times Now";
  src: url("/fonts/TimesNow-SemiLight.woff2") format("woff2");
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
```

Note: User must provide the `TimesNow-SemiLight.woff2` file in `public/fonts/`. SF Pro is a system font on macOS — use `-apple-system, BlinkMacSystemFont, "SF Pro Display"` as fallback stack.

**Step 2: Add preload hints to `index.html`**

```html
<link rel="preload" href="/fonts/TimesNow-SemiLight.woff2" as="font" type="font/woff2" crossorigin />
<link rel="preload" href="/videos/reveal.mp4" as="video" type="video/mp4" />
```

**Step 3: Add reduced motion support to `src/styles/index.css`**

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }

  video {
    display: none;
  }

  .character-poster-fallback {
    display: block;
  }
}
```

**Step 4: Commit**

```bash
git add src/styles/index.css index.html
git commit -m "feat(v5): add font loading, preloading, and reduced motion support"
```

---

## Task 10: Responsive layout for tablet and mobile

**Files:**
- Modify: `src/pages/Home.tsx`
- Modify: `src/components/Character/Character.tsx`
- Modify: `src/components/NavBar/NavBar.tsx`
- Modify: `src/components/Hero/HeroText.tsx`
- Create: `src/hooks/useMediaQuery.ts`

**Step 1: Create useMediaQuery hook**

`src/hooks/useMediaQuery.ts`:
```ts
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
```

**Step 2: Add responsive classes throughout components**

Character size: `w-[550px] h-[550px] md:w-[400px] md:h-[400px] sm:w-[300px] sm:h-[300px]`

HeroText: reposition below character on tablet/mobile.

NavBar: horizontal scroll or wrap on mobile.

**Step 3: Test on multiple viewport sizes**

Use browser DevTools responsive mode. Test: 1440px, 1024px, 768px, 375px.

**Step 4: Commit**

```bash
git add src/hooks/useMediaQuery.ts src/pages/Home.tsx src/components/
git commit -m "feat(v5): add responsive layout for tablet and mobile"
```

---

## Task 11: Connect NavBar hover to Character pose changes

**Files:**
- Modify: `src/pages/Home.tsx`
- Modify: `src/components/Character/Character.tsx`

**Step 1: Replace window-based communication with proper React pattern**

Remove the `window.__characterHoverPose` pattern and instead lift the `useCharacterState` hook to the Home page, passing `hoverPose` and `leavePose` as props to both Character and NavBar.

`src/pages/Home.tsx` — call `useCharacterState()` at the page level, pass actions down:
```tsx
const { state, hoverPose, leavePose, startReveal, onRevealComplete, onTransitionComplete } = useCharacterState();
```

Character receives the state + callbacks as props instead of owning the hook.

NavBar calls `hoverPose(pose)` / `leavePose()` directly.

**Step 2: Verify hover changes character pose**

Hover over each nav item → character should transition to that pose's video.

**Step 3: Commit**

```bash
git add src/pages/Home.tsx src/components/Character/Character.tsx
git commit -m "feat(v5): connect NavBar hover to Character pose transitions"
```

---

## Task 12: Video preloader for background loading

**Files:**
- Create: `src/hooks/useVideoPreloader.ts`
- Modify: `src/pages/Home.tsx`

**Step 1: Create preloader hook**

`src/hooks/useVideoPreloader.ts`:
```ts
import { useEffect, useRef } from "react";

export function useVideoPreloader(urls: string[]) {
  const preloaded = useRef<Set<string>>(new Set());

  useEffect(() => {
    urls.forEach((url) => {
      if (preloaded.current.has(url)) return;
      preloaded.current.add(url);

      const video = document.createElement("video");
      video.preload = "auto";
      video.muted = true;
      video.src = url;
      video.load();
    });
  }, [urls]);
}
```

**Step 2: Call in Home after reveal completes**

Preload all pose videos once the reveal animation finishes (entry phase reaches "text" or later).

**Step 3: Commit**

```bash
git add src/hooks/useVideoPreloader.ts src/pages/Home.tsx
git commit -m "feat(v5): add background video preloading after reveal"
```

---

## Task 13: Final integration test and build verification

**Step 1: Run production build**

```bash
npm run build
```

Expected: Build completes with no errors. Check `dist/` output size.

**Step 2: Preview production build**

```bash
npm run preview
```

Expected: Full page works at `http://localhost:4173` — entry sequence, video playback, nav hover, glass effect.

**Step 3: Check bundle size**

```bash
ls -la dist/assets/*.js
```

Expected: < 80KB gzipped total.

**Step 4: Lighthouse audit**

Run Lighthouse in Chrome DevTools on the preview build. Targets:
- Performance: > 90
- FCP: < 1.0s
- LCP: < 2.5s

**Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix(v5): address build and performance issues"
```

---

## Dependency Graph

```
Task 1 (scaffold) → Task 2 (assets)
                   → Task 3 (state machine) → Task 4 (Character) → Task 11 (connect)
                   → Task 5 (NavBar)         → Task 11 (connect)
                   → Task 6 (Hero)           → Task 8 (Home page)
                   → Task 7 (Contact)        → Task 8 (Home page)
Task 8 (Home) → Task 9 (fonts) → Task 10 (responsive) → Task 12 (preloader) → Task 13 (build)
```

**Parallelizable groups:**
- After Task 1: Tasks 2, 3, 5, 6, 7 can run in parallel
- After Task 3: Task 4
- After Tasks 4+5+6+7: Task 8
- After Task 8: Tasks 9, 10, 11, 12 (mostly sequential)
