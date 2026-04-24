import type { Translations } from "../types";

export const t: Translations = {
  appName: "Homelab Hero",
  tagline: "Aperture Science Assessment of Your",
  subtitle:
    "This system exists to document your homelab. Participation is mandatory. Your configuration data will be used to improve future testing. Thank you.",
  noServer: "All data retained locally. This is not a courtesy. It is a containment measure.",
  sheetLabel: "Aperture Science Homelab Assessment Form",
  loading: "Analysing your inadequate infrastructure...",
  autoSaved: "Data retained for future testing",
  endOfSheet: "Assessment Complete. Results Were Disappointing.",
  createBtn: "▶ Begin Test Sequence",
  importBtn: "⬆ Import Previous Failure",

  dividers: {
    landing: "Aperture Science: We Do What We Must",
    editor: "Amend Your Inadequate Configuration",
    statsSection: "Performance Metrics (Preliminary Failure Analysis)",
    equipmentSection: "Test Subject Hardware",
  },

  sections: {
    identity: "Subject Identification",
    attributes: "Performance Metrics",
    skills: "Active Test Chambers",
    hardware: "Test Equipment",
    customFields: "Supplementary Observations",
  },

  fields: {
    name: "Subject Designation",
    backstory: "Subject History",
    namePlaceholders: [
      "Test Chamber Omega",
      "Facility Subsystem 7",
      "The Homelab (Disappointing)",
      "Aperture Home Division",
      "Portal to Self-Hosting",
    ],
    backstoryPlaceholders: [
      "Subject acquired homelab equipment in flagrant disregard for budget constraints. Science has been achieved, barely.",
      "This homelab has survived more reboots than any facility test subject. We are studying this phenomenon.",
      "The subject claims their homelab is 'stable'. Preliminary testing contradicts this assertion entirely.",
      "Constructed without following proper Aperture Science protocols. Still operational. We are baffled.",
    ],
  },

  placeholders: {
    hardwareName: [
      "Test Chamber Unit",
      "Aperture NAS Mk. II",
      "Repurposed Portal Gun Server",
      "GLaDOS Auxiliary Node",
      "Weighted Storage Companion",
    ],
    hardwareDescription: [
      "Within acceptable parameters (barely)",
      "Performance below expected thresholds",
      "This unit has passed minimum requirements",
      "Continued operation is a scientific curiosity",
    ],
    skillName: [
      "Enrichment Centre",
      "PotatOS Monitor",
      "Companion Backup",
      "Turret Firewall",
      "Science Database",
    ],
    skillDescription: [
      "The test environment — mandatory participation",
      "Low-power monitoring with questionable sentience",
      "Backup service. It won't leave. We've tried.",
      "Defends the perimeter. Success rate: acceptable",
    ],
    customLabel: ["Power Draw", "Location", "Morale Level", "Test Completion"],
    customValue: ["Unknown (measuring)", "Enrichment Centre", "Irrelevant", "0%"],
  },

  stats: {
    scalability: {
      label: "Expansion Capacity",
      placeholders: [
        "Within acceptable parameters",
        "Scaling is possible. It won't help.",
        "Additional nodes have been requisitioned. They are lost.",
        "The facility can accommodate more failures",
      ],
    },
    reliability: {
      label: "Operational Status",
      placeholders: [
        "This unit has not been decommissioned",
        "Currently operational. This is surprising.",
        "Uptime is acceptable for a test subject",
        "The subject's infrastructure remains running. Investigating.",
      ],
    },
    cost: {
      label: "Science Budget",
      placeholders: [
        "The data is very disappointing",
        "Budget exceeded. Science required it.",
        "Costs were projected. Projections were wrong.",
        "Funded by the Aperture Science enrichment fund (depleted)",
      ],
    },
    cloudIndependence: {
      label: "Containment Status",
      placeholders: [
        "No external dependencies. Good.",
        "All data contained within the facility",
        "The cloud has no jurisdiction here",
        "Fully self-contained, as safety protocols demand",
      ],
    },
    security: {
      label: "Neurotoxin Readiness",
      placeholders: [
        "Security measures are in place",
        "Turrets deployed at all entry points",
        "Intruders will be redirected to test chambers",
        "Security is adequate. Barely.",
      ],
    },
    monitoring: {
      label: "Observation Protocol",
      placeholders: [
        "Science has been achieved",
        "Monitoring is constant. You are being watched.",
        "All metrics collected for future disappointment",
        "Grafana is running. Results remain unsatisfying.",
      ],
    },
    backupStrategy: {
      label: "Data Preservation",
      placeholders: [
        "Backups exist. Probably.",
        "The data is backed up in a location you cannot access",
        "Recovery procedures have not been tested. This is fine.",
        "Three copies stored in three chambers. Two are on fire.",
      ],
    },
    deployment: {
      label: "Test Protocol",
      placeholders: [
        "Deployment completed. Results inconclusive.",
        "The test sequence has been initiated",
        "Ansible ran. Something happened. Moving on.",
        "Cleared by Pepper, probably",
      ],
    },
  },
};
