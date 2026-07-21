import test from "node:test";
import assert from "node:assert/strict";
import { mediatrixArchive, publicMediatrixArchive } from "../src/data/mediatrixArchive.js";
import {
  ARCHIVE_ACHIEVEMENTS_KEY,
  ARCHIVE_PASSWORD,
  ARCHIVE_SESSION_KEY,
  chooseArchiveItem,
  isArchivePassword,
  readArchiveSession,
  readUnlockedAchievements,
  unlockArchiveAchievements,
  writeArchiveSession,
} from "../src/easter-eggs/archiveSelection.js";

test("archive photos require the exact slash password", () => {
  assert.equal(ARCHIVE_PASSWORD, `${"/".repeat(9)}${"\\".repeat(19)}`);
  assert.equal(isArchivePassword(ARCHIVE_PASSWORD), true);
  assert.equal(isArchivePassword(`${ARCHIVE_PASSWORD} `), false);
  assert.equal(isArchivePassword(`${"/".repeat(9)}${"\\".repeat(18)}`), false);
  assert.equal(isArchivePassword(""), false);
});

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
  };
}

function deterministicRandom(values) {
  let index = 0;
  return () => values[index++ % values.length];
}

test("only explicitly public archive records are eligible", () => {
  assert.equal(mediatrixArchive.length, 22);
  assert.equal(publicMediatrixArchive.length, 7);
  assert.ok(publicMediatrixArchive.every((item) => item.public === true));
  assert.ok(publicMediatrixArchive.every((item) => item.image.endsWith(".webp")));
  assert.equal(publicMediatrixArchive.filter((item) => item.rarity === "legendary").length, 1);
  assert.ok(mediatrixArchive.filter((item) => !item.public).every((item) => item.developerNote));
});

test("selection prefers unseen items and never repeats consecutively", () => {
  let state = { seenIds: [], cycleIds: [], lastId: null };
  const firstCycle = [];
  const random = deterministicRandom([0.12, 0.73, 0.42, 0.91, 0.31, 0.64, 0.02]);

  for (let index = 0; index < publicMediatrixArchive.length; index += 1) {
    const result = chooseArchiveItem(publicMediatrixArchive, state, random);
    assert.notEqual(result.item.id, state.lastId);
    firstCycle.push(result.item.id);
    state = result.state;
  }

  assert.equal(new Set(firstCycle).size, publicMediatrixArchive.length);
  assert.equal(state.seenIds.length, publicMediatrixArchive.length);

  const afterReset = chooseArchiveItem(publicMediatrixArchive, state, random);
  assert.notEqual(afterReset.item.id, state.lastId);
  assert.equal(afterReset.state.cycleIds.length, 1);
  assert.equal(afterReset.state.seenIds.length, publicMediatrixArchive.length);
});

test("an empty selected rarity pool falls back without looping", () => {
  const rareOnly = [{ id: "only-rare", rarity: "rare" }];
  const result = chooseArchiveItem(rareOnly, {}, () => 0.99);
  assert.equal(result.item.id, "only-rare");
});

test("weighted rarity selection can reach common, uncommon, rare, and legendary pools", () => {
  const items = [
    { id: "common", rarity: "common" },
    { id: "uncommon", rarity: "uncommon" },
    { id: "rare", rarity: "rare" },
    { id: "legendary", rarity: "legendary" },
  ];
  const expectations = [
    [0.1, "common"],
    [0.7, "uncommon"],
    [0.92, "rare"],
    [0.995, "legendary"],
  ];

  for (const [rarityRoll, expected] of expectations) {
    const result = chooseArchiveItem(items, {}, deterministicRandom([rarityRoll, 0]));
    assert.equal(result.item.rarity, expected);
  }
});

test("session history persists and invalid records are filtered", () => {
  const storage = memoryStorage();
  const state = { seenIds: [publicMediatrixArchive[0].id], cycleIds: [publicMediatrixArchive[0].id], lastId: publicMediatrixArchive[0].id };
  writeArchiveSession(storage, state);
  assert.deepEqual(readArchiveSession(storage, publicMediatrixArchive), state);

  storage.setItem(ARCHIVE_SESSION_KEY, JSON.stringify({ seenIds: ["private-item"], cycleIds: ["private-item"], lastId: "private-item" }));
  assert.deepEqual(readArchiveSession(storage, publicMediatrixArchive), { seenIds: [], cycleIds: [], lastId: null });
});

test("achievements persist once and do not unlock repeatedly", () => {
  const storage = memoryStorage();
  const first = unlockArchiveAchievements(storage, new Set(), ["curiosityWon", "archiveExplorer"]);
  assert.deepEqual(first.newlyUnlocked, ["curiosityWon", "archiveExplorer"]);
  assert.deepEqual(readUnlockedAchievements(storage), new Set(["curiosityWon", "archiveExplorer"]));

  const second = unlockArchiveAchievements(storage, first.unlocked, ["curiosityWon"]);
  assert.deepEqual(second.newlyUnlocked, []);
  assert.equal(JSON.parse(storage.getItem(ARCHIVE_ACHIEVEMENTS_KEY)).length, 2);
});

test("storage failures degrade to an in-memory session", () => {
  const blockedStorage = {
    getItem: () => { throw new Error("blocked"); },
    setItem: () => { throw new Error("blocked"); },
  };
  assert.deepEqual(readArchiveSession(blockedStorage, publicMediatrixArchive), { seenIds: [], cycleIds: [], lastId: null });
  assert.deepEqual(readUnlockedAchievements(blockedStorage), new Set());
  assert.doesNotThrow(() => writeArchiveSession(blockedStorage, { seenIds: [], cycleIds: [], lastId: null }));
});
