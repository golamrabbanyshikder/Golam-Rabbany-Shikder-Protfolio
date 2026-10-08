/* ============================================================
   Golam Rabbany Shikder · Portfolio — script.js
   (vertical scroll, in-page anchors)
   ============================================================ */

(() => {
  'use strict';

  /* ----- Theme (dark default, persisted) ----- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  let stored = null;
  try { stored = localStorage.getItem('portfolio-theme'); } catch (e) {}
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const initialTheme = stored || (prefersLight ? 'light' : 'dark');
  root.setAttribute('data-theme', initialTheme);

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('portfolio-theme', next); } catch (e) {}
  });

  /* ----- Mobile nav ----- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link tap
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  /* ----- Scroll-aware nav + scroll-top button + active link ----- */
  const nav = document.getElementById('nav');
  const scrollTopBtn = document.getElementById('scrollTop');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const sections = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const updateUI = () => {
    const y = window.scrollY;

    // Nav background
    nav.classList.toggle('scrolled', y > 24);

    // Scroll-top button
    scrollTopBtn.classList.toggle('visible', y > 600);

    // Active nav link
    let activeId = '';
    sections.forEach(s => {
      const rect = s.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) activeId = s.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + activeId);
    });
  };

  window.addEventListener('scroll', updateUI, { passive: true });
  updateUI();

  // Back-to-top
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ----- Reveal on scroll ----- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  // Hero block — animate on load using [data-anim] too
  const heroInners = document.querySelectorAll('[data-anim]');
  if ('IntersectionObserver' in window) {
    const io2 = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    heroInners.forEach(el => io2.observe(el));
  } else {
    heroInners.forEach(el => el.classList.add('is-visible'));
  }

  /* ----- Counter animation ----- */
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    const co = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || '';
        const dur = 1600;
        const start = performance.now();
        const step = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
          el.textContent = Math.floor(target * eased) + (p === 1 ? suffix : '');
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        co.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => co.observe(el));
  }

  /* ----- Typewriter ----- */
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    const roles = [
      'Java Developer',
      'Spring Boot Engineer',
      'Microservices Architect',
      'Backend Engineer',
      'Building scalable systems'
    ];
    let roleIdx = 0, charIdx = 0, deleting = false;

    function tick() {
      const role = roles[roleIdx];
      if (!deleting) {
        charIdx++;
        typewriterEl.textContent = role.slice(0, charIdx);
        if (charIdx === role.length) {
          deleting = true;
          return setTimeout(tick, 1800);
        }
      } else {
        charIdx--;
        typewriterEl.textContent = role.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 70);
    }
    setTimeout(tick, 800);
  }

  /* ----- Footer year ----- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----- Subtle parallax for background orbs ----- */
  const orbs = document.querySelectorAll('.bg-orb');
  let ticking = false;
  window.addEventListener('mousemove', (e) => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        orbs.forEach((orb, i) => {
          const factor = (i + 1) * 0.5;
          orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();