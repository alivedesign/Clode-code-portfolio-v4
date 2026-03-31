# Meta & SEO Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Optimize all meta information — titles, descriptions, OG/Twitter tags, JSON-LD, sitemap, robots.txt, and per-page meta descriptions.

**Architecture:** All changes are in static files (`index.html`, `robots.txt`, `sitemap.xml`) and per-page `useEffect` hooks in each page component. A shared `usePageMeta` hook handles dynamic `<meta name="description">` updates.

**Tech Stack:** React 19, TypeScript, Vite 8, HTML meta tags

---

### Task 1: Update index.html — title, meta description, OG, Twitter, canonical

**Files:**
- Modify: `index.html`

**Step 1: Update `<title>` and meta description**

Change line 9:
```html
<title>Shkuratov Designer — Product Design Engineer</title>
```

Change line 6 `<meta name="description">`:
```html
<meta name="description" content="Evgeny Shkuratov — Product Design Engineer with 8+ years shipping products people love. Portfolio, case studies, and experience." />
```

**Step 2: Update OG tags**

Replace existing OG block (lines 11-15) with:
```html
<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:title" content="Shkuratov Designer — Product Design Engineer" />
<meta property="og:description" content="Product Design Engineer with 8+ years shipping products people love. Portfolio, case studies, and experience." />
<meta property="og:url" content="https://www.shkuratovdesigner.com/" />
<meta property="og:locale" content="en_US" />
```

Note: `og:image` will be added by the parallel session handling the OG image.

**Step 3: Update Twitter tags**

Replace existing Twitter block (lines 17-20) with:
```html
<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Shkuratov Designer — Product Design Engineer" />
<meta name="twitter:description" content="Product Design Engineer with 8+ years shipping products people love." />
```

Note: `twitter:image` will be added by the parallel session.

**Step 4: Add canonical link**

Add after the Twitter block:
```html
<!-- Canonical -->
<link rel="canonical" href="https://www.shkuratovdesigner.com/" />
```

**Step 5: Verify and commit**

Run: `npm run build`
Expected: Build succeeds with no errors.

```bash
git add index.html
git commit -m "seo: update title, meta description, OG, Twitter tags, add canonical URL"
```

---

### Task 2: Update JSON-LD structured data

**Files:**
- Modify: `index.html` (JSON-LD `<script>` block, lines 22-78)

**Step 1: Update the JSON-LD block**

Replace the entire `<script type="application/ld+json">` block with:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Evgeny Shkuratov",
  "url": "https://www.shkuratovdesigner.com/",
  "jobTitle": "Product Design Engineer",
  "description": "Product Design Engineer with 8+ years of experience building products people love and trust.",
  "sameAs": [
    "https://www.linkedin.com/in/evgeny-shkuratov-b34a99174/"
  ],
  "knowsAbout": [
    "Product Design Engineering",
    "Design Systems",
    "Figma Plugins & Tooling",
    "AI-Powered Design Workflows",
    "SaaS Product Design",
    "Interaction Design",
    "User Research",
    "React Component Systems"
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
```

**Step 2: Commit**

```bash
git add index.html
git commit -m "seo: update JSON-LD — 8+ years, new skills, add URL"
```

---

### Task 3: Update noscript fallback text

**Files:**
- Modify: `index.html` (noscript block, lines 99-117)

**Step 1: Update the heading and description**

Change the `<h1>` inside noscript to:
```html
<h1>Evgeny Shkuratov — Product Design Engineer</h1>
```

Change the `<p>` to:
```html
<p>Product Design Engineer with 8+ years of experience building products people love and trust.</p>
```

**Step 2: Commit**

```bash
git add index.html
git commit -m "seo: update noscript fallback text"
```

---

### Task 4: Create usePageMeta hook for per-page meta descriptions

**Files:**
- Create: `src/hooks/usePageMeta.ts`

**Step 1: Create the hook**

```typescript
import { useEffect } from "react";

export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", description);
    }
  }, [title, description]);
}
```

**Step 2: Commit**

```bash
git add src/hooks/usePageMeta.ts
git commit -m "feat: add usePageMeta hook for per-page title and description"
```

---

### Task 5: Replace document.title with usePageMeta in all pages

**Files:**
- Modify: `src/pages/Home.tsx:29-31`
- Modify: `src/pages/Experience.tsx:39-41`
- Modify: `src/pages/Products.tsx:12-14`
- Modify: `src/pages/Cases.tsx:10-12`
- Modify: `src/pages/Content.tsx:196-198`
- Modify: `src/pages/About.tsx:81-83`
- Modify: `src/pages/CaseStudy1.tsx:788-790`
- Modify: `src/pages/CaseStudy2.tsx:185-187`
- Modify: `src/pages/CaseStudy3.tsx:60-62`
- Modify: `src/pages/CaseStudy4.tsx:153-155`
- Modify: `src/pages/NotFound.tsx:8-10`

**Step 1: In each page, replace the `document.title = "..."` line with `usePageMeta()` call**

Import at top of each file:
```typescript
import { usePageMeta } from "@/hooks/usePageMeta";
```

Then replace the `document.title` assignment inside the existing `useEffect`. If the `useEffect` ONLY sets `document.title`, replace the entire `useEffect` with the `usePageMeta` call (not inside a `useEffect`— the hook has its own). If the `useEffect` does more (e.g. `window.scrollTo`), keep the `useEffect` for the other logic and add `usePageMeta` as a separate call.

Page-by-page values:

| Page | Title | Description |
|------|-------|-------------|
| Home | `Shkuratov Designer — Product Design Engineer` | `Evgeny Shkuratov — Product Design Engineer with 8+ years shipping products people love. Portfolio, case studies, and experience.` |
| Experience | `Experience — Shkuratov Designer` | `Work history and career timeline of Evgeny Shkuratov — Product Design Engineer with 8+ years across B2B, EdTech, and SaaS.` |
| Products | `Products — Shkuratov Designer` | `Product design work and projects by Evgeny Shkuratov.` |
| Cases | `Cases — Shkuratov Designer` | `Product design case studies by Evgeny Shkuratov — real projects with measurable outcomes.` |
| CaseStudy1 | `MCP Vibe Coding — Shkuratov Designer` | `Case study: MCP vibe coding — design engineering process and outcomes.` |
| CaseStudy2 | `Figma Token Plugin — Shkuratov Designer` | `Case study: Figma Token Plugin — design system tooling for automated token management.` |
| CaseStudy3 | `B2B Stickers — Shkuratov Designer` | `Case study: B2B Stickers — animated sticker system for enterprise messaging.` |
| CaseStudy4 | `AI SEO Startup Redesign — Shkuratov Designer` | `Case study: AI SEO Startup Redesign — conversion-focused product redesign.` |
| Content | `Content — Shkuratov Designer` | `Design content and resources by Evgeny Shkuratov.` |
| About | `About — Shkuratov Designer` | `About Evgeny Shkuratov — Product Design Engineer with 8+ years of experience.` |
| NotFound | `404 — Shkuratov Designer` | `Page not found — Shkuratov Designer.` |

Note: CaseStudy1 title changes from generic "Case Study" to "MCP Vibe Coding" to match its route `/cases/mcp-vibe-coding`.

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
git add src/pages/
git commit -m "seo: add per-page meta descriptions via usePageMeta hook"
```

---

### Task 6: Update sitemap.xml

**Files:**
- Modify: `public/sitemap.xml`

**Step 1: Replace entire sitemap with all routes**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.shkuratovdesigner.com/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.shkuratovdesigner.com/experience</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.shkuratovdesigner.com/products</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.shkuratovdesigner.com/cases</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.shkuratovdesigner.com/cases/mcp-vibe-coding</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.shkuratovdesigner.com/cases/figma-token-plugin</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.shkuratovdesigner.com/cases/stickers</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.shkuratovdesigner.com/cases/ai-seo-startup</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.shkuratovdesigner.com/content</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://www.shkuratovdesigner.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

**Step 2: Commit**

```bash
git add public/sitemap.xml
git commit -m "seo: add all routes to sitemap.xml"
```

---

### Task 7: Update robots.txt

**Files:**
- Modify: `public/robots.txt`

**Step 1: Update sitemap URL**

```
User-agent: *
Allow: /

Sitemap: https://www.shkuratovdesigner.com/sitemap.xml
```

**Step 2: Commit**

```bash
git add public/robots.txt
git commit -m "seo: fix domain in robots.txt sitemap URL"
```

---

### Task 8: Update Home.tsx title

**Files:**
- Modify: `src/pages/Home.tsx:30`

**Step 1: Update title string**

The Home page title needs to change from `"Shkuratov Designer — AI Product Design Engineer"` to `"Shkuratov Designer — Product Design Engineer"` (dropping "AI"). This is handled as part of Task 5's usePageMeta migration, but verify the title value is correct.

**Step 2: Final build verification**

Run: `npm run build`
Expected: Clean build, no errors.

**Step 3: Final commit**

```bash
git commit -m "seo: meta optimization complete"
```
