import { useEffect, useCallback } from "react";
import type { ProductCard } from "@/data/productsData";
import type { ModalBlock } from "@/data/productsData";

interface ProductModalProps {
  card: ProductCard | null;
  onClose: () => void;
}

function ModalBlockRenderer({ block }: { block: ModalBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="font-sf text-[18px] leading-[1.54] text-white/85">
          {block.text}
        </p>
      );
    case "callout":
      return (
        <div className="bg-white rounded-[8px] px-[12px] pt-[8px] pb-[6px] w-full">
          <p className="font-['TN',serif] font-[350] text-[20px] leading-[1.3] text-black">
            {block.text}
          </p>
        </div>
      );
    case "bulletList":
      return (
        <ul className="list-disc font-sf text-[18px] text-white/85 w-full">
          {block.items.map((item) => (
            <li key={item} className="mb-[6px] ms-[27px] leading-[1.54] last:mb-0">
              {item}
            </li>
          ))}
        </ul>
      );
    case "numberedList":
      return (
        <ol className="list-decimal font-sf text-[18px] text-white/85 w-full">
          {block.items.map((item) => (
            <li key={item} className="mb-[6px] ms-[27px] leading-[1.54] last:mb-0">
              {item}
            </li>
          ))}
        </ol>
      );
  }
}

export function ProductModal({ card, onClose }: ProductModalProps) {
  const isOpen = card !== null && card.modalContent !== undefined;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      // iOS requires position:fixed to truly prevent background scroll
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.overflow = "";
        document.removeEventListener("keydown", handleKeyDown);
        window.scrollTo(0, scrollY);
      };
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !card?.modalContent) return null;

  return (
    <div
      className="product-modal-backdrop"
      onClick={onClose}
    >
      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={card.name}
      >
        {/* Close button */}
        <button
          type="button"
          className="absolute top-[16px] right-[16px] z-10 w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className="product-modal-content">
          {/* Hero image */}
          <div className="w-full max-w-[636px] h-[200px] md:h-[270px] rounded-[16px] overflow-hidden shrink-0 mx-auto">
            <img
              src={card.modalContent.heroImage}
              alt={card.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content blocks */}
          {card.modalContent.blocks.map((block, i) => (
            <ModalBlockRenderer key={i} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
}
