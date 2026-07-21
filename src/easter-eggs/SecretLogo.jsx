import React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { AchievementShare } from "./AchievementShare";
import { formatEasterEggText, useEasterEggI18n } from "./EasterEggI18n";
import { useAccessibleModal } from "./useAccessibleModal";
import { useRapidActivation } from "./useRapidActivation";

const LAB_ACHIEVEMENT_KEY = "mediatrix-achievement-digital-explorer";

function unlockLabAchievement() {
  try {
    if (window.localStorage.getItem(LAB_ACHIEVEMENT_KEY) === "unlocked") return false;
    window.localStorage.setItem(LAB_ACHIEVEMENT_KEY, "unlocked");
    return true;
  } catch {
    return true;
  }
}

function MediatrixLab({ isOpen, isNewlyUnlocked, onClose, returnFocusRef }) {
  const { copy } = useEasterEggI18n();
  const achievement = copy.achievements.digitalExplorer;
  const dialogRef = React.useRef(null);
  const closeButtonRef = React.useRef(null);

  useAccessibleModal({
    dialogRef,
    initialFocusRef: closeButtonRef,
    isOpen,
    onClose,
    returnFocusRef,
  });

  if (!isOpen) return null;

  return createPortal(
    <div
      className="lab-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        className="lab-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mediatrix-lab-title"
        aria-describedby="mediatrix-lab-description"
        tabIndex="-1"
      >
        <div className="lab-window-bar" aria-hidden="true">
          <span /><span /><span />
          <code>lab://mediatrix</code>
        </div>
        <div className="lab-content">
          <p className="lab-prompt" aria-hidden="true">{copy.lab.accessGranted}</p>
          <h2 id="mediatrix-lab-title">{copy.lab.title}</h2>
          <p className="lab-lead">{copy.lab.lead}</p>
          <p id="mediatrix-lab-description">{achievement.description}</p>
          {isNewlyUnlocked && <div className="lab-achievement-panel">
            <p className="lab-achievement" role="status">
              <span aria-hidden="true">◆</span> {formatEasterEggText(copy.common.achievementUnlocked, { achievement: achievement.name })}
            </p>
            <AchievementShare achievementId="digitalExplorer" />
          </div>}
        </div>
        <button ref={closeButtonRef} className="lab-close" type="button" onClick={onClose}>
          <X size={17} aria-hidden="true" /> {copy.lab.close}
        </button>
      </section>
    </div>,
    document.body,
  );
}

export function SecretLogo({ className, href, ariaLabel, onClick, imageSize = 44 }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isNewlyUnlocked, setIsNewlyUnlocked] = React.useState(false);
  const logoRef = React.useRef(null);

  const openLab = React.useCallback(() => {
    setIsNewlyUnlocked(unlockLabAchievement());
    setIsOpen(true);
  }, []);

  const closeLab = React.useCallback(() => {
    setIsOpen(false);
    setIsNewlyUnlocked(false);
  }, []);

  const registerActivation = useRapidActivation({ onActivate: openLab });

  const handleClick = (event) => {
    onClick?.(event);
    registerActivation();
  };

  return (
    <>
      <a ref={logoRef} className={className} href={href} aria-label={ariaLabel} onClick={handleClick}>
        <img src="/mediatrix-brand-mark.jpg" alt="" width={imageSize} height={imageSize} />
        <span>Mediatrix Tech</span>
      </a>
      <MediatrixLab
        isOpen={isOpen}
        isNewlyUnlocked={isNewlyUnlocked}
        onClose={closeLab}
        returnFocusRef={logoRef}
      />
    </>
  );
}
