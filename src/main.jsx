import React from "react";
import { createRoot } from "react-dom/client";
import {
  AudioLines,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Clapperboard,
  Code2,
  ExternalLink,
  Globe2,
  Image as ImageIcon,
  Mail,
  Menu,
  MessageCircle,
  Send,
  X,
} from "lucide-react";
import { languages, rtlLanguages, translations } from "./translations";
import { InternationalLanding, isInternationalRoute } from "./InternationalLanding";
import "./styles.css";

const navigationIds = ["top", "servicos", "portfolio", "empresa", "contato"];
const serviceIcons = { web: Code2, photo: ImageIcon, video: Clapperboard, audio: AudioLines };

const projectMedia = [
  { media: "/agriclimate-pro-demo.mp4", poster: "/agriclimate-pro-poster.jpg", kind: "video" },
  { media: "/frasson-llc-demo-optimized.jpg", kind: "image" },
  { media: "/event-qr-code-demo.mp4", poster: "/event-qr-code-poster.jpg", kind: "video" },
  { media: "/cafeteria-demo.jpg", kind: "image" },
];

const contactLinks = {
  brasil: "https://wa.me/5555999357388?text=Ol%C3%A1%2C%20Mediatrix%20Tech.%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento.",
  estadosUnidos: "https://wa.me/13059920833?text=Hello%20Mediatrix%20Tech%2C%20I%20would%20like%20to%20request%20a%20quote.",
  email: "mailto:mediatrixtech@proton.me",
  upwork: "https://www.upwork.com/freelancers/~015020486545a9742b",
};

const supportedLanguages = languages.map(([locale]) => locale);

function getInitialLanguage() {
  const savedLanguage = window.localStorage.getItem("mediatrix-language");
  if (supportedLanguages.includes(savedLanguage)) return savedLanguage;

  const deviceLanguages = navigator.languages || [navigator.language];
  for (const deviceLanguage of deviceLanguages) {
    const normalized = deviceLanguage.toLowerCase();
    const exact = supportedLanguages.find((locale) => locale.toLowerCase() === normalized);
    if (exact) return exact;
    const base = supportedLanguages.find((locale) => locale.split("-")[0] === normalized.split("-")[0]);
    if (base) return base;
  }

  return "pt-BR";
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

function App() {
  const activeSection = useActiveSection();
  const [selectedService, setSelectedService] = React.useState("");
  const [language, setLanguage] = React.useState(getInitialLanguage);
  const copy = translations[language];

  React.useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = rtlLanguages.has(language) ? "rtl" : "ltr";
    document.querySelector('meta[name="description"]')?.setAttribute("content", copy.metaDescription);
    window.localStorage.setItem("mediatrix-language", language);
  }, [copy.metaDescription, language]);

  return (
    <>
      <a className="skip-link" href="#conteudo">{copy.skip}</a>
      <Header
        activeSection={activeSection}
        copy={copy}
        language={language}
        onLanguageChange={setLanguage}
      />
      <main id="conteudo">
        <TopBanner />
        <Hero copy={copy} />
        <Services copy={copy} onSelectService={setSelectedService} />
        <Portfolio copy={copy} />
        <Company copy={copy} />
        <Contact copy={copy} selectedService={selectedService} onSelectService={setSelectedService} />
      </main>
      <Footer copy={copy} />
    </>
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
        <a className="brand" href="#top" aria-label={`Mediatrix Tech — ${copy.nav[0]}`} onClick={closeMenu}>
          <img src="/mediatrix-brand-mark.jpg" alt="" width="44" height="44" />
          <span>Mediatrix Tech</span>
        </a>

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
  const [reduceMotion, setReduceMotion] = React.useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = (event) => setReduceMotion(event.matches);
    mediaQuery.addEventListener("change", updateMotionPreference);
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  return (
    <div className="top-banner-section" id="top" aria-hidden="true">
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
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <div className="shell hero-content">
        <div className="hero-copy">
          <p className="motto">Create. Connect. Convert.</p>
          <h1 id="hero-title">{copy.hero.title}</h1>
          <p className="hero-description">{copy.hero.description}</p>
          <div className="hero-actions">
            <a className="button primary" href="#servicos">{copy.hero.services} <ArrowRight size={18} aria-hidden="true" /></a>
            <a className="button secondary" href="#formulario">{copy.quote}</a>
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
        <div className="services-grid">
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

function Portfolio({ copy }) {
  const projects = copy.projects.map((project, index) => ({ ...project, ...projectMedia[index] }));
  return (
    <section className="section portfolio-section" id="portfolio" aria-labelledby="portfolio-title">
      <div className="shell">
        <SectionHeading eyebrow={copy.portfolioSection.eyebrow} title={copy.portfolioSection.title} description={copy.portfolioSection.description} id="portfolio-title" />
        <div className="portfolio-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.name}>
              <div className="project-media">
                {project.kind === "video" ? (
                  <video muted playsInline preload="none" poster={project.poster} aria-label={`${copy.portfolioSection.videoDemo}: ${project.name}`}><source src={project.media} type="video/mp4" /></video>
                ) : (
                  <img src={project.media} alt={`${copy.portfolioSection.screenshot}: ${project.name}`} loading="lazy" />
                )}
              </div>
              <div className="project-content">
                <p className="project-category">{project.category}</p><h3>{project.name}</h3><p>{project.description}</p>
                <a className="text-link" href={project.media} target="_blank" rel="noreferrer">{copy.portfolioSection.view} <ExternalLink size={16} aria-hidden="true" /></a>
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
        <SectionHeading eyebrow={copy.company.eyebrow} title={copy.company.title} description={copy.company.description} id="empresa-title" />
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
              return <a className={`contact-channel ${channel}`} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" key={title}><span className="contact-icon"><Icon size={21} aria-hidden="true" /></span><span><strong>{title}</strong><small>{detail}</small></span><span className="channel-arrow"><ArrowRight size={17} aria-hidden="true" /></span></a>;
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

function Footer({ copy }) {
  const currentYear = new Date().getFullYear();

  return <footer><div className="shell footer-inner"><a className="footer-brand" href="#top">Mediatrix Tech</a><p>Create. Connect. Convert.</p><div className="footer-signature"><p>© {currentYear} L. Benaduce · {copy.rights}</p><p className="footer-message" aria-hidden="true">/////////\\\\\\\\\\\\\\\\\\\</p></div></div></footer>;
}

createRoot(document.getElementById("root")).render(isInternationalRoute() ? <InternationalLanding /> : <App />);
