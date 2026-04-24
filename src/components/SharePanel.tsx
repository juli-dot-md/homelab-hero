import { useEffect, useId, useRef, useState } from "react";
import type { HomelabSheet } from "../types";
import { exportPng } from "../utils/exportPng";
import { buildShareUrl } from "../utils/shareUrl";

type Props = {
  baseUrl: string;
  sheet: HomelabSheet;
  filename: string;
  onClose: () => void;
};

const SECTION_LABEL: React.CSSProperties = {
  fontSize: "0.65rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  fontWeight: 600,
  color: "var(--color-accent)",
  fontFamily: "var(--font-display)",
  marginBottom: "0.75rem",
  display: "block",
};

const DIVIDER: React.CSSProperties = {
  border: "none",
  borderTop: "1px solid var(--color-border)",
  margin: "0",
};

export function SharePanel({ baseUrl, sheet, filename, onClose }: Props) {
  const [rawUrl, setRawUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [pngState, setPngState] = useState<"idle" | "exporting" | "done" | "error">("idle");
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const shareUrl = buildShareUrl(rawUrl, baseUrl);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleCopy() {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleExportPng() {
    setPngState("exporting");
    try {
      await exportPng(sheet, filename);
      setPngState("done");
      setTimeout(() => setPngState("idle"), 2000);
    } catch {
      setPngState("error");
      setTimeout(() => setPngState("idle"), 3000);
    }
  }

  function handlePrint() {
    window.print();
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  const pngLabel =
    pngState === "exporting"
      ? "Exporting…"
      : pngState === "done"
        ? "✓ Saved"
        : pngState === "error"
          ? "Error — try again"
          : "Save as PNG";

  return (
    <div className="export-modal-backdrop" onClick={handleBackdropClick}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="export-modal"
        style={{ maxWidth: "560px" }}
      >
        {/* Header */}
        <div className="export-modal-header">
          <h2
            id={titleId}
            className="font-display text-accent"
            style={{ fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            Share & Export
          </h2>
          <button
            type="button"
            className="export-modal-close btn-ghost"
            aria-label="Close panel"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Share link section */}
        <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <span style={SECTION_LABEL}>Share Link</span>
            <label
              htmlFor={`${titleId}-input`}
              className="font-display text-accent uppercase tracking-wider"
              style={{
                fontSize: "0.65rem",
                display: "block",
                marginBottom: "0.4rem",
                opacity: 0.7,
              }}
            >
              URL to your hosted .md file
            </label>
            <input
              id={`${titleId}-input`}
              ref={inputRef}
              type="url"
              className="rpg-input"
              placeholder="https://gist.githubusercontent.com/you/.../file.md"
              value={rawUrl}
              onChange={(e) => {
                setRawUrl(e.target.value);
                setCopied(false);
              }}
            />
            <p
              className="font-mono text-faint"
              style={{ fontSize: "0.65rem", marginTop: "0.4rem" }}
            >
              Must be a direct link to the plain .md file — no HTML page around it. On GitHub Gist,
              click Raw first.
            </p>
          </div>

          {shareUrl && (
            <div>
              <p
                className="font-display text-accent uppercase tracking-wider"
                style={{ fontSize: "0.65rem", marginBottom: "0.4rem" }}
              >
                Share link
              </p>
              <div
                className="font-mono text-muted"
                style={{
                  fontSize: "0.7rem",
                  wordBreak: "break-all",
                  padding: "0.5rem 0.75rem",
                  background: "rgba(0,0,0,0.2)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "2px",
                }}
              >
                {shareUrl}
              </div>
            </div>
          )}

          {shareUrl && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                className="btn-primary"
                aria-label={copied ? "Link copied" : "Copy link"}
                onClick={handleCopy}
              >
                {copied ? "✓ Copied" : "Copy Link"}
              </button>
            </div>
          )}
        </div>

        {/* Divider */}
        <hr style={DIVIDER} />

        {/* Export section */}
        <div style={{ padding: "1.25rem" }}>
          <span style={SECTION_LABEL}>Export</span>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button
              type="button"
              className="btn-ghost"
              onClick={handleExportPng}
              disabled={pngState === "exporting"}
              aria-label={pngLabel}
            >
              {pngLabel}
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={handlePrint}
              aria-label="Print or save as PDF"
            >
              Print / Save as PDF
            </button>
          </div>
          <p className="font-mono text-faint" style={{ fontSize: "0.65rem", marginTop: "0.6rem" }}>
            PNG exports a clean image. PDF opens your browser's print dialog — choose "Save as PDF".
          </p>
        </div>
      </div>
    </div>
  );
}
