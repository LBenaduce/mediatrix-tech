import React from "react";
import { createRoot } from "react-dom/client";
import {
  AudioLines,
  Bot,
  ChevronRight,
  Clapperboard,
  Code2,
  Cpu,
  ExternalLink,
  Globe,
  Leaf,
  Mail,
  Music2,
  QrCode,
  Send,
  Sparkles,
} from "lucide-react";
import "./styles.css";

const serviceIcons = [Code2, QrCode, Clapperboard, AudioLines, Music2, Bot, Leaf];

const translations = {
  en: {
    quoteMessage:
      "Hello Mediatrix Tech, I would like to request a quote for a digital project.",
    nav: ["Services", "Packages", "Portfolio", "Contact"],
    hero: {
      eyebrow: "Digital services for modern local businesses",
      tagline: "Connecting ideas, media, and technology.",
      subtitle:
        "Websites, media, and digital solutions for businesses, events, creators, and agribusiness.",
      quote: "Request a quote",
      services: "View services",
      proof: [
        ["Web", "Sites that convert"],
        ["Media", "Video, audio, music"],
        ["AI", "Useful automation"],
      ],
    },
    servicesSection: {
      eyebrow: "What we build",
      title: "Digital services that connect the practical and the creative.",
      intro:
        "A flexible mix of web, media, automation, and AgTech support for teams that need useful digital work without unnecessary complexity.",
    },
    services: [
      [
        "Web Development",
        "Fast, responsive websites and landing pages built to explain, sell, and convert.",
      ],
      [
        "Event Digital Solutions",
        "QR Code upload pages for guest photos, videos, event galleries, and branded sharing.",
      ],
      [
        "Video Editing",
        "Clean Final Cut Pro edits for brands, creators, events, reels, and presentations.",
      ],
      [
        "Audio Editing",
        "Podcast cleanup, voice processing, sound repair, mixing, and polished delivery.",
      ],
      [
        "Music Production",
        "Original tracks, arrangements, sound identity, and production support for digital media.",
      ],
      [
        "AI & Automation",
        "Practical automations that reduce repetitive work for small businesses and solo teams.",
      ],
      [
        "AgTech Solutions",
        "Digital tools for agribusiness workflows, field data, climate insights, and local operations.",
      ],
    ],
    packagesSection: {
      eyebrow: "Starting points",
      title: "Packages shaped around real business needs.",
      intro:
        "Choose a focused kit, then adapt the scope around your goals, budget, and timeline.",
      badge: "Most complete",
    },
    packages: [
      ["Basic Website", "For small businesses", ["One-page website", "Mobile-first layout", "Contact buttons"]],
      ["Event Digital Kit", "For events and venues", ["QR upload page", "Photo/video flow", "Share-ready gallery"]],
      ["Social Media Kit", "For creators and brands", ["Video edits", "Audio polish", "Content-ready assets"]],
      ["Complete Digital Presence", "For growing teams", ["Website", "Media package", "Automation guidance"]],
      ["Agro Digital Kit", "For agribusiness", ["AgTech website", "Field-focused tools", "Data-friendly structure"]],
    ],
    portfolioSection: {
      eyebrow: "Selected work",
      title: "Portfolio placeholders ready for your real project links.",
      intro:
        "Use these entries as a starting structure and connect each card to a live website, video, audio demo, or case study.",
    },
    portfolio: [
      ["AgriClimate Pro", "AgTech platform concept", "Climate-aware digital experience for agricultural decisions."],
      ["Frasson Faróis", "Business website", "Practical local business presence with service-first structure."],
      ["Event QR Code Photo Website", "Event upload flow", "Guest-friendly QR destination for collecting event media."],
      ["Video Editing Sample", "Final Cut Pro", "Rhythmic edits for promotional, event, and creator content."],
      ["Audio/Music Sample", "Audio production", "Polished sound for voice, music, and multimedia projects."],
    ],
    why: {
      eyebrow: "Why choose us",
      title: "Technology with a creative ear and a practical hand.",
      advantages: [
        "Web development + creative media in one place",
        "Experience with real projects",
        "Mobile-first design",
        "Practical solutions for local businesses",
        "Technical and creative background",
      ],
    },
    contact: {
      eyebrow: "Start a project",
      title: "Tell me what you want to build, improve, edit, or automate.",
      intro:
        "From a simple landing page to event media flows or agribusiness digital tools, Mediatrix Tech helps turn the idea into a useful online experience.",
      optionsLabel: "Contact options",
      whatsappUs: "WhatsApp US",
      whatsappBrazil: "WhatsApp Brazil",
    },
  },
  "pt-BR": {
    quoteMessage:
      "Olá, Mediatrix Tech. Gostaria de solicitar um orçamento para um projeto digital.",
    nav: ["Serviços", "Pacotes", "Portfólio", "Contato"],
    hero: {
      eyebrow: "Serviços digitais para negócios locais modernos",
      tagline: "Conectando ideias, mídia e tecnologia.",
      subtitle:
        "Sites, mídia e soluções digitais para empresas, eventos, criadores e agronegócio.",
      quote: "Solicitar orçamento",
      services: "Ver serviços",
      proof: [
        ["Web", "Sites que convertem"],
        ["Mídia", "Vídeo, áudio, música"],
        ["IA", "Automação útil"],
      ],
    },
    servicesSection: {
      eyebrow: "O que fazemos",
      title: "Serviços digitais que conectam o prático e o criativo.",
      intro:
        "Uma combinação flexível de web, mídia, automação e AgTech para equipes que precisam de trabalho digital útil, sem complexidade desnecessária.",
    },
    services: [
      ["Desenvolvimento Web", "Sites e landing pages rápidos, responsivos e feitos para explicar, vender e converter."],
      ["Soluções Digitais para Eventos", "Páginas com QR Code para envio de fotos, vídeos, galerias de eventos e compartilhamento com marca."],
      ["Edição de Vídeo", "Edições limpas no Final Cut Pro para marcas, criadores, eventos, reels e apresentações."],
      ["Edição de Áudio", "Limpeza de podcasts, tratamento de voz, reparo de som, mixagem e entrega polida."],
      ["Produção Musical", "Trilhas originais, arranjos, identidade sonora e apoio de produção para mídia digital."],
      ["IA e Automação", "Automações práticas que reduzem trabalho repetitivo para pequenos negócios e equipes solo."],
      ["Soluções AgTech", "Ferramentas digitais para fluxos do agronegócio, dados de campo, clima e operações locais."],
    ],
    packagesSection: {
      eyebrow: "Pontos de partida",
      title: "Pacotes moldados para necessidades reais de negócios.",
      intro:
        "Escolha um kit focado e adapte o escopo aos seus objetivos, orçamento e prazo.",
      badge: "Mais completo",
    },
    packages: [
      ["Site Básico", "Para pequenos negócios", ["Site de uma página", "Layout mobile-first", "Botões de contato"]],
      ["Kit Digital para Eventos", "Para eventos e espaços", ["Página de envio por QR", "Fluxo de foto/vídeo", "Galeria pronta para compartilhar"]],
      ["Kit de Mídias Sociais", "Para criadores e marcas", ["Edições de vídeo", "Polimento de áudio", "Arquivos prontos para conteúdo"]],
      ["Presença Digital Completa", "Para equipes em crescimento", ["Site", "Pacote de mídia", "Orientação em automação"]],
      ["Kit Agro Digital", "Para o agronegócio", ["Site AgTech", "Ferramentas para campo", "Estrutura amigável para dados"]],
    ],
    portfolioSection: {
      eyebrow: "Trabalhos selecionados",
      title: "Espaços de portfólio prontos para links de projetos reais.",
      intro:
        "Use estas entradas como estrutura inicial e conecte cada card a um site, vídeo, demo de áudio ou estudo de caso.",
    },
    portfolio: [
      ["AgriClimate Pro", "Conceito de plataforma AgTech", "Experiência digital com foco em clima para decisões agrícolas."],
      ["Frasson Faróis", "Site empresarial", "Presença local prática com estrutura orientada a serviços."],
      ["Site de Fotos por QR Code para Eventos", "Fluxo de envio para eventos", "Destino via QR simples para convidados enviarem mídia do evento."],
      ["Amostra de Edição de Vídeo", "Final Cut Pro", "Edições com ritmo para conteúdo promocional, eventos e criadores."],
      ["Amostra de Áudio/Música", "Produção de áudio", "Som polido para voz, música e projetos multimídia."],
    ],
    why: {
      eyebrow: "Por que escolher",
      title: "Tecnologia com ouvido criativo e mão prática.",
      advantages: [
        "Desenvolvimento web + mídia criativa em um só lugar",
        "Experiência com projetos reais",
        "Design mobile-first",
        "Soluções práticas para negócios locais",
        "Base técnica e criativa",
      ],
    },
    contact: {
      eyebrow: "Comece um projeto",
      title: "Conte o que você quer construir, melhorar, editar ou automatizar.",
      intro:
        "De uma landing page simples a fluxos de mídia para eventos ou ferramentas digitais para o agro, a Mediatrix Tech transforma ideias em experiências online úteis.",
      optionsLabel: "Opções de contato",
      whatsappUs: "WhatsApp EUA",
      whatsappBrazil: "WhatsApp Brasil",
    },
  },
  es: {
    quoteMessage:
      "Hola Mediatrix Tech, me gustaría solicitar un presupuesto para un proyecto digital.",
    nav: ["Servicios", "Paquetes", "Portafolio", "Contacto"],
    hero: {
      eyebrow: "Servicios digitales para negocios locales modernos",
      tagline: "Conectando ideas, medios y tecnología.",
      subtitle:
        "Sitios web, medios y soluciones digitales para empresas, eventos, creadores y agronegocios.",
      quote: "Solicitar presupuesto",
      services: "Ver servicios",
      proof: [["Web", "Sitios que convierten"], ["Medios", "Video, audio, música"], ["IA", "Automatización útil"]],
    },
    servicesSection: {
      eyebrow: "Lo que creamos",
      title: "Servicios digitales que conectan lo práctico y lo creativo.",
      intro:
        "Una mezcla flexible de web, medios, automatización y AgTech para equipos que necesitan trabajo digital útil sin complejidad innecesaria.",
    },
    services: [
      ["Desarrollo Web", "Sitios y landing pages rápidos y responsivos para explicar, vender y convertir."],
      ["Soluciones Digitales para Eventos", "Páginas con QR Code para fotos, videos, galerías de eventos y uso compartido con marca."],
      ["Edición de Video", "Ediciones limpias en Final Cut Pro para marcas, creadores, eventos, reels y presentaciones."],
      ["Edición de Audio", "Limpieza de podcasts, procesamiento de voz, reparación de sonido, mezcla y entrega pulida."],
      ["Producción Musical", "Pistas originales, arreglos, identidad sonora y apoyo de producción para medios digitales."],
      ["IA y Automatización", "Automatizaciones prácticas que reducen trabajo repetitivo para pequeños negocios y equipos independientes."],
      ["Soluciones AgTech", "Herramientas digitales para flujos agro, datos de campo, clima y operaciones locales."],
    ],
    packagesSection: {
      eyebrow: "Puntos de partida",
      title: "Paquetes pensados para necesidades reales de negocio.",
      intro: "Elige un kit enfocado y adapta el alcance a tus metas, presupuesto y calendario.",
      badge: "Más completo",
    },
    packages: [
      ["Sitio Básico", "Para pequeños negocios", ["Sitio de una página", "Diseño mobile-first", "Botones de contacto"]],
      ["Kit Digital para Eventos", "Para eventos y espacios", ["Página de carga por QR", "Flujo de foto/video", "Galería lista para compartir"]],
      ["Kit de Redes Sociales", "Para creadores y marcas", ["Ediciones de video", "Audio pulido", "Recursos listos para contenido"]],
      ["Presencia Digital Completa", "Para equipos en crecimiento", ["Sitio web", "Paquete de medios", "Guía de automatización"]],
      ["Kit Agro Digital", "Para agronegocios", ["Sitio AgTech", "Herramientas de campo", "Estructura amigable para datos"]],
    ],
    portfolioSection: {
      eyebrow: "Trabajo seleccionado",
      title: "Espacios de portafolio listos para tus enlaces reales.",
      intro:
        "Usa estas entradas como estructura inicial y conecta cada tarjeta a un sitio, video, demo de audio o caso de estudio.",
    },
    portfolio: [
      ["AgriClimate Pro", "Concepto de plataforma AgTech", "Experiencia digital climática para decisiones agrícolas."],
      ["Frasson Faróis", "Sitio empresarial", "Presencia local práctica con estructura centrada en servicios."],
      ["Sitio de Fotos por QR para Eventos", "Flujo de carga para eventos", "Destino QR simple para reunir medios de invitados."],
      ["Muestra de Edición de Video", "Final Cut Pro", "Ediciones rítmicas para promociones, eventos y creadores."],
      ["Muestra de Audio/Música", "Producción de audio", "Sonido pulido para voz, música y proyectos multimedia."],
    ],
    why: {
      eyebrow: "Por qué elegirnos",
      title: "Tecnología con oído creativo y mano práctica.",
      advantages: [
        "Desarrollo web + medios creativos en un solo lugar",
        "Experiencia con proyectos reales",
        "Diseño mobile-first",
        "Soluciones prácticas para negocios locales",
        "Base técnica y creativa",
      ],
    },
    contact: {
      eyebrow: "Inicia un proyecto",
      title: "Cuéntame qué quieres crear, mejorar, editar o automatizar.",
      intro:
        "Desde una landing page simple hasta flujos de medios para eventos o herramientas digitales agro, Mediatrix Tech convierte ideas en experiencias online útiles.",
      optionsLabel: "Opciones de contacto",
      whatsappUs: "WhatsApp EE. UU.",
      whatsappBrazil: "WhatsApp Brasil",
    },
  },
  fr: {
    quoteMessage:
      "Bonjour Mediatrix Tech, je souhaite demander un devis pour un projet digital.",
    nav: ["Services", "Offres", "Portfolio", "Contact"],
    hero: {
      eyebrow: "Services digitaux pour les entreprises locales modernes",
      tagline: "Connecter les idées, les médias et la technologie.",
      subtitle:
        "Sites web, médias et solutions digitales pour entreprises, événements, créateurs et agrobusiness.",
      quote: "Demander un devis",
      services: "Voir les services",
      proof: [["Web", "Sites qui convertissent"], ["Média", "Vidéo, audio, musique"], ["IA", "Automatisation utile"]],
    },
    servicesSection: {
      eyebrow: "Ce que nous créons",
      title: "Des services digitaux entre pratique et créativité.",
      intro:
        "Un mélange flexible de web, média, automatisation et AgTech pour des équipes qui veulent du digital utile sans complexité inutile.",
    },
    services: [
      ["Développement Web", "Sites et landing pages rapides et responsives pour expliquer, vendre et convertir."],
      ["Solutions Digitales Événementielles", "Pages QR Code pour photos, vidéos, galeries d'événements et partage de marque."],
      ["Montage Vidéo", "Montages propres sur Final Cut Pro pour marques, créateurs, événements, reels et présentations."],
      ["Montage Audio", "Nettoyage de podcasts, traitement vocal, réparation sonore, mixage et livraison soignée."],
      ["Production Musicale", "Morceaux originaux, arrangements, identité sonore et support de production digitale."],
      ["IA et Automatisation", "Automatisations pratiques pour réduire les tâches répétitives des petites équipes."],
      ["Solutions AgTech", "Outils digitaux pour flux agricoles, données terrain, climat et opérations locales."],
    ],
    packagesSection: {
      eyebrow: "Points de départ",
      title: "Des offres pensées pour de vrais besoins business.",
      intro: "Choisissez un kit ciblé, puis adaptez le périmètre à vos objectifs, budget et calendrier.",
      badge: "Le plus complet",
    },
    packages: [
      ["Site Basique", "Pour petites entreprises", ["Site d'une page", "Design mobile-first", "Boutons de contact"]],
      ["Kit Digital Événement", "Pour événements et lieux", ["Page d'envoi QR", "Flux photo/vidéo", "Galerie prête à partager"]],
      ["Kit Réseaux Sociaux", "Pour créateurs et marques", ["Montages vidéo", "Audio optimisé", "Assets prêts à publier"]],
      ["Présence Digitale Complète", "Pour équipes en croissance", ["Site web", "Pack média", "Conseil automatisation"]],
      ["Kit Agro Digital", "Pour agrobusiness", ["Site AgTech", "Outils terrain", "Structure orientée données"]],
    ],
    portfolioSection: {
      eyebrow: "Travaux choisis",
      title: "Des emplacements portfolio prêts pour vos liens réels.",
      intro: "Connectez chaque carte à un site, une vidéo, une démo audio ou une étude de cas.",
    },
    portfolio: [
      ["AgriClimate Pro", "Concept de plateforme AgTech", "Expérience digitale liée au climat pour décisions agricoles."],
      ["Frasson Faróis", "Site d'entreprise", "Présence locale pratique avec structure orientée services."],
      ["Site Photo QR Code Événement", "Flux d'envoi événementiel", "Destination QR simple pour collecter les médias des invités."],
      ["Exemple de Montage Vidéo", "Final Cut Pro", "Montages rythmés pour promotion, événements et créateurs."],
      ["Exemple Audio/Musique", "Production audio", "Son soigné pour voix, musique et projets multimédias."],
    ],
    why: {
      eyebrow: "Pourquoi nous choisir",
      title: "Une technologie avec une oreille créative et une main pratique.",
      advantages: [
        "Web + média créatif au même endroit",
        "Expérience sur des projets réels",
        "Design mobile-first",
        "Solutions pratiques pour entreprises locales",
        "Base technique et créative",
      ],
    },
    contact: {
      eyebrow: "Démarrer un projet",
      title: "Dites-moi ce que vous voulez créer, améliorer, monter ou automatiser.",
      intro:
        "D'une landing page simple aux flux média événementiels ou outils digitaux agricoles, Mediatrix Tech transforme l'idée en expérience utile.",
      optionsLabel: "Options de contact",
      whatsappUs: "WhatsApp États-Unis",
      whatsappBrazil: "WhatsApp Brésil",
    },
  },
  de: {
    quoteMessage:
      "Hallo Mediatrix Tech, ich möchte ein Angebot für ein digitales Projekt anfragen.",
    nav: ["Services", "Pakete", "Portfolio", "Kontakt"],
    hero: {
      eyebrow: "Digitale Services für moderne lokale Unternehmen",
      tagline: "Ideen, Medien und Technologie verbinden.",
      subtitle:
        "Websites, Medien und digitale Lösungen für Unternehmen, Events, Creator und Agribusiness.",
      quote: "Angebot anfragen",
      services: "Services ansehen",
      proof: [["Web", "Websites, die konvertieren"], ["Medien", "Video, Audio, Musik"], ["KI", "Nützliche Automatisierung"]],
    },
    servicesSection: {
      eyebrow: "Was wir bauen",
      title: "Digitale Services, die Praxis und Kreativität verbinden.",
      intro:
        "Ein flexibler Mix aus Web, Medien, Automatisierung und AgTech für Teams, die nützliche digitale Arbeit ohne unnötige Komplexität brauchen.",
    },
    services: [
      ["Webentwicklung", "Schnelle, responsive Websites und Landingpages zum Erklären, Verkaufen und Konvertieren."],
      ["Digitale Eventlösungen", "QR-Code-Seiten für Fotos, Videos, Event-Galerien und gebrandetes Teilen."],
      ["Videoschnitt", "Saubere Final-Cut-Pro-Edits für Marken, Creator, Events, Reels und Präsentationen."],
      ["Audiobearbeitung", "Podcast-Cleanup, Sprachbearbeitung, Sound-Reparatur, Mix und polierte Lieferung."],
      ["Musikproduktion", "Originaltracks, Arrangements, Sound Identity und Produktionssupport für digitale Medien."],
      ["KI und Automatisierung", "Praktische Automationen, die wiederholte Arbeit für kleine Teams reduzieren."],
      ["AgTech-Lösungen", "Digitale Tools für Agrar-Workflows, Felddaten, Klimaeinblicke und lokale Abläufe."],
    ],
    packagesSection: {
      eyebrow: "Startpunkte",
      title: "Pakete für echte Geschäftsanforderungen.",
      intro: "Wählen Sie ein fokussiertes Kit und passen Sie Umfang, Budget und Zeitplan an.",
      badge: "Am vollständigsten",
    },
    packages: [
      ["Basis-Website", "Für kleine Unternehmen", ["One-Page-Website", "Mobile-first Layout", "Kontaktbuttons"]],
      ["Digitales Event-Kit", "Für Events und Locations", ["QR-Upload-Seite", "Foto/Video-Flow", "Teilbare Galerie"]],
      ["Social-Media-Kit", "Für Creator und Marken", ["Video-Edits", "Audio-Polish", "Content-fertige Assets"]],
      ["Komplette Digitale Präsenz", "Für wachsende Teams", ["Website", "Medienpaket", "Automatisierungsberatung"]],
      ["Agro Digital Kit", "Für Agribusiness", ["AgTech-Website", "Feldorientierte Tools", "Datenfreundliche Struktur"]],
    ],
    portfolioSection: {
      eyebrow: "Ausgewählte Arbeit",
      title: "Portfolio-Platzhalter bereit für echte Projektlinks.",
      intro: "Verbinden Sie jede Karte mit Website, Video, Audio-Demo oder Case Study.",
    },
    portfolio: [
      ["AgriClimate Pro", "AgTech-Plattformkonzept", "Klimaorientierte digitale Erfahrung für Agrarentscheidungen."],
      ["Frasson Faróis", "Business-Website", "Praktische lokale Präsenz mit serviceorientierter Struktur."],
      ["Event QR-Code Foto-Website", "Event-Upload-Flow", "Einfaches QR-Ziel zum Sammeln von Gästemedien."],
      ["Videoschnitt-Beispiel", "Final Cut Pro", "Rhythmische Edits für Promotion, Events und Creator."],
      ["Audio/Musik-Beispiel", "Audioproduktion", "Polierter Sound für Stimme, Musik und Multimedia-Projekte."],
    ],
    why: {
      eyebrow: "Warum wir",
      title: "Technologie mit kreativem Ohr und praktischer Hand.",
      advantages: [
        "Webentwicklung + kreative Medien an einem Ort",
        "Erfahrung mit echten Projekten",
        "Mobile-first Design",
        "Praktische Lösungen für lokale Unternehmen",
        "Technische und kreative Basis",
      ],
    },
    contact: {
      eyebrow: "Projekt starten",
      title: "Sagen Sie, was Sie bauen, verbessern, schneiden oder automatisieren möchten.",
      intro:
        "Von einfachen Landingpages bis zu Event-Media-Flows oder digitalen Agrar-Tools macht Mediatrix Tech Ideen zu nützlichen Online-Erfahrungen.",
      optionsLabel: "Kontaktoptionen",
      whatsappUs: "WhatsApp USA",
      whatsappBrazil: "WhatsApp Brasilien",
    },
  },
  it: {
    quoteMessage:
      "Ciao Mediatrix Tech, vorrei richiedere un preventivo per un progetto digitale.",
    nav: ["Servizi", "Pacchetti", "Portfolio", "Contatti"],
    hero: {
      eyebrow: "Servizi digitali per aziende locali moderne",
      tagline: "Connettere idee, media e tecnologia.",
      subtitle:
        "Siti web, media e soluzioni digitali per aziende, eventi, creator e agribusiness.",
      quote: "Richiedi preventivo",
      services: "Vedi servizi",
      proof: [["Web", "Siti che convertono"], ["Media", "Video, audio, musica"], ["AI", "Automazione utile"]],
    },
    servicesSection: {
      eyebrow: "Cosa creiamo",
      title: "Servizi digitali che uniscono praticità e creatività.",
      intro:
        "Un mix flessibile di web, media, automazione e AgTech per team che vogliono lavoro digitale utile senza complessità inutili.",
    },
    services: [
      ["Sviluppo Web", "Siti e landing page rapidi e responsive per spiegare, vendere e convertire."],
      ["Soluzioni Digitali per Eventi", "Pagine QR Code per foto, video, gallerie eventi e condivisione brandizzata."],
      ["Montaggio Video", "Editing pulito in Final Cut Pro per brand, creator, eventi, reel e presentazioni."],
      ["Editing Audio", "Pulizia podcast, trattamento voce, riparazione audio, mix e consegna rifinita."],
      ["Produzione Musicale", "Tracce originali, arrangiamenti, identità sonora e supporto produttivo per media digitali."],
      ["AI e Automazione", "Automazioni pratiche che riducono il lavoro ripetitivo per piccoli team."],
      ["Soluzioni AgTech", "Strumenti digitali per flussi agricoli, dati di campo, clima e operazioni locali."],
    ],
    packagesSection: {
      eyebrow: "Punti di partenza",
      title: "Pacchetti pensati per esigenze aziendali reali.",
      intro: "Scegli un kit focalizzato e adatta lo scope a obiettivi, budget e tempi.",
      badge: "Più completo",
    },
    packages: [
      ["Sito Base", "Per piccole imprese", ["Sito one-page", "Layout mobile-first", "Pulsanti di contatto"]],
      ["Kit Digitale Eventi", "Per eventi e location", ["Pagina upload QR", "Flusso foto/video", "Galleria pronta da condividere"]],
      ["Kit Social Media", "Per creator e brand", ["Editing video", "Audio rifinito", "Asset pronti per contenuti"]],
      ["Presenza Digitale Completa", "Per team in crescita", ["Sito web", "Pacchetto media", "Guida automazione"]],
      ["Kit Agro Digitale", "Per agribusiness", ["Sito AgTech", "Strumenti per il campo", "Struttura data-friendly"]],
    ],
    portfolioSection: {
      eyebrow: "Lavori selezionati",
      title: "Spazi portfolio pronti per i tuoi link reali.",
      intro: "Collega ogni card a un sito, video, demo audio o case study.",
    },
    portfolio: [
      ["AgriClimate Pro", "Concept piattaforma AgTech", "Esperienza digitale climatica per decisioni agricole."],
      ["Frasson Faróis", "Sito aziendale", "Presenza locale pratica con struttura orientata ai servizi."],
      ["Sito Foto QR Code Eventi", "Flusso upload eventi", "Destinazione QR semplice per raccogliere media dagli ospiti."],
      ["Esempio Editing Video", "Final Cut Pro", "Editing ritmici per promozioni, eventi e creator."],
      ["Esempio Audio/Musica", "Produzione audio", "Suono rifinito per voce, musica e progetti multimediali."],
    ],
    why: {
      eyebrow: "Perché sceglierci",
      title: "Tecnologia con orecchio creativo e mano pratica.",
      advantages: [
        "Web development + media creativi in un solo posto",
        "Esperienza con progetti reali",
        "Design mobile-first",
        "Soluzioni pratiche per imprese locali",
        "Base tecnica e creativa",
      ],
    },
    contact: {
      eyebrow: "Avvia un progetto",
      title: "Raccontami cosa vuoi creare, migliorare, editare o automatizzare.",
      intro:
        "Da una semplice landing page a flussi media per eventi o strumenti digitali agro, Mediatrix Tech trasforma idee in esperienze online utili.",
      optionsLabel: "Opzioni di contatto",
      whatsappUs: "WhatsApp USA",
      whatsappBrazil: "WhatsApp Brasile",
    },
  },
};

const mergeLocale = (locale) => ({
  ...translations.en,
  ...locale,
  hero: { ...translations.en.hero, ...locale.hero },
  servicesSection: { ...translations.en.servicesSection, ...locale.servicesSection },
  packagesSection: { ...translations.en.packagesSection, ...locale.packagesSection },
  portfolioSection: { ...translations.en.portfolioSection, ...locale.portfolioSection },
  why: { ...translations.en.why, ...locale.why },
  contact: { ...translations.en.contact, ...locale.contact },
});

const supportedLocales = Object.keys(translations);
const localeLabels = {
  en: "EN",
  "pt-BR": "PT",
  es: "ES",
  fr: "FR",
  de: "DE",
  it: "IT",
};
const portfolioDemoVideos = {
  0: "/agriclimate-pro-demo.mp4",
  2: "/event-qr-code-demo.mp4",
};
const portfolioDemoImages = {
  1: "/frasson-farois-demo.jpg",
};

const LocaleContentContext = React.createContext(null);

const useLocaleContent = () => React.useContext(LocaleContentContext);

const normalizeLocale = (locale) => locale?.toLowerCase().replace("_", "-");

const getDeviceLocale = () => {
  const deviceLocales =
    typeof navigator === "undefined"
      ? []
      : [...(navigator.languages || []), navigator.language].filter(Boolean);

  const locale = deviceLocales.find((deviceLocale) => {
    const normalizedDeviceLocale = normalizeLocale(deviceLocale);
    return supportedLocales.some(
      (supportedLocale) =>
        normalizeLocale(supportedLocale) === normalizedDeviceLocale ||
        normalizeLocale(supportedLocale).split("-")[0] ===
          normalizedDeviceLocale.split("-")[0],
    );
  });

  if (!locale) {
    return "en";
  }

  const normalizedLocale = normalizeLocale(locale);
  return (
    supportedLocales.find(
      (supportedLocale) => normalizeLocale(supportedLocale) === normalizedLocale,
    ) ||
    supportedLocales.find(
      (supportedLocale) =>
        normalizeLocale(supportedLocale).split("-")[0] === normalizedLocale.split("-")[0],
    ) ||
    "en"
  );
};

const whatsappUrl = (phoneNumber, quoteMessage) =>
  `https://wa.me/${phoneNumber}?text=${encodeURIComponent(quoteMessage)}`;

// Change these links to your real phone, email, Instagram, and Upwork profile.
const getContactLinks = (quoteMessage) => ({
  // Replace this placeholder with your real US WhatsApp number, for example: 13059920833.
  whatsappUs: whatsappUrl("10000000000", quoteMessage),
  // Replace this placeholder with your real Brazil WhatsApp number, for example: 5555999357388.
  whatsappBrazil: whatsappUrl("5500000000000", quoteMessage),
  email: "mailto:hello@mediatrixtech.com",
  instagram: "https://instagram.com/mediatrixtech",
  upwork: "https://www.upwork.com/freelancers/~your-profile",
});

function App() {
  const [currentLocale, setCurrentLocale] = React.useState(getDeviceLocale);
  const copy = React.useMemo(
    () => mergeLocale(translations[currentLocale]),
    [currentLocale],
  );
  const content = React.useMemo(() => {
    const services = copy.services.map(([title, description], index) => ({
      title,
      description,
      icon: serviceIcons[index],
    }));
    const packages = copy.packages.map(([name, audience, features], index) => ({
      name,
      audience,
      features,
      featured: index === 3,
    }));
    const portfolio = copy.portfolio.map(([title, category, description], index) => ({
      title,
      category,
      description,
      demoImage: portfolioDemoImages[index] || null,
      demoVideo: portfolioDemoVideos[index] || null,
    }));

    return {
      contactLinks: getContactLinks(copy.quoteMessage),
      copy,
      currentLocale,
      packages,
      portfolio,
      services,
      setCurrentLocale,
    };
  }, [copy, currentLocale]);

  React.useEffect(() => {
    document.documentElement.lang = currentLocale;
  }, [currentLocale]);

  return (
    <LocaleContentContext.Provider value={content}>
      <Header />
      <main>
        <Hero />
        <Services />
        <Packages />
        <Portfolio />
        <WhyChooseUs />
        <Contact />
      </main>
    </LocaleContentContext.Provider>
  );
}

function Header() {
  const { copy, currentLocale, setCurrentLocale } = useLocaleContent();
  const currentLocaleIndex = supportedLocales.indexOf(currentLocale);
  const nextLocale = supportedLocales[(currentLocaleIndex + 1) % supportedLocales.length];
  const changeLanguage = () => {
    setCurrentLocale(nextLocale);
  };

  return (
    <header className="site-header">
      <a className="brand-mark" href="#top" aria-label="Mediatrix Tech home">
        <span>M</span>
        Mediatrix Tech
      </a>
      <div className="header-actions">
        <nav aria-label="Primary navigation">
          <a href="#services">{copy.nav[0]}</a>
          <a href="#packages">{copy.nav[1]}</a>
          <a href="#portfolio">{copy.nav[2]}</a>
          <a href="#contact">{copy.nav[3]}</a>
        </nav>
        <button
          className="language-button"
          type="button"
          onClick={changeLanguage}
          aria-label={`Change language. Current language: ${localeLabels[currentLocale]}. Next language: ${localeLabels[nextLocale]}.`}
        >
          <Globe size={17} aria-hidden="true" />
          <span>{localeLabels[currentLocale]}</span>
        </button>
      </div>
    </header>
  );
}

function Hero() {
  const { copy } = useLocaleContent();

  return (
    <section className="hero" id="top">
      <video
        className="hero-video"
        aria-hidden="true"
        autoPlay
        loop
        muted
        playsInline
        poster="/mediatrix-hero.png"
      >
        <source src="/mediatrix-hero-video.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content section-shell">
        <div className="hero-copy">
          <p className="eyebrow">
            <Sparkles size={16} />
            {copy.hero.eyebrow}
          </p>
          <h1>Mediatrix Tech</h1>
          <p className="tagline">{copy.hero.tagline}</p>
          <p className="subtitle">{copy.hero.subtitle}</p>
          <div className="hero-actions">
            <a className="button primary" href="#contact">
              {copy.hero.quote}
              <Send size={18} />
            </a>
            <a className="button secondary" href="#services">
              {copy.hero.services}
              <ChevronRight size={18} />
            </a>
          </div>
        </div>
        <div className="hero-proof" aria-label="Mediatrix Tech service highlights">
          {copy.hero.proof.map(([title, description]) => (
            <div key={title}>
              <strong>{title}</strong>
              <span>{description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const { copy, services } = useLocaleContent();

  return (
    <Section
      id="services"
      eyebrow={copy.servicesSection.eyebrow}
      title={copy.servicesSection.title}
      intro={copy.servicesSection.intro}
    >
      <div className="service-grid">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </Section>
  );
}

function ServiceCard({ title, description, icon: Icon }) {
  return (
    <article className="glass-card service-card">
      <div className="service-card-top">
        <div className="icon-tile" aria-hidden="true">
          <Icon size={24} />
        </div>
        <span className="service-arrow" aria-hidden="true">
          <ChevronRight size={18} />
        </span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

function Packages() {
  const { copy, packages } = useLocaleContent();

  return (
    <Section
      id="packages"
      eyebrow={copy.packagesSection.eyebrow}
      title={copy.packagesSection.title}
      intro={copy.packagesSection.intro}
    >
      <div className="package-grid">
        {packages.map((item) => (
          <article
            className={`package-card ${item.featured ? "featured" : ""}`}
            key={item.name}
          >
            {item.featured && <span className="badge">{copy.packagesSection.badge}</span>}
            <p className="package-audience">{item.audience}</p>
            <h3>{item.name}</h3>
            <ul>
              {item.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Portfolio() {
  const { copy, portfolio } = useLocaleContent();

  return (
    <Section
      id="portfolio"
      eyebrow={copy.portfolioSection.eyebrow}
      title={copy.portfolioSection.title}
      intro={copy.portfolioSection.intro}
    >
      <div className="portfolio-grid">
        {portfolio.map((project, index) => (
          <a className="portfolio-card" href="#contact" key={project.title}>
            {/* Change this href to the real portfolio URL for this project. */}
            <span className="portfolio-number">{String(index + 1).padStart(2, "0")}</span>
            <p>{project.category}</p>
            <h3>{project.title}</h3>
            {project.demoVideo && (
              <video
                className="portfolio-demo"
                aria-label={`${project.title} demo video`}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              >
                <source src={project.demoVideo} type="video/mp4" />
              </video>
            )}
            {project.demoImage && (
              <img
                className="portfolio-demo"
                src={project.demoImage}
                alt={`${project.title} demo preview`}
                loading="lazy"
              />
            )}
            <span>{project.description}</span>
            <ExternalLink size={18} aria-hidden="true" />
          </a>
        ))}
      </div>
    </Section>
  );
}

function WhyChooseUs() {
  const { copy } = useLocaleContent();

  return (
    <section className="why-section">
      <div className="section-shell why-layout">
        <div>
          <p className="section-eyebrow">{copy.why.eyebrow}</p>
          <h2>{copy.why.title}</h2>
        </div>
        <div className="advantage-list">
          {copy.why.advantages.map((item) => (
            <div className="advantage-item" key={item}>
              <Cpu size={18} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { contactLinks, copy } = useLocaleContent();

  return (
    <section className="contact-section" id="contact">
      <div className="section-shell contact-layout">
        <div>
          <p className="section-eyebrow">{copy.contact.eyebrow}</p>
          <h2>{copy.contact.title}</h2>
          <p>{copy.contact.intro}</p>
        </div>
        <div className="contact-actions" aria-label={copy.contact.optionsLabel}>
          <a className="button primary" href={contactLinks.whatsappUs}>
            {copy.contact.whatsappUs}
            <Send size={18} />
          </a>
          <a className="button primary" href={contactLinks.whatsappBrazil}>
            {copy.contact.whatsappBrazil}
            <Send size={18} />
          </a>
          <a className="button secondary" href={contactLinks.email}>
            Email
            <Mail size={18} />
          </a>
          <a className="button secondary" href={contactLinks.instagram}>
            Instagram
            <ExternalLink size={18} />
          </a>
          <a className="button secondary" href={contactLinks.upwork}>
            Upwork
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
     <footer>
  <span>L Benaduce © {new Date().getFullYear()}</span>
  <span>{copy.hero.tagline}</span>
</footer> 
    </section>
  );
}

function Section({ id, eyebrow, title, intro, children }) {
  return (
    <section className="content-section" id={id}>
      <div className="section-shell">
        <div className="section-heading">
          <p className="section-eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p>{intro}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);
