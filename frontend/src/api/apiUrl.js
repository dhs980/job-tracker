const rawApiBaseUrl = import.meta.env.VITE_API_URL?.trim();

if (!rawApiBaseUrl) {
  throw new Error("Missing VITE_API_URL in frontend environment.");
}

function normalizeApiBaseUrl(value) {
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  if (/^(localhost|127(?:\.\d{1,3}){3})(:\d+)?(\/.*)?$/i.test(value)) {
    return `http://${value}`;
  }

  if (/^[a-z0-9.-]+(?::\d+)?(\/.*)?$/i.test(value)) {
    return `https://${value}`;
  }

  throw new Error(
    "VITE_API_URL must be a full URL like https://api.example.com or http://localhost:3000.",
  );
}

export const API_BASE_URL = normalizeApiBaseUrl(rawApiBaseUrl).replace(
  /\/+$/,
  "",
);

export function buildApiUrl(path = "") {
  const normalizedPath = path.replace(/^\/+/, "");

  return normalizedPath ? `${API_BASE_URL}/${normalizedPath}` : API_BASE_URL;
}
