import { describe, expect, it } from "vitest";
import { ComponentSchema, CustomFieldSchema, HomelabSheetSchema, StatsSchema } from "../types";

describe("ComponentSchema", () => {
  it("validates a valid component", () => {
    const result = ComponentSchema.safeParse({
      id: "h1",
      name: "Dell R720",
      description: "Main server",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty name", () => {
    const result = ComponentSchema.safeParse({ id: "h1", name: "", description: "" });
    expect(result.success).toBe(false);
  });

  it("defaults description to empty string", () => {
    const result = ComponentSchema.safeParse({ id: "h1", name: "Proxmox" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.description).toBe("");
  });
});

describe("CustomFieldSchema", () => {
  it("validates a valid custom field", () => {
    const result = CustomFieldSchema.safeParse({
      id: "cf1",
      label: "Power Draw",
      value: "~150W",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty label", () => {
    const result = CustomFieldSchema.safeParse({ id: "cf1", label: "", value: "x" });
    expect(result.success).toBe(false);
  });
});

describe("StatsSchema", () => {
  it("defaults all fields to empty string", () => {
    const result = StatsSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.scalability).toBe("");
      expect(result.data.reliability).toBe("");
      expect(result.data.cost).toBe("");
      expect(result.data.cloudIndependence).toBe("");
      expect(result.data.security).toBe("");
      expect(result.data.monitoring).toBe("");
      expect(result.data.backupStrategy).toBe("");
      expect(result.data.deployment).toBe("");
    }
  });

  it("accepts partial stat values", () => {
    const result = StatsSchema.safeParse({ reliability: "Glued together, my baby" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.reliability).toBe("Glued together, my baby");
  });
});

describe("HomelabSheetSchema", () => {
  const valid = {
    id: "abc",
    name: "Mike's Homelab",
    description: "Held together by proxmox and hope",
    stats: {
      scalability: "Runs on vibes",
      reliability: "Glued together, my baby",
      cost: "$40/mo",
      cloudIndependence: "100% self-hosted",
      security: "Tailscale and a prayer",
      monitoring: "Grafana",
      backupStrategy: "3-2-1 in theory",
      deployment: "By hand, with love",
    },
    hardware: [{ id: "h1", name: "Dell R720", description: "Server" }],
    services: [{ id: "s1", name: "Jellyfin", description: "Media" }],
    customFields: [{ id: "cf1", label: "Power", value: "200W" }],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it("validates a complete sheet", () => {
    expect(HomelabSheetSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects empty name", () => {
    expect(HomelabSheetSchema.safeParse({ ...valid, name: "" }).success).toBe(false);
  });

  it("defaults arrays and stats to empty", () => {
    const minimal = {
      id: "x",
      name: "Minimal",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const result = HomelabSheetSchema.safeParse(minimal);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.hardware).toEqual([]);
      expect(result.data.services).toEqual([]);
      expect(result.data.customFields).toEqual([]);
      expect(result.data.stats.scalability).toBe("");
      expect(result.data.stats.deployment).toBe("");
    }
  });

  it("rejects invalid datetime", () => {
    expect(HomelabSheetSchema.safeParse({ ...valid, createdAt: "not-a-date" }).success).toBe(
      false
    );
  });
});
