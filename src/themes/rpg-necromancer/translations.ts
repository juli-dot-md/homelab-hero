import type { Translations } from "../types";

export const t: Translations = {
  appName: "Homelab Hero",
  tagline: "Grimoire of the",
  subtitle:
    "Inscribe your dark domain into the eternal grimoire. Document your relics, dark arts, and the unholy uptime you've wrested from death itself.",
  noServer: "No soul sold to the cloud. Data entombed locally. Forever.",
  sheetLabel: "The Eternal Grimoire",
  loading: "Consulting the spirits...",
  autoSaved: "Sealed into the grimoire",
  endOfSheet: "The Ritual is Complete",
  createBtn: "☽ Begin the Ritual",
  importBtn: "↑ Resurrect Existing Grimoire",

  dividers: {
    landing: "Enter the Darkness",
    editor: "Inscribe Your Domain",
    statsSection: "Dark Powers",
    equipmentSection: "Relics & Artefacts",
  },

  sections: {
    identity: "Dark Origins",
    attributes: "Dark Powers",
    skills: "Dark Arts",
    hardware: "Relics & Artefacts",
    customFields: "Cursed Scrolls",
  },

  fields: {
    name: "Name of the Domain",
    backstory: "Dark Origins",
    namePlaceholders: [
      "The Undying Rack",
      "Crypt of Proxmox",
      "The Eternal Server",
      "Lich King's Homelab",
      "Domain of the Undead Nodes",
    ],
    backstoryPlaceholders: [
      "What mortals call a 'homelab', I call a phylactery for my data.",
      "Three failed hard drives, two power outages, and still it persists. Some call it cursed. I call it reliable.",
      "Born from the ashes of a dead gaming PC, risen anew through the dark magic of Proxmox.",
      "The server that would not die. Believe me, I tried to decommission it.",
    ],
  },

  placeholders: {
    hardwareName: ["The Ancient Blade Server", "Relic of Dell", "Forbidden NUC", "The Cursed Pi", "Artefact R720"],
    hardwareDescription: [
      "Summoned from eBay for $40. Still runs. Still haunted.",
      "128GB of dark memory. Hosts things better left unnamed.",
      "Acquired through dubious means at a surplus sale",
      "It outlived three owners. You are merely its current host.",
    ],
    skillName: ["jellyfin.daemon", "shade.assistant", "vault.unholy", "nextcloud.eternal", "pihole.ward"],
    skillDescription: [
      "Media daemon — feeds the lich's entertainment hunger",
      "Automation of the household spirits",
      "Password vault — secrets kept from mortal eyes",
      "Personal cloud — no Google soul required",
    ],
    customLabel: ["Blood Cost (Watts)", "Crypt Location", "Curse Severity", "Resurrection Count"],
    customValue: ["~200W of life force", "The basement crypt", "Moderate — manageable", "Lost count"],
  },

  stats: {
    scalability: {
      label: "Army Size",
      placeholders: [
        "The undead horde grows",
        "Every node I add rises stronger",
        "Death scales infinitely (in theory)",
        "One more relic and the ritual completes",
        "The rack cannot hold more dead iron",
      ],
    },
    reliability: {
      label: "Undying Nature",
      placeholders: [
        "The dead never reboot (they do)",
        "It has died and been resurrected more times than I count",
        "Liches don't have SLAs",
        "Uptime: eternal (with caveats)",
        "What is dead may never die (except during power outages)",
      ],
    },
    cost: {
      label: "Soul Tithe",
      placeholders: [
        "Souls are cheaper than S3",
        "Funded by dark bargains and eBay",
        "The electricity bill is the true horror",
        "My accountant cannot see this",
        "Cheaper than a cloud contract, more cursed",
      ],
    },
    cloudIndependence: {
      label: "Freedom from the Cloud Lords",
      placeholders: [
        "No cloud overlord holds dominion here",
        "One S3 bucket remains. It will be dealt with.",
        "The great purge of SaaS continues",
        "Self-hosted or death. Mostly death.",
        "AWS invoice: $0.00. Beautiful.",
      ],
    },
    security: {
      label: "Wards & Hexes",
      placeholders: [
        "None shall pass (Fail2ban agrees)",
        "Protected by ancient firewall runes",
        "The dark arts of Tailscale",
        "Crowdsec watches the perimeter",
        "VPN or death. No exceptions.",
      ],
    },
    monitoring: {
      label: "All-Seeing Eye",
      placeholders: [
        "The eye of Grafana watches all",
        "Dead men tell no logs (but mine do)",
        "Alerts whisper of failures in the night",
        "Prometheus scrapes the bones of every service",
        "Uptime Kuma: the oracle of uptime",
      ],
    },
    backupStrategy: {
      label: "Resurrection Protocol",
      placeholders: [
        "3-2-1 like the three laws of undeath",
        "Proxmox Backup Server: the necromancer's tome",
        "If it dies, it was meant to die",
        "Rsync to an offsite crypt nightly",
        "Backed up to a drive I hope still works",
      ],
    },
    deployment: {
      label: "Ritual of Summoning",
      placeholders: [
        "Summoned from an Ansible grimoire",
        "Each container raised by dark incantation (docker-compose)",
        "Helm charts written in the old tongue",
        "The deployment ritual requires three restarts",
        "ssh root@ and hope for the best",
      ],
    },
  },
};
