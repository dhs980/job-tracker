const normalizeUrl = (value) => value?.trim().replace(/\/+$/, "");

const configuredFrontendUrls = [
  process.env.FRONTEND_URL,
  process.env.CLIENT_URL,
  process.env.DOMAIN,
  process.env.Domain,
]
  .flatMap((value) => (value ? value.split(",") : []))
  .map((value) => normalizeUrl(value))
  .filter(Boolean);

export const FRONTEND_URL = configuredFrontendUrls[0] || "http://localhost:5173";
export const FRONTEND_URLS = configuredFrontendUrls.length
  ? [...new Set(configuredFrontendUrls)]
  : [FRONTEND_URL];

export const GOOGLE_CALLBACK_URL =
  normalizeUrl(process.env.GOOGLE_CALLBACK_URL) || "/auth/google/callback";

export const isProduction =
  (process.env.NODE_ENV || process.env.NODE_VAR || "").trim() === "production";
