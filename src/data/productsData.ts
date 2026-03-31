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
    | { type: "internal"; url: string }
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
    image: "/images/products/products-1.webp",
    link: { type: "modal" },
    modalContent: {
      heroImage: "/images/products/products-modal1.webp",
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
    image: "/images/products/products-2.webp",
    link: { type: "modal" },
    modalContent: {
      heroImage: "/images/products/products-modal2.webp",
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
    image: "/images/products/products-3.webp",
    link: { type: "internal", url: "/cases/figma-token-plugin" },
  },
  {
    id: "klondaike",
    name: "Klondaike.",
    description: "Curated collection of useful AI resources",
    image: "/images/products/products-4.webp",
    link: { type: "external", url: "https://www.klondaike.com/" },
  },
  {
    id: "lullami",
    name: "Lullami.",
    description: "Kids' stories app",
    image: "/images/products/products-5.webp",
    link: {
      type: "external",
      url: "https://apps.apple.com/us/app/lullami-bed-time-stories/id6745401906",
    },
  },
  {
    id: "skr-design",
    name: "skr.design.",
    description: "Design agency",
    image: "/images/products/products-6.webp",
    link: { type: "external", url: "https://www.skr.design/" },
  },
];
