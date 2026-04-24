import type { Translations } from "../types";

export const t: Translations = {
  appName: "HOMELAB//HERO",
  tagline: "SYSTEM PROFILE //",
  subtitle:
    "Generate a comprehensive system profile for your homelab infrastructure. Log hardware assets, service inventory, and operational parameters.",
  noServer: "[ LOCAL STORAGE ONLY — NO TELEMETRY — NO REMOTE SYNC — GDPR COMPLIANT ]",
  sheetLabel: "// SYSTEM PROFILE v2.0",
  loading: "LOADING PROFILE...",
  autoSaved: "[ PROFILE AUTO-SYNCED TO LOCAL STORE ]",
  endOfSheet: "// EOF — ALL SYSTEMS NOMINAL",
  createBtn: "▶ Initialize New Profile",
  importBtn: "⬆ Load Existing Profile",

  dividers: {
    landing: "INITIALIZE SYSTEM",
    editor: "// EDITING PROFILE",
    statsSection: "// OPERATIONAL PARAMETERS",
    equipmentSection: "// HARDWARE MANIFEST",
  },

  sections: {
    identity: "// IDENTIFICATION",
    attributes: "Parameters",
    skills: "Services",
    hardware: "Hardware Manifest",
    customFields: "Extended Attributes",
  },

  fields: {
    name: "SYSTEM_NAME",
    backstory: "SYSTEM_OVERVIEW",
    namePlaceholders: [
      "HOMELAB-NODE-01",
      "MIKES-INFRA-CLUSTER",
      "PERSONAL-CLOUD-V2",
      "SELF-HOSTED-01",
      "HOME-DATACENTER",
    ],
    backstoryPlaceholders: [
      "Low-power cluster, rack-mounted. Primary OS: Proxmox VE. Status: OPERATIONAL.",
      "Distributed homelab infrastructure. 99.9% uptime target. Cloud-independent by design.",
      "Personal infrastructure stack. Full-stack self-hosting. Zero vendor lock-in.",
      "High-availability home cluster. Automated deployments. Monitored 24/7.",
    ],
  },

  placeholders: {
    hardwareName: ["Dell PowerEdge R720", "HP ProLiant DL360", "Minisforum UM890", "Raspberry Pi CM4", "Intel NUC 13"],
    hardwareDescription: [
      "2x Xeon E5-2670 v2 | 128GB ECC DDR3 | 10GbE dual-port",
      "i9-9900K | 64GB DDR4 | NVMe storage pool | fanless",
      "Cluster node — 16 cores, 32GB RAM, 2.5GbE",
      "Edge compute node — low power, high efficiency",
    ],
    skillName: ["jellyfin.service", "homeassistant.service", "nextcloud.service", "vaultwarden.service", "grafana.service"],
    skillDescription: [
      "Media streaming — containerized, port 8096, reverse proxied",
      "Home automation platform — MQTT bridge, Zigbee2MQTT integration",
      "Personal cloud storage — S3-compatible backend, 4TB pool",
      "Password management — Argon2 encryption, audit log enabled",
    ],
    customLabel: ["POWER_DRAW_W", "RACK_UNIT", "NETWORK_SPEED", "STORAGE_POOL_TB"],
    customValue: ["142W idle / 280W peak", "2U", "10GbE LAN / 1GbE WAN", "48TB usable (RAIDZ2)"],
  },

  stats: {
    scalability: {
      label: "Scalability",
      placeholders: [
        "Horizontally scalable — 3 nodes ready",
        "Kubernetes-ready architecture",
        "Add nodes with zero downtime",
        "Auto-scaling configured — pending load testing",
        "Cluster capacity: 40% utilised",
      ],
    },
    reliability: {
      label: "Fault Tolerance",
      placeholders: [
        "99.9% uptime — three nines achieved",
        "HA cluster — automatic failover configured",
        "Zero single points of failure",
        "MTBF: 18 months (projected)",
        "Redundant PSU, redundant network, redundant storage",
      ],
    },
    cost: {
      label: "Operational Cost",
      placeholders: [
        "$42/mo electricity — optimised from $67",
        "Hardware amortised over 5 years — $8/mo",
        "Total TCO: lower than equivalent cloud spend",
        "Cost per service: $2.40 average",
        "ROI positive vs. cloud after 14 months",
      ],
    },
    cloudIndependence: {
      label: "Cloud Independence",
      placeholders: [
        "100% self-hosted — zero cloud dependencies",
        "Cloud-free except one legacy API key",
        "De-googled stack — full data sovereignty",
        "Self-hosted: 47 services, cloud: 0",
        "AWS invoice: $0.00 (verified)",
      ],
    },
    security: {
      label: "Security Posture",
      placeholders: [
        "Zero-trust architecture — all traffic authenticated",
        "Tailscale mesh VPN — no open ports",
        "Crowdsec + fail2ban + rate limiting",
        "TLS everywhere — cert-manager automated",
        "Security audit: last quarter — no critical findings",
      ],
    },
    monitoring: {
      label: "Observability",
      placeholders: [
        "Full-stack observability — metrics, logs, traces",
        "Grafana + Prometheus + Loki + Tempo",
        "Alertmanager — PagerDuty integration (home edition)",
        "SLO dashboards — 99.9% target tracked",
        "Uptime Kuma status page — public facing",
      ],
    },
    backupStrategy: {
      label: "Backup Protocol",
      placeholders: [
        "3-2-1-1-0 strategy — immutable offsite verified",
        "Proxmox Backup Server — incremental, deduplicated",
        "Restic to Backblaze B2 — encrypted, tested monthly",
        "Recovery time objective: 4 hours — tested and confirmed",
        "Automated backup verification — 100% restore success rate",
      ],
    },
    deployment: {
      label: "Deployment Stack",
      placeholders: [
        "GitOps — ArgoCD watches the repo",
        "Ansible + Terraform — fully declarative",
        "Helm charts — all config in version control",
        "CI/CD pipeline — GitHub Actions, self-hosted runners",
        "Infrastructure as Code — 100% reproducible",
      ],
    },
  },
};
