import {
  createSessionToken,
  noStore,
  requirePost,
  sessionCookie,
  verifyPassword,
} from "../_lib/auth.js";

export default function handler(request, response) {
  noStore(response);
  if (!requirePost(request, response)) return;

  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const sessionSecret = process.env.SESSION_SECRET;
  if (!passwordHash || !sessionSecret) {
    response.status(503).json({ error: "A área interna ainda não foi configurada." });
    return;
  }

  let password;
  try {
    password = typeof request.body === "string"
      ? JSON.parse(request.body || "{}").password
      : request.body?.password;
  } catch {
    response.status(400).json({ error: "Requisição inválida." });
    return;
  }

  if (!verifyPassword(password, passwordHash)) {
    response.status(401).json({ error: "Senha inválida." });
    return;
  }

  try {
    response.setHeader("Set-Cookie", sessionCookie(createSessionToken(sessionSecret)));
    response.status(200).json({ authenticated: true });
  } catch {
    response.status(503).json({ error: "A configuração de sessão é inválida." });
  }
}
