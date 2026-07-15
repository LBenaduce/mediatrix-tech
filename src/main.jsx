import React from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
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
import "./styles.css";

const navigation = [
  ["top", "Início"],
  ["servicos", "Serviços"],
  ["portfolio", "Portfólio"],
  ["empresa", "Empresa"],
  ["contato", "Contato"],
];

const services = [
  {
    icon: Code2,
    title: "Desenvolvimento Web",
    description: "Sites rápidos, responsivos e fáceis de usar em qualquer tela.",
    benefit: "Transforme visitas em novas oportunidades.",
  },
  {
    icon: ImageIcon,
    title: "Edição de Fotos",
    description: "Tratamento profissional para produtos, eventos e redes sociais.",
    benefit: "Valorize sua marca em cada imagem.",
  },
  {
    icon: Clapperboard,
    title: "Edição de Vídeos",
    description: "Vídeos claros e envolventes para marcas, criadores e eventos.",
    benefit: "Prenda a atenção e comunique melhor.",
  },
];

const projects = [
  {
    name: "AgriClimate Pro",
    category: "Desenvolvimento Web · AgTech",
    description: "Experiência digital para apoiar decisões agrícolas com dados climáticos.",
    media: "/agriclimate-pro-demo.mp4",
    poster: "/agriclimate-pro-poster.jpg",
    kind: "video",
  },
  {
    name: "Frasson LLC",
    category: "Desenvolvimento Web",
    description: "Site empresarial objetivo, criado para apresentar serviços e facilitar o contato.",
    media: "/frasson-llc-demo-optimized.jpg",
    kind: "image",
  },
  {
    name: "Event QR Code",
    category: "Experiência digital para eventos",
    description: "Fluxo simples por QR Code para convidados enviarem fotos e vídeos.",
    media: "/event-qr-code-demo.mp4",
    poster: "/event-qr-code-poster.jpg",
    kind: "video",
  },
];

const contactLinks = {
  brasil:
    "https://wa.me/5555999357388?text=Ol%C3%A1%2C%20Mediatrix%20Tech.%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento.",
  estadosUnidos:
    "https://wa.me/13059920833?text=Hello%20Mediatrix%20Tech%2C%20I%20would%20like%20to%20request%20a%20quote.",
  email: "mailto:mediatrixtech@proton.me",
  upwork: "https://www.upwork.com/freelancers/~015020486545a9742b",
};

function useActiveSection() {
  const [activeSection, setActiveSection] = React.useState("top");

  React.useEffect(() => {
    const sections = navigation
      .map(([id]) => document.getElementById(id))
      .filter(Boolean);
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

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header activeSection={activeSection} />
      <main id="conteudo">
        <Hero />
        <Services onSelectService={setSelectedService} />
        <Portfolio />
        <Company />
        <Contact
          selectedService={selectedService}
          onSelectService={setSelectedService}
        />
      </main>
      <Footer />
    </>
  );
}

function Header({ activeSection }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuButtonRef = React.useRef(null);

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

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="Mediatrix Tech — Início" onClick={closeMenu}>
          <img src="/mediatrix-brand-mark.jpg" alt="" width="44" height="44" />
          <span>Mediatrix Tech</span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map(([id, label]) => (
            <a
              href={`#${id}`}
              className={activeSection === id ? "active" : ""}
              aria-current={activeSection === id ? "page" : undefined}
              key={id}
            >
              {label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#formulario">Solicitar orçamento</a>

        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav
        className={`mobile-nav ${menuOpen ? "open" : ""}`}
        id="menu-mobile"
        aria-label="Navegação mobile"
        hidden={!menuOpen}
      >
        {navigation.map(([id, label]) => (
          <a
            href={`#${id}`}
            className={activeSection === id ? "active" : ""}
            aria-current={activeSection === id ? "page" : undefined}
            onClick={closeMenu}
            key={id}
          >
            {label}
          </a>
        ))}
        <a className="mobile-quote" href="#formulario" onClick={closeMenu}>
          Solicitar orçamento
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-glow" aria-hidden="true" />
      <div className="shell hero-content">
        <img
          className="hero-logo"
          src="/mediatrix-brand-mark.jpg"
          alt="Logo da Mediatrix Tech"
          width="112"
          height="112"
        />
        <p className="motto">Create. Connect. Convert.</p>
        <h1 id="hero-title">Tecnologia e conteúdo que fazem sua marca avançar.</h1>
        <p className="hero-description">
          Criamos sites e conteúdos visuais profissionais para negócios no Brasil e nos Estados Unidos.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#servicos">
            Ver serviços <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a className="button secondary" href="#formulario">Solicitar orçamento</a>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, description, id }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

function Services({ onSelectService }) {
  return (
    <section className="section" id="servicos" aria-labelledby="servicos-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Serviços"
          title="O essencial para apresentar sua marca com qualidade."
          description="Três soluções claras, adaptadas ao objetivo e ao momento do seu negócio."
          id="servicos-title"
        />
        <div className="services-grid">
          {services.map(({ icon: Icon, title, description, benefit }) => (
            <article className="service-card" key={title}>
              <div className="icon-box" aria-hidden="true"><Icon size={25} /></div>
              <h3>{title}</h3>
              <p>{description}</p>
              <p className="benefit"><Check size={17} aria-hidden="true" />{benefit}</p>
              <a
                className="text-link"
                href="#formulario"
                onClick={() => onSelectService(title)}
              >
                Solicitar orçamento <ArrowRight size={17} aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio() {
  return (
    <section className="section portfolio-section" id="portfolio" aria-labelledby="portfolio-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Portfólio"
          title="Projetos selecionados."
          description="Alguns trabalhos que unem clareza, experiência e resultado."
          id="portfolio-title"
        />
        <div className="portfolio-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.name}>
              <div className="project-media">
                {project.kind === "video" ? (
                  <video muted playsInline preload="none" poster={project.poster} aria-label={`Demonstração do projeto ${project.name}`}>
                    <source src={project.media} type="video/mp4" />
                  </video>
                ) : (
                  <img src={project.media} alt={`Captura de tela do projeto ${project.name}`} loading="lazy" />
                )}
              </div>
              <div className="project-content">
                <p className="project-category">{project.category}</p>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <a className="text-link" href={project.media} target="_blank" rel="noreferrer">
                  Ver projeto <ExternalLink size={16} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Company() {
  const facts = [
    ["Quem somos", "Uma empresa de tecnologia e criação focada em soluções digitais úteis."],
    ["O que fazemos", "Unimos desenvolvimento web e edição visual em uma entrega consistente."],
    ["Como trabalhamos", "Entendemos o objetivo, simplificamos o caminho e mantemos você por perto."],
    ["Onde atendemos", "Negócios, profissionais e criadores no Brasil e nos Estados Unidos."],
  ];

  return (
    <section className="section company-section" id="empresa" aria-labelledby="empresa-title">
      <div className="shell company-layout">
        <div>
          <SectionHeading
            eyebrow="Empresa"
            title="Sobre a Mediatrix Tech"
            description="Criatividade e tecnologia trabalhando para aproximar marcas e pessoas."
            id="empresa-title"
          />
          <div className="market-note">
            <Globe2 size={20} aria-hidden="true" />
            Atendimento em português e inglês
          </div>
        </div>
        <div className="company-facts">
          {facts.map(([title, text], index) => (
            <article key={title}>
              <span aria-hidden="true">0{index + 1}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ selectedService, onSelectService }) {
  const [status, setStatus] = React.useState("idle");

  const submitForm = async (event) => {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("https://formsubmit.co/ajax/mediatrixtech@proton.me", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _url: window.location.href.split("#")[0] }),
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

  const channels = [
    ["WhatsApp Brasil", "Atendimento em português", contactLinks.brasil, MessageCircle],
    ["WhatsApp Estados Unidos", "Atendimento em inglês", contactLinks.estadosUnidos, MessageCircle],
    ["E-mail", "mediatrixtech@proton.me", contactLinks.email, Mail],
    ["Perfil na Upwork", "Projetos internacionais", contactLinks.upwork, ExternalLink],
  ];

  return (
    <section className="section contact-section" id="contato" aria-labelledby="contato-title">
      <div className="shell">
        <SectionHeading
          eyebrow="Contato"
          title="Vamos conversar sobre seu projeto?"
          description="Escolha o canal mais prático ou envie uma mensagem pelo formulário."
          id="contato-title"
        />
        <div className="contact-layout">
          <div className="contact-channels" aria-label="Canais de contato">
            {channels.map(([title, detail, href, Icon]) => (
              <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" key={title}>
                <span className="contact-icon"><Icon size={21} aria-hidden="true" /></span>
                <span><strong>{title}</strong><small>{detail}</small></span>
                <ArrowRight className="channel-arrow" size={18} aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="form-card" id="formulario">
            <h3>Envie uma mensagem</h3>
            <p>Conte brevemente o que você precisa.</p>
            <form onSubmit={submitForm} action="https://formsubmit.co/mediatrixtech@proton.me" method="POST">
              <input type="hidden" name="_subject" value="Nova mensagem pelo site Mediatrix Tech" />
              <label>
                <span>Nome</span>
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label>
                <span>E-mail</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                <span>Serviço de interesse</span>
                <select name="service" value={selectedService} onChange={(event) => onSelectService(event.target.value)} required>
                  <option value="" disabled>Selecione um serviço</option>
                  {services.map((service) => <option value={service.title} key={service.title}>{service.title}</option>)}
                </select>
              </label>
              <label>
                <span>Mensagem</span>
                <textarea name="message" rows="5" required />
              </label>
              <button className="button primary submit-button" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Enviando..." : "Enviar mensagem"}
                <Send size={18} aria-hidden="true" />
              </button>
              <p className={`form-status ${status}`} role="status" aria-live="polite">
                {status === "success" && "Mensagem enviada com sucesso. Em breve entraremos em contato."}
                {status === "error" && "Não foi possível enviar. Tente novamente ou fale conosco pelo WhatsApp."}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="shell footer-inner">
        <a className="footer-brand" href="#top">Mediatrix Tech</a>
        <p>Create. Connect. Convert.</p>
        <p>© {new Date().getFullYear()} Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
