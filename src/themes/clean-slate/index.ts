import type { Theme } from "../types";
import { t } from "./translations";

export const cleanSlate: Theme = {
  id: "clean-slate",
  label: "Slate",
  className: "theme-clean-slate",
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
