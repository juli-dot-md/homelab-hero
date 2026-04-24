import type { CustomField } from "../types";

type Props = {
  title: string;
  fields: CustomField[];
  onAdd: () => void;
  onUpdate: (id: string, field: "label" | "value", value: string) => void;
  onRemove: (id: string) => void;
  removeIcon?: string;
  labelPlaceholder?: string;
  valuePlaceholder?: string;
};

export function CustomFieldList({
  title,
  fields,
  onAdd,
  onUpdate,
  onRemove,
  removeIcon = "✕",
  labelPlaceholder = "Label",
  valuePlaceholder = "Value",
}: Props) {
  return (
    <div>
      <div className="section-header">{title}</div>

      <div className="flex flex-col gap-3 mb-3">
        {fields.map((field) => (
          <div key={field.id} className="scroll-card">
            <div className="relative z-10 flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  className="rpg-input"
                  placeholder={labelPlaceholder}
                  value={field.label}
                  onChange={(e) => onUpdate(field.id, "label", e.target.value)}
                />
                <button
                  type="button"
                  className="btn-danger shrink-0"
                  onClick={() => onRemove(field.id)}
                  aria-label={`Remove ${field.label || "field"}`}
                >
                  {removeIcon}
                </button>
              </div>
              <input
                type="text"
                className="rpg-input"
                placeholder={valuePlaceholder}
                value={field.value}
                onChange={(e) => onUpdate(field.id, "value", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <button type="button" className="btn-ghost" onClick={onAdd}>
        + Add Field
      </button>
    </div>
  );
}
