import { useRef, useEffect } from "react";
import { DotLottie } from "@lottiefiles/dotlottie-web";

interface DotLottieCanvasProps {
  src: string;
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function DotLottieCanvas({
  src,
  autoplay = true,
  loop = true,
  className,
  style,
}: DotLottieCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instanceRef = useRef<DotLottie | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    instanceRef.current = new DotLottie({
      canvas,
      src,
      autoplay,
      loop,
    });

    return () => {
      instanceRef.current?.destroy();
      instanceRef.current = null;
    };
  }, [src, autoplay, loop]);

  return (
    <div className={className} style={{ lineHeight: 0, ...style }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
