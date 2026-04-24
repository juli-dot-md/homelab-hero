# Homelab Hero

Document your homelab like an RPG character sheet.

Give it a name, a backstory, and fill in attributes like reliability, cost, security, and deployment. Add your hardware and services. Export it as Markdown. Share it with a link.

---

## Themes

23 themes across four categories:

**Fantasy** — Epic, Necromancer, Cosy, Woods, High Court, Blood Moon, Dwarven Forge  
**Sci-Fi** — Utopia, Cyberpunk, Grimdark, Scrapyard, High Tech, GLaDOS, Solarpunk, Iron Man  
**Retro** — Phosphor, Amber  
**Clean** — Minimal, Slate, Latte, Frappé, Macchiato, Mocha

The theme changes the look, the labels, and the placeholder text. Your data stays the same.

---

## Sharing

Sheets are stored as plain `.md` files with YAML frontmatter. To share:

1. Export your sheet from the editor (Markdown button)
2. Host the `.md` file publicly — **GitHub Gist** is the easiest (no repo, just paste and click Raw)
3. On the Preview page, click **Share**, paste the raw URL, copy the generated link

The share link fetches the file via a CORS proxy and renders it client-side. Any public URL works — GitHub Gist, raw GitHub, Pastebin, paste.ee, etc.

> **Proxy notice:** remote files are fetched through [corsproxy.io](https://corsproxy.io) by default. The requested URL is sent to their service. You can self-host or swap the proxy by setting `VITE_CORS_PROXY_URL` in your repo variables.

---

100% vibe coded.

---

## Stack

- React + Vite + TypeScript
- Tailwind CSS v4
- Zustand (localStorage persistence)
- Zod (schema validation)
- Vitest + Testing Library (263 tests)
- Biome (lint + format)

Everything runs in the browser. No backend, no accounts, no telemetry.

---

## Dev

```bash
pnpm install
pnpm dev       # http://localhost:5173
pnpm test
pnpm build
```

---

## Deploy to GitHub Pages

Deploys automatically when you push a `v*` tag.

**One-time setup:**

1. `Settings → Pages → Source → GitHub Actions`
2. `Settings → Variables → Actions` — add:

| Variable | Example |
|---|---|
| `VITE_BASE_PATH` | `/homelab-hero` |
| `VITE_BASE_URL` | `https://yourname.github.io/homelab-hero` |

**Release:**

```bash
git tag v1.0.0
git push origin v1.0.0
```

Tests run first. If they fail, nothing deploys.

---

## Adding a theme

Create `src/themes/your-theme/`:

```
your-theme/
  theme.css         # CSS custom properties
  translations.ts   # t: Translations (TypeScript errors if incomplete)
  index.ts          # assembles the Theme object (~15 lines)
```

Add it to `src/themes/index.ts` and `categories`. No other files change.
