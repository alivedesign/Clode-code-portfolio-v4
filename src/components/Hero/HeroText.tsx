import { useState, useEffect, useRef, useCallback } from "react";
import { HERO_TEXT, getLinesTotalChars } from "@/data/poseTextData";

const BASE_MS_PER_CHAR = 35;
const FINISH_AFTER_VIDEO_MS = 300;
const TOTAL_CHARS = getLinesTotalChars(HERO_TEXT);

interface HeroTextProps {
  visible?: boolean;
  startTyping?: boolean;
  revealComplete?: boolean;
}

export function HeroText({
  visible = true,
  startTyping = false,
  revealComplete = false,
}: HeroTextProps) {
  const [visibleChars, setVisibleChars] = useState(0);
  const [typingDone, setTypingDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const visibleCharsRef = useRef(0);

  const clearInterval_ = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const runInterval = useCallback(
    (startFrom: number, total: number, msPerChar: number) => {
      let chars = startFrom;
      intervalRef.current = setInterval(() => {
        chars += 1;
        visibleCharsRef.current = chars;
        if (chars >= total) {
          clearInterval_();
          setVisibleChars(total);
          setTypingDone(true);
        } else {
          setVisibleChars(chars);
        }
      }, msPerChar);
    },
    [clearInterval_]
  );

  // Start typing when startTyping becomes true
  useEffect(() => {
    if (!startTyping || typingDone) return;
    if (intervalRef.current) return; // already running

    visibleCharsRef.current = 0;
    runInterval(0, TOTAL_CHARS, BASE_MS_PER_CHAR);

    return () => clearInterval_();
  }, [startTyping, typingDone, runInterval, clearInterval_]);

  // Accelerate when reveal video ends
  useEffect(() => {
    if (!revealComplete || !intervalRef.current) return;

    const remaining = TOTAL_CHARS - visibleCharsRef.current;
    if (remaining <= 0) return;

    clearInterval_();
    const msPerChar = Math.max(FINISH_AFTER_VIDEO_MS / remaining, 10);
    runInterval(visibleCharsRef.current, TOTAL_CHARS, msPerChar);
  }, [revealComplete, runInterval, clearInterval_]);

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
