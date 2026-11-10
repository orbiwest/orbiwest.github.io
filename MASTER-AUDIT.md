# Orbiwest Master Audit — 2026-11-10

## Perspectives reviewed
- Customer / buyer clarity
- MSP competitor positioning
- Desktop and responsive/mobile behavior
- Accessibility and keyboard use
- SEO / crawlability
- Static-site performance
- Security / attacker perspective

## Key findings addressed in this build
- Added a restrictive per-page CSP fallback suitable for a static same-origin website.
- Replaced inline style attributes so CSP does not require `style-src 'unsafe-inline'`.
- Removed JavaScript from legacy redirect stubs.
- Added explicit image dimensions to the repeated logo to reduce layout shift.
- Fixed stale PWA manifest icon paths.
- Added RFC-style `security.txt` expiry and policy link.
- Expanded website security reporting boundaries.
- Added support-email warning against passwords, MFA codes, recovery codes, private keys and API tokens.
- Improved selected title/description lengths and separated duplicate Security Baseline titles.
- Mobile quick-action bar now appears after scrolling instead of covering the first screen, and is disabled on Contact/Support.
- Utility strip is hidden at tablet widths where it can become cramped.
- Preserved the navy/gold metallic visual identity and responsive service layout.

## Static verification
Run `python3 audit-site.py` after future edits to check internal links, CSP fallbacks, asset paths, titles, descriptions, image dimensions, unsafe inline handlers and manifest paths.
