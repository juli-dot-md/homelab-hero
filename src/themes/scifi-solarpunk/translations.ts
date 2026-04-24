import type { Translations } from "../types";

export const t: Translations = {
  appName: "Homelab Hero",
  tagline: "Community Ledger of Your",
  subtitle:
    "Document your community-run homelab. Share what you've built, powered by renewable energy and collective care. Technology in service of the people.",
  noServer:
    "All data stored locally, within the collective. No corporate cloud. No extractive platforms.",
  sheetLabel: "Community Infrastructure Ledger",
  loading: "Checking the community network...",
  autoSaved: "Saved to the shared commons",
  endOfSheet: "End of the Commons Record",
  createBtn: "☀ Start New Ledger",
  importBtn: "↑ Import from the Commons",

  dividers: {
    landing: "Built Together, Run Together",
    editor: "Update the Community Record",
    statsSection: "Collective Assessments",
    equipmentSection: "Shared Hardware",
  },

  sections: {
    identity: "Identity",
    attributes: "Collective Metrics",
    skills: "Community Services",
    hardware: "Shared Hardware",
    customFields: "Community Notes",
  },

  fields: {
    name: "Name",
    backstory: "Origin Story",
    namePlaceholders: [
      "The Community Stack",
      "Solar Node Alpha",
      "The Neighbourhood Cloud",
      "Collective Infrastructure",
      "The People's Homelab",
    ],
    backstoryPlaceholders: [
      "Built by three neighbours, powered by solar panels on the roof, maintained by a rota.",
      "Started as one person's Pi. Now the whole block uses it for DNS and file sharing.",
      "Funded by the community garden committee. Runs on sunshine and goodwill.",
      "A co-op homelab. Everyone pitches in. Everyone benefits.",
    ],
  },

  placeholders: {
    hardwareName: [
      "Solar-Powered Pi",
      "Donated ThinkPad",
      "Community NAS",
      "The Shared Node",
      "Repaired Old Server",
    ],
    hardwareDescription: [
      "Runs on sunshine and good intentions",
      "Donated, repaired, and running",
      "Shared with the community — everyone has access",
      "Powered by 80W of rooftop solar",
    ],
    skillName: ["Pi-hole", "Nextcloud", "Syncthing", "Gitea", "Mastodon"],
    skillDescription: [
      "Blocks ads for everyone on the block",
      "Community file storage — open access",
      "Files shared freely across all devices",
      "Code repository — open source, always",
    ],
    customLabel: ["Power Source", "Location", "Access", "Community Members"],
    customValue: ["Solar + grid backup", "Community centre", "Open to all", "12 households"],
  },

  stats: {
    scalability: {
      label: "Growth",
      placeholders: [
        "Runs on sunshine and good intentions",
        "Grows as the community grows",
        "More nodes when more people join",
        "Scales with collective effort",
      ],
    },
    reliability: {
      label: "Resilience",
      placeholders: [
        "Shared with the community",
        "The community maintains it together",
        "Resilient because many hands keep it running",
        "Distributed care means distributed resilience",
      ],
    },
    cost: {
      label: "Collective Cost",
      placeholders: [
        "Powered by the collective",
        "Shared equally among members",
        "Cheaper than any individual subscription",
        "Costs divided, benefits shared",
      ],
    },
    cloudIndependence: {
      label: "Autonomy",
      placeholders: [
        "No corporate dependencies",
        "Community-owned, community-run",
        "Free from platform lock-in",
        "Technology that serves us, not them",
      ],
    },
    security: {
      label: "Community Trust",
      placeholders: [
        "Trusted by the people who use it",
        "Open source, community audited",
        "Security through transparency",
        "Protected by the collective",
      ],
    },
    monitoring: {
      label: "Collective Watch",
      placeholders: [
        "Monitored by the community rota",
        "Everyone has visibility, everyone has voice",
        "Uptime tracked in the community dashboard",
        "Alerts go to the community chat",
      ],
    },
    backupStrategy: {
      label: "Resilience Protocol",
      placeholders: [
        "Backed up across multiple community sites",
        "The collective preserves what matters",
        "Distributed backups, distributed trust",
        "Data belongs to the community",
      ],
    },
    deployment: {
      label: "Collective Care",
      placeholders: [
        "Deployed by the community working group",
        "Ansible run by whoever has time this week",
        "Changes reviewed by the tech committee",
        "Rolled out collaboratively, never unilaterally",
      ],
    },
  },
};
