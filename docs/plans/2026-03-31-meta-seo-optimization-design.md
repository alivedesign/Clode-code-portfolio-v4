# Meta & SEO Optimization Design

**Date:** 2026-03-31
**Domain:** https://www.shkuratovdesigner.com/

## 1. Browser Tab Title

- Homepage: "Shkuratov Designer — Product Design Engineer"
- Inner pages: "[Page Name] — Shkuratov Designer" (existing pattern, no change needed)

## 2. Meta Description

Global (index.html):
> Evgeny Shkuratov — Product Design Engineer with 8+ years shipping products people love. Portfolio, case studies, and experience.

OG and Twitter descriptions updated to match.

## 3. Per-Page Meta Descriptions

Add dynamic `<meta name="description">` updates per route via useEffect or a shared hook.

| Route | Description |
|-------|-------------|
| `/` | Evgeny Shkuratov — Product Design Engineer with 8+ years shipping products people love. Portfolio, case studies, and experience. |
| `/experience` | Work history and career timeline of Evgeny Shkuratov — Product Design Engineer with 8+ years across B2B, EdTech, and SaaS. |
| `/products` | Product design work and projects by Evgeny Shkuratov. |
| `/cases` | Product design case studies by Evgeny Shkuratov — real projects with measurable outcomes. |
| `/case-study/1` | Case study: in-depth product design process and outcomes. |
| `/case-study/2` | Case study: Figma Token Plugin — design system tooling. |
| `/case-study/3` | Case study: B2B Stickers — animated sticker system for enterprise messaging. |
| `/case-study/4` | Case study: AI SEO Startup Redesign — conversion-focused product redesign. |
| `/content` | Design content and resources by Evgeny Shkuratov. |
| `/about` | About Evgeny Shkuratov — Product Design Engineer with 8+ years of experience. |

## 4. OG & Twitter Tags

Add to index.html:
- `og:url`: `https://www.shkuratovdesigner.com/`
- `og:image`: (provided by parallel session)
- `twitter:card`: upgrade from `summary` to `summary_large_image`
- `twitter:image`: (same as og:image)
- `<link rel="canonical" href="https://www.shkuratovdesigner.com/">`

## 5. Sitemap

Update `public/sitemap.xml` with all routes:
- `/`
- `/experience`
- `/products`
- `/cases`
- `/case-study/1`
- `/case-study/2`
- `/case-study/3`
- `/case-study/4`
- `/content`
- `/about`

## 6. robots.txt

Update sitemap URL to `https://www.shkuratovdesigner.com/sitemap.xml`

## 7. JSON-LD Updates

- Description: "8+ years"
- Add `url`: `https://www.shkuratovdesigner.com/`
- Update `knowsAbout`:
  1. Product Design Engineering
  2. Design Systems
  3. Figma Plugins & Tooling
  4. AI-Powered Design Workflows
  5. SaaS Product Design
  6. Interaction Design
  7. User Research
  8. React Component Systems

## 8. Out of Scope (handled separately)

- Favicon (parallel session)
- OG image (parallel session)
