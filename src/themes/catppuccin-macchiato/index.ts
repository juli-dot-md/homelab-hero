import type { Theme } from "../types";
import { t } from "./translations";

export const catppuccinMacchiato: Theme = {
  id: "catppuccin-macchiato",
  label: "Macchiato",
  className: "theme-catppuccin-macchiato",
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
