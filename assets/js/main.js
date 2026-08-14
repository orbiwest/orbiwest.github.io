/* Orbiwest Technologies HQ site bootstrap.
   Normalizes the legacy multi-page site to the current HQ brand without
   duplicating markup across every static page, then loads the preserved
   interaction layer from base.js. */
(() => {
  'use strict';

  const INFO_EMAIL = 'info@orbiwest.com';
  const SUPPORT_EMAIL = 'support@orbiwest.com';

  function replaceEmailText(root = document) {
    const walker = document.createTreeWalker(root.body || root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      if (node.nodeValue && node.nodeValue.includes('orbiwest@gmail.com')) {
        node.nodeValue = node.nodeValue.replaceAll('orbiwest@gmail.com', INFO_EMAIL);
      }
    });

    root.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (href.includes('orbiwest@gmail.com')) {
        link.setAttribute('href', href.replaceAll('orbiwest@gmail.com', INFO_EMAIL));
      }
    });
  }

  function normalizeStructuredData() {
    document.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
      try {
        const data = JSON.parse(script.textContent);
        const update = (value) => {
          if (!value || typeof value !== 'object') return;
          if (value.email === 'orbiwest@gmail.com') value.email = INFO_EMAIL;
          if (value.name === 'Orbiwest Technologies') value.name = 'Orbiwest Technologies LLC';
          Object.values(value).forEach(update);
        };
        update(data);
        script.textContent = JSON.stringify(data);
      } catch (_) {
        // Leave non-JSON or already-custom structured data untouched.
      }
    });
  }

  function normalizeBrand() {
    document.querySelectorAll('.brand img, .footer-brand img').forEach((img) => {
      img.setAttribute('src', '/assets/img/logo-mark.svg');
      if (!img.getAttribute('alt')) img.setAttribute('alt', '');
    });

    document.querySelectorAll('.brand-text strong').forEach((node) => {
      node.textContent = 'ORBIWΞST';
      node.setAttribute('aria-label', 'Orbiwest');
    });

    document.querySelectorAll('.brand-text em').forEach((node) => {
      node.textContent = 'TECHNOLOGIES';
    });

    document.querySelectorAll('.footer-brand strong').forEach((node) => {
      if (!node.closest('.brand-text')) node.textContent = 'Orbiwest Technologies';
    });
  }

  function normalizeNavigation() {
    document.querySelectorAll('.site-nav a, .footer-nav a').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (href.endsWith('/case-studies.html') || href === '/case-studies.html') {
        link.remove();
      }
    });
  }

  function normalizeFooter() {
    document.querySelectorAll('.footer-bottom p, .footer-bottom span').forEach((node) => {
      if (node.childElementCount === 0 && /Orbiwest Technologies\.?/.test(node.textContent)) {
        node.textContent = node.textContent.replace('Orbiwest Technologies.', 'Orbiwest Technologies LLC.').replace('Orbiwest Technologies ', 'Orbiwest Technologies LLC ');
      }
    });

    document.querySelectorAll('.footer-contact').forEach((box) => {
      const firstMail = box.querySelector('a[href^="mailto:"]');
      if (firstMail) {
        firstMail.href = `mailto:${INFO_EMAIL}`;
        firstMail.textContent = INFO_EMAIL;
      }
    });
  }

  function addSupportLinkWhereAppropriate() {
    const page = location.pathname.toLowerCase();
    if (!page.endsWith('/contact.html') && page !== '/contact.html') return;
    const cards = document.querySelectorAll('.contact-card-large');
    if (!cards.length) return;
    const primary = cards[0];
    if (!primary.querySelector('[data-hq-support]')) {
      const support = document.createElement('p');
      support.dataset.hqSupport = 'true';
      support.innerHTML = `Technical support: <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>`;
      primary.append(support);
    }
  }

  function removeTemplateLanguage() {
    document.querySelectorAll('p, li').forEach((node) => {
      const text = (node.textContent || '').trim();
      if (text === 'Enterprise-grade visual identity' || text === 'Framework-free static deployment' || text === 'Free hosting compatibility' || text === 'Email-only contact path' || text === 'Designed for future expansion') {
        node.remove();
      }
    });
  }

  replaceEmailText();
  normalizeStructuredData();
  normalizeBrand();
  normalizeNavigation();
  normalizeFooter();
  addSupportLinkWhereAppropriate();
  removeTemplateLanguage();

  const base = document.createElement('script');
  base.src = '/assets/js/base.js';
  base.async = false;
  document.head.appendChild(base);
})();
