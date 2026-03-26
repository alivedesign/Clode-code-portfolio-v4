import { useRef, useCallback } from "react";
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
  const glassRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLLIElement>, pose: CharacterPose) => {
      onHoverPose(pose);

      const li = e.currentTarget;
      const lens = lensRef.current;
      const glass = glassRef.current;
      if (!lens || !glass) return;

      const liRect = li.getBoundingClientRect();
      const glassRect = glass.getBoundingClientRect();
      const border = parseFloat(getComputedStyle(glass).borderLeftWidth) || 0;
      const left = liRect.left - glassRect.left - border + 8;
      const width = liRect.width - 16;

      lens.style.display = "flex";
      lens.style.width = `${width}px`;
      lens.style.transform = `translate(${left}px, 0)`;
    },
    [onHoverPose],
  );

  const handleMouseLeave = useCallback(() => {
    onLeavePose();
    if (lensRef.current) {
      lensRef.current.style.display = "none";
    }
  }, [onLeavePose]);

  return (
    <nav
      className={`fixed bottom-[100px] left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      {/* Outer wrap — shadow halo */}
      <div className="navbar-shadow-halo">
        {/* Glass pill */}
        <div ref={glassRef} className="navbar-glass">
          <ul className="navbar-list" onMouseLeave={handleMouseLeave}>
            {NAV_ITEMS.map((item) => (
              <li
                key={item.pose}
                onMouseEnter={(e) => handleMouseEnter(e, item.pose)}
              >
                <a href={item.href} className="navbar-tab">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <span ref={lensRef} className="navbar-lens" />
        </div>
      </div>
    </nav>
  );
}
