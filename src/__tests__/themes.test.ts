import { describe, expect, it } from "vitest";
import { categories, defaultTheme, themeIds, themes } from "../themes";
import { descriptions } from "../themes/descriptions";
import type { ThemeId } from "../themes/types";

const STAT_KEYS = [
  "scalability",
  "reliability",
  "cost",
  "cloudIndependence",
  "security",
  "monitoring",
  "backupStrategy",
  "deployment",
] as const;

describe("theme registry", () => {
  it("has exactly 6 themes", () => {
    expect(themeIds.length).toBe(6);
  });

  it("default theme exists", () => {
    expect(themes[defaultTheme]).toBeDefined();
  });

  it("has 2 categories", () => {
    expect(categories.length).toBe(2);
  });

  it("all category themeIds exist in the registry", () => {
    for (const cat of categories) {
      for (const id of cat.themeIds) {
        expect(themes[id], `theme ${id} missing from registry`).toBeDefined();
      }
    }
  });

  it("every theme appears in exactly one category", () => {
    const allCatIds = categories.flatMap((c) => c.themeIds);
    expect(allCatIds.length).toBe(themeIds.length);
    for (const id of themeIds) {
      expect(allCatIds).toContain(id);
    }
  });
});

describe("individual themes", () => {
  for (const id of themeIds) {
    describe(`theme: ${id}`, () => {
      const theme = themes[id as ThemeId];
      const { t } = theme;

      it("has required top-level copy fields", () => {
        expect(t.appName).toBeTruthy();
        expect(t.tagline).toBeTruthy();
        expect(t.createBtn).toBeTruthy();
        expect(t.importBtn).toBeTruthy();
        expect(t.loading).toBeTruthy();
        expect(t.endOfSheet).toBeTruthy();
        expect(t.noServer).toBeTruthy();
        expect(t.autoSaved).toBeTruthy();
        expect(t.sheetLabel).toBeTruthy();
      });

      it("has all divider labels", () => {
        expect(t.dividers.landing).toBeTruthy();
        expect(t.dividers.editor).toBeTruthy();
        expect(t.dividers.statsSection).toBeTruthy();
        expect(t.dividers.equipmentSection).toBeTruthy();
      });

      it("has all section labels", () => {
        expect(t.sections.identity).toBeTruthy();
        expect(t.sections.attributes).toBeTruthy();
        expect(t.sections.skills).toBeTruthy();
        expect(t.sections.hardware).toBeTruthy();
        expect(t.sections.customFields).toBeTruthy();
      });

      it("has all field labels and placeholder arrays", () => {
        expect(t.fields.name).toBeTruthy();
        expect(t.fields.backstory).toBeTruthy();
        expect(t.fields.namePlaceholders.length).toBeGreaterThanOrEqual(1);
        expect(t.fields.backstoryPlaceholders.length).toBeGreaterThanOrEqual(1);
      });

      it("has all placeholder arrays with at least one entry", () => {
        expect(t.placeholders.hardwareName.length).toBeGreaterThanOrEqual(1);
        expect(t.placeholders.hardwareDescription.length).toBeGreaterThanOrEqual(1);
        expect(t.placeholders.skillName.length).toBeGreaterThanOrEqual(1);
        expect(t.placeholders.skillDescription.length).toBeGreaterThanOrEqual(1);
        expect(t.placeholders.customLabel.length).toBeGreaterThanOrEqual(1);
        expect(t.placeholders.customValue.length).toBeGreaterThanOrEqual(1);
      });

      it("has all icons", () => {
        expect(theme.icons.create).toBeTruthy();
        expect(theme.icons.remove).toBeTruthy();
        expect(theme.icons.export).toBeTruthy();
        expect(theme.icons.import).toBeTruthy();
        expect(theme.icons.back).toBeTruthy();
        expect(theme.icons.preview).toBeTruthy();
      });

      it("has a CSS className starting with 'theme-'", () => {
        expect(theme.className).toMatch(/^theme-/);
      });

      it("has a Google Fonts string", () => {
        expect(theme.fonts.googleFonts).toContain("family=");
      });

      describe("stats translations", () => {
        for (const key of STAT_KEYS) {
          it(`'${key}' has label and at least 1 placeholder`, () => {
            const stat = t.stats[key];
            expect(stat).toBeDefined();
            expect(stat.label).toBeTruthy();
            expect(stat.placeholders.length).toBeGreaterThanOrEqual(1);
            for (const p of stat.placeholders) {
              expect(p).toBeTruthy();
            }
          });
        }
      });
    });
  }
});

describe("themes x descriptions cross-check", () => {
  it("every stat key used in themes has a corresponding description", () => {
    for (const id of themeIds) {
      const { t } = themes[id as ThemeId];
      for (const key of Object.keys(t.stats)) {
        expect(
          descriptions.stats[key as keyof typeof descriptions.stats],
          `theme "${id}" uses stat key "${key}" but descriptions.ts has no entry for it`
        ).toBeDefined();
      }
    }
  });

  it("every section key used in themes has a corresponding description", () => {
    for (const id of themeIds) {
      const { t } = themes[id as ThemeId];
      for (const key of Object.keys(t.sections)) {
        expect(
          descriptions.sections[key as keyof typeof descriptions.sections],
          `theme "${id}" uses section key "${key}" but descriptions.ts has no entry for it`
        ).toBeDefined();
      }
    }
  });

  it("every field key used in themes has a corresponding description", () => {
    for (const _id of themeIds) {
      for (const key of ["name", "backstory"] as const) {
        expect(
          descriptions.fields[key],
          `field key "${key}" has no entry in descriptions.ts`
        ).toBeDefined();
      }
    }
  });
});
