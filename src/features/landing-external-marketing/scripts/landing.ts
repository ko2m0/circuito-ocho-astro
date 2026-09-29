import { initHeader } from "@/features/landing-external-marketing/scripts/header";
import { initReveal } from "@/features/landing-external-marketing/scripts/reveal";
import { initTracking } from "@/features/landing-external-marketing/scripts/tracking";

function initCritical() {
  initHeader();
  initReveal();
  initTracking();
}

function initNonCritical() {
  // Dynamically import heavy features only after the page is fully interactive
  import("@/features/landing-external-marketing/scripts/faqaccordion").then((module) => {
    module.initAccordion();
  });
  
  import("@/features/landing-external-marketing/scripts/form").then((module) => {
    module.initForm();
  });
}

// 1. Run critical stuff immediately
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCritical);
} else {
  initCritical();
}

// 2. Defer non-critical stuff safely using requestIdleCallback (or setTimeout fallback)
// This ensures it NEVER blocks the initial LCP/FCP render
if ("requestIdleCallback" in window) {
  requestIdleCallback(initNonCritical);
} else {
  setTimeout(initNonCritical, 1000); // Fallback: wait 1 second after load
}

// 3. Astro SPA navigation support
document.addEventListener("astro:page-load", () => {
  initCritical();
  if ("requestIdleCallback" in window) {
    requestIdleCallback(initNonCritical);
  } else {
    setTimeout(initNonCritical, 1000);
  }
});