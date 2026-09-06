(() => {
  'use strict';

  const EMAIL = 'engineering@orbiwest.com';
  const CURRENT_YEAR = new Date().getFullYear();
  const ASSET_VERSION = '20260906-logo-fix-1';
  const route = location.pathname === '' ? '/' : location.pathname;

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
    const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = `/assets/css/site.css?v=${ASSET_VERSION}`;
    const fix = document.createElement('link'); fix.rel = 'stylesheet'; fix.href = `/assets/css/logo-presentation-fix.css?v=${ASSET_VERSION}`;
    document.head.append(pre1, pre2, font, css, fix);
  }

  function navCurrent(path, href) {
    if (href === '/services.html') return path === '/services.html' || ['/managed-it-services.html','/cybersecurity.html','/cloud-solutions.html','/network-engineering.html','/server-administration.html','/it-consulting.html'].includes(path);
    if (href === '/innovation.html') return path === '/innovation.html' || ['/ai-automation.html','/engineering-projects.html'].includes(path);
    if (href === '/industries.html') return path === '/industries.html' || ['education','professional-services','healthcare','finance','manufacturing','logistics','retail','small-business'].some(x => path === `/${x}-it.html`);
    if (href === '/insights.html') return path === '/insights.html' || ['/cybersecurity-playbook.html','/cloud-readiness-guide.html','/firewall-policy-hygiene.html','/managed-it-maturity.html','/network-resilience-guide.html','/case-studies.html','/secure-school-network.html','/cloud-readiness-case-study.html'].includes(path);
    if (href === '/about.html') return path === '/about.html';
    return false;
  }

  function headerHtml() {
    const nav = [
      ['Services','/services.html'],['Innovation','/innovation.html'],['Industries','/industries.html'],['Resources','/insights.html'],['About','/about.html']
    ].map(([label,href]) => `<a href="${href}"${navCurrent(route,href) ? ' aria-current="page"' : ''}>${label}</a>`).join('');
    return `<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="container nav-shell"><a class="brand-link" href="/" aria-label="Orbiwest Technologies home"><span class="brand-fallback">ORBIWEST</span></a><button class="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false" data-nav-toggle><span></span><span></span><span></span></button><nav class="site-nav" aria-label="Primary navigation" data-nav>${nav}<a class="contact-link" href="/contact.html"${route === '/contact.html' ? ' aria-current="page"' : ''}>Contact</a></nav></div></header>`;
  }

  function footerHtml() {
    return `<footer class="site-footer"><div class="container footer-grid"><div class="footer-brand"><div><strong>Orbiwest Technologies LLC</strong><p>Technology Under Control. Innovation In Motion.</p></div></div><nav class="footer-nav" aria-label="Footer navigation"><a href="/services.html">Services</a><a href="/innovation.html">Innovation</a><a href="/industries.html">Industries</a><a href="/insights.html">Resources</a><a href="/about.html">About</a></nav><div class="footer-contact"><a href="mailto:${EMAIL}">${EMAIL}</a><span>Chicago, Illinois, USA</span></div></div><div class="container footer-bottom"><p>© ${CURRENT_YEAR} Orbiwest Technologies LLC. All rights reserved.</p><p><a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a></p></div></footer>`;
  }

  async function loadBrand(kind) {
    const nodes = [...document.querySelectorAll(`[data-brand-logo="${kind}"]`)];
    if (!nodes.length) return;
    try {
      const parts = await Promise.all([0,1,2,3].map(i => fetch(`/assets/brand/chunks/${kind}-${i}.txt?v=${ASSET_VERSION}`).then(r => {
        if (!r.ok) throw new Error(`Brand asset chunk ${i} failed`);
        return r.text();
      })));
      const src = `data:image/webp;base64,${parts.join('')}`;
      nodes.forEach(img => { img.src = src; img.classList.add('brand-loaded'); });
    } catch (error) {
      console.error(error);
      nodes.forEach(img => img.classList.add('brand-failed'));
    }
  }

  function wireUi() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const nav = document.querySelector('[data-nav]');
    if (toggle && nav) toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  function cleanOldScripts() {
    document.querySelectorAll('script[src*="metallic-3d"],script[src*="base.js"],script[src*="site.js"]').forEach(s => s.remove());
  }

  async function fallbackPage() {
    await import(`/assets/js/fallback.js?v=${ASSET_VERSION}`);
    return window.OrbiwestFallback?.page(route) || null;
  }

  async function render() {
    try {
      resetStyles();
      cleanOldScripts();
      const pageName = route === '/' || route === '/index.html' ? 'index' : route.split('/').pop().replace(/\.html$/, '');
      const res = await fetch(`/assets/content/pages/${pageName}.json?v=${ASSET_VERSION}`, {cache:'no-store'});
      let page;
      if (res.ok) page = await res.json();
      else page = await fallbackPage();
      if (!page) throw new Error(`Content load failed for ${route}`);

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
      document.body.innerHTML = `<main class="runtime-error"><div><h1>Orbiwest Technologies</h1><p>We could not load this page correctly.</p><p><a href="mailto:${EMAIL}">${EMAIL}</a></p></div></main>`;
      document.body.classList.add('ow-ready');
      document.documentElement.classList.add('ow-ready');
    }
  }

  render();
})();