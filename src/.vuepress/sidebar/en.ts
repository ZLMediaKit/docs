import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    "",
    "tutorial/",
    {
      text: "Docs",
      icon: "book",
      prefix: "guide/",
      children: "structure",
    },
    {
      text: "Reference",
      icon: "laptop-code",
      prefix: "reference/",
      link: "reference/",
      children: "structure",
    },
    {
      text: "More",
      icon: "laptop-code",
      prefix: "more/",
      link: "more/",
      children: "structure",
    },
  ],
});
