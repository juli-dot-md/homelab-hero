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
