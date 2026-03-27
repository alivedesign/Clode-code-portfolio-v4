import { Routes, Route } from "react-router";
import { Home } from "@/pages/Home";
import { Experience } from "@/pages/Experience";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/experience" element={<Experience />} />
    </Routes>
  );
}
