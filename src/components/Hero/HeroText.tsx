import { useState, useEffect, useRef, useCallback } from "react";
import { HERO_TEXT, getLinesTotalChars } from "@/data/poseTextData";

const TOTAL_CHARS = getLinesTotalChars(HERO_TEXT);
const TARGET_TYPING_DURATION = 1700; // ms — constant speed, finishes ~0.3s after reveal video
const MS_PER_CHAR = Math.max(TARGET_TYPING_DURATION / TOTAL_CHARS, 10);

interface HeroTextProps {
  visible?: boolean;
  startTyping?: boolean;
}

export function HeroText({
  visible = true,
  startTyping = false,
}: HeroTextProps) {
  const [visibleChars, setVisibleChars] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearInterval_ = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Start typing when startTyping becomes true
  useEffect(() => {
    if (!startTyping || typingDone) return;
    if (intervalRef.current) return;

    let chars = 0;
    intervalRef.current = setInterval(() => {
      chars += 1;
      if (chars >= TOTAL_CHARS) {
        clearInterval_();
        setVisibleChars(TOTAL_CHARS);
        setTypingDone(true);
      } else {
        setVisibleChars(chars);
      }
    }, MS_PER_CHAR);

    return () => clearInterval_();
  }, [startTyping, typingDone, clearInterval_]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval_();
  }, [clearInterval_]);

  // After typing is done, render static text (no per-char spans)
  if (typingDone) {
    return (
      <div
        className={`absolute w-[230px] md:w-[247px] left-1/2 -translate-x-1/2 top-[calc(100%+20px)] lg:left-[calc(100%-88px)] lg:translate-x-0 lg:top-[-16px] font-['SF_Pro_Text','-apple-system',BlinkMacSystemFont,sans-serif] text-[14px] md:text-lg leading-[1.3] text-text-secondary text-center lg:text-left transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="mb-3">
          <span>Hey! I{"\u2019"}m Evgeny. </span>
          <span className="text-white font-normal">
            Product Design Engineer who can{"\u2019"}t stop building.
          </span>
        </p>
        <p className="mb-3">Explore.</p>
        <p>This site is me thinking out loud.</p>
      </div>
    );
  }

  // During typing: render character-by-character
  let charIndex = 0;

  return (
    <div
      className={`absolute w-[230px] md:w-[247px] left-1/2 -translate-x-1/2 top-[calc(100%+20px)] lg:left-[calc(100%-88px)] lg:translate-x-0 lg:top-[-16px] font-['SF_Pro_Text','-apple-system',BlinkMacSystemFont,sans-serif] text-[14px] md:text-lg leading-[1.3] text-text-secondary text-center lg:text-left ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {HERO_TEXT.map((line, lineIdx) => {
        const lineContent = line.map((segment, segIdx) => {
          const segmentChars = segment.text.split("").map((char) => {
            const idx = charIndex;
            charIndex += 1;
            if (idx >= visibleChars) return null;
            return (
              <span
                key={idx}
                className={
                  segment.color === "white"
                    ? "text-white font-normal"
                    : "text-text-secondary"
                }
              >
                {char}
              </span>
            );
          });
          return <span key={segIdx}>{segmentChars}</span>;
        });

        return (
          <p
            key={lineIdx}
            className={lineIdx < HERO_TEXT.length - 1 ? "mb-3" : ""}
          >
            {lineContent}
          </p>
        );
      })}
    </div>
  );
}
