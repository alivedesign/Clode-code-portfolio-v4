import { useRef, useEffect, useCallback } from "react";
import { VideoPlayer, type VideoPlayerHandle } from "./VideoPlayer";
import type { CharacterState } from "./useCharacterState";

const VIDEO_SOURCES: Record<string, string> = {
  reveal: "/videos/reveal.mp4",
  transition: "/videos/transition.mp4",
  "pose-experience": "/videos/pose-experience.mp4",
  "pose-products": "/videos/pose-products.mp4",
  "pose-cases": "/videos/pose-cases.mp4",
  "pose-content": "/videos/pose-content.mp4",
  "pose-about": "/videos/pose-about.mp4",
  "pose-resume": "/videos/pose-resume.mp4",
};

interface CharacterProps {
  state: CharacterState;
  onRevealComplete: () => void;
  onTransitionComplete: () => void;
  className?: string;
}

export function Character({ state, onRevealComplete, onTransitionComplete, className = "" }: CharacterProps) {
  const frontRef = useRef<VideoPlayerHandle>(null);
  const transitionRef = useRef<VideoPlayerHandle>(null);

  // Handle state transitions by playing appropriate videos
  useEffect(() => {
    switch (state.phase) {
      case "revealing":
        frontRef.current?.play();
        break;
      case "transitioning-to-pose":
        transitionRef.current?.play();
        break;
      case "posing":
        frontRef.current?.play();
        break;
      case "transitioning-to-idle":
        transitionRef.current?.play();
        break;
    }
  }, [state]);

  const getCurrentSrc = () => {
    switch (state.phase) {
      case "loading":
      case "revealing":
      case "idle":
      case "transitioning-to-idle":
        return VIDEO_SOURCES.reveal;
      case "transitioning-to-pose":
      case "posing":
        return VIDEO_SOURCES[`pose-${state.pose}`] || VIDEO_SOURCES.reveal;
      default:
        return VIDEO_SOURCES.reveal;
    }
  };

  const handleRevealEnded = useCallback(() => {
    onRevealComplete();
  }, [onRevealComplete]);

  const handleTransitionEnded = useCallback(() => {
    onTransitionComplete();
  }, [onTransitionComplete]);

  return (
    <div className={`relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[550px] lg:h-[550px] ${className}`}>
      {/* Main video layer */}
      <VideoPlayer
        ref={frontRef}
        src={getCurrentSrc()}
        loop={state.phase === "posing"}
        poster="/images/character-poster.webp"
        className="absolute inset-0 w-full h-full object-cover"
        onEnded={state.phase === "revealing" ? handleRevealEnded : undefined}
      />

      {/* Transition video layer */}
      <VideoPlayer
        ref={transitionRef}
        src={VIDEO_SOURCES.transition}
        className="absolute inset-0 w-full h-full object-cover"
        onEnded={handleTransitionEnded}
      />
    </div>
  );
}
