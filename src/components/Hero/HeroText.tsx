interface HeroTextProps {
  visible?: boolean;
}

export function HeroText({ visible = true }: HeroTextProps) {
  return (
    <div
      className={`absolute top-[95px] right-[calc(50%-280px)] w-[247px] font-['SF_Pro_Text','-apple-system',BlinkMacSystemFont,sans-serif] text-lg leading-[1.3] text-text-secondary transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <p className="mb-3">
        <span>Hey! I'm Evgeny. </span>
        <span className="text-white font-normal">
          Product Design Engineer who can't stop building.{" "}
        </span>
      </p>
      <p className="mb-3">Explore. </p>
      <p>
        This site is me thinking
        <br />
        out loud.
      </p>
    </div>
  );
}
