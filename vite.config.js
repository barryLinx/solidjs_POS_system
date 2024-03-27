import { defineConfig, loadEnv } from "vite";
import solid from "vite-plugin-solid";
import vercel from "solid-start-vercel";

import { resolve } from "path";

export default defineConfig({
  plugins: [solid({ adapter: vercel({ edge: true }) })],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      BsScss: resolve(__dirname, "node_modules/bootstrap/scss"),
      bsJs: resolve(__dirname, "node_modules/bootstrap/js/dist/"),
    },
  },
  server: {
    port: 8081,
    open: "/home",
  },
});
