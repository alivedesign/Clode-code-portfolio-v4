# /design Falling Animation Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement hidden `/design` command that triggers falling animation with rainbow gradient avatars and design tool logos (Figma, After Effects, Claude, ChatGPT, Midjourney).

**Architecture:** Extend existing `/claude` animation system by adding new object types (rainbow avatars and tool logos) to the FallingAvatars component. The AnimationContext will support a new animation type, and command inputs will recognize the `/design` command.

**Tech Stack:** React, TypeScript, Framer Motion, Next.js

---

## Task 1: Gather Logo Assets

**Files:**
- Create: `public/logos/figma.svg`
- Create: `public/logos/after-effects.svg`
- Create: `public/logos/claude.svg`
- Create: `public/logos/chatgpt.svg`
- Create: `public/logos/midjourney.svg`

**Step 1: Create logos directory**

```bash
mkdir -p public/logos
```

**Step 2: Add Figma logo**

Create `public/logos/figma.svg` with official Figma logo SVG. For development, use a placeholder:

```svg
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="25" cy="50" r="12" fill="#F24E1E"/>
  <circle cx="50" cy="25" r="12" fill="#FF7262"/>
  <circle cx="50" cy="50" r="12" fill="#A259FF"/>
  <circle cx="75" cy="50" r="12" fill="#1ABCFE"/>
  <circle cx="50" cy="75" r="12" fill="#0ACF83"/>
</svg>
```

**Step 3: Add After Effects logo**

Create `public/logos/after-effects.svg`:

```svg
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="20" fill="#00005B"/>
  <text x="50" y="65" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#9999FF" text-anchor="middle">Ae</text>
</svg>
```

**Step 4: Add Claude logo**

Create `public/logos/claude.svg`:

```svg
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="20" fill="#CC9B7A"/>
  <circle cx="50" cy="35" r="8" fill="#FFFFFF"/>
  <circle cx="35" cy="55" r="8" fill="#FFFFFF"/>
  <circle cx="65" cy="55" r="8" fill="#FFFFFF"/>
  <circle cx="50" cy="75" r="8" fill="#FFFFFF"/>
</svg>
```

**Step 5: Add ChatGPT logo**

Create `public/logos/chatgpt.svg`:

```svg
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="none" stroke="#10A37F" stroke-width="8"/>
  <circle cx="50" cy="50" r="25" fill="none" stroke="#10A37F" stroke-width="6"/>
  <circle cx="50" cy="30" r="5" fill="#10A37F"/>
  <circle cx="50" cy="70" r="5" fill="#10A37F"/>
</svg>
```

**Step 6: Add Midjourney logo**

Create `public/logos/midjourney.svg`:

```svg
<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="100" height="100" rx="20" fill="#000000"/>
  <path d="M 30 70 L 50 30 L 70 70 L 50 50 Z" fill="#FFFFFF"/>
</svg>
```

**Step 7: Verify files exist**

```bash
ls -la public/logos/
```

Expected: 5 SVG files listed

**Step 8: Commit logo assets**

```bash
git add public/logos/
git commit -m "feat: add design tool logos for /design animation"
```

---

## Task 2: Create AvatarRainbow Component

**Files:**
- Create: `components/AvatarRainbow.tsx`

**Step 1: Create component file with rainbow gradient**

Create `components/AvatarRainbow.tsx`:

```typescript
// Rainbow gradient version of Avatar for /design animation
export function AvatarRainbow() {
  // Avatar dimensions (same as AvatarStatic)
  const AVATAR_WIDTH = 101
  const AVATAR_HEIGHT = 63.789
  const BODY_HEIGHT = 49.614
  const BODY_LEFT = 7.09
  const BODY_WIDTH = 86.825

  // Eye dimensions and positions
  const EYE_WIDTH = 7.088
  const EYE_HEIGHT = 10.632
  const RIGHT_EYE_LEFT = 69.11
  const LEFT_EYE_LEFT = 24.81
  const EYE_TOP = 14.18

  // Pixel block positions
  const PIXEL_HEIGHT = 10.632
  const PIXEL_WIDTH = 7.088
  const ARM_TOP = 14.18
  const LEFT_ARM_LEFT = 0
  const RIGHT_ARM_LEFT = 93.91
  const BOTTOM_PIXELS_TOP = 53.16
  const BOTTOM_PIXELS = [
    { left: 74.42 },
    { left: 19.49 },
    { left: 31.89 },
    { left: 62.02 },
  ]

  // Rainbow gradient style
  const rainbowGradient = 'linear-gradient(90deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #8B00FF)'

  return (
    <div
      className="relative"
      style={{
        width: `${AVATAR_WIDTH}px`,
        height: `${AVATAR_HEIGHT}px`
      }}
    >
      {/* Main body with rainbow gradient */}
      <div
        className="absolute top-0"
        style={{
          height: `${BODY_HEIGHT}px`,
          left: `${BODY_LEFT}px`,
          width: `${BODY_WIDTH}px`,
          background: rainbowGradient
        }}
      />

      {/* Eyes - static, no tracking */}
      <div
        className="absolute bg-dark-text"
        style={{
          height: `${EYE_HEIGHT}px`,
          width: `${EYE_WIDTH}px`,
          left: `${RIGHT_EYE_LEFT}px`,
          top: `${EYE_TOP}px`
        }}
      />
      <div
        className="absolute bg-dark-text"
        style={{
          height: `${EYE_HEIGHT}px`,
          width: `${EYE_WIDTH}px`,
          left: `${LEFT_EYE_LEFT}px`,
          top: `${EYE_TOP}px`
        }}
      />

      {/* Right arm with rainbow gradient */}
      <div
        className="absolute"
        style={{
          height: `${PIXEL_HEIGHT}px`,
          width: `${PIXEL_WIDTH}px`,
          left: `${RIGHT_ARM_LEFT}px`,
          top: `${ARM_TOP}px`,
          background: rainbowGradient
        }}
      />

      {/* Left arm with rainbow gradient */}
      <div
        className="absolute"
        style={{
          height: `${PIXEL_HEIGHT}px`,
          width: `${PIXEL_WIDTH}px`,
          left: `${LEFT_ARM_LEFT}px`,
          top: `${ARM_TOP}px`,
          background: rainbowGradient
        }}
      />

      {/* Bottom pixels with rainbow gradient */}
      {BOTTOM_PIXELS.map((pixel, index) => (
        <div
          key={`bottom-pixel-${index}`}
          className="absolute"
          style={{
            height: `${PIXEL_HEIGHT}px`,
            width: `${PIXEL_WIDTH}px`,
            left: `${pixel.left}px`,
            top: `${BOTTOM_PIXELS_TOP}px`,
            background: rainbowGradient
          }}
        />
      ))}
    </div>
  )
}
```

**Step 2: Verify component compiles**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript errors

**Step 3: Commit rainbow avatar component**

```bash
git add components/AvatarRainbow.tsx
git commit -m "feat: add AvatarRainbow component with gradient"
```

---

## Task 3: Create ToolLogo Component

**Files:**
- Create: `components/ToolLogo.tsx`

**Step 1: Create ToolLogo component**

Create `components/ToolLogo.tsx`:

```typescript
import Image from 'next/image'

export type ToolName = 'figma' | 'after-effects' | 'claude' | 'chatgpt' | 'midjourney'

interface ToolLogoProps {
  tool: ToolName
}

export function ToolLogo({ tool }: ToolLogoProps) {
  const logoPath = `/logos/${tool}.svg`
  const size = 100 // Match avatar width

  return (
    <div
      className="relative"
      style={{
        width: `${size}px`,
        height: `${size}px`
      }}
    >
      <Image
        src={logoPath}
        alt={`${tool} logo`}
        width={size}
        height={size}
        style={{
          objectFit: 'contain'
        }}
      />
    </div>
  )
}
```

**Step 2: Verify component compiles**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript errors

**Step 3: Commit tool logo component**

```bash
git add components/ToolLogo.tsx
git commit -m "feat: add ToolLogo component for design tools"
```

---

## Task 4: Extend Animation Context

**Files:**
- Modify: `contexts/AnimationContext.tsx`

**Step 1: Add design animation type and trigger**

Update `contexts/AnimationContext.tsx`:

```typescript
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type AnimationType = 'claude' | 'design'

interface AnimationContextType {
  triggerFallingAvatars: () => void
  fallingAvatarsTrigger: number
  triggerDesignAnimation: () => void
  designAnimationTrigger: number
  currentAnimationType: AnimationType | null
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined)

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [fallingAvatarsTrigger, setFallingAvatarsTrigger] = useState(0)
  const [designAnimationTrigger, setDesignAnimationTrigger] = useState(0)
  const [currentAnimationType, setCurrentAnimationType] = useState<AnimationType | null>(null)

  const triggerFallingAvatars = () => {
    console.log('[AnimationContext] Triggering falling avatars (claude)')
    setCurrentAnimationType('claude')
    setFallingAvatarsTrigger(prev => prev + 1)
  }

  const triggerDesignAnimation = () => {
    console.log('[AnimationContext] Triggering design animation')
    setCurrentAnimationType('design')
    setDesignAnimationTrigger(prev => prev + 1)
  }

  return (
    <AnimationContext.Provider value={{
      triggerFallingAvatars,
      fallingAvatarsTrigger,
      triggerDesignAnimation,
      designAnimationTrigger,
      currentAnimationType
    }}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (context === undefined) {
    throw new Error('useAnimation must be used within AnimationProvider')
  }
  return context
}
```

**Step 2: Verify context compiles**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript errors

**Step 3: Commit animation context changes**

```bash
git add contexts/AnimationContext.tsx
git commit -m "feat: extend AnimationContext for design animation"
```

---

## Task 5: Extend FallingAvatars Component

**Files:**
- Modify: `components/FallingAvatars.tsx`

**Step 1: Import new components and types**

Update imports at top of `components/FallingAvatars.tsx`:

```typescript
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAnimation } from '@/contexts/AnimationContext'
import { AvatarStatic } from './AvatarStatic'
import { AvatarRainbow } from './AvatarRainbow'
import { ToolLogo, ToolName } from './ToolLogo'
```

**Step 2: Update falling object interface**

Replace the `FallingAvatar` interface with:

```typescript
type FallingObjectType = 'avatar' | 'rainbow-avatar' | 'tool-logo'

interface FallingObject {
  id: string
  type: FallingObjectType
  x: number // horizontal position in vw
  duration: number // fall duration in seconds
  toolName?: ToolName // only for tool-logo type
}
```

**Step 3: Update component to handle both animation types**

Replace the component implementation:

```typescript
export function FallingAvatars() {
  const { fallingAvatarsTrigger, designAnimationTrigger, currentAnimationType } = useAnimation()
  const [objects, setObjects] = useState<FallingObject[]>([])

  // Handle /claude animation
  useEffect(() => {
    if (fallingAvatarsTrigger === 0) return

    console.log('[FallingAvatars] Generating claude avatars...')
    const count = Math.floor(Math.random() * 11) + 20 // 20-30
    const newObjects: FallingObject[] = []

    for (let i = 0; i < count; i++) {
      newObjects.push({
        id: `claude-${fallingAvatarsTrigger}-${Date.now()}-${i}`,
        type: 'avatar',
        x: Math.random() * 100, // 0-100vw
        duration: Math.random() * 1.4 + 1.6 // 1.6-3.0s
      })
    }

    setObjects(newObjects)

    const timeoutId = setTimeout(() => {
      setObjects([])
    }, 3100)

    return () => clearTimeout(timeoutId)
  }, [fallingAvatarsTrigger])

  // Handle /design animation
  useEffect(() => {
    if (designAnimationTrigger === 0) return

    console.log('[FallingAvatars] Generating design animation objects...')
    const count = Math.floor(Math.random() * 11) + 20 // 20-30
    const newObjects: FallingObject[] = []
    const tools: ToolName[] = ['figma', 'after-effects', 'claude', 'chatgpt', 'midjourney']

    for (let i = 0; i < count; i++) {
      // 50% chance for rainbow avatar, 50% for tool logo
      const isRainbowAvatar = Math.random() < 0.5

      if (isRainbowAvatar) {
        newObjects.push({
          id: `design-rainbow-${designAnimationTrigger}-${Date.now()}-${i}`,
          type: 'rainbow-avatar',
          x: Math.random() * 100,
          duration: Math.random() * 0.7 + 0.8 // 0.8-1.5s
        })
      } else {
        // Pick random tool
        const randomTool = tools[Math.floor(Math.random() * tools.length)]
        newObjects.push({
          id: `design-logo-${designAnimationTrigger}-${Date.now()}-${i}`,
          type: 'tool-logo',
          x: Math.random() * 100,
          duration: Math.random() * 0.7 + 0.8, // 0.8-1.5s
          toolName: randomTool
        })
      }
    }

    setObjects(newObjects)

    const timeoutId = setTimeout(() => {
      setObjects([])
    }, 1600) // 1.5s max duration + 100ms buffer

    return () => clearTimeout(timeoutId)
  }, [designAnimationTrigger])

  // Render appropriate component based on type
  const renderObject = (obj: FallingObject) => {
    switch (obj.type) {
      case 'avatar':
        return <AvatarStatic />
      case 'rainbow-avatar':
        return <AvatarRainbow />
      case 'tool-logo':
        return obj.toolName ? <ToolLogo tool={obj.toolName} /> : null
      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {objects.map((obj) => (
          <motion.div
            key={obj.id}
            initial={{ y: -100 }}
            animate={{ y: 'calc(100vh + 100px)' }}
            exit={{ opacity: 0 }}
            transition={{
              duration: obj.duration,
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              left: `${obj.x}vw`,
              transform: 'translateX(-50px)' // Center object on x position
            }}
          >
            {renderObject(obj)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
```

**Step 4: Verify component compiles**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript errors

**Step 5: Commit falling avatars changes**

```bash
git add components/FallingAvatars.tsx
git commit -m "feat: extend FallingAvatars to support design animation"
```

---

## Task 6: Update CommandInput

**Files:**
- Modify: `components/CommandInput.tsx:49-57`

**Step 1: Add /design command check**

Update the `executeCommand` function in `components/CommandInput.tsx`. Replace lines 49-57:

```typescript
  const executeCommand = (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();

    // Check for special /claude command
    if (trimmedCommand === '/claude') {
      triggerFallingAvatars();
      setInput('');
      setSuggestions([]);
      setHistoryIndex(-1);
      return;
    }

    // Check for special /design command
    if (trimmedCommand === '/design') {
      triggerDesignAnimation();
      setInput('');
      setSuggestions([]);
      setHistoryIndex(-1);
      return;
    }

    // Find matching navigation item
    const navItem = navigationItems.find(
      (item) =>
        item.command.toLowerCase() === trimmedCommand ||
        item.route.toLowerCase() === trimmedCommand ||
        item.command.toLowerCase().replace('/ ', '/') === trimmedCommand
    );

    if (navItem) {
      // Add to history
      setHistory((prev) => [command, ...prev].slice(0, 50));
      setInput('');
      setSuggestions([]);
      setHistoryIndex(-1);

      // Navigate to route
      router.push(navItem.route);
    }
  };
```

**Step 2: Update imports to include triggerDesignAnimation**

Update line 23 in `components/CommandInput.tsx`:

```typescript
  const { triggerFallingAvatars, triggerDesignAnimation } = useAnimation();
```

**Step 3: Verify component compiles**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript errors

**Step 4: Commit CommandInput changes**

```bash
git add components/CommandInput.tsx
git commit -m "feat: add /design command support to CommandInput"
```

---

## Task 7: Update CommandInputSimple

**Files:**
- Modify: `components/CommandInputSimple.tsx`

**Step 1: Read existing CommandInputSimple**

```bash
cat components/CommandInputSimple.tsx
```

**Step 2: Add /design command check**

Update the `executeCommand` function in `components/CommandInputSimple.tsx` to include the `/design` check (similar to Task 6):

```typescript
  const executeCommand = (command: string) => {
    const trimmedCommand = command.trim().toLowerCase();

    // Check for special /claude command
    if (trimmedCommand === '/claude') {
      triggerFallingAvatars();
      setInput('');
      return;
    }

    // Check for special /design command
    if (trimmedCommand === '/design') {
      triggerDesignAnimation();
      setInput('');
      return;
    }

    // Find matching navigation item
    const navItem = navigationItems.find(
      (item) =>
        item.command.toLowerCase() === trimmedCommand ||
        item.route.toLowerCase() === trimmedCommand ||
        item.command.toLowerCase().replace('/ ', '/') === trimmedCommand
    );

    if (navItem) {
      setInput('');
      router.push(navItem.route);
    }
  };
```

**Step 3: Update imports to include triggerDesignAnimation**

Update the useAnimation hook destructuring:

```typescript
  const { triggerFallingAvatars, triggerDesignAnimation } = useAnimation();
```

**Step 4: Verify component compiles**

```bash
npm run build
```

Expected: Build succeeds with no TypeScript errors

**Step 5: Commit CommandInputSimple changes**

```bash
git add components/CommandInputSimple.tsx
git commit -m "feat: add /design command support to CommandInputSimple"
```

---

## Task 8: Manual Testing

**Step 1: Start development server**

```bash
npm run dev
```

Expected: Server starts on http://localhost:3000

**Step 2: Test /claude command**

1. Open browser to http://localhost:3000
2. Type `/claude` in command input
3. Press Enter

Expected: 20-30 orange avatars fall from top to bottom

**Step 3: Test /design command**

1. Type `/design` in command input
2. Press Enter

Expected:
- 20-30 objects fall (mix of rainbow avatars and tool logos)
- Rainbow avatars have gradient coloring
- Tool logos are visible and recognizable

**Step 4: Test on different pages**

1. Navigate to `/main` page
2. Test `/design` command
3. Navigate to `/works` page
4. Test `/design` command

Expected: Animation works consistently across all pages

**Step 5: Verify cleanup**

1. Trigger `/design` animation
2. Wait 2 seconds
3. Check browser dev tools console

Expected: No memory leaks, objects are cleaned up

**Step 6: Document any issues**

If any issues found, document in git commit message or create follow-up tasks.

---

## Task 9: Final Verification and Documentation

**Step 1: Run final build**

```bash
npm run build
```

Expected: Clean build with no errors or warnings

**Step 2: Verify all success criteria**

Check against design document criteria:
- [ ] Typing "/design" triggers animation
- [ ] 20-30 objects fall (rainbow avatars + tool logos)
- [ ] Rainbow avatars have uniform horizontal gradient
- [ ] Tool logos display correctly (5 different tools)
- [ ] Objects fall at varying speeds (0.8-1.5s)
- [ ] Animation auto-cleans up
- [ ] No impact on page interactivity
- [ ] Works on all pages
- [ ] No console errors

**Step 3: Create final commit**

```bash
git add -A
git commit -m "feat: complete /design falling animation implementation

- Add rainbow gradient avatars
- Add design tool logos (Figma, AE, Claude, ChatGPT, MJ)
- Extend animation system to support multiple animation types
- Add /design command recognition in all command inputs
- 50/50 mix of rainbow avatars and tool logos
- 20-30 objects falling with varying speeds

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

**Step 4: Ready for review**

Implementation complete and ready for code review or merge.

---

## Notes

- Logo SVGs provided are placeholders - consider replacing with actual brand logos
- Ensure proper licensing/permission for brand logo usage
- Animation performance is optimized with GPU-accelerated transforms
- All existing `/claude` functionality remains unchanged
- Both animations can be triggered independently
