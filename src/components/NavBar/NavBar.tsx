import { NavItem } from "./NavItem";
import { LiquidGlassFilter } from "./LiquidGlass";
import type { CharacterPose } from "@/components/Character/useCharacterState";

const NAV_ITEMS: { label: string; pose: CharacterPose; href: string }[] = [
  { label: "Experience", pose: "experience", href: "#experience" },
  { label: "Products", pose: "products", href: "#products" },
  { label: "Cases", pose: "cases", href: "#cases" },
  { label: "Content", pose: "content", href: "#content" },
  { label: "About", pose: "about", href: "#about" },
  { label: "Resume", pose: "resume", href: "#resume" },
];

interface NavBarProps {
  onHoverPose: (pose: CharacterPose) => void;
  onLeavePose: () => void;
  visible?: boolean;
}

export function NavBar({ onHoverPose, onLeavePose, visible = true }: NavBarProps) {
  return (
    <>
      <LiquidGlassFilter />
      <nav
        className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-14 rounded-[64px] bg-glass px-12 pt-4 pb-3.5 font-['Times_Now',serif] text-2xl leading-[1.2] transition-all duration-500 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
        style={{ filter: "url(#liquid-glass-filter)" }}
      >
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.pose}
            label={item.label}
            pose={item.pose}
            href={item.href}
            onHover={onHoverPose}
            onLeave={onLeavePose}
          />
        ))}
      </nav>
    </>
  );
}
