import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";

interface VideoPlayerProps {
  src: string;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  className?: string;
  onEnded?: () => void;
  onCanPlay?: () => void;
}

export interface VideoPlayerHandle {
  play: () => Promise<void>;
  pause: () => void;
  reset: () => void;
}

export const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(
  ({ src, loop = false, muted = true, poster, className = "", onEnded, onCanPlay }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => ({
      play: async () => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          await videoRef.current.play();
        }
      },
      pause: () => {
        videoRef.current?.pause();
      },
      reset: () => {
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      },
    }));

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
        poster={poster}
        className={className}
        aria-hidden="true"
        preload="auto"
      />
    );
  }
);
