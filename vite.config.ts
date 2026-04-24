import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// VITE_BASE_PATH controls the sub-path for GitHub Pages project deployments.
// e.g. set to /homelab-hero if deploying to username.github.io/homelab-hero
// Defaults to / for custom domains or user/org pages.
const base = process.env.VITE_BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
