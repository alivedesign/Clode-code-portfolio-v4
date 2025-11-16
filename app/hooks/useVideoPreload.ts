'use client';

import { useEffect } from 'react';

interface UseVideoPreloadOptions {
  enabled?: boolean;
  delay?: number; // ms to wait after page load
}

export function useVideoPreload(
  videoRefs: HTMLVideoElement[],
  options: UseVideoPreloadOptions = {}
) {
  const { enabled = true, delay = 1000 } = options;

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    const preloadVideos = () => {
      // Use requestIdleCallback if available, otherwise setTimeout
      const schedulePreload = (callback: () => void) => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(callback, { timeout: 5000 });
        } else {
          setTimeout(callback, 0);
        }
      };

      schedulePreload(() => {
        videoRefs.forEach((video) => {
          if (video && video.preload === 'none') {
            // Start preloading
            video.preload = 'auto';
          }
        });
      });
    };

    // Wait for initial page load, then preload
    const timer = setTimeout(preloadVideos, delay);

    return () => clearTimeout(timer);
  }, [videoRefs, enabled, delay]);
}
