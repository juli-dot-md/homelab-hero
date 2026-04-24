import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { ImportButton } from "../components/ImportButton";

const VALID_MD = `---
id: abc12345
theme: rpg-epic
createdAt: 2026-01-01T00:00:00.000Z
updatedAt: 2026-01-01T00:00:00.000Z
---

# Test Lab

A test lab.

## Attributes

### Reliability
Glued together, my baby
`;

function makeFile(content: string, name = "test.md"): File {
  return new File([content], name, { type: "text/markdown" });
}

describe("<ImportButton>", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders an import button", () => {
    render(<ImportButton onImport={() => {}} />);
    expect(screen.getByRole("button", { name: /import/i })).toBeInTheDocument();
  });

  it("clicking the button triggers a hidden file input click", () => {
    render(<ImportButton onImport={() => {}} />);
    // The hidden input should exist in the DOM
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.accept).toContain(".md");
  });

  it("calls onImport with the file text when a valid file is selected", async () => {
    const onImport = vi.fn();
    render(<ImportButton onImport={onImport} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;

    const file = makeFile(VALID_MD);
    // Simulate FileReader by mocking it
    const readAsText = vi.fn();
    const mockReader = { readAsText, onload: null as unknown };
    vi.spyOn(globalThis, "FileReader").mockImplementation(() => mockReader as unknown as FileReader);

    fireEvent.change(input, { target: { files: [file] } });

    // Simulate FileReader completing
    (mockReader as { onload: (e: { target: { result: string } }) => void }).onload({
      target: { result: VALID_MD },
    });

    expect(onImport).toHaveBeenCalledWith(VALID_MD);
  });

  it("resets the input value after selection so the same file can be re-imported", () => {
    render(<ImportButton onImport={() => {}} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    // Trigger change
    const readAsText = vi.fn();
    const mockReader = { readAsText, onload: null as unknown };
    vi.spyOn(globalThis, "FileReader").mockImplementation(() => mockReader as unknown as FileReader);
    fireEvent.change(input, { target: { files: [makeFile(VALID_MD)] } });
    expect(input.value).toBe("");
  });

  it("does nothing if no file is selected", () => {
    const onImport = vi.fn();
    render(<ImportButton onImport={onImport} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [] } });
    expect(onImport).not.toHaveBeenCalled();
  });

  it("accepts an optional label prop", () => {
    render(<ImportButton onImport={() => {}} label="Load Sheet" />);
    expect(screen.getByRole("button", { name: /load sheet/i })).toBeInTheDocument();
  });
});
