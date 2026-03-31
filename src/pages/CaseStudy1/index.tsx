import { useEffect } from "react";
import { Logo } from "@/components/Hero";
import { BackLink } from "@/components/Cases";
import { NavBar } from "@/components/NavBar";
import { ContactLine } from "@/components/Layout/ContactLine";
import { usePageMeta } from "@/hooks/usePageMeta";
import { HeroSection } from "./HeroSection";
import { ProblemSection } from "./ProblemSection";
import { TimelineSection } from "./TimelineSection";
import { DecisionsSection } from "./DecisionsSection";
import { VideoSection } from "./VideoSection";
import { MetricsSection } from "./MetricsSection";

/* ─── Page ────────────────────────────────────────────────── */
export function CaseStudy1() {
  usePageMeta(
    "MCP Vibe Coding — Shkuratov Designer",
    "Case study: MCP vibe coding — design engineering process and outcomes.",
    "/cases/mcp-vibe-coding",
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen min-h-dvh w-full bg-black overflow-x-clip">
      <Logo visible />

      <main className="relative z-10 flex flex-col items-center px-5 md:px-10 pt-[40px] pb-[164px] md:pb-[320px]">
        <BackLink variant="stroke" />
        <HeroSection />
        <ProblemSection />
        <TimelineSection />
        <DecisionsSection />
        <VideoSection />
        <MetricsSection />
      </main>

      <NavBar visible />
      <ContactLine visible />
    </div>
  );
}
