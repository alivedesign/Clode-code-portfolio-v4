import { useEffect, useRef, useCallback } from "react";

/**
 * Tracks how far a container has scrolled through the viewport (0 → 1).
 * Sets --timeline-progress CSS custom property on the element.
 */
export function useScrollProgress(): React.RefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement | null>(null);
  const rafId = useRef(0);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const windowH = window.innerHeight;

    // progress 0 = container top just entered viewport bottom
    // progress 1 = container bottom just left viewport top
    const totalTravel = windowH + rect.height;
    const traveled = windowH - rect.top;
    const progress = Math.min(1, Math.max(0, traveled / totalTravel));

    el.style.setProperty("--timeline-progress", String(progress));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(update);
    };

    update(); // initial
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update]);

  return ref;
}
