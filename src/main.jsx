import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import {
  AudioLines,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
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
];

const contactLinks = {
  brasil: "https://wa.me/5555999357388?text=Ol%C3%A1%2C%20Mediatrix%20Tech.%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento.",
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
        <TopBanner />
        <Services copy={copy} onSelectService={setSelectedService} />
        <Portfolio copy={copy} language={language} />
        <Company copy={copy} />
        <Contact copy={copy} selectedService={selectedService} onSelectService={setSelectedService} />
      </main>
      <Footer copy={copy} language={language} />
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

function TopBanner() {
  const [videoReady, setVideoReady] = React.useState(false);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
    const updateMotionPreference = (event) => setReduceMotion(event.matches);
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  return (
    <div className="top-banner-section" aria-hidden="true">
      <div className="top-banner-frame">
          <img
            className="top-banner-poster"
            src="/mediatrix-header-poster.jpg"
            alt=""
            width="1200"
            height="514"
            fetchPriority="high"
          />
          <video
            className={`top-banner-video${videoReady ? " is-ready" : ""}`}
            autoPlay={!reduceMotion}
            loop
            muted
            playsInline
            preload="metadata"
            poster="/mediatrix-header-poster.jpg"
            onPlaying={() => setVideoReady(true)}
            onError={() => setVideoReady(false)}
          >
            <source src="/mediatrix-header-banner.mp4?v=enhanced" type="video/mp4" />
          </video>
      </div>
    </div>
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
          <h1 id="hero-title">{copy.hero.title}</h1>
          <p className="hero-description">{copy.hero.description}</p>
          <div className="hero-actions">
            <a className="button primary" href={primaryAction.href}>{primaryAction.label} <ArrowRight size={18} aria-hidden="true" /></a>
            <a className="button secondary" href={secondaryAction.href}>{secondaryAction.label}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, description, id }) {
  return <div className="section-heading"><p className="eyebrow">{eyebrow}</p><h2 id={id}>{title}</h2>{description && <p className="section-description">{description}</p>}</div>;
}

function Services({ copy, onSelectService }) {
  return (
    <section className="section" id="servicos" aria-labelledby="servicos-title">
      <div className="shell">
        <SectionHeading {...copy.servicesSection} id="servicos-title" />
        <div className={`services-grid${copy.services.length > 4 ? " expanded" : ""}`}>
          {copy.services.map((service) => {
            const Icon = serviceIcons[service.id];
            return (
              <article className="service-card" key={service.id}>
                <div className="icon-box" aria-hidden="true"><Icon size={25} /></div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <p className="benefit"><Check size={17} aria-hidden="true" />{service.benefit}</p>
                <a className="text-link" href="#formulario" onClick={() => onSelectService(service.id)}>{copy.quote} <ArrowRight size={17} aria-hidden="true" /></a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Portfolio({ copy, language }) {
  const projects = copy.projects.map((project, index) => {
    const projectAssets = projectMedia[index];
    return {
      ...project,
      ...projectAssets,
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
            <article className="project-card" key={project.name}>
              <div className="project-media">
                {project.kind === "video" ? (
                  <video muted playsInline preload="none" poster={project.poster} width={project.width} height={project.height} aria-label={`${copy.portfolioSection.videoDemo}: ${project.name}`}><source src={project.media} type="video/mp4" /></video>
                ) : (
                  <img src={project.media} alt={`${copy.portfolioSection.screenshot}: ${project.name}`} width={project.width} height={project.height} loading="lazy" />
                )}
              </div>
              <div className="project-content">
                <p className="project-category">{project.category}</p><h3>{project.name}</h3><p>{project.description}</p>
                <a className="text-link" href={project.media} target="_blank" rel="noopener noreferrer">{copy.portfolioSection.view} <ExternalLink size={16} aria-hidden="true" /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Company({ copy }) {
  return (
    <section className="section company-section" id="empresa" aria-labelledby="empresa-title">
      <div className="shell company-layout">
        <div>
          <SectionHeading eyebrow={copy.company.eyebrow} title={copy.company.title} description={copy.company.description} id="empresa-title" />
          {copy.company.localSeo && <div className="company-local-note"><p>{copy.company.localSeo.text}</p><a className="text-link" href={LOCAL_ROUTE}>{copy.company.localSeo.link} <ArrowRight size={17} aria-hidden="true" /></a></div>}
        </div>
        <div className="company-facts">
          {copy.company.facts.map(([title, text], index) => <article key={title}><span aria-hidden="true">0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}
        </div>
      </div>
    </section>
  );
}

function Contact({ copy, selectedService, onSelectService }) {
  const [status, setStatus] = React.useState("idle");
  const channelData = [
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
              return <a className={`contact-channel ${channel}`} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} key={title}><span className="contact-icon"><Icon size={21} aria-hidden="true" /></span><span><strong>{title}</strong><small>{detail}</small></span><span className="channel-arrow"><ArrowRight size={17} aria-hidden="true" /></span></a>;
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
            Criação de sites em Santa Maria, RS <ArrowRight size={17} aria-hidden="true" />
          </a>
        )}
        <a
          className="crea-rs-mark"
          href="https://www.crea-rs.org.br/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="CREA-RS — Conselho Regional de Engenharia e Agronomia do Rio Grande do Sul"
        >
          <img src="/crea-rs-logo.png" alt="CREA-RS" width="580" height="150" />
        </a>
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
