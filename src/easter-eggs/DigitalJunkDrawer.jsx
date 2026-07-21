import React from "react";
import { createPortal } from "react-dom";
import { Archive, Shuffle, X } from "lucide-react";
import { publicMediatrixArchive } from "../data/mediatrixArchive";
import { AchievementShare } from "./AchievementShare";
import { formatEasterEggText, useEasterEggI18n } from "./EasterEggI18n";
import {
  chooseArchiveItem,
  isArchivePassword,
  readArchiveSession,
  readUnlockedAchievements,
  unlockArchiveAchievements,
  writeArchiveSession,
} from "./archiveSelection";
import { useAccessibleModal } from "./useAccessibleModal";

function achievementIdsFor(item, seenCount, total) {
  if (!total) return [];
  return [
    seenCount >= 5 ? "archiveExplorer" : null,
    seenCount >= total ? "digitalArchaeologist" : null,
    item?.rarity === "legendary" ? "legendaryMemory" : null,
  ].filter(Boolean);
}

function getBrowserStorage(name) {
  try {
    return window[name];
  } catch {
    return null;
  }
}

function archiveTranslation(drawer, key) {
  return key.split(".").reduce((value, part) => value?.[part], drawer.items) || "";
}

export default function DigitalJunkDrawer({ isOpen, onClose, returnFocusRef }) {
  const { copy, locale } = useEasterEggI18n();
  const drawer = copy.digitalJunkDrawer;
  const numberFormat = React.useMemo(() => new Intl.NumberFormat(locale, { minimumIntegerDigits: 2, useGrouping: false }), [locale]);
  const countFormat = React.useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const dialogRef = React.useRef(null);
  const primaryActionRef = React.useRef(null);
  const closeButtonRef = React.useRef(null);
  const sessionStorageRef = React.useRef(getBrowserStorage("sessionStorage"));
  const localStorageRef = React.useRef(getBrowserStorage("localStorage"));
  const sessionRef = React.useRef(readArchiveSession(sessionStorageRef.current, publicMediatrixArchive));
  const unlockedRef = React.useRef(readUnlockedAchievements(localStorageRef.current));
  const [phase, setPhase] = React.useState("warning");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [item, setItem] = React.useState(null);
  const [progress, setProgress] = React.useState(sessionRef.current.seenIds.length);
  const [explanation, setExplanation] = React.useState("");
  const [imageFailed, setImageFailed] = React.useState(false);
  const [achievementQueue, setAchievementQueue] = React.useState([]);
  const [shareBusy, setShareBusy] = React.useState(false);
  const shareBusyRef = React.useRef(false);
  const titleId = React.useId();
  const descriptionId = React.useId();

  const requestClose = React.useCallback(() => {
    if (!shareBusyRef.current) onClose();
  }, [onClose]);

  const handleShareBusyChange = React.useCallback((busy) => {
    shareBusyRef.current = busy;
    setShareBusy(busy);
  }, []);

  useAccessibleModal({
    dialogRef,
    initialFocusRef: primaryActionRef,
    isOpen,
    onClose: requestClose,
    returnFocusRef,
  });

  React.useEffect(() => {
    if (isOpen) return;
    setPhase("warning");
    setPassword("");
    setPasswordError(false);
    setItem(null);
  }, [isOpen]);

  React.useEffect(() => {
    if (phase !== "viewer") return undefined;
    const frame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [phase]);

  const queueNewAchievements = React.useCallback((ids) => {
    const result = unlockArchiveAchievements(localStorageRef.current, unlockedRef.current, ids);
    unlockedRef.current = result.unlocked;
    if (result.newlyUnlocked.length) {
      setAchievementQueue((current) => [...current, ...result.newlyUnlocked.filter((id) => !current.includes(id))]);
    }
  }, []);

  const showAnother = React.useCallback((extraAchievementIds = []) => {
    const result = chooseArchiveItem(publicMediatrixArchive, sessionRef.current);
    sessionRef.current = result.state;
    writeArchiveSession(sessionStorageRef.current, result.state);
    setItem(result.item);
    setProgress(result.state.seenIds.length);
    setExplanation("");
    setImageFailed(false);
    queueNewAchievements([
      ...extraAchievementIds,
      ...achievementIdsFor(result.item, result.state.seenIds.length, publicMediatrixArchive.length),
    ]);
  }, [queueNewAchievements]);

  const openDrawer = (event) => {
    event.preventDefault();
    if (!isArchivePassword(password)) {
      setPasswordError(true);
      return;
    }
    showAnother(["curiosityWon"]);
    setPhase("viewer");
    setPassword("");
    setPasswordError(false);
  };

  const toggleExplanation = () => {
    if (explanation) {
      setExplanation("");
      return;
    }
    const explanations = drawer.explanations;
    setExplanation(explanations[Math.floor(Math.random() * explanations.length)]);
  };

  if (!isOpen) return null;

  const currentAchievementId = achievementQueue[0];
  const currentAchievement = currentAchievementId ? drawer.achievements[currentAchievementId] : null;
  const itemCopy = item ? {
    title: archiveTranslation(drawer, item.titleKey),
    caption: archiveTranslation(drawer, item.captionKey),
    alt: archiveTranslation(drawer, item.altKey),
  } : null;

  return createPortal(
    <div
      className="junk-drawer-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) requestClose();
      }}
    >
      <section
        ref={dialogRef}
        className={`junk-drawer-dialog ${phase === "viewer" ? "is-viewer" : "is-warning"}`}
        role="dialog"
        aria-modal="true"
        aria-label={phase === "warning" ? drawer.warning.label : drawer.viewer.label}
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex="-1"
      >
        {phase === "warning" ? (
          <div className="junk-drawer-warning">
            <span className="junk-drawer-warning-icon" aria-hidden="true"><Archive size={28} /></span>
            <h2 id={titleId}>{drawer.warning.title}</h2>
            <p id={descriptionId}>{drawer.warning.text}</p>
            <form className="junk-drawer-password-form" onSubmit={openDrawer}>
              <label htmlFor={`${titleId}-password`}>{drawer.warning.passwordLabel}</label>
              <input
                ref={primaryActionRef}
                id={`${titleId}-password`}
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (passwordError) setPasswordError(false);
                }}
                autoComplete="off"
                autoCapitalize="none"
                spellCheck="false"
                aria-invalid={passwordError}
                aria-describedby={passwordError ? `${titleId}-password-error` : undefined}
              />
              {passwordError && <p id={`${titleId}-password-error`} className="junk-drawer-password-error" role="alert">{drawer.warning.passwordError}</p>}
              <div className="junk-drawer-warning-actions">
                <button className="junk-drawer-button primary" type="submit">{drawer.warning.open}</button>
                <button className="junk-drawer-button secondary" type="button" onClick={requestClose}>{drawer.warning.back}</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="junk-drawer-viewer">
            <header className="junk-drawer-header">
              <div>
                <p>{item ? formatEasterEggText(drawer.viewer.memory, { current: numberFormat.format(item.archiveNumber), total: numberFormat.format(publicMediatrixArchive.length) }) : ""}</p>
                <h2 id={titleId}>{drawer.viewer.title}</h2>
              </div>
              <button ref={closeButtonRef} className="junk-drawer-close" type="button" onClick={requestClose} disabled={shareBusy} aria-label={drawer.viewer.close}>
                <X size={20} aria-hidden="true" />
              </button>
            </header>

            {!item ? (
              <div className="junk-drawer-empty" id={descriptionId}>
                <h3>{drawer.viewer.emptyTitle}</h3>
                <p>{drawer.viewer.emptyText}</p>
              </div>
            ) : (
              <div className={`junk-drawer-memory rarity-${item.rarity}`}>
                <figure className="junk-drawer-figure">
                  {!imageFailed ? (
                    <img
                      src={item.image}
                      width={item.width}
                      height={item.height}
                      alt={itemCopy.alt}
                      loading="lazy"
                      onError={() => setImageFailed(true)}
                    />
                  ) : (
                    <div className="junk-drawer-image-error" role="status">{drawer.viewer.imageError}</div>
                  )}
                  <figcaption>
                    <span aria-label={formatEasterEggText(drawer.viewer.rarityLabel, { rarity: drawer.rarities[item.rarity] })}>{drawer.rarities[item.rarity]}</span>
                    <span aria-label={formatEasterEggText(drawer.viewer.categoryLabel, { category: drawer.categories[item.category] })}>{drawer.categories[item.category]}</span>
                  </figcaption>
                </figure>

                <div className="junk-drawer-copy">
                  <h3 id={descriptionId}>{itemCopy.title}</h3>
                  <p>{itemCopy.caption}</p>
                  {item.approximateYear && <time>{item.approximateYear}</time>}
                  <button className="junk-drawer-why" type="button" onClick={toggleExplanation} aria-expanded={Boolean(explanation)}>
                    {explanation ? drawer.viewer.hideWhy : drawer.viewer.why}
                  </button>
                  {explanation && <p className="junk-drawer-explanation" role="status">{explanation}</p>}
                  <div className="junk-drawer-controls">
                    <button className="junk-drawer-button primary" type="button" onClick={() => showAnother()}>
                      <Shuffle size={17} aria-hidden="true" /> {drawer.viewer.another}
                    </button>
                    <p aria-live="polite">{progress === 1 ? drawer.viewer.progressOne : formatEasterEggText(drawer.viewer.progress, { count: countFormat.format(progress) })}</p>
                  </div>
                </div>
              </div>
            )}

            {currentAchievement && (
              <aside className="junk-drawer-achievement" aria-label={drawer.achievement.label} aria-live="polite">
                <p>{drawer.achievement.eyebrow}</p>
                <h3>{currentAchievement.name}</h3>
                <p>{currentAchievement.message}</p>
                <button className="junk-drawer-continue" type="button" onClick={() => setAchievementQueue((current) => current.slice(1))}>{drawer.achievement.continue}</button>
                <AchievementShare
                  achievement={currentAchievement}
                  shareInvitation={drawer.achievement.invitation}
                  labels={{
                    shareButton: drawer.achievement.shareButton,
                    copyButton: drawer.achievement.copyButton,
                    dialogTitle: drawer.achievement.shareTitle,
                  }}
                  onBusyChange={handleShareBusyChange}
                  storyVariant="archive"
                />
              </aside>
            )}
          </div>
        )}
      </section>
    </div>,
    document.body,
  );
}
