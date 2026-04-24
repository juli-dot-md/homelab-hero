import type { StatKey } from "../types";

export type ThemeId = "rpg" | "scifi";

export type StatTranslation = {
  label: string;
  placeholders: [string, ...string[]]; // at least one
};

/** Strict translation contract — every key required, all themes must satisfy this fully. */
export type Translations = {
  appName: string;
  tagline: string;
  subtitle: string;
  noServer: string;
  sheetLabel: string;
  loading: string;
  autoSaved: string;
  endOfSheet: string;
  createBtn: string;
  importBtn: string;

  dividers: {
    landing: string;
    editor: string;
    statsSection: string;
    equipmentSection: string;
  };

  sections: {
    identity: string;
    attributes: string;
    skills: string;
    hardware: string;
    customFields: string;
  };

  fields: {
    name: string;
    backstory: string;
    namePlaceholder: string;
    backstoryPlaceholder: string;
  };

  placeholders: {
    hardwareName: string;
    hardwareDescription: string;
    skillName: string;
    skillDescription: string;
    customLabel: string;
    customValue: string;
  };

  /** One entry per StatKey — label + randomisable placeholders */
  stats: Record<StatKey, StatTranslation>;
};

export type Theme = {
  id: ThemeId;
  label: string;
  className: string;
  fonts: {
    googleFonts: string;
  };
  icons: {
    create: string;
    remove: string;
    export: string;
    import: string;
    back: string;
    preview: string;
  };
  t: Translations;
};

// ---------------------------------------------------------------------------
// RPG / FANTASY THEME
// ---------------------------------------------------------------------------
const rpg: Theme = {
  id: "rpg",
  label: "Fantasy",
  className: "theme-rpg",
  fonts: {
    googleFonts:
      "family=Cinzel:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500",
  },
  icons: {
    create: "⚔",
    remove: "✕",
    export: "↓",
    import: "↑",
    back: "←",
    preview: "◎",
  },
  t: {
    appName: "Homelab Hero",
    tagline: "Character Sheet for Your",
    subtitle:
      "Document your homelab like an RPG character sheet. Share your setup, track your hardware, and export your legend.",
    noServer: "All data stored locally in your browser. No accounts. No servers.",
    sheetLabel: "Homelab Character Sheet",
    loading: "Loading scroll...",
    autoSaved: "Auto-saved to browser storage",
    endOfSheet: "End of Scroll",
    createBtn: "Create New Sheet",
    importBtn: "Import Existing Sheet",

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
      namePlaceholder: "Mike's Homelab",
      backstoryPlaceholder:
        "A small homelab in Mike's cellar, held together by proxmox and hope.",
    },

    placeholders: {
      hardwareName: "e.g. Dell R720",
      hardwareDescription: "e.g. 2x Xeon E5-2670, 128GB RAM, dual 10GbE",
      skillName: "e.g. Jellyfin",
      skillDescription: "e.g. Media server running in an LXC container",
      customLabel: "e.g. Power Draw",
      customValue: "e.g. ~150W",
    },

    stats: {
      scalability: {
        label: "Scalability",
        placeholders: [
          "Runs on vibes and a spare NUC",
          "Could add another node, probably",
          "Vertical only, the rack is full",
          "One more Pi and we're done",
        ],
      },
      reliability: {
        label: "Reliability",
        placeholders: [
          "Glued together, my baby",
          "It's fine until it isn't",
          "Two 9s on a good day",
          "The uptime graph lies",
        ],
      },
      cost: {
        label: "Treasure Hoard",
        placeholders: [
          "$40/mo and a lot of regret",
          "Free (electricity not included)",
          "Cheaper than therapy",
          "My partner doesn't know",
        ],
      },
      cloudIndependence: {
        label: "Self-Sufficiency",
        placeholders: [
          "100% self-hosted, as god intended",
          "Mostly. There's one S3 bucket, don't ask",
          "Working on it",
          "De-googled except for YouTube",
        ],
      },
      security: {
        label: "Ward Strength",
        placeholders: [
          "Tailscale and a prayer",
          "Exposed to LAN only (probably)",
          "Security through obscurity",
          "The firewall rules are fine",
        ],
      },
      monitoring: {
        label: "Watchfulness",
        placeholders: [
          "Grafana dashboard nobody checks",
          "SSH and hope",
          "Alerts go to a Slack I never open",
          "The logs are in there somewhere",
        ],
      },
      backupStrategy: {
        label: "Resilience",
        placeholders: [
          "3-2-1 in theory",
          "The data is in my heart",
          "Rsync cron job, fingers crossed",
          "What could go wrong",
        ],
      },
      deployment: {
        label: "Deployment",
        placeholders: [
          "Ansible when I remember to run it",
          "By hand, with love",
          "Helm charts I copy-pasted",
          "ssh && sudo && pray",
        ],
      },
    },
  },
};

// ---------------------------------------------------------------------------
// SCI-FI THEME
// ---------------------------------------------------------------------------
const scifi: Theme = {
  id: "scifi",
  label: "Sci-Fi",
  className: "theme-scifi",
  fonts: {
    googleFonts:
      "family=Share+Tech+Mono&family=Exo+2:ital,wght@0,300;0,400;0,600;1,400&family=JetBrains+Mono:wght@400;500",
  },
  icons: {
    create: "▶",
    remove: "✕",
    export: "⬇",
    import: "⬆",
    back: "◀",
    preview: "◉",
  },
  t: {
    appName: "HOMELAB//HERO",
    tagline: "SYSTEM PROFILE //",
    subtitle:
      "Generate a system profile for your homelab infrastructure. Log hardware, services, and operational parameters.",
    noServer: "[ LOCAL STORAGE ONLY — NO TELEMETRY — NO REMOTE SYNC ]",
    sheetLabel: "// SYSTEM PROFILE",
    loading: "FETCHING DATA...",
    autoSaved: "[ STATE PERSISTED TO LOCAL STORAGE ]",
    endOfSheet: "// END OF FILE",
    createBtn: "Initialize New Profile",
    importBtn: "Load Existing Profile",

    dividers: {
      landing: "INITIALIZE",
      editor: "EDITING PROFILE",
      statsSection: "// PARAMETERS",
      equipmentSection: "// HARDWARE MANIFEST",
    },

    sections: {
      identity: "// IDENTIFICATION",
      attributes: "Parameters",
      skills: "Running Processes",
      hardware: "Hardware Manifest",
      customFields: "Extended Attributes",
    },

    fields: {
      name: "SYSTEM_NAME",
      backstory: "SYSTEM_SYNOPSIS",
      namePlaceholder: "MIKES-HOMELAB-01",
      backstoryPlaceholder:
        "Low-power cluster, rack-mounted. Primary OS: Proxmox VE. Status: OPERATIONAL.",
    },

    placeholders: {
      hardwareName: "e.g. Dell R720",
      hardwareDescription: "e.g. 2x Xeon E5-2670 | 128GB ECC RAM | 10GbE",
      skillName: "e.g. jellyfin.service",
      skillDescription: "e.g. Media streaming daemon — LXC container, port 8096",
      customLabel: "PARAM_LABEL",
      customValue: "PARAM_VALUE",
    },

    stats: {
      scalability: {
        label: "Scalability",
        placeholders: [
          "Horizontal scaling: theoretical",
          "Add nodes until it breaks",
          "Rack space: 1U remaining",
          "Kubernetes next quarter (maybe)",
        ],
      },
      reliability: {
        label: "Fault Tolerance",
        placeholders: [
          "GLUED_TOGETHER=true",
          "SLA: best effort",
          "MTBF: unknown, MTTR: unknown",
          "Redundancy: eventual",
        ],
      },
      cost: {
        label: "Operational Cost",
        placeholders: [
          "$40/mo + electricity (undisclosed)",
          "ROI: immeasurable (emotionally)",
          "Budget: classified",
          "Cost center: personal savings",
        ],
      },
      cloudIndependence: {
        label: "Cloud Independence",
        placeholders: [
          "CLOUD_FREE=true # mostly",
          "One S3 bucket. Don't audit this.",
          "Self-hosted: 94.7% of stack",
          "De-googled except DNS (working on it)",
        ],
      },
      security: {
        label: "Security Posture",
        placeholders: [
          "FIREWALL=on # probably",
          "Tailscale + iptables + vibes",
          "Attack surface: LAN only (allegedly)",
          "CVEs: unpatched but noted",
        ],
      },
      monitoring: {
        label: "Observability",
        placeholders: [
          "Grafana: deployed, dashboard: untouched",
          "Monitoring: stdout to /dev/null",
          "Alert fatigue level: critical",
          "Logs exist. Location: TBD.",
        ],
      },
      backupStrategy: {
        label: "Backup Protocol",
        placeholders: [
          "3-2-1 strategy: aspirational",
          "BACKUP_ENABLED=sometimes",
          "Rsync cron @ 3am (usually runs)",
          "Recovery tested: never",
        ],
      },
      deployment: {
        label: "Deployment Stack",
        placeholders: [
          "Ansible: installed, playbooks: WIP",
          "DEPLOY_METHOD=ssh_and_pray",
          "Helm charts: copy-pasted from Reddit",
          "CI/CD pipeline: on the roadmap",
        ],
      },
    },
  },
};

export const themes: Record<ThemeId, Theme> = { rpg, scifi };
export const themeIds = Object.keys(themes) as ThemeId[];
export const defaultTheme: ThemeId = "rpg";
