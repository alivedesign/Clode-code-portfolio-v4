# Media Optimization Design - Portfolio v4

**Date:** 2025-01-16
**Goal:** Optimize images and videos for faster initial page load without quality loss
**Target:** 70-80% reduction in initial page load size

---

## Current State

- **Platform:** Next.js 15 on Vercel
- **Images:** 17MB (PNG format)
- **Videos:** 119MB (MP4 format)
- **Issue:** Slow initial page load
- **Context:** Videos are below the fold, images using Next.js Image component

---

## Section 1: Image Optimization Strategy

### Current State
Images are PNG files served through Next.js Image component. Vercel automatically converts these to WebP/AVIF when browsers support it.

### Actions

1. **Verify Next.js image formats** - Check `next.config.js` has proper format settings to ensure WebP/AVIF delivery
2. **Audit current `<Image>` usage** - Ensure:
   - Above-fold images use `priority` prop
   - Below-fold images use `loading="lazy"` (default)
   - Proper `sizes` attribute for responsive loading
3. **Optimize quality settings** - Adjust quality props:
   - Hero images: `quality={90}` (keep high)
   - Content images: `quality={80}` (reduce from 85/90)
   - Thumbnails: `quality={75}`

### Expected Impact
- PNG → WebP: ~60-70% smaller
- PNG → AVIF: ~70-80% smaller (for browsers that support it)
- Quality optimization: Additional ~30% reduction
- **Total: Images will be 3-4x smaller with zero quality loss**

---

## Section 2: Progressive Video Loading Strategy

### Current State
Videos total 119MB, all in MP4 format with `preload="metadata"`. Each video downloads a chunk immediately even though they're below the fold.

### Loading Strategy

**Phase 1 - Initial Load (0-2 seconds)**
- Only critical above-fold content loads
- Videos have `preload="none"` initially
- Poster images show placeholders

**Phase 2 - Background Preload (after page interactive)**
- Once page is interactive, trigger video preload
- Use `requestIdleCallback()` to load videos during browser idle time
- Prioritize videos closer to viewport first

**Phase 3 - User Scrolls**
- Videos are already loaded and ready to play
- Smooth autoplay as they enter viewport

### Actions

1. **Convert MP4 → WebM** - Re-encode all videos to WebM format using VP9 or AV1 codec
2. **Provide fallback sources** - Use multiple `<source>` tags so browsers pick the best format
3. **Change preload strategy** - Switch from `preload="metadata"` to `preload="none"`
4. **Add poster images** - Generate lightweight poster frames (WebP thumbnails)
5. **Implement lazy loading** - Only start loading videos when appropriate

### Expected Impact
- WebM conversion: ~50% reduction (119MB → ~60MB)
- Lazy loading: Videos don't load until needed
- Poster images: Fast visual feedback (~50KB vs 40MB)
- **Total: Initial page load won't include ANY video data, saving 119MB**

---

## Section 3: Implementation Details

### Step 1: Next.js Configuration

Update `next.config.js`:
```javascript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

### Step 2: Video Conversion

Convert all MP4s to WebM using FFmpeg:
```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus output.webm
```
- `crf 30`: Good quality/size balance (lower = better quality, bigger file)
- Generate poster frames automatically as WebP

### Step 3: Video Component Updates

Update video tags:
```jsx
<video preload="none" poster="/poster.webp">
  <source src="/video.webm" type="video/webm" />
  <source src="/video.mp4" type="video/mp4" />
</video>
```

### Step 4: Progressive Preload Script

Add client-side script that:
- Waits for page load complete
- Uses `requestIdleCallback` to queue video preloads
- Prioritizes videos by viewport proximity
- Doesn't block user interactions

### Step 5: Image Quality Adjustments

Lower quality settings where appropriate:
- Hero images: keep `quality={90}`
- Content images: reduce to `quality={80}`
- Thumbnails: `quality={75}`

---

## Section 4: Testing & Verification

### Performance Metrics to Track

**Lighthouse (Chrome DevTools)**
- First Contentful Paint (FCP) - should improve by 40-60%
- Largest Contentful Paint (LCP) - target under 2.5s
- Total Blocking Time (TBT) - should stay low

**Network Tab Analysis**
- Initial page load: Should drop from ~20-30MB to ~2-5MB
- Video file sizes: ~50% reduction per video
- Image format delivery: Verify WebP/AVIF being served

**Real-world Testing**
- Test on slow 3G connection (Chrome DevTools throttling)
- Mobile device testing
- Different browsers (Chrome, Safari, Firefox)

### Verification Checklist

- [ ] Above-fold images load with `priority` prop
- [ ] Below-fold images lazy load automatically
- [ ] Videos show poster images immediately
- [ ] Videos don't load on initial page load
- [ ] Videos preload after page interactive
- [ ] WebM served to supporting browsers, MP4 fallback works
- [ ] AVIF/WebP images served when supported
- [ ] No visual quality degradation
- [ ] Smooth video playback when scrolling

### Rollback Plan
Keep original MP4s and high-quality images as backup. If any issues arise, we can quickly revert specific files.

---

## Summary

This optimization strategy focuses on:
1. **Images:** Leverage Vercel's automatic WebP/AVIF conversion with optimized quality settings
2. **Videos:** Convert to WebM, implement progressive loading, use poster images
3. **Loading Strategy:** Fast initial load, intelligent background preloading, smooth UX

**Expected Results:**
- Initial page load: ~2-5MB (down from ~20-30MB)
- Videos: 50% smaller files + zero initial load impact
- Images: 3-4x smaller with no visible quality loss
- Overall: 70-80% improvement in initial page load performance
