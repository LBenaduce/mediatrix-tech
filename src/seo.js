import { languageRoutes, supportedLanguages } from "./i18n.js";
import { translations } from "./translations.js";

export const SITE_ORIGIN = "https://www.mediatrix-tech.com";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-home.png`;

export const LOCAL_ROUTE = "/criacao-de-sites-santa-maria-rs";

export const LOCAL_FAQS = [
  [
    "Quanto custa criar um site em Santa Maria?",
    "O investimento depende do número de páginas, do conteúdo e das funcionalidades. Antes de começar, definimos o escopo e apresentamos um orçamento claro para o projeto.",
  ],
  [
    "A Mediatrix Tech atende somente em Santa Maria?",
    "Não. Atendemos empresas e profissionais de Santa Maria e região, além de desenvolver projetos remotamente para outras cidades do Brasil e para clientes no exterior.",
  ],
  [
    "O site funciona bem no celular?",
    "Sim. Cada projeto é desenvolvido com layout responsivo para oferecer uma experiência consistente em celulares, tablets e computadores.",
  ],
  [
    "É possível integrar o site ao WhatsApp e às redes sociais?",
    "Sim. Podemos incluir botões e caminhos de contato para WhatsApp e perfis sociais de acordo com os canais usados pela sua empresa.",
  ],
  [
    "A Mediatrix Tech também atualiza sites existentes?",
    "Sim. Avaliamos melhorias de conteúdo, desempenho, experiência de uso e manutenção técnica conforme a estrutura atual do site.",
  ],
];

const localizedHomeSeo = Object.fromEntries(
  supportedLanguages.map((locale) => {
    const pathname = languageRoutes[locale];
    return [pathname, {
      title: translations[locale].metaTitle,
      description: translations[locale].metaDescription,
      canonical: `${SITE_ORIGIN}${pathname}`,
      locale: locale.replace("-", "_"),
    }];
  }),
);

export const ROUTE_SEO = {
  "/": {
    title: translations.en.metaTitle,
    description: translations.en.metaDescription,
    canonical: `${SITE_ORIGIN}${languageRoutes.en}`,
    locale: "en",
  },
  ...localizedHomeSeo,
  "/servicos": {
    title: "Serviços de criação de sites e soluções digitais | Mediatrix Tech",
    description: "Sites institucionais, landing pages, páginas para eventos, manutenção e soluções digitais personalizadas para empresas e profissionais.",
    canonical: `${SITE_ORIGIN}/servicos`,
    locale: "pt_BR",
  },
  "/portfolio": {
    title: "Portfólio de sites e projetos digitais | Mediatrix Tech",
    description: "Conheça projetos reais de sites, experiências para eventos e soluções digitais desenvolvidas pela Mediatrix Tech.",
    canonical: `${SITE_ORIGIN}/portfolio`,
    locale: "pt_BR",
  },
  "/empresa": {
    title: "Sobre a Mediatrix Tech | Desenvolvimento digital com cuidado",
    description: "Conheça a empresa familiar Mediatrix Tech e nossa forma responsável, cuidadosa e transparente de desenvolver projetos digitais.",
    canonical: `${SITE_ORIGIN}/empresa`,
    locale: "pt_BR",
  },
  "/contato": {
    title: "Contato e orçamento de site | Mediatrix Tech",
    description: "Fale com a Mediatrix Tech para solicitar uma avaliação inicial, tirar dúvidas ou pedir orçamento para seu projeto digital.",
    canonical: `${SITE_ORIGIN}/contato`,
    locale: "pt_BR",
  },
  [LOCAL_ROUTE]: {
    title: "Criação de Sites em Santa Maria RS | Mediatrix Tech",
    description: "Criação de sites profissionais em Santa Maria, RS. Desenvolvemos sites modernos, rápidos e responsivos para empresas, profissionais e eventos.",
    canonical: `${SITE_ORIGIN}${LOCAL_ROUTE}`,
    locale: "pt_BR",
  },
  "/brazil": {
    title: "Sites profissionais para pequenas empresas no Brasil | Mediatrix Tech",
    description: "Sites modernos e responsivos para pequenas empresas no Brasil, com escopo claro, atendimento direto e valores de lançamento.",
    canonical: `${SITE_ORIGIN}/brazil`,
    locale: "pt_BR",
  },
  "/us": {
    title: "Professional websites for small businesses in the US | Mediatrix Tech",
    description: "Modern, mobile-friendly websites for small businesses in the United States, with clear scope and direct developer communication.",
    canonical: `${SITE_ORIGIN}/us`,
    locale: "en_US",
  },
  "/europe": {
    title: "Professional websites for small businesses in Europe | Mediatrix Tech",
    description: "Modern, mobile-friendly websites for European small businesses, with clear scope and direct developer communication.",
    canonical: `${SITE_ORIGIN}/europe`,
    locale: "en_GB",
  },
  "/switzerland": {
    title: "Professional websites for small businesses in Switzerland | Mediatrix Tech",
    description: "Modern, mobile-friendly websites for small businesses in Switzerland, with clear scope and pricing in Swiss francs.",
    canonical: `${SITE_ORIGIN}/switzerland`,
    locale: "en_CH",
  },
  "/brazilian-businesses-abroad": {
    title: "Sites em inglês para brasileiros no exterior | Mediatrix Tech",
    description: "Sites profissionais em inglês ou bilíngues para empresas brasileiras nos Estados Unidos, Europa e outros mercados internacionais.",
    canonical: `${SITE_ORIGIN}/brazilian-businesses-abroad`,
    locale: "pt_BR",
  },
};

export const PUBLIC_ROUTES = Object.keys(ROUTE_SEO);

const organization = {
  "@type": "Organization",
  "@id": `${SITE_ORIGIN}/#organization`,
  name: "Mediatrix Tech",
  url: `${SITE_ORIGIN}/`,
  logo: `${SITE_ORIGIN}/mediatrix-brand-mark.png`,
  email: "mediatrixtech@proton.me",
  telephone: "+55 55 99935-7388",
  sameAs: ["https://www.upwork.com/freelancers/~015020486545a9742b"],
  areaServed: [
    { "@type": "City", name: "Santa Maria" },
    { "@type": "AdministrativeArea", name: "Rio Grande do Sul" },
    { "@type": "Country", name: "Brasil" },
    { "@type": "Place", name: "Atendimento remoto internacional" },
  ],
};

const website = {
  "@type": "WebSite",
  "@id": `${SITE_ORIGIN}/#website`,
  url: `${SITE_ORIGIN}/`,
  name: "Mediatrix Tech",
  publisher: { "@id": `${SITE_ORIGIN}/#organization` },
  inLanguage: supportedLanguages,
};

export function getLanguageAlternates(pathname = "/") {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const localizedRoutes = new Set(Object.values(languageRoutes));
  if (normalizedPath !== "/" && !localizedRoutes.has(normalizedPath)) return [];

  return [
    ...supportedLanguages.map((locale) => ({
      hreflang: locale,
      href: `${SITE_ORIGIN}${languageRoutes[locale]}`,
    })),
    { hreflang: "x-default", href: `${SITE_ORIGIN}/` },
  ];
}

export function getStructuredData(pathname = "/", seo = ROUTE_SEO[pathname] || ROUTE_SEO["/"]) {
  const pageId = `${seo.canonical}#webpage`;
  const graph = [
    organization,
    website,
    {
      "@type": "WebPage",
      "@id": pageId,
      url: seo.canonical,
      name: seo.title,
      description: seo.description,
      isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
      about: { "@id": `${SITE_ORIGIN}/#organization` },
      inLanguage: seo.locale.replace("_", "-"),
    },
  ];

  if (pathname === LOCAL_ROUTE) {
    graph.push(
      {
        "@type": "ProfessionalService",
        "@id": `${seo.canonical}#service`,
        name: "Mediatrix Tech — criação de sites em Santa Maria, RS",
        url: seo.canonical,
        description: seo.description,
        email: "mediatrixtech@proton.me",
        telephone: "+55 55 99935-7388",
        provider: { "@id": `${SITE_ORIGIN}/#organization` },
        areaServed: [
          { "@type": "City", name: "Santa Maria" },
          { "@type": "AdministrativeArea", name: "Rio Grande do Sul" },
          { "@type": "Country", name: "Brasil" },
          { "@type": "Place", name: "Atendimento remoto" },
        ],
        serviceType: "Criação de sites, landing pages e soluções digitais personalizadas",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${seo.canonical}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${SITE_ORIGIN}/` },
          { "@type": "ListItem", position: 2, name: "Criação de Sites em Santa Maria RS", item: seo.canonical },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${seo.canonical}#faq`,
        mainEntity: LOCAL_FAQS.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    );
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

function ensureMeta(selector, attribute, value, keyAttribute, keyValue) {
  let element = document.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(keyAttribute, keyValue);
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

export function applyPageSeo({
  pathname = window.location.pathname.replace(/\/+$/, "") || "/",
  seo = ROUTE_SEO[pathname] || ROUTE_SEO["/"],
  structuredData = getStructuredData(pathname, seo),
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
} = {}) {
  document.title = seo.title;
  ensureMeta('meta[name="description"]', "content", seo.description, "name", "description");
  ensureMeta('meta[name="robots"]', "content", robots, "name", "robots");
  ensureMeta('meta[property="og:type"]', "content", "website", "property", "og:type");
  ensureMeta('meta[property="og:site_name"]', "content", "Mediatrix Tech", "property", "og:site_name");
  ensureMeta('meta[property="og:locale"]', "content", seo.locale, "property", "og:locale");
  ensureMeta('meta[property="og:url"]', "content", seo.canonical, "property", "og:url");
  ensureMeta('meta[property="og:title"]', "content", seo.title, "property", "og:title");
  ensureMeta('meta[property="og:description"]', "content", seo.description, "property", "og:description");
  ensureMeta('meta[property="og:image"]', "content", DEFAULT_OG_IMAGE, "property", "og:image");
  ensureMeta('meta[name="twitter:card"]', "content", "summary_large_image", "name", "twitter:card");
  ensureMeta('meta[name="twitter:title"]', "content", seo.title, "name", "twitter:title");
  ensureMeta('meta[name="twitter:description"]', "content", seo.description, "name", "twitter:description");
  ensureMeta('meta[name="twitter:image"]', "content", DEFAULT_OG_IMAGE, "name", "twitter:image");

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", seo.canonical);

  document.querySelectorAll('link[data-mediatrix-hreflang]').forEach((link) => link.remove());
  for (const alternate of getLanguageAlternates(pathname)) {
    const link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("hreflang", alternate.hreflang);
    link.setAttribute("href", alternate.href);
    link.dataset.mediatrixHreflang = "true";
    document.head.appendChild(link);
  }

  let jsonLd = document.getElementById("structured-data");
  if (!jsonLd) {
    jsonLd = document.createElement("script");
    jsonLd.id = "structured-data";
    jsonLd.type = "application/ld+json";
    document.head.appendChild(jsonLd);
  }
  jsonLd.textContent = JSON.stringify(structuredData).replace(/</g, "\\u003c");
}
