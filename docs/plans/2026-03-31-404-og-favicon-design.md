# Design: 404 Page + Open Graph + Favicon

## 1. NotFound Page (`src/pages/NotFound.tsx`)

### Layout (from Figma)

- Full viewport height (`h-screen h-dvh`), black background, vertically centered content
- **Logo** (top-left) — existing `<Logo visible />` component
- **"< Back to Main"** — centered at top, chevron-left SVG + "Back to Main" in TimesNow SemiLight 24px, `text-text-secondary`, links to `/`
- **Character image** — centered, ~446px on desktop, WebP format (`/images/404-character.webp`)
- **"Page not found"** — TimesNow SemiLight 56px, white, `tracking-[-0.56px]`, below character
- **NavBar** (bottom) — existing `<NavBar visible />` component
- **ContactLine** (bottom) — existing `<ContactLine visible />` component

### Responsive (mobile)

- Character scales down (~280px)
- "Page not found" drops to ~32-36px
- "Back to Main" drops to ~18-20px
- Same mobile NavBar behavior (bottom bar + hamburger)

### Animations

- Fade-up entrance on character + text (staggered, CSS keyframe on mount)
- No complex state machine — simple entrance animations like Experience page

### Routing

- Add `<Route path="*" element={<NotFound />} />` as catch-all in `App.tsx`
- Lazy-loaded: `const NotFound = lazy(() => import("@/pages/NotFound").then(m => ({ default: m.NotFound })))`
- `document.title = "404 — Shkuratov Designer"`

## 2. Character Image Optimization

- Source: `public/images/404-character.png` (2048x2048, 2.4MB)
- Convert to WebP, resize to ~900px (2x Retina for 446px display)
- Expected output: ~50-80KB
- Save as `public/images/404-character.webp`
- `loading="eager"` — hero element, no lazy loading
- Delete source PNG after conversion

## 3. Favicon Setup

Source: `fav.png` (168x168, 47KB). Generate:

| File | Size | Purpose |
|------|------|---------|
| `public/favicon.ico` | 32x32 | Universal fallback |
| `public/favicon-16x16.png` | 16x16 | Modern browsers |
| `public/favicon-32x32.png` | 32x32 | Modern browsers |
| `public/apple-touch-icon.png` | 180x180 | iOS Safari |
| `public/site.webmanifest` | — | PWA manifest |

Add `<link>` tags to `index.html`:

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
```

## 4. Open Graph Image

Source: `opengraph.png` (1800x945, 966KB).

- Keep as PNG for maximum platform compatibility (LinkedIn, iMessage, etc.)
- Compress PNG without quality loss
- Move to `public/og-image.png`
- Add to `index.html`:
  - `og:image` with absolute URL
  - `og:image:width` = 1800, `og:image:height` = 945
  - `og:image:type` = `image/png`
  - `og:url` — site URL
  - `twitter:card` → change from `summary` to `summary_large_image`
  - `twitter:image` — same image URL

## 5. Cleanup

- Delete `fav.png` from project root
- Delete `opengraph.png` from project root
- Delete `public/images/404-character.png` (raw source)
- Delete `public/smart-ai-proposal.png` (5MB orphan)
