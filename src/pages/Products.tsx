import { useState, useEffect, useCallback } from "react";
import { Logo } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { ContactLine } from "@/components/Layout/ContactLine";
import { ProductCard, ProductModal } from "@/components/Products";
import { EXPERIENCE_STAGGER_MS } from "@/constants";
import { PRODUCTS_HEADLINE, PRODUCT_CARDS } from "@/data/productsData";

export function Products() {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Products — Shkuratov Designer";
  }, []);

  const openModal = useCallback((cardId: string) => {
    setActiveModalId(cardId);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModalId(null);
  }, []);

  const activeCard = activeModalId
    ? PRODUCT_CARDS.find((c) => c.id === activeModalId) ?? null
    : null;

  return (
    <div className="relative min-h-screen min-h-dvh w-full bg-black">
      <Logo visible />

      <main className="relative z-10 flex flex-col items-center px-5 md:px-10 pt-[104px] md:pt-[104px] pb-[164px] md:pb-[320px]">
        {/* Headline */}
        <h1 className="experience-fade-up text-[28px] md:text-[48px] leading-[1.2] text-white text-center tracking-[-0.48px] max-w-[765px] mb-[48px] md:mb-[64px] font-['TN',serif] font-extralight">
          {PRODUCTS_HEADLINE}
        </h1>

        {/* Product grid */}
        <section aria-label="Products" className="w-full max-w-[1080px]">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-2 gap-x-[16px] gap-y-[32px] md:gap-[80px]">
            {PRODUCT_CARDS.map((card, i) => (
              <ProductCard
                key={card.id}
                card={card}
                index={i}
                onOpenModal={openModal}
                staggerMs={EXPERIENCE_STAGGER_MS}
              />
            ))}
          </div>
        </section>
      </main>

      <NavBar visible />
      <ContactLine visible />

      {/* Modal */}
      <ProductModal card={activeCard} onClose={closeModal} />
    </div>
  );
}
