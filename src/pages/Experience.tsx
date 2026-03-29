import { useState, useEffect } from "react";
import { Logo } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { ContactLine } from "@/components/Layout/ContactLine";
import { EXPERIENCE_STAGGER_MS } from "@/constants";
import {
  EXPERIENCE_ENTRIES,
  HEADLINE,
  LINKEDIN_URL,
  YOUTUBE_VIDEO_ID,
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
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    document.title = "Experience — Shkuratov Designer";
  }, []);

  return (
    <div className="relative min-h-screen min-h-dvh w-full bg-black">
      <Logo visible />

      {/* Scrollable content */}
      <main className="relative z-10 flex flex-col items-center px-5 md:px-10 pt-[104px] md:pt-[104px] pb-[164px] md:pb-[320px]">
        {/* Headline */}
        <h1
          className="experience-fade-up text-[28px] md:text-[48px] leading-[1.2] text-white text-center tracking-[-0.48px] max-w-[765px] mb-[48px] md:mb-[64px] font-['TN',serif] font-extralight"
        >
          {HEADLINE}
        </h1>

        {/* Experience list */}
        <section aria-label="Work experience">
          <h2 className="sr-only">Work Experience</h2>
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
            <div
              className="experience-fade-up text-center mt-[48px]"
              style={{ animationDelay: `${(EXPERIENCE_ENTRIES.length + 2) * EXPERIENCE_STAGGER_MS}ms` }}
            >
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sf text-[18px] leading-[1.3] text-accent hover:underline"
              >
                More on LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* YouTube Video Embed */}
        <div
          ref={videoRef}
          className={`experience-scroll-reveal${videoVisible ? " visible" : ""} mt-[80px] md:mt-[112px] w-full max-w-[992px]`}
        >
          <div className="relative w-full rounded-[24px] overflow-hidden cursor-pointer" style={{ paddingBottom: "56.25%" }}>
            {playing ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={YOUTUBE_EMBED_URL}
                title="Experience video"
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
                {/* YouTube play button */}
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
        </div>
      </main>

      <NavBar visible />
      <ContactLine visible />
    </div>
  );
}
