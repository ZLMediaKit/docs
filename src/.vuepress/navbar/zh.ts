import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  "/zh/guide/",
  "/zh/tutorial/",
  {
    text: "参考",
    icon: "lightbulb",
    prefix: "/zh/reference/",
    children: ["test", "resources", "documents", "development_log"],
  },
  {
    text: "了解更多",
    icon: "laptop-code",
    prefix: "/zh/more/",
    children: [
      "collaborative_projects",
      "license",
      "thanks",
      "contact",
      "use_cases",
    ],
  },
]);
