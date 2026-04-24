import { describe, expect, it } from "vitest";
import { descriptions } from "../themes/descriptions";

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

const SECTION_KEYS = [
  "identity",
  "attributes",
  "skills",
  "hardware",
  "customFields",
] as const;

const FIELD_KEYS = ["name", "backstory"] as const;

describe("descriptions", () => {
  describe("stats", () => {
    it("has a description for every StatKey", () => {
      for (const key of STAT_KEYS) {
        expect(descriptions.stats[key], `missing description for stat: ${key}`).toBeDefined();
      }
    });

    it("has no extra stat keys beyond the defined StatKeys", () => {
      const descKeys = Object.keys(descriptions.stats).sort();
      const expectedKeys = [...STAT_KEYS].sort();
      expect(descKeys).toEqual(expectedKeys);
    });

    it("all stat descriptions are non-empty strings", () => {
      for (const key of STAT_KEYS) {
        expect(typeof descriptions.stats[key]).toBe("string");
        expect(descriptions.stats[key].length).toBeGreaterThan(0);
      }
    });

    it("no stat description is shorter than 15 characters", () => {
      for (const key of STAT_KEYS) {
        expect(
          descriptions.stats[key].length,
          `stat "${key}" description too short: "${descriptions.stats[key]}"`
        ).toBeGreaterThanOrEqual(15);
      }
    });
  });

  describe("sections", () => {
    it("has a description for every section key", () => {
      for (const key of SECTION_KEYS) {
        expect(descriptions.sections[key], `missing description for section: ${key}`).toBeDefined();
      }
    });

    it("has no extra section keys", () => {
      const descKeys = Object.keys(descriptions.sections).sort();
      const expectedKeys = [...SECTION_KEYS].sort();
      expect(descKeys).toEqual(expectedKeys);
    });

    it("all section descriptions are non-empty strings of at least 15 chars", () => {
      for (const key of SECTION_KEYS) {
        expect(typeof descriptions.sections[key]).toBe("string");
        expect(descriptions.sections[key].length).toBeGreaterThanOrEqual(15);
      }
    });
  });

  describe("fields", () => {
    it("has a description for every field key", () => {
      for (const key of FIELD_KEYS) {
        expect(descriptions.fields[key], `missing description for field: ${key}`).toBeDefined();
      }
    });

    it("has no extra field keys", () => {
      const descKeys = Object.keys(descriptions.fields).sort();
      const expectedKeys = [...FIELD_KEYS].sort();
      expect(descKeys).toEqual(expectedKeys);
    });

    it("all field descriptions are non-empty strings of at least 15 chars", () => {
      for (const key of FIELD_KEYS) {
        expect(typeof descriptions.fields[key]).toBe("string");
        expect(descriptions.fields[key].length).toBeGreaterThanOrEqual(15);
      }
    });
  });
});
