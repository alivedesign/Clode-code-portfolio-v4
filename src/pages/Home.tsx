import { useState, useCallback, useEffect } from "react";
import { Character, useCharacterState, MobileSwipeZone } from "@/components/Character";
import { NavBar } from "@/components/NavBar";
import { Logo, HeroText, PoseText } from "@/components/Hero";
import { ContactLine } from "@/components/Layout/ContactLine";
import { MainLayout } from "@/components/Layout/MainLayout";
import { useVideoPreloader } from "@/hooks/useVideoPreloader";
import { usePageMeta } from "@/hooks/usePageMeta";
import { usePoseCycle } from "@/hooks/usePoseCycle";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { REVEAL_UI_DELAY, HERO_TYPING_DELAY } from "@/constants";

const POSE_VIDEOS = [
  "/videos/pose-experience.mp4",
  "/videos/pose-products.mp4",
  "/videos/pose-cases.mp4",
  "/videos/pose-content.mp4",
  "/videos/pose-about.mp4",
  "/videos/pose-resume.mp4",
];

export function Home() {
  const [revealed, setRevealed] = useState(false);
  const [heroReady, setHeroReady] = useState(false);
  const { state, startReveal, onRevealComplete, onPoseVideoEnded, hoverPose, leavePose } =
    useCharacterState();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { nextPose, prevPose } = usePoseCycle(hoverPose);

  usePageMeta(
    "Shkuratov Designer — Product Design Engineer",
    "Evgeny Shkuratov — Product Design Engineer with 8+ years shipping products people love. Portfolio, case studies, and experience.",
  );

  useEffect(() => {
    startReveal();
    const uiTimer = setTimeout(() => setRevealed(true), REVEAL_UI_DELAY);
    return () => clearTimeout(uiTimer);
  }, [startReveal]);

  // Start hero text typing shortly after reveal begins
  useEffect(() => {
    if (state.phase === "revealing" && !heroReady) {
      const timer = setTimeout(() => setHeroReady(true), HERO_TYPING_DELAY);
      return () => clearTimeout(timer);
    }
  }, [state.phase, heroReady]);

  const handleRevealComplete = useCallback(() => {
    onRevealComplete();
  }, [onRevealComplete]);

  useVideoPreloader(POSE_VIDEOS, revealed);

  const currentPose = state.phase === "posing" ? state.pose : null;

  return (
    <MainLayout>
      <header>
        <Logo visible={revealed} />
      </header>

      <main>
        <h1 className="sr-only">
          Evgeny Shkuratov — Product Design Engineer
        </h1>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+80px)] w-[300px] h-[300px] md:-translate-y-[calc(50%+48px)] md:-translate-x-[calc(50%+24px)] md:w-[400px] md:h-[400px] lg:w-[550px] lg:h-[550px]">
          {isMobile ? (
            <MobileSwipeZone onNext={nextPose} onPrev={prevPose}>
              <Character
                state={state}
                onRevealComplete={handleRevealComplete}
                onPoseVideoEnded={onPoseVideoEnded}
              />
              <HeroText
                visible={heroReady && state.phase !== "posing"}
                startTyping={heroReady}
              />
              <PoseText pose={revealed ? currentPose : null} />
            </MobileSwipeZone>
          ) : (
            <>
              <Character
                state={state}
                onRevealComplete={handleRevealComplete}
                onPoseVideoEnded={onPoseVideoEnded}
              />
              <HeroText
                visible={heroReady && state.phase !== "posing"}
                startTyping={heroReady}
              />
              <PoseText pose={revealed ? currentPose : null} />
            </>
          )}
        </div>
      </main>

      {/* Subtle glow for navbar frost effect */}
      <div
        className={`home-nav-glow transition-opacity duration-300 ${
          revealed ? "opacity-100" : "opacity-0"
        }`}
      />

      <NavBar
        onHoverPose={hoverPose}
        onLeavePose={leavePose}
        visible={revealed}
      />

      <ContactLine visible={revealed} />
    </MainLayout>
  );
}
