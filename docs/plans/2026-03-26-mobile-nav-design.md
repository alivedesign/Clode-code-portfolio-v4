# Mobile Navigation Design

## Overview

Add mobile navigation to the portfolio site by extending the existing `NavBar.tsx` component. Below 768px, the desktop navbar is replaced with a split bottom bar (3 main items + hamburger) and a full-screen menu overlay for secondary items.

**Key constraint:** Desktop code path remains completely untouched — mobile is a conditional branch gated by `useMediaQuery`.

## Breakpoint

- **Mobile:** `max-width: 767px` (detected via existing `useMediaQuery` hook)
- **Desktop:** 768px+ renders existing navbar exactly as-is

## Mobile Bottom Navigation Bar

Two glass pills fixed to the bottom of the screen:

### Left Pill (Main Nav)
- Items: Experience, Products, Cases
- Reuses `.navbar-glass` CSS class for identical glass effect
- Font: Times Now SemiLight, 14px
- Padding: `px-16 py-12`, `gap-16` between items
- Height: 44px
- Tapping an item triggers `onHoverPose` (character is visible)

### Right Pill (Menu Button)
- Glass pill with same `.navbar-glass` styling
- Contains 28px hamburger icon (3 SVG lines, not an image)
- Padding: 8px
- Tapping opens menu overlay

### Positioning
- `position: fixed`, `bottom: 24px`, `left: 24px`
- Flex row with `gap: 7px` between pills
- No lens hover effect on mobile

## Menu Overlay

### Trigger
Tap hamburger button to open; tap Close or any nav item to dismiss.

### Layout
- `position: fixed`, full viewport, `z-index: 60` (above navbar z-50)
- Background: `#000000` (pure black, solid)
- Logo stays visible (rendered by Home.tsx, outside NavBar)

### Menu Items
- Content, About, Resume — centered vertically
- Font: Times Now SemiLight, 24px, white
- Vertical stack, 56px gap
- Navigation links only — no character pose interaction

### Contact Line
- "Reach me at shkuratovdesigner@gmail.com or **Book a Call**"
- Font: SF Pro Display Regular, 16px
- Color: `#999899`, "Book a Call" in accent `#d77757`
- Near bottom (~550px from top), centered horizontally

### Bottom Bar (inside overlay)
- Same position as main bottom nav
- Left pill: same 3 items (Experience, Products, Cases) at 14px
- Right pill: X icon + "Close" text (replaces hamburger)
- Tapping Close or any item dismisses overlay

## Animations

### Menu Open (scale + fade from button)
1. Calculate hamburger button position on screen
2. Set `transform-origin` on overlay to button position
3. `scale(0) opacity(0)` -> `scale(1) opacity(1)`
4. Duration: 300ms, easing: `cubic-bezier(0.16, 1, 0.3, 1)`
5. Menu items stagger in after overlay reaches ~70% (50ms delay each)

### Menu Close (reverse)
1. Menu items fade out (~150ms)
2. Overlay scales back to button origin
3. Duration: 250ms

### Hamburger -> X Morph
- 3 SVG lines drawn in component
- Open: top line rotates +45deg, bottom rotates -45deg, middle fades out
- Close: reverse
- Duration: 300ms, synced with overlay
- "Close" text fades in alongside X formation

### Tap Feedback
- Nav items: brief opacity flash (0.6 -> 1) on tap
- No lens effect on mobile

### Implementation
- Pure CSS transitions/keyframes — no animation library
- Consistent with existing project approach

## Files Modified

- `src/components/NavBar/NavBar.tsx` — conditional mobile/desktop rendering
- `src/styles/index.css` — new mobile nav CSS classes, overlay animations, hamburger morph

## Files NOT Modified

- `src/pages/Home.tsx` — no changes
- `src/components/Hero/*` — no changes
- `src/components/Layout/*` — no changes
- `src/components/Character/*` — no changes
- Desktop navbar markup and logic — wrapped in conditional, not edited
