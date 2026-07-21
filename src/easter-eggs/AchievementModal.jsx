import React from "react";
import { createPortal } from "react-dom";
import { Award, X } from "lucide-react";
import { AchievementShare } from "./AchievementShare";
import { useAccessibleModal } from "./useAccessibleModal";

export function AchievementModal({ achievementTitle, isOpen, onClose, returnFocusRef }) {
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
          aria-label={`Close ${achievementTitle} achievement`}
        >
          <X size={18} aria-hidden="true" />
        </button>
        <span className="achievement-modal-icon" aria-hidden="true"><Award size={28} /></span>
        <p className="achievement-modal-eyebrow">Achievement unlocked</p>
        <h2 id={titleId}>{achievementTitle}</h2>
        <p id={descriptionId}>You found one of the hidden details on the Mediatrix Tech website.</p>
        <AchievementShare achievementTitle={achievementTitle} />
      </section>
    </div>,
    document.body,
  );
}
