# Mobile Navigation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add mobile navigation (bottom bar + menu overlay) to the portfolio site at <768px, keeping desktop untouched.

**Architecture:** Extend `NavBar.tsx` with a `useMediaQuery` conditional branch. Desktop code is wrapped but never modified. Mobile branch adds a split bottom bar (3 items + hamburger) and a fullscreen menu overlay with scale+fade animation. All styling via custom CSS classes in `index.css`.

**Tech Stack:** React 19, TypeScript, Tailwind CSS v4, pure CSS animations, Vite

---

### Task 1: Add mobile navigation CSS classes

**Files:**
- Modify: `src/styles/index.css:93` (append after `.navbar-lens` block, before character mask section)

**Step 1: Add mobile nav container and pill styles**

Add after line 93 (after the `.navbar-lens` closing brace), before the `/* Character mask reveal */` comment:

```css
/* ─── Mobile Navigation ───────────────────────────────────── */
.mobile-nav {
  position: fixed;
  bottom: 24px;
  left: 24px;
  display: flex;
  align-items: center;
  gap: 7px;
  z-index: 50;
}

.mobile-nav-pill {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 44px;
  padding: 12px 16px;
}

.mobile-nav-tab {
  white-space: nowrap;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.65);
  font-family: "Times Now", serif;
  font-size: 14px;
  line-height: 1.2;
  cursor: pointer;
  transition: opacity 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}
.mobile-nav-tab:active {
  opacity: 0.6;
}

.mobile-menu-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border: none;
  background: none;
  -webkit-tap-highlight-color: transparent;
}
```

**Step 2: Verify the CSS is valid**

Run: `npx vite build --mode development 2>&1 | head -5`
Expected: No CSS parse errors

**Step 3: Commit**

```bash
git add src/styles/index.css
git commit -m "style: add mobile nav base CSS classes"
```

---

### Task 2: Add hamburger icon morph CSS

**Files:**
- Modify: `src/styles/index.css` (append after Task 1's CSS)

**Step 1: Add hamburger line styles and morph transitions**

Append directly after the `.mobile-menu-btn` block:

```css
/* ─── Hamburger Icon ──────────────────────────────────────── */
.hamburger {
  width: 28px;
  height: 28px;
  position: relative;
  flex-shrink: 0;
}

.hamburger-line {
  position: absolute;
  left: 2.333px;
  width: 23.333px;
  height: 2px;
  background: white;
  border-radius: 1px;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.hamburger-line:nth-child(1) { top: 5.833px; }
.hamburger-line:nth-child(2) { top: 13px; }
.hamburger-line:nth-child(3) { top: 20.166px; }

.hamburger.open .hamburger-line:nth-child(1) {
  transform: translateY(7.167px) rotate(45deg);
}
.hamburger.open .hamburger-line:nth-child(2) {
  opacity: 0;
}
.hamburger.open .hamburger-line:nth-child(3) {
  transform: translateY(-7.166px) rotate(-45deg);
}

.hamburger-close-text {
  font-family: "Times Now", serif;
  font-size: 16px;
  line-height: 1.2;
  color: white;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.hamburger-close-text.visible {
  opacity: 1;
  transform: translateX(0);
}
```

**Step 2: Verify build**

Run: `npx vite build --mode development 2>&1 | head -5`
Expected: No errors

**Step 3: Commit**

```bash
git add src/styles/index.css
git commit -m "style: add hamburger icon morph CSS transitions"
```

---

### Task 3: Add menu overlay CSS and animations

**Files:**
- Modify: `src/styles/index.css` (append after Task 2's CSS)

**Step 1: Add overlay base styles and keyframes**

Append after the hamburger section:

```css
/* ─── Menu Overlay ────────────────────────────────────────── */
.menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 55;
  background: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0);
  pointer-events: none;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.menu-overlay.open {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
}
.menu-overlay.closing {
  opacity: 0;
  transform: scale(0);
  transition-duration: 0.25s;
}

.menu-overlay-items {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;
}

.menu-overlay-link {
  font-family: "Times Now", serif;
  font-size: 24px;
  line-height: 1.2;
  color: white;
  text-decoration: none;
  white-space: nowrap;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  -webkit-tap-highlight-color: transparent;
}
.menu-overlay-link:active {
  opacity: 0.6;
}
.menu-overlay.open .menu-overlay-link {
  opacity: 1;
  transform: translateY(0);
}
.menu-overlay.open .menu-overlay-link:nth-child(1) { transition-delay: 0.1s; }
.menu-overlay.open .menu-overlay-link:nth-child(2) { transition-delay: 0.15s; }
.menu-overlay.open .menu-overlay-link:nth-child(3) { transition-delay: 0.2s; }

.menu-overlay-contact {
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  line-height: 1.3;
  color: #999899;
  text-align: center;
  width: 311px;
  opacity: 0;
  transition: opacity 0.3s ease;
  transition-delay: 0.1s;
}
.menu-overlay.open .menu-overlay-contact {
  opacity: 1;
  transition-delay: 0.25s;
}

/* Bottom bar inside overlay sits above the overlay */
.menu-overlay-bottom-bar {
  position: absolute;
  bottom: 24px;
  left: 24px;
  display: flex;
  align-items: center;
  gap: 7px;
  z-index: 56;
}
```

**Step 2: Verify build**

Run: `npx vite build --mode development 2>&1 | head -5`
Expected: No errors

**Step 3: Commit**

```bash
git add src/styles/index.css
git commit -m "style: add menu overlay CSS with scale animation and staggered items"
```

---

### Task 4: Implement mobile NavBar branch in NavBar.tsx

This is the main implementation task. Desktop code is wrapped in a conditional but never modified.

**Files:**
- Modify: `src/components/NavBar/NavBar.tsx`

**Step 1: Add imports and split nav items**

Add `useMediaQuery` import and split nav items into two arrays:

```typescript
import { useState, useRef, useCallback, useEffect } from "react";
import type { CharacterPose } from "@/components/Character/useCharacterState";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const MAIN_NAV_ITEMS: { label: string; pose: CharacterPose; href: string }[] = [
  { label: "Experience", pose: "experience", href: "#experience" },
  { label: "Products", pose: "products", href: "#products" },
  { label: "Cases", pose: "cases", href: "#cases" },
];

const MENU_NAV_ITEMS: { label: string; href: string }[] = [
  { label: "Content", href: "#content" },
  { label: "About", href: "#about" },
  { label: "Resume", href: "#resume" },
];

// Keep the full list for desktop (unchanged)
const NAV_ITEMS: { label: string; pose: CharacterPose; href: string }[] = [
  ...MAIN_NAV_ITEMS,
  { label: "Content", pose: "content", href: "#content" },
  { label: "About", pose: "about", href: "#about" },
  { label: "Resume", pose: "resume", href: "#resume" },
];
```

**Step 2: Add mobile state and refs inside the component**

Inside the `NavBar` function body, add after the existing refs:

```typescript
const isMobile = useMediaQuery("(max-width: 767px)");
const [menuOpen, setMenuOpen] = useState(false);
const [menuClosing, setMenuClosing] = useState(false);
const menuBtnRef = useRef<HTMLButtonElement>(null);
const overlayRef = useRef<HTMLDivElement>(null);
```

**Step 3: Add menu open/close handlers**

```typescript
const openMenu = useCallback(() => {
  // Calculate transform-origin from button position
  if (menuBtnRef.current && overlayRef.current) {
    const rect = menuBtnRef.current.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    overlayRef.current.style.transformOrigin = `${originX}px ${originY}px`;
  }
  setMenuOpen(true);
  setMenuClosing(false);
}, []);

const closeMenu = useCallback(() => {
  setMenuClosing(true);
  // Wait for close animation to finish
  const timer = setTimeout(() => {
    setMenuOpen(false);
    setMenuClosing(false);
  }, 250);
  return () => clearTimeout(timer);
}, []);
```

**Step 4: Wrap desktop code in conditional, add mobile return**

The existing `return (...)` block gets wrapped:

```typescript
if (!isMobile) {
  // ── Desktop (existing code, unchanged) ──
  return (
    <nav
      className={`fixed bottom-[100px] left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <div className="navbar-shadow-halo">
        <div ref={glassRef} className="navbar-glass">
          <ul className="navbar-list" onMouseLeave={handleMouseLeave}>
            {NAV_ITEMS.map((item) => (
              <li
                key={item.pose}
                onMouseEnter={(e) => handleMouseEnter(e, item.pose)}
              >
                <a href={item.href} className="navbar-tab">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <span ref={lensRef} className="navbar-lens" />
        </div>
      </div>
    </nav>
  );
}

// ── Mobile ──
return (
  <>
    {/* Menu Overlay */}
    {menuOpen && (
      <div
        ref={overlayRef}
        className={`menu-overlay ${menuClosing ? "closing" : "open"}`}
      >
        <nav className="menu-overlay-items">
          {MENU_NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="menu-overlay-link"
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="menu-overlay-contact">
          <span>Reach me at shkuratovdesigner@gmail.com or </span>
          <a href="#book" className="text-accent">Book a Call</a>
        </div>

        {/* Bottom bar inside overlay */}
        <div className="menu-overlay-bottom-bar">
          <div className="navbar-shadow-halo">
            <div className="navbar-glass mobile-nav-pill">
              {MAIN_NAV_ITEMS.map((item) => (
                <a
                  key={item.pose}
                  href={item.href}
                  className="mobile-nav-tab"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="navbar-shadow-halo">
            <button
              className="navbar-glass mobile-menu-btn"
              onClick={closeMenu}
            >
              <div className="hamburger open">
                <span className="hamburger-line" />
                <span className="hamburger-line" />
                <span className="hamburger-line" />
              </div>
              <span className="hamburger-close-text visible">Close</span>
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Mobile Bottom Nav Bar */}
    {!menuOpen && (
      <div
        className={`mobile-nav transition-all duration-300 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="navbar-shadow-halo">
          <div className="navbar-glass mobile-nav-pill">
            {MAIN_NAV_ITEMS.map((item) => (
              <a
                key={item.pose}
                href={item.href}
                className="mobile-nav-tab"
                onClick={() => onHoverPose(item.pose)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
        <div className="navbar-shadow-halo">
          <button
            ref={menuBtnRef}
            className="navbar-glass mobile-menu-btn"
            onClick={openMenu}
          >
            <div className="hamburger">
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </div>
          </button>
        </div>
      </div>
    )}
  </>
);
```

**Step 5: Verify build compiles**

Run: `npx vite build --mode development 2>&1 | head -10`
Expected: Build succeeds, no TypeScript errors

**Step 6: Commit**

```bash
git add src/components/NavBar/NavBar.tsx
git commit -m "feat: add mobile navigation with menu overlay and hamburger morph"
```

---

### Task 5: Hide desktop ContactLine on mobile

On mobile, the contact info lives inside the menu overlay, so the standalone `ContactLine` should be hidden below 768px.

**Files:**
- Modify: `src/components/Layout/ContactLine.tsx`

**Step 1: Add hidden class for mobile**

In the root `<div>`, add `hidden md:block` to the className so it's hidden below 768px:

```typescript
<div
  className={`hidden md:block fixed bottom-[30px] left-1/2 -translate-x-1/2 z-50 font-['SF_Pro_Display','-apple-system',BlinkMacSystemFont,sans-serif] text-sm sm:text-base lg:text-[18px] leading-[1.2] text-text-secondary tracking-[-0.18px] whitespace-nowrap transition-opacity duration-200 ${
    visible ? "opacity-100" : "opacity-0"
  }`}
>
```

**Step 2: Verify build**

Run: `npx vite build --mode development 2>&1 | head -5`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/components/Layout/ContactLine.tsx
git commit -m "fix: hide ContactLine on mobile (content moves to menu overlay)"
```

---

### Task 6: Adjust Logo positioning for mobile

From the Figma, the mobile logo is at `left: 24px`, `top: 24px`. Currently the desktop uses `left-40` (160px) and `top-8` (32px).

**Files:**
- Modify: `src/components/Hero/Logo.tsx`

**Step 1: Add responsive positioning**

Change the className to use mobile-first values with `md:` overrides:

```typescript
className={`absolute top-[24px] left-[24px] md:top-8 md:left-40 font-['SF_Pro_Display','-apple-system',BlinkMacSystemFont,sans-serif] font-medium text-[14px] md:text-base leading-none text-text-secondary tracking-[-0.28px] md:tracking-[-0.32px] transition-opacity duration-200 ${
  visible ? "opacity-100" : "opacity-0"
}`}
```

**Step 2: Verify build**

Run: `npx vite build --mode development 2>&1 | head -5`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/components/Hero/Logo.tsx
git commit -m "fix: adjust Logo positioning for mobile (24px inset)"
```

---

### Task 7: Adjust HeroText for mobile layout

From the Figma, mobile hero text is 230px wide, centered, positioned below the character with 14px font size.

**Files:**
- Modify: `src/components/Hero/HeroText.tsx`

**Step 1: Update responsive classes**

```typescript
className={`absolute w-[230px] md:w-[247px] left-1/2 -translate-x-1/2 top-[70%] lg:left-[calc(100%-88px)] lg:translate-x-0 lg:top-[-16px] font-['SF_Pro_Text','-apple-system',BlinkMacSystemFont,sans-serif] text-[14px] md:text-lg leading-[1.3] text-text-secondary text-center lg:text-left transition-opacity duration-300 ${
  visible ? "opacity-100" : "opacity-0"
}`}
```

**Step 2: Verify build**

Run: `npx vite build --mode development 2>&1 | head -5`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/components/Hero/HeroText.tsx
git commit -m "fix: adjust HeroText sizing and alignment for mobile"
```

---

### Task 8: Visual verification with dev server

**Step 1: Start the dev server**

Run: `npx vite dev`

**Step 2: Desktop verification checklist**

Open browser at full width (>768px). Verify:
- [ ] Desktop navbar renders exactly as before (6 items, glass pill, lens hover effect)
- [ ] Logo position unchanged at desktop width
- [ ] HeroText position unchanged at desktop width
- [ ] ContactLine visible at bottom
- [ ] Character video plays normally

**Step 3: Mobile verification checklist**

Resize browser to <768px (or use device toolbar, iPhone 14 = 390px). Verify:
- [ ] Bottom nav shows 2 glass pills (3 items + hamburger)
- [ ] Glass effect matches desktop
- [ ] Tapping hamburger opens menu overlay with scale animation from button
- [ ] Menu shows Content, About, Resume centered
- [ ] Contact line visible in overlay
- [ ] Hamburger morphs to X with "Close" text
- [ ] Tapping Close reverses animation and closes
- [ ] Tapping a menu item closes overlay
- [ ] Logo visible at 24px inset
- [ ] HeroText centered below character at 14px
- [ ] ContactLine hidden (only in overlay)

**Step 4: Fix any issues found**

Address visual discrepancies against the Figma designs.

**Step 5: Final commit**

```bash
git add -A
git commit -m "fix: visual polish for mobile navigation"
```

---

## Parallelization Guide

Tasks can be grouped into parallel streams:

| Stream | Tasks | File |
|--------|-------|------|
| **A: CSS** | Task 1, 2, 3 | `src/styles/index.css` |
| **B: NavBar** | Task 4 | `src/components/NavBar/NavBar.tsx` |
| **C: Layout** | Task 5, 6, 7 | `ContactLine.tsx`, `Logo.tsx`, `HeroText.tsx` |

- Stream A and C are fully independent (different files)
- Stream B depends on Stream A (references CSS classes)
- Task 8 depends on all streams completing

Recommended execution:
1. **Phase 1** (parallel): Stream A + Stream C
2. **Phase 2**: Stream B (after Stream A completes)
3. **Phase 3**: Task 8 (visual verification)
