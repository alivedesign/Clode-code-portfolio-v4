import { Link } from "react-router";
import { Logo } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { ContactLine } from "@/components/Layout/ContactLine";

export function NotFound() {
  useEffect(() => {
    document.title = "404 — Shkuratov Designer";
  }, []);

  return (
    <div className="relative h-screen h-dvh w-full bg-black overflow-hidden">
      <Logo visible />

      {/* Back to Main — centered top */}
      <Link
        to="/"
        className="notfound-fade-up absolute top-[40px] left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 text-text-secondary hover:text-white transition-colors no-underline"
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5 5.25L10.5 14L17.5 22.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="font-['TN',serif] font-[350] text-[18px] md:text-[24px] leading-[1.2]">
          Back to Main
        </span>
      </Link>

      {/* Centered content: character + text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img
          src="/images/404-character.webp"
          alt="Lost explorer character with question mark"
          className="notfound-fade-up w-[280px] md:w-[446px] h-auto"
          style={{ animationDelay: "100ms" }}
        />
        <h1
          className="notfound-fade-up font-['TN',serif] font-extralight text-[32px] md:text-[56px] leading-[1.2] text-white tracking-[-0.56px] mt-6 md:mt-8"
          style={{ animationDelay: "200ms" }}
        >
          Page not found
        </h1>
      </div>

      <NavBar visible />
      <ContactLine visible />
    </div>
  );
}
