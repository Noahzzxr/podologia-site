/* Só o essencial: header que ganha fundo, entrada suave das seções
   e botão flutuante que aparece depois do hero. */
(function () {
  var header = document.querySelector('[data-header]');
  var hero = document.querySelector('[data-hero]');
  var wa = document.querySelector('[data-wa-float]');
  var year = document.querySelector('[data-year]');

  if (year) year.textContent = new Date().getFullYear();

  // Header: fundo ao rolar
  var ticking = false;
  function updateHeader() {
    header.classList.toggle('is-solid', window.scrollY > 8);
    ticking = false;
  }
  if (header) {
    updateHeader();
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(updateHeader); }
    }, { passive: true });
  }

  var reveals = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
    if (wa) wa.classList.add('is-visible');
    return;
  }

  // Entrada das seções, uma vez só
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  reveals.forEach(function (el) { io.observe(el); });

  // Botão flutuante: visível quando o hero sai da tela
  if (hero && wa) {
    new IntersectionObserver(function (entries) {
      wa.classList.toggle('is-visible', !entries[0].isIntersecting);
    }, { threshold: 0.15 }).observe(hero);
  }
})();
