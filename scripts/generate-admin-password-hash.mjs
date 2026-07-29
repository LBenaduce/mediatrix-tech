import { createPasswordHash } from "../api/_lib/auth.js";

const password = process.argv[2];
if (!password) {
  console.error('Uso: npm run admin:hash -- "uma-senha-longa-e-unica"');
  process.exitCode = 1;
} else {
  console.log(createPasswordHash(password));
}
