export type { Theme, ThemeId, ThemeCategory, Translations, StatTranslation } from "./types";

import { catppuccinFrappe } from "./catppuccin-frappe";
import { catppuccinLatte } from "./catppuccin-latte";
import { catppuccinMacchiato } from "./catppuccin-macchiato";
import { catppuccinMocha } from "./catppuccin-mocha";
import { cleanMinimal } from "./clean-minimal";
import { cleanSlate } from "./clean-slate";
import { retroAmber } from "./retro-amber";
import { retroGreen } from "./retro-green";
import { rpgBloodmoon } from "./rpg-bloodmoon";
import { rpgCosy } from "./rpg-cosy";
import { rpgDwarven } from "./rpg-dwarven";
import { rpgEpic } from "./rpg-epic";
import { rpgHighcourt } from "./rpg-highcourt";
import { rpgNecromancer } from "./rpg-necromancer";
import { rpgWoods } from "./rpg-woods";
import { scifiCyberpunk } from "./scifi-cyberpunk";
import { scifiGlados } from "./scifi-glados";
import { scifiGrimdark } from "./scifi-grimdark";
import { scifiHightech } from "./scifi-hightech";
import { scifiIronman } from "./scifi-ironman";
import { scifiScrapyard } from "./scifi-scrapyard";
import { scifiSolarpunk } from "./scifi-solarpunk";
import { scifiUtopia } from "./scifi-utopia";
import type { Theme, ThemeCategory, ThemeId } from "./types";

export const themes: Record<ThemeId, Theme> = {
  "rpg-epic": rpgEpic,
  "rpg-necromancer": rpgNecromancer,
  "rpg-cosy": rpgCosy,
  "rpg-woods": rpgWoods,
  "rpg-highcourt": rpgHighcourt,
  "rpg-bloodmoon": rpgBloodmoon,
  "rpg-dwarven": rpgDwarven,
  "scifi-utopia": scifiUtopia,
  "scifi-cyberpunk": scifiCyberpunk,
  "scifi-grimdark": scifiGrimdark,
  "scifi-scrapyard": scifiScrapyard,
  "scifi-hightech": scifiHightech,
  "scifi-glados": scifiGlados,
  "scifi-solarpunk": scifiSolarpunk,
  "scifi-ironman": scifiIronman,
  "retro-green": retroGreen,
  "retro-amber": retroAmber,
  "clean-minimal": cleanMinimal,
  "clean-slate": cleanSlate,
  "catppuccin-latte": catppuccinLatte,
  "catppuccin-frappe": catppuccinFrappe,
  "catppuccin-macchiato": catppuccinMacchiato,
  "catppuccin-mocha": catppuccinMocha,
};

export const categories: ThemeCategory[] = [
  {
    label: "Fantasy",
    themeIds: [
      "rpg-epic",
      "rpg-necromancer",
      "rpg-cosy",
      "rpg-woods",
      "rpg-highcourt",
      "rpg-bloodmoon",
      "rpg-dwarven",
    ],
  },
  {
    label: "Sci-Fi",
    themeIds: [
      "scifi-utopia",
      "scifi-cyberpunk",
      "scifi-grimdark",
      "scifi-scrapyard",
      "scifi-hightech",
      "scifi-glados",
      "scifi-solarpunk",
      "scifi-ironman",
    ],
  },
  {
    label: "Retro",
    themeIds: ["retro-green", "retro-amber"],
  },
  {
    label: "Clean",
    themeIds: [
      "clean-minimal",
      "clean-slate",
      "catppuccin-latte",
      "catppuccin-frappe",
      "catppuccin-macchiato",
      "catppuccin-mocha",
    ],
  },
];

export const themeIds = Object.keys(themes) as ThemeId[];
export const defaultTheme: ThemeId = "rpg-epic";
