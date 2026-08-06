export function initForm() {

    const form = document.getElementById("contactForm") as HTMLFormElement | null;

    const success = document.getElementById("formSuccess");

    if (!form) return;

    form.addEventListener("submit", e => {

        e.preventDefault();

        success?.classList.remove("hidden");

        form.reset();

        setTimeout(() => {

            success?.classList.add("hidden");

        },6000);

    });

}