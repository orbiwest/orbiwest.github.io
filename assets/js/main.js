(() => {
  'use strict';

  const EMAIL = 'engineering@orbiwest.com';
  const CURRENT_YEAR = new Date().getFullYear();
  const groups = {
    core: new Set(['/','/index.html','/services.html','/innovation.html','/industries.html','/insights.html','/about.html','/contact.html']),
    services: new Set(['/managed-it-services.html','/cybersecurity.html','/cloud-solutions.html','/network-engineering.html','/server-administration.html','/it-consulting.html','/ai-automation.html','/engineering-projects.html']),
    industries: new Set(['/education-it.html','/professional-services-it.html','/healthcare-it.html','/finance-it.html','/manufacturing-it.html','/logistics-it.html','/retail-it.html','/small-business-it.html']),
    resources: new Set(['/cybersecurity-playbook.html','/cloud-readiness-guide.html','/firewall-policy-hygiene.html','/managed-it-maturity.html','/network-resilience-guide.html','/case-studies.html','/secure-school-network.html','/cloud-readiness-case-study.html']),
    other: new Set(['/global-sourcing-checklist.html','/global-sourcing.html','/import-export.html','/trade-operations-case-study.html','/privacy.html','/terms.html'])
  };

  const route = location.pathname === '' ? '/' : location.pathname;
  const group = Object.entries(groups).find(([, routes]) => routes.has(route))?.[0] || 'core';

  function ensureMeta(name, content) {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el); }
    el.content = content;
  }

  function ensureCanonical() {
    let el = document.querySelector('link[rel="canonical"]');
    if (!el) { el = document.createElement('link'); el.rel = 'canonical'; document.head.appendChild(el); }
    el.href = `https://orbiwest.com${route === '/index.html' ? '/' : route}`;
  }

  function resetStyles() {
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => link.remove());
    const pre1 = document.createElement('link'); pre1.rel = 'preconnect'; pre1.href = 'https://fonts.googleapis.com';
    const pre2 = document.createElement('link'); pre2.rel = 'preconnect'; pre2.href = 'https://fonts.gstatic.com'; pre2.crossOrigin = 'anonymous';
    const font = document.createElement('link'); font.rel = 'stylesheet'; font.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Montserrat:wght@400;500;600;700&display=swap';
    const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = '/assets/css/site.css?v=brand-pack-1-20260906';
    document.head.append(pre1, pre2, font, css);
  }

  function navCurrent(path, href) {
    if (href === '/services.html') return path === '/services.html' || groups.services.has(path);
    if (href === '/innovation.html') return path === '/innovation.html' || path === '/ai-automation.html' || path === '/engineering-projects.html';
    if (href === '/industries.html') return path === '/industries.html' || groups.industries.has(path);
    if (href === '/insights.html') return path === '/insights.html' || groups.resources.has(path);
    if (href === '/about.html') return path === '/about.html';
    return false;
  }

  function headerHtml() {
    const nav = [
      ['Services','/services.html'],['Innovation','/innovation.html'],['Industries','/industries.html'],['Resources','/insights.html'],['About','/about.html']
    ].map(([label,href]) => `<a href="${href}"${navCurrent(route,href) ? ' aria-current="page"' : ''}>${label}</a>`).join('');
    return `<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="container nav-shell"><a class="brand-link" href="/" aria-label="Orbiwest Technologies home"><img class="brand-logo" data-brand-logo="primary" alt="Orbiwest Technologies"><span class="brand-fallback" aria-hidden="true">ORBIWEST TECHNOLOGIES</span></a><button class="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false" data-nav-toggle><span></span><span></span><span></span></button><nav class="site-nav" aria-label="Primary navigation" data-nav>${nav}<a class="contact-link" href="/contact.html"${route === '/contact.html' ? ' aria-current="page"' : ''}>Contact</a></nav></div></header>`;
  }

  function footerHtml() {
    return `<footer class="site-footer"><div class="container footer-grid"><div class="footer-brand"><img data-brand-logo="emblem" alt=""><div><strong>Orbiwest Technologies LLC</strong><p>Technology Under Control. Innovation In Motion.</p></div></div><nav class="footer-nav" aria-label="Footer navigation"><a href="/services.html">Services</a><a href="/innovation.html">Innovation</a><a href="/industries.html">Industries</a><a href="/insights.html">Resources</a><a href="/about.html">About</a></nav><div class="footer-contact"><a href="mailto:${EMAIL}">${EMAIL}</a><span>Chicago, Illinois, USA</span></div></div><div class="container footer-bottom"><p>© ${CURRENT_YEAR} Orbiwest Technologies LLC. All rights reserved.</p><p><a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a></p></div></footer>`;
  }

  async function loadBrand(kind) {
    const nodes = [...document.querySelectorAll(`[data-brand-logo="${kind}"]`)];
    if (!nodes.length) return;
    try {
      const parts = await Promise.all([0,1,2,3].map(i => fetch(`/assets/brand/chunks/${kind}-${i}.txt?v=20260906`).then(r => {
        if (!r.ok) throw new Error(`Brand asset chunk ${i} failed`);
        return r.text();
      })));
      const src = `data:image/webp;base64,${parts.join('')}`;
      nodes.forEach(img => { img.src = src; img.classList.add('brand-loaded'); });
      document.querySelectorAll('.brand-fallback').forEach(el => el.hidden = true);
    } catch (error) {
      document.querySelectorAll('.brand-fallback').forEach(el => el.hidden = false);
    }
  }

  function wireUi() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const nav = document.querySelector('[data-nav]');
    if (toggle && nav) toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  function cleanOldScripts() {
    document.querySelectorAll('script[src*="metallic-3d"],script[src*="base.js"],script[src*="site.js"]').forEach(s => s.remove());
  }

  async function render() {
    try {
      resetStyles();
      cleanOldScripts();
      const res = await fetch(`/assets/content/${group}.json?v=20260906`, {cache:'no-store'});
      if (!res.ok) throw new Error(`Content load failed: ${res.status}`);
      const data = await res.json();
      const page = data[route] || data[route === '/' ? '/index.html' : route] || data['/index.html'];
      if (!page) throw new Error('Page content not found');

      document.title = page.title;
      ensureMeta('description', page.description);
      ensureMeta('robots', page.robots || 'index,follow,max-image-preview:large');
      ensureMeta('theme-color', '#061A33');
      ensureCanonical();
      document.querySelectorAll('meta[property^="og:"]').forEach(el => el.remove());
      document.querySelectorAll('link[rel="icon"]').forEach(el => el.remove());

      document.body.innerHTML = `${headerHtml()}<main id="main">${page.main}</main>${footerHtml()}`;
      wireUi();
      await Promise.all([loadBrand('primary'), loadBrand('emblem')]);
      document.body.classList.add('ow-ready');
      document.documentElement.classList.add('ow-ready');
    } catch (error) {
      console.error(error);
      document.body.innerHTML = `<main class="runtime-error"><h1>Orbiwest Technologies</h1><p>We could not load this page correctly.</p><p><a href="mailto:${EMAIL}">${EMAIL}</a></p></main>`;
      document.body.classList.add('ow-ready');
      document.documentElement.classList.add('ow-ready');
    }
  }

  render();
})();
