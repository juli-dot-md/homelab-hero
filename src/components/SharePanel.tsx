import { useEffect, useId, useRef, useState } from "react";
import { buildShareUrl } from "../utils/shareUrl";

type Props = {
  baseUrl: string;
  onClose: () => void;
};

export function SharePanel({ baseUrl, onClose }: Props) {
  const [rawUrl, setRawUrl] = useState("");
  const [copied, setCopied] = useState(false);
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

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

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
            Share Sheet
          </h2>
          <button
            type="button"
            className="export-modal-close btn-ghost"
            aria-label="Close share panel"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label
              htmlFor={`${titleId}-input`}
              className="font-display text-accent uppercase tracking-wider"
              style={{ fontSize: "0.65rem", display: "block", marginBottom: "0.4rem" }}
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
        </div>

        {/* Actions */}
        <div className="export-modal-actions">
          {shareUrl && (
            <button
              type="button"
              className="btn-primary"
              aria-label={copied ? "Link copied" : "Copy link"}
              onClick={handleCopy}
            >
              {copied ? "✓ Copied" : "Copy Link"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
