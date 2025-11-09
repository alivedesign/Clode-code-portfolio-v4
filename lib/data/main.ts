import { RichText, TextSegment } from "@/lib/types/content";

export interface StatItem {
  value: string;
  label: string;
}

export interface WorkExperienceItem {
  period: string;
  role: string;
  company: string;
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
  workExperience: WorkExperienceItem[];
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
      { text: "refuse to look generic.", link: undefined },
      " I design mobile & web apps that ",
      { text: "solve real problems,", link: undefined },
      " not collect features",
    ],
    stats: [
      { value: "9", label: "Years of experience" },
      { value: "30 +", label: "Client Products launched" },
      { value: "7", label: "launches of my own products" },
    ],
  },
  workExperience: [
    {
      period: "2024 — ✦",
      role: "Product Designer @",
      company: "B2B messenger app with 100 000+ daily users",
    },
    {
      period: "2024 — 2025",
      role: "Product Designer @",
      company: "HyperADX. Smart Programmatic Platform. 4.5 B Advertising requests",
    },
    {
      period: "2023 — 2024",
      role: "Lead Product Designer @",
      company: "Edtech platform with 15M+ user",
    },
    {
      period: "2020 — 2023",
      role: "Senior Product Designer @",
      company: "Edtech platform with 15M+ user",
    },
    {
      period: "2018 — 2019",
      role: "UX/UI Designer @",
      company: "ITMINT",
    },
  ],
  footer: [
    "Reach me on ",
    { text: "LinkedIn", link: "https://www.linkedin.com/in/shkuratovdesigner/" },
    " or at shkuratovdesigner@gmail.com",
  ],
};
