import { Link } from "react-router";
import type { CaseTitleSegment } from "@/data/casesData";

interface CaseTitleProps {
  segments: CaseTitleSegment[];
  link?: string;
  className?: string;
}

export function CaseTitle({ segments, link, className = "" }: CaseTitleProps) {
  return (
    <div className={`flex flex-col gap-[16px] items-center text-center ${className}`}>
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
      {link ? (
        <Link to={link} className="font-sf text-[18px] leading-[1.3] text-accent hover:underline">
          View Case Study
        </Link>
      ) : (
        <p className="font-sf text-[18px] leading-[1.3] text-accent">
          View Case Study
        </p>
      )}
    </div>
  );
}
