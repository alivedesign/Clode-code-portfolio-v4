import { HomePageData, TextSegment } from "@/lib/types/content";

export const homepageData: HomePageData = {
  header: {
    name: "Evgeny Shkuratov",
    version: "v5.0.1",
  },
  hero: {
    greeting: "Hello, stranger! Ready to explore?",
    tagline: "Design Thinking 10.5 • Shkuratov Pro /Users/needs/solutions",
    avatarEmoji: "👨‍💻",
  },
  activity: {
    recentTitle: "Recent activity",
    recentActivity: [
      "Launched ",
      { text: "skr.design", link: "https://skr.design" } as TextSegment,
    ],
    whatsNewTitle: "What's new",
    updates: [
      [
        "New video: ",
        { text: "«4 Deadly Stages Every Founder Must Survive»", link: "https://youtu.be/ijcQL4Dd0QY" } as TextSegment,
      ],
      [
        { text: "New Episode", link: "https://www.linkedin.com/posts/evgeny-shkuratov-b34a99174_episode-4-of-redesigning-ai-apps-nobody-asked-activity-7416441375740653569-9fZI?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAClzlBgBnOCW9mmIdKjCWSQps6uG6kE4spo" } as TextSegment,
        " of redesigning AI products"
      ],
      [
        "New Client: ",
        { text: "Andrew White", link: "https://www.linkedin.com/in/andrew-white-ai/" } as TextSegment,
      ],
    ],
    moreLink: "/ info-contact for more",
  },
  footer: "Reach me on LinkedIn or at shkuratovdesigner@gmail.com",
};
