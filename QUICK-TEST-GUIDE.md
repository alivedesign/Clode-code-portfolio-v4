# Quick Testing Guide - /design Animation

## Server Info
- **URL:** http://localhost:3001
- **Status:** Running (started at 2025-11-13)

## Quick Test Steps

### 1. Test /design Command
```
1. Open http://localhost:3001
2. Type: /design
3. Press: Enter
```
**Look for:** Rainbow avatars + tool logos falling

### 2. Test /claude Command (Regression)
```
1. Type: /claude
2. Press: Enter
```
**Look for:** Orange Claude avatars falling

### 3. Test on Other Pages
- http://localhost:3001/main
- http://localhost:3001/works
- http://localhost:3001/info-contact

### 4. Check Console (F12)
**Expected logs when typing /design:**
```
[CommandInputSimple] /design command detected, triggering design animation
[FallingAvatars] Generating design animation objects...
```

## Visual Checklist
- [ ] Rainbow avatars show gradient colors
- [ ] Tool logos are visible (Figma, After Effects, Claude, ChatGPT, Midjourney)
- [ ] 20-30 objects fall
- [ ] Mix is roughly 50/50 avatars vs logos
- [ ] Objects fall smoothly (0.8-1.5 seconds)
- [ ] Clean disappearance (no lingering elements)

## Common Issues to Check
- [ ] No console errors
- [ ] No 404 errors for logo files
- [ ] Animation cleanup completes
- [ ] Command input still works after animation

## File Locations
- Logos: `/Users/shkuratovdesigner/Cursor Projects/Portfolio v4/.worktrees/design-animation/public/logos/`
- Components: `/Users/shkuratovdesigner/Cursor Projects/Portfolio v4/.worktrees/design-animation/components/`

## Full Report
See `TESTING-REPORT-TASK-8.md` for comprehensive details.
