import type { HomelabSheet } from "../types";

const STAT_LABELS: Record<string, string> = {
  scalability: "Scalability",
  reliability: "Reliability",
  cost: "Cost",
  cloudIndependence: "Cloud Independence",
  security: "Security",
  monitoring: "Monitoring",
  backupStrategy: "Backup Strategy",
  deployment: "Deployment",
};

const STAT_KEYS_ORDERED = [
  "scalability",
  "reliability",
  "cost",
  "cloudIndependence",
  "security",
  "monitoring",
  "backupStrategy",
  "deployment",
] as const;

function el(
  tag: string,
  styles: Partial<CSSStyleDeclaration>,
  ...children: (HTMLElement | string)[]
): HTMLElement {
  const node = document.createElement(tag);
  Object.assign(node.style, styles);
  for (const child of children) {
    if (typeof child === "string") {
      node.appendChild(document.createTextNode(child));
    } else {
      node.appendChild(child);
    }
  }
  return node;
}

function buildSnapshot(sheet: HomelabSheet): HTMLElement {
  const BASE: Partial<CSSStyleDeclaration> = {
    fontFamily: "system-ui, -apple-system, sans-serif",
    color: "#111",
    background: "#fff",
  };

  const LABEL_STYLE: Partial<CSSStyleDeclaration> = {
    fontSize: "10px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#555",
    marginBottom: "2px",
  };

  const VALUE_STYLE: Partial<CSSStyleDeclaration> = {
    fontSize: "13px",
    color: "#111",
  };

  // Root wrapper
  const root = el("div", {
    ...BASE,
    width: "800px",
    padding: "48px",
    boxSizing: "border-box",
  });

  // Header — image + name + description
  const header = el("div", { marginBottom: "32px" });

  if (sheet.image) {
    const headerInner = el("div", {
      display: "flex",
      gap: "24px",
      alignItems: "flex-start",
      marginBottom: "0",
    });
    const img = document.createElement("img");
    img.src = sheet.image;
    img.style.cssText =
      "width:80px;height:80px;object-fit:cover;border-radius:4px;border:1px solid #ddd;flex-shrink:0;";
    const nameBlock = el("div", { flex: "1" });
    nameBlock.appendChild(
      el(
        "h1",
        { fontSize: "28px", fontWeight: "700", margin: "0 0 6px", lineHeight: "1.2", ...BASE },
        sheet.name
      )
    );
    if (sheet.description) {
      nameBlock.appendChild(
        el(
          "p",
          { fontSize: "14px", color: "#444", fontStyle: "italic", margin: "0", ...BASE },
          `"${sheet.description}"`
        )
      );
    }
    headerInner.appendChild(img);
    headerInner.appendChild(nameBlock);
    header.appendChild(headerInner);
  } else {
    header.appendChild(
      el(
        "h1",
        { fontSize: "32px", fontWeight: "700", margin: "0 0 8px", lineHeight: "1.2", ...BASE },
        sheet.name
      )
    );
    if (sheet.description) {
      header.appendChild(
        el(
          "p",
          { fontSize: "15px", color: "#444", fontStyle: "italic", margin: "0", ...BASE },
          `"${sheet.description}"`
        )
      );
    }
  }
  root.appendChild(header);

  // Divider helper
  function divider() {
    return el("hr", { border: "none", borderTop: "1px solid #e0e0e0", margin: "24px 0" });
  }

  // Stats
  const filledStats = STAT_KEYS_ORDERED.filter((k) => sheet.stats[k]);
  if (filledStats.length > 0) {
    root.appendChild(divider());
    root.appendChild(el("p", { ...LABEL_STYLE, marginBottom: "12px" }, "Attributes"));
    const grid = el("div", {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
    });
    for (const key of filledStats) {
      const card = el("div", {
        padding: "10px 12px",
        border: "1px solid #e8e8e8",
        borderRadius: "4px",
        background: "#fafafa",
      });
      card.appendChild(el("p", { ...LABEL_STYLE, marginBottom: "4px" }, STAT_LABELS[key] ?? key));
      card.appendChild(el("p", { ...VALUE_STYLE, margin: "0" }, sheet.stats[key]));
      grid.appendChild(card);
    }
    root.appendChild(grid);
  }

  // Custom Fields
  if (sheet.customFields.length > 0) {
    root.appendChild(divider());
    root.appendChild(el("p", { ...LABEL_STYLE, marginBottom: "12px" }, "Custom Fields"));
    const grid = el("div", {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "12px",
    });
    for (const field of sheet.customFields) {
      if (!field.label) continue;
      const card = el("div", {
        padding: "10px 12px",
        border: "1px solid #e8e8e8",
        borderRadius: "4px",
        background: "#fafafa",
      });
      card.appendChild(el("p", { ...LABEL_STYLE, marginBottom: "4px" }, field.label));
      card.appendChild(el("p", { ...VALUE_STYLE, margin: "0" }, field.value));
      grid.appendChild(card);
    }
    root.appendChild(grid);
  }

  // Hardware
  if (sheet.hardware.length > 0) {
    root.appendChild(divider());
    root.appendChild(el("p", { ...LABEL_STYLE, marginBottom: "12px" }, "Hardware"));
    const list = el("div", { display: "flex", flexDirection: "column", gap: "8px" });
    for (const item of sheet.hardware) {
      if (!item.name) continue;
      const row = el("div", { paddingLeft: "12px", borderLeft: "2px solid #ccc" });
      row.appendChild(
        el("p", { fontSize: "13px", fontWeight: "600", margin: "0", ...BASE }, item.name)
      );
      if (item.description) {
        row.appendChild(
          el(
            "p",
            { fontSize: "12px", color: "#555", margin: "2px 0 0", fontStyle: "italic", ...BASE },
            item.description
          )
        );
      }
      list.appendChild(row);
    }
    root.appendChild(list);
  }

  // Services
  if (sheet.services.length > 0) {
    root.appendChild(divider());
    root.appendChild(el("p", { ...LABEL_STYLE, marginBottom: "12px" }, "Services"));
    const list = el("div", { display: "flex", flexDirection: "column", gap: "8px" });
    for (const item of sheet.services) {
      if (!item.name) continue;
      const row = el("div", { paddingLeft: "12px", borderLeft: "2px solid #ccc" });
      row.appendChild(
        el("p", { fontSize: "13px", fontWeight: "600", margin: "0", ...BASE }, item.name)
      );
      if (item.description) {
        row.appendChild(
          el(
            "p",
            { fontSize: "12px", color: "#555", margin: "2px 0 0", fontStyle: "italic", ...BASE },
            item.description
          )
        );
      }
      list.appendChild(row);
    }
    root.appendChild(list);
  }

  // Footer
  root.appendChild(divider());
  root.appendChild(
    el(
      "p",
      {
        fontSize: "10px",
        color: "#aaa",
        margin: "0",
        ...BASE,
      },
      `homelab.hero · ${sheet.id}`
    )
  );

  return root;
}

export async function exportPng(sheet: HomelabSheet, filename: string): Promise<void> {
  const { default: html2canvas } = await import("html2canvas");

  const wrapper = document.createElement("div");
  wrapper.style.cssText = "position:absolute;left:-9999px;top:0;";
  const snapshot = buildSnapshot(sheet);
  wrapper.appendChild(snapshot);
  document.body.appendChild(wrapper);

  try {
    const canvas = await html2canvas(snapshot, {
      useCORS: true,
      scale: 2,
      backgroundColor: "#ffffff",
      logging: false,
    });
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${filename}.png`;
    a.click();
  } finally {
    document.body.removeChild(wrapper);
  }
}
