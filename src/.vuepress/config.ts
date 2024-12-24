import { viteBundler } from "@vuepress/bundler-vite";
import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "ZLMediaKit",
      description: "Official documentation for ZLMediaKit",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "ZLMediaKit",
      description: "ZLMediaKit 官方文档",
    },
  },

  bundler: viteBundler({
    viteOptions: {
      build: {
        cssCodeSplit: false,
      },
    },
  }),

  theme,

  shouldPrefetch: false,
});
