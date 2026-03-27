import { useState, useEffect, useRef, useCallback } from "react";
import type { CharacterPose } from "@/components/Character";
import { getTotalChars } from "@/data/poseTextData";

export type TypewriterPhase = "idle" | "typing" | "fading-out";

interface TypewriterState {
  visibleChars: number;
  totalChars: number;
  phase: TypewriterPhase;
  activePose: CharacterPose | null;
}

const FADE_DURATION = 200; // ms
const TARGET_TYPING_DURATION = 1250; // ms — 2x speed, constant rate

export function useTypewriter(pose: CharacterPose | null): TypewriterState {
  const [state, setState] = useState<TypewriterState>({
    visibleChars: 0,
    totalChars: 0,
    phase: "idle",
    activePose: null,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPoseRef = useRef<CharacterPose | null>(null);
  const typedPosesRef = useRef<Set<CharacterPose>>(new Set());

  const clearTimers = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (fadeTimeoutRef.current) {
      clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = null;
    }
  }, []);

  // Show all chars instantly (for already-typed poses) — CSS transition handles fade-in
  const showInstant = useCallback((newPose: CharacterPose) => {
    const total = getTotalChars(newPose);
    setState({
      visibleChars: total,
      totalChars: total,
      phase: "typing",
      activePose: newPose,
    });
  }, []);

  const startTyping = useCallback((newPose: CharacterPose) => {
    const total = getTotalChars(newPose);
    const msPerChar = Math.max(TARGET_TYPING_DURATION / total, 15);

    setState({
      visibleChars: 0,
      totalChars: total,
      phase: "typing",
      activePose: newPose,
    });

    let chars = 0;
    intervalRef.current = setInterval(() => {
      chars += 1;
      if (chars >= total) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        typedPosesRef.current.add(newPose);
        setState((prev) => ({ ...prev, visibleChars: total }));
      } else {
        setState((prev) => ({ ...prev, visibleChars: chars }));
      }
    }, msPerChar);
  }, []);

  // Show a pose — either type-in (first time) or instant (already typed)
  const showPose = useCallback((newPose: CharacterPose) => {
    if (typedPosesRef.current.has(newPose)) {
      showInstant(newPose);
    } else {
      startTyping(newPose);
    }
  }, [showInstant, startTyping]);

  useEffect(() => {
    const prevPose = prevPoseRef.current;
    prevPoseRef.current = pose;

    // No change
    if (pose === prevPose) return clearTimers;

    clearTimers();

    if (pose === null) {
      // Pose cleared (mouse left) — fade out, then idle
      setState((prev) => ({ ...prev, phase: "fading-out" }));
      fadeTimeoutRef.current = setTimeout(() => {
        setState({
          visibleChars: 0,
          totalChars: 0,
          phase: "idle",
          activePose: null,
        });
      }, FADE_DURATION);
    } else if (prevPose === null) {
      // First hover from idle
      showPose(pose);
    } else {
      // Pose changed — fade out, then show new
      setState((prev) => ({ ...prev, phase: "fading-out" }));
      fadeTimeoutRef.current = setTimeout(() => {
        showPose(pose);
      }, FADE_DURATION);
    }

    return () => clearTimers();
  }, [pose, clearTimers, showPose]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  return state;
}
