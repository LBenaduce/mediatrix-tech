import React from "react";
import { ArrowRight, Check, ChevronDown, ExternalLink, Mail, MessageCircle, Phone } from "lucide-react";
import { brazilWebsiteCarePlans, brazilWebsiteCareTerms, formatPrice, getPricing, introductoryPricing } from "./introductoryPricing";
import { getAttribution, initializeTracking, trackEvent, trackLink } from "./analytics";
import "./international.css";

const routeMap = {
  "/brazil": { region: "brazil", language: "pt" },
  "/us": { region: "us", language: "en" },
  "/europe": { region: "europe", language: "en" },
  "/switzerland": { region: "switzerland", language: "en" },
  "/brazilian-businesses-abroad": { region: "us", language: "pt" },
};

const portfolio = [
  { name: "AgriClimate Pro", image: "/agriclimate-pro-poster.jpg", need: "Agricultural teams needed climate information that was easier to use in day-to-day decisions.", solution: "A responsive AgTech experience that organizes climate data into a clear interface.", functionality: "Climate-data presentation and decision-support views.", technology: "Modern responsive web development.", result: "Faster access to practical information across desktop and mobile." },
  { name: "Frasson LLC", image: "/frasson-llc-demo-optimized.jpg", need: "A service business needed a credible online presence that clearly explained its work.", solution: "A focused business website with straightforward service presentation and contact paths.", functionality: "Service pages, responsive layout and direct lead contact.", technology: "Modern frontend web development.", result: "A clearer, more professional way for potential clients to understand and contact the business." },
  { name: "Event QR Code", image: "/event-qr-code-poster.jpg", need: "Event guests needed a frictionless way to share their memories.", solution: "A custom event website that allowed guests to upload photos and videos through table QR codes without installing an application.", functionality: "QR access plus photo and video uploads.", technology: "Custom web application and cloud uploads.", result: "Guests could contribute event media directly from their phones." },
  { name: "Cafeteria", image: "/cafeteria-demo.jpg", need: "A local café needed a warm digital presence that reflected its atmosphere and encouraged visitors to explore the menu.", solution: "An elegant, mobile-first website with expressive typography, inviting brand colors and a direct menu call to action.", functionality: "Responsive presentation, brand storytelling and menu access.", technology: "Modern responsive web development.", result: "A memorable online experience that helps turn interest into in-person visits." },
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

const projectTypes = [
  { value: "starter", label: "Starter landing page" },
  { value: "business", label: "Small business website" },
  { value: "redesign", label: "Website redesign" },
  { value: "bilingual", label: "Bilingual website" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "booking", label: "Booking website" },
  { value: "custom", label: "Custom web application" },
  { value: "other", label: "Other" },
];
const budgets = {
  BRL: ["Under R$500", "R$500–R$900", "R$900–R$1.600", "R$1.600–R$3.000", "R$3.000+"],
  USD: ["Under $250", "$250–$500", "$500–$800", "$800–$1,500", "$1,500+"],
  EUR: ["Under €230", "€230–€450", "€450–€750", "€750–€1,400", "€1,400+"],
  CHF: ["Under CHF 290", "CHF 290–550", "CHF 550–900", "CHF 900–1,600", "CHF 1,600+"],
};

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

export function InternationalLanding() {
  const path = window.location.pathname.replace(/\/$/, "") || "/us";
  const route = routeMap[path] || routeMap["/us"];
  const [marketKey, setMarketKey] = React.useState(route.region);
  const region = React.useMemo(() => getPricing(marketKey), [marketKey]);
  const isPortuguese = route.language === "pt";
  const landingPage = path;
  const [selectedPackage, setSelectedPackage] = React.useState("");
  const price = (amount) => isPortuguese && region.currency === "USD" ? `US$ ${amount.toLocaleString("pt-BR")}` : formatPrice(region, amount);

  React.useEffect(() => {
    initializeTracking();
    document.documentElement.lang = isPortuguese ? "pt-BR" : "en";
    document.title = isPortuguese ? "Sites profissionais no exterior | Mediatrix Tech" : `Professional Websites for Small Businesses — Starting at ${formatPrice(region, region.starter)}`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", isPortuguese ? "Sites profissionais em inglês para empresas brasileiras nos Estados Unidos e Europa." : `Professional small-business websites with international launch pricing from ${formatPrice(region, region.starter)}.`);
    trackEvent("google_ads_landing_page_view", { landing_page: landingPage, country_target: region.countryTarget, currency: region.currency, market: region.market });
    if (new URLSearchParams(window.location.search).get("submitted") === "true") trackEvent("thank_you_page_view", { landing_page: landingPage });
  }, [isPortuguese, landingPage, region.countryTarget, region.starter, region]);

  useSectionView("pricing", "pricing_section_view");

  const choosePackage = (pkg) => {
    setSelectedPackage(pkg.id);
    trackEvent("package_selected", { package_name: pkg.name, starting_price: region[pkg.priceKey], currency: region.currency, market: region.market, estimated_budget: "", landing_page: landingPage, country_target: region.countryTarget });
    document.getElementById("quote-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="intl-page">
      <header className="intl-header">
        <a className="intl-brand" href="#top"><img src="/mediatrix-brand-mark.jpg" alt="" />Mediatrix Tech</a>
        <nav aria-label="Campaign navigation"><a href="#pricing">Pricing</a><a href="#portfolio">Work</a><a href="#faq">FAQ</a></nav>
        <a className="intl-header-cta" href="#quote-form" onClick={() => trackEvent("primary_cta_click", { landing_page: landingPage })}>{isPortuguese ? "Solicitar orçamento" : "Request a Quote"}</a>
      </header>

      <main id="top">
        <section className="intl-hero">
          <div className="intl-shell intl-hero-grid">
            <div>
              <p className="launch-label">{introductoryPricing.launchOfferLabel}</p>
              <h1>{isPortuguese ? "Seu site profissional no exterior por um valor acessível" : `Professional Websites for Small Businesses — Starting at ${price(region.starter)}`}</h1>
              <p className="hero-lead">{isPortuguese ? "Preços especiais de lançamento para os primeiros clientes internacionais da Mediatrix Tech." : "Modern, mobile-friendly websites with clear introductory pricing and direct communication with your developer."}</p>
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

        <Portfolio />
        <Process />
        <Faq />
        <QuoteForm region={region} marketKey={marketKey} setMarketKey={setMarketKey} landingPage={landingPage} selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage} isPortuguese={isPortuguese} />
      </main>
      <a className="mobile-sticky" href="#quote-form" onClick={() => trackEvent("primary_cta_click", { landing_page: landingPage })}>{isPortuguese ? "Solicitar orçamento" : `Start from ${price(region.starter)}`}<ArrowRight size={17} /></a>
      <footer className="intl-footer"><div className="intl-shell"><strong>Mediatrix Tech</strong><span>Create. Connect. Convert.</span><div><a href="mailto:mediatrixtech@proton.me" onClick={() => trackLink("email_click")}><Mail size={17} />Email</a><a href="https://wa.me/13059920833" onClick={() => trackLink("whatsapp_click")}><MessageCircle size={17} />WhatsApp</a><a href="tel:+13059920833" onClick={() => trackLink("phone_click")}><Phone size={17} />Phone</a></div></div></footer>
    </div>
  );
}

function Portfolio() { return <section className="intl-section alt" id="portfolio"><div className="intl-shell"><div className="intl-heading"><p className="eyebrow">Real work</p><h2>Websites built around practical needs.</h2><p>Clear outcomes for real businesses and events—not just technical specifications.</p></div><div className="case-grid">{portfolio.map((project) => <article key={project.name}><img src={project.image} alt={`${project.name} project preview`} loading="lazy" /><div><h3>{project.name}</h3><p><strong>Need:</strong> {project.need}</p><p><strong>Solution:</strong> {project.solution}</p><p><strong>Functionality:</strong> {project.functionality}</p><p><strong>Technology:</strong> {project.technology}</p><p><strong>Benefit:</strong> {project.result}</p></div></article>)}</div></div></section>; }

function BrazilWebsiteCare({ price }) {
  return <section className="intl-section care-section" id="website-care"><div className="intl-shell">
    <div className="intl-heading"><p className="eyebrow">Website Care Plans</p><h2>Website maintenance from R$59/month.</h2><p>Choose a defined monthly support level for monitoring, updates and minor content changes.</p></div>
    <div className="care-grid">{brazilWebsiteCarePlans.map((plan) => <article className={plan.id === "standard" ? "featured" : ""} key={plan.id}>{plan.id === "standard" && <span className="popular">Most popular</span>}<h3>{plan.name}</h3><strong>{price(plan.price)}/month</strong><ul>{plan.included.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul></article>)}</div>
    <div className="care-terms"><h3>Important plan terms</h3><ul>{brazilWebsiteCareTerms.map((term) => <li key={term}>{term}</li>)}</ul></div>
  </div></section>;
}

function Process() { return <section className="intl-section"><div className="intl-shell"><div className="intl-heading"><p className="eyebrow">A straightforward process</p><h2>From brief to launch, without mystery.</h2></div><div className="process-grid">{[["01", "Project fit", "We clarify your goal, audience, content and required functionality."], ["02", "Proposal", "You receive a defined scope, schedule and confirmed price."], ["03", "Design & build", "Your responsive website is developed with direct communication throughout."], ["04", "Review & launch", "Included revisions are completed before deployment assistance."]].map(([n, title, text]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>; }

function Faq() { return <section className="intl-section alt" id="faq"><div className="intl-shell faq-layout"><div><p className="eyebrow">FAQ</p><h2>Clear answers before you request a quote.</h2></div><div>{faq.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div></div></section>; }

function QuoteForm({ region, marketKey, setMarketKey, landingPage, selectedPackage, setSelectedPackage, isPortuguese }) {
  const [currency, setCurrency] = React.useState(region.currency);
  const [status, setStatus] = React.useState("idle");
  const started = React.useRef(false);
  const packageNames = Object.fromEntries(introductoryPricing.packages.map((pkg) => [pkg.id, pkg.name]));
  React.useEffect(() => setCurrency(region.currency), [region.currency]);
  const onStart = () => { if (!started.current) { started.current = true; trackEvent("quote_form_start", { landing_page: landingPage }); } };
  const submit = async (event) => {
    event.preventDefault(); setStatus("sending");
    const form = event.currentTarget; const formData = new FormData(form); const attribution = getAttribution();
    const estimatedBudget = formData.get("estimated_budget") || "";
    const isLowBudget = estimatedBudget.startsWith("Under");
    const selectedPackageId = formData.get("selected_package");
    const selectedPackageConfig = introductoryPricing.packages.find((pkg) => pkg.id === selectedPackageId);
    const analyticsData = { package_name: packageNames[selectedPackageId] || selectedPackageId, selected_package: packageNames[selectedPackageId] || selectedPackageId, starting_price: selectedPackageConfig ? region[selectedPackageConfig.priceKey] : undefined, currency: formData.get("preferred_currency"), preferred_currency: formData.get("preferred_currency"), market: region.market, estimated_budget: estimatedBudget, landing_page: landingPage, ...attribution };
    try {
      const response = await fetch("https://formsubmit.co/ajax/mediatrixtech@proton.me", { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify({ ...Object.fromEntries(formData.entries()), ...attribution, low_budget_lead: isLowBudget ? "yes" : "no", landing_page: landingPage, _subject: "International website quote request" }) });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false || result.success === "false") throw new Error("Submission failed");
      trackEvent("quote_form_submit", analyticsData); form.reset(); setSelectedPackage(""); setStatus("success");
    } catch { trackEvent("quote_form_error", analyticsData); setStatus("error"); }
  };
  return <section className="intl-section quote-section" id="quote-form"><div className="intl-shell quote-layout"><div><p className="eyebrow">Request a quote</p><h2>{isPortuguese ? "Conte sobre o seu projeto." : "Let’s define the right starting point."}</h2><p>Share a few details. Low-budget enquiries are welcome and reviewed rather than automatically rejected.</p><div className="direct-contact"><a href="mailto:mediatrixtech@proton.me" onClick={() => trackLink("email_click")}><Mail size={18} />mediatrixtech@proton.me</a><a href="https://wa.me/13059920833" onClick={() => trackLink("whatsapp_click")}><MessageCircle size={18} />WhatsApp</a></div></div><form onSubmit={submit} onFocus={onStart}>
    <label><span>Full name</span><input name="full_name" autoComplete="name" required /></label><label><span>Business name</span><input name="business_name" autoComplete="organization" required /></label><label><span>Country</span><input name="country" autoComplete="country-name" required /></label><label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label><label><span>Phone or WhatsApp</span><input name="phone_whatsapp" type="tel" autoComplete="tel" required /></label><label className="wide"><span>Current website</span><input name="current_website" type="url" placeholder="https:// (optional)" /></label><label><span>Project type</span><select name="selected_package" value={selectedPackage} onChange={(e) => setSelectedPackage(e.target.value)} required><option value="">Select one</option>{projectTypes.map((type) => <option value={type.value} key={type.value}>{type.label}</option>)}</select></label><label><span>Target market</span><select name="market" value={marketKey} onChange={(e) => setMarketKey(e.target.value)}><option value="brazil">Brazil</option><option value="us">United States</option><option value="europe">Europe</option><option value="switzerland">Switzerland</option></select></label><label><span>Preferred currency</span><select name="preferred_currency" value={currency} onChange={(e) => setCurrency(e.target.value)}><option>BRL</option><option>USD</option><option>EUR</option><option>CHF</option></select></label><label><span>Estimated budget</span><select name="estimated_budget" required><option value="">Select a range</option>{budgets[currency].map((budget) => <option key={budget}>{budget}</option>)}</select></label><label><span>Desired launch date</span><input name="desired_launch_date" type="date" /></label><label className="wide"><span>Project description</span><textarea name="project_description" rows="5" required /></label><button className="intl-button primary wide" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Request Your Introductory Quote"}<ArrowRight size={18} /></button><p className={`form-feedback wide ${status}`} role="status">{status === "success" && "Thank you. Your request was sent successfully."}{status === "error" && "We couldn’t send the form. Please try again or contact us by email."}</p>
  </form></div></section>;
}

export function isInternationalRoute(pathname = window.location.pathname) { return Boolean(routeMap[pathname.replace(/\/$/, "")]); }
