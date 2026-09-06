(() => {
  'use strict';

  const EMAIL = 'engineering@orbiwest.com';
  const CURRENT_YEAR = new Date().getFullYear();
  const ASSET_VERSION = '20260906-bright-corporate-1';
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
    const font = document.createElement('link'); font.rel = 'stylesheet'; font.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Montserrat:wght@400;500;600;700&display=swap';
    const base = document.createElement('link'); base.rel = 'stylesheet'; base.href = `/assets/css/site.css?v=${ASSET_VERSION}`;
    const theme = document.createElement('link'); theme.rel = 'stylesheet'; theme.href = `/assets/css/bright-corporate.css?v=${ASSET_VERSION}`;
    document.head.append(pre1, pre2, font, base, theme);
  }

  function isActive(prefixes) { return prefixes.some(p => route === p || route.endsWith(p)); }

  function headerHtml() {
    const menus = [
      ['Services', '/services.html', [
        ['Managed IT', '/managed-it-services.html'], ['Cybersecurity', '/cybersecurity.html'], ['Cloud Solutions', '/cloud-solutions.html'], ['Network Infrastructure', '/network-engineering.html'], ['Server Administration', '/server-administration.html'], ['IT Consulting', '/it-consulting.html'], ['AI & Automation', '/ai-automation.html'], ['Engineering Projects', '/engineering-projects.html']
      ]],
      ['Industries', '/industries.html', [
        ['Education', '/education-it.html'], ['Healthcare', '/healthcare-it.html'], ['Professional Services', '/professional-services-it.html'], ['Financial Services', '/finance-it.html'], ['Manufacturing', '/manufacturing-it.html'], ['Logistics', '/logistics-it.html'], ['Retail', '/retail-it.html']
      ]],
      ['Why Orbiwest', '/about.html', [
        ['About Orbiwest', '/about.html'], ['How We Work', '/about.html#how-we-work'], ['Innovation', '/innovation.html']
      ]],
      ['Resources', '/insights.html', [
        ['Resource Center', '/insights.html'], ['Cybersecurity Playbook', '/cybersecurity-playbook.html'], ['Cloud Readiness Guide', '/cloud-readiness-guide.html'], ['Network Resilience Guide', '/network-resilience-guide.html'], ['Illustrative Scenarios', '/case-studies.html']
      ]],
      ['Company', '/about.html', [
        ['Company', '/about.html'], ['Contact', '/contact.html'], ['Privacy', '/privacy.html'], ['Terms', '/terms.html']
      ]]
    ];
    const nav = menus.map(([label, href, children]) => {
      const active = isActive([href, ...children.map(x => x[1].split('#')[0])]);
      return `<div class="nav-group"><a class="nav-parent" href="${href}"${active ? ' aria-current="page"' : ''}>${label}<span aria-hidden="true">⌄</span></a><div class="nav-dropdown">${children.map(([l,h]) => `<a href="${h}">${l}</a>`).join('')}</div></div>`;
    }).join('');
    return `<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="container nav-shell"><a class="brand-link" href="/" aria-label="Orbiwest Technologies home"><img class="header-logo" data-brand-logo="primary" alt="Orbiwest Technologies"><span class="brand-fallback"><strong>ORBIWEST</strong><small>TECHNOLOGIES</small></span></a><button class="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false" data-nav-toggle><span></span><span></span><span></span></button><nav class="site-nav" aria-label="Primary navigation" data-nav>${nav}<a class="consultation-link" href="/contact.html">Request a Consultation <span>→</span></a></nav></div></header>`;
  }

  function footerHtml() {
    return `<footer class="site-footer"><div class="container footer-grid"><div class="footer-brand"><div class="footer-brand-logo"><img data-brand-logo="primary" alt="Orbiwest Technologies"></div><p>Managed IT, cybersecurity, cloud, network infrastructure, automation and engineering support.</p></div><div><strong>Services</strong><a href="/managed-it-services.html">Managed IT</a><a href="/cybersecurity.html">Cybersecurity</a><a href="/cloud-solutions.html">Cloud Solutions</a><a href="/network-engineering.html">Network Infrastructure</a></div><div><strong>Company</strong><a href="/about.html">About</a><a href="/industries.html">Industries</a><a href="/insights.html">Resources</a><a href="/contact.html">Contact</a></div><div class="footer-contact"><strong>Contact</strong><a href="mailto:${EMAIL}">${EMAIL}</a><span>Chicago, Illinois, USA</span><a class="footer-cta" href="/contact.html">Request a Consultation →</a></div></div><div class="container footer-bottom"><span>© ${CURRENT_YEAR} Orbiwest Technologies LLC. All rights reserved.</span><span><a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a></span></div></footer>`;
  }

  async function loadBrand() {
    const nodes = [...document.querySelectorAll('[data-brand-logo="primary"]')];
    if (!nodes.length) return;
    try {
      const parts = await Promise.all([0,1,2,3].map(i => fetch(`/assets/brand/chunks/primary-${i}.txt?v=${ASSET_VERSION}`).then(r => {
        if (!r.ok) throw new Error(`Brand asset chunk ${i} failed`);
        return r.text();
      })));
      const src = `data:image/webp;base64,${parts.join('')}`;
      nodes.forEach(img => { img.src = src; img.classList.add('brand-loaded'); });
      document.documentElement.classList.add('brand-ready');
    } catch (error) {
      console.error(error);
      document.documentElement.classList.add('brand-fallback-only');
    }
  }

  function wireUi() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const nav = document.querySelector('[data-nav]');
    if (toggle && nav) toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.nav-parent').forEach(link => link.addEventListener('click', e => {
      if (window.innerWidth <= 980) {
        const group = link.closest('.nav-group');
        if (group && group.querySelector('.nav-dropdown')) { e.preventDefault(); group.classList.toggle('open'); }
      }
    }));
    const form = document.querySelector('#contact-form');
    if (form) form.addEventListener('submit', e => {
      e.preventDefault();
      const d = new FormData(form);
      const lines = [`Name: ${d.get('name') || ''}`, `Company: ${d.get('company') || ''}`, `Email: ${d.get('email') || ''}`, `Phone: ${d.get('phone') || ''}`, `Service: ${d.get('service') || ''}`, '', `${d.get('message') || ''}`];
      location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Orbiwest consultation request')}&body=${encodeURIComponent(lines.join('\n'))}`;
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
      document.body.dataset.page = pageName;
      document.body.innerHTML = `${headerHtml()}<main id="main">${page.main}</main>${footerHtml()}`;
      wireUi();
      await loadBrand();
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