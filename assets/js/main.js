/* Orbiwest Technologies site bootstrap — Master Brand 2026 */
(() => {
  'use strict';

  const ENGINEERING_EMAIL = 'engineering@orbiwest.com';
  const HQ_MARK = '/assets/img/logo-mark.svg';
  const HQ_LOCKUP = '/assets/img/logo-lockup.svg';

  function normalizeEmail() {
    const legacy = ['orbiwest@gmail.com', 'info@orbiwest.com', 'support@orbiwest.com'];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      if (!node.nodeValue) return;
      legacy.forEach((email) => { node.nodeValue = node.nodeValue.replaceAll(email, ENGINEERING_EMAIL); });
    });
    document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
      let href = link.getAttribute('href') || '';
      legacy.forEach((email) => { href = href.replaceAll(email, ENGINEERING_EMAIL); });
      link.setAttribute('href', href);
      if (legacy.some((email) => (link.textContent || '').includes(email))) link.textContent = ENGINEERING_EMAIL;
    });
  }

  function normalizeStructuredData() {
    document.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
      try {
        const data = JSON.parse(script.textContent);
        const visit = (value) => {
          if (!value || typeof value !== 'object') return;
          if ('email' in value) value.email = ENGINEERING_EMAIL;
          if (value.name === 'Orbiwest Technologies') value.name = 'Orbiwest Technologies LLC';
          if (typeof value.logo === 'string') value.logo = `https://orbiwest.com${HQ_MARK}`;
          Object.values(value).forEach(visit);
        };
        visit(data);
        script.textContent = JSON.stringify(data);
      } catch (_) { /* Leave custom JSON-LD unchanged if it cannot be parsed. */ }
    });
  }

  function normalizeBrand() {
    document.querySelectorAll('.site-header .brand').forEach((brand) => {
      brand.classList.add('brand-official', 'brand-horizontal');
      const img = brand.querySelector('img');
      if (img) {
        img.src = HQ_LOCKUP;
        img.alt = 'Orbiwest Technologies';
        img.removeAttribute('srcset');
        img.style.imageRendering = 'auto';
        img.style.objectFit = 'contain';
      }
      const text = brand.querySelector('.brand-text');
      if (text) text.setAttribute('aria-hidden', 'true');
    });

    document.querySelectorAll('.footer-brand img, .professional-brand-stage img').forEach((img) => {
      img.src = HQ_MARK;
      img.removeAttribute('srcset');
      img.style.imageRendering = 'auto';
      img.style.objectFit = 'contain';
      if (!img.getAttribute('alt')) img.setAttribute('alt', '');
    });

    document.querySelectorAll('img.hq-clean-lockup, img.hq-logo-lockup, img[src*="logo-lockup.svg"]').forEach((img) => {
      img.src = HQ_LOCKUP;
      img.alt = 'Orbiwest Technologies metallic corporate logo';
      img.classList.add('hq-logo-lockup');
      img.removeAttribute('srcset');
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
      if ((link.textContent || '').trim() === 'Insights' && link.closest('.site-nav')) link.textContent = 'Resources';
      if (href.endsWith('/case-studies.html') && link.closest('.site-nav')) link.remove();
    });
  }

  function ensureEngineeringContact() {
    document.querySelectorAll('.footer-contact').forEach((box) => {
      const mailLinks = [...box.querySelectorAll('a[href^="mailto:"]')];
      mailLinks.slice(1).forEach((link) => link.remove());
      const first = mailLinks[0];
      if (first) {
        first.href = `mailto:${ENGINEERING_EMAIL}`;
        first.textContent = ENGINEERING_EMAIL;
      } else {
        const link = document.createElement('a');
        link.href = `mailto:${ENGINEERING_EMAIL}`;
        link.textContent = ENGINEERING_EMAIL;
        box.prepend(link);
      }
    });
  }

  function removeTemplateLanguage() {
    const unwanted = new Set(['Enterprise-grade visual identity','Framework-free static deployment','Free hosting compatibility','Email-only contact path','Designed for future expansion']);
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

  normalizeEmail();
  normalizeStructuredData();
  normalizeBrand();
  normalizeNavigation();
  ensureEngineeringContact();
  removeTemplateLanguage();
  labelIllustrativeScenarios();

  const base = document.createElement('script');
  base.src = '/assets/js/base.js';
  base.async = false;
  document.head.appendChild(base);
})();
