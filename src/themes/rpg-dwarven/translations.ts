import type { Translations } from "../types";

export const t: Translations = {
  appName: "Homelab Hero",
  tagline: "Forge Ledger of Your",
  subtitle:
    "Record your homelab in the guild ledger. Every machine smithed, every service forged, every byte mined — documented for the ages.",
  noServer: "All records carved in local stone. No cloud merchants. No surface-world interference.",
  sheetLabel: "Guild Forge Ledger",
  loading: "Consulting the mine records...",
  autoSaved: "Stamped with the guild seal",
  endOfSheet: "The Ledger Closes",
  createBtn: "⚒ Begin New Ledger",
  importBtn: "↑ Import Guild Record",

  dividers: {
    landing: "By Hammer and Stone",
    editor: "Amend the Ledger",
    statsSection: "Forge Assessments",
    equipmentSection: "Guild Inventory",
  },

  sections: {
    identity: "Identity",
    attributes: "Forge Ratings",
    skills: "Guild Services",
    hardware: "Smithed Hardware",
    customFields: "Carved Notes",
  },

  fields: {
    name: "Name",
    backstory: "Founding Record",
    namePlaceholders: [
      "The Ironholt Cluster",
      "Deep Mine Infrastructure",
      "The Stone Server",
      "Khazad-Stack",
      "Forgemaster's Network",
    ],
    backstoryPlaceholders: [
      "Hammered together in a weekend. Has not been turned off since.",
      "Built from reclaimed hardware and stubborn pride. The guild approves.",
      "Every component was chosen, tested, and approved by the forge committee.",
      "Deep in the mountain, where the servers hum and the logs scroll eternal.",
    ],
  },

  placeholders: {
    hardwareName: [
      "Forged Server Mk. IV",
      "Stone NAS",
      "The Anvil Cluster",
      "Deep Node",
      "Guild Workstation",
    ],
    hardwareDescription: [
      "Built to last a century",
      "Hammered from surplus iron and willpower",
      "Runs hot, runs proud",
      "Approved by the forge masters",
    ],
    skillName: ["Nextcloud", "Gitea", "Vaultwarden", "Jellyfin", "Grafana"],
    skillDescription: [
      "The guild document vault — secure as stone",
      "Code repository, carved into the mountain",
      "The great password vault of the deep",
      "Entertainment for the miners, by guild decree",
    ],
    customLabel: ["Power Draw", "Location", "Guild Tier", "Heat Output"],
    customValue: ["~250W", "Deeprock chamber", "Master", "Considerable"],
  },

  stats: {
    scalability: {
      label: "Expansion",
      placeholders: [
        "Built to last a century",
        "Dig deeper, add more nodes",
        "The mountain has room for more iron",
        "Expand the forge when the gold permits",
      ],
    },
    reliability: {
      label: "Durability",
      placeholders: [
        "Forged in fire, tested in battle",
        "Has survived three power cuts and a flood",
        "Dwarven-grade reliability — not a marketing term",
        "Built to outlast the builders",
      ],
    },
    cost: {
      label: "Guild Treasury",
      placeholders: [
        "Funded by the guild",
        "Cost in gold, worth it in stone",
        "Approved by the treasurer under protest",
        "Cheaper than importing from the surface",
      ],
    },
    cloudIndependence: {
      label: "Self-Sufficiency",
      placeholders: [
        "We mine our own data",
        "No surface merchant touches our bits",
        "The mountain provides everything",
        "Self-hosted since the First Age",
      ],
    },
    security: {
      label: "Fortification",
      placeholders: [
        "Sealed behind three iron doors",
        "Firewall thick as mountain rock",
        "Only guild members may enter",
        "The ancient runes hold yet",
      ],
    },
    monitoring: {
      label: "Watchpost",
      placeholders: [
        "A dwarf watches each machine personally",
        "Grafana chiselled into the wall",
        "Alerts sound like pickaxes on stone",
        "The watchpost never sleeps",
      ],
    },
    backupStrategy: {
      label: "Vault Protocol",
      placeholders: [
        "Three vaults, three mountains",
        "The original and two copies, as tradition demands",
        "Backed up to the deep vault",
        "Carved in stone and replicated in iron",
      ],
    },
    deployment: {
      label: "Smithing",
      placeholders: [
        "Hammered out by the forge master",
        "Ansible runs like a well-oiled mine cart",
        "Every deployment reviewed by the guild",
        "Rolled out with ceremony and a strong drink",
      ],
    },
  },
};
