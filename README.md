# Evgeny Shkuratov Portfolio v5.0.1

A command-driven portfolio website with terminal-style navigation.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Search**: Fuse.js (fuzzy search for command autocomplete)
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

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── public/               # Static assets
    └── assets/           # Images, SVGs
```

## Design System

All design tokens are configured in:
- `tailwind.config.ts` - Tailwind theme
- `app/globals.css` - CSS variables

### Colors
- Background: `#1e1e1e`
- Text: `#ffffff`
- Text Secondary: `#999899`
- Accent: `#d77757`
- Link: `#b2b9f9`
- Dark Text: `#222222`

### Typography
- Font: SF Pro Text (with system fallbacks)
- Body: 16px / 1.4
- Body Large: 18px / 1.2

## Development

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This project is optimized for Vercel deployment. Simply connect your repository to Vercel for automatic deployments.
