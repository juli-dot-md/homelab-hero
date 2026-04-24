import type { Theme } from "../types";
import { t } from "./translations";

export const catppuccinMocha: Theme = {
  id: "catppuccin-mocha",
  label: "Mocha",
  className: "theme-catppuccin-mocha",
  fonts: {
    googleFonts: "family=Inter:wght@300;400;500;600",
  },
  icons: {
    create: "+",
    remove: "×",
    export: "↓",
    import: "↑",
    back: "←",
    preview: "○",
  },
  t,
};
