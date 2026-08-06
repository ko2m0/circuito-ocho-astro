export function initHeader() {

    const header = document.getElementById("header");

    const mobileCTA = document.getElementById("mobileCta");

    if (!header) return;

    window.addEventListener("scroll", () => {

        header.classList.toggle(

            "header-scrolled",

            window.scrollY > 40

        );

        if (mobileCTA) {

            mobileCTA.classList.toggle(

                "visible",

                window.scrollY > 500

            );

        }

    }, {

        passive:true

    });

}