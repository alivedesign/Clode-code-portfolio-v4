import { useState, useCallback, useEffect } from "react";
import { Character, useCharacterState } from "@/components/Character";
import { NavBar } from "@/components/NavBar";
import { Logo, HeroText } from "@/components/Hero";
import { ContactLine } from "@/components/Layout/ContactLine";
import { MainLayout } from "@/components/Layout/MainLayout";
import type { CharacterPose } from "@/components/Character";

type EntryPhase = "black" | "logo" | "reveal" | "text" | "nav" | "complete";

export function Home() {
  const [entryPhase, setEntryPhase] = useState<EntryPhase>("black");
  const { state, startReveal, onRevealComplete, onTransitionComplete, hoverPose, leavePose } =
    useCharacterState();

  // Entry sequence timers
  useEffect(() => {
    const timer1 = setTimeout(() => setEntryPhase("logo"), 200);
    const timer2 = setTimeout(() => {
      setEntryPhase("reveal");
      startReveal();
    }, 500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [startReveal]);

  // When reveal completes, advance entry sequence
  const handleRevealComplete = useCallback(() => {
    onRevealComplete();
    setEntryPhase("text");
    setTimeout(() => setEntryPhase("nav"), 400);
    setTimeout(() => setEntryPhase("complete"), 600);
  }, [onRevealComplete]);

  const isAfter = (target: EntryPhase) => {
    const order: EntryPhase[] = ["black", "logo", "reveal", "text", "nav", "complete"];
    return order.indexOf(entryPhase) >= order.indexOf(target);
  };

  return (
    <MainLayout>
      <Logo visible={isAfter("logo")} />

      {isAfter("reveal") && (
        <Character
          state={state}
          onRevealComplete={handleRevealComplete}
          onTransitionComplete={onTransitionComplete}
          className="absolute left-1/2 top-1/2 -translate-x-[calc(50%+24px)] -translate-y-[calc(50%+48px)]"
        />
      )}

      <HeroText visible={isAfter("text")} />

      <NavBar
        onHoverPose={hoverPose}
        onLeavePose={leavePose}
        visible={isAfter("nav")}
      />

      <ContactLine visible={isAfter("complete")} />
    </MainLayout>
  );
}
