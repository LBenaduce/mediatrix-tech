import assert from "node:assert/strict";
import test from "node:test";
import { translations } from "../src/translations.js";

test("a home em português apresenta posicionamento e CTAs concretos", () => {
  const copy = translations["pt-BR"];

  assert.equal(copy.hero.title, "Mais clientes. Mais receita. Crescimento da receita até 27% mais rápido.*");
  assert.match(copy.hero.footnote, /Deloitte Access Economics/);
  assert.equal(copy.hero.primaryCta, "Solicitar uma avaliação");
  assert.equal(copy.hero.secondaryCta, "Ver projetos");
  assert.equal(copy.services.length, 7);
  assert.deepEqual(copy.services.map(({ id }) => id), ["site", "landing", "custom", "media", "event", "agri", "care"]);
  assert.match(copy.company.localSeo.text, /Santa Maria.+Rio Grande do Sul.+Brasil e do mundo/);
  assert.equal(copy.company.localSeo.link, "Criação de sites em Santa Maria, RS");
});

test("a home em inglês mantém a mesma proposta de valor", () => {
  const copy = translations.en;
  const homepageServices = copy.services.filter(({ id }) => id !== "media");

  assert.equal(copy.hero.title, "More clients. More income. Up to 27% faster revenue growth.*");
  assert.equal(copy.hero.footnote, "*Based on Deloitte Access Economics research comparing advanced digitally engaged SMBs with offline businesses.");
  assert.equal(copy.hero.primaryCta, "Request a free website review");
  assert.equal(copy.hero.secondaryCta, "View our work");
  assert.equal(copy.servicesSection.title, "What we can build for you");
  assert.equal(copy.services.length, 7);
  assert.deepEqual(homepageServices.map(({ shortTitle, title }) => shortTitle || title), [
    "Professional Websites",
    "Landing Pages",
    "Custom Web Solutions",
    "Event & QR Websites",
    "Agribusiness Solutions",
    "Website Care & Support",
  ]);
  assert.deepEqual(homepageServices.map(({ subtitle }) => subtitle), [
    "Build trust. Attract more clients.",
    "Turn visitors into leads and sales.",
    "Tools built around your business.",
    "Simple experiences people love to use.",
    "Digital tools built for agriculture.",
    "Updates, improvements, and ongoing support.",
  ]);
  assert.ok(copy.services.some(({ id }) => id === "media"));
});

test("todos os idiomas exibem seis ofertas concisas na home e preservam edição de mídia", () => {
  for (const locale of ["pt-BR", "en", "es", "fr", "de", "zh-CN", "hi", "ar"]) {
    const copy = translations[locale];
    const homepageServices = copy.services.filter(({ id }) => id !== "media");

    assert.equal(homepageServices.length, 6);
    assert.ok(copy.services.some(({ id }) => id === "media"));
    homepageServices.forEach(({ shortTitle, title, subtitle }) => {
      assert.ok((shortTitle || title).length > 0);
      assert.ok(subtitle.length > 0);
    });
  }
});

test("a colaboração internacional de IA comunica escopo sem identificar o cliente", () => {
  const project = translations.en.projects.find(({ type }) => type === "collaboration");

  assert.equal(project.name, "International AI Data Project");
  assert.equal(project.category, "AI Training & Data Collection");
  assert.equal(project.description, "Contributed to a large-scale AI training initiative through structured data collection, validation, and quality-controlled delivery.");
  assert.deepEqual(project.tags, ["AI Training Data", "Data Collection", "Quality Assurance"]);
  assert.deepEqual(project.metrics, [
    { value: "30+ hours", label: "Structured data delivered" },
  ]);
  assert.doesNotMatch(JSON.stringify(project), /upwork|milestone/i);

  for (const locale of ["pt-BR", "en", "es", "fr", "de", "zh-CN", "hi", "ar"]) {
    const localizedProject = translations[locale].projects.find(({ type }) => type === "collaboration");
    assert.ok(localizedProject);
    assert.equal(localizedProject.tags.length, 3);
    assert.equal(localizedProject.metrics.length, 1);
    assert.doesNotMatch(JSON.stringify(localizedProject), /https?:\/\//i);
  }
});

test("os canais de contato exibem os dois números do WhatsApp", () => {
  for (const locale of ["pt-BR", "en", "es", "fr", "de", "zh-CN", "hi", "ar"]) {
    assert.deepEqual(translations[locale].contact.channels.slice(0, 2), [
      ["WhatsApp", "+1 305 992 0833"],
      ["WhatsApp", "+55 55 99935-7388"],
    ]);
    assert.equal(translations[locale].contact.channels.length, 4);
  }
});

test("a apresentação da empresa usa o novo texto em todos os idiomas", () => {
  assert.deepEqual(translations["pt-BR"].company.facts, [
    ["Conduzido por pessoas", "Pessoas reais. Comunicação direta."],
    ["Feito para você", "Soluções moldadas ao seu negócio."],
    ["Processo claro", "Comunicação simples. Sem complexidade desnecessária."],
    ["No mundo todo", "Trabalhando com empresas onde quer que estejam."],
  ]);

  assert.equal(translations.en.company.description, "Real people building clear, useful digital solutions around real business needs.");
  assert.deepEqual(translations.en.company.facts, [
    ["Human-led", "Real people. Direct communication."],
    ["Built around you", "Solutions shaped around your business."],
    ["Clear process", "Simple communication. No unnecessary complexity."],
    ["Worldwide", "Working with businesses wherever they are."],
  ]);

  for (const locale of ["pt-BR", "en", "es", "fr", "de", "zh-CN", "hi", "ar"]) {
    assert.equal(translations[locale].company.title, "Made by Humans");
    assert.equal(translations[locale].company.location, undefined);
    assert.equal(translations[locale].company.facts.length, 4);
    assert.ok(translations[locale].company.localSeo.text.length > 0);
    assert.ok(translations[locale].company.localSeo.link.length > 0);
    translations[locale].company.facts.forEach(([title, description]) => {
      assert.ok(title.length > 0);
      assert.ok(description.length > 0);
    });
  }
});

test("o posicionamento da Mediatrix Tech não antecipa dados jurídicos americanos", () => {
  for (const locale of ["pt-BR", "en"]) {
    const { hero, servicesSection, services, company, contact } = translations[locale];
    const publicPositioning = JSON.stringify({ hero, servicesSection, services, company, contact });

    assert.doesNotMatch(publicPositioning, /Mediatrix Tech LLC/i);
    assert.doesNotMatch(publicPositioning, /estado de constituição|state of formation|endere[cç]o americano|american address/i);
  }
});
