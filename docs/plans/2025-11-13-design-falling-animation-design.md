# /design Falling Animation

**Date:** 2025-11-13
**Feature:** Hidden command that triggers falling animation with rainbow avatars and design tool logos

## Overview

Add a hidden easter egg command "/design" that triggers a one-time animation where 20-30 objects (mix of rainbow gradient avatars and design tool logos) fall from the top of the screen to the bottom. This creates a vibrant "creative toolbox" effect representing the designer's workflow.

## Requirements

- Command should work in any command input field across all pages
- Typing "/design" and pressing Enter triggers the animation
- 20-30 total objects falling simultaneously:
  - 10-15 rainbow gradient avatars
  - 10-15 design tool logos (Figma, After Effects, Claude, ChatGPT, Midjourney)
- Animation is one-time (auto-cleanup after completion)
- Objects fall at varying speeds for natural effect
- No impact on page interactivity during animation
- Reuse existing `/claude` animation architecture

## Architecture

### Extend Existing Animation System

**Animation Context Extension**
- Add new trigger function to existing `AnimationContext.tsx`
- Options:
  - Option 1: New function `triggerDesignAnimation()`
  - Option 2: Extend existing `triggerFallingAvatars(type: 'claude' | 'design')`
- Context provider already wraps app in root layout

**FallingAvatars Component Enhancement**
- Extend existing `FallingAvatars.tsx` to handle different animation types
- When triggered with 'design' type, generate mixed array of objects
- Map over array and render appropriate component type
- Keep existing fixed positioning and z-index setup

### New Components

**AvatarRainbow Component**
- Copy structure from existing `AvatarStatic.tsx`
- Apply rainbow gradient to entire avatar
- Gradient: `linear-gradient(90deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #8B00FF)`
- Uniform gradient direction (horizontal, left to right)
- Keep static behavior (no interactions, no eye tracking)

**ToolLogo Component**
- Display brand logos as images (SVG or PNG)
- Fixed size to match avatar dimensions (~100px width)
- Maintain aspect ratio with `object-fit: contain`
- Accept `logoName` prop to determine which logo to display

### Command Recognition

**Modified Components**
- `CommandInput.tsx` - Update `executeCommand()` to check for "/design"
- `CommandInputSimple.tsx` - Update `executeCommand()` to check for "/design"
- When "/design" detected, trigger design animation instead of routing
- Clear input after triggering

## Animation Details

### Object Mix & Distribution

**Rainbow Gradient Avatars (50%)**
- 10-15 avatars with full rainbow gradient
- Same pixel structure as existing avatar
- Gradient flows horizontally across entire avatar (red → purple)
- All gradients use same uniform angle for cohesion

**Design Tool Logos (50%)**
- 10-15 logos distributed across 5 tools:
  - Figma (2-3 instances)
  - After Effects (2-3 instances)
  - Claude (2-3 instances)
  - ChatGPT (2-3 instances)
  - Midjourney (2-3 instances)
- Use actual brand logos (mixed aesthetic with pixel avatars)
- Store logo files in `/public/logos/` directory

### Falling Behavior

**Generation**
- Create 20-30 object instances when triggered
- Random mix of rainbow avatars and tool logos
- Random horizontal positions (0 to viewport width)
- Start above viewport (y: -100px)
- End below viewport (y: viewport height + 100px)

**Timing**
- Individual fall durations: 800-1500ms (randomized)
- Straight down movement (no rotation or swaying)
- Auto-cleanup after longest animation completes (~1.5s)

**Performance**
- Use Framer Motion for animations (already installed)
- CSS transforms for GPU acceleration
- SVG logos keep file sizes small
- Same optimization approach as `/claude` animation

## Implementation Plan

### 1. Gather Logo Assets

**Directory:** `/public/logos/`

Collect and add logo files:
- `figma.svg` or `figma.png`
- `after-effects.svg` or `after-effects.png`
- `claude.svg` or `claude.png`
- `chatgpt.svg` or `chatgpt.png`
- `midjourney.svg` or `midjourney.png`

### 2. Create AvatarRainbow Component

**File:** `components/AvatarRainbow.tsx`

```typescript
- Copy structure from AvatarStatic.tsx
- Replace orange accent color with rainbow gradient
- Apply linear-gradient(90deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #8B00FF)
- Keep same static pixel block structure
- No interactions or animations
```

### 3. Create ToolLogo Component

**File:** `components/ToolLogo.tsx`

```typescript
- Accept logoName prop ('figma' | 'after-effects' | 'claude' | 'chatgpt' | 'midjourney')
- Render image from /public/logos/
- Fixed size ~100px width
- object-fit: contain
- Maintain aspect ratio
```

### 4. Extend Animation Context

**File:** `contexts/AnimationContext.tsx`

```typescript
- Add triggerDesignAnimation() function
- Or extend triggerFallingAvatars(type?: 'claude' | 'design')
- Update state to handle design animation trigger
```

### 5. Extend FallingAvatars Component

**File:** `components/FallingAvatars.tsx`

```typescript
- Listen for design animation trigger
- Generate 20-30 mixed object data:
  - 10-15 rainbow avatars
  - 10-15 tool logos (2-3 of each type)
- Random x positions (0 to 100vw)
- Random durations (800-1500ms)
- Map over objects and render AvatarRainbow or ToolLogo
- Use same Framer Motion setup as existing animation
```

### 6. Update Command Inputs

**Files:**
- `components/CommandInput.tsx`
- `components/CommandInputSimple.tsx`

```typescript
- In executeCommand():
  - Check if command === "/design"
  - If true, call triggerDesignAnimation() from context
  - Clear input and return early
  - Otherwise, proceed with normal routing
```

## Technical Considerations

### Performance
- Same object count as `/claude` animation (20-30)
- SVG logos are lightweight
- GPU-accelerated transforms via Framer Motion
- Auto-cleanup prevents memory leaks
- No additional performance concerns

### Visual Consistency
- Mixed aesthetic (realistic logos + pixel avatars) is intentional
- Rainbow gradient on avatars adds vibrancy
- Tool logos represent professional workflow
- Together creates "creative designer's toolbox" vibe

### Logo Licensing
- Ensure proper usage rights for brand logos
- Most tech companies allow logo usage in portfolios
- Consider fair use for portfolio/personal project context

### Browser Compatibility
- CSS gradients widely supported
- Framer Motion handles browser differences
- Image loading fallbacks if needed
- Same compatibility as existing `/claude` animation

## Success Criteria

- [ ] Typing "/design" in any command input triggers animation
- [ ] 20-30 objects fall (10-15 rainbow avatars + 10-15 tool logos)
- [ ] Rainbow avatars have uniform horizontal gradient
- [ ] Tool logos display correctly (5 different tools, 2-3 of each)
- [ ] Objects fall at varying speeds (800-1500ms)
- [ ] Animation auto-cleans up after completion
- [ ] No impact on page interactivity
- [ ] Works on all pages with command inputs
- [ ] No console errors or memory leaks
- [ ] Logo files are properly sized and loaded

## Visual Reference

**Rainbow Gradient:**
```
Red → Orange → Yellow → Green → Blue → Purple
#FF0000 → #FF7F00 → #FFFF00 → #00FF00 → #0000FF → #8B00FF
```

**Tool Logos:**
- Figma: Colorful dots logo
- After Effects: Adobe AE logo
- Claude: Anthropic's Claude logo
- ChatGPT: OpenAI logo
- Midjourney: MJ logo
