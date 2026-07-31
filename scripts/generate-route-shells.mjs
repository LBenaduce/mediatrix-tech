import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_OG_IMAGE, getStructuredData, PUBLIC_ROUTES, ROUTE_SEO } from "../src/seo.js";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distRoot = join(projectRoot, "dist");
const templatePath = join(distRoot, "index.html");
const template = await readFile(templatePath, "utf8");
const verification = process.env.VITE_GOOGLE_SITE_VERIFICATION?.trim();

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function replaceMeta(html, selector, value) {
  const [attribute, key] = selector;
  const matcher = new RegExp(`<meta(?=[^>]*${attribute}=["']${key}["'])[^>]*>`, "i");
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  return matcher.test(html) ? html.replace(matcher, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function renderShell(pathname) {
  const seo = ROUTE_SEO[pathname];
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`)
    .replace(/<link(?=[^>]*rel=["']canonical["'])[^>]*>/i, `<link rel="canonical" href="${seo.canonical}" />`)
    .replace(/<script(?=[^>]*id=["']structured-data["'])[^>]*>[\s\S]*?<\/script>/i, `<script id="structured-data" type="application/ld+json">${JSON.stringify(getStructuredData(pathname, seo)).replaceAll("<", "\\u003c")}</script>`);

  html = replaceMeta(html, ["name", "description"], seo.description);
  html = replaceMeta(html, ["name", "robots"], "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  html = replaceMeta(html, ["property", "og:type"], "website");
  html = replaceMeta(html, ["property", "og:site_name"], "Mediatrix Tech");
  html = replaceMeta(html, ["property", "og:locale"], seo.locale);
  html = replaceMeta(html, ["property", "og:url"], seo.canonical);
  html = replaceMeta(html, ["property", "og:title"], seo.title);
  html = replaceMeta(html, ["property", "og:description"], seo.description);
  html = replaceMeta(html, ["property", "og:image"], DEFAULT_OG_IMAGE);
  html = replaceMeta(html, ["name", "twitter:card"], "summary_large_image");
  html = replaceMeta(html, ["name", "twitter:title"], seo.title);
  html = replaceMeta(html, ["name", "twitter:description"], seo.description);
  html = replaceMeta(html, ["name", "twitter:image"], DEFAULT_OG_IMAGE);

  const oldVerification = /\s*<meta(?=[^>]*name=["']google-site-verification["'])[^>]*>\s*/i;
  html = html.replace(oldVerification, "\n");
  if (verification) html = html.replace("</head>", `    <meta name="google-site-verification" content="${escapeHtml(verification)}" />\n  </head>`);
  return html;
}

for (const pathname of PUBLIC_ROUTES) {
  const outputPath = pathname === "/" ? templatePath : join(distRoot, pathname.slice(1), "index.html");
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, renderShell(pathname));
}

console.log(`Generated SEO route shells for ${PUBLIC_ROUTES.length} public routes.`);
