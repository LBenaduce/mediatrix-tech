import { defineConfig } from "vite";

export default defineConfig({
  publicDir: false,
  build: {
    ssr: "src/entry-server.jsx",
    outDir: ".ssr",
    emptyOutDir: true,
  },
});
