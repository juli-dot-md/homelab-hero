import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SharePanel } from "../components/SharePanel";
import type { HomelabSheet } from "../types";

const BASE_URL = "https://homelabhero.app";
const RAW_URL = "https://raw.githubusercontent.com/mike/homelab/main/sheet.md";

const SHEET: HomelabSheet = {
  id: "test123",
  name: "Mike's Homelab",
  description: "A test lab",
  stats: {
    scalability: "",
    reliability: "",
    cost: "",
    cloudIndependence: "",
    security: "",
    monitoring: "",
    backupStrategy: "",
    deployment: "",
  },
  hardware: [],
  services: [],
  customFields: [],
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

function renderPanel(overrides: Partial<Parameters<typeof SharePanel>[0]> = {}) {
  return render(
    <SharePanel
      baseUrl={BASE_URL}
      sheet={SHEET}
      filename="mikes-homelab"
      onClose={() => {}}
      {...overrides}
    />
  );
}

describe("<SharePanel>", () => {
  it("renders a dialog with role='dialog'", () => {
    renderPanel();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("has an accessible title", () => {
    renderPanel();
    const dialog = screen.getByRole("dialog");
    const titleId = dialog.getAttribute("aria-labelledby") ?? "";
    expect(document.getElementById(titleId)).toBeInTheDocument();
  });

  it("has a text input for the raw URL", () => {
    renderPanel();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("shows no share link when input is empty", () => {
    renderPanel();
    expect(screen.queryByText(/share\?src=/)).not.toBeInTheDocument();
  });

  it("shows a generated share link when a URL is typed", () => {
    renderPanel();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: RAW_URL } });
    expect(screen.getByText(/\/share\?src=/)).toBeInTheDocument();
  });

  it("share link contains the encoded raw URL", () => {
    renderPanel();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: RAW_URL } });
    const link = screen.getByText(/\/share\?src=/);
    expect(link.textContent).toContain(encodeURIComponent(RAW_URL));
  });

  it("has a Copy Link button when a URL is entered", () => {
    renderPanel();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: RAW_URL } });
    expect(screen.getByRole("button", { name: /copy link/i })).toBeInTheDocument();
  });

  it("Copy Link writes the share URL to clipboard", () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      writable: true,
    });
    renderPanel();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: RAW_URL } });
    fireEvent.click(screen.getByRole("button", { name: /copy link/i }));
    expect(writeText).toHaveBeenCalledWith(expect.stringContaining("/share?src="));
  });

  it("close button calls onClose", () => {
    const onClose = vi.fn();
    renderPanel({ onClose });
    fireEvent.click(screen.getByLabelText("Close panel"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("Escape calls onClose", () => {
    const onClose = vi.fn();
    renderPanel({ onClose });
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("backdrop click calls onClose", () => {
    const onClose = vi.fn();
    renderPanel({ onClose });
    const backdrop = screen.getByRole("dialog").parentElement;
    if (backdrop) fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("shows Save as PNG and Print buttons", () => {
    renderPanel();
    expect(screen.getByRole("button", { name: /save as png/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /print/i })).toBeInTheDocument();
  });

  it("Print button calls window.print", () => {
    const printSpy = vi.spyOn(window, "print").mockImplementation(() => {});
    renderPanel();
    fireEvent.click(screen.getByRole("button", { name: /print/i }));
    expect(printSpy).toHaveBeenCalledOnce();
    printSpy.mockRestore();
  });

  it("Save as PNG button enters exporting state on click", async () => {
    // Mock the exportPng module so it never resolves during this test
    vi.mock("../utils/exportPng", () => ({
      exportPng: vi.fn().mockReturnValue(new Promise(() => {})),
    }));
    renderPanel();
    fireEvent.click(screen.getByRole("button", { name: /save as png/i }));
    expect(screen.getByRole("button", { name: /exporting/i })).toBeInTheDocument();
  });
});
