import { languages } from "./translations.js";

export const LANGUAGE_STORAGE_KEY = "mediatrix-language";
export const DEFAULT_LANGUAGE = "en";

export const supportedLanguages = languages.map(([locale]) => locale);

export const languageRoutes = Object.fromEntries(
  supportedLanguages.map((locale) => [locale, `/${locale.split("-")[0].toLowerCase()}`]),
);

const routeLanguages = Object.fromEntries(
  Object.entries(languageRoutes).map(([locale, route]) => [route, locale]),
);

export function normalizeLanguage(candidate) {
  if (typeof candidate !== "string" || !candidate.trim()) return null;

  const normalized = candidate.trim().replaceAll("_", "-").toLowerCase();
  const exact = supportedLanguages.find((locale) => locale.toLowerCase() === normalized);
  if (exact) return exact;

  const base = normalized.split("-")[0];
  return supportedLanguages.find((locale) => locale.split("-")[0].toLowerCase() === base) || null;
}

export function getSavedLanguage(storage) {
  try {
    return normalizeLanguage(storage?.getItem(LANGUAGE_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function detectBrowserLanguage(browserNavigator) {
  const candidates = [
    ...(Array.isArray(browserNavigator?.languages) ? browserNavigator.languages : []),
    browserNavigator?.language,
  ];

  for (const candidate of candidates) {
    const language = normalizeLanguage(candidate);
    if (language) return language;
  }

  return DEFAULT_LANGUAGE;
}

export function getPreferredLanguage({ storage, browserNavigator } = {}) {
  return getSavedLanguage(storage) || detectBrowserLanguage(browserNavigator);
}

export function saveManualLanguage(language, storage) {
  const normalized = normalizeLanguage(language);
  if (!normalized) return false;

  try {
    storage?.setItem(LANGUAGE_STORAGE_KEY, normalized);
    return true;
  } catch {
    return false;
  }
}

export function getRouteLanguage(pathname = "/") {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  return routeLanguages[normalizedPath.toLowerCase()] || null;
}

export function isLanguageRoute(pathname = "/") {
  return Boolean(getRouteLanguage(pathname));
}

export function getLanguageRoute(language) {
  return languageRoutes[normalizeLanguage(language) || DEFAULT_LANGUAGE];
}

export function getLocalizedUrl(language, locationLike = {}) {
  const route = getLanguageRoute(language);
  return `${route}${locationLike.search || ""}${locationLike.hash || ""}`;
}
