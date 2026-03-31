export interface PersonaSegment {
  content: string;
  white: boolean;
}

export interface PersonaCard {
  text: PersonaSegment[];
}

export const PERSONAS_LEFT: PersonaCard[] = [
  {
    text: [
      { content: "Startup founders", white: true },
      {
        content:
          " who understand the value of SEO but don't have resources to do research and writing of blog articles",
        white: false,
      },
    ],
  },
  {
    text: [
      {
        content:
          "AI SEO blog writer cranks out human-like, SEO-optimized articles at scale",
        white: false,
      },
    ],
  },
  {
    text: [
      {
        content: "Sit back, relax, and watch your organic traffic grow",
        white: true,
      },
      { content: " 10x. Start now", white: false },
    ],
  },
];

export const PERSONAS_CENTER: PersonaCard[] = [
  {
    text: [
      {
        content:
          "Most early-stage founders know they need SEO but don't have the time to do it right.",
        white: true,
      },
      {
        content:
          " Blogging Machine handles everything from keyword research to writing and publishing, so you get high-intent traffic with zero effort.",
        white: false,
      },
    ],
  },
  {
    text: [
      { content: "More Traffic. Zero Effort. ", white: true },
      { content: "Powered by Your AI Agent", white: false },
    ],
  },
];

export const PERSONAS_RIGHT: PersonaCard[] = [
  {
    text: [
      {
        content:
          "Seed-to-Series B founders and scrappy solo marketers who know SEO's worth",
        white: true,
      },
      {
        content:
          " but don't want to waste headcount, weekends, or runway on it",
        white: false,
      },
    ],
  },
  {
    text: [
      {
        content: "Your AI Agent is like a 5-people content team.",
        white: true,
      },
      { content: " Minus the coffee breaks.", white: false },
    ],
  },
];
