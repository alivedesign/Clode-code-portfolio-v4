import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compression({ algorithm: "gzip", threshold: 1024 }),
    compression({ algorithm: "brotliCompress", threshold: 1024 }),
  ],
  resolve: {
    alias: { "@": "/src" },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/") || id.includes("node_modules/react-router")) {
            return "vendor-react";
          }
          if (id.includes("node_modules/@lottiefiles/")) {
            return "vendor-lottie";
          }
          if (id.includes("node_modules/embla-carousel")) {
            return "vendor-carousel";
          }
        },
      },
    },
  },
  server: {
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  },
});
