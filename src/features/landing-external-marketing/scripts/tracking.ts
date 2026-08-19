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


/**
 * Initialize click-based conversion tracking.
 */
function initClickTracking() {
  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;

    if (!target) return;

    const link = target.closest("a");

    if (!link) return;

    const href = link.getAttribute("href") || "";
    const text = link.textContent?.trim() || "";

    /*
     * --------------------------------
     * WhatsApp
     * --------------------------------
     */
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

    /*
     * --------------------------------
     * Consultation CTA
     * --------------------------------
     */
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

    /*
     * --------------------------------
     * Service CTA
     * --------------------------------
     */
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

export function initTracking() {
  if (trackingInitialized) return;

  trackingInitialized = true;

  console.log("[C8 Tracking] Click tracking initialized");

  initClickTracking();
}