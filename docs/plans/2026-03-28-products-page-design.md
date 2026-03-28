# Products Page Design

## Overview

New `/products` page showcasing 6 AI/design products in a 2-column card grid with modals for detailed product stories. Same visual language as the Experience page — dark, minimal, TN serif headline, staggered fade-up animations.

## Page Structure

- Black background, min full viewport height, scrollable
- `<Logo visible />` top-left (links back to `/`)
- `<NavBar visible />` fixed bottom, "Products" tab active
- `<ContactLine visible />` desktop footer
- `document.title = "Products — Shkuratov Designer"`
- Semantic HTML: `<main>` with `<section>` for grid

### Content Area

- Centered, max-width 1080px
- Headline: "This is where I experiment, ship, and prove that you can build with AI without cutting corners"
  - TN serif, font-extralight, 48px desktop / 28px mobile, centered, tracking-[-0.48px], max-w-[765px]
  - Same style as Experience page h1
- Padding: `px-5` mobile, `px-10` desktop
- Top padding: `pt-[104px]` to clear Logo
- Bottom padding: `pb-[140px] md:pb-[272px]` to clear NavBar

## Product Cards

### Grid Layout

- 2 columns on all screen sizes
- Desktop: 500px per card, 80px column gap, 80px row gap
- Mobile: equal columns fill available width, 16px gap, 16px row gap

### Card Structure

Each card contains:

1. **Image area**: Aspect ratio from 500x300 (5:3), rounded-[16px], overflow hidden
   - Images: `public/images/products/products-{1-6}.png`
2. **Title**: TN serif, two-tone text
   - Product name in white (bold/semi-bold weight) followed by period
   - Description in `text-secondary` (#999899)
   - Centered below image
3. **"Learn more" link**: Accent orange (#d77757), centered below title

### Card Behaviors

| Card | Product | "Learn more" action |
|------|---------|-------------------|
| 1 | Morning briefing agent. Personalized news & AI updates | Opens modal |
| 2 | YouTube research AI agent | Opens modal |
| 3 | Figma plugin for cleaning up legacy design tokens | No link (hidden) |
| 4 | Klondaike. Curated collection of useful AI resources | External: https://www.klondaike.com/ |
| 5 | Lullami. Kids' stories app | External: https://apps.apple.com/us/app/lullami-bed-time-stories/id6745401906 |
| 6 | skr.design. Design agency | External: https://www.skr.design/ |

### Card Animation

Staggered fade-up on page load, reusing existing `experience-fade-up` pattern with `EXPERIENCE_STAGGER_MS` (80ms) delay between cards.

## Modals

### Behavior

- Trigger: click "Learn more" on cards 1 or 2
- Dark semi-transparent backdrop (`rgba(0,0,0,0.7)`)
- Centered modal: black bg, rounded-[24px], max-width ~700px
- Padding: 32px horizontal, 48px vertical
- Vertical scroll inside modal for long content
- Close: X button (top-right), backdrop click, Escape key
- Body scroll locked when modal is open
- Fade-in/fade-out animation
- Mobile: nearly full-screen with ~16px side margins, full vertical scroll

### Modal 1 — Morning Briefing Agent

- Hero image (full-width, 270px tall, rounded-[16px])
- Body text: SF Pro Text, 18px, white, leading-[1.4]
- White callout boxes: white bg, rounded-[8px], TN SemiLight 20px, black text, px-[12px] pt-[8px] pb-[6px]
- Content sections:
  1. Problem paragraph ("Every morning I was losing 30+ minutes...")
  2. Callout: "So I built an autonomous agent that does it for me."
  3. Description paragraph (57 sources...)
  4. Callout: "Every morning at 9 AM, I get a curated briefing in Telegram. Five sections:"
  5. Bullet list (5 items: AI News, Claude Corner, Dev Trending, AI Tip, Industry Signals)
  6. Callout: "How it works:"
  7. Numbered list (3 steps: Fetch, Filter, Deliver)
  8. Closing paragraph (tech stack: bash, SQLite, Claude Code CLI, GitHub Actions)

### Modal 2 — YouTube Research AI Agent

- Same layout pattern as Modal 1
- Content sections:
  1. Problem paragraph ("Before every video, I used to spend hours guessing...")
  2. Callout: "I built an agent that finds viral outliers and reverse-engineers why they won."
  3. Description paragraph (multiplier concept...)
  4. Paragraph (transcript analysis...)
  5. Callout: "The output is a full strategy report with:"
  6. Bullet list (5 items: outlier rankings, title patterns, content structure, outperformance analysis, recommendations)
  7. Callout: "How it works:"
  8. Numbered list (4 steps: Search, Score, Transcribe, Analyze)
  9. Closing paragraph (tech stack: Python, YouTube Data API, SQLite, Claude Code)

## Navigation Integration

### Route

- Path: `/products`
- Lazy-loaded in App.tsx: `const Products = lazy(() => import("@/pages/Products").then(m => ({ default: m.Products })))`

### NavBar Update

- Change Products nav item from `path: "/"` to `path: "/products"`
- Active state shown when `location.pathname === "/products"`

### Logo

- Already links to `/` — clicking logo on Products page navigates home. No changes needed.

## File Structure

```
src/
  pages/Products.tsx              # Page component
  data/productsData.ts            # Card data + modal content
  components/Products/
    ProductCard.tsx                # Card component
    ProductModal.tsx               # Modal component
    index.ts                      # Barrel export
public/
  images/products/
    products-1.png through products-6.png
```

## CSS Additions (src/styles/index.css)

- Modal backdrop animation (fade in/out)
- Modal container animation (fade + slight scale)
- Card image hover effect (subtle brightness or scale)
- Reuse existing `experience-fade-up` keyframe for card stagger
- Body scroll lock class for modal open state
