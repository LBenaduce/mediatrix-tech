import React from "react";
import { ArrowRight, BrainCircuit, ExternalLink, Mail, MessageCircle } from "lucide-react";
import { EasterEggI18nProvider } from "./easter-eggs/EasterEggI18n";
import { printConsoleGreeting } from "./easter-eggs/consoleGreeting";
import { getEasterEggCopy, translations } from "./translations";
import { BRAZIL_WHATSAPP, PublicFooter, PublicHeader, US_WHATSAPP, WhatsAppFloat } from "./PublicChrome";
import { applyPageSeo, LOCAL_ROUTE, ROUTE_SEO } from "./seo";
import "./public-pages.css";

const copy = translations["pt-BR"];
const projectAssets = [
  ["/agriclimate-pro-poster-pt.jpg", 1280, 720],
  ["/frasson-farois-demo-pt.jpg", 1800, 988],
  ["/event-qr-code-poster.jpg", 1280, 720],
  ["/cafeteria-demo-pt.png", 1024, 1536],
  ["/oficina-mecanica-demo.jpg", 2396, 1852],
];

const pageContent = {
  "/servicos": {
    eyebrow: "Serviços",
    h1: "Sites e soluções digitais para necessidades reais",
    lead: "Da presença institucional a uma ferramenta personalizada, cada projeto começa com um objetivo claro e um escopo bem definido.",
  },
  "/portfolio": {
    eyebrow: "Portfólio",
    h1: "Projetos digitais criados com clareza e cuidado",
    lead: "Conheça trabalhos da Mediatrix Tech desenvolvidos para empresas, serviços, eventos e o agronegócio.",
  },
  "/empresa": {
    eyebrow: "Empresa",
    h1: "Uma empresa familiar que cuida de cada detalhe",
    lead: "Transformamos boas ideias em soluções digitais úteis, bonitas e funcionais, com responsabilidade e comunicação direta.",
  },
  "/contato": {
    eyebrow: "Contato",
    h1: "Vamos conversar sobre o seu projeto digital",
    lead: "Solicite uma avaliação inicial, tire dúvidas ou conte o que sua empresa precisa melhorar no digital.",
  },
};

function ServicesContent() {
  return <div className="local-card-grid">{copy.services.map((service) => <article className="local-card compact" key={service.id}><h2>{service.title}</h2><p>{service.description}</p><p className="public-benefit">{service.benefit}</p><a className="text-link" href="/contato" data-meta-lead>Solicitar orçamento <ArrowRight size={17} aria-hidden="true" /></a></article>)}</div>;
}

function PortfolioContent() {
  return <div className="local-project-grid public-projects">{copy.projects.map((project, index) => {
    if (project.type === "collaboration") {
      return <article className="project-card project-card--collaboration" key={project.name}><div className="project-card-surface collaboration-card"><div className="collaboration-visual" aria-hidden="true"><span className="collaboration-icon"><BrainCircuit size={44} strokeWidth={1.5} /></span><span className="data-node node-one" /><span className="data-node node-two" /><span className="data-node node-three" /><span className="data-line line-one" /><span className="data-line line-two" /></div><div className="collaboration-content"><div className="collaboration-copy"><p className="collaboration-eyebrow">{project.collection}</p><p className="project-category">{project.category}</p><h2>{project.name}</h2><p className="collaboration-description">{project.description}</p></div><dl className="collaboration-metrics">{project.metrics.map(({ value, label }) => <div key={value}><dt>{value}</dt><dd>{label}</dd></div>)}</dl><ul className="collaboration-tags" aria-label={project.tagsLabel}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div></div></article>;
    }

    const [src, width, height] = projectAssets[index];
    return <article className="project-card" key={project.name}><div className="project-media"><img src={src} alt={`Prévia do projeto ${project.name}`} width={width} height={height} loading="lazy" /></div><div className="project-content"><p className="project-category">{project.category}</p><h2>{project.name}</h2><p>{project.description}</p></div></article>;
  })}</div>;
}

function CompanyContent() {
  return <div className="local-process public-company-facts">{copy.company.facts.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h2>{title}</h2><p>{text}</p></div></article>)}</div>;
}

function ContactContent() {
  return <div className="public-contact-grid"><a href={US_WHATSAPP} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" /><span><strong>WhatsApp</strong><small>+1 305 992 0833</small></span><ExternalLink aria-hidden="true" /></a><a href={BRAZIL_WHATSAPP} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" /><span><strong>WhatsApp</strong><small>+55 55 99935-7388</small></span><ExternalLink aria-hidden="true" /></a><a href="mailto:mediatrixtech@proton.me"><Mail aria-hidden="true" /><span><strong>E-mail</strong><small>mediatrixtech@proton.me</small></span><ArrowRight aria-hidden="true" /></a><a href="https://www.upwork.com/freelancers/~015020486545a9742b" target="_blank" rel="noopener noreferrer"><ExternalLink aria-hidden="true" /><span><strong>Perfil na Upwork</strong><small>Projetos internacionais</small></span><ArrowRight aria-hidden="true" /></a></div>;
}

export function PublicSectionPage({ pathname }) {
  const content = pageContent[pathname] || pageContent["/servicos"];

  React.useEffect(() => {
    document.documentElement.lang = "pt-BR";
    document.documentElement.dir = "ltr";
    applyPageSeo({ pathname, seo: ROUTE_SEO[pathname] });
    printConsoleGreeting(getEasterEggCopy("pt-BR").console);
  }, [pathname]);

  return (
    <EasterEggI18nProvider locale="pt-BR">
      <div className="public-page section-page">
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        <PublicHeader />
        <main id="conteudo">
          <section className="public-page-hero" aria-labelledby="public-page-title"><div className="shell"><p className="eyebrow">{content.eyebrow}</p><h1 id="public-page-title">{content.h1}</h1><p>{content.lead}</p></div></section>
          <section className="section"><div className="shell">
            {pathname === "/servicos" && <ServicesContent />}
            {pathname === "/portfolio" && <PortfolioContent />}
            {pathname === "/empresa" && <CompanyContent />}
            {pathname === "/contato" && <ContactContent />}
            {pathname !== "/contato" && <div className="public-inline-cta"><p>Atendimento em Santa Maria, no Rio Grande do Sul e remotamente para outras regiões.</p><a className="button primary" href="/contato" data-meta-lead>Falar sobre um projeto <ArrowRight size={18} aria-hidden="true" /></a></div>}
            {pathname === "/servicos" && <a className="text-link public-local-link" href={LOCAL_ROUTE}>Criação de sites em Santa Maria, RS <ArrowRight size={17} aria-hidden="true" /></a>}
          </div></section>
        </main>
        <PublicFooter />
        <WhatsAppFloat />
      </div>
    </EasterEggI18nProvider>
  );
}
