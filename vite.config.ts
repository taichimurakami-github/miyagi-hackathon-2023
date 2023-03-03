import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env.POCKETSIGN_SDK_BACKEND": JSON.stringify("APP"),
  },
  plugins: [react()],
});
