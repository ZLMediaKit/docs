import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  "/guide/",
  "/tutorial/",
  {
    text: "Reference",
    icon: "lightbulb",
    prefix: "/reference/",
    children: ["test", "resources", "documents", "development_log"],
  },
  {
    text: "More",
    icon: "lightbulb",
    prefix: "/more/",
    children: [
      "collaborative_projects",
      "license",
      "thanks",
      "contact",
      "use_cases",
    ],
  },
]);
