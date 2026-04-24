import type { Translations } from "../types";

export const t: Translations = {
  appName: "Homelab Hero",
  tagline: "Vampire's Codex of Your",
  subtitle:
    "Inscribe your homelab into the tome of eternal records. Catalogue your thralls, document your dark services, and share your dominion with other creatures of the night.",
  noServer:
    "All records sealed within the crypt. No cloud familiars. No holy-water firewalls from outside.",
  sheetLabel: "Tome of the Undying Stack",
  loading: "Consulting the blood records...",
  autoSaved: "Written in crimson ink",
  endOfSheet: "The Tome Seals Itself",
  createBtn: "🩸 Inscribe New Tome",
  importBtn: "↑ Import Dark Scroll",

  dividers: {
    landing: "Rise and Document",
    editor: "Amend the Eternal Record",
    statsSection: "Dark Attunements",
    equipmentSection: "Crypt Inventory",
  },

  sections: {
    identity: "Identity",
    attributes: "Dark Powers",
    skills: "Thrall Services",
    hardware: "Crypt Hardware",
    customFields: "Cursed Annotations",
  },

  fields: {
    name: "Name",
    backstory: "Origin",
    namePlaceholders: [
      "The Undying Server",
      "Crypt Infrastructure",
      "The Eternal Rack",
      "Blackkeep Cluster",
      "The Nocturnal Node",
    ],
    backstoryPlaceholders: [
      "A homelab that refuses to die, surviving every power cut and failed update.",
      "Born centuries ago as a single machine. It has outlasted every vendor.",
      "They said it couldn't run 24/7. It has not stopped since the Blood Moon of 2019.",
      "What started as a NAS became something older and far more dangerous.",
    ],
  },

  placeholders: {
    hardwareName: [
      "Old Server Resurrected",
      "The Eternal NAS",
      "Coffin-Cooled Node",
      "Ancient Workstation",
      "The Thrall Pi",
    ],
    hardwareDescription: [
      "Died twice, runs fine now",
      "Has outlived three owners",
      "Cold to the touch — perfect",
      "Runs only at night, by choice",
    ],
    skillName: ["Jellyfin", "Vaultwarden", "Gotify", "WireGuard", "Immich"],
    skillDescription: [
      "Streams forbidden content to the household",
      "Keeper of secrets and undying passwords",
      "Alerts delivered at midnight, as tradition demands",
      "The dark tunnel through which all traffic flows",
    ],
    customLabel: ["Power Draw", "Location", "Age", "Mortality Rate"],
    customValue: ["~150W", "The basement crypt", "Immortal", "Zero (so far)"],
  },

  stats: {
    scalability: {
      label: "Thrall Capacity",
      placeholders: [
        "Eternal (mostly)",
        "More nodes can be turned at will",
        "The crypt expands to accommodate the undead",
        "Limited only by the coffin budget",
      ],
    },
    reliability: {
      label: "Undying Nature",
      placeholders: [
        "The dead don't reboot",
        "Has survived every disaster thrown at it",
        "Cannot die — has tried",
        "Five nines since the last blood moon",
      ],
    },
    cost: {
      label: "Blood Tithe",
      placeholders: [
        "Paid in crimson coin",
        "Electricity costs are the true horror",
        "Cheaper than a coffin",
        "The cloud demanded a sacrifice — we refused",
      ],
    },
    cloudIndependence: {
      label: "Dark Sovereignty",
      placeholders: [
        "We serve no cloud overlord",
        "The night belongs to us alone",
        "Fully self-hosted, as befits the undead",
        "No foreign blood in our veins",
      ],
    },
    security: {
      label: "Dark Ward",
      placeholders: [
        "Protected by ancient firewall runes",
        "Intruders are turned away — permanently",
        "Fail2ban and a thousand-year curse",
        "None may enter uninvited",
      ],
    },
    monitoring: {
      label: "The Eternal Watch",
      placeholders: [
        "The eyes in the dark never close",
        "Grafana glows red in the crypt",
        "Alerts sent at the witching hour",
        "Nothing stirs without the watcher knowing",
      ],
    },
    backupStrategy: {
      label: "Resurrection Protocol",
      placeholders: [
        "Three crypts, three copies",
        "The data cannot truly die",
        "Restored from the beyond if needed",
        "Backed up beneath the stone floor",
      ],
    },
    deployment: {
      label: "Dark Ritual",
      placeholders: [
        "Summoned with Ansible and dark intent",
        "The ritual must be performed exactly",
        "Deployed by moonlight, tested by dawn",
        "One wrong incantation and it all falls",
      ],
    },
  },
};
