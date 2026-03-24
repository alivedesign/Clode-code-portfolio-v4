interface ContactLineProps {
  visible?: boolean;
}

export function ContactLine({ visible = true }: ContactLineProps) {
  return (
    <div
      className={`fixed bottom-2 left-1/2 -translate-x-1/2 font-['SF_Pro_Display','-apple-system',BlinkMacSystemFont,sans-serif] text-lg leading-[1.2] text-text-secondary tracking-[-0.18px] whitespace-nowrap transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span>Reach me at shkuratovdesigner@gmail.com or </span>
      <a href="#book" className="text-accent hover:underline">
        Book a Call
      </a>
    </div>
  );
}
