# Products Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a `/products` page with 6 product cards in a 2-column grid, modals for 2 products, and external links for 3 others.

**Architecture:** New page following the Experience page pattern — lazy-loaded route, data-driven cards from a data file, reusable ProductCard and ProductModal components. Same structural pattern: Logo + main content + NavBar + ContactLine.

**Tech Stack:** React 19, TypeScript, Tailwind CSS 4, React Router 7

---

### Task 1: Move product images to public/images/products/

**Files:**
- Move: `products-1.png` through `products-6.png` → `public/images/products/`

**Step 1: Create directory and move files**

```bash
mkdir -p public/images/products
mv products-1.png products-2.png products-3.png products-4.png products-5.png products-6.png public/images/products/
```

**Step 2: Verify files moved**

```bash
ls public/images/products/
```

Expected: all 6 files listed.

**Step 3: Commit**

```bash
git add public/images/products/
git commit -m "chore: move product images to public/images/products/"
```

---

### Task 2: Create productsData.ts

**Files:**
- Create: `src/data/productsData.ts`

**Step 1: Create the data file**

The data file contains card definitions and modal content. Each card has: `id`, `title` (with `name` and `description` parts), `image`, `link` config, and optional `modal` content.

Modal content uses a structured format with typed blocks: `paragraph`, `callout`, `bulletList`, `numberedList`.

```typescript
// src/data/productsData.ts

export type ModalBlock =
  | { type: "paragraph"; text: string }
  | { type: "callout"; text: string }
  | { type: "bulletList"; items: string[] }
  | { type: "numberedList"; items: string[] };

export type ProductCard = {
  id: string;
  name: string;
  description: string;
  image: string;
  link:
    | { type: "modal" }
    | { type: "external"; url: string }
    | { type: "none" };
  modalContent?: {
    heroImage: string;
    blocks: ModalBlock[];
  };
};

export const PRODUCTS_HEADLINE =
  "This is where I experiment, ship, and prove that you can build with AI without cutting corners";

export const PRODUCT_CARDS: ProductCard[] = [
  {
    id: "morning-briefing",
    name: "Morning briefing agent.",
    description: "Personalized news & AI updates",
    image: "/images/products/products-1.png",
    link: { type: "modal" },
    modalContent: {
      heroImage: "/images/products/products-1.png",
      blocks: [
        {
          type: "paragraph",
          text: "Every morning I was losing 30+ minutes scanning the same sources. AI news, dev community, funding rounds, tool releases scattered across 50+ feeds, blogs, and communities. Some days I'd miss something important. Most days I'd waste time on noise.",
        },
        {
          type: "callout",
          text: "So I built an autonomous agent that does it for me.",
        },
        {
          type: "paragraph",
          text: "It pulls from 57 sources — OpenAI, Anthropic, Hacker News, Product Hunt, GitHub Trending, TechCrunch, a16z, Y Combinator, and dozens more... then uses Claude AI to filter, deduplicate, and prioritize what actually matters for me and my work.",
        },
        {
          type: "callout",
          text: "Every morning at 9 AM, I get a curated briefing in Telegram. Five sections:",
        },
        {
          type: "bulletList",
          items: [
            "AI News & Releases",
            "Claude / Anthropic Corner",
            "Dev Community Trending",
            "AI Tip of the Day",
            "Industry Signals",
          ],
        },
        {
          type: "callout",
          text: "How it works:",
        },
        {
          type: "numberedList",
          items: [
            "Fetch — 57 sources pulled in parallel (RSS, APIs, web scraping)",
            "Filter — Claude AI scores relevance, deduplicates, picks top 3-5 per section",
            "Deliver — formatted HTML sent to Telegram, with cloud fallback if my Mac is asleep",
          ],
        },
        {
          type: "paragraph",
          text: "Built with bash, SQLite, Claude Code CLI, and GitHub Actions. Runs on a 15-minute state machine that's smart enough to fetch early, queue the message, and deliver exactly at 9 AM.",
        },
      ],
    },
  },
  {
    id: "youtube-research",
    name: "YouTube research AI agent",
    description: "",
    image: "/images/products/products-2.png",
    link: { type: "modal" },
    modalContent: {
      heroImage: "/images/products/products-2.png",
      blocks: [
        {
          type: "paragraph",
          text: "Before every video, I used to spend hours guessing. Scrolling through YouTube, watching competitors, trying to figure out what works and why. The problem isn't finding videos — it's knowing which ones actually outperformed and what made them blow up.",
        },
        {
          type: "callout",
          text: "I built an agent that finds viral outliers and reverse-engineers why they won.",
        },
        {
          type: "paragraph",
          text: 'It searches YouTube with 3-5 keyword variations, fetches up to 100 videos, then calculates a "multiplier" for each. Video views divided by the channel\'s median views. A video with 200K views on a channel that usually gets 3K? That\'s a 66x outlier. Those are the ones worth studying.',
        },
        {
          type: "paragraph",
          text: "For every qualifying video, it fetches the full transcript and analyzes patterns across all outliers — title formulas, hook structures, emotional triggers, content pacing, optimal length.",
        },
        {
          type: "callout",
          text: "The output is a full strategy report with:",
        },
        {
          type: "bulletList",
          items: [
            "Outlier videos ranked by multiplier (5x, 10x, 20x+)",
            "Title and hook pattern analysis",
            "Content structure breakdowns",
            "Why each video outperformed its channel",
            "Recommended angles, hooks, and structure for your video",
          ],
        },
        {
          type: "callout",
          text: "How it works:",
        },
        {
          type: "numberedList",
          items: [
            "Search — 3-5 keyword variations via YouTube Data API, up to 100 videos",
            "Score — calculate multiplier (views ÷ channel median), filter Shorts, cache channel stats in SQLite",
            "Transcribe — fetch full transcripts for all qualifying outliers",
            "Analyze — Claude AI finds patterns and writes an actionable strategy report",
          ],
        },
        {
          type: "paragraph",
          text: "Built with Python, YouTube Data API, SQLite caching, and Claude Code. Runs ~16 research sessions per day on the free API tier.",
        },
      ],
    },
  },
  {
    id: "figma-plugin",
    name: "Figma plugin",
    description: "for cleaning up legacy design tokens",
    image: "/images/products/products-3.png",
    link: { type: "none" },
  },
  {
    id: "klondaike",
    name: "Klondaike.",
    description: "Curated collection of useful AI resources",
    image: "/images/products/products-4.png",
    link: { type: "external", url: "https://www.klondaike.com/" },
  },
  {
    id: "lullami",
    name: "Lullami.",
    description: "Kids' stories app",
    image: "/images/products/products-5.png",
    link: {
      type: "external",
      url: "https://apps.apple.com/us/app/lullami-bed-time-stories/id6745401906",
    },
  },
  {
    id: "skr-design",
    name: "skr.design.",
    description: "Design agency",
    image: "/images/products/products-6.png",
    link: { type: "external", url: "https://www.skr.design/" },
  },
];
```

**Step 2: Verify build**

```bash
npm run build
```

Expected: builds successfully (unused file, but no type errors).

**Step 3: Commit**

```bash
git add src/data/productsData.ts
git commit -m "feat: add products data file with card definitions and modal content"
```

---

### Task 3: Create ProductCard component

**Files:**
- Create: `src/components/Products/ProductCard.tsx`
- Create: `src/components/Products/index.ts`

**Step 1: Create ProductCard component**

```tsx
// src/components/Products/ProductCard.tsx
import type { ProductCard as ProductCardType } from "@/data/productsData";

interface ProductCardProps {
  card: ProductCardType;
  index: number;
  onOpenModal?: (cardId: string) => void;
  staggerMs: number;
}

export function ProductCard({ card, index, onOpenModal, staggerMs }: ProductCardProps) {
  const handleLearnMore = () => {
    if (card.link.type === "modal") {
      onOpenModal?.(card.id);
    }
  };

  return (
    <div
      className="experience-fade-up flex flex-col"
      style={{ animationDelay: `${(index + 1) * staggerMs}ms` }}
    >
      {/* Image */}
      <div className="w-full aspect-[5/3] rounded-[16px] overflow-hidden bg-white/5">
        <img
          src={card.image}
          alt={`${card.name} ${card.description}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Title */}
      <p className="mt-[24px] text-center font-['TN',serif] font-extralight text-[20px] md:text-[24px] leading-[1.3] tracking-[-0.48px]">
        <span className="text-white">{card.name}</span>
        {card.description && (
          <span className="text-text-secondary"> {card.description}</span>
        )}
      </p>

      {/* Learn more link */}
      {card.link.type === "modal" && (
        <button
          type="button"
          className="mt-[8px] text-accent text-[16px] font-sf cursor-pointer bg-transparent border-none text-center hover:underline"
          onClick={handleLearnMore}
        >
          Learn more
        </button>
      )}
      {card.link.type === "external" && (
        <a
          href={card.link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-[8px] text-accent text-[16px] font-sf text-center hover:underline"
        >
          Learn more
        </a>
      )}
    </div>
  );
}
```

**Step 2: Create barrel export**

```typescript
// src/components/Products/index.ts
export { ProductCard } from "./ProductCard";
```

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add src/components/Products/
git commit -m "feat: add ProductCard component"
```

---

### Task 4: Create ProductModal component

**Files:**
- Create: `src/components/Products/ProductModal.tsx`
- Modify: `src/components/Products/index.ts`

**Step 1: Create ProductModal component**

The modal renders structured content blocks from the data file. It locks body scroll when open, closes on backdrop click / Escape / X button.

```tsx
// src/components/Products/ProductModal.tsx
import { useEffect, useCallback } from "react";
import type { ProductCard } from "@/data/productsData";
import type { ModalBlock } from "@/data/productsData";

interface ProductModalProps {
  card: ProductCard | null;
  onClose: () => void;
}

function ModalBlockRenderer({ block }: { block: ModalBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="font-sf text-[18px] leading-[1.4] text-white">
          {block.text}
        </p>
      );
    case "callout":
      return (
        <div className="bg-white rounded-[8px] px-[12px] pt-[8px] pb-[6px] w-full">
          <p className="font-['TN',serif] font-[350] text-[20px] leading-[1.3] text-black">
            {block.text}
          </p>
        </div>
      );
    case "bulletList":
      return (
        <ul className="list-disc font-sf text-[18px] text-white w-full">
          {block.items.map((item) => (
            <li key={item} className="mb-[6px] ms-[27px] leading-[1.4] last:mb-0">
              {item}
            </li>
          ))}
        </ul>
      );
    case "numberedList":
      return (
        <ol className="font-sf text-[18px] text-white w-full">
          {block.items.map((item, i) => (
            <li key={item} className="mb-[6px] ms-[27px] leading-[1.4] last:mb-0">
              {item}
            </li>
          ))}
        </ol>
      );
  }
}

export function ProductModal({ card, onClose }: ProductModalProps) {
  const isOpen = card !== null && card.modalContent !== undefined;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !card?.modalContent) return null;

  return (
    <div
      className="product-modal-backdrop"
      onClick={onClose}
    >
      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={card.name}
      >
        {/* Close button */}
        <button
          type="button"
          className="absolute top-[16px] right-[16px] z-10 w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Hero image */}
        <div className="w-full max-w-[636px] h-[200px] md:h-[270px] rounded-[16px] overflow-hidden shrink-0 mx-auto">
          <img
            src={card.modalContent.heroImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content blocks */}
        {card.modalContent.blocks.map((block, i) => (
          <ModalBlockRenderer key={i} block={block} />
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Update barrel export**

Add to `src/components/Products/index.ts`:

```typescript
export { ProductCard } from "./ProductCard";
export { ProductModal } from "./ProductModal";
```

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add src/components/Products/
git commit -m "feat: add ProductModal component with structured content blocks"
```

---

### Task 5: Add modal CSS to index.css

**Files:**
- Modify: `src/styles/index.css` (append before `@media (prefers-reduced-motion)` block)

**Step 1: Add modal styles**

Insert before the `@media (prefers-reduced-motion: reduce)` block at the end of the file:

```css
/* ─── Product modal ──────────────────────────────────────── */
.product-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  animation: modalFadeIn 0.25s ease-out forwards;
}

.product-modal {
  position: relative;
  background: #000000;
  border-radius: 24px;
  max-width: 700px;
  width: 100%;
  max-height: calc(100dvh - 32px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 48px 32px;
  animation: modalSlideUp 0.3s ease-out forwards;
}

@media (max-width: 767px) {
  .product-modal {
    padding: 32px 20px;
    max-height: calc(100dvh - 32px);
  }
}

@keyframes modalFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modalSlideUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Step 2: Update reduced-motion block**

Add inside the existing `@media (prefers-reduced-motion: reduce)` block:

```css
.product-modal-backdrop,
.product-modal {
  animation: none;
}
```

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add src/styles/index.css
git commit -m "feat: add product modal CSS animations"
```

---

### Task 6: Create Products page

**Files:**
- Create: `src/pages/Products.tsx`

**Step 1: Create the page component**

Follow the exact Experience page pattern: Logo, main content, NavBar, ContactLine.

```tsx
// src/pages/Products.tsx
import { useState, useEffect, useCallback } from "react";
import { Logo } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { ContactLine } from "@/components/Layout/ContactLine";
import { ProductCard, ProductModal } from "@/components/Products";
import { EXPERIENCE_STAGGER_MS } from "@/constants";
import { PRODUCTS_HEADLINE, PRODUCT_CARDS } from "@/data/productsData";

export function Products() {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Products — Shkuratov Designer";
  }, []);

  const openModal = useCallback((cardId: string) => {
    setActiveModalId(cardId);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModalId(null);
  }, []);

  const activeCard = activeModalId
    ? PRODUCT_CARDS.find((c) => c.id === activeModalId) ?? null
    : null;

  return (
    <div className="relative min-h-screen min-h-dvh w-full bg-black">
      <Logo visible />

      <main className="relative z-10 flex flex-col items-center px-5 md:px-10 pt-[104px] md:pt-[104px] pb-[140px] md:pb-[272px]">
        {/* Headline */}
        <h1 className="experience-fade-up text-[28px] md:text-[48px] leading-[1.2] text-white text-center tracking-[-0.48px] max-w-[765px] mb-[48px] md:mb-[64px] font-['TN',serif] font-extralight">
          {PRODUCTS_HEADLINE}
        </h1>

        {/* Product grid */}
        <section aria-label="Products" className="w-full max-w-[1080px]">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-2 gap-[16px] md:gap-[80px]">
            {PRODUCT_CARDS.map((card, i) => (
              <ProductCard
                key={card.id}
                card={card}
                index={i}
                onOpenModal={openModal}
                staggerMs={EXPERIENCE_STAGGER_MS}
              />
            ))}
          </div>
        </section>
      </main>

      <NavBar visible />
      <ContactLine visible />

      {/* Modal */}
      <ProductModal card={activeCard} onClose={closeModal} />
    </div>
  );
}
```

**Step 2: Verify build**

```bash
npm run build
```

**Step 3: Commit**

```bash
git add src/pages/Products.tsx
git commit -m "feat: add Products page with 2-column card grid and modal"
```

---

### Task 7: Add route and update NavBar

**Files:**
- Modify: `src/App.tsx:4-5,12` — add Products lazy import and route
- Modify: `src/components/NavBar/NavBar.tsx:8,17` — change Products path to `/products`

**Step 1: Update App.tsx**

Add after line 5 (`const Experience = lazy(...)`) :

```typescript
const Products = lazy(() => import("@/pages/Products").then(m => ({ default: m.Products })));
```

Add inside `<Routes>` after the `/experience` route:

```tsx
<Route path="/products" element={<Products />} />
```

**Step 2: Update NavBar.tsx**

Change line 8 in `NAV_ITEMS`:
```typescript
{ label: "Products", pose: "products", path: "/products" },
```

Change line 17 in `MAIN_NAV_ITEMS`:
```typescript
{ label: "Products", pose: "products", path: "/products" },
```

**Step 3: Verify build**

```bash
npm run build
```

**Step 4: Verify dev server**

```bash
npm run dev
```

Open `http://localhost:5173/products` — should see:
- Logo top-left (clicking it goes to `/`)
- Headline centered
- 6 product cards in 2-column grid
- NavBar at bottom with "Products" tab active
- ContactLine visible on desktop
- Cards 1-2 "Learn more" opens modal
- Card 3 has no link
- Cards 4-6 "Learn more" opens in new tab

**Step 5: Commit**

```bash
git add src/App.tsx src/components/NavBar/NavBar.tsx
git commit -m "feat: add /products route and update NavBar Products link"
```

---

### Task 8: Visual polish and cross-browser verification

**Files:**
- Potentially: `src/components/Products/ProductCard.tsx`, `src/styles/index.css`

**Step 1: Check desktop layout**

Open `http://localhost:5173/products` at 1440px+ width:
- Cards should be ~500px wide with ~80px gap
- Title text should be two-tone (white name, gray description)
- "Learn more" in orange accent color
- Staggered fade-up animation on load

**Step 2: Check mobile layout**

Resize to 375px width:
- 2 columns maintained with 16px gap
- Cards scale proportionally
- Images still have 5:3 aspect ratio
- Text readable at smaller size
- Mobile NavBar visible with Products active

**Step 3: Check modals**

- Click "Learn more" on card 1 — modal opens with Morning Briefing content
- Click "Learn more" on card 2 — modal opens with YouTube Research content
- Test all close methods: X button, backdrop click, Escape key
- Verify body scroll is locked when modal open
- Check modal scrolls internally for long content
- Check modal on mobile — nearly full-screen, scrollable

**Step 4: Check external links**

- Card 4 → klondaike.com opens in new tab
- Card 5 → App Store link opens in new tab
- Card 6 → skr.design opens in new tab

**Step 5: Check navigation**

- Click Logo → navigates to Home (`/`)
- NavBar "Experience" → navigates to `/experience`
- NavBar "Products" → shows active state
- From Home, NavBar "Products" → navigates to `/products`

**Step 6: Fix any issues found, commit**

```bash
git add -A
git commit -m "fix: visual polish for Products page"
```
