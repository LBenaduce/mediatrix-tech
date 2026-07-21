export const STORY_TEXT = `I discovered a secret on the Mediatrix Tech website! 🔍

Can you find it too?

@mediatrixtech
https://mediatrix-tech.com`;

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

function wrapText(context, text, maxWidth) {
  const words = text.trim().split(/\s+/);
  const lines = [];
  let currentLine = "";

  words.forEach((word) => {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
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

function fitAchievementTitle(context, title, maxWidth) {
  let fontSize = 112;
  let lines = [];

  while (fontSize >= 60) {
    context.font = `800 ${fontSize}px Inter, Arial, sans-serif`;
    lines = wrapText(context, title, maxWidth);
    if (lines.length <= 3 && lines.every((line) => context.measureText(line).width <= maxWidth)) break;
    fontSize -= 4;
  }

  return { fontSize, lines };
}

function drawCenteredLines(context, lines, centerY, lineHeight) {
  const firstBaseline = centerY - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, index) => context.fillText(line, STORY_WIDTH / 2, firstBaseline + index * lineHeight));
}

function drawLogo(context, logo) {
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

  context.fillStyle = "#f7f8fa";
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

function drawStoryContent(context, achievementTitle, logo) {
  drawLogo(context, logo);

  context.textAlign = "center";
  context.textBaseline = "middle";

  context.fillStyle = "rgba(101, 187, 239, 0.12)";
  createRoundedRectPath(context, 300, 515, 480, 70, 35);
  context.fill();
  context.strokeStyle = "rgba(101, 187, 239, 0.36)";
  context.lineWidth = 2;
  context.stroke();
  context.fillStyle = "#91d3f5";
  context.font = "700 25px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillText("ACHIEVEMENT UNLOCKED", STORY_WIDTH / 2, 551);

  const { fontSize, lines: titleLines } = fitAchievementTitle(context, achievementTitle, 820);
  context.fillStyle = "#f0d18e";
  context.font = `800 ${fontSize}px Inter, Arial, sans-serif`;
  context.textAlign = "center";
  context.shadowColor = "rgba(216, 178, 103, 0.18)";
  context.shadowBlur = 28;
  drawCenteredLines(context, titleLines, 800, fontSize * 1.08);
  context.shadowBlur = 0;

  context.fillStyle = "rgba(255, 255, 255, 0.12)";
  context.fillRect(190, 1010, 700, 2);

  context.fillStyle = "#e8edf2";
  context.font = "600 48px Inter, Arial, sans-serif";
  const discoveryLines = wrapText(context, "I discovered a secret on the Mediatrix Tech website.", 790);
  drawCenteredLines(context, discoveryLines, 1150, 68);

  context.fillStyle = "#65bbef";
  context.font = "800 46px Inter, Arial, sans-serif";
  context.fillText("@mediatrixtech", STORY_WIDTH / 2, 1385);

  context.fillStyle = "#aab4c2";
  context.font = "600 34px Inter, Arial, sans-serif";
  context.fillText("mediatrix-tech.com", STORY_WIDTH / 2, 1470);

  context.fillStyle = "rgba(255, 255, 255, 0.12)";
  context.fillRect(310, 1545, 460, 2);
  context.fillStyle = "#f7f8fa";
  context.font = "700 34px Inter, Arial, sans-serif";
  context.fillText("Create. Connect. Convert.", STORY_WIDTH / 2, 1615);

  context.fillStyle = "rgba(101, 187, 239, 0.72)";
  context.font = "500 23px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillText("> SECRET FOUND_", STORY_WIDTH / 2, 1680);
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
      image.onerror = () => reject(new Error("Unable to load the Mediatrix Tech logo."));
      image.src = STORY_LOGO_URL;
    }).catch((error) => {
      storyLogoPromise = undefined;
      throw error;
    });
  }

  return storyLogoPromise;
}

export function createAchievementStoryFile(achievementTitle, logo) {
  if (!achievementTitle?.trim()) throw new Error("An achievement title is required.");
  if (!logo?.complete || !logo.naturalWidth || !logo.naturalHeight) throw new Error("The Mediatrix Tech logo is not ready.");

  const canvas = document.createElement("canvas");
  canvas.width = STORY_WIDTH;
  canvas.height = STORY_HEIGHT;
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) throw new Error("Canvas image generation is unavailable.");

  drawStoryBackground(context);
  drawStoryContent(context, achievementTitle.trim(), logo);

  return dataUrlToFile(canvas.toDataURL("image/png"), achievementFileName(achievementTitle));
}

export async function copyStoryText() {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(STORY_TEXT);
      return true;
    } catch {
      // Fall through to the selection-based copy for browsers that block Clipboard API access.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = STORY_TEXT;
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
