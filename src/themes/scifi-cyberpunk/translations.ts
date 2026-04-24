import type { Translations } from "../types";

export const t: Translations = {
  appName: "HOMELAB//HERO",
  tagline: "RIG MANIFEST //",
  subtitle:
    "Log your rig before the corps do. Document your chrome, your exploits, and the self-hosted stack keeping you off the grid.",
  noServer: "[ NO CORP SERVERS — NO DATA SOLD — RUNS LOCAL — STAY GHOST ]",
  sheetLabel: "// RIG MANIFEST",
  loading: "JACKING IN...",
  autoSaved: "[ CACHED TO LOCAL SHARD ]",
  endOfSheet: "// disconnect",
  createBtn: "▶ Jack Into New Rig",
  importBtn: "⬆ Pull Existing Manifest",

  dividers: {
    landing: "JACK IN",
    editor: "// EDITING MANIFEST",
    statsSection: "// STAT BLOCK",
    equipmentSection: "// CHROME & STEEL",
  },

  sections: {
    identity: "// IDENTIFICATION",
    attributes: "Stats",
    skills: "Exploits",
    hardware: "Chrome & Steel",
    customFields: "Black Ops",
  },

  fields: {
    name: "RIG_ALIAS",
    backstory: "DOSSIER",
    namePlaceholders: [
      "NEON-RIG-77",
      "GHOST-NODE-01",
      "CHROME-STACK-X",
      "MIKES-DECK",
      "DARKNET-LAB-3",
    ],
    backstoryPlaceholders: [
      "Salvaged from a burnt-out corpo data centre. Still runs. Still loyal.",
      "Built in a rain-soaked apartment with parts from the Night Market. Off the grid.",
      "The corps don't know it exists. That's the point.",
      "Three fried PSUs later and this rig still jacks in every morning. Respect.",
    ],
  },

  placeholders: {
    hardwareName: ["Salvaged R720", "Black Market NUC", "Hot-rodded ThinkPad", "Watercooled Beast", "Ghost Node Pi"],
    hardwareDescription: [
      "Xeon E5 — stripped, modded, overclocked. The corps threw it out. Mistake.",
      "Fanless. Silent. Watching. 32GB RAM.",
      "i9 with custom firmware — does things it shouldn't",
      "Night Market special — no serial number, no warranty, no regrets",
    ],
    skillName: ["jellyfin.exploit", "ha.daemon", "vault.ghost", "nextcloud.shadow", "pihole.blocker"],
    skillDescription: [
      "Media stream — encrypted, proxied, off-corp",
      "Smart home daemon — corpo brands replaced with local alternatives",
      "Password vault — air-gapped seed phrase, zero cloud",
      "Shadow cloud — your data, not theirs",
    ],
    customLabel: ["POWER_DRAW", "HEAT_SIG", "NOISE_FLOOR", "CORPO_VISIBILITY"],
    customValue: ["180W — runs hot", "Detectable at 2m", "42dB — needs baffling", "ZERO (verified)"],
  },

  stats: {
    scalability: {
      label: "Scalability",
      placeholders: [
        "Scales with the black market supply chain",
        "Add nodes when the Night Market delivers",
        "Horizontal scaling — if you can source the chrome",
        "One more node and we're a proper cluster, choom",
        "Rack space: 0U remaining. We improvise.",
      ],
    },
    reliability: {
      label: "Fault Tolerance",
      placeholders: [
        "Crashes but looks sick doing it",
        "MTBF: unknown — parts are counterfeit",
        "Two 9s. The other nines are aspirational.",
        "It goes down but it always comes back",
        "Reliability: corpo definition or real definition?",
      ],
    },
    cost: {
      label: "Cred Spend",
      placeholders: [
        "Corpo don't see this spend",
        "Night Market pricing — don't ask for a receipt",
        "Cheaper than a Arasaka cloud contract",
        "Electricity bill paid in unmarked cred chips",
        "My fixer handles the financials",
      ],
    },
    cloudIndependence: {
      label: "Off-Grid Rating",
      placeholders: [
        "100% ghost — no corpo cloud touches this",
        "One legacy API call. Being hunted.",
        "De-corped. De-clouded. De-licious.",
        "The corps don't get a byte of my data",
        "Cloud-free since the Great Purge of '24",
      ],
    },
    security: {
      label: "ICE Rating",
      placeholders: [
        "Encrypted. Probably. Don't test it.",
        "Tailscale mesh — no open ports on the net",
        "Honeypot deployed — three corps already stung",
        "Air-gapped where it counts",
        "Zero-trust — not even I trust it",
      ],
    },
    monitoring: {
      label: "Sensor Grid",
      placeholders: [
        "Every packet logged, analysed, judged",
        "Grafana neon dashboard — wall-mounted, always on",
        "Alerts ping my burner — I always answer",
        "Prometheus scrapes every service, every second",
        "Nothing moves in this rig without me knowing",
      ],
    },
    backupStrategy: {
      label: "Dead Man's Switch",
      placeholders: [
        "Encrypted offsite — location: classified",
        "3-2-1 rule — third copy in a faraday cage",
        "Restic to an undisclosed offshore node",
        "If this rig burns, the backup survives",
        "Borgbackup — deduped, encrypted, untraceable",
      ],
    },
    deployment: {
      label: "Jack-In Protocol",
      placeholders: [
        "Jacked in directly, choom — no middlemen",
        "Ansible playbook written in a rain-soaked safehouse",
        "Docker Compose — no Kubernetes, I'm not a corp",
        "DEPLOY_METHOD=direct_neural_link",
        "Shell scripts held together with spite and caffeine",
      ],
    },
  },
};
