# /clode Falling Avatars Animation

**Date:** 2025-11-09
**Feature:** Secret command that triggers falling avatar animation

## Overview

Add a hidden easter egg command "/clode" that triggers a one-time animation where 20-30 copies of the orange pixel avatar character fall from the top of the screen to the bottom.

## Requirements

- Command should work in any command input field across all pages
- Typing "/clode" and pressing Enter triggers the animation
- 20-30 avatar copies fall simultaneously from random horizontal positions
- Animation is one-time (auto-cleanup after completion)
- Avatars should fall at varying speeds for natural effect
- No impact on page interactivity during animation

## Architecture

### Global Animation System

**FallingAvatars Component**
- Mounted in root layout for global availability
- Fixed positioning with high z-index to appear above all content
- Pointer-events: none to allow click-through
- Listens to animation context for triggers

**Animation Context**
- React Context provides `triggerFallingAvatars()` function
- Simple state management (trigger counter or toggle boolean)
- Provider wraps app in root layout
- Consumed by command input components

### Command Recognition

**Modified Components**
- `CommandInput.tsx` - Update `executeCommand()` to check for "/clode"
- `CommandInputSimple.tsx` - Update `executeCommand()` to check for "/clode"
- When "/clode" detected, call context trigger instead of routing
- Clear input after triggering

## Animation Details

### Falling Behavior

**Generation**
- Create 20-30 avatar instances when triggered
- Random horizontal positions (0 to viewport width)
- Start above viewport (y: -100px)
- End below viewport (y: viewport height + 100px)

**Timing**
- Individual fall durations: 800-1500ms (randomized)
- Slight variation creates natural waterfall effect
- Auto-cleanup after longest animation completes (~1.5s)

**Performance**
- Use Framer Motion for animations (already installed)
- CSS transforms for GPU acceleration
- Simplified avatar (no interactivity, no eye tracking)

### Visual Styling

**Avatar Appearance**
- Reuse Avatar component structure
- Fixed size: 101px × 63.789px
- Orange accent color (from Tailwind config)
- No eye tracking, no blinking, no mouse events
- Just static pixel blocks

**Layout**
- Fixed positioning for each avatar
- Absolute positioning within container
- Semi-transparent overlay allows click-through
- High z-index ensures visibility

## Implementation Plan

### 1. Create Animation Context

**File:** `contexts/AnimationContext.tsx`

```typescript
- Create context with triggerFallingAvatars function
- State: trigger counter or boolean toggle
- Export provider and hook
```

### 2. Create FallingAvatars Component

**File:** `components/FallingAvatars.tsx`

```typescript
- Listen to animation context
- Generate 20-30 avatar data objects when triggered
- Random x positions (0 to 100vw)
- Random durations (800-1500ms)
- Render simplified avatars with Framer Motion
- Auto-cleanup on animation complete
```

### 3. Create Simplified Avatar

**File:** `components/AvatarStatic.tsx`

```typescript
- Copy Avatar structure but remove:
  - Eye tracking
  - Mouse event listeners
  - Blinking animation
  - Waving animation
- Keep only static orange pixel blocks
```

### 4. Update Root Layout

**File:** `app/layout.tsx`

```typescript
- Wrap children with AnimationProvider
- Add FallingAvatars component at root level
```

### 5. Update Command Inputs

**Files:**
- `components/CommandInput.tsx`
- `components/CommandInputSimple.tsx`

```typescript
- In executeCommand():
  - Check if command === "/clode"
  - If true, call triggerFallingAvatars() from context
  - Clear input and return early
  - Otherwise, proceed with normal routing
```

## Technical Considerations

### Performance
- Use Framer Motion's `initial`, `animate`, `exit` for smooth animations
- Simplified static avatars (no event listeners) for better performance
- Auto-cleanup prevents memory leaks

### Accessibility
- Animation is decorative and doesn't affect functionality
- Pointer-events: none ensures no interaction blocking
- No accessibility concerns (purely visual easter egg)

### Browser Compatibility
- CSS transforms are widely supported
- Framer Motion handles browser differences
- Fixed positioning works in all modern browsers

## Success Criteria

- [ ] Typing "/clode" in any command input triggers animation
- [ ] 20-30 avatars fall from random positions
- [ ] Avatars fall at varying speeds (800-1500ms)
- [ ] Animation auto-cleans up after completion
- [ ] No impact on page interactivity
- [ ] Works on all pages with command inputs
- [ ] No console errors or memory leaks
