import {defineUserConfig} from "vuepress";
import {fs, getDirname, path} from "@vuepress/utils";
import {viteBundler} from '@vuepress/bundler-vite'
import theme from "./theme.js";

export default defineUserConfig({
    base: "/",
    head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
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
            }
        },
        vuePluginOptions: {},
    }),
    theme,

    // Enable it with pwa
    // shouldPrefetch: false,
    clientConfigFile: path.resolve(__dirname, "./client.ts"),
});
