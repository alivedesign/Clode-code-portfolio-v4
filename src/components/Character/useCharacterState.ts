import { useState, useCallback } from "react";

export type CharacterPose =
  | "experience"
  | "products"
  | "cases"
  | "content"
  | "about"
  | "resume";

export type CharacterState =
  | { phase: "loading" }
  | { phase: "revealing" }
  | { phase: "idle" }
  | { phase: "transitioning-to-pose"; pose: CharacterPose }
  | { phase: "posing"; pose: CharacterPose }
  | { phase: "transitioning-to-idle" };

export interface CharacterActions {
  state: CharacterState;
  onRevealComplete: () => void;
  onTransitionComplete: () => void;
  hoverPose: (pose: CharacterPose) => void;
  leavePose: () => void;
  startReveal: () => void;
}

export function useCharacterState(): CharacterActions {
  const [state, setState] = useState<CharacterState>({ phase: "loading" });

  const startReveal = useCallback(() => {
    setState({ phase: "revealing" });
  }, []);

  const onRevealComplete = useCallback(() => {
    setState({ phase: "idle" });
  }, []);

  const hoverPose = useCallback((pose: CharacterPose) => {
    setState((prev) => {
      if (prev.phase === "idle" || prev.phase === "posing") {
        return { phase: "transitioning-to-pose", pose };
      }
      return prev;
    });
  }, []);

  const leavePose = useCallback(() => {
    setState((prev) => {
      if (prev.phase === "posing" || prev.phase === "transitioning-to-pose") {
        return { phase: "transitioning-to-idle" };
      }
      return prev;
    });
  }, []);

  const onTransitionComplete = useCallback(() => {
    setState((prev) => {
      if (prev.phase === "transitioning-to-pose") {
        return { phase: "posing", pose: prev.pose };
      }
      if (prev.phase === "transitioning-to-idle") {
        return { phase: "idle" };
      }
      return prev;
    });
  }, []);

  return {
    state,
    onRevealComplete,
    onTransitionComplete,
    hoverPose,
    leavePose,
    startReveal,
  };
}
