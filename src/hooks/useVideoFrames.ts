import { useEffect, useState } from "react";
import { getCachedFrames } from "./videoFrameCache";

export function useVideoFrames(
  videoSrc: string,
  targetFrameCount = 40,
  startTime = 0,
): { frames: ImageBitmap[]; loading: boolean } {
  const [frames, setFrames] = useState<ImageBitmap[]>(() => {
    const cached = getCachedFrames(videoSrc, targetFrameCount, startTime);
    return cached && !cached.loading ? cached.frames : [];
  });
  const [loading, setLoading] = useState(() => {
    const cached = getCachedFrames(videoSrc, targetFrameCount, startTime);
    return !cached || cached.loading;
  });

  useEffect(() => {
    // If already resolved from cache init, skip
    const cached = getCachedFrames(videoSrc, targetFrameCount, startTime);
    if (cached && !cached.loading && cached.frames.length > 0) {
      setFrames(cached.frames);
      setLoading(false);
      return;
    }

    // If cache is in progress, wait for it
    if (cached && cached.loading) {
      let cancelled = false;
      cached.promise.then((f) => {
        if (!cancelled) {
          setFrames(f);
          setLoading(false);
        }
      }).catch(() => {
        if (!cancelled) setLoading(false);
      });
      return () => { cancelled = true; };
    }

    // No cache — extract inline (fallback)
    let cancelled = false;

    async function extract() {
      const video = document.createElement("video");
      video.crossOrigin = "anonymous";
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      video.src = videoSrc;

      await new Promise<void>((resolve, reject) => {
        video.onloadedmetadata = () => resolve();
        video.onerror = () => reject(new Error("Video load failed"));
      });

      const { duration, videoWidth, videoHeight } = video;
      const usableDuration = duration - startTime;
      const step = usableDuration / targetFrameCount;
      const canvas = new OffscreenCanvas(videoWidth, videoHeight);
      const ctx = canvas.getContext("2d")!;
      const extracted: ImageBitmap[] = [];

      for (let i = 0; i < targetFrameCount; i++) {
        if (cancelled) return;

        const time = startTime + i * step;
        video.currentTime = time;

        await new Promise<void>((resolve) => {
          video.onseeked = () => resolve();
        });

        ctx.drawImage(video, 0, 0);
        const bitmap = await createImageBitmap(canvas);
        extracted.push(bitmap);
      }

      if (!cancelled) {
        setFrames(extracted);
        setLoading(false);
      }
    }

    extract().catch(() => {
      if (!cancelled) setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [videoSrc, targetFrameCount, startTime]);

  return { frames, loading };
}
