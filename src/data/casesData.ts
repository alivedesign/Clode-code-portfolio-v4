export interface CaseTitleSegment {
  text: string;
  highlighted: boolean;
}

export interface CaseData {
  id: string;
  type: "video" | "cinematic";
  title: CaseTitleSegment[];
  videoSrc?: string;
  frameSrc?: string;
  posterSrc?: string;
  sideImages?: [string, string];
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
];
