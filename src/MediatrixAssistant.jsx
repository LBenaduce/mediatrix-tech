import React from "react";
import { Bot, ChevronDown, MessageCircle, Send, X } from "lucide-react";
import { US_WHATSAPP } from "./PublicChrome";

const COPY = {
  en: { greeting: "Hi! 👋 I'm the Mediatrix Tech AI assistant. What are you looking to build?", input: "Tell me about your project…", privacy: "Messages may be processed and saved to help us respond to your inquiry.", whatsapp: "Talk to us on WhatsApp", unavailable: "Sorry, I'm temporarily unavailable. You can talk to us directly on WhatsApp.", actions: ["Website", "Web app", "E-commerce", "Improve existing website", "Something else"] },
  "pt-BR": { greeting: "Olá! 👋 Sou a assistente de IA da Mediatrix Tech. O que você quer criar?", input: "Conte sobre o seu projeto…", privacy: "As mensagens podem ser processadas e salvas para ajudar a responder à sua solicitação.", whatsapp: "Falar conosco no WhatsApp", unavailable: "Desculpe, estou temporariamente indisponível. Você pode falar conosco diretamente no WhatsApp.", actions: ["Site", "Aplicativo web", "E-commerce", "Melhorar site atual", "Outra coisa"] },
  es: { greeting: "¡Hola! 👋 Soy la asistente de IA de Mediatrix Tech. ¿Qué quieres crear?", input: "Cuéntame sobre tu proyecto…", privacy: "Los mensajes pueden procesarse y guardarse para ayudarnos a responder a tu consulta.", whatsapp: "Hablar por WhatsApp", unavailable: "Lo siento, no estoy disponible temporalmente. Puedes hablar con nosotros directamente por WhatsApp.", actions: ["Sitio web", "Aplicación web", "E-commerce", "Mejorar sitio actual", "Otra cosa"] },
  fr: { greeting: "Bonjour ! 👋 Je suis l’assistante IA de Mediatrix Tech. Que souhaitez-vous créer ?", input: "Parlez-moi de votre projet…", privacy: "Les messages peuvent être traités et conservés pour nous aider à répondre à votre demande.", whatsapp: "Nous parler sur WhatsApp", unavailable: "Désolé, je suis temporairement indisponible. Vous pouvez nous parler directement sur WhatsApp.", actions: ["Site web", "Application web", "E-commerce", "Améliorer un site", "Autre chose"] },
  de: { greeting: "Hallo! 👋 Ich bin der KI-Assistent von Mediatrix Tech. Was möchten Sie entwickeln?", input: "Erzählen Sie mir von Ihrem Projekt…", privacy: "Nachrichten können verarbeitet und gespeichert werden, damit wir auf Ihre Anfrage reagieren können.", whatsapp: "Über WhatsApp sprechen", unavailable: "Entschuldigung, ich bin vorübergehend nicht verfügbar. Sie können direkt über WhatsApp mit uns sprechen.", actions: ["Website", "Web-App", "E-Commerce", "Website verbessern", "Etwas anderes"] },
  it: { greeting: "Ciao! 👋 Sono l’assistente IA di Mediatrix Tech. Cosa desideri realizzare?", input: "Parlami del tuo progetto…", privacy: "I messaggi possono essere elaborati e salvati per aiutarci a rispondere alla tua richiesta.", whatsapp: "Parla con noi su WhatsApp", unavailable: "Mi dispiace, non sono temporaneamente disponibile. Puoi parlare direttamente con noi su WhatsApp.", actions: ["Sito web", "Web app", "E-commerce", "Migliorare un sito", "Altro"] },
};

function chatLanguage(language) { return COPY[language] ? language : "en"; }
function waLink(language) {
  const messages = { "pt-BR": "Olá Mediatrix Tech, eu estava conversando com a assistente de IA sobre um projeto e gostaria de continuar com uma pessoa.", it: "Ciao Mediatrix Tech, stavo parlando con l’assistente IA di un progetto e vorrei continuare con una persona.", es: "Hola Mediatrix Tech, estaba hablando con la asistente de IA sobre un proyecto y me gustaría continuar con una persona.", fr: "Bonjour Mediatrix Tech, je parlais avec l’assistante IA d’un projet et j’aimerais continuer avec une personne.", de: "Hallo Mediatrix Tech, ich habe mit dem KI-Assistenten über ein Projekt gesprochen und möchte mit einer Person weitersprechen.", en: "Hi Mediatrix Tech, I was talking with your AI assistant about a project and would like to continue with a human." };
  return `${US_WHATSAPP.split("?")[0]}?text=${encodeURIComponent(messages[chatLanguage(language)])}`;
}

export function MediatrixAssistant({ language }) {
  const [open, setOpen] = React.useState(false);
  const [activeLanguage, setActiveLanguage] = React.useState(chatLanguage(language));
  const [messages, setMessages] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const sessionId = React.useRef(null);
  const c = COPY[activeLanguage];

  React.useEffect(() => { setActiveLanguage(chatLanguage(language)); }, [language]);
  React.useEffect(() => {
    if (!open || messages.length) return undefined;
    const timer = window.setTimeout(() => setMessages([{ role: "assistant", content: c.greeting }]), 450);
    return () => window.clearTimeout(timer);
  }, [open, messages.length, c.greeting]);

  async function send(content) {
    const text = content.trim();
    if (!text || loading) return;
    const next = [...messages, { role: "user", content: text }];
    setMessages(next); setValue(""); setLoading(true);
    try {
      sessionId.current ||= globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const response = await fetch("/api/ai/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ sessionId: sessionId.current, language: activeLanguage, messages: next.slice(-12), page: window.location.href }) });
      if (!response.ok) throw new Error("Chat unavailable");
      const data = await response.json();
      const detected = chatLanguage(data.language);
      setActiveLanguage(detected);
      setMessages((current) => [...current, { role: "assistant", content: data.reply, handoff: Boolean(data.handoff) }]);
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: c.unavailable, handoff: true }]);
    } finally { setLoading(false); }
  }

  return <aside className={`ai-chat ${open ? "is-open" : ""}`} aria-label="Mediatrix AI">
    {open && <section className="ai-chat__panel" aria-live="polite">
      <header><span className="ai-chat__badge"><Bot size={16} /> AI Assistant</span><div><strong>Mediatrix AI</strong><small>AI Sales Assistant</small></div><button type="button" onClick={() => setOpen(false)} aria-label="Minimize assistant"><ChevronDown size={20} /></button><button type="button" onClick={() => setOpen(false)} aria-label="Close assistant"><X size={19} /></button></header>
      <div className="ai-chat__messages">{messages.map((message, index) => <React.Fragment key={`${message.role}-${index}`}><p className={`ai-chat__message ai-chat__message--${message.role}`}>{message.content}</p>{message.handoff && <a className="ai-chat__whatsapp" href={waLink(activeLanguage)} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} />{c.whatsapp}</a>}</React.Fragment>)}{loading && <p className="ai-chat__typing">•••</p>}</div>
      {messages.length <= 1 && <div className="ai-chat__actions">{c.actions.map((action) => <button type="button" key={action} onClick={() => send(action)}>{action}</button>)}</div>}
      <form onSubmit={(event) => { event.preventDefault(); send(value); }}><input value={value} onChange={(event) => setValue(event.target.value)} maxLength="1200" placeholder={c.input} aria-label={c.input} /><button type="submit" disabled={loading || !value.trim()} aria-label="Send"><Send size={17} /></button></form><p className="ai-chat__privacy">{c.privacy}</p>
    </section>}
    {!open && <button className="ai-chat__launcher" type="button" onClick={() => setOpen(true)} aria-label="Open Mediatrix AI"><Bot size={23} /><span>AI</span></button>}
  </aside>;
}
