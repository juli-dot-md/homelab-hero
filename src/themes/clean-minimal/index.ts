import type { Theme } from "../types";
import { t } from "./translations";

export const cleanMinimal: Theme = {
  id: "clean-minimal",
  label: "Minimal",
  className: "theme-clean-minimal",
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
