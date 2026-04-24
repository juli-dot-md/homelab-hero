import { nanoid } from "nanoid";
import { HomelabSheetSchema } from "../types";
import type { HomelabSheet } from "../types";

export function createSheet(overrides: Partial<HomelabSheet> = {}): HomelabSheet {
  const now = new Date().toISOString();
  return {
    id: nanoid(8),
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
    createdAt: now,
    updatedAt: now,
    ...overrides,
  };
}

export function exportJson(sheet: HomelabSheet): string {
  return JSON.stringify(sheet, null, 2);
}

type ImportResult =
  | { success: true; data: HomelabSheet }
  | { success: false; error: string };

export function importJson(raw: string): ImportResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { success: false, error: "Invalid JSON" };
  }

  const result = HomelabSheetSchema.safeParse(parsed);
  if (!result.success) {
    return { success: false, error: result.error.issues.map((i) => i.message).join(", ") };
  }
  return { success: true, data: result.data };
}

export function createComponent(overrides: { name?: string; description?: string } = {}) {
  return {
    id: nanoid(8),
    name: overrides.name ?? "",
    description: overrides.description ?? "",
  };
}

export function createCustomField(overrides: { label?: string; value?: string } = {}) {
  return {
    id: nanoid(8),
    label: overrides.label ?? "",
    value: overrides.value ?? "",
  };
}

export function getRandomPlaceholder(placeholders: [string, ...string[]]): string {
  return placeholders[Math.floor(Math.random() * placeholders.length)];
}

export function downloadJson(sheet: HomelabSheet): void {
  const json = exportJson(sheet);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${sheet.name.replace(/\s+/g, "-").toLowerCase()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
