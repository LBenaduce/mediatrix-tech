import {
  noStore,
  readCookie,
  SESSION_COOKIE,
  verifySessionToken,
} from "../_lib/auth.js";

export default function handler(request, response) {
  noStore(response);
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    response.status(405).json({ error: "Método não permitido." });
    return;
  }

  const token = readCookie(request, SESSION_COOKIE);
  const authenticated = verifySessionToken(token, process.env.SESSION_SECRET);
  response.status(authenticated ? 200 : 401).json({ authenticated });
}
