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

const navigationIds = ["top", "portfolio", "servicos", "contato"];
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
  "pt-BR": { challenge: "O desafio", solution: "A solução", outcome: "Resultado", before: "Antes", after: "Depois", comparisonEyebrow: "Antes e depois", comparisonTitle: "De oportunidades perdidas a mais clientes.", comparisonDescription: "Veja como uma presença online mais forte pode mudar a forma como os clientes encontram sua empresa.", comparisonAttribution: "Frasson LLC", testimonialsEyebrow: "Depoimentos", testimonialsTitle: "O que os clientes dizem", testimonialsDescription: "Relatos publicados somente com autorização do cliente.", evidence: "Evidência do projeto", evidenceValue: "Experiência responsiva", beforeText: "Baixa visibilidade online. Oportunidades perdidas.", afterText: "Mais pessoas encontram a empresa. Mais clientes. Mais oportunidades." },
  en: { challenge: "The challenge", solution: "The solution", outcome: "Outcome", before: "Before", after: "After", comparisonEyebrow: "Before and after", comparisonTitle: "From missed opportunities to more customers.", comparisonDescription: "See how stronger online visibility can change the way customers find your business.", comparisonAttribution: "Frasson LLC", testimonialsEyebrow: "Testimonials", testimonialsTitle: "What clients say", testimonialsDescription: "Quotes are published only with the client’s approval.", evidence: "Project evidence", evidenceValue: "Responsive experience", beforeText: "Low online visibility. Missed opportunities.", afterText: "More people find the business. More customers. More opportunities." },
  es: { challenge: "El desafío", solution: "La solución", outcome: "Resultado", before: "Antes", after: "Después", comparisonEyebrow: "Antes y después", comparisonTitle: "De oportunidades perdidas a más clientes.", comparisonDescription: "Descubre cómo una mayor visibilidad en línea puede cambiar la forma en que los clientes encuentran tu negocio.", comparisonAttribution: "Frasson LLC", testimonialsEyebrow: "Testimonios", testimonialsTitle: "Lo que dicen los clientes", testimonialsDescription: "Las opiniones se publican solo con la autorización del cliente.", evidence: "Evidencia del proyecto", evidenceValue: "Experiencia adaptable", beforeText: "Baja visibilidad en línea. Oportunidades perdidas.", afterText: "Más personas encuentran el negocio. Más clientes. Más oportunidades." },
  fr: { challenge: "Le défi", solution: "La solution", outcome: "Résultat", before: "Avant", after: "Après", comparisonEyebrow: "Avant et après", comparisonTitle: "Des occasions manquées à davantage de clients.", comparisonDescription: "Découvrez comment une meilleure visibilité en ligne peut changer la façon dont les clients trouvent votre entreprise.", comparisonAttribution: "Frasson LLC", testimonialsEyebrow: "Témoignages", testimonialsTitle: "Ce que disent les clients", testimonialsDescription: "Les témoignages ne sont publiés qu’avec l’accord du client.", evidence: "Preuve du projet", evidenceValue: "Expérience adaptative", beforeText: "Faible visibilité en ligne. Occasions manquées.", afterText: "Plus de personnes trouvent l’entreprise. Plus de clients. Plus d’occasions." },
  de: { challenge: "Die Herausforderung", solution: "Die Lösung", outcome: "Ergebnis", before: "Vorher", after: "Nachher", comparisonEyebrow: "Vorher und nachher", comparisonTitle: "Von verpassten Chancen zu mehr Kunden.", comparisonDescription: "Sehen Sie, wie eine stärkere Online-Sichtbarkeit verändern kann, wie Kunden Ihr Unternehmen finden.", comparisonAttribution: "Frasson LLC", testimonialsEyebrow: "Kundenstimmen", testimonialsTitle: "Was Kunden sagen", testimonialsDescription: "Zitate werden nur mit Zustimmung des Kunden veröffentlicht.", evidence: "Projektnachweis", evidenceValue: "Responsive Erfahrung", beforeText: "Geringe Online-Sichtbarkeit. Verpasste Chancen.", afterText: "Mehr Menschen finden das Unternehmen. Mehr Kunden. Mehr Chancen." },
  "zh-CN": { challenge: "挑战", solution: "解决方案", outcome: "成果", before: "之前", after: "之后", comparisonEyebrow: "前后对比", comparisonTitle: "从错失机会到赢得更多客户。", comparisonDescription: "了解更强的线上可见度如何改变客户找到您企业的方式。", comparisonAttribution: "Frasson LLC", testimonialsEyebrow: "客户评价", testimonialsTitle: "客户怎么说", testimonialsDescription: "评价仅在获得客户许可后发布。", evidence: "项目依据", evidenceValue: "响应式体验", beforeText: "线上可见度低。错失机会。", afterText: "更多人找到企业。更多客户。更多机会。" },
  hi: { challenge: "चुनौती", solution: "समाधान", outcome: "परिणाम", before: "पहले", after: "बाद में", comparisonEyebrow: "पहले और बाद में", comparisonTitle: "छूटे अवसरों से अधिक ग्राहकों तक।", comparisonDescription: "जानें कि बेहतर ऑनलाइन दृश्यता ग्राहकों के आपके व्यवसाय तक पहुँचने के तरीके को कैसे बदल सकती है।", comparisonAttribution: "Frasson LLC", testimonialsEyebrow: "प्रशंसापत्र", testimonialsTitle: "ग्राहक क्या कहते हैं", testimonialsDescription: "उद्धरण केवल ग्राहक की अनुमति से प्रकाशित किए जाते हैं।", evidence: "परियोजना प्रमाण", evidenceValue: "रेस्पॉन्सिव अनुभव", beforeText: "कम ऑनलाइन दृश्यता। छूटे अवसर।", afterText: "अधिक लोग व्यवसाय को पाते हैं। अधिक ग्राहक। अधिक अवसर।" },
  ar: { challenge: "التحدي", solution: "الحل", outcome: "النتيجة", before: "قبل", after: "بعد", comparisonEyebrow: "قبل وبعد", comparisonTitle: "من فرص ضائعة إلى مزيد من العملاء.", comparisonDescription: "اكتشف كيف يمكن لحضور أقوى على الإنترنت أن يغيّر طريقة عثور العملاء على نشاطك التجاري.", comparisonAttribution: "Frasson LLC", testimonialsEyebrow: "آراء العملاء", testimonialsTitle: "ما يقوله العملاء", testimonialsDescription: "لا تُنشر الاقتباسات إلا بموافقة العميل.", evidence: "دليل المشروع", evidenceValue: "تجربة متجاوبة", beforeText: "ظهور ضعيف على الإنترنت. فرص ضائعة.", afterText: "المزيد من الأشخاص يعثرون على النشاط التجاري. المزيد من العملاء. المزيد من الفرص." },
};

const portfolioMetricCopy = {
  "pt-BR": [["Prioridade móvel", "Experiência responsiva"], ["Ao vivo", "Visualizações climáticas"], ["1", "Painel de decisão"], ["Responsivo", "Layout"], ["Direto", "Contato de leads"], ["Objetivo", "Caminho de serviços"], ["0", "Aplicativos necessários"], ["2", "Tipos de mídia"], ["1", "Ponto de entrada por QR"], ["Prioridade móvel", "Acesso ao cardápio"], ["2", "Prévias localizadas"], ["Direto", "Caminho do visitante"], ["Responsivo", "Layout"], ["Local", "Caminho de contato"], ["Claro", "Catálogo de serviços"]],
  en: [["Mobile-first", "Responsive experience"], ["Live", "Climate views"], ["1", "Decision dashboard"], ["Responsive", "Layout"], ["Direct", "Lead contact"], ["Focused", "Service path"], ["0", "Apps required"], ["2", "Media types"], ["1", "QR entry point"], ["Mobile-first", "Menu access"], ["2", "Localized previews"], ["Direct", "Visitor path"], ["Responsive", "Layout"], ["Local", "Contact path"], ["Clear", "Service catalog"]],
  es: [["Prioridad móvil", "Experiencia adaptable"], ["En vivo", "Vistas climáticas"], ["1", "Panel de decisiones"], ["Adaptable", "Diseño"], ["Directo", "Contacto con clientes potenciales"], ["Enfocado", "Ruta de servicios"], ["0", "Aplicaciones necesarias"], ["2", "Tipos de contenido"], ["1", "Acceso mediante QR"], ["Prioridad móvil", "Acceso al menú"], ["2", "Vistas previas localizadas"], ["Directo", "Ruta del visitante"], ["Adaptable", "Diseño"], ["Local", "Ruta de contacto"], ["Claro", "Catálogo de servicios"]],
  fr: [["Priorité au mobile", "Expérience adaptative"], ["En direct", "Données climatiques"], ["1", "Tableau de décision"], ["Adaptatif", "Mise en page"], ["Direct", "Contact prospect"], ["Ciblé", "Parcours des services"], ["0", "Application requise"], ["2", "Types de médias"], ["1", "Accès par QR code"], ["Priorité au mobile", "Accès au menu"], ["2", "Aperçus localisés"], ["Direct", "Parcours visiteur"], ["Adaptatif", "Mise en page"], ["Local", "Parcours de contact"], ["Clair", "Catalogue de services"]],
  de: [["Mobile zuerst", "Responsive Nutzung"], ["Live", "Klimaansichten"], ["1", "Entscheidungs-Dashboard"], ["Responsiv", "Layout"], ["Direkt", "Interessentenkontakt"], ["Gezielt", "Leistungsweg"], ["0", "Erforderliche Apps"], ["2", "Medientypen"], ["1", "QR-Einstiegspunkt"], ["Mobile zuerst", "Menüzugriff"], ["2", "Lokalisierte Vorschauen"], ["Direkt", "Besucherweg"], ["Responsiv", "Layout"], ["Lokal", "Kontaktweg"], ["Klar", "Leistungskatalog"]],
  "zh-CN": [["移动端优先", "响应式体验"], ["实时", "气候视图"], ["1", "决策面板"], ["响应式", "布局"], ["直接", "潜在客户联系"], ["聚焦", "服务路径"], ["0", "所需应用"], ["2", "媒体类型"], ["1", "二维码入口"], ["移动端优先", "菜单访问"], ["2", "本地化预览"], ["直接", "访客路径"], ["响应式", "布局"], ["本地", "联系路径"], ["清晰", "服务目录"]],
  hi: [["मोबाइल-प्रथम", "रेस्पॉन्सिव अनुभव"], ["लाइव", "जलवायु दृश्य"], ["1", "निर्णय डैशबोर्ड"], ["रेस्पॉन्सिव", "लेआउट"], ["सीधा", "संभावित ग्राहक संपर्क"], ["केंद्रित", "सेवा मार्ग"], ["0", "आवश्यक ऐप"], ["2", "मीडिया प्रकार"], ["1", "QR प्रवेश बिंदु"], ["मोबाइल-प्रथम", "मेन्यू पहुँच"], ["2", "स्थानीयकृत प्रीव्यू"], ["सीधा", "विज़िटर मार्ग"], ["रेस्पॉन्सिव", "लेआउट"], ["स्थानीय", "संपर्क मार्ग"], ["स्पष्ट", "सेवा सूची"]],
  ar: [["الهاتف أولًا", "تجربة متجاوبة"], ["مباشر", "عروض المناخ"], ["1", "لوحة قرارات"], ["متجاوب", "التخطيط"], ["مباشر", "تواصل العملاء المحتملين"], ["مركّز", "مسار الخدمات"], ["0", "تطبيقات مطلوبة"], ["2", "أنواع الوسائط"], ["1", "نقطة دخول عبر QR"], ["الهاتف أولًا", "الوصول إلى القائمة"], ["2", "معاينات مترجمة"], ["مباشر", "مسار الزائر"], ["متجاوب", "التخطيط"], ["محلي", "مسار التواصل"], ["واضح", "دليل الخدمات"]],
};

const projectPreviewCopy = { "pt-BR": "Prévia do projeto", en: "Project preview", es: "Vista previa del proyecto", fr: "Aperçu du projet", de: "Projektvorschau", "zh-CN": "项目预览", hi: "प्रोजेक्ट प्रीव्यू", ar: "معاينة المشروع" };

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
      <div className="site-content">
        <a className="skip-link" href="#conteudo">{copy.skip}</a>
        <Header
          activeSection={activeSection}
          copy={copy}
          language={language}
          onLanguageChange={changeLanguage}
        />
        <main id="conteudo" className="cinematic-deck">
          <Hero copy={copy} language={language} />
          <Portfolio copy={copy} language={language} />
          <Services copy={copy} language={language} onSelectService={setSelectedService} />
          <Contact copy={copy} selectedService={selectedService} onSelectService={setSelectedService} />
        </main>
        <Footer copy={copy} language={language} />
        <WhatsAppFloat />
      </div>
    </EasterEggI18nProvider>
  );
}

function CinematicVideo({ className = "", poster, webm, mp4 }) {
  const containerRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(media.matches);
    updateMotionPreference();
    media.addEventListener?.("change", updateMotionPreference);
    return () => media.removeEventListener?.("change", updateMotionPreference);
  }, []);

  React.useEffect(() => {
    const element = containerRef.current;
    if (!element || reduceMotion) return undefined;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [reduceMotion]);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (visible && !reduceMotion) video.play().catch(() => {});
    else video.pause();
  }, [visible, reduceMotion]);

  return (
    <div className={`cinematic-video ${className}`} ref={containerRef} aria-hidden="true">
      {!reduceMotion && visible && (
        <video ref={videoRef} muted loop playsInline preload="none" poster={poster} tabIndex="-1">
          {webm && <source src={webm} type="video/webm" />}
          <source src={mp4} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

function Header({ activeSection, copy, language, onLanguageChange }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuButtonRef = React.useRef(null);
  const headerRef = React.useRef(null);
  const navigation = [
    ["top", copy.nav[0]],
    ["portfolio", copy.nav[2]],
    ["servicos", copy.nav[1]],
    ["contato", copy.nav[4]],
  ];

  React.useEffect(() => {
    const header = headerRef.current;
    if (!header) return undefined;

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty("--site-header-height", `${header.getBoundingClientRect().height}px`);
    };

    updateHeaderHeight();
    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(header);
    window.addEventListener("resize", updateHeaderHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

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
    <header className="site-header" ref={headerRef}>
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

function Hero({ copy, language }) {
  const actions = {
    "pt-BR": ["Comece seu projeto", "Ver trabalhos selecionados"],
    en: ["Start your project", "See selected work"],
    es: ["Inicia tu proyecto", "Ver trabajos seleccionados"],
    fr: ["Démarrer votre projet", "Voir les projets sélectionnés"],
    de: ["Ihr Projekt starten", "Ausgewählte Arbeiten ansehen"],
  };
  const [primaryLabel, secondaryLabel] = actions[language] || actions.en;

  return (
    <section className="hero cinematic-panel cinematic-panel--hero" id="top" aria-labelledby="hero-title">
      <CinematicVideo className="cinematic-video--hero" poster="/mediatrix-header-poster.jpg" webm="/mediatrix-header.webm" mp4="/mediatrix-header.mp4" />
      <div className="shell hero-content">
        <div className="hero-copy">
          <p className="motto">Mediatrix Tech</p>
          <h1 id="hero-title">Create. Connect. Convert.</h1>
          <p className="hero-footnote">{copy.hero.title.replace(/\*$/, "")}</p>
          <div className="hero-actions">
            <a className="button primary" href="#formulario">{primaryLabel} <ArrowRight size={18} aria-hidden="true" /></a>
            <a className="button secondary" href="#portfolio">{secondaryLabel}</a>
          </div>
        </div>
      </div>
    </section>
  );
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

function Services({ copy, language, onSelectService }) {
  const cinematicServices = {
    "pt-BR": [["site", "Desenvolvimento web"], ["media", "Edição de vídeo"], ["media", "Áudio e música"], ["agri", "AgTech · GIS · Sensoriamento remoto"]],
    en: [["site", "Web development"], ["media", "Video editing"], ["media", "Audio & music"], ["agri", "AgTech · GIS · Remote sensing"]],
    es: [["site", "Desarrollo web"], ["media", "Edición de video"], ["media", "Audio y música"], ["agri", "AgTech · GIS · Teledetección"]],
    fr: [["site", "Développement web"], ["media", "Montage vidéo"], ["media", "Audio et musique"], ["agri", "AgTech · SIG · Télédétection"]],
    de: [["site", "Webentwicklung"], ["media", "Videobearbeitung"], ["media", "Audio & Musik"], ["agri", "AgTech · GIS · Fernerkundung"]],
  };
  const serviceItems = (cinematicServices[language] || cinematicServices.en).map(([id, title], index) => ({ ...copy.services.find((service) => service.id === id), title, key: `${id}-${index}` }));

  return (
    <section className="section services-section cinematic-panel cinematic-panel--services" id="servicos" aria-labelledby="servicos-title">
      <CinematicVideo className="cinematic-video--services" poster="/digital-board-poster.jpg" mp4="/tech-blue-and-dark.mp4" />
      <div className="shell">
        <div className="services-heading">
          <h2 id="servicos-title">{copy.servicesSection.title}</h2>
        </div>
        <div className="services-grid">
          {serviceItems.map((service) => {
            const Icon = serviceIcons[service.id];
            return (
              <a className={`service-tile${service.id === "site" ? " is-featured" : ""}`} href="#formulario" onClick={() => onSelectService(service.id)} key={service.key}>
                <span className="icon-box" aria-hidden="true"><Icon size={21} /></span>
                <span className="service-copy">
                  <strong className="service-label">{service.title}</strong>
                  <span className="service-subtitle">{service.subtitle || service.benefit}</span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CaseStudyCard({ title, category, clientName, challengeText, solutionText, metrics, imageUrl, projectUrl, previewLabel, labels = phaseOneCopy.en }) {
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

  return (
    <article className="project-card" ref={cardRef} onPointerMove={handlePointerMove} onPointerLeave={resetPointerEffect}>
      <div className="project-card-surface">
        <div className="project-media">
          <img src={imageUrl} alt={`${previewLabel}: ${title}`} loading="lazy" />
        </div>
        <div className="project-content">
          <div className="case-study-meta"><p className="project-category">{category}</p><span>{clientName}</span></div>
          <h3>{title}</h3>
          <div className="case-study-narrative">
            <div><strong>{labels.challenge}</strong><p>{challengeText}</p></div>
            <div><strong>{labels.solution}</strong><p>{solutionText}</p></div>
          </div>
          {metrics?.length > 0 && <dl className="case-study-metrics">{metrics.map(({ label, value }) => <div key={`${label}-${value}`}><dt>{value}</dt><dd>{label}</dd></div>)}</dl>}
          <a className="text-link" href={projectUrl} target="_blank" rel="noopener noreferrer">{labels.viewProject || "View project"} <ExternalLink size={16} aria-hidden="true" /></a>
        </div>
      </div>
    </article>
  );
}

function CollaborationCard({ project }) {
  return <article className="project-card project-card--collaboration"><div className="project-card-surface collaboration-card"><div className="collaboration-visual" aria-hidden="true"><span className="collaboration-icon"><BrainCircuit size={44} strokeWidth={1.5} /></span><span className="data-node node-one" /><span className="data-node node-two" /><span className="data-node node-three" /><span className="data-line line-one" /><span className="data-line line-two" /></div><div className="collaboration-content"><div className="collaboration-copy"><p className="collaboration-eyebrow">{project.collection}</p><p className="project-category">{project.category}</p><h3>{project.name}</h3><p className="collaboration-description">{project.description}</p></div><dl className="collaboration-metrics">{project.metrics.map(({ value, label }) => <div key={value}><dt>{value}</dt><dd>{label}</dd></div>)}</dl><ul className="collaboration-tags" aria-label={project.tagsLabel}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div></div></article>;
}

function BeforeAfterComparison({ labels }) {
  return (
    <section className="project-comparison" aria-labelledby="comparison-title">
      <div className="comparison-copy">
        <p className="eyebrow">{labels.comparisonEyebrow}</p>
        <h3 id="comparison-title">{labels.comparisonTitle}</h3>
        <p>{labels.comparisonDescription}</p>
      </div>
      <div className="comparison-cards">
        <article className="comparison-panel is-before"><span>{labels.before}</span><p>{labels.beforeText}</p></article>
        <article className="comparison-panel is-after"><span>{labels.after}</span><p>{labels.afterText}</p></article>
      </div>
      <p className="comparison-attribution">{labels.comparisonAttribution}</p>
    </section>
  );
}

function Testimonials({ labels }) {
  if (verifiedTestimonials.length === 0) return null;
  return <section className="testimonials" aria-labelledby="testimonials-title"><SectionHeading eyebrow={labels.testimonialsEyebrow} title={labels.testimonialsTitle} description={labels.testimonialsDescription} id="testimonials-title" /><div className="testimonial-grid">{verifiedTestimonials.map((testimonial) => <blockquote key={testimonial.quote}><Quote aria-hidden="true" /><p>{testimonial.quote}</p><footer><strong>{testimonial.name}</strong><span>{testimonial.company}</span></footer></blockquote>)}</div></section>;
}

function Portfolio({ copy, language }) {
  const labels = { ...(phaseOneCopy[language] || phaseOneCopy.en), viewProject: copy.portfolioSection.view };
  const translatedMetrics = portfolioMetricCopy[language] || portfolioMetricCopy.en;
  const metricSets = Array.from({ length: 5 }, (_, projectIndex) => translatedMetrics.slice(projectIndex * 3, projectIndex * 3 + 3).map(([value, label]) => ({ value, label })));
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
    <section className="section portfolio-section cinematic-panel cinematic-panel--portfolio" id="portfolio" aria-labelledby="portfolio-title">
      <CinematicVideo className="cinematic-video--portfolio" poster="/digital-board-poster.jpg" mp4="/tech-blue-and-dark.mp4" />
      <div className="shell">
        <SectionHeading eyebrow={copy.portfolioSection.eyebrow} title={copy.portfolioSection.title} description={copy.portfolioSection.description} id="portfolio-title" />
        <div className="portfolio-grid">
          {projects.slice(0, 3).map((project, index) => project.kind === "collaboration" ? <CollaborationCard project={project} key={project.name} /> : <CaseStudyCard title={project.name} category={project.category} clientName={index === 1 ? "Frasson LLC" : project.name} challengeText={project.problem} solutionText={project.description} metrics={metricSets[index]} imageUrl={project.poster || project.media} projectUrl={project.media} previewLabel={projectPreviewCopy[language] || projectPreviewCopy.en} labels={labels} key={project.name} />)}
        </div>
        <a className="portfolio-cta button secondary" href="#formulario">{language === "pt-BR" ? "Vamos criar o seu projeto" : "Let’s build your project"} <ArrowRight size={18} aria-hidden="true" /></a>
      </div>
    </section>
  );
}

function Company({ copy }) {
  return (
    <section className="section company-section" id="empresa" aria-labelledby="empresa-title">
      <div className="shell company-layout">
        <p className="eyebrow">{copy.company.eyebrow}</p>
        <h2 className="company-statement" id="empresa-title">{copy.company.title}</h2>
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
    <section className="section contact-section cinematic-panel cinematic-panel--contact" id="contato" aria-labelledby="contato-title">
      <CinematicVideo className="cinematic-video--contact" poster="/mediatrix-contact-call-poster.jpg" mp4="/mediatrix-contact-call.mp4" />
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
