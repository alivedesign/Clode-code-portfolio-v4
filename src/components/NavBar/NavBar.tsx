import { useState, useRef, useCallback, useEffect } from "react";
import { Link, useLocation } from "react-router";
import type { CharacterPose } from "@/components/Character/useCharacterState";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const NAV_ITEMS: { label: string; pose: CharacterPose; path: string }[] = [
  { label: "Experience", pose: "experience", path: "/experience" },
  { label: "Products", pose: "products", path: "/products" },
  { label: "Cases", pose: "cases", path: "/cases" },
  { label: "Content", pose: "content", path: "/" },
  { label: "About", pose: "about", path: "/" },
  { label: "Resume", pose: "resume", path: "/" },
];

const MAIN_NAV_ITEMS: { label: string; pose: CharacterPose; path: string }[] = [
  { label: "Experience", pose: "experience", path: "/experience" },
  { label: "Products", pose: "products", path: "/products" },
  { label: "Cases", pose: "cases", path: "/cases" },
];

const MENU_NAV_ITEMS: { label: string; path: string }[] = [
  { label: "Content", path: "/" },
  { label: "About", path: "/" },
  { label: "Resume", path: "/" },
];

interface NavBarProps {
  onHoverPose?: (pose: CharacterPose) => void;
  onLeavePose?: () => void;
  visible?: boolean;
}

export function NavBar({ onHoverPose, onLeavePose, visible = true }: NavBarProps) {
  const location = useLocation();
  const glassRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLSpanElement>(null);

  const isMobile = useMediaQuery("(max-width: 767px)");
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLLIElement>, pose: CharacterPose) => {
      onHoverPose?.(pose);

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
    onLeavePose?.();
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
    }, 350);
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
        {/* Frost backdrop — outside shadow-halo so backdrop-filter works */}
        <div className="nav-frost-pill" />
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
                  <Link
                    to={item.path}
                    className={`navbar-tab ${item.path !== "/" && location.pathname === item.path ? "navbar-tab-active" : ""}`}
                  >
                    {item.label}
                  </Link>
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
      {/* Menu Overlay — always rendered, visibility controlled by CSS */}
      <div
        ref={overlayRef}
        className={`menu-overlay ${menuOpen ? (menuClosing ? "closing" : "open") : ""}`}
      >
        {/* Logo in overlay */}
        <div className="absolute top-[24px] left-[24px] font-sf-display font-medium text-[14px] leading-none text-text-secondary tracking-[-0.28px]">
          <p>Shkuratov</p>
          <p>Designer</p>
        </div>

        <nav className="menu-overlay-items">
          {MENU_NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="menu-overlay-link"
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="menu-overlay-contact">
          <span>Reach me at shkuratovdesigner@gmail.com or</span>
          <br />
          <a href="#book" className="text-accent">Book a Call</a>
        </div>

        {/* Bottom bar inside overlay */}
        <div className="menu-overlay-bottom-bar">
          <div className="navbar-shadow-halo flex-1">
            <div className="navbar-glass mobile-nav-pill menu-open">
              {MAIN_NAV_ITEMS.map((item) => (
                <Link
                  key={item.pose}
                  to={item.path}
                  className={`mobile-nav-tab ${item.path !== "/" && location.pathname === item.path ? "mobile-nav-tab-active" : ""}`}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
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

      {/* Mobile Bottom Nav Bar — always rendered, hidden behind overlay when open */}
      <div
        className={`mobile-nav transition-all duration-300 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="relative flex-1">
          <div className="nav-frost-pill" />
          <div className="navbar-shadow-halo">
            <div className="navbar-glass mobile-nav-pill">
              {MAIN_NAV_ITEMS.map((item) => (
                <Link
                  key={item.pose}
                  to={item.path}
                  className={`mobile-nav-tab ${item.path !== "/" && location.pathname === item.path ? "mobile-nav-tab-active" : ""}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="nav-frost-pill" />
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
      </div>
    </>
  );
}
