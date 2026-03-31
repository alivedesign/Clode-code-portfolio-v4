# Portfolio v5 Refactoring Design

**Date:** 2026-03-28
**Status:** Approved

## Goals

1. Optimize performance (faster loads, smaller bundles)
2. Improve code readability (named constants, remove dead code, reduce repetition)
3. SEO + AI/LLM discoverability (structured data, semantic HTML, crawlable content)
4. Cross-browser compatibility (modern evergreen + graceful degradation where free)
5. Home page frost effect (match Experience page navbar appearance)
6. No visual changes — everything must look identical after refactoring

## Section 1: Performance & Code Quality

- **Lazy-load pages** — `React.lazy()` + `Suspense` for Home/Experience in App.tsx
- **WOFF2 fonts** — convert all 6 TTF files to WOFF2 (30-50% smaller). Update `@font-face` declarations. Preload only weights 200 + 350 (used on first render)
- **Video preload fix** — remove `<link rel="preload" ... as="video">` from index.html (browsers deprioritize/ignore video preloads). Use `fetchpriority="high"` on the reveal `<video>` element instead
- **WebP poster images** — convert all 6 poster PNGs to WebP
- **Remove dead code** — delete unused `NavItem.tsx`, remove stale `.env.local` GA tracking ID
- **Clean up .env.local** — `NEXT_PUBLIC_*` prefix is for Next.js, not Vite

## Section 2: SEO & AI/LLM Discoverability

- **Open Graph + Twitter Card meta tags** in index.html — title, description, image, type
- **JSON-LD structured data** — `Person` schema with name, role, skills, work history, social links. Embedded in index.html `<script type="application/ld+json">`
- **Semantic HTML** — add `<main>`, `<header>`, `<footer>`, `<section>` with proper heading hierarchy to Home page. Experience page already has `<main>`
- **robots.txt** — static file in `/public`, allow all crawlers
- **sitemap.xml** — static file in `/public`, list `/` and `/experience`
- **`<noscript>` fallback** — plain-text version of key info (name, role, experience summary, contact) inside `<noscript>` in index.html for crawlers that don't execute JS
- **Per-page titles** — update `document.title` in each page component via `useEffect`

## Section 3: Cross-Browser Compatibility

- **Standard mask properties** — ensure both `-webkit-mask-*` and unprefixed `mask-*` are present for `maskRevealC` animation and `.pose-edge-mask`
- **`dvh` fallback** — add `height: 100vh` before `height: 100dvh` in MainLayout and Experience page
- **`will-change` hints** — add to navbar lens, menu overlay, and character container
- **Verify `box-shadow` migration** — confirm the Firefox fix (moving `drop-shadow` from `.navbar-shadow-halo` to `box-shadow` on `.navbar-glass`) looks identical in Chrome/Safari/Firefox

## Section 4: Home Page Frost Effect

- Add a subtle radial gradient glow element behind the navbar area on Home page
- Positioned at the bottom of the viewport, behind the nav's z-index
- Very low opacity — just enough to give `backdrop-filter: blur()` something to work with
- Must not change the overall dark aesthetic

## Section 5: Code Readability & Cleanup

- **Extract repeated font stacks** — `SF_Pro_Text` inline Tailwind class used in multiple components → CSS utility class
- **Extract inline styles** — `fontFamily: '"TN"'` in Experience.tsx → Tailwind class
- **Named constants** — timing values (2500ms reveal, 400ms hero, 80ms stagger, 1.25x playback, 0.8s startTime) → exported constants
- **Comment reflow hack** — explain the `offsetWidth` trick in Character.tsx
- **Remove accidental file** — `arrow-left.svg.png` in public/
