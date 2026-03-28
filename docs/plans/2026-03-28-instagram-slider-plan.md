# Instagram Slider Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace Instagram embed iframes with self-hosted cover images in an Embla Carousel slider that supports desktop drag + arrow navigation and mobile swipe.

**Architecture:** Remove `useInstagramEmbed` hook and `InstagramCard` blockquote component. Replace with Embla Carousel rendering `<a>` tags containing cover images. Arrow buttons on desktop, swipe on mobile. Data model changes from `string[]` to objects with `reelId` + `cover`.

**Tech Stack:** Embla Carousel (`embla-carousel-react`), React, TypeScript, Tailwind CSS

---

### Task 1: Install Embla Carousel

**Step 1: Install the dependency**

Run: `npm install embla-carousel-react`

**Step 2: Verify installation**

Run: `npm ls embla-carousel-react`
Expected: `embla-carousel-react@x.x.x`

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add embla-carousel-react dependency"
```

---

### Task 2: Add Instagram cover images

**Files:**
- Create: `public/images/content/ig-1.jpg` through `ig-6.jpg`

The user must provide 6 cover images for their Instagram Reels (9:16 aspect ratio, ~300x533px or larger). Name them `ig-1.jpg` through `ig-6.jpg` and place in `public/images/content/`.

**Step 1: Confirm images are in place**

Run: `ls public/images/content/ig-*.jpg`
Expected: 6 files listed

**Step 2: No commit needed** — images will be committed with the data model change.

---

### Task 3: Update data model in contentData.ts

**Files:**
- Modify: `src/data/contentData.ts:83-90`

**Step 1: Replace the INSTAGRAM_REELS array**

Change from:
```ts
export const INSTAGRAM_REELS = [
  "DWZBADwMeH1",
  "DWWHHjwsWpR",
  "DWMCQDlDHGM",
  "DWbkKjuMXkC",
  "DWJYRkzMOn7",
  "DWRM9aVjD5d",
];
```

To:
```ts
export type InstagramReel = {
  reelId: string;
  cover: string;
};

export const INSTAGRAM_REELS: InstagramReel[] = [
  { reelId: "DWZBADwMeH1", cover: "/images/content/ig-1.jpg" },
  { reelId: "DWWHHjwsWpR", cover: "/images/content/ig-2.jpg" },
  { reelId: "DWMCQDlDHGM", cover: "/images/content/ig-3.jpg" },
  { reelId: "DWbkKjuMXkC", cover: "/images/content/ig-4.jpg" },
  { reelId: "DWJYRkzMOn7", cover: "/images/content/ig-5.jpg" },
  { reelId: "DWRM9aVjD5d", cover: "/images/content/ig-6.jpg" },
];
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: Errors in Content.tsx (expected — we haven't updated it yet). No errors in contentData.ts itself.

**Step 3: Commit**

```bash
git add src/data/contentData.ts public/images/content/ig-*.jpg
git commit -m "feat: add Instagram reel cover images and update data model"
```

---

### Task 4: Delete useInstagramEmbed hook

**Files:**
- Delete: `src/hooks/useInstagramEmbed.ts`

**Step 1: Delete the file**

Run: `rm src/hooks/useInstagramEmbed.ts`

**Step 2: No commit yet** — will commit together with the Content.tsx update in Task 5.

---

### Task 5: Rewrite Instagram section in Content.tsx

**Files:**
- Modify: `src/pages/Content.tsx`

**Step 1: Update imports**

Remove:
```ts
import { useInstagramEmbed } from "@/hooks/useInstagramEmbed";
```

Add:
```ts
import useEmblaCarousel from "embla-carousel-react";
import type { InstagramReel } from "@/data/contentData";
```

Also update the `INSTAGRAM_REELS` import — it's already imported, just ensure the type is used correctly since it's now an array of objects.

**Step 2: Remove the old InstagramCard component (lines 106-128)**

Delete the entire `InstagramCard` function.

**Step 3: Add the new InstagramSlider component**

Add this component above the `Content` function:

```tsx
/* ── Instagram cover card (links to Reel) ── */
function InstagramCoverCard({ reel }: { reel: InstagramReel }) {
  return (
    <a
      href={`https://www.instagram.com/reel/${reel.reelId}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="block shrink-0 w-[200px] md:w-[300px] h-[356px] md:h-[533px] rounded-[24px] overflow-hidden group"
    >
      <img
        src={reel.cover}
        alt=""
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        loading="lazy"
      />
    </a>
  );
}

/* ── Instagram carousel with Embla ── */
function InstagramSlider({ reels }: { reels: InstagramReel[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Embla viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-[20px] md:gap-[40px]">
          {reels.map((reel) => (
            <InstagramCoverCard key={reel.reelId} reel={reel} />
          ))}
        </div>
      </div>

      {/* Prev arrow — desktop only */}
      {canScrollPrev && (
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          className="hidden md:flex absolute left-[-48px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Scroll left"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      {/* Next arrow — desktop only */}
      {canScrollNext && (
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          className="hidden md:flex absolute right-[-48px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Scroll right"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}
```

**Step 4: Update the Instagram section in the Content component**

Replace lines 199-224 (the Instagram section) with:

```tsx
{/* ── Instagram Section ── */}
<section
  ref={instagramRef}
  className={`experience-scroll-reveal${instagramVisible ? " visible" : ""} w-full max-w-[1280px] mt-[80px] md:mt-[112px]`}
  aria-label="Instagram reels"
>
  <InstagramSlider reels={INSTAGRAM_REELS} />
  <div className="text-center mt-[40px] md:mt-[56px]">
    <a
      href={INSTAGRAM_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="font-sf text-[18px] leading-[1.4] text-accent hover:underline"
    >
      More on Instagram
    </a>
  </div>
</section>
```

**Step 5: Remove the `useInstagramEmbed` call**

Delete this line from the Content component:
```ts
useInstagramEmbed(instagramVisible);
```

**Step 6: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 7: Verify dev server runs**

Run: `npm run dev`
Open browser, navigate to `/content`, scroll to Instagram section. Verify:
- Cover images render in a horizontal carousel
- Drag to scroll works on desktop
- Arrow buttons appear and work
- Arrows hide when at start/end
- Cards link to correct Instagram Reel URLs
- Mobile: swipe works, no arrow buttons

**Step 8: Commit**

```bash
git add src/pages/Content.tsx src/hooks/useInstagramEmbed.ts
git commit -m "feat: replace Instagram embeds with self-hosted cover carousel"
```

---

### Task 6: Build verification

**Step 1: Run production build**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 2: Preview production build**

Run: `npm run preview`
Expected: Instagram carousel works identically to dev mode

**Step 3: Commit (if any fixes were needed)**
