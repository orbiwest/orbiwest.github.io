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
      if (href.includes('orbiwest@gmail.com')) link.setAttribute('href', href.replaceAll('orbiwest@gmail.com', INFO_EMAIL));
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
      } catch (_) {}
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
    document.querySelectorAll('.brand-text em').forEach((node) => { node.textContent = 'TECHNOLOGIES'; });
    document.querySelectorAll('.footer-brand strong').forEach((node) => {
      if (!node.closest('.brand-text')) node.textContent = 'Orbiwest Technologies LLC';
    });
  }

  function normalizeNavigation() {
    document.querySelectorAll('.site-nav a, .footer-nav a').forEach((link) => {
      const href = link.getAttribute('href') || '';
      if (href.endsWith('/case-studies.html') || href === '/case-studies.html') link.remove();
    });
  }

  function normalizeFooter() {
    document.querySelectorAll('.footer-contact').forEach((box) => {
      const firstMail = box.querySelector('a[href^="mailto:"]');
      if (firstMail && firstMail.textContent.includes('gmail.com')) {
        firstMail.href = `mailto:${INFO_EMAIL}`;
        firstMail.textContent = INFO_EMAIL;
      }
    });
  }

  function addSupportLinkWhereAppropriate() {
    if (!location.pathname.toLowerCase().endsWith('/contact.html')) return;
    const cards = document.querySelectorAll('.contact-card-large');
    if (!cards.length) return;
    const primary = cards[0];
    if (!primary.querySelector('[data-hq-support]') && !document.querySelector(`a[href="mailto:${SUPPORT_EMAIL}"]`)) {
      const support = document.createElement('p');
      support.dataset.hqSupport = 'true';
      support.innerHTML = `Technical support: <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>`;
      primary.append(support);
    }
  }

  function removeTemplateLanguage() {
    const unwanted = new Set([
      'Enterprise-grade visual identity',
      'Framework-free static deployment',
      'Free hosting compatibility',
      'Email-only contact path',
      'Designed for future expansion'
    ]);
    document.querySelectorAll('p, li').forEach((node) => {
      if (unwanted.has((node.textContent || '').trim())) node.remove();
    });
  }

  function labelIllustrativeScenarios() {
    const path = location.pathname.toLowerCase();
    const scenarioPages = ['/secure-school-network.html','/cloud-readiness-case-study.html','/trade-operations-case-study.html'];
    if (!scenarioPages.some((suffix) => path.endsWith(suffix))) return;

    document.title = document.title.replace(/Case Study/gi, 'Illustrative Scenario');
    document.querySelectorAll('.eyebrow').forEach((node) => {
      if (/case study/i.test(node.textContent || '')) node.textContent = 'Illustrative Scenario';
    });

    const main = document.getElementById('main-content');
    if (!main || main.querySelector('[data-scenario-notice]')) return;
    const notice = document.createElement('aside');
    notice.className = 'scenario-notice container';
    notice.dataset.scenarioNotice = 'true';
    notice.innerHTML = '<strong>Illustrative scenario.</strong> This page is an educational example of a technical approach. It is not presented as a named client engagement, testimonial, or verified customer outcome.';
    const breadcrumb = main.querySelector('.breadcrumb');
    if (breadcrumb && breadcrumb.nextSibling) breadcrumb.parentNode.insertBefore(notice, breadcrumb.nextSibling);
    else main.prepend(notice);
  }

  replaceEmailText();
  normalizeStructuredData();
  normalizeBrand();
  normalizeNavigation();
  normalizeFooter();
  addSupportLinkWhereAppropriate();
  removeTemplateLanguage();
  labelIllustrativeScenarios();

  const base = document.createElement('script');
  base.src = '/assets/js/base.js';
  base.async = false;
  document.head.appendChild(base);
})();
