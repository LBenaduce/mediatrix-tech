const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid"];

export function initializeTracking() {
  window.dataLayer = window.dataLayer || [];
  const params = new URLSearchParams(window.location.search);
  attributionKeys.forEach((key) => {
    const value = params.get(key);
    if (value) window.sessionStorage.setItem(`mediatrix_${key}`, value);
  });

  const gtmId = import.meta.env.VITE_GTM_ID;
  if (gtmId && !document.querySelector(`script[data-gtm-id="${gtmId}"]`)) {
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const script = document.createElement("script");
    script.async = true;
    script.dataset.gtmId = gtmId;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    document.head.appendChild(script);
  }
}

export function getAttribution() {
  return Object.fromEntries(attributionKeys.map((key) => [key, window.sessionStorage.getItem(`mediatrix_${key}`) || ""]));
}

export function trackEvent(event, details = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...details });
}

export function trackLink(event) {
  trackEvent(event);
}
