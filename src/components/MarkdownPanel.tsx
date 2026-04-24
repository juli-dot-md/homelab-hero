import { useEffect, useId, useRef, useState } from "react";

type Props = {
  initialMarkdown: string;
  filename: string;
  /** Return true on success, false on failure */
  onImport: (markdown: string) => boolean;
  onClose: () => void;
};

export function MarkdownPanel({ initialMarkdown, filename, onImport, onClose }: Props) {
  const [content, setContent] = useState(initialMarkdown);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Focus dialog on mount
  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  function handleContentChange(value: string) {
    setContent(value);
    // Clear error as soon as the user edits
    if (error) setError(null);
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport() {
    const ok = onImport(content);
    if (!ok) {
      setError("Could not import — make sure this is valid Homelab Hero markdown.");
    }
    // onClose is called by the parent on success
  }

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
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
          <h2
            id={titleId}
            className="font-display text-accent"
            style={{ fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            Markdown — {filename}
          </h2>
          <button
            type="button"
            className="export-modal-close btn-ghost"
            aria-label="Close markdown panel"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Editable textarea */}
        <textarea
          className="markdown-panel-textarea"
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          spellCheck={false}
          aria-label="Markdown content"
        />

        {/* Inline error */}
        {error && (
          <div role="alert" className="markdown-panel-error">
            {error}
          </div>
        )}

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
            className="btn-ghost"
            aria-label="Download markdown file"
            onClick={handleDownload}
          >
            ↓ Download
          </button>
          <button
            type="button"
            className="btn-primary"
            aria-label="Import markdown content"
            onClick={handleImport}
          >
            ↑ Import
          </button>
        </div>
      </div>
    </div>
  );
}
