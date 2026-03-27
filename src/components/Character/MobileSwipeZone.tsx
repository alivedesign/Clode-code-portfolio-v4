import { useSwipe } from "@/hooks/useSwipe";

interface MobileSwipeZoneProps {
  children: React.ReactNode;
  onNext: () => void;
  onPrev: () => void;
}

export function MobileSwipeZone({ children, onNext, onPrev }: MobileSwipeZoneProps) {
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(onNext, onPrev);

  return (
    <div
      className="relative"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Left arrow */}
      <button
        type="button"
        aria-label="Previous pose"
        className="absolute left-[-40px] top-1/2 -translate-y-1/2 z-10 p-2"
        style={{ WebkitTapHighlightColor: "transparent" }}
        onClick={onPrev}
      >
        <img src="/arrow-left.svg" alt="" width={28} height={21} />
      </button>

      {/* Character area */}
      {children}

      {/* Right arrow */}
      <button
        type="button"
        aria-label="Next pose"
        className="absolute right-[-40px] top-1/2 -translate-y-1/2 z-10 p-2"
        style={{ WebkitTapHighlightColor: "transparent" }}
        onClick={onNext}
      >
        <img src="/arrow-right.svg" alt="" width={28} height={21} />
      </button>
    </div>
  );
}
