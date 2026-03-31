import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Logo } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { ContactLine } from "@/components/Layout/ContactLine";
import { useInView } from "@/hooks/useInView";
import { usePageMeta } from "@/hooks/usePageMeta";

const YOUTUBE_VIDEO_ID = "tozd-Dif7nI";
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`;

const DECISIONS = [
  {
    image: "/images/cases/case-2/decision-1.webp",
    title: "Smart color matching",
    description: [
      'RGB distance failed — dark blue and dark red scored as "similar."',
      "→ Switched to HSL with hue weighted 3x → Added semantic context — analyzes sibling variables to boost relevant suggestions → Result: suggestions that make sense to designers, not just math",
    ],
  },
  {
    image: "/images/cases/case-2/decision-2.webp",
    title: "Catching what designers miss",
    description: [
      "→ Scans every layer for unbound colors and sizes → Groups by value, shows count, navigates to layers → Smart suggestions + one-click fix → Same approach for spacing, radius, stroke tokens",
    ],
  },
  {
    image: "/images/cases/case-2/decision-3.webp",
    title: "Progressive loading over spinners",
    description: [
      "Spinner at 800ms+ felt broken.",
      "→ Skeleton cards appear instantly, fill in as brands load → Found and fixed a regression where skeletons hid behind an overlay → Real product work — ship, catch bugs, fix, iterate",
    ],
  },
];

const METRICS = [
  { value: "6 brands × 12 themes", label: "managed from one plugin" },
  { value: "≈50% less time", label: "switching and auditing across brands" },
  { value: "27 versions", label: "shipped and iterated in production" },
  { value: "7+ designers", label: "Use it daily" },
];

function DecisionCard({
  decision,
  className = "",
  imageScale = 1,
}: {
  decision: (typeof DECISIONS)[number];
  className?: string;
  imageScale?: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`w-[350px] h-[350px] cursor-pointer ${className}`}
      style={{ perspective: 1000 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front — image */}
        <div
          className="absolute inset-0 rounded-[32px] overflow-hidden bg-black flex items-center justify-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={decision.image}
            alt={decision.title}
            className="w-full"
            style={imageScale !== 1 ? { transform: `scale(${imageScale})` } : undefined}
            loading="lazy"
          />
        </div>
        {/* Back — text */}
        <div
          className="absolute inset-0 bg-[#1e242a] rounded-[32px] p-[30px] pt-[32px]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="font-sf text-[18px] font-bold leading-[1.4] text-white mb-[12px]">
            {decision.title}
          </p>
          {decision.description.map((para, i) => (
            <p
              key={i}
              className="font-sf text-[18px] leading-[1.4] text-white mb-[12px] last:mb-0"
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function DecisionCardMobile({
  decision,
  imageScale = 1,
  flipOnVisible = false,
}: {
  decision: (typeof DECISIONS)[number];
  imageScale?: number;
  flipOnVisible?: boolean;
}) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (!flipOnVisible) return;
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
        {/* Front — image */}
        <div
          className="absolute inset-0 rounded-[16px] overflow-hidden bg-black flex items-center justify-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={decision.image}
            alt={decision.title}
            className="w-full"
            style={imageScale !== 1 ? { transform: `scale(${imageScale})` } : undefined}
            loading="lazy"
          />
        </div>
        {/* Back — text with inner scroll */}
        <div
          className="absolute inset-0 bg-[#1e242a] rounded-[16px] p-[16px] overflow-y-auto scrollbar-hide text-left"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="font-sf text-[14px] font-medium leading-[1.4] text-white mb-[6px]">
            {decision.title}
          </p>
          {decision.description.map((para, i) => (
            <p
              key={i}
              className="font-sf text-[12px] leading-[1.4] text-text-secondary mb-[6px] last:mb-0"
            >
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CaseStudy2() {
  const [playing, setPlaying] = useState(false);
  const [heroRef, heroVisible] = useInView(0.1);
  const [screenshotsRef, screenshotsVisible] = useInView(0.1);
  const [problemTextRef, problemTextVisible] = useInView(0.1);
  const [problemImgRef, problemImgVisible] = useInView(0.1);
  const [builtTextRef, builtTextVisible] = useInView(0.1);
  const [builtVideoRef, builtVideoVisible] = useInView(0.1);
  const [builtCardsRef, builtCardsVisible] = useInView(0.1);
  const [decisionsTitleRef, decisionsTitleVisible] = useInView(0.1);
  const [decisionsCardsRef, decisionsCardsVisible] = useInView(0.1);
  const [decisionsMobileRef, decisionsMobileVisible] = useInView(0.1);
  const [youtubeRef, youtubeVisible] = useInView(0.1);
  const [metricsRef, metricsVisible] = useInView(0.1);

  usePageMeta(
    "Figma Token Plugin — Shkuratov Designer",
    "Case study: Figma Token Plugin — design system tooling for automated token management.",
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen min-h-dvh w-full bg-black">
      <Logo visible />

      <main className="relative z-10 flex flex-col items-center px-5 md:px-10 pt-[80px] md:pt-[40px] pb-[164px] md:pb-[320px]">
        {/* Back to cases */}
        <Link
          to="/cases"
          className="flex items-center gap-[8px] self-center mb-[64px] md:mb-[56px] mt-[16px] md:mt-0"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M5.25 14L13.75 5.25L14.975 6.475L7.45 14L14.975 21.525L13.75 22.75L5.25 14Z"
              fill="#999899"
            />
          </svg>
          <span className="font-['TN',serif] font-extralight text-[24px] leading-[1.2] text-text-secondary">
            Back to cases
          </span>
        </Link>

        {/* Hero */}
        <section ref={heroRef} className={`reveal-fade-up${heroVisible ? " visible" : ""} flex flex-col items-center text-center max-w-[655px] mb-[40px] md:mb-[56px]`}>
          <h1 className="font-['TN',serif] font-extralight text-[28px] md:text-[48px] leading-[1.2] text-white tracking-[-0.48px] mb-[16px]">
            I built a Figma plugin with AI that manages 6 brands in one click
          </h1>
          <p className="font-sf text-[16px] md:text-[18px] leading-[1.4] text-text-secondary">
            120,000+ layers. 12 theme combinations. Under 2 seconds. Built for a
            B2B messenger platform with a 100+ person product team.
          </p>
        </section>

        {/* Three screenshots — horizontal slider on mobile, row on desktop */}
        <section
          ref={screenshotsRef}
          className={`reveal-stagger-children${screenshotsVisible ? " visible" : ""} w-screen md:w-auto flex gap-[16px] md:gap-[32px] items-center overflow-x-auto md:overflow-visible px-5 md:px-0 snap-x snap-mandatory scrollbar-hide mb-[128px] md:mb-[243px]`}
        >
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="w-[260px] md:w-full md:max-w-[347px] rounded-[11px] overflow-hidden shrink-0 snap-center"
              style={{ aspectRatio: "347 / 536" }}
            >
              <img
                src={`/images/cases/case-2/screenshot-${n}.webp`}
                alt={`Plugin screenshot ${n}`}
                className="w-full h-full object-cover"
                loading={n === 1 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </section>

        {/* The problem */}
        <section className="flex flex-col items-center text-center max-w-[974px] mb-[128px] md:mb-[228px]">
          <div ref={problemTextRef} className={`reveal-fade-up${problemTextVisible ? " visible" : ""} max-w-[655px] mb-[48px] md:mb-[64px]`}>
            <h2 className="font-['TN',serif] font-extralight text-[28px] md:text-[48px] leading-[1.2] text-white tracking-[-0.48px] mb-[16px]">
              The problem nobody had a tool for
            </h2>
            <p className="font-sf text-[16px] md:text-[18px] leading-[1.4] text-text-secondary mb-[12px]">
              6 brands. Light and dark themes for each. Figma's variable tables
              don't have enough columns for all of this, so the{" "}
              <span className="text-white">
                team maintains token files across multiple libraries.
              </span>
            </p>
            <p className="font-sf text-[16px] md:text-[18px] leading-[1.4] text-text-secondary">
              And hardcoded colors kept slipping through.{" "}
              <span className="text-white">
                No native way to audit a file for unattached tokens.
              </span>
            </p>
          </div>

          {/* 3D workflow illustration */}
          <div ref={problemImgRef} className={`reveal-blur${problemImgVisible ? " visible" : ""} w-full`}>
            <img
              src="/images/cases/case-2/workflow-3d.webp"
              alt="Workflow visualization"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </section>

        {/* What I built */}
        <section className="flex flex-col items-center w-full max-w-[992px] mb-[160px] md:mb-[260px]">
          <div ref={builtTextRef} className={`reveal-fade-up${builtTextVisible ? " visible" : ""} flex flex-col items-center text-center max-w-[655px] mb-[48px] md:mb-[64px]`}>
            <p className="font-sf text-[16px] md:text-[18px] leading-[1.4] text-accent mb-[16px]">
              What I built
            </p>
            <h2 className="font-['TN',serif] font-extralight text-[28px] md:text-[48px] leading-[1.2] text-white tracking-[-0.48px] max-w-[532px]">
              A Figma plugin with two core capabilities:
            </h2>
          </div>

          {/* Looped GIF video */}
          <div ref={builtVideoRef} className={`reveal-blur${builtVideoVisible ? " visible" : ""} w-full rounded-[14px] md:rounded-[20px] overflow-hidden mb-[48px] md:mb-[64px]`}>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/images/cases/case-2-character.webp"
              className="w-full h-auto"
              src="/videos/case-2-gif.mp4"
            />
          </div>

          {/* Feature cards */}
          <div ref={builtCardsRef} className={`reveal-stagger-children${builtCardsVisible ? " visible" : ""} flex flex-col gap-[16px] md:gap-[24px] w-full`}>
            <div className="bg-[#1e242a] rounded-[16px] md:rounded-[24px] p-[20px] md:p-[24px]">
              <p className="font-sf text-[16px] md:text-[18px] leading-[1.5] text-white">
                Colors tab → One-click theme switching across 6 brands × 2
                modes → Unattached color detection with smart variable
                suggestions → Cross-library variable swapping that Figma doesn't
                support natively
              </p>
            </div>
            <div className="bg-[#1e242a] rounded-[16px] md:rounded-[24px] p-[20px] md:p-[24px]">
              <p className="font-sf text-[16px] md:text-[18px] leading-[1.5] text-white">
                Sizes tab → Detects hardcoded spacing, radius, gap, and stroke
                values → Matches them to design tokens and binds in bulk
              </p>
            </div>
          </div>
        </section>

        {/* 3 decisions that shaped the plugin */}
        <section className="w-full max-w-[1280px] mb-[120px] md:mb-[192px]">
          <h2 ref={decisionsTitleRef} className={`reveal-fade-up${decisionsTitleVisible ? " visible" : ""} font-['TN',serif] font-extralight text-[28px] md:text-[48px] leading-[1.2] text-white tracking-[-0.48px] text-center max-w-[460px] mx-auto mb-[40px] md:mb-[24px]`}>
            3 decisions that shaped the plugin
          </h2>

          {/* Desktop layout with arrows */}
          <div ref={decisionsCardsRef} className="hidden md:block relative h-[700px]">
            {/* Decorative arrows */}
            <div className={`reveal-fade-up${decisionsCardsVisible ? " visible" : ""} absolute left-[calc(50%-294px)] top-0 w-[155px] h-[116px]`}>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 157.962 116.5"
                fill="none"
                overflow="visible"
              >
                <path
                  d="M157.501 0.998C157.777 0.977 157.982 0.736 157.96 0.461C157.939 0.185 157.698-0.02 157.422 0.002L157.462 0.5L157.501 0.998ZM2.543 116.274C2.694 116.505 3.004 116.57 3.235 116.419L7.002 113.957C7.233 113.806 7.298 113.496 7.147 113.265C6.996 113.034 6.686 112.969 6.455 113.12L3.107 115.308L0.919 111.96C0.768 111.728 0.458 111.664 0.227 111.815C-0.005 111.966-0.07 112.276 0.082 112.507L2.543 116.274ZM157.462 0.5L157.422 0.002C135.278 1.756 100.978 9.649 69.998 27.63C39.012 45.615 11.31 73.719 2.473 115.897L2.962 116L3.451 116.103C12.214 74.281 39.678 46.385 70.5 28.495C101.329 10.601 135.479 2.744 157.501 0.998L157.462 0.5Z"
                  fill="#999899"
                />
              </svg>
            </div>
            <div className={`reveal-fade-up${decisionsCardsVisible ? " visible" : ""} absolute right-[calc(50%-294px)] top-0 w-[155px] h-[116px] scale-x-[-1]`}>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 157.962 116.5"
                fill="none"
                overflow="visible"
              >
                <path
                  d="M157.501 0.998C157.777 0.977 157.982 0.736 157.96 0.461C157.939 0.185 157.698-0.02 157.422 0.002L157.462 0.5L157.501 0.998ZM2.543 116.274C2.694 116.505 3.004 116.57 3.235 116.419L7.002 113.957C7.233 113.806 7.298 113.496 7.147 113.265C6.996 113.034 6.686 112.969 6.455 113.12L3.107 115.308L0.919 111.96C0.768 111.728 0.458 111.664 0.227 111.815C-0.005 111.966-0.07 112.276 0.082 112.507L2.543 116.274ZM157.462 0.5L157.422 0.002C135.278 1.756 100.978 9.649 69.998 27.63C39.012 45.615 11.31 73.719 2.473 115.897L2.962 116L3.451 116.103C12.214 74.281 39.678 46.385 70.5 28.495C101.329 10.601 135.479 2.744 157.501 0.998L157.462 0.5Z"
                  fill="#999899"
                />
              </svg>
            </div>
            <div className={`reveal-fade-up${decisionsCardsVisible ? " visible" : ""} absolute left-1/2 -translate-x-1/2 top-[20px] w-[8px] h-[138px]`}>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 7.364 138.5"
                fill="none"
                overflow="visible"
              >
                <path
                  d="M4.182 0.5C4.182 0.224 3.958 0 3.682 0C3.406 0 3.182 0.224 3.182 0.5L3.682 0.5L4.182 0.5ZM3.328 138.354C3.524 138.549 3.84 138.549 4.036 138.354L7.218 135.172C7.413 134.976 7.413 134.66 7.218 134.464C7.022 134.269 6.706 134.269 6.51 134.464L3.682 137.293L0.854 134.464C0.658 134.269 0.342 134.269 0.146 134.464C-0.049 134.66-0.049 134.976 0.146 135.172L3.328 138.354ZM3.682 0.5L3.182 0.5L3.182 138H3.682H4.182L4.182 0.5L3.682 0.5Z"
                  fill="#999899"
                />
              </svg>
            </div>

            {/* Decision cards with images */}
            <div className={`reveal-scale${decisionsCardsVisible ? " visible" : ""} absolute left-0 top-[163px]`}>
              <DecisionCard decision={DECISIONS[0]} imageScale={1.35} />
            </div>
            <div className={`reveal-scale${decisionsCardsVisible ? " visible" : ""} absolute left-1/2 -translate-x-1/2 top-[330px]`}>
              <DecisionCard decision={DECISIONS[1]} />
            </div>
            <div className={`reveal-scale${decisionsCardsVisible ? " visible" : ""} absolute right-0 top-[163px]`}>
              <DecisionCard decision={DECISIONS[2]} />
            </div>
          </div>

          {/* Mobile layout — 2-col grid like case study 1 */}
          <div ref={decisionsMobileRef} className="md:hidden">
            <div className={`reveal-stagger-children${decisionsMobileVisible ? " visible" : ""} grid grid-cols-2 gap-[12px] mb-[12px]`}>
              <DecisionCardMobile decision={DECISIONS[0]} imageScale={1.35} flipOnVisible={decisionsMobileVisible} />
              <DecisionCardMobile decision={DECISIONS[1]} />
            </div>
            <div className="grid grid-cols-2 gap-[12px]">
              <div className="col-start-1 col-end-3 mx-auto" style={{ width: "calc(50% - 6px)" }}>
                <DecisionCardMobile decision={DECISIONS[2]} />
              </div>
            </div>
          </div>
        </section>

        {/* YouTube embed — no title, with content-page hover effect */}
        <section ref={youtubeRef} className={`reveal-blur${youtubeVisible ? " visible" : ""} w-full max-w-[966px] mb-[120px] md:mb-[192px]`}>
          <div
            className={`relative w-full rounded-[20px] md:rounded-[32px] overflow-hidden bg-white/10 cursor-pointer transition-all duration-300 ${playing ? "opacity-100 scale-100" : "opacity-65 hover:opacity-100 hover:scale-[1.02]"}`}
            style={{ paddingBottom: "56.25%" }}
          >
            {playing ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={YOUTUBE_EMBED_URL}
                title="How the plugin works"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                className="absolute inset-0 w-full h-full cursor-pointer bg-black group"
                onClick={() => setPlaying(true)}
                aria-label="Play video"
              >
                <img
                  src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <svg
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[68px] h-[48px] opacity-80 group-hover:opacity-100 transition-opacity"
                  viewBox="0 0 68 48"
                  aria-hidden="true"
                >
                  <path
                    d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                    fill="#FF0000"
                  />
                  <path d="M45 24L27 14v20" fill="#fff" />
                </svg>
              </button>
            )}
          </div>
        </section>

        {/* Metrics */}
        <section className="w-full max-w-[1280px]">
          <div ref={metricsRef} className={`reveal-stagger-children${metricsVisible ? " visible" : ""} grid grid-cols-2 gap-[12px] md:gap-[48px] auto-rows-[1fr]`}>
            {METRICS.map((m, i) => (
              <div
                key={i}
                className="bg-white rounded-[14px] md:rounded-[20px] px-[16px] md:px-[32px] pt-[20px] md:pt-[24px] pb-[24px] md:pb-[30px]"
              >
                <p className="font-['TN',serif] font-extralight text-[24px] md:text-[48px] leading-[1.2] text-[#222] tracking-[-0.48px]">
                  {m.value}
                </p>
                <p className="font-sf text-[14px] md:text-[18px] leading-[1.4] text-[#6a6a6a] mt-[8px] md:mt-[12px]">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <NavBar visible />
      <ContactLine visible />
    </div>
  );
}
