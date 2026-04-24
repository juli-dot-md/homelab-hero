import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SharePanel } from "../components/SharePanel";

const BASE_URL = "https://homelabhero.app";
const RAW_URL = "https://raw.githubusercontent.com/mike/homelab/main/sheet.md";

describe("<SharePanel>", () => {
  it("renders a dialog with role='dialog'", () => {
    render(<SharePanel baseUrl={BASE_URL} onClose={() => {}} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("has an accessible title", () => {
    render(<SharePanel baseUrl={BASE_URL} onClose={() => {}} />);
    const dialog = screen.getByRole("dialog");
    const titleId = dialog.getAttribute("aria-labelledby")!;
    expect(document.getElementById(titleId)).toBeInTheDocument();
  });

  it("has a text input for the raw URL", () => {
    render(<SharePanel baseUrl={BASE_URL} onClose={() => {}} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("shows no share link when input is empty", () => {
    render(<SharePanel baseUrl={BASE_URL} onClose={() => {}} />);
    expect(screen.queryByText(/share\?src=/)).not.toBeInTheDocument();
  });

  it("shows a generated share link when a URL is typed", () => {
    render(<SharePanel baseUrl={BASE_URL} onClose={() => {}} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: RAW_URL } });
    expect(screen.getByText(/\/share\?src=/)).toBeInTheDocument();
  });

  it("share link contains the encoded raw URL", () => {
    render(<SharePanel baseUrl={BASE_URL} onClose={() => {}} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: RAW_URL } });
    const link = screen.getByText(/\/share\?src=/);
    expect(link.textContent).toContain(encodeURIComponent(RAW_URL));
  });

  it("has a Copy Link button when a URL is entered", () => {
    render(<SharePanel baseUrl={BASE_URL} onClose={() => {}} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: RAW_URL } });
    expect(screen.getByRole("button", { name: /copy link/i })).toBeInTheDocument();
  });

  it("Copy Link writes the share URL to clipboard", () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      writable: true,
    });
    render(<SharePanel baseUrl={BASE_URL} onClose={() => {}} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: RAW_URL } });
    fireEvent.click(screen.getByRole("button", { name: /copy link/i }));
    expect(writeText).toHaveBeenCalledWith(
      expect.stringContaining("/share?src=")
    );
  });

  it("close button calls onClose", () => {
    const onClose = vi.fn();
    render(<SharePanel baseUrl={BASE_URL} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText("Close share panel"));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("Escape calls onClose", () => {
    const onClose = vi.fn();
    render(<SharePanel baseUrl={BASE_URL} onClose={onClose} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("backdrop click calls onClose", () => {
    const onClose = vi.fn();
    render(<SharePanel baseUrl={BASE_URL} onClose={onClose} />);
    fireEvent.click(screen.getByRole("dialog").parentElement!);
    expect(onClose).toHaveBeenCalledOnce();
  });
});
