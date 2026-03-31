# Evgeny Shkuratov Portfolio v5.0.1

A dark, minimal, animation-heavy portfolio with character video reveals and pose-based navigation.

## Tech Stack

- **Framework**: React 19 + React Router 7
- **Language**: TypeScript
- **Build**: Vite 8
- **Styling**: Tailwind CSS 4
- **Deployment**: Vercel

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
  App.tsx              # Router with React.lazy code splitting
  main.tsx             # Entry: BrowserRouter + StrictMode
  constants.ts         # Named timing/animation constants
  pages/               # Route-level page components
  components/          # Reusable UI components
  hooks/               # Custom React hooks
  data/                # Static data (experience, pose text)
  styles/              # Global CSS (glass morphism, animations)
public/
  fonts/               # TimesNow WOFF2 + TTF font files
  images/              # Posters, case study assets, content images
  videos/              # Character reveal + pose videos
```

## Design System

All design tokens are configured in:
- `src/styles/index.css` — CSS variables and custom classes
- `tailwind.config.ts` — Tailwind theme extensions

### Colors
- Background: `#000000`
- Text: `#ffffff`
- Text Secondary: `#999899`
- Accent: `#d77757`

### Typography
- Headings: TimesNow (custom font, WOFF2)
- Body: SF Pro Text (system font)
- Display: SF Pro Display (system font)

## Development

- `npm run dev` — Start Vite dev server
- `npm run build` — TypeScript check + production build
- `npm run preview` — Preview production build

## Deployment

This project is optimized for Vercel deployment. Simply connect your repository to Vercel for automatic deployments.
