# Homelab Hero

Document your homelab like an RPG character sheet.

Give it a name, a backstory, and fill in attributes like reliability, cost, security, and deployment. Add your hardware and services. Export it as Markdown. Share it with a link.

---

## Themes

Six themes across two categories:

**Fantasy** — Epic, Necromancer, Cosy  
**Sci-Fi** — Utopia, Cyberpunk, Grimdark

The theme changes the look, the labels, and the placeholder text. Your data stays the same.

---

## Sharing

Sheets are stored as plain `.md` files with YAML frontmatter. To share:

1. Export your sheet from the editor (Markdown button)
2. Host the `.md` file publicly — **GitHub Gist** is the easiest (no repo, just paste and click Raw)
3. On the Preview page, click **Share**, paste the raw URL, copy the generated link

The share link fetches and renders the sheet client-side. No backend involved.

> Raw URLs must allow CORS. `raw.githubusercontent.com` and GitHub Gist raw URLs work out of the box. Pastebin does not.

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
