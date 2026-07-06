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
  Leaf,
  Mail,
  Music2,
  QrCode,
  Send,
  Sparkles,
} from "lucide-react";
import "./styles.css";

// Change these links to your real phone, email, Instagram, and Upwork profile.
const contactLinks = {
  whatsapp: "https://wa.me/5500000000000",
  email: "mailto:hello@mediatrixtech.com",
  instagram: "https://instagram.com/mediatrixtech",
  upwork: "https://www.upwork.com/freelancers/~your-profile",
};

const services = [
  {
    title: "Web Development",
    description:
      "Fast, responsive websites and landing pages built to explain, sell, and convert.",
    icon: Code2,
  },
  {
    title: "Event Digital Solutions",
    description:
      "QR Code upload pages for guest photos, videos, event galleries, and branded sharing.",
    icon: QrCode,
  },
  {
    title: "Video Editing",
    description:
      "Clean Final Cut Pro edits for brands, creators, events, reels, and presentations.",
    icon: Clapperboard,
  },
  {
    title: "Audio Editing",
    description:
      "Podcast cleanup, voice processing, sound repair, mixing, and polished delivery.",
    icon: AudioLines,
  },
  {
    title: "Music Production",
    description:
      "Original tracks, arrangements, sound identity, and production support for digital media.",
    icon: Music2,
  },
  {
    title: "AI & Automation",
    description:
      "Practical automations that reduce repetitive work for small businesses and solo teams.",
    icon: Bot,
  },
  {
    title: "AgTech Solutions",
    description:
      "Digital tools for agribusiness workflows, field data, climate insights, and local operations.",
    icon: Leaf,
  },
];

const packages = [
  {
    name: "Basic Website",
    audience: "For small businesses",
    features: ["One-page website", "Mobile-first layout", "Contact buttons"],
  },
  {
    name: "Event Digital Kit",
    audience: "For events and venues",
    features: ["QR upload page", "Photo/video flow", "Share-ready gallery"],
  },
  {
    name: "Social Media Kit",
    audience: "For creators and brands",
    features: ["Video edits", "Audio polish", "Content-ready assets"],
  },
  {
    name: "Complete Digital Presence",
    audience: "For growing teams",
    features: ["Website", "Media package", "Automation guidance"],
    featured: true,
  },
  {
    name: "Agro Digital Kit",
    audience: "For agribusiness",
    features: ["AgTech website", "Field-focused tools", "Data-friendly structure"],
  },
];

const portfolio = [
  {
    title: "AgriClimate Pro",
    category: "AgTech platform concept",
    description: "Climate-aware digital experience for agricultural decisions.",
  },
  {
    title: "Frasson Faróis",
    category: "Business website",
    description: "Practical local business presence with service-first structure.",
  },
  {
    title: "Event QR Code Photo Website",
    category: "Event upload flow",
    description: "Guest-friendly QR destination for collecting event media.",
  },
  {
    title: "Video Editing Sample",
    category: "Final Cut Pro",
    description: "Rhythmic edits for promotional, event, and creator content.",
  },
  {
    title: "Audio/Music Sample",
    category: "Audio production",
    description: "Polished sound for voice, music, and multimedia projects.",
  },
];

const advantages = [
  "Web development + creative media in one place",
  "Experience with real projects",
  "Mobile-first design",
  "Practical solutions for local businesses",
  "Technical and creative background",
];

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Packages />
        <Portfolio />
        <WhyChooseUs />
        <Contact />
      </main>
    </>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand-mark" href="#top" aria-label="Mediatrix Tech home">
        <span>M</span>
        Mediatrix Tech
      </a>
      <nav aria-label="Primary navigation">
        <a href="#services">Services</a>
        <a href="#packages">Packages</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

function Hero() {
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
            Digital services for modern local businesses
          </p>
          <h1>Mediatrix Tech</h1>
          <p className="tagline">Connecting ideas, media, and technology.</p>
          <p className="subtitle">
            Websites, media, and digital solutions for businesses, events,
            creators, and agribusiness.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#contact">
              Request a quote
              <Send size={18} />
            </a>
            <a className="button secondary" href="#services">
              View services
              <ChevronRight size={18} />
            </a>
          </div>
        </div>
        <div className="hero-proof" aria-label="Mediatrix Tech service highlights">
          <div>
            <strong>Web</strong>
            <span>Sites that convert</span>
          </div>
          <div>
            <strong>Media</strong>
            <span>Video, audio, music</span>
          </div>
          <div>
            <strong>AI</strong>
            <span>Useful automation</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <Section
      id="services"
      eyebrow="What we build"
      title="Digital services that connect the practical and the creative."
      intro="A flexible mix of web, media, automation, and AgTech support for teams that need useful digital work without unnecessary complexity."
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
  return (
    <Section
      id="packages"
      eyebrow="Starting points"
      title="Packages shaped around real business needs."
      intro="Choose a focused kit, then adapt the scope around your goals, budget, and timeline."
    >
      <div className="package-grid">
        {packages.map((item) => (
          <article
            className={`package-card ${item.featured ? "featured" : ""}`}
            key={item.name}
          >
            {item.featured && <span className="badge">Most complete</span>}
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
  return (
    <Section
      id="portfolio"
      eyebrow="Selected work"
      title="Portfolio placeholders ready for your real project links."
      intro="Use these entries as a starting structure and connect each card to a live website, video, audio demo, or case study."
    >
      <div className="portfolio-grid">
        {portfolio.map((project, index) => (
          <a className="portfolio-card" href="#contact" key={project.title}>
            {/* Change this href to the real portfolio URL for this project. */}
            <span className="portfolio-number">{String(index + 1).padStart(2, "0")}</span>
            <p>{project.category}</p>
            <h3>{project.title}</h3>
            <span>{project.description}</span>
            <ExternalLink size={18} aria-hidden="true" />
          </a>
        ))}
      </div>
    </Section>
  );
}

function WhyChooseUs() {
  return (
    <section className="why-section">
      <div className="section-shell why-layout">
        <div>
          <p className="section-eyebrow">Why choose us</p>
          <h2>Technology with a creative ear and a practical hand.</h2>
        </div>
        <div className="advantage-list">
          {advantages.map((item) => (
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
  return (
    <section className="contact-section" id="contact">
      <div className="section-shell contact-layout">
        <div>
          <p className="section-eyebrow">Start a project</p>
          <h2>Tell me what you want to build, improve, edit, or automate.</h2>
          <p>
            From a simple landing page to event media flows or agribusiness
            digital tools, Mediatrix Tech helps turn the idea into a useful
            online experience.
          </p>
        </div>
        <div className="contact-actions" aria-label="Contact options">
          <a className="button primary" href={contactLinks.whatsapp}>
            WhatsApp
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
        <span>Mediatrix Tech</span>
        <span>Connecting ideas, media, and technology.</span>
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
