import { useRef, useState, useEffect, useCallback } from "react";
import { VideoPlayer, type VideoPlayerHandle } from "./VideoPlayer";
import type { CharacterState } from "./useCharacterState";

interface CharacterProps {
  state: CharacterState;
  onRevealComplete: () => void;
  onPoseVideoEnded: () => void;
  className?: string;
}

export function Character({ state, onRevealComplete, onPoseVideoEnded, className = "" }: CharacterProps) {
  const revealRef = useRef<VideoPlayerHandle>(null);
  const poseRef = useRef<VideoPlayerHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const video = containerRef.current?.querySelector("video");
    if (!video) return;

    const onFirstFrame = () => {
      requestAnimationFrame(() => {
        setVideoPlaying(true);
      });
      video.removeEventListener("timeupdate", onFirstFrame);
    };

    video.addEventListener("timeupdate", onFirstFrame);
    return () => video.removeEventListener("timeupdate", onFirstFrame);
  }, []);

  // Play pose video immediately when entering posing state
  useEffect(() => {
    if (state.phase === "posing" && !state.videoEnded) {
      poseRef.current?.play();
    }
  }, [state]);

  const handleRevealEnded = useCallback(() => {
    onRevealComplete();
  }, [onRevealComplete]);

  const handlePoseEnded = useCallback(() => {
    onPoseVideoEnded();
  }, [onPoseVideoEnded]);

  const showReveal = state.phase === "loading" || state.phase === "revealing" || state.phase === "idle";
  const isPosing = state.phase === "posing";
  const showPoseVideo = isPosing && !state.videoEnded;
  const showPoster = isPosing && state.videoEnded;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${videoPlaying ? "animate-mask-c" : "invisible"} ${className}`}
    >
      {/* Reveal video — always in DOM, plays immediately via autoPlay */}
      <VideoPlayer
        ref={revealRef}
        src="/videos/reveal.mp4"
        autoPlay
        className={`absolute inset-0 w-full h-full object-cover bg-black ${showReveal ? "opacity-100" : "opacity-0"}`}
        onEnded={handleRevealEnded}
      />

      {/* Pose video layer — key forces remount on pose change */}
      {isPosing && (
        <VideoPlayer
          key={state.pose}
          ref={poseRef}
          src={`/videos/pose-${state.pose}.mp4`}
          onEnded={handlePoseEnded}
          className={`absolute inset-0 w-full h-full object-cover bg-black transition-opacity duration-200 ${showPoseVideo ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {/* Poster image — shown after pose video ends */}
      {showPoster && (
        <img
          src={`/images/poster-${state.pose}.png`}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover bg-black"
        />
      )}
    </div>
  );
}
