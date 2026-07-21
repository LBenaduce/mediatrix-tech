import React from "react";
import { createPortal } from "react-dom";
import { Award, X } from "lucide-react";
import { AchievementShare } from "./AchievementShare";
import { formatEasterEggText, useEasterEggI18n } from "./EasterEggI18n";
import { useAccessibleModal } from "./useAccessibleModal";

export function AchievementModal({ achievementId, isOpen, onClose, returnFocusRef }) {
  const { copy } = useEasterEggI18n();
  const achievement = copy.achievements[achievementId];
  const dialogRef = React.useRef(null);
  const closeButtonRef = React.useRef(null);
  const titleId = React.useId();
  const descriptionId = React.useId();

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
      className="achievement-backdrop"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        className="achievement-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex="-1"
      >
        <button
          ref={closeButtonRef}
          className="achievement-modal-close"
          type="button"
          onClick={onClose}
          aria-label={formatEasterEggText(copy.modal.close, { achievement: achievement.name })}
        >
          <X size={18} aria-hidden="true" />
        </button>
        <span className="achievement-modal-icon" aria-hidden="true"><Award size={28} /></span>
        <p className="achievement-modal-eyebrow">{copy.modal.eyebrow}</p>
        <h2 id={titleId}>{achievement.name}</h2>
        <p id={descriptionId}>{achievement.description}</p>
        <AchievementShare achievementId={achievementId} />
      </section>
    </div>,
    document.body,
  );
}
