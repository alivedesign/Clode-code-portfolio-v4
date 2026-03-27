import { useState, useCallback } from "react";
import type { CharacterPose } from "@/components/Character/useCharacterState";

const POSE_ORDER: CharacterPose[] = [
  "experience",
  "products",
  "cases",
  "content",
  "about",
  "resume",
];

interface PoseCycleActions {
  currentPose: CharacterPose | null;
  nextPose: () => void;
  prevPose: () => void;
}

export function usePoseCycle(
  onPoseChange: (pose: CharacterPose) => void,
): PoseCycleActions {
  const [index, setIndex] = useState<number | null>(null);

  const nextPose = useCallback(() => {
    setIndex((prev) => {
      const next = prev === null ? 0 : (prev + 1) % POSE_ORDER.length;
      onPoseChange(POSE_ORDER[next]);
      return next;
    });
  }, [onPoseChange]);

  const prevPose = useCallback(() => {
    setIndex((prev) => {
      const next =
        prev === null
          ? POSE_ORDER.length - 1
          : (prev - 1 + POSE_ORDER.length) % POSE_ORDER.length;
      onPoseChange(POSE_ORDER[next]);
      return next;
    });
  }, [onPoseChange]);

  const currentPose = index !== null ? POSE_ORDER[index] : null;

  return { currentPose, nextPose, prevPose };
}
