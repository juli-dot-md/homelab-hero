import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MarkdownPanel } from "../components/MarkdownPanel";

const INITIAL_MD = `---
id: abc123
theme: rpg-epic
createdAt: 2026-01-01T00:00:00.000Z
updatedAt: 2026-01-01T00:00:00.000Z
---

# Mike's Homelab

Held together by proxmox and hope.
`;

const FILENAME = "mikes-homelab.md";

describe("<MarkdownPanel>", () => {
  it("renders a dialog with role='dialog'", () => {
    render(
      <MarkdownPanel
        initialMarkdown={INITIAL_MD}
        filename={FILENAME}
        onImport={() => true}
        onClose={() => {}}
      />
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("textarea is pre-filled with initialMarkdown", () => {
    render(
      <MarkdownPanel
        initialMarkdown={INITIAL_MD}
        filename={FILENAME}
        onImport={() => true}
        onClose={() => {}}
      />
    );
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue(INITIAL_MD);
  });

  it("textarea is editable", () => {
    render(
      <MarkdownPanel
        initialMarkdown={INITIAL_MD}
        filename={FILENAME}
        onImport={() => true}
        onClose={() => {}}
      />
    );
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "# Edited" } });
    expect(textarea).toHaveValue("# Edited");
  });

  it("close button calls onClose", () => {
    const onClose = vi.fn();
    render(
      <MarkdownPanel
        initialMarkdown={INITIAL_MD}
        filename={FILENAME}
        onImport={() => true}
        onClose={onClose}
      />
    );
    fireEvent.click(screen.getByLabelText("Close markdown panel"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("pressing Escape calls onClose", () => {
    const onClose = vi.fn();
    render(
      <MarkdownPanel
        initialMarkdown={INITIAL_MD}
        filename={FILENAME}
        onImport={() => true}
        onClose={onClose}
      />
    );
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("clicking the backdrop calls onClose", () => {
    const onClose = vi.fn();
    render(
      <MarkdownPanel
        initialMarkdown={INITIAL_MD}
        filename={FILENAME}
        onImport={() => true}
        onClose={onClose}
      />
    );
    fireEvent.click(screen.getByRole("dialog").parentElement!);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("clicking inside the dialog does NOT call onClose", () => {
    const onClose = vi.fn();
    render(
      <MarkdownPanel
        initialMarkdown={INITIAL_MD}
        filename={FILENAME}
        onImport={() => true}
        onClose={onClose}
      />
    );
    fireEvent.click(screen.getByRole("dialog"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("has a Copy button that writes textarea content to clipboard", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      writable: true,
    });
    render(
      <MarkdownPanel
        initialMarkdown={INITIAL_MD}
        filename={FILENAME}
        onImport={() => true}
        onClose={() => {}}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /copy/i }));
    expect(writeText).toHaveBeenCalledWith(INITIAL_MD);
  });

  it("Copy button writes EDITED content, not the original", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      writable: true,
    });
    render(
      <MarkdownPanel
        initialMarkdown={INITIAL_MD}
        filename={FILENAME}
        onImport={() => true}
        onClose={() => {}}
      />
    );
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "# Edited content" } });
    fireEvent.click(screen.getByRole("button", { name: /copy/i }));
    expect(writeText).toHaveBeenCalledWith("# Edited content");
  });

  it("Copy button shows a Copied confirmation", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      writable: true,
    });
    render(
      <MarkdownPanel
        initialMarkdown={INITIAL_MD}
        filename={FILENAME}
        onImport={() => true}
        onClose={() => {}}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /copy/i }));
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /copied/i })).toBeInTheDocument()
    );
  });

  it("has a Download button", () => {
    render(
      <MarkdownPanel
        initialMarkdown={INITIAL_MD}
        filename={FILENAME}
        onImport={() => true}
        onClose={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: /download/i })).toBeInTheDocument();
  });

  it("has an Import button", () => {
    render(
      <MarkdownPanel
        initialMarkdown={INITIAL_MD}
        filename={FILENAME}
        onImport={() => true}
        onClose={() => {}}
      />
    );
    expect(screen.getByRole("button", { name: /import/i })).toBeInTheDocument();
  });

  it("Import button calls onImport with current textarea content", () => {
    const onImport = vi.fn().mockReturnValue(true);
    render(
      <MarkdownPanel
        initialMarkdown={INITIAL_MD}
        filename={FILENAME}
        onImport={onImport}
        onClose={() => {}}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /import/i }));
    expect(onImport).toHaveBeenCalledWith(INITIAL_MD);
  });

  it("Import button calls onImport with EDITED content", () => {
    const onImport = vi.fn().mockReturnValue(true);
    render(
      <MarkdownPanel
        initialMarkdown={INITIAL_MD}
        filename={FILENAME}
        onImport={onImport}
        onClose={() => {}}
      />
    );
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "# New content" } });
    fireEvent.click(screen.getByRole("button", { name: /import/i }));
    expect(onImport).toHaveBeenCalledWith("# New content");
  });

  it("shows an inline error when onImport returns false", () => {
    const onImport = vi.fn().mockReturnValue(false);
    render(
      <MarkdownPanel
        initialMarkdown={INITIAL_MD}
        filename={FILENAME}
        onImport={onImport}
        onClose={() => {}}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /import/i }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("error is cleared when textarea content changes", () => {
    const onImport = vi.fn().mockReturnValue(false);
    render(
      <MarkdownPanel
        initialMarkdown={INITIAL_MD}
        filename={FILENAME}
        onImport={onImport}
        onClose={() => {}}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /import/i }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "# Fixed" } });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("has an accessible dialog title via aria-labelledby", () => {
    render(
      <MarkdownPanel
        initialMarkdown={INITIAL_MD}
        filename={FILENAME}
        onImport={() => true}
        onClose={() => {}}
      />
    );
    const dialog = screen.getByRole("dialog");
    const titleId = dialog.getAttribute("aria-labelledby")!;
    expect(titleId).toBeTruthy();
    expect(document.getElementById(titleId)).toBeInTheDocument();
  });
});
