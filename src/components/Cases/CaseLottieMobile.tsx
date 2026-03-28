import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import type { CaseData } from "@/data/casesData";
import { CaseTitle } from "./CaseTitle";

interface CaseLottieMobileProps {
  caseData: CaseData;
  index: number;
}

export function CaseLottieMobile({ caseData, index }: CaseLottieMobileProps) {
  const assets = caseData.lottieAssets ?? [];
  const topRow = assets.slice(0, 2);
  const bottomRow = assets.slice(2, 4);

  return (
    <section
      className="experience-fade-up w-full flex flex-col items-center"
      style={{ animationDelay: `${(index + 1) * 80}ms` }}
      aria-label={caseData.id}
    >
      {/* Top 2 characters */}
      <div className="flex gap-[16px] mb-[32px] justify-center">
        {topRow.map((asset) => (
          <div key={asset.name} className="w-[120px] h-[120px]" aria-label={asset.name}>
            <DotLottieReact src={asset.src} autoplay loop style={{ width: "100%", height: "100%" }} />
          </div>
        ))}
      </div>

      {/* Title */}
      <CaseTitle segments={caseData.title} />

      {/* Bottom 2 characters */}
      <div className="flex gap-[16px] mt-[32px] justify-center">
        {bottomRow.map((asset) => (
          <div key={asset.name} className="w-[120px] h-[120px]" aria-label={asset.name}>
            <DotLottieReact src={asset.src} autoplay loop style={{ width: "100%", height: "100%" }} />
          </div>
        ))}
      </div>
    </section>
  );
}
