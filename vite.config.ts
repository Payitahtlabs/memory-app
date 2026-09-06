import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/memory-app/" : "/",
}));
