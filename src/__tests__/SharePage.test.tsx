import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { SharePage } from "../pages/SharePage";

const VALID_MD = `---
id: abc123
theme: rpg-epic
createdAt: 2026-01-01T00:00:00.000Z
updatedAt: 2026-01-01T00:00:00.000Z
---

# Mike's Homelab

Held together by proxmox and hope.

## Attributes

### Reliability
Glued together, my baby
`;

const RAW_URL = "https://raw.githubusercontent.com/mike/homelab/main/sheet.md";

function renderSharePage(search: string) {
  return render(
    <MemoryRouter initialEntries={[`/share${search}`]}>
      <Routes>
        <Route path="/share" element={<SharePage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("<SharePage>", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("shows a loading state while fetching", () => {
    vi.spyOn(globalThis, "fetch").mockReturnValue(new Promise(() => {}));
    const src = `?src=${encodeURIComponent(RAW_URL)}`;
    renderSharePage(src);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("fetches the URL from the src param", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      text: async () => VALID_MD,
    } as Response);
    const src = `?src=${encodeURIComponent(RAW_URL)}`;
    renderSharePage(src);
    expect(fetchMock).toHaveBeenCalledWith(RAW_URL);
  });

  it("renders the sheet name as a heading after loading", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      text: async () => VALID_MD,
    } as Response);
    renderSharePage(`?src=${encodeURIComponent(RAW_URL)}`);
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "Mike's Homelab" })).toBeInTheDocument()
    );
  });

  it("renders the sheet description", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      text: async () => VALID_MD,
    } as Response);
    renderSharePage(`?src=${encodeURIComponent(RAW_URL)}`);
    await waitFor(() =>
      expect(screen.getByText(/held together by proxmox and hope/i)).toBeInTheDocument()
    );
  });

  it("shows an error when src param is missing", async () => {
    renderSharePage("");
    await waitFor(() =>
      expect(screen.getByRole("alert")).toBeInTheDocument()
    );
  });

  it("shows an error when fetch fails (network error)", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network error"));
    renderSharePage(`?src=${encodeURIComponent(RAW_URL)}`);
    await waitFor(() =>
      expect(screen.getByRole("alert")).toBeInTheDocument()
    );
  });

  it("shows an error when fetch returns non-ok status", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
      text: async () => "Not found",
    } as Response);
    renderSharePage(`?src=${encodeURIComponent(RAW_URL)}`);
    await waitFor(() =>
      expect(screen.getByRole("alert")).toBeInTheDocument()
    );
  });

  it("shows an error when markdown fails to parse", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      text: async () => "not valid homelab markdown",
    } as Response);
    renderSharePage(`?src=${encodeURIComponent(RAW_URL)}`);
    await waitFor(() =>
      expect(screen.getByRole("alert")).toBeInTheDocument()
    );
  });

  it("error message mentions CORS for fetch failures", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Failed to fetch"));
    renderSharePage(`?src=${encodeURIComponent(RAW_URL)}`);
    await waitFor(() => {
      const alert = screen.getByRole("alert");
      expect(alert.textContent?.toLowerCase()).toMatch(/cors|raw|public/);
    });
  });
});
