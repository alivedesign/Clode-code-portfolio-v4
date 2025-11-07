export function Avatar() {
  return (
    <div className="w-[101px] h-[63.789px] relative">
      {/* Main body */}
      <div className="absolute bg-accent h-[49.614px] left-[7.09px] top-0 w-[86.825px]" />

      {/* Eyes - with blink animation */}
      <div className="absolute bg-dark-text h-[10.632px] left-[69.11px] top-[14.18px] w-[7.088px] pixel-eye pixel-eye-right" />
      <div className="absolute bg-dark-text h-[10.632px] left-[24.81px] top-[14.18px] w-[7.088px] pixel-eye pixel-eye-left" />

      {/* Side and bottom pixels */}
      <div className="absolute bg-accent h-[10.632px] left-[74.42px] top-[53.16px] w-[7.088px]" />
      {/* Right arm - waving */}
      <div className="absolute bg-accent h-[10.632px] left-[93.91px] top-[14.18px] w-[7.088px] waving-arm" />
      {/* Left arm */}
      <div className="absolute bg-accent h-[10.632px] left-0 top-[14.18px] w-[7.088px]" />
      <div className="absolute bg-accent h-[10.632px] left-[19.49px] top-[53.16px] w-[7.088px]" />
      <div className="absolute bg-accent h-[10.632px] left-[31.89px] top-[53.16px] w-[7.088px]" />
      <div className="absolute bg-accent h-[10.632px] left-[62.02px] top-[53.16px] w-[7.088px]" />
    </div>
  );
}
