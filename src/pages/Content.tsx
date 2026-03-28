import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Logo } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { ContactLine } from "@/components/Layout/ContactLine";
import { useInView } from "@/hooks/useInView";
import {
  CONTENT_HEADLINE,
  YOUTUBE_VIDEOS,
  YOUTUBE_CHANNEL_URL,
  LINKEDIN_POSTS,
  LINKEDIN_PROFILE_URL,
  INSTAGRAM_REELS,
  INSTAGRAM_PROFILE_URL,
} from "@/data/contentData";
import type { LinkedInPost, InstagramReel } from "@/data/contentData";

/* ── YouTube thumbnail card ── */
function YouTubeCard({ videoId }: { videoId: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative w-full rounded-[24px] overflow-hidden opacity-65 hover:opacity-100 hover:scale-[1.02] transition-all duration-300" style={{ paddingBottom: "56.25%" }}>
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

/* ── LinkedIn custom card ── */
function LinkedInCard({ post }: { post: LinkedInPost }) {
  return (
    <a
      href={`https://www.linkedin.com/feed/update/urn:li:activity:${post.activityId}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block break-inside-avoid mb-[22px]"
    >
      {/* Image */}
      <div className="rounded-[16px] overflow-hidden bg-white/5">
        <img
          src={post.image}
          alt=""
          className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </div>
      {/* Author + text */}
      <div className="mt-[16px]">
        <div className="flex items-center gap-[10px] mb-[12px]">
          <img
            src="/images/content/avatar.jpg"
            alt=""
            className="w-[28px] h-[28px] rounded-full object-cover shrink-0"
          />
          <p className="text-white text-[13px] font-medium leading-tight">Evgeny Shkuratov</p>
          <svg className="ml-auto shrink-0 w-[14px] h-[14px]" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </div>
        <p className="text-text-secondary text-[13px] leading-[1.5] whitespace-pre-line line-clamp-[6]">{post.text}</p>
        <div className="mt-[10px] flex items-center gap-3">
          <span className="text-text-secondary/60 text-[12px]">{post.likes} likes</span>
          <span className="text-text-secondary/60 text-[12px]">{post.comments} comments</span>
        </div>
      </div>
    </a>
  );
}

/* ── Instagram cover card (links to Reel) ── */
function InstagramCoverCard({ reel }: { reel: InstagramReel }) {
  return (
    <a
      href={`https://www.instagram.com/reel/${reel.reelId}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="block shrink-0 w-[200px] md:w-[300px] h-[356px] md:h-[533px] rounded-[24px] overflow-hidden group [-webkit-tap-highlight-color:transparent]"
    >
      <img
        src={reel.cover}
        alt=""
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        loading="lazy"
      />
    </a>
  );
}

/* ── Instagram carousel with Embla ── */
function InstagramSlider({ reels }: { reels: InstagramReel[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      {/* Embla viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-[28px] md:gap-[56px]">
          {reels.map((reel) => (
            <InstagramCoverCard key={reel.reelId} reel={reel} />
          ))}
        </div>
      </div>

      {/* Prev arrow — desktop only */}
      <button
        type="button"
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canScrollPrev}
        className={`hidden md:flex absolute left-[-48px] top-1/2 -translate-y-1/2 p-2 cursor-pointer transition-all duration-300 hover:brightness-200 hover:scale-110 ${canScrollPrev ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        aria-label="Scroll left"
      >
        <img src="/arrow-left.svg" alt="" width={28} height={21} />
      </button>

      {/* Next arrow — desktop only */}
      <button
        type="button"
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canScrollNext}
        className={`hidden md:flex absolute right-[-48px] top-1/2 -translate-y-1/2 p-2 cursor-pointer transition-all duration-300 hover:brightness-200 hover:scale-110 ${canScrollNext ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        aria-label="Scroll right"
      >
        <img src="/arrow-right.svg" alt="" width={28} height={21} />
      </button>
    </div>
  );
}

/* ── Main Content page ── */
export function Content() {
  const [youtubeRef, youtubeVisible] = useInView(0.1);
  const [linkedinRef, linkedinVisible] = useInView(0.1);
  const [instagramRef, instagramVisible] = useInView(0.1);

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
          <div className="grid grid-cols-2 gap-[16px] md:gap-[48px]">
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
          <div className="columns-2 md:columns-4 gap-[16px] md:gap-[22px]">
            {LINKEDIN_POSTS.map((post) => (
              <LinkedInCard key={post.activityId} post={post} />
            ))}
          </div>
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
          <InstagramSlider reels={INSTAGRAM_REELS} />
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
