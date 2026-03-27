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
const BASE_MS_PER_CHAR = 35; // comfortable typing speed
const FINISH_AFTER_VIDEO_MS = 300; // finish 0.3s after video ends

export function useTypewriter(
  pose: CharacterPose | null,
  videoEnded: boolean
): TypewriterState {
  const [state, setState] = useState<TypewriterState>({
    visibleChars: 0,
    totalChars: 0,
    phase: "idle",
    activePose: null,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPoseRef = useRef<CharacterPose | null>(null);
  const visibleCharsRef = useRef(0);
  const totalCharsRef = useRef(0);

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

  const runInterval = useCallback((startFrom: number, total: number, msPerChar: number) => {
    let chars = startFrom;
    intervalRef.current = setInterval(() => {
      chars += 1;
      visibleCharsRef.current = chars;
      if (chars >= total) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setState((prev) => ({ ...prev, visibleChars: total }));
      } else {
        setState((prev) => ({ ...prev, visibleChars: chars }));
      }
    }, msPerChar);
  }, []);

  const startTyping = useCallback((newPose: CharacterPose) => {
    const total = getTotalChars(newPose);
    totalCharsRef.current = total;
    visibleCharsRef.current = 0;

    setState({
      visibleChars: 0,
      totalChars: total,
      phase: "typing",
      activePose: newPose,
    });

    runInterval(0, total, BASE_MS_PER_CHAR);
  }, [runInterval]);

  // Accelerate when video ends
  useEffect(() => {
    if (!videoEnded || !intervalRef.current) return;

    const remaining = totalCharsRef.current - visibleCharsRef.current;
    if (remaining <= 0) return;

    clearInterval(intervalRef.current);
    const msPerChar = Math.max(FINISH_AFTER_VIDEO_MS / remaining, 10);
    runInterval(visibleCharsRef.current, totalCharsRef.current, msPerChar);
  }, [videoEnded, runInterval]);

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
      // First hover (from idle) — start typing immediately
      startTyping(pose);
    } else {
      // Pose changed (hover to different item) — fade out, then type new
      setState((prev) => ({ ...prev, phase: "fading-out" }));
      fadeTimeoutRef.current = setTimeout(() => {
        startTyping(pose);
      }, FADE_DURATION);
    }

    return () => clearTimers();
  }, [pose, clearTimers, startTyping]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  return state;
}
