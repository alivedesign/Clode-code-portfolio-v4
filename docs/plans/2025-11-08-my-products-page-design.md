# My Products Page Design

**Date**: 2025-11-08
**Status**: Approved
**Figma**: https://www.figma.com/design/dSI1pm4HMGi3gvtucXsuq4/Portfolio-v4?node-id=3442-1120

## Overview

Build /my_products page showcasing the founder's entrepreneurial journey, featuring past projects (closed startups) and current ventures, with the Lullami kids stories app prominently displayed.

## Requirements

1. Create new branch "My_products" on GitHub
2. Build only this page without affecting existing pages
3. Reuse input/dropdown logic from /works page
4. Export and use Lullami image at high resolution
5. App Store button links to: https://apps.apple.com/us/app/lullami-bed-time-stories/id6745401906

## Page Structure

### Layout
- Responsive container (max-width 1200px on tablet+)
- Back link to main terminal
- Hero section with orange border
- List of projects (chronological with emojis)
- Featured Lullami app with image and button
- Command input navigation with dropdown
- Footer

### Spacing Pattern (matching /works)
- Main sections: `gap-spacing-8`
- Tight groupings: `gap-spacing-4`
- Page padding: `px-spacing-7` (mobile), `px-spacing-9` (tablet), `px-[32px]` (tablet), `px-[40px]` (desktop)

## Data Model

### File: `lib/data/my-products.ts`

```typescript
export interface MyProductsProject {
  id: number;
  year?: string;
  name: string;
  status: string;
  emoji: string;
  isFeatured?: boolean;
  image?: string;
  appStoreLink?: string;
}

export interface MyProductsPageData {
  backLink: {
    text: string;
    href: string;
  };
  hero: {
    title: string;
    subtitle: RichText;
  };
  projects: MyProductsProject[];
}
```

### Content Structure

**Hero Box**:
- Title: "Work with not "just" a designer but a founder too"
- Subtitle: "I love creating and solving problems. [bold]I've built more than seven startups[/bold] and know exactly what you don't need to do."

**Projects List**:
1. 2019. Cashback service | Closed (︶︹︺)
2. 2021. A PWA for booking dishes from local restaurants | Closed (；﹏；)
3. 2022. Online School with AI IDE | Closed (ノ﹏ヽ)
4. **Lullami kids stories app** [Featured with image + App Store button]
5. Vibe-code Agency | Currently building... (•_•)🔧
6. Smart AI Proposal Generator | Currently building... (☞ﾟヮﾟ)☞🔩

## Component Architecture

### Reused Components
- **CommandInputSimple**: Navigation with `dropdownBehavior="relative"`
- **Footer**: Standard footer
- **RichText**: For hero subtitle with bold styling

### New Components
None - build inline similar to /works page

## Styling Details

### Hero Box
- Border: `border border-accent`
- Padding: `px-spacing-8 py-spacing-7`
- Title: `text-[24px] font-semibold text-accent leading-[1.2]`
- Subtitle: `text-text-18 leading-[1.2]` with mix of `text-text-secondary` and `text-text` (bold)

### Projects
- Text: `text-text-18 leading-[1.2]`
- Years/status: `text-text-secondary`
- Names (bold): `text-text`
- Spacing: `gap-spacing-8` between projects

### Lullami Featured Section
- Image container: `aspect-[793/329] rounded-spacing-4 w-full desktop:max-w-[795px]`
- Next.js Image: `fill`, `quality={95}`, `priority`
- Title: "Lullami kids stories app" - `text-text-18 text-text`
- Button:
  - Background: `bg-[#9f5c46]`
  - Padding: `px-spacing-7 py-spacing-4`
  - Text: `text-text-16 text-text font-medium`
  - Text: "Download in AppStore"
  - Link: `https://apps.apple.com/us/app/lullami-bed-time-stories/id6745401906`

### Back Link
- Text: "< Back to main terminal"
- Style: `text-text-18 text-text-secondary hover:text-link`
- Route: `/`

## Navigation Setup

### Add to `lib/data/navigation.ts`

```typescript
export const myProductsPageNavigationItems: NavigationItem[] = [
  {
    command: '/ Main',
    route: '/main',
    description: '/ Hero Section: "The Story of How We\'ll Work Together"',
  },
  {
    command: '/ Works',
    route: '/works',
    description: '/ Case Studies: "Real Projects, Real Results"',
  },
  {
    command: '/ Info_Contact',
    route: '/info-contact',
    description: '/ Info-Contact: "The Person Behind the Products"',
  },
  {
    command: '/ Clear',
    route: '/',
    description: '/ Start terminal page',
  },
];
```

## Image Assets

### Lullami Cloud Character
- Source: Export from Figma (node-id: 3483:8548)
- Destination: `/public/images/my-products/lullami-cloud.png`
- Quality: High resolution (95)
- Dimensions: Approximately 793x329px (aspect ratio maintained)

## Responsive Behavior

### Mobile (< 768px)
- Full width with standard mobile padding
- Stack all elements vertically
- Dropdown pushes content down (relative)

### Tablet (768px - 1199px)
- Max-width container (1200px)
- Same vertical stacking
- Increased padding

### Desktop (≥ 1200px)
- Max-width 1200px centered
- Lullami image max-width 795px

## Implementation Files

### New Files
- `lib/data/my-products.ts` - Page data

### Modified Files
- `app/my-products/page.tsx` - Complete page rebuild
- `lib/data/navigation.ts` - Add myProductsPageNavigationItems export

### Asset Files
- `public/images/my-products/lullami-cloud.png` - Featured app image

### Untouched Files
All other pages and components remain unchanged:
- `/main`
- `/works`
- `/info-contact`
- All components in `/components`

## Git Workflow

1. Create branch: `My_products`
2. Implement all changes
3. Commit with descriptive message
4. Push to GitHub
5. Main branch remains untouched

## Success Criteria

- [ ] Page matches Figma design pixel-perfect
- [ ] CommandInputSimple navigation works identically to /works
- [ ] App Store button links correctly
- [ ] Responsive design works across all breakpoints
- [ ] No regressions on existing pages
- [ ] All changes committed to My_products branch
- [ ] High-quality Lullami image displayed properly
