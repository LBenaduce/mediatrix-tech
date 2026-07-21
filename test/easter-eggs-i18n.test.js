import test from "node:test";
import assert from "node:assert/strict";
import { buildStoryText, copyStoryText, supportsFileSharing } from "../src/easter-eggs/storySharing.js";
import { getEasterEggCopy, languages, translations } from "../src/translations.js";

function leafPaths(value, prefix = "") {
  return Object.entries(value).flatMap(([key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return child && typeof child === "object" ? leafPaths(child, path) : [path];
  });
}

function valueAtPath(value, path) {
  return path.split(".").reduce((current, key) => current?.[key], value);
}

const supportedLocales = languages.map(([locale]) => locale);
const requiredPaths = leafPaths(translations.en.easterEggs);
const distinctlyLocalizedPaths = [
  "achievements.digitalExplorer.name",
  "achievements.bugHunter.description",
  "lab.title",
  "share.shareButton",
  "share.fallbackInstructions",
  "story.discovery",
  "notFound.message",
  "console",
  "digitalJunkDrawer.entryButton",
  "digitalJunkDrawer.warning.title",
  "digitalJunkDrawer.viewer.another",
  "digitalJunkDrawer.achievements.curiosityWon.name",
  "digitalJunkDrawer.items.lastMetroid.caption",
];

for (const locale of supportedLocales) {
  test(`${locale} has a complete Easter egg locale`, () => {
    const copy = getEasterEggCopy(locale);

    for (const path of requiredPaths) {
      const value = valueAtPath(copy, path);
      assert.equal(typeof value, "string", `${locale}: ${path} must be a string`);
      assert.ok(value.trim(), `${locale}: ${path} must not be empty`);
    }

    if (locale !== "en") {
      for (const path of distinctlyLocalizedPaths) {
        assert.notEqual(valueAtPath(copy, path), valueAtPath(translations.en.easterEggs, path), `${locale}: ${path} should be localized`);
      }
    }
    assert.match(buildStoryText(copy.story), /@mediatrixtech\nhttps:\/\/mediatrix-tech\.com$/);
    assert.ok(buildStoryText(copy.story).startsWith(copy.story.discovery));
    assert.notEqual(copy.achievements.digitalExplorer.name, "");
    assert.notEqual(copy.achievements.bugHunter.name, "");
  });
}

test("English is the graceful fallback for an unknown locale", () => {
  assert.deepEqual(getEasterEggCopy("missing-locale"), translations.en.easterEggs);
});

test("the supplied Story wording is preserved for supported example locales", () => {
  assert.equal(getEasterEggCopy("en").story.discovery, "I discovered a secret on the Mediatrix Tech website!");
  assert.equal(getEasterEggCopy("pt-BR").story.discovery, "Descobri um segredo no site da Mediatrix Tech!");
  assert.equal(getEasterEggCopy("es").story.discovery, "¡Descubrí un secreto en el sitio web de Mediatrix Tech!");
  assert.equal(getEasterEggCopy("fr").story.discovery, "J’ai découvert un secret sur le site Mediatrix Tech !");
  assert.equal(getEasterEggCopy("de").story.discovery, "Ich habe ein Geheimnis auf der Mediatrix Tech Website entdeckt!");
  assert.equal(getEasterEggCopy("zh-CN").story.discovery, "我在 Mediatrix Tech 网站发现了一个隐藏彩蛋！");
  assert.equal(getEasterEggCopy("ar").story.discovery, "لقد اكتشفت سراً في موقع Mediatrix Tech!");
});

test("the copy interaction writes localized Story text for every supported locale", async () => {
  const clipboardWrites = [];
  const previousClipboard = Object.getOwnPropertyDescriptor(globalThis.navigator, "clipboard");
  Object.defineProperty(globalThis.navigator, "clipboard", {
    configurable: true,
    value: { writeText: async (value) => clipboardWrites.push(value) },
  });

  try {
    for (const locale of supportedLocales) {
      const expected = buildStoryText(getEasterEggCopy(locale).story);
      assert.equal(await copyStoryText(expected), true);
      assert.equal(clipboardWrites.at(-1), expected);
    }
  } finally {
    if (previousClipboard) Object.defineProperty(globalThis.navigator, "clipboard", previousClipboard);
    else delete globalThis.navigator.clipboard;
  }
});

test("file sharing support falls back safely when unavailable or rejected", () => {
  const file = { name: "story.png" };
  assert.equal(supportsFileSharing({}, file), false);
  assert.equal(supportsFileSharing({ share() {}, canShare: () => false }, file), false);
  assert.equal(supportsFileSharing({ share() {}, canShare: () => true }, file), true);
  assert.equal(supportsFileSharing({ share() {}, canShare: () => { throw new Error("blocked"); } }, file), false);
});
