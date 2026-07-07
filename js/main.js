// ===== Мобильное меню =====
(function () {
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        nav.classList.remove('open');
      })
    );
  }
})();

// ===== Карусель «Команда» =====
(function () {
  const track = document.getElementById('teamTrack');
  if (!track) return;

  const prev = document.getElementById('teamPrev');
  const next = document.getElementById('teamNext');
  const dotsBox = document.getElementById('teamDots');
  const cards = Array.from(track.children);

  function perView() {
    if (window.innerWidth <= 520) return 1;
    if (window.innerWidth <= 900) return 2;
    return 4;
  }

  let index = 0;

  function maxIndex() {
    return Math.max(0, cards.length - perView());
  }

  function buildDots() {
    dotsBox.innerHTML = '';
    const pages = maxIndex() + 1;
    for (let i = 0; i < pages; i++) {
      const b = document.createElement('button');
      b.addEventListener('click', () => go(i));
      dotsBox.appendChild(b);
    }
  }

  function update() {
    const card = cards[0];
    const gap = 20;
    const step = card.getBoundingClientRect().width + gap;
    track.style.transform = `translateX(${-index * step}px)`;
    Array.from(dotsBox.children).forEach((d, i) =>
      d.classList.toggle('active', i === index)
    );
  }

  function go(i) {
    index = Math.min(Math.max(i, 0), maxIndex());
    update();
  }

  prev.addEventListener('click', () => go(index - 1));
  next.addEventListener('click', () => go(index + 1));

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      index = Math.min(index, maxIndex());
      buildDots();
      update();
    }, 150);
  });

  buildDots();
  update();
})();
