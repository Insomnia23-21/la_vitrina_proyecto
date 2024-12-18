import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  esbuild: {
    target: "esnext",
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000", 
    },
  },
  build: {
    outDir: "../backend/public", 
  },
});
