import type { Translations } from "../types";

export const t: Translations = {
  appName: "Homelab Hero",
  tagline: "Character Sheet for Your",
  subtitle:
    "Document your homelab like an RPG character sheet. Share your setup, track your hardware, and export your legend.",
  noServer: "All data stored locally in your browser. No accounts. No servers.",
  sheetLabel: "Homelab Character Sheet",
  loading: "Loading scroll...",
  autoSaved: "Auto-saved to browser storage",
  endOfSheet: "End of Scroll",
  createBtn: "⚔ Forge New Sheet",
  importBtn: "↑ Import Existing Sheet",

  dividers: {
    landing: "Forge Your Legend",
    editor: "Edit Your Legend",
    statsSection: "Attributes & Abilities",
    equipmentSection: "Equipment",
  },

  sections: {
    identity: "Identity",
    attributes: "Attributes",
    skills: "Skills",
    hardware: "Hardware",
    customFields: "Custom Fields",
  },

  fields: {
    name: "Name",
    backstory: "Backstory",
    namePlaceholders: [
      "Mike's Homelab",
      "The Iron Keep",
      "Proxmox & Friends",
      "The Dungeon Server",
      "Fort Selfhosted",
    ],
    backstoryPlaceholders: [
      "A small homelab in Mike's cellar, held together by proxmox and hope.",
      "Born in a Black Friday deal, forged in the fires of failed Docker upgrades.",
      "What started as one NUC is now a full rack. No regrets.",
      "A mighty fortress of self-hosted services, besieged daily by dependency updates.",
    ],
  },

  placeholders: {
    hardwareName: ["Dell R720", "Raspberry Pi 4", "HP EliteDesk", "Minisforum UM690", "Old Gaming PC"],
    hardwareDescription: [
      "2x Xeon E5-2670, 128GB RAM, dual 10GbE",
      "4GB RAM, running Pi-hole and dreams",
      "i7-8700, 32GB RAM, tiny but mighty",
      "The one that started it all",
    ],
    skillName: ["Jellyfin", "Home Assistant", "Nextcloud", "Vaultwarden", "Immich"],
    skillDescription: [
      "Media server — LXC container, port 8096",
      "Home automation hub, controls the smart lights nobody uses",
      "Personal cloud storage — Google Drive, but mine",
      "Password manager — because LastPass had one too many incidents",
    ],
    customLabel: ["Power Draw", "Location", "Noise Level", "Uptime SLA"],
    customValue: ["~150W", "Basement rack", "Whisper quiet (lies)", "Best effort"],
  },

  stats: {
    scalability: {
      label: "Scalability",
      placeholders: [
        "Runs on vibes and a spare NUC",
        "Could add another node, probably",
        "Vertical only, the rack is full",
        "One more Pi and we're done",
        "The prophecy speaks of a second switch",
      ],
    },
    reliability: {
      label: "Reliability",
      placeholders: [
        "Glued together, my baby",
        "It's fine until it isn't",
        "Two 9s on a good day",
        "The uptime graph lies",
        "Held together by duct tape and willpower",
      ],
    },
    cost: {
      label: "Treasure Hoard",
      placeholders: [
        "$40/mo and a lot of regret",
        "Free (electricity not included)",
        "Cheaper than therapy",
        "My partner doesn't know",
        "Funded by selling old GPUs at peak",
      ],
    },
    cloudIndependence: {
      label: "Self-Sufficiency",
      placeholders: [
        "100% self-hosted, as god intended",
        "Mostly. There's one S3 bucket, don't ask",
        "Working on it",
        "De-googled except for YouTube",
        "Free from the cloud overlords (mostly)",
      ],
    },
    security: {
      label: "Ward Strength",
      placeholders: [
        "Tailscale and a prayer",
        "Exposed to LAN only (probably)",
        "Security through obscurity",
        "The firewall rules are definitely fine",
        "Protected by a very stern .htaccess",
      ],
    },
    monitoring: {
      label: "Watchfulness",
      placeholders: [
        "Grafana dashboard nobody checks",
        "SSH and hope",
        "Alerts go to a Slack I never open",
        "The logs are in there somewhere",
        "Uptime Kuma watches so I don't have to",
      ],
    },
    backupStrategy: {
      label: "Resilience",
      placeholders: [
        "3-2-1 in theory",
        "The data is in my heart",
        "Rsync cron job, fingers crossed",
        "What could go wrong",
        "Backed up to a drive in the same rack (it counts)",
      ],
    },
    deployment: {
      label: "Deployment",
      placeholders: [
        "Ansible when I remember to run it",
        "By hand, with love",
        "Helm charts I copy-pasted",
        "ssh && sudo && pray",
        "The ancient art of clicking through the UI",
      ],
    },
  },
};
