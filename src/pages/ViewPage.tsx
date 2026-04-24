import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExportModal } from "../components/ExportModal";
import { ThemePicker } from "../components/ThemePicker";
import { Tooltip } from "../components/Tooltip";
import { useSheetStore } from "../store";
import { descriptions } from "../themes/descriptions";
import { useTheme } from "../themes/ThemeContext";
import type { StatKey } from "../types";
import { exportMarkdown } from "../utils";

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

function StatBlock({
  label,
  value,
  tooltipDescription,
}: {
  label: string;
  value: string;
  tooltipDescription?: string;
}) {
  if (!value) return null;
  return (
    <div className="scroll-card">
      <div className="relative z-10">
        <div
          className="font-display text-accent uppercase tracking-widest mb-1"
          style={{ fontSize: "0.65rem" }}
        >
          {tooltipDescription ? (
            <Tooltip description={tooltipDescription}>{label}</Tooltip>
          ) : (
            label
          )}
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
      {description && (
        <div className="font-body text-muted text-base italic">{description}</div>
      )}
    </div>
  );
}

export function ViewPage() {
  const navigate = useNavigate();
  const { sheet, loadFromStorage } = useSheetStore();
  const { theme } = useTheme();
  const { t, icons } = theme;
  const [showExport, setShowExport] = useState(false);

  useEffect(() => {
    if (!sheet) loadFromStorage();
  }, [sheet, loadFromStorage]);

  useEffect(() => {
    const stored = localStorage.getItem("homelab-hero-sheet");
    if (!sheet && !stored) navigate("/");
  }, [sheet, navigate]);

  if (!sheet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-display text-accent text-sm">{t.loading}</p>
      </div>
    );
  }

  const filledStats = STAT_KEYS.filter((k) => sheet.stats[k]);
  const hasHardware = sheet.hardware.length > 0;
  const hasServices = sheet.services.length > 0;
  const hasCustomFields = sheet.customFields.length > 0;

  return (
    <>
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 gap-2 flex-wrap">
          <button type="button" className="btn-ghost text-xs" onClick={() => navigate("/edit")}>
            {icons.back} Edit
          </button>
          <div className="flex gap-2 items-center">
            <ThemePicker />
            <button type="button" className="btn-primary" onClick={() => setShowExport(true)}>
              {icons.export} Export
            </button>
          </div>
        </div>

        {/* Sheet Header */}
        <div className="text-center mb-8">
          <p
            className="font-display text-faint uppercase mb-2"
            style={{ letterSpacing: "0.25em", fontSize: "0.75rem" }}
          >
            {t.sheetLabel}
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
            <div className="divider-rune mb-6">{t.dividers.statsSection}</div>
            <div className="section-header">
              <Tooltip description={descriptions.sections.attributes}>
                {t.sections.attributes}
              </Tooltip>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filledStats.map((key) => (
                <StatBlock
                  key={key}
                  label={t.stats[key].label}
                  value={sheet.stats[key]}
                  tooltipDescription={descriptions.stats[key]}
                />
              ))}
            </div>
          </section>
        )}

        {/* Custom Fields */}
        {hasCustomFields && (
          <section className="mb-8">
            <div className="section-header">
              <Tooltip description={descriptions.sections.customFields}>
                {t.sections.customFields}
              </Tooltip>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sheet.customFields.map((field) => (
                <StatBlock key={field.id} label={field.label} value={field.value} />
              ))}
            </div>
          </section>
        )}

        {/* Hardware */}
        {hasHardware && (
          <section className="mb-8">
            <div className="divider-rune mb-6">{t.dividers.equipmentSection}</div>
            <div className="section-header">
              <Tooltip description={descriptions.sections.hardware}>
                {t.sections.hardware}
              </Tooltip>
            </div>
            <div className="flex flex-col gap-3">
              {sheet.hardware.map((h) => (
                <ComponentBlock key={h.id} name={h.name} description={h.description} />
              ))}
            </div>
          </section>
        )}

        {/* Skills / Services */}
        {hasServices && (
          <section className="mb-8">
            <div className="section-header">
              <Tooltip description={descriptions.sections.skills}>
                {t.sections.skills}
              </Tooltip>
            </div>
            <div className="flex flex-col gap-3">
              {sheet.services.map((s) => (
                <ComponentBlock key={s.id} name={s.name} description={s.description} />
              ))}
            </div>
          </section>
        )}

        <div className="divider-rune mt-12 mb-4">{t.endOfSheet}</div>
        <p
          className="font-mono text-center text-faint opacity-40"
          style={{ fontSize: "0.65rem" }}
        >
          {sheet.id} · {new Date(sheet.updatedAt).toLocaleDateString()}
        </p>
      </div>
    </div>

    {showExport && (
      <ExportModal
        markdown={exportMarkdown(sheet, theme)}
        filename={`${sheet.name.replace(/\s+/g, "-").toLowerCase()}.md`}
        onClose={() => setShowExport(false)}
      />
    )}
    </>
  );
}
