import type { Theme } from "../types";
import { t } from "./translations";

export const rpgNecromancer: Theme = {
  id: "rpg-necromancer",
  label: "Necromancer",
  className: "theme-rpg-necromancer",
  fonts: {
    googleFonts:
      "family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500",
  },
  icons: {
    create: "☽",
    remove: "✕",
    export: "↓",
    import: "↑",
    back: "←",
    preview: "◎",
  },
  t,
};
