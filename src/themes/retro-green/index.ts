import type { Theme } from "../types";
import { t } from "./translations";

export const retroGreen: Theme = {
  id: "retro-green",
  label: "Phosphor",
  className: "theme-retro-green",
  fonts: {
    googleFonts: "family=Share+Tech+Mono",
  },
  icons: {
    create: ">",
    remove: "X",
    export: "v",
    import: "^",
    back: "<",
    preview: "*",
  },
  t,
};
