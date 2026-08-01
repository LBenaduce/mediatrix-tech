import React from "react";
import { ArrowRight, Menu, MessageCircle, X } from "lucide-react";
import { SecretLogo } from "./easter-eggs/SecretLogo";
import { LOCAL_ROUTE } from "./seo";

export const BRAZIL_WHATSAPP = "https://wa.me/5555999357388?text=Ol%C3%A1%2C%20Mediatrix%20Tech.%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento.";

const navigation = [
  ["/", "Início"],
  ["/servicos", "Serviços"],
  ["/portfolio", "Portfólio"],
  ["/empresa", "Empresa"],
  ["/contato", "Contato"],
];

export function PublicHeader() {
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

  return (
    <header className="site-header">
      <div className="header-inner">
        <SecretLogo className="brand" href="/" ariaLabel="Mediatrix Tech — início" />
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map(([href, label]) => <a href={href} key={href}>{label}</a>)}
        </nav>
        <a className="header-cta" href={BRAZIL_WHATSAPP} target="_blank" rel="noopener noreferrer">Solicitar orçamento</a>
        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="menu-publico-mobile"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <nav className={`mobile-nav ${menuOpen ? "open" : ""}`} id="menu-publico-mobile" aria-label="Navegação móvel" hidden={!menuOpen}>
        {navigation.map(([href, label]) => <a href={href} onClick={() => setMenuOpen(false)} key={href}>{label}</a>)}
        <a className="mobile-quote" href={BRAZIL_WHATSAPP} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Solicitar orçamento</a>
      </nav>
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer>
      <div className="shell footer-inner">
        <a className="footer-brand" href="/">Mediatrix Tech</a>
        <p>Create. Connect. Convert.</p>
        <a className="text-link footer-local-link" href={LOCAL_ROUTE}>Criação de sites em Santa Maria, RS <ArrowRight size={17} aria-hidden="true" /></a>
        <a className="text-link" href={BRAZIL_WHATSAPP} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} aria-hidden="true" /> Falar pelo WhatsApp <ArrowRight size={17} aria-hidden="true" /></a>
        <div className="footer-signature"><p>© {new Date().getFullYear()} L. Benaduce · Todos os direitos reservados.</p></div>
      </div>
    </footer>
  );
}
