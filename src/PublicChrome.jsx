import React from "react";
import { ArrowRight, Menu, MessageCircle, X } from "lucide-react";
import { SecretLogo } from "./easter-eggs/SecretLogo";
import { LOCAL_ROUTE } from "./seo";
import { sharedUiTranslations } from "./translations";

export const BRAZIL_WHATSAPP = "https://wa.me/5555999357388?text=Ol%C3%A1%2C%20Mediatrix%20Tech.%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento.";
export const US_WHATSAPP = "https://wa.me/13059920833?text=Hello%20Mediatrix%20Tech%2C%20I%20would%20like%20to%20request%20a%20quote.";

const navigation = [
  ["/", "Início"],
  ["/servicos", "Serviços"],
  ["/portfolio", "Portfólio"],
  ["/empresa", "Empresa"],
  ["/contato", "Contato"],
];

export function WhatsAppFloat({ onClick, language = "pt-BR" }) {
  const copy = sharedUiTranslations[language] || sharedUiTranslations.en;
  return (
    <a
      className="whatsapp-float"
      href={US_WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={copy.whatsappQuickAria}
      onClick={onClick}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="M19.11 17.21c-.27-.14-1.58-.78-1.82-.86-.24-.09-.42-.14-.59.14-.18.27-.69.86-.85 1.04-.16.18-.31.2-.58.07a7.5 7.5 0 0 1-2.2-1.36 8.22 8.22 0 0 1-1.52-1.9c-.16-.27 0-.41.12-.54.12-.12.27-.31.41-.46.14-.16.18-.27.27-.46.09-.18.05-.34-.02-.48-.07-.14-.59-1.42-.81-1.95-.21-.51-.43-.44-.59-.45h-.5c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29 0 1.35.98 2.65 1.12 2.83.14.18 1.93 2.95 4.67 4.14.65.28 1.16.45 1.56.58.66.21 1.27.18 1.75.11.53-.08 1.58-.65 1.8-1.27.22-.63.22-1.16.15-1.27-.06-.12-.24-.19-.5-.32Z" />
        <path fill="currentColor" d="M16.02 3.2c-7.07 0-12.8 5.72-12.8 12.78 0 2.26.59 4.47 1.71 6.42L3.1 28.8l6.57-1.72a12.79 12.79 0 0 0 6.34 1.68h.01c7.06 0 12.78-5.73 12.78-12.79 0-3.42-1.33-6.63-3.75-9.05A12.69 12.69 0 0 0 16.02 3.2Zm0 23.4h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.9 1.02 1.04-3.79-.25-.4a10.6 10.6 0 1 1 8.91 4.88Z" />
      </svg>
      <span className="whatsapp-float__label">{copy.whatsappQuick}</span>
    </a>
  );
}

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
