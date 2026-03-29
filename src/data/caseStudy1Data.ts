export const CASE1_TITLE = "From figma chaos to AI-powered design infrastructure";

export const CASE1_SUBTITLE_SEGMENTS = [
  { text: "How I architected a cross-platform design system with MCP servers that ", highlighted: false },
  { text: "cut feature development time by ≈35%", highlighted: true },
  { text: " across iOS, Android, and Web", highlighted: false },
];

export const CASE1_HERO_IMAGE = "/images/cases/case-1/hero.png";

export const CASE1_PROBLEM = {
  label: "The Problem",
  heading: "7+ Designers, 3 Platforms, 0 Consistency",
  images: [
    "/images/cases/case-1/problem-1.png",
    "/images/cases/case-1/problem-2.png",
    "/images/cases/case-1/problem-3.png",
  ],
  points: [
    {
      bold: "Static mockups, guessing devs.",
      body: " Components drifted every sprint. Animations described in words.",
    },
    {
      bold: "50% meetings, 0% clarity.",
      body: " Every feature turned into \"is this what you meant?\" Figma couldn't communicate behavior, so humans filled the gap.",
    },
    {
      bold: "Figma doesn't scale fast enough.",
      body: " 5 brands. 3 platforms. 2 modes. Dozens of states. No amount of file organization survives that.",
    },
  ],
};

export interface TimelineStep {
  label: string;
  side: "left" | "right";
  media: { type: "image"; src: string } | { type: "video"; src: string; webm?: string; poster?: string };
}

export const CASE1_TIMELINE: TimelineStep[] = [
  {
    label: "Initial observation / problem identification",
    side: "left",
    media: { type: "image", src: "/images/cases/case-1/timeline-1.png" },
  },
  {
    label: "Solution design / architecture planning",
    side: "right",
    media: {
      type: "video",
      src: "/videos/bloggingmachine-case/research.mp4",
      webm: "/videos/bloggingmachine-case/research.webm",
      poster: "/videos/bloggingmachine-case/research-poster.webp",
    },
  },
  {
    label: "Internal pitch to leadership",
    side: "left",
    media: { type: "image", src: "/images/cases/case-1/timeline-3.png" },
  },
  {
    label: "Approval + budget secured",
    side: "right",
    media: { type: "video", src: "/videos/case-1-approval.mp4" },
  },
  {
    label: "First implementation",
    side: "left",
    media: { type: "video", src: "/videos/case-1-implementation.mp4" },
  },
  {
    label: "Full team adoption",
    side: "right",
    media: { type: "image", src: "/images/cases/case-1/timeline-6.png" },
  },
];

export interface DecisionCard {
  image: string;
  paragraphs: string[];
}

export const CASE1_DECISIONS: DecisionCard[] = [
  {
    image: "/images/cases/case-1/decision-1.png",
    paragraphs: [
      "One repository. Three platforms. Automatic sync every 6 hours.",
      "Figma feeds the hub. The hub builds for:\n- IOS (Swift Package)\n- Android (GitHub Releases)\n- Web (npm)",
      "400 icons and 157 color tokens across 5 brands never drift again.",
    ],
  },
  {
    image: "/images/cases/case-1/decision-2.png",
    paragraphs: [
      "Figma prototypes approximate. Code prototypes specify.",
      "We build interactive prototypes on the real tech stack now. Exact animations. Exact parameters. Exact behavior.",
      "Developers copy. They don't guess.",
    ],
  },
  {
    image: "/images/cases/case-1/decision-3.png",
    paragraphs: [
      "4 MCP servers. 15 tools. The entire design system queryable by AI in real-time.",
      "Claude Code searches existing components before building new ones. Uses only library icons. References only design tokens. Follows component specs automatically.",
      "AI that builds with the system, not around it.",
    ],
  },
];

export const CASE1_YOUTUBE_VIDEO_ID = "UYrKmNq_fS4";
export const CASE1_YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${CASE1_YOUTUBE_VIDEO_ID}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`;

export const CASE1_VIDEO_TABS = [
  "Automated legacy figma sync",
  "Cross-Platform component galleries",
  "MCP server architecture",
];

export const CASE1_QUOTE =
  "The system is still compounding. As the team gets more native with the infrastructure, every metric continues to improve.";

export interface MetricCard {
  value: string;
  label: string;
}

export const CASE1_METRICS: MetricCard[] = [
  { value: "≈35% faster", label: "Feature development speed" },
  { value: "≈50% less time", label: "Handoff meetings with QA/BA" },
  { value: "≈85%", label: "Features shipped through pipeline" },
  { value: "≈25% more", label: "Overall feature output" },
];
