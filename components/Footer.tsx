interface FooterProps {
  text: string;
}

export function Footer({ text }: FooterProps) {
  return (
    <footer className="px-spacing-8 lg:px-[200px] py-spacing-7 mt-auto">
      <p className="text-body text-text-secondary">{text}</p>
    </footer>
  );
}
