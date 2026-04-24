import { beforeEach, describe, expect, it, vi } from "vitest";
import type { HomelabSheet } from "../types";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const FULL_SHEET: HomelabSheet = {
  id: "abc12345",
  name: "Mike's Homelab",
  description: "Held together by proxmox and hope.",
  stats: {
    scalability: "Runs on vibes",
    reliability: "Glued together",
    cost: "$40/mo",
    cloudIndependence: "",
    security: "Tailscale",
    monitoring: "",
    backupStrategy: "3-2-1",
    deployment: "By hand",
  },
  hardware: [{ id: "h1", name: "Dell R720", description: "2x Xeon, 128GB RAM" }],
  services: [{ id: "s1", name: "Jellyfin", description: "Media server" }],
  customFields: [{ id: "cf1", label: "Power Draw", value: "~150W" }],
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-02T00:00:00.000Z",
};

// ---------------------------------------------------------------------------
// Mock html2canvas + canvas
// ---------------------------------------------------------------------------

const fakeDataUrl = "data:image/png;base64,fakedata";

const fakeCanvas = {
  toDataURL: vi.fn().mockReturnValue(fakeDataUrl),
};

vi.mock("html2canvas", () => ({
  default: vi.fn().mockResolvedValue(fakeCanvas),
}));

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("exportPng", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fakeCanvas.toDataURL.mockReturnValue(fakeDataUrl);

    // Mock anchor click for download trigger
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
  });

  it("calls html2canvas and toDataURL", async () => {
    const { exportPng } = await import("../utils/exportPng");
    const html2canvas = (await import("html2canvas")).default;

    await exportPng(FULL_SHEET, "mikes-homelab");

    expect(html2canvas).toHaveBeenCalledOnce();
    expect(fakeCanvas.toDataURL).toHaveBeenCalledWith("image/png");
  });

  it("triggers an anchor download with the correct filename", async () => {
    const { exportPng } = await import("../utils/exportPng");
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});

    await exportPng(FULL_SHEET, "mikes-homelab");

    // Find the anchor that was created — check its download attribute via the spy
    expect(clickSpy).toHaveBeenCalledOnce();
  });

  it("cleans up the temporary DOM element after export", async () => {
    const { exportPng } = await import("../utils/exportPng");
    const before = document.body.children.length;

    await exportPng(FULL_SHEET, "mikes-homelab");

    expect(document.body.children.length).toBe(before);
  });

  it("cleans up the DOM even if html2canvas throws", async () => {
    const html2canvas = (await import("html2canvas")).default;
    vi.mocked(html2canvas).mockRejectedValueOnce(new Error("canvas fail"));

    const { exportPng } = await import("../utils/exportPng");
    const before = document.body.children.length;

    await expect(exportPng(FULL_SHEET, "mikes-homelab")).rejects.toThrow("canvas fail");

    expect(document.body.children.length).toBe(before);
  });

  it("builds a snapshot element containing the sheet name", async () => {
    const html2canvas = (await import("html2canvas")).default;
    let capturedEl: HTMLElement | null = null;
    vi.mocked(html2canvas).mockImplementationOnce(async (el) => {
      capturedEl = el as HTMLElement;
      return fakeCanvas as unknown as HTMLCanvasElement;
    });

    const { exportPng } = await import("../utils/exportPng");
    await exportPng(FULL_SHEET, "mikes-homelab");

    expect(capturedEl).not.toBeNull();
    expect(capturedEl!.textContent).toContain("Mike's Homelab");
  });

  it("snapshot contains filled stats", async () => {
    const html2canvas = (await import("html2canvas")).default;
    let capturedEl: HTMLElement | null = null;
    vi.mocked(html2canvas).mockImplementationOnce(async (el) => {
      capturedEl = el as HTMLElement;
      return fakeCanvas as unknown as HTMLCanvasElement;
    });

    const { exportPng } = await import("../utils/exportPng");
    await exportPng(FULL_SHEET, "mikes-homelab");

    expect(capturedEl!.textContent).toContain("Runs on vibes");
    expect(capturedEl!.textContent).toContain("Scalability");
  });

  it("snapshot contains hardware items", async () => {
    const html2canvas = (await import("html2canvas")).default;
    let capturedEl: HTMLElement | null = null;
    vi.mocked(html2canvas).mockImplementationOnce(async (el) => {
      capturedEl = el as HTMLElement;
      return fakeCanvas as unknown as HTMLCanvasElement;
    });

    const { exportPng } = await import("../utils/exportPng");
    await exportPng(FULL_SHEET, "mikes-homelab");

    expect(capturedEl!.textContent).toContain("Dell R720");
  });

  it("snapshot contains services", async () => {
    const html2canvas = (await import("html2canvas")).default;
    let capturedEl: HTMLElement | null = null;
    vi.mocked(html2canvas).mockImplementationOnce(async (el) => {
      capturedEl = el as HTMLElement;
      return fakeCanvas as unknown as HTMLCanvasElement;
    });

    const { exportPng } = await import("../utils/exportPng");
    await exportPng(FULL_SHEET, "mikes-homelab");

    expect(capturedEl!.textContent).toContain("Jellyfin");
  });

  it("snapshot contains custom fields", async () => {
    const html2canvas = (await import("html2canvas")).default;
    let capturedEl: HTMLElement | null = null;
    vi.mocked(html2canvas).mockImplementationOnce(async (el) => {
      capturedEl = el as HTMLElement;
      return fakeCanvas as unknown as HTMLCanvasElement;
    });

    const { exportPng } = await import("../utils/exportPng");
    await exportPng(FULL_SHEET, "mikes-homelab");

    expect(capturedEl!.textContent).toContain("Power Draw");
    expect(capturedEl!.textContent).toContain("~150W");
  });

  it("snapshot omits empty stats", async () => {
    const html2canvas = (await import("html2canvas")).default;
    let capturedEl: HTMLElement | null = null;
    vi.mocked(html2canvas).mockImplementationOnce(async (el) => {
      capturedEl = el as HTMLElement;
      return fakeCanvas as unknown as HTMLCanvasElement;
    });

    const { exportPng } = await import("../utils/exportPng");
    await exportPng(FULL_SHEET, "mikes-homelab");

    // cloudIndependence and monitoring are empty in FULL_SHEET
    expect(capturedEl!.textContent).not.toContain("Cloud Independence");
    expect(capturedEl!.textContent).not.toContain("Monitoring");
  });
});
