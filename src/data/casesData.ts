export interface CaseTitleSegment {
  text: string;
  highlighted: boolean;
}

export interface LottieAsset {
  src: string;
  name: string;
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  size: string;
}

export interface CaseData {
  id: string;
  type: "video" | "cinematic" | "lottie";
  title: CaseTitleSegment[];
  videoSrc?: string;
  frameSrc?: string;
  posterSrc?: string;
  sideImages?: [string, string];
  lottieAssets?: LottieAsset[];
}

export const CASES_HEADLINE =
  "Where Design Thinking Meets AI Engineering";

export const CASES: CaseData[] = [
  {
    id: "mcp-vibe-coding",
    type: "video",
    title: [
      { text: "Designed & engineered a ", highlighted: false },
      { text: "system + MCP to power vibe-coding", highlighted: true },
      { text: " across 3 platforms", highlighted: false },
    ],
    videoSrc: "/videos/case-1-preview.mp4",
  },
  {
    id: "figma-token-plugin",
    type: "cinematic",
    title: [
      { text: "How I solved ", highlighted: false },
      { text: "figma's", highlighted: true },
      { text: " legacy ", highlighted: false },
      { text: "token problem with a custom plugin", highlighted: true },
    ],
    frameSrc: "/videos/case-2-character-anim.mp4",
    posterSrc: "/images/cases/case-2-character.png",
    sideImages: [
      "/images/cases/case-2-left.png",
      "/images/cases/case-2-right.png",
    ],
  },
  {
    id: "b2b-stickers",
    type: "lottie",
    title: [
      { text: "Built ", highlighted: false },
      { text: "animated stickers & GIFs", highlighted: true },
      { text: " that made a B2B messenger more engaging", highlighted: false },
    ],
    lottieAssets: [
      { src: "/lottie/Mocking.lottie", name: "Mocking", position: { top: "181px", left: "0" }, size: "261px" },
      { src: "/lottie/Alien Face.lottie", name: "Alien Face", position: { top: "0", left: "381px" }, size: "198px" },
      { src: "/lottie/Evil Smoking.lottie", name: "Evil Smoking", position: { top: "49px", right: "0" }, size: "224px" },
      { src: "/lottie/Selfie.lottie", name: "Selfie", position: { bottom: "0", left: "597px" }, size: "221px" },
    ],
  },
  {
    id: "ai-seo-startup",
    type: "video",
    title: [
      { text: "From 0% to 5% conversion. ", highlighted: false },
      { text: "Redesigning an AI SEO startup", highlighted: true },
    ],
    videoSrc: "/videos/typing-machine.mp4",
  },
];
