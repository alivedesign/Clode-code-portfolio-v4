import { useEffect, useRef } from "react";

export function useVideoPreloader(urls: string[], enabled: boolean = true) {
  const preloaded = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!enabled) return;

    urls.forEach((url) => {
      if (preloaded.current.has(url)) return;
      preloaded.current.add(url);

      const video = document.createElement("video");
      video.preload = "auto";
      video.muted = true;
      video.src = url;
      video.load();
    });
  }, [urls, enabled]);
}
