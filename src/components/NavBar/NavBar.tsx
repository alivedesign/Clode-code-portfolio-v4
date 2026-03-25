import { NavItem } from "./NavItem";
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
      {/* Outer wrap — shadow halo */}
      <div
        className="relative rounded-full"
        style={{
          filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5)) drop-shadow(0 12px 40px rgba(0, 0, 0, 0.4))",
        }}
      >
        {/* Glass pill — dark neumorphic surface */}
        <div
          className="navbar-glass-layer relative rounded-full"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: [
              "inset 0 1px 0 0 rgba(255, 255, 255, 0.09)",
              "inset 0 -1px 1px 0 rgba(0, 0, 0, 0.4)",
              "inset 0 0 12px 0 rgba(0, 0, 0, 0.15)",
              "0 0 0 1px rgba(0, 0, 0, 0.6)",
            ].join(", "),
            backdropFilter: "blur(40px) saturate(150%)",
            WebkitBackdropFilter: "blur(40px) saturate(150%)",
          }}
        >
          <div className="flex items-center gap-6 sm:gap-10 lg:gap-[56px] px-6 sm:px-10 lg:px-[48px] pt-[16px] pb-[14px] font-['Times_Now',serif] text-lg sm:text-xl lg:text-[24px] leading-[1.2] text-white/80 whitespace-nowrap">
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
        </div>

        {/* Shadow layer underneath */}
        <div
          className="absolute inset-0 -z-10 rounded-full"
          style={{
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)",
          }}
          aria-hidden="true"
        />
      </div>
    </nav>
  );
}
