import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

export function useInstagramEmbed(shouldLoad: boolean) {
  useEffect(() => {
    if (!shouldLoad) return;

    // If script already loaded, just re-process
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => {
      window.instgrm?.Embeds.process();
    };
    document.body.appendChild(script);

    return () => {
      // Don't remove script — it's idempotent and removing causes issues
    };
  }, [shouldLoad]);
}
