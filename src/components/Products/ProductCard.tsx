import type { ProductCard as ProductCardType } from "@/data/productsData";

interface ProductCardProps {
  card: ProductCardType;
  index: number;
  onOpenModal?: (cardId: string) => void;
  staggerMs: number;
}

export function ProductCard({ card, index, onOpenModal, staggerMs }: ProductCardProps) {
  const handleClick = () => {
    if (card.link.type === "modal") {
      onOpenModal?.(card.id);
    } else if (card.link.type === "external") {
      window.open(card.link.url, "_blank", "noopener,noreferrer");
    }
  };

  const isClickable = card.link.type !== "none";

  return (
    <div
      className="experience-fade-up flex flex-col"
      style={{ animationDelay: `${(index + 1) * staggerMs}ms` }}
    >
      {/* Card clickable area */}
      <div
        className={`product-card group flex flex-col${isClickable ? " cursor-pointer" : ""}`}
        onClick={isClickable ? handleClick : undefined}
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={isClickable ? (e) => { if (e.key === "Enter") handleClick(); } : undefined}
      >
        {/* Image */}
        <div className="w-full aspect-[5/3] rounded-[16px] overflow-hidden bg-white/5">
          <img
            src={card.image}
            alt={`${card.name} ${card.description}`}
            className={`w-full h-full object-cover transition-transform duration-300${isClickable ? " group-hover:scale-[1.03]" : ""}`}
            loading="lazy"
          />
        </div>

        {/* Title */}
        <p className="mt-[24px] text-center font-['TN',serif] font-extralight text-[19px] md:text-[24px] leading-[1.3] tracking-[0.4px]">
          <span className="text-white">{card.name}</span>
          {card.description && (
            <span className="text-text-secondary"> {card.description}</span>
          )}
        </p>

        {/* Learn more */}
        <span className={`mt-[8px] text-accent text-[16px] font-sf text-center${isClickable ? " group-hover:underline" : ""}`}>
          Learn more
        </span>
      </div>
    </div>
  );
}
