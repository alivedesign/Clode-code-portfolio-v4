# Content Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Content page with 3 sections (YouTube, LinkedIn, Instagram) showcasing Evgeny's content creation across platforms.

**Architecture:** Scrollable page matching Experience page patterns. YouTube uses thumbnail-to-iframe swap. LinkedIn uses native embed iframes in a masonry layout. Instagram uses embed.js script with blockquote elements. All heavy embeds are lazy-loaded via useInView.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, React Router 7

---

### Task 1: Create content data file

**Files:**
- Create: `src/data/contentData.ts`

**Step 1: Create the data file with all content IDs and URLs**

```typescript
export const CONTENT_HEADLINE =
  "Content is my practice. It keeps me curious, sharp, and honest about what I know";

export const YOUTUBE_VIDEOS = [
  { id: "mhVlloJv9p8" },
  { id: "NGDStQosFf4" },
  { id: "_PjGMbGSlHA" },
  { id: "_j-mglGJGk0" },
];

export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@evgeny.shkuratov";

export const LINKEDIN_POSTS = [
  "7413157359788756992",
  "7438905592041127937",
  "7429913849069441024",
  "7441102567981408257",
  "7431325647488045057",
  "7440015423317770241",
  "7442922082499248129",
  "7420842828630573056",
];

export const LINKEDIN_PROFILE_URL =
  "https://www.linkedin.com/in/evgeny-shkuratov-b34a99174/";

export const INSTAGRAM_REELS = [
  "DWZBADwMeH1",
  "DWWHHjwsWpR",
  "DWMCQDlDHGM",
  "DWbkKjuMXkC",
  "DWJYRkzMOn7",
  "DWRM9aVjD5d",
];

export const INSTAGRAM_PROFILE_URL =
  "https://www.instagram.com/evgeny.shkuratov/";
```

**Step 2: Commit**

```bash
git add src/data/contentData.ts
git commit -m "feat: add content data for YouTube, LinkedIn, Instagram"
```

---

### Task 2: Create Instagram embed hook

**Files:**
- Create: `src/hooks/useInstagramEmbed.ts`

**Step 1: Create the hook**

This hook loads Instagram's embed.js script once, then calls `process()` to render blockquotes into embeds. It re-processes when dependencies change (e.g., after React mounts new blockquotes).

```typescript
import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

export function useInstagramEmbed(shouldLoad: boolean) {
  useEffect(() => {
    if (!shouldLoad) return;

    // If script already loaded, just re-process
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => {
      window.instgrm?.Embeds.process();
    };
    document.body.appendChild(script);

    return () => {
      // Don't remove script — it's idempotent and removing causes issues
    };
  }, [shouldLoad]);
}
```

**Step 2: Commit**

```bash
git add src/hooks/useInstagramEmbed.ts
git commit -m "feat: add useInstagramEmbed hook for lazy script loading"
```

---

### Task 3: Create Content page component

**Files:**
- Create: `src/pages/Content.tsx`

**Step 1: Build the full Content page**

```tsx
import { useState, useEffect } from "react";
import { Logo } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { ContactLine } from "@/components/Layout/ContactLine";
import { useInView } from "@/hooks/useInView";
import { useInstagramEmbed } from "@/hooks/useInstagramEmbed";
import {
  CONTENT_HEADLINE,
  YOUTUBE_VIDEOS,
  YOUTUBE_CHANNEL_URL,
  LINKEDIN_POSTS,
  LINKEDIN_PROFILE_URL,
  INSTAGRAM_REELS,
  INSTAGRAM_PROFILE_URL,
} from "@/data/contentData";

/* ── YouTube thumbnail card ── */
function YouTubeCard({ videoId }: { videoId: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative w-full rounded-[24px] overflow-hidden" style={{ paddingBottom: "56.25%" }}>
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`}
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="absolute inset-0 w-full h-full cursor-pointer bg-black group"
          onClick={() => setPlaying(true)}
          aria-label="Play video"
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <svg
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[68px] h-[48px] opacity-80 group-hover:opacity-100 transition-opacity"
            viewBox="0 0 68 48"
            aria-hidden="true"
          >
            <path
              d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
              fill="#FF0000"
            />
            <path d="M45 24L27 14v20" fill="#fff" />
          </svg>
        </button>
      )}
    </div>
  );
}

/* ── LinkedIn embed card ── */
function LinkedInCard({ activityId }: { activityId: string }) {
  return (
    <div className="break-inside-avoid mb-[22px]">
      <iframe
        src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityId}`}
        className="w-full rounded-[9px]"
        height="450"
        frameBorder="0"
        allowFullScreen
        title="LinkedIn post"
        loading="lazy"
      />
    </div>
  );
}

/* ── Instagram embed card ── */
function InstagramCard({ reelId }: { reelId: string }) {
  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={`https://www.instagram.com/reel/${reelId}/`}
      data-instgrm-version="14"
      style={{
        background: "transparent",
        border: 0,
        borderRadius: 24,
        margin: 0,
        padding: 0,
        minWidth: 0,
        maxWidth: "none",
        width: 300,
      }}
    >
      <a href={`https://www.instagram.com/reel/${reelId}/`} target="_blank" rel="noopener noreferrer">
        View on Instagram
      </a>
    </blockquote>
  );
}

/* ── Main Content page ── */
export function Content() {
  const [youtubeRef, youtubeVisible] = useInView(0.1);
  const [linkedinRef, linkedinVisible] = useInView(0.1);
  const [instagramRef, instagramVisible] = useInView(0.1);

  useInstagramEmbed(instagramVisible);

  useEffect(() => {
    document.title = "Content — Shkuratov Designer";
  }, []);

  return (
    <div className="relative min-h-screen min-h-dvh w-full bg-black">
      <Logo visible />

      <main className="relative z-10 flex flex-col items-center px-5 md:px-10 pt-[104px] pb-[164px] md:pb-[320px]">
        {/* Headline */}
        <h1 className="experience-fade-up text-[28px] md:text-[48px] leading-[1.2] text-white text-center tracking-[-0.48px] max-w-[827px] mb-[48px] md:mb-[64px] font-['TN',serif] font-extralight">
          {CONTENT_HEADLINE}
        </h1>

        {/* ── YouTube Section ── */}
        <section
          ref={youtubeRef}
          className={`experience-scroll-reveal${youtubeVisible ? " visible" : ""} w-full max-w-[1280px]`}
          aria-label="YouTube videos"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[32px]">
            {YOUTUBE_VIDEOS.map((video) => (
              <YouTubeCard key={video.id} videoId={video.id} />
            ))}
          </div>
          <div className="text-center mt-[40px] md:mt-[56px]">
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sf text-[18px] leading-[1.4] text-accent hover:underline"
            >
              More on YouTube
            </a>
          </div>
        </section>

        {/* ── LinkedIn Section ── */}
        <section
          ref={linkedinRef}
          className={`experience-scroll-reveal${linkedinVisible ? " visible" : ""} w-full max-w-[1280px] mt-[80px] md:mt-[112px]`}
          aria-label="LinkedIn posts"
        >
          {linkedinVisible && (
            <div className="columns-1 md:columns-4 gap-[22px]">
              {LINKEDIN_POSTS.map((id) => (
                <LinkedInCard key={id} activityId={id} />
              ))}
            </div>
          )}
          <div className="text-center mt-[40px] md:mt-[56px]">
            <a
              href={LINKEDIN_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sf text-[18px] leading-[1.3] text-accent hover:underline"
            >
              More on LinkedIn
            </a>
          </div>
        </section>

        {/* ── Instagram Section ── */}
        <section
          ref={instagramRef}
          className={`experience-scroll-reveal${instagramVisible ? " visible" : ""} w-full max-w-[1280px] mt-[80px] md:mt-[112px]`}
          aria-label="Instagram reels"
        >
          {instagramVisible && (
            <div className="flex gap-[20px] md:gap-[40px] overflow-x-auto pb-4 scrollbar-hide">
              {INSTAGRAM_REELS.map((id) => (
                <div key={id} className="shrink-0">
                  <InstagramCard reelId={id} />
                </div>
              ))}
            </div>
          )}
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
      </main>

      <NavBar visible />
      <ContactLine visible />
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/pages/Content.tsx
git commit -m "feat: add Content page with YouTube, LinkedIn, Instagram sections"
```

---

### Task 4: Add scrollbar-hide CSS utility

**Files:**
- Modify: `src/styles/index.css`

**Step 1: Add scrollbar-hide class**

Add at the end of `src/styles/index.css`:

```css
/* Hide scrollbar for horizontal scroll containers */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

**Step 2: Commit**

```bash
git add src/styles/index.css
git commit -m "feat: add scrollbar-hide CSS utility"
```

---

### Task 5: Wire up routing and NavBar

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/NavBar/NavBar.tsx`

**Step 1: Add Content route to App.tsx**

Add lazy import after line 11 (Cases import):
```typescript
const Content = lazy(() => import("@/pages/Content").then(m => ({ default: m.Content })));
```

Add route inside `<Routes>` after the `/cases` route:
```tsx
<Route path="/content" element={<Content />} />
```

**Step 2: Update NavBar paths**

In `src/components/NavBar/NavBar.tsx`:

Change NAV_ITEMS line 10 from:
```typescript
  { label: "Content", pose: "content", path: "/" },
```
to:
```typescript
  { label: "Content", pose: "content", path: "/content" },
```

Change MENU_NAV_ITEMS line 22 from:
```typescript
  { label: "Content", path: "/" },
```
to:
```typescript
  { label: "Content", path: "/content" },
```

**Step 3: Commit**

```bash
git add src/App.tsx src/components/NavBar/NavBar.tsx
git commit -m "feat: wire up /content route and update NavBar links"
```

---

### Task 6: Visual verification

**Step 1: Run dev server**

```bash
npm run dev
```

**Step 2: Verify in browser**

- Navigate to `http://localhost:5173/content`
- Check: headline renders with TN font
- Check: YouTube thumbnails display in 2x2 grid (desktop) / 1 column (mobile)
- Check: clicking a YouTube thumbnail plays the video
- Check: scrolling down loads LinkedIn embeds in masonry layout
- Check: scrolling further loads Instagram embeds in horizontal scroll
- Check: "More on..." links work and open in new tabs
- Check: NavBar, Logo, ContactLine all present
- Check: NavBar "Content" tab navigates correctly
- Check mobile layout by resizing browser

**Step 3: Run build to verify no TypeScript errors**

```bash
npm run build
```

Expected: clean build with no errors.

**Step 4: Commit any fixes if needed**

---

### Task 7: Final polish and commit

**Step 1: Check cross-browser rules from CLAUDE.md**

- Verify `playsInline` on any video elements (YouTube uses iframe, so N/A)
- Verify no `filter: drop-shadow` on parents of `backdrop-filter` children
- Verify `h-screen h-dvh` pattern used (already using `min-h-screen min-h-dvh`)

**Step 2: Final commit**

```bash
git add -A
git commit -m "feat: complete Content page — YouTube, LinkedIn, Instagram"
```
