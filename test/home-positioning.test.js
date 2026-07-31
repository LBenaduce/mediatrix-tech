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

test("a apresentação da empresa usa o novo texto em todos os idiomas", () => {
  assert.deepEqual(translations["pt-BR"].company.facts, [
    ["Quem somos", "Somos uma empresa familiar, criada para transformar boas ideias em soluções digitais úteis, bonitas e funcionais. Porque a beleza também importa."],
    ["O que fazemos", "Desenvolvemos projetos digitais com cuidado, elegância e atenção aos detalhes. Para nós, qualidade e responsabilidade vêm sempre em primeiro lugar."],
    ["Como trabalhamos", "Trabalhamos com prazos realistas, comunicação clara e revisão cuidadosa em cada etapa. Não entregamos apenas para terminar: entregamos quando está realmente bem-feito."],
    ["Onde atendemos", "No planeta Terra e arredores."],
  ]);

  assert.equal(translations.en.company.facts[0][0], "Who we are");
  assert.match(translations.en.company.facts[0][1], /family business/);

  for (const locale of ["pt-BR", "en", "es", "fr", "de", "zh-CN", "hi", "ar"]) {
    assert.equal(translations[locale].company.facts.length, 4);
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
