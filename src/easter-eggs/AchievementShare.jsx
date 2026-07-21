import React from "react";
import { Check, Copy, Instagram, Share2 } from "lucide-react";
import {
  buildStoryText,
  copyStoryText,
  createAchievementStoryFile,
  downloadStoryFile,
  loadStoryLogo,
  supportsFileSharing,
} from "./storySharing";
import { formatEasterEggText, useEasterEggI18n } from "./EasterEggI18n";

export function AchievementShare({ achievementId, achievement: achievementOverride, labels = {}, onBusyChange, shareInvitation, storyVariant = "default" }) {
  const { copy, locale } = useEasterEggI18n();
  const achievement = achievementOverride || copy.achievements[achievementId];
  const achievementTitle = achievement.name;
  const storyCopy = achievementOverride ? { ...copy.story, discovery: achievement.message } : copy.story;
  const storyText = shareInvitation
    ? `${achievementTitle}\n${achievement.message}\n\n${shareInvitation}\n\n@mediatrixtech\nhttps://mediatrix-tech.com/`
    : buildStoryText(copy.story);
  const ui = { ...copy.share, ...labels };
  const logoRef = React.useRef(null);
  const copiedTimerRef = React.useRef(null);
  const [assetState, setAssetState] = React.useState("loading");
  const [busy, setBusy] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [feedbackKey, setFeedbackKey] = React.useState("");
  const [fallbackUsed, setFallbackUsed] = React.useState(false);
  const [fallbackCopyFailed, setFallbackCopyFailed] = React.useState(false);

  React.useEffect(() => {
    onBusyChange?.(busy);
    return () => onBusyChange?.(false);
  }, [busy, onBusyChange]);

  React.useEffect(() => {
    let active = true;
    loadStoryLogo()
      .then((logo) => {
        if (!active) return;
        logoRef.current = logo;
        setAssetState("ready");
      })
      .catch(() => {
        if (!active) return;
        setAssetState("error");
        setFeedbackKey("assetUnavailable");
      });

    return () => {
      active = false;
      if (copiedTimerRef.current) window.clearTimeout(copiedTimerRef.current);
    };
  }, []);

  const markCopied = () => {
    setCopied(true);
    if (copiedTimerRef.current) window.clearTimeout(copiedTimerRef.current);
    copiedTimerRef.current = window.setTimeout(() => setCopied(false), 2200);
  };

  const handleCopy = async () => {
    try {
      const wasCopied = await copyStoryText(storyText);
      if (!wasCopied) throw new Error("story-copy-unavailable");
      markCopied();
      setFeedbackKey("copySuccess");
    } catch {
      setFeedbackKey("copyFailure");
    }
  };

  const useFallback = async (storyFile) => {
    downloadStoryFile(storyFile);
    const wasCopied = await copyStoryText(storyText).catch(() => false);
    if (wasCopied) markCopied();
    setFallbackCopyFailed(!wasCopied);
    setFallbackUsed(true);
    setFeedbackKey("");
  };

  const handleShare = async () => {
    if (busy) return;
    setBusy(true);
    setFallbackUsed(false);
    setFallbackCopyFailed(false);
    setFeedbackKey("");

    try {
      const logo = logoRef.current || await loadStoryLogo();
      logoRef.current = logo;
      setAssetState("ready");
      const storyFile = createAchievementStoryFile(achievementTitle, logo, storyCopy, locale, storyVariant);
      const shareData = {
        files: [storyFile],
        text: storyText,
        title: formatEasterEggText(ui.dialogTitle, { achievement: achievementTitle }),
      };
      const canShareFile = supportsFileSharing(navigator, storyFile);

      if (canShareFile) {
        try {
          await navigator.share(shareData);
          setFeedbackKey("shareCompleted");
        } catch (error) {
          if (error?.name === "AbortError") {
            setFeedbackKey("shareCanceled");
          } else {
            await useFallback(storyFile);
          }
        }
      } else {
        await useFallback(storyFile);
      }
    } catch {
      setAssetState("error");
      setFeedbackKey("createFailure");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="achievement-share" aria-label={formatEasterEggText(ui.regionLabel, { achievement: achievementTitle })}>
      <div className="achievement-share-actions">
        <button
          className="achievement-share-button primary"
          type="button"
          onClick={handleShare}
          disabled={busy || assetState === "loading"}
          aria-label={formatEasterEggText(ui.shareAria, { achievement: achievementTitle })}
          aria-busy={busy}
        >
          <Share2 size={17} aria-hidden="true" />
          {busy ? ui.creating : ui.shareButton}
        </button>
        <button
          className="achievement-share-button secondary"
          type="button"
          onClick={handleCopy}
          aria-label={ui.copyAria}
        >
          {copied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
          {copied ? ui.copied : ui.copyButton}
        </button>
      </div>

      <p className="achievement-share-note">
        {ui.note}
      </p>

      {feedbackKey && <p className="achievement-share-feedback" role="status" aria-live="polite">{ui[feedbackKey]}</p>}

      {fallbackUsed && (
        <div className="achievement-share-fallback">
          <p role="status">{ui.fallbackInstructions}</p>
          {fallbackCopyFailed && <small>{ui.fallbackCopyFailure}</small>}
          <a
            href="https://www.instagram.com/mediatrixtech/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ui.instagramAria}
          >
            <Instagram size={17} aria-hidden="true" /> {ui.openInstagram}
          </a>
        </div>
      )}
    </div>
  );
}
