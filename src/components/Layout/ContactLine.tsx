interface ContactLineProps {
  visible?: boolean;
}

export function ContactLine({ visible = true }: ContactLineProps) {
  return (
    <div
      className={`hidden md:block fixed bottom-[30px] left-1/2 -translate-x-1/2 z-50 font-sf-display text-sm sm:text-base lg:text-[18px] leading-[1.2] text-text-secondary tracking-[-0.18px] whitespace-nowrap transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span>Reach me at shkuratovdesigner@gmail.com or </span>
      <a href="https://cal.com/shkuratov-design/website45min?overlayCalendar=true" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
        Book a Call
      </a>
    </div>
  );
}
