import type { CaseData } from "@/data/casesData";
import { CaseTitle } from "./CaseTitle";
import { DotLottieCanvas } from "./DotLottieCanvas";

interface CaseLottieScatterProps {
  caseData: CaseData;
  index: number;
}

export function CaseLottieScatter({ caseData, index }: CaseLottieScatterProps) {
  return (
    <section
      className="experience-fade-up w-full max-w-[1235px] mx-auto relative z-10"
      style={{ animationDelay: `${(index + 1) * 80}ms` }}
      aria-label={caseData.id}
    >
      <div className="relative w-full" style={{ height: "669px" }}>
        {/* Lottie characters — absolute positioned */}
        {caseData.lottieAssets?.map((asset) => (
          <div
            key={asset.name}
            className="absolute"
            style={{
              ...asset.position,
              width: asset.size,
              height: asset.size,
            }}
            aria-label={asset.name}
          >
            <DotLottieCanvas
              src={asset.src}
              autoplay
              loop
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ))}

        {/* Centered title */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[280px]">
          <CaseTitle segments={caseData.title} />
        </div>
      </div>
    </section>
  );
}
