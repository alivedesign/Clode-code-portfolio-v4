# Menu Overlay — Mail Button & Toast Notification

**Date:** 2026-03-29

## Summary

Add a mail copy button to the mobile menu overlay (top-right), simplify the contact section, and show a glass-pill toast when the email is copied.

## Changes

### 1. Mail Button (top-right of overlay)
- Position: `absolute top-[20px] right-[24px]`
- Style: `bg-[rgba(255,255,255,0.1)] rounded-full p-[8px]`
- Contains: `Mail.svg` (28x28, fill #999899) from `public/Mail.svg`
- Fade in with overlay open transition
- On tap: copy email to clipboard, open mailto: link, show toast

### 2. Contact Section — Simplified
- Remove: "Reach me at shkuratovdesigner@gmail.com or" + line break
- Keep only: "Book a Call" in accent color, centered
- Same absolute positioning (bottom: 100px, centered)

### 3. Toast Notification
- Glass pill: bg rgba(255,255,255,0.1), backdrop-blur 16px, rounded-full, px-4 py-2
- Text: "shkuratovdesigner@gmail.com copied" in SF Pro 14px white
- Position: fixed top-[72px] centered horizontally, z-index 57
- Animation: fade-in + slide-down, hold 2s, fade-out
- State: copiedToast boolean in NavBar, auto-resets via setTimeout

### 4. Files
- `public/Mail.svg` — icon asset
- `src/components/NavBar/NavBar.tsx` — mail button, toast state, simplified contact
- `src/styles/index.css` — toast animation keyframes
