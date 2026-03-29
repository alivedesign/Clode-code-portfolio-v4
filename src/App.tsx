import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router";
import { preloadVideoFrames } from "@/hooks/videoFrameCache";

// Start extracting case-2 character frames immediately on app load
preloadVideoFrames("/videos/case-2-character-anim.mp4", 144, 0.4);

const Home = lazy(() => import("@/pages/Home").then(m => ({ default: m.Home })));
const Experience = lazy(() => import("@/pages/Experience").then(m => ({ default: m.Experience })));
const Products = lazy(() => import("@/pages/Products").then(m => ({ default: m.Products })));
const Cases = lazy(() => import("@/pages/Cases").then(m => ({ default: m.Cases })));
const Content = lazy(() => import("@/pages/Content").then(m => ({ default: m.Content })));
const About = lazy(() => import("@/pages/About").then(m => ({ default: m.About })));
const CaseStudy1 = lazy(() => import("@/pages/CaseStudy1").then(m => ({ default: m.CaseStudy1 })));
const CaseStudy2 = lazy(() => import("@/pages/CaseStudy2").then(m => ({ default: m.CaseStudy2 })));

export default function App() {
  return (
    <Suspense fallback={<div className="h-dvh w-full bg-black" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/content" element={<Content />} />
        <Route path="/about" element={<About />} />
        <Route path="/cases/mcp-vibe-coding" element={<CaseStudy1 />} />
        <Route path="/cases/figma-token-plugin" element={<CaseStudy2 />} />
      </Routes>
    </Suspense>
  );
}
