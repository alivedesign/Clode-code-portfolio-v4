interface HeroTextProps {
  visible?: boolean;
}

export function HeroText({ visible = true }: HeroTextProps) {
  return (
    <div
      className={`absolute w-[230px] md:w-[247px] left-1/2 -translate-x-1/2 top-[70%] lg:left-[calc(100%-88px)] lg:translate-x-0 lg:top-[-16px] font-['SF_Pro_Text','-apple-system',BlinkMacSystemFont,sans-serif] text-[14px] md:text-lg leading-[1.3] text-text-secondary text-center lg:text-left transition-opacity duration-300 ${
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
