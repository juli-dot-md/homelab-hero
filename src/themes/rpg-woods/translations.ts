import type { Translations } from "../types";

export const t: Translations = {
  appName: "Homelab Hero",
  tagline: "Grove Codex of Your",
  subtitle:
    "Inscribe your homelab into the druid's codex. Track your hardware, document your services, and share your grove with fellow wanderers.",
  noServer: "All knowledge preserved locally. No cloud spirits. No watchers.",
  sheetLabel: "Grove Codex",
  loading: "Consulting the roots...",
  autoSaved: "Pressed into the bark",
  endOfSheet: "Edge of the Grove",
  createBtn: "🌿 Grow New Codex",
  importBtn: "↑ Import Grove Scroll",

  dividers: {
    landing: "Root & Branch",
    editor: "Tend Your Grove",
    statsSection: "Natural Attunements",
    equipmentSection: "Gathered Provisions",
  },

  sections: {
    identity: "Identity",
    attributes: "Attunements",
    skills: "Rituals",
    hardware: "Roots",
    customFields: "Field Notes",
  },

  fields: {
    name: "Name",
    backstory: "Origin",
    namePlaceholders: [
      "The Rootserver",
      "Thornwood Keep",
      "The Old Growth Cluster",
      "Fernhollow Node",
      "The Mushroom Network",
    ],
    backstoryPlaceholders: [
      "A homelab that grew organically from a single Pi, now sprawling like ancient roots.",
      "Started as a seedling project. Now it sustains the whole household.",
      "Hidden beneath the stairs, tended by moonlight and cron jobs.",
      "What began as Pi-hole became something far older and stranger.",
    ],
  },

  placeholders: {
    hardwareName: ["Raspberry Pi 4", "Old ThinkPad", "NUC i5", "Repurposed NAS", "Pine64 Board"],
    hardwareDescription: [
      "4GB RAM, grows on its own",
      "Runs cool under the canopy",
      "Quietly rooted in the corner",
      "Feeds the whole grove",
    ],
    skillName: ["Pi-hole", "Gitea", "Home Assistant", "Syncthing", "WireGuard"],
    skillDescription: [
      "Filters the noise from the signal",
      "Code grows here, far from corporate eyes",
      "Speaks to the smart things of the forest",
      "Files drift like spores, landing everywhere",
    ],
    customLabel: ["Power Draw", "Location", "Season Uptime", "Ambient Noise"],
    customValue: ["~30W", "Under the stairs", "Year-round", "Wind in the cables"],
  },

  stats: {
    scalability: {
      label: "Growth",
      placeholders: [
        "Grows on its own",
        "Add another node like planting a seed",
        "The roots spread when the moon is right",
        "Bounded only by the shelf space",
      ],
    },
    reliability: {
      label: "Endurance",
      placeholders: [
        "As sturdy as an oak",
        "Weathers storms and power cuts alike",
        "Old growth — been here longer than the router",
        "Resilient as lichen on stone",
      ],
    },
    cost: {
      label: "Tithe",
      placeholders: [
        "Funded by mushroom sales",
        "Bartered from the village market",
        "Power costs paid in foraged goods",
        "Cheaper than the cloud spirits demand",
      ],
    },
    cloudIndependence: {
      label: "Sovereignty",
      placeholders: [
        "No cloud spirits allowed",
        "Free from the corporate canopy",
        "Rooted in local soil only",
        "The grove provides its own",
      ],
    },
    security: {
      label: "Ward",
      placeholders: [
        "Warded by hedge-magic and fail2ban",
        "The brambles keep intruders out",
        "Firewall thick as forest fog",
        "Only the initiated find it",
      ],
    },
    monitoring: {
      label: "Attunement",
      placeholders: [
        "The trees whisper when things go wrong",
        "Grafana painted in forest green",
        "Alerts arrive on the morning wind",
        "Observed by owl and uptime kuma alike",
      ],
    },
    backupStrategy: {
      label: "Dormancy",
      placeholders: [
        "Seeds stored in three locations",
        "The grove remembers what the machines forget",
        "Rsync under the new moon",
        "Buried backups in the cold store",
      ],
    },
    deployment: {
      label: "Cultivation",
      placeholders: [
        "Planted by hand, with intention",
        "Ansible tends the rows",
        "Grown from seed config each time",
        "Composted and replanted on failure",
      ],
    },
  },
};
