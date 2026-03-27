import { useRef, useCallback } from "react";

const SWIPE_THRESHOLD = 50; // px

interface SwipeHandlers {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

export function useSwipe(
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
): SwipeHandlers {
  const startXRef = useRef<number | null>(null);
  const currentXRef = useRef<number | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    currentXRef.current = e.touches[0].clientX;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    currentXRef.current = e.touches[0].clientX;
  }, []);

  const onTouchEnd = useCallback(() => {
    if (startXRef.current === null || currentXRef.current === null) return;

    const deltaX = currentXRef.current - startXRef.current;

    if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
      if (deltaX < 0) {
        onSwipeLeft(); // swiped left → next pose
      } else {
        onSwipeRight(); // swiped right → previous pose
      }
    }

    startXRef.current = null;
    currentXRef.current = null;
  }, [onSwipeLeft, onSwipeRight]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}
