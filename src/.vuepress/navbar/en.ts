import { navbar } from "vuepress-theme-hope";

export const enNavbar = navbar([
  "/",
  "/guide/",
  "/tutorial/",
  {
    text: "Reference",
    icon: "lightbulb",
    prefix: "/reference/",
    children: [
      {
        text: "Testing",
        icon: "lightbulb",
        prefix: "test/",
        children: ["performance_testing", 'delay_test', 'online_test', "how_to_test_delay"],
      },
      {
        text: "Resources",
        icon: "lightbulb",
        prefix: "resources/",
        children: ["dependency", ],
      },
    ],
  },
  {
    text: "More",
    icon: "lightbulb",
    prefix: "/more/",
    children: [
     "collaborative_projects", 'license', 'thanks', "contact", "use_cases"
    ],
  },
]);
