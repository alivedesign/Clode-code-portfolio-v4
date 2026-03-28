import type { ReactNode } from "react";

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-screen h-dvh w-full bg-black">
      {children}
    </div>
  );
}
