import React from "react";
import { getEasterEggCopy } from "../translations";

const EasterEggI18nContext = React.createContext(null);

export function formatEasterEggText(template, values = {}) {
  return template.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);
}

export function EasterEggI18nProvider({ children, locale }) {
  const copy = React.useMemo(() => getEasterEggCopy(locale), [locale]);
  const value = React.useMemo(() => ({ copy, locale }), [copy, locale]);
  return <EasterEggI18nContext.Provider value={value}>{children}</EasterEggI18nContext.Provider>;
}

export function useEasterEggI18n() {
  const value = React.useContext(EasterEggI18nContext);
  if (value) return value;
  return { copy: getEasterEggCopy("en"), locale: "en" };
}
