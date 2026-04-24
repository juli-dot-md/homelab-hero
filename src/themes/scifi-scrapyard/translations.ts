import type { Translations } from "../types";

export const t: Translations = {
  appName: "Homelab Hero",
  tagline: "Salvage Log of Your",
  subtitle:
    "Document your cobbled-together homelab. Log every dumpster-dived drive, every duct-taped NIC, every miracle that should not be running but is.",
  noServer: "All data stored in local junk. No cloud. No warranties. No guarantees.",
  sheetLabel: "Salvage Operation Log",
  loading: "Rummaging through the bin...",
  autoSaved: "Scratched onto the chassis",
  endOfSheet: "Bottom of the Scrap Pile",
  createBtn: "🔧 Start New Log",
  importBtn: "↑ Import Salvage Record",

  dividers: {
    landing: "One Person's Junk",
    editor: "Update the Log",
    statsSection: "Field Assessments",
    equipmentSection: "The Pile",
  },

  sections: {
    identity: "Identity",
    attributes: "Salvage Ratings",
    skills: "Running Services",
    hardware: "The Pile",
    customFields: "Sharpie Notes",
  },

  fields: {
    name: "Name",
    backstory: "Origin Story",
    namePlaceholders: [
      "The Heap",
      "Scrapyard Infrastructure",
      "Project: Make It Work",
      "The Frankenstein Cluster",
      "What The Neighbours Threw Out",
    ],
    backstoryPlaceholders: [
      "Found the main server in a skip. It now runs the whole household.",
      "Built from parts that had no business working together. They do.",
      "Started with a Raspberry Pi and a dream. Now it has seven machines and a problem.",
      "Every component came from somewhere it wasn't supposed to.",
    ],
  },

  placeholders: {
    hardwareName: [
      "Dumpster OptiPlex",
      "Half-Dead NAS",
      "Franken-Pi",
      "Mystery Workstation",
      "The Breadboard Server",
    ],
    hardwareDescription: [
      "Held together with wire and good intentions",
      "Missing the lid, runs cooler that way",
      "Unknown specs — still works",
      "Borrowed indefinitely from a friend",
    ],
    skillName: ["Pi-hole", "Home Assistant", "Syncthing", "Portainer", "Nginx"],
    skillDescription: [
      "Blocks ads — the one service that cannot go down",
      "Controls things that don't want to be controlled",
      "Files scattered across everything, somehow synced",
      "Makes the chaos feel manageable",
    ],
    customLabel: ["Power Draw", "Location", "Smell", "Structural Integrity"],
    customValue: ["Unknown", "Floor of the office", "Concerning", "Mostly fine"],
  },

  stats: {
    scalability: {
      label: "Expandability",
      placeholders: [
        "Held together with wire",
        "Add another machine from the pile",
        "Scalable if you find the right cable",
        "The skip has more if needed",
      ],
    },
    reliability: {
      label: "Structural Integrity",
      placeholders: [
        "Breaks but always fixable",
        "One loose wire from catastrophe",
        "Has been taped back together twice",
        "Runs until it doesn't",
      ],
    },
    cost: {
      label: "Acquisition Cost",
      placeholders: [
        "Cost: whatever was in the bin",
        "Free, if you don't count the time",
        "Electricity is the real expense",
        "Less than a cloud subscription, somehow",
      ],
    },
    cloudIndependence: {
      label: "Self-Reliance",
      placeholders: [
        "100% self-sourced and self-hosted",
        "No cloud, no terms of service, no safety net",
        "If it breaks, I fix it. Nobody else coming.",
        "Sovereign by necessity",
      ],
    },
    security: {
      label: "Physical Security",
      placeholders: [
        "Nobody would steal this",
        "Security through ugliness",
        "Fail2ban on top of chaos",
        "The mess is the deterrent",
      ],
    },
    monitoring: {
      label: "Observation",
      placeholders: [
        "Check it when it goes quiet",
        "The blinking LEDs tell a story",
        "Uptime Kuma does its best",
        "Alerts go to a Discord I sometimes check",
      ],
    },
    backupStrategy: {
      label: "Recovery Plan",
      placeholders: [
        "The backup drive is in the pile somewhere",
        "Rsync to the second pile",
        "Manual backups when remembered",
        "The original data is backed up in spirit",
      ],
    },
    deployment: {
      label: "Deployment Method",
      placeholders: [
        "SSH and improvise",
        "Drag, drop, pray",
        "Shell script cobbled from Stack Overflow",
        "By hand, with a headlamp",
      ],
    },
  },
};
