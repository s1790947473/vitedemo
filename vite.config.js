import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      //配置路径别名
      "@": path.resolve(__dirname, "src"),
    },
  },

  //配置代理跨域
  server: {
    proxy: {
      // "/api": {
      //   target: "http://jsonplaceholder.typicode.com", // 真实后端服务器
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/api": "", // 去掉 /api 前缀
      //   },
      // },
      // "/mockApi": {
      //   target: "http://localhost:5173", // 本地服务器，用于 Mock.js
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/mockApi": "", // 去掉 /mockApi 前缀
      //   },
      // },
    },
  },
});
