const apiBaseUrl = import.meta.env.VITE_API_URL?.trim();

if (!apiBaseUrl) {
  throw new Error("Missing VITE_API_URL in frontend environment.");
}

export const API_BASE_URL = apiBaseUrl.replace(/\/+$/, "");

export function buildApiUrl(path = "") {
  const normalizedPath = path.replace(/^\/+/, "");

  return normalizedPath ? `${API_BASE_URL}/${normalizedPath}` : API_BASE_URL;
}
