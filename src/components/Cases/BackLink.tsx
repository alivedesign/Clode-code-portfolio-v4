import { Link } from "react-router";

interface BackLinkProps {
  variant?: "stroke" | "fill";
  className?: string;
}

export function BackLink({ variant = "fill", className }: BackLinkProps) {
  const defaultClassName =
    variant === "stroke"
      ? "inline-flex items-center gap-2 mt-[40px] md:mt-0 mb-[32px] font-['TN',serif] font-extralight text-[24px] leading-[1.2] text-text-secondary hover:text-white transition-colors"
      : "flex items-center gap-[8px] self-center mb-[64px] md:mb-[56px] mt-[16px] md:mt-0";

  return (
    <Link to="/cases" className={className ?? defaultClassName}>
      {variant === "stroke" ? (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M17.5 5.25L8.75 14L17.5 22.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          className="shrink-0"
        >
          <path
            d="M5.25 14L13.75 5.25L14.975 6.475L7.45 14L14.975 21.525L13.75 22.75L5.25 14Z"
            fill="#999899"
          />
        </svg>
      )}
      {variant === "stroke" ? (
        "Back to cases"
      ) : (
        <span className="font-['TN',serif] font-extralight text-[24px] leading-[1.2] text-text-secondary">
          Back to cases
        </span>
      )}
    </Link>
  );
}
