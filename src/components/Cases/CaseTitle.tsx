import type { CaseTitleSegment } from "@/data/casesData";

interface CaseTitleProps {
  segments: CaseTitleSegment[];
  className?: string;
}

export function CaseTitle({ segments, className = "" }: CaseTitleProps) {
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
      <p className="font-sf text-[18px] leading-[1.3] text-accent">
        View Case Study
      </p>
    </div>
  );
}
