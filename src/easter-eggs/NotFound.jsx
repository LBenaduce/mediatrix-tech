import React from "react";
import { ArrowLeft, Code2 } from "lucide-react";
import { AchievementModal } from "./AchievementModal";
import { formatEasterEggText, useEasterEggI18n } from "./EasterEggI18n";
import { rtlLanguages } from "../translations";

const objectPositions = [
  { x: 9, y: -6, rotation: 5 },
  { x: -8, y: 4, rotation: -4 },
  { x: 6, y: 7, rotation: 3 },
  { x: -5, y: -7, rotation: -3 },
  { x: 0, y: 0, rotation: 0 },
];

export function NotFound() {
  const { copy, locale } = useEasterEggI18n();
  const bugHunter = copy.achievements.bugHunter;
  const [clicks, setClicks] = React.useState(0);
  const [positionIndex, setPositionIndex] = React.useState(-1);
  const [achievementOpen, setAchievementOpen] = React.useState(false);
  const objectButtonRef = React.useRef(null);
  const achievementUnlocked = clicks >= 5;
  const position = positionIndex >= 0 ? objectPositions[positionIndex % objectPositions.length] : objectPositions[4];

  React.useEffect(() => {
    const previousTitle = document.title;
    const previousLanguage = document.documentElement.lang;
    const previousDirection = document.documentElement.dir;
    const existingRobots = document.querySelector('meta[name="robots"]');
    const previousRobotsContent = existingRobots?.getAttribute("content");
    const robots = existingRobots || document.createElement("meta");

    document.documentElement.lang = locale;
    document.documentElement.dir = rtlLanguages.has(locale) ? "rtl" : "ltr";
    document.title = copy.notFound.pageTitle;
    robots.setAttribute("name", "robots");
    robots.setAttribute("content", "noindex");
    if (!existingRobots) document.head.appendChild(robots);

    return () => {
      document.title = previousTitle;
      document.documentElement.lang = previousLanguage;
      document.documentElement.dir = previousDirection;
      if (existingRobots) {
        if (previousRobotsContent === null) existingRobots.removeAttribute("content");
        else existingRobots.setAttribute("content", previousRobotsContent);
      } else {
        robots.remove();
      }
    };
  }, [copy.notFound.pageTitle, locale]);

  React.useEffect(() => {
    if (achievementUnlocked) setAchievementOpen(true);
  }, [achievementUnlocked]);

  const moveObject = () => {
    setPositionIndex((current) => current + 1);
    setClicks((current) => Math.min(current + 1, 5));
  };

  return (
    <main className="not-found-page">
      <div className="not-found-grid" aria-hidden="true" />
      <section className="not-found-card" aria-labelledby="not-found-title">
        <a className="not-found-brand" href="/" aria-label={copy.notFound.homeAria}>
          <img src="/mediatrix-brand-mark.jpg" alt="" width="38" height="38" />
          <span>Mediatrix Tech</span>
        </a>

        <div className="not-found-content">
          <p className="not-found-code" aria-hidden="true">{copy.notFound.code}</p>
          <h1 id="not-found-title">404</h1>
          <p className="not-found-message">{copy.notFound.message}</p>
          <a className="button primary not-found-home" href="/">
            <ArrowLeft size={18} aria-hidden="true" /> {copy.notFound.returnHome}
          </a>
        </div>

        <div className="not-found-object-area">
          <button
            ref={objectButtonRef}
            className="not-found-object"
            type="button"
            onClick={moveObject}
            aria-label={copy.notFound.objectAria}
            style={{
              "--object-x": `${position.x}px`,
              "--object-y": `${position.y}px`,
              "--object-rotation": `${position.rotation}deg`,
            }}
          >
            <Code2 size={38} strokeWidth={1.6} aria-hidden="true" />
          </button>
          <p className="not-found-hint" aria-hidden="true">{copy.notFound.objectHint}</p>
          <p className="not-found-achievement" role="status" aria-live="polite">
            {achievementUnlocked ? formatEasterEggText(copy.common.achievementUnlocked, { achievement: bugHunter.name }) : ""}
          </p>
        </div>
      </section>
      <AchievementModal
        achievementId="bugHunter"
        isOpen={achievementOpen}
        onClose={() => setAchievementOpen(false)}
        returnFocusRef={objectButtonRef}
      />
    </main>
  );
}
