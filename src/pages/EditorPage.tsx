import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ComponentList } from "../components/ComponentList";
import { CustomFieldList } from "../components/CustomFieldList";
import { ThemePicker } from "../components/ThemePicker";
import { Tooltip } from "../components/Tooltip";
import { useSheetStore } from "../store";
import { descriptions } from "../themes/descriptions";
import { useTheme } from "../themes/ThemeContext";
import type { StatKey } from "../types";
import { downloadJson, getRandomPlaceholder } from "../utils";

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

export function EditorPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { t, icons } = theme;
  const {
    sheet,
    isDirty,
    loadFromStorage,
    updateField,
    updateStat,
    addHardware,
    updateHardware,
    removeHardware,
    addService,
    updateService,
    removeService,
    addCustomField,
    updateCustomField,
    removeCustomField,
  } = useSheetStore();

  useEffect(() => {
    if (!sheet) loadFromStorage();
  }, [sheet, loadFromStorage]);

  useEffect(() => {
    const stored = localStorage.getItem("homelab-hero-sheet");
    if (!sheet && !stored) navigate("/");
  }, [sheet, navigate]);

  // All random placeholders picked once per theme change
  const ph = useMemo(() => ({
    name: getRandomPlaceholder(t.fields.namePlaceholders),
    backstory: getRandomPlaceholder(t.fields.backstoryPlaceholders),
    hardwareName: getRandomPlaceholder(t.placeholders.hardwareName),
    hardwareDescription: getRandomPlaceholder(t.placeholders.hardwareDescription),
    skillName: getRandomPlaceholder(t.placeholders.skillName),
    skillDescription: getRandomPlaceholder(t.placeholders.skillDescription),
    customLabel: getRandomPlaceholder(t.placeholders.customLabel),
    customValue: getRandomPlaceholder(t.placeholders.customValue),
    stats: Object.fromEntries(
      STAT_KEYS.map((key) => [key, getRandomPlaceholder(t.stats[key].placeholders)])
    ) as Record<StatKey, string>,
  // Re-randomise when theme changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [theme.id]);

  if (!sheet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-display text-accent text-sm">{t.loading}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 gap-2 flex-wrap">
          <button type="button" className="btn-ghost text-xs" onClick={() => navigate("/")}>
            {icons.back} Home
          </button>
          <div className="flex gap-2 items-center flex-wrap">
            <ThemePicker />
            <button type="button" className="btn-ghost" onClick={() => navigate("/view")}>
              {icons.preview} Preview
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={() => downloadJson(sheet)}
            >
              {icons.export} Export JSON
            </button>
          </div>
        </div>

        {isDirty && (
          <div
            className="font-mono text-faint text-center mb-4 italic"
            style={{ fontSize: "0.7rem" }}
          >
            {t.autoSaved}
          </div>
        )}

        <div className="font-display text-center text-accent text-xs uppercase tracking-widest mb-2 opacity-70">
          {t.sheetLabel}
        </div>
        <div className="divider-rune mb-8">{t.dividers.editor}</div>

        <div className="flex flex-col gap-8">
          {/* Identity */}
          <section>
            <div className="section-header">
              <Tooltip description={descriptions.sections.identity}>
                {t.sections.identity}
              </Tooltip>
            </div>
            <div className="flex flex-col gap-3">
              <div>
                <label
                  className="font-display block text-accent uppercase tracking-wider mb-1"
                  style={{ fontSize: "0.7rem" }}
                >
                  <Tooltip description={descriptions.fields.name}>
                    {t.fields.name}
                  </Tooltip>
                </label>
                <input
                  type="text"
                  className="rpg-input text-xl"
                  placeholder={ph.name}
                  value={sheet.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
              </div>
              <div>
                <label
                  className="font-display block text-accent uppercase tracking-wider mb-1"
                  style={{ fontSize: "0.7rem" }}
                >
                  <Tooltip description={descriptions.fields.backstory}>
                    {t.fields.backstory}
                  </Tooltip>
                </label>
                <textarea
                  className="rpg-input rpg-textarea"
                  placeholder={ph.backstory}
                  value={sheet.description}
                  onChange={(e) => updateField("description", e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Attributes / Stats */}
          <section>
            <div className="section-header">
              <Tooltip description={descriptions.sections.attributes}>
                {t.sections.attributes}
              </Tooltip>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STAT_KEYS.map((key) => (
                <div key={key}>
                  <label
                    className="font-display block text-accent uppercase tracking-wider mb-1"
                    style={{ fontSize: "0.65rem" }}
                  >
                    <Tooltip description={descriptions.stats[key]}>
                      {t.stats[key].label}
                    </Tooltip>
                  </label>
                  <input
                    type="text"
                    className="rpg-input"
                    placeholder={ph.stats[key]}
                    value={sheet.stats[key]}
                    onChange={(e) => updateStat(key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Hardware */}
          <section>
            <ComponentList
              title={t.sections.hardware}
              items={sheet.hardware}
              onAdd={addHardware}
              onUpdate={updateHardware}
              onRemove={removeHardware}
              removeIcon={icons.remove}
              tooltipDescription={descriptions.sections.hardware}
              placeholder={{
                name: ph.hardwareName,
                description: ph.hardwareDescription,
              }}
            />
          </section>

          {/* Skills / Services */}
          <section>
            <ComponentList
              title={t.sections.skills}
              items={sheet.services}
              onAdd={addService}
              onUpdate={updateService}
              onRemove={removeService}
              removeIcon={icons.remove}
              tooltipDescription={descriptions.sections.skills}
              placeholder={{
                name: ph.skillName,
                description: ph.skillDescription,
              }}
            />
          </section>

          {/* Custom Fields */}
          <section>
            <CustomFieldList
              title={t.sections.customFields}
              fields={sheet.customFields}
              onAdd={addCustomField}
              onUpdate={updateCustomField}
              onRemove={removeCustomField}
              removeIcon={icons.remove}
              tooltipDescription={descriptions.sections.customFields}
              labelPlaceholder={ph.customLabel}
              valuePlaceholder={ph.customValue}
            />
          </section>
        </div>

        <div className="divider-rune mt-12 mb-4">{t.endOfSheet}</div>
        <p
          className="font-mono text-center text-faint opacity-50"
          style={{ fontSize: "0.65rem" }}
        >
          ID: {sheet.id} · Created: {new Date(sheet.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
