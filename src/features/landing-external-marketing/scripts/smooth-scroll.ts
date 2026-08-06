export function initSmoothScroll() {

    document

        .querySelectorAll('a[href^="#"]')

        .forEach(anchor => {

            anchor.addEventListener("click", e => {

                const href = anchor.getAttribute("href");

                if (!href || href === "#") return;

                const target = document.querySelector(href);

                if (!target) return;

                e.preventDefault();

                window.scrollTo({

                    top:

                        target.getBoundingClientRect().top +

                        window.scrollY -

                        80,

                    behavior: "smooth"

                });

            });

        });

}