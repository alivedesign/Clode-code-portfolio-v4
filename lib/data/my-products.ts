import { RichText } from '@/lib/types/content';

export interface MyProductsProject {
  id: number;
  year?: string;
  name: string;
  status: string;
  emoji: string;
  emotionType?: 'sad' | 'work' | 'point';
  isFeatured?: boolean;
  image?: string;
  appStoreLink?: string;
}

export interface MyProductsPageData {
  backLink: {
    text: string;
    href: string;
  };
  hero: {
    title: string;
    subtitle: RichText;
  };
  projects: MyProductsProject[];
}

export const myProductsPageData: MyProductsPageData = {
  backLink: {
    text: "< Back to main terminal",
    href: "/"
  },
  hero: {
    title: "Work with not «just» a designer but a founder too",
    subtitle: [
      "I love creating and solving problems. ",
      { text: "I've built more than seven startups", bold: true },
      " and know exactly what you don't need to do."
    ]
  },
  projects: [
    {
      id: 1,
      year: "2019",
      name: "Cashback service",
      status: "Closed",
      emoji: "(︶︹︺)",
      emotionType: "sad"
    },
    {
      id: 2,
      year: "2021",
      name: "A PWA for booking dishes",
      status: "from local restaurants | Closed",
      emoji: "(；﹏；)",
      emotionType: "sad"
    },
    {
      id: 3,
      year: "2022",
      name: "Online School with AI IDE",
      status: "Closed",
      emoji: "(ノ﹏ヽ)",
      emotionType: "sad"
    },
    {
      id: 4,
      isFeatured: true,
      name: "Lullami kids stories app",
      status: "",
      emoji: "",
      image: "/images/my-products/lullami-cloud.png",
      appStoreLink: "https://apps.apple.com/us/app/lullami-bed-time-stories/id6745401906"
    },
    {
      id: 5,
      year: "2025",
      name: "Vibe-code Agency",
      status: "Currently building...",
      emoji: "(•_•)🔧",
      emotionType: "work"
    },
    {
      id: 6,
      year: "2026",
      name: "Smart AI Proposal Generator",
      status: "Currently building...",
      emoji: "(☞ﾟヮﾟ)☞🔩"
    }
  ]
};
