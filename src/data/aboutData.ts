export interface AboutPhoto {
  src: string;
  alt: string;
}

export type TextSegment =
  | { text: string; white: true }
  | { text: string; white?: false }
  | { text: string; link: string };

export const ABOUT_HEADLINE: TextSegment[] = [
  { text: "I value honesty, courage, and ambition ", white: true },
  { text: "to build truly inspiring products for good. ", white: false },
  { text: "Environmental projects, healthcare, edtech, ", white: true },
  { text: "and anything that helps make the world a better place will always have higher priority for me!", white: false },
];

export const ABOUT_SUBTITLE: TextSegment[] = [
  { text: "I'm the ideal partner for companies building ", white: false },
  { text: "tech for good, AI innovations, and impactful real-world solutions", white: true },
];

export const ABOUT_TEXT_1: TextSegment[] = [
  { text: "As a ", white: false },
  { text: "designer who's built and shipped my own products,", white: true },
  { text: " I understand the pressure to move fast without wasting time on the wrong thing. From discovery to high-fidelity UI in production, ", white: false },
  { text: "I focus on what users need, not what sounds cool", white: true },
];

export const ABOUT_TEXT_2: TextSegment[] = [
  { text: "Outside of work, ", white: false },
  { text: "I like to stay active. I train 5\u20136 times a week.", white: true },
  { text: " It helps me stay productive and optimistic. Recently, I also ", white: false },
  { text: "discovered snowboarding and completely fell in love with it.", white: true },
  { text: " I even bought my own board and gear and took a trip to the mountains in a neighbouring country during my first season", white: false },
];

export const ABOUT_TEXT_3_P1: TextSegment[] = [
  { text: "As you've probably noticed, ", white: false },
  { text: "I love creating content too.", white: true },
  { text: " I share my experience and stories on ", white: false },
  { text: "YouTube", link: "https://www.youtube.com/@EvgenyShkuratovDesigner" },
  { text: " and ", white: false },
  { text: "LinkedIn", link: "https://www.linkedin.com/in/evgeny-shkuratov-b34a99174/" },
];

export const ABOUT_TEXT_3_P2: TextSegment[] = [
  { text: "I help founders and builders like me ", white: false },
  { text: "grow their products and have some fun along the way.", white: true },
];

export const ABOUT_TEXT_3_P3 = "That's what drives most of what I do (\uFF3E\u25BD\uFF3E)";

export const ABOUT_PHOTOS_GRID_1: AboutPhoto[] = [
  { src: "/images/about/about-1.webp", alt: "Evgeny at a conference" },
  { src: "/images/about/about-2.webp", alt: "Portrait of Evgeny" },
  { src: "/images/about/about-3.webp", alt: "Evgeny smiling" },
];

export const ABOUT_PHOTOS_GRID_2: AboutPhoto[] = [
  { src: "/images/about/about-4.webp", alt: "Evgeny snowboarding" },
  { src: "/images/about/about-5.webp", alt: "Evgeny cycling" },
  { src: "/images/about/about-6.webp", alt: "Evgeny outdoors" },
];

export const ABOUT_PHOTOS_GRID_3: AboutPhoto[] = [
  { src: "/images/about/about-7.webp", alt: "Evgeny in winter" },
  { src: "/images/about/about-8.webp", alt: "Evgeny cycling at night" },
  { src: "/images/about/about-9.webp", alt: "Evgeny in the mountains" },
];
