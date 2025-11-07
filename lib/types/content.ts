export interface HeaderData {
  name: string;
  version: string;
}

export interface HeroData {
  greeting: string;
  tagline: string;
  avatarEmoji: string;
}

export interface TextSegment {
  text: string;
  link?: string;
}

export type RichText = (string | TextSegment)[];

export interface ActivityData {
  recentTitle: string;
  recentActivity: string;
  whatsNewTitle: string;
  updates: RichText[];
  moreLink: string;
}

export interface HomePageData {
  header: HeaderData;
  hero: HeroData;
  activity: ActivityData;
  footer: string;
}
