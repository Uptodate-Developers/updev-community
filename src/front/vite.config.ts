import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const fs = require("fs");
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      // targets: ["defaults", "not IE 11"],
      targets: ["ie >= 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"]
    })
  ],
  server: {
    open: true,
    https: {
      key: fs.readFileSync("localhost-key.pem"),
      cert: fs.readFileSync("localhost.pem")
    }
  }
});
