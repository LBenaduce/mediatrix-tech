import React from "react";
import { ArrowRight, Check, ChevronDown, Mail, MessageCircle, Phone } from "lucide-react";
import { brazilWebsiteCarePlans, formatPrice, getPricing, introductoryPricing } from "./introductoryPricing";
import { getAttribution, initializeTracking, trackEvent, trackLink } from "./analytics";
import { ClientGrowthChart } from "./ClientGrowthChart";
import { SecretLogo } from "./easter-eggs/SecretLogo";
import { EasterEggI18nProvider } from "./easter-eggs/EasterEggI18n";
import { getEasterEggCopy } from "./translations";
import { printConsoleGreeting } from "./easter-eggs/consoleGreeting";
import { applyPageSeo, ROUTE_SEO } from "./seo";
import { WhatsAppFloat } from "./PublicChrome";
import "./international.css";

const routeMap = {
  "/brazil": { region: "brazil", language: "pt", h1: "Sites profissionais para pequenas empresas no Brasil", lead: "Sites modernos, responsivos e fáceis de usar, com escopo claro e comunicação direta durante todo o projeto." },
  "/us": { region: "us", language: "en", h1: "Professional websites for small businesses in the United States", lead: "Modern, mobile-friendly websites with clear introductory pricing and direct communication with your developer." },
  "/europe": { region: "europe", language: "en", h1: "Professional websites for small businesses in Europe", lead: "Modern, mobile-friendly websites for European businesses, with clear scope and direct communication with your developer." },
  "/switzerland": { region: "switzerland", language: "en", h1: "Professional websites for small businesses in Switzerland", lead: "Modern, mobile-friendly websites with pricing in Swiss francs and direct communication with your developer." },
  "/brazilian-businesses-abroad": { region: "us", language: "pt", h1: "Seu site profissional em inglês para o exterior", lead: "Sites em inglês ou bilíngues para empresas brasileiras que atendem clientes nos Estados Unidos, na Europa e em outros mercados." },
};

const portfolio = [
  { name: "AgriClimate Pro", industry: "AgTech · Climate Intelligence", problem: "Agricultural teams needed climate information that was easier to use in day-to-day decisions.", solution: "A responsive AgTech experience that turns complex climate data into clear decision-support views.", impact: "100% Mobile Optimized" },
  { name: "Frasson LLC", industry: "Service Business · Home Services", problem: "A service business needed a credible online presence that explained its work and made contact effortless.", solution: "A focused website with clear services, trust-building content and direct lead contact paths.", impact: "Faster Lead Contact" },
  { name: "Event QR Code", industry: "Events · Guest Experience", problem: "Event guests needed a frictionless way to share their memories without installing an app.", solution: "A custom QR-enabled experience for simple photo and video uploads from any phone.", impact: "Mobile-First Uploads" },
  { name: "Cafeteria", industry: "Food & Beverage · Hospitality", problem: "A local café needed a warm digital presence that invited visitors to explore the menu and venue.", solution: "An expressive, mobile-first website with brand storytelling and a direct menu call to action.", impact: "Menu Access on Any Device" },
];

const faq = [
  ["What is included in the starting price?", "The starting price covers the exact scope listed for each package. Anything outside that scope is discussed and quoted before work begins."],
  ["Why are the prices lower right now?", "Mediatrix Tech is currently offering introductory international pricing while expanding its client portfolio in the United States and Europe. The reduced rate applies to clearly defined packages and does not reduce development quality."],
  ["Will my final price be higher?", "Only if your project needs work beyond the package scope. You will receive a clear proposal and the confirmed price will be honored."],
  ["Do I need to provide the text and images?", "For the Starter Landing Page, you provide the final text, logo and images. Copywriting, branding and content support can be quoted separately."],
  ["Can you create an English and Portuguese website?", "Yes. A bilingual English and Portuguese version is available as an optional upgrade. Translation or copywriting may be charged separately depending on content volume."],
  ["Are hosting and domain included?", "No. Hosting and domain costs are charged separately so you keep control of the accounts and recurring fees. Deployment assistance is included."],
  ["How many revisions are included?", "The Starter package includes one revision round. The Small Business package includes up to two. Additional rounds are available as a paid extra."],
  ["How long does a website take?", "Timing depends on scope and how quickly final content is supplied. A realistic schedule is confirmed in your proposal."],
  ["Can I add more pages later?", "Yes. Additional pages can be added during the project or in a later phase and are quoted separately."],
  ["Do you provide monthly maintenance?", "Yes. Website Care Plans include monitoring, updates, support and a defined amount of minor content-editing time. The allowance depends on the selected plan and does not include unlimited changes."],
];

const ptPortfolio = [
  { industry: "AgTech · Inteligência climática", problem: "Equipes agrícolas precisavam consultar informações climáticas com mais facilidade nas decisões diárias.", solution: "Uma experiência AgTech responsiva que transforma dados climáticos complexos em visualizações claras para apoiar decisões.", impact: "100% otimizado para celulares" },
  { industry: "Empresa de serviços · Serviços residenciais", problem: "Uma empresa de serviços precisava de presença online confiável para explicar seu trabalho e facilitar o contato.", solution: "Um site objetivo, com serviços claros, conteúdo que transmite confiança e caminhos diretos para novos contatos.", impact: "Contato mais rápido" },
  { industry: "Eventos · Experiência dos convidados", problem: "Convidados precisavam compartilhar lembranças sem instalar um aplicativo.", solution: "Uma experiência personalizada com QR Code para enviar fotos e vídeos facilmente pelo celular.", impact: "Envios pelo celular" },
  { industry: "Alimentação · Hospitalidade", problem: "Uma cafeteria local precisava de uma presença digital acolhedora para apresentar o cardápio e o espaço.", solution: "Um site expressivo, pensado primeiro para celulares, com narrativa da marca e acesso direto ao cardápio.", impact: "Cardápio em qualquer dispositivo" },
];

const ptFaq = [
  ["O que está incluído no preço inicial?", "O preço inicial cobre exatamente o escopo descrito em cada pacote. Qualquer item adicional é discutido e orçado antes do início do trabalho."],
  ["Por que os preços estão mais baixos agora?", "A Mediatrix Tech oferece valores introdutórios enquanto amplia seu portfólio de clientes internacionais. O valor reduzido se aplica a pacotes com escopo definido e não reduz a qualidade do desenvolvimento."],
  ["O preço final pode ser maior?", "Somente se o projeto exigir itens além do escopo do pacote. Você receberá uma proposta clara, e o preço confirmado será respeitado."],
  ["Preciso fornecer os textos e as imagens?", "Na landing page inicial, você fornece os textos finais, o logotipo e as imagens. Redação, identidade visual e suporte de conteúdo podem ser orçados separadamente."],
  ["Vocês criam sites em inglês e português?", "Sim. A versão bilíngue em inglês e português está disponível como adicional. Tradução ou redação podem ser cobradas separadamente, conforme o volume de conteúdo."],
  ["Hospedagem e domínio estão incluídos?", "Não. Hospedagem e domínio são cobrados separadamente para que você mantenha o controle das contas e dos custos recorrentes. O auxílio à publicação está incluído."],
  ["Quantas rodadas de revisão estão incluídas?", "O pacote Landing Page inclui uma rodada de revisão. O pacote Site Empresarial inclui até duas. Rodadas adicionais podem ser contratadas à parte."],
  ["Quanto tempo leva para criar um site?", "O prazo depende do escopo e da rapidez no envio do conteúdo final. Um cronograma realista será confirmado na proposta."],
  ["Posso adicionar mais páginas depois?", "Sim. Páginas adicionais podem ser incluídas durante o projeto ou em uma etapa futura e são orçadas separadamente."],
  ["Vocês oferecem manutenção mensal?", "Sim. Os planos de manutenção incluem monitoramento, atualizações, suporte e um tempo definido para pequenas alterações de conteúdo. O limite depende do plano escolhido e não inclui mudanças ilimitadas."],
];

const ptPackageCopy = [
  { summary: "Um site de uma página para causar uma primeira impressão clara e profissional.", included: ["Site de uma página", "Até cinco seções de conteúdo", "Design responsivo", "Apresentação dos serviços", "Formulário de contato", "Botão para telefone, e-mail ou WhatsApp", "Links para redes sociais", "Google Maps, quando aplicável", "SEO básico na página", "Configuração do Google Analytics", "Uma rodada de revisão", "Auxílio à publicação"], note: "O cliente fornece os textos finais, o logotipo e as imagens.", excluded: ["Páginas adicionais", "Redação", "Criação de logotipo", "Animações avançadas", "Sistemas de agendamento", "Sistemas de pagamento", "Bancos de dados", "Contas de usuário", "Painéis", "Comércio eletrônico", "Versões em outros idiomas", "Revisões ilimitadas", "Manutenção contínua"] },
  { summary: "Um site completo e confiável para uma pequena empresa consolidada.", included: ["Até quatro páginas", "Início", "Serviços", "Sobre", "Contato", "Design responsivo", "Formulário de contato ou orçamento", "Integração com redes sociais", "Google Maps, quando aplicável", "SEO técnico básico", "Google Analytics", "Até duas rodadas de revisão", "Auxílio à publicação"], note: "Páginas adicionais e recursos avançados são orçados separadamente.", excluded: [] },
  { summary: "Para sites que precisam de recursos personalizados ou fluxos específicos do negócio.", capabilities: ["Sistemas de agendamento", "Integrações de pagamento", "Envio de fotos ou vídeos", "Painéis administrativos", "Autenticação de usuários", "Bancos de dados", "Painéis de indicadores", "Comércio eletrônico", "Recursos multilíngues", "Integrações com APIs", "Fluxos personalizados do negócio"], note: "O preço final depende do escopo e dos recursos necessários. Funcionalidades avançadas não estão incluídas no preço inicial.", excluded: [] },
];

const ptOptionalNames = ["Página adicional", "Rodada adicional de revisão", "Versão bilíngue", "Redação", "Criação de logotipo ou identidade visual", "Integração de agendamento", "Integração de pagamento", "Formulário avançado", "Auxílio com o Perfil da Empresa no Google", "Manutenção mensal"];

function useSectionView(id, event) {
  React.useEffect(() => {
    const element = document.getElementById(id);
    if (!element) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { trackEvent(event); observer.disconnect(); }
    }, { threshold: 0.3 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [id, event]);
}

export function InternationalLanding({ pathname }) {
  const path = (pathname || (typeof window !== "undefined" ? window.location.pathname : "/us")).replace(/\/$/, "") || "/us";
  const route = routeMap[path] || routeMap["/us"];
  const [marketKey, setMarketKey] = React.useState(route.region);
  const region = React.useMemo(() => getPricing(marketKey), [marketKey]);
  const isPortuguese = route.language === "pt";
  const locale = isPortuguese ? "pt-BR" : "en";
  const packages = introductoryPricing.packages.map((pkg, index) => isPortuguese ? { ...pkg, ...ptPackageCopy[index] } : pkg);
  const optionalServices = introductoryPricing.optionalServices.map((service, index) => isPortuguese ? { ...service, name: ptOptionalNames[index], suffix: service.suffix ? "/mês" : undefined } : service);
  const landingPage = path;
  const [selectedPackage, setSelectedPackage] = React.useState("");
  const price = (amount) => isPortuguese && region.currency === "USD" ? `US$ ${amount.toLocaleString("pt-BR")}` : formatPrice(region, amount);

  React.useEffect(() => {
    initializeTracking();
    document.documentElement.lang = isPortuguese ? "pt-BR" : "en";
    document.documentElement.dir = "ltr";
    applyPageSeo({ pathname: path, seo: ROUTE_SEO[path] });
    trackEvent("google_ads_landing_page_view", { landing_page: landingPage, country_target: region.countryTarget, currency: region.currency, market: region.market });
    if (new URLSearchParams(window.location.search).get("submitted") === "true") trackEvent("thank_you_page_view", { landing_page: landingPage });
  }, [isPortuguese, landingPage, region.countryTarget, region.starter, region]);

  useSectionView("pricing", "pricing_section_view");

  React.useEffect(() => {
    printConsoleGreeting(getEasterEggCopy(locale).console);
  }, [locale]);

  const choosePackage = (pkg) => {
    setSelectedPackage(pkg.id);
    trackEvent("package_selected", { package_name: pkg.name, starting_price: region[pkg.priceKey], currency: region.currency, market: region.market, estimated_budget: "", landing_page: landingPage, country_target: region.countryTarget });
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <EasterEggI18nProvider locale={locale}>
    <div className="intl-page">
      <header className="intl-header">
        <SecretLogo className="intl-brand" href="#top" ariaLabel={isPortuguese ? "Mediatrix Tech — início" : "Mediatrix Tech — top"} imageSize={42} />
        <nav aria-label={isPortuguese ? "Navegação da campanha" : "Campaign navigation"}><a href="#pricing">{isPortuguese ? "Preços" : "Pricing"}</a><a href="#portfolio">{isPortuguese ? "Projetos" : "Work"}</a><a href="#faq">FAQ</a></nav>
        <a className="intl-header-cta" href="#quote-form" onClick={() => trackEvent("primary_cta_click", { landing_page: landingPage })}>{isPortuguese ? "Solicitar orçamento" : "Request a Quote"}</a>
      </header>

      <main id="top">
        <section className="intl-hero">
          <video className="intl-hero__video" autoPlay loop muted playsInline preload="metadata" poster="/mediatrix-header-poster.jpg" aria-hidden="true">
            <source src="/mediatrix-header.webm" type="video/webm" media="(min-width: 769px)" />
            <source src="/mediatrix-header.mp4" type="video/mp4" media="(min-width: 769px)" />
          </video>
          <div className="intl-hero__overlay" aria-hidden="true" />
          <div className="intl-shell intl-hero-grid">
            <div>
              <p className="launch-label">{isPortuguese ? "Preços especiais de lançamento" : introductoryPricing.launchOfferLabel}</p>
              <h1>{route.h1}</h1>
              <p className="hero-lead">{route.lead}</p>
              <p className="launch-note">{isPortuguese ? "Valores introdutórios por tempo limitado para os primeiros clientes internacionais da Mediatrix Tech." : introductoryPricing.launchOfferDescription}</p>
              {isPortuguese && <label className="market-selector"><span>Mercado do seu negócio</span><select value={marketKey} onChange={(event) => setMarketKey(event.target.value)}><option value="brazil">Brasil · BRL</option><option value="us">Estados Unidos · USD</option><option value="europe">Europa · EUR</option><option value="switzerland">Suíça · CHF</option></select><small>O mercado e a moeda são escolhidos por você, independentemente do idioma do site.</small></label>}
              <div className="intl-actions">
                <a className="intl-button primary" href="#quote-form" onClick={() => trackEvent("primary_cta_click", { landing_page: landingPage })}>{isPortuguese ? "Solicitar orçamento de lançamento" : "Request Your Introductory Quote"}<ArrowRight size={18} /></a>
                <a className="intl-button secondary" href="#pricing">{isPortuguese ? "Ver o que está incluído" : "View What’s Included"}</a>
              </div>
              <div className="trust-row"><span><Check size={17} />{isPortuguese ? "Comunicação direta com o desenvolvedor" : "Direct developer communication"}</span><span><Check size={17} />{isPortuguese ? "Escopo claro e controlado" : "Clear, controlled scope"}</span><span><Check size={17} />{isPortuguese ? "Entrega pensada primeiro para celulares" : "Mobile-first delivery"}</span></div>
            </div>
            <aside className="hero-price-card"><span>{isPortuguese ? "Landing page profissional" : "Starter Landing Page"}</span><strong>{price(region.starter)}</strong><small>{isPortuguese ? "a partir de" : "starting at"}</small><ul><li>{isPortuguese ? "Uma página com até cinco seções" : "One page, up to five sections"}</li><li>{isPortuguese ? "Design responsivo" : "Responsive design"}</li><li>{isPortuguese ? "Formulário de contato e analytics" : "Contact form and analytics"}</li><li>{isPortuguese ? "Uma rodada de revisão" : "One revision round"}</li></ul></aside>
          </div>
        </section>

        {isPortuguese && <section className="intl-strip"><div className="intl-shell"><h2>Atendimento para brasileiros no exterior</h2><div className="benefit-grid">{["Atendimento em português", "Site desenvolvido em inglês", "Opção de versão bilíngue", "Comunicação direta com o desenvolvedor", "Atendimento para empresas nos Estados Unidos e Europa", "Pagamento em dólar, euro ou franco suíço"].map((item) => <span key={item}><Check size={17} />{item}</span>)}</div></div></section>}

        <section className="intl-section" id="pricing">
          <div className="intl-shell">
            <div className="intl-heading"><p className="eyebrow">{isPortuguese ? "Preços de lançamento" : introductoryPricing.launchOfferLabel}</p><h2>{isPortuguese ? "Escolha o ponto de partida ideal" : "Simple packages. Clearly defined scope."}</h2><p>{isPortuguese ? "Os valores de lançamento estão disponíveis enquanto a Mediatrix Tech amplia seu portfólio internacional. Os preços podem aumentar em projetos futuros, mas propostas confirmadas mantêm o valor acordado." : introductoryPricing.positioning}</p></div>
            <div className="pricing-grid">
              {packages.map((pkg, index) => <article className={`price-card ${index === 1 ? "featured" : ""}`} key={pkg.id}>
                {index === 1 && <span className="popular">{isPortuguese ? "Mais popular" : "Most popular"}</span>}
                <h3>{isPortuguese ? ["Landing page profissional", "Site empresarial", "Projeto personalizado"][index] : pkg.name}</h3><p>{pkg.summary}</p>
                <div className="price"><small>{isPortuguese ? "a partir de" : "starting at"}</small><strong>{price(region[pkg.priceKey])}</strong></div>
                {(pkg.included.length > 0 ? pkg.included : pkg.capabilities).map((item) => <div className="feature" key={item}><Check size={16} />{item}</div>)}
                {pkg.capabilities && <p className="scope-label">{isPortuguese ? "Estes recursos indicam o escopo de um projeto personalizado e não estão incluídos no preço inicial." : "These features indicate custom-project scope; they are not included in the starting price."}</p>}
                <p className="package-note">{pkg.note}</p>
                {pkg.excluded.length > 0 && <details><summary>{isPortuguese ? "Não incluído" : "Not included"} <ChevronDown size={16} /></summary><ul>{pkg.excluded.map((item) => <li key={item}>{item}</li>)}</ul></details>}
                <button className="intl-button primary full" type="button" onClick={() => choosePackage(pkg)}>{isPortuguese ? "Selecionar pacote" : "Select Package"}</button>
              </article>)}
            </div>
          </div>
        </section>

        <section className="intl-section alt"><div className="intl-shell options-layout"><div><p className="eyebrow">{isPortuguese ? "Adicionais flexíveis" : "Flexible additions"}</p><h2>{isPortuguese ? "Serviços opcionais" : "Optional services"}</h2><p>{isPortuguese ? "Cada adicional tem escopo separado e preço a partir do valor apresentado." : "Every extra is separately scoped and priced from the amount shown."}</p></div><div className="extras-list">{optionalServices.map((service) => <div key={service.name}><span>{service.name}</span><strong>{service.quoted ? (isPortuguese ? "Orçamento separado" : "Quoted separately") : `${isPortuguese ? "a partir de" : "from"} ${price(service[marketKey])}${service.suffix || ""}`}</strong></div>)}</div></div></section>

        <section className="intl-section"><div className={`intl-shell add-ons${marketKey === "brazil" ? " single" : ""}`}><article><p className="eyebrow">{isPortuguese ? "Adicional opcional" : "Optional upgrade"}</p><h2>{isPortuguese ? "Inglês + Português" : "English + Portuguese"}</h2><strong>{isPortuguese ? "a partir de" : "from"} {price(region.bilingual)}</strong><p>{isPortuguese ? "Adicione versões em inglês e português ao seu site. Tradução ou redação podem ser cobradas separadamente, dependendo do volume de conteúdo." : "Add an English and Portuguese version to your website. Translation or copywriting may be charged separately depending on content volume."}</p></article>{marketKey !== "brazil" && <article><p className="eyebrow">{isPortuguese ? "Plano de manutenção" : "Website Care Plan"}</p><h2>{isPortuguese ? "Manutenção mensal confiável" : "Reliable monthly care"}</h2><strong>{isPortuguese ? "a partir de" : "from"} {price(region.care)}/{isPortuguese ? "mês" : "month"}</strong><ul>{(isPortuguese ? ["Monitoramento da hospedagem", "Backups", "Atualizações de segurança", "Atualizações de dependências", "Monitoramento de disponibilidade", "Até 30 minutos de pequenas alterações de conteúdo por mês", "Suporte por e-mail"] : ["Hosting monitoring", "Backups", "Security updates", "Dependency updates", "Uptime monitoring", "Up to 30 minutes of minor content changes per month", "Email support"]).map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul><p>{isPortuguese ? "Os custos de hospedagem são cobrados separadamente. O plano não inclui suporte ou alterações ilimitadas." : "Hosting costs are charged separately. The plan does not include unlimited support or unlimited changes."}</p></article>}</div></section>
        {marketKey === "brazil" && <BrazilWebsiteCare price={price} />}

        <ClientGrowthChart isPortuguese={isPortuguese} />
        <Portfolio isPortuguese={isPortuguese} />
        <Process isPortuguese={isPortuguese} />
        <Faq isPortuguese={isPortuguese} />
        <QuoteForm region={region} landingPage={landingPage} selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage} isPortuguese={isPortuguese} />
      </main>
      <WhatsAppFloat onClick={() => trackEvent("whatsapp_float_click", { landing_page: landingPage })} />
      <footer className="intl-footer"><div className="intl-shell"><strong>Mediatrix Tech</strong><span>{isPortuguese ? "Crie. Conecte. Converta." : "Create. Connect. Convert."}</span><div><a href="mailto:mediatrixtech@proton.me" onClick={() => trackLink("email_click")}><Mail size={17} />E-mail</a><a href="https://wa.me/13059920833" onClick={() => trackLink("whatsapp_click")}><MessageCircle size={17} />WhatsApp</a><a href="tel:+13059920833" onClick={() => trackLink("phone_click")}><Phone size={17} />{isPortuguese ? "Telefone" : "Phone"}</a></div></div></footer>
    </div>
    </EasterEggI18nProvider>
  );
}

function Portfolio({ isPortuguese }) { const projects = portfolio.map((project, index) => isPortuguese ? { ...project, ...ptPortfolio[index] } : project); return <section className="intl-section alt" id="portfolio"><div className="intl-shell"><div className="intl-heading"><p className="eyebrow">{isPortuguese ? "Estudos de caso" : "Case studies"}</p><h2>{isPortuguese ? "Sites criados para gerar resultados práticos." : "Websites built around practical business outcomes."}</h2><p>{isPortuguese ? "Cada projeto começa com um problema real, uma solução objetiva e um caminho mais claro para agir." : "Each project begins with a real problem, a focused solution and a clearer path to action."}</p></div><div className="case-grid">{projects.map((project) => <article className="portfolio-card case-study-card" key={project.name}><header className="case-study-card__header"><p>{project.industry}</p><h3>{project.name}</h3></header><div className="case-study-card__breakdown"><p><strong>{isPortuguese ? "Problema" : "Problem"}</strong>{project.problem}</p><p><strong>{isPortuguese ? "Solução" : "Solution"}</strong>{project.solution}</p><div className="metric-badge case-study-card__impact"><span>{isPortuguese ? "Impacto / Resultado" : "Impact / Result"}</span><strong>{project.impact}</strong></div></div><a className="case-study-card__link" href="#quote-form">{isPortuguese ? "Ver projeto" : "View Live Project"} <span aria-hidden="true">→</span></a></article>)}</div></div></section>; }

function BrazilWebsiteCare({ price }) {
  const names = ["Manutenção Básica", "Manutenção Padrão", "Manutenção Avançada"];
  const included = [["Monitoramento de disponibilidade do site", "Atualizações de segurança e dependências", "Backups básicos", "Suporte técnico por e-mail ou WhatsApp", "Até 15 minutos de pequenas alterações de conteúdo por mês"], ["Tudo do plano Básico", "Até 45 minutos de pequenas alterações de conteúdo por mês", "Teste mensal de formulários e links", "Monitoramento básico de desempenho", "Suporte prioritário"], ["Tudo do plano Padrão", "Até 90 minutos de pequenas alterações de conteúdo por mês", "Resumo mensal de métricas", "Prioridade de suporte mais rápida", "Verificações básicas de SEO e desempenho"]];
  const terms = ["O tempo de edição não utilizado não é acumulado.", "Novas páginas, reformulações e funcionalidades são cobradas separadamente.", "Renovação de domínio, plugins pagos, serviços externos e hospedagem premium não estão incluídos, salvo indicação expressa.", "A manutenção não inclui alterações ilimitadas.", "Trabalhos emergenciais fora do plano podem ser orçados separadamente."];
  return <section className="intl-section care-section" id="website-care"><div className="intl-shell">
    <div className="intl-heading"><p className="eyebrow">Planos de manutenção</p><h2>Manutenção de sites a partir de R$ 59/mês.</h2><p>Escolha um nível mensal de suporte para monitoramento, atualizações e pequenas alterações de conteúdo.</p></div>
    <div className="care-grid">{brazilWebsiteCarePlans.map((plan, index) => <article className={plan.id === "standard" ? "featured" : ""} key={plan.id}>{plan.id === "standard" && <span className="popular">Mais popular</span>}<h3>{names[index]}</h3><strong>{price(plan.price)}/mês</strong><ul>{included[index].map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul></article>)}</div>
    <div className="care-terms"><h3>Condições importantes dos planos</h3><ul>{terms.map((term) => <li key={term}>{term}</li>)}</ul></div>
  </div></section>;
}

function Process({ isPortuguese }) { const steps = isPortuguese ? [["01", "Alinhamento de 15 minutos pelo WhatsApp", "Entendemos objetivos, orçamento e necessidades do negócio."], ["02", "Escopo e cronograma claros", "Sem taxas ocultas, com etapas realistas."], ["03", "Revisão online", "Teste o site e envie comentários por um link privado."], ["04", "Publicação e configuração local", "Colocamos o site no ar com Google Maps e métricas configurados."]] : [["01", "15-Min WhatsApp Alignment", "Understand goals, budget, and business needs."], ["02", "Clear Scope & Timeline", "No hidden fees, realistic milestones."], ["03", "Live Staging Review", "Test and give feedback on a private staging link."], ["04", "Launch & Google Local Setup", "Go live with Google Maps & analytics fully configured."]]; return <section className="intl-section"><div className="intl-shell"><div className="intl-heading"><p className="eyebrow">{isPortuguese ? "Um processo claro em quatro etapas" : "A clear four-step process"}</p><h2>{isPortuguese ? "Como trabalhamos com clientes no Brasil e no mundo" : "How We Work With Clients Anywhere in Brazil & Worldwide"}</h2><p>{isPortuguese ? "Um processo direto para acompanhar escopo, comentários e publicação de qualquer lugar." : "A direct process that keeps scope, feedback and launch details easy to follow from any location."}</p></div><div className="process-steps">{steps.map(([number, title, text]) => <article key={number}><span className="process-steps__number" aria-hidden="true">{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>; }

function Faq({ isPortuguese }) { const items = isPortuguese ? ptFaq : faq; return <section className="intl-section alt" id="faq"><div className="intl-shell faq-layout"><div><p className="eyebrow">FAQ</p><h2>{isPortuguese ? "Respostas claras antes de solicitar um orçamento." : "Clear answers before you request a quote."}</h2></div><div>{items.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div></div></section>; }

function QuoteForm({ region, landingPage, selectedPackage, setSelectedPackage, isPortuguese }) {
  const [status, setStatus] = React.useState("idle");
  const started = React.useRef(false);
  const packageNames = Object.fromEntries(introductoryPricing.packages.map((pkg, index) => [pkg.id, isPortuguese ? ["Landing page profissional", "Site empresarial", "Projeto personalizado"][index] : pkg.name]));
  const onStart = () => { if (!started.current) { started.current = true; trackEvent("quote_form_start", { landing_page: landingPage }); } };
  const submit = async (event) => {
    event.preventDefault(); setStatus("sending");
    const form = event.currentTarget; const formData = new FormData(form); const attribution = getAttribution();
    const selectedPackageId = selectedPackage || "";
    const selectedPackageConfig = introductoryPricing.packages.find((pkg) => pkg.id === selectedPackageId);
    const analyticsData = { package_name: packageNames[selectedPackageId] || "quick_review", selected_package: selectedPackageId, starting_price: selectedPackageConfig ? region[selectedPackageConfig.priceKey] : undefined, currency: region.currency, market: region.market, landing_page: landingPage, ...attribution };
    try {
      const response = await fetch("https://formsubmit.co/ajax/mediatrixtech@proton.me", { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify({ ...Object.fromEntries(formData.entries()), selected_package: selectedPackageId, ...attribution, landing_page: landingPage, _subject: "Website review request" }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false || result.success === "false") throw new Error("Submission failed");
      trackEvent("quote_form_submit", analyticsData); form.reset(); setSelectedPackage(""); setStatus("success");
    } catch { trackEvent("quote_form_error", analyticsData); setStatus("error"); }
  };
  return <section className="intl-section quote-section" id="quote-form"><div className="intl-shell quote-layout"><div><p className="eyebrow">{isPortuguese ? "Solicite um orçamento" : "Request a quote"}</p><h2>{isPortuguese ? "Conte sobre o seu projeto." : "Let’s define the right starting point."}</h2><p>{isPortuguese ? "Compartilhe algumas informações. Projetos com orçamento reduzido também são analisados, sem rejeição automática." : "Share a few details. Low-budget enquiries are welcome and reviewed rather than automatically rejected."}</p><div className="direct-contact"><a href="mailto:mediatrixtech@proton.me" onClick={() => trackLink("email_click")}><Mail size={18} />mediatrixtech@proton.me</a><a href="https://wa.me/13059920833" onClick={() => trackLink("whatsapp_click")}><MessageCircle size={18} />WhatsApp</a></div></div><form onSubmit={submit} onFocus={onStart}>
    <label><span>{isPortuguese ? "Nome" : "Name"}</span><input name="name" autoComplete="name" required /></label><label><span>{isPortuguese ? "WhatsApp / Telefone" : "WhatsApp / Phone Number"}</span><input name="phone_whatsapp" type="tel" autoComplete="tel" required /></label><label className="wide"><span>{isPortuguese ? "Tipo de negócio / Mensagem" : "Quick Business Type / Message"} <em>({isPortuguese ? "opcional" : "optional"})</em></span><textarea name="message" rows="4" placeholder={isPortuguese ? "Por exemplo: oficina mecânica, restaurante, serviço local…" : "For example: auto repair shop, restaurant, local service…"} /></label><button className="intl-button primary wide" disabled={status === "sending"}>{status === "sending" ? (isPortuguese ? "Enviando…" : "Sending…") : (isPortuguese ? "Receber avaliação gratuita por WhatsApp ou e-mail" : "Get Free Review via WhatsApp / Email")}<ArrowRight size={18} /></button><p className="form-trust wide">🔒 {isPortuguese ? "Sem spam. Normalmente respondemos em até 30 minutos durante o horário comercial." : "Zero spam. We typically reply within 30 minutes during business hours."}</p><p className={`form-feedback wide ${status}`} role="status">{status === "success" && (isPortuguese ? "Obrigado. Sua solicitação foi enviada com sucesso." : "Thank you. Your request was sent successfully.")}{status === "error" && (isPortuguese ? "Não foi possível enviar o formulário. Tente novamente ou entre em contato por e-mail." : "We couldn’t send the form. Please try again or contact us by email.")}</p>
  </form></div></section>;
}

export function isInternationalRoute(pathname = typeof window !== "undefined" ? window.location.pathname : "") { return Boolean(routeMap[pathname.replace(/\/$/, "")]); }
