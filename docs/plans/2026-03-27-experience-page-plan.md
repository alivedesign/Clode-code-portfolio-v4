# Experience Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a dedicated Experience page with React Router, staggered animations, YouTube embed, and responsive design.

**Architecture:** React Router v7 added for full-page routing (`/` → Home, `/experience` → Experience). NavBar refactored to support both pose-hover mode (Home) and route-navigation mode (Experience). Shared layout components (NavBar, ContactLine, Logo) work across both pages. CSS keyframe animations for staggered entrance, Intersection Observer for scroll-triggered video reveal.

**Tech Stack:** React 19, Vite 8, TypeScript, Tailwind CSS 4, React Router 7 (already installed)

---

### Task 1: Set Up React Router

**Files:**
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`

**Step 1: Update main.tsx to wrap App with BrowserRouter**

```tsx
// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

**Step 2: Update App.tsx with Routes**

```tsx
// src/App.tsx
import { Routes, Route } from "react-router";
import { Home } from "@/pages/Home";
import { Experience } from "@/pages/Experience";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/experience" element={<Experience />} />
    </Routes>
  );
}
```

Note: The `Experience` component doesn't exist yet — that's fine. We'll create a placeholder in Task 4.

**Step 3: Verify dev server starts**

Run: `npm run dev`
Expected: Compiles (may show import error for Experience — that's OK, we fix it in Task 4)

**Step 4: Commit**

```bash
git add src/main.tsx src/App.tsx
git commit -m "feat: add React Router with / and /experience routes"
```

---

### Task 2: Refactor NavBar for Route-Aware Navigation

The NavBar currently uses hash links and requires pose-hover callbacks. It needs to:
1. Use React Router `<Link>` for navigation
2. Highlight the active page
3. Keep pose-hover behavior optional (only used on Home)

**Files:**
- Modify: `src/components/NavBar/NavBar.tsx`

**Step 1: Update NAV_ITEMS to use route paths**

Replace the href values and add a `path` field. Only `/experience` has a real page; others link to `/` for now.

```tsx
// At the top of NavBar.tsx, update the nav items:
import { Link, useLocation } from "react-router";

const NAV_ITEMS: { label: string; pose: CharacterPose; path: string }[] = [
  { label: "Experience", pose: "experience", path: "/experience" },
  { label: "Products", pose: "products", path: "/" },
  { label: "Cases", pose: "cases", path: "/" },
  { label: "Content", pose: "content", path: "/" },
  { label: "About", pose: "about", path: "/" },
  { label: "Resume", pose: "resume", path: "/" },
];

const MAIN_NAV_ITEMS: { label: string; pose: CharacterPose; path: string }[] = [
  { label: "Experience", pose: "experience", path: "/experience" },
  { label: "Products", pose: "products", path: "/" },
  { label: "Cases", pose: "cases", path: "/" },
];

const MENU_NAV_ITEMS: { label: string; path: string }[] = [
  { label: "Content", path: "/" },
  { label: "About", path: "/" },
  { label: "Resume", path: "/" },
];
```

**Step 2: Make onHoverPose and onLeavePose optional**

Update the interface:

```tsx
interface NavBarProps {
  onHoverPose?: (pose: CharacterPose) => void;
  onLeavePose?: () => void;
  visible?: boolean;
}
```

**Step 3: Add active page detection and update desktop rendering**

Inside the component, add location detection and update the desktop `<a>` tags to `<Link>`:

```tsx
export function NavBar({ onHoverPose, onLeavePose, visible = true }: NavBarProps) {
  const location = useLocation();
  // ... existing refs and state ...

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLLIElement>, pose: CharacterPose) => {
      onHoverPose?.(pose);
      // ... rest of lens logic unchanged ...
    },
    [onHoverPose],
  );

  const handleMouseLeave = useCallback(() => {
    onLeavePose?.();
    if (lensRef.current) {
      lensRef.current.style.display = "none";
    }
  }, [onLeavePose]);
```

For the desktop nav, replace `<a href={item.href}>` with `<Link to={item.path}>` and add active styling:

```tsx
// Inside the desktop return, replace the <a> with:
<Link
  to={item.path}
  className={`navbar-tab ${location.pathname === item.path ? "navbar-tab-active" : ""}`}
>
  {item.label}
</Link>
```

For mobile nav items, similarly replace `<a href>` with `<Link to>`:

```tsx
// Mobile bottom nav items:
<Link
  to={item.path}
  className={`mobile-nav-tab ${location.pathname === item.path ? "mobile-nav-tab-active" : ""}`}
>
  {item.label}
</Link>

// Menu overlay items:
<Link
  to={item.path}
  className="menu-overlay-link"
  onClick={closeMenu}
>
  {item.label}
</Link>
```

**Step 4: Add active tab CSS**

Add to `src/styles/index.css` after the `.navbar-tab:hover` rule:

```css
.navbar-tab-active {
  color: white;
}

.mobile-nav-tab-active {
  color: white;
}
```

**Step 5: Commit**

```bash
git add src/components/NavBar/NavBar.tsx src/styles/index.css
git commit -m "refactor: make NavBar route-aware with Link and active state"
```

---

### Task 3: Make Logo Clickable (Navigate to Home)

**Files:**
- Modify: `src/components/Hero/Logo.tsx`

**Step 1: Wrap logo text in a Link**

```tsx
import { Link } from "react-router";

interface LogoProps {
  visible?: boolean;
}

export function Logo({ visible = true }: LogoProps) {
  return (
    <Link
      to="/"
      className={`absolute top-[24px] left-[24px] md:top-8 md:left-40 font-['SF_Pro_Display','-apple-system',BlinkMacSystemFont,sans-serif] font-medium text-[14px] md:text-base leading-none text-text-secondary tracking-[-0.28px] md:tracking-[-0.32px] transition-opacity duration-200 no-underline ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <p>Shkuratov</p>
      <p>Designer</p>
    </Link>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/Hero/Logo.tsx
git commit -m "feat: make logo clickable with Link to home"
```

---

### Task 4: Create Experience Page Component (Static Content)

**Files:**
- Create: `src/pages/Experience.tsx`
- Create: `src/data/experienceData.ts`

**Step 1: Create the experience data file**

```tsx
// src/data/experienceData.ts
export type ExperienceEntry = {
  dateRange: string;
  role: string;
  company: string;
  detail?: string;
};

export const EXPERIENCE_ENTRIES: ExperienceEntry[] = [
  {
    dateRange: "2024 — ✦",
    role: "Senior Product Designer",
    company: "B2B messenger app",
    detail: "with 100 000+ daily users",
  },
  {
    dateRange: "2024 — 2025",
    role: "Senior Product Designer",
    company: "HyperADX. Smart Programmatic Platform.",
  },
  {
    dateRange: "2023 — 2024",
    role: "Lead Product Designer",
    company: "Edtech platform",
    detail: "with 15M+ user",
  },
  {
    dateRange: "2020 — 2023",
    role: "Senior Product Designer",
    company: "Edtech platform",
    detail: "with 15M+ user",
  },
  {
    dateRange: "2018 — 2019",
    role: "UX/UI Designer",
    company: "ITMINT. IT company",
  },
];

export const HEADLINE = "AI Product Design Engineer focused on designing products people love and trust";

export const LINKEDIN_URL = "https://www.linkedin.com/in/evgeny-shkuratov-b34a99174/";

export const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/ijcQL4Dd0QY";
```

**Step 2: Create the Experience page component**

```tsx
// src/pages/Experience.tsx
import { Logo } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { ContactLine } from "@/components/Layout/ContactLine";
import {
  EXPERIENCE_ENTRIES,
  HEADLINE,
  LINKEDIN_URL,
  YOUTUBE_EMBED_URL,
} from "@/data/experienceData";
import type { ExperienceEntry } from "@/data/experienceData";

function ExperienceItem({ entry, index }: { entry: ExperienceEntry; index: number }) {
  return (
    <div
      className="experience-fade-up"
      style={{ animationDelay: `${(index + 1) * 80}ms` }}
    >
      <div className="w-full h-px bg-white/10" />
      <p className="py-[28px] font-['SF_Pro_Text','-apple-system',BlinkMacSystemFont,sans-serif] text-[16px] md:text-[18px] leading-[1.4] text-text-secondary">
        <span>{entry.dateRange} | </span>
        <span>{entry.role} @ </span>
        <span className="text-white">{entry.company}</span>
        {entry.detail && (
          <span className="text-text-secondary"> {entry.detail}</span>
        )}
      </p>
    </div>
  );
}

export function Experience() {
  return (
    <div className="relative min-h-dvh w-full bg-black">
      <Logo visible />

      {/* Scrollable content */}
      <main className="relative z-10 flex flex-col items-center px-5 md:px-10 pt-[80px] md:pt-[104px] pb-[200px]">
        {/* Headline */}
        <h1
          className="experience-fade-up font-['Times_Now',serif] text-[28px] md:text-[48px] leading-[1.2] text-white text-center tracking-[-0.48px] max-w-[765px] mb-[48px] md:mb-[64px]"
        >
          {HEADLINE}
        </h1>

        {/* Experience list */}
        <div className="w-full max-w-[887px]">
          {EXPERIENCE_ENTRIES.map((entry, i) => (
            <ExperienceItem key={entry.dateRange} entry={entry} index={i} />
          ))}
          {/* Bottom divider */}
          <div
            className="experience-fade-up"
            style={{ animationDelay: `${(EXPERIENCE_ENTRIES.length + 1) * 80}ms` }}
          >
            <div className="w-full h-px bg-white/10" />
          </div>

          {/* More on LinkedIn */}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="experience-fade-up block text-center mt-[48px] font-['SF_Pro_Text','-apple-system',BlinkMacSystemFont,sans-serif] text-[18px] leading-[1.3] text-accent hover:underline"
            style={{ animationDelay: `${(EXPERIENCE_ENTRIES.length + 2) * 80}ms` }}
          >
            More on LinkedIn
          </a>
        </div>

        {/* YouTube Video Embed */}
        <div
          className="experience-scroll-reveal mt-[48px] md:mt-[64px] w-full max-w-[992px]"
        >
          <div className="relative w-full rounded-[24px] overflow-hidden" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={YOUTUBE_EMBED_URL}
              title="Experience video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </main>

      <NavBar visible />
      <ContactLine visible />
    </div>
  );
}
```

**Step 3: Verify the page renders**

Run: `npm run dev`
Navigate to `http://localhost:5173/experience`
Expected: Page shows headline, experience list, LinkedIn link, YouTube video, and navbar. No animations yet.

**Step 4: Commit**

```bash
git add src/data/experienceData.ts src/pages/Experience.tsx
git commit -m "feat: add Experience page with content and YouTube embed"
```

---

### Task 5: Add Staggered Fade-Up Animation (CSS)

**Files:**
- Modify: `src/styles/index.css`

**Step 1: Add the fade-up keyframes and classes**

Add after the `/* ─── Pose edge mask */` section:

```css
/* ─── Experience page animations ─────────────────────────── */
@keyframes fadeUpIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.experience-fade-up {
  opacity: 0;
  animation: fadeUpIn 500ms ease-out forwards;
}

/* ─── Scroll-triggered reveal ────────────────────────────── */
.experience-scroll-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 600ms ease-out, transform 600ms ease-out;
}

.experience-scroll-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

Also add these to the `prefers-reduced-motion` block (inside the existing `@media` rule):

```css
  .experience-fade-up {
    opacity: 1;
    animation: none;
  }
  .experience-scroll-reveal {
    opacity: 1;
    transform: none;
  }
```

**Step 2: Commit**

```bash
git add src/styles/index.css
git commit -m "feat: add staggered fade-up and scroll-reveal CSS animations"
```

---

### Task 6: Add Scroll-Triggered Video Reveal

**Files:**
- Create: `src/hooks/useInView.ts`
- Modify: `src/pages/Experience.tsx`

**Step 1: Create the useInView hook**

```tsx
// src/hooks/useInView.ts
import { useEffect, useRef, useState } from "react";

export function useInView(threshold = 0.2): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}
```

**Step 2: Wire up useInView in Experience.tsx**

Add at the top of Experience.tsx:

```tsx
import { useInView } from "@/hooks/useInView";
```

Inside the `Experience` component, add:

```tsx
const [videoRef, videoVisible] = useInView(0.2);
```

Update the YouTube video container div to use the ref and conditional class:

```tsx
<div
  ref={videoRef}
  className={`experience-scroll-reveal ${videoVisible ? "visible" : ""} mt-[48px] md:mt-[64px] w-full max-w-[992px]`}
>
```

**Step 3: Verify animations work**

Run: `npm run dev`
Navigate to `/experience`
Expected:
- Headline fades up immediately
- Each experience entry fades up with 80ms stagger
- LinkedIn link fades up after entries
- Scrolling down reveals YouTube video with fade-up

**Step 4: Commit**

```bash
git add src/hooks/useInView.ts src/pages/Experience.tsx
git commit -m "feat: add scroll-triggered reveal for YouTube video section"
```

---

### Task 7: Responsive Fine-Tuning and NavBar Spacing

**Files:**
- Modify: `src/pages/Experience.tsx`

**Step 1: Ensure bottom padding accounts for fixed NavBar**

The NavBar sits fixed at `bottom: 100px` on desktop and `bottom: 24px` on mobile. The page content needs enough bottom padding to not be obscured. The current `pb-[200px]` should work, but verify visually.

Check that:
- On desktop: content doesn't overlap the NavBar pill or ContactLine
- On mobile: content doesn't overlap the mobile bottom nav
- The YouTube video has breathing room below it before the nav

Adjust the `pb-[200px]` value if needed (may need `pb-[160px]` on mobile via responsive class).

**Step 2: Verify mobile layout**

Open dev tools, toggle to mobile viewport (375px width):
- Headline should be 28px, full width with 20px padding
- Experience entries should be 16px font
- YouTube video should be full width minus 40px padding (20px each side)
- Mobile nav bar visible at bottom
- Page is scrollable
- All animations work on mobile

**Step 3: Logo positioning on Experience page**

On Home, the Logo is `absolute` positioned within a `relative h-dvh` container. On Experience, the page is `min-h-dvh` and scrollable. The Logo should stay at the top of the page (not fixed). Verify it scrolls with content — this is correct behavior since the Logo is inside the page content flow via `absolute` positioning relative to the page container.

If the Logo needs to be fixed on Experience (stays visible while scrolling), that's a design decision. Based on the Figma, it appears to be at the top of the page and scrolls away. Current implementation is correct.

**Step 4: Commit (if any changes made)**

```bash
git add src/pages/Experience.tsx
git commit -m "fix: responsive fine-tuning for Experience page"
```

---

### Task 8: Update Home Page NavBar Props

**Files:**
- Modify: `src/pages/Home.tsx`

**Step 1: Verify Home still works with updated NavBar**

The NavBar's `onHoverPose` and `onLeavePose` are now optional. Home.tsx already passes them. Verify:

Run: `npm run dev`
Navigate to `/`
Expected:
- Character reveal works as before
- Hovering nav items triggers pose changes
- Clicking "Experience" navigates to `/experience`
- All other nav items stay on Home (since they link to `/`)
- Mobile nav works correctly

No code changes should be needed — just verification.

**Step 2: Verify navigation flow**

1. Go to `/` — Home page loads with reveal animation
2. Click "Experience" in nav → navigates to `/experience`
3. See Experience page with staggered animations
4. Click Logo "Shkuratov Designer" → navigates back to `/`
5. Home page loads (reveal animation plays again — this is expected)
6. On mobile: same flow works with mobile nav

**Step 3: Commit (if any changes needed)**

```bash
git add src/pages/Home.tsx
git commit -m "fix: ensure Home page works with updated NavBar"
```

---

### Task 9: TypeScript Build Verification

**Step 1: Run TypeScript compiler**

```bash
npx tsc -b --noEmit
```

Expected: No errors.

**Step 2: Run Vite build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 3: Fix any issues found**

Address any TypeScript errors or build issues.

**Step 4: Commit fixes if any**

```bash
git commit -m "fix: resolve TypeScript/build issues"
```

---

## Summary of All Files

**New files:**
- `src/pages/Experience.tsx` — Experience page component
- `src/data/experienceData.ts` — Experience data (entries, headline, URLs)
- `src/hooks/useInView.ts` — Intersection Observer hook for scroll reveals

**Modified files:**
- `src/main.tsx` — Add BrowserRouter wrapper
- `src/App.tsx` — Add Routes with / and /experience
- `src/components/NavBar/NavBar.tsx` — Route-aware navigation with Link, active state, optional pose callbacks
- `src/components/Hero/Logo.tsx` — Wrap in Link to /
- `src/styles/index.css` — Add fadeUpIn keyframes, experience-fade-up, experience-scroll-reveal classes

## Execution Order

Tasks 1-3 can be done in parallel (router setup, NavBar refactor, Logo update).
Task 4 depends on Task 1 (needs routes to exist).
Task 5 can be done in parallel with Task 4.
Task 6 depends on Tasks 4 and 5.
Tasks 7-9 are sequential verification/polish.

```
[Task 1: Router] ──┐
[Task 2: NavBar] ──┤──→ [Task 4: Experience Page] ──→ [Task 6: Scroll Reveal] ──→ [Task 7: Responsive] ──→ [Task 8: Home Verify] ──→ [Task 9: Build]
[Task 3: Logo]  ──┘      [Task 5: CSS Animations] ──┘
```
