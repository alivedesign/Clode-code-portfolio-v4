import type { CaseData } from "@/data/casesData";
import { CaseTitle } from "./CaseTitle";

interface CaseVideoPreviewProps {
  caseData: CaseData;
  index: number;
}

export function CaseVideoPreview({ caseData, index }: CaseVideoPreviewProps) {
  return (
    <section
      className="experience-fade-up w-full max-w-[1120px] mx-auto relative z-10 bg-black"
      style={{ animationDelay: `${(index + 1) * 80}ms` }}
      aria-label={caseData.id}
    >
      <div className="w-full rounded-[14px] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto"
          src={caseData.videoSrc}
        />
      </div>
      <CaseTitle segments={caseData.title} link={caseData.link} className="mt-[32px]" />
    </section>
  );
}
