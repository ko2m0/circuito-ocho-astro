export function initAccordion() {

    const triggers = document.querySelectorAll(".accordion-trigger");

    if (!triggers.length) return;

    triggers.forEach(trigger => {

        trigger.addEventListener("click", () => {

            const item = trigger.closest(".accordion-item");

            if (!item) return;

            const active = item.classList.contains("active");

            document

                .querySelectorAll(".accordion-item")

                .forEach(el => {

                    el.classList.remove("active");

                    el

                      .querySelector(".accordion-trigger")

                      ?.setAttribute("aria-expanded","false");

                });

            if (!active) {

                item.classList.add("active");

                trigger.setAttribute("aria-expanded","true");

            }

        });

    });

}