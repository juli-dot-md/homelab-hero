import type { Theme } from "../types";
import { t } from "./translations";

export const catppuccinLatte: Theme = {
  id: "catppuccin-latte",
  label: "Latte",
  className: "theme-catppuccin-latte",
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
