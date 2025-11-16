# Media Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Optimize images and videos to reduce initial page load from ~20-30MB to ~2-5MB without quality loss

**Architecture:** Leverage Next.js 15 image optimization on Vercel, convert videos to WebM, implement progressive loading strategy with poster images and idle-time preloading

**Tech Stack:** Next.js 15, FFmpeg (video conversion), Intersection Observer API, requestIdleCallback

---

## Task 1: Verify and Configure Next.js Image Optimization

**Files:**
- Read: `next.config.js` or `next.config.mjs`
- Modify: Create/update Next.js config

**Step 1: Check if next.config exists**

Run: `ls -la next.config.*`

**Step 2: Read existing config (if exists)**

If file exists, read it to understand current configuration.

**Step 3: Update/create config with image optimization**

Create or update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
```

**Step 4: Test build still works**

Run: `npm run build`
Expected: Build completes successfully

**Step 5: Commit**

```bash
git add next.config.js
git commit -m "feat: configure Next.js image optimization for WebP/AVIF"
```

---

## Task 2: Convert Videos to WebM Format

**Files:**
- Source: `public/videos/bloggingmachine-case/*.mp4`
- Output: `public/videos/bloggingmachine-case/*.webm`

**Prerequisites:**
Install FFmpeg if not available: `brew install ffmpeg` (macOS) or appropriate package manager

**Step 1: Convert research.mp4 to WebM**

Run:
```bash
ffmpeg -i public/videos/bloggingmachine-case/research.mp4 \
  -c:v libvpx-vp9 \
  -crf 30 \
  -b:v 0 \
  -c:a libopus \
  public/videos/bloggingmachine-case/research.webm
```

Expected: Creates research.webm file ~50% smaller than original

**Step 2: Convert bloggingmachine-video.mp4 to WebM**

Run:
```bash
ffmpeg -i public/videos/bloggingmachine-case/bloggingmachine-video.mp4 \
  -c:v libvpx-vp9 \
  -crf 30 \
  -b:v 0 \
  -c:a libopus \
  public/videos/bloggingmachine-case/bloggingmachine-video.webm
```

Expected: Creates bloggingmachine-video.webm file ~50% smaller

**Step 3: Convert new-site-showcase.mp4 to WebM (if used)**

Run:
```bash
ffmpeg -i public/videos/bloggingmachine-case/new-site-showcase.mp4 \
  -c:v libvpx-vp9 \
  -crf 30 \
  -b:v 0 \
  -c:a libopus \
  public/videos/bloggingmachine-case/new-site-showcase.webm
```

**Step 4: Verify file sizes**

Run: `ls -lh public/videos/bloggingmachine-case/`
Expected: WebM files should be ~40-50% smaller than MP4 equivalents

**Step 5: Commit**

```bash
git add public/videos/bloggingmachine-case/*.webm
git commit -m "feat: add WebM video formats for better compression"
```

---

## Task 3: Generate Video Poster Images

**Files:**
- Source: `public/videos/bloggingmachine-case/*.mp4`
- Output: `public/videos/bloggingmachine-case/*-poster.webp`

**Step 1: Extract poster from research.mp4**

Run:
```bash
ffmpeg -i public/videos/bloggingmachine-case/research.mp4 \
  -ss 00:00:01 \
  -vframes 1 \
  -q:v 2 \
  public/videos/bloggingmachine-case/research-poster.webp
```

Expected: Creates research-poster.webp (~50-100KB)

**Step 2: Extract poster from bloggingmachine-video.mp4**

Run:
```bash
ffmpeg -i public/videos/bloggingmachine-case/bloggingmachine-video.mp4 \
  -ss 00:00:01 \
  -vframes 1 \
  -q:v 2 \
  public/videos/bloggingmachine-case/bloggingmachine-video-poster.webp
```

**Step 3: Verify poster images**

Run: `ls -lh public/videos/bloggingmachine-case/*-poster.webp`
Expected: Each poster should be 50-150KB

**Step 4: Commit**

```bash
git add public/videos/bloggingmachine-case/*-poster.webp
git commit -m "feat: add video poster images for faster initial load"
```

---

## Task 4: Create Progressive Video Preload Hook

**Files:**
- Create: `app/hooks/useVideoPreload.ts`

**Step 1: Create hooks directory (if needed)**

Run: `mkdir -p app/hooks`

**Step 2: Create useVideoPreload hook**

Create `app/hooks/useVideoPreload.ts`:

```typescript
'use client';

import { useEffect } from 'react';

interface UseVideoPreloadOptions {
  enabled?: boolean;
  delay?: number; // ms to wait after page load
}

export function useVideoPreload(
  videoRefs: HTMLVideoElement[],
  options: UseVideoPreloadOptions = {}
) {
  const { enabled = true, delay = 1000 } = options;

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const preloadVideos = () => {
      // Use requestIdleCallback if available, otherwise setTimeout
      const schedulePreload = (callback: () => void) => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(callback, { timeout: 5000 });
        } else {
          setTimeout(callback, 0);
        }
      };

      schedulePreload(() => {
        videoRefs.forEach((video) => {
          if (video && video.preload === 'none') {
            // Start preloading
            video.preload = 'auto';
          }
        });
      });
    };

    // Wait for initial page load, then preload
    const timer = setTimeout(preloadVideos, delay);

    return () => clearTimeout(timer);
  }, [videoRefs, enabled, delay]);
}
```

**Step 3: Verify TypeScript compiles**

Run: `npm run build`
Expected: No TypeScript errors

**Step 4: Commit**

```bash
git add app/hooks/useVideoPreload.ts
git commit -m "feat: add progressive video preload hook"
```

---

## Task 5: Update Blogging Machine Page - Video Elements

**Files:**
- Modify: `app/works/bloggingmachine/page.tsx`

**Step 1: Update research video (mobile) - lines 141-151**

Replace:
```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  preload="metadata"
  aria-label="Research process demonstration video"
  className="w-full h-[244px] rounded-[4.747px] object-cover"
>
  <source src="/videos/bloggingmachine-case/research.mp4" type="video/mp4" />
</video>
```

With:
```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  preload="none"
  poster="/videos/bloggingmachine-case/research-poster.webp"
  aria-label="Research process demonstration video"
  className="w-full h-[244px] rounded-[4.747px] object-cover"
>
  <source src="/videos/bloggingmachine-case/research.webm" type="video/webm" />
  <source src="/videos/bloggingmachine-case/research.mp4" type="video/mp4" />
</video>
```

**Step 2: Update research video (desktop) - lines 171-181**

Replace:
```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  preload="metadata"
  aria-label="Research process demonstration video"
  className="absolute left-[67px] top-[29.48px] w-[629px] h-[353.664px] rounded-[4.747px] object-cover"
>
  <source src="/videos/bloggingmachine-case/research.mp4" type="video/mp4" />
</video>
```

With:
```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  preload="none"
  poster="/videos/bloggingmachine-case/research-poster.webp"
  aria-label="Research process demonstration video"
  className="absolute left-[67px] top-[29.48px] w-[629px] h-[353.664px] rounded-[4.747px] object-cover"
>
  <source src="/videos/bloggingmachine-case/research.webm" type="video/webm" />
  <source src="/videos/bloggingmachine-case/research.mp4" type="video/mp4" />
</video>
```

**Step 3: Update bloggingmachine showcase video - lines 278-288**

Replace:
```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  preload="metadata"
  aria-label="New Blogging Machine website showcase video"
  className="w-full h-auto"
>
  <source src="/videos/bloggingmachine-case/bloggingmachine-video.mp4" type="video/mp4" />
</video>
```

With:
```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  preload="none"
  poster="/videos/bloggingmachine-case/bloggingmachine-video-poster.webp"
  aria-label="New Blogging Machine website showcase video"
  className="w-full h-auto"
>
  <source src="/videos/bloggingmachine-case/bloggingmachine-video.webm" type="video/webm" />
  <source src="/videos/bloggingmachine-case/bloggingmachine-video.mp4" type="video/mp4" />
</video>
```

**Step 4: Verify page still compiles**

Run: `npm run build`
Expected: Build succeeds, no errors

**Step 5: Commit**

```bash
git add app/works/bloggingmachine/page.tsx
git commit -m "feat: update videos with WebM sources and poster images"
```

---

## Task 6: Implement Video Preloading in Blogging Machine Page

**Files:**
- Modify: `app/works/bloggingmachine/page.tsx`

**Step 1: Add useRef and hook import at top of file**

After line 7, add:
```tsx
import { useRef, useEffect } from 'react';
import { useVideoPreload } from '@/hooks/useVideoPreload';
```

**Step 2: Add video refs in component (after line 9)**

After `export default function BloggingMachineCaseStudy() {`, add:
```tsx
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const showcaseVideoRef = useRef<HTMLVideoElement>(null);

  // Collect video refs for preloading
  const videoRefs = [
    mobileVideoRef.current,
    desktopVideoRef.current,
    showcaseVideoRef.current,
  ].filter((ref): ref is HTMLVideoElement => ref !== null);

  // Progressive preload after page is interactive
  useVideoPreload(videoRefs, { delay: 1500 });
```

**Step 3: Add ref to mobile video (line ~141)**

Add `ref={mobileVideoRef}` to the mobile video element:
```tsx
<video
  ref={mobileVideoRef}
  autoPlay
  loop
  muted
  playsInline
  preload="none"
  poster="/videos/bloggingmachine-case/research-poster.webp"
  aria-label="Research process demonstration video"
  className="w-full h-[244px] rounded-[4.747px] object-cover"
>
```

**Step 4: Add ref to desktop video (line ~171)**

Add `ref={desktopVideoRef}` to the desktop video element:
```tsx
<video
  ref={desktopVideoRef}
  autoPlay
  loop
  muted
  playsInline
  preload="none"
  poster="/videos/bloggingmachine-case/research-poster.webp"
  aria-label="Research process demonstration video"
  className="absolute left-[67px] top-[29.48px] w-[629px] h-[353.664px] rounded-[4.747px] object-cover"
>
```

**Step 5: Add ref to showcase video (line ~278)**

Add `ref={showcaseVideoRef}` to the showcase video element:
```tsx
<video
  ref={showcaseVideoRef}
  autoPlay
  loop
  muted
  playsInline
  preload="none"
  poster="/videos/bloggingmachine-case/bloggingmachine-video-poster.webp"
  aria-label="New Blogging Machine website showcase video"
  className="w-full h-auto"
>
```

**Step 6: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 7: Commit**

```bash
git add app/works/bloggingmachine/page.tsx
git commit -m "feat: implement progressive video preloading"
```

---

## Task 7: Optimize Image Quality Settings

**Files:**
- Modify: `app/works/bloggingmachine/page.tsx`

**Step 1: Update content images quality (lines 84-92, 101-121)**

Find all `<Image>` components with `quality={85}` or `quality={90}` for content images (not priority images).

Change to `quality={80}`:
- Line 90: `quality={80}` (old-site-screenshot)
- Line 108: `quality={80}` (analytics-graph)
- Line 118: `quality={80}` (analytics-data)
- Line 356: `quality={80}` (previous-case-preview)

Keep `quality={90}` for the priority hero image (andrew-linkedin, line 43).

**Step 2: Verify build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add app/works/bloggingmachine/page.tsx
git commit -m "feat: optimize image quality settings for better performance"
```

---

## Task 8: Check for Other Pages with Videos

**Files:**
- Check: `app/works/b2b-messenger/page.tsx` (if exists)
- Check: Other case study pages

**Step 1: Find all video usage**

Run: `grep -r "<video" app/ --include="*.tsx"`

**Step 2: Apply same optimization pattern**

If other pages use videos:
1. Convert videos to WebM
2. Generate poster images
3. Update video elements with WebM sources
4. Add preload="none"
5. Implement progressive preloading

**Step 3: Commit any changes**

```bash
git add .
git commit -m "feat: optimize videos across all case study pages"
```

---

## Task 9: Test Performance Improvements

**Files:**
- None (testing only)

**Step 1: Start dev server**

Run: `npm run dev`

**Step 2: Test in Chrome DevTools**

1. Open DevTools → Network tab
2. Disable cache
3. Throttle to "Fast 3G"
4. Navigate to `/works/bloggingmachine`
5. Record initial page load size

Expected: Should be ~2-5MB vs previous ~20-30MB

**Step 3: Run Lighthouse audit**

1. Open DevTools → Lighthouse
2. Select "Performance"
3. Run audit on `/works/bloggingmachine`

Expected metrics:
- FCP < 2.0s
- LCP < 2.5s
- Performance score > 90

**Step 4: Verify video formats**

In Network tab, verify:
- WebP/AVIF images are served (Content-Type: image/webp or image/avif)
- WebM videos are served (Content-Type: video/webm)
- Videos don't load until after page interactive

**Step 5: Test video playback**

1. Scroll to video sections
2. Verify videos autoplay smoothly
3. Check poster images display before video loads

**Step 6: Document results**

Create `docs/performance-results.md` with before/after metrics.

---

## Task 10: Final Build and Verification

**Files:**
- None (verification only)

**Step 1: Clean build**

Run:
```bash
rm -rf .next
npm run build
```

Expected: Build completes successfully with no errors

**Step 2: Verify build output**

Check build output for:
- All pages compile successfully
- No image optimization warnings
- Static page generation works

**Step 3: Test production build locally**

Run:
```bash
npm run start
```

Navigate to pages and verify everything works.

**Step 4: Run final lint**

Run: `npm run lint`
Expected: No new lint errors (existing warnings okay)

**Step 5: Final commit**

```bash
git add .
git commit -m "chore: final verification and cleanup"
```

---

## Deployment Checklist

Before merging to main:

- [ ] All videos converted to WebM
- [ ] All video poster images generated
- [ ] Video elements updated with multiple sources
- [ ] Progressive preload implemented
- [ ] Image quality optimized
- [ ] Next.js config updated
- [ ] Build succeeds
- [ ] Performance tested (Lighthouse)
- [ ] Initial page load < 5MB
- [ ] Videos load progressively
- [ ] No visual quality degradation
- [ ] All pages work correctly

---

## Expected File Changes Summary

**New files:**
- `next.config.js` (or updated)
- `app/hooks/useVideoPreload.ts`
- `public/videos/bloggingmachine-case/*.webm` (3 files)
- `public/videos/bloggingmachine-case/*-poster.webp` (3 files)
- `docs/performance-results.md`

**Modified files:**
- `app/works/bloggingmachine/page.tsx`
- Any other case study pages with videos

**Total commits:** ~8-10

**Estimated time:** 1-2 hours (including video conversion time)

---

## Notes for Engineer

- **FFmpeg installation required** - Install before starting Task 2
- **Video conversion is slow** - Each video takes 2-5 minutes depending on size
- **Keep original MP4s** - Don't delete them, they're fallbacks for older browsers
- **Test on real devices** - Lighthouse scores are guidelines, test on actual mobile devices
- **Vercel auto-optimizes images** - The config ensures optimal format selection
- **WebM browser support** - 95%+ of users, MP4 fallback handles the rest
