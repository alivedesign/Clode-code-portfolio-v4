import type { ProductCard as ProductCardType } from "@/data/productsData";

interface ProductCardProps {
  card: ProductCardType;
  index: number;
  onOpenModal?: (cardId: string) => void;
  staggerMs: number;
}

export function ProductCard({ card, index, onOpenModal, staggerMs }: ProductCardProps) {
  const handleLearnMore = () => {
    if (card.link.type === "modal") {
      onOpenModal?.(card.id);
    }
  };

  return (
    <div
      className="experience-fade-up flex flex-col"
      style={{ animationDelay: `${(index + 1) * staggerMs}ms` }}
    >
      {/* Image */}
      <div className="w-full aspect-[5/3] rounded-[16px] overflow-hidden bg-white/5">
        <img
          src={card.image}
          alt={`${card.name} ${card.description}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Title */}
      <p className="mt-[24px] text-center font-['TN',serif] font-extralight text-[20px] md:text-[24px] leading-[1.3] tracking-[-0.48px]">
        <span className="text-white">{card.name}</span>
        {card.description && (
          <span className="text-text-secondary"> {card.description}</span>
        )}
      </p>

      {/* Learn more link */}
      {card.link.type === "modal" && (
        <button
          type="button"
          className="mt-[8px] text-accent text-[16px] font-sf cursor-pointer bg-transparent border-none text-center hover:underline"
          onClick={handleLearnMore}
        >
          Learn more
        </button>
      )}
      {card.link.type === "external" && (
        <a
          href={card.link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-[8px] text-accent text-[16px] font-sf text-center hover:underline"
        >
          Learn more
        </a>
      )}
    </div>
  );
}
