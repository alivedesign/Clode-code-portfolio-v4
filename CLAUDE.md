# Portfolio v5 — Evgeny Shkuratov

## Project

Personal portfolio for Evgeny Shkuratov, AI Product Design Engineer. Dark, minimal, animation-heavy showcase with character video reveals and pose-based navigation.

**Stack:** React 19 + TypeScript + Vite 8 + Tailwind CSS 4 + React Router 7
**No SSR.** Client-side SPA. SEO handled via JSON-LD, noscript fallback, and static meta tags.

## Commands

- `npm run dev` — start Vite dev server (usually http://localhost:5173)
- `npm run build` — TypeScript check + production build
- `npm run preview` — preview production build
- No test framework configured yet

## Architecture

```
src/
  App.tsx              # Router with React.lazy code splitting
  main.tsx             # Entry: BrowserRouter + StrictMode
  constants.ts         # Named timing/animation constants
  pages/
    Home.tsx           # Main page: character reveal, pose cycling, typewriter
    Experience.tsx     # Timeline page: work history, YouTube embed
  components/
    Character/         # Video-based character with reveal + pose animations
    Hero/              # Logo, HeroText (typewriter), PoseText (per-pose copy)
    NavBar/            # Desktop glass pill + mobile bottom bar with hamburger menu
    Layout/            # MainLayout wrapper, ContactLine
  hooks/               # useMediaQuery, useSwipe, useTypewriter, useInView, etc.
  data/                # experienceData.ts, poseTextData.ts
  styles/
    index.css          # All custom CSS (glass morphism, animations, masks)
```

## Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | `#000000` | Page background |
| `--color-text` | `#ffffff` | Primary text |
| `--color-text-secondary` | `#999899` | Secondary/muted text |
| `--color-accent` | `#d77757` | Links, CTAs (warm orange) |
| `--color-glass` | `rgba(255,255,255,0.1)` | Glass borders |

### Typography
| Font | Weights | Usage |
|------|---------|-------|
| `"TN"` (TimesNow) | 200, 300, 350, 600, 700, 800 | Headings, navbar tabs, pose text |
| System SF Pro Text | `.font-sf` CSS class | Body text, experience entries |
| System SF Pro Display | `.font-sf-display` CSS class | Logo, contact line |

Font files: WOFF2 (primary) + TTF (fallback) in `public/fonts/`.
Preloaded: ExtraLight (200) + SemiLight (350).

### Spacing & Layout
- Mobile breakpoint: `max-width: 767px` (via `useMediaQuery`)
- Desktop navbar: `fixed bottom-[100px]` centered
- Mobile navbar: `fixed bottom-24px left-24px right-24px`
- Contact line: `fixed bottom-[30px]` centered, desktop only
- Logo: `top-24px left-24px` (mobile), `top-32px left-160px` (desktop)
- Page height: `h-screen h-dvh` (vh fallback for older browsers)

### Glass Morphism (Navbar)
- `.navbar-glass`: backdrop-filter blur(40px) saturate(150%), subtle gradient bg, complex inset shadows
- `.nav-frost-pill`: backdrop-filter blur(16px), sits behind glass at z-index -1
- `.home-nav-glow`: radial gradient glow at bottom of Home page — gives frost something to blur against black bg
- Outer shadows on `.navbar-glass` via box-shadow (NOT filter:drop-shadow — breaks backdrop-filter in Firefox)

## Key Patterns

### Every new page MUST include:
1. `<NavBar visible />` — fixed bottom nav, works on mobile + desktop
2. `<ContactLine visible />` — desktop contact footer
3. `<Logo visible />` — top-left branding
4. `useEffect(() => { document.title = "Page — Shkuratov Designer"; }, [])` — SEO page title
5. Semantic HTML: `<header>`, `<main>`, `<section>`, proper heading hierarchy

### NavBar behavior (consistent across all pages):
- Desktop: glass pill with hover lens animation, 6 nav items
- Mobile: bottom bar with 3 main items (Experience, Products, Cases) + hamburger menu
- Hamburger opens full-screen overlay with remaining items (Content, About, Resume)
- `visible` prop controls show/hide with opacity + translateY transition
- Frost effect visible on all pages (Experience has content to blur, Home uses `.home-nav-glow`)

### Animation constants (src/constants.ts):
| Constant | Value | Purpose |
|----------|-------|---------|
| `REVEAL_UI_DELAY` | 2500ms | UI appears after reveal |
| `HERO_TYPING_DELAY` | 400ms | Typing starts after reveal begins |
| `EXPERIENCE_STAGGER_MS` | 80ms | Stagger between list items |
| `POSE_PLAYBACK_RATE` | 1.25x | Pose video speed |
| `POSE_START_TIME` | 0.8s | Skip intro frames |
| `POSE_NEAR_END_OFFSET` | 0.3s | Fire near-end callback |

### Character state machine:
```
loading → revealing → idle ⇄ posing (with videoEnded flag)
```

### Video strategy:
- Reveal video: always in DOM, `fetchPriority="high"`
- Pose videos: mounted/unmounted per pose, key forces remount
- Poster images (WebP): shown when pose video ends
- All pose videos preloaded after reveal via `useVideoPreloader`

## Cross-Browser Rules

- Always pair `-webkit-mask-image` with standard `mask-image`
- Always pair `-webkit-backdrop-filter` with standard `backdrop-filter`
- Never use `filter: drop-shadow()` on a parent of `backdrop-filter` elements (Firefox breaks)
- Use `h-screen h-dvh` pattern (vh fallback before dvh)
- Use `will-change` on frequently animated elements (navbar-lens, menu-overlay)
- Poster images in WebP format
- Fonts in WOFF2 with TTF fallback
- `playsInline` on all `<video>` elements (iOS Safari)
- `-webkit-tap-highlight-color: transparent` on mobile interactive elements

## SEO & AI

- JSON-LD `Person` schema in index.html with full work history
- Open Graph + Twitter Card meta tags
- `<noscript>` fallback with plain HTML resume + contact info
- `robots.txt` allows all crawlers
- `sitemap.xml` lists all routes
- Semantic HTML with proper heading hierarchy (h1 per page)
- Per-page `document.title` updates

## Don'ts

- Don't use `filter: drop-shadow` on parent elements containing `backdrop-filter` children
- Don't use inline font-family strings — use `.font-sf` or `.font-sf-display` CSS classes
- Don't hardcode timing values — use constants from `src/constants.ts`
- Don't use `block` on links that should only be clickable on their text content
- Don't add `<link rel="preload">` for video — use `fetchPriority` on the `<video>` element
- Don't import pages synchronously in App.tsx — use React.lazy
- Don't skip `font-display: swap` on @font-face declarations
