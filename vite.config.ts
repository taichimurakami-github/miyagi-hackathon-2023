import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  console.log("command = ", command);

  const config = {
    define: {
      "process.env.POCKETSIGN_SDK_BACKEND": JSON.stringify(
        // ビルド時はアプリ内で動作できるように、
        // 開発時はアプリ外で動作できるようにする
        command === "build" ? "APP" : "API"
      ),
    },
    server: {
      strictPort: true,
      proxy: {
        "/api": {
          target: "https://internal-api.core.stg.p8n.dev",
          changeOrigin: true,
        },
      },
    },
    plugins: [react()],
  };

  console.log(config);

  return config;
});
