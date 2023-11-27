import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        keto: resolve(__dirname, 'src/diets/keto.html'),
        vegetarian: resolve(__dirname, 'src/diets/vegetarian.html'),
        vegan: resolve(__dirname, 'src/diets/vegan.html'),
        paleo: resolve(__dirname, 'src/diets/paleo.html'),
        re
      },
    },
  },
  server: {
    base: "/",
  },
});