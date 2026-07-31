import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { getStructuredData, LOCAL_FAQS, LOCAL_ROUTE, PUBLIC_ROUTES, ROUTE_SEO, SITE_ORIGIN } from "../src/seo.js";

test("a página local usa os metadados e a URL canônica definidos", () => {
  const seo = ROUTE_SEO[LOCAL_ROUTE];

  assert.equal(seo.title, "Criação de Sites em Santa Maria RS | Mediatrix Tech");
  assert.equal(seo.description, "Criação de sites profissionais em Santa Maria, RS. Desenvolvemos sites modernos, rápidos e responsivos para empresas, profissionais e eventos.");
  assert.equal(seo.canonical, `${SITE_ORIGIN}/criacao-de-sites-santa-maria-rs`);
});

test("cada rota pública possui title, description e canonical exclusivos", () => {
  const entries = PUBLIC_ROUTES.map((route) => ROUTE_SEO[route]);

  assert.equal(new Set(entries.map(({ title }) => title)).size, entries.length);
  assert.equal(new Set(entries.map(({ description }) => description)).size, entries.length);
  assert.equal(new Set(entries.map(({ canonical }) => canonical)).size, entries.length);
  entries.forEach(({ canonical }) => assert.match(canonical, /^https:\/\/www\.mediatrix-tech\.com\//));
});

test("o JSON-LD local usa somente informações publicadas e FAQ visível", () => {
  const data = getStructuredData(LOCAL_ROUTE, ROUTE_SEO[LOCAL_ROUTE]);
  const types = data["@graph"].map((item) => item["@type"]);
  const faqPage = data["@graph"].find((item) => item["@type"] === "FAQPage");
  const breadcrumb = data["@graph"].find((item) => item["@type"] === "BreadcrumbList");
  const serialized = JSON.stringify(data);

  assert.deepEqual(types, ["Organization", "WebSite", "WebPage", "ProfessionalService", "BreadcrumbList", "FAQPage"]);
  assert.deepEqual(faqPage.mainEntity.map(({ name }) => name), LOCAL_FAQS.map(([question]) => question));
  assert.deepEqual(breadcrumb.itemListElement.map(({ name }) => name), ["Início", "Criação de Sites em Santa Maria RS"]);
  assert.doesNotMatch(serialized, /"address"|PostalAddress|Mediatrix Tech LLC|state of formation/i);
  assert.doesNotThrow(() => JSON.parse(serialized));
});

test("sitemap e robots usam HTTPS e excluem a área privada", async () => {
  const [sitemap, robots] = await Promise.all([
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
    readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
  ]);

  for (const route of ["/servicos", "/portfolio", "/empresa", "/contato", LOCAL_ROUTE]) {
    assert.match(sitemap, new RegExp(`${SITE_ORIGIN}${route}`));
  }
  assert.doesNotMatch(sitemap, /area-interna/);
  assert.match(robots, /Disallow: \/area-interna\//);
  assert.match(robots, new RegExp(`Sitemap: ${SITE_ORIGIN}/sitemap\\.xml`));
});

test("a página local mantém um único H1 e apresenta todas as respostas do FAQ", async () => {
  const source = await readFile(new URL("../src/LocalSantaMariaLanding.jsx", import.meta.url), "utf8");

  assert.equal((source.match(/<h1\b/g) || []).length, 1);
  assert.match(source, /Criação de sites profissionais em Santa Maria, RS/);
  assert.match(source, /LOCAL_FAQS\.map/);
});
