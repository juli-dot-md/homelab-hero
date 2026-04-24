import { useEffect } from "react";

type Props = {
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  message,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: Props) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onCancel();
  }

  return (
    <div className="export-modal-backdrop" onClick={handleBackdropClick}>
      <div
        role="dialog"
        aria-modal="true"
        className="confirm-dialog"
      >
        <p className="confirm-dialog-message font-body">{message}</p>
        <div className="confirm-dialog-actions">
          <button type="button" className="btn-ghost" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button type="button" className="btn-danger" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
