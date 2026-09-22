export {};

// Safely access dataLayer without conflicting with existing global.d.ts declarations
function trackEvent(eventName: string, payload: Record<string, unknown> = {}) {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({
            event: eventName,
            page_path: "/agendar-consultoria",
            ...payload,
        });
    }
}

function initReveal() {
    const reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach((el) => observer.observe(el));
}

// Page view tracking
trackEvent("consultation_page_view");

// Form handling
const form = document.getElementById("consultation-form") as HTMLFormElement | null;
const successMessage = document.getElementById("success-message");
const errorMessage = document.getElementById("error-message");
const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement | null;
const submitText = document.getElementById("submit-text");
const submitLoading = document.getElementById("submit-loading");
const retryBtn = document.getElementById("retry-btn");

let formStarted = false;

if (form) {
    form.addEventListener(
        "focusin",
        () => {
            if (!formStarted) {
                formStarted = true;
                trackEvent("consultation_form_start");
            }
        },
        { once: true }
    );

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries()) as Record<string, string>;

        if (submitBtn) submitBtn.disabled = true;
        if (submitText) submitText.classList.add("hidden");
        if (submitLoading) submitLoading.classList.remove("hidden");

        try {
            // TODO: Replace with actual form submission endpoint
            await new Promise((resolve) => setTimeout(resolve, 600));

            trackEvent("consultation_form_submit", {
                form_nombre: data.nombre,
                form_empresa: data.empresa,
                form_problema: data.problema,
            });

            form.classList.add("hidden");
            successMessage?.classList.remove("hidden");
            successMessage?.scrollIntoView({ behavior: "smooth", block: "center" });
        } catch (error) {
            console.error("Form submission error:", error);
            errorMessage?.classList.remove("hidden");
            form.classList.add("hidden");
            errorMessage?.scrollIntoView({ behavior: "smooth", block: "center" });
        } finally {
            if (submitBtn) submitBtn.disabled = false;
            if (submitText) submitText.classList.remove("hidden");
            if (submitLoading) submitLoading.classList.add("hidden");
        }
    });
}

retryBtn?.addEventListener("click", () => {
    errorMessage?.classList.add("hidden");
    form?.classList.remove("hidden");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
});

document.querySelectorAll('[data-track="whatsapp_click"]').forEach((link) => {
    link.addEventListener("click", () => {
        const location = (link as HTMLElement).dataset.location || "unknown";
        trackEvent("whatsapp_click", { location });
    });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
        const targetId = (anchor as HTMLAnchorElement).getAttribute("href");
        if (!targetId || targetId === "#") return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    });
});

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initReveal);
} else {
    initReveal();
}