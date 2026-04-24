import type { StatKey } from "../types";

export type TooltipDescriptions = {
  stats: Record<StatKey, string>;
  sections: Record<"identity" | "attributes" | "skills" | "hardware" | "customFields", string>;
  fields: Record<"name" | "backstory", string>;
};

/**
 * Canonical descriptions for every theme-dependent label.
 * Theme-agnostic — "Ward Strength" and "Security Posture" both resolve here.
 * Used to populate tooltip text across all themes.
 */
export const descriptions: TooltipDescriptions = {
  stats: {
    scalability:
      "How easily can you grow this setup — add nodes, storage, or services?",
    reliability:
      "Day-to-day stability. Uptime, resilience to failure, how often things break.",
    cost:
      "What it actually costs — hardware amortisation, electricity, subscriptions.",
    cloudIndependence:
      "How free you are from third-party cloud services and vendor lock-in.",
    security:
      "Security strategy — network exposure, access control, hardening approach.",
    monitoring:
      "How well you observe what's running — metrics, logs, alerts, dashboards.",
    backupStrategy:
      "What's backed up, where it goes, how often, and whether you've tested it.",
    deployment:
      "How services get deployed and updated — manual, scripted, or fully automated.",
  },
  sections: {
    identity:
      "The name and story of your homelab.",
    attributes:
      "Key characteristics — reliability, cost, security, and other vital stats.",
    skills:
      "Services and applications running on your homelab.",
    hardware:
      "Physical machines, boards, and devices in your setup.",
    customFields:
      "Any additional fields you want to track.",
  },
  fields: {
    name:
      "What you call your homelab.",
    backstory:
      "The origin story — how it started, what it's for, what makes it yours.",
  },
};
