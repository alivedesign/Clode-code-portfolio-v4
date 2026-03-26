import { useState, useRef, useCallback } from "react";
import type { CharacterPose } from "@/components/Character/useCharacterState";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const NAV_ITEMS: { label: string; pose: CharacterPose; href: string }[] = [
  { label: "Experience", pose: "experience", href: "#experience" },
  { label: "Products", pose: "products", href: "#products" },
  { label: "Cases", pose: "cases", href: "#cases" },
  { label: "Content", pose: "content", href: "#content" },
  { label: "About", pose: "about", href: "#about" },
  { label: "Resume", pose: "resume", href: "#resume" },
];

const MAIN_NAV_ITEMS: { label: string; pose: CharacterPose; href: string }[] = [
  { label: "Experience", pose: "experience", href: "#experience" },
  { label: "Products", pose: "products", href: "#products" },
  { label: "Cases", pose: "cases", href: "#cases" },
];

const MENU_NAV_ITEMS: { label: string; href: string }[] = [
  { label: "Content", href: "#content" },
  { label: "About", href: "#about" },
  { label: "Resume", href: "#resume" },
];

interface NavBarProps {
  onHoverPose: (pose: CharacterPose) => void;
  onLeavePose: () => void;
  visible?: boolean;
}

export function NavBar({ onHoverPose, onLeavePose, visible = true }: NavBarProps) {
  const glassRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLSpanElement>(null);

  const isMobile = useMediaQuery("(max-width: 767px)");
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

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

  const openMenu = useCallback(() => {
    if (menuBtnRef.current && overlayRef.current) {
      const rect = menuBtnRef.current.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;
      overlayRef.current.style.transformOrigin = `${originX}px ${originY}px`;
    }
    setMenuOpen(true);
    setMenuClosing(false);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuClosing(true);
    const timer = setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  if (!isMobile) {
    // ── Desktop (existing code, unchanged) ──
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

  // ── Mobile ──
  return (
    <>
      {/* Menu Overlay */}
      {menuOpen && (
        <div
          ref={overlayRef}
          className={`menu-overlay ${menuClosing ? "closing" : "open"}`}
        >
          <nav className="menu-overlay-items">
            {MENU_NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="menu-overlay-link"
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="menu-overlay-contact">
            <span>Reach me at shkuratovdesigner@gmail.com or </span>
            <a href="#book" className="text-accent">Book a Call</a>
          </div>

          {/* Bottom bar inside overlay */}
          <div className="menu-overlay-bottom-bar">
            <div className="navbar-shadow-halo">
              <div className="navbar-glass mobile-nav-pill">
                {MAIN_NAV_ITEMS.map((item) => (
                  <a
                    key={item.pose}
                    href={item.href}
                    className="mobile-nav-tab"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="navbar-shadow-halo">
              <button
                className="navbar-glass mobile-menu-btn"
                onClick={closeMenu}
              >
                <div className="hamburger open">
                  <span className="hamburger-line" />
                  <span className="hamburger-line" />
                  <span className="hamburger-line" />
                </div>
                <span className="hamburger-close-text visible">Close</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Nav Bar */}
      {!menuOpen && (
        <div
          className={`mobile-nav transition-all duration-300 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
          }`}
        >
          <div className="navbar-shadow-halo">
            <div className="navbar-glass mobile-nav-pill">
              {MAIN_NAV_ITEMS.map((item) => (
                <a
                  key={item.pose}
                  href={item.href}
                  className="mobile-nav-tab"
                  onClick={() => onHoverPose(item.pose)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="navbar-shadow-halo">
            <button
              ref={menuBtnRef}
              className="navbar-glass mobile-menu-btn"
              onClick={openMenu}
            >
              <div className="hamburger">
                <span className="hamburger-line" />
                <span className="hamburger-line" />
                <span className="hamburger-line" />
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
