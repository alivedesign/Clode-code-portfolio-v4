import { useState, useCallback, useEffect } from "react";
import { Character, useCharacterState } from "@/components/Character";
import { NavBar } from "@/components/NavBar";
import { Logo, HeroText, PoseText } from "@/components/Hero";
import { ContactLine } from "@/components/Layout/ContactLine";
import { MainLayout } from "@/components/Layout/MainLayout";
import { useVideoPreloader } from "@/hooks/useVideoPreloader";

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

  useEffect(() => {
    startReveal();
    const uiTimer = setTimeout(() => setRevealed(true), 2500);
    return () => clearTimeout(uiTimer);
  }, [startReveal]);

  // Start hero text typing shortly after reveal begins
  useEffect(() => {
    if (state.phase === "revealing" && !heroReady) {
      const timer = setTimeout(() => setHeroReady(true), 400);
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
      <Logo visible={revealed} />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+48px)] w-[300px] h-[300px] md:-translate-x-[calc(50%+24px)] md:w-[400px] md:h-[400px] lg:w-[550px] lg:h-[550px]">
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
      </div>

      <NavBar
        onHoverPose={hoverPose}
        onLeavePose={leavePose}
        visible={revealed}
      />

      <ContactLine visible={revealed} />
    </MainLayout>
  );
}
