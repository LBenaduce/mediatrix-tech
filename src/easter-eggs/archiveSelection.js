export const ARCHIVE_SESSION_KEY = "mediatrix-digital-junk-drawer-session";
export const ARCHIVE_ACHIEVEMENTS_KEY = "mediatrix-digital-junk-drawer-achievements";

export const rarityWeights = {
  common: 0.65,
  uncommon: 0.23,
  rare: 0.1,
  legendary: 0.02,
};

const rarityOrder = Object.keys(rarityWeights);

function chooseWeightedRarity(availableRarities, random = Math.random) {
  const total = availableRarities.reduce((sum, rarity) => sum + rarityWeights[rarity], 0);
  let cursor = random() * total;

  for (const rarity of availableRarities) {
    cursor -= rarityWeights[rarity];
    if (cursor < 0) return rarity;
  }

  return availableRarities.at(-1);
}

export function chooseArchiveItem(items, state = {}, random = Math.random) {
  if (!items.length) return { item: null, state: { seenIds: [], cycleIds: [], lastId: null } };

  const eligibleIds = new Set(items.map((item) => item.id));
  const seenIds = [...new Set((state.seenIds || []).filter((id) => eligibleIds.has(id)))];
  let cycleIds = [...new Set((state.cycleIds || []).filter((id) => eligibleIds.has(id)))];
  const lastId = eligibleIds.has(state.lastId) ? state.lastId : null;

  let candidates = items.filter((item) => !cycleIds.includes(item.id) && item.id !== lastId);
  if (!candidates.length) {
    cycleIds = [];
    candidates = items.filter((item) => item.id !== lastId);
  }
  if (!candidates.length) candidates = [...items];

  const availableRarities = rarityOrder.filter((rarity) => candidates.some((item) => item.rarity === rarity));
  const rarity = chooseWeightedRarity(availableRarities, random);
  const rarityPool = candidates.filter((item) => item.rarity === rarity);
  const item = rarityPool[Math.min(rarityPool.length - 1, Math.floor(random() * rarityPool.length))];

  return {
    item,
    state: {
      seenIds: seenIds.includes(item.id) ? seenIds : [...seenIds, item.id],
      cycleIds: [...cycleIds, item.id],
      lastId: item.id,
    },
  };
}

export function readArchiveSession(storage, eligibleItems) {
  try {
    const parsed = JSON.parse(storage?.getItem(ARCHIVE_SESSION_KEY) || "null");
    const eligibleIds = new Set(eligibleItems.map((item) => item.id));
    return {
      seenIds: [...new Set((parsed?.seenIds || []).filter((id) => eligibleIds.has(id)))],
      cycleIds: [...new Set((parsed?.cycleIds || []).filter((id) => eligibleIds.has(id)))],
      lastId: eligibleIds.has(parsed?.lastId) ? parsed.lastId : null,
    };
  } catch {
    return { seenIds: [], cycleIds: [], lastId: null };
  }
}

export function writeArchiveSession(storage, state) {
  try {
    storage?.setItem(ARCHIVE_SESSION_KEY, JSON.stringify(state));
  } catch {
    // The in-memory session remains fully functional when storage is unavailable.
  }
}

export function readUnlockedAchievements(storage) {
  try {
    const value = JSON.parse(storage?.getItem(ARCHIVE_ACHIEVEMENTS_KEY) || "[]");
    return new Set(Array.isArray(value) ? value.filter((id) => typeof id === "string") : []);
  } catch {
    return new Set();
  }
}

export function unlockArchiveAchievements(storage, currentAchievements, achievementIds) {
  const updated = new Set(currentAchievements);
  const newlyUnlocked = achievementIds.filter((id) => id && !updated.has(id));
  newlyUnlocked.forEach((id) => updated.add(id));

  try {
    storage?.setItem(ARCHIVE_ACHIEVEMENTS_KEY, JSON.stringify([...updated]));
  } catch {
    // Unlocks remain available in memory when storage is unavailable.
  }

  return { newlyUnlocked, unlocked: updated };
}
