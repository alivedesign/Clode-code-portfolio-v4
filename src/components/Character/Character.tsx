import { useRef, useState, useEffect } from "react";
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

  const prevPhaseRef = useRef(state.phase);

  useEffect(() => {
    if (state.phase === "revealing" && prevPhaseRef.current === "posing") {
      revealRef.current?.play();
    }
    prevPhaseRef.current = state.phase;
  }, [state.phase]);

  const showReveal = state.phase === "loading" || state.phase === "revealing" || state.phase === "idle";
  const isPosing = state.phase === "posing";
  const showPoster = isPosing && state.videoEnded;
  const poseSrc = isPosing ? `/videos/pose-${state.pose}.mp4` : "";
  const posterSrc = isPosing ? `/images/poster-${state.pose}.png` : "";
  const needsEdgeMask = isPosing && state.pose !== "products" && state.pose !== "content";
  const edgeMaskClass = needsEdgeMask ? "pose-edge-mask" : "";

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
        onEnded={onRevealComplete}
      />

      {/* Pose video layer — key forces remount on pose change, autoPlay starts immediately */}
      {isPosing && (
        <VideoPlayer
          key={state.pose}
          src={poseSrc}
          autoPlay
          playbackRate={1.25}
          startTime={0.8}
          onNearEnd={onPoseVideoEnded}
          nearEndOffset={0.3}
          className={`absolute inset-0 w-full h-full object-cover bg-black ${edgeMaskClass} ${isPosing ? "opacity-100" : "opacity-0"}`}
        />
      )}

      {/* Poster image — always in DOM when posing, toggled via opacity to avoid flash */}
      {isPosing && (
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${edgeMaskClass} ${showPoster ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
