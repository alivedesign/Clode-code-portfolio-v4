import { Link } from "react-router";
import type { CaseTitleSegment } from "@/data/casesData";

interface CaseTitleProps {
  segments: CaseTitleSegment[];
  link?: string;
  className?: string;
}

export function CaseTitle({ segments, link, className = "" }: CaseTitleProps) {
  const inner = (
    <>
      <p className="font-['TN',serif] font-extralight text-[24px] md:text-[28px] leading-[1.2] max-w-[584px]">
        {segments.map((seg, i) => (
          <span
            key={i}
            className={seg.highlighted ? "text-white" : "text-text-secondary"}
          >
            {seg.text}
          </span>
        ))}
      </p>
      <p className={`font-sf text-[18px] leading-[1.3] text-accent ${link ? "group-hover:underline" : ""}`}>
        View Case Study
      </p>
    </>
  );

  if (link) {
    return (
      <Link
        to={link}
        className={`group flex flex-col gap-[16px] items-center text-center cursor-pointer ${className}`}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className={`flex flex-col gap-[16px] items-center text-center ${className}`}>
      {inner}
    </div>
  );
}
