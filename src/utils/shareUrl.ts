/**
 * Build a share URL from a raw file URL and a base URL.
 * Returns empty string if rawUrl is blank.
 */
export function buildShareUrl(rawUrl: string, baseUrl: string): string {
  if (!rawUrl.trim()) return "";
  // Strip trailing slash from baseUrl so we can safely append /share
  const base = baseUrl.replace(/\/$/, "");
  const url = new URL(`${base}/share`);
  url.searchParams.set("src", rawUrl.trim());
  return url.toString();
}

/**
 * Extract the raw file URL from a share page search string.
 * Returns null if the src param is missing.
 */
export function parseShareUrl(search: string): string | null {
  const params = new URLSearchParams(search);
  return params.get("src");
}
