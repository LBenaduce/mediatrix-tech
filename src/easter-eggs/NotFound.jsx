import React from "react";
import { ArrowLeft, Code2 } from "lucide-react";
import { AchievementModal } from "./AchievementModal";

const objectPositions = [
  { x: 9, y: -6, rotation: 5 },
  { x: -8, y: 4, rotation: -4 },
  { x: 6, y: 7, rotation: 3 },
  { x: -5, y: -7, rotation: -3 },
  { x: 0, y: 0, rotation: 0 },
];

export function NotFound() {
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

    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    document.title = "404 | Mediatrix Tech";
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
  }, []);

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
        <a className="not-found-brand" href="/" aria-label="Mediatrix Tech homepage">
          <img src="/mediatrix-brand-mark.jpg" alt="" width="38" height="38" />
          <span>Mediatrix Tech</span>
        </a>

        <div className="not-found-content">
          <p className="not-found-code" aria-hidden="true">HTTP / LOST_SIGNAL</p>
          <h1 id="not-found-title">404</h1>
          <p className="not-found-message">This page escaped into another dimension.</p>
          <a className="button primary not-found-home" href="/">
            <ArrowLeft size={18} aria-hidden="true" /> Return to homepage
          </a>
        </div>

        <div className="not-found-object-area">
          <button
            ref={objectButtonRef}
            className="not-found-object"
            type="button"
            onClick={moveObject}
            aria-label="Interactive code object. Activate five times to investigate."
            style={{
              "--object-x": `${position.x}px`,
              "--object-y": `${position.y}px`,
              "--object-rotation": `${position.rotation}deg`,
            }}
          >
            <Code2 size={38} strokeWidth={1.6} aria-hidden="true" />
          </button>
          <p className="not-found-hint" aria-hidden="true">unstable object</p>
          <p className="not-found-achievement" role="status" aria-live="polite">
            {achievementUnlocked ? "Achievement unlocked: Bug Hunter" : ""}
          </p>
        </div>
      </section>
      <AchievementModal
        achievementTitle="Bug Hunter"
        isOpen={achievementOpen}
        onClose={() => setAchievementOpen(false)}
        returnFocusRef={objectButtonRef}
      />
    </main>
  );
}
