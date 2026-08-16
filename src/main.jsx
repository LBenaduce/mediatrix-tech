import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import {
  AudioLines,
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  Building2,
  Clapperboard,
  Code2,
  ExternalLink,
  Globe2,
  Image as ImageIcon,
  LayoutTemplate,
  Mail,
  Menu,
  MessageCircle,
  QrCode,
  Quote,
  Send,
  Sprout,
  Wrench,
  Workflow,
  X,
} from "lucide-react";
import { getEasterEggCopy, languages, rtlLanguages, translations } from "./translations";
import {
  getLanguageRoute,
  getLocalizedUrl,
  getPreferredLanguage,
  getRouteLanguage,
  saveManualLanguage,
} from "./i18n";
import { InternationalLanding, isInternationalRoute } from "./InternationalLanding";
import { LocalSantaMariaLanding } from "./LocalSantaMariaLanding";
import { PublicSectionPage } from "./PublicSectionPage";
import { WhatsAppFloat } from "./PublicChrome";
import { NotFound } from "./easter-eggs/NotFound";
import { SecretLogo } from "./easter-eggs/SecretLogo";
import { printConsoleGreeting } from "./easter-eggs/consoleGreeting";
import { EasterEggI18nProvider } from "./easter-eggs/EasterEggI18n";
import { applyPageSeo, getStructuredData, LOCAL_ROUTE, ROUTE_SEO } from "./seo";
import "./styles.css";
import "./easter-eggs/easter-eggs.css";

const navigationIds = ["top", "servicos", "portfolio", "empresa", "contato"];
const serviceIcons = {
  web: Code2,
  photo: ImageIcon,
  video: Clapperboard,
  audio: AudioLines,
  site: Building2,
  landing: LayoutTemplate,
  custom: Workflow,
  media: Clapperboard,
  event: QrCode,
  agri: Sprout,
  care: Wrench,
};
const DigitalJunkDrawer = React.lazy(() => import("./easter-eggs/DigitalJunkDrawer"));
const InternalQuotes = React.lazy(() => import("./internal/InternalQuotes").then((module) => ({ default: module.InternalQuotes })));

const projectMedia = [
  { media: "/agriclimate-pro-demo-pt.mp4", nonPortugueseMedia: "/agriclimate-pro-demo.mp4", poster: "/agriclimate-pro-poster-pt.jpg", nonPortuguesePoster: "/agriclimate-pro-poster.jpg", kind: "video", width: 1280, height: 720 },
  { media: "/frasson-farois-demo-pt.jpg", nonPortugueseMedia: "/frasson-llc-demo-optimized.jpg", kind: "image", width: 1800, height: 988, nonPortugueseWidth: 800, nonPortugueseHeight: 456 },
  { media: "/event-qr-code-demo.mp4", nonPortugueseMedia: "/event-qr-code-demo-english.mp4", poster: "/event-qr-code-poster.jpg", nonPortuguesePoster: "/event-qr-code-poster-en.jpg", kind: "video", width: 1280, height: 720 },
  { media: "/cafeteria-demo-pt.png", nonPortugueseMedia: "/cafeteria-demo-en.png", kind: "image", width: 1024, height: 1536 },
  { media: "/oficina-mecanica-demo.jpg", kind: "image", width: 2396, height: 1852 },
  { kind: "collaboration" },
];

const verifiedTestimonials = [];

const phaseOneCopy = {
  "pt-BR": { challenge: "O desafio", solution: "A solução", outcome: "Resultado", before: "Antes", after: "Depois", comparisonEyebrow: "Antes e depois", comparisonTitle: "Da fricção a um fluxo mais simples.", comparisonDescription: "Compare o problema operacional com a experiência entregue.", testimonialsEyebrow: "Depoimentos", testimonialsTitle: "O que os clientes dizem", testimonialsDescription: "Relatos publicados somente com autorização do cliente.", evidence: "Evidência do projeto", evidenceValue: "Experiência responsiva", beforeText: "Informações importantes dispersas e difíceis de consultar durante a rotina.", afterText: "Uma experiência responsiva organiza as informações e deixa a próxima ação clara.", showBefore: "Mostrar situação anterior", showAfter: "Mostrar solução entregue" },
  en: { challenge: "The challenge", solution: "The solution", outcome: "Outcome", before: "Before", after: "After", comparisonEyebrow: "Before and after", comparisonTitle: "From friction to a simpler workflow.", comparisonDescription: "Compare the operational problem with the experience delivered.", testimonialsEyebrow: "Testimonials", testimonialsTitle: "What clients say", testimonialsDescription: "Quotes are published only with the client’s approval.", evidence: "Project evidence", evidenceValue: "Responsive experience", beforeText: "Important information was scattered and difficult to consult during day-to-day work.", afterText: "A responsive experience organizes the information and makes the next action clear.", showBefore: "Show previous situation", showAfter: "Show delivered solution" },
  es: { challenge: "El desafío", solution: "La solución", outcome: "Resultado", before: "Antes", after: "Después", comparisonEyebrow: "Antes y después", comparisonTitle: "De la fricción a un flujo más simple.", comparisonDescription: "Compara el problema operativo con la experiencia entregada.", evidence: "Evidencia del proyecto", evidenceValue: "Experiencia adaptable", beforeText: "La información importante estaba dispersa y era difícil de consultar.", afterText: "Una experiencia adaptable organiza la información y aclara la próxima acción.", showBefore: "Mostrar situación anterior", showAfter: "Mostrar solución entregada" },
  fr: { challenge: "Le défi", solution: "La solution", outcome: "Résultat", before: "Avant", after: "Après", comparisonEyebrow: "Avant et après", comparisonTitle: "De la friction à un parcours plus simple.", comparisonDescription: "Comparez le problème opérationnel à l’expérience livrée.", evidence: "Preuve du projet", evidenceValue: "Expérience adaptative", beforeText: "Les informations importantes étaient dispersées et difficiles à consulter.", afterText: "Une expérience adaptative organise les informations et clarifie l’action suivante.", showBefore: "Afficher la situation initiale", showAfter: "Afficher la solution livrée" },
  de: { challenge: "Die Herausforderung", solution: "Die Lösung", outcome: "Ergebnis", before: "Vorher", after: "Nachher", comparisonEyebrow: "Vorher und nachher", comparisonTitle: "Von Reibung zu einem einfacheren Ablauf.", comparisonDescription: "Vergleichen Sie das betriebliche Problem mit der gelieferten Lösung.", evidence: "Projektnachweis", evidenceValue: "Responsive Erfahrung", beforeText: "Wichtige Informationen waren verstreut und schwer zugänglich.", afterText: "Eine responsive Lösung ordnet Informationen und macht den nächsten Schritt klar.", showBefore: "Ausgangssituation zeigen", showAfter: "Gelieferte Lösung zeigen" },
  "zh-CN": { challenge: "挑战", solution: "解决方案", outcome: "成果", before: "之前", after: "之后", comparisonEyebrow: "前后对比", comparisonTitle: "从繁琐到更简单的流程。", comparisonDescription: "对比运营问题与交付的数字体验。", evidence: "项目依据", evidenceValue: "响应式体验", beforeText: "重要信息分散，日常工作中难以快速查阅。", afterText: "响应式体验将信息有序呈现，并明确下一步操作。", showBefore: "显示之前的情况", showAfter: "显示交付的解决方案" },
  hi: { challenge: "चुनौती", solution: "समाधान", outcome: "परिणाम", before: "पहले", after: "बाद में", comparisonEyebrow: "पहले और बाद में", comparisonTitle: "जटिलता से सरल कार्यप्रवाह तक।", comparisonDescription: "परिचालन समस्या और दिए गए अनुभव की तुलना करें।", evidence: "परियोजना प्रमाण", evidenceValue: "रेस्पॉन्सिव अनुभव", beforeText: "महत्वपूर्ण जानकारी बिखरी हुई थी और देखना कठिन था।", afterText: "रेस्पॉन्सिव अनुभव जानकारी व्यवस्थित करता है और अगला कदम स्पष्ट करता है।", showBefore: "पहले की स्थिति दिखाएँ", showAfter: "दिया गया समाधान दिखाएँ" },
  ar: { challenge: "التحدي", solution: "الحل", outcome: "النتيجة", before: "قبل", after: "بعد", comparisonEyebrow: "قبل وبعد", comparisonTitle: "من التعقيد إلى مسار عمل أبسط.", comparisonDescription: "قارن المشكلة التشغيلية بالتجربة التي تم تسليمها.", evidence: "دليل المشروع", evidenceValue: "تجربة متجاوبة", beforeText: "كانت المعلومات المهمة متفرقة ويصعب الرجوع إليها.", afterText: "تنظم التجربة المتجاوبة المعلومات وتوضح الخطوة التالية.", showBefore: "عرض الوضع السابق", showAfter: "عرض الحل المُسلَّم" },
};

const contactLinks = {
  brasil: "https://wa.me/5555999357388?text=Ol%C3%A1%2C%20Mediatrix%20Tech.%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento.",
  estadosUnidos: "https://wa.me/13059920833?text=Hello%20Mediatrix%20Tech%2C%20I%20would%20like%20to%20request%20a%20quote.",
  email: "mailto:mediatrixtech@proton.me",
  upwork: "https://www.upwork.com/freelancers/~015020486545a9742b",
};

function getLanguageStorage() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function useActiveSection() {
  const [activeSection, setActiveSection] = React.useState("top");

  React.useEffect(() => {
    const sections = navigationIds.map((id) => document.getElementById(id)).filter(Boolean);
    const updateActiveSection = () => {
      const marker = 112;
      const current = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= marker && rect.bottom > marker;
      });
      if (current) setActiveSection(current.id);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return activeSection;
}

function App({ initialLanguage }) {
  const activeSection = useActiveSection();
  const [selectedService, setSelectedService] = React.useState("");
  const [language, setLanguage] = React.useState(initialLanguage);
  const copy = translations[language];

  const changeLanguage = React.useCallback((nextLanguage) => {
    saveManualLanguage(nextLanguage, getLanguageStorage());
    setLanguage(nextLanguage);
    window.history.replaceState(window.history.state, "", getLocalizedUrl(nextLanguage, window.location));
  }, []);

  React.useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = rtlLanguages.has(language) ? "rtl" : "ltr";
    const pathname = getLanguageRoute(language);
    const homeSeo = {
      ...ROUTE_SEO[pathname],
      title: copy.metaTitle,
      description: copy.metaDescription,
      locale: language.replace("-", "_"),
    };
    applyPageSeo({ pathname, seo: homeSeo, structuredData: getStructuredData(pathname, homeSeo) });
  }, [copy.metaDescription, copy.metaTitle, language]);

  React.useEffect(() => {
    printConsoleGreeting(copy.easterEggs.console);
  }, [copy.easterEggs.console]);

  return (
    <EasterEggI18nProvider locale={language}>
      <a className="skip-link" href="#conteudo">{copy.skip}</a>
      <Header
        activeSection={activeSection}
        copy={copy}
        language={language}
        onLanguageChange={changeLanguage}
      />
      <main id="conteudo">
        <Hero copy={copy} />
        <ProjectShowcase copy={copy} language={language} />
        <Services copy={copy} onSelectService={setSelectedService} />
        <Portfolio copy={copy} language={language} />
        <Company copy={copy} />
        <Contact copy={copy} selectedService={selectedService} onSelectService={setSelectedService} />
      </main>
      <Footer copy={copy} language={language} />
      <WhatsAppFloat />
    </EasterEggI18nProvider>
  );
}

function Header({ activeSection, copy, language, onLanguageChange }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuButtonRef = React.useRef(null);
  const navigation = navigationIds.map((id, index) => [id, copy.nav[index]]);

  React.useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const changeLanguage = (event) => {
    onLanguageChange(event.target.value);
    closeMenu();
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <SecretLogo
          className="brand"
          href="#top"
          ariaLabel={`Mediatrix Tech — ${copy.nav[0]}`}
          onClick={closeMenu}
        />

        <nav className="desktop-nav" aria-label={copy.primaryNavigation}>
          {navigation.map(([id, label]) => (
            <a href={`#${id}`} className={activeSection === id ? "active" : ""} aria-current={activeSection === id ? "page" : undefined} key={id}>
              {label}
            </a>
          ))}
        </nav>

        <LanguageSelector copy={copy} language={language} onChange={changeLanguage} />
        <a className="header-cta" href="#formulario">{copy.quote}</a>

        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav className={`mobile-nav ${menuOpen ? "open" : ""}`} id="menu-mobile" aria-label={copy.mobileNavigation} hidden={!menuOpen}>
        {navigation.map(([id, label]) => (
          <a href={`#${id}`} className={activeSection === id ? "active" : ""} aria-current={activeSection === id ? "page" : undefined} onClick={closeMenu} key={id}>
            {label}
          </a>
        ))}
        <a className="mobile-quote" href="#formulario" onClick={closeMenu}>{copy.quote}</a>
      </nav>
    </header>
  );
}

function LanguageSelector({ copy, language, onChange }) {
  return (
    <label className="language-selector">
      <Globe2 size={17} aria-hidden="true" />
      <span className="sr-only">{copy.language}</span>
      <select aria-label={copy.language} value={language} onChange={onChange}>
        {languages.map(([locale, code, name]) => <option value={locale} key={locale}>{code} · {name}</option>)}
      </select>
    </label>
  );
}

function Hero({ copy }) {
  const primaryAction = copy.hero.primaryCta
    ? { href: "#formulario", label: copy.hero.primaryCta }
    : { href: "#servicos", label: copy.hero.services };
  const secondaryAction = copy.hero.secondaryCta
    ? { href: "#portfolio", label: copy.hero.secondaryCta }
    : { href: "#formulario", label: copy.quote };

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <div className="shell hero-content">
        <div className="hero-copy">
          <p className="motto">Create. Connect. Convert.</p>
          <h1 id="hero-title">
            {splitHeroTitle(copy.hero.title).map((line) => <span className="hero-title-line" key={line}>{line}</span>)}
          </h1>
          <p className="hero-footnote">{copy.hero.footnote}</p>
          <div className="hero-actions">
            <a className="button primary" href={primaryAction.href}>{primaryAction.label} <ArrowRight size={18} aria-hidden="true" /></a>
            <a className="button secondary" href={secondaryAction.href}>{secondaryAction.label}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function splitHeroTitle(title) {
  return title.match(/[^.!?。؟।]+(?:[.!?。؟।]+\*?|$)/gu)?.map((line) => line.trim()).filter(Boolean) || [title];
}

function ProjectShowcase({ copy, language }) {
  const isPortuguese = language === "pt-BR";
  const desktopProject = copy.projects[1];
  const mobileProject = copy.projects[3];

  return (
    <section className="project-showcase" aria-labelledby="showcase-title">
      <div className="shell showcase-shell">
        <h2 className="sr-only" id="showcase-title">{copy.portfolioSection.title}</h2>
        <div className="showcase-stage">
          <article className="showcase-browser">
            <div className="showcase-browser-bar" aria-hidden="true">
              <span /><span /><span />
              <div>{desktopProject.name}</div>
            </div>
            <div className="showcase-browser-viewport">
              <img
                src={isPortuguese ? "/frasson-farois-demo-pt.jpg" : "/frasson-llc-demo-optimized.jpg"}
                alt={`${copy.portfolioSection.screenshot}: ${desktopProject.name}`}
                width={isPortuguese ? 1800 : 800}
                height={isPortuguese ? 988 : 456}
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div className="showcase-project-meta">
              <strong>{desktopProject.name}</strong>
              <span>{desktopProject.category}</span>
            </div>
          </article>

          <article className="showcase-phone">
            <div className="showcase-phone-speaker" aria-hidden="true" />
            <div className="showcase-phone-screen">
              <img
                src={isPortuguese ? "/cafeteria-demo-pt-optimized.jpg" : "/cafeteria-demo-en-optimized.jpg"}
                alt={`${copy.portfolioSection.screenshot}: ${mobileProject.name}`}
                width="1024"
                height="1536"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="showcase-phone-label">
              <strong>{mobileProject.name}</strong>
              <span>{mobileProject.category}</span>
            </div>
          </article>

          <a className="showcase-link" href="#portfolio">
            <span>{copy.hero.secondaryCta || copy.portfolioSection.view}</span>
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, description, id }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2 id={id}>{title}</h2>{description && <p className="section-description">{description}</p>}</div>;
}

function Services({ copy, onSelectService }) {
  const homepageServices = copy.services.filter((service) => service.id !== "media");

  return (
    <section className="section services-section" id="servicos" aria-labelledby="servicos-title">
      <div className="shell">
        <div className="services-heading">
          <h2 id="servicos-title">{copy.servicesSection.title}</h2>
        </div>
        <div className="services-grid">
          {homepageServices.map((service) => {
            const Icon = serviceIcons[service.id];
            return (
              <a className={`service-tile${service.id === "site" || service.id === "landing" ? " is-featured" : ""}`} href="#formulario" onClick={() => onSelectService(service.id)} key={service.id}>
                <span className="icon-box" aria-hidden="true"><Icon size={21} /></span>
                <span className="service-copy">
                  <strong className="service-label">{service.shortTitle || service.title}</strong>
                  <span className="service-subtitle">{service.subtitle}</span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, copy, labels }) {
  const cardRef = React.useRef(null);

  const handlePointerMove = (event) => {
    if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;

    const card = cardRef.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const pointerX = event.clientX - bounds.left;
    const pointerY = event.clientY - bounds.top;
    const normalizedX = pointerX / bounds.width - 0.5;
    const normalizedY = pointerY / bounds.height - 0.5;

    card.style.setProperty("--pointer-x", `${pointerX}px`);
    card.style.setProperty("--pointer-y", `${pointerY}px`);
    card.style.setProperty("--rotate-x", `${(-normalizedY * 7).toFixed(2)}deg`);
    card.style.setProperty("--rotate-y", `${(normalizedX * 7).toFixed(2)}deg`);
  };

  const resetPointerEffect = () => {
    const card = cardRef.current;
    if (!card) return;

    card.style.setProperty("--pointer-x", "50%");
    card.style.setProperty("--pointer-y", "50%");
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
  };

  if (project.kind === "collaboration") {
    return (
      <article className="project-card project-card--collaboration">
        <div className="project-card-surface collaboration-card">
          <div className="collaboration-visual" aria-hidden="true">
            <span className="collaboration-icon"><BrainCircuit size={44} strokeWidth={1.5} /></span>
            <span className="data-node node-one" /><span className="data-node node-two" /><span className="data-node node-three" />
            <span className="data-line line-one" /><span className="data-line line-two" />
          </div>
          <div className="collaboration-content">
            <div className="collaboration-copy">
              <p className="collaboration-eyebrow">{project.collection}</p>
              <p className="project-category">{project.category}</p>
              <h3>{project.name}</h3>
              <p className="collaboration-description">{project.description}</p>
            </div>
            <dl className="collaboration-metrics">
              {project.metrics.map(({ value, label }) => <div key={value}><dt>{value}</dt><dd>{label}</dd></div>)}
            </dl>
            <ul className="collaboration-tags" aria-label={project.tagsLabel}>
              {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="project-card" ref={cardRef} onPointerMove={handlePointerMove} onPointerLeave={resetPointerEffect}>
      <div className="project-card-surface">
        <div className="project-media">
          {project.kind === "video" ? (
            <video muted playsInline preload="none" poster={project.poster} width={project.width} height={project.height} aria-label={`${copy.portfolioSection.videoDemo}: ${project.name}`}><source src={project.media} type="video/mp4" /></video>
          ) : (
            <img src={project.media} alt={`${copy.portfolioSection.screenshot}: ${project.name}`} width={project.width} height={project.height} loading="lazy" />
          )}
        </div>
        <div className="project-content">
          <p className="project-category">{project.category}</p><h3>{project.name}</h3>
          <div className="case-study-narrative">
            <div><strong>{labels.challenge}</strong><p>{project.problem || project.description}</p></div>
            <div><strong>{labels.solution}</strong><p>{project.description}</p></div>
          </div>
          <div className="case-study-outcome"><span>{labels.evidence}</span><strong>{project.outcome || labels.evidenceValue}</strong></div>
          <a className="text-link" href={project.media} target="_blank" rel="noopener noreferrer">{copy.portfolioSection.view} <ExternalLink size={16} aria-hidden="true" /></a>
        </div>
      </div>
    </article>
  );
}

function BeforeAfterComparison({ labels }) {
  const [showAfter, setShowAfter] = React.useState(true);
  return (
    <section className="project-comparison" aria-labelledby="comparison-title">
      <div className="comparison-copy">
        <p className="eyebrow">{labels.comparisonEyebrow}</p>
        <h3 id="comparison-title">{labels.comparisonTitle}</h3>
        <p>{labels.comparisonDescription}</p>
        <div className="comparison-toggle" role="group" aria-label={labels.comparisonEyebrow}>
          <button type="button" className={!showAfter ? "active" : ""} aria-pressed={!showAfter} onClick={() => setShowAfter(false)}>{labels.before}</button>
          <button type="button" className={showAfter ? "active" : ""} aria-pressed={showAfter} onClick={() => setShowAfter(true)}>{labels.after}</button>
        </div>
      </div>
      <div className={`comparison-panel ${showAfter ? "is-after" : "is-before"}`} aria-live="polite">
        <span>{showAfter ? labels.after : labels.before}</span>
        <Quote size={28} aria-hidden="true" />
        <p>{showAfter ? labels.afterText : labels.beforeText}</p>
        <img src="/agriclimate-pro-poster.jpg" alt="" width="1280" height="720" loading="lazy" aria-hidden="true" />
      </div>
    </section>
  );
}

function Testimonials({ labels }) {
  if (verifiedTestimonials.length === 0) return null;
  return <section className="testimonials" aria-labelledby="testimonials-title"><SectionHeading eyebrow={labels.testimonialsEyebrow} title={labels.testimonialsTitle} description={labels.testimonialsDescription} id="testimonials-title" /><div className="testimonial-grid">{verifiedTestimonials.map((testimonial) => <blockquote key={testimonial.quote}><Quote aria-hidden="true" /><p>{testimonial.quote}</p><footer><strong>{testimonial.name}</strong><span>{testimonial.company}</span></footer></blockquote>)}</div></section>;
}

function Portfolio({ copy, language }) {
  const labels = phaseOneCopy[language] || phaseOneCopy.en;
  const projects = copy.projects.map((project, index) => {
    const projectAssets = projectMedia[index];
    return {
      ...project,
      ...projectAssets,
      problem: project.type === "collaboration" ? project.description : labels.beforeText,
      media: language === "pt-BR" ? projectAssets.media : projectAssets.nonPortugueseMedia || projectAssets.media,
      poster: language === "pt-BR" ? projectAssets.poster : projectAssets.nonPortuguesePoster || projectAssets.poster,
      width: language === "pt-BR" ? projectAssets.width : projectAssets.nonPortugueseWidth || projectAssets.width,
      height: language === "pt-BR" ? projectAssets.height : projectAssets.nonPortugueseHeight || projectAssets.height,
    };
  });
  return (
    <section className="section portfolio-section" id="portfolio" aria-labelledby="portfolio-title">
      <div className="shell">
        <SectionHeading eyebrow={copy.portfolioSection.eyebrow} title={copy.portfolioSection.title} description={copy.portfolioSection.description} id="portfolio-title" />
        <div className="portfolio-grid">
          {projects.map((project) => (
            <ProjectCard project={project} copy={copy} labels={labels} key={project.name} />
          ))}
        </div>
        <BeforeAfterComparison labels={labels} />
        <Testimonials labels={labels} />
      </div>
    </section>
  );
}

function Company({ copy }) {
  return (
    <section className="section company-section" id="empresa" aria-labelledby="empresa-title">
      <div className="shell company-layout">
        <p className="eyebrow">{copy.company.eyebrow}</p>
        <h2 className="company-statement" id="empresa-title">Made by Humans</h2>
        <p className="company-intro">{copy.company.description}</p>
        <div className="company-facts">
          {copy.company.facts.map(([title, description], index) => <article key={title}><span aria-hidden="true">0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}
        </div>
      </div>
    </section>
  );
}

function Contact({ copy, selectedService, onSelectService }) {
  const [status, setStatus] = React.useState("idle");
  const channelData = [
    [contactLinks.estadosUnidos, MessageCircle, "whatsapp"],
    [contactLinks.brasil, MessageCircle, "whatsapp"],
    [contactLinks.email, Mail, "email"],
    [contactLinks.upwork, BriefcaseBusiness, "upwork"],
  ];

  const submitForm = async (event) => {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const serviceName = copy.services.find((service) => service.id === data.service)?.title || data.service;

    try {
      const response = await fetch("https://formsubmit.co/ajax/mediatrixtech@proton.me", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, service: serviceName, _url: window.location.href.split("#")[0] }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success === false || result.success === "false") throw new Error();
      form.reset();
      onSelectService("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="section contact-section" id="contato" aria-labelledby="contato-title">
      <div className="shell">
        <SectionHeading eyebrow={copy.contact.eyebrow} title={copy.contact.title} description={copy.contact.description} id="contato-title" />
        <div className="contact-layout">
          <div className="contact-channels" aria-label={copy.contact.channelsLabel}>
            {copy.contact.channels.map(([title, detail], index) => {
              const [href, Icon, channel] = channelData[index];
              return <a className={`contact-channel ${channel}`} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} key={`${title}-${detail}`}><span className="contact-icon"><Icon size={21} aria-hidden="true" /></span><span><strong>{title}</strong><small>{detail}</small></span><span className="channel-arrow"><ArrowRight size={17} aria-hidden="true" /></span></a>;
            })}
          </div>

          <div className="form-card" id="formulario">
            <h3>{copy.contact.form.title}</h3><p>{copy.contact.form.description}</p>
            <form onSubmit={submitForm} action="https://formsubmit.co/mediatrixtech@proton.me" method="POST">
              <input type="hidden" name="_subject" value={copy.contact.form.subject} />
              <label><span>{copy.contact.form.name}</span><input name="name" type="text" autoComplete="name" required /></label>
              <label><span>{copy.contact.form.email}</span><input name="email" type="email" autoComplete="email" required /></label>
              <label><span>{copy.contact.form.service}</span><select name="service" value={selectedService} onChange={(event) => onSelectService(event.target.value)} required><option value="" disabled>{copy.contact.form.chooseService}</option>{copy.services.map((service) => <option value={service.id} key={service.id}>{service.title}</option>)}</select></label>
              <label><span>{copy.contact.form.message}</span><textarea name="message" rows="5" required /></label>
              <button className="button primary submit-button" type="submit" disabled={status === "sending"}>{status === "sending" ? copy.contact.form.sending : copy.contact.form.send}<Send size={18} aria-hidden="true" /></button>
              <p className={`form-status ${status}`} role="status" aria-live="polite">{status === "success" && copy.contact.form.success}{status === "error" && copy.contact.form.error}</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ copy, language }) {
  const currentYear = new Date().getFullYear();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const drawerButtonRef = React.useRef(null);
  const drawerCopy = copy.easterEggs.digitalJunkDrawer;
  const closeDrawer = React.useCallback(() => setDrawerOpen(false), []);

  return (
    <footer>
      <div className="shell footer-inner">
        <a className="footer-brand" href="#top">Mediatrix Tech</a>
        <p>Create. Connect. Convert.</p>
        {language === "pt-BR" && (
          <a className="text-link footer-local-link" href={LOCAL_ROUTE}>
            Criação de sites<ArrowRight size={17} aria-hidden="true" />
          </a>
        )}
        <div className="footer-signature">
          <p>© {currentYear} L. Benaduce · {copy.rights}</p>
          <button ref={drawerButtonRef} className="junk-drawer-entry" type="button" onClick={() => setDrawerOpen(true)}>{drawerCopy.entryButton}</button>
          <p className="footer-message" aria-hidden="true">/////////\\\\\\\\\\\\\\\\\\\</p>
        </div>
      </div>
      {drawerOpen && (
        <React.Suspense fallback={<p className="junk-drawer-loading" role="status">{drawerCopy.loading}</p>}>
          <DigitalJunkDrawer isOpen={drawerOpen} onClose={closeDrawer} returnFocusRef={drawerButtonRef} />
        </React.Suspense>
      )}
    </footer>
  );
}
function isHomeRoute(pathname = typeof window !== "undefined" ? window.location.pathname : "/") {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  return normalizedPath === "/" || normalizedPath === "/index.html";
}

function LocalizedNotFound({ initialLanguage }) {
  const [language] = React.useState(() => initialLanguage || getPreferredLanguage({
    storage: getLanguageStorage(),
    browserNavigator: typeof window !== "undefined" ? window.navigator : undefined,
  }));
  const easterEggCopy = React.useMemo(() => getEasterEggCopy(language), [language]);

  React.useEffect(() => {
    printConsoleGreeting(easterEggCopy.console);
  }, [easterEggCopy.console]);

  return <EasterEggI18nProvider locale={language}><NotFound /></EasterEggI18nProvider>;
}

export function CurrentRoute({ pathname, initialLanguage }) {
  const currentPath = pathname || (typeof window !== "undefined" ? window.location.pathname : "/");
  const normalizedPath = currentPath.replace(/\/+$/, "") || "/";
  if (currentPath.startsWith("/area-interna/")) {
    return <React.Suspense fallback={null}><InternalQuotes /></React.Suspense>;
  }
  if (normalizedPath === LOCAL_ROUTE) return <LocalSantaMariaLanding />;
  if (["/servicos", "/portfolio", "/empresa", "/contato"].includes(normalizedPath)) return <PublicSectionPage pathname={normalizedPath} />;
  if (isInternationalRoute(normalizedPath)) return <InternationalLanding pathname={normalizedPath} />;
  const routeLanguage = getRouteLanguage(normalizedPath);
  if (routeLanguage) return <App initialLanguage={routeLanguage} />;
  if (isHomeRoute(normalizedPath)) {
    if (typeof window === "undefined") return <App initialLanguage="en" />;
    const preferredLanguage = getPreferredLanguage({
      storage: getLanguageStorage(),
      browserNavigator: window.navigator,
    });
    window.location.replace(getLocalizedUrl(preferredLanguage, window.location));
    return null;
  }
  const documentLanguage = typeof document !== "undefined" ? getRouteLanguage(`/${document.documentElement.lang.split("-")[0]}`) : null;
  return <LocalizedNotFound initialLanguage={initialLanguage || documentLanguage || "pt-BR"} />;
}

function configureGoogleSiteVerification() {
  const verification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION?.trim();
  const existingMeta = document.querySelector('meta[name="google-site-verification"]');
  if (!verification) {
    existingMeta?.remove();
    return;
  }
  const verificationMeta = existingMeta || document.createElement("meta");
  verificationMeta.setAttribute("name", "google-site-verification");
  verificationMeta.setAttribute("content", verification);
  if (!existingMeta) document.head.appendChild(verificationMeta);
}

if (typeof document !== "undefined") {
  configureGoogleSiteVerification();
  const rootElement = document.getElementById("root");
  const application = <CurrentRoute />;
  if (rootElement.hasChildNodes()) hydrateRoot(rootElement, application);
  else createRoot(rootElement).render(application);
}
