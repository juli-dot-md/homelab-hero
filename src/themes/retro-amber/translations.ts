import type { Translations } from "../types";

export const t: Translations = {
  appName: "HOMELAB HERO",
  tagline: "SYSTEM PROFILE //",
  subtitle:
    "DOCUMENT YOUR HOMELAB SYSTEM. ENTER HARDWARE SPECS, ACTIVE SERVICES, AND CONFIGURATION DATA. ALL FIELDS OPTIONAL BUT COMPLETION IS RECOMMENDED.",
  noServer: "ALL DATA STORED LOCALLY. NO REMOTE CONNECTION. NO TELEMETRY. SYSTEM IS CLEAN.",
  sheetLabel: "HOMELAB SYSTEM PROFILE",
  loading: "LOADING... PLEASE WAIT",
  autoSaved: "DATA WRITTEN TO LOCAL BUFFER",
  endOfSheet: "END OF TRANSMISSION",
  createBtn: "> NEW PROFILE",
  importBtn: "> LOAD PROFILE",

  dividers: {
    landing: "SYSTEM READY",
    editor: "EDIT MODE ACTIVE",
    statsSection: "SYSTEM METRICS",
    equipmentSection: "HARDWARE MANIFEST",
  },

  sections: {
    identity: "IDENTITY",
    attributes: "SYSTEM METRICS",
    skills: "ACTIVE PROCESSES",
    hardware: "HARDWARE",
    customFields: "USER FIELDS",
  },

  fields: {
    name: "SYSTEM NAME",
    backstory: "SYSTEM NOTES",
    namePlaceholders: ["HOMELAB_01", "SERVER_ALPHA", "MAINFRAME_HOME", "THE_STACK", "NODE_PRIME"],
    backstoryPlaceholders: [
      "HOME SERVER CLUSTER. OPERATIONAL SINCE 2019. NO CRITICAL FAILURES.",
      "SELF-HOSTED INFRASTRUCTURE. ALL SERVICES LOCAL. PRIVACY MAINTAINED.",
      "BUILT FROM SURPLUS HARDWARE. CURRENTLY OPERATIONAL. STATUS: NOMINAL.",
      "PERSONAL COMPUTE CLUSTER. RUNNING VARIOUS SERVICES. SEE BELOW.",
    ],
  },

  placeholders: {
    hardwareName: ["NODE_01", "STORAGE_01", "GATEWAY", "COMPUTE_01", "BACKUP_NODE"],
    hardwareDescription: [
      "SPECS: SEE LABEL",
      "OPERATIONAL. STATUS NOMINAL.",
      "RUNNING. NO ERRORS LOGGED.",
      "HARDWARE REVISION 3. STABLE.",
    ],
    skillName: ["PIHOLE", "JELLYFIN", "NEXTCLOUD", "GITEA", "GRAFANA"],
    skillDescription: [
      "DNS FILTER. PORT 53. ACTIVE.",
      "MEDIA SERVER. PORT 8096. STREAMING.",
      "FILE SYNC. PORT 443. OPERATIONAL.",
      "VERSION CONTROL. PORT 3000. RUNNING.",
    ],
    customLabel: ["POWER", "LOCATION", "UPTIME", "STATUS"],
    customValue: ["150W", "RACK_01", "99.2%", "OPERATIONAL"],
  },

  stats: {
    scalability: {
      label: "SCALABILITY",
      placeholders: ["UPTIME: 99.2%", "CAPACITY: 72%", "EXPANSION: POSSIBLE", "STATUS: NOMINAL"],
    },
    reliability: {
      label: "RELIABILITY",
      placeholders: [
        "ERROR RATE: ACCEPTABLE",
        "MTBF: HIGH",
        "FAILURES: 2 THIS YEAR",
        "STATUS: STABLE",
      ],
    },
    cost: {
      label: "COST",
      placeholders: [
        "COST: CLASSIFIED",
        "MONTHLY: $40",
        "ELECTRICITY: SEE LOGS",
        "BUDGET: ALLOCATED",
      ],
    },
    cloudIndependence: {
      label: "INDEPENDENCE",
      placeholders: ["EXTERNAL DEPS: NONE", "CLOUD: NOT USED", "LOCAL: 100%", "STATUS: SOVEREIGN"],
    },
    security: {
      label: "SECURITY",
      placeholders: ["ACCESS: RESTRICTED", "FIREWALL: ACTIVE", "INTRUSIONS: 0", "STATUS: SECURE"],
    },
    monitoring: {
      label: "MONITORING",
      placeholders: [
        "MONITOR: ACTIVE",
        "ALERTS: 3 THIS WEEK",
        "LOGS: AVAILABLE",
        "STATUS: WATCHING",
      ],
    },
    backupStrategy: {
      label: "BACKUP",
      placeholders: ["BACKUP: SCHEDULED", "LAST RUN: SEE LOGS", "COPIES: 3", "STATUS: CURRENT"],
    },
    deployment: {
      label: "DEPLOYMENT",
      placeholders: [
        "DEPLOY: ANSIBLE",
        "LAST CHANGE: SEE GIT",
        "METHOD: AUTOMATED",
        "STATUS: APPLIED",
      ],
    },
  },
};
