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
  | { phase: "posing"; pose: CharacterPose; videoEnded: boolean };

export interface CharacterActions {
  state: CharacterState;
  onRevealComplete: () => void;
  onPoseVideoEnded: () => void;
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
        return { phase: "posing", pose, videoEnded: false };
      }
      return prev;
    });
  }, []);

  const leavePose = useCallback(() => {
    setState((prev) => {
      if (prev.phase === "posing") {
        return { phase: "revealing" };
      }
      return prev;
    });
  }, []);

  const onPoseVideoEnded = useCallback(() => {
    setState((prev) => {
      if (prev.phase === "posing") {
        return { phase: "posing", pose: prev.pose, videoEnded: true };
      }
      return prev;
    });
  }, []);

  return {
    state,
    onRevealComplete,
    onPoseVideoEnded,
    hoverPose,
    leavePose,
    startReveal,
  };
}
