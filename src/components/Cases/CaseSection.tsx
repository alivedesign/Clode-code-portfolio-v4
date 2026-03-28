import type { CaseData } from "@/data/casesData";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CaseVideoPreview } from "./CaseVideoPreview";
import { CaseCinematicScroll } from "./CaseCinematicScroll";
import { CaseCinematicMobile } from "./CaseCinematicMobile";

interface CaseSectionProps {
  caseData: CaseData;
  index: number;
}

export function CaseSection({ caseData, index }: CaseSectionProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  switch (caseData.type) {
    case "video":
      return <CaseVideoPreview caseData={caseData} index={index} />;
    case "cinematic":
      return isMobile ? (
        <CaseCinematicMobile caseData={caseData} index={index} />
      ) : (
        <CaseCinematicScroll caseData={caseData} />
      );
  }
}
