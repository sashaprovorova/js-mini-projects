// import { defineConfig } from "vite";

// export default defineConfig({
//   base: "./",
//   build: {
//     manify: "terser",
//   },
// });

import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // Critical for asset paths
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  publicDir: "public", // Where Kaboom assets should be
});
