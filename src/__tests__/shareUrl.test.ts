import { describe, expect, it } from "vitest";
import { buildShareUrl, parseShareUrl } from "../utils/shareUrl";

const RAW_URL = "https://raw.githubusercontent.com/mike/homelab/main/sheet.md";
const BASE = "https://homelabhero.app";

describe("buildShareUrl", () => {
  it("returns a URL with /share path and src query param", () => {
    const result = buildShareUrl(RAW_URL, BASE);
    const url = new URL(result);
    expect(url.pathname).toBe("/share");
    expect(url.searchParams.get("src")).toBe(RAW_URL);
  });

  it("encodes special characters in the src URL", () => {
    const weirdUrl = "https://example.com/file with spaces.md";
    const result = buildShareUrl(weirdUrl, BASE);
    const url = new URL(result);
    expect(url.searchParams.get("src")).toBe(weirdUrl);
  });

  it("uses the provided base URL", () => {
    const result = buildShareUrl(RAW_URL, "https://example.com");
    expect(result.startsWith("https://example.com/share")).toBe(true);
  });

  it("returns empty string when rawUrl is empty", () => {
    expect(buildShareUrl("", BASE)).toBe("");
  });

  it("returns empty string when rawUrl is whitespace only", () => {
    expect(buildShareUrl("   ", BASE)).toBe("");
  });
});

describe("parseShareUrl", () => {
  it("extracts the src param from a share URL search string", () => {
    const shareUrl = buildShareUrl(RAW_URL, BASE);
    const search = new URL(shareUrl).search;
    expect(parseShareUrl(search)).toBe(RAW_URL);
  });

  it("returns null when src param is missing", () => {
    expect(parseShareUrl("?foo=bar")).toBeNull();
  });

  it("returns null for empty search string", () => {
    expect(parseShareUrl("")).toBeNull();
  });

  it("round-trips a URL with special characters", () => {
    const original = "https://example.com/path?file=my sheet.md&ref=main";
    const shareUrl = buildShareUrl(original, BASE);
    const search = new URL(shareUrl).search;
    expect(parseShareUrl(search)).toBe(original);
  });
});
