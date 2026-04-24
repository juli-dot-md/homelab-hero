import { nanoid } from "nanoid";
import type { Theme } from "../themes/types";
import { themeIds } from "../themes";
import type { ThemeId } from "../themes/types";
import { HomelabSheetSchema } from "../types";
export { hasContent } from "./hasContent";
export { buildShareUrl, parseShareUrl } from "./shareUrl";
export { getBaseUrl } from "./config";
import type { HomelabSheet, StatKey } from "../types";

// ---------------------------------------------------------------------------
// Sheet factory helpers
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Stat key mapping — canonical heading text → StatKey
// ---------------------------------------------------------------------------

const STAT_HEADING_MAP: Record<string, StatKey> = {
  "scalability": "scalability",
  "reliability": "reliability",
  "cost": "cost",
  "cloud independence": "cloudIndependence",
  "security": "security",
  "monitoring": "monitoring",
  "backup strategy": "backupStrategy",
  "deployment": "deployment",
};

// Inverse map: StatKey → canonical heading text
const STAT_KEY_TO_HEADING: Record<StatKey, string> = {
  scalability: "Scalability",
  reliability: "Reliability",
  cost: "Cost",
  cloudIndependence: "Cloud Independence",
  security: "Security",
  monitoring: "Monitoring",
  backupStrategy: "Backup Strategy",
  deployment: "Deployment",
};

const STAT_KEYS_ORDERED: StatKey[] = [
  "scalability",
  "reliability",
  "cost",
  "cloudIndependence",
  "security",
  "monitoring",
  "backupStrategy",
  "deployment",
];

// ---------------------------------------------------------------------------
// Markdown export
// ---------------------------------------------------------------------------

export function exportMarkdown(sheet: HomelabSheet, theme: Theme): string {
  const lines: string[] = [];

  // Frontmatter — config only
  lines.push("---");
  lines.push(`id: ${sheet.id}`);
  lines.push(`theme: ${theme.id}`);
  lines.push(`createdAt: ${sheet.createdAt}`);
  lines.push(`updatedAt: ${sheet.updatedAt}`);
  lines.push("---");
  lines.push("");

  // Name
  lines.push(`# ${sheet.name}`);
  lines.push("");

  // Description (plain paragraph, only if non-empty)
  if (sheet.description) {
    lines.push(sheet.description);
    lines.push("");
  }

  // Attributes — only filled stats
  const filledStats = STAT_KEYS_ORDERED.filter((k) => sheet.stats[k]);
  if (filledStats.length > 0) {
    lines.push("## Attributes");
    lines.push("");
    for (const key of filledStats) {
      lines.push(`### ${STAT_KEY_TO_HEADING[key]}`);
      lines.push(sheet.stats[key]);
      lines.push("");
    }
  }

  // Hardware
  if (sheet.hardware.length > 0) {
    lines.push("## Hardware");
    lines.push("");
    for (const item of sheet.hardware) {
      lines.push(`### ${item.name}`);
      if (item.description) lines.push(item.description);
      lines.push("");
    }
  }

  // Services
  if (sheet.services.length > 0) {
    lines.push("## Services");
    lines.push("");
    for (const item of sheet.services) {
      lines.push(`### ${item.name}`);
      if (item.description) lines.push(item.description);
      lines.push("");
    }
  }

  // Custom Fields
  if (sheet.customFields.length > 0) {
    lines.push("## Custom Fields");
    lines.push("");
    for (const field of sheet.customFields) {
      lines.push(`### ${field.label}`);
      if (field.value) lines.push(field.value);
      lines.push("");
    }
  }

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Markdown import
// ---------------------------------------------------------------------------

type ImportResult =
  | { success: true; data: HomelabSheet; themeId: ThemeId | null }
  | { success: false; error: string };

/** Parse a simple key: value frontmatter block. Values are unquoted strings. */
function parseFrontmatter(raw: string): Record<string, string> | null {
  const result: Record<string, string> = {};
  for (const line of raw.split("\n")) {
    const colonIdx = line.indexOf(": ");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 2).trim();
    if (key) result[key] = value;
  }
  return result;
}

export function importMarkdown(raw: string): ImportResult {
  // Split frontmatter from body
  if (!raw.startsWith("---\n")) {
    return { success: false, error: "No frontmatter found — file must start with ---" };
  }

  const fmEnd = raw.indexOf("\n---\n", 4);
  if (fmEnd === -1) {
    return { success: false, error: "Frontmatter closing delimiter not found" };
  }

  const fmRaw = raw.slice(4, fmEnd);
  const body = raw.slice(fmEnd + 5); // skip \n---\n

  const fm = parseFrontmatter(fmRaw);
  if (!fm) return { success: false, error: "Failed to parse frontmatter" };

  // Validate required frontmatter fields
  if (!fm.id) return { success: false, error: "Frontmatter missing required field: id" };
  if (!fm.createdAt) return { success: false, error: "Frontmatter missing required field: createdAt" };
  if (!fm.updatedAt) return { success: false, error: "Frontmatter missing required field: updatedAt" };

  // Resolve theme id
  const themeId: ThemeId | null =
    fm.theme && (themeIds as string[]).includes(fm.theme)
      ? (fm.theme as ThemeId)
      : null;

  // Parse body with a line-by-line state machine
  const stats: Partial<Record<StatKey, string>> = {};
  const hardware: Array<{ id: string; name: string; description: string }> = [];
  const services: Array<{ id: string; name: string; description: string }> = [];
  const customFields: Array<{ id: string; label: string; value: string }> = [];

  let name = "";
  let description = "";

  type Section = "none" | "description" | "attributes" | "hardware" | "services" | "customFields" | "unknown";
  let section: Section = "none";
  let currentItemName = "";
  let currentItemLines: string[] = [];

  function flushItem() {
    const content = currentItemLines.join("\n").trim();
    if (!currentItemName) return;

    if (section === "attributes") {
      const key = STAT_HEADING_MAP[currentItemName.toLowerCase()];
      if (key) {
        stats[key] = content;
      } else {
        console.error(
          `[importMarkdown] Unrecognised stat heading "${currentItemName}" — skipping`
        );
      }
    } else if (section === "hardware") {
      hardware.push({ id: nanoid(8), name: currentItemName, description: content });
    } else if (section === "services") {
      services.push({ id: nanoid(8), name: currentItemName, description: content });
    } else if (section === "customFields") {
      customFields.push({ id: nanoid(8), label: currentItemName, value: content });
    }
    currentItemName = "";
    currentItemLines = [];
  }

  const bodyLines = body.split("\n");
  let descriptionLines: string[] = [];
  let inDescription = false;

  for (const line of bodyLines) {
    // H1 — sheet name
    if (line.startsWith("# ")) {
      name = line.slice(2).trim();
      section = "description";
      inDescription = true;
      continue;
    }

    // H2 — section switch
    if (line.startsWith("## ")) {
      // Flush any pending item before switching sections
      flushItem();

      // Flush description accumulation
      if (inDescription) {
        description = descriptionLines.join("\n").trim();
        inDescription = false;
      }

      const heading = line.slice(3).trim().toLowerCase();
      if (heading === "attributes") section = "attributes";
      else if (heading === "hardware") section = "hardware";
      else if (heading === "services") section = "services";
      else if (heading === "custom fields") section = "customfields" as Section;
      else {
        console.error(`[importMarkdown] Unrecognised section "## ${line.slice(3).trim()}" — skipping`);
        section = "unknown";
      }
      // Fix the typo — customfields without space
      if (section === ("customfields" as Section)) section = "customFields";
      continue;
    }

    // H3 — item / stat heading
    if (line.startsWith("### ")) {
      flushItem();
      currentItemName = line.slice(4).trim();
      currentItemLines = [];
      continue;
    }

    // Content lines
    if (section === "description" && inDescription) {
      // Accumulate description — stop at first empty line after content,
      // or continue for multi-line descriptions
      descriptionLines.push(line);
      continue;
    }

    if (currentItemName && section !== "none" && section !== "description" && section !== "unknown") {
      currentItemLines.push(line);
    }
  }

  // Flush last item
  flushItem();
  if (inDescription) description = descriptionLines.join("\n").trim();

  // Build the full sheet object and validate with Zod
  const raw_sheet = {
    id: fm.id,
    name,
    description,
    stats: {
      scalability: stats.scalability ?? "",
      reliability: stats.reliability ?? "",
      cost: stats.cost ?? "",
      cloudIndependence: stats.cloudIndependence ?? "",
      security: stats.security ?? "",
      monitoring: stats.monitoring ?? "",
      backupStrategy: stats.backupStrategy ?? "",
      deployment: stats.deployment ?? "",
    },
    hardware,
    services,
    customFields,
    createdAt: fm.createdAt,
    updatedAt: fm.updatedAt,
  };

  const parsed = HomelabSheetSchema.safeParse(raw_sheet);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues.map((i) => i.message).join(", "),
    };
  }

  return { success: true, data: parsed.data, themeId };
}

// ---------------------------------------------------------------------------
// Download helper
// ---------------------------------------------------------------------------

export function downloadMarkdown(sheet: HomelabSheet, theme: Theme): void {
  const md = exportMarkdown(sheet, theme);
  const blob = new Blob([md], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${sheet.name.replace(/\s+/g, "-").toLowerCase()}.md`;
  a.click();
  URL.revokeObjectURL(url);
}
