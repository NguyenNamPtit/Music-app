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
        // product: resolve(__dirname, "src/product.html"),
        // cart: resolve(__dirname, "src/cart.html"),
        // checkout: resolve(__dirname, "src/checkout.html"),
        // contact: resolve(__dirname, "src/contact.html"),
        // productdetail: resolve(__dirname, "src/productdetail.html"),
        // blog: resolve(__dirname, "src/blog.html"),
        // blogdetail: resolve(__dirname, "src/blogdetail.html"),
        // user: resolve(__dirname, "src/user.html"),
      },
    },
  },
});