let homeInitialized = false;

function initHome() {
  if (homeInitialized) return;

  homeInitialized = true;

  const body = document.body;

  /*
   * ============================================================
   * MOBILE MENU
   * ============================================================
   */

  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const isOpen = mobileMenu.classList.contains("opacity-100");

      if (isOpen) {
        mobileMenu.classList.remove(
          "opacity-100",
          "pointer-events-auto"
        );

        mobileMenu.classList.add(
          "opacity-0",
          "pointer-events-none"
        );

        body.style.overflow = "";
      } else {
        mobileMenu.classList.remove(
          "opacity-0",
          "pointer-events-none"
        );

        mobileMenu.classList.add(
          "opacity-100",
          "pointer-events-auto"
        );

        body.style.overflow = "hidden";
      }
    });

    const menuLinks =
      mobileMenu.querySelectorAll<HTMLAnchorElement>(
        ".mobile-menu-link"
      );

    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove(
          "opacity-100",
          "pointer-events-auto"
        );

        mobileMenu.classList.add(
          "opacity-0",
          "pointer-events-none"
        );

        body.style.overflow = "";
      });
    });
  }


  /*
   * ============================================================
   * SCROLL TO TOP
   * ============================================================
   */

  const scrollToTopBtn =
    document.getElementById("scroll-to-top");

  if (scrollToTopBtn) {
    const updateScrollButton = () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add("visible");
      } else {
        scrollToTopBtn.classList.remove("visible");
      }
    };

    window.addEventListener(
      "scroll",
      updateScrollButton,
      { passive: true }
    );

    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    updateScrollButton();
  }


  /*
   * ============================================================
   * REVEAL ON SCROLL
   * ============================================================
   */

  const revealElements =
    document.querySelectorAll<HTMLElement>(
      ".reveal-element"
    );

  const revealOnScroll = () => {
    revealElements.forEach((element) => {
      const elementTop =
        element.getBoundingClientRect().top;

      if (
        elementTop <
        window.innerHeight - 100
      ) {
        element.classList.add("visible");
      }
    });
  };

  window.addEventListener(
    "scroll",
    revealOnScroll,
    { passive: true }
  );

  revealOnScroll();


  /*
   * ============================================================
   * PRIVACY MODAL
   * ============================================================
   */

  const privacyModal =
    document.getElementById("privacy-modal");

  const closePrivacy =
    document.getElementById("close-privacy");

  const privacyLink =
    document.querySelector<HTMLAnchorElement>(
      'a[href="#privacy"]'
    );

  if (privacyLink && privacyModal) {
    privacyLink.addEventListener("click", (event) => {
      event.preventDefault();

      privacyModal.classList.remove("hidden");

      body.style.overflow = "hidden";
    });
  }

  if (closePrivacy && privacyModal) {
    closePrivacy.addEventListener("click", () => {
      privacyModal.classList.add("hidden");

      body.style.overflow = "";
    });

    privacyModal.addEventListener("click", (event) => {
      if (event.target === privacyModal) {
        privacyModal.classList.add("hidden");

        body.style.overflow = "";
      }
    });
  }


  /*
   * ============================================================
   * TERMS MODAL
   * ============================================================
   */

  const termsModal =
    document.getElementById("terms-modal");

  const closeTerms =
    document.getElementById("close-terms");

  const termsLink =
    document.querySelector<HTMLAnchorElement>(
      'a[href="#terms"]'
    );

  if (termsLink && termsModal) {
    termsLink.addEventListener("click", (event) => {
      event.preventDefault();

      termsModal.classList.remove("hidden");

      body.style.overflow = "hidden";
    });
  }

  if (closeTerms && termsModal) {
    closeTerms.addEventListener("click", () => {
      termsModal.classList.add("hidden");

      body.style.overflow = "";
    });

    termsModal.addEventListener("click", (event) => {
      if (event.target === termsModal) {
        termsModal.classList.add("hidden");

        body.style.overflow = "";
      }
    });
  }


  /*
   * ============================================================
   * NEURAL PARTICLE CANVAS
   * ============================================================
   */

  const canvas =
    document.getElementById(
      "bg-canvas"
    ) as HTMLCanvasElement | null;

  // IMPORTANT:
  // The homepage must still work if the canvas isn't present.
  if (!canvas) {
    console.warn(
      "[C8 Home] #bg-canvas not found."
    );

    return;
  }

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    console.warn(
      "[C8 Home] Canvas 2D context unavailable."
    );

    return;
  }

  let width = 0;
  let height = 0;

  const particles: Particle[] = [];

  const mouse = {
    x: null as number | null,
    y: null as number | null,
    radius: 150,
  };

  const particleCount = 80;
  const connectionDistance = 180;
  const mouseConnectionDistance = 200;
  const particleSpeed = 0.4;


  class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    baseX: number;
    baseY: number;

    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;

      this.vx =
        (Math.random() - 0.5) *
        particleSpeed;

      this.vy =
        (Math.random() - 0.5) *
        particleSpeed;

      this.size =
        Math.random() * 2 + 1;

      this.baseX = this.x;
      this.baseY = this.y;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (
        mouse.x !== null &&
        mouse.y !== null
      ) {
        const dx =
          mouse.x - this.x;

        const dy =
          mouse.y - this.y;

        const distance =
          Math.sqrt(
            dx * dx + dy * dy
          );

        if (
          distance > 0 &&
          distance < mouse.radius
        ) {
          const force =
            (mouse.radius - distance) /
            mouse.radius;

          const directionX =
            dx / distance;

          const directionY =
            dy / distance;

          this.x +=
            directionX *
            force *
            2;

          this.y +=
            directionY *
            force *
            2;
        }
      }

      if (
        this.x < 0 ||
        this.x > width
      ) {
        this.vx *= -1;
      }

      if (
        this.y < 0 ||
        this.y > height
      ) {
        this.vy *= -1;
      }
    }

    draw() {
      ctx!.shadowBlur = 10;
      ctx!.shadowColor = "#35FC03";

      ctx!.fillStyle = "#35FC03";

      ctx!.beginPath();

      ctx!.arc(
        this.x,
        this.y,
        this.size,
        0,
        Math.PI * 2
      );

      ctx!.fill();

      ctx!.shadowBlur = 0;
    }
  }


  class CircuitNode {
    x: number;
    y: number;
    size: number;
    pulse: number;
    pulseSpeed: number;

    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;

      this.size =
        Math.random() * 3 + 2;

      this.pulse = 0;

      this.pulseSpeed =
        0.02 +
        Math.random() * 0.03;
    }

    update() {
      this.pulse += this.pulseSpeed;
    }

    draw() {
      const alpha =
        0.3 +
        Math.sin(this.pulse) *
          0.2;

      ctx!.fillStyle =
        `rgba(53, 252, 3, ${alpha})`;

      ctx!.beginPath();

      ctx!.arc(
        this.x,
        this.y,
        this.size,
        0,
        Math.PI * 2
      );

      ctx!.fill();
    }
  }


  const nodes: CircuitNode[] = [];


  /*
   * Resize canvas
   */

  function resize() {
    width =
      canvas!.width =
        document.documentElement.clientWidth;

    height =
      canvas!.height =
        window.innerHeight;

    // Recreate particles after resize
    particles.length = 0;
    nodes.length = 0;

    for (
      let i = 0;
      i < particleCount;
      i++
    ) {
      particles.push(
        new Particle()
      );
    }

    // A small number of circuit nodes
    for (let i = 0; i < 12; i++) {
      nodes.push(
        new CircuitNode()
      );
    }
  }


  /*
   * Mouse interaction
   */

  window.addEventListener(
    "mousemove",
    (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    },
    { passive: true }
  );

  window.addEventListener(
    "mouseout",
    () => {
      mouse.x = null;
      mouse.y = null;
    },
    { passive: true }
  );


  /*
   * Draw connections
   */

  function drawConnections() {
    for (
      let i = 0;
      i < particles.length;
      i++
    ) {
      for (
        let j = i + 1;
        j < particles.length;
        j++
      ) {
        const dx =
          particles[i].x -
          particles[j].x;

        const dy =
          particles[i].y -
          particles[j].y;

        const distance =
          Math.sqrt(
            dx * dx + dy * dy
          );

        if (
          distance <
          connectionDistance
        ) {
          const opacity =
            1 -
            distance /
              connectionDistance;

          ctx!.strokeStyle =
            `rgba(53, 252, 3, ${
              opacity * 0.12
            })`;

          ctx!.lineWidth = 1;

          ctx!.beginPath();

          ctx!.moveTo(
            particles[i].x,
            particles[i].y
          );

          ctx!.lineTo(
            particles[j].x,
            particles[j].y
          );

          ctx!.stroke();
        }
      }
    }


    /*
     * Mouse connections
     */

    if (
      mouse.x === null ||
      mouse.y === null
    ) {
      return;
    }

    for (const particle of particles) {
      const dx =
        mouse.x - particle.x;

      const dy =
        mouse.y - particle.y;

      const distance =
        Math.sqrt(
          dx * dx + dy * dy
        );

      if (
        distance <
        mouseConnectionDistance
      ) {
        const opacity =
          1 -
          distance /
            mouseConnectionDistance;

        ctx!.strokeStyle =
          `rgba(53, 252, 3, ${
            opacity * 0.25
          })`;

        ctx!.lineWidth = 1;

        ctx!.beginPath();

        ctx!.moveTo(
          particle.x,
          particle.y
        );

        ctx!.lineTo(
          mouse.x,
          mouse.y
        );

        ctx!.stroke();
      }
    }
  }


  /*
   * Animation loop
   */

  function animate() {
    ctx!.clearRect(
      0,
      0,
      width,
      height
    );

    particles.forEach(
      (particle) => {
        particle.update();
      }
    );

    nodes.forEach(
      (node) => {
        node.update();
      }
    );

    drawConnections();

    particles.forEach(
      (particle) => {
        particle.draw();
      }
    );

    nodes.forEach(
      (node) => {
        node.draw();
      }
    );

    requestAnimationFrame(
      animate
    );
  }


  resize();

  window.addEventListener(
    "resize",
    resize,
    { passive: true }
  );

  animate();


  console.log(
    "[C8 Home] Homepage initialized."
  );
}


/*
 * Astro client lifecycle
 *
 * This is the important part.
 * Nothing touching document/window/canvas
 * executes during Astro's server build.
 */

if (typeof document !== "undefined") {
  document.addEventListener("astro:page-load", initHome);
}