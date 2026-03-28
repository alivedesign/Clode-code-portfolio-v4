import { Logo } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { ContactLine } from "@/components/Layout/ContactLine";
import { EXPERIENCE_STAGGER_MS } from "@/constants";
import {
  EXPERIENCE_ENTRIES,
  HEADLINE,
  LINKEDIN_URL,
  YOUTUBE_EMBED_URL,
} from "@/data/experienceData";
import type { ExperienceEntry } from "@/data/experienceData";
import { useInView } from "@/hooks/useInView";

function ExperienceItem({ entry, index }: { entry: ExperienceEntry; index: number }) {
  return (
    <div
      className="experience-fade-up"
      style={{ animationDelay: `${(index + 1) * EXPERIENCE_STAGGER_MS}ms` }}
    >
      <div className="w-full h-px bg-white/10" />
      <p className="py-[28px] font-sf text-[16px] md:text-[18px] leading-[1.4] text-text-secondary">
        <span>{entry.dateRange} | </span>
        <span>{entry.role} @ </span>
        <span className="text-white">{entry.company}</span>
        {entry.detail && (
          <span className="text-text-secondary"> {entry.detail}</span>
        )}
      </p>
    </div>
  );
}

export function Experience() {
  const [videoRef, videoVisible] = useInView(0.2);

  return (
    <div className="relative min-h-dvh w-full bg-black">
      <Logo visible />

      {/* Scrollable content */}
      <main className="relative z-10 flex flex-col items-center px-5 md:px-10 pt-[104px] md:pt-[104px] pb-[140px] md:pb-[272px]">
        {/* Headline */}
        <h1
          className="experience-fade-up text-[28px] md:text-[48px] leading-[1.2] text-white text-center tracking-[-0.48px] max-w-[765px] mb-[48px] md:mb-[64px] font-['TN',serif] font-extralight"
        >
          {HEADLINE}
        </h1>

        {/* Experience list */}
        <div className="w-full max-w-[887px]">
          {EXPERIENCE_ENTRIES.map((entry, i) => (
            <ExperienceItem key={entry.dateRange} entry={entry} index={i} />
          ))}
          {/* Bottom divider */}
          <div
            className="experience-fade-up"
            style={{ animationDelay: `${(EXPERIENCE_ENTRIES.length + 1) * EXPERIENCE_STAGGER_MS}ms` }}
          >
            <div className="w-full h-px bg-white/10" />
          </div>

          {/* More on LinkedIn */}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="experience-fade-up block text-center mt-[48px] font-sf text-[18px] leading-[1.3] text-accent hover:underline"
            style={{ animationDelay: `${(EXPERIENCE_ENTRIES.length + 2) * EXPERIENCE_STAGGER_MS}ms` }}
          >
            More on LinkedIn
          </a>
        </div>

        {/* YouTube Video Embed */}
        <div
          ref={videoRef}
          className={`experience-scroll-reveal${videoVisible ? " visible" : ""} mt-[80px] md:mt-[112px] w-full max-w-[992px]`}
        >
          <div className="relative w-full rounded-[24px] overflow-hidden" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src={YOUTUBE_EMBED_URL}
              title="Experience video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </main>

      <NavBar visible />
      <ContactLine visible />
    </div>
  );
}
