import type { Translations } from "../types";

export const t: Translations = {
  appName: "Homelab Hero",
  tagline: "dotfiles for your",
  subtitle:
    "Document your homelab like a well-commented config file. Track your hardware, pin your services, and share your setup with other people who care about their dotfiles.",
  noServer: "All data in localStorage. No telemetry. No cloud. Just you and your config.",
  sheetLabel: "homelab.nix",
  loading: "evaluating config...",
  autoSaved: "config saved to store",
  endOfSheet: "# end of file",
  createBtn: "nix new profile",
  importBtn: "nix import profile",

  dividers: {
    landing: "# homelab configuration",
    editor: "# editing configuration",
    statsSection: "# system metrics",
    equipmentSection: "# hardware = {",
  },

  sections: {
    identity: "identity",
    attributes: "metrics",
    skills: "services",
    hardware: "hardware",
    customFields: "extraConfig",
  },

  fields: {
    name: "hostname",
    backstory: "description",
    namePlaceholders: [
      "nixos-homelab",
      "home-cluster",
      "proxmox-prod",
      "self-hosted-stack",
      "the-lab",
    ],
    backstoryPlaceholders: [
      "# A homelab running NixOS. Everything is configured in dotfiles.",
      "# Started with a Pi, ended up with a rack. The config is beautiful though.",
      "# Managed by home-manager. Reproducible. Declarative. Correct.",
      "# Flakes-based configuration. Each machine defined, no surprises.",
    ],
  },

  placeholders: {
    hardwareName: ["nixos-node-01", "nas-01", "router", "pi-zero", "old-thinkpad"],
    hardwareDescription: [
      "configured in dotfiles",
      "managed by nix (of course)",
      "declarative config, no surprises",
      "reproducible build, tested on rebuild",
    ],
    skillName: ["jellyfin", "nextcloud", "vaultwarden", "home-assistant", "gitea"],
    skillDescription: [
      "# mediaServer.enable = true;",
      "# storage.nextcloud.enable = true;",
      "# secrets.vaultwarden.enable = true;",
      "# automation.homeAssistant.enable = true;",
    ],
    customLabel: ["power", "location", "nixos-version", "last-rebuild"],
    customValue: ["~80W", "under the desk", "24.05", "today"],
  },

  stats: {
    scalability: {
      label: "scalability",
      placeholders: [
        "configured in dotfiles",
        "add a machine, commit the config",
        "horizontally scalable via nix",
        "bounded by the hardware budget",
      ],
    },
    reliability: {
      label: "reliability",
      placeholders: [
        "managed by nix (of course)",
        "uptime since last nixos-rebuild",
        "rollback available if it breaks",
        "it just works (usually)",
      ],
    },
    cost: {
      label: "cost",
      placeholders: [
        "uptime since last nixos-rebuild",
        "electricity + hardware amortised",
        "cheaper than a cloud subscription",
        "the price of freedom",
      ],
    },
    cloudIndependence: {
      label: "cloud independence",
      placeholders: [
        "it just works",
        "no cloud. nix handles it.",
        "fully self-hosted, declaratively",
        "de-googled. de-amazoned. at peace.",
      ],
    },
    security: {
      label: "security",
      placeholders: [
        "secrets.age enabled",
        "tailscale + firewall rules",
        "zero trust, all trust (internal)",
        "ssh keys only, no passwords",
      ],
    },
    monitoring: {
      label: "monitoring",
      placeholders: [
        "grafana.enable = true",
        "prometheus scraping everything",
        "alerts in the discord server",
        "uptime-kuma watching the watchers",
      ],
    },
    backupStrategy: {
      label: "backups",
      placeholders: [
        "restic to three locations",
        "borgbackup nightly",
        "snapshots + offsite",
        "3-2-1, declaratively configured",
      ],
    },
    deployment: {
      label: "deployment",
      placeholders: [
        "nixos-rebuild switch",
        "home-manager switch && done",
        "git commit -m 'update config'",
        "deploy-rs over tailscale",
      ],
    },
  },
};
