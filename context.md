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
│   │   ├── homepage.ts        # Homepage content data
│   │   └── my-products.ts     # My Products page data
│   └── types/
│       └── content.ts         # TypeScript type definitions
└── public/                     # Static assets
```

## Key Files for Content Updates

### Homepage Content
- **File**: `lib/data/homepage.ts`
- **Contains**: Recent activity, What's new updates, header info, footer

### Current Homepage Data
- **Recent activity**: "Launched skr.design" (with link to https://skr.design)
- **What's new**:
  1. New video: «4 Deadly Stages Every Founder Must Survive»
  2. New Episode of redesigning AI products
  3. New Client: Andrew White

### Main Page Video
- **YouTube embed**: "4 Deadly Stages EVERY FOUNDER must survive" (https://www.youtube.com/embed/ijcQL4Dd0QY)

### My Products Page Content
- **File**: `lib/data/my-products.ts`
- **Page file**: `app/my-products/page.tsx`
- **Contains**: Products list with featured products (with images and CTAs) and regular text entries
- **Products spacing**: 44px gap between items

**Current Products:**
1. **Healthy Information Bubble Aggregator Platform for AI Founders** (2026) - Currently building...
2. **skr.design** (2026) - AI website builder with "Visit the Site" button (https://skr.design) - Featured
3. **Lullami kids stories app** (2025) - with "Download in AppStore" button - Featured

**Product Interface Fields:**
- `year`, `name`, `description`, `status`, `emoji`
- `isFeatured` - shows image card with CTA button
- `siteLink` - external site link (shows "Visit the Site" button)
- `appStoreLink` - App Store link (shows "Download in AppStore" button)

### Info & Contact Page Content
- **File**: `app/info-contact/page.tsx`
- **Contains**: Personal bio, images, and video placeholder

**Video Placeholder:**
- "Day in the Life of a Product Designer Managing Sweet Jobs with AI" (coming soon)

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
