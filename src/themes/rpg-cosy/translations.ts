import type { Translations } from "../types";

export const t: Translations = {
  appName: "Homelab Hero",
  tagline: "A Cosy Little Corner for Your",
  subtitle:
    "Document your homelab like a warm, hand-written character sheet. Share your setup with friends and export your story.",
  noServer: "Everything stays in your browser. No accounts, no fuss, just you and your servers.",
  sheetLabel: "My Homelab Setup",
  loading: "Brewing something up...",
  autoSaved: "Saved snugly to your browser",
  endOfSheet: "That's everything! 🍵",
  createBtn: "✿ Start a New Sheet",
  importBtn: "↑ Load a Saved Sheet",

  dividers: {
    landing: "Welcome, friend ✿",
    editor: "Tell Me About Your Setup",
    statsSection: "How's It Going?",
    equipmentSection: "My Gear",
  },

  sections: {
    identity: "About My Setup",
    attributes: "Vibes",
    skills: "Enchantments",
    hardware: "Contraptions",
    customFields: "Notes",
  },

  fields: {
    name: "What do you call it?",
    backstory: "Tell me the story",
    namePlaceholders: [
      "Mike's Little Homelab",
      "The Cosy Server Corner",
      "My Humble Setup",
      "The Living Room Rack",
      "Project Tinkering",
    ],
    backstoryPlaceholders: [
      "A little homelab that grew a bit too big, but we love it anyway.",
      "Started with a Pi, now there's a whole rack. It happens to the best of us.",
      "Nothing fancy, just a few machines doing their best.",
      "My cosy corner of the internet, hosted in my own home. Exactly how it should be.",
    ],
  },

  placeholders: {
    hardwareName: ["Raspberry Pi 4", "Old Laptop", "Secondhand NUC", "ThinkCentre", "The Big Server"],
    hardwareDescription: [
      "Humming quietly in the corner, doing its best",
      "Retired from laptop duty, now runs Pi-hole happily",
      "Small, quiet, and very good at its job",
      "Picked it up secondhand — runs everything perfectly",
    ],
    skillName: ["Jellyfin", "Home Assistant", "Nextcloud", "Vaultwarden", "Recipe Manager"],
    skillDescription: [
      "Movie nights sorted — running quietly in a little container",
      "Makes the lights turn on when I walk in the room ✨",
      "My own little cloud — photos, files, all mine",
      "Keeps all the passwords safe and sound",
    ],
    customLabel: ["Power Draw", "Noise Level", "Location", "Favourite Feature"],
    customValue: ["Barely anything!", "Whisper quiet", "Under the stairs", "It just works"],
  },

  stats: {
    scalability: {
      label: "Room to Grow",
      placeholders: [
        "There's always room for one more Pi",
        "The shelf could fit another little server",
        "Happy as it is, honestly",
        "Could grow, but let's not rush",
        "One more device and I'll need a bigger shelf",
      ],
    },
    reliability: {
      label: "How Well It Behaves",
      placeholders: [
        "Humming along nicely ☕",
        "Mostly reliable — occasional adventures",
        "It's been up for months, touch wood",
        "Good days and bad days, mostly good",
        "Very dependable, like a good kettle",
      ],
    },
    cost: {
      label: "What It Costs Me",
      placeholders: [
        "Less than a yarn haul, honestly",
        "A few pounds a month in electricity",
        "Secondhand gear keeps it affordable",
        "Worth every penny for the joy it brings",
        "My partner thinks it costs less than it does",
      ],
    },
    cloudIndependence: {
      label: "On My Own Terms",
      placeholders: [
        "Mostly mine — one Google account lingers",
        "Slowly moving everything home ✿",
        "Very self-sufficient, quite proud of it",
        "Still working on replacing the last few cloud things",
        "Self-hosted and loving it",
      ],
    },
    security: {
      label: "Keeping It Safe",
      placeholders: [
        "Tailscale keeps the bad folks out",
        "Snug behind the home network",
        "VPN only — nice and private",
        "Good enough for home use",
        "The router's doing a fine job",
      ],
    },
    monitoring: {
      label: "Keeping an Eye On Things",
      placeholders: [
        "Uptime Kuma pops up if something's wrong",
        "I check in on it now and then",
        "A little Grafana dashboard, mostly decorative",
        "The notifications go to my phone — I do check them!",
        "Keeps itself running without much fuss",
      ],
    },
    backupStrategy: {
      label: "Just In Case",
      placeholders: [
        "Backed up like grandma's recipes",
        "Syncs to an external drive every night",
        "3 copies because I care about my data",
        "Borgbackup running quietly in the background",
        "Restic to a little NAS in the cupboard",
      ],
    },
    deployment: {
      label: "How I Set Things Up",
      placeholders: [
        "Docker Compose and a cup of tea",
        "Clicked around until it worked, mostly",
        "A little Ansible playbook I'm quite proud of",
        "Portainer makes it very straightforward",
        "Step by step, following a lovely blog post",
      ],
    },
  },
};
