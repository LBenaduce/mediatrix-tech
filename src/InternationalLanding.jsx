import React from "react";
import { ArrowRight, Check, ChevronDown, Mail, MessageCircle, Phone } from "lucide-react";
import { brazilWebsiteCarePlans, brazilWebsiteCareTerms, formatPrice, getPricing, introductoryPricing } from "./introductoryPricing";
import { getAttribution, initializeTracking, trackEvent, trackLink } from "./analytics";
import { ClientGrowthChart } from "./ClientGrowthChart";
import { SecretLogo } from "./easter-eggs/SecretLogo";
import { EasterEggI18nProvider } from "./easter-eggs/EasterEggI18n";
import { getEasterEggCopy } from "./translations";
import { printConsoleGreeting } from "./easter-eggs/consoleGreeting";
import { applyPageSeo, ROUTE_SEO } from "./seo";
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
        <SecretLogo className="intl-brand" href="#top" ariaLabel="Mediatrix Tech — top" imageSize={42} />
        <nav aria-label="Campaign navigation"><a href="#pricing">Pricing</a><a href="#portfolio">Work</a><a href="#faq">FAQ</a></nav>
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
              <p className="launch-label">{introductoryPricing.launchOfferLabel}</p>
              <h1>{route.h1}</h1>
              <p className="hero-lead">{route.lead}</p>
              <p className="launch-note">{introductoryPricing.launchOfferDescription}</p>
              {isPortuguese && <label className="market-selector"><span>Mercado do seu negócio</span><select value={marketKey} onChange={(event) => setMarketKey(event.target.value)}><option value="brazil">Brasil · BRL</option><option value="us">Estados Unidos · USD</option><option value="europe">Europa · EUR</option><option value="switzerland">Suíça · CHF</option></select><small>O mercado e a moeda são escolhidos por você, independentemente do idioma do site.</small></label>}
              <div className="intl-actions">
                <a className="intl-button primary" href="#quote-form" onClick={() => trackEvent("primary_cta_click", { landing_page: landingPage })}>{isPortuguese ? "Solicitar orçamento de lançamento" : "Request Your Introductory Quote"}<ArrowRight size={18} /></a>
                <a className="intl-button secondary" href="#pricing">{isPortuguese ? "Ver o que está incluído" : "View What’s Included"}</a>
              </div>
              <div className="trust-row"><span><Check size={17} />Direct developer communication</span><span><Check size={17} />Clear, controlled scope</span><span><Check size={17} />Mobile-first delivery</span></div>
            </div>
            <aside className="hero-price-card"><span>{isPortuguese ? "Landing page profissional" : "Starter Landing Page"}</span><strong>{price(region.starter)}</strong><small>{isPortuguese ? "a partir de" : "starting at"}</small><ul><li>{isPortuguese ? "Uma página com até cinco seções" : "One page, up to five sections"}</li><li>{isPortuguese ? "Design responsivo" : "Responsive design"}</li><li>{isPortuguese ? "Formulário de contato e analytics" : "Contact form and analytics"}</li><li>{isPortuguese ? "Uma rodada de revisão" : "One revision round"}</li></ul></aside>
          </div>
        </section>

        {isPortuguese && <section className="intl-strip"><div className="intl-shell"><h2>Atendimento para brasileiros no exterior</h2><div className="benefit-grid">{["Atendimento em português", "Site desenvolvido em inglês", "Opção de versão bilíngue", "Comunicação direta com o desenvolvedor", "Atendimento para empresas nos Estados Unidos e Europa", "Pagamento em dólar, euro ou franco suíço"].map((item) => <span key={item}><Check size={17} />{item}</span>)}</div></div></section>}

        <section className="intl-section" id="pricing">
          <div className="intl-shell">
            <div className="intl-heading"><p className="eyebrow">{introductoryPricing.launchOfferLabel}</p><h2>{isPortuguese ? "Escolha o ponto de partida ideal" : "Simple packages. Clearly defined scope."}</h2><p>{introductoryPricing.positioning}</p></div>
            <div className="pricing-grid">
              {introductoryPricing.packages.map((pkg, index) => <article className={`price-card ${index === 1 ? "featured" : ""}`} key={pkg.id}>
                {index === 1 && <span className="popular">Most popular</span>}
                <h3>{isPortuguese ? ["Landing page profissional", "Site empresarial", "Projeto personalizado"][index] : pkg.name}</h3><p>{pkg.summary}</p>
                <div className="price"><small>{isPortuguese ? "a partir de" : "starting at"}</small><strong>{price(region[pkg.priceKey])}</strong></div>
                {(pkg.included.length > 0 ? pkg.included : pkg.capabilities).map((item) => <div className="feature" key={item}><Check size={16} />{item}</div>)}
                {pkg.capabilities && <p className="scope-label">These features indicate custom-project scope; they are not included in the starting price.</p>}
                <p className="package-note">{pkg.note}</p>
                {pkg.excluded.length > 0 && <details><summary>Not included <ChevronDown size={16} /></summary><ul>{pkg.excluded.map((item) => <li key={item}>{item}</li>)}</ul></details>}
                <button className="intl-button primary full" type="button" onClick={() => choosePackage(pkg)}>{isPortuguese ? "Selecionar pacote" : "Select Package"}</button>
              </article>)}
            </div>
          </div>
        </section>

        <section className="intl-section alt"><div className="intl-shell options-layout"><div><p className="eyebrow">{isPortuguese ? "Adicionais flexíveis" : "Flexible additions"}</p><h2>{isPortuguese ? "Serviços opcionais" : "Optional services"}</h2><p>{isPortuguese ? "Cada adicional tem escopo separado e preço a partir do valor apresentado." : "Every extra is separately scoped and priced from the amount shown."}</p></div><div className="extras-list">{introductoryPricing.optionalServices.map((service) => <div key={service.name}><span>{service.name}</span><strong>{service.quoted ? (isPortuguese ? "Orçamento separado" : "Quoted separately") : `${isPortuguese ? "a partir de" : "from"} ${price(service[marketKey])}${service.suffix || ""}`}</strong></div>)}</div></div></section>

        <section className="intl-section"><div className={`intl-shell add-ons${marketKey === "brazil" ? " single" : ""}`}><article><p className="eyebrow">{isPortuguese ? "Upgrade opcional" : "Optional upgrade"}</p><h2>English + Portuguese</h2><strong>{isPortuguese ? "a partir de" : "from"} {price(region.bilingual)}</strong><p>{isPortuguese ? "Adicione versões em inglês e português ao seu site. Tradução ou redação podem ser cobradas separadamente, dependendo do volume de conteúdo." : "Add an English and Portuguese version to your website. Translation or copywriting may be charged separately depending on content volume."}</p></article>{marketKey !== "brazil" && <article><p className="eyebrow">Website Care Plan</p><h2>{isPortuguese ? "Manutenção mensal confiável" : "Reliable monthly care"}</h2><strong>{isPortuguese ? "a partir de" : "from"} {price(region.care)}/{isPortuguese ? "mês" : "month"}</strong><ul>{["Hosting monitoring", "Backups", "Security updates", "Dependency updates", "Uptime monitoring", "Up to 30 minutes of minor content changes per month", "Email support"].map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul><p>{isPortuguese ? "Os custos de hospedagem são cobrados separadamente. O plano não inclui suporte ou alterações ilimitadas." : "Hosting costs are charged separately. The plan does not include unlimited support or unlimited changes."}</p></article>}</div></section>
        {marketKey === "brazil" && <BrazilWebsiteCare price={price} />}

        <ClientGrowthChart isPortuguese={isPortuguese} />
        <Portfolio />
        <Process />
        <Faq />
        <QuoteForm region={region} landingPage={landingPage} selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage} isPortuguese={isPortuguese} />
      </main>
      <WhatsAppFloat landingPage={landingPage} isPortuguese={isPortuguese} />
      <footer className="intl-footer"><div className="intl-shell"><strong>Mediatrix Tech</strong><span>Create. Connect. Convert.</span><div><a href="mailto:mediatrixtech@proton.me" onClick={() => trackLink("email_click")}><Mail size={17} />Email</a><a href="https://wa.me/13059920833" onClick={() => trackLink("whatsapp_click")}><MessageCircle size={17} />WhatsApp</a><a href="tel:+13059920833" onClick={() => trackLink("phone_click")}><Phone size={17} />Phone</a></div></div></footer>
    </div>
    </EasterEggI18nProvider>
  );
}

function Portfolio() { return <section className="intl-section alt" id="portfolio"><div className="intl-shell"><div className="intl-heading"><p className="eyebrow">Case studies</p><h2>Websites built around practical business outcomes.</h2><p>Each project begins with a real problem, a focused solution and a clearer path to action.</p></div><div className="case-grid">{portfolio.map((project) => <article className="portfolio-card case-study-card" key={project.name}><header className="case-study-card__header"><p>{project.industry}</p><h3>{project.name}</h3></header><div className="case-study-card__breakdown"><p><strong>Problem</strong>{project.problem}</p><p><strong>Solution</strong>{project.solution}</p><div className="metric-badge case-study-card__impact"><span>Impact / Result</span><strong>{project.impact}</strong></div></div><a className="case-study-card__link" href="#quote-form">View Live Project <span aria-hidden="true">→</span></a></article>)}</div></div></section>; }

function BrazilWebsiteCare({ price }) {
  return <section className="intl-section care-section" id="website-care"><div className="intl-shell">
    <div className="intl-heading"><p className="eyebrow">Website Care Plans</p><h2>Website maintenance from R$59/month.</h2><p>Choose a defined monthly support level for monitoring, updates and minor content changes.</p></div>
    <div className="care-grid">{brazilWebsiteCarePlans.map((plan) => <article className={plan.id === "standard" ? "featured" : ""} key={plan.id}>{plan.id === "standard" && <span className="popular">Most popular</span>}<h3>{plan.name}</h3><strong>{price(plan.price)}/month</strong><ul>{plan.included.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul></article>)}</div>
    <div className="care-terms"><h3>Important plan terms</h3><ul>{brazilWebsiteCareTerms.map((term) => <li key={term}>{term}</li>)}</ul></div>
  </div></section>;
}

function Process() { return <section className="intl-section"><div className="intl-shell"><div className="intl-heading"><p className="eyebrow">A clear four-step process</p><h2>How We Work With Clients Anywhere in Brazil & Worldwide</h2><p>A direct process that keeps scope, feedback and launch details easy to follow from any location.</p></div><div className="process-steps">{[["01", "15-Min WhatsApp Alignment", "Understand goals, budget, and business needs."], ["02", "Clear Scope & Timeline", "No hidden fees, realistic milestones."], ["03", "Live Staging Review", "Test and give feedback on a private staging link."], ["04", "Launch & Google Local Setup", "Go live with Google Maps & analytics fully configured."]].map(([number, title, text]) => <article key={number}><span className="process-steps__number" aria-hidden="true">{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>; }

function Faq() { return <section className="intl-section alt" id="faq"><div className="intl-shell faq-layout"><div><p className="eyebrow">FAQ</p><h2>Clear answers before you request a quote.</h2></div><div>{faq.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div></div></section>; }

function QuoteForm({ region, landingPage, selectedPackage, setSelectedPackage, isPortuguese }) {
  const [status, setStatus] = React.useState("idle");
  const started = React.useRef(false);
  const packageNames = Object.fromEntries(introductoryPricing.packages.map((pkg) => [pkg.id, pkg.name]));
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
  return <section className="intl-section quote-section" id="quote-form"><div className="intl-shell quote-layout"><div><p className="eyebrow">Request a quote</p><h2>{isPortuguese ? "Conte sobre o seu projeto." : "Let’s define the right starting point."}</h2><p>Share a few details. Low-budget enquiries are welcome and reviewed rather than automatically rejected.</p><div className="direct-contact"><a href="mailto:mediatrixtech@proton.me" onClick={() => trackLink("email_click")}><Mail size={18} />mediatrixtech@proton.me</a><a href="https://wa.me/13059920833" onClick={() => trackLink("whatsapp_click")}><MessageCircle size={18} />WhatsApp</a></div></div><form onSubmit={submit} onFocus={onStart}>
    <label><span>Name</span><input name="name" autoComplete="name" required /></label><label><span>WhatsApp / Phone Number</span><input name="phone_whatsapp" type="tel" autoComplete="tel" required /></label><label className="wide"><span>Quick Business Type / Message <em>(optional)</em></span><textarea name="message" rows="4" placeholder="For example: auto repair shop, restaurant, local service…" /></label><button className="intl-button primary wide" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Get Free Review via WhatsApp / Email"}<ArrowRight size={18} /></button><p className="form-trust wide">🔒 Zero spam. We typically reply within 30 minutes during business hours.</p><p className={`form-feedback wide ${status}`} role="status">{status === "success" && "Thank you. Your request was sent successfully."}{status === "error" && "We couldn’t send the form. Please try again or contact us by email."}</p>
  </form></div></section>;
}

function WhatsAppFloat({ landingPage, isPortuguese }) {
  const number = isPortuguese ? "5555999357388" : "13059920833";
  const href = `https://wa.me/${number}?text=Hi!%20I'm%20interested%20in%20a%20free%20website%20review%20for%20my%20business.`;
  return <a className="whatsapp-float" href={href} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp for a fast reply" onClick={() => trackEvent("whatsapp_float_click", { landing_page: landingPage })}>
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path fill="currentColor" d="M19.11 17.21c-.27-.14-1.58-.78-1.82-.86-.24-.09-.42-.14-.59.14-.18.27-.69.86-.85 1.04-.16.18-.31.2-.58.07a7.5 7.5 0 0 1-2.2-1.36 8.22 8.22 0 0 1-1.52-1.9c-.16-.27 0-.41.12-.54.12-.12.27-.31.41-.46.14-.16.18-.27.27-.46.09-.18.05-.34-.02-.48-.07-.14-.59-1.42-.81-1.95-.21-.51-.43-.44-.59-.45h-.5c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.65 1.12 2.83.14.18 1.93 2.95 4.67 4.14.65.28 1.16.45 1.56.58.66.21 1.27.18 1.75.11.53-.08 1.58-.65 1.8-1.27.22-.63.22-1.16.15-1.27-.06-.12-.24-.19-.5-.32Z" /><path fill="currentColor" d="M16.02 3.2c-7.07 0-12.8 5.72-12.8 12.78 0 2.26.59 4.47 1.71 6.42L3.1 28.8l6.57-1.72a12.79 12.79 0 0 0 6.34 1.68h.01c7.06 0 12.78-5.73 12.78-12.79 0-3.42-1.33-6.63-3.75-9.05A12.69 12.69 0 0 0 16.02 3.2Zm0 23.4h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.9 1.02 1.04-3.79-.25-.4a10.6 10.6 0 1 1 8.91 4.88Z" /></svg>
    <span className="whatsapp-text">Chat on WhatsApp</span>
  </a>;
}

export function isInternationalRoute(pathname = typeof window !== "undefined" ? window.location.pathname : "") { return Boolean(routeMap[pathname.replace(/\/$/, "")]); }
