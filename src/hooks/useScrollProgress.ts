import { useEffect, useState, useRef } from "react";

export function useScrollProgress(containerRef: React.RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);
  const rafId = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const update = () => {
      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      if (scrollableHeight <= 0) {
        setProgress(0);
        return;
      }
      const scrolled = -rect.top;
      const clamped = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      setProgress(clamped);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, [containerRef]);

  return progress;
}
