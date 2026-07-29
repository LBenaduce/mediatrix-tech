import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";

export const SESSION_COOKIE = "itamec_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

function encode(value) {
  return Buffer.from(value).toString("base64url");
}

function decode(value) {
  return Buffer.from(value, "base64url");
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function createPasswordHash(password, salt = randomBytes(16)) {
  if (!password || password.length < 12) {
    throw new Error("A senha deve ter pelo menos 12 caracteres.");
  }
  const derivedKey = scryptSync(password, salt, 64);
  return `scrypt:${encode(salt)}:${encode(derivedKey)}`;
}

export function verifyPassword(password, storedHash) {
  if (typeof password !== "string" || typeof storedHash !== "string") return false;
  const [algorithm, saltValue, hashValue] = storedHash.split(":");
  if (algorithm !== "scrypt" || !saltValue || !hashValue) return false;

  try {
    const expected = decode(hashValue);
    const actual = scryptSync(password, decode(saltValue), expected.length);
    return safeEqual(actual, expected);
  } catch {
    return false;
  }
}

function sign(payload, secret) {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createSessionToken(secret, now = Date.now()) {
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET deve ter pelo menos 32 caracteres.");
  }
  const payload = encode(JSON.stringify({
    issuedAt: now,
    expiresAt: now + SESSION_DURATION_SECONDS * 1000,
    nonce: randomBytes(16).toString("base64url"),
  }));
  return `${payload}.${sign(payload, secret)}`;
}

export function verifySessionToken(token, secret, now = Date.now()) {
  if (!token || !secret) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  try {
    if (!safeEqual(signature, sign(payload, secret))) return false;
    const session = JSON.parse(decode(payload).toString("utf8"));
    return Number.isFinite(session.expiresAt)
      && Number.isFinite(session.issuedAt)
      && session.issuedAt <= now
      && session.expiresAt > now;
  } catch {
    return false;
  }
}

export function readCookie(request, name) {
  const cookieHeader = request.headers.cookie || "";
  for (const part of cookieHeader.split(";")) {
    const [key, ...value] = part.trim().split("=");
    if (key === name) return decodeURIComponent(value.join("="));
  }
  return "";
}

export function sessionCookie(token) {
  return [
    `${SESSION_COOKIE}=${encodeURIComponent(token)}`,
    "Path=/",
    `Max-Age=${SESSION_DURATION_SECONDS}`,
    "HttpOnly",
    "Secure",
    "SameSite=Strict",
  ].join("; ");
}

export function expiredSessionCookie() {
  return [
    `${SESSION_COOKIE}=`,
    "Path=/",
    "Max-Age=0",
    "HttpOnly",
    "Secure",
    "SameSite=Strict",
  ].join("; ");
}

export function requirePost(request, response) {
  if (request.method === "POST") return true;
  response.setHeader("Allow", "POST");
  response.status(405).json({ error: "Método não permitido." });
  return false;
}

export function noStore(response) {
  response.setHeader("Cache-Control", "no-store, max-age=0");
  response.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
}
