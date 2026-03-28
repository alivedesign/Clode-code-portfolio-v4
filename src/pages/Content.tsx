import { useState, useEffect } from "react";
import { Logo } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { ContactLine } from "@/components/Layout/ContactLine";
import { useInView } from "@/hooks/useInView";
import { useInstagramEmbed } from "@/hooks/useInstagramEmbed";
import {
  CONTENT_HEADLINE,
  YOUTUBE_VIDEOS,
  YOUTUBE_CHANNEL_URL,
  LINKEDIN_POSTS,
  LINKEDIN_PROFILE_URL,
  INSTAGRAM_REELS,
  INSTAGRAM_PROFILE_URL,
} from "@/data/contentData";

/* ── YouTube thumbnail card ── */
function YouTubeCard({ videoId }: { videoId: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative w-full rounded-[24px] overflow-hidden" style={{ paddingBottom: "56.25%" }}>
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3`}
          title="YouTube video"
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
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
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
  );
}

/* ── LinkedIn embed card ── */
function LinkedInCard({ activityId }: { activityId: string }) {
  return (
    <div className="break-inside-avoid mb-[22px]">
      <iframe
        src={`https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityId}`}
        className="w-full rounded-[9px]"
        height="450"
        frameBorder="0"
        allowFullScreen
        title="LinkedIn post"
        loading="lazy"
      />
    </div>
  );
}

/* ── Instagram embed card ── */
function InstagramCard({ reelId }: { reelId: string }) {
  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={`https://www.instagram.com/reel/${reelId}/`}
      data-instgrm-version="14"
      style={{
        background: "transparent",
        border: 0,
        borderRadius: 24,
        margin: 0,
        padding: 0,
        minWidth: 0,
        maxWidth: "none",
        width: 300,
      }}
    >
      <a href={`https://www.instagram.com/reel/${reelId}/`} target="_blank" rel="noopener noreferrer">
        View on Instagram
      </a>
    </blockquote>
  );
}

/* ── Main Content page ── */
export function Content() {
  const [youtubeRef, youtubeVisible] = useInView(0.1);
  const [linkedinRef, linkedinVisible] = useInView(0.1);
  const [instagramRef, instagramVisible] = useInView(0.1);

  useInstagramEmbed(instagramVisible);

  useEffect(() => {
    document.title = "Content — Shkuratov Designer";
  }, []);

  return (
    <div className="relative min-h-screen min-h-dvh w-full bg-black">
      <Logo visible />

      <main className="relative z-10 flex flex-col items-center px-5 md:px-10 pt-[104px] pb-[164px] md:pb-[320px]">
        {/* Headline */}
        <h1 className="experience-fade-up text-[28px] md:text-[48px] leading-[1.2] text-white text-center tracking-[-0.48px] max-w-[827px] mb-[48px] md:mb-[64px] font-['TN',serif] font-extralight">
          {CONTENT_HEADLINE}
        </h1>

        {/* ── YouTube Section ── */}
        <section
          ref={youtubeRef}
          className={`experience-scroll-reveal${youtubeVisible ? " visible" : ""} w-full max-w-[1280px]`}
          aria-label="YouTube videos"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[32px]">
            {YOUTUBE_VIDEOS.map((video) => (
              <YouTubeCard key={video.id} videoId={video.id} />
            ))}
          </div>
          <div className="text-center mt-[40px] md:mt-[56px]">
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sf text-[18px] leading-[1.4] text-accent hover:underline"
            >
              More on YouTube
            </a>
          </div>
        </section>

        {/* ── LinkedIn Section ── */}
        <section
          ref={linkedinRef}
          className={`experience-scroll-reveal${linkedinVisible ? " visible" : ""} w-full max-w-[1280px] mt-[80px] md:mt-[112px]`}
          aria-label="LinkedIn posts"
        >
          {linkedinVisible && (
            <div className="columns-1 md:columns-4 gap-[22px]">
              {LINKEDIN_POSTS.map((id) => (
                <LinkedInCard key={id} activityId={id} />
              ))}
            </div>
          )}
          <div className="text-center mt-[40px] md:mt-[56px]">
            <a
              href={LINKEDIN_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sf text-[18px] leading-[1.3] text-accent hover:underline"
            >
              More on LinkedIn
            </a>
          </div>
        </section>

        {/* ── Instagram Section ── */}
        <section
          ref={instagramRef}
          className={`experience-scroll-reveal${instagramVisible ? " visible" : ""} w-full max-w-[1280px] mt-[80px] md:mt-[112px]`}
          aria-label="Instagram reels"
        >
          {instagramVisible && (
            <div className="flex gap-[20px] md:gap-[40px] overflow-x-auto pb-4 scrollbar-hide">
              {INSTAGRAM_REELS.map((id) => (
                <div key={id} className="shrink-0">
                  <InstagramCard reelId={id} />
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-[40px] md:mt-[56px]">
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sf text-[18px] leading-[1.4] text-accent hover:underline"
            >
              More on Instagram
            </a>
          </div>
        </section>
      </main>

      <NavBar visible />
      <ContactLine visible />
    </div>
  );
}
