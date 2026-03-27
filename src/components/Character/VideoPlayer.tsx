import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";

interface VideoPlayerProps {
  src: string;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  className?: string;
  onEnded?: () => void;
  onCanPlay?: () => void;
  autoPlay?: boolean;
  playbackRate?: number;
}

export interface VideoPlayerHandle {
  play: () => void;
  pause: () => void;
  reset: () => void;
  element: HTMLVideoElement | null;
}

export const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(
  ({ src, loop = false, muted = true, poster, className = "", onEnded, onCanPlay, autoPlay = false, playbackRate = 1 }, ref) => {
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
      if (videoRef.current) {
        videoRef.current.playbackRate = playbackRate;
      }
    }, [playbackRate]);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleEnded = () => onEnded?.();
      const handleCanPlay = () => onCanPlay?.();

      video.addEventListener("ended", handleEnded);
      video.addEventListener("canplaythrough", handleCanPlay);

      return () => {
        video.removeEventListener("ended", handleEnded);
        video.removeEventListener("canplaythrough", handleCanPlay);
      };
    }, [onEnded, onCanPlay]);

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
      />
    );
  }
);
