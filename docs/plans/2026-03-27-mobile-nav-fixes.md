# Mobile Navigation Fixes — Match Figma Design

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix 7 visual/layout bugs in mobile navigation so it matches the Figma design exactly.

**Architecture:** Pure CSS + minor JSX restructuring. No new components or dependencies.

**Tech Stack:** Vite, React, vanilla CSS (`src/styles/index.css`), Tailwind utility classes

**Figma references:**
- Closed state: `4184:13409` — bottom bar full-width, character + text layout
- Open state: `4184:13468` — menu overlay with logo, centered links, contact text

---

## Issues Summary

| # | Issue | Files |
|---|-------|-------|
| 1 | Bottom nav doesn't span full screen width | `index.css`, `NavBar.tsx` |
| 2 | Closed-state pill has wrong spacing/font size | `index.css` |
| 3 | HeroText overlaps the character image | `HeroText.tsx` |
| 4 | Glass effect differs between pill and hamburger button | `index.css` |
| 5 | Logo missing in open menu state | `NavBar.tsx` |
| 6 | "Book a Call" should be on its own line | `NavBar.tsx` |
| 7 | Menu links not vertically centered; open-state layout off | `index.css`, `NavBar.tsx` |

---

### Task 1: Bottom nav full-width (closed state)

**Problem:** `.mobile-nav` has `left: 24px` but no `right`, so the bar hugs the left side instead of spanning edge-to-edge with equal 24px padding.

**Figma spec:** Container is `w-[312px]` on a 360px screen → 24px left, 24px right. Pill flexes to fill remaining space after the hamburger.

**Files:**
- Modify: `src/styles/index.css:96-104`

**Step 1: Make `.mobile-nav` span full width**

Change `.mobile-nav` from:
```css
.mobile-nav {
  position: fixed;
  bottom: 24px;
  left: 24px;
  display: flex;
  align-items: center;
  gap: 7px;
  z-index: 50;
}
```
To:
```css
.mobile-nav {
  position: fixed;
  bottom: 24px;
  left: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 7px;
  z-index: 50;
}
```

**Step 2: Make pill grow to fill available space**

Add `flex: 1 1 0;` to `.mobile-nav-pill`:
```css
.mobile-nav-pill {
  display: flex;
  align-items: center;
  gap: 16px;
  height: 44px;
  padding: 12px 16px;
  flex: 1 1 0;
}
```

And add `flex: 1 1 0;` to the first `.navbar-shadow-halo` wrapper. Since we can't target it by class alone (both pill and button use it), wrap the pill's halo in a new modifier. In `NavBar.tsx`, add class `flex-1` to the pill's wrapping `<div className="navbar-shadow-halo">`:

In `NavBar.tsx` line 189, change:
```tsx
<div className="navbar-shadow-halo">
```
to:
```tsx
<div className="navbar-shadow-halo flex-1">
```

**Step 3: Apply the same fix to the overlay bottom bar**

Change `.menu-overlay-bottom-bar` from:
```css
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
To:
```css
.menu-overlay-bottom-bar {
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 7px;
  z-index: 56;
}
```

And in `NavBar.tsx` line 151, add `flex-1` to the overlay pill's halo wrapper too:
```tsx
<div className="navbar-shadow-halo flex-1">
```

**Step 4: Verify visually** — open http://localhost:5173 on mobile viewport (360px). Bottom bar should stretch edge-to-edge with 24px margins. Pill fills remaining space after hamburger button.

**Step 5: Commit**
```bash
git add src/styles/index.css src/components/NavBar/NavBar.tsx
git commit -m "fix(mobile): bottom nav spans full screen width with equal padding"
```

---

### Task 2: Closed-state pill sizing (font + spacing)

**Problem:** Current pill uses open-state values for both states. Figma closed state has larger text and wider gaps.

**Figma spec (closed):** `gap-[24px]`, `px-[20px]`, `text-[16px]`
**Figma spec (open):** `gap-[16px]`, `px-[16px]`, `text-[14px]`

**Files:**
- Modify: `src/styles/index.css:106-127`

**Step 1: Update `.mobile-nav-pill` to match closed-state Figma**

```css
.mobile-nav-pill {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 44px;
  padding: 12px 20px;
  flex: 1 1 0;
}
```

**Step 2: Update `.mobile-nav-tab` font size to 16px**

```css
.mobile-nav-tab {
  white-space: nowrap;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.65);
  font-family: "Times Now", serif;
  font-size: 16px;
  line-height: 1.2;
  cursor: pointer;
  transition: opacity 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}
```

**Step 3: Add a modifier class for the open-state pill (smaller sizing)**

Add after `.mobile-nav-tab:active`:
```css
.mobile-nav-pill.menu-open {
  gap: 16px;
  padding: 12px 16px;
}
.menu-open .mobile-nav-tab {
  font-size: 14px;
}
```

**Step 4: Apply `.menu-open` class in the overlay's pill**

In `NavBar.tsx` line 152, change:
```tsx
<div className="navbar-glass mobile-nav-pill">
```
to:
```tsx
<div className="navbar-glass mobile-nav-pill menu-open">
```

**Step 5: Verify** — closed pill should have larger text (16px) and wider spacing (24px gap, 20px horizontal padding). Open overlay pill should be smaller (14px, 16px gap).

**Step 6: Commit**
```bash
git add src/styles/index.css src/components/NavBar/NavBar.tsx
git commit -m "fix(mobile): match Figma pill sizing for closed and open states"
```

---

### Task 3: Fix HeroText overlapping the character image

**Problem:** `HeroText` uses `top-[70%]` inside a 300px container, placing it at 210px — inside the character. Figma places the text below the character with ~20px gap.

**Figma spec:** Character is 280px, text starts at `top: 420px` on a 692px screen → ~20px below character bottom.

**Files:**
- Modify: `src/components/Hero/HeroText.tsx:7-10`

**Step 1: Change mobile top positioning to sit below the character**

In `HeroText.tsx`, change the mobile `top` from `top-[70%]` to `top-[calc(100%+20px)]`:

```tsx
<div
  className={`absolute w-[230px] md:w-[247px] left-1/2 -translate-x-1/2 top-[calc(100%+20px)] lg:left-[calc(100%-88px)] lg:translate-x-0 lg:top-[-16px] font-['SF_Pro_Text','-apple-system',BlinkMacSystemFont,sans-serif] text-[14px] md:text-lg leading-[1.3] text-text-secondary text-center lg:text-left transition-opacity duration-300 ${
    visible ? "opacity-100" : "opacity-0"
  }`}
>
```

Key change: `top-[70%]` → `top-[calc(100%+20px)]` — this positions it exactly 20px below the bottom edge of the character container.

**Step 2: Verify** — on mobile viewport, the "Hey! I'm Evgeny..." text should appear below the character image with a small gap, not overlapping it.

**Step 3: Commit**
```bash
git add src/components/Hero/HeroText.tsx
git commit -m "fix(mobile): position hero text below character instead of overlapping"
```

---

### Task 4: Unify glass effect between pill and hamburger button

**Problem:** `.mobile-menu-btn` has `background: none` which strips the gradient background that `.navbar-glass` provides, making the hamburger button look different from the pill.

**Figma spec:** Both pill and hamburger use the same `bg-[rgba(255,255,255,0.1)]` background with rounded pill shape.

**Files:**
- Modify: `src/styles/index.css:129-138`

**Step 1: Remove `background: none` from `.mobile-menu-btn`**

Change from:
```css
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
To:
```css
.mobile-menu-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  border: none;
  -webkit-tap-highlight-color: transparent;
}
```

Since both elements already get `.navbar-glass`, removing `background: none` lets the glass gradient show through on the button too.

**Step 2: Verify** — both the pill and hamburger button should have the same glass gradient background, border, and shadow.

**Step 3: Commit**
```bash
git add src/styles/index.css
git commit -m "fix(mobile): unify glass effect on nav pill and hamburger button"
```

---

### Task 5: Show logo in open menu state

**Problem:** The menu overlay (`position: fixed; inset: 0; z-index: 55`) covers the logo. Figma shows "Shkuratov / Designer" visible in the top-left of the open menu.

**Files:**
- Modify: `src/components/NavBar/NavBar.tsx:126-180`

**Step 1: Add logo inside the menu overlay**

After the overlay opening `<div>` tag (line 130), add the logo text:

```tsx
{menuOpen && (
  <div
    ref={overlayRef}
    className={`menu-overlay ${menuClosing ? "closing" : "open"}`}
  >
    {/* Logo in overlay */}
    <div className="absolute top-[24px] left-[24px] font-['SF_Pro_Display','-apple-system',BlinkMacSystemFont,sans-serif] font-medium text-[14px] leading-none text-text-secondary tracking-[-0.28px]">
      <p>Shkuratov</p>
      <p>Designer</p>
    </div>

    <nav className="menu-overlay-items">
      {/* ... existing links ... */}
    </nav>
    {/* ... rest unchanged ... */}
  </div>
)}
```

**Step 2: Verify** — open the menu; "Shkuratov / Designer" should appear at top-left, matching the closed-state logo position.

**Step 3: Commit**
```bash
git add src/components/NavBar/NavBar.tsx
git commit -m "fix(mobile): show logo in open menu overlay"
```

---

### Task 6: "Book a Call" on its own line

**Problem:** The user wants "Book a Call" on a separate line from the email text. Figma shows this wrapping naturally within a 311px container, but to guarantee it we should use an explicit line break.

**Files:**
- Modify: `src/components/NavBar/NavBar.tsx:144-147`

**Step 1: Add line break before "Book a Call"**

Change:
```tsx
<div className="menu-overlay-contact">
  <span>Reach me at shkuratovdesigner@gmail.com or </span>
  <a href="#book" className="text-accent">Book a Call</a>
</div>
```
To:
```tsx
<div className="menu-overlay-contact">
  <span>Reach me at shkuratovdesigner@gmail.com or</span>
  <br />
  <a href="#book" className="text-accent">Book a Call</a>
</div>
```

**Step 2: Verify** — in open menu, "Book a Call" should be on its own line below the email text, colored in accent (#d77757).

**Step 3: Commit**
```bash
git add src/components/NavBar/NavBar.tsx
git commit -m "fix(mobile): put Book a Call on separate line in menu overlay"
```

---

### Task 7: Center menu links vertically with equal spacing

**Problem:** Menu links should be vertically centered between the logo (top) and the "Reach me at" text (bottom), with equal space above and below the link group. Currently the overlay uses `justify-content: center` which centers in the full viewport, but doesn't account for logo/contact as boundaries.

**Figma spec:** Links at `top: 192px`, contact at `top: 550px`, logo at `top: 24px`. On 692px screen:
- Logo bottom ≈ 52px
- Contact top ≈ 550px
- Available space: 550 - 52 = 498px
- Links block center: 192 + (3 links × ~29px + 2 gaps × 56px) / 2 ≈ 192 + 99 ≈ 291px
- Midpoint of available space: 52 + 249 = 301px — close to 291px → approximately centered

**Files:**
- Modify: `src/styles/index.css:189-213, 245-263`

**Step 1: Restructure overlay layout for proper centering**

Change `.menu-overlay` to use padding that accounts for logo area at top and contact + bottom bar at bottom:

```css
.menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 55;
  background: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  padding-bottom: 180px;
  opacity: 0;
  transform: scale(0);
  pointer-events: none;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
```

The `padding-top: 80px` clears the logo area. The `padding-bottom: 180px` clears the contact text + bottom bar area. `justify-content: center` then centers the links in the remaining space — achieving equal spacing above and below.

**Step 2: Adjust contact text position**

Change `.menu-overlay-contact` bottom from `120px` to `88px` to sit right above the bottom bar (bar is at 24px bottom + 44px height = 68px, plus 20px gap = 88px):

```css
.menu-overlay-contact {
  position: absolute;
  bottom: 88px;
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
```

**Step 3: Verify** — open the menu. The three links (Content, About, Resume) should be vertically centered between the logo and the contact/bottom-bar area. Visually the space above the links and below the links should feel balanced.

**Step 4: Commit**
```bash
git add src/styles/index.css
git commit -m "fix(mobile): center menu links with equal spacing above and below"
```

---

## Final Verification Checklist

After all tasks, verify on a 360px mobile viewport:

- [ ] Bottom nav bar spans full width (24px margins on both sides)
- [ ] Closed pill has 16px text, 24px gap, 20px horizontal padding
- [ ] Hero text sits below the character image with no overlap
- [ ] Glass effect identical on pill and hamburger button
- [ ] Logo visible in open menu state
- [ ] "Book a Call" appears on its own line
- [ ] Menu links vertically centered between logo and contact text
- [ ] Open-state pill has 14px text, 16px gap, 16px horizontal padding
- [ ] All animations (open/close) still work smoothly

**Final commit:**
```bash
git add -A
git commit -m "feat(mobile): mobile nav matches Figma design — all 7 fixes applied"
```
