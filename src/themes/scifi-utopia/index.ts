import type { Theme } from "../types";
import { t } from "./translations";

export const scifiUtopia: Theme = {
  id: "scifi-utopia",
  label: "Utopia",
  className: "theme-scifi-utopia",
  fonts: {
    googleFonts:
      "family=Exo+2:ital,wght@0,300;0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500",
  },
  icons: {
    create: "▶",
    remove: "✕",
    export: "⬇",
    import: "⬆",
    back: "◀",
    preview: "◉",
  },
  t,
};
