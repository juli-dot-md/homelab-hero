import { useEffect, useId, useRef, useState } from "react";

type Props = {
  markdown: string;
  filename: string;
  onClose: () => void;
};

export function ExportModal({ markdown, filename, onClose }: Props) {
  const [copied, setCopied] = useState(false);
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Escape key closes
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Focus trap — focus dialog on mount
  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  async function handleCopy() {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    // Only close if the click is on the backdrop itself, not the dialog
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="export-modal-backdrop" onClick={handleBackdropClick}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="export-modal"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="export-modal-header">
          <h2 id={titleId} className="font-display text-accent" style={{ fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Export — {filename}
          </h2>
          <button
            type="button"
            className="export-modal-close btn-ghost"
            aria-label="Close export dialog"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Markdown preview */}
        <pre className="export-modal-code"><code>{markdown}</code></pre>

        {/* Actions */}
        <div className="export-modal-actions">
          <button
            type="button"
            className="btn-ghost"
            aria-label={copied ? "Copied to clipboard" : "Copy to clipboard"}
            onClick={handleCopy}
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
          <button
            type="button"
            className="btn-primary"
            aria-label="Download markdown file"
            onClick={handleDownload}
          >
            ↓ Download
          </button>
        </div>
      </div>
    </div>
  );
}
