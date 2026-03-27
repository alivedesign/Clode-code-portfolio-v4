import type { CharacterPose } from "@/components/Character";

export type TextSegment = {
  text: string;
  color: "white" | "secondary";
};

export type PoseLine = TextSegment[];

export const POSE_TEXT: Record<CharacterPose, PoseLine[]> = {
  experience: [
    [
      { text: "Before AI", color: "white" },
      { text: " made everyone a builder, ", color: "secondary" },
      { text: "I was already designing products.", color: "white" },
    ],
    [{ text: "Now imagine what I do with it.", color: "secondary" }],
  ],
  products: [
    [
      { text: "Some people have hobbies. ", color: "secondary" },
      { text: "I ship products. Mockups were never enough.", color: "white" },
    ],
    [{ text: "I need to see it live, used, real.", color: "secondary" }],
  ],
  cases: [
    [{ text: "Want to see how I think?", color: "white" }],
    [
      {
        text: "Not just what I design, but how I solve problems. It\u2019s all here.",
        color: "secondary",
      },
    ],
  ],
  content: [
    [{ text: "I share everything I learn.", color: "white" }],
    [
      {
        text: "YouTube deep dives, LinkedIn posts, quick reels.",
        color: "secondary",
      },
    ],
    [{ text: "No gatekeeping", color: "secondary" }],
  ],
  about: [
    [{ text: "Behind the pixels there\u2019s a person.", color: "white" }],
    [{ text: "Values, passions, weird hobbies.", color: "secondary" }],
    [{ text: "Get to know me.", color: "secondary" }],
  ],
  resume: [
    [{ text: "Need the formal version?", color: "white" }],
    [{ text: "Got it.", color: "secondary" }],
    [{ text: "Clean PDF.", color: "secondary" }],
    [{ text: "Opens in a new tab.", color: "secondary" }],
  ],
};

/** Flatten all segments for a pose into total character count */
export function getTotalChars(pose: CharacterPose): number {
  return POSE_TEXT[pose].reduce(
    (sum, line) => sum + line.reduce((s, seg) => s + seg.text.length, 0),
    0
  );
}
