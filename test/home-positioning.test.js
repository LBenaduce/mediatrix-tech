import assert from "node:assert/strict";
import test from "node:test";
import { translations } from "../src/translations.js";

test("a home em português apresenta posicionamento e CTAs concretos", () => {
  const copy = translations["pt-BR"];

  assert.equal(copy.hero.title, "Sites profissionais para empresas que querem ser encontradas e conquistar mais clientes");
  assert.equal(copy.hero.primaryCta, "Solicitar uma avaliação");
  assert.equal(copy.hero.secondaryCta, "Ver projetos");
  assert.equal(copy.services.length, 7);
  assert.deepEqual(copy.services.map(({ id }) => id), ["site", "landing", "custom", "media", "event", "agri", "care"]);
});

test("a home em inglês mantém a mesma proposta de valor", () => {
  const copy = translations.en;

  assert.equal(copy.hero.title, "Professional websites built to help small businesses grow");
  assert.equal(copy.hero.primaryCta, "Request a free website review");
  assert.equal(copy.hero.secondaryCta, "View our work");
  assert.equal(copy.services.length, 7);
});

test("o posicionamento da Mediatrix Tech não antecipa dados jurídicos americanos", () => {
  for (const locale of ["pt-BR", "en"]) {
    const { hero, servicesSection, services, company, contact } = translations[locale];
    const publicPositioning = JSON.stringify({ hero, servicesSection, services, company, contact });

    assert.doesNotMatch(publicPositioning, /Mediatrix Tech LLC/i);
    assert.doesNotMatch(publicPositioning, /estado de constituição|state of formation|endere[cç]o americano|american address/i);
  }
});
