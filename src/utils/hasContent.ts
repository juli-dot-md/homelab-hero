import type { HomelabSheet } from "../types";

const DEFAULT_NAME = "My Homelab";

/**
 * Returns true if the sheet has any meaningful content beyond
 * the blank defaults — used to decide whether to warn before navigation.
 */
export function hasContent(sheet: HomelabSheet): boolean {
  if (sheet.name !== DEFAULT_NAME) return true;
  if (sheet.description) return true;
  if (Object.values(sheet.stats).some((v) => v !== "")) return true;
  if (sheet.hardware.length > 0) return true;
  if (sheet.services.length > 0) return true;
  if (sheet.customFields.length > 0) return true;
  return false;
}
