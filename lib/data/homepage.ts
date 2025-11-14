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
    recentActivity: "Redesigning bloggingmachine.io",
    whatsNewTitle: "What's new",
    updates: [
      [
        { text: "New Episode", link: "https://www.linkedin.com/posts/evgeny-shkuratov-b34a99174_ep-3-of-redesigning-random-products-fully-activity-7391847231361875968-zxJ8?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAClzlBgBnOCW9mmIdKjCWSQps6uG6kE4spo" } as TextSegment,
        " of redesigning AI products"
      ],
      [
        "live stream with ",
        { text: "George Kachanouski", link: "https://www.linkedin.com/in/georgekachanouski/" } as TextSegment,
        ": ",
        { text: "«How to create quality AI Content fast»", link: "https://www.youtube.com/watch?v=SzArB0p8WtY" } as TextSegment,
      ],
      [
        "New Client: ",
        { text: "Andrew White", link: "https://www.linkedin.com/in/andrew-white-ai/" } as TextSegment,
      ],
      [
        "New video on my ",
        { text: "YouTube channel", link: "https://www.youtube.com/@EvgenyShkuratovDesigner" } as TextSegment,
      ],
    ],
    moreLink: "/ info-contact for more",
  },
  footer: "Reach me on LinkedIn or at shkuratovdesigner@gmail.com",
};
