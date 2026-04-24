import { describe, expect, it } from "vitest";
import type { HomelabSheet } from "../types";
import { createSheet, exportJson, getRandomPlaceholder, importJson } from "../utils";

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
    expect(keys).toContain("scalability");
    expect(keys).toContain("reliability");
    expect(keys).toContain("cost");
    expect(keys).toContain("cloudIndependence");
    expect(keys).toContain("security");
    expect(keys).toContain("monitoring");
    expect(keys).toContain("backupStrategy");
    expect(keys).toContain("deployment");
  });
});

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

describe("exportJson / importJson", () => {
  const sheet: HomelabSheet = {
    id: "abc",
    name: "Test Lab",
    description: "desc",
    stats: {
      scalability: "Runs on vibes",
      reliability: "Glued together, my baby",
      cost: "",
      cloudIndependence: "",
      security: "",
      monitoring: "",
      backupStrategy: "",
      deployment: "",
    },
    hardware: [{ id: "h1", name: "Server", description: "" }],
    services: [],
    customFields: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it("exports to a valid JSON string", () => {
    const json = exportJson(sheet);
    expect(() => JSON.parse(json)).not.toThrow();
  });

  it("round-trips a sheet through export and import", () => {
    const json = exportJson(sheet);
    const result = importJson(json);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.id).toBe(sheet.id);
      expect(result.data.name).toBe(sheet.name);
      expect(result.data.hardware).toHaveLength(1);
      expect(result.data.stats.reliability).toBe("Glued together, my baby");
    }
  });

  it("returns error for invalid JSON string", () => {
    const result = importJson("not json at all");
    expect(result.success).toBe(false);
  });

  it("returns error for JSON that fails schema validation", () => {
    const result = importJson(JSON.stringify({ id: "x", name: "" }));
    expect(result.success).toBe(false);
  });
});
