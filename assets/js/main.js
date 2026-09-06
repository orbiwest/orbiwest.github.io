(() => {
  'use strict';

  const EMAIL = 'engineering@orbiwest.com';
  const CURRENT_YEAR = new Date().getFullYear();
  const ASSET_VERSION = '20260906-vector-logo-1';
  const route = location.pathname === '' ? '/' : location.pathname;
  let logoInstance = 0;

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
    const base = document.createElement('link'); base.rel = 'stylesheet'; base.href = `/assets/css/site.css?v=${ASSET_VERSION}`;
    const theme = document.createElement('link'); theme.rel = 'stylesheet'; theme.href = `/assets/css/msp-light-theme.css?v=${ASSET_VERSION}`;
    const logo = document.createElement('link'); logo.rel = 'stylesheet'; logo.href = `/assets/css/vector-logo.css?v=${ASSET_VERSION}`;
    document.head.append(pre1, pre2, font, base, theme, logo);
  }

  function navCurrent(path, href) {
    if (href === '/services.html') return path === '/services.html' || ['/managed-it-services.html','/cybersecurity.html','/cloud-solutions.html','/network-engineering.html','/server-administration.html','/it-consulting.html'].includes(path);
    if (href === '/innovation.html') return path === '/innovation.html' || ['/ai-automation.html','/engineering-projects.html'].includes(path);
    if (href === '/industries.html') return path === '/industries.html' || ['education','professional-services','healthcare','finance','manufacturing','logistics','retail','small-business'].some(x => path === `/${x}-it.html`);
    if (href === '/insights.html') return path === '/insights.html' || ['/cybersecurity-playbook.html','/cloud-readiness-guide.html','/firewall-policy-hygiene.html','/managed-it-maturity.html','/network-resilience-guide.html','/case-studies.html','/secure-school-network.html','/cloud-readiness-case-study.html'].includes(path);
    if (href === '/about.html') return path === '/about.html';
    return false;
  }

  function emblemMarkup(prefix) {
    return `
      <defs>
        <linearGradient id="${prefix}-gold" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f0d281"/><stop offset=".42" stop-color="#c99835"/><stop offset=".72" stop-color="#f4d992"/><stop offset="1" stop-color="#a8751f"/></linearGradient>
        <linearGradient id="${prefix}-navy" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#07254f"/><stop offset=".55" stop-color="#0b4a91"/><stop offset="1" stop-color="#06203f"/></linearGradient>
        <linearGradient id="${prefix}-silver" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffffff"/><stop offset=".5" stop-color="#d9dee4"/><stop offset="1" stop-color="#8d98a5"/></linearGradient>
        <clipPath id="${prefix}-disc"><circle cx="80" cy="80" r="58"/></clipPath>
      </defs>
      <circle cx="80" cy="80" r="62" fill="url(#${prefix}-gold)"/>
      <circle cx="80" cy="80" r="56" fill="#082d61" stroke="#07182f" stroke-width="2"/>
      <g clip-path="url(#${prefix}-disc)">
        <path d="M34 74c11-28 29-43 54-46 16-2 32 2 44 11-14-3-25-1-35 5 13 0 24 4 32 11-13-2-24 0-33 6 11 0 20 4 28 10-16 1-29 7-39 18-9 10-14 24-15 42-11-12-19-27-22-42-2-6 0-11 6-15z" fill="url(#${prefix}-silver)"/>
        <path d="M64 45c13-10 29-15 46-13-14 3-26 9-36 18 13-5 26-6 39-2-16 4-29 10-39 20 11-5 22-6 33-3-14 4-25 10-33 19 8-4 16-5 24-3-11 5-20 11-26 19-4-19-7-37-8-55z" fill="#f7f8fa" opacity=".96"/>
        <path d="M101 47c11-4 21-2 29 5l-9 2 8 5-10 1c-5-6-11-9-18-9z" fill="url(#${prefix}-gold)"/>
        <path d="M119 52c10 3 18 8 23 15-8 2-14 6-18 12 1-7-1-13-5-18z" fill="url(#${prefix}-gold)"/>
        <circle cx="112" cy="48" r="4.7" fill="#d7a53e"/><circle cx="112" cy="48" r="2.2" fill="#07162f"/>
        <circle cx="99" cy="99" r="31" fill="url(#${prefix}-navy)" stroke="url(#${prefix}-gold)" stroke-width="2"/>
        <path d="M72 99h54M78 86c12 6 29 6 42 0M78 112c12-6 29-6 42 0M99 69v60M88 72c-8 16-8 38 0 54M110 72c8 16 8 38 0 54" stroke="#dfb95f" stroke-width="1.4" fill="none" opacity=".95"/>
        <path d="M79 85c8-6 17-9 27-8l-5 7 6 4-8 3-3 9-7-1-2-7-8-2zM108 100l9 4-2 8-8 5-4-7z" fill="#d7dde4" opacity=".9"/>
      </g>
      <ellipse cx="80" cy="84" rx="75" ry="25" transform="rotate(-14 80 84)" fill="none" stroke="url(#${prefix}-gold)" stroke-width="8"/>
      <ellipse cx="80" cy="84" rx="75" ry="25" transform="rotate(-14 80 84)" fill="none" stroke="#fff5cf" stroke-width="1.1" opacity=".72"/>
    `;
  }

  function emblemSvg(className = 'brand-emblem') {
    const id = `ow${++logoInstance}`;
    return `<svg class="${className} brand-vector" viewBox="0 0 160 160" role="img" aria-label="Orbiwest Technologies emblem" xmlns="http://www.w3.org/2000/svg">${emblemMarkup(id)}</svg>`;
  }

  function lockupSvg(className = 'brand-lockup') {
    const id = `ow${++logoInstance}`;
    return `<svg class="${className} brand-vector brand-lockup-svg" viewBox="0 0 590 148" role="img" aria-label="Orbiwest Technologies" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0 -4) scale(.91)">${emblemMarkup(id)}</g>
      <text x="165" y="78" font-family="Cinzel, Georgia, serif" font-size="56" font-weight="700" letter-spacing="-1.5"><tspan fill="#082e67">ORBI</tspan><tspan fill="url(#${id}-gold)">WEST</tspan></text>
      <line x1="165" y1="98" x2="225" y2="98" stroke="#c99835" stroke-width="2"/>
      <text x="242" y="104" font-family="Montserrat, Arial, sans-serif" font-size="15" font-weight="600" letter-spacing="8" fill="#273443">TECHNOLOGIES</text>
      <line x1="513" y1="98" x2="570" y2="98" stroke="#c99835" stroke-width="2"/>
    </svg>`;
  }

  function headerHtml() {
    const nav = [
      ['Services','/services.html'],['Innovation','/innovation.html'],['Industries','/industries.html'],['Resources','/insights.html'],['About','/about.html']
    ].map(([label, href]) => `<a href="${href}"${navCurrent(route, href) ? ' aria-current="page"' : ''}>${label}</a>`).join('');
    return `<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="container nav-shell"><a class="brand-link" href="/" aria-label="Orbiwest Technologies home">${lockupSvg('header-logo')}</a><button class="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false" data-nav-toggle><span></span><span></span><span></span></button><nav class="site-nav" aria-label="Primary navigation" data-nav>${nav}<a class="contact-link" href="/contact.html"${route === '/contact.html' ? ' aria-current="page"' : ''}>Get a Consultation</a></nav></div></header>`;
  }

  function footerHtml() {
    return `<footer class="site-footer"><div class="container footer-grid"><div class="footer-brand">${lockupSvg('footer-logo')}<div><strong>Orbiwest Technologies LLC</strong><p>Technology Under Control. Innovation In Motion.</p></div></div><nav class="footer-nav" aria-label="Footer navigation"><a href="/services.html">Services</a><a href="/innovation.html">Innovation</a><a href="/industries.html">Industries</a><a href="/insights.html">Resources</a><a href="/about.html">About</a></nav><div class="footer-contact"><a href="mailto:${EMAIL}">${EMAIL}</a><span>Chicago, Illinois, USA</span></div></div><div class="container footer-bottom"><p>© ${CURRENT_YEAR} Orbiwest Technologies LLC. All rights reserved.</p><p><a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a></p></div></footer>`;
  }

  function renderBrandPlaceholders() {
    document.querySelectorAll('[data-brand-logo="primary"]').forEach(node => {
      const classes = node.className || 'brand-lockup';
      node.outerHTML = lockupSvg(classes);
    });
    document.querySelectorAll('[data-brand-logo="emblem"]').forEach(node => {
      const classes = node.className || 'brand-emblem';
      node.outerHTML = emblemSvg(classes);
    });
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
      const page = res.ok ? await res.json() : await fallbackPage();
      if (!page) throw new Error(`Content load failed for ${route}`);
      document.title = page.title;
      ensureMeta('description', page.description);
      ensureMeta('robots', page.robots || 'index,follow,max-image-preview:large');
      ensureMeta('theme-color', '#ffffff');
      ensureCanonical();
      document.querySelectorAll('meta[property^="og:"]').forEach(el => el.remove());
      document.querySelectorAll('link[rel="icon"]').forEach(el => el.remove());
      document.body.className = `route-${pageName}`;
      const coverStrip = pageName === 'index' ? '' : '<div class="page-cover-strip" aria-hidden="true"></div>';
      document.body.innerHTML = `${headerHtml()}${coverStrip}<main id="main">${page.main}</main>${footerHtml()}`;
      renderBrandPlaceholders();
      wireUi();
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
