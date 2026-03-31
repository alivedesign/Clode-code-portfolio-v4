import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import {
  CASE1_YOUTUBE_VIDEO_ID,
  CASE1_YOUTUBE_EMBED_URL,
  CASE1_VIDEO_TABS,
} from "@/data/caseStudy1Data";

export function VideoSection() {
  const [vidRef, vidVisible] = useInView(0.1);
  const [tabsRef, tabsVisible] = useInView(0.1);
  const [playing, setPlaying] = useState(false);

  return (
    <section className="flex flex-col items-center gap-[24px] w-full max-w-[966px] mt-[100px] md:mt-[172px]">
      {/* YouTube facade — no title per Figma */}
      <div
        ref={vidRef}
        className={`reveal-blur${vidVisible ? " visible" : ""} relative w-full rounded-[24px] md:rounded-[32px] overflow-hidden bg-white/10 cursor-pointer`}
      >
        <div className="relative w-full" style={{ paddingBottom: "57.76%" }}>
          {playing ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={CASE1_YOUTUBE_EMBED_URL}
              title="How it all connects"
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
                src={`https://img.youtube.com/vi/${CASE1_YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <svg
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[68px] h-[48px] opacity-80 group-hover:opacity-100 transition-opacity"
                viewBox="0 0 68 48"
                aria-hidden="true"
              >
                <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#FF0000" />
                <path d="M45 24L27 14v20" fill="#fff" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Tab labels — Figma: bg-[#1e1e1e], gap-24, rounded-12, py-16 px-8 */}
      <div
        ref={tabsRef}
        className={`reveal-stagger-children${tabsVisible ? " visible" : ""} flex flex-col md:flex-row gap-[16px] md:gap-[24px] w-full`}
      >
        {CASE1_VIDEO_TABS.map((tab) => (
          <div
            key={tab}
            className="flex-1 flex items-center justify-center bg-[#1e1e1e] rounded-[12px] py-[16px] px-[8px]"
          >
            <p className="font-sf text-[16px] md:text-[18px] leading-[1.4] text-text-secondary text-center">
              {tab}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
