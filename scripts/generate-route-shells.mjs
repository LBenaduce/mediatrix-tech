import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { DEFAULT_OG_IMAGE, getLanguageAlternates, getStructuredData, PUBLIC_ROUTES, ROUTE_SEO, SITE_ORIGIN } from "../src/seo.js";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const distRoot = join(projectRoot, "dist");
const templatePath = join(distRoot, "index.html");
const template = await readFile(templatePath, "utf8");
const verification = process.env.VITE_GOOGLE_SITE_VERIFICATION?.trim();
const serverEntryPath = join(projectRoot, ".ssr", "entry-server.js");
const { renderRoute } = await import(pathToFileURL(serverEntryPath).href);

const notFoundSeo = {
  title: "Página não encontrada | Mediatrix Tech",
  description: "A página solicitada não existe ou foi movida. Volte ao site da Mediatrix Tech para continuar navegando.",
  canonical: null,
  locale: "pt_BR",
};

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function replaceMeta(html, selector, value) {
  const [attribute, key] = selector;
  const matcher = new RegExp(`<meta(?=[^>]*${attribute}=["']${key}["'])[^>]*>`, "i");
  const tag = `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  return matcher.test(html) ? html.replace(matcher, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function renderShell(pathname, {
  seo = ROUTE_SEO[pathname],
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  structuredData = seo.canonical ? getStructuredData(pathname, seo) : null,
  markup = "",
} = {}) {
  const language = seo.locale.replace("_", "-");
  const direction = language === "ar" ? "rtl" : "ltr";
  let html = template
    .replace(/<html(?=[^>]*lang=["'])[^>]*>/i, `<html lang="${escapeHtml(language)}" dir="${direction}">`)
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);

  if (seo.canonical) {
    html = html.replace(/<link(?=[^>]*rel=["']canonical["'])[^>]*>/i, `<link rel="canonical" href="${seo.canonical}" />`);
  } else {
    html = html.replace(/\s*<link(?=[^>]*rel=["']canonical["'])[^>]*>\s*/i, "\n");
  }

  const structuredDataMatcher = /<script(?=[^>]*id=["']structured-data["'])[^>]*>[\s\S]*?<\/script>/i;
  if (structuredData) {
    html = html.replace(structuredDataMatcher, `<script id="structured-data" type="application/ld+json">${JSON.stringify(structuredData).replaceAll("<", "\\u003c")}</script>`);
  } else {
    html = html.replace(structuredDataMatcher, "");
  }

  html = replaceMeta(html, ["name", "description"], seo.description);
  html = replaceMeta(html, ["name", "robots"], robots);
  html = replaceMeta(html, ["property", "og:type"], "website");
  html = replaceMeta(html, ["property", "og:site_name"], "Mediatrix Tech");
  html = replaceMeta(html, ["property", "og:locale"], seo.locale);
  html = replaceMeta(html, ["property", "og:url"], seo.canonical || `${SITE_ORIGIN}/404`);
  html = replaceMeta(html, ["property", "og:title"], seo.title);
  html = replaceMeta(html, ["property", "og:description"], seo.description);
  html = replaceMeta(html, ["property", "og:image"], DEFAULT_OG_IMAGE);
  html = replaceMeta(html, ["name", "twitter:card"], "summary_large_image");
  html = replaceMeta(html, ["name", "twitter:title"], seo.title);
  html = replaceMeta(html, ["name", "twitter:description"], seo.description);
  html = replaceMeta(html, ["name", "twitter:image"], DEFAULT_OG_IMAGE);

  html = html.replace(/\s*<link(?=[^>]*data-mediatrix-hreflang)[^>]*>\s*/gi, "\n");
  const alternates = getLanguageAlternates(pathname)
    .map(({ hreflang, href }) => `    <link rel="alternate" hreflang="${escapeHtml(hreflang)}" href="${escapeHtml(href)}" data-mediatrix-hreflang="true" />`)
    .join("\n");
  if (alternates) html = html.replace("</head>", `${alternates}\n  </head>`);

  html = html.replace(/\s*<link(?=[^>]*rel=["']preload["'])(?=[^>]*href=["']\/(?:hero-background-optimized\.jpg|mediatrix-header-poster\.jpg)["'])[^>]*>\s*/gi, "\n");
  if (alternates) {
    const preloads = [
      "    <link rel=\"preload\" as=\"image\" href=\"/hero-background-optimized.jpg\" fetchpriority=\"high\" />",
      "    <link rel=\"preload\" as=\"image\" href=\"/mediatrix-header-poster.jpg\" fetchpriority=\"high\" />",
    ].join("\n");
    html = html.replace("</head>", `${preloads}\n  </head>`);
  }

  const oldVerification = /\s*<meta(?=[^>]*name=["']google-site-verification["'])[^>]*>\s*/i;
  html = html.replace(oldVerification, "\n");
  if (verification) html = html.replace("</head>", `    <meta name="google-site-verification" content="${escapeHtml(verification)}" />\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
  return html;
}

for (const pathname of PUBLIC_ROUTES) {
  const outputPath = pathname === "/" ? templatePath : join(distRoot, pathname.slice(1), "index.html");
  await mkdir(dirname(outputPath), { recursive: true });
  const markup = pathname === "/" ? "" : renderRoute(pathname);
  await writeFile(outputPath, renderShell(pathname, { markup }));
}

const notFoundMarkup = renderRoute("/404", { initialLanguage: "pt-BR" });
await writeFile(join(distRoot, "404.html"), renderShell("/404", {
  seo: notFoundSeo,
  robots: "noindex, nofollow, noarchive",
  structuredData: null,
  markup: notFoundMarkup,
}));

console.log(`Generated prerendered HTML for ${PUBLIC_ROUTES.length} public routes and a custom 404 page.`);
