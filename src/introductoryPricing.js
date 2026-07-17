export const brazilWebsiteCarePlans = [
  {
    id: "basic",
    name: "Basic Website Care",
    price: 59,
    included: ["Website uptime monitoring", "Security and dependency updates", "Basic backups", "Technical support by email or WhatsApp", "Up to 15 minutes of minor content changes per month"],
  },
  {
    id: "standard",
    name: "Standard Website Care",
    price: 99,
    included: ["Everything in the Basic plan", "Up to 45 minutes of minor content changes per month", "Monthly form and link testing", "Basic performance monitoring", "Priority support"],
  },
  {
    id: "advanced",
    name: "Advanced Website Care",
    price: 149,
    included: ["Everything in the Standard plan", "Up to 90 minutes of minor content changes per month", "Monthly analytics summary", "Faster support priority", "Basic SEO and performance checks"],
  },
];

export const brazilWebsiteCareTerms = [
  "Unused editing time does not accumulate.",
  "New pages, redesigns and new functionality are charged separately.",
  "Domain renewal, paid plugins, external services and premium hosting are not included unless explicitly stated.",
  "Maintenance does not include unlimited changes.",
  "Emergency work outside the plan may be quoted separately.",
];

export const introductoryPricing = {
  launchOfferEnabled: true,
  launchOfferLabel: "International Launch Pricing",
  launchOfferDescription: "Limited introductory rates for Mediatrix Tech’s first international clients.",
  positioning: "Launch pricing is available while Mediatrix Tech builds its international client portfolio. Prices may increase for future projects, but confirmed proposals will keep their agreed price.",
  regions: {
    brazil: { market: "Brazil", currency: "BRL", currencyCode: "BRL", currencySymbol: "R$ ", symbol: "R$ ", countryTarget: "Brazil", locale: "pt-BR", starter: 490, business: 890, custom: 1590, bilingual: 290, care: brazilWebsiteCarePlans[0].price },
    us: { currency: "USD", symbol: "$", countryTarget: "United States", locale: "en-US", starter: 249, business: 449, custom: 799, bilingual: 149, care: 29 },
    europe: { currency: "EUR", symbol: "€", countryTarget: "Europe", locale: "en-IE", starter: 229, business: 419, custom: 749, bilingual: 139, care: 27 },
    switzerland: { currency: "CHF", symbol: "CHF ", countryTarget: "Switzerland", locale: "en-CH", starter: 290, business: 520, custom: 890, bilingual: 170, care: 35 },
  },
  packages: [
    {
      id: "starter",
      name: "Starter Landing Page",
      priceKey: "starter",
      summary: "A focused one-page website for a clear, professional first impression.",
      included: ["One-page website", "Up to five content sections", "Mobile-responsive design", "Services presentation", "Contact form", "Phone, email or WhatsApp button", "Social-media links", "Google Maps when applicable", "Basic on-page SEO", "Google Analytics setup", "One revision round", "Deployment assistance"],
      note: "The client provides the final text, logo and images.",
      excluded: ["Additional pages", "Copywriting", "Logo creation", "Advanced animations", "Booking systems", "Payment systems", "Databases", "User accounts", "Dashboards", "E-commerce", "Multilingual versions", "Unlimited revisions", "Ongoing maintenance"],
    },
    {
      id: "business",
      name: "Small Business Website",
      priceKey: "business",
      summary: "A complete, credible website for an established small business.",
      included: ["Up to four pages", "Home", "Services", "About", "Contact", "Mobile-responsive design", "Contact or quotation form", "Social-media integration", "Google Maps when applicable", "Basic technical SEO", "Google Analytics", "Up to two revision rounds", "Deployment assistance"],
      note: "Additional pages and advanced functionality are quoted separately.",
      excluded: [],
    },
    {
      id: "custom",
      name: "Custom Website",
      priceKey: "custom",
      summary: "For websites that need custom functionality or business workflows.",
      included: [],
      capabilities: ["Booking systems", "Payment integrations", "Photo or video uploads", "Admin panels", "User authentication", "Databases", "Dashboards", "E-commerce", "Multilingual functionality", "API integrations", "Custom business workflows"],
      note: "Final pricing depends on project scope and required functionality. Advanced features are not included in the starting price.",
      excluded: [],
    },
  ],
  optionalServices: [
    { name: "Additional page", brazil: 150, us: 75, europe: 70, switzerland: 85 },
    { name: "Additional revision round", brazil: 100, us: 50, europe: 45, switzerland: 60 },
    { name: "Bilingual version", brazil: 290, us: 149, europe: 139, switzerland: 170 },
    { name: "Copywriting", quoted: true },
    { name: "Logo design or branding", quoted: true },
    { name: "Booking integration", brazil: 300, us: 150, europe: 140, switzerland: 175 },
    { name: "Payment integration", brazil: 400, us: 200, europe: 185, switzerland: 230 },
    { name: "Advanced form", brazil: 150, us: 75, europe: 70, switzerland: 85 },
    { name: "Google Business Profile assistance", brazil: 200, us: 100, europe: 90, switzerland: 115 },
    { name: "Monthly maintenance", brazil: brazilWebsiteCarePlans[0].price, us: 29, europe: 27, switzerland: 35, suffix: "/month" },
  ],
};

export const standardPricing = {
  regions: {
    brazil: { market: "Brazil", currency: "BRL", currencyCode: "BRL", currencySymbol: "R$ ", symbol: "R$ ", countryTarget: "Brazil", locale: "pt-BR", starter: 690, business: 1290, custom: 2290, bilingual: 390, care: 79 },
    us: { currency: "USD", symbol: "$", countryTarget: "United States", locale: "en-US", starter: 349, business: 649, custom: 1099, bilingual: 199, care: 39 },
    europe: { currency: "EUR", symbol: "€", countryTarget: "Europe", locale: "en-IE", starter: 329, business: 599, custom: 999, bilingual: 189, care: 37 },
    switzerland: { currency: "CHF", symbol: "CHF ", countryTarget: "Switzerland", locale: "en-CH", starter: 410, business: 740, custom: 1240, bilingual: 230, care: 49 },
  },
};

export function getPricing(regionKey) {
  const source = introductoryPricing.launchOfferEnabled ? introductoryPricing : standardPricing;
  const region = source.regions[regionKey];
  return { ...region, market: region.market || region.countryTarget, currencyCode: region.currencyCode || region.currency, currencySymbol: region.currencySymbol || region.symbol, isLaunchOffer: introductoryPricing.launchOfferEnabled };
}

export function formatPrice(region, amount) {
  return `${region.symbol}${amount.toLocaleString(region.locale)}`;
}
