import http from "node:http";
import { createServer as createViteServer } from "vite";
import login from "../api/admin/login.js";
import logout from "../api/admin/logout.js";
import session from "../api/admin/session.js";

const port = Number(process.env.PORT || 4173);
const vite = await createViteServer({ server: { middlewareMode: true, hmr: false }, appType: "spa" });
const apiHandlers = new Map([
  ["/api/admin/login", login],
  ["/api/admin/logout", logout],
  ["/api/admin/session", session],
]);

const server = http.createServer((request, response) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
  const handler = apiHandlers.get(pathname);
  if (!handler) {
    vite.middlewares(request, response);
    return;
  }

  const chunks = [];
  request.on("data", (chunk) => chunks.push(chunk));
  request.on("end", () => {
    const body = Buffer.concat(chunks).toString("utf8");
    request.body = body;
    response.status = (statusCode) => {
      response.statusCode = statusCode;
      return response;
    };
    response.json = (value) => {
      response.setHeader("Content-Type", "application/json; charset=utf-8");
      response.end(JSON.stringify(value));
    };
    handler(request, response);
  });
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Área interna local: http://127.0.0.1:${port}/area-interna/orcamentos`);
});
