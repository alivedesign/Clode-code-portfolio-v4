import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router";

const Home = lazy(() => import("@/pages/Home").then(m => ({ default: m.Home })));
const Experience = lazy(() => import("@/pages/Experience").then(m => ({ default: m.Experience })));
const Products = lazy(() => import("@/pages/Products").then(m => ({ default: m.Products })));

export default function App() {
  return (
    <Suspense fallback={<div className="h-dvh w-full bg-black" />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Suspense>
  );
}
