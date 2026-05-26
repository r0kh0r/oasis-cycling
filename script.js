/* ============================================================
   Oasis × Cycling — countdown + light interactivity
   ============================================================ */

/* ── Hero background crossfade ── */
(function () {
  const photos = [
    "Photos/2025_09_28 SP Kigali ME 047.jpg",
    "Photos/2025_09_28 SP Kigali ME 035.jpg",
    "Photos/2025_09_28 SP Kigali ME 053.jpg",
    "Photos/2025_09_28 SP Kigali ME 057.jpg",
    "Photos/2025_09_28 SP Kigali ME 093.jpg",
    "Photos/2025_09_28 SP Kigali ME 110.jpg",
    "Photos/2025_09_28 SP Kigali ME 137.jpg",
    "Photos/2025_09_28 SP Kigali ME 258.jpg",
    "Photos/2025_09_28 SP Kigali ME 260.jpg",
    "Photos/2025_09_28 SP Kigali ME 279.jpg",
  ];

  const slideA = document.getElementById("hero-slide-a");
  const slideB = document.getElementById("hero-slide-b");

  if (!slideA || !slideB) return;

  // Preload first image then start cycling
  let current = 0;
  let useA = true;

  function applyPhoto(el, url) {
    el.style.backgroundImage = `url('${url}')`;
  }

  // Set initial slide
  applyPhoto(slideA, photos[0]);

  setInterval(function () {
    current = (current + 1) % photos.length;
    const url = photos[current];
    if (useA) {
      // Preload into B then switch
      applyPhoto(slideB, url);
      requestAnimationFrame(function () {
        slideA.classList.remove("active");
        slideB.classList.add("active");
      });
    } else {
      applyPhoto(slideA, url);
      requestAnimationFrame(function () {
        slideB.classList.remove("active");
        slideA.classList.add("active");
      });
    }
    useA = !useA;
  }, 5000);
})();

// Campaign ends 67 days from "now" (matches dashboard value).
// In production, replace with a fixed campaign-end ISO string.
const CAMPAIGN_END = new Date(Date.now() + (67 * 24 + 14) * 3600 * 1000 + 22 * 60 * 1000);

function pad(n) { return n < 10 ? "0" + n : "" + n; }

function tick() {
  const now = new Date();
  let delta = Math.max(0, CAMPAIGN_END - now);

  const days = Math.floor(delta / (1000 * 60 * 60 * 24));
  delta -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(delta / (1000 * 60 * 60));
  delta -= hours * 1000 * 60 * 60;
  const mins = Math.floor(delta / (1000 * 60));
  delta -= mins * 1000 * 60;
  const secs = Math.floor(delta / 1000);

  document.querySelectorAll('[data-cd="d"]').forEach(el => el.textContent = days);
  document.querySelectorAll('[data-cd="h"]').forEach(el => el.textContent = pad(hours));
  document.querySelectorAll('[data-cd="m"]').forEach(el => el.textContent = pad(mins));
  document.querySelectorAll('[data-cd="s"]').forEach(el => el.textContent = pad(secs));
}

setInterval(tick, 1000);
tick();

/* ============================================================
   Pill tab switcher (purely decorative for the demo)
   ============================================================ */
document.querySelectorAll('.pills').forEach(group => {
  const buttons = group.querySelectorAll('button');
  buttons.forEach(btn => btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }));
});

/* ============================================================
   FAQ — click to expand (simple toggle)
   ============================================================ */
document.querySelectorAll('.faq__item').forEach(item => {
  const q = item.querySelector('.faq__q');
  const a = item.querySelector('.faq__a');
  if (!q || !a) return;
  q.style.cursor = 'pointer';
  // start collapsed except first
  if (item !== item.parentElement.firstElementChild) {
    a.style.display = 'none';
  }
  q.addEventListener('click', () => {
    const open = a.style.display !== 'none';
    a.style.display = open ? 'none' : 'block';
  });
});

/* ============================================================
   Live counter wobble — adds subtle ticking life
   ============================================================ */
const liveStats = document.querySelectorAll('.stat__v');
let baseValues = [];
liveStats.forEach(el => baseValues.push(el.textContent));

setInterval(() => {
  // Tiny random updates to the registered-riders counter
  const reg = document.querySelector('.stat:nth-child(1) .stat__v');
  if (reg && Math.random() > 0.6) {
    const cur = parseInt(reg.textContent.replace(/,/g, ''), 10);
    if (!isNaN(cur)) {
      reg.textContent = (cur + 1).toLocaleString();
    }
  }
}, 4000);

/* ============================================================
   Smooth scroll for anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href');
    if (id.length > 1) {
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});
