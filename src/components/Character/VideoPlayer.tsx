import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";

interface VideoPlayerProps {
  src: string;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  className?: string;
  onEnded?: () => void;
  onCanPlay?: () => void;
  onNearEnd?: () => void;
  nearEndOffset?: number;
  autoPlay?: boolean;
  playbackRate?: number;
  startTime?: number;
  fetchPriority?: "high" | "low" | "auto";
}

export interface VideoPlayerHandle {
  play: () => void;
  pause: () => void;
  reset: () => void;
  element: HTMLVideoElement | null;
}

export const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(
  ({ src, loop = false, muted = true, poster, className = "", onEnded, onCanPlay, onNearEnd, nearEndOffset = 0, autoPlay = false, playbackRate = 1, startTime = 0, fetchPriority }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => ({
      play: () => {
        const v = videoRef.current;
        if (v) {
          v.currentTime = 0;
          v.play().catch(() => {});
        }
      },
      pause: () => {
        videoRef.current?.pause();
      },
      reset: () => {
        const v = videoRef.current;
        if (v) {
          v.pause();
          v.currentTime = 0;
        }
      },
      element: videoRef.current,
    }));

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;
      video.playbackRate = playbackRate;
      if (startTime > 0) {
        const seekToStart = () => {
          video.currentTime = startTime;
          video.removeEventListener("loadedmetadata", seekToStart);
        };
        if (video.readyState >= 1) {
          video.currentTime = startTime;
        } else {
          video.addEventListener("loadedmetadata", seekToStart);
          return () => video.removeEventListener("loadedmetadata", seekToStart);
        }
      }
    }, [playbackRate, startTime]);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleEnded = () => onEnded?.();
      const handleCanPlay = () => onCanPlay?.();
      let nearEndFired = false;
      const handleTimeUpdate = () => {
        if (!nearEndFired && nearEndOffset > 0 && video.duration && video.currentTime >= video.duration - nearEndOffset) {
          nearEndFired = true;
          onNearEnd?.();
        }
      };

      video.addEventListener("ended", handleEnded);
      video.addEventListener("canplaythrough", handleCanPlay);
      if (nearEndOffset > 0) video.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        video.removeEventListener("ended", handleEnded);
        video.removeEventListener("canplaythrough", handleCanPlay);
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }, [onEnded, onCanPlay, onNearEnd, nearEndOffset]);

    return (
      <video
        ref={videoRef}
        src={src}
        loop={loop}
        muted={muted}
        playsInline
        autoPlay={autoPlay}
        poster={poster}
        className={className}
        aria-hidden="true"
        preload="auto"
        {...(fetchPriority ? { fetchPriority } as React.VideoHTMLAttributes<HTMLVideoElement> : {})}
      />
    );
  }
);
