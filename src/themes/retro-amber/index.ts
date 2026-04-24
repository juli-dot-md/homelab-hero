import type { Theme } from "../types";
import { t } from "./translations";

export const retroAmber: Theme = {
  id: "retro-amber",
  label: "Amber",
  className: "theme-retro-amber",
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
