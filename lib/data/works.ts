import { RichText } from '@/lib/types/content';

export interface WorkProject {
  id: number;
  image: string;
  alt: string;
  description: RichText;
  isNDA?: boolean;
}

export interface WorksPageData {
  backLink: {
    text: string;
    href: string;
  };
  hero: {
    title: string;
  };
  projects: WorkProject[];
}

export const worksPageData: WorksPageData = {
  backLink: {
    text: "< Back to main terminal",
    href: "/"
  },
  hero: {
    title: "Case Studies: «Real Projects, Real Results»"
  },
  projects: [
    {
      id: 1,
      image: "/images/works/b2b-messenger.png",
      alt: "B2B messenger app interface showing conversational UI",
      description: [
        { text: "B2B messenger app", bold: true },
        { text: " focused on conversational UI with ", bold: false },
        { text: "over 100,000 daily active users", bold: true }
      ]
    },
    {
      id: 2,
      image: "/images/works/content-engine.png",
      alt: "Content engine platform interface",
      description: [
        { text: "Full-stack content engine ", bold: true },
        { text: "powered by specialized, purpose-trained models", bold: false }
      ]
    },
    {
      id: 3,
      image: "/images/works/ad-platform.png",
      alt: "Mobile advertising platform dashboard",
      description: [
        { text: "Mobile advertising platform ", bold: true },
        { text: "with 90M Unique Users", bold: false }
      ],
      isNDA: true
    },
    {
      id: 4,
      image: "/images/works/course-constructor.png",
      alt: "Online course constructor and educational marketplace",
      description: [
        { text: "Online Course Constructor and Largest educational Marketplace in CIS for 8M teachers", bold: true }
      ],
      isNDA: true
    }
  ]
};
