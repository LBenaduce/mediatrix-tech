const STORY_WIDTH = 1080;
const STORY_HEIGHT = 1920;
const STORY_LOGO_URL = "/mediatrix-brand-mark.jpg";
let storyLogoPromise;

function createRoundedRectPath(context, x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  context.lineTo(x + width, y + height - safeRadius);
  context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  context.lineTo(x + safeRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
  context.closePath();
}

function segmentText(text, locale) {
  if (typeof Intl.Segmenter === "function") {
    return [...new Intl.Segmenter(locale, { granularity: "word" }).segment(text.trim())]
      .map(({ segment }) => segment)
      .filter((segment) => segment.trim());
  }
  return text.trim().split(/\s+/);
}

function wrapText(context, text, maxWidth, locale) {
  const words = segmentText(text, locale);
  const usesSpaces = !/^(zh|ja)(-|$)/i.test(locale);
  const lines = [];
  let currentLine = "";

  words.forEach((word) => {
    const separator = currentLine && usesSpaces && !/^[\p{P}\p{S}]/u.test(word) ? " " : "";
    const candidate = currentLine ? `${currentLine}${separator}${word}` : word;
    if (currentLine && context.measureText(candidate).width > maxWidth) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = candidate;
    }
  });

  if (currentLine) lines.push(currentLine);
  return lines;
}

function fitAchievementTitle(context, title, maxWidth, locale) {
  let fontSize = 112;
  let lines = [];

  while (fontSize >= 60) {
    context.font = `800 ${fontSize}px Inter, Arial, sans-serif`;
    lines = wrapText(context, title, maxWidth, locale);
    if (lines.length <= 3 && lines.every((line) => context.measureText(line).width <= maxWidth)) break;
    fontSize -= 4;
  }

  return { fontSize, lines };
}

function drawCenteredLines(context, lines, centerY, lineHeight) {
  const firstBaseline = centerY - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, index) => context.fillText(line, STORY_WIDTH / 2, firstBaseline + index * lineHeight));
}

const storyThemes = {
  default: { brand: "#f7f8fa", badgeBackground: "rgba(101, 187, 239, 0.12)", badgeBorder: "rgba(101, 187, 239, 0.36)", badgeText: "#91d3f5", title: "#f0d18e", titleShadow: "rgba(216, 178, 103, 0.18)", separator: "rgba(255, 255, 255, 0.12)", body: "#e8edf2", accent: "#65bbef", muted: "#aab4c2", tagline: "#f7f8fa", marker: "rgba(101, 187, 239, 0.72)" },
  archive: { brand: "#1b2830", badgeBackground: "#dbe4e8", badgeBorder: "#8aa0aa", badgeText: "#315e76", title: "#213f50", titleShadow: "rgba(0, 0, 0, 0)", separator: "rgba(39, 52, 59, 0.22)", body: "#26343b", accent: "#2d6d91", muted: "#59656b", tagline: "#26343b", marker: "#587786" },
};

function drawLogo(context, logo, theme) {
  const maxLogoSize = 154;
  const scale = Math.min(maxLogoSize / logo.naturalWidth, maxLogoSize / logo.naturalHeight);
  const logoWidth = logo.naturalWidth * scale;
  const logoHeight = logo.naturalHeight * scale;
  const logoX = 154 + (maxLogoSize - logoWidth) / 2;
  const logoY = 240 + (maxLogoSize - logoHeight) / 2;

  context.save();
  createRoundedRectPath(context, 144, 230, 174, 174, 32);
  context.clip();
  context.fillStyle = "#02050a";
  context.fillRect(144, 230, 174, 174);
  context.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
  context.restore();

  context.strokeStyle = "rgba(101, 187, 239, 0.36)";
  context.lineWidth = 2;
  createRoundedRectPath(context, 144, 230, 174, 174, 32);
  context.stroke();

  context.fillStyle = theme.brand;
  context.font = "800 45px Inter, Arial, sans-serif";
  context.textAlign = "left";
  context.fillText("MEDIATRIX", 358, 304);
  context.fillStyle = "#65bbef";
  context.font = "700 30px Inter, Arial, sans-serif";
  context.fillText("TECH", 358, 352);
}

function drawStoryBackground(context) {
  context.fillStyle = "#070a0f";
  context.fillRect(0, 0, STORY_WIDTH, STORY_HEIGHT);

  const blueGlow = context.createRadialGradient(840, 310, 0, 840, 310, 820);
  blueGlow.addColorStop(0, "rgba(42, 147, 218, 0.34)");
  blueGlow.addColorStop(0.48, "rgba(22, 72, 109, 0.12)");
  blueGlow.addColorStop(1, "rgba(7, 10, 15, 0)");
  context.fillStyle = blueGlow;
  context.fillRect(0, 0, STORY_WIDTH, STORY_HEIGHT);

  const goldGlow = context.createRadialGradient(160, 1540, 0, 160, 1540, 620);
  goldGlow.addColorStop(0, "rgba(216, 178, 103, 0.2)");
  goldGlow.addColorStop(1, "rgba(7, 10, 15, 0)");
  context.fillStyle = goldGlow;
  context.fillRect(0, 900, STORY_WIDTH, 1020);

  context.save();
  context.strokeStyle = "rgba(101, 187, 239, 0.055)";
  context.lineWidth = 1;
  for (let x = 0; x <= STORY_WIDTH; x += 72) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, STORY_HEIGHT);
    context.stroke();
  }
  for (let y = 0; y <= STORY_HEIGHT; y += 72) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(STORY_WIDTH, y);
    context.stroke();
  }
  context.restore();

  context.strokeStyle = "rgba(255, 255, 255, 0.1)";
  context.lineWidth = 2;
  createRoundedRectPath(context, 80, 150, 920, 1620, 52);
  context.stroke();

  context.strokeStyle = "rgba(101, 187, 239, 0.28)";
  context.lineWidth = 4;
  context.beginPath();
  context.arc(930, 168, 165, Math.PI * 0.55, Math.PI * 1.45);
  context.stroke();
  context.strokeStyle = "rgba(216, 178, 103, 0.24)";
  context.beginPath();
  context.arc(126, 1750, 190, Math.PI * 1.55, Math.PI * 0.45);
  context.stroke();
}

function drawArchiveStoryBackground(context) {
  context.fillStyle = "#ece7dd";
  context.fillRect(0, 0, STORY_WIDTH, STORY_HEIGHT);
  context.fillStyle = "#f7f3ea";
  context.fillRect(80, 150, 920, 1620);
  context.strokeStyle = "rgba(57, 70, 76, 0.32)";
  context.lineWidth = 2;
  createRoundedRectPath(context, 80, 150, 920, 1620, 24);
  context.stroke();
  context.strokeStyle = "rgba(57, 70, 76, 0.08)";
  context.lineWidth = 1;
  for (let y = 190; y < 1740; y += 74) {
    context.beginPath();
    context.moveTo(110, y);
    context.lineTo(970, y);
    context.stroke();
  }
}

function fitSingleLineText(context, text, maxWidth, startSize, minimumSize, fontFamily) {
  let fontSize = startSize;
  while (fontSize > minimumSize) {
    context.font = `700 ${fontSize}px ${fontFamily}`;
    if (context.measureText(text).width <= maxWidth) break;
    fontSize -= 2;
  }
  return fontSize;
}

function drawStoryContent(context, achievementTitle, logo, story, locale, variant) {
  const theme = storyThemes[variant] || storyThemes.default;
  drawLogo(context, logo, theme);

  context.textAlign = "center";
  context.textBaseline = "middle";

  context.fillStyle = theme.badgeBackground;
  createRoundedRectPath(context, 300, 515, 480, 70, 35);
  context.fill();
  context.strokeStyle = theme.badgeBorder;
  context.lineWidth = 2;
  context.stroke();
  context.fillStyle = theme.badgeText;
  const badgeFont = fitSingleLineText(context, story.achievementUnlocked, 420, 25, 17, "ui-monospace, SFMono-Regular, Menlo, monospace");
  context.font = `700 ${badgeFont}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  context.fillText(story.achievementUnlocked, STORY_WIDTH / 2, 551);

  const { fontSize, lines: titleLines } = fitAchievementTitle(context, achievementTitle, 820, locale);
  context.fillStyle = theme.title;
  context.font = `800 ${fontSize}px Inter, Arial, sans-serif`;
  context.textAlign = "center";
  context.shadowColor = theme.titleShadow;
  context.shadowBlur = variant === "archive" ? 0 : 28;
  drawCenteredLines(context, titleLines, 800, fontSize * 1.08);
  context.shadowBlur = 0;

  context.fillStyle = theme.separator;
  context.fillRect(190, 1010, 700, 2);

  context.fillStyle = theme.body;
  context.font = "600 48px Inter, Arial, sans-serif";
  const discoveryLines = wrapText(context, story.discovery, 790, locale);
  drawCenteredLines(context, discoveryLines, 1150, 68);

  context.fillStyle = theme.accent;
  context.font = "800 46px Inter, Arial, sans-serif";
  context.fillText("@mediatrixtech", STORY_WIDTH / 2, 1385);

  context.fillStyle = theme.muted;
  context.font = "600 34px Inter, Arial, sans-serif";
  context.fillText("mediatrix-tech.com", STORY_WIDTH / 2, 1470);

  context.fillStyle = theme.separator;
  context.fillRect(310, 1545, 460, 2);
  context.fillStyle = theme.tagline;
  context.font = "700 34px Inter, Arial, sans-serif";
  const taglineFont = fitSingleLineText(context, story.tagline, 720, 34, 24, "Inter, system-ui, sans-serif");
  context.font = `700 ${taglineFont}px Inter, system-ui, sans-serif`;
  context.fillText(story.tagline, STORY_WIDTH / 2, 1615);

  context.fillStyle = theme.marker;
  context.font = "500 23px ui-monospace, SFMono-Regular, Menlo, monospace";
  const secretFont = fitSingleLineText(context, story.secretFound, 700, 23, 17, "ui-monospace, SFMono-Regular, Menlo, monospace");
  context.font = `500 ${secretFont}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  context.fillText(story.secretFound, STORY_WIDTH / 2, 1680);
}

function dataUrlToFile(dataUrl, fileName) {
  const [metadata, encodedData] = dataUrl.split(",");
  const mimeType = metadata.match(/data:(.*?);base64/)?.[1] || "image/png";
  const binaryData = window.atob(encodedData);
  const bytes = new Uint8Array(binaryData.length);

  for (let index = 0; index < binaryData.length; index += 1) {
    bytes[index] = binaryData.charCodeAt(index);
  }

  return new File([bytes], fileName, { type: mimeType, lastModified: Date.now() });
}

function achievementFileName(achievementTitle) {
  const safeTitle = achievementTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return `mediatrix-${safeTitle || "achievement"}-story.png`;
}

export function loadStoryLogo() {
  if (!storyLogoPromise) {
    storyLogoPromise = new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("story-logo-load"));
      image.src = STORY_LOGO_URL;
    }).catch((error) => {
      storyLogoPromise = undefined;
      throw error;
    });
  }

  return storyLogoPromise;
}

export function createAchievementStoryFile(achievementTitle, logo, story, locale = "en", variant = "default") {
  if (!achievementTitle?.trim()) throw new Error("story-achievement-title");
  if (!logo?.complete || !logo.naturalWidth || !logo.naturalHeight) throw new Error("story-logo-not-ready");

  const canvas = document.createElement("canvas");
  canvas.width = STORY_WIDTH;
  canvas.height = STORY_HEIGHT;
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) throw new Error("story-canvas-unavailable");

  if (variant === "archive") drawArchiveStoryBackground(context);
  else drawStoryBackground(context);
  context.direction = locale === "ar" ? "rtl" : "ltr";
  drawStoryContent(context, achievementTitle.trim(), logo, story, locale, variant);

  return dataUrlToFile(canvas.toDataURL("image/png"), achievementFileName(achievementTitle));
}

export function buildStoryText(story) {
  return `${story.discovery} 🔍\n\n${story.question}\n\n@mediatrixtech\nhttps://mediatrix-tech.com`;
}

export function supportsFileSharing(navigatorLike, file) {
  if (typeof navigatorLike?.share !== "function" || typeof navigatorLike?.canShare !== "function") return false;
  try {
    return navigatorLike.canShare({ files: [file] });
  } catch {
    return false;
  }
}

export async function copyStoryText(storyText) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(storyText);
      return true;
    } catch {
      // Fall through to the selection-based copy for browsers that block Clipboard API access.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = storyText;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  return copied;
}

export function downloadStoryFile(file) {
  const objectUrl = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = file.name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}
