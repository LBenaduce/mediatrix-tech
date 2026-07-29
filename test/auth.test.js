import assert from "node:assert/strict";
import test from "node:test";
import {
  createPasswordHash,
  createSessionToken,
  expiredSessionCookie,
  sessionCookie,
  verifyPassword,
  verifySessionToken,
} from "../api/_lib/auth.js";

test("valida senha somente contra hash scrypt", () => {
  const hash = createPasswordHash("uma-senha-longa-e-segura");
  assert.equal(verifyPassword("uma-senha-longa-e-segura", hash), true);
  assert.equal(verifyPassword("senha-incorreta", hash), false);
  assert.equal(hash.includes("uma-senha-longa-e-segura"), false);
});

test("assina, valida e expira uma sessão", () => {
  const secret = "segredo-de-sessao-com-mais-de-trinta-e-dois-caracteres";
  const now = Date.UTC(2026, 6, 29);
  const token = createSessionToken(secret, now);
  assert.equal(verifySessionToken(token, secret, now + 1000), true);
  assert.equal(verifySessionToken(`${token}alterado`, secret, now + 1000), false);
  assert.equal(verifySessionToken(token, secret, now + 9 * 60 * 60 * 1000), false);
});

test("cookies de sessão usam os atributos de segurança requeridos", () => {
  const cookie = sessionCookie("token");
  assert.match(cookie, /HttpOnly/);
  assert.match(cookie, /Secure/);
  assert.match(cookie, /SameSite=Strict/);
  assert.match(cookie, /Path=\//);
  assert.match(expiredSessionCookie(), /Max-Age=0/);
});
