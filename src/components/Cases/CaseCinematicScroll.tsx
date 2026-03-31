import { useRef, useEffect, useCallback } from "react";
import type { CaseData } from "@/data/casesData";
import { useVideoFrames } from "@/hooks/useVideoFrames";
import { CaseTitle } from "./CaseTitle";

interface CaseCinematicScrollProps {
  caseData: CaseData;
}

export function CaseCinematicScroll({ caseData }: CaseCinematicScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const leftImgRef = useRef<HTMLDivElement>(null);
  const rightImgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const lastFrameIndex = useRef(-1);
  const rafId = useRef(0);
  const canvasSized = useRef(false);

  const { frames, loading } = useVideoFrames(caseData.frameSrc!, 144, 0.4);

  // Set canvas dimensions once when frames load
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || frames.length === 0 || canvasSized.current) return;

    canvas.width = frames[0].width;
    canvas.height = frames[0].height;
    ctxRef.current = canvas.getContext("2d");
    canvasSized.current = true;

    // Draw first frame immediately
    if (ctxRef.current) {
      ctxRef.current.drawImage(frames[0], 0, 0);
    }
  }, [frames]);

  // All scroll-driven updates happen here — no React state, no re-renders
  const onScroll = useCallback(() => {
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container || frames.length === 0) return;

      // Calculate progress
      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollableHeight));

      // Fade canvas in during first 5% of scroll
      if (canvasWrapRef.current) {
        const canvasOpacity = Math.max(0, Math.min(1, progress / 0.05));
        canvasWrapRef.current.style.opacity = String(canvasOpacity);
      }

      // Draw frame (only if changed)
      const frameProgress = Math.min(progress / 0.8, 1);
      const frameIndex = Math.min(
        Math.floor(frameProgress * (frames.length - 1)),
        frames.length - 1,
      );

      if (frameIndex !== lastFrameIndex.current) {
        const ctx = ctxRef.current;
        if (ctx) {
          ctx.drawImage(frames[frameIndex], 0, 0);
          lastFrameIndex.current = frameIndex;
        }
      }

      // Side images: fade in at 70-90%
      const sideOpacity = Math.max(0, Math.min(1, (progress - 0.7) / 0.2));
      const sideTranslate = (1 - sideOpacity) * 40;

      if (leftImgRef.current) {
        leftImgRef.current.style.opacity = String(sideOpacity);
        leftImgRef.current.style.transform = `translateX(${-sideTranslate}px) translateY(-50%)`;
      }
      if (rightImgRef.current) {
        rightImgRef.current.style.opacity = String(sideOpacity);
        rightImgRef.current.style.transform = `translateX(${sideTranslate}px) translateY(-50%)`;
      }

      // Title: fade in at 80-100%
      const titleOpacity = Math.max(0, Math.min(1, (progress - 0.8) / 0.2));
      const titleTranslate = (1 - titleOpacity) * 20;

      if (titleRef.current) {
        titleRef.current.style.opacity = String(titleOpacity);
        titleRef.current.style.transform = `translateY(${titleTranslate}px)`;
      }

      // Show/hide title link based on animation progress
      if (titleRef.current) {
        titleRef.current.style.pointerEvents = progress >= 0.8 ? "auto" : "none";
      }
    });
  }, [frames]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial draw
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [onScroll]);

  return (
    <div ref={containerRef} className="relative z-0" style={{ height: "250vh", marginTop: "-60vh" }}>
      <div className="sticky top-0 h-screen h-dvh flex flex-col items-center justify-center">
        {/* Canvas / Poster */}
        <div className="relative flex items-center justify-center w-full max-w-[1280px] px-5 md:px-10">
          {/* Left image */}
          {caseData.sideImages && (
            <div
              ref={leftImgRef}
              className="hidden md:block absolute left-10 top-1/2 w-[302px] rounded-[14px] overflow-hidden"
              style={{ opacity: 0, transform: "translateX(-40px) translateY(-50%)" }}
            >
              <img
                src={caseData.sideImages[0]}
                alt=""
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          )}

          {/* Character canvas */}
          <div
            ref={canvasWrapRef}
            className="relative w-[500px] h-[500px] flex-shrink-0"
            style={{ opacity: 0 }}
          >
            {loading ? (
              <img
                src={caseData.posterSrc}
                alt=""
                className="w-full h-full object-contain"
              />
            ) : (
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ willChange: "contents" }}
              />
            )}
          </div>

          {/* Right image */}
          {caseData.sideImages && (
            <div
              ref={rightImgRef}
              className="hidden md:block absolute right-10 top-1/2 w-[302px] rounded-[14px] overflow-hidden"
              style={{ opacity: 0, transform: "translateX(40px) translateY(-50%)" }}
            >
              <img
                src={caseData.sideImages[1]}
                alt=""
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* Title below character */}
        <div
          ref={titleRef}
          className="mt-[32px] flex justify-center"
          style={{ opacity: 0, transform: "translateY(20px)", pointerEvents: "none" }}
        >
          <CaseTitle segments={caseData.title} link={caseData.link} />
        </div>
      </div>
    </div>
  );
}
