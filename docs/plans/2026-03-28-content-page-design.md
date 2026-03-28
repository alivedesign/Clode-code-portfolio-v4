# Content Page — Design

## Overview
Content page for the portfolio with 3 sections: YouTube, LinkedIn, Instagram.
Route: `/content`. Scrollable page matching Experience page patterns.

## Page Structure
- Logo + NavBar + ContactLine (mandatory)
- Header: "Content is my practice. It keeps me curious, sharp, and honest about what I know" — TN ExtraLight 48px (desktop) / 28px (mobile)
- 3 sections stacked vertically: YouTube → LinkedIn → Instagram
- Each section ends with accent-colored "More on [Platform]" link

## Section 1: YouTube (4 videos)
- **Desktop:** 2x2 grid, 32px gap, max-width 1280px, 16:9 ratio cells, rounded-24px
- **Mobile:** 1 column, full-width
- **Approach:** Thumbnail (maxresdefault.jpg) + play button overlay. Click swaps to autoplay iframe embed (no controls/branding). Reuse Experience page pattern.
- **Video IDs:** mhVlloJv9p8, NGDStQosFf4, _PjGMbGSlHA, _j-mglGJGk0
- **"More on YouTube"** accent link, centered, 56px below grid

## Section 2: LinkedIn (8 posts, iframe embeds)
- **Desktop:** 4-column masonry via CSS column-count: 4, ~22px gap, rounded-9px containers
- **Mobile:** 1 column, full-width
- **Approach:** LinkedIn embed iframes at `https://www.linkedin.com/embed/feed/update/urn:li:activity:XXXX`
- **Lazy loading:** iframes mount only when section scrolls into view (useInView)
- **Activity IDs:**
  - 7413157359788756992
  - 7438905592041127937
  - 7429913849069441024
  - 7441102567981408257
  - 7431325647488045057
  - 7440015423317770241
  - 7442922082499248129
  - 7420842828630573056
- **"More on LinkedIn"** accent link, centered, 56px below

## Section 3: Instagram (6 reels, embed.js)
- **Desktop:** Horizontal scrolling row, 40px gap, ~300px wide each, overflow-x auto, hidden scrollbar
- **Mobile:** 2-column grid or horizontal scroll
- **Approach:** Instagram embed.js script. Render blockquote elements, load script once, call window.instgrm.Embeds.process() after render.
- **Lazy loading:** Load embed.js only when section enters viewport
- **Reel IDs:** DWZBADwMeH1, DWWHHjwsWpR, DWMCQDlDHGM, DWbkKjuMXkC, DWJYRkzMOn7, DWRM9aVjD5d
- **"More on Instagram"** accent link, centered, 56px below

## Architecture
```
src/
  pages/Content.tsx          — Main page component
  data/contentData.ts        — All video IDs, LinkedIn URNs, Instagram URLs
  hooks/useInstagramEmbed.ts — Load embed.js + process embeds
```

- Content.tsx lazy-loaded in App.tsx
- Route: /content
- Animations: fade-up on scroll, staggered entrance for YouTube thumbnails
