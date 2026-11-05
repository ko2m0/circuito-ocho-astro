interface C8EventParams {
  location?: string;
  label?: string;
  href?: string;
  service?: string;
  [key: string]: string | undefined;
}

/**
 * Central C8 event dispatcher.
 *
 * All conversion events should pass through this function.
 * GTM will consume the events from window.dataLayer.
 */
export function trackEvent(
  eventName: string,
  params: C8EventParams = {}
) {
  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    event: "c8_event",
    c8_event_name: eventName,
    ...params,
  });

  console.log("[C8 Tracking]", eventName, params);
}



function initClickTracking() {
  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;

    if (!target) return;

    const link = target.closest("a");

    if (!link) return;

    const href = link.getAttribute("href") || "";
    const text = link.textContent?.trim() || "";

    // WhatsApp
    if (
      href.includes("wa.me") ||
      href.includes("whatsapp.com")
    ) {
      trackEvent("whatsapp_click", {
        location: link.dataset.location || "unknown",
        label: text,
        href,
      });

      return;
    }

    // Consultation CTA
    if (
      link.dataset.cta === "consultation" ||
      href === "#consulta"
    ) {
      trackEvent("consultation_cta_click", {
        location: link.dataset.location || "unknown",
        label: text,
      });

      return;
    }

    
 // Music Artist Path
    if (link.dataset.cta === "music_path") {
      trackEvent("music_path_click", {
        location: link.dataset.location || "unknown",
        path_type: link.dataset.pathType || "unknown",
        label: text,
      });
      return;
    }

    // Neon Pulse Case Study
    if (link.dataset.cta === "neon_pulse") {
      trackEvent("neon_pulse_click", {
        location: link.dataset.location || "unknown",
        href,
      });
      return;
    }

    // Service CTA
    if (link.dataset.cta === "service") {
      trackEvent("service_cta_click", {
        location: link.dataset.location || "unknown",
        service: link.dataset.service || "unknown",
        label: text,
        href,
      });
    }
  });



}

let trackingInitialized = false;

document.addEventListener("astro:page-load", () => {
  if (trackingInitialized) return;

  trackingInitialized = true;

  initClickTracking();
});