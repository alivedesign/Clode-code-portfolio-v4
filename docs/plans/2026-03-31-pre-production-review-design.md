# Pre-Production Review — Design Document

**Date:** 2026-03-31
**Goal:** Clean, refactor, and validate the portfolio before deploying to production and switching branches.
**Approach:** Parallel cleanup + refactor, then full visual QA (Approach B).
**Guard rail:** Zero visual or behavioral changes — refactoring is structural only.

---

## Section 1: Cleanup

### Asset Deletion (~1.3MB)

| File | Reason |
|------|--------|
| `public/images/poster-about.webp` | Unused |
| `public/images/poster-cases.webp` | Unused |
| `public/images/poster-content.webp` | Unused |
| `public/images/poster-experience.webp` | Unused |
| `public/images/poster-products.webp` | Unused |
| `public/images/poster-resume.webp` | Unused |
| `public/images/character-poster.webp` | Unused |
| `public/images/content/LN-1.jpeg` | Unused (untracked) |
| `public/images/content/LN-3.jpeg` | Unused (untracked) |
| `public/images/content/LN-4.jpeg` | Unused (untracked) |
| `public/images/content/LN-5.jpeg` | Unused (untracked) |
| `public/images/content/LN-6.jpeg` | Unused (untracked) |
| `public/images/content/LN-7.jpeg` | Unused (untracked) |
| `public/images/cases/case-1/dot.svg` | Unused |
| `public/images/cases/case-1/line-down-left.svg` | Unused |
| `public/images/cases/case-1/line-down-right.svg` | Unused |
| `public/images/cases/case-2/arrow-back.svg` | Unused |
| `public/images/cases/case-2/arrow-down.svg` | Unused |
| `public/images/content/avatar.jpg` | Redundant (avatar.webp is used) |
| `public/Evgeny_Shkuratov_Product_Design_Engineer.docx` | Redundant (PDF is used) |

### Directory Cleanup

- Delete empty `public/images/b2b-messenger-case/`
- Delete empty `public/assets/`
- Delete `.playwright-mcp/` (testing artifacts)
- Delete `LinkedIn hooks results/` (content generation output)

### .gitignore Additions

```
.DS_Store
.playwright-mcp/
```

### File Fixes

- **README.md:** Correct "Next.js 15" → "Vite 8 + React 19"
- **index.html:** Remove `<link rel="preload">` for `character-poster.webp` if deleted (verify video poster usage first)

---

## Section 2: Code Refactoring

### CaseStudy1.tsx (816 LOC → orchestrator + sub-components)

Extract into `src/components/Cases/`:
- `BackLink.tsx` — shared "← Back to cases" link (used by all 4 case studies)
- `CaseHeroSection.tsx` — hero image + title + subtitle
- `CaseProblemSection.tsx` — problem statement with image grid
- `CaseTimelineSection.tsx` — timeline steps with icons
- `CaseDecisionSection.tsx` — decision/outcome cards

CaseStudy1.tsx becomes a layout orchestrator composing these sections.

### CaseStudy4.tsx (444 LOC → extract data)

- Move `PERSONAS_LEFT`, `PERSONAS_CENTER`, `PERSONAS_RIGHT` to `src/data/caseStudy4Data.ts`
- Keep component logic in the page file

### Shared Patterns

- `BackLink` component shared across all 4 case studies
- Check for other repeated patterns that warrant extraction

### Not Changed

- NavBar (328 LOC) — complexity is inherent
- Hooks, data files, other components — already clean

---

## Section 3: Visual QA via Playwright

### Desktop (1440px)

All pages: Home, Experience, Products, Cases, Case Study 1–4, Content, About, 404

Check:
- No broken images or missing assets
- No layout overflow or clipping
- Animations firing correctly
- All navigation links working
- No console errors
- Fonts loading properly

### Mobile (390px)

Same pages plus:
- Hamburger menu open/close
- Bottom navbar positioning and tap targets
- Swipe interactions on carousels
- Image/video scaling, no horizontal overflow
- Contact line hidden

### Regression Guard

All UI and logic must remain identical after refactoring. Rendered output must be pixel-identical.

---

## Section 4: Execution & Commits

| Phase | Work | Commit |
|-------|------|--------|
| 1a | Cleanup: delete files, fix .gitignore, fix README, fix index.html | `chore: cleanup unused assets, fix gitignore and README` |
| 1b | Refactor: split CaseStudy1, extract CaseStudy4 data, create BackLink | `refactor: split large case study components into sub-components` |
| 2 | Run `npm run build` — must pass with zero errors | — |
| 3 | Visual QA: Playwright screenshots at 1440px + 390px, all pages | — |
| 4 | Fix any regressions found | `fix: resolve QA regressions from refactoring` (if needed) |
