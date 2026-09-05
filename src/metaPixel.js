export const META_PIXEL_ID = "28509107345393095";

let trackingInitialized = false;

function getRoutePath() {
  if (typeof window === "undefined") return null;
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

export function trackMetaEvent(eventName, parameters) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return false;
  if (parameters) window.fbq("track", eventName, parameters);
  else window.fbq("track", eventName);
  return true;
}

export function initializeMetaPixelTracking() {
  if (typeof window === "undefined" || typeof document === "undefined" || trackingInitialized) return;
  trackingInitialized = true;

  let currentRoutePath = getRoutePath();
  const trackRouteChange = () => {
    const nextRoutePath = getRoutePath();
    if (!nextRoutePath || nextRoutePath === currentRoutePath) return;
    currentRoutePath = nextRoutePath;
    trackMetaEvent("PageView");
  };

  for (const methodName of ["pushState", "replaceState"]) {
    const originalMethod = window.history[methodName];
    window.history[methodName] = function metaPixelHistoryState(...args) {
      const result = originalMethod.apply(this, args);
      queueMicrotask(trackRouteChange);
      return result;
    };
  }

  window.addEventListener("popstate", trackRouteChange);
  document.addEventListener("click", (event) => {
    const leadTarget = event.target.closest?.('[data-meta-lead], a[href*="wa.me/"]');
    if (leadTarget) trackMetaEvent("Lead");
  });
}
