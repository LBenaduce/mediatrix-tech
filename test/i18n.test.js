import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  detectBrowserLanguage,
  getLanguageRoute,
  getLocalizedUrl,
  getPreferredLanguage,
  getRouteLanguage,
  languageRoutes,
  normalizeLanguage,
  saveManualLanguage,
  supportedLanguages,
} from "../src/i18n.js";

function createStorage(initialValue = null) {
  let value = initialValue;
  return {
    getItem(key) {
      assert.equal(key, LANGUAGE_STORAGE_KEY);
      return value;
    },
    setItem(key, nextValue) {
      assert.equal(key, LANGUAGE_STORAGE_KEY);
      value = nextValue;
    },
    read() {
      return value;
    },
  };
}

test("normalizes regional variants for every available base language", () => {
  const variants = {
    "en-GB": "en",
    "pt-PT": "pt-BR",
    "es-MX": "es",
    "fr-CA": "fr",
    "de-AT": "de",
    "zh-TW": "zh-CN",
    "hi-IN": "hi",
    "ar-EG": "ar",
  };

  for (const [variant, expected] of Object.entries(variants)) {
    assert.equal(normalizeLanguage(variant), expected);
  }
});

test("uses navigator.languages in order, then navigator.language", () => {
  assert.equal(detectBrowserLanguage({ languages: ["it-IT", "es-MX"], language: "de-DE" }), "es");
  assert.equal(detectBrowserLanguage({ languages: [], language: "pt-PT" }), "pt-BR");
});

test("falls back to English when the browser language is unavailable", () => {
  assert.equal(detectBrowserLanguage({ languages: ["it-IT", "ja-JP"], language: "ko-KR" }), DEFAULT_LANGUAGE);
  assert.equal(DEFAULT_LANGUAGE, "en");
});

test("a saved manual preference takes priority over browser detection", () => {
  assert.equal(getPreferredLanguage({
    storage: createStorage("fr"),
    browserNavigator: { languages: ["pt-BR"], language: "pt-BR" },
  }), "fr");
});

test("manual selection is the only operation that persists a preference", () => {
  const storage = createStorage();
  assert.equal(detectBrowserLanguage({ languages: ["de-DE"] }), "de");
  assert.equal(storage.read(), null);
  assert.equal(saveManualLanguage("de-DE", storage), true);
  assert.equal(storage.read(), "de");
});

test("every available language has a direct route and route language wins explicitly", () => {
  assert.equal(new Set(Object.values(languageRoutes)).size, supportedLanguages.length);
  for (const language of supportedLanguages) {
    const route = getLanguageRoute(language);
    assert.equal(getRouteLanguage(route), language);
    assert.equal(getRouteLanguage(`${route}/`), language);
  }
  assert.equal(getRouteLanguage("/pt"), "pt-BR");
  assert.equal(getRouteLanguage("/en"), "en");
  assert.equal(getRouteLanguage("/es"), "es");
});

test("localized URLs preserve query parameters and anchors", () => {
  assert.equal(
    getLocalizedUrl("pt-PT", { search: "?utm_source=test", hash: "#contato" }),
    "/pt?utm_source=test#contato",
  );
});
