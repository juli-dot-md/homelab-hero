export type { Theme, ThemeId, ThemeCategory, Translations, StatTranslation } from "./types";

import { rpgEpic } from "./rpg-epic";
import { rpgNecromancer } from "./rpg-necromancer";
import { rpgCosy } from "./rpg-cosy";
import { scifiUtopia } from "./scifi-utopia";
import { scifiCyberpunk } from "./scifi-cyberpunk";
import { scifiGrimdark } from "./scifi-grimdark";
import type { Theme, ThemeCategory, ThemeId } from "./types";

export const themes: Record<ThemeId, Theme> = {
  "rpg-epic": rpgEpic,
  "rpg-necromancer": rpgNecromancer,
  "rpg-cosy": rpgCosy,
  "scifi-utopia": scifiUtopia,
  "scifi-cyberpunk": scifiCyberpunk,
  "scifi-grimdark": scifiGrimdark,
};

export const categories: ThemeCategory[] = [
  {
    label: "Fantasy",
    themeIds: ["rpg-epic", "rpg-necromancer", "rpg-cosy"],
  },
  {
    label: "Sci-Fi",
    themeIds: ["scifi-utopia", "scifi-cyberpunk", "scifi-grimdark"],
  },
];

export const themeIds = Object.keys(themes) as ThemeId[];
export const defaultTheme: ThemeId = "rpg-epic";
