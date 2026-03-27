# Experience Page Design

**Date:** 2026-03-27
**Status:** Approved

## Overview

Add a dedicated Experience page to the portfolio as the first sub-page. Introduces React Router for full-page routing. The page showcases work history with a YouTube video embed and links to LinkedIn.

## Architecture

- **React Router** added. Routes: `/` (Home), `/experience` (Experience).
- **Shared layout**: NavBar + ContactLine extracted into a shared wrapper used by both pages.
- **Logo**: Updated with `<Link to="/">` for home navigation.
- **Active nav state**: Use `useLocation()` to highlight current page in NavBar.
- **Instant page swap**: No transition animation between pages.

## Page Structure (top to bottom)

1. **Logo** — Top-left, "Shkuratov Designer", clicks → `/`
2. **Headline** — "AI Product Design Engineer focused on designing products people love and trust" — Times Now SemiLight, 48px desktop, centered
3. **Experience list** — 5 entries with thin horizontal dividers:
   - 2024 — ✦ | Senior Product Designer @ **B2B messenger app** with 100,000+ daily users
   - 2024 — 2025 | Senior Product Designer @ **HyperADX. Smart Programmatic Platform.**
   - 2023 — 2024 | Lead Product Designer @ **Edtech platform** with 15M+ user
   - 2020 — 2023 | Senior Product Designer @ **Edtech platform** with 15M+ user
   - 2018 — 2019 | UX/UI Designer @ **ITMINT. IT company**
4. **"More on LinkedIn"** — Coral accent (#d77757), centered, opens LinkedIn in new tab
5. **YouTube video embed** — `https://www.youtube.com/embed/ijcQL4Dd0QY`, 992px max-width, 16:9 aspect ratio, rounded 24px corners
6. **NavBar** — Fixed bottom, identical to Home, "Experience" highlighted
7. **ContactLine** — Desktop only, same as Home

## Animations

### On page load (staggered fade-up)
- Headline: 0ms delay, 500ms duration, 20px translate-up
- Each experience entry: staggered 80ms apart (80–400ms)
- "More on LinkedIn": 500ms delay
- All use `ease-out`, CSS `@keyframes` + `animation-delay`

### On scroll (Intersection Observer)
- YouTube video: fade-up when 20% visible, 600ms duration
- Simple Intersection Observer — no library needed

## Responsive Design

| Element | Mobile (<768px) | Desktop (768px+) |
|---------|-----------------|-------------------|
| Headline | 28px font, 20px horizontal padding | 48px font, 765px max-width |
| Experience list | 16px font, 20px padding | 18px font, 887px max-width centered |
| Video embed | Full width - 40px padding, 16:9 | 992px max-width, centered |
| NavBar | Mobile 3-item pill + hamburger | Desktop 6-item glass pill |
| Dividers | Full width within container | Full width within container |

## Links

- **Logo click**: navigates to `/`
- **"More on LinkedIn"**: `https://www.linkedin.com/in/evgeny-shkuratov-b34a99174/` (new tab)
- **YouTube embed**: `https://www.youtube.com/embed/ijcQL4Dd0QY`
- **Nav items**: Will link to respective pages (only `/` and `/experience` for now)

## Typography

- Headline: Times Now SemiLight, tracking -0.48px
- Experience entries: SF Pro Text Regular, 18px, leading 1.4
- Company names: white (#ffffff)
- Details/dates: secondary gray (#999899)
- "More on LinkedIn": SF Pro Text, 18px, coral (#d77757)
