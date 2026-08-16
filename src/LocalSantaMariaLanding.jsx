import React from "react";
import {
  ArrowRight,
  Check,
  Gauge,
  Globe2,
  LayoutTemplate,
  MessageCircle,
  MonitorSmartphone,
  QrCode,
  Share2,
  Workflow,
} from "lucide-react";
import { EasterEggI18nProvider } from "./easter-eggs/EasterEggI18n";
import { printConsoleGreeting } from "./easter-eggs/consoleGreeting";
import { getEasterEggCopy } from "./translations";
import { BRAZIL_WHATSAPP, PublicFooter, PublicHeader, WhatsAppFloat } from "./PublicChrome";
import { applyPageSeo, LOCAL_FAQS, LOCAL_ROUTE, ROUTE_SEO } from "./seo";
import "./public-pages.css";

const benefits = [
  [MonitorSmartphone, "Presença profissional", "Um site próprio apresenta seu trabalho com clareza e transmite confiança em qualquer dispositivo."],
  [Globe2, "Encontrado no momento certo", "Conteúdo bem estruturado ajuda pessoas que procuram seus serviços a entender o que você oferece."],
  [MessageCircle, "Contato mais simples", "WhatsApp, formulário e redes sociais podem ficar a poucos cliques de quem deseja falar com sua empresa."],
];

const services = [
  [LayoutTemplate, "Sites institucionais", "Estruturas claras para apresentar a empresa, os serviços, os diferenciais e os canais de contato."],
  [Gauge, "Landing pages", "Páginas objetivas para campanhas, lançamentos, serviços específicos e captação de oportunidades."],
  [QrCode, "Páginas para eventos", "Experiências digitais com QR Code para compartilhar informações, fotos e vídeos de forma prática."],
  [Workflow, "Soluções personalizadas", "Formulários, painéis e fluxos digitais desenvolvidos para necessidades reais do seu negócio."],
  [MonitorSmartphone, "Design responsivo", "Layouts planejados para funcionar bem em celulares, tablets e computadores."],
  [Share2, "Integrações úteis", "Caminhos diretos para WhatsApp e redes sociais, sem transformar a navegação em um labirinto."],
];

const process = [
  ["01", "Conversa inicial", "Entendemos o negócio, o público, o objetivo do site e o conteúdo disponível."],
  ["02", "Escopo e proposta", "Organizamos as entregas, o cronograma e o investimento antes do início do desenvolvimento."],
  ["03", "Design e construção", "Criamos a experiência responsiva, cuidando de conteúdo, acessibilidade e velocidade."],
  ["04", "Revisão e entrega", "Revisamos cada etapa, aplicamos os ajustes combinados e apoiamos a publicação do projeto."],
];

const projects = [
  ["AgriClimate Pro", "/agriclimate-pro-poster-pt.jpg", "Experiência digital AgTech para organizar informações climáticas e apoiar decisões no campo.", 1280, 720],
  ["Event QR Code", "/event-qr-code-poster.jpg", "Página para eventos com acesso por QR Code e envio de fotos e vídeos pelos convidados.", 1280, 720],
  ["Oficina Mecânica", "/oficina-mecanica-demo.jpg", "Site responsivo para apresentar serviços automotivos e facilitar o contato de clientes da região.", 2396, 1852],
];

export function LocalSantaMariaLanding() {
  React.useEffect(() => {
    document.documentElement.lang = "pt-BR";
    document.documentElement.dir = "ltr";
    applyPageSeo({ pathname: LOCAL_ROUTE, seo: ROUTE_SEO[LOCAL_ROUTE] });
    printConsoleGreeting(getEasterEggCopy("pt-BR").console);
  }, []);

  return (
    <EasterEggI18nProvider locale="pt-BR">
      <div className="public-page local-page">
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        <PublicHeader />
        <main id="conteudo">
          <section className="local-hero" aria-labelledby="local-title">
            <div className="local-orbit" aria-hidden="true" />
            <div className="shell local-hero-content">
              <nav className="breadcrumbs" aria-label="Navegação estrutural"><a href="/">Início</a><span aria-hidden="true">/</span><span>Criação de Sites em Santa Maria RS</span></nav>
              <p className="eyebrow">Atendimento em Santa Maria e região</p>
              <h1 id="local-title">Criação de sites profissionais em Santa Maria, RS</h1>
              <p className="local-lead">Criamos sites modernos, rápidos e responsivos para empresas, profissionais e eventos que precisam apresentar seu trabalho com clareza e facilitar o contato com novos clientes.</p>
              <div className="hero-actions">
                <a className="button primary" href={BRAZIL_WHATSAPP} target="_blank" rel="noopener noreferrer">Solicitar orçamento <ArrowRight size={18} aria-hidden="true" /></a>
                <a className="button secondary" href="#projetos">Conhecer projetos</a>
              </div>
            </div>
          </section>

          <section className="section local-intro" aria-labelledby="presenca-title">
            <div className="shell local-split">
              <div><p className="eyebrow">Uma presença digital que trabalha por você</p><h2 id="presenca-title">Seu site precisa ser bonito — e também útil.</h2></div>
              <div className="local-prose"><p>Em Santa Maria, clientes pesquisam, comparam e tomam decisões pelo celular. Um site profissional ajuda sua empresa a explicar o que faz, demonstrar cuidado e oferecer um próximo passo claro.</p><p>Na Mediatrix Tech, cada projeto nasce de uma necessidade concreta. Unimos visual, conteúdo e desenvolvimento para construir uma experiência coerente com o seu negócio, sem fórmulas prontas ou promessas exageradas.</p></div>
            </div>
          </section>

          <section className="section local-alt" aria-labelledby="beneficios-title">
            <div className="shell">
              <div className="section-heading"><p className="eyebrow">Benefícios</p><h2 id="beneficios-title">Mais clareza para sua empresa e para seus clientes.</h2></div>
              <div className="local-card-grid three">{benefits.map(([Icon, title, text]) => <article className="local-card" key={title}><span className="icon-box" aria-hidden="true"><Icon size={25} /></span><h3>{title}</h3><p>{text}</p></article>)}</div>
            </div>
          </section>

          <section className="section" id="servicos-locais" aria-labelledby="servicos-locais-title">
            <div className="shell">
              <div className="section-heading"><p className="eyebrow">Serviços</p><h2 id="servicos-locais-title">Desenvolvimento de sites e soluções digitais para objetivos reais.</h2><p className="section-description">O formato do projeto é definido pelo que sua empresa precisa comunicar, organizar ou tornar mais simples.</p></div>
              <div className="local-card-grid">{services.map(([Icon, title, text]) => <article className="local-card compact" key={title}><span className="icon-box" aria-hidden="true"><Icon size={24} /></span><h3>{title}</h3><p>{text}</p></article>)}</div>
              <div className="local-performance"><Gauge size={28} aria-hidden="true" /><div><h3>Velocidade desde o planejamento</h3><p>Imagens dimensionadas, carregamento cuidadoso e uma estrutura enxuta fazem parte do desenvolvimento. O objetivo é entregar páginas estáveis e agradáveis de usar, inclusive em conexões móveis.</p></div></div>
            </div>
          </section>

          <section className="section local-alt" aria-labelledby="processo-title">
            <div className="shell local-process-layout">
              <div><p className="eyebrow">Como trabalhamos</p><h2 id="processo-title">Um processo claro, do primeiro contato à publicação.</h2><p className="section-description">Prazos realistas, comunicação direta e revisão cuidadosa em cada etapa.</p></div>
              <div className="local-process">{process.map(([number, title, text]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
            </div>
          </section>

          <section className="section" id="projetos" aria-labelledby="projetos-title">
            <div className="shell">
              <div className="section-heading"><p className="eyebrow">Projetos reais</p><h2 id="projetos-title">Experiências digitais pensadas para pessoas.</h2><p className="section-description">Uma seleção de trabalhos da Mediatrix Tech para diferentes contextos e públicos.</p></div>
              <div className="local-project-grid">{projects.map(([name, image, description, width, height]) => <article className="project-card" key={name}><div className="project-media"><img src={image} alt={`Prévia do projeto ${name}`} width={width} height={height} loading="lazy" /></div><div className="project-content"><h3>{name}</h3><p>{description}</p></div></article>)}</div>
              <a className="text-link local-more-link" href="/portfolio">Ver o portfólio <ArrowRight size={17} aria-hidden="true" /></a>
            </div>
          </section>

          <section className="section local-service-area" aria-labelledby="atendimento-title">
            <div className="shell local-split">
              <div><p className="eyebrow">Onde atendemos</p><h2 id="atendimento-title">Santa Maria, região e projetos sem fronteiras.</h2></div>
              <div className="local-prose"><p>A Mediatrix Tech oferece atendimento a clientes de Santa Maria e municípios da região central do Rio Grande do Sul. A proximidade ajuda a compreender o contexto de negócios locais, profissionais independentes e eventos da cidade.</p><p>Também trabalhamos remotamente com empresas de outras cidades, estados e países. Reuniões, revisões e entregas podem acontecer online com comunicação organizada durante todo o projeto.</p></div>
            </div>
          </section>

          <section className="section local-alt" id="perguntas" aria-labelledby="faq-title">
            <div className="shell local-faq-layout">
              <div><p className="eyebrow">Perguntas frequentes</p><h2 id="faq-title">Informações importantes antes de começar.</h2></div>
              <div className="local-faq">{LOCAL_FAQS.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
            </div>
          </section>

          <section className="section local-cta" aria-labelledby="orcamento-title">
            <div className="shell local-cta-card"><div><p className="eyebrow">Vamos conversar?</p><h2 id="orcamento-title">Conte o que sua empresa precisa melhorar no digital.</h2><p>Envie uma mensagem para solicitar uma avaliação inicial e receber uma proposta adequada ao escopo do seu projeto.</p></div><a className="button primary" href={BRAZIL_WHATSAPP} target="_blank" rel="noopener noreferrer"><MessageCircle size={19} aria-hidden="true" /> Falar pelo WhatsApp</a></div>
          </section>
        </main>
        <PublicFooter />
        <WhatsAppFloat />
      </div>
    </EasterEggI18nProvider>
  );
}
