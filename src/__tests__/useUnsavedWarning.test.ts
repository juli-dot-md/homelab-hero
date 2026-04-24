import { describe, expect, it } from "vitest";
import { hasContent } from "../utils/hasContent";
import type { HomelabSheet } from "../types";

const BLANK_SHEET: HomelabSheet = {
  id: "abc",
  name: "My Homelab",
  description: "",
  stats: {
    scalability: "",
    reliability: "",
    cost: "",
    cloudIndependence: "",
    security: "",
    monitoring: "",
    backupStrategy: "",
    deployment: "",
  },
  hardware: [],
  services: [],
  customFields: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("hasContent", () => {
  it("returns false for a blank sheet with only the default name", () => {
    expect(hasContent(BLANK_SHEET)).toBe(false);
  });

  it("returns true when name has been changed from the default", () => {
    expect(hasContent({ ...BLANK_SHEET, name: "Mike's Homelab" })).toBe(true);
  });

  it("returns true when description is filled", () => {
    expect(hasContent({ ...BLANK_SHEET, description: "Something" })).toBe(true);
  });

  it("returns true when any stat is filled", () => {
    expect(
      hasContent({ ...BLANK_SHEET, stats: { ...BLANK_SHEET.stats, reliability: "Solid" } })
    ).toBe(true);
  });

  it("returns true when hardware list is non-empty", () => {
    expect(
      hasContent({
        ...BLANK_SHEET,
        hardware: [{ id: "h1", name: "Dell R720", description: "" }],
      })
    ).toBe(true);
  });

  it("returns true when services list is non-empty", () => {
    expect(
      hasContent({
        ...BLANK_SHEET,
        services: [{ id: "s1", name: "Jellyfin", description: "" }],
      })
    ).toBe(true);
  });

  it("returns true when custom fields list is non-empty", () => {
    expect(
      hasContent({
        ...BLANK_SHEET,
        customFields: [{ id: "cf1", label: "Power", value: "150W" }],
      })
    ).toBe(true);
  });
});
