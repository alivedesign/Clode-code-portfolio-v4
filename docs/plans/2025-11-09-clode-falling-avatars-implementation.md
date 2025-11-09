# /clode Falling Avatars Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a secret "/clode" command that triggers 20-30 orange pixel avatar characters to fall from top to bottom of the screen as a one-time animation.

**Architecture:** React Context provides `triggerFallingAvatars()` function consumed by command inputs. FallingAvatars component mounts at root level with fixed positioning, generates 20-30 simplified avatars with random positions/speeds, uses Framer Motion for animations, and auto-cleans up after completion.

**Tech Stack:** Next.js 15, React 19, TypeScript, Framer Motion, Tailwind CSS

---

## Task 1: Create Animation Context

**Files:**
- Create: `contexts/AnimationContext.tsx`

**Step 1: Create the context file**

Create `contexts/AnimationContext.tsx`:

```typescript
'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface AnimationContextType {
  triggerFallingAvatars: () => void
  fallingAvatarsTrigger: number
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined)

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [fallingAvatarsTrigger, setFallingAvatarsTrigger] = useState(0)

  const triggerFallingAvatars = () => {
    setFallingAvatarsTrigger(prev => prev + 1)
  }

  return (
    <AnimationContext.Provider value={{ triggerFallingAvatars, fallingAvatarsTrigger }}>
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

**Step 2: Commit**

```bash
git add contexts/AnimationContext.tsx
git commit -m "feat: add animation context for global animation triggers"
```

---

## Task 2: Create Static Avatar Component

**Files:**
- Create: `components/AvatarStatic.tsx`

**Step 1: Create simplified avatar component**

Create `components/AvatarStatic.tsx`:

```typescript
// Static version of Avatar without interactivity for animations
export function AvatarStatic() {
  // Avatar dimensions
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

  return (
    <div
      className="relative"
      style={{
        width: `${AVATAR_WIDTH}px`,
        height: `${AVATAR_HEIGHT}px`
      }}
    >
      {/* Main body */}
      <div
        className="absolute bg-accent top-0"
        style={{
          height: `${BODY_HEIGHT}px`,
          left: `${BODY_LEFT}px`,
          width: `${BODY_WIDTH}px`
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

      {/* Right arm */}
      <div
        className="absolute bg-accent"
        style={{
          height: `${PIXEL_HEIGHT}px`,
          width: `${PIXEL_WIDTH}px`,
          left: `${RIGHT_ARM_LEFT}px`,
          top: `${ARM_TOP}px`
        }}
      />

      {/* Left arm */}
      <div
        className="absolute bg-accent"
        style={{
          height: `${PIXEL_HEIGHT}px`,
          width: `${PIXEL_WIDTH}px`,
          left: `${LEFT_ARM_LEFT}px`,
          top: `${ARM_TOP}px`
        }}
      />

      {/* Bottom pixels */}
      {BOTTOM_PIXELS.map((pixel, index) => (
        <div
          key={`bottom-pixel-${index}`}
          className="absolute bg-accent"
          style={{
            height: `${PIXEL_HEIGHT}px`,
            width: `${PIXEL_WIDTH}px`,
            left: `${pixel.left}px`,
            top: `${BOTTOM_PIXELS_TOP}px`
          }}
        />
      ))}
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add components/AvatarStatic.tsx
git commit -m "feat: add static avatar component for animations"
```

---

## Task 3: Create Falling Avatars Component

**Files:**
- Create: `components/FallingAvatars.tsx`

**Step 1: Create falling avatars component**

Create `components/FallingAvatars.tsx`:

```typescript
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAnimation } from '@/contexts/AnimationContext'
import { AvatarStatic } from './AvatarStatic'

interface FallingAvatar {
  id: string
  x: number // horizontal position in vw
  duration: number // fall duration in seconds
}

export function FallingAvatars() {
  const { fallingAvatarsTrigger } = useAnimation()
  const [avatars, setAvatars] = useState<FallingAvatar[]>([])

  useEffect(() => {
    if (fallingAvatarsTrigger === 0) return

    // Generate 20-30 avatars with random positions and speeds
    const count = Math.floor(Math.random() * 11) + 20 // 20-30
    const newAvatars: FallingAvatar[] = []

    for (let i = 0; i < count; i++) {
      newAvatars.push({
        id: `avatar-${Date.now()}-${i}`,
        x: Math.random() * 100, // 0-100vw
        duration: Math.random() * 0.7 + 0.8 // 0.8-1.5s
      })
    }

    setAvatars(newAvatars)

    // Auto-cleanup after longest animation completes
    setTimeout(() => {
      setAvatars([])
    }, 1600) // 1.5s max duration + 100ms buffer
  }, [fallingAvatarsTrigger])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {avatars.map((avatar) => (
          <motion.div
            key={avatar.id}
            initial={{ y: -100 }}
            animate={{ y: 'calc(100vh + 100px)' }}
            exit={{ opacity: 0 }}
            transition={{
              duration: avatar.duration,
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              left: `${avatar.x}vw`,
              transform: 'translateX(-50px)' // Center avatar on x position
            }}
          >
            <AvatarStatic />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
```

**Step 2: Commit**

```bash
git add components/FallingAvatars.tsx
git commit -m "feat: add falling avatars animation component"
```

---

## Task 4: Update Root Layout

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Update layout to add provider and component**

Modify `app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import "./globals.css";
import { AnimationProvider } from "@/contexts/AnimationContext";
import { FallingAvatars } from "@/components/FallingAvatars";

// Note: Using system fonts (SF Pro on macOS, Segoe UI on Windows, etc.)
// To use custom SF Pro fonts across all platforms, add font files to public/fonts/
// and uncomment the localFont configuration in this file (see public/fonts/README.md)

export const metadata: Metadata = {
  metadataBase: new URL('https://shkuratov.design'),
  title: "Evgeny Shkuratov - Product Designer",
  description: "Product Designer leveraging AI to build apps focused on what users actually need. 9 years of experience, 30+ client products launched.",
  keywords: ["product design", "UX design", "portfolio", "Evgeny Shkuratov", "AI-powered builder"],
  authors: [{ name: "Evgeny Shkuratov" }],
  creator: "Evgeny Shkuratov",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Evgeny Shkuratov - Product Designer & AI-Powered Builder",
    description: "Product Designer leveraging AI to build apps focused on what users actually need. 9 years of experience, 30+ client products launched.",
    siteName: "Shkuratov Designer",
    images: ['/opengraph-image'],
  },
  twitter: {
    card: "summary_large_image",
    title: "Evgeny Shkuratov - Product Designer & AI-Powered Builder",
    description: "Product Designer leveraging AI to build apps focused on what users actually need. 9 years of experience, 30+ client products launched.",
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        <AnimationProvider>
          {children}
          <FallingAvatars />
        </AnimationProvider>
      </body>
    </html>
  );
}
```

**Step 2: Test that app still loads**

Run: `npm run dev`
Expected: App loads without errors, all pages work

**Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: integrate animation provider and falling avatars into root layout"
```

---

## Task 5: Update CommandInput Component

**Files:**
- Modify: `components/CommandInput.tsx:44-65`

**Step 1: Import animation hook**

Add import at top of `components/CommandInput.tsx`:

```typescript
import { useAnimation } from '@/contexts/AnimationContext';
```

**Step 2: Use animation hook in component**

After line 20 (after `const router = useRouter();`), add:

```typescript
const { triggerFallingAvatars } = useAnimation();
```

**Step 3: Update executeCommand function**

Replace the `executeCommand` function (lines 44-65) with:

```typescript
const executeCommand = (command: string) => {
  const trimmedCommand = command.trim().toLowerCase();

  // Check for special /clode command
  if (trimmedCommand === '/clode') {
    // Trigger falling avatars animation
    triggerFallingAvatars();
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

**Step 4: Test the /clode command**

Run: `npm run dev`
Navigate to a page with CommandInput
Type "/clode" and press Enter
Expected: Avatars fall from top to bottom

**Step 5: Commit**

```bash
git add components/CommandInput.tsx
git commit -m "feat: add /clode command support to CommandInput"
```

---

## Task 6: Update CommandInputSimple Component

**Files:**
- Modify: `components/CommandInputSimple.tsx`

**Step 1: Read the current implementation**

First, examine `components/CommandInputSimple.tsx` to understand its structure.

**Step 2: Import animation hook**

Add import at top of `components/CommandInputSimple.tsx`:

```typescript
import { useAnimation } from '@/contexts/AnimationContext';
```

**Step 3: Use animation hook**

Add after the router declaration:

```typescript
const { triggerFallingAvatars } = useAnimation();
```

**Step 4: Update executeCommand function**

Add /clode check at the beginning of the `executeCommand` function (similar to CommandInput):

```typescript
const executeCommand = (command: string) => {
  const trimmedCommand = command.trim().toLowerCase();

  // Check for special /clode command
  if (trimmedCommand === '/clode') {
    // Trigger falling avatars animation
    triggerFallingAvatars();
    setInput('');
    setSuggestions([]);
    return;
  }

  // ... rest of the existing function
```

**Step 5: Test on homepage**

Run: `npm run dev`
Navigate to homepage (/)
Type "/clode" in the command input and press Enter
Expected: Avatars fall from top to bottom

**Step 6: Commit**

```bash
git add components/CommandInputSimple.tsx
git commit -m "feat: add /clode command support to CommandInputSimple"
```

---

## Task 7: Final Testing and Polish

**Step 1: Test on all pages**

Pages to test:
- / (homepage)
- /main
- /works
- /my-products
- /info-contact

For each page:
1. Type "/clode" and press Enter
2. Verify 20-30 avatars fall
3. Verify animation completes and cleans up
4. Verify you can trigger it multiple times

**Step 2: Test edge cases**

1. Type "/clode" repeatedly (should work each time)
2. Type "/CLODE" (uppercase, should work)
3. Type "/clode " (with space, should work)
4. Navigate between pages while animation is running

**Step 3: Run build to verify no errors**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 4: Create final commit if any fixes needed**

```bash
git add .
git commit -m "fix: polish clode animation edge cases"
```

---

## Verification Checklist

Before marking complete, verify:

- [ ] Typing "/clode" in any command input triggers animation
- [ ] 20-30 avatars fall from random horizontal positions
- [ ] Avatars fall at varying speeds (appears natural)
- [ ] Animation auto-cleans up after ~1.5 seconds
- [ ] Can trigger animation multiple times
- [ ] Works on all pages with command inputs
- [ ] No console errors
- [ ] No memory leaks (animations properly cleanup)
- [ ] Build succeeds without errors

---

## Notes for Engineer

**Key Design Decisions:**

1. **Context over Props:** Using React Context allows any command input to trigger the animation without prop drilling.

2. **Auto-cleanup:** The FallingAvatars component automatically removes avatars after the animation completes. No manual cleanup needed.

3. **Random Generation:** Each trigger generates new random positions and durations for natural variation.

4. **Performance:** Using Framer Motion with CSS transforms ensures GPU acceleration. Static avatars (no event listeners) keep it lightweight.

5. **Z-Index:** Fixed positioning with z-50 ensures avatars appear above all content.

6. **Pointer Events:** pointer-events: none ensures the animation doesn't block user interaction.

**Common Pitfalls:**

1. Don't forget to import useAnimation hook in both CommandInput components
2. The /clode check must be BEFORE the navigation logic to prevent trying to navigate to a /clode route
3. Remember to clear input after triggering animation
4. The animation cleanup timeout (1600ms) must be longer than max duration (1500ms)
