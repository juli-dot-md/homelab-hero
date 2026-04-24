import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ConfirmDialog } from "../components/ConfirmDialog";

describe("<ConfirmDialog>", () => {
  const defaultProps = {
    message: "You will lose your unsaved changes.",
    confirmLabel: "Leave anyway",
    cancelLabel: "Stay",
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
  };

  it("renders the message", () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByText("You will lose your unsaved changes.")).toBeInTheDocument();
  });

  it("renders confirm and cancel buttons with given labels", () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByRole("button", { name: "Leave anyway" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Stay" })).toBeInTheDocument();
  });

  it("calls onConfirm when confirm button is clicked", () => {
    const onConfirm = vi.fn();
    render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} />);
    fireEvent.click(screen.getByRole("button", { name: "Leave anyway" }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("calls onCancel when cancel button is clicked", () => {
    const onCancel = vi.fn();
    render(<ConfirmDialog {...defaultProps} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole("button", { name: "Stay" }));
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("calls onCancel when Escape is pressed", () => {
    const onCancel = vi.fn();
    render(<ConfirmDialog {...defaultProps} onCancel={onCancel} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("calls onCancel when backdrop is clicked", () => {
    const onCancel = vi.fn();
    render(<ConfirmDialog {...defaultProps} onCancel={onCancel} />);
    fireEvent.click(screen.getByRole("dialog").parentElement!);
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("has role='dialog' and aria-modal", () => {
    render(<ConfirmDialog {...defaultProps} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });
});
