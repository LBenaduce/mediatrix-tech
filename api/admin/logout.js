import {
  expiredSessionCookie,
  noStore,
  requirePost,
} from "../_lib/auth.js";

export default function handler(request, response) {
  noStore(response);
  if (!requirePost(request, response)) return;
  response.setHeader("Set-Cookie", expiredSessionCookie());
  response.status(200).json({ authenticated: false });
}
