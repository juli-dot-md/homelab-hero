/// <reference types="vite/client" />

/**
 * Base URL for generating share links.
 * Set VITE_BASE_URL at build time for custom domains.
 * Falls back to window.location.origin in the browser.
 */
export function getBaseUrl(): string {
  if (import.meta.env.VITE_BASE_URL) {
    return import.meta.env.VITE_BASE_URL as string;
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
}

/**
 * CORS proxy URL for fetching remote markdown files.
 * Set VITE_CORS_PROXY_URL at build time.
 * Defaults to https://corsproxy.io/?url=
 *
 * The proxy URL must accept the target URL appended directly or as a
 * query param — the raw target URL is percent-encoded and appended.
 * Expected format: "https://proxy.example.com/?url=" (trailing = or /)
 */
export function getProxiedUrl(targetUrl: string): string {
  const proxy =
    (import.meta.env.VITE_CORS_PROXY_URL as string | undefined) ?? "https://corsproxy.io/?url=";
  return `${proxy}${encodeURIComponent(targetUrl)}`;
}
