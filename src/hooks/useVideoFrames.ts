import { useEffect, useState } from "react";

export function useVideoFrames(
  videoSrc: string,
  targetFrameCount = 40,
  startTime = 0,
): { frames: ImageBitmap[]; loading: boolean } {
  const [frames, setFrames] = useState<ImageBitmap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
