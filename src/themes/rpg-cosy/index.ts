import type { Theme } from "../types";
import { t } from "./translations";

export const rpgCosy: Theme = {
  id: "rpg-cosy",
  label: "Cosy",
  className: "theme-rpg-cosy",
  fonts: {
    googleFonts:
      "family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Nunito:wght@300;400;600&family=JetBrains+Mono:wght@400;500",
  },
  icons: {
    create: "✿",
    remove: "✕",
    export: "↓",
    import: "↑",
    back: "←",
    preview: "◎",
  },
  t,
};
