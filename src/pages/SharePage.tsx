import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "../components/Tooltip";
import { themes } from "../themes";
import { useTheme } from "../themes/ThemeContext";
import { descriptions } from "../themes/descriptions";
import type { HomelabSheet, StatKey } from "../types";
import { STAT_KEY_TO_HEADING, getProxiedUrl, importMarkdown, parseShareUrl } from "../utils";

const STAT_KEYS: StatKey[] = [
  "scalability",
  "reliability",
  "cost",
  "cloudIndependence",
  "security",
  "monitoring",
  "backupStrategy",
  "deployment",
];

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; sheet: HomelabSheet };

function StatBlock({ label, value, statKey }: { label: string; value: string; statKey: StatKey }) {
  if (!value) return null;
  return (
    <div className="scroll-card">
      <div className="relative z-10">
        <div
          className="font-display text-accent uppercase tracking-widest mb-1"
          style={{ fontSize: "0.65rem" }}
        >
          <Tooltip description={descriptions.stats[statKey]}>{label}</Tooltip>
        </div>
        <div className="font-body text-[color:var(--color-text-base)] text-lg">{value}</div>
      </div>
    </div>
  );
}

function ComponentBlock({ name, description }: { name: string; description: string }) {
  return (
    <div className="border-l-2 pl-4 py-1" style={{ borderColor: "var(--color-border)" }}>
      <div
        className="font-display text-[color:var(--color-text-base)] font-semibold"
        style={{ fontSize: "0.85rem" }}
      >
        {name}
      </div>
      {description && <div className="font-body text-muted text-base italic">{description}</div>}
    </div>
  );
}

export function SharePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { t } = theme;
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const src = parseShareUrl(location.search);

    if (!src) {
      setState({
        status: "error",
        message: "No source URL provided. This share link appears to be invalid.",
      });
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(getProxiedUrl(src as string));
        if (!res.ok) {
          if (!cancelled)
            setState({
              status: "error",
              message: `Could not load the file (HTTP ${res.status}). Make sure the URL is correct and publicly accessible.`,
            });
          return;
        }
        const text = await res.text();
        const result = importMarkdown(text);
        if (!result.success) {
          if (!cancelled)
            setState({
              status: "error",
              message: "The file loaded but could not be parsed as a Homelab Hero sheet.",
            });
          return;
        }
        if (!cancelled) {
          if (result.themeId && result.themeId in themes) {
            setTheme(result.themeId);
          }
          setState({ status: "ready", sheet: result.data });
        }
      } catch {
        if (!cancelled)
          setState({
            status: "error",
            message:
              "Could not fetch the file. Check that the URL is correct and the file is publicly accessible.",
          });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [location.search]);

  if (state.status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-display text-accent text-sm">{t.loading}</p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="scroll-card max-w-lg w-full" role="alert">
          <div className="relative z-10">
            <p className="font-display text-accent text-sm uppercase tracking-wider mb-3">
              Could not load sheet
            </p>
            <p className="font-body text-muted text-base">{state.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const { sheet } = state;
  const filledStats = STAT_KEYS.filter((k) => sheet.stats[k]);
  const hasHardware = sheet.hardware.length > 0;
  const hasServices = sheet.services.length > 0;
  const hasCustomFields = sheet.customFields.length > 0;
  const flavour = sheet.themedHeaders !== false;

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Toolbar */}
        <div className="flex items-center mb-8">
          <button type="button" className="btn-ghost text-xs" onClick={() => navigate("/")}>
            ← Homelab Hero
          </button>
        </div>

        {/* Sheet Header */}
        <div className="text-center mb-8">
          <p
            className="font-display text-faint uppercase mb-2"
            style={{ letterSpacing: "0.25em", fontSize: "0.75rem" }}
          >
            {flavour ? t.sheetLabel : "Homelab Profile"}
          </p>
          <h1
            className="font-display text-accent font-bold mb-4"
            style={{ fontSize: "clamp(2rem, 6vw, 3rem)" }}
          >
            {sheet.name}
          </h1>
          {sheet.description && (
            <p className="font-body text-[color:var(--color-text-base)] text-xl italic max-w-xl mx-auto opacity-90">
              "{sheet.description}"
            </p>
          )}
        </div>

        {/* Attributes / Stats */}
        {filledStats.length > 0 && (
          <section className="mb-8">
            <div className="divider-rune mb-6">
              {flavour ? t.dividers.statsSection : "Attributes"}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filledStats.map((key) => (
                <StatBlock
                  key={key}
                  label={flavour ? t.stats[key].label : STAT_KEY_TO_HEADING[key]}
                  value={sheet.stats[key]}
                  statKey={key}
                />
              ))}
            </div>
          </section>
        )}

        {/* Custom Fields */}
        {hasCustomFields && (
          <section className="mb-8">
            <div className="divider-rune mb-6">
              {flavour ? t.sections.customFields : "Custom Fields"}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sheet.customFields.map((field) => (
                <div key={field.id} className="scroll-card">
                  <div className="relative z-10">
                    <div
                      className="font-display text-accent uppercase tracking-widest mb-1"
                      style={{ fontSize: "0.65rem" }}
                    >
                      {field.label}
                    </div>
                    <div className="font-body text-[color:var(--color-text-base)] text-lg">
                      {field.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Hardware */}
        {hasHardware && (
          <section className="mb-8">
            <div className="divider-rune mb-6">
              {flavour ? t.dividers.equipmentSection : "Hardware"}
            </div>
            <div className="flex flex-col gap-3">
              {sheet.hardware.map((h) => (
                <ComponentBlock key={h.id} name={h.name} description={h.description} />
              ))}
            </div>
          </section>
        )}

        {/* Services */}
        {hasServices && (
          <section className="mb-8">
            <div className="divider-rune mb-6">{flavour ? t.sections.skills : "Services"}</div>
            <div className="flex flex-col gap-3">
              {sheet.services.map((s) => (
                <ComponentBlock key={s.id} name={s.name} description={s.description} />
              ))}
            </div>
          </section>
        )}

        {flavour && <div className="divider-rune mt-12 mb-4">{t.endOfSheet}</div>}
        <p className="font-mono text-center text-faint opacity-40" style={{ fontSize: "0.65rem" }}>
          {sheet.id}
        </p>
      </div>
    </div>
  );
}
