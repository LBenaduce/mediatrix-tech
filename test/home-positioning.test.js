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

  assert.equal(copy.hero.title, "More clients. More income. Up to 27% faster revenue growth.*");
  assert.equal(copy.hero.footnote, "*Based on Deloitte Access Economics research comparing advanced digitally engaged SMBs with offline businesses.");
  assert.equal(copy.hero.primaryCta, "Request a free website review");
  assert.equal(copy.hero.secondaryCta, "View our work");
  assert.equal(copy.services.length, 7);
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
    ["Quem somos", "Somos uma empresa familiar, criada para transformar boas ideias em soluções digitais úteis, bonitas e funcionais. Porque a beleza também importa."],
    ["O que fazemos", "Desenvolvemos projetos digitais com cuidado, elegância e atenção aos detalhes. Para nós, qualidade e responsabilidade vêm sempre em primeiro lugar."],
    ["Como trabalhamos", "Trabalhamos com prazos realistas, comunicação clara e revisão cuidadosa em cada etapa. Não entregamos apenas para terminar: entregamos quando está realmente bem-feito."],
    ["Onde atendemos", "No planeta Terra e arredores."],
  ]);

  assert.equal(translations.en.company.facts[0][0], "Who we are");
  assert.match(translations.en.company.facts[0][1], /family business/);

  for (const locale of ["pt-BR", "en", "es", "fr", "de", "zh-CN", "hi", "ar"]) {
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
