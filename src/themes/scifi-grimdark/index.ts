import type { Theme } from "../types";
import { t } from "./translations";

export const scifiGrimdark: Theme = {
  id: "scifi-grimdark",
  label: "Grimdark",
  className: "theme-scifi-grimdark",
  fonts: {
    googleFonts:
      "family=Share+Tech+Mono&family=Exo+2:ital,wght@0,300;0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500",
  },
  icons: {
    create: "⚙",
    remove: "✕",
    export: "⬇",
    import: "⬆",
    back: "◀",
    preview: "◉",
  },
  t,
};
