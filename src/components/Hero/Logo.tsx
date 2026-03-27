import { Link } from "react-router";

interface LogoProps {
  visible?: boolean;
}

export function Logo({ visible = true }: LogoProps) {
  return (
    <Link
      to="/"
      className={`absolute top-[24px] left-[24px] md:top-8 md:left-40 z-20 font-['SF_Pro_Display','-apple-system',BlinkMacSystemFont,sans-serif] font-medium text-[14px] md:text-base leading-none text-text-secondary tracking-[-0.28px] md:tracking-[-0.32px] transition-opacity duration-200 no-underline ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <p>Shkuratov</p>
      <p>Designer</p>
    </Link>
  );
}
