
  // Header scroll
  const header = document.getElementById('header');
  const mobileCta = document.getElementById('mobileCta');

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 40) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
    if (mobileCta) {
      if (currentScroll > 500) {
        mobileCta.classList.add('visible');
      } else {
        mobileCta.classList.remove('visible');
      }
    }
  }, { passive: true });