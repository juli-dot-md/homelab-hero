import { Tooltip } from "./Tooltip";
import type { Component } from "../types";

type Props = {
  title: string;
  items: Component[];
  onAdd: () => void;
  onUpdate: (id: string, field: "name" | "description", value: string) => void;
  onRemove: (id: string) => void;
  removeIcon?: string;
  placeholder?: { name: string; description: string };
  tooltipDescription?: string;
};

export function ComponentList({
  title,
  items,
  onAdd,
  onUpdate,
  onRemove,
  removeIcon = "✕",
  placeholder,
  tooltipDescription,
}: Props) {
  return (
    <div>
      <div className="section-header">
        {tooltipDescription ? (
          <Tooltip description={tooltipDescription}>{title}</Tooltip>
        ) : (
          title
        )}
      </div>

      <div className="flex flex-col gap-3 mb-3">
        {items.map((item) => (
          <div key={item.id} className="scroll-card">
            <div className="relative z-10 flex flex-col gap-2">
              <div className="flex gap-2 items-start">
                <input
                  type="text"
                  className="rpg-input font-semibold"
                  placeholder={placeholder?.name ?? "Name"}
                  value={item.name}
                  onChange={(e) => onUpdate(item.id, "name", e.target.value)}
                />
                <button
                  type="button"
                  className="btn-danger shrink-0"
                  onClick={() => onRemove(item.id)}
                  aria-label={`Remove ${item.name || "item"}`}
                >
                  {removeIcon}
                </button>
              </div>
              <textarea
                className="rpg-input rpg-textarea"
                placeholder={placeholder?.description ?? "Description"}
                value={item.description}
                onChange={(e) => onUpdate(item.id, "description", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <button type="button" className="btn-ghost" onClick={onAdd}>
        + Add {title.replace(/s$/, "")}
      </button>
    </div>
  );
}
