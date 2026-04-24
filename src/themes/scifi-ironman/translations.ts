import type { Translations } from "../types";

export const t: Translations = {
  appName: "Homelab Hero",
  tagline: "Stark Industries Assessment of Your",
  subtitle:
    "JARVIS has compiled your homelab specifications. All systems nominal. Arc reactor not required, but recommended.",
  noServer: "All data stored on-site. No S.H.I.E.L.D. involvement. Pepper doesn't need to know.",
  sheetLabel: "Stark Home Infrastructure Report",
  loading: "JARVIS initialising...",
  autoSaved: "Backed up to the Hall of Armours",
  endOfSheet: "Report Filed. JARVIS Out.",
  createBtn: "⚙ Initialise New Report",
  importBtn: "⬆ Import Previous Report",

  dividers: {
    landing: "Stark Home Systems Online",
    editor: "Modify System Parameters",
    statsSection: "Performance Analysis",
    equipmentSection: "Hardware Inventory",
  },

  sections: {
    identity: "System Identity",
    attributes: "Performance Metrics",
    skills: "Active Systems",
    hardware: "Hardware Inventory",
    customFields: "JARVIS Annotations",
  },

  fields: {
    name: "System Designation",
    backstory: "Origin Report",
    namePlaceholders: [
      "Stark Home Lab Mk. VII",
      "The Malibu Stack",
      "Project: Iron Server",
      "JARVIS Subsystem",
      "Home Array Alpha",
    ],
    backstoryPlaceholders: [
      "Designed in a weekend. JARVIS did most of the work. I supervised.",
      "More powerful than anything S.H.I.E.L.D. runs. They know it. Don't tell them.",
      "Started as a smart home. Now it runs everything. JARVIS said this would happen.",
      "Arc reactor not included. Performance is still impressive.",
    ],
  },

  placeholders: {
    hardwareName: [
      "Stark Custom Node",
      "JARVIS Primary",
      "Arc-Cooled Server",
      "Iron NAS Mk. II",
      "Repulsor Compute Array",
    ],
    hardwareDescription: [
      "Running at 97.3% efficiency",
      "JARVIS confirms operational",
      "Arc reactor dependency: minimal",
      "Tested under field conditions",
    ],
    skillName: ["JARVIS AI", "Smart Home Control", "Security System", "Media Vault", "Comms Array"],
    skillDescription: [
      "AI assistant — slightly overqualified for this job",
      "Controls everything in the building",
      "Biometric access, facial recognition, the works",
      "All media, local, always available",
    ],
    customLabel: ["Power Draw", "Location", "Arc Dependency", "Threat Level"],
    customValue: ["~3 kW", "Malibu lab", "None (mostly)", "Manageable"],
  },

  stats: {
    scalability: {
      label: "Expansion Capacity",
      placeholders: [
        "Running at 97.3% efficiency",
        "Additional nodes can be spun up in minutes",
        "JARVIS handles the scaling automatically",
        "Expansion approved by Pepper",
      ],
    },
    reliability: {
      label: "System Uptime",
      placeholders: [
        "Arc reactor dependency: minimal",
        "JARVIS has never gone down. I've tried.",
        "Uptime: as long as the power's on",
        "Redundant systems, redundant redundancies",
      ],
    },
    cost: {
      label: "R&D Budget",
      placeholders: [
        "JARVIS confirms operational",
        "Cost is irrelevant at this performance level",
        "Cheaper than an Iron Man suit, barely",
        "Approved by the finance team (under duress)",
      ],
    },
    cloudIndependence: {
      label: "Self-Sufficiency",
      placeholders: [
        "Cleared by Pepper, probably",
        "No external cloud. JARVIS handles everything.",
        "Stark Industries runs its own infrastructure",
        "We don't outsource. That's not the Stark way.",
      ],
    },
    security: {
      label: "Security Level",
      placeholders: [
        "Biometric access only",
        "JARVIS monitors all entry points",
        "Security protocols updated hourly",
        "Even S.H.I.E.L.D. would have trouble",
      ],
    },
    monitoring: {
      label: "JARVIS Oversight",
      placeholders: [
        "JARVIS sees all. Always.",
        "Real-time monitoring across all systems",
        "Alerts delivered directly by JARVIS",
        "Nothing happens without JARVIS knowing first",
      ],
    },
    backupStrategy: {
      label: "Redundancy Protocol",
      placeholders: [
        "Backed up to the satellite array",
        "JARVIS maintains three independent copies",
        "Disaster recovery tested under live fire",
        "The data survives even if the suit doesn't",
      ],
    },
    deployment: {
      label: "Deployment Protocol",
      placeholders: [
        "JARVIS handles deployment automatically",
        "Tested in the field before production",
        "Rolled out with full diagnostic sweep",
        "One command. JARVIS does the rest.",
      ],
    },
  },
};
