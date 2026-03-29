import { useRef, useEffect } from "react";
import { DotLottie } from "@lottiefiles/dotlottie-web";

interface DotLottieCanvasProps {
  src: string;
  autoplay?: boolean;
  loop?: boolean;
  playWhenVisible?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function DotLottieCanvas({
  src,
  autoplay = true,
  loop = true,
  playWhenVisible = false,
  className,
  style,
}: DotLottieCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<DotLottie | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const shouldAutoplay = playWhenVisible ? false : autoplay;

    instanceRef.current = new DotLottie({
      canvas,
      src,
      autoplay: shouldAutoplay,
      loop,
    });

    if (!playWhenVisible) return () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          instanceRef.current?.play();
        } else {
          instanceRef.current?.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, [src, autoplay, loop, playWhenVisible]);

  return (
    <div className={className} style={{ lineHeight: 0, ...style }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
