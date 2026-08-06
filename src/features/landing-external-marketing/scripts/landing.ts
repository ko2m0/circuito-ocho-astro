import { initHeader } from "@/features/landing-external-marketing/scripts/header";
import { initReveal } from "@/features/landing-external-marketing/scripts/reveal";
import { initAccordion } from "@/features/landing-external-marketing/scripts/faqaccordion";
import { initSmoothScroll } from "@/features/landing-external-marketing/scripts/smooth-scroll";
import { initForm } from "@/features/landing-external-marketing/scripts/form";

function init() {
  initHeader();
  initReveal();
  initAccordion();
  initSmoothScroll();
  initForm();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

document.addEventListener("astro:page-load", init);