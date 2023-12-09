import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    "tutorial/",
    {
      text: "指南",
      icon: "book",
      prefix: "guide/",
      children: "structure",
    },
    {
      text: "参考",
      icon: "laptop-code",
      prefix: "reference/",
      link: "reference/",
      children: "structure",
    },
    {
      text: "了解更多",
      icon: "laptop-code",
      prefix: "more/",
      link: "more/",
      children: "structure",
    },
  ],
});
