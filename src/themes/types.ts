import type { StatKey } from "../types";

export type ThemeId =
  | "rpg-epic"
  | "rpg-necromancer"
  | "rpg-cosy"
  | "scifi-utopia"
  | "scifi-cyberpunk"
  | "scifi-grimdark";

export type ThemeCategory = {
  label: string;
  themeIds: ThemeId[];
};

export type StatTranslation = {
  label: string;
  placeholders: [string, ...string[]];
};

/**
 * Strict translation contract.
 * Every key is required — TypeScript will error at build time
 * if a theme object is missing any field.
 */
export type Translations = {
  appName: string;
  tagline: string;
  subtitle: string;
  noServer: string;
  sheetLabel: string;
  loading: string;
  autoSaved: string;
  endOfSheet: string;
  createBtn: string;
  importBtn: string;

  dividers: {
    landing: string;
    editor: string;
    statsSection: string;
    equipmentSection: string;
  };

  sections: {
    identity: string;
    attributes: string;
    skills: string;
    hardware: string;
    customFields: string;
  };

  fields: {
    name: string;
    backstory: string;
    /** Randomisable — one picked per session */
    namePlaceholders: [string, ...string[]];
    backstoryPlaceholders: [string, ...string[]];
  };

  placeholders: {
    hardwareName: [string, ...string[]];
    hardwareDescription: [string, ...string[]];
    skillName: [string, ...string[]];
    skillDescription: [string, ...string[]];
    customLabel: [string, ...string[]];
    customValue: [string, ...string[]];
  };

  /** One entry per StatKey */
  stats: Record<StatKey, StatTranslation>;
};

export type Theme = {
  id: ThemeId;
  label: string;
  className: string;
  fonts: {
    googleFonts: string;
  };
  icons: {
    create: string;
    remove: string;
    export: string;
    import: string;
    back: string;
    preview: string;
  };
  t: Translations;
};
