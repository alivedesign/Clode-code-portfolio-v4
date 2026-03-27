import { useSwipe } from "@/hooks/useSwipe";

interface MobileSwipeZoneProps {
  children: React.ReactNode;
  onNext: () => void;
  onPrev: () => void;
}

export function MobileSwipeZone({ children, onNext, onPrev }: MobileSwipeZoneProps) {
  const { onTouchStart, onTouchMove, onTouchEnd, dragDeltaX, isDragging } =
    useSwipe(onNext, onPrev);

  const handlePrev = () => {
    navigator.vibrate?.(10);
    onPrev();
  };

  const handleNext = () => {
    navigator.vibrate?.(10);
    onNext();
  };

  return (
    <div
      className="relative w-full h-full"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      {/* Left arrow */}
      <button
        type="button"
        aria-label="Previous pose"
        className="absolute left-[-40px] top-1/2 -translate-y-1/2 z-10 p-2 transition-transform duration-150 ease-out active:scale-[0.85]"
        style={{ WebkitTapHighlightColor: "transparent" }}
        onClick={handlePrev}
      >
        <img src="/arrow-left.svg" alt="" width={28} height={21} />
      </button>

      {/* Character area — shifts with drag */}
      <div
        className="w-full h-full"
        style={{
          transform: `translateX(${dragDeltaX}px)`,
          transition: isDragging ? "none" : "transform 300ms cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        {children}
      </div>

      {/* Right arrow */}
      <button
        type="button"
        aria-label="Next pose"
        className="absolute right-[-40px] top-1/2 -translate-y-1/2 z-10 p-2 transition-transform duration-150 ease-out active:scale-[0.85]"
        style={{ WebkitTapHighlightColor: "transparent" }}
        onClick={handleNext}
      >
        <img src="/arrow-right.svg" alt="" width={28} height={21} />
      </button>
    </div>
  );
}
