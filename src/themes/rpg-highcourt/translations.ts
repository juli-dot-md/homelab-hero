import type { Translations } from "../types";

export const t: Translations = {
  appName: "Homelab Hero",
  tagline: "Royal Decree of Your",
  subtitle:
    "By royal proclamation, your homelab is hereby inscribed in the court registry. Document your dominion, declare your hardware, and share your sovereignty.",
  noServer: "All records kept within the realm. No foreign servers. No outside jurisdiction.",
  sheetLabel: "Royal Court Registry",
  loading: "The herald prepares the scroll...",
  autoSaved: "Sealed by the court scribe",
  endOfSheet: "So Decrees the Crown",
  createBtn: "♛ Issue New Decree",
  importBtn: "↑ Import Royal Charter",

  dividers: {
    landing: "By Royal Proclamation",
    editor: "Amend the Royal Record",
    statsSection: "Crown Assessments",
    equipmentSection: "Treasury Inventory",
  },

  sections: {
    identity: "Identity",
    attributes: "Royal Assessments",
    skills: "Court Services",
    hardware: "Crown Assets",
    customFields: "Annotations",
  },

  fields: {
    name: "Name",
    backstory: "Royal History",
    namePlaceholders: [
      "The Iron Crown Cluster",
      "Highkeep Infrastructure",
      "The Royal Data Vaults",
      "Palace Network",
      "The Sovereign Stack",
    ],
    backstoryPlaceholders: [
      "A homelab of noble standing, maintained by decree and Docker Compose.",
      "Chartered by the crown following the Great Cloud Migration of last year.",
      "Established to serve the realm. Uptime is not optional — it is law.",
      "What began as a modest NUC grew to challenge the great cloud empires.",
    ],
  },

  placeholders: {
    hardwareName: [
      "Dell R730",
      "HP ProLiant",
      "ThinkStation",
      "NUC Crown Edition",
      "The Royal NAS",
    ],
    hardwareDescription: [
      "Granted by the treasury, fully depreciated",
      "Procured at great expense from the royal coffers",
      "Fitted with the finest second-hand drives",
      "Assigned by royal warrant",
    ],
    skillName: ["Nextcloud", "Vaultwarden", "Gitea", "Jellyfin", "Traefik"],
    skillDescription: [
      "The court's document repository — classified tier",
      "Secrets kept under royal seal",
      "The official code repository of the realm",
      "Entertainment for the court, by royal command",
    ],
    customLabel: ["Power Draw", "Location", "Tier", "Clearance Level"],
    customValue: ["~200W", "Server chamber", "Royal", "Classified"],
  },

  stats: {
    scalability: {
      label: "Expansion",
      placeholders: [
        "By royal proclamation, more nodes shall be added",
        "The realm expands as the budget permits",
        "A second rack awaits the court's approval",
        "Growth is a matter of decree",
      ],
    },
    reliability: {
      label: "Stability",
      placeholders: [
        "The court demands uptime",
        "Failure is treason against the stack",
        "Five nines, by royal mandate",
        "The realm does not tolerate downtime",
      ],
    },
    cost: {
      label: "Royal Expenditure",
      placeholders: [
        "Funded by the treasury",
        "Approved by the Exchequer",
        "Drawn from the royal coffer",
        "Cheaper than a royal decree, barely",
      ],
    },
    cloudIndependence: {
      label: "Sovereignty",
      placeholders: [
        "The crown bows to no cloud provider",
        "Sovereign infrastructure, as it should be",
        "No foreign jurisdiction over our data",
        "Self-hosted by royal edict",
      ],
    },
    security: {
      label: "Royal Guard",
      placeholders: [
        "Guarded by the finest firewall rules",
        "The royal guard checks every packet",
        "Intrusion attempts met with swift banishment",
        "Protected by Tailscale and honour",
      ],
    },
    monitoring: {
      label: "Court Watchmen",
      placeholders: [
        "The watchmen never sleep",
        "Grafana reports to the crown daily",
        "Alerts delivered by royal herald",
        "Nothing escapes the court's notice",
      ],
    },
    backupStrategy: {
      label: "Royal Archives",
      placeholders: [
        "Three copies, as mandated by royal law",
        "Archived in the vault beneath the keep",
        "Preserved for posterity and disaster recovery",
        "The archives are immutable, by decree",
      ],
    },
    deployment: {
      label: "Proclamation",
      placeholders: [
        "Deployed by royal Ansible playbook",
        "Issued by court order and Helm chart",
        "Changes require the king's seal",
        "Rolled out with appropriate ceremony",
      ],
    },
  },
};
