import {hopeTheme} from "vuepress-theme-hope";
import {enNavbar, zhNavbar} from "./navbar/index.js";
import {enSidebar, zhSidebar} from "./sidebar/index.js";

export default hopeTheme({
    hostname: "https://docs.ZLMediaKit.com",

    author: {
        name: "ZLMediaKit",
        url: "https://docs.ZLMediaKit.com",
    },

    iconAssets: "fontawesome-with-brands",

    logo: "/logo.svg",

    repo: "ZLMediaKit/docs",

    docsDir: "src",
    navbarLayout: {
        start: ["Brand"],
        center: [],
        end: ["Links", "Language","ProjectLink", "Outlook", "Search"],
    },

    locales: {
        "/": {
            // navbar
            navbar: enNavbar,

            // sidebar
            sidebar: enSidebar,

            footer: "MIT Licensed",

            displayFooter: true,

            metaLocales: {
                editLink: "Edit this page on GitHub",
            },
        },

        /**
         * Chinese locale config
         */
        "/zh/": {
            // navbar
            navbar: zhNavbar,

            // sidebar
            sidebar: zhSidebar,

            footer: "MIT Licensed",

            displayFooter: true,

            // page meta
            metaLocales: {
                editLink: "在 GitHub 上编辑此页",
            },
        },
    },

    encrypt: {},

    plugins: {
        // You should generate and use your own comment service
        comment: {
            provider: "Giscus",
            repo: "ZLMediaKit/docs",
            repoId: "R_kgDOKboWmQ",
            category: "Announcements",
            categoryId: "DIC_kwDOKboWmc4CZ_77",
        },
        copyCode: {},
        // All features are enabled for demo, only preserve features you need here
        mdEnhance: {
            align: true,
            attrs: true,
            chart: true,
            codetabs: true,
            demo: true,
            echarts: true,
            figure: true,
            flowchart: true,
            gfm: true,
            imgLazyload: true,
            imgSize: true,
            include: true,
            katex: true,
            mark: true,
            mermaid: true,
            playground: {
                presets: ["ts", "vue"],
            },
            flowchartConfig: {
                  width: "100%",
            },
            presentation: ["highlight", "math", "search", "notes", "zoom"],
            stylize: [
                {
                    matcher: "Recommended",
                    replacer: ({tag}) => {
                        if (tag === "em")
                            return {
                                tag: "Badge",
                                attrs: {type: "tip"},
                                content: "Recommended",
                            };
                    },
                },
            ],
            sub: true,
            sup: true,
            tabs: true,
            vPre: true,
            vuePlayground: true,
        },

        // uncomment these if you want a pwa
        pwa: {
          favicon: "/favicon.ico",
          cacheHTML: true,
          cachePic: true,
          appendBase: true,
          apple: {
            icon: "/assets/icon/apple-touch-icon-152x152.png",
            statusBarColor: "black",
          },
          msTile: {
            image: "/assets/icon/ms-icon-144.png",
            color: "#ffffff",
          },
          manifest: {
            icons: [
              {
                src: "/assets/icon/chrome-192.png",
                sizes: "192x192",
                type: "image/png",
              },
            ],
            shortcuts: [
              {
                name: "ZlMediaKit Docs",
                short_name: "ZLM",
                url: "/guide/",
                icons: [
                  {
                    src: "/assets/icon/guide-maskable.png",
                    sizes: "192x192",
                    purpose: "maskable",
                    type: "image/png",
                  },
                ],
              },
            ],
          },
        },
    },
});
