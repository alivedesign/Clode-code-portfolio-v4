import { useState, useEffect } from "react";
import { useInView } from "@/hooks/useInView";
import { CASE1_DECISIONS } from "@/data/caseStudy1Data";
import type { DecisionCard } from "@/data/caseStudy1Data";

/*
  Figma "3 decisions" section (node 4114:52, container 1280×704):
  Title: centered, top-0
  Left arrow:   left-196, top-41,  154.5×115.5
  Right arrow:  left-929, top-41,  154.5×115.5 (horizontally mirrored)
  Center arrow: left-638, top-157, 7.4×137.5  (vertical with arrowhead)
  Images:
    Left:   left-0,   top-187, 350×350
    Center: centered,  top-354, 350×350
    Right:  left-930, top-187, 350×350
*/

/* Figma-exported arrow paths */
const ARROW_LEFT_PATH = "M157.5 1C157.78 0.98 157.98 0.74 157.96 0.46C157.94 0.19 157.7-0.02 157.42 0L157.46 0.5L157.5 1ZM2.54 116.27C2.69 116.5 3 116.57 3.24 116.42L7 113.96C7.23 113.81 7.3 113.5 7.15 113.27C7 113.03 6.69 112.97 6.46 113.12L3.11 115.31L0.92 111.96C0.77 111.73 0.46 111.66 0.23 111.81C0 111.97-0.07 112.28 0.08 112.51L2.54 116.27ZM157.46 0.5L157.42 0C135.28 1.76 100.98 9.65 70 27.63C39.01 45.62 11.31 73.72 2.47 115.9L2.96 116L3.45 116.1C12.21 74.28 39.68 46.38 70.5 28.5C101.33 10.6 135.48 2.74 157.5 1L157.46 0.5Z";
const ARROW_CENTER_PATH = "M4.18 0.5C4.18 0.22 3.96 0 3.68 0C3.41 0 3.18 0.22 3.18 0.5L3.68 0.5L4.18 0.5ZM3.33 138.35C3.52 138.55 3.84 138.55 4.04 138.35L7.22 135.17C7.41 134.98 7.41 134.66 7.22 134.46C7.02 134.27 6.71 134.27 6.51 134.46L3.68 137.29L0.85 134.46C0.66 134.27 0.34 134.27 0.15 134.46C-0.05 134.66-0.05 134.98 0.15 135.17L3.33 138.35ZM3.68 0.5L3.18 0.5L3.18 138H3.68H4.18L4.18 0.5L3.68 0.5Z";

/* Figma-exact text positions inside hover cards (top offset, width 290px, left 30px) */
const CARD_TEXT_TOPS = [50, 63, 26];

function DecisionFlipCard({ card, index }: { card: DecisionCard; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-[350px] h-[350px] cursor-pointer"
      style={{ perspective: 1000 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front — image */}
        <img
          src={card.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover rounded-[32px]"
          style={{ backfaceVisibility: "hidden" }}
          loading="lazy"
        />
        {/* Back — text */}
        <div
          className="absolute inset-0 bg-[#1e242a] rounded-[32px]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div
            className="absolute left-[30px] flex flex-col gap-[12px]"
            style={{ top: CARD_TEXT_TOPS[index], width: 290 }}
          >
            {card.paragraphs.map((para, pi) => (
              <p
                key={pi}
                className={`font-sf text-[18px] leading-[1.4] whitespace-pre-line ${pi === 0 ? "text-white" : "text-text-secondary"}`}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DecisionFlipCardMobile({
  card,
  flipOnVisible = false,
}: {
  card: DecisionCard;
  flipOnVisible?: boolean;
}) {
  const [flipped, setFlipped] = useState(false);

  // When flipOnVisible becomes true: wait for reveal to finish, then flip
  useEffect(() => {
    if (!flipOnVisible) return;
    // 700ms = reveal-scale animation duration, then flip
    const timer = setTimeout(() => setFlipped(true), 800);
    return () => clearTimeout(timer);
  }, [flipOnVisible]);

  return (
    <div
      className="w-full aspect-square cursor-pointer"
      style={{ perspective: 600 }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <img
          src={card.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover rounded-[16px]"
          style={{ backfaceVisibility: "hidden" }}
          loading="lazy"
        />
        <div
          className="absolute inset-0 bg-[#1e242a] rounded-[16px] p-[16px] overflow-y-auto scrollbar-hide"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {card.paragraphs.map((para, pi) => (
            <p
              key={pi}
              className={`font-sf leading-[1.4] whitespace-pre-line mb-[6px] last:mb-0 ${pi === 0 ? "text-white text-[14px] font-medium" : "text-text-secondary text-[12px]"}`}
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DecisionsSection() {
  const [titleRef, titleVisible] = useInView(0.1);
  const [cardsRef, cardsVisible] = useInView(0.1);
  const [mobileGridRef, mobileVisible] = useInView(0.2);
  return (
    <section className="w-full mt-[100px] md:mt-[172px]">
      {/* Desktop — exact Figma absolute layout */}
      <div className="hidden md:block relative mx-auto" style={{ width: 1280, height: 704 }}>
        <div ref={titleRef}>
          <h2
            className={`reveal-fade-up${titleVisible ? " visible" : ""} absolute left-1/2 -translate-x-1/2 top-0 font-['TN',serif] font-extralight text-[48px] leading-[1.2] tracking-[-0.48px] text-white text-center`}
            style={{ width: 514 }}
          >
            3 decisions that changed everything
          </h2>

          <svg
            className={`reveal-fade-up${titleVisible ? " visible" : ""} absolute`}
            style={{ left: 196, top: 41, width: 154.5, height: 115.5, transitionDelay: "200ms" }}
            viewBox="0 0 158 116.5"
            fill="none"
            aria-hidden="true"
          >
            <path d={ARROW_LEFT_PATH} fill="#999899" />
          </svg>

          <svg
            className={`reveal-fade-up${titleVisible ? " visible" : ""} absolute`}
            style={{ left: 929, top: 41, width: 154.5, height: 115.5, transform: titleVisible ? "scaleX(-1)" : "scaleX(-1) translateY(30px)", transitionDelay: "200ms" }}
            viewBox="0 0 158 116.5"
            fill="none"
            aria-hidden="true"
          >
            <path d={ARROW_LEFT_PATH} fill="#999899" />
          </svg>

          <svg
            className={`reveal-fade-up${titleVisible ? " visible" : ""} absolute`}
            style={{ left: 638, top: 157, width: 7.4, height: 137.5, transitionDelay: "200ms" }}
            viewBox="0 0 7.4 138.5"
            fill="none"
            aria-hidden="true"
          >
            <path d={ARROW_CENTER_PATH} fill="#999899" />
          </svg>
        </div>

        <div ref={cardsRef}>
          <div
            className={`reveal-scale${cardsVisible ? " visible" : ""} absolute`}
            style={{ left: 0, top: 187 }}
          >
            <DecisionFlipCard card={CASE1_DECISIONS[0]} index={0} />
          </div>
          <div
            className={`reveal-scale${cardsVisible ? " visible" : ""} absolute left-1/2 -translate-x-1/2`}
            style={{ top: 354, transitionDelay: "150ms" }}
          >
            <DecisionFlipCard card={CASE1_DECISIONS[1]} index={1} />
          </div>
          <div
            className={`reveal-scale${cardsVisible ? " visible" : ""} absolute`}
            style={{ left: 930, top: 187, transitionDelay: "300ms" }}
          >
            <DecisionFlipCard card={CASE1_DECISIONS[2]} index={2} />
          </div>
        </div>
      </div>

      {/* Mobile — 2-col grid, first card flips after reveal */}
      <div ref={mobileGridRef} className="md:hidden">
        <h2 className="font-['TN',serif] font-extralight text-[28px] leading-[1.2] tracking-[-0.48px] text-white text-center mb-[16px]">
          3 decisions that changed everything
        </h2>
        <div className={`reveal-stagger-children${mobileVisible ? " visible" : ""} grid grid-cols-2 gap-[12px] mb-[12px]`}>
          <DecisionFlipCardMobile card={CASE1_DECISIONS[0]} flipOnVisible={mobileVisible} />
          <DecisionFlipCardMobile card={CASE1_DECISIONS[1]} />
        </div>
        <div className="grid grid-cols-2 gap-[12px]">
          <div className="col-start-1 col-end-3 mx-auto" style={{ width: "calc(50% - 6px)" }}>
            <DecisionFlipCardMobile card={CASE1_DECISIONS[2]} />
          </div>
        </div>
      </div>
    </section>
  );
}
