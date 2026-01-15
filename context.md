# Evgeny Shkuratov Portfolio v5.0.1

A command-driven portfolio website with terminal-style navigation.

## Tech Stack

- **Framework**: Next.js 15 (App Router) with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Search**: Fuse.js (fuzzy search for command autocomplete)
- **Deployment**: Vercel

## Project Structure

```
├── app/                        # Next.js App Router pages
│   ├── page.tsx               # Homepage
│   ├── layout.tsx             # Root layout
│   ├── globals.css            # Global styles & CSS variables
│   ├── info-contact/          # Contact page
│   ├── main/                  # Main page
│   ├── my-products/           # Products page
│   ├── works/                 # Case studies
│   │   ├── bloggingmachine/   # BloggingMachine case study
│   │   └── b2b-messenger/     # B2B Messenger case study
│   └── unknown/               # Unknown command page
├── components/                 # React components
│   ├── CommandPrompt.tsx      # Terminal command prompt
│   ├── CommandInput.tsx       # Command input with autocomplete
│   ├── Header.tsx             # Site header
│   ├── Footer.tsx             # Site footer
│   ├── RichText.tsx           # Rich text with links support
│   ├── ActivitySection.tsx    # Recent activity section
│   ├── Avatar*.tsx            # Various avatar components
│   └── ...
├── lib/                        # Utilities and data
│   ├── data/
│   │   └── homepage.ts        # Homepage content data
│   └── types/
│       └── content.ts         # TypeScript type definitions
└── public/                     # Static assets
```

## Key Files for Content Updates

### Homepage Content
- **File**: `lib/data/homepage.ts`
- **Contains**: Recent activity, What's new updates, header info, footer

### Current Homepage Data
- **Recent activity**: "Launching SKR.Design" (with link to https://skr.design)
- **What's new**:
  1. New video: «4 Deadly Stages Every Founder Must Survive»
  2. New Episode of redesigning AI products
  3. New Client: Andrew White

### Type Definitions
- **File**: `lib/types/content.ts`
- **RichText**: Supports plain text and TextSegment objects with `text`, `link`, `bold`, `color` properties

## Design System

### Colors (defined in tailwind.config.ts & globals.css)
- Background: `#1e1e1e`
- Text: `#ffffff`
- Text Secondary: `#999899`
- Accent: `#d77757`
- Link: `#b2b9f9`

### Typography
- Font: SF Pro Text (with system fallbacks)
- Body: 16px / 1.4
- Body Large: 18px / 1.2

### Breakpoints
- Mobile: default
- Tablet: `tablet` (768px)
- Desktop: `desktop` (1024px)

## Development Commands

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Figma Design

Design reference: https://www.figma.com/design/dSI1pm4HMGi3gvtucXsuq4/Portfolio-v4

## Repository

GitHub: https://github.com/alivedesign/Clode-code-portfolio-v4
