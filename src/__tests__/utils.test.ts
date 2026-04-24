import { describe, expect, it, vi } from "vitest";
import { themes } from "../themes";
import type { HomelabSheet } from "../types";
import { createSheet, exportMarkdown, getRandomPlaceholder, importMarkdown } from "../utils";

// ---------------------------------------------------------------------------
// Shared fixtures
// ---------------------------------------------------------------------------

const THEME = themes["rpg-epic"];

const FULL_SHEET: HomelabSheet = {
  id: "abc12345",
  name: "Mike's Homelab",
  description: "Held together by proxmox and hope.",
  stats: {
    scalability: "Runs on vibes",
    reliability: "Glued together, my baby",
    cost: "$40/mo",
    cloudIndependence: "",
    security: "Tailscale and a prayer",
    monitoring: "",
    backupStrategy: "3-2-1 in theory",
    deployment: "By hand, with love",
  },
  hardware: [
    { id: "h1", name: "Dell R720", description: "2x Xeon E5-2670, 128GB RAM" },
    { id: "h2", name: "Raspberry Pi 4", description: "" },
  ],
  services: [{ id: "s1", name: "Jellyfin", description: "Media server, LXC container" }],
  customFields: [
    { id: "cf1", label: "Power Draw", value: "~150W" },
    { id: "cf2", label: "Location", value: "Basement" },
  ],
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-02T00:00:00.000Z",
};

const MINIMAL_SHEET: HomelabSheet = {
  id: "min1",
  name: "Minimal Lab",
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
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

// ---------------------------------------------------------------------------
// createSheet
// ---------------------------------------------------------------------------

describe("createSheet", () => {
  it("creates a sheet with a unique id", () => {
    const a = createSheet();
    const b = createSheet();
    expect(a.id).toBeTruthy();
    expect(b.id).toBeTruthy();
    expect(a.id).not.toBe(b.id);
  });

  it("applies optional overrides", () => {
    const sheet = createSheet({ name: "My Lab", description: "Cool lab" });
    expect(sheet.name).toBe("My Lab");
    expect(sheet.description).toBe("Cool lab");
  });

  it("sets createdAt and updatedAt as ISO strings", () => {
    const sheet = createSheet();
    expect(() => new Date(sheet.createdAt)).not.toThrow();
    expect(() => new Date(sheet.updatedAt)).not.toThrow();
  });

  it("has empty arrays and blank stats by default", () => {
    const sheet = createSheet();
    expect(sheet.hardware).toEqual([]);
    expect(sheet.services).toEqual([]);
    expect(sheet.customFields).toEqual([]);
    expect(sheet.stats.scalability).toBe("");
    expect(sheet.stats.deployment).toBe("");
  });

  it("has all 8 stat keys", () => {
    const sheet = createSheet();
    const keys = Object.keys(sheet.stats);
    for (const key of [
      "scalability",
      "reliability",
      "cost",
      "cloudIndependence",
      "security",
      "monitoring",
      "backupStrategy",
      "deployment",
    ]) {
      expect(keys).toContain(key);
    }
  });
});

// ---------------------------------------------------------------------------
// getRandomPlaceholder
// ---------------------------------------------------------------------------

describe("getRandomPlaceholder", () => {
  it("returns one of the provided strings", () => {
    const options: [string, ...string[]] = ["a", "b", "c"];
    for (let i = 0; i < 20; i++) {
      expect(options).toContain(getRandomPlaceholder(options));
    }
  });

  it("works with a single option", () => {
    expect(getRandomPlaceholder(["only one"])).toBe("only one");
  });
});

// ---------------------------------------------------------------------------
// exportMarkdown
// ---------------------------------------------------------------------------

describe("exportMarkdown", () => {
  it("starts with the frontmatter delimiter", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    expect(md.startsWith("---\n")).toBe(true);
  });

  it("frontmatter contains the sheet id", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    expect(md).toContain("id: abc12345");
  });

  it("frontmatter contains the theme id", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    expect(md).toContain("theme: rpg-epic");
  });

  it("frontmatter contains createdAt and updatedAt", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    expect(md).toContain("createdAt: 2026-01-01T00:00:00.000Z");
    expect(md).toContain("updatedAt: 2026-01-02T00:00:00.000Z");
  });

  it("frontmatter does NOT contain stat values or component data", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    // Extract only frontmatter block
    const fmEnd = md.indexOf("\n---\n", 4);
    const frontmatter = md.slice(0, fmEnd);
    expect(frontmatter).not.toContain("Glued together");
    expect(frontmatter).not.toContain("Dell R720");
    expect(frontmatter).not.toContain("Jellyfin");
  });

  it("body contains sheet name as H1", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    expect(md).toContain("# Mike's Homelab");
  });

  it("body contains description as plain paragraph", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    expect(md).toContain("Held together by proxmox and hope.");
    // Not a blockquote
    expect(md).not.toContain("> Held together");
  });

  it("body contains ## Attributes section with filled stats as H3", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    expect(md).toContain("## Attributes");
    expect(md).toContain("### Scalability\nRuns on vibes");
    expect(md).toContain("### Reliability\nGlued together, my baby");
    expect(md).toContain("### Backup Strategy\n3-2-1 in theory");
  });

  it("empty stats are omitted from the body", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    expect(md).not.toContain("### Cloud Independence");
    expect(md).not.toContain("### Monitoring");
  });

  it("omits ## Attributes section entirely if all stats are empty", () => {
    const md = exportMarkdown(MINIMAL_SHEET, THEME);
    expect(md).not.toContain("## Attributes");
  });

  it("body contains ## Hardware with each item as H3 + description", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    expect(md).toContain("## Hardware");
    expect(md).toContain("### Dell R720\n2x Xeon E5-2670, 128GB RAM");
    expect(md).toContain("### Raspberry Pi 4");
  });

  it("body contains ## Services with each item as H3 + description", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    expect(md).toContain("## Services");
    expect(md).toContain("### Jellyfin\nMedia server, LXC container");
  });

  it("body contains ## Custom Fields with each label as H3 + value", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    expect(md).toContain("## Custom Fields");
    expect(md).toContain("### Power Draw\n~150W");
    expect(md).toContain("### Location\nBasement");
  });

  it("omits ## Hardware section entirely if hardware is empty", () => {
    const md = exportMarkdown(MINIMAL_SHEET, THEME);
    expect(md).not.toContain("## Hardware");
  });

  it("omits ## Services section entirely if services is empty", () => {
    const md = exportMarkdown(MINIMAL_SHEET, THEME);
    expect(md).not.toContain("## Services");
  });

  it("omits ## Custom Fields section entirely if customFields is empty", () => {
    const md = exportMarkdown(MINIMAL_SHEET, THEME);
    expect(md).not.toContain("## Custom Fields");
  });

  it("hardware item with no description does not emit a blank line after heading", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    // Pi 4 has no description — should just be a heading with no trailing content
    expect(md).toContain("### Raspberry Pi 4\n");
  });

  it("does not include themedHeaders in frontmatter when undefined", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    const fmEnd = md.indexOf("\n---\n", 4);
    const frontmatter = md.slice(0, fmEnd);
    expect(frontmatter).not.toContain("themedHeaders");
  });

  it("does not include themedHeaders in frontmatter when true", () => {
    const sheet = { ...FULL_SHEET, themedHeaders: true };
    const md = exportMarkdown(sheet, THEME);
    const fmEnd = md.indexOf("\n---\n", 4);
    const frontmatter = md.slice(0, fmEnd);
    expect(frontmatter).not.toContain("themedHeaders");
  });

  it("includes themedHeaders: false in frontmatter when set to false", () => {
    const sheet = { ...FULL_SHEET, themedHeaders: false };
    const md = exportMarkdown(sheet, THEME);
    expect(md).toContain("themedHeaders: false");
  });
});

// ---------------------------------------------------------------------------
// importMarkdown
// ---------------------------------------------------------------------------

describe("importMarkdown", () => {
  it("round-trips name through export → import", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    const result = importMarkdown(md);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.name).toBe("Mike's Homelab");
  });

  it("round-trips description through export → import", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    const result = importMarkdown(md);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.description).toBe("Held together by proxmox and hope.");
  });

  it("round-trips sheet id via frontmatter", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    const result = importMarkdown(md);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.id).toBe("abc12345");
  });

  it("round-trips filled stats", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    const result = importMarkdown(md);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.stats.scalability).toBe("Runs on vibes");
      expect(result.data.stats.reliability).toBe("Glued together, my baby");
      expect(result.data.stats.backupStrategy).toBe("3-2-1 in theory");
    }
  });

  it("empty stats remain empty after round-trip", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    const result = importMarkdown(md);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.stats.cloudIndependence).toBe("");
      expect(result.data.stats.monitoring).toBe("");
    }
  });

  it("round-trips hardware name and description", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    const result = importMarkdown(md);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.hardware).toHaveLength(2);
      expect(result.data.hardware[0].name).toBe("Dell R720");
      expect(result.data.hardware[0].description).toBe("2x Xeon E5-2670, 128GB RAM");
      expect(result.data.hardware[1].name).toBe("Raspberry Pi 4");
      expect(result.data.hardware[1].description).toBe("");
    }
  });

  it("round-trips services", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    const result = importMarkdown(md);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.services).toHaveLength(1);
      expect(result.data.services[0].name).toBe("Jellyfin");
      expect(result.data.services[0].description).toBe("Media server, LXC container");
    }
  });

  it("round-trips custom fields (label + value)", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    const result = importMarkdown(md);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.customFields).toHaveLength(2);
      expect(result.data.customFields[0].label).toBe("Power Draw");
      expect(result.data.customFields[0].value).toBe("~150W");
    }
  });

  it("returns the theme id from frontmatter", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    const result = importMarkdown(md);
    expect(result.success).toBe(true);
    if (result.success) expect(result.themeId).toBe("rpg-epic");
  });

  it("round-trips themedHeaders: false through export → import", () => {
    const sheet = { ...FULL_SHEET, themedHeaders: false };
    const md = exportMarkdown(sheet, THEME);
    const result = importMarkdown(md);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.themedHeaders).toBe(false);
  });

  it("themedHeaders is undefined when not present in frontmatter", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    const result = importMarkdown(md);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.themedHeaders).toBeUndefined();
  });

  it("themedHeaders is undefined when true (not written to frontmatter)", () => {
    const sheet = { ...FULL_SHEET, themedHeaders: true as boolean };
    const md = exportMarkdown(sheet, THEME);
    const result = importMarkdown(md);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.themedHeaders).toBeUndefined();
  });

  it("returns themeId: null for an unknown theme id in frontmatter", () => {
    const md = exportMarkdown(FULL_SHEET, THEME).replace(
      "theme: rpg-epic",
      "theme: not-a-real-theme"
    );
    const result = importMarkdown(md);
    expect(result.success).toBe(true);
    if (result.success) expect(result.themeId).toBeNull();
  });

  it("returns error for content with no frontmatter delimiters", () => {
    const result = importMarkdown("# Just a heading\n\nNo frontmatter here.");
    expect(result.success).toBe(false);
  });

  it("returns error for frontmatter missing required id field", () => {
    const md =
      "---\ntheme: rpg-epic\ncreatedAt: 2026-01-01T00:00:00.000Z\nupdatedAt: 2026-01-01T00:00:00.000Z\n---\n\n# A Lab\n";
    const result = importMarkdown(md);
    expect(result.success).toBe(false);
  });

  it("returns error for frontmatter missing required createdAt", () => {
    const md =
      "---\nid: abc\ntheme: rpg-epic\nupdatedAt: 2026-01-01T00:00:00.000Z\n---\n\n# A Lab\n";
    const result = importMarkdown(md);
    expect(result.success).toBe(false);
  });

  it("unrecognised ## section is skipped, rest of sheet still loads", () => {
    const md = exportMarkdown(FULL_SHEET, THEME).replace("## Hardware", "## Unknown Section");
    const result = importMarkdown(md);
    // Sheet still loads successfully
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Mike's Homelab");
      // Hardware parsed under unknown section heading — expect empty
      expect(result.data.hardware).toHaveLength(0);
    }
  });

  it("unrecognised ### stat heading is skipped with console.error, rest of stats still load", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const md = exportMarkdown(FULL_SHEET, THEME).replace(
      "### Scalability\nRuns on vibes",
      "### Frobulation Index\nVery frobnicated"
    );
    const result = importMarkdown(md);
    expect(result.success).toBe(true);
    if (result.success) {
      // Other stats still present
      expect(result.data.stats.reliability).toBe("Glued together, my baby");
      // Unknown stat not added
      expect((result.data.stats as Record<string, string>)["frobulationIndex"]).toBeUndefined();
    }
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it("component with no description gets empty string description", () => {
    const md = exportMarkdown(FULL_SHEET, THEME);
    const result = importMarkdown(md);
    expect(result.success).toBe(true);
    if (result.success) {
      const pi = result.data.hardware.find((h) => h.name === "Raspberry Pi 4");
      expect(pi?.description).toBe("");
    }
  });
});
