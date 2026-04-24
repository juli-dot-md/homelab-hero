import type { Translations } from "../types";

export const t: Translations = {
  appName: "Homelab Hero",
  tagline: "Systems Specification of Your",
  subtitle:
    "Document your homelab infrastructure with precision. Specify components, record service parameters, and publish your configuration for peer review.",
  noServer: "All telemetry retained locally. Zero external data dependencies.",
  sheetLabel: "Infrastructure Systems Specification",
  loading: "Initialising data retrieval...",
  autoSaved: "Configuration persisted",
  endOfSheet: "End of Specification",
  createBtn: "▶ Initialise New Spec",
  importBtn: "⬆ Import Configuration",

  dividers: {
    landing: "Systems Online",
    editor: "Modify Configuration",
    statsSection: "Performance Metrics",
    equipmentSection: "Hardware Manifest",
  },

  sections: {
    identity: "System Identity",
    attributes: "Performance Metrics",
    skills: "Active Services",
    hardware: "Hardware Manifest",
    customFields: "Extended Attributes",
  },

  fields: {
    name: "System Name",
    backstory: "System Description",
    namePlaceholders: [
      "Lab Cluster v2",
      "HomeProd Infrastructure",
      "Project Hypervisor",
      "CoreStack Node Array",
      "HomeNet Fabric",
    ],
    backstoryPlaceholders: [
      "High-availability homelab environment targeting three-nines uptime.",
      "Production-grade infrastructure running entirely on commodity hardware.",
      "Designed for maximum observability and minimal operational overhead.",
      "Self-hosted stack with automated provisioning and zero manual configuration.",
    ],
  },

  placeholders: {
    hardwareName: [
      "Dell R730xd",
      "Supermicro 1U",
      "NUC12 Pro",
      "Custom ITX Build",
      "ThinkSystem SR530",
    ],
    hardwareDescription: [
      "Horizontally scalable, rack-mounted",
      "Dual 10GbE, NVMe array",
      "Low-power, high-efficiency compute node",
      "Custom PCIe configuration for throughput",
    ],
    skillName: ["Kubernetes", "Prometheus", "Vault", "Istio", "ArgoCD"],
    skillDescription: [
      "Container orchestration — production-grade",
      "Metrics collection, 15s scrape interval",
      "Secrets management, auto-rotation enabled",
      "Service mesh with mTLS enforced",
    ],
    customLabel: ["Power Envelope", "Rack Unit", "Tier", "SLA Target"],
    customValue: ["450W TDP", "4U", "Production", "99.9%"],
  },

  stats: {
    scalability: {
      label: "Scalability",
      placeholders: [
        "Horizontally scalable",
        "Node pool auto-expansion configured",
        "Scales to available hardware budget",
        "Stateless services ready for replication",
      ],
    },
    reliability: {
      label: "Availability",
      placeholders: [
        "Five nines guaranteed",
        "HA configuration with automatic failover",
        "Zero single points of failure (target)",
        "Uptime tracked, SLA enforced",
      ],
    },
    cost: {
      label: "Operating Cost",
      placeholders: [
        "Fully optimised",
        "Cost-per-workload tracked in Grafana",
        "Under budget, this quarter",
        "Significantly cheaper than equivalent cloud",
      ],
    },
    cloudIndependence: {
      label: "Cloud Independence",
      placeholders: [
        "Zero cloud dependencies",
        "All egress traffic eliminated",
        "On-premise-first architecture",
        "Cloud-agnostic by design",
      ],
    },
    security: {
      label: "Security Posture",
      placeholders: [
        "Zero-trust network architecture",
        "mTLS across all service boundaries",
        "Automated CVE scanning enabled",
        "Secrets rotated on 30-day schedule",
      ],
    },
    monitoring: {
      label: "Observability",
      placeholders: [
        "Full-stack observability stack deployed",
        "Traces, metrics, and logs correlated",
        "Alerts route to PagerDuty and Discord",
        "SLO dashboards live and current",
      ],
    },
    backupStrategy: {
      label: "Data Resilience",
      placeholders: [
        "3-2-1 backup strategy enforced",
        "RPO: 1 hour, RTO: 15 minutes",
        "Incremental snapshots every 6 hours",
        "Offsite replication active",
      ],
    },
    deployment: {
      label: "Deployment Pipeline",
      placeholders: [
        "GitOps with ArgoCD sync",
        "Ansible + Helm chart deployment",
        "CI pipeline gates all changes",
        "Blue-green deployment with automatic rollback",
      ],
    },
  },
};
