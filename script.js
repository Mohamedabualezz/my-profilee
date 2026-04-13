/* ─────────────────────────────────────────
   PORTFOLIO SCRIPT — Alex Morgan
   Full Stack .NET Developer Portfolio
───────────────────────────────────────── */

'use strict';

// ── CUSTOM CURSOR ──────────────────────
const cursorDot  = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;
let raf;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

(function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateCursor);
})();

document.addEventListener('mouseleave', () => {
  cursorDot.style.opacity  = '0';
  cursorRing.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursorDot.style.opacity  = '1';
  cursorRing.style.opacity = '1';
});


// ── NAVBAR ─────────────────────────────
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const observerNav = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.querySelectorAll('a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observerNav.observe(s));


// ── TYPING ANIMATION ───────────────────
const phrases = [
  'Full Stack .NET Developer',
  'ASP.NET Core Architect',
  'C# Backend Engineer',
  'AI & ML Enthusiast',
  'API Design Specialist',
];

const typedEl = document.getElementById('typedText');
let phraseIdx  = 0;
let charIdx    = 0;
let isDeleting = false;
let typeSpeed  = 80;

function type() {
  const current = phrases[phraseIdx];
  if (isDeleting) {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    typeSpeed = 40;
  } else {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    typeSpeed = 80;
  }

  if (!isDeleting && charIdx === current.length) {
    isDeleting = true;
    typeSpeed  = 1800; // pause at end
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx  = (phraseIdx + 1) % phrases.length;
    typeSpeed  = 400;
  }

  setTimeout(type, typeSpeed);
}
setTimeout(type, 1000);


// ── SCROLL REVEAL ──────────────────────
const revealEls = document.querySelectorAll('.reveal, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el    = entry.target;
      const delay = parseInt(el.dataset.delay) || 0;
      setTimeout(() => el.classList.add('visible'), delay);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));


// ── SKILL BAR ANIMATION ────────────────
const barFills = document.querySelectorAll('.bar-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const w   = bar.dataset.w;
      setTimeout(() => { bar.style.width = w + '%'; }, 300);
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.4 });

barFills.forEach(bar => barObserver.observe(bar));


// ── PROJECT FILTER ─────────────────────
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const tags = card.dataset.tags || '';
      if (filter === 'all' || tags.includes(filter)) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInCard 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// Inject fadeIn keyframe for filtering
const styleSheet = document.styleSheets[0];
try {
  styleSheet.insertRule(`
    @keyframes fadeInCard {
      from { opacity: 0; transform: scale(0.96) translateY(10px); }
      to   { opacity: 1; transform: scale(1)    translateY(0); }
    }
  `, styleSheet.cssRules.length);
} catch(e) {}


// ── CONTACT FORM ───────────────────────
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');

  btn.disabled = true;
  btn.querySelector('span').textContent = 'Sending…';
  btn.querySelector('i').className = 'fa-solid fa-spinner fa-spin';

  // Simulate async send
  setTimeout(() => {
    contactForm.reset();
    btn.disabled = false;
    btn.querySelector('span').textContent = 'Send Message';
    btn.querySelector('i').className = 'fa-solid fa-paper-plane';
    formSuccess.classList.add('show');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  }, 1400);
});


// ── SMOOTH SCROLL (fallback for older browsers) ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ── PARALLAX ORB ───────────────────────
window.addEventListener('mousemove', e => {
  const orbs = document.querySelectorAll('.orb');
  const xRatio = (e.clientX / window.innerWidth - 0.5);
  const yRatio = (e.clientY / window.innerHeight - 0.5);
  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 18;
    orb.style.transform = `translate(${xRatio * factor}px, ${yRatio * factor}px)`;
  });
}, { passive: true });


// ── COUNT-UP ANIMATION (stats) ─────────
const statNumbers = document.querySelectorAll('.stat-number');

const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el  = entry.target;
    const raw = el.textContent.trim();
    const num = parseInt(raw);
    if (isNaN(num)) return;

    const suffix = raw.replace(/\d/g, '');
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(num / (duration / 16));

    const counter = setInterval(() => {
      start = Math.min(start + step, num);
      el.textContent = start + suffix;
      if (start >= num) clearInterval(counter);
    }, 16);

    countObserver.unobserve(el);
  });
}, { threshold: 0.6 });

statNumbers.forEach(el => countObserver.observe(el));


// ── SCROLL PROGRESS BAR ────────────────
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed; top: 0; left: 0; height: 2px; z-index: 9999;
  background: linear-gradient(to right, #3b82f6, #14b8a6);
  width: 0%; transition: width 0.1s linear;
  pointer-events: none;
`;
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total    = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = ((scrolled / total) * 100) + '%';
}, { passive: true });


// ── HERO SECTION ENTRANCE STAGGER ──────
window.addEventListener('load', () => {
  const heroItems = document.querySelectorAll('.hero-badge, .hero-name, .hero-title, .hero-tagline, .hero-cta, .hero-scroll');
  heroItems.forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`;
    setTimeout(() => {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    }, 100 + i * 100);
  });
});
