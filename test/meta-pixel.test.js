import assert from "node:assert/strict";
import test from "node:test";
import { initializeMetaPixelTracking, trackMetaEvent } from "../src/metaPixel.js";

test("Meta Pixel is SSR-safe and tracks only subsequent real route changes", async () => {
  assert.equal(trackMetaEvent("Lead"), false);

  const calls = [];
  const listeners = new Map();
  const location = { pathname: "/en" };
  const updatePath = (_state, _title, url) => {
    if (url) location.pathname = new URL(url, "https://www.mediatrix-tech.com").pathname;
  };

  globalThis.window = {
    fbq: (...args) => calls.push(args),
    history: { pushState: updatePath, replaceState: updatePath },
    location,
    addEventListener: (name, listener) => listeners.set(name, listener),
  };
  globalThis.document = {
    addEventListener: (name, listener) => listeners.set(name, listener),
  };

  try {
    initializeMetaPixelTracking();
    assert.deepEqual(calls, []);

    window.history.replaceState({}, "", "/pt");
    await new Promise((resolve) => queueMicrotask(resolve));
    assert.deepEqual(calls, [["track", "PageView"]]);

    window.history.pushState({}, "", "/pt#contato");
    await new Promise((resolve) => queueMicrotask(resolve));
    assert.equal(calls.length, 1);

    listeners.get("click")({ target: { closest: () => ({ href: "https://wa.me/13059920833" }) } });
    assert.deepEqual(calls.at(-1), ["track", "Lead"]);
  } finally {
    delete globalThis.window;
    delete globalThis.document;
  }
});
