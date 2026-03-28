/**
 * Global cache for pre-extracted video frames.
 * Call `preloadVideoFrames()` early (e.g. App mount) so frames are
 * ready by the time the Cases page renders.
 */

interface CacheEntry {
  frames: ImageBitmap[];
  loading: boolean;
  promise: Promise<ImageBitmap[]>;
}

const cache = new Map<string, CacheEntry>();

function extractFrames(
  videoSrc: string,
  targetFrameCount: number,
  startTime: number,
): Promise<ImageBitmap[]> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.src = videoSrc;

    video.onloadedmetadata = async () => {
      try {
        const { duration, videoWidth, videoHeight } = video;
        const usableDuration = duration - startTime;
        const step = usableDuration / targetFrameCount;
        const canvas = new OffscreenCanvas(videoWidth, videoHeight);
        const ctx = canvas.getContext("2d")!;
        const extracted: ImageBitmap[] = [];

        for (let i = 0; i < targetFrameCount; i++) {
          video.currentTime = startTime + i * step;
          await new Promise<void>((r) => {
            video.onseeked = () => r();
          });
          ctx.drawImage(video, 0, 0);
          extracted.push(await createImageBitmap(canvas));
        }

        resolve(extracted);
      } catch (err) {
        reject(err);
      }
    };

    video.onerror = () => reject(new Error("Video load failed"));
  });
}

export function preloadVideoFrames(
  videoSrc: string,
  targetFrameCount = 144,
  startTime = 0.4,
): void {
  const key = `${videoSrc}:${targetFrameCount}:${startTime}`;
  if (cache.has(key)) return;

  const promise = extractFrames(videoSrc, targetFrameCount, startTime);

  const entry: CacheEntry = { frames: [], loading: true, promise };
  cache.set(key, entry);

  promise.then((frames) => {
    entry.frames = frames;
    entry.loading = false;
  }).catch(() => {
    entry.loading = false;
  });
}

export function getCachedFrames(
  videoSrc: string,
  targetFrameCount: number,
  startTime: number,
): CacheEntry | undefined {
  const key = `${videoSrc}:${targetFrameCount}:${startTime}`;
  return cache.get(key);
}
