export const CASE3_TITLE =
  "I helped 100,000+ teams communicate 50% more efficiently by designing conversational experiences that feel human, not robotic.";

export const CASE3_SUBTITLE =
  "Working under NDA, I've adapted this case study to showcase my process and thinking while respecting confidentiality";

export const CASE3_PHONES = {
  left: "/images/cases/case-3/phone-left.webp",
  right: "/images/cases/case-3/phone-right.webp",
};

export const CASE3_STICKER_LABEL = "Animated stickers, emojis, and GIFs";

export const CASE3_STICKER_QUOTE =
  'Through 15 interviews with team leads, I discovered 89% of messages were text-only. Users described conversations as "dry" and "impersonal." Teams using more expression reported 30% higher satisfaction';

export interface StyledSegment {
  text: string;
  white?: boolean;
}

export const CASE3_STICKER_DESCRIPTION: StyledSegment[] = [
  { text: "Animation isn't decoration." },
  { text: " In the AI era, people increasingly value", white: true },
  { text: " animated stickers, emojis, and GIFs that add " },
  { text: "personality and emotion to their chat experience", white: true },
];

export interface StickerRow {
  name: string;
  stickers: string[];
}

export const CASE3_STICKER_ROWS: StickerRow[] = [
  {
    name: "devil",
    stickers: [
      "/lottie/stickers/devil/Angry Character.lottie",
      "/lottie/stickers/devil/Devil Contract.lottie",
      "/lottie/stickers/devil/Devil Crying.lottie",
      "/lottie/stickers/devil/Devil Dance.lottie",
      "/lottie/stickers/devil/Devil Girl.lottie",
    ],
  },
  {
    name: "cat",
    stickers: [
      "/lottie/stickers/cat/Banana cat.lottie",
      "/lottie/stickers/cat/Burger cat.lottie",
      "/lottie/stickers/cat/Cappuccino cat.lottie",
      "/lottie/stickers/cat/Jelly cat.lottie",
      "/lottie/stickers/cat/Noodles cat.lottie",
    ],
  },
  {
    name: "turkey",
    stickers: [
      "/lottie/stickers/turkey/Angry.lottie",
      "/lottie/stickers/turkey/Dead Turkey.lottie",
      "/lottie/stickers/turkey/Thanksgiving Cart.lottie",
      "/lottie/stickers/turkey/Thanksgiving Invitation.lottie",
      "/lottie/stickers/turkey/Turkey Crown.lottie",
    ],
  },
];

export const CASE3_FEATURES = [
  "Global and chat search",
  "Scheduled messages",
  "Context menu",
  "Reactions",
  "Voice messages",
  "Voice and video transcription",
];

export const CASE3_SUMMARY_1: StyledSegment[] = [
  { text: "These features represent " },
  { text: "a small selection of my comprehensive, continuous design work that increased user engagement ", white: true },
  { text: "and became a key competitive advantage in enterprise sales" },
];

export const CASE3_SUMMARY_2: StyledSegment[] = [
  { text: "Beyond feature design, I established " },
  { text: "usability testing practices, built design systems, and collaborated with cross-functional teams ", white: true },
  { text: "to ship faster and with higher quality" },
];
