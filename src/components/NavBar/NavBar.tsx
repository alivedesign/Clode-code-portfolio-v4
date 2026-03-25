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
    <nav
      className={`fixed bottom-[100px] left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      {/* Glass background layer — blur + displacement filter */}
      <div
        className="navbar-glass-layer absolute inset-0 rounded-[64px] bg-white/10 backdrop-blur-xl"
        style={{ filter: "url(#navbar-glass)" }}
        aria-hidden="true"
      />

      {/* Content layer — crisp, unfiltered text */}
      <div className="relative z-10 flex items-center gap-6 sm:gap-10 lg:gap-[56px] px-6 sm:px-10 lg:px-[48px] pt-[16px] pb-[14px] font-['Times_Now',serif] text-lg sm:text-xl lg:text-[24px] leading-[1.2] text-white whitespace-nowrap">
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
      </div>

      {/* SVG filter definitions (hidden) */}
      <LiquidGlassFilter />
    </nav>
  );
}
