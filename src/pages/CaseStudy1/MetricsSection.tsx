import { useInView } from "@/hooks/useInView";
import { CASE1_METRICS, CASE1_QUOTE } from "@/data/caseStudy1Data";

export function MetricsSection() {
  const [quoteRef, quoteVisible] = useInView(0.1);
  const [gridRef, gridVisible] = useInView(0.1);

  return (
    <section className="w-full max-w-[1280px] mt-[100px] md:mt-[172px]">
      <p
        ref={quoteRef}
        className={`reveal-fade-up${quoteVisible ? " visible" : ""} font-['TN',serif] font-extralight text-[24px] md:text-[48px] leading-[1.2] tracking-[-0.48px] text-white text-center max-w-[966px] mx-auto mb-[48px] md:mb-[80px]`}
      >
        {CASE1_QUOTE}
      </p>

      <div
        ref={gridRef}
        className={`reveal-stagger-children${gridVisible ? " visible" : ""} grid grid-cols-2 gap-[12px] md:gap-[48px] auto-rows-[1fr]`}
      >
        {CASE1_METRICS.map((metric) => (
          <div key={metric.label} className="bg-white rounded-[20px] pt-[24px] pb-[30px] px-[16px] md:px-[32px]">
            <p className="font-['TN',serif] font-extralight text-[28px] md:text-[48px] text-[#222] tracking-[-0.48px] leading-[1.2]">
              {metric.value}
            </p>
            <p className="font-sf text-[14px] md:text-[18px] text-[#6a6a6a] mt-[12px] leading-[1.4]">
              {metric.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
