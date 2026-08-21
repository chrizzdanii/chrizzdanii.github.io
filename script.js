document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');
  hamburger.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    hamburger.classList.toggle('open');
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mainNav.classList.remove('open'));
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');
  const setActive = () => {
    let current = 'home';
    sections.forEach(sec => {
      const top = sec.offsetTop - 110;
      if (window.scrollY >= top) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  };
  window.addEventListener('scroll', setActive);
  setActive();

  /* ---------- Generate waveform bars ---------- */
  function buildWave(container, count, playedRatio = 0) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const bar = document.createElement('span');
      const h = 15 + Math.round(Math.sin(i * 0.5) * 10 + Math.random() * 25);
      bar.style.height = `${Math.max(6, h)}%`;
      if (i / count < playedRatio) bar.classList.add('played');
      container.appendChild(bar);
    }
  }
  buildWave(document.getElementById('waveform'), 60, 0.12);
  buildWave(document.getElementById('npWave'), 34, 0.3);

  /* ---------- Play/pause the featured player ---------- */
  const mainPlayBtn = document.querySelector('.release-player .np-play');
  const waveform = document.getElementById('waveform');
  let playing = false;
  let progressTimer = null;
  let progress = 0.12;

  mainPlayBtn.addEventListener('click', () => {
    playing = !playing;
    mainPlayBtn.innerHTML = playing
      ? '<svg viewBox="0 0 24 24" width="14" height="14"><rect x="6" y="5" width="4" height="14" fill="#0a0908"/><rect x="14" y="5" width="4" height="14" fill="#0a0908"/></svg>'
      : '<svg viewBox="0 0 24 24" width="14" height="14"><path d="M6 4l14 8-14 8z" fill="#0a0908"/></svg>';

    if (playing) {
      progressTimer = setInterval(() => {
        progress = Math.min(1, progress + 0.01);
        buildWave(waveform, 60, progress);
        if (progress >= 1) {
          clearInterval(progressTimer);
          playing = false;
          mainPlayBtn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14"><path d="M6 4l14 8-14 8z" fill="#0a0908"/></svg>';
          progress = 0;
        }
      }, 300);
    } else {
      clearInterval(progressTimer);
    }
  });

  /* ---------- Track list: highlight active row ---------- */
  const trackButtons = document.querySelectorAll('.track-play');
  trackButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const wasPlaying = btn.classList.contains('playing');
      trackButtons.forEach(b => {
        b.classList.remove('playing');
        b.innerHTML = '<svg viewBox="0 0 24 24" width="12" height="12"><path d="M6 4l14 8-14 8z" fill="currentColor"/></svg>';
      });
      if (!wasPlaying) {
        btn.classList.add('playing');
        btn.innerHTML = '<svg viewBox="0 0 24 24" width="12" height="12"><rect x="5" y="4" width="4" height="16" fill="currentColor"/><rect x="15" y="4" width="4" height="16" fill="currentColor"/></svg>';
      }
    });
  });

  /* ---------- Newsletter form ---------- */
  const form = document.getElementById('subscribeForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input');
    const btn = form.querySelector('button');
    const original = btn.textContent;
    btn.textContent = 'Subscribed ✓';
    input.value = '';
    setTimeout(() => { btn.textContent = original; }, 2200);
  });

});
