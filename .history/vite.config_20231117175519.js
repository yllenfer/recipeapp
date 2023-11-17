import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        TODO: Make sure I am putting the right paths for the rollup
        recipe_display: resolve(__dirname, 'src/recipecontainer.html')
      },
    },
  },
  server: {
    base: "/",
  },
});
