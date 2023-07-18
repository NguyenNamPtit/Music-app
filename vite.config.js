import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  publicDir: "assets",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/index.html"),
        about: resolve(__dirname, "src/about.html"),
        blog: resolve(__dirname, "src/blog.html"),
        detailalbums: resolve(__dirname, "src/detailalbums.html"),
        detailblog: resolve(__dirname, "src/detailblog.html"),
        detailmusic: resolve(__dirname, "src/detailmusic.html"),
        login: resolve(__dirname, "src/login.html"),
        music: resolve(__dirname, "src/music.html"),
        register: resolve(__dirname, "src/register.html"),
        singger: resolve(__dirname, "src/singger.html"),
        user: resolve(__dirname, "src/user.html"),
      },
    },
  },
});