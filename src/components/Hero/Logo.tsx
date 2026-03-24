interface LogoProps {
  visible?: boolean;
}

export function Logo({ visible = true }: LogoProps) {
  return (
    <div
      className={`absolute top-8 left-40 font-['SF_Pro_Display','-apple-system',BlinkMacSystemFont,sans-serif] font-medium text-base leading-none text-text-secondary tracking-[-0.32px] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <p>Shkuratov</p>
      <p>Designer</p>
    </div>
  );
}
