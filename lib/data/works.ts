import { RichText } from '@/lib/types/content';

export interface WorkProject {
  id: number;
  image: string;
  alt: string;
  description: RichText;
  isNDA?: boolean;
  slug?: string;
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
        { text: "Making corporate communication ", bold: true },
        { text: "fast, secure, and delightful for ", bold: false },
        { text: "100K+ people daily", bold: true }
      ],
      slug: "b2b-messenger"
    },
    {
      id: 2,
      image: "/images/works/content-engine.png",
      alt: "Content engine platform interface",
      description: [
        { text: "From 0% to 5% conversion. ", bold: true },
        { text: "Redesigning an ", bold: false },
        { text: "AI content platform ", bold: true },
        { text: "that proved PMF on LinkedIn", bold: false }
      ]
    },
    {
      id: 3,
      image: "/images/works/ad-platform.png",
      alt: "Mobile advertising platform dashboard",
      description: [
        { text: "20% conversion lift. ", bold: true },
        { text: "Transforming a ", bold: false },
        { text: "programmatic advertising platform's ", bold: true },
        { text: "design and trust", bold: false }
      ],
      isNDA: true
    },
    {
      id: 4,
      image: "/images/works/course-constructor.png",
      alt: "Online course constructor and educational marketplace",
      description: [
        { text: "Helping 8M teachers ", bold: true },
        { text: "build, monetize, and grow their ", bold: false },
        { text: "educational content effortlessly", bold: true }
      ],
      isNDA: true
    }
  ]
};
