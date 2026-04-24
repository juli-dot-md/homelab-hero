import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ExportModal } from "../components/ExportModal";

const MARKDOWN = `---
id: abc123
theme: rpg-epic
createdAt: 2026-01-01T00:00:00.000Z
updatedAt: 2026-01-01T00:00:00.000Z
---

# Mike's Homelab

Held together by proxmox and hope.
`;

const FILENAME = "mikes-homelab.md";

describe("<ExportModal>", () => {
  it("renders the markdown content in a code block", () => {
    render(<ExportModal markdown={MARKDOWN} filename={FILENAME} onClose={() => {}} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(/Mike's Homelab/)).toBeInTheDocument();
  });

  it("has a close button that calls onClose", () => {
    const onClose = vi.fn();
    render(<ExportModal markdown={MARKDOWN} filename={FILENAME} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText("Close export dialog"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("pressing Escape calls onClose", () => {
    const onClose = vi.fn();
    render(<ExportModal markdown={MARKDOWN} filename={FILENAME} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("clicking the backdrop calls onClose", () => {
    const onClose = vi.fn();
    render(<ExportModal markdown={MARKDOWN} filename={FILENAME} onClose={onClose} />);
    fireEvent.click(screen.getByRole("dialog").parentElement!);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("clicking inside the dialog does NOT call onClose", () => {
    const onClose = vi.fn();
    render(<ExportModal markdown={MARKDOWN} filename={FILENAME} onClose={onClose} />);
    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("has a Download button", () => {
    render(<ExportModal markdown={MARKDOWN} filename={FILENAME} onClose={() => {}} />);
    expect(screen.getByRole("button", { name: /download/i })).toBeInTheDocument();
  });

  it("has a Copy to Clipboard button", () => {
    render(<ExportModal markdown={MARKDOWN} filename={FILENAME} onClose={() => {}} />);
    expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument();
  });

  it("Copy button writes markdown to clipboard", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      writable: true,
    });
    render(<ExportModal markdown={MARKDOWN} filename={FILENAME} onClose={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: /copy/i }));
    expect(writeText).toHaveBeenCalledWith(MARKDOWN);
  });

  it("Copy button shows a confirmation after copying", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      writable: true,
    });
    render(<ExportModal markdown={MARKDOWN} filename={FILENAME} onClose={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: /copy/i }));
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /copied/i })).toBeInTheDocument();
    });
  });

  it("has an accessible dialog title", () => {
    render(<ExportModal markdown={MARKDOWN} filename={FILENAME} onClose={() => {}} />);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-labelledby");
    const titleId = screen.getByRole("dialog").getAttribute("aria-labelledby")!;
    expect(document.getElementById(titleId)).toBeInTheDocument();
  });
});
