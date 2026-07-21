import React from "react";
import { Check, Copy, Instagram, Share2 } from "lucide-react";
import {
  STORY_TEXT,
  copyStoryText,
  createAchievementStoryFile,
  downloadStoryFile,
  loadStoryLogo,
} from "./storySharing";

const FALLBACK_INSTRUCTIONS = "Story image saved. Open Instagram, create a new Story, select the image and add @mediatrixtech as a mention.";

export function AchievementShare({ achievementTitle }) {
  const logoRef = React.useRef(null);
  const copiedTimerRef = React.useRef(null);
  const [assetState, setAssetState] = React.useState("loading");
  const [busy, setBusy] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");
  const [fallbackUsed, setFallbackUsed] = React.useState(false);
  const [fallbackCopyFailed, setFallbackCopyFailed] = React.useState(false);

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
        setFeedback("The Story image is temporarily unavailable. Please try again.");
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
      const wasCopied = await copyStoryText();
      if (!wasCopied) throw new Error("Copy was unavailable.");
      markCopied();
      setFeedback("Story text copied.");
    } catch {
      setFeedback("We couldn’t copy the Story text automatically. Please try again.");
    }
  };

  const useFallback = async (storyFile) => {
    downloadStoryFile(storyFile);
    const wasCopied = await copyStoryText().catch(() => false);
    if (wasCopied) markCopied();
    setFallbackCopyFailed(!wasCopied);
    setFallbackUsed(true);
    setFeedback("");
  };

  const handleShare = async () => {
    if (busy) return;
    setBusy(true);
    setFallbackUsed(false);
    setFallbackCopyFailed(false);
    setFeedback("");

    try {
      const logo = logoRef.current || await loadStoryLogo();
      logoRef.current = logo;
      setAssetState("ready");
      const storyFile = createAchievementStoryFile(achievementTitle, logo);
      const shareData = {
        files: [storyFile],
        text: STORY_TEXT,
        title: `Mediatrix Tech — ${achievementTitle}`,
      };
      let supportsFileSharing = false;
      if (typeof navigator.share === "function" && typeof navigator.canShare === "function") {
        try {
          supportsFileSharing = navigator.canShare({ files: [storyFile] });
        } catch {
          supportsFileSharing = false;
        }
      }

      if (supportsFileSharing) {
        try {
          await navigator.share(shareData);
          setFeedback("Your device completed the share action. Story publication remains under your control.");
        } catch (error) {
          if (error?.name === "AbortError") {
            setFeedback("Sharing canceled. Nothing was published automatically.");
          } else {
            await useFallback(storyFile);
          }
        }
      } else {
        await useFallback(storyFile);
      }
    } catch {
      setAssetState("error");
      setFeedback("We couldn’t create the Story image. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="achievement-share" aria-label={`Share ${achievementTitle} achievement`}>
      <div className="achievement-share-actions">
        <button
          className="achievement-share-button primary"
          type="button"
          onClick={handleShare}
          disabled={busy || assetState === "loading"}
          aria-label={`Share ${achievementTitle} achievement on Instagram Story`}
          aria-busy={busy}
        >
          <Share2 size={17} aria-hidden="true" />
          {busy ? "Creating Story…" : "Share on Instagram Story"}
        </button>
        <button
          className="achievement-share-button secondary"
          type="button"
          onClick={handleCopy}
          aria-label="Copy suggested Instagram Story text"
        >
          {copied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
          {copied ? "Copied!" : "Copy story text"}
        </button>
      </div>

      <p className="achievement-share-note">
        Choose Instagram from your device’s sharing menu and complete the Story manually.
      </p>

      {feedback && <p className="achievement-share-feedback" role="status" aria-live="polite">{feedback}</p>}

      {fallbackUsed && (
        <div className="achievement-share-fallback">
          <p role="status">{FALLBACK_INSTRUCTIONS}</p>
          {fallbackCopyFailed && <small>The Story text could not be copied automatically. Use “Copy story text” above.</small>}
          <a
            href="https://www.instagram.com/mediatrixtech/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open @mediatrixtech on Instagram in a new tab"
          >
            <Instagram size={17} aria-hidden="true" /> Open @mediatrixtech
          </a>
        </div>
      )}
    </div>
  );
}
