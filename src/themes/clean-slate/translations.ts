import type { Translations } from "../types";

export const t: Translations = {
  appName: "Homelab Hero",
  tagline: "Infrastructure Profile —",
  subtitle:
    "Document your homelab. Record hardware, services, and configuration. Export as Markdown. Share with a link.",
  noServer: "All data stored locally in your browser. No accounts required.",
  sheetLabel: "Homelab Profile",
  loading: "Loading...",
  autoSaved: "Saved",
  endOfSheet: "End of Profile",
  createBtn: "New Profile",
  importBtn: "Import Profile",

  dividers: {
    landing: "Get Started",
    editor: "Edit Profile",
    statsSection: "Metrics",
    equipmentSection: "Equipment",
  },

  sections: {
    identity: "Identity",
    attributes: "Metrics",
    skills: "Services",
    hardware: "Hardware",
    customFields: "Custom",
  },

  fields: {
    name: "Name",
    backstory: "Description",
    namePlaceholders: [
      "Home Lab",
      "Server Room",
      "Self-Hosted Stack",
      "Home Infrastructure",
      "Personal Cloud",
    ],
    backstoryPlaceholders: [
      "A personal homelab running self-hosted services.",
      "Home server infrastructure for media, storage, and automation.",
      "Self-hosted replacement for cloud services.",
      "Low-power home server cluster.",
    ],
  },

  placeholders: {
    hardwareName: ["Server", "NAS", "Router", "Switch", "Raspberry Pi"],
    hardwareDescription: [
      "Primary compute node",
      "Network-attached storage",
      "Network gateway",
      "8-port managed switch",
    ],
    skillName: ["Jellyfin", "Nextcloud", "Pi-hole", "Home Assistant", "Vaultwarden"],
    skillDescription: [
      "Media streaming",
      "File sync and storage",
      "DNS-level ad blocking",
      "Home automation",
    ],
    customLabel: ["Power", "Location", "Cost", "Uptime"],
    customValue: ["Low", "$40/mo", "Basement", "High"],
  },

  stats: {
    scalability: {
      label: "Scalability",
      placeholders: ["High", "Medium", "Low", "Planned"],
    },
    reliability: {
      label: "Reliability",
      placeholders: ["99.9%", "99.5%", "High", "Best effort"],
    },
    cost: {
      label: "Cost",
      placeholders: ["$40/mo", "$20/mo", "$60/mo", "Electricity only"],
    },
    cloudIndependence: {
      label: "Cloud Independence",
      placeholders: ["Full", "Partial", "High", "In progress"],
    },
    security: {
      label: "Security",
      placeholders: ["High", "Medium", "VPN only", "In progress"],
    },
    monitoring: {
      label: "Monitoring",
      placeholders: ["Full", "Basic", "Grafana + alerts", "Manual"],
    },
    backupStrategy: {
      label: "Backups",
      placeholders: ["3-2-1", "Daily snapshots", "Weekly offsite", "In progress"],
    },
    deployment: {
      label: "Deployment",
      placeholders: ["Ansible", "Docker Compose", "Manual", "GitOps"],
    },
  },
};
