document.documentElement.classList.add('locked');

/* ---- ENVELOPE OPEN ---- */
const sealBtn = document.getElementById('sealBtn');
const envelope = document.getElementById('envelope');
const envScreen = document.getElementById('envelopeScreen');
sealBtn.addEventListener('click', () => {
  sealBtn.classList.add('pressed');
  envelope.classList.add('open');
  setTimeout(() => {
    envScreen.classList.add('hidden');
    document.documentElement.classList.remove('locked');
  }, 1300);
});

/* ---- COUNTDOWN ---- */
const target = new Date('2026-10-31T22:00:00-03:00'); // hora Argentina/Mendoza
const countdownEl = document.getElementById('countdown');
function updateCountdown() {
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) {
    countdownEl.innerHTML = '<div class="today-msg">¡HOY ES EL GRAN DÍA! ✨</div>';
    clearInterval(cdInterval);
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('cdD').textContent = String(d).padStart(2, '0');
  document.getElementById('cdH').textContent = String(h).padStart(2, '0');
  document.getElementById('cdM').textContent = String(m).padStart(2, '0');
  document.getElementById('cdS').textContent = String(s).padStart(2, '0');
}
updateCountdown();
const cdInterval = setInterval(updateCountdown, 1000);

/* ---- REVEAL ON SCROLL (títulos + corazones/destellos) ---- */
const heartEmojis = ['🤍', '✨'];
document.querySelectorAll('section').forEach(sec => {
  for (let i = 0; i < 3; i++) {
    const h = document.createElement('span');
    h.className = 'float-heart';
    h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    h.style.left = (8 + Math.random() * 84) + '%';
    h.style.top = (Math.random() * 80) + '%';
    h.style.transitionDelay = (Math.random() * 0.6) + 's';
    sec.appendChild(h);
  }
});
const heartIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.float-heart').forEach(h => h.classList.add('show'));
    }
  });
}, { threshold: 0.25 });
document.querySelectorAll('section').forEach(sec => heartIO.observe(sec));

const revealIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el));

/* ---- STARFIELD ---- */
const starsEl = document.getElementById('stars');
let starsHTML = '';
for (let i = 0; i < 80; i++) {
  const x = Math.random() * 100, y = Math.random() * 100;
  const d = (Math.random() * 3 + 2).toFixed(1), dl = (Math.random() * 3).toFixed(1);
  starsHTML += `<span style="left:${x}%;top:${y}%;animation-duration:${d}s;animation-delay:${dl}s;"></span>`;
}
starsEl.innerHTML = starsHTML;

/* ---- GALLERY LIGHTBOX ---- */
const gallery = document.getElementById('gallery');
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
gallery.addEventListener('click', e => {
  const img = e.target.closest('img');
  if (img) { lbImg.src = img.src; lb.classList.add('open'); }
});
document.getElementById('closeLb').addEventListener('click', () => lb.classList.remove('open'));
lb.addEventListener('click', e => { if (e.target === lb) lb.classList.remove('open'); });

/* ---- REAL AUDIO PLAYER ---- */
const audio = document.getElementById('bgAudio');
const playBtn = document.getElementById('playBtn');
const prog = document.getElementById('prog');
const trackBar = document.getElementById('trackBar');
const volRange = document.getElementById('volRange');
const audioNote = document.getElementById('audioNote');

audio.volume = 0.8;

playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().then(() => {
      playBtn.textContent = '❚❚';
      audioNote.textContent = '';
    }).catch(() => {
      audioNote.textContent = 'Tocá play de nuevo para iniciar la música';
    });
  } else {
    audio.pause();
    playBtn.textContent = '▶';
  }
});

audio.addEventListener('timeupdate', () => {
  if (audio.duration) prog.style.width = (audio.currentTime / audio.duration * 100) + '%';
});
audio.addEventListener('ended', () => { playBtn.textContent = '▶'; });
audio.addEventListener('error', () => {
  audioNote.textContent = 'Agregá el archivo the-climb.mp3 en assets/audio/ para activar la música';
});

trackBar.addEventListener('click', (e) => {
  if (!audio.duration) return;
  const rect = trackBar.getBoundingClientRect();
  const ratio = (e.clientX - rect.left) / rect.width;
  audio.currentTime = ratio * audio.duration;
});

volRange.addEventListener('input', () => { audio.volume = volRange.value; });

/* ---- ALIAS: COPIAR AL PORTAPAPELES ---- */
const aliasEl = document.getElementById('aliasCopy');
const copyMsg = document.getElementById('copyMsg');
aliasEl.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('.candem');
  } catch (e) { /* fallback silencioso */ }
  copyMsg.classList.add('show');
  setTimeout(() => copyMsg.classList.remove('show'), 1800);
});

/* ---- WHATSAPP CON MENSAJE PRECARGADO ---- */
const waBtn = document.getElementById('waBtn');
const waMsg = 'Hola! Quiero confirmar mi asistencia a los XV de Candela 🎉✨';
waBtn.href = 'https://wa.me/542612190007?text=' + encodeURIComponent(waMsg);
