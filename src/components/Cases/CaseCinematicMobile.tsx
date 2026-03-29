import type { CaseData } from "@/data/casesData";
import { CaseTitle } from "./CaseTitle";

interface CaseCinematicMobileProps {
  caseData: CaseData;
  index: number;
}

export function CaseCinematicMobile({ caseData, index }: CaseCinematicMobileProps) {
  return (
    <section
      className="experience-fade-up w-full flex flex-col items-center"
      style={{ animationDelay: `${(index + 1) * 80}ms` }}
      aria-label={caseData.id}
    >
      {/* Side images */}
      {caseData.sideImages && (
        <div className="flex gap-[16px] mb-[32px] px-5">
          <div className="flex-1 rounded-[10px] overflow-hidden">
            <img src={caseData.sideImages[0]} alt="" className="w-full h-auto" loading="lazy" />
          </div>
          <div className="flex-1 rounded-[10px] overflow-hidden">
            <img src={caseData.sideImages[1]} alt="" className="w-full h-auto" loading="lazy" />
          </div>
        </div>
      )}

      {/* Title */}
      <CaseTitle segments={caseData.title} link={caseData.link} />
    </section>
  );
}
