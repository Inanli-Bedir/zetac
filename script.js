const LANG_KEY = 'zetac-lang';
const DEFAULT_LANG = 'en';

function getStoredLang() {
  const stored = localStorage.getItem(LANG_KEY);
  return translations[stored] ? stored : DEFAULT_LANG;
}

function setLanguage(lang) {
  if (!translations[lang]) return;

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const text = translations[lang][key];
    if (text !== undefined) {
      el.textContent = text;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    const text = translations[lang][key];
    if (text !== undefined) {
      el.placeholder = text;
    }
  });

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('is-active', btn.dataset.lang === lang);
  });

  localStorage.setItem(LANG_KEY, lang);

  if (typeof initProjectDetail === 'function' && document.body.dataset.project) {
    initProjectDetail();
    return;
  }

  const title = translations[lang]['meta.title'];
  const description = translations[lang]['meta.description'];
  if (title) document.title = title;
  if (description) {
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = description;
  }
}

// Active nav link
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[href]').forEach((link) => {
    if (link.getAttribute('href') === page) {
      link.classList.add('is-active');
    }
  });
})();

// Mobile navigation
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Header shadow on scroll
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.background = 'rgba(255, 255, 255, 0.96)';
    header.style.boxShadow = '0 4px 24px rgba(17, 24, 39, 0.06)';
    header.style.borderColor = 'rgba(226, 232, 240, 0.95)';
  } else {
    header.style.background = 'rgba(244, 246, 249, 0.88)';
    header.style.boxShadow = 'none';
    header.style.borderColor = 'rgba(226, 232, 240, 0.9)';
  }
});

// Language switcher
document.querySelectorAll('.lang-btn').forEach((btn) => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// Contact form (demo)
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formNote.hidden = false;
    contactForm.reset();
    formNote.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

// Homepage mini contact form
const homeContactForm = document.getElementById('homeContactForm');
const homeFormNote = document.getElementById('homeFormNote');

if (homeContactForm) {
  homeContactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    homeFormNote.hidden = false;
    homeContactForm.reset();
    homeFormNote.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

// Init language from storage or browser preference
const browserLang = navigator.language.slice(0, 2);
const initialLang = getStoredLang() !== DEFAULT_LANG
  ? getStoredLang()
  : (translations[browserLang] ? browserLang : DEFAULT_LANG);

setLanguage(initialLang);

// Scroll-triggered reveal animations
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-section, .why-reveal');

  if (!revealElements.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    revealElements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  revealElements.forEach((el) => observer.observe(el));
}

if (document.body.dataset.project) {
  initProjectDetail();
} else {
  initScrollReveal();
  if (typeof handleLogoCardImages === 'function') handleLogoCardImages();
}

// Page transition on nav link clicks
document.querySelectorAll('.nav-links a[href]').forEach((link) => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (!href || href.startsWith('#') || href === currentPage) return;
    e.preventDefault();
    document.body.classList.add('page-exit');
    setTimeout(() => { window.location.href = href; }, 220);
  });
});
