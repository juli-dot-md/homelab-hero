import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SharePage } from "../pages/SharePage";
import { themes } from "../themes";
import { ThemeProvider } from "../themes/ThemeContext";

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
    <ThemeProvider>
      <MemoryRouter initialEntries={[`/share${search}`]}>
        <Routes>
          <Route path="/share" element={<SharePage />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
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

  it("fetches via the CORS proxy", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      text: async () => VALID_MD,
    } as Response);
    const src = `?src=${encodeURIComponent(RAW_URL)}`;
    renderSharePage(src);
    expect(fetchMock).toHaveBeenCalledWith(
      `https://corsproxy.io/?url=${encodeURIComponent(RAW_URL)}`
    );
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
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
  });

  it("shows an error when fetch fails (network error)", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network error"));
    renderSharePage(`?src=${encodeURIComponent(RAW_URL)}`);
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
  });

  it("shows an error when fetch returns non-ok status", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 404,
      text: async () => "Not found",
    } as Response);
    renderSharePage(`?src=${encodeURIComponent(RAW_URL)}`);
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
  });

  it("shows an error when markdown fails to parse", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      text: async () => "not valid homelab markdown",
    } as Response);
    renderSharePage(`?src=${encodeURIComponent(RAW_URL)}`);
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
  });

  it("error message mentions the URL being accessible on fetch failure", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Failed to fetch"));
    renderSharePage(`?src=${encodeURIComponent(RAW_URL)}`);
    await waitFor(() => {
      const alert = screen.getByRole("alert");
      expect(alert.textContent?.toLowerCase()).toMatch(/url|accessible|correct/);
    });
  });

  it("applies the theme from the frontmatter after loading", async () => {
    const scifiMd = VALID_MD.replace("theme: rpg-epic", "theme: scifi-cyberpunk");
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      text: async () => scifiMd,
    } as Response);
    renderSharePage(`?src=${encodeURIComponent(RAW_URL)}`);
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "Mike's Homelab" })).toBeInTheDocument()
    );
    // The html element should have the cyberpunk theme class applied
    expect(document.documentElement.classList.contains(themes["scifi-cyberpunk"].className)).toBe(
      true
    );
  });
});
