import type { Theme } from "../types";
import { t } from "./translations";

export const rpgDwarven: Theme = {
  id: "rpg-dwarven",
  label: "Dwarven Forge",
  className: "theme-rpg-dwarven",
  fonts: {
    googleFonts:
      "family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500",
  },
  icons: {
    create: "⚒",
    remove: "✕",
    export: "↓",
    import: "↑",
    back: "←",
    preview: "◎",
  },
  t,
};
