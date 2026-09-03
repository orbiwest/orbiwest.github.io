/* Orbiwest Technologies site bootstrap — Eagle Orbit v2 */
(() => {
  'use strict';

  const ENGINEERING_EMAIL = 'engineering@orbiwest.com';
  const BRAND_REV = 'eagle-orbit-v2-20260903';
  const FALLBACK_MARK_PATH = '/assets/img/logo-mark.svg';
  const FALLBACK_LOCKUP_PATH = '/assets/img/logo-lockup.svg';
  const FALLBACK_MARK = `${FALLBACK_MARK_PATH}?v=${BRAND_REV}`;
  const FALLBACK_LOCKUP = `${FALLBACK_LOCKUP_PATH}?v=${BRAND_REV}`;

  const EAGLE_FULL_CHUNKS = [
    '/assets/brand/eagle-v2/full-0.txt',
    '/assets/brand/eagle-v2/full-1.txt',
    '/assets/brand/eagle-v2/full-2.txt',
    '/assets/brand/eagle-v2/full-3.txt'
  ];

  const EAGLE_ICON_CHUNKS = [
    '/assets/brand/eagle-v2/icon-0.txt',
    '/assets/brand/eagle-v2/icon-1.txt'
  ];

  let eagleAssetsPromise;

  async function buildDataUrl(paths) {
    const parts = await Promise.all(paths.map(async (path) => {
      const response = await fetch(`${path}?v=${BRAND_REV}`, { cache: 'force-cache' });
      if (!response.ok) throw new Error(`Brand asset request failed: ${path}`);
      return (await response.text()).replace(/\s+/g, '');
    }));
    return `data:image/webp;base64,${parts.join('')}`;
  }

  function validateImage(src) {
    return new Promise((resolve, reject) => {
      const probe = new Image();
      probe.onload = () => resolve(src);
      probe.onerror = () => reject(new Error('Brand image decode failed'));
      probe.src = src;
    });
  }

  function loadEagleAssets() {
    if (!eagleAssetsPromise) {
      eagleAssetsPromise = (async () => {
        const full = await validateImage(await buildDataUrl(EAGLE_FULL_CHUNKS));
        let icon = null;
        try {
          icon = await validateImage(await buildDataUrl(EAGLE_ICON_CHUNKS));
        } catch (_) {
          /* The full lockup remains the source of truth if the icon chunks are unavailable. */
        }
        return { full, icon };
      })();
    }
    return eagleAssetsPromise;
  }

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
          if (typeof value.logo === 'string') value.logo = `https://orbiwest.com${FALLBACK_MARK_PATH}`;
          Object.values(value).forEach(visit);
        };
        visit(data);
        script.textContent = JSON.stringify(data);
      } catch (_) { /* Leave custom JSON-LD unchanged if it cannot be parsed. */ }
    });
  }

  function normalizeBrandFallback() {
    document.querySelectorAll('.site-header .brand').forEach((brand) => {
      brand.classList.add('brand-official', 'brand-horizontal');
      const img = brand.querySelector('img');
      if (img) {
        img.src = FALLBACK_LOCKUP;
        img.alt = 'Orbiwest Technologies';
        img.removeAttribute('srcset');
        img.style.imageRendering = 'auto';
      }
      const text = brand.querySelector('.brand-text');
      if (text) text.setAttribute('aria-hidden', 'true');
    });

    document.querySelectorAll('.footer-brand img, .professional-brand-stage img').forEach((img) => {
      img.src = FALLBACK_MARK;
      img.removeAttribute('srcset');
      img.style.imageRendering = 'auto';
      if (!img.getAttribute('alt')) img.setAttribute('alt', '');
    });

    document.querySelectorAll('img.hq-clean-lockup, img.hq-logo-lockup, img[src*="logo-lockup.svg"]').forEach((img) => {
      img.src = FALLBACK_LOCKUP;
      img.alt = 'Orbiwest Technologies metallic corporate logo';
      img.classList.add('hq-logo-lockup');
      img.removeAttribute('srcset');
    });

    document.querySelectorAll('.brand-text strong').forEach((node) => {
      node.textContent = 'ORBIWEST';
      node.setAttribute('aria-label', 'Orbiwest');
    });
    document.querySelectorAll('.brand-text em').forEach((node) => { node.textContent = 'TECHNOLOGIES'; });
    document.querySelectorAll('.footer-brand strong').forEach((node) => {
      if (!node.closest('.brand-text')) node.textContent = 'Orbiwest Technologies LLC';
    });
  }

  async function applyEagleOrbitV2() {
    try {
      const { full, icon } = await loadEagleAssets();

      document.querySelectorAll('.site-header .brand').forEach((brand) => {
        brand.classList.add('brand-official', 'brand-horizontal', 'eagle-v2-nav');
        const img = brand.querySelector('img');
        if (!img) return;
        img.src = full;
        img.alt = 'Orbiwest Technologies';
        img.classList.add('eagle-v2-full-lockup', 'eagle-v2-nav-lockup');
        img.removeAttribute('srcset');
      });

      document.querySelectorAll('img.hq-clean-lockup, img.hq-logo-lockup').forEach((img) => {
        img.src = full;
        img.alt = 'Orbiwest Technologies Eagle Orbit metallic logo';
        img.classList.add('eagle-v2-full-lockup');
        img.classList.remove('eagle-v2-icon-crop');
        img.removeAttribute('srcset');
      });

      document.querySelectorAll('.professional-brand-stage img, .footer-brand img').forEach((img) => {
        img.src = icon || full;
        img.classList.toggle('eagle-v2-icon-crop', !icon);
        img.classList.add('eagle-v2-icon');
        img.removeAttribute('srcset');
        if (img.closest('.professional-brand-stage')) {
          img.alt = 'Orbiwest Technologies Eagle Orbit icon';
        }
      });

      if (icon) {
        let favicon = document.querySelector('link[rel~="icon"]');
        if (!favicon) {
          favicon = document.createElement('link');
          favicon.rel = 'icon';
          document.head.appendChild(favicon);
        }
        favicon.type = 'image/webp';
        favicon.href = icon;
      }

      document.documentElement.classList.add('eagle-v2-ready');
    } catch (error) {
      console.warn('Orbiwest Eagle Orbit v2 asset load failed; using local fallback.', error);
    }
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
  normalizeBrandFallback();
  normalizeNavigation();
  ensureEngineeringContact();
  removeTemplateLanguage();
  labelIllustrativeScenarios();
  applyEagleOrbitV2();

  const base = document.createElement('script');
  base.src = `/assets/js/base.js?v=${BRAND_REV}`;
  base.async = false;
  document.head.appendChild(base);
})();
