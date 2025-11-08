import { RichText, TextSegment } from "@/lib/types/content";

export interface StatItem {
  value: string;
  label: string;
}

export interface MainPageData {
  backLink: {
    text: string;
    href: string;
  };
  hero: {
    headline: string;
    description: RichText;
    stats: StatItem[];
  };
  footer: RichText;
}

export const mainPageData: MainPageData = {
  backLink: {
    text: "< Back to main terminal",
    href: "/",
  },
  hero: {
    headline: "Product Designer leveraging AI to build apps focused on what users actually need",
    description: [
      "For founders who ",
      { text: "refuse to look generic.", link: undefined } as TextSegment,
      " I design mobile & web apps that ",
      { text: "solve real problems,", link: undefined } as TextSegment,
      " not collect features",
    ],
    stats: [
      { value: "9", label: "Years of experience" },
      { value: "30 +", label: "Client Products launched" },
      { value: "7", label: "launches of my own products" },
    ],
  },
  footer: [
    "Reach me on ",
    { text: "LinkedIn", link: "https://www.linkedin.com/in/shkuratovdesigner/" } as TextSegment,
    " or at shkuratovdesigner@gmail.com",
  ],
};
