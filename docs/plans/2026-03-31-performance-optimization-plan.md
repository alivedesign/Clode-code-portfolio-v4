# Performance Optimization & Cleanup — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Clean up ~90MB of repo junk, convert PNG images to WebP, fix video loading, add image dimensions, memoize components, and optimize the Vite build — all without any visual changes.

**Architecture:** Five independent phases executed in parallel via subagents. Phase 1 deletes unused files. Phase 2 converts images and updates code references. Phase 3 fixes video tags. Phase 4 adds image dimensions + React.memo + alt text. Phase 5 updates build config and .gitignore.

**Tech Stack:** React 19, TypeScript, Vite 8, Tailwind CSS 4, sharp (for image conversion)

---

### Task 1: Delete root-level junk files

**Files:**
- Delete: 85 files in project root (screenshots, videos, docs, lottie)

**Step 1: Delete all root-level validation screenshots and media**

```bash
cd "/Users/shkuratovdesigner/Cursor Projects/Portfolio v4"

# Delete validation screenshot PNGs
rm -f "14 Years of Daily Journals Fed Into Claude.jpeg" \
  "AI Agents are much more software.jpeg" \
  "AI is going .png" \
  "China just turned the.png" \
  "Google is trying .jpeg" \
  "Tailwind just laid off .jpeg" \
  "The real AI skill.jpeg" \
  "VCs made.jpeg" \
  avatar.jpg card1.png \
  cases-adjusted.png cases-figma-link.png cases-fixed-50pct.png \
  cases-fixed-character.png cases-fixed-endstate.png cases-fixed-midscroll.png \
  cases-full-page.png cases-lottie-section.png cases-mobile-lottie.png \
  cases-mobile-typing.png cases-page-desktop.png \
  cases-page-scrolled1.png cases-page-scrolled2.png cases-page-scrolled3.png \
  cases-page-scrolled4.png cases-page-scrolled5.png \
  cases-page-with-links.png cases-typing-machine.png cases-v2-full.png \
  case2-decisions-section.png case2-decisions-v2.png \
  case2-desktop-full.png case2-desktop-v2.png \
  case2-final-desktop.png case2-fixed-layout.png \
  case2-full-page.png case2-hover-card.png \
  case4-annotation-area.png case4-arrow-fix.png case4-bottom.png \
  case4-full-page.png case4-full-revealed.png \
  case4-mobile-demo-video.png case4-mobile-personas-v2.png \
  case4-mobile-personas.png case4-mobile-video.png case4-mobile.png \
  case4-v2-full.png case4-v2-top.png \
  decisions-cards.png decisions-fixed.png decisions-full.png \
  decisions-scaled.png decisions-section.png decisions-v2.png decisions-v3.png \
  mobile-decisions-v2.png mobile-decisions.png mobile-decisions2.png mobile-top.png \
  toast-confirmed.png toast-debug.png toast-final-test.png \
  toast-fix2.png toast-forced-visible.png toast-test-real.png \
  toast-visible-final.png toast-visible.png \
  "case 2 character.png" "case 2_1 preview.png" "case 2_2 preview.png"
```

**Step 2: Delete root-level video files**

```bash
rm -f "Gif 3 for case 1.mp4" "research video.mp4" "case 2 gif.mp4" \
  "gif 2 for case.mp4" "case 2 character anim.mp4" "case 1 preview.mp4"
```

**Step 3: Delete root-level misc files**

```bash
rm -f Evgeny_Shkuratov_Product_Design_Engineer.docx Selfie.lottie Mail.svg \
  QUICK_START.md context.md next-env.d.ts .DS_Store
```

**Step 4: Verify no root junk remains**

```bash
ls *.png *.jpg *.jpeg *.mp4 *.lottie *.docx *.svg 2>/dev/null
# Expected: "no matches found" for each pattern
```

---

### Task 2: Delete root-level junk directories

**Step 1: Delete duplicate lottie and font directories**

```bash
cd "/Users/shkuratovdesigner/Cursor Projects/Portfolio v4"
rm -rf cat/ devil/ turkey/ font/
```

**Step 2: Delete .next/ directory (Next.js artifact)**

```bash
rm -rf .next/
```

**Step 3: Verify directories are gone**

```bash
ls -d cat/ devil/ turkey/ font/ .next/ 2>&1
# Expected: all "No such file or directory"
```

---

### Task 3: Delete orphaned public/ images

**Files:**
- Delete: `public/images/cases/case-2/video-thumbnail.png`
- Delete: `public/images/cases/case-4/research-mode.png`
- Delete: `public/images/cases/case-4/final-design.png`

**Step 1: Verify these files are NOT referenced in code**

```bash
cd "/Users/shkuratovdesigner/Cursor Projects/Portfolio v4"
grep -r "video-thumbnail" src/ --include="*.tsx" --include="*.ts"
grep -r "research-mode" src/ --include="*.tsx" --include="*.ts"
grep -r "final-design" src/ --include="*.tsx" --include="*.ts"
# Expected: no output for all three
```

**Step 2: Delete orphaned files**

```bash
rm -f public/images/cases/case-2/video-thumbnail.png \
  public/images/cases/case-4/research-mode.png \
  public/images/cases/case-4/final-design.png
```

---

### Task 4: Install sharp for image conversion

**Step 1: Install sharp as dev dependency**

```bash
cd "/Users/shkuratovdesigner/Cursor Projects/Portfolio v4"
npm install --save-dev sharp
```

**Step 2: Verify install**

```bash
node -e "const sharp = require('sharp'); console.log('sharp version:', sharp.versions.sharp)"
# Expected: prints sharp version
```

---

### Task 5: Convert case-1 PNG images to WebP

**Files:**
- Convert: `public/images/cases/case-1/hero.png` → `.webp`
- Convert: `public/images/cases/case-1/decision-1.png` → `.webp`
- Convert: `public/images/cases/case-1/decision-2.png` → `.webp`
- Convert: `public/images/cases/case-1/decision-3.png` → `.webp`
- Convert: `public/images/cases/case-1/problem-1.png` → `.webp`
- Convert: `public/images/cases/case-1/problem-2.png` → `.webp`
- Convert: `public/images/cases/case-1/problem-3.png` → `.webp`
- Convert: `public/images/cases/case-1/timeline-1.png` → `.webp`
- Convert: `public/images/cases/case-1/timeline-3.png` → `.webp`
- Convert: `public/images/cases/case-1/timeline-6.png` → `.webp`
- Modify: `src/data/caseStudy1Data.ts`

**Step 1: Convert all case-1 PNGs to WebP**

```bash
cd "/Users/shkuratovdesigner/Cursor Projects/Portfolio v4"
node -e "
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const dir = 'public/images/cases/case-1';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
Promise.all(files.map(async f => {
  const input = path.join(dir, f);
  const output = path.join(dir, f.replace('.png', '.webp'));
  await sharp(input).webp({ quality: 85 }).toFile(output);
  const oldSize = fs.statSync(input).size;
  const newSize = fs.statSync(output).size;
  console.log(f + ': ' + (oldSize/1024).toFixed(0) + 'K -> ' + (newSize/1024).toFixed(0) + 'K (' + ((1-newSize/oldSize)*100).toFixed(0) + '% smaller)');
})).then(() => console.log('Done'));
"
```

**Step 2: Update code references in caseStudy1Data.ts**

Change all `.png` references to `.webp`:
- Line 9: `/images/cases/case-1/hero.png` → `/images/cases/case-1/hero.webp`
- Lines 15-17: `problem-1.png` → `problem-1.webp`, etc.
- Lines 45, 60, 75: `timeline-1.png` → `timeline-1.webp`, etc.
- Lines 86, 94, 102: `decision-1.png` → `decision-1.webp`, etc.

Use find-and-replace: `.png` → `.webp` in `src/data/caseStudy1Data.ts` (replace all)

**Step 3: Delete original PNGs**

```bash
rm -f public/images/cases/case-1/*.png
```

**Step 4: Verify no broken references**

```bash
grep -n "\.png" src/data/caseStudy1Data.ts
# Expected: no output
```

---

### Task 6: Convert case-2 PNG images to WebP

**Files:**
- Convert: `public/images/cases/case-2/decision-{1,2,3}.png` → `.webp`
- Convert: `public/images/cases/case-2/screenshot-{1,2,3}.png` → `.webp`
- Convert: `public/images/cases/case-2/workflow-3d.png` → `.webp`
- Convert: `public/images/cases/case-2-character.png` → `.webp`
- Convert: `public/images/cases/case-2-left.png` → `.webp`
- Convert: `public/images/cases/case-2-right.png` → `.webp`
- Modify: `src/pages/CaseStudy2.tsx` (lines 13, 21, 28, 239, 272)
- Modify: `src/data/casesData.ts` (lines 56, 58, 59)

**Step 1: Convert case-2 directory PNGs**

```bash
cd "/Users/shkuratovdesigner/Cursor Projects/Portfolio v4"
node -e "
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const dir = 'public/images/cases/case-2';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
Promise.all(files.map(async f => {
  const input = path.join(dir, f);
  const output = path.join(dir, f.replace('.png', '.webp'));
  await sharp(input).webp({ quality: 85 }).toFile(output);
  const oldSize = fs.statSync(input).size;
  const newSize = fs.statSync(output).size;
  console.log(f + ': ' + (oldSize/1024).toFixed(0) + 'K -> ' + (newSize/1024).toFixed(0) + 'K');
})).then(() => console.log('Done'));
"
```

**Step 2: Convert top-level case-2 PNGs**

```bash
node -e "
const sharp = require('sharp');
const files = ['public/images/cases/case-2-character.png', 'public/images/cases/case-2-left.png', 'public/images/cases/case-2-right.png'];
Promise.all(files.map(async f => {
  await sharp(f).webp({ quality: 85 }).toFile(f.replace('.png', '.webp'));
  console.log('Converted: ' + f);
})).then(() => console.log('Done'));
"
```

**Step 3: Update CaseStudy2.tsx references**

In `src/pages/CaseStudy2.tsx`:
- Line 13: `"/images/cases/case-2/decision-1.png"` → `"/images/cases/case-2/decision-1.webp"`
- Line 21: `"/images/cases/case-2/decision-2.png"` → `"/images/cases/case-2/decision-2.webp"`
- Line 28: `"/images/cases/case-2/decision-3.png"` → `"/images/cases/case-2/decision-3.webp"`
- Line 239: `` `/images/cases/case-2/screenshot-${n}.png` `` → `` `/images/cases/case-2/screenshot-${n}.webp` ``
- Line 272: `"/images/cases/case-2/workflow-3d.png"` → `"/images/cases/case-2/workflow-3d.webp"`

**Step 4: Update casesData.ts references**

In `src/data/casesData.ts`:
- Line 56: `"/images/cases/case-2-character.png"` → `"/images/cases/case-2-character.webp"`
- Line 58: `"/images/cases/case-2-left.png"` → `"/images/cases/case-2-left.webp"`
- Line 59: `"/images/cases/case-2-right.png"` → `"/images/cases/case-2-right.webp"`

**Step 5: Delete original PNGs**

```bash
rm -f public/images/cases/case-2/*.png
rm -f public/images/cases/case-2-character.png public/images/cases/case-2-left.png public/images/cases/case-2-right.png
```

---

### Task 7: Convert case-4 PNG images to WebP

**Files:**
- Convert: `public/images/cases/case-4/old-website.png` → `.webp`
- Convert: `public/images/cases/case-4/andrew-avatar.png` → `.webp`
- Convert: `public/images/cases/case-4/research-data-1.png` → `.webp`
- Convert: `public/images/cases/case-4/research-data-2.png` → `.webp`
- Modify: `src/pages/CaseStudy4.tsx` (lines 98, 255, 276, 282)

**Step 1: Convert case-4 PNGs**

```bash
cd "/Users/shkuratovdesigner/Cursor Projects/Portfolio v4"
node -e "
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const dir = 'public/images/cases/case-4';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
Promise.all(files.map(async f => {
  const input = path.join(dir, f);
  const output = path.join(dir, f.replace('.png', '.webp'));
  await sharp(input).webp({ quality: 85 }).toFile(output);
  const oldSize = fs.statSync(input).size;
  const newSize = fs.statSync(output).size;
  console.log(f + ': ' + (oldSize/1024).toFixed(0) + 'K -> ' + (newSize/1024).toFixed(0) + 'K');
})).then(() => console.log('Done'));
"
```

**Step 2: Update CaseStudy4.tsx references**

In `src/pages/CaseStudy4.tsx`:
- Line 98: `"/images/cases/case-4/andrew-avatar.png"` → `"/images/cases/case-4/andrew-avatar.webp"`
- Line 255: `"/images/cases/case-4/old-website.png"` → `"/images/cases/case-4/old-website.webp"`
- Line 276: `"/images/cases/case-4/research-data-1.png"` → `"/images/cases/case-4/research-data-1.webp"`
- Line 282: `"/images/cases/case-4/research-data-2.png"` → `"/images/cases/case-4/research-data-2.webp"`

**Step 3: Delete original PNGs**

```bash
rm -f public/images/cases/case-4/*.png
```

---

### Task 8: Convert content PNG images to WebP

**Files:**
- Convert: `public/images/content/ai-going-to-kill-us.png` → `.webp`
- Convert: `public/images/content/china-drones.png` → `.webp`
- Convert: `public/images/content/LN-2.png` → `.webp`
- Convert: `public/images/content/LN-8.png` → `.webp`
- Convert: `public/images/content/ig-{1..6}.png` → `.webp`
- Modify: `src/data/contentData.ts`

**Step 1: Convert content PNGs**

```bash
cd "/Users/shkuratovdesigner/Cursor Projects/Portfolio v4"
node -e "
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const dir = 'public/images/content';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
Promise.all(files.map(async f => {
  const input = path.join(dir, f);
  const output = path.join(dir, f.replace('.png', '.webp'));
  await sharp(input).webp({ quality: 85 }).toFile(output);
  const oldSize = fs.statSync(input).size;
  const newSize = fs.statSync(output).size;
  console.log(f + ': ' + (oldSize/1024).toFixed(0) + 'K -> ' + (newSize/1024).toFixed(0) + 'K');
})).then(() => console.log('Done'));
"
```

**Step 2: Update contentData.ts references**

In `src/data/contentData.ts`, replace all `.png` with `.webp`:
- Line 39: `ai-going-to-kill-us.png` → `.webp`
- Line 67: `china-drones.png` → `.webp`
- Lines with `LN-2.png`, `LN-8.png` → `.webp`
- Lines 89-94: `ig-1.png` through `ig-6.png` → `.webp`

**Step 3: Delete original PNGs**

```bash
rm -f public/images/content/*.png
```

**Step 4: Verify no broken references**

```bash
grep -n "\.png" src/data/contentData.ts
# Expected: no output
```

---

### Task 9: Convert about photos to WebP

**Files:**
- Convert: `public/images/about/about-{1..9}.jpg` → `.webp`
- Modify: `src/data/aboutData.ts`

**Step 1: Convert about photos to WebP**

Note: These `.jpg` files are actually PNG format internally. Sharp handles this automatically.

```bash
cd "/Users/shkuratovdesigner/Cursor Projects/Portfolio v4"
node -e "
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const dir = 'public/images/about';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));
Promise.all(files.map(async f => {
  const input = path.join(dir, f);
  const output = path.join(dir, f.replace('.jpg', '.webp'));
  await sharp(input).webp({ quality: 85 }).toFile(output);
  const oldSize = fs.statSync(input).size;
  const newSize = fs.statSync(output).size;
  console.log(f + ': ' + (oldSize/1024).toFixed(0) + 'K -> ' + (newSize/1024).toFixed(0) + 'K');
})).then(() => console.log('Done'));
"
```

**Step 2: Update aboutData.ts references**

In `src/data/aboutData.ts`, replace `.jpg` with `.webp` for all about photo paths.

**Step 3: Delete original JPGs**

```bash
rm -f public/images/about/*.jpg
```

---

### Task 10: Convert poster PNG images to WebP

**Files:**
- Convert: `public/images/poster-{cases,about,content,products,experience}.png` → `.webp`

**Step 1: Check if poster .webp files already exist**

The Character component (`src/components/Character/Character.tsx:71`) already references `.webp`:
```ts
const posterSrc = isPosing ? `/images/poster-${state.pose}.webp` : "";
```

```bash
ls public/images/poster-*.webp 2>/dev/null
ls public/images/poster-*.png 2>/dev/null
```

If `.webp` already exists, just delete the `.png` duplicates. If only `.png` exists, convert them.

**Step 2: Convert if needed, delete PNG originals**

```bash
cd "/Users/shkuratovdesigner/Cursor Projects/Portfolio v4"
node -e "
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const dir = 'public/images';
const files = fs.readdirSync(dir).filter(f => f.startsWith('poster-') && f.endsWith('.png'));
if (files.length === 0) { console.log('No poster PNGs to convert'); process.exit(0); }
Promise.all(files.map(async f => {
  const input = path.join(dir, f);
  const webp = path.join(dir, f.replace('.png', '.webp'));
  if (!fs.existsSync(webp)) {
    await sharp(input).webp({ quality: 85 }).toFile(webp);
    console.log('Converted: ' + f);
  } else {
    console.log('WebP already exists: ' + f);
  }
})).then(() => console.log('Done'));
"
```

```bash
rm -f public/images/poster-*.png
```

---

### Task 11: Fix video tags — add preload and poster

**Files:**
- Modify: `src/components/Cases/CaseVideoPreview.tsx:17-24`
- Modify: `src/pages/CaseStudy2.tsx:293-300`

**Step 1: Fix CaseVideoPreview.tsx**

Add `preload="metadata"` and `poster` attribute. The `caseData` object should have a poster source or use the first frame. Check the `CaseData` type for available fields.

Replace lines 17-24:
```tsx
// OLD
<video
  autoPlay
  muted
  loop
  playsInline
  className="w-full h-auto"
  src={caseData.videoSrc}
/>

// NEW
<video
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  poster={caseData.posterSrc}
  className="w-full h-auto"
  src={caseData.videoSrc}
/>
```

**Step 2: Fix CaseStudy2.tsx video tag**

At line 293, add `preload="metadata"` and `poster`:
```tsx
// OLD
<video autoPlay muted loop playsInline className="w-full h-auto" src="/videos/case-2-gif.mp4" />

// NEW
<video
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  poster="/images/cases/case-2-character.webp"
  className="w-full h-auto"
  src="/videos/case-2-gif.mp4"
/>
```

**Step 3: Add preload to CaseStudy4.tsx videos**

At lines 302 and 379, add `preload="metadata"` to both existing `<video>` tags (they already have `poster`).

---

### Task 12: Wrap list components with React.memo

**Files:**
- Modify: `src/components/Products/ProductCard.tsx`
- Modify: `src/components/Cases/CaseVideoPreview.tsx`
- Modify: `src/components/Cases/CaseCinematicMobile.tsx`
- Modify: `src/components/Cases/CaseLottieScatter.tsx`
- Modify: `src/components/Cases/CaseLottieMobile.tsx`

**Step 1: Wrap ProductCard**

In `src/components/Products/ProductCard.tsx`:
```tsx
// Add React import at top
import { memo } from "react";

// Change export:
// OLD: export function ProductCard(...)
// NEW: export const ProductCard = memo(function ProductCard(...)
//   ... body unchanged ...
// Add closing ) after the function
```

**Step 2: Wrap CaseVideoPreview**

Same pattern in `src/components/Cases/CaseVideoPreview.tsx`:
```tsx
import { memo } from "react";
export const CaseVideoPreview = memo(function CaseVideoPreview(...) { ... });
```

**Step 3: Wrap CaseCinematicMobile**

Same pattern in `src/components/Cases/CaseCinematicMobile.tsx`.

**Step 4: Wrap CaseLottieScatter**

Same pattern in `src/components/Cases/CaseLottieScatter.tsx`.

**Step 5: Wrap CaseLottieMobile**

Same pattern in `src/components/Cases/CaseLottieMobile.tsx`.

---

### Task 13: Add image dimensions to prevent CLS

**Files:**
- Modify: All files with `<img>` tags (see list below)

For each image, add `width` and `height` attributes. When images use CSS `w-full h-auto` or fill their container via `object-cover`, use the image's natural dimensions. The browser uses these to calculate aspect ratio before the image loads, preventing layout shift.

**Strategy:** For images inside fixed-ratio containers (`aspect-[5/3]`, etc.), the dimensions serve as aspect ratio hints. For fluid images, they prevent CLS.

**Key images to dimension:**

| File | Line | Image | Dimensions to add |
|------|------|-------|-------------------|
| `ProductCard.tsx` | 42 | Product card image | `width={500} height={300}` (5:3 ratio) |
| `ProductModal.tsx` | 115 | Modal hero | `width={1120} height={630}` |
| `CaseCinematicMobile.tsx` | 20, 23 | Side images | `width={400} height={400}` |
| `CaseCinematicScroll.tsx` | 125, 163, 167 | Side images | `width={400} height={400}` |
| `CaseCinematicScroll.tsx` | 141 | Poster fallback | `width={1920} height={1080}` |
| `Content.tsx` | 42 | YouTube thumb | `width={1280} height={720}` |
| `Content.tsx` | 76 | LinkedIn post | `width={800} height={800}` |
| `Content.tsx` | 87 | Avatar | `width={28} height={28}` |
| `Content.tsx` | 115 | IG reel cover | `width={400} height={711}` (9:16) |
| `Experience.tsx` | 113 | YouTube thumb | `width={1280} height={720}` |
| `About.tsx` | 63+ | Photo grid | Varies per photo, use natural dims |
| `CaseStudy1.tsx` | 68 | Hero | `width={2752} height={1536}` |
| `CaseStudy2.tsx` | 240 | Screenshots | `width={1024} height={768}` |
| `CaseStudy2.tsx` | 276 | Workflow | `width={2048} height={2048}` |
| `CaseStudy4.tsx` | 99 | Avatar | `width={48} height={48}` |
| `CaseStudy4.tsx` | 256 | Old website | `width={1920} height={1080}` |

Note: Get exact dimensions by running `identify` or sharp on each image file. The values above are estimates — verify against actual files.

**Step 1: Get actual image dimensions**

```bash
cd "/Users/shkuratovdesigner/Cursor Projects/Portfolio v4"
node -e "
const sharp = require('sharp');
const files = [
  'public/images/cases/case-1/hero.webp',
  'public/images/cases/case-2/workflow-3d.webp',
  'public/images/cases/case-4/old-website.webp',
  'public/images/cases/case-4/andrew-avatar.webp',
  'public/images/content/avatar.jpg',
];
Promise.all(files.map(async f => {
  try {
    const meta = await sharp(f).metadata();
    console.log(f + ': ' + meta.width + 'x' + meta.height);
  } catch(e) { console.log(f + ': ERROR ' + e.message); }
}));
"
```

**Step 2: Add dimensions to each img tag**

Add `width={W} height={H}` as JSX attributes. The CSS (`w-full h-auto`, `object-cover`) will override the visual size, but the browser uses these as aspect-ratio hints.

---

### Task 14: Add descriptive alt text

**Files:**
- Modify: `src/pages/Content.tsx` (YouTube thumbnails, LinkedIn posts, IG reels, avatar)
- Modify: `src/pages/Experience.tsx` (YouTube thumbnail)
- Modify: `src/components/Cases/CaseCinematicScroll.tsx` (side images, poster)
- Modify: `src/components/Cases/CaseCinematicMobile.tsx` (side images)
- Modify: `src/components/Character/Character.tsx` (poster)
- Modify: `src/components/Products/ProductModal.tsx` (hero image)

**Step 1: Fix alt text for YouTube thumbnails**

In Content.tsx line 42 and Experience.tsx line 113:
```tsx
// OLD: alt=""
// NEW: alt="Video thumbnail"
```

**Step 2: Fix alt text for LinkedIn post images**

In Content.tsx line 76:
```tsx
// OLD: alt=""
// NEW: alt={post.text.substring(0, 80)}
```

**Step 3: Fix alt text for Instagram reel covers**

In Content.tsx line 115:
```tsx
// OLD: alt=""
// NEW: alt={reel.title || "Instagram reel"}
```

**Step 4: Fix alt text for avatar**

In Content.tsx line 87:
```tsx
// OLD: alt=""
// NEW: alt="Evgeny Shkuratov"
```

**Step 5: Fix decorative images**

For side images and poster in CaseCinematicScroll.tsx and CaseCinematicMobile.tsx, the `alt=""` is correct (decorative). Add `aria-hidden="true"` for screen readers.

For Character.tsx poster (line 108), the `alt="" aria-hidden="true"` is already correct.

For ProductModal.tsx hero (line 115):
```tsx
// OLD: alt=""
// NEW: alt={card.name}
```

---

### Task 15: Install vite-plugin-compression and configure Vite

**Files:**
- Modify: `package.json` (add dev dependency)
- Modify: `vite.config.ts`

**Step 1: Install plugin**

```bash
cd "/Users/shkuratovdesigner/Cursor Projects/Portfolio v4"
npm install --save-dev vite-plugin-compression
```

**Step 2: Update vite.config.ts**

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compression({ algorithm: "gzip", threshold: 1024 }),
    compression({ algorithm: "brotliCompress", threshold: 1024 }),
  ],
  resolve: {
    alias: { "@": "/src" },
  },
});
```

---

### Task 16: Harden .gitignore

**Files:**
- Modify: `.gitignore`

**Step 1: Add rules to prevent future root-level media junk**

Append to `.gitignore`:
```gitignore

# Block media files in project root (assets belong in public/)
/*.png
/*.jpg
/*.jpeg
/*.mp4
/*.lottie
/*.docx
/*.svg

# Next.js artifacts (this is a Vite project)
.next/

# OS files
.DS_Store
```

Note: The `/*` prefix means "only in root directory" — won't affect `public/` or `src/`.

---

### Task 17: Build verification

**Step 1: Run TypeScript check + build**

```bash
cd "/Users/shkuratovdesigner/Cursor Projects/Portfolio v4"
npm run build
```

Expected: Build succeeds with zero errors.

**Step 2: Check for broken image references**

```bash
# Find all image paths referenced in code
grep -rn "\.png\|\.jpg" src/ --include="*.ts" --include="*.tsx" | grep -v node_modules | grep -v "\.webp"
```

Expected: Only YouTube thumbnail URLs (external) and SVG-related references. No local `.png` or `.jpg` references remaining.

**Step 3: Start preview and visually verify**

```bash
npm run preview
```

Open in browser and check:
- Home page: character reveals, pose videos play
- Experience page: timeline renders, YouTube embed works
- Products page: cards display with images
- Cases page: all case previews show
- Content page: LinkedIn posts, YouTube, Instagram sections render
- About page: photo grid displays
- Case Study 1-4: all images and videos load

**Step 4: Measure improvement**

```bash
# Check total public/ size
du -sh public/
# Compare dist/ output
npm run build && du -sh dist/
```

---

### Task 18: Provide ffmpeg commands for video re-encoding (manual step)

This task is informational — the user runs these commands manually.

**Videos to re-encode to WebM VP9:**

```bash
# case-1-implementation.mp4 (26MB) → WebM
ffmpeg -i public/videos/case-1-implementation.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -an public/videos/case-1-implementation.webm

# case-2-gif.mp4 (16MB) → WebM
ffmpeg -i public/videos/case-2-gif.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -an public/videos/case-2-gif.webm

# case-1-approval.mp4 (10MB) → WebM
ffmpeg -i public/videos/case-1-approval.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -an public/videos/case-1-approval.webm
```

After re-encoding, update video tags to use `<source>` with WebM first, MP4 fallback.

---

### Task 19: Remove sharp dev dependency (cleanup)

After all image conversions are verified working:

```bash
npm uninstall sharp
```

Sharp was only needed for the one-time PNG → WebP conversion.

---

### Task 20: Commit all changes

```bash
cd "/Users/shkuratovdesigner/Cursor Projects/Portfolio v4"
git add -A
git commit -m "perf: clean repo junk, convert images to WebP, optimize video/image loading

- Delete ~90MB of root validation screenshots, videos, and duplicate dirs
- Delete orphaned public/ images (video-thumbnail, research-mode, final-design)
- Convert 30+ PNG images to WebP (cases, content, about, posters)
- Add preload='metadata' and poster to video tags
- Wrap 5 list components with React.memo
- Add width/height to img tags to prevent CLS
- Add descriptive alt text for accessibility
- Add vite-plugin-compression for gzip/brotli
- Harden .gitignore to block root-level media files"
```

---

## Parallelization Map

These tasks can run concurrently in groups:

**Group 1 (independent, run in parallel):**
- Task 1 + 2 + 3: Junk deletion (one agent)
- Task 4: Install sharp

**Group 2 (depends on Task 4, run in parallel):**
- Task 5: Convert case-1 images
- Task 6: Convert case-2 images
- Task 7: Convert case-4 images
- Task 8: Convert content images
- Task 9: Convert about photos
- Task 10: Convert poster images

**Group 3 (independent of Group 2, run in parallel):**
- Task 11: Fix video tags
- Task 12: React.memo wrappers
- Task 13: Image dimensions
- Task 14: Alt text
- Task 15: Vite compression
- Task 16: .gitignore

**Group 4 (after all above):**
- Task 17: Build verification
- Task 18: ffmpeg commands (informational)
- Task 19: Remove sharp
- Task 20: Commit
