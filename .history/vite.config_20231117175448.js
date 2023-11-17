import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html')
        recipe_display: resolve(__dirname, 'src/recipecontainer.html')
      },
    },
  },
  server: {
    base: "/",
  },
});
