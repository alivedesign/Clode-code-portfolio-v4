import { useRef, useState, useEffect, useCallback } from "react";
import { VideoPlayer, type VideoPlayerHandle } from "./VideoPlayer";
import type { CharacterState } from "./useCharacterState";
import { POSE_PLAYBACK_RATE, POSE_START_TIME, POSE_NEAR_END_OFFSET } from "@/constants";

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
  const [poseVideoReady, setPoseVideoReady] = useState(false);

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
      // Force browser reflow to re-trigger CSS animation.
      // Without this, removing and re-adding a class in the same
      // synchronous block is batched and the animation won't restart.
      const el = containerRef.current;
      if (el) {
        el.classList.remove("animate-mask-c");
        void el.offsetWidth;
        el.classList.add("animate-mask-c");
      }
    }
    prevPhaseRef.current = state.phase;
  }, [state.phase]);

  // Reset poseVideoReady when pose changes or when leaving posing
  const isPosing = state.phase === "posing";
  const currentPose = isPosing ? state.pose : null;
  const prevPoseRef = useRef<string | null>(null);
  useEffect(() => {
    if (currentPose !== prevPoseRef.current) {
      setPoseVideoReady(false);
      prevPoseRef.current = currentPose;
    }
  }, [currentPose]);

  const handlePoseCanPlay = useCallback(() => {
    setPoseVideoReady(true);
  }, []);

  // Show reveal as fallback until pose video is ready to play
  const showReveal = !isPosing || !poseVideoReady;
  const showPoster = isPosing && state.videoEnded;
  const poseSrc = isPosing ? `/videos/pose-${state.pose}.mp4` : "";
  const posterSrc = isPosing ? `/images/poster-${state.pose}.webp` : "";
  const needsEdgeMask = isPosing && state.pose !== "products" && state.pose !== "content";
  const edgeMaskClass = needsEdgeMask ? "pose-edge-mask" : "";

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${videoPlaying ? "animate-mask-c" : "invisible"} ${className}`}
    >
      {/* Reveal video — always in DOM, stays visible as fallback until pose video is ready */}
      <VideoPlayer
        ref={revealRef}
        src="/videos/reveal.mp4"
        autoPlay
        fetchPriority="high"
        className={`absolute inset-0 w-full h-full object-cover bg-black ${showReveal ? "opacity-100" : "opacity-0"}`}
        onEnded={onRevealComplete}
      />

      {/* Pose video layer — key forces remount on pose change, autoPlay starts immediately */}
      {isPosing && (
        <VideoPlayer
          key={state.pose}
          src={poseSrc}
          autoPlay
          playbackRate={POSE_PLAYBACK_RATE}
          startTime={POSE_START_TIME}
          onNearEnd={onPoseVideoEnded}
          nearEndOffset={POSE_NEAR_END_OFFSET}
          onCanPlay={handlePoseCanPlay}
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
