# About Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the About page with alternating text + asymmetric photo grid sections, responsive with Embla Carousel on mobile.

**Architecture:** Long-scroll page following existing page patterns (Logo + NavBar + ContactLine shell). CSS Grid for desktop photo layouts, Embla Carousel for mobile. Data in separate file. Scroll-reveal animations via useInView.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, Embla Carousel (already installed), useInView hook (existing)

---

### Task 1: Create aboutData.ts

**Files:**
- Create: `src/data/aboutData.ts`

**Step 1: Create the data file**

```typescript
export interface AboutPhoto {
  src: string;
  alt: string;
}

export const ABOUT_HEADLINE = {
  segments: [
    { text: "I value honesty, courage, and ambition ", white: true },
    { text: "to build truly inspiring products for good. ", white: false },
    { text: "Environmental projects, healthcare, edtech, ", white: true },
    { text: "and anything that helps make the world a better place will always have higher priority for me!", white: false },
  ],
};

export const ABOUT_SUBTITLE = {
  segments: [
    { text: "I'm the ideal partner for companies building ", white: false },
    { text: "tech for good, AI innovations, and impactful real-world solutions", white: true },
  ],
};

export const ABOUT_TEXT_1 = {
  segments: [
    { text: "As a ", white: false },
    { text: "designer who's built and shipped my own products,", white: true },
    { text: " I understand the pressure to move fast without wasting time on the wrong thing. From discovery to high-fidelity UI in production, ", white: false },
    { text: "I focus on what users need, not what sounds cool", white: true },
  ],
};

export const ABOUT_TEXT_2 = {
  segments: [
    { text: "Outside of work, ", white: false },
    { text: "I like to stay active. I train 5\u20136 times a week.", white: true },
    { text: " It helps me stay productive and optimistic. Recently, I also ", white: false },
    { text: "discovered snowboarding and completely fell in love with it.", white: true },
    { text: " I even bought my own board and gear and took a trip to the mountains in a neighbouring country during my first season", white: false },
  ],
};

export const ABOUT_TEXT_3_P1 = {
  segments: [
    { text: "As you've probably noticed, ", white: false },
    { text: "I love creating content too.", white: true },
    { text: " I share my experience and stories on ", white: false },
    { text: "YouTube", link: "https://www.youtube.com/@shkuratovdesigner" },
    { text: " and ", white: false },
    { text: "LinkedIn", link: "https://www.linkedin.com/in/evgeny-shkuratov-b34a99174/" },
  ],
};

export const ABOUT_TEXT_3_P2 = {
  segments: [
    { text: "I help founders and builders like me ", white: false },
    { text: "grow their products and have some fun along the way.", white: true },
  ],
};

export const ABOUT_TEXT_3_P3 = "That's what drives most of what I do (\uFF3E\u25BD\uFF3E)";

export const ABOUT_PHOTOS_GRID_1: AboutPhoto[] = [
  { src: "/images/about/about-1.jpg", alt: "Evgeny at a conference" },
  { src: "/images/about/about-2.jpg", alt: "Portrait of Evgeny" },
  { src: "/images/about/about-3.jpg", alt: "Evgeny smiling" },
];

export const ABOUT_PHOTOS_GRID_2: AboutPhoto[] = [
  { src: "/images/about/about-4.jpg", alt: "Evgeny snowboarding" },
  { src: "/images/about/about-5.jpg", alt: "Evgeny cycling" },
  { src: "/images/about/about-6.jpg", alt: "Evgeny outdoors" },
];

export const ABOUT_PHOTOS_GRID_3: AboutPhoto[] = [
  { src: "/images/about/about-7.jpg", alt: "Evgeny in winter" },
  { src: "/images/about/about-8.jpg", alt: "Evgeny cycling at night" },
  { src: "/images/about/about-9.jpg", alt: "Evgeny in the mountains" },
];
```

**Step 2: Verify no TypeScript errors**

Run: `npx tsc --noEmit`
Expected: No errors related to aboutData.ts

---

### Task 2: Create About.tsx page component

**Files:**
- Create: `src/pages/About.tsx`

**Step 1: Build the full About page**

The page should follow the exact pattern from Experience.tsx and Content.tsx:

```typescript
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Logo } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { ContactLine } from "@/components/Layout/ContactLine";
import { useInView } from "@/hooks/useInView";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  ABOUT_HEADLINE,
  ABOUT_SUBTITLE,
  ABOUT_TEXT_1,
  ABOUT_TEXT_2,
  ABOUT_TEXT_3_P1,
  ABOUT_TEXT_3_P2,
  ABOUT_TEXT_3_P3,
  ABOUT_PHOTOS_GRID_1,
  ABOUT_PHOTOS_GRID_2,
  ABOUT_PHOTOS_GRID_3,
} from "@/data/aboutData";
import type { AboutPhoto } from "@/data/aboutData";
```

**Key implementation details:**

1. **TextBlock component** — renders an array of `{ text, white?, link? }` segments:
   - `white: true` → `text-white`
   - `white: false` (or omitted) → `text-text-secondary`
   - `link: "url"` → `<a>` tag with `text-[#b2b9f9] hover:underline`, opens in new tab

2. **PhotoGrid component** — takes `photos: AboutPhoto[]` + `layout: 1 | 2 | 3`:
   - Desktop: CSS Grid with layout-specific template. Each layout variant:
     - Layout 1: `grid-template-columns: 420fr 427fr`, image 2 spans 2 rows
     - Layout 2: `grid-template-columns: 427fr 380fr`, image 1 spans 2 rows
     - Layout 3: `grid-template-columns: 380fr 427fr`, image 3 spans 2 rows
   - Mobile (`useMediaQuery("(max-width: 767px)")`): Embla Carousel
     - `align: "start"`, `containScroll: "trimSnaps"`, `dragFree: true`
     - Images: `w-[280px] h-[360px] rounded-[12px] object-cover shrink-0`
     - Gap: `gap-[12px]`
   - All images: `rounded-[12px] object-cover w-full h-full loading="lazy"`

3. **Page shell:**
   ```tsx
   <div className="relative min-h-screen min-h-dvh w-full bg-black">
     <Logo visible />
     <main className="relative z-10 flex flex-col items-center px-5 md:px-10 pt-[104px] pb-[164px] md:pb-[320px]">
       {/* Hero */}
       {/* Grid 1 */}
       {/* Text 1 */}
       {/* Grid 2 */}
       {/* Text 2 */}
       {/* Grid 3 */}
       {/* Text 3 */}
     </main>
     <NavBar visible />
     <ContactLine visible />
   </div>
   ```

4. **Section spacing:**
   - Between hero and first grid: `mt-[48px] md:mt-[64px]`
   - Between grids and text blocks: `mt-[48px] md:mt-[96px]`
   - Max-width for text blocks: `max-w-[640px]`
   - Max-width for photo grids: `max-w-[895px]`

5. **Animations:**
   - Hero headline + subtitle: `experience-fade-up` class
   - Each subsequent section (grid + text): `experience-scroll-reveal` with `useInView(0.2)`
   - 6 useInView refs total (3 grids + 3 text blocks)

6. **Document title:**
   ```tsx
   useEffect(() => { document.title = "About — Shkuratov Designer"; }, []);
   ```

7. **Semantic HTML:**
   - `<h1>` for hero headline
   - `<section aria-label="...">` for each content group

**CSS Grid layouts (desktop only, inline styles or Tailwind arbitrary):**

Grid 1:
```tsx
<div className="hidden md:grid gap-[48px]"
  style={{ gridTemplateColumns: "420fr 427fr", gridTemplateRows: "340px 466px" }}>
  <div className="rounded-[12px] overflow-hidden">/* img 1 - col1, row1 */</div>
  <div className="rounded-[12px] overflow-hidden row-span-2">/* img 2 - col2, rows 1-2 */</div>
  <div className="rounded-[12px] overflow-hidden">/* img 3 - col1, row2 */</div>
</div>
```

Grid 2:
```tsx
<div className="hidden md:grid gap-[48px]"
  style={{ gridTemplateColumns: "427fr 380fr", gridTemplateRows: "295px 274px" }}>
  <div className="rounded-[12px] overflow-hidden row-span-2">/* img 1 - col1, rows 1-2 */</div>
  <div className="rounded-[12px] overflow-hidden">/* img 2 - col2, row1 */</div>
  <div className="rounded-[12px] overflow-hidden">/* img 3 - col2, row2 */</div>
</div>
```

Grid 3:
```tsx
<div className="hidden md:grid gap-[48px]"
  style={{ gridTemplateColumns: "380fr 427fr", gridTemplateRows: "350px 295px" }}>
  <div className="rounded-[12px] overflow-hidden">/* img 1 - col1, row1 */</div>
  <div className="rounded-[12px] overflow-hidden row-span-2">/* img 2 - col2, rows 1-2 */</div>
  <div className="rounded-[12px] overflow-hidden">/* img 3 - col1, row2 */</div>
</div>
```

**Embla Carousel (mobile only, reuse pattern from Content.tsx InstagramSlider):**

```tsx
function PhotoCarousel({ photos }: { photos: AboutPhoto[] }) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  return (
    <div className="md:hidden">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-[12px]">
          {photos.map((photo) => (
            <div key={photo.src} className="shrink-0 w-[280px] h-[360px] rounded-[12px] overflow-hidden">
              <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verify no TypeScript errors**

Run: `npx tsc --noEmit`
Expected: No errors

---

### Task 3: Wire up routing and NavBar

**Files:**
- Modify: `src/App.tsx` (add lazy import + route)
- Modify: `src/components/NavBar/NavBar.tsx` (update About path from "/" to "/about")

**Step 1: Add lazy import and route in App.tsx**

Add after Content import:
```typescript
const About = lazy(() => import("@/pages/About").then(m => ({ default: m.About })));
```

Add route inside `<Routes>`:
```tsx
<Route path="/about" element={<About />} />
```

**Step 2: Update NavBar paths**

In `src/components/NavBar/NavBar.tsx`, change both About entries:
- Desktop nav items (line ~11): `{ label: "About", pose: "about", path: "/" }` → `{ label: "About", pose: "about", path: "/about" }`
- Mobile nav items (line ~23): `{ label: "About", path: "/" }` → `{ label: "About", path: "/about" }`

**Step 3: Verify build**

Run: `npm run build`
Expected: Build succeeds with no errors

---

### Task 4: Visual QA and polish

**Files:**
- May modify: `src/pages/About.tsx` (spacing/sizing adjustments)

**Step 1: Start dev server and test**

Run: `npm run dev`

Check in browser:
- Navigate to `/about`
- Verify hero text renders with correct white/gray segments
- Verify 3 photo grids render with correct asymmetric layouts
- Verify text blocks between grids
- Verify scroll-reveal animations trigger
- Verify YouTube/LinkedIn links in last section are blue (#b2b9f9) and open in new tab
- Verify NavBar shows "About" as active
- Verify ContactLine and Logo are visible
- Verify kaomoji renders correctly

**Step 2: Test mobile**

Resize browser to mobile width (<768px):
- Verify photo grids switch to horizontal Embla carousels
- Verify carousels are swipeable
- Verify text blocks are full-width
- Verify headline scales down to 28px
- Verify NavBar mobile layout works
- Verify no horizontal overflow on page

**Step 3: Commit**

```bash
git add src/data/aboutData.ts src/pages/About.tsx src/App.tsx src/components/NavBar/NavBar.tsx public/images/about/
git commit -m "feat: add About page with photo grids and mobile carousels"
```
