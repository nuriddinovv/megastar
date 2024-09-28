import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests starting with /api to your target server
      "/api": {
        target: "https://212.83.191.99:50000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // remove /api prefix
        secure: false, // Disable SSL verification if the target server uses a self-signed certificate
      },
    },
  },
});
