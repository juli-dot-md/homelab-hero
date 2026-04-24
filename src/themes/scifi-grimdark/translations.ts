import type { Translations } from "../types";

export const t: Translations = {
  appName: "HOMELAB//HERO",
  tagline: "FIELD REPORT //",
  subtitle:
    "In the grim darkness of the far server room, there is only uptime. Document your war machines, combat doctrines, and battlefield data.",
  noServer: "[ NO EXTERNAL COMMUNION — DATA ENTOMBED ON-SITE — FOR THE EMPEROR ]",
  sheetLabel: "// INQUISITOR'S FIELD REPORT",
  loading: "COGITATOR AWAKENING...",
  autoSaved: "[ INSCRIBED TO LOCAL COGITATOR ]",
  endOfSheet: "THOUGHT FOR THE DAY: HERESY GROWS FROM IDLENESS",
  createBtn: "⚙ Commission New Report",
  importBtn: "⬆ Retrieve Existing Report",

  dividers: {
    landing: "FOR THE EMPEROR",
    editor: "// FIELD REPORT ACTIVE",
    statsSection: "// BATTLEFIELD DATA",
    equipmentSection: "// WAR MACHINES",
  },

  sections: {
    identity: "// IDENTIFICATION",
    attributes: "Battlefield Data",
    skills: "Combat Doctrines",
    hardware: "War Machines",
    customFields: "Classified",
  },

  fields: {
    name: "DESIGNATION",
    backstory: "INQUISITOR'S REPORT",
    namePlaceholders: [
      "FORGE-WORLD-THETA-7",
      "IRON-BASTION-MK-IV",
      "MIKES-SANCTUM-IMPERIALIS",
      "COGITATOR-PRIME",
      "RELIQUARY-NODE-9",
    ],
    backstoryPlaceholders: [
      "Constructed by servitor labor over three solar months. Operational. Mostly heresy-free.",
      "A fortress of iron and silicon, standing against the tide of cloud dependency. For the Emperor.",
      "What the Omnissiah hath joined together, let no kernel panic put asunder.",
      "Four failed hard drives. Two power outages. One cooling incident. Still operational. The Emperor protects.",
    ],
  },

  placeholders: {
    hardwareName: ["Dell Dreadnought R720", "Iron Throne R730", "Sanctified NUC", "Servitor-Grade Pi", "Cogitator Prime"],
    hardwareDescription: [
      "Twin Xeon battle-cores — 128GB war memory — blessed by the Omnissiah",
      "Repurposed from the heretic AWS. Cleansed. Re-consecrated. Operational.",
      "Low-power shrine-node — silent, faithful, ever-vigilant",
      "Inducted into service via the holy rite of cable management",
    ],
    skillName: ["Jellyfin.Militant", "Automation.Servitor", "Vault.Sanctified", "Nextcloud.Reliquary", "Grafana.Augury"],
    skillDescription: [
      "Media distribution engine — spreading approved entertainment",
      "Household automation servitor — obedient, tireless, uncomplaining",
      "Sacred password vault — sealed against the ruinous powers",
      "Personal data reliquary — no heretical cloud may touch it",
    ],
    customLabel: ["POWER_TITHE_W", "HEAT_SIGNATURE", "NOISE_LEVEL_DB", "HERESY_RATING"],
    customValue: ["~220W for the Omnissiah", "Warm — acceptable losses", "47dB — bolter-adjacent", "Minimal (monitored)"],
  },

  stats: {
    scalability: {
      label: "Force Multiplication",
      placeholders: [
        "The legion grows — rack space permitting",
        "Each node added strengthens the Imperium of Data",
        "Horizontal scaling — if the supply convoy arrives",
        "For the Emperor, we shall add more nodes",
        "The rack cannot hold more war machines",
      ],
    },
    reliability: {
      label: "Combat Readiness",
      placeholders: [
        "Held together by bolts and the Emperor's will",
        "Battle-hardened — survived three kernel panics",
        "OPERATIONAL. Mostly. Praise the Omnissiah.",
        "Four nines when the warp doesn't interfere",
        "It has seen war. It endures.",
      ],
    },
    cost: {
      label: "Tithe to the Omnissiah",
      placeholders: [
        "Paid in blood and overtime",
        "Tithed from the household budget — none shall know",
        "Cheaper than Arasaka cloud — heresy avoided",
        "The Administratum does not audit personal projects",
        "eBay surplus — the Emperor provides",
      ],
    },
    cloudIndependence: {
      label: "Freedom from Cloud Heresy",
      placeholders: [
        "No cloud heresy touches this sacred machine",
        "One AWS bucket remains — the Inquisition is aware",
        "Purged of cloud dependencies — the Emperor is pleased",
        "Self-hosted or excommunicated. We chose wisely.",
        "The great cloud purge: complete. Data sovereignty: achieved.",
      ],
    },
    security: {
      label: "Void Shields",
      placeholders: [
        "External threats: obliterated on contact",
        "Tailscale void shield — no open ports in realspace",
        "Fail2ban: the tireless servo-skull of denial",
        "Honeypot deployed — three threats already excommunicated",
        "Protected by faith and iptables",
      ],
    },
    monitoring: {
      label: "Augur Array",
      placeholders: [
        "The augur array sees all — Grafana omniscient",
        "Prometheus: the ever-watchful servo-skull",
        "Alerts dispatched via secure vox-channel",
        "All telemetry blessed by the Omnissiah",
        "Uptime Kuma: the oracle of the machine spirit",
      ],
    },
    backupStrategy: {
      label: "Contingency Protocols",
      placeholders: [
        "3-2-1 — as decreed by the Codex Administratum",
        "Proxmox Backup Server: the iron tome of recovery",
        "Offsite cogitator holds the sacred copies",
        "Recovery tested in war — passed",
        "If the machine spirit perishes, the backup endures",
      ],
    },
    deployment: {
      label: "Rite of Commissioning",
      placeholders: [
        "Deployed by servitors following the sacred Ansible liturgy",
        "The commissioning rite requires three restarts and a prayer",
        "Helm charts — inscribed in the language of the Omnissiah",
        "GitOps — the machine spirit reads from the sacred repository",
        "ssh root@ — the ancient communion with the machine",
      ],
    },
  },
};
