import { useRef, useCallback, useState } from "react";

const SWIPE_THRESHOLD = 25; // px (lowered from 50)
const DAMPING = 0.4;
const MAX_OFFSET = 40; // px

interface SwipeState {
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  dragDeltaX: number;
  isDragging: boolean;
}

export function useSwipe(
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
): SwipeState {
  const startXRef = useRef<number | null>(null);
  const [dragDeltaX, setDragDeltaX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    setIsDragging(true);
    setDragDeltaX(0);
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (startXRef.current === null) return;
    const raw = e.touches[0].clientX - startXRef.current;
    const damped = raw * DAMPING;
    const clamped = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, damped));
    setDragDeltaX(clamped);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (startXRef.current === null) return;

    // Read final delta before resetting — derive from damped value
    const rawDelta = dragDeltaX / DAMPING;

    if (Math.abs(rawDelta) >= SWIPE_THRESHOLD) {
      if (rawDelta < 0) {
        onSwipeLeft();
      } else {
        onSwipeRight();
      }
    }

    startXRef.current = null;
    setIsDragging(false);
    setDragDeltaX(0);
  }, [dragDeltaX, onSwipeLeft, onSwipeRight]);

  return { onTouchStart, onTouchMove, onTouchEnd, dragDeltaX, isDragging };
}
