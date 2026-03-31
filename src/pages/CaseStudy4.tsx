import { useEffect } from "react";
import { Logo } from "@/components/Hero";
import { BackLink } from "@/components/Cases";
import { NavBar } from "@/components/NavBar";
import { ContactLine } from "@/components/Layout/ContactLine";
import { useInView } from "@/hooks/useInView";
import { usePageMeta } from "@/hooks/usePageMeta";
import {
  PERSONAS_LEFT,
  PERSONAS_CENTER,
  PERSONAS_RIGHT,
} from "@/data/caseStudy4Data";

function ChatBubble({
  message,
  className = "",
}: {
  message: string;
  className?: string;
}) {
  return (
    <div className={`flex gap-[16px] items-end ${className}`}>
      <img
        src="/images/cases/case-4/andrew-avatar.webp"
        alt="Andrew"
        width={48}
        height={48}
        className="w-[48px] h-[48px] rounded-full object-cover shrink-0"
        loading="lazy"
      />
      <div
        className="chat-bubble-glass rounded-tl-[18px] rounded-tr-[18px] rounded-br-[18px] rounded-bl-[9px] px-[16px] pt-[16px] pb-[14px] max-w-[372px]"
      >
        <p className="font-sf text-[16px] md:text-[18px] leading-[1.4] text-white">
          {message}
        </p>
      </div>
    </div>
  );
}

function PersonaCard({
  segments,
}: {
  segments: { content: string; white: boolean }[];
}) {
  return (
    <div className="bg-[#1e1e1e] rounded-[6px] p-[16px]">
      <p className="font-sf text-[16px] md:text-[18px] leading-[1.4] text-text-secondary">
        {segments.map((seg, i) => (
          <span key={i} className={seg.white ? "text-white" : ""}>
            {seg.content}
          </span>
        ))}
      </p>
    </div>
  );
}

export function CaseStudy4() {
  const [heroRef, heroVisible] = useInView(0.1);
  const [chatRef, chatVisible] = useInView(0.1);
  const [discoveryRef, discoveryVisible] = useInView(0.1);
  const [oldSiteRef, oldSiteVisible] = useInView(0.1);
  const [dataRichRef, dataRichVisible] = useInView(0.1);
  const [dataImagesRef, dataImagesVisible] = useInView(0.1);
  const [researchRef, researchVisible] = useInView(0.1);
  const [researchImgRef, researchImgVisible] = useInView(0.1);
  const [researchPointsRef, researchPointsVisible] = useInView(0.1);
  const [personasRef, personasVisible] = useInView(0.1);
  const [personasGridRef, personasGridVisible] = useInView(0.1);
  const [proposalRef, proposalVisible] = useInView(0.1);
  const [proposalImgRef, proposalImgVisible] = useInView(0.1);
  const [resultRef, resultVisible] = useInView(0.1);
  const [resultChatRef, resultChatVisible] = useInView(0.1);
  const [closingRef, closingVisible] = useInView(0.1);

  usePageMeta(
    "AI SEO Startup Redesign — Shkuratov Designer",
    "Case study: AI SEO Startup Redesign — conversion-focused product redesign.",
    "/cases/ai-seo-startup",
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen min-h-dvh w-full bg-black">
      <Logo visible />

      <main className="relative z-10 flex flex-col items-center px-5 md:px-10 pt-[80px] md:pt-[40px] pb-[164px] md:pb-[320px]">
        {/* Back to cases */}
        <BackLink />

        {/* Hero */}
        <section
          ref={heroRef}
          className={`reveal-fade-up${heroVisible ? " visible" : ""} flex flex-col items-center text-center max-w-[868px] mb-[80px] md:mb-[120px]`}
        >
          <h1 className="font-['TN',serif] font-extralight text-[28px] md:text-[48px] leading-[1.2] text-white tracking-[-0.48px] mb-[16px]">
            0% to 5% Conversion Rate. How I Turned 2,300 Dead Clicks Into 119
            Qualified Leads
          </h1>
          <p className="font-sf text-[16px] md:text-[18px] leading-[1.4] text-text-secondary max-w-[452px]">
            Andrew found me through LinkedIn. We connected and had similar
            interests in AI and product building
          </p>
        </section>

        {/* Andrew's first message */}
        <section
          ref={chatRef}
          className={`reveal-fade-up${chatVisible ? " visible" : ""} flex justify-center mb-[80px] md:mb-[140px]`}
        >
          <ChatBubble message="Spending $2 000 on ads, getting clicks, zero conversions. Can you help?" />
        </section>

        {/* Discovery call */}
        <section
          ref={discoveryRef}
          className={`reveal-fade-up${discoveryVisible ? " visible" : ""} flex flex-col items-center text-center max-w-[868px] mb-[80px] md:mb-[120px]`}
        >
          <h2 className="font-['TN',serif] font-extralight text-[28px] md:text-[48px] leading-[1.2] text-white tracking-[-0.48px] mb-[16px]">
            In our discovery call, Andrew shared:
          </h2>
          <div className="font-sf text-[16px] md:text-[18px] leading-[1.4] text-text-secondary max-w-[452px] space-y-[8px]">
            <p>
              <span className="text-white">{"\u2192 Product works"}</span>
              {" (clients love it)"}
            </p>
            <p>
              <span className="text-white">{"\u2192 Traffic works"}</span>
              {" (ads perform well)"}
            </p>
            <p>
              <span className="text-white">
                {"\u2192 Website doesn't work"}
              </span>
              {" (obvious disconnect)"}
            </p>
          </div>
        </section>

        {/* Old website screenshot with annotation */}
        <section
          ref={oldSiteRef}
          className={`reveal-blur${oldSiteVisible ? " visible" : ""} relative w-full max-w-[795px] mb-[128px] md:mb-[192px]`}
        >
          {/* Annotation arrow + label — desktop only, relative to image */}
          <div className="hidden md:block absolute right-[-56px] top-[-88px] z-10">
            <p className="font-sf font-semibold text-[18px] leading-[1.5] text-accent whitespace-nowrap">
              Old version of the Site
            </p>
            <div className="w-[48px] h-[32px] mt-[2px]" style={{ transform: "rotate(111deg)" }}>
              <img
                src="/images/cases/case-4/arrow.svg"
                alt=""
                className="w-full h-full"
                aria-hidden="true"
              />
            </div>
          </div>
          {/* Mobile annotation label */}
          <p className="md:hidden font-sf font-semibold text-[14px] leading-[1.5] text-accent mb-[8px] text-center">
            Old version of the Site
          </p>
          <img
            src="/images/cases/case-4/old-website.webp"
            alt="Old version of bloggingmachine.io"
            className="w-full h-auto rounded-[10px]"
            loading="eager"
          />
        </section>

        {/* He was frustrated but data-rich */}
        <section className="flex flex-col items-center w-full max-w-[795px] mb-[128px] md:mb-[192px]">
          <p
            ref={dataRichRef}
            className={`reveal-fade-up${dataRichVisible ? " visible" : ""} font-['TN',serif] font-extralight text-[28px] md:text-[48px] leading-[1.2] text-white tracking-[-0.48px] text-center max-w-[682px] mb-[40px] md:mb-[56px]`}
          >
            He was frustrated but data-rich. He'd interviewed customers, tracked
            everything, knew his numbers. This made my job easier
          </p>
          <div
            ref={dataImagesRef}
            className={`reveal-blur${dataImagesVisible ? " visible" : ""} flex flex-col gap-[6px] w-full`}
          >
            <img
              src="/images/cases/case-4/research-data-1.webp"
              alt="Customer research data"
              className="w-full h-auto rounded-[12px]"
              loading="lazy"
            />
            <img
              src="/images/cases/case-4/research-data-2.webp"
              alt="Analytics data"
              className="w-full h-auto rounded-[12px]"
              loading="lazy"
            />
          </div>
        </section>

        {/* Research mode */}
        <section className="flex flex-col items-center w-full max-w-[900px] mb-[128px] md:mb-[192px]">
          <h2
            ref={researchRef}
            className={`reveal-fade-up${researchVisible ? " visible" : ""} font-['TN',serif] font-extralight text-[28px] md:text-[48px] leading-[1.2] text-white tracking-[-0.48px] text-center max-w-[773px] mb-[40px] md:mb-[56px]`}
          >
            I spent a several days in research mode:
          </h2>
          <div
            ref={researchImgRef}
            className={`reveal-blur${researchImgVisible ? " visible" : ""} w-full rounded-[20px] overflow-hidden mb-[40px] md:mb-[56px]`}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-auto"
              poster="/videos/bloggingmachine-case/research-poster.webp"
            >
              <source src="/videos/bloggingmachine-case/research.webm" type="video/webm" />
              <source src="/videos/bloggingmachine-case/research.mp4" type="video/mp4" />
            </video>
          </div>
          <div
            ref={researchPointsRef}
            className={`reveal-fade-up${researchPointsVisible ? " visible" : ""} font-sf text-[16px] md:text-[18px] leading-[1.3] text-white text-center max-w-[488px] space-y-[12px]`}
          >
            <p>{"\u2192 Session recordings and user behavior patterns"}</p>
            <p>{"\u2192 Competitors"}</p>
            <p>
              {
                "\u2192 Andrew's interviews and reports about user behaviors and pain points"
              }
            </p>
          </div>
        </section>

        {/* Personas & strategies */}
        <section className="flex flex-col items-center w-full max-w-[955px] mb-[128px] md:mb-[192px]">
          <h2
            ref={personasRef}
            className={`reveal-fade-up${personasVisible ? " visible" : ""} font-['TN',serif] font-extralight text-[28px] md:text-[48px] leading-[1.2] text-white tracking-[-0.48px] text-center max-w-[773px] mb-[40px] md:mb-[56px]`}
          >
            I've got the ideal customer personas, value proposition, and biggest
            competitor strategies:
          </h2>
          <div
            ref={personasGridRef}
            className={`reveal-stagger-children${personasGridVisible ? " visible" : ""} grid grid-cols-2 md:grid-cols-3 gap-[12px] w-full`}
          >
            {/* Column 1 */}
            <div className="flex flex-col gap-[12px]">
              {PERSONAS_LEFT.map((card, i) => (
                <PersonaCard key={i} segments={card.text} />
              ))}
            </div>
            {/* Column 2 */}
            <div className="flex flex-col gap-[12px]">
              {PERSONAS_CENTER.map((card, i) => (
                <PersonaCard key={i} segments={card.text} />
              ))}
            </div>
            {/* Column 3 — single row on mobile */}
            <div className="flex flex-col col-span-2 md:col-span-1 gap-[12px] grid grid-cols-2 md:grid-cols-1">
              {PERSONAS_RIGHT.map((card, i) => (
                <PersonaCard key={i} segments={card.text} />
              ))}
            </div>
          </div>
        </section>

        {/* Proposal */}
        <section className="flex flex-col items-center w-full max-w-[1000px] mb-[128px] md:mb-[192px]">
          <div
            ref={proposalRef}
            className={`reveal-fade-up${proposalVisible ? " visible" : ""} flex flex-col items-center text-center max-w-[773px] mb-[40px] md:mb-[56px]`}
          >
            <a
              href="https://bloggingmachine.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sf text-[16px] md:text-[18px] leading-[1.4] text-accent mb-[16px] hover:underline"
            >
              bloggingmachine.io
            </a>
            <h2 className="font-['TN',serif] font-extralight text-[28px] md:text-[48px] leading-[1.2] text-white tracking-[-0.48px]">
              Here's what I proposed and why...
            </h2>
          </div>
          <div
            ref={proposalImgRef}
            className={`reveal-blur${proposalImgVisible ? " visible" : ""} w-full rounded-[20px] overflow-hidden`}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-auto"
              poster="/videos/bloggingmachine-case/bloggingmachine-video-poster.webp"
            >
              <source src="/videos/bloggingmachine-case/bloggingmachine-video.webm" type="video/webm" />
              <source src="/videos/bloggingmachine-case/bloggingmachine-video.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        {/* Result — Andrew's message */}
        <section className="flex flex-col items-center w-full max-w-[775px] mb-[56px] md:mb-[72px]">
          <h2
            ref={resultRef}
            className={`reveal-fade-up${resultVisible ? " visible" : ""} font-['TN',serif] font-extralight text-[28px] md:text-[48px] leading-[1.2] text-white tracking-[-0.48px] text-center mb-[40px] md:mb-[56px]`}
          >
            Two weeks later, Andrew sent a message:
          </h2>
          <div
            ref={resultChatRef}
            className={`reveal-fade-up${resultChatVisible ? " visible" : ""}`}
          >
            <ChatBubble message="Dude. We got 119 conversions. Two trial activations. This is insane! 🤯📈" />
          </div>
        </section>

        {/* Closing statement */}
        <section
          ref={closingRef}
          className={`reveal-fade-up${closingVisible ? " visible" : ""} max-w-[957px] text-center`}
        >
          <p className="font-['TN',serif] font-extralight text-[28px] md:text-[48px] leading-[1.2] tracking-[-0.48px]">
            <span className="text-text-secondary">He spent the </span>
            <span className="text-white">
              same amount of money and got the same amount of traffic, but this
              time with a new website
            </span>
            <span className="text-text-secondary">
              {" "}
              fully designed and built by me, he got{" "}
            </span>
            <span className="text-white">119 conversions compared to 0</span>
            <span className="text-text-secondary"> the previous time</span>
          </p>
        </section>
      </main>

      <NavBar visible />
      <ContactLine visible />
    </div>
  );
}
