# 404 Page + Open Graph + Favicon — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a 404 page matching Figma design, configure favicon for all platforms, and add Open Graph image for social sharing.

**Architecture:** New `NotFound.tsx` page with lazy-loaded catch-all route. Static character image (WebP). Favicon generated from `fav.png` source at multiple sizes. OG image as compressed PNG for max platform compatibility. All follows existing page patterns (Logo + NavBar + ContactLine).

**Tech Stack:** React 19, React Router 7, Tailwind CSS 4, sips (macOS image processing)

**Site domain:** `https://www.shkuratovdesigner.com`

---

### Task 1: Optimize Character Image

Convert the 2048x2048 PNG (2.4MB) to WebP at proper Retina size.

**Files:**
- Source: `public/images/404-character.png`
- Create: `public/images/404-character.webp`

**Step 1: Convert PNG to WebP at 900px (2x for 446px display)**

```bash
sips -s format webp -Z 900 public/images/404-character.png --out public/images/404-character.webp
```

Expected: WebP file ~50-80KB.

**Step 2: Verify output**

```bash
sips -g pixelWidth -g pixelHeight public/images/404-character.webp
ls -lh public/images/404-character.webp
```

Expected: 900x900, under 100KB.

**Step 3: Delete source PNG**

```bash
rm public/images/404-character.png
```

**Step 4: Commit**

```bash
git add public/images/404-character.webp
git rm public/images/404-character.png
git commit -m "feat: add optimized 404 character image (WebP)"
```

---

### Task 2: Generate Favicon Set

Generate all favicon sizes from `fav.png` (168x168) source.

**Files:**
- Source: `fav.png` (project root)
- Create: `public/favicon.ico`, `public/favicon-16x16.png`, `public/favicon-32x32.png`, `public/apple-touch-icon.png`, `public/site.webmanifest`

**Step 1: Generate favicon PNGs**

```bash
cd "/Users/shkuratovdesigner/Cursor Projects/Portfolio v4"
sips -z 16 16 fav.png --out public/favicon-16x16.png
sips -z 32 32 fav.png --out public/favicon-32x32.png
sips -z 180 180 fav.png --out public/apple-touch-icon.png
```

**Step 2: Generate .ico from 32x32 PNG**

macOS `sips` can't create .ico directly. Use the `png2ico` approach or ImageMagick if available. Fallback: use `sips` to create a 32x32 PNG and rename — modern browsers accept PNG favicons. Alternatively:

```bash
# If ImageMagick is available:
convert public/favicon-32x32.png -define icon:auto-resize=32,16 public/favicon.ico
# If not, we'll use a PNG favicon with type="image/png" in the HTML (works in all modern browsers)
```

**Step 3: Create `public/site.webmanifest`**

```json
{
  "name": "Shkuratov Designer",
  "short_name": "Shkuratov",
  "icons": [
    {
      "src": "/favicon-32x32.png",
      "sizes": "32x32",
      "type": "image/png"
    },
    {
      "src": "/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png"
    }
  ],
  "theme_color": "#000000",
  "background_color": "#000000",
  "display": "standalone"
}
```

**Step 4: Verify all files exist**

```bash
ls -lh public/favicon* public/apple-touch-icon.png public/site.webmanifest
```

**Step 5: Delete source `fav.png` from project root**

```bash
rm fav.png
```

**Step 6: Commit**

```bash
git add public/favicon-16x16.png public/favicon-32x32.png public/apple-touch-icon.png public/site.webmanifest
git rm --cached fav.png 2>/dev/null; rm -f fav.png
git commit -m "feat: add favicon set for all platforms"
```

---

### Task 3: Compress & Move Open Graph Image

**Files:**
- Source: `opengraph.png` (project root, 1800x945, 966KB)
- Create: `public/og-image.png`

**Step 1: Compress PNG and move to public/**

```bash
sips -s format png opengraph.png --out public/og-image.png
```

Note: `sips` re-encodes but may not compress much. If the project has `pngquant` or `optipng`, use those. Otherwise the re-encoded PNG from sips is acceptable.

**Step 2: Verify**

```bash
ls -lh public/og-image.png
sips -g pixelWidth -g pixelHeight public/og-image.png
```

Expected: 1800x945, ideally under 500KB.

**Step 3: Delete source from project root**

```bash
rm opengraph.png
```

**Step 4: Commit**

```bash
git add public/og-image.png
git rm --cached opengraph.png 2>/dev/null; rm -f opengraph.png
git commit -m "feat: add compressed Open Graph image"
```

---

### Task 4: Update `index.html` — Favicon + OG + Meta Tags

**Files:**
- Modify: `index.html`

**Step 1: Add favicon links after `<meta name="theme-color">`**

Insert after line 8 (`<meta name="theme-color" content="#000000" />`):

```html
<!-- Favicon -->
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

If `.ico` was successfully generated, also add:
```html
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
```

**Step 2: Add OG image + URL to Open Graph section**

Update the Open Graph block (lines 11-15) to include:

```html
<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content="Shkuratov Designer — AI Product Design Engineer" />
<meta property="og:description" content="Senior product designer with 7+ years shipping products people love. Portfolio, case studies, and experience." />
<meta property="og:locale" content="en_US" />
<meta property="og:url" content="https://www.shkuratovdesigner.com/" />
<meta property="og:image" content="https://www.shkuratovdesigner.com/og-image.png" />
<meta property="og:image:width" content="1800" />
<meta property="og:image:height" content="945" />
<meta property="og:image:type" content="image/png" />
```

**Step 3: Update Twitter Card section**

Change `summary` to `summary_large_image` and add image (lines 17-20):

```html
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Shkuratov Designer — AI Product Design Engineer" />
<meta name="twitter:description" content="Senior product designer with 7+ years shipping products people love." />
<meta name="twitter:image" content="https://www.shkuratovdesigner.com/og-image.png" />
```

**Step 4: Commit**

```bash
git add index.html
git commit -m "feat: add favicon links, OG image, and Twitter Card meta tags"
```

---

### Task 5: Create `NotFound.tsx` Page

**Files:**
- Create: `src/pages/NotFound.tsx`

**Step 1: Create the page component**

The page follows the standard page pattern: Logo + NavBar + ContactLine + `useEffect` for title.

Layout from Figma:
- Full viewport black page
- Logo top-left (existing component)
- "< Back to Main" centered at top — `Link` to `/`, chevron-left SVG + text in TimesNow SemiLight 24px (mobile: 18px), `text-text-secondary`
- Character image centered, 446px desktop / 280px mobile
- "Page not found" centered below, TimesNow SemiLight 56px (mobile: 32px), white, `tracking-[-0.56px]`
- NavBar + ContactLine at bottom

```tsx
import { useEffect } from "react";
import { Link } from "react-router";
import { Logo } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { ContactLine } from "@/components/Layout/ContactLine";

export function NotFound() {
  useEffect(() => {
    document.title = "404 — Shkuratov Designer";
  }, []);

  return (
    <div className="relative h-screen h-dvh w-full bg-black overflow-hidden">
      <Logo visible />

      {/* Back to Main — centered top */}
      <Link
        to="/"
        className="notfound-fade-up absolute top-[40px] left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 text-text-secondary no-underline"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5 5.25L10.5 14L17.5 22.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="font-['TN',serif] font-[350] text-[18px] md:text-[24px] leading-[1.2]">
          Back to Main
        </span>
      </Link>

      {/* Centered content: character + text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img
          src="/images/404-character.webp"
          alt="Lost explorer character with question mark"
          className="notfound-fade-up w-[280px] md:w-[446px] h-auto"
          style={{ animationDelay: "100ms" }}
        />
        <h1
          className="notfound-fade-up font-['TN',serif] font-[350] text-[32px] md:text-[56px] leading-[1.2] text-white tracking-[-0.56px] mt-6 md:mt-8"
          style={{ animationDelay: "200ms" }}
        >
          Page not found
        </h1>
      </div>

      <NavBar visible />
      <ContactLine visible />
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/pages/NotFound.tsx
git commit -m "feat: add 404 NotFound page with character and fade animations"
```

---

### Task 6: Add CSS Animation for NotFound Page

**Files:**
- Modify: `src/styles/index.css`

**Step 1: Add `.notfound-fade-up` class**

Add near the existing `.experience-fade-up` block (around line 505). Reuses the same `fadeUpIn` keyframe:

```css
.notfound-fade-up {
  opacity: 0;
  animation: fadeUpIn 500ms ease-out forwards;
}
```

**Step 2: Add reduced-motion override**

Inside the existing `@media (prefers-reduced-motion: reduce)` block (around line 670), add:

```css
.notfound-fade-up {
  opacity: 1;
  animation: none;
}
```

**Step 3: Commit**

```bash
git add src/styles/index.css
git commit -m "feat: add notfound-fade-up animation class"
```

---

### Task 7: Add Catch-All Route in `App.tsx`

**Files:**
- Modify: `src/App.tsx`

**Step 1: Add lazy import for NotFound**

After the existing lazy imports (line 17), add:

```tsx
const NotFound = lazy(() => import("@/pages/NotFound").then(m => ({ default: m.NotFound })));
```

**Step 2: Add catch-all route**

After the last `<Route>` (line 41, ai-seo-startup), add before `</Routes>`:

```tsx
<Route path="*" element={<NotFound />} />
```

**Step 3: Verify dev server**

```bash
npm run dev
```

Navigate to `http://localhost:5173/nonexistent-page` — should show the 404 page.

**Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: add catch-all 404 route"
```

---

### Task 8: Cleanup Orphan Files

**Files:**
- Delete: `public/smart-ai-proposal.png` (5MB orphan)

**Step 1: Verify the file is not referenced anywhere**

```bash
grep -r "smart-ai-proposal" src/ index.html
```

Expected: no results.

**Step 2: Delete**

```bash
rm public/smart-ai-proposal.png
```

**Step 3: Commit**

```bash
git rm public/smart-ai-proposal.png 2>/dev/null || git add -u
git commit -m "chore: remove unused 5MB orphan image"
```

---

### Task 9: Build Verification

**Step 1: Run production build**

```bash
npm run build
```

Expected: TypeScript check passes, build succeeds.

**Step 2: Preview production build**

```bash
npm run preview
```

Manually verify:
- 404 page renders at any unknown route
- Character image loads
- NavBar, Logo, ContactLine all visible
- Favicon visible in browser tab
- Animations play on page load

**Step 3: Check OG tags**

View page source at `/` and verify:
- `og:image` present with correct absolute URL
- `twitter:image` present
- `twitter:card` is `summary_large_image`
- Favicon `<link>` tags present
