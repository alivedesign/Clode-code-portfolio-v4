import { useState, useCallback, useEffect } from "react";
import { Character, useCharacterState } from "@/components/Character";
import { NavBar } from "@/components/NavBar";
import { Logo, HeroText } from "@/components/Hero";
import { ContactLine } from "@/components/Layout/ContactLine";
import { MainLayout } from "@/components/Layout/MainLayout";
import { useVideoPreloader } from "@/hooks/useVideoPreloader";
import type { CharacterPose } from "@/components/Character";

const POSE_VIDEOS = [
  "/videos/pose-experience.mp4",
  "/videos/pose-products.mp4",
  "/videos/pose-cases.mp4",
  "/videos/pose-content.mp4",
  "/videos/pose-about.mp4",
  "/videos/pose-resume.mp4",
  "/videos/transition.mp4",
];

export function Home() {
  const [revealed, setRevealed] = useState(false);
  const { state, startReveal, onRevealComplete, onTransitionComplete, hoverPose, leavePose } =
    useCharacterState();

  // Start reveal immediately on mount
  // Show UI 1 second before the video ends (~2.5s into a 3.5s video)
  useEffect(() => {
    startReveal();
    const uiTimer = setTimeout(() => setRevealed(true), 2500);
    return () => clearTimeout(uiTimer);
  }, [startReveal]);

  // When reveal video actually ends, transition to idle state
  const handleRevealComplete = useCallback(() => {
    onRevealComplete();
  }, [onRevealComplete]);

  // Preload pose videos after reveal
  useVideoPreloader(POSE_VIDEOS, revealed);

  return (
    <MainLayout>
      <Logo visible={revealed} />

      <Character
        state={state}
        onRevealComplete={handleRevealComplete}
        onTransitionComplete={onTransitionComplete}
        className="absolute left-1/2 top-1/2 -translate-x-[calc(50%+24px)] -translate-y-[calc(50%+48px)]"
      />

      <HeroText visible={revealed} />

      <NavBar
        onHoverPose={hoverPose}
        onLeavePose={leavePose}
        visible={revealed}
      />

      <ContactLine visible={revealed} />
    </MainLayout>
  );
}
