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
        ["Web", "Development"],
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
        ["Web", "Desenvolvimento"],
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
      proof: [["Web", "Desarrollo"], ["Medios", "Video, audio, música"], ["IA", "Automatización útil"]],
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
      proof: [["Web", "Développement"], ["Média", "Vidéo, audio, musique"], ["IA", "Automatisation utile"]],
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
      proof: [["Web", "Entwicklung"], ["Medien", "Video, Audio, Musik"], ["KI", "Nützliche Automatisierung"]],
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
      proof: [["Web", "Sviluppo"], ["Media", "Video, audio, musica"], ["AI", "Automazione utile"]],
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

Object.assign(translations, {
  "zh-CN": {
    quoteMessage: "你好 Mediatrix Tech，我想为一个数字项目申请报价。",
    nav: ["服务", "套餐", "作品集", "联系"],
    hero: {
      eyebrow: "面向现代本地企业的数字服务",
      tagline: "连接创意、媒体与技术。",
      subtitle: "为企业、活动、创作者和农业商务打造网站、媒体和数字解决方案。",
      quote: "申请报价",
      services: "查看服务",
      proof: [["网站", "开发"], ["媒体", "视频、音频、音乐"], ["AI", "实用自动化"]],
    },
    servicesSection: {
      eyebrow: "我们打造什么",
      title: "连接实用性与创造力的数字服务。",
      intro: "灵活结合网站、媒体、自动化和 AgTech 支持，为团队提供有用且不过度复杂的数字工作。",
    },
    services: [
      ["网站开发", "快速、响应式的网站和落地页，用于说明、销售和转化。"],
      ["活动数字解决方案", "用于宾客照片、视频、活动图库和品牌分享的二维码上传页面。"],
      ["视频剪辑", "使用 Final Cut Pro 为品牌、创作者、活动、Reels 和演示制作干净剪辑。"],
      ["音频编辑", "播客清理、人声处理、声音修复、混音和精修交付。"],
      ["音乐制作", "原创曲目、编曲、声音识别和数字媒体制作支持。"],
      ["AI 与自动化", "为小企业和个人团队减少重复工作的实用自动化。"],
      ["AgTech 解决方案", "面向农业商务流程、田间数据、气候洞察和本地运营的数字工具。"],
    ],
    packagesSection: {
      eyebrow: "起点",
      title: "围绕真实业务需求设计的套餐。",
      intro: "选择一个聚焦的套件，再根据目标、预算和时间线调整范围。",
      badge: "最完整",
    },
    packages: [
      ["基础网站", "适合小企业", ["单页网站", "移动优先布局", "联系按钮"]],
      ["活动数字套件", "适合活动和场地", ["二维码上传页", "照片/视频流程", "可分享图库"]],
      ["社交媒体套件", "适合创作者和品牌", ["视频剪辑", "音频精修", "内容就绪素材"]],
      ["完整数字形象", "适合成长型团队", ["网站", "媒体套餐", "自动化指导"]],
      ["农业数字套件", "适合农业商务", ["AgTech 网站", "田间工具", "数据友好结构"]],
    ],
    portfolioSection: {
      eyebrow: "精选作品",
      title: "作品集占位已准备好连接真实项目链接。",
      intro: "可将每张卡片连接到网站、视频、音频演示或案例研究。",
    },
    portfolio: [
      ["AgriClimate Pro", "AgTech 平台概念", "面向农业决策的气候感知数字体验。"],
      ["Frasson Faróis", "企业网站", "以服务为核心结构的实用本地业务展示。"],
      ["活动二维码照片网站", "活动上传流程", "方便宾客上传活动媒体的二维码入口。"],
      ["视频剪辑样例", "Final Cut Pro", "适合推广、活动和创作者内容的节奏化剪辑。"],
      ["音频/音乐样例", "音频制作", "适用于人声、音乐和多媒体项目的精修声音。"],
    ],
    why: {
      eyebrow: "为什么选择我们",
      title: "兼具创意听觉与实用执行力的技术。",
      advantages: ["网站开发与创意媒体一站式服务", "真实项目经验", "移动优先设计", "面向本地企业的实用方案", "技术与创意背景"],
    },
    contact: {
      eyebrow: "开始项目",
      title: "告诉我你想构建、改进、剪辑或自动化什么。",
      intro: "从简单落地页到活动媒体流程或农业数字工具，Mediatrix Tech 将想法转化为有用的在线体验。",
      optionsLabel: "联系方式",
      whatsappUs: "美国 WhatsApp",
      whatsappBrazil: "巴西 WhatsApp",
    },
  },
  hi: {
    quoteMessage: "नमस्ते Mediatrix Tech, मैं एक डिजिटल प्रोजेक्ट के लिए कोटेशन लेना चाहता/चाहती हूं।",
    nav: ["सेवाएं", "पैकेज", "पोर्टफोलियो", "संपर्क"],
    hero: {
      eyebrow: "आधुनिक स्थानीय व्यवसायों के लिए डिजिटल सेवाएं",
      tagline: "विचारों, मीडिया और तकनीक को जोड़ना।",
      subtitle: "व्यवसायों, इवेंट्स, क्रिएटर्स और एग्रीबिजनेस के लिए वेबसाइट, मीडिया और डिजिटल समाधान।",
      quote: "कोटेशन मांगें",
      services: "सेवाएं देखें",
      proof: [["वेब", "डेवलपमेंट"], ["मीडिया", "वीडियो, ऑडियो, संगीत"], ["AI", "उपयोगी ऑटोमेशन"]],
    },
    servicesSection: {
      eyebrow: "हम क्या बनाते हैं",
      title: "डिजिटल सेवाएं जो व्यावहारिकता और रचनात्मकता को जोड़ती हैं।",
      intro: "वेब, मीडिया, ऑटोमेशन और AgTech सपोर्ट का लचीला मिश्रण, उन टीमों के लिए जिन्हें बिना अनावश्यक जटिलता के उपयोगी डिजिटल काम चाहिए।",
    },
    services: [
      ["वेब डेवलपमेंट", "तेज, रिस्पॉन्सिव वेबसाइट और लैंडिंग पेज जो समझाने, बेचने और कन्वर्ट करने के लिए बनाए जाते हैं।"],
      ["इवेंट डिजिटल समाधान", "मेहमानों की फोटो, वीडियो, इवेंट गैलरी और ब्रांडेड शेयरिंग के लिए QR Code अपलोड पेज।"],
      ["वीडियो एडिटिंग", "ब्रांड, क्रिएटर्स, इवेंट्स, reels और प्रस्तुतियों के लिए साफ Final Cut Pro एडिट्स।"],
      ["ऑडियो एडिटिंग", "पॉडकास्ट क्लीनअप, वॉइस प्रोसेसिंग, साउंड रिपेयर, मिक्सिंग और पॉलिश्ड डिलीवरी।"],
      ["म्यूजिक प्रोडक्शन", "डिजिटल मीडिया के लिए ओरिजिनल ट्रैक्स, अरेंजमेंट, साउंड आइडेंटिटी और प्रोडक्शन सपोर्ट।"],
      ["AI और ऑटोमेशन", "छोटे व्यवसायों और solo teams के repetitive काम को कम करने वाले व्यावहारिक ऑटोमेशन।"],
      ["AgTech समाधान", "एग्रीबिजनेस workflows, field data, climate insights और local operations के लिए डिजिटल टूल्स।"],
    ],
    packagesSection: {
      eyebrow: "शुरुआती विकल्प",
      title: "वास्तविक व्यवसायिक जरूरतों के अनुसार बनाए गए पैकेज।",
      intro: "एक focused kit चुनें, फिर अपने goals, budget और timeline के अनुसार scope बदलें।",
      badge: "सबसे पूरा",
    },
    packages: [
      ["बेसिक वेबसाइट", "छोटे व्यवसायों के लिए", ["One-page website", "Mobile-first layout", "Contact buttons"]],
      ["इवेंट डिजिटल किट", "इवेंट्स और venues के लिए", ["QR upload page", "Photo/video flow", "Share-ready gallery"]],
      ["सोशल मीडिया किट", "क्रिएटर्स और brands के लिए", ["Video edits", "Audio polish", "Content-ready assets"]],
      ["Complete Digital Presence", "बढ़ती teams के लिए", ["Website", "Media package", "Automation guidance"]],
      ["Agro Digital Kit", "एग्रीबिजनेस के लिए", ["AgTech website", "Field-focused tools", "Data-friendly structure"]],
    ],
    portfolioSection: {
      eyebrow: "चुना हुआ काम",
      title: "आपके real project links के लिए तैयार portfolio placeholders.",
      intro: "हर card को live website, video, audio demo या case study से जोड़ें।",
    },
    portfolio: [
      ["AgriClimate Pro", "AgTech platform concept", "कृषि निर्णयों के लिए climate-aware digital experience."],
      ["Frasson Faróis", "Business website", "Service-first structure के साथ practical local business presence."],
      ["Event QR Code Photo Website", "Event upload flow", "Event media इकट्ठा करने के लिए guest-friendly QR destination."],
      ["Video Editing Sample", "Final Cut Pro", "Promotional, event और creator content के लिए rhythmic edits."],
      ["Audio/Music Sample", "Audio production", "Voice, music और multimedia projects के लिए polished sound."],
    ],
    why: {
      eyebrow: "हमें क्यों चुनें",
      title: "रचनात्मक कान और व्यावहारिक हाथ वाली तकनीक।",
      advantages: ["Web development + creative media एक जगह", "Real projects का अनुभव", "Mobile-first design", "Local businesses के लिए practical solutions", "Technical और creative background"],
    },
    contact: {
      eyebrow: "प्रोजेक्ट शुरू करें",
      title: "बताएं कि आप क्या बनाना, सुधारना, edit करना या automate करना चाहते हैं।",
      intro: "Simple landing page से लेकर event media flows या agribusiness digital tools तक, Mediatrix Tech विचार को उपयोगी online experience में बदलता है।",
      optionsLabel: "Contact options",
      whatsappUs: "WhatsApp US",
      whatsappBrazil: "WhatsApp Brazil",
    },
  },
  ar: {
    quoteMessage: "مرحباً Mediatrix Tech، أود طلب عرض سعر لمشروع رقمي.",
    nav: ["الخدمات", "الباقات", "الأعمال", "تواصل"],
    hero: {
      eyebrow: "خدمات رقمية للأعمال المحلية الحديثة",
      tagline: "نصل الأفكار والإعلام والتقنية.",
      subtitle: "مواقع ويب، وميديا، وحلول رقمية للشركات والفعاليات وصناع المحتوى والأعمال الزراعية.",
      quote: "اطلب عرض سعر",
      services: "عرض الخدمات",
      proof: [["ويب", "تطوير"], ["ميديا", "فيديو، صوت، موسيقى"], ["ذكاء اصطناعي", "أتمتة مفيدة"]],
    },
    servicesSection: {
      eyebrow: "ما نبنيه",
      title: "خدمات رقمية تجمع بين العملي والإبداعي.",
      intro: "مزيج مرن من الويب والميديا والأتمتة و AgTech للفرق التي تحتاج عملاً رقمياً مفيداً دون تعقيد غير ضروري.",
    },
    services: [
      ["تطوير الويب", "مواقع وصفحات هبوط سريعة ومتجاوبة لشرح الخدمات والبيع وزيادة التحويل."],
      ["حلول رقمية للفعاليات", "صفحات رفع عبر QR Code لصور وفيديوهات الضيوف ومعارض الفعاليات والمشاركة بعلامتك."],
      ["مونتاج الفيديو", "تعديلات نظيفة على Final Cut Pro للعلامات وصناع المحتوى والفعاليات و reels والعروض."],
      ["تحرير الصوت", "تنظيف البودكاست، معالجة الصوت، إصلاح المشاكل الصوتية، المزج، وتسليم مصقول."],
      ["إنتاج موسيقي", "مقاطع أصلية، توزيعات، هوية صوتية، ودعم إنتاج للميديا الرقمية."],
      ["الذكاء الاصطناعي والأتمتة", "أتمتة عملية تقلل العمل المتكرر للشركات الصغيرة والفرق الفردية."],
      ["حلول AgTech", "أدوات رقمية لسير عمل الأعمال الزراعية وبيانات الحقول والرؤى المناخية والعمليات المحلية."],
    ],
    packagesSection: {
      eyebrow: "نقاط بداية",
      title: "باقات مصممة حول احتياجات أعمال حقيقية.",
      intro: "اختر حزمة مركزة ثم عدل النطاق حسب أهدافك وميزانيتك وجدولك.",
      badge: "الأكثر اكتمالاً",
    },
    packages: [
      ["موقع أساسي", "للشركات الصغيرة", ["موقع من صفحة واحدة", "تصميم للجوال أولاً", "أزرار تواصل"]],
      ["حزمة فعاليات رقمية", "للفعاليات والأماكن", ["صفحة رفع QR", "تدفق صور/فيديو", "معرض جاهز للمشاركة"]],
      ["حزمة سوشيال ميديا", "لصناع المحتوى والعلامات", ["تعديلات فيديو", "تحسين صوت", "مواد جاهزة للنشر"]],
      ["حضور رقمي كامل", "للفرق النامية", ["موقع ويب", "حزمة ميديا", "إرشاد للأتمتة"]],
      ["حزمة Agro رقمية", "للأعمال الزراعية", ["موقع AgTech", "أدوات ميدانية", "هيكل مناسب للبيانات"]],
    ],
    portfolioSection: {
      eyebrow: "أعمال مختارة",
      title: "مساحات أعمال جاهزة لروابط مشاريعك الحقيقية.",
      intro: "اربط كل بطاقة بموقع مباشر أو فيديو أو عرض صوتي أو دراسة حالة.",
    },
    portfolio: [
      ["AgriClimate Pro", "تصور لمنصة AgTech", "تجربة رقمية واعية بالمناخ لقرارات زراعية."],
      ["Frasson Faróis", "موقع أعمال", "حضور محلي عملي بهيكل يركز على الخدمات."],
      ["موقع صور فعاليات عبر QR", "تدفق رفع للفعاليات", "وجهة QR سهلة للضيوف لجمع ميديا الفعالية."],
      ["عينة مونتاج فيديو", "Final Cut Pro", "تعديلات إيقاعية للمحتوى الترويجي والفعاليات وصناع المحتوى."],
      ["عينة صوت/موسيقى", "إنتاج صوتي", "صوت مصقول للصوت البشري والموسيقى والمشاريع متعددة الوسائط."],
    ],
    why: {
      eyebrow: "لماذا تختارنا",
      title: "تقنية بأذن إبداعية ويد عملية.",
      advantages: ["تطوير ويب وميديا إبداعية في مكان واحد", "خبرة بمشاريع حقيقية", "تصميم للجوال أولاً", "حلول عملية للشركات المحلية", "خلفية تقنية وإبداعية"],
    },
    contact: {
      eyebrow: "ابدأ مشروعاً",
      title: "أخبرني بما تريد بناءه أو تحسينه أو تحريره أو أتمتته.",
      intro: "من صفحة هبوط بسيطة إلى تدفقات ميديا للفعاليات أو أدوات رقمية زراعية، تساعد Mediatrix Tech على تحويل الفكرة إلى تجربة مفيدة على الإنترنت.",
      optionsLabel: "خيارات التواصل",
      whatsappUs: "واتساب الولايات المتحدة",
      whatsappBrazil: "واتساب البرازيل",
    },
  },
  bn: {
    quoteMessage: "হ্যালো Mediatrix Tech, আমি একটি ডিজিটাল প্রকল্পের জন্য কোটেশন চাই।",
    nav: ["সেবা", "প্যাকেজ", "পোর্টফোলিও", "যোগাযোগ"],
    hero: {
      eyebrow: "আধুনিক স্থানীয় ব্যবসার জন্য ডিজিটাল সেবা",
      tagline: "আইডিয়া, মিডিয়া ও প্রযুক্তিকে সংযুক্ত করা।",
      subtitle: "ব্যবসা, ইভেন্ট, ক্রিয়েটর এবং কৃষি ব্যবসার জন্য ওয়েবসাইট, মিডিয়া ও ডিজিটাল সমাধান।",
      quote: "কোটেশন চান",
      services: "সেবা দেখুন",
      proof: [["ওয়েব", "ডেভেলপমেন্ট"], ["মিডিয়া", "ভিডিও, অডিও, মিউজিক"], ["AI", "উপযোগী অটোমেশন"]],
    },
    servicesSection: {
      eyebrow: "আমরা যা তৈরি করি",
      title: "ডিজিটাল সেবা যা ব্যবহারিকতা ও সৃজনশীলতাকে যুক্ত করে।",
      intro: "ওয়েব, মিডিয়া, অটোমেশন এবং AgTech সহায়তার নমনীয় মিশ্রণ, যেসব টিম অপ্রয়োজনীয় জটিলতা ছাড়া কার্যকর ডিজিটাল কাজ চায় তাদের জন্য।",
    },
    services: [
      ["ওয়েব ডেভেলপমেন্ট", "দ্রুত, রেসপনসিভ ওয়েবসাইট ও ল্যান্ডিং পেজ যা ব্যাখ্যা, বিক্রি এবং কনভার্ট করার জন্য তৈরি।"],
      ["ইভেন্ট ডিজিটাল সমাধান", "অতিথির ছবি, ভিডিও, ইভেন্ট গ্যালারি এবং ব্র্যান্ডেড শেয়ারিংয়ের জন্য QR Code আপলোড পেজ।"],
      ["ভিডিও এডিটিং", "ব্র্যান্ড, ক্রিয়েটর, ইভেন্ট, reels এবং প্রেজেন্টেশনের জন্য পরিষ্কার Final Cut Pro এডিট।"],
      ["অডিও এডিটিং", "পডকাস্ট ক্লিনআপ, ভয়েস প্রসেসিং, সাউন্ড রিপেয়ার, মিক্সিং এবং polished delivery।"],
      ["মিউজিক প্রোডাকশন", "ডিজিটাল মিডিয়ার জন্য original tracks, arrangements, sound identity এবং production support।"],
      ["AI ও অটোমেশন", "ছোট ব্যবসা এবং solo teams-এর repetitive কাজ কমানোর practical automation।"],
      ["AgTech সমাধান", "কৃষি ব্যবসার workflow, field data, climate insights এবং local operations-এর জন্য digital tools।"],
    ],
    packagesSection: {
      eyebrow: "শুরুর জায়গা",
      title: "বাস্তব ব্যবসায়িক চাহিদা ঘিরে তৈরি প্যাকেজ।",
      intro: "একটি focused kit বেছে নিন, তারপর goal, budget এবং timeline অনুযায়ী scope বদলান।",
      badge: "সবচেয়ে সম্পূর্ণ",
    },
    packages: [
      ["বেসিক ওয়েবসাইট", "ছোট ব্যবসার জন্য", ["One-page website", "Mobile-first layout", "Contact buttons"]],
      ["ইভেন্ট ডিজিটাল কিট", "ইভেন্ট ও venue-এর জন্য", ["QR upload page", "Photo/video flow", "Share-ready gallery"]],
      ["সোশ্যাল মিডিয়া কিট", "ক্রিয়েটর ও ব্র্যান্ডের জন্য", ["Video edits", "Audio polish", "Content-ready assets"]],
      ["Complete Digital Presence", "বর্ধনশীল টিমের জন্য", ["Website", "Media package", "Automation guidance"]],
      ["Agro Digital Kit", "কৃষি ব্যবসার জন্য", ["AgTech website", "Field-focused tools", "Data-friendly structure"]],
    ],
    portfolioSection: {
      eyebrow: "নির্বাচিত কাজ",
      title: "আপনার real project links-এর জন্য প্রস্তুত portfolio placeholders.",
      intro: "প্রতিটি card-কে live website, video, audio demo বা case study-এর সাথে যুক্ত করুন।",
    },
    portfolio: [
      ["AgriClimate Pro", "AgTech platform concept", "কৃষি সিদ্ধান্তের জন্য climate-aware digital experience."],
      ["Frasson Faróis", "Business website", "Service-first structure সহ practical local business presence."],
      ["Event QR Code Photo Website", "Event upload flow", "অতিথিদের event media সংগ্রহের জন্য সহজ QR destination."],
      ["Video Editing Sample", "Final Cut Pro", "Promotional, event ও creator content-এর জন্য rhythmic edits."],
      ["Audio/Music Sample", "Audio production", "Voice, music ও multimedia projects-এর জন্য polished sound."],
    ],
    why: {
      eyebrow: "কেন আমাদের বেছে নেবেন",
      title: "সৃজনশীল কান ও ব্যবহারিক হাতে প্রযুক্তি।",
      advantages: ["Web development + creative media এক জায়গায়", "Real projects-এর অভিজ্ঞতা", "Mobile-first design", "Local businesses-এর জন্য practical solutions", "Technical ও creative background"],
    },
    contact: {
      eyebrow: "প্রকল্প শুরু করুন",
      title: "আপনি কী build, improve, edit বা automate করতে চান বলুন।",
      intro: "Simple landing page থেকে event media flows বা agribusiness digital tools পর্যন্ত, Mediatrix Tech আইডিয়াকে useful online experience-এ রূপ দেয়।",
      optionsLabel: "Contact options",
      whatsappUs: "WhatsApp US",
      whatsappBrazil: "WhatsApp Brazil",
    },
  },
  ru: {
    quoteMessage: "Здравствуйте, Mediatrix Tech. Я хотел(а) бы запросить смету для цифрового проекта.",
    nav: ["Услуги", "Пакеты", "Портфолио", "Контакты"],
    hero: {
      eyebrow: "Цифровые услуги для современных локальных бизнесов",
      tagline: "Соединяем идеи, медиа и технологии.",
      subtitle: "Сайты, медиа и цифровые решения для бизнеса, мероприятий, авторов и агробизнеса.",
      quote: "Запросить смету",
      services: "Посмотреть услуги",
      proof: [["Веб", "Разработка"], ["Медиа", "Видео, аудио, музыка"], ["AI", "Полезная автоматизация"]],
    },
    servicesSection: {
      eyebrow: "Что мы создаем",
      title: "Цифровые услуги на стыке практичности и креатива.",
      intro: "Гибкое сочетание веба, медиа, автоматизации и AgTech для команд, которым нужна полезная цифровая работа без лишней сложности.",
    },
    services: [
      ["Веб-разработка", "Быстрые адаптивные сайты и лендинги, созданные объяснять, продавать и конвертировать."],
      ["Цифровые решения для мероприятий", "Страницы загрузки по QR Code для фото, видео, галерей мероприятий и брендированного обмена."],
      ["Видеомонтаж", "Чистый монтаж в Final Cut Pro для брендов, авторов, мероприятий, reels и презентаций."],
      ["Аудиомонтаж", "Очистка подкастов, обработка голоса, восстановление звука, миксинг и polished delivery."],
      ["Музыкальное производство", "Оригинальные треки, аранжировки, звуковая идентичность и продакшн-поддержка для цифровых медиа."],
      ["AI и автоматизация", "Практичная автоматизация, которая сокращает повторяющуюся работу для малого бизнеса и solo teams."],
      ["AgTech-решения", "Цифровые инструменты для агробизнес-процессов, полевых данных, климатических инсайтов и локальных операций."],
    ],
    packagesSection: {
      eyebrow: "Точки старта",
      title: "Пакеты под реальные бизнес-потребности.",
      intro: "Выберите сфокусированный набор, а затем адаптируйте объем под цели, бюджет и сроки.",
      badge: "Самый полный",
    },
    packages: [
      ["Базовый сайт", "Для малого бизнеса", ["Одностраничный сайт", "Mobile-first layout", "Кнопки контакта"]],
      ["Цифровой набор для мероприятий", "Для мероприятий и площадок", ["QR upload page", "Фото/видео поток", "Галерея для публикации"]],
      ["Набор для соцсетей", "Для авторов и брендов", ["Видео edits", "Аудио polish", "Готовые content assets"]],
      ["Полное цифровое присутствие", "Для растущих команд", ["Сайт", "Медиа-пакет", "Советы по автоматизации"]],
      ["Agro Digital Kit", "Для агробизнеса", ["AgTech сайт", "Полевые инструменты", "Структура для данных"]],
    ],
    portfolioSection: {
      eyebrow: "Избранные работы",
      title: "Плейсхолдеры портфолио готовы для реальных ссылок.",
      intro: "Свяжите каждую карточку с сайтом, видео, аудио-демо или кейсом.",
    },
    portfolio: [
      ["AgriClimate Pro", "Концепт AgTech платформы", "Климатически осознанный цифровой опыт для аграрных решений."],
      ["Frasson Faróis", "Бизнес-сайт", "Практичное локальное присутствие со структурой вокруг услуг."],
      ["Сайт фото по QR для мероприятий", "Поток загрузки для мероприятий", "Простая QR-точка для сбора медиа от гостей."],
      ["Пример видеомонтажа", "Final Cut Pro", "Ритмичный монтаж для промо, мероприятий и авторского контента."],
      ["Пример аудио/музыки", "Аудиопродакшн", "Полированный звук для голоса, музыки и мультимедийных проектов."],
    ],
    why: {
      eyebrow: "Почему мы",
      title: "Технологии с творческим слухом и практической рукой.",
      advantages: ["Веб-разработка + креативные медиа в одном месте", "Опыт реальных проектов", "Mobile-first дизайн", "Практичные решения для локального бизнеса", "Техническая и творческая база"],
    },
    contact: {
      eyebrow: "Начать проект",
      title: "Расскажите, что вы хотите создать, улучшить, смонтировать или автоматизировать.",
      intro: "От простого лендинга до event media flows или цифровых агроинструментов, Mediatrix Tech превращает идею в полезный онлайн-опыт.",
      optionsLabel: "Варианты связи",
      whatsappUs: "WhatsApp США",
      whatsappBrazil: "WhatsApp Бразилия",
    },
  },
  ur: {
    quoteMessage: "السلام علیکم Mediatrix Tech، میں ایک ڈیجیٹل پروجیکٹ کے لیے کوٹیشن لینا چاہتا/چاہتی ہوں۔",
    nav: ["سروسز", "پیکجز", "پورٹ فولیو", "رابطہ"],
    hero: {
      eyebrow: "جدید مقامی کاروباروں کے لیے ڈیجیٹل سروسز",
      tagline: "خیالات، میڈیا اور ٹیکنالوجی کو جوڑنا۔",
      subtitle: "کاروبار، ایونٹس، creators اور agribusiness کے لیے ویب سائٹس، میڈیا اور ڈیجیٹل حل۔",
      quote: "کوٹیشن طلب کریں",
      services: "سروسز دیکھیں",
      proof: [["ویب", "ڈویلپمنٹ"], ["میڈیا", "ویڈیو، آڈیو، موسیقی"], ["AI", "مفید آٹومیشن"]],
    },
    servicesSection: {
      eyebrow: "ہم کیا بناتے ہیں",
      title: "ڈیجیٹل سروسز جو عملی کام اور تخلیقی سوچ کو جوڑتی ہیں۔",
      intro: "ویب، میڈیا، آٹومیشن اور AgTech support کا لچکدار امتزاج، ان teams کے لیے جنہیں غیر ضروری complexity کے بغیر useful digital work چاہیے۔",
    },
    services: [
      ["ویب ڈویلپمنٹ", "تیز، responsive websites اور landing pages جو explain، sell اور convert کرنے کے لیے بنائے جاتے ہیں۔"],
      ["ایونٹ ڈیجیٹل حل", "مہمانوں کی photos، videos، event galleries اور branded sharing کے لیے QR Code upload pages۔"],
      ["ویڈیو ایڈیٹنگ", "Brands، creators، events، reels اور presentations کے لیے clean Final Cut Pro edits۔"],
      ["آڈیو ایڈیٹنگ", "Podcast cleanup، voice processing، sound repair، mixing اور polished delivery۔"],
      ["میوزک پروڈکشن", "Digital media کے لیے original tracks، arrangements، sound identity اور production support۔"],
      ["AI اور آٹومیشن", "Small businesses اور solo teams کے repetitive work کو کم کرنے والی practical automations۔"],
      ["AgTech حل", "Agribusiness workflows، field data، climate insights اور local operations کے لیے digital tools۔"],
    ],
    packagesSection: {
      eyebrow: "شروع کرنے کے پوائنٹس",
      title: "حقیقی business needs کے مطابق بنے پیکجز۔",
      intro: "Focused kit منتخب کریں، پھر goals، budget اور timeline کے مطابق scope adjust کریں۔",
      badge: "سب سے مکمل",
    },
    packages: [
      ["Basic Website", "Small businesses کے لیے", ["One-page website", "Mobile-first layout", "Contact buttons"]],
      ["Event Digital Kit", "Events اور venues کے لیے", ["QR upload page", "Photo/video flow", "Share-ready gallery"]],
      ["Social Media Kit", "Creators اور brands کے لیے", ["Video edits", "Audio polish", "Content-ready assets"]],
      ["Complete Digital Presence", "Growing teams کے لیے", ["Website", "Media package", "Automation guidance"]],
      ["Agro Digital Kit", "Agribusiness کے لیے", ["AgTech website", "Field-focused tools", "Data-friendly structure"]],
    ],
    portfolioSection: {
      eyebrow: "منتخب کام",
      title: "آپ کے real project links کے لیے portfolio placeholders تیار ہیں۔",
      intro: "ہر card کو live website، video، audio demo یا case study سے connect کریں۔",
    },
    portfolio: [
      ["AgriClimate Pro", "AgTech platform concept", "Agricultural decisions کے لیے climate-aware digital experience۔"],
      ["Frasson Faróis", "Business website", "Service-first structure کے ساتھ practical local business presence۔"],
      ["Event QR Code Photo Website", "Event upload flow", "Guests سے event media collect کرنے کے لیے آسان QR destination۔"],
      ["Video Editing Sample", "Final Cut Pro", "Promotional، event اور creator content کے لیے rhythmic edits۔"],
      ["Audio/Music Sample", "Audio production", "Voice، music اور multimedia projects کے لیے polished sound۔"],
    ],
    why: {
      eyebrow: "ہمیں کیوں منتخب کریں",
      title: "تخلیقی سماعت اور عملی ہاتھ والی ٹیکنالوجی۔",
      advantages: ["Web development + creative media ایک جگہ", "Real projects کا تجربہ", "Mobile-first design", "Local businesses کے لیے practical solutions", "Technical اور creative background"],
    },
    contact: {
      eyebrow: "پروجیکٹ شروع کریں",
      title: "بتائیں آپ کیا build، improve، edit یا automate کرنا چاہتے ہیں۔",
      intro: "Simple landing page سے event media flows یا agribusiness digital tools تک، Mediatrix Tech idea کو useful online experience میں بدلتا ہے۔",
      optionsLabel: "Contact options",
      whatsappUs: "WhatsApp US",
      whatsappBrazil: "WhatsApp Brazil",
    },
  },
  id: {
    quoteMessage: "Halo Mediatrix Tech, saya ingin meminta penawaran untuk proyek digital.",
    nav: ["Layanan", "Paket", "Portofolio", "Kontak"],
    hero: {
      eyebrow: "Layanan digital untuk bisnis lokal modern",
      tagline: "Menghubungkan ide, media, dan teknologi.",
      subtitle: "Website, media, dan solusi digital untuk bisnis, acara, kreator, dan agribisnis.",
      quote: "Minta penawaran",
      services: "Lihat layanan",
      proof: [["Web", "Pengembangan"], ["Media", "Video, audio, musik"], ["AI", "Automasi yang berguna"]],
    },
    servicesSection: {
      eyebrow: "Yang kami bangun",
      title: "Layanan digital yang menghubungkan sisi praktis dan kreatif.",
      intro: "Kombinasi fleksibel antara web, media, automasi, dan dukungan AgTech untuk tim yang membutuhkan kerja digital berguna tanpa kerumitan berlebihan.",
    },
    services: [
      ["Pengembangan Web", "Website dan landing page cepat serta responsif untuk menjelaskan, menjual, dan mengonversi."],
      ["Solusi Digital Acara", "Halaman unggah QR Code untuk foto, video, galeri acara, dan berbagi dengan branding."],
      ["Editing Video", "Edit Final Cut Pro yang bersih untuk brand, kreator, acara, reels, dan presentasi."],
      ["Editing Audio", "Pembersihan podcast, pemrosesan suara, perbaikan audio, mixing, dan hasil akhir yang rapi."],
      ["Produksi Musik", "Track orisinal, aransemen, identitas suara, dan dukungan produksi untuk media digital."],
      ["AI & Automasi", "Automasi praktis yang mengurangi pekerjaan berulang untuk bisnis kecil dan tim mandiri."],
      ["Solusi AgTech", "Alat digital untuk workflow agribisnis, data lapangan, insight iklim, dan operasi lokal."],
    ],
    packagesSection: {
      eyebrow: "Titik awal",
      title: "Paket yang dibentuk untuk kebutuhan bisnis nyata.",
      intro: "Pilih kit yang fokus, lalu sesuaikan scope dengan tujuan, anggaran, dan timeline Anda.",
      badge: "Paling lengkap",
    },
    packages: [
      ["Website Dasar", "Untuk bisnis kecil", ["Website satu halaman", "Layout mobile-first", "Tombol kontak"]],
      ["Kit Digital Acara", "Untuk acara dan venue", ["Halaman unggah QR", "Alur foto/video", "Galeri siap dibagikan"]],
      ["Kit Media Sosial", "Untuk kreator dan brand", ["Edit video", "Audio rapi", "Aset siap konten"]],
      ["Kehadiran Digital Lengkap", "Untuk tim yang berkembang", ["Website", "Paket media", "Panduan automasi"]],
      ["Kit Agro Digital", "Untuk agribisnis", ["Website AgTech", "Alat fokus lapangan", "Struktur ramah data"]],
    ],
    portfolioSection: {
      eyebrow: "Karya pilihan",
      title: "Placeholder portofolio siap untuk link proyek asli Anda.",
      intro: "Hubungkan setiap kartu ke website live, video, demo audio, atau studi kasus.",
    },
    portfolio: [
      ["AgriClimate Pro", "Konsep platform AgTech", "Pengalaman digital berbasis iklim untuk keputusan pertanian."],
      ["Frasson Faróis", "Website bisnis", "Kehadiran lokal praktis dengan struktur yang mengutamakan layanan."],
      ["Website Foto QR Code Acara", "Alur unggah acara", "Tujuan QR yang ramah tamu untuk mengumpulkan media acara."],
      ["Contoh Editing Video", "Final Cut Pro", "Edit ritmis untuk promosi, acara, dan konten kreator."],
      ["Contoh Audio/Musik", "Produksi audio", "Suara rapi untuk voice, musik, dan proyek multimedia."],
    ],
    why: {
      eyebrow: "Mengapa memilih kami",
      title: "Teknologi dengan telinga kreatif dan tangan praktis.",
      advantages: ["Pengembangan web + media kreatif di satu tempat", "Pengalaman dengan proyek nyata", "Desain mobile-first", "Solusi praktis untuk bisnis lokal", "Latar teknis dan kreatif"],
    },
    contact: {
      eyebrow: "Mulai proyek",
      title: "Ceritakan apa yang ingin Anda bangun, tingkatkan, edit, atau otomatisasi.",
      intro: "Dari landing page sederhana hingga alur media acara atau alat digital agribisnis, Mediatrix Tech membantu mengubah ide menjadi pengalaman online yang berguna.",
      optionsLabel: "Pilihan kontak",
      whatsappUs: "WhatsApp AS",
      whatsappBrazil: "WhatsApp Brasil",
    },
  },
  ja: {
    quoteMessage: "こんにちは Mediatrix Tech。デジタルプロジェクトの見積もりを依頼したいです。",
    nav: ["サービス", "パッケージ", "ポートフォリオ", "お問い合わせ"],
    hero: {
      eyebrow: "現代のローカルビジネス向けデジタルサービス",
      tagline: "アイデア、メディア、テクノロジーをつなぐ。",
      subtitle: "ビジネス、イベント、クリエイター、アグリビジネス向けのWebサイト、メディア、デジタルソリューション。",
      quote: "見積もりを依頼",
      services: "サービスを見る",
      proof: [["Web", "開発"], ["Media", "動画、音声、音楽"], ["AI", "役立つ自動化"]],
    },
    servicesSection: {
      eyebrow: "制作内容",
      title: "実用性と創造性をつなぐデジタルサービス。",
      intro: "Web、メディア、自動化、AgTechサポートを柔軟に組み合わせ、不要な複雑さなしで実用的なデジタル制作を提供します。",
    },
    services: [
      ["Web開発", "説明、販売、コンバージョンのための高速でレスポンシブなWebサイトとランディングページ。"],
      ["イベント向けデジタルソリューション", "ゲストの写真・動画、イベントギャラリー、ブランド共有のためのQR Codeアップロードページ。"],
      ["動画編集", "ブランド、クリエイター、イベント、reels、プレゼン向けのクリーンなFinal Cut Pro編集。"],
      ["音声編集", "ポッドキャストのクリーンアップ、ボイス処理、音声修復、ミキシング、磨き上げた納品。"],
      ["音楽制作", "デジタルメディア向けのオリジナルトラック、アレンジ、サウンドアイデンティティ、制作サポート。"],
      ["AI & 自動化", "小規模ビジネスやsolo teamsの反復作業を減らす実用的な自動化。"],
      ["AgTechソリューション", "アグリビジネスのワークフロー、フィールドデータ、気候インサイト、ローカル運用のためのデジタルツール。"],
    ],
    packagesSection: {
      eyebrow: "開始ポイント",
      title: "実際のビジネスニーズに合わせたパッケージ。",
      intro: "目的、予算、スケジュールに合わせて、集中したキットからスコープを調整できます。",
      badge: "最も充実",
    },
    packages: [
      ["基本Webサイト", "小規模ビジネス向け", ["1ページWebサイト", "モバイル優先レイアウト", "問い合わせボタン"]],
      ["イベントデジタルキット", "イベント・会場向け", ["QRアップロードページ", "写真/動画フロー", "共有用ギャラリー"]],
      ["ソーシャルメディアキット", "クリエイター・ブランド向け", ["動画編集", "音声仕上げ", "投稿用素材"]],
      ["完全なデジタルプレゼンス", "成長中のチーム向け", ["Webサイト", "メディアパッケージ", "自動化ガイド"]],
      ["Agro Digital Kit", "アグリビジネス向け", ["AgTechサイト", "現場向けツール", "データに強い構造"]],
    ],
    portfolioSection: {
      eyebrow: "選定作品",
      title: "実際のプロジェクトリンクに接続できるポートフォリオ枠。",
      intro: "各カードをWebサイト、動画、音声デモ、ケーススタディに接続できます。",
    },
    portfolio: [
      ["AgriClimate Pro", "AgTechプラットフォームコンセプト", "農業判断のための気候対応デジタル体験。"],
      ["Frasson Faróis", "ビジネスWebサイト", "サービス中心の構成による実用的なローカルビジネスプレゼンス。"],
      ["イベントQRコード写真サイト", "イベントアップロードフロー", "ゲストがイベントメディアを集めやすいQR導線。"],
      ["動画編集サンプル", "Final Cut Pro", "プロモーション、イベント、クリエイターコンテンツ向けのリズミカルな編集。"],
      ["音声/音楽サンプル", "音声制作", "声、音楽、マルチメディアプロジェクトのための磨かれたサウンド。"],
    ],
    why: {
      eyebrow: "選ばれる理由",
      title: "創造的な耳と実用的な手を持つテクノロジー。",
      advantages: ["Web開発とクリエイティブメディアを一箇所で", "実案件の経験", "モバイル優先デザイン", "ローカルビジネス向けの実用的な解決策", "技術と創造性の背景"],
    },
    contact: {
      eyebrow: "プロジェクト開始",
      title: "作りたいもの、改善したいもの、編集したいもの、自動化したいものを教えてください。",
      intro: "シンプルなランディングページからイベントメディアフロー、アグリビジネス向けデジタルツールまで、Mediatrix Techがアイデアを役立つオンライン体験にします。",
      optionsLabel: "連絡方法",
      whatsappUs: "WhatsApp 米国",
      whatsappBrazil: "WhatsApp ブラジル",
    },
  },
  sw: {
    quoteMessage: "Habari Mediatrix Tech, ningependa kuomba bei ya mradi wa kidijitali.",
    nav: ["Huduma", "Vifurushi", "Portfolio", "Mawasiliano"],
    hero: {
      eyebrow: "Huduma za kidijitali kwa biashara za kisasa za karibu",
      tagline: "Kuunganisha mawazo, media, na teknolojia.",
      subtitle: "Tovuti, media, na suluhisho za kidijitali kwa biashara, matukio, creators, na agribusiness.",
      quote: "Omba bei",
      services: "Tazama huduma",
      proof: [["Web", "Development"], ["Media", "Video, sauti, muziki"], ["AI", "Automation yenye manufaa"]],
    },
    servicesSection: {
      eyebrow: "Tunachojenga",
      title: "Huduma za kidijitali zinazounganisha vitendo na ubunifu.",
      intro: "Mchanganyiko rahisi wa web, media, automation, na msaada wa AgTech kwa timu zinazohitaji kazi ya kidijitali yenye manufaa bila ugumu usiohitajika.",
    },
    services: [
      ["Utengenezaji wa Web", "Tovuti na landing pages za haraka na responsive zilizojengwa kueleza, kuuza, na kubadilisha wateja."],
      ["Suluhisho za Kidijitali za Matukio", "Kurasa za QR Code kwa uploads za picha, video, galleries za matukio, na sharing yenye brand."],
      ["Uhariri wa Video", "Final Cut Pro edits safi kwa brands, creators, matukio, reels, na presentations."],
      ["Uhariri wa Sauti", "Podcast cleanup, voice processing, sound repair, mixing, na delivery iliyosafishwa."],
      ["Utayarishaji wa Muziki", "Original tracks, arrangements, sound identity, na production support kwa digital media."],
      ["AI & Automation", "Automation za vitendo zinazopunguza kazi zinazorudiwa kwa biashara ndogo na solo teams."],
      ["Suluhisho za AgTech", "Digital tools kwa agribusiness workflows, field data, climate insights, na local operations."],
    ],
    packagesSection: {
      eyebrow: "Mahali pa kuanzia",
      title: "Vifurushi vilivyoundwa kwa mahitaji halisi ya biashara.",
      intro: "Chagua kit iliyolenga, kisha badilisha scope kulingana na goals, budget, na timeline yako.",
      badge: "Kamili zaidi",
    },
    packages: [
      ["Basic Website", "Kwa biashara ndogo", ["One-page website", "Mobile-first layout", "Contact buttons"]],
      ["Event Digital Kit", "Kwa matukio na venues", ["QR upload page", "Photo/video flow", "Share-ready gallery"]],
      ["Social Media Kit", "Kwa creators na brands", ["Video edits", "Audio polish", "Content-ready assets"]],
      ["Complete Digital Presence", "Kwa teams zinazokua", ["Website", "Media package", "Automation guidance"]],
      ["Agro Digital Kit", "Kwa agribusiness", ["AgTech website", "Field-focused tools", "Data-friendly structure"]],
    ],
    portfolioSection: {
      eyebrow: "Kazi zilizochaguliwa",
      title: "Portfolio placeholders tayari kwa links halisi za miradi yako.",
      intro: "Unganisha kila card na live website, video, audio demo, au case study.",
    },
    portfolio: [
      ["AgriClimate Pro", "AgTech platform concept", "Climate-aware digital experience kwa maamuzi ya kilimo."],
      ["Frasson Faróis", "Business website", "Practical local business presence yenye service-first structure."],
      ["Event QR Code Photo Website", "Event upload flow", "QR destination rahisi kwa wageni kukusanya event media."],
      ["Video Editing Sample", "Final Cut Pro", "Rhythmic edits kwa promotional, event, na creator content."],
      ["Audio/Music Sample", "Audio production", "Polished sound kwa voice, music, na multimedia projects."],
    ],
    why: {
      eyebrow: "Kwa nini utuchague",
      title: "Teknolojia yenye sikio la ubunifu na mkono wa vitendo.",
      advantages: ["Web development + creative media sehemu moja", "Uzoefu na real projects", "Mobile-first design", "Practical solutions kwa local businesses", "Technical na creative background"],
    },
    contact: {
      eyebrow: "Anza mradi",
      title: "Niambie unachotaka kujenga, kuboresha, kuhariri, au ku-automate.",
      intro: "Kutoka landing page rahisi hadi event media flows au agribusiness digital tools, Mediatrix Tech hubadilisha idea kuwa useful online experience.",
      optionsLabel: "Contact options",
      whatsappUs: "WhatsApp US",
      whatsappBrazil: "WhatsApp Brazil",
    },
  },
});

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
const rtlLocales = new Set(["ar", "ur"]);
const localeLabels = {
  en: "EN",
  "pt-BR": "PT",
  es: "ES",
  fr: "FR",
  de: "DE",
  it: "IT",
  "zh-CN": "中文",
  hi: "HI",
  ar: "AR",
  bn: "BN",
  ru: "RU",
  ur: "UR",
  id: "ID",
  ja: "JA",
  sw: "SW",
};
const localeNames = {
  en: "English",
  "pt-BR": "Português",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  "zh-CN": "中文",
  hi: "हिन्दी",
  ar: "العربية",
  bn: "বাংলা",
  ru: "Русский",
  ur: "اردو",
  id: "Bahasa Indonesia",
  ja: "日本語",
  sw: "Kiswahili",
};
const portfolioDemoVideos = {
  0: "/agriclimate-pro-demo.mp4",
  2: "/event-qr-code-demo.mp4",
};
const portfolioDemoImages = {
  1: "/frasson-farois-demo.jpg",
  3: "/video-editing-demo.png",
};
const portfolioDemoAudio = {
  4: "/all-alone-edit.mp3",
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
  email: "mailto:mediatrixtech@proton.me",
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
      demoAudio: portfolioDemoAudio[index] || null,
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
    document.documentElement.dir = rtlLocales.has(currentLocale) ? "rtl" : "ltr";
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
  const changeLanguage = (locale, event) => {
    setCurrentLocale(locale);
    event.currentTarget.closest("details")?.removeAttribute("open");
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
        <details className="language-menu">
          <summary aria-label={`Change language. Current language: ${localeNames[currentLocale]}.`}>
            <Globe size={17} aria-hidden="true" />
            <span>{localeLabels[currentLocale]}</span>
          </summary>
          <div className="language-options" role="listbox" aria-label="Language options">
            {supportedLocales.map((locale) => (
              <button
                className={locale === currentLocale ? "active" : ""}
                key={locale}
                type="button"
                onClick={(event) => changeLanguage(locale, event)}
                role="option"
                aria-selected={locale === currentLocale}
              >
                <span>{localeLabels[locale]}</span>
                {localeNames[locale]}
              </button>
            ))}
          </div>
        </details>
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
        poster="/hero-background.jpg"
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
            {project.demoAudio && (
              <audio
                className="portfolio-audio"
                controls
                preload="metadata"
                aria-label={`${project.title} audio sample`}
              >
                <source src={project.demoAudio} type="audio/mpeg" />
              </audio>
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
