import { initHeader } from "@/features/landing-external-marketing/scripts/header";
import { initReveal } from "@/features/landing-external-marketing/scripts/reveal";
import { initTracking } from "@/features/landing-external-marketing/scripts/tracking";

// Lazy-load these only when needed to reduce initial main-thread work
let accordionInitialized = false;
let formInitialized = false;

function initCritical() {
  initHeader();
  initReveal();
  initTracking();
}

function initNonCritical() {
  // Only import and run these if the user actually interacts with the page
  if (!accordionInitialized) {
    import("@/features/landing-external-marketing/scripts/faqaccordion").then((module) => {
      module.initAccordion();
      accordionInitialized = true;
    });
  }
  
  if (!formInitialized) {
    import("@/features/landing-external-marketing/scripts/form").then((module) => {
      module.initForm();
      formInitialized = true;
    });
  }
}

// 1. Run critical stuff immediately
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCritical);
} else {
  initCritical();
}

// 2. Defer non-critical stuff until the user shows intent (scrolls or interacts)
// This dramatically reduces "Total Blocking Time" and "JavaScript Execution Time" in Lighthouse
const deferNonCritical = () => {
  initNonCritical();
  window.removeEventListener("scroll", deferNonCritical);
  window.removeEventListener("touchstart", deferNonCritical);
  window.removeEventListener("mousemove", deferNonCritical);
};

window.addEventListener("scroll", deferNonCritical, { passive: true });
window.addEventListener("touchstart", deferNonCritical, { passive: true });
window.addEventListener("mousemove", deferNonCritical, { passive: true });

// 3. Astro SPA navigation support
document.addEventListener("astro:page-load", () => {
  initCritical();
  // Reset flags on page load if needed, though for a single landing page, this is less critical
});