import type { Theme } from "../types";
import { t } from "./translations";

export const catppuccinFrappe: Theme = {
  id: "catppuccin-frappe",
  label: "Frappe",
  className: "theme-catppuccin-frappe",
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
