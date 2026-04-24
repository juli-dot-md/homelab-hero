import { describe, expect, it } from "vitest";
import { type ThemeId, defaultTheme, themeIds, themes } from "../themes";

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

describe("theme definitions", () => {
  it("has at least two themes", () => {
    expect(themeIds.length).toBeGreaterThanOrEqual(2);
  });

  it("default theme exists", () => {
    expect(themes[defaultTheme]).toBeDefined();
  });

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

      it("has all field labels", () => {
        expect(t.fields.name).toBeTruthy();
        expect(t.fields.backstory).toBeTruthy();
        expect(t.fields.namePlaceholder).toBeTruthy();
        expect(t.fields.backstoryPlaceholder).toBeTruthy();
      });

      it("has all placeholder strings", () => {
        expect(t.placeholders.hardwareName).toBeTruthy();
        expect(t.placeholders.hardwareDescription).toBeTruthy();
        expect(t.placeholders.skillName).toBeTruthy();
        expect(t.placeholders.skillDescription).toBeTruthy();
        expect(t.placeholders.customLabel).toBeTruthy();
        expect(t.placeholders.customValue).toBeTruthy();
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
          it(`has label and at least one placeholder for '${key}'`, () => {
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
