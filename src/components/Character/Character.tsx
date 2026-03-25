import { useRef, useState, useEffect, useCallback } from "react";
import { VideoPlayer, type VideoPlayerHandle } from "./VideoPlayer";
import type { CharacterState } from "./useCharacterState";

interface CharacterProps {
  state: CharacterState;
  onRevealComplete: () => void;
  onTransitionComplete: () => void;
  className?: string;
}

export function Character({ state, onRevealComplete, onTransitionComplete, className = "" }: CharacterProps) {
  const revealRef = useRef<VideoPlayerHandle>(null);
  const poseRef = useRef<VideoPlayerHandle>(null);
  const transitionRef = useRef<VideoPlayerHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Wait for the video to actually start rendering pixels before showing
  // timeupdate fires after real frames are decoded and painted — no flash
  useEffect(() => {
    const video = containerRef.current?.querySelector("video");
    if (!video) return;

    const onFirstFrame = () => {
      // Use requestAnimationFrame to ensure the browser has composited the frame
      requestAnimationFrame(() => {
        setVideoPlaying(true);
      });
      video.removeEventListener("timeupdate", onFirstFrame);
    };

    video.addEventListener("timeupdate", onFirstFrame);
    return () => video.removeEventListener("timeupdate", onFirstFrame);
  }, []);

  // Handle pose transitions
  useEffect(() => {
    if (state.phase === "transitioning-to-pose" || state.phase === "transitioning-to-idle") {
      transitionRef.current?.play();
    }
    if (state.phase === "posing") {
      poseRef.current?.play();
    }
  }, [state]);

  const handleRevealEnded = useCallback(() => {
    onRevealComplete();
  }, [onRevealComplete]);

  const handleTransitionEnded = useCallback(() => {
    onTransitionComplete();
  }, [onTransitionComplete]);

  const getPoseSrc = () => {
    if (state.phase === "transitioning-to-pose" || state.phase === "posing") {
      return `/videos/pose-${state.pose}.mp4`;
    }
    return "";
  };

  const showReveal = state.phase === "loading" || state.phase === "revealing" || state.phase === "idle";
  const showPose = state.phase === "posing";

  return (
    <div
      ref={containerRef}
      className={`relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[550px] lg:h-[550px] ${videoPlaying ? "animate-mask-c" : "invisible"} ${className}`}
    >
      {/* Reveal video — always in DOM, plays immediately via autoPlay */}
      <VideoPlayer
        ref={revealRef}
        src="/videos/reveal.mp4"
        autoPlay
        className={`absolute inset-0 w-full h-full object-cover bg-black ${showReveal ? "opacity-100" : "opacity-0"}`}
        onEnded={handleRevealEnded}
      />

      {/* Pose video layer */}
      {getPoseSrc() && (
        <VideoPlayer
          ref={poseRef}
          src={getPoseSrc()}
          loop
          className={`absolute inset-0 w-full h-full object-cover bg-black transition-opacity duration-200 ${showPose ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {/* Transition video layer */}
      <VideoPlayer
        ref={transitionRef}
        src="/videos/transition.mp4"
        className="absolute inset-0 w-full h-full object-cover bg-black opacity-0"
        onEnded={handleTransitionEnded}
      />
    </div>
  );
}
